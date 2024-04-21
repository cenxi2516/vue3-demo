export const unSelectTheText = () => document?.getSelection()?.removeAllRanges()

export const handleNaNNum = (num: number) => (Number.isNaN(num) ? 0 : num)

export const translateFirstChildDom = (dom: HTMLElement, x: number, y: number) => {
  const scrollFirstChildDom = dom?.firstElementChild
  if (scrollFirstChildDom instanceof HTMLDivElement) {
    scrollFirstChildDom.style.transform = `translate(${x}px,${y}px)`
  }
}