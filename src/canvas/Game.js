import Player from '/src/canvas/Player'
import Bullet from '/src/canvas/Bullet'
import { colors } from '/src/constants'

const CONSTANTS = {
  DISTANCE_FROM_CURSOR: 25,
  MAX_SPEED_COEFFICIENT: 1/35,
  MAX_SPEED_CONSTANT: 5,
}

class Game {
  constructor({ width, height, context }) {
    window.addEventListener('mousemove',  this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    console.log(context)
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
    
  }

  update() {
    this.render()
    requestAnimationFrame(() => {this.update()})
  }
  
  shoot() {

  }

  render() {
    const { width, height, context } = this
    
    context.save()

    // fill background
    // context.fillStyle = colors.darkGrey
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    // render player
    this.player.render(this.mousePosition)

    context.restore()

    console.log('frame rendered')
  }
}

export default Game