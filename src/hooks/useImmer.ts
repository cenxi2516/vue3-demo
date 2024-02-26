import { produce, type Draft } from 'immer'
import { shallowRef, type ShallowRef } from 'vue'

type UpdateFn<T> = (draft: Draft<T>) => void

export const useImmer = <T>(curState: T): [ShallowRef<T>, (updater: UpdateFn<T>) => void] => {
  const state = shallowRef<T>(curState)
  const update = (updater: UpdateFn<T>) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
