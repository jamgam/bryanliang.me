import { GAME_VALUES } from '/src/constants'
import { calculateNewPositionWithAngle, isOutOfBounds} from '/src/helpers'

class Bullet {
  constructor({ player, width, height, lastFrame }) {
    this.context = player.context
    this.player = player
    this.pos = {
      x: player.pos.x, 
      y: player.pos.y}
    this.angle = player.angle
    this.width = width
    this.height = height
    this.speed = player.speed + GAME_VALUES.BASE_BULLET_SPEED
  }

  destroy() {
    this.delete = true
  }

  updateBulletPosition(timeElasped) {
    const { speed, pos, width, height, angle } = this
    // destroy bullets that are out of bounds
    if (isOutOfBounds(pos, width, height)) {
      const bulletSpeed = GAME_VALUES.BASE_BULLET_SPEED + speed
      const distance = bulletSpeed * timeElasped
      this.pos = calculateNewPositionWithAngle(pos, angle, distance)
    } else {
      this.destroy()
    }
  }

  render(timeElasped) {
    
    const { context, pos, angle } = this
    
    this.updateBulletPosition(timeElasped)

    context.save()
    context.translate(pos.x, pos.y)
    context.rotate(angle * Math.PI / 180)
    context.fillStyle = '#FFF'
    context.lineWidth = 0,5
    context.beginPath()
    context.arc(0, 0, 2, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
    context.restore()
  }
}

export default Bullet