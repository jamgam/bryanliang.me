import { GAME_VALUES, colors } from '/src/constants'
import { calculateNewPositionWithAngle, calculateAngle, calculateDistance } from '/src/helpers/calculations'

class Player {
  constructor({ context }) {
    this.context = context
    this.pos = {
      x: -200, 
      y: window.innerHeight/2}
    this.angle = 0
    this.speed = 0
  }

  updatePosition(mousePos, timeElasped) {
    const { MAX_SPEED_COEFFICIENT } = GAME_VALUES
    const distanceFromMouse = calculateDistance(this.pos, mousePos)
    const angle = calculateAngle(this.pos, mousePos)

    let distance = 0

    if (distanceFromMouse > GAME_VALUES.DISTANCE_FROM_CURSOR) {
      distance = timeElasped * MAX_SPEED_COEFFICIENT * distanceFromMouse
      this.pos = calculateNewPositionWithAngle(this.pos, angle, distance)
    }

    this.angle = angle
    this.speed = distance/timeElasped
  }

  destroy() {
    this.delete = true
  }

  render(...args) {
    const { context, pos, angle } = this

    this.updatePosition(...args)
    context.save()
    context.translate(pos.x, pos.y)
    context.rotate(angle + (90*Math.PI)/180)
    context.strokeStyle = '#FFF'
    context.fillStyle = '#FFF'
    context.lineWidth = 4
    context.beginPath()
    context.moveTo(0, -9)
    context.lineTo(7, 7)
    context.lineTo(4, 5)
    context.lineTo(-4, 5)
    context.lineTo(-7, 7)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()

    context.save()
    context.beginPath()
    context.translate(pos.x, pos.y)
    context.fillStyle = colors.darkBlue
    context.strokeStyle = 'white'
    context.arc(0, 0, 6, 0, 2 * Math.PI)
    context.lineWidth = 2
    context.fill()
    context.stroke()
    context.restore()
  }
}

export default Player