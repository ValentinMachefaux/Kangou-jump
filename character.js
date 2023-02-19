function Character(left, bottom) {
    this.image = new Image();
    this.image.src = this.file;
    this.current_frame = 0;
    this.jumping = false;
    this.jump_height = 0;
    this.jump_ascending;
    this.rolling = false;
    this.roll_height = 0;
    this.roll_desc;
    this.pos_x = left;
    this.initial_pos_y = bottom - this.height;
    this.stopped = false;
    this.token = true
}
Character.prototype = {
    file: "assets/hero/all_ombre.png",
    width: 75,
    height: 75,
    // Recuperation des frames en selectionnant la position sur l'image
    frames: [
        { left: 150, top: 25 },
        { left: 272, top: 28 },
        { left: 392, top: 28 },
        { left: 512, top: 27 },
        { left: 628, top: 19 },
        { left: 751, top: 24 },
        { left: 875, top: 25 },
        { left: 994, top: 28 },
        { left: 1111, top: 28 },
        { left: 1229, top: 27 },
        { left: 1351, top: 18 },
        { left: 1468, top: 18 },
    ],
    jump_freeze_frame: 4,
    jump_step: function () {
        return (this.jump_max_height * 1.5 - this.jump_height) * 0.3;
    },
    roll_freeze_frame: 1,
    roll_step: function () {
        return (this.roll_max_height * 1.5 - this.roll_height) * 0.3;
    },
    gravity: 8,
    jump_max_height: 150,
    roll_max_height: 40,
    // Fonction pour lancer le saut
    start_jump: function () {
        if (!this.jumping && !this.stopped) {
            this.jumping = true;
            this.jump_ascending = true;
        }
    },
    // Fonction qui stop le saut
    end_jump: function () {
        if (this.jumping) {
            this.jump_ascending = false;
        }
    },
    // Fonction pour lancer le roll
    start_roll: function () {
        if (!this.rolling && !this.stopped) {

            this.rolling = true;
            this.roll_desc = true;
        }
    },
    // Fonction pour stopper le roll
    end_roll: function () {
        if (this.rolling) {
            this.roll_desc = false;

        }
    },
    // Fonction qui vas gerer le saut et l'update
    update: function () {
        if (!this.stopped) {
            if (this.jumping) {
                // same shit, add une frame pour le jump pour la retirer, x:75 y:20
                if (this.frames.length < 13) {
                    this.frames.push({ left: 50, top: 20 })
                }

                this.current_frame = 12;
                if (this.jump_ascending) {
                    if (this.jump_height < this.jump_max_height) {
                        this.jump_height += this.jump_step();
                        this.token = true
                    } else {
                        this.jump_ascending = false;
                    }
                }
            } else
                if (this.rolling) {
                    // idee : ajouter une frame dans le tableau de frame, faire un freeze frame de la frame glissade puis pop la derniere frame
                    if (this.frames.length < 13) {
                        this.frames.push({ left: 5, top: 35 })
                        this.height = 40
                        this.width = 40
                    }
                    this.roll_freeze_frame = 12
                    this.current_frame = this.roll_freeze_frame;
                    if (this.roll_desc) {
                        if (this.roll_height < this.roll_max_height) {
                            this.roll_height += this.roll_step();
                            this.token = false
                        } else {
                            this.roll_desc = false;

                        }
                    }
                } else {

                    while (this.frames.length > 12) {
                        this.frames.pop()
                        this.height = 75
                        this.width = 75

                    }

                    this.current_frame = (this.current_frame + 1) % this.frames.length;
                }
        } else {
            this.current_frame = 4;
        }
        this.jump_height -= this.gravity * 2;
        if (this.jump_height < 0) {
            this.jumping = false;
            this.jump_height = 0;
        }
        this.roll_height -= this.gravity;
        if (this.roll_height < 0) {
            this.rolling = false;
            this.roll_height = 0;

        }
        if (this.token) {
            this.pos_y = this.initial_pos_y - this.jump_height;
        } else {
            this.pos_y = this.initial_pos_y + this.roll_height;
        }

    },
    // Fonction qui dessine la frame
    draw_on: function (ctx) {
        //console.log(this.frames);
        let frame = this.frames[this.current_frame];
        ctx.drawImage(this.image, frame.left, frame.top, this.width, this.height, this.pos_x | 0, this.pos_y | 0, this.width, this.height);
    },
    // Fonction qui cree la collision box du perso ?
    collision_rect: function () {
        return {
            x: (this.pos_x | 0) + 35,
            y: this.pos_y | 0,
            width: this.width - 35,
            height: this.height - 10
        };
    },
    stop: function () {
        this.stopped = true;
    },
    restart: function () {
        this.stopped = false;
    }
}
