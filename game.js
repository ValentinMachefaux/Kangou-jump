let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 500

const ground_height = 30

let game_screen = document.getElementById("game_screen")
game_screen.insertBefore(canvas,game_screen.children[0])

function new_game() {
    let win = false
    let paused = false
    let game_over = false
    
    const ground_pos_y = canvas.height - ground_height
    
    let character = new Character(100,ground_pos_y)
    let block_bot = []
    let last_block_add = Date.now() + 5000
    let difficulty = 0
    
    let key_pressed = {}

    function key_down_listener(e) {
        // Supprime la repetition auto des touches
        if (key_pressed[e.keyCode]) {
            return 
        }

        key_pressed[e.keyCode] = true

        if (!game_over && !win) {
            switch (e.keyCode) {
                case 32: // barre espace
                    character.start_jump()
                    break;
                    
                case 38: // touche flechee haut
                    character.start_jump()
                    break;
                case 40: // touche flechee bas
                    character.start_roll()
                    break;
                case 27: // touche echap
                    paused = !paused
                    console.log("pause");
                    break;
            }
        }
    }
    document.addEventListener("keydown", key_down_listener);

    function key_up_listener(e) {
        
        key_pressed[e.keyCode] = false

        if (e.keyCode == 32 || e.keyCode == 38) {
            character.end_jump()
        }
        if (e.keyCode == 40) {
            character.end_roll()
        }
    }
    document.addEventListener("keyup", key_up_listener);

    function check_collision(first, second) {
        let rect1 = first.collision_rect(),
            rect2 = second.collision_rect();

        // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.height + rect1.y > rect2.y;
    }


    // (function update() {
    //     if (!paused) {
    //         character.update()
            
    //         block_bot.forEach(b => {
    //             b.update()
    //             if (check_collision(character,b)) {
    //                 game_over = true

    //             }
    //         })

    //         block_bot = block_bot.filter(b => b.pos_x > -100);
    //         if (Date.now() - last_block_add > 1700) {
    //             if (Math.random() > 0.5) {
    //                 block_bot.push(new Block_bot(canvas.width, ground_pos_y));
    //             }
    //             last_block_add = Date.now();
    //         }

    //     }
    //     setTimeout(update,50)
    // })();
    (function update() {
        if (!paused) {
                character.update();

                block_bot.forEach(b => {
                    b.update();
                    if (check_collision(character, b)) {
                        game_over = true;
                        b.attack();
                    }
                });

                block_bot = block_bot.filter(b => b.pos_x > -100);
                if (Date.now() - last_block_add > 1700) {
                    if (Math.random() > 0.5) {
                        console.log("add block");
                        block_bot.push(new Block_bot(canvas.width, ground_pos_y));
                    }
                    last_block_add = Date.now();
                }

                if (difficulty >= 1) {
                    gameWon = true;
                }
            }
        
        setTimeout(update, 50);
    })();

    // (function updateBackground() {
    //     if (!game_over && !win && !paused) {
    //         updateGroundAndBackTrees(difficulty)
    //         updateForeTrees(difficulty)
    //         if (difficulty < 1) {
    //             difficulty += 0.0001
    //         }
    //     }
    //     setTimeout(updateBackground,20)
    // })();

    (function draw() {
        ctx.fillStyle = '#81738e';
        ctx.fillRect(0,0,canvas.width,canvas.height)

        //drawGroundAndBackTrees(ctx)
        character.draw_on(ctx)

        for (let b of block_bot) {
            b.draw_on(ctx)
        }
        //drawForeTrees(ctx)
        ctx.fillStyle = 'white';


        setTimeout(draw, 1000/60)
    })();
}

(function check_loaded() {
    if (document.readyState === "complete") {
        //prepareBackground(canvas.width,canvas.height)
        //prepareTrees()
        new_game()
    } else {
        setTimeout(check_loaded,100)
    }
})()

