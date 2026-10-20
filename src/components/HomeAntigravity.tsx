import type { PointerEvent } from 'react'

const particles = [
  [8, 18, 0, 7], [17, 67, .8, 8], [21, 31, 1.6, 6], [28, 82, 2.1, 9], [34, 13, .5, 7],
  [39, 71, 1.2, 5], [43, 24, 2.8, 8], [48, 89, .4, 6], [53, 9, 1.9, 9], [58, 75, .1, 7],
  [63, 20, 2.3, 5], [68, 85, 1.4, 8], [73, 34, .7, 6], [78, 68, 2.6, 9], [84, 17, 1.1, 7],
  [90, 55, .3, 6], [13, 45, 2.4, 5], [25, 55, .9, 7], [37, 43, 1.8, 6], [66, 51, .6, 8],
  [81, 42, 2.9, 5], [94, 29, 1.5, 7], [5, 82, 2.2, 6], [57, 39, .2, 5], [31, 21, 2.7, 8],
  [71, 11, 1.3, 6], [87, 81, .6, 9], [45, 58, 1.7, 5],
] as const

export function HomeAntigravity() {
  function repelParticles(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const field = event.currentTarget
    const fieldBounds = field.getBoundingClientRect()
    const cursorX = event.clientX - fieldBounds.left
    const cursorY = event.clientY - fieldBounds.top
    field.style.setProperty('--gravity-cursor-x', `${cursorX}px`)
    field.style.setProperty('--gravity-cursor-y', `${cursorY}px`)
    field.querySelectorAll<HTMLElement>('.gravity-particle').forEach((particle) => {
      const dx = Number(particle.dataset.x) * fieldBounds.width / 100 - cursorX
      const dy = Number(particle.dataset.y) * fieldBounds.height / 100 - cursorY
      const distance = Math.hypot(dx, dy)
      const radius = 135
      const force = distance < radius ? (1 - distance / radius) * 8 : 0
      const angle = Math.atan2(dy, dx)
      particle.style.transform = `translate3d(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px, 0)`
    })
  }

  function settleParticles(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.querySelectorAll<HTMLElement>('.gravity-particle').forEach((particle) => { particle.style.transform = '' })
  }

  return <div className="home-antigravity" aria-hidden="true" onPointerMove={repelParticles} onPointerLeave={settleParticles}>
    <div className="gravity-cursor-glow" />
    {particles.map(([x, y, delay, duration], index) => <span className={`gravity-particle gravity-particle-${index % 4}`} data-x={x} data-y={y} key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}><i /></span>)}
  </div>
}
