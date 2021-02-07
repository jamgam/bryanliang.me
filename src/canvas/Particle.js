import { calculateNewPositionWithAngle, calculateVelocityFromAngle, randomInt, randomNum } from '/src/helpers/calculations'

export default class Particle {
  constructor({ size, pos, context, speed, angle }) {
    this.context = context
    this.pos = {
      x: pos.x + randomNum(-size*1.2, size*1.2),
      y: pos.y + randomNum(-size*1.2, size*1.2)
    }
    this.velocity = {
      x: randomNum(-0.11, 0.11),
      y: randomNum(-0.11, 0.11)
    }
    this.size = randomNum(1, 3)
    this.lifeSpan = randomNum(1000, 1666)
    this.inertia = .98

    const additionalVel = calculateVelocityFromAngle(speed, angle) || 0
    this.velocity.x += additionalVel.x/1.2
    this.velocity.y += additionalVel.y/1.2
  }

  destroy(){
    this.delete = true
  }

  updatePosition(timeElasped){
    // Move
    this.pos.x += this.velocity.x * timeElasped 
    this.pos.y += this.velocity.y * timeElasped
    this.velocity.x *= (this.inertia ** (timeElasped/16.666666))
    this.velocity.y *= (this.inertia ** (timeElasped/16.666666))

    // Shrink
    this.size -= 0.006 * timeElasped
    if(this.size < 0.1) {
      this.size = 0.1
    }

    if((this.lifeSpan -= timeElasped) < 0){
      this.destroy()
    }
  }
  
  render(timeElasped){

    let particleColors = ['orange', 'orange', 'yellow']
    this.updatePosition(timeElasped)
    // Draw
    const { context } = this
    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.fillStyle = particleColors[randomInt(0, 3)]
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(0, -this.size)
    context.arc(0, 0, this.size, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
    context.restore()
  }
}