const app = {
    appName: 'Canvas game',
    version: '1.0.0',
    licensed: undefined,
    author: 'Alexis Marquez & Alberto Naval',
    ctx: undefined,
    FPS: '60',
    framesCounter: 0,
    imageInstance: undefined,
    canvasSize: {
        w: undefined,
        h: undefined,
    },

    backGround: undefined,

    init() {
        this.setDimensions()
        this.setContext()
        this.start()
    },


    start() {

        this.reset()
        setInterval(() => {

            this.clear()
            this.drawAll()


        }, 60)
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
    this.backGround = new BackGround(this.ctx, this.canvasSize)
    },

    drawAll() {
        this.backGround.drawBackground()
    }
}