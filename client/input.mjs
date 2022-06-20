export const Inputs = {
  timestamp: Date.now(),
  expand: 0,
  left: 0,
  right: 0,
  up: 0,
  down: 0,
}

// We need to add a lastInputTimestamp variable to compare and see if a new input needs to be sent

window.addEventListener('keydown', ev => {
  let tookAction = 1

  if (ev.code === 'Space')
    Inputs.expand = 1
  else if (ev.code === 'KeyW')
    Inputs.up = 1
  else if (ev.code === 'KeyA')
    Inputs.left = 1
  else if (ev.code === 'KeyS')
    Inputs.down = 1
  else if (ev.code === 'KeyD')
    Inputs.right = 1
  else
    tookAction = 0

  if (tookAction) Inputs.timestamp = Date.now()
})

window.addEventListener('keyup', ev => {
  let tookAction = 1

  if (ev.code === 'Space')
    Inputs.expand = 0
  else if (ev.code === 'KeyW')
    Inputs.up = 0
  else if (ev.code === 'KeyA')
    Inputs.left = 0
  else if (ev.code === 'KeyS')
    Inputs.down = 0
  else if (ev.code === 'KeyD')
    Inputs.right = 0
  else
    tookAction = 0

  if (tookAction) Inputs.timestamp = Date.now()
})