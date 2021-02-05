

class Bullet {
  constructor() {
    this.pos = {x, y}
  }

  destroy() {
    this.delete = true
  }

  render({x, y, angle}) {
    const context = state.context
    context.save()
    context.translate(this.position.x, this.position.y)
    context.rotate(this.rotation * Math.PI / 180)
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