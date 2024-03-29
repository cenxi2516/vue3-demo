export const calcTextByte = (text: string): number => {
  const strLen = text.length
  let byteLen = strLen

  for (let i = 0; i < strLen; i++) {
    const c = text.charCodeAt(i)

    if (!((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f))) {
      byteLen++
    }
  }

  return byteLen
}
