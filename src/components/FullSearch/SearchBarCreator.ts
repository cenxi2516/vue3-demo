import { h, ref, render, type Component, type Ref } from 'vue'

class SearchBarCreator {
  container: HTMLDivElement
  isShow: Ref<boolean>

  constructor(private component: Component) {
    this.container = document.createElement('div')
    this.isShow = ref(false)
    this.component = component
  }

  public show() {
    if (this.isShow.value) {
      this.hide()
    } else {
      // generate vnode
      const vnode = h(this.component)
      render(vnode, this.container)

      document.body.insertBefore(this.container, document.body.firstChild)
      this.container.style.display = ''
      this.isShow.value = true
    }
  }

  public hide() {
    if (this.container) {
      this.container.style.display = 'none'
      this.isShow.value = false
    }
  }

  public destroy() {
    if (this.container) {
      render(null, this.container)
      document.body.removeChild(this.container)
      this.isShow.value = false
    }
  }
}

export default SearchBarCreator
