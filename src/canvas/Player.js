import { GAME_VALUES } from '/src/constants'
import { calculateNewPosition } from '/src/helpers'

class Player {
  constructor({ context }) {
    this.context = context
    this.pos = {
      x: window.innerWidth/2, 
      y: window.innerHeight/2}
    this.angle = 0
    this.speed = 0
  }

  updatePlayerPosition(mouseX, mouseY) {
    const yDistanceFromMouse = mouseY - this.pos.y
    const xDistanceFromMouse = mouseX - this.pos.x

    const distanceFromMouse = Math.sqrt(yDistanceFromMouse ** 2 + xDistanceFromMouse ** 2)

    const angle = Math.atan2(yDistanceFromMouse, xDistanceFromMouse)
    
    let distance = 0
    if (distanceFromMouse > GAME_VALUES.DISTANCE_FROM_CURSOR) {
      distance = distanceFromMouse * GAME_VALUES.MAX_SPEED_COEFFICIENT + GAME_VALUES.MAX_SPEED_CONSTANT
      this.pos = calculateNewPosition(this.pos, angle, distance)
    }

    this.angle = angle
    this.speed = distance
  }

  destroy() {
    this.delete = true
  }

  render({x, y}) {
    const { context, pos, angle } = this

    this.updatePlayerPosition(x, y)

    context.translate(pos.x, pos.y)
    context.rotate(angle + (90*Math.PI)/180)
    context.strokeStyle = '#FFF'
    context.fillStyle = '#FFF'
    context.lineWidth = 4
    context.beginPath()
    context.moveTo(0, -10)
    context.lineTo(7, 5)
    context.lineTo(5, 7)
    context.lineTo(-5, 7)
    context.lineTo(-7, 5)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
  }
}

export default Player