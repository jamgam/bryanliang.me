import Player from '/src/canvas/Player'
import Bullet from '/src/canvas/Bullet'
import Enemy from '/src/canvas/Enemy'
import Particle from '/src/canvas/Particle'
import { GAME_VALUES, colors } from '/src/constants'
import { randomInt, calculateDistance, randomNum } from '/src/helpers/calculations'


class Game {
  constructor({ 
    width, 
    height, 
    context, 
    mousePos, 
    handleGameEnd, 
    setScore,
    setFps,
    setShells,
  }) {
    const { ENEMY_SPAWN_RATE } = GAME_VALUES
    window.addEventListener('mousemove',  this.handleMouseMove.bind(this))
    window.addEventListener('mousedown',  this.handleMouseDown.bind(this))

    this.handleGameEnd = handleGameEnd
    this.setScore = setScore
    this.setFps = setFps
    this.setShells = setShells
    this.isInGame = false
    this.width = width
    this.height = height
    this.context = context
    this.mousePosition = mousePos
    this.player = null
    this.bullets = []
    this.lastEnemySpawned = performance.now()
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
    this.gameStartTime = null
    this.spawnInterval = null
    this.shotgunInterval = null
    this.shotgunCharges = 10
  }

  resize({ width, height }) {
    this.height = height
    this.width = width
    this.enemiesPerSpawn = Math.round((width*height) * 0.0000025)
  }

  start() {
    const { enemies, context, width, height, lastFrame } = this
    const { ENEMY_SPAWN_RATE, MAX_SPAWN_RATE } = GAME_VALUES
    this.enemiesPerSpawn = Math.round((width*height) * 0.0000025)
    this.isInGame = true
    this.resetScore()
    this.player = new Player({ context, lastFrame })
    this.mousePosition = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.lastFrame = performance.now()
    this.gameStartTime = Date.now()

    this.spawnInterval = setInterval(() => {
      this.spawnRate -= (ENEMY_SPAWN_RATE - MAX_SPAWN_RATE)/40
      if (this.spawnRate <= MAX_SPAWN_RATE) {
        clearInterval(this.spawnInterval)
      }
    }, 1000)

    this.shotgunInterval = setInterval(() => {
      if (this.shotgunCharges < 10) {
        this.shotgunCharges++
      }
      this.setShells(this.shotgunCharges)
    }, 1500)

    this.update()
  }

  resetScore() {
    this.score = 0
    this.setShells(10)
    this.setScore(0)
  }

  incrementScore() {
    if(!this.isInGame) return
    this.score++
    this.setScore(this.score)
  }

  endGame() {
    const { ENEMY_SPAWN_RATE } = GAME_VALUES
    clearInterval(this.spawnInterval)
    clearInterval(this.shotgunInterval)
    this.setShells(0)
    this.shotgunCharges = 0
    this.handleGameEnd({time: Date.now() - this.gameStartTime, score: this.score})
    this.isInGame = false
  }

  generateNewEnemies() {

    if (!this.isInGame) {
      return
    }

    const { player, enemies, context, width, height, lastEnemySpawned, spawnRate, speedModifier } = this

    const { INITIAL_MAX_ENEMY } = GAME_VALUES
    if (performance.now() - lastEnemySpawned > spawnRate && enemies.length < INITIAL_MAX_ENEMY ) {
      for (let i = 0; i < this.enemiesPerSpawn; i++) {
        enemies.push(new Enemy({ context, width, height, pos: this.generateRandomSpawn(), target: player.pos, speedModifier}))
      }
      this.lastEnemySpawned = performance.now()
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
    if (this.shotgunCharges > 0 && this.isInGame) {
      this.shotgun()
    }
  }

  handleMouseUp() {
    this.isShooting = false
  }

  shoot() {
    const { FIRE_RATE } = GAME_VALUES
    const { player, width, height, lastShot } = this
    if (performance.now() - lastShot > FIRE_RATE) {
      this.bullets.push(new Bullet({player, width, height}))
      this.lastShot = performance.now()
    }
  }

  shotgun() {
    const { player, width, height } = this
    this.createExplosion({size: 10, pos: player.pos, speed: 1, angle: player.angle})
    for(let i = 0; i < 15; i++) {
      this.bullets.push(new Bullet({player, width, height, shotgun: true}))
    }
    this.setShells(--this.shotgunCharges)
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
    const { bullets, enemies, particles, player } = this
    for(let enemy of enemies) {
      const dist = calculateDistance(player.pos, enemy.pos) 
      if (dist < enemy.size + 6) {
        if (!player.delete) {
          this.createExplosion({pos: player.pos, size: 60})
          this.createExplosion(enemy)
          player.destroy()
          this.endGame()
          break;
        }
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
          break;
        }
      }
    }
  }

  update() {
    const { player, enemies, spawnRate, lastFrame, isInGame } = this
    const { MAX_SPAWN_RATE, FRAME_RATE } = GAME_VALUES

    if (this.isShooting && isInGame) {
      this.shoot()
    }

    this.checkCollisions()
    this.generateNewEnemies()
    this.render()
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
      shotgunCharges,
    } = this
    
    const timeElasped = performance.now() - lastFrame
    this.lastFrame = performance.now()
    this.framesRendered++
    if(this.framesRendered % 25 === 0) {
      this.setFps(1000/timeElasped)
    }
    context.save()

    // fill background
    context.fillStyle = colors.darkGrey
    context.fillRect(0, 0, width, height)

    if (!player.delete) {
      player.render({mousePosition, timeElasped, shotgunCharges})
    }
  
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
  }
}

export default Game