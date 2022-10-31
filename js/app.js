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

    init() {
        this.setDimensions()
        this.setContext()
        this.createEnemies()
        this.start()
        this.createPlatforms()

    },


    start() {
        this.reset()

        setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 120 ===  0) this.createPlatforms()
            //if (this.framesCounter % 120 ===  0) this.createEnemies()

            this.clear()
            this.drawAll()
            this.playerPlatformColission()
            this.clearPlatforms()


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
        this.enemies = new Enemies(this.ctx, this.canvasSize)

    },

    createPlatforms() {
        this.platforms.push(new Platforms(this.ctx, this.canvasSize))
    },
    createEnemies() {
        this.enemies.push(new Enemies(this.ctx, this.canvasSize))
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(obs => obs.platformPos.x + obs.platformSize.w - 40 >= 0)
        //console.log(this.platforms)
    },

    drawAll() {
        this.backGround.drawBackground()
        this.player.drawPlayer()
        this.player.move()
        this.player.setEventHandlers()
        this.platforms.forEach(elm => elm.createPlatforms())
        this.enemies.drawEnemies()
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
                    //console.log('izquierda')
                } else if (
                    p.platformPos.x + p.platformSize.w > this.player.playerPos.x &&
                    this.player.playerPos.y > p.platformPos.y
                ) {
                    this.player.playerPos.y = this.canvasSize.h - this.player.playerSize.h
                    this.player.playerPos.x = p.platformPos.x + p.platformSize.w
                    //console.log('derecha')
                }
                else {
                    this.player.playerPos.y = p.platformPos.y - this.player.playerSize.h + 10
                    this.player.canJump = true
                    //console.log('arriba')
                }
            }
        })
    }
}

