import { randomInt } from '/src/helpers'
import { GAME_VALUES, colors } from '/src/constants'
import { calculateNewPositionWithAngle, calculateAngle, isOutOfBounds } from '/src/helpers'

class Enemy {
  constructor({context, width, height, pos, target}) {
    const { ENEMY_MIN_SIZE, ENEMY_MAX_SIZE, ENEMY_MIN_SPEED, ENEMY_MAX_SPEED, ENEMY_TARGET_OFFSET } = GAME_VALUES
    this.context = context
    this.width = width
    this.height = height
    this.pos = pos
    this.size = randomInt(ENEMY_MIN_SIZE, ENEMY_MAX_SIZE)
    this.speed = randomInt(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED)
    this.angle = calculateAngle(pos, {x: target.x + randomInt(-ENEMY_TARGET_OFFSET, ENEMY_TARGET_OFFSET), y: target.y + randomInt(-ENEMY_TARGET_OFFSET, ENEMY_TARGET_OFFSET)})
  }

  destroy() {
    this.delete = true
  }

  updatePosition() {
    const { pos, angle, speed, width, height } = this

    if (isOutOfBounds(pos, width, height, 50)) {
      const newPos = calculateNewPositionWithAngle(pos, angle, speed)
      this.pos = newPos
    } else {
      this.destroy()
    }
  }

  render() {
    const { context, pos, size } = this
    this.updatePosition() 
    context.save()
    context.beginPath()
    context.translate(pos.x, pos.y)
    context.strokeStyle = colors.red
    context.arc(0, 0, size, 0, 2 * Math.PI)
    context.lineWidth = 2
    context.stroke()
    context.restore()
  }
}

export default Enemy