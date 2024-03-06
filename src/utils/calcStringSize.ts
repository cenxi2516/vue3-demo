export const calcStringSize = (inputString: string): number => {
  let len = 0

  for (let i = 0; i < inputString.length; i++) {
    const c = inputString.charCodeAt(i)

    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }

  return len
}
