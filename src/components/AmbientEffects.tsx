import { useEffect } from 'react'

/** Keeps the page-wide ambient light and selected CTA magnet responsive to a fine pointer. */
export function AmbientEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const root = document.documentElement
    let frame = 0
    let listening = false
    let pointerX = 0
    let pointerY = 0
    let magneticTarget: HTMLElement | null = null

    const resetMagneticTarget = () => {
      magneticTarget?.style.removeProperty('--magnetic-x')
      magneticTarget?.style.removeProperty('--magnetic-y')
      magneticTarget = null
    }

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointerX = event.clientX
      pointerY = event.clientY
      const nextTarget = event.target instanceof Element
        ? event.target.closest<HTMLElement>('.magnetic-button')
        : null

      if (nextTarget !== magneticTarget) resetMagneticTarget()
      magneticTarget = nextTarget

      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        root.style.setProperty('--ambient-pointer-x', `${pointerX}px`)
        root.style.setProperty('--ambient-pointer-y', `${pointerY}px`)
        root.style.setProperty('--ambient-pointer-opacity', '.42')

        if (!magneticTarget) return
        const bounds = magneticTarget.getBoundingClientRect()
        const pullX = ((pointerX - bounds.left - bounds.width / 2) / bounds.width) * 5
        const pullY = ((pointerY - bounds.top - bounds.height / 2) / bounds.height) * 4
        magneticTarget.style.setProperty('--magnetic-x', `${pullX.toFixed(1)}px`)
        magneticTarget.style.setProperty('--magnetic-y', `${pullY.toFixed(1)}px`)
      })
    }

    const leavePage = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      resetMagneticTarget()
      root.style.setProperty('--ambient-pointer-opacity', '0')
    }

    const stopListening = () => {
      if (!listening) return
      document.removeEventListener('pointermove', movePointer)
      document.removeEventListener('pointerleave', leavePage)
      window.removeEventListener('blur', leavePage)
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      resetMagneticTarget()
      root.style.setProperty('--ambient-pointer-opacity', '0')
      root.style.removeProperty('--ambient-pointer-x')
      root.style.removeProperty('--ambient-pointer-y')
      listening = false
    }
    const syncMotionPreference = () => {
      if (!finePointer.matches || reducedMotion.matches || listening) {
        if (!finePointer.matches || reducedMotion.matches) stopListening()
        return
      }
      document.addEventListener('pointermove', movePointer, { passive: true })
      document.addEventListener('pointerleave', leavePage)
      window.addEventListener('blur', leavePage)
      listening = true
    }

    syncMotionPreference()
    finePointer.addEventListener('change', syncMotionPreference)
    reducedMotion.addEventListener('change', syncMotionPreference)
    return () => {
      finePointer.removeEventListener('change', syncMotionPreference)
      reducedMotion.removeEventListener('change', syncMotionPreference)
      stopListening()
      root.style.removeProperty('--ambient-pointer-opacity')
    }
  }, [])

  return null
}
