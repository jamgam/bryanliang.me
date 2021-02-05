const CONSTANTS = {
  DISTANCE_FROM_CURSOR: 25,
  MAX_SPEED_COEFFICIENT: 1/35,
  MAX_SPEED_CONSTANT: 5,
}

class Player {
  constructor({ context }) {
    this.context = context
    this.pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.angle = 0
  }

  updatePlayerPosition(mouseX, mouseY) {
    const y = mouseY - this.pos.y
    const x = mouseX - this.pos.x
    const h = Math.sqrt(y ** 2 + x ** 2)
    const angle = Math.atan2(y, x)

    let newY = this.pos.y
    let newX = this.pos.x
    if (h > CONSTANTS.DISTANCE_FROM_CURSOR) {
      const newH = h*CONSTANTS.MAX_SPEED_COEFFICIENT + CONSTANTS.MAX_SPEED_CONSTANT
      const yOffset = Math.sin(angle)*newH
      const xOffset = Math.cos(angle)*newH
      newY = this.pos.y + yOffset 
      newX = this.pos.x + xOffset 
    }

    this.pos = {x: newX, y: newY}
    this.angle = angle
    return {x: newX, y: newY, angle}
  }

  destroy() {
    this.delete
  }

  render({x, y}) {
    const { context, pos, angle } = this

    this.updatePlayerPosition(x, y)

    context.translate(pos.x, pos.y)
    context.rotate(angle + (90*Math.PI)/180)
    context.strokeStyle = '#ffffff'
    context.fillStyle = '#ffffff'
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