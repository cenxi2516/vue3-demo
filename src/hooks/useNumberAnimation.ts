import { onMounted, readonly, ref } from 'vue'

export const useNumberAnimation = (to: number, from: number = 0, duration: number = 5e2) => {
  const _curNum = ref(from)

  const _speed = (to - from) / duration
  const _startTime = ref(Date.now())

  const _run = () => {
    const t = Date.now() - _startTime.value

    if (t >= duration) {
      _curNum.value = to
      return
    }

    _curNum.value += _speed

    requestAnimationFrame(_run)
  }

  onMounted(() => {
    _startTime.value = Date.now()
    _run()
  })

  return readonly(_curNum)
}