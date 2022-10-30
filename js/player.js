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

        this.playerVel = {
            x: 0,
            y: 1
        }

        this.Physics = { gravity: 0.4 };

        this.playerImg = 'images/seta.png'
        this.imageInstance = undefined

        this.key = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            jump: ' '
        }


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

    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case this.key.left:
                    this.playerVel.x -= 3 //(10)
                    break;
                case this.key.right:
                    this.playerVel.x += 3
                    break;
                case this.key.jump:
                    this.playerVel.y -= 10 //CAMARA LENTA
                    break;
            }
        }
    }

    // setEventHandlers() {
    //     document.onkeyup = event => {
    //         switch (event.key) {
    //             case this.key.left:
    //                 this.playerVel.x = 1 //(10)
    //                 break;
    //             case this.key.right:
    //                 this.playerVel.x = 1
    //                 break;
    //             case this.key.jump:
    //                 this.playerVel.y -= 10 //CAMARA LENTA
    //                 break;
    //         }
    //     }
    // }


move() {
    this.playerPos.y += this.playerVel.y
    this.playerPos.x += this.playerVel.x

    if (this.playerVel.x > 3) {
        this.playerVel.x = 3
    } else if (this.playerVel.x < - 3) {
        this.playerVel.x = - 3
    }


    if (this.playerPos.y + this.playerSize.h + this.playerVel.y <= this.canvasSize.h) {
        this.playerVel.y += this.Physics.gravity
    } else {
        this.playerVel.y = 0
    }
    if (this.playerPos.x >= this.canvasSize.w - this.playerSize.w) {
        this.playerPos.x = this.canvasSize.w - this.playerSize.w }
    if (this.playerPos.x < 0) { this.playerPos.x = 0, this.playerVel.x = 0 }
    if (this.playerPos.y < 0) { this.playerPos.y = 0, this.playerVel.y = 0 }
    }

}


Crafty.init(200, 200);

const dim1 = { x: 5, y: 5, w: 50, h: 50 };
const dim2 = { x: 20, y: 10, w: 60, h: 40 };

const rect1 = Crafty.e("2D, Canvas, Color").attr(dim1).color("red");

const rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Fourway")
  .fourway(2)
  .attr(dim2)
  .color("blue");

rect2.bind("EnterFrame", function () {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    // Collision detected!
    this.color("green");
  } else {
    // No collision
    this.color("blue");
  }
});






