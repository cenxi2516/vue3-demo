export const getContainer = (selector: string, element: HTMLElement | Document = document) =>
  element?.querySelector(selector) || document.body
