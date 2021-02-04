import { ThemeConsumer } from 'styled-components'
import { colors } from '/src/constants'

class Player {
  constructor(args) {
    console.log('args', args)
    this.context = args.context
    this.pos = {x: window.innerWidth/2, y: window.innerHeight/2}
  }

  render(pos) {

    const y = pos.y - this.pos.y
    const x = pos.x - this.pos.x
    const h = Math.sqrt(y ** 2 + x ** 2)
    const angle2 = Math.atan2(pos.y - this.pos.y, pos.x - this.pos.x)

    const { context } = this
    context.save();
    if (h > 25) {
      const newH = (h - 15)/45

      const yOffset = Math.sin(angle2)*newH
      const xOffset = Math.cos(angle2)*newH
      
      const newY = this.pos.y + yOffset 
      const newX = this.pos.x + xOffset 

      context.translate(newX, newY);
      this.pos.x = newX
      this.pos.y = newY
    } else {
      context.translate(this.pos.x, this.pos.y);
    }
    context.rotate(angle2 + (90*Math.PI)/180);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#ffffff';
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, -10);
    context.lineTo(7, 5);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-7, 5);
    context.closePath();
    context.fill();
    context.stroke()
    context.restore();
  }
}

export default Player