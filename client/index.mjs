import { Entity } from "./entity.mjs";
import { render } from "./canvas.mjs";
import { runInputsOnEntity } from "./playerController.mjs";
import { channel, initServerConnection, lerpServerValues } from "./connection.mjs";
import { Inputs } from "./input.mjs";

let lastTimestamp = 0

function onWindowLoaded() {
  console.info('✨ Multiplayer Demo ✨')

  initServerConnection()

  gameLoop()
}

function gameLoop(timeStamp = 0) {
  const timeElapsed = timeStamp - lastTimestamp
  const playerEntity = channel && Entity.EArr.get(channel.id)

  lastTimestamp = timeStamp

  if (playerEntity) {
    runInputsOnEntity(Inputs, playerEntity)
    channel.emit('u', Inputs)
  }

  Entity.EArr.forEach(entity => entity.update(timeElapsed))

  lerpServerValues()

  render(Entity.EArr)

  requestAnimationFrame(gameLoop)
}

window.addEventListener('load', onWindowLoaded)