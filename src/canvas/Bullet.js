import { GAME_VALUES } from '/src/constants'
import { calculateNewPosition } from '/src/helpers'

class Bullet {
  constructor({ player, width, height }) {
    this.context = player.context
    this.player = player
    this.pos = {
      x: player.pos.x, 
      y: player.pos.y}
    this.angle = player.angle
    this.width = width
    this.height = height
    this.speed = player.speed
  }

  destroy() {
    this.delete = true
  }

  updateBulletPosition() {
    const { speed, pos, width, height, angle } = this

    // destroy bullets that are out of bounds
    if (pos.x < width && pos.y < height && pos.x > 0 && pos.y > 0) {
      const bulletSpeed = GAME_VALUES.BASE_BULLET_SPEED + speed
      this.pos = calculateNewPosition(pos, angle, bulletSpeed)
    } else {
      this.destroy()
    }
  }

  render() {
    
    const { context, pos, angle } = this

    this.updateBulletPosition()

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