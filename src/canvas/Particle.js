export default class Particle {
  constructor(args) {
    this.context = args.context
    this.pos = args.position
    this.velocity = args.velocity
    this.radius = args.size;
    this.lifeSpan = args.lifeSpan;
    this.inertia = 0.98;
  }

  destroy(){
    this.delete = true;
  }
  
  render(){
    // Move
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
    this.velocity.x *= this.inertia
    this.velocity.y *= this.inertia

    // Shrink
    this.radius -= 0.1
    if(this.radius < 0.1) {
      this.radius = 0.1
    }
    if(this.lifeSpan-- < 0){
      this.destroy()
    }

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