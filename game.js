let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 500

const ground_height = 30

let game_screen = document.getElementById("game_screen")
game_screen.insertBefore(canvas,game_screen.children[1])

function new_game() {
    let win = false
    let paused = false
    let game_over = false

    const ground_pos_y = canvas.height - ground_height

    let Character = new Character(100,ground_pos_y)
    let difficulty = 0

    // function restart() {
    // }

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
                    Character.startJump()
                    break
                    
                case 38: // touche flechee haut
                    Character.startJump()
                    break;
                // case 40: // touche flechee bas
                //     Character.startRoll()
                //     break;
                case 27: // touche echap
                    paused = !paused
                    break;
            }
        }
    }
    document.addEventListener("keydown", key_down_listener)

    function key_up_listener(e) {
        key_pressed[e.keyCode] = false
        if (e.keyCode == 32 || e.keyCode == 38) {
            Character.end_jump()
        }
    }
    document.addEventListener("keyup", key_up_listener)

    (function draw() {
        Character.draw_on(ctx)

        setTimeout(draw, 1000/60)
    })()
}

(function check_loaded() {
    if (document.readyState === "complete") {
        new_game()
    } else {
        setTimeout(check_loaded,100)
    }
})()