<template>
  <div class="camera-container">
    <video ref="videoRef" autoplay playsinline style="display: none;"></video>
    <canvas ref="canvasRef" @click="takePhoto"></canvas>

    <div class="controls">
      <button @click="toggleCamera">
        {{ isCameraActive ? '停止相机' : '开启相机' }}
      </button>

      <select v-model="selectedDevice">
        <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">
          {{ device.label || `Camera ${videoDevices.indexOf(device) + 1}` }}
        </option>
      </select>

      <select v-model="filter">
        <option value="none">无滤镜</option>
        <option value="grayscale">灰度</option>
        <option value="sepia">怀旧</option>
        <option value="invert">反色</option>
      </select>

      <label>
        帧率:
        <input type="range" v-model.number="fps" min="1" max="60">
        {{ fps }} FPS
      </label>
    </div>

    <div v-if="photos.length" class="gallery">
      <h3>照片集</h3>
      <div class="photo-grid">
        <div v-for="(photo, index) in photos" :key="index" class="photo-item">
          <img :src="photo" @click="viewPhoto(photo)">
          <button @click="downloadPhoto(photo, `photo_${index}.png`)">下载</button>
          <button @click="deletePhoto(index)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const videoRef = ref(null);
const canvasRef = ref(null);
const stream = ref(null);
const animationFrameId = ref(null);
const isCameraActive = ref(false);
const videoDevices = ref([]);
const selectedDevice = ref('');
const filter = ref('none');
const fps = ref(30);
const lastTime = ref(0);
const photos = ref([]);

// 获取可用视频设备
const getVideoDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    videoDevices.value = devices.filter(device => device.kind === 'videoinput');
    if (videoDevices.value.length > 0) {
      selectedDevice.value = videoDevices.value[0].deviceId;
    }
  } catch (error) {
    console.error('Error enumerating devices:', error);
  }
};

// 启动/停止相机
const toggleCamera = () => {
  if (isCameraActive.value) {
    stopCamera();
  } else {
    startCamera();
  }
};

// 启动相机
const startCamera = async () => {
  try {
    stopCamera();

    const constraints = {
      video: {
        deviceId: selectedDevice.value ? { exact: selectedDevice.value } : undefined,
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'environment'
      }
    };

    stream.value = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.value.srcObject = stream.value;
    isCameraActive.value = true;

    // 开始渲染到canvas
    renderVideoToCanvas();
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert(`无法访问相机: ${error.message}`);
  }
};

// 停止相机
const stopCamera = () => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }

  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }

  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }

  isCameraActive.value = false;
  lastTime.value = 0;
};

// 渲染视频到canvas
const renderVideoToCanvas = () => {
  if (!videoRef.value || !canvasRef.value) return;

  const video = videoRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');

  // 设置canvas尺寸匹配视频
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const drawFrame = (timestamp) => {
    if (!isCameraActive.value) return;

    if (!lastTime.value) lastTime.value = timestamp;
    const elapsed = timestamp - lastTime.value;

    if (elapsed > 1000 / fps.value) {
      // 绘制原始视频帧
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 应用滤镜
      if (filter.value !== 'none') {
        applyFilter(ctx, canvas.width, canvas.height, filter.value);
      }

      lastTime.value = timestamp - (elapsed % (1000 / fps.value));
    }

    animationFrameId.value = requestAnimationFrame(drawFrame);
  };

  drawFrame(performance.now());
};

// 应用滤镜
const applyFilter = (ctx, width, height, filterType) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  switch (filterType) {
    case 'grayscale':
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      break;
    case 'sepia':
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
      }
      break;
    case 'invert':
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
      }
      break;
  }

  ctx.putImageData(imageData, 0, 0);
};

// 拍照
const takePhoto = () => {
  if (!canvasRef.value || !isCameraActive.value) return;

  const canvas = canvasRef.value;
  const imageDataUrl = canvas.toDataURL('image/png');
  photos.value.unshift(imageDataUrl);
};

// 查看照片
const viewPhoto = (photoUrl) => {
  window.open(photoUrl, '_blank');
};

// 下载照片
const downloadPhoto = (photoUrl, filename) => {
  const link = document.createElement('a');
  link.href = photoUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 删除照片
const deletePhoto = (index) => {
  photos.value.splice(index, 1);
};

// 监听设备变化
watch(selectedDevice, (newDeviceId) => {
  if (isCameraActive.value) {
    startCamera();
  }
});

// 初始化
onMounted(() => {
  getVideoDevices();

  // 监听设备变化
  navigator.mediaDevices.addEventListener('devicechange', getVideoDevices);
});

// 清理
onBeforeUnmount(() => {
  stopCamera();
  navigator.mediaDevices.removeEventListener('devicechange', getVideoDevices);
});
</script>

<style>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

canvas {
  max-width: 100%;
  max-height: 60vh;
  border: 2px solid #333;
  background-color: #000;
  cursor: pointer;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

button, select, label {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}

button.primary {
  background-color: #4CAF50;
  color: white;
  border: none;
}

button.primary:hover {
  background-color: #45a049;
}

.gallery {
  width: 100%;
  margin-top: 20px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.photo-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.photo-item img {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.photo-item button {
  padding: 4px 8px;
  font-size: 12px;
}
</style>