import Player from '/src/canvas/Player'
import Bullet from '/src/canvas/Bullet'
import { colors } from '/src/constants'

class Game {
  constructor({ width, height, context }) {
    window.addEventListener('mousemove',  this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    this.isInGame = false
    this.width = width
    this.height = height
    this.context = context
    this.playerPosition = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.mousePosition = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.player = null
    this.bullets = []
  }

  resize({ width, height }) {
    this.height = height
    this.width = width
  }

  start() {
    const { context } = this
    this.isInGame = true
    this.player = new Player({ context })
    this.update()
  }

  handleMouseMove({ offsetX, offsetY}) {
    this.mousePosition = {x: offsetX, y: offsetY}
  }

  handleMouseDown() {
    const { context, player, width, height } = this
    this.bullets.push(new Bullet({player, width, height}))
  }

  update() {
    this.render()
    requestAnimationFrame(() => {this.update()})
  }
  
  shoot() {

  }

  render() {
    const { width, height, context, bullets, player, mousePosition } = this
    
    context.save()

    // fill background
    context.fillStyle = colors.darkGrey
    context.fillRect(0, 0, width, height)

    // render player
    player.render(mousePosition)

    // remove deleted bullets
    const updatedBullets = bullets.filter((bullet) => !bullet.delete)

    // render bullets
    for (let bullet of updatedBullets) {
      bullet.render()
    }

    context.restore()
  }
}

export default Game