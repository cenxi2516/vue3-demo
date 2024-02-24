import { ref, type ShallowRef, onBeforeUnmount, type Component, nextTick, type Ref } from 'vue'

type TDomRef = ShallowRef<HTMLElement | Component | undefined>
type TZIndex = Ref<number>
type TUseZIndexFn = (domRef: TDomRef) => {
  zIndex: TZIndex
  increase: () => TZIndex
  decrease: () => TZIndex
}

const map = new Map()
const DEFAULT_Z_INDEX = 1e3
const nextZIndex = ref(DEFAULT_Z_INDEX)

const _updateZIndex = (domRef: TDomRef, curZIndex: TZIndex) => {
  curZIndex.value = nextZIndex.value
  map.set(domRef, curZIndex)
}

const _changeZIndex = (step: number) => {
  nextZIndex.value += step
}

const _computedMaxZIndex = () => {
  const zIndexes = new Set<number>()

  for (const [, { value }] of map) zIndexes.add(value)

  const newZIndexes = [...zIndexes, DEFAULT_Z_INDEX]
  nextZIndex.value = Math.max(...newZIndexes)
}

const _removeDomZIndex = (domRef: TDomRef) => map.delete(domRef)

const _setDomZIndex = (domRef: TDomRef, curZIndex: number) => {
  if (domRef.value instanceof HTMLElement) {
    domRef.value.style.zIndex = String(curZIndex)
  }
}

const useZIndex: TUseZIndexFn = (domRef: TDomRef) => {
  const zIndex = ref(map.get(domRef))
  const changeZIndex = (step: number, isStep = true) => {
    if (isStep) {
      _changeZIndex(step)
      _updateZIndex(domRef, zIndex)
    }

    nextTick(() => _setDomZIndex(domRef, isStep ? nextZIndex.value : step))

    return zIndex
  }

  const increase = () => changeZIndex(1)
  const decrease = () => changeZIndex(-1)

  if (!zIndex.value) {
    increase()

    onBeforeUnmount(() => {
      _removeDomZIndex(domRef)
      _computedMaxZIndex()
    })
  }

  return { zIndex, increase, decrease }
}

export default useZIndex
