class BackGround  {
    constructor(ctx, canvasSize) {
        this.ctx = ctx

        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './images/background.jpeg'


        this.positionX = 0,
        this.positionY = 0

    }

    drawBackground() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY, this.canvasSize.w, this.canvasSize.h)
    }

}