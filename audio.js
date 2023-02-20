let buttonsound = document.getElementById("buttonsound")
let music_bg = document.getElementById("myAudio")

// fonction pour le son
window.addEventListener('load', function () {
    music_bg.volume = 0.1
})
buttonsound.addEventListener('click', function () {
    let x = document.getElementById("sound-on-off")
    if (x.innerHTML === "volume_up") {
        x.innerHTML = "volume_off"
        music_bg.volume = 0
    } else {
        x.innerHTML = "volume_up"
        music_bg.volume = 0.1
        music_bg.play()
    }
})

let buttonSound = new Audio("assets/sound_effects/Crystal_Touch_0.mp3");
document.addEventListener('click', function () {
    buttonSound.play()
})

