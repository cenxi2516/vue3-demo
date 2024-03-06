<template>
  <div class="main">
    <ul>
      <li v-for="({ message }, i) in items" :key="i">
        {{ parentMessage + ' -- ' + message + ' -- ' + i }}
      </li>
    </ul>
    <br>
    <br>
    <br>
    <div>
      <a-tag>Tag 1</a-tag>
      <a-tag><a href="https://github.com/vueComponent/ant-design">Link</a></a-tag>
      <a-tag closable @close="log">Tag 2</a-tag>
      <a-tag closable @close.prevent>Prevent Default</a-tag>
    </div>
    <br>
    <br>
    <br>
    <div>
      <h4 style="margin-bottom: 16px">Presets:</h4>
      <div>
        <a-tag color="pink">pink</a-tag>
        <a-tag color="red">red</a-tag>
        <a-tag color="orange">orange</a-tag>
        <a-tag color="green">green</a-tag>
        <a-tag color="cyan">cyan</a-tag>
        <a-tag color="blue">blue</a-tag>
        <a-tag color="purple">purple</a-tag>
      </div>
      <h4 style="margin: '16px 0'">Custom:</h4>
      <div>
        <a-tag color="#f50">#f50</a-tag>
        <a-tag color="#2db7f5">#2db7f5</a-tag>
        <a-tag color="#87d068">#87d068</a-tag>
        <a-tag color="#108ee9">#108ee9</a-tag>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div>
      <template v-for="(tag, index) in tags" :key="tag">
        <a-tooltip v-if="tag.length > 20" :title="tag">
          <a-tag :closable="index !== 0" @close="handleClose(tag)">
            {{ `${tag.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else :closable="index !== 0" @close="handleClose(tag)">
          {{ tag }}
        </a-tag>
      </template>
      <a-input v-if="inputVisible" ref="inputRef" v-model:value="inputValue" type="text" size="small"
        :style="{ width: '78px' }" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
      <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
        <plus-outlined />
        New Tag
      </a-tag>
    </div>
    <br />
    <br />
    <br />
    <div>
      <a-tag v-model:visible="visible">Movies</a-tag>
      <br />
      <a-button size="small" @click="visible = !visible">Toggle</a-button>
    </div>
    <br />
    <br />
    <br />
    <div>
      <span :style="{ marginRight: '8px' }">Categories:</span>
      <a-checkable-tag v-model:checked="visible"
        @change="(checked: boolean) => console.log(checked)">Tag1</a-checkable-tag>
    </div>
    <br />
    <br />
    <br />
    <base-tag></base-tag>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, toRefs } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue'
import BaseTag from '@/components/BaseTag/index.vue'

const log = (e: MouseEvent) => {
  e.preventDefault()
  console.log(e);
}

const inputRef = ref();
const state = reactive({
  tags: ['Unremovable', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
  inputVisible: false,
  inputValue: '',
});

const handleClose = (removedTag: string) => {
  const tags = state.tags.filter(tag => tag !== removedTag);
  console.log(tags);
  state.tags = tags;
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  let tags = state.tags;
  if (inputValue && tags.indexOf(inputValue) === -1) {
    tags = [...tags, inputValue];
  }
  console.log(tags);
  Object.assign(state, {
    tags,
    inputVisible: false,
    inputValue: '',
  });
};

const { tags, inputValue, inputVisible } = toRefs(state)

const visible = ref(false)





const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
const parentMessage = ref('parentMessage')

// 主题颜色：主色 + 次色
type TTagTheme = {
  mainColor: string
  secondColor?: string
}

enum PresetThemeEnum {
  GUEST = 'guest', // default
  CATER = 'cater',
  OTHER = 'other'
}

type TTheme = PresetThemeEnum | TTagTheme

const DEFAULT_SECOND_COLOR = '#fff'
const setTagTheme = (mainColor: string, secondColor: string = DEFAULT_SECOND_COLOR) => ({ mainColor, secondColor })
const isPresetTheme = (theme: TTheme) => Object.values(PresetThemeEnum).includes(theme as PresetThemeEnum)
const PresetTheme = {
  [PresetThemeEnum.GUEST]: setTagTheme('#f00'),
  [PresetThemeEnum.CATER]: setTagTheme('#0f0'),
  [PresetThemeEnum.OTHER]: setTagTheme('#00f')
}


type TProps = {
  theme: TTheme
}

// 展示标题：主标题 + 副标题
console.log(Object.values(PresetThemeEnum), isPresetTheme(PresetThemeEnum.GUEST))



</script>

<style lang="scss" scoped></style>nextTick, reactive,
