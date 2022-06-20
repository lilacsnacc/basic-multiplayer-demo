import { ACTIONS } from "./actions/basics.mjs"

export class Entity {
  static EArr = new Map()

  x = 0
  y = 0
  d = 0 // direction
  r = 10 // radius
  c = '#ffffff' // color

  minR = 10
  maxR = 50

  actionHistory = []
  currentEffects = []

  currentAction
  currentActionTimestamp

  constructor(id, params) {
    this.id = id
    Object.assign(this, params)
    params?.s?.length && this.setAction(params.s[0].id, params.s[0].t)
    Entity.EArr.set(id, this)
  }

  update(timeElapsed) {
    this.currentAction?.on(this, timeElapsed)
  }

  setAction(actionId, timestamp) {
    const action = ACTIONS.get(actionId)
    
    if (!this.actionHistory.length || this.actionHistory[0].id !== action?.id && action?.isEntityAllowed(this)) {
      const t = timestamp || Date.now()

      this.currentAction = action
      this.currentActionTimestamp = t

      this.actionHistory.unshift({id: action.id, t})
    }
  }

  getAction() {
    return this.actionHistory[0]
  }

  getFullState() {
    return {
      id: this.id,
      s: this.actionHistory.slice(0, 3),
      x: parseFloat(this.x.toFixed(2)),
      y: parseFloat(this.y.toFixed(2)),
      d: parseFloat(this.d.toFixed(4)),
      r: parseFloat(this.r.toFixed(2)),
      p: this.currentEffects,
    }
  }
}