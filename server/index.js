import geckos from '@geckos.io/server'
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation'
import { Entity } from '../client/entity.mjs'
import { runInputsOnEntity } from '../client/playerController.mjs'

const io = geckos({ cors: { allowAuthorization: true } })
const SI = new SnapshotInterpolation()

const players = new Map()
const frameRate = 1000 / 60

let frame = 0

io.onConnection(channel => {
  console.log(`new connection! (${channel.id})`)
  players.set(channel.id, new Entity(channel.id, { x: 100 + Math.random() * 1000, y: 100 + Math.random() * 500 }))

  channel.onDisconnect(() => {
    io.emit('d', channel.id)
    console.log(`bye felicia! (${channel.id})`)
    players.delete(channel.id)
  })

  channel.on('u', inputs => runInputsOnEntity(inputs, players.get(channel.id)))
})

const tick = () => {
  frame++
  players.forEach(player => player.update(frameRate))

  if (frame % 4 === 0) {
    const worldState = []
    players.forEach(player => worldState.push(player.getFullState()))

    const snapshot = SI.snapshot.create(worldState)

    SI.vault.add(snapshot)
    io.emit('u', snapshot)
  }
}

setInterval(tick, frameRate)

const port = process.env.PORT || 8081
io.listen(port)