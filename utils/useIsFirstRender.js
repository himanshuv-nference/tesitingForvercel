import React from 'react'

export function useIsFirstRender() {
  const firstRenderRef = React.useRef()
  if (firstRenderRef.current) {
    firstRenderRef.current = false
  }
  if (!firstRenderRef.current && firstRenderRef.current !== false) {
    firstRenderRef.current = true
  }
  return firstRenderRef.current
}
