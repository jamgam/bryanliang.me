export default class Particle {
  constructor(args) {
    this.context = args.context
    this.pos = args.position
    this.velocity = args.velocity
    this.radius = args.size;
    this.lifeSpan = args.lifeSpan;
    this.inertia = .98;
  }

  destroy(){
    this.delete = true;
  }

  updatePosition(timeElasped){
    // Move
    this.pos.x += this.velocity.x * timeElasped 
    this.pos.y += this.velocity.y * timeElasped
    this.velocity.x *= this.inertia 
    this.velocity.y *= this.inertia 

    // Shrink
    this.radius -= 0.006 * timeElasped
    if(this.radius < 0.1) {
      this.radius = 0.1
    }


    if((this.lifeSpan -= timeElasped) < 0){
      this.destroy()
    }
  }
  
  render(timeElasped){
    this.updatePosition(timeElasped)
    // Draw
    const { context } = this
    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.fillStyle = Math.random() >= 0.5 ? 'orange' : 'yellow'
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(0, -this.radius)
    context.arc(0, 0, this.radius, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
    context.restore()
  }
}