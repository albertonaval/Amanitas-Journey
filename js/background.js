class BackGround  {
    constructor(ctx, canvasSize) {
        this.ctx = ctx

        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './images/background.jpeg'


        this.backgroundPositionX = 0,
        this.backgroundPositionY = 0

    }

    drawBackground() {
        this.ctx.drawImage(
            this.image,
            this.backgroundPositionX,
            this.backgroundPositionY,
            this.canvasSize.w,
            this.canvasSize.h)
    }

}