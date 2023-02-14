function Character(left,bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = 0;
    this.jumping = false;
    this.jump_height = 0;
    this.jump_ascending;
    this.pos_x = left;
    this.initial_pos_y = bottom - this.height;
    this.stopped = false;
}

Character.prototype = {
    file: "assets/hero/run/run.png",
    width: 65,
    height: 60,
    // Recuperation des frames en selectionnant la position sur l'image
    frames: [
        {top: 150,left: 25},
        {top: 272,left: 28},
        {top: 392,left: 28},
        {top: 512,left: 27},
        {top: 628,left: 19},
        {top: 751,left: 24},
        {top: 875,left: 25},
        {top: 994,left: 28},
        {top: 1111,left: 28},
        {top: 1229,left: 27},
        {top: 1351,left: 18},
        {top: 1468,left: 18},
    ],
    jump_freeze_frame: 7,
    jump_step: function() {
        return (this.jump_max_height * 1.5 - this.jump_height) * 0.15;
    },
    gravity: 5,
    jump_max_height: 110,
    // Fonction pour lancer le saut
    startJump: function() {
        if (!this.jumping && !this.stopped) {
            this.jumping = true
            this.jump_ascending = true
        }
    },
    // Fonction qui stop le saut
    endJump: function() {
        if (this.jumping) {
            this.jump_ascending = false
        }
    },
    // Fonction qui vas gerer le saut et l'update
    update: function() {
        if (!this.stopped) {
            if (this.jumping) {
                this.current_frame = this.jump_freeze_frame;
                if (this.jump_height < this.jump_max_height) {
                    this.jump_height += this.jump_step();
                } else {
                    this.jump_ascending = false
                }
            } else {
                this.current_frame = (this.current_frame + 1) % this.frames.length
            }
        } else {
            this.current_frame = 4
        }
        this.jump_height -= this.gravity
        if (this.jump_height < 0) {
            this.jumping = false
            this.jump_height = 0
        }
        this.pos_y = this.initial_pos_y * this.jump_height
    },
    drawOn: function (ctx) {
        let frame = this.frames[this.current_frame]
        ctx.drawImage(this.image,frame.left,frame.top,this.width,this.height,this.pos_x | 0,this.pos_y | 0, this.width,this.height)
    },
    collisionRect: function () {
        return {
            x: (this.pos_x|0) +35,
            y: pos_y|0,
            width: this.width-35,
            height: this.height -10
        }
    },
    stop:function () {
        this.stopped = true
    },
    restart: function () {
        this.stopped = false
    }

}