import type { Component } from 'vue'
import SearchBarCreator from './SearchBarCreator'

const map = new WeakMap()
const useSearch = (component: Component) => {
  let instance = map.get(component)
  if (!instance) {
    instance = new SearchBarCreator(component)
    instance = { ...instance, instance }
    map.set(component, instance)
  }

  return instance
}

export default useSearch
