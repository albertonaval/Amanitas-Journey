const app = {
    appName: 'Canvas game',
    version: '1.0.0',
    licensed: undefined,
    author: 'Alexis Marquez & Alberto Naval',
    ctx: undefined,
    FPS: '60',
    framesCounter: 0,

    canvasSize: {  w: undefined,  h: undefined, },

    backGround: undefined,
    player: undefined,
    platforms : [],

    init() {
        this.setDimensions()
        this.setContext()
        this.start()

        //console.log(this.player)
    },


    start() {
    this.reset()
        setInterval(() => {

            this.framesCounter++
            if(this.framesCounter % 100 === 0) this.createPlatforms()

            this.clear()
            this.drawAll()


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
        this.ctx.clearRect(0,0,this.canvasSize.w, this.canvasSize.h)
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    reset() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.backGround = new BackGround(this.ctx, this.canvasSize)

    },

    createPlatforms(){
        this.platforms.push(new Platforms(this.ctx, this.canvasSize))
        },

    drawAll() {
        this.backGround.drawBackground()
        this.player.drawPlayer()
        this.player.move()
        this.player.setEventHandlers()
        this.platforms.forEach(elm => elm.createPlatforms())
    }

}