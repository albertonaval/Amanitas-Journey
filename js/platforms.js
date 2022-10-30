class Platforms {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.platformSize = {
            w: 100,
            h: 200
        }
        this.platformPos = {
            x: this.canvasSize.w + 20,
            y: this.canvasSize.h - this.platformSize.h
        }

        this.image = new Image()
        this.image.src = './images/tube.png'
        this.platformVel = 1,

        this.createPlatforms()
    }

    createPlatforms() {
        this.ctx.drawImage(
            this.image,
            this.platformPos.x,
            this.platformPos.y,
            this.platformSize.w,
            this.platformSize.h)

        this.movePlatforms()
    }

    movePlatforms() {
    if (this.platformPos.x <= - this.canvasSize.w) {
        this.platformPos.x = 0
    }
        this.platformPos.x -= this.platformVel
    }
}