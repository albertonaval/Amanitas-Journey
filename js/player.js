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
            y: 20   //this.canvasSize.h - this.playerSize.h - 20
        }

        //this.playerPosJump = this.playerPos.y

        this.playerVel = {
            x: 0,
            y: 1
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



        //this.playerPos.y = this.canvasSize.h - this.playerSize.h - 20
        // if ( this.playerPos.y < this.playerPosJump) {
        // this.playerPos.y += this.playerVel.y
        // this.playerVel.y += this.Physics.gravity
        // } else {
        // this.playerPos.y = this.canvasSize.h - this.playerSize.h
        // }

    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.playerVel.x -= 1 //(10)
                    break;
                case 'ArrowRight':
                    this.playerVel.x += 1
                    break;
                case ' ':
                    this.playerVel.y -= 10 //CAMARA LENTA
                    break;
            }
        }
    }


move() {
    this.playerPos.y += this.playerVel.y
    this.playerPos.x += this.playerVel.x

    if (this.playerVel.x > 2) {
        this.playerVel.x = 2
    } else if (this.playerVel.x < - 2) {
        this.playerVel.x = - 2
    }


    if (this.playerPos.y + this.playerSize.h + this.playerVel.y <= this.canvasSize.h) {
        this.playerVel.y += this.Physics.gravity
    } else {
        this.playerVel.y = 0
    }


    // if (this.playerPos.y >= this.canvasSize.h - this.playerSize.h - 300) {
    //     this.playerVel.y += - 1
    }
}




