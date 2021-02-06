import Player from '/src/canvas/Player'
import Bullet from '/src/canvas/Bullet'
import Enemy from '/src/canvas/Enemy'
import { GAME_VALUES, colors } from '/src/constants'
import { randomInt, calculateDistance } from '/src/helpers'

// TODO: replace numbers with constants
class Game {
  constructor({ width, height, context, mousePos }) {
    const { ENEMY_SPAWN_RATE } = GAME_VALUES
    window.addEventListener('mousemove',  this.handleMouseMove.bind(this))
    window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    window.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this.isInGame = false
    this.width = width
    this.height = height
    this.context = context
    this.mousePosition = mousePos
    this.player = null
    this.bullets = []
    this.lastEnemySpawned = Date.now()
    this.enemies = []
    this.spawnRate = ENEMY_SPAWN_RATE
    this.isShooting = false
    this.lastShot = 0
    this.lastFrame = Date.now()
  }

  resize({ width, height }) {
    this.height = height
    this.width = width
  }

  start() {
    const { enemies, context, width, height, lastFrame } = this
    this.isInGame = true
    this.player = new Player({ context, lastFrame })
    
    // TODO: remove test code
    this.generateNewEnemies()
    this.update()
  }

  generateNewEnemies() {
    const { player, enemies, context, width, height, lastEnemySpawned, spawnRate } = this

    const { ENEMY_MAX_SIZE, INITIAL_MAX_ENEMY } = GAME_VALUES

    if (Date.now() - lastEnemySpawned > spawnRate && enemies.length < INITIAL_MAX_ENEMY ) {
      const spawnLocations = [
        {x: randomInt(0, width), y: -ENEMY_MAX_SIZE},
        {x: width + ENEMY_MAX_SIZE, y: randomInt(0, height)}, 
        {x: randomInt(0, width), y: height + ENEMY_MAX_SIZE}, 
        {x: -ENEMY_MAX_SIZE, y: randomInt(0, height)}, 
      ]
  
      for (let e of spawnLocations) {
        enemies.push(new Enemy({ context, width, height, pos: e, target: player.pos}))
      }
      this.lastEnemySpawned = Date.now()
    }
  }

  handleMouseMove({ offsetX, offsetY}) {
    this.mousePosition = {x: offsetX, y: offsetY}
  }

  handleMouseDown() {
    this.isShooting = true
    const { context, player, width, height } = this
    this.bullets.push(new Bullet({player, width, height}))
  }

  handleMouseUp() {
    this.isShooting = false
  }

  shoot() {
    const { FIRE_RATE } = GAME_VALUES
    const { player, width, height, lastShot } = this
    if (Date.now() - lastShot > FIRE_RATE) {
      this.bullets.push(new Bullet({player, width, height}))
      this.lastShot = Date.now()
    }
  }

  checkCollisions() {
    const { bullets, enemies, player } = this
    for(let enemy of enemies) {
      for(let bullet of bullets) {
        const dist = calculateDistance(bullet.pos, enemy.pos) 
        if (dist < enemy.size) {
          bullet.destroy()
          enemy.destroy()
        }
      }
      const dist = calculateDistance(player.pos, enemy.pos) 
      if (dist < enemy.size + 8) {
        // TODO: LOSE
        enemy.destroy()
      }
    }
  }

  update() { 
    const { player, enemies, spawnRate, lastFrame } = this
    const { MAX_SPAWN_RATE, FRAME_RATE } = GAME_VALUES

    if (this.isShooting) {
      this.shoot()
    }

    if (this.spawnRate > MAX_SPAWN_RATE) {
      this.spawnRate = spawnRate - (spawnRate/1000)
    }
    this.checkCollisions()
    this.generateNewEnemies()
    this.render()

    this.lastFrame = Date.now()
    requestAnimationFrame(() => {this.update()})
  }

  render() {
    const { 
      width, 
      height, 
      context, 
      bullets, 
      player, 
      enemies, 
      mousePosition,
      lastFrame
    } = this
    
    const timeElasped = Date.now() - lastFrame

    context.save()

    // fill background
    context.fillStyle = colors.darkGrey
    context.fillRect(0, 0, width, height)

    player.render(mousePosition, timeElasped)
  
    this.enemies = enemies.filter(enemy => !enemy.delete)
    this.bullets = bullets.filter((bullet) => !bullet.delete)

    for (let bullet of this.bullets) {
      bullet.render(timeElasped)
    }

    for (let enemy of this.enemies) {
      enemy.render(timeElasped)
    }


    context.restore()
  }
}

export default Game