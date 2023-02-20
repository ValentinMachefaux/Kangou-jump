let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 512

let game_screen = document.getElementById('game_screen');
game_screen.insertBefore(canvas, game_screen.children[0]);
let get_canvas = document.querySelector('canvas')

let difficulty;
let counter = 0;
let paused = true
let score_display = document.querySelector(".score_display");
let menu_difficulty = document.getElementById("difficulty")

menu_difficulty.addEventListener("click", (e) => {
    difficulty = e.target.value
    //new_game()
    // check_loaded()
})
let interval = setInterval( function(){
    if (!paused) {
        counter++
        score_display.innerHTML = `Score: ${counter}`;
    }
},1000);
function clear_score() {
    counter = 0
    clearInterval(interval)
}
// score()

function new_game() {
    let win = false
    let game_over = false
    let restart = false
    paused=false
    const ground_pos_y = canvas.height - ground_height

    let character = new Character(100, ground_pos_y)
    let blocks = []
    let up_bot = Math.round(Math.random())

    let last_block_add = Date.now() + 5000

    let ennemies_max;
    let token_point = 0

    switch (difficulty) {
        case 1:
            ennemies_max = 10
            break;
        case 2:
            ennemies_max = 20
            break;
        case 3:
            ennemies_max = 30
            break;
        case 4:
            ennemies_max = 40
            break;
        case 5:
            ennemies_max = 50
            break;
        default:
            ennemies_max = 5
            break;
    }

    // Score function


    // let key_pressed = {}

    function restartGame() {
        blocks = [];
        character.restart();
        last_block_add = Date.now();
        game_over = false;
        win = false;
        restart = false;
        token_point = 0
        clear_score()
        score_display.innerHTML = `Score: 0`;
        interval = setInterval( function(){
            if (!paused) {
                counter++
                score_display.innerHTML = `Score: ${counter}`;
            }
        },1000);
            }

    function key_down_listener(e) {
        // if (key_pressed[e.keyCode]) {
        //     return
        // }

        key = e.key.toUpperCase()

        if (key == kbJump.innerHTML.toUpperCase()) {
            character.start_jump()
        }
        if (key == kbSneak.innerHTML.toUpperCase()) {
            character.start_roll()
        }
        if (key == kbPause.innerHTML.toUpperCase()) {
            paused = !paused
        }

        //Supprime la repetition auto des touches
        // key_pressed[e.keyCode] = true

        // if (!game_over && !win) {
        //     switch (e.keyCode) {
        //         case 32: // barre espace
        //             break;

        //         case 38: // touche flechee haut
        //             if (!character.jumping) {
        //                 character.start_jump()
        //             }
        //             break;
        //         case 40: // touche flechee bas
        //             if (!character.rolling) {
        //                 character.start_roll()
        //             }
        //             break;
        //         case 27: // touche echap
        //             paused = !paused
        //             console.log("pause");
        //             break;
        //     }
        // }

        // character.start_jump()
    }
    document.addEventListener("keydown", key_down_listener);

    function key_up_listener(e) {
        // key_pressed[e.keyCode] = false

        key = e.key.toUpperCase()

        if (key == kbJump.innerHTML) {
            character.end_jump()
        }
        if (key == kbSneak.innerHTML) {
            character.end_roll()
        }



        // if (e.keyCode == 32 || e.keyCode == 38) {
        //     character.end_jump()
        // }
        // if (e.keyCode == 40) {
        //     character.end_roll()
        // }
    }
    document.addEventListener("keyup", key_up_listener);

    // Check les collisions
    function check_collision(first, second) {
        let rect1 = first.collision_rect(),
            rect2 = second.collision_rect();

        // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y;
    }


    (function update() {
        if (!paused) {
            if (restart) {
                blocks.forEach(b => b.update());

            } else if (win) {
                alert("Bravo ! \nC'est bien Capy-boy !")

                restart = true;
                blocks.forEach(b => b.stop());
                restartGame();

            } else if (game_over) {
                alert("Perdu ! \nT'es mauvais Capy-boy :'(")

                restart = true;
                blocks.forEach(b => b.stop());
                restartGame();

            } else {
                character.update();

                blocks.forEach(b => {
                    b.update();
                    if (check_collision(character, b)) {
                        if (b.name == "Flag") {
                            console.log("Win");
                            win = true
                            b.stop()
                        } else {
                            console.log("Lost");
                            game_over = true;
                            b.stop();
                        }
                    }
                });
                blocks = blocks.filter(b => b.pos_x > -100);
                if (Date.now() - last_block_add > 1500) {
                    if (Math.random() > 0.5) {
                        // idée: changer le max point en fonction de la difficulté et adapter le spawn d'ennemis
                        if (token_point < ennemies_max) {
                            if (up_bot == 0) {
                                up_bot = Math.round(Math.random())
                                blocks.push(new Block_bot(canvas.width, ground_pos_y));
                                token_point += 1
                            } else {
                                up_bot = Math.round(Math.random())
                                blocks.push(new Block_up(canvas.width, ground_pos_y));
                                token_point += 1
                            }
                        } else if (token_point <= ennemies_max) {
                            blocks.push(new Flag(canvas.width, ground_pos_y - 27));
                        }
                    }
                    last_block_add = Date.now();
                }
            }
        }

        
        setTimeout(update, 60);
    })();
        
    (function update_background() {
        if (!game_over && !win && !paused) {
            update_background_x();
        }
        setTimeout(update_background, 20);
    })();

    (function draw() {
        ctx.fillStyle = "#8110dc"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        switch (difficulty) {
            case "1":
                draw_backgroundrees(ctx, 3.5)
                for (let b of blocks) {
                    b.draw_on(ctx, 16)
                }
                break;
            case "2":
                draw_backgroundrees(ctx, 5.5)
                for (let b of blocks) {
                    b.draw_on(ctx, 20)
                }
                break;
            case "3":
                draw_backgroundrees(ctx, 7.5)
                for (let b of blocks) {
                    b.draw_on(ctx, 24)
                }
                break;
            case "4":
                draw_backgroundrees(ctx, 10)
                for (let b of blocks) {
                    b.draw_on(ctx, 28)
                }
                break;
            default:
                draw_backgroundrees(ctx, 1.5)
                for (let b of blocks) {
                    b.draw_on(ctx, 8)
                }
                break;
        }
        character.draw_on(ctx);

        ctx.fillStyle = 'white';

        // setTimeout(draw, 0.1)
        setTimeout(draw, 1000 / 60)
    })();
}
function check_loaded() {
    if (document.readyState === "complete") {
        //startGame();
        document.getElementById("interface").style.display = "none"
        game_screen.style.display = "block"

        prep_background(canvas.width, canvas.height);
        new_game()
    } else {
        setTimeout(check_loaded, 100)
    }
}
// check_loaded()

