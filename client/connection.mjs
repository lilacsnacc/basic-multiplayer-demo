import { Entity } from "./entity.mjs"
import { ActIdle } from "./actions/basics.mjs"

const SI = new SnapshotInterpolation(15)

export let channel

export function initServerConnection(authorization) {
  channel = geckos({ authorization, url: 1 ? 'http://localhost' : 'http://192.241.145.47', port: 8081 })

  channel.onConnect(err => {
    if (err) return console.error('🌐❌', err)
    console.info('🌐✔️', 'connection established')

    channel.onDisconnect(initServerConnection)
    channel.on('u', data => SI.snapshot.add(data))
    channel.on('d', data => Entity.EArr.delete(data))
  })
}

export function lerpServerValues(doNotUpdate) {

  SI.vault.get()?.state.map(serverEntity => {
    const entity = Entity.EArr.get(serverEntity.id)
    console.log(serverEntity)

    if (entity) {
      if (doNotUpdate) return;

      const lerpStrength = 0.1
      const offX = entity.x - serverEntity.x
      const offY = entity.y - serverEntity.y
      const offR = entity.r - serverEntity.r

      entity.id !== channel.id && serverEntity.s.length && entity.setAction(serverEntity.s[0].id, serverEntity.s[0].t)

      entity.x -= offX * lerpStrength
      entity.y -= offY * lerpStrength
      entity.r -= offR * lerpStrength
      entity.d = serverEntity.d
    } else
      new Entity(serverEntity.id, serverEntity)

  })
}