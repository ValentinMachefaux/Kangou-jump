function Block_up(left,bottom) {
    this.name = "Block_up"
    this.image = new Image();
    this.image.src = this.file;
    this.inner_counter = 0;
    this.current_frame = this.frames.length - 1;
    this.effective_width = (this.width * this.scale_factor) | 0;
    this.effective_height = (this.height * this.scale_factor) | 0;
    this.pos_x = left;
    this.pos_y = bottom - this.effective_height*2.2;
    this.speed = 8;
    this.stopped = false;
    this.attacking = false
}

Block_up.prototype = {
    file: 'assets/images/block_up.png',
    width: 50,
    height: 50,
    scale_factor: 1,
    frames: [
        { top: 0, left: 0 },
    ],
    update: function() {
        if (!this.stopped) {
            this.inner_counter += 1;
            if (this.inner_counter % 2 == 0) {
                this.inner_counter = 0;
                this.current_frame = this.current_frame - 1;
                if (this.current_frame < 0) {
                    this.current_frame += this.frames.length;
                }
            }
            if (!this.attacking) {
                this.pos_x -= this.speed;
            }
        }
    },
    draw_on: function(ctx, difficulty) {
        let frame = this.frames[this.current_frame];
        this.speed = difficulty;
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x | 0, this.pos_y | 0, this.effective_width, this.effective_height);        // console.log('ennemie Y',this.pos_y, '\nennemie X', this.pos_x);
    },
    collision_rect: function() {
        return {
            x: this.pos_x | 0,
            y: this.pos_y | 0,
            width: this.effective_width,
            height: this.effective_height
        };
    },
    stop: function() {
        this.stopped = true;
    }
}