export const useAvoidFnRepeatInvoke = <T>(fn: () => T) => {
  let result: Promise<T> | null
  let lock = false

  return new Proxy(fn, {
    async apply(target, thisRef, argList) {
      if (lock || result) return result

      lock = true
      const newTarget = async () => Reflect.apply(target, thisRef, argList)
      result = newTarget()

      const value = await result
      lock = false
      result = null

      return value
    }
  })
}
