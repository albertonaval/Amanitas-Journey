const app = {
    appName: 'Canvas game',
    version: '1.0.0',
    licensed: undefined,
    author: 'Alexis Marquez & Alberto Naval',
    ctx: undefined,
    FPS: '60',
    framesCounter: 0,

    canvasSize: { w: undefined, h: undefined, },

    backGround: undefined,
    player: undefined,
    platforms: [],
    enemies: [],
    tube: undefined,

    init() {
        this.setDimensions()
        this.setContext()
        this.createEnemies()
        this.createTube()
        this.start()
        this.createPlatforms()


    },


    start() {
        this.reset()

        setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 100 === 0) this.createPlatforms()
            if (this.framesCounter % 400 === 0) this.createEnemies()

            //LA TUBERIA A LOS 292 milisegundos se borra y el personaje deja de hacer COLISION Y SE CAE POR GRAV
            this.clear()
            this.drawAll()
            this.playerPlatformColission()
            this.clearPlatforms()
            this.playerEnemiesCollision()
            this.playerTubeCollision()


        }, 1000 / this.FPS)
    },



    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
        }
        document.querySelector('#myCanvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('#myCanvas').setAttribute('height', this.canvasSize.h)

    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    reset() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.backGround = new BackGround(this.ctx, this.canvasSize)
    },

    createPlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize),
        )
    },
    createEnemies() {
        this.enemies.push(new Enemies(this.ctx, this.canvasSize))

    },

    createTube() {
        this.tube = new Tube(this.ctx, this.canvasSize)
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(obs => obs.platformPos.x + obs.platformSize.w - 10 >= 0)
    },


    clearEnemies() {
        this.enemies = this.enemies.filter(e => e.enemiesPos.x + e.enemiesSize.w - 10 >= 0)
    },



    drawAll() {
        this.backGround.drawBackground()
        this.player.drawPlayer()
        this.player.move()
        this.player.setEventHandlers()
        this.tube.drawTube()
        this.platforms.forEach(platform => platform.drawPlatforms())
        this.enemies.forEach(enemy => enemy.drawEnemies())

        //console.log(this.platforms)
    },

    playerPlatformColission() {

        this.platforms.forEach((p) => {

            if (
                p.platformPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                p.platformPos.x + p.platformSize.w > this.player.playerPos.x &&
                p.platformPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                p.platformSize.h + p.platformPos.y > this.player.playerPos.y
            ) {
                if (
                    p.platformPos.x + p.platformSize.w - 10 > this.player.playerPos.x &&
                    this.player.playerPos.y > p.platformPos.y
                ) {
                    this.player.playerPos.y = this.canvasSize.h - this.player.playerSize.h
                    this.player.playerPos.x = p.platformPos.x - this.player.playerSize.w
                    console.log('izquierda')
                } else if (
                    p.platformPos.x + p.platformSize.w > this.player.playerPos.x &&
                    this.player.playerPos.y > p.platformPos.y
                ) {
                    this.player.playerPos.y = this.canvasSize.h - this.player.playerSize.h
                    this.player.playerPos.x = p.platformPos.x + p.platformSize.w
                    console.log('derecha')
                }
                else {
                    this.player.playerPos.y = p.platformPos.y - this.player.playerSize.h + 10
                    this.player.canJump = true
                    console.log('arriba')
                }
            }

        })
    },

    playerEnemiesCollision() {
        this.enemies.forEach((e) => {
            if (
                e.enemiesPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                e.enemiesPos.x + e.enemiesSize.w > this.player.playerPos.x &&
                e.enemiesPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                e.enemiesSize.h + e.enemiesPos.y > this.player.playerPos.y
            ) {
                if (e.enemiesPos.x + e.enemiesSize.w - 10 > this.player.playerPos.x &&
                    this.player.playerPos.y > e.enemiesPos.y

                ) {
                    this.player.playerPos.y = this.canvasSize.h + this.player.playerSize.h
                } else if (e.enemiesPos.x + e.enemiesSize.w > this.player.playerPos.x &&
                    this.player.playerPos.y > e.enemiesPos.y) {
                    this.player.playerPos.y = this.canvasSize.h + this.player.playerSize.h
                } else {
                    this.player.playerPos.y = e.enemiesPos.y - this.player.playerSize.h + 10
                    e.enemiesPos.y = this.canvasSize.h + e.enemiesSize.h
                    this.player.canJump = true
                }
            }
        })
    },

    playerTubeCollision() {

        if (
            this.tube.tubePos.x < this.player.playerPos.x + this.player.playerSize.w &&
            this.tube.tubePos.x + this.tube.tubeSize.w > this.player.playerPos.x &&
            this.tube.tubePos.y < this.player.playerPos.y + this.player.playerSize.h &&
            this.tube.tubeSize.h + this.tube.tubePos.y > this.player.playerPos.y
        ) {
            this.player.playerPos.y = this.tube.tubePos.y - this.player.playerSize.h + 15
            this.player.canJump = true
            console.log('arriba')

        }

    }
}





























