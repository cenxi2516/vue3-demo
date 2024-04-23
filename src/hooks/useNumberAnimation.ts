import { onMounted, readonly, ref } from 'vue'

export const useNumberAnimation = (to: number, from: number = 0, duration: number = 1e3) => {
  const _curNum = ref(from)

  const _speed = (to - from) / duration
  const _startTime = Date.now()

  const _run = () => {
    const t = Date.now() - _startTime

    if (t >= duration) {
      _curNum.value = to
      return
    }

    _curNum.value += _speed

    requestAnimationFrame(_run)
  }

  onMounted(() => _run())

  return readonly(_curNum)
}
