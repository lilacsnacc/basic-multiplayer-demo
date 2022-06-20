const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const onResize = () => {
  const w = window.innerWidth
  const h = window.innerHeight

  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  canvas.width = w
  canvas.height = h
}

onResize()
window.addEventListener('resize', () => onResize())

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

export function render(playerMap) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  playerMap.forEach(p => {
    ctx.beginPath()
    ctx.fillStyle = p.c
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI)
    ctx.fill()
  })
}