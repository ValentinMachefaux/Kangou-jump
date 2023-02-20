// fonction pour changer de menu
let before_start = document.getElementById("before_game")

let buttonstart = document.getElementById("buttonstart")

let menumode = document.getElementById("menuMode")
let mainmenu = document.getElementById("mainmenu")

document.addEventListener('keydown', function () {
  before_start.style.display = "none"
  mainmenu.style.display = "block"
  music_bg.play()
}, { once: true })

buttonstart.addEventListener('click', function () {
  mainmenu.style.display = "none"
  menumode.style.display = "block"
})

let menuOption = document.getElementById("menuOption")
let buttonoption = document.getElementById("buttonoption")

buttonoption.addEventListener('click', function () {
  menuOption.style.display = "block"
  mainmenu.style.display = "none"
})

let buttonadventure = document.getElementById("buttonadventure")
let menuniveau = document.getElementById("menuNiveau")

buttonadventure.addEventListener('click', function () {
  menuniveau.style.display = "block"
  menumode.style.display = "none"
})

let menuimport = document.getElementById("menuImport")
let buttonimport = document.getElementById("buttonimport")

buttonimport.addEventListener('click', function () {
  menuimport.style.display = "block"
  menumode.style.display = "none"
})

let menuedition = document.getElementById("menuedition")
let bouttonedition = document.getElementById("bouttonedition")
let displayEditLevel = document.getElementById("editLevel")

bouttonedition.addEventListener('click', function () {
  menuedition.style.display = "block"
  mainmenu.style.display = "none"
  displayEditLevel.style.display = "flex"
  editLevel(5 * numberColumn)
  editForm()
})

let menutouche = document.getElementById("menuTouche")
let buttontouch = document.getElementById("buttontouch")

buttontouch.addEventListener('click', function () {
  menutouche.style.display = "block"
  menuOption.style.display = "none"
})

/*fonction pour le SAINT-RETOUR*/
let mainretour1 = document.getElementById("mainRetour1")
mainretour1.addEventListener('click', function () {
  menumode.style.display = "none"
  mainmenu.style.display = "block"
})
let mainretour2 = document.getElementById("mainRetour2")
mainretour2.addEventListener('click', function () {
  menuOption.style.display = "none"
  mainmenu.style.display = "block"
})

let playretour1 = document.getElementById("playRetour1")
playretour1.addEventListener('click', function () {
  menuniveau.style.display = "none"
  menumode.style.display = "block"
})

let playretour2 = document.getElementById("playRetour2")
playretour2.addEventListener('click', function () {
  menuimport.style.display = "none"
  menumode.style.display = "block"
})

let retouroption = document.getElementById("retourOption")
retouroption.addEventListener('click', function () {
  menutouche.style.display = "none"
  menuOption.style.display = "block"
})


// fonction pour toggle Thari
let buttonDarkMode = document.getElementById("buttonDarkMode")
buttonDarkMode.addEventListener('click', function () {
  let element = document.body;
  element.classList.toggle("dark-mode");

  if (element.classList.contains("dark-mode")) {
    buttonDarkMode.innerHTML = '<span class="material-icons">light_mode</span>'
  } else {
    buttonDarkMode.innerHTML = '<span class="material-icons">dark_mode</span>'
  }
})

/*Recup les touche pour Tonton Valette*/
let kbStartGame = document.getElementById("kbStartGame")
let kbJump = document.getElementById("kbJump")
let kbSneak = document.getElementById("kbSneak")
let kbPause = document.getElementById("kbPause")
let kbResume = document.getElementById("kbResume")
let kbRestart = document.getElementById("kbRestart")
let kbQuitLevel = document.getElementById("kbQuitLevel")

let keyBind = new Map()
keyBind.set(kbStartGame.id, "KeyG")
keyBind.set(kbJump.id, "ArrowUp")
keyBind.set(kbSneak.id, "ArrowDown")
keyBind.set(kbPause.id, "KeyP")
keyBind.set(kbResume.id, "KeyP")
keyBind.set(kbRestart.id, "KeyR")
keyBind.set(kbQuitLevel.id, "KeyA")

// for (let [key, value] of keyBind) {
//   console.log(key, value)
// }
function verifiedKb(kbId, e) {
  for (let [key, value] of keyBind) {
    if (kbId.id == key) {
      if (e == value) {
      }
    }
    else if (e != value) {
    }
    else {
      if (kbId.id == "kbPause" || kbId.id == "kbResume") {
        if (e == keyBind.get(kbPause.id) || e == keyBind.get(kbResume.id)) {
          console.log("exception")
          return true
        }
      }
      alert("Cette touche est déjà attribuée a une autre commande !")
      return false
    }
  }
  return true
}

let popup = document.getElementById('pop-up')

function checkKb(keyBoardButton) {
  let keyB
  // affichage du pop-up lors du clique
  popup.style.display = 'block'
  window.addEventListener("keydown", (event) => {
    popup.style.display = 'none'
    let x = event.code
    if (verifiedKb(keyBoardButton, x)) {
      keyBoardButton.innerHTML = event.key
      keyB = event.code
    } else {
      keyBoardButton.innerHTML = keyBoardButton.innerHTML
      keyB = keyBind.get(keyBoardButton.id)
    }
    keyBind.set(keyBoardButton.id, keyB)
    // for (let [key, value] of keyBind) {
    //   console.log(key, value)
    // }
  }, { once: true })
}

//GAME START
kbStartGame.addEventListener('click', function () {
  checkKb(kbStartGame)
})

//JUMP
kbJump.addEventListener('click', function () {
  checkKb(kbJump)
})

//SNEAK
kbSneak.addEventListener('click', function () {
  checkKb(kbSneak)
})

//PAUSE
kbPause.addEventListener('click', function () {
  checkKb(kbPause)
})

//RESUME
kbResume.addEventListener('click', function () {
  checkKb(kbResume)
})

//RESTART
kbRestart.addEventListener('click', function () {
  checkKb(kbRestart)
})

//QUITLEVEL
kbQuitLevel.addEventListener('click', function () {
  checkKb(kbQuitLevel)
})

/*
//fonction menu pause pendant le jeu
let menupause = document.getElementById("menuPause")
let pausebutton = document.getElementById("buttonpause")
menupause.classList.add("menuPause")

pausebutton.addEventListener('click', function(){
  menupause.classList.toggle("menuPause")
})
//fontion pour Reprendre
function resume() {
}

//fonction quitter le niveau
function quitLevel() {
}

//FONCTION POUR LE MENU DE FIN

//fonction pour continuer
function next() {
}

//fonction pour quitter
function quit() {
}

// keyBind.forEach(function(value, key) {
//   console.log(`${key} = ${value}`);
// });
*/