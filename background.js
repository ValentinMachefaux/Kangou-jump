let backgroundImage = new Image();
backgroundImage.src = 'assets/images/background2.png';

const ground_height = 112;

let groundOffsetX = 0;

function update_background_x() {
    groundOffsetX = (groundOffsetX - 2) % 1920; // least common multiple of 128 and 30
}

function prep_background_draw(spriteInfo, canvasWidth, canvasHeight, posY) {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = canvasWidth + spriteInfo.width;
    canvas.height = spriteInfo.height;

    for (let offsetX = 0; offsetX < canvas.width; offsetX += spriteInfo.width) {
        ctx.drawImage(backgroundImage, spriteInfo.spriteX, spriteInfo.spriteY, spriteInfo.spriteWidth, spriteInfo.spriteHeight, offsetX, 0, spriteInfo.width, spriteInfo.height);
    }

    return function (mainCtx, offsetX) {
        mainCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, offsetX % spriteInfo.width, posY, canvas.width, canvas.height);
    }
}

let drawBackGround;
function prep_background(canvasWidth, canvasHeight) {
    let back = {
        spriteX: 0,
        spriteY: 0,
        spriteWidth: 700,
        spriteHeight: 350,
        width: 800,
        height: 512
    };
    drawBackGround = prep_background_draw(back, canvasWidth, canvasHeight,0);

}

function draw_backgroundrees(ctx, difficulty) {
    let canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height;

    drawBackGround(ctx, Math.ceil(groundOffsetX * difficulty));
}
// ######################################################

// let myBackground;

// function startGame() {
//     myBackground = new Background(800, 512, 0, 0, "background");
//     myGameArea.start();
// }

// // Arrière plan du jeu

// let myGameArea = {
//     canvas: document.createElement("canvas"),


//     start: function () {
//         this.canvas.width = 800;
//         this.canvas.height = 512;
//         this.context = this.canvas.getContext("2d");
//         document.getElementById("game_screen").insertBefore(this.canvas, document.getElementById("game_screen").childNodes[0]);
//         this.frameNo = 0;
//         this.interval = setInterval(updateGameArea, 20);

//     },
    // clear: function () {
    //     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // },
//     stop: function () {
//         clearInterval(this.interval);
//     }

// }
// function Background(width, height, x, y, type) {
//     this.type = type;
//     if (type == "image" || type == "background") {
//         this.image = new Image();
//         this.image.src = "assets/background2.png";
//     }
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;
//     this.update = function () {
//         ctx = myGameArea.context;
//         if (type == "image" || type == "background") {
//             ctx.drawImage(this.image,
//                 this.x,
//                 this.y,
//                 this.width, this.height);
//             if (type == "background") {
//                 ctx.drawImage(this.image,
//                     this.x + this.width,
//                     this.y,
//                     this.width, this.height);
//             }
//         } else {
//             ctx.fillStyle = this.image.src;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
//     this.newPos = function () {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         if (this.type == "background") {
//             if (this.x == -(this.width)) {
//                 this.x = 0;
//             }
//         }
//     }
// }
// // dessiner l'arrière plan

// function updateGameArea() {
//     //myGameArea.clear();
//     myBackground.speedX = -1;
//     myBackground.newPos();
//     myBackground.update();

// }