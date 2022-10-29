class Player {
    constructor(ctx, canvasSize) {

        this.ctx = ctx

        this.canvasSize = canvasSize

        this.playerSize = {
            w: 100,
            h: 100
        }

        this.playerPos = {
            x: 20,
            y: 680
        }

        this.playerPosJump = this.playerPos.y

        this.playerVel = {
            x: 10,
            y: 30
        }

        this.Physics = { gravity: 0.4 };

        this.playerImg = 'images/seta.png'
        this.imageInstance = undefined


        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImg
    }

    drawPlayer() {
    this.ctx.drawImage(
        this.imageInstance,
        this.playerPos.x,
        this.playerPos.y,
        this.playerSize.w,
        this.playerSize.h)
    }

    move() {
        this.setEventHandlers()
        //this.playerPos.x += this.playerVel.x
        this.playerPos.y += this.Physics.gravity
        this.playerPos.y += this.playerVel.y

        if ( this.playerPos.y < this.playerPosJump) {
        this.playerPos.y += this.playerVel.y
        this.playerVel.y += this.Physics.gravity
        // this.playerPos.x += this.playerVel.x
        // this.playerVel.x += this.Physics.gravity
        } else {
        this.playerPos.y = this.canvasSize.h - this.playerSize.h
        }
    }






    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.playerPos.x -= this.playerVel.x //(10)
                    break;
                case 'ArrowRight':
                    this.playerPos.x += this.playerVel.x
                    break;
                case ' ':
                    //if (this.playerPos.y < this.canvasSize.h - this.playerSize.h - 90) {
                        this.playerPos.y -= this.playerVel.y
                        //this.playerVel += this.gravity
                    break;
            }
        }
    }
}




