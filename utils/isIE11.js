export const isIE11 =
  typeof window !== 'undefined' &&
  Boolean(window.MSInputMethodContext) &&
  Boolean(document.documentMode)
