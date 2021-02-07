import Player from '/src/canvas/Player'
import Bullet from '/src/canvas/Bullet'
import Enemy from '/src/canvas/Enemy'
import Particle from '/src/canvas/Particle'
import { GAME_VALUES, colors } from '/src/constants'
import { randomInt, calculateDistance, randomNum } from '/src/helpers'

// TODO: replace numbers with constants
class Game {
  constructor({ 
    width, 
    height, 
    context, 
    mousePos, 
    handleGameEnd, 
    setScore,
    setFps,
  }) {
    const { ENEMY_SPAWN_RATE } = GAME_VALUES
    window.addEventListener('mousemove',  this.handleMouseMove.bind(this))

    // no longer need click listeners (player will now autofire)
    // window.addEventListener('mousedown', this.handleMouseDown.bind(this))
    // window.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this.handleGameEnd = handleGameEnd
    this.setScore = setScore
    this.setFps = setFps
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
    this.isShooting = true
    this.lastShot = 0
    this.lastFrame = null
    this.score = 0
    this.framesRendered = 0
    this.speedModifier = 0
    this.speedIncremented = false
    this.enemiesPerSpawn = 0
    this.particles = []
  }

  resize({ width, height }) {
    this.height = height
    this.width = width
    this.enemiesPerSpawn = Math.round((width*height) * 0.0000025)
  }

  start() {
    const { enemies, context, width, height, lastFrame } = this
    this.enemiesPerSpawn = Math.round((width*height) * 0.0000025)
    this.isInGame = true
    this.resetScore()
    this.player = new Player({ context, lastFrame })
    this.mousePosition = {x: window.innerWidth/2, y: window.innerHeight/2}
    // TODO: remove test code
    this.lastFrame = Date.now()
    this.update()
  }

  resetScore() {
    this.score = 0
    this.setScore(0)
  }

  incrementScore() {
    this.score++
    this.setScore(this.score)
  }

  endGame() {

    const { ENEMY_SPAWN_RATE } = GAME_VALUES
    this.handleGameEnd()
    this.isInGame = false

  }

  generateNewEnemies() {
    const { player, enemies, context, width, height, lastEnemySpawned, spawnRate, speedModifier } = this

    const { INITIAL_MAX_ENEMY } = GAME_VALUES
    if (Date.now() - lastEnemySpawned > spawnRate && enemies.length < INITIAL_MAX_ENEMY ) {

      for (let i = 0; i < this.enemiesPerSpawn; i++) {
        enemies.push(new Enemy({ context, width, height, pos: this.generateRandomSpawn(), target: player.pos, speedModifier}))
      }
      this.lastEnemySpawned = Date.now()
    }
  }

  generateRandomSpawn() {
    const { width, height } = this
    const { ENEMY_MAX_SIZE } = GAME_VALUES
    const spawnLocations = [
      {x: randomInt(0, width), y: -ENEMY_MAX_SIZE},
      {x: width + ENEMY_MAX_SIZE, y: randomInt(0, height)}, 
      {x: randomInt(0, width), y: height + ENEMY_MAX_SIZE}, 
      {x: -ENEMY_MAX_SIZE, y: randomInt(0, height)}, 
    ]
    return spawnLocations[randomInt(0, 4)]
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

  createExplosion({size, pos, speed, angle}) {
    for (let i = 0; i < size; i++) {
      const particle = new Particle({
        pos,
        context: this.context,
        speed,
        angle,
        size,
      })
      this.particles.push(particle)
    }
  }

  checkCollisions() {
    let start = Date.now()
    const { bullets, enemies, particles, player } = this
    for(let enemy of enemies) {
      const dist = calculateDistance(player.pos, enemy.pos) 
      if (dist < enemy.size + 6) {
        // TODO: LOSE
        this.endGame()
        return false
      }
      for(let bullet of bullets) {
        const dist = calculateDistance(bullet.pos, enemy.pos) 
        if (dist < enemy.size) {
          if (!bullet.delete && !enemy.delete) {
            this.createExplosion(enemy)
            this.incrementScore()
          }
          bullet.destroy()
          enemy.destroy()
        }
      }
    }
    return true
  }

  update() { 
    if(!this.isInGame) {
      return
    }

    const { player, enemies, spawnRate, lastFrame, isInGame } = this
    const { MAX_SPAWN_RATE, FRAME_RATE } = GAME_VALUES

    if (this.isShooting) {
      this.shoot()
    }

    if (this.spawnRate > MAX_SPAWN_RATE) {
      this.spawnRate = spawnRate - (spawnRate/2000)
    }

    

    this.checkCollisions()
    this.generateNewEnemies()
    this.render()
    this.lastFrame = Date.now()
    this.framesRendered++
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
      particles,
      mousePosition,
      lastFrame,
    } = this
    
    const timeElasped = Date.now() - lastFrame
    if (this.framesRendered % 15 === 0) {
      this.setFps(1000/timeElasped)
    }

    context.save()

    // fill background
    context.fillStyle = colors.darkGrey
    context.fillRect(0, 0, width, height)

    player.render(mousePosition, timeElasped)
  
    this.enemies = enemies.filter(enemy => !enemy.delete)
    this.bullets = bullets.filter(bullet => !bullet.delete)
    this.particles = particles.filter(particle => !particle.delete)

    for (let bullet of this.bullets) {
      bullet.render(timeElasped)
    }

    for (let enemy of this.enemies) {
      enemy.render(timeElasped)
    }

    for (let particle of this.particles) {
      particle.render(timeElasped)
    }

    context.restore()
    this.framesRendered++
  }
}

export default Game