import { ActExpand, ActIdle, ActMove } from "./actions/basics.mjs"

export function runInputsOnEntity(inputs, playerEntity) {
  if (playerEntity) {
    const requestingMovement = inputs.up || inputs.down || inputs.left || inputs.right

    if (inputs.expand)
      playerEntity.setAction(ActExpand.id, inputs.timestamp)
    else if (requestingMovement)
      playerEntity.setAction(ActMove.id, inputs.timestamp)
    else
      playerEntity.setAction(ActIdle.id, inputs.timestamp)

    if (requestingMovement)
      playerEntity.d = Math.atan2(inputs.down - inputs.up, inputs.right - inputs.left)
  }
}