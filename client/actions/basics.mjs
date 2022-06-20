export const ACTIONS = new Map()

const ActBase = {
  id: 'baseState',
  on(entity, deltaTime) {

  },
  isEntityAllowed(entity) {
    // const requiredEffects = []
    // const bannedEffects = []

    // return requiredEffects.every(effect => entity.currentEffects.includes(effect)) && !bannedEffects.some(effect => entity.currentEffects.includes(effect))
    return 1
  }
}

export function createAction(options = {}) {
  const newAction = {
    ...ActBase,
    ...options
  }

  ACTIONS.set(newAction.id, newAction)
  return newAction
}

export const ActIdle = createAction({
  id: 'Idle',
  on(entity, deltaTime) {
    entity.r = Math.max(entity.minR, entity.r - deltaTime * 0.01)
  }
})
export const ActMove = createAction({
  id: 'Move',
  on(entity, deltaTime) {
    entity.r = Math.max(entity.minR, entity.r - deltaTime * 0.01)

    const moveSpeed = deltaTime * (entity.r - entity.minR) / entity.maxR

    entity.x += Math.cos(entity.d) * moveSpeed
    entity.y += Math.sin(entity.d) * moveSpeed
  }
})
export const ActExpand = createAction({
  id: 'Expand',
  on(entity, deltaTime) {
    entity.r += (entity.maxR - entity.r) * deltaTime * 0.0025
  }
})