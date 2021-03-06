import { randomInt } from '/src/helpers/calculations'
import { GAME_VALUES, colors } from '/src/constants'
import { calculateNewPositionWithAngle, calculateAngle, isOutOfBounds } from '/src/helpers/calculations'

class Enemy {
  constructor({context, width, height, pos, target, speedModifier}) {
    const { ENEMY_MIN_SIZE, ENEMY_MAX_SIZE, ENEMY_MIN_SPEED, ENEMY_MAX_SPEED, ENEMY_TARGET_OFFSET } = GAME_VALUES
    this.context = context
    this.width = width
    this.height = height
    this.pos = pos
    this.size = randomInt(ENEMY_MIN_SIZE, ENEMY_MAX_SIZE)
    this.speed = randomInt(ENEMY_MIN_SPEED * 100, ENEMY_MAX_SPEED * 100)/100 + speedModifier
    this.angle = calculateAngle(pos, {x: target.x + randomInt(-ENEMY_TARGET_OFFSET, ENEMY_TARGET_OFFSET), y: target.y + randomInt(-ENEMY_TARGET_OFFSET, ENEMY_TARGET_OFFSET)})
    this.inertia = .9995
  }
  
  destroy() {
    this.delete = true
  }
  
  updatePosition(timeElasped) {
    const { pos, angle, speed, width, height } = this
    
    if (isOutOfBounds(pos, width, height, 50)) {
      const newPos = calculateNewPositionWithAngle(pos, angle, speed * timeElasped)
      this.pos = newPos
    } else {
      this.destroy()
    }
    this.speed *= (this.inertia ** (timeElasped/16.666666))
  }

  render(timeElasped) {
    const { context, pos, size } = this
    this.updatePosition(timeElasped) 
    context.save()
    context.beginPath()
    context.translate(pos.x, pos.y)
    context.strokeStyle = colors.red
    context.fillStyle = colors.red
    context.arc(0, 0, size, 0, 2 * Math.PI)
    context.lineWidth = 3
    context.fill()
    context.stroke()
    context.restore()
  }
}

export default Enemy