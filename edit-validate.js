
function editForm() {
    let screen = document.querySelector("#screen");
    screen.innerHTML = ""
    screen.style.display = "flex"

    let recap = document.getElementById("recap")
    recap.innerHTML = ""

    recap.style.display = "none"

    let titleScene = document.createElement('h1');
    titleScene.innerHTML = 'Éditeur de niveau';
    screen.appendChild(titleScene);

    let formLevel = document.createElement('form');
    formLevel.id = "form";
    screen.appendChild(formLevel);

    let formLevelSelector = document.querySelector("#form");
    // label et input pour le nom
    let divGetNameLevel = document.createElement("div");
    let getNameLevel = document.createElement("label");
    getNameLevel.htmlFor = "namelevel";
    getNameLevel.innerHTML = "Titre du niveau : ";
    divGetNameLevel.appendChild(getNameLevel);
    let labelNameLevel = document.createElement("input");
    labelNameLevel.type = "text";
    labelNameLevel.id = "namelevel";
    labelNameLevel.minLength = 3;
    labelNameLevel.maxLength = 40;
    labelNameLevel.placeholder = "Niveau de Capybara93";
    labelNameLevel.required = true;
    divGetNameLevel.appendChild(labelNameLevel)
    formLevel.appendChild(divGetNameLevel)

    // label et input pour l'auteur
    let divGetUsername = document.createElement("div");
    let getUsername = document.createElement("label");
    getUsername.htmlFor = "username";
    getUsername.innerHTML = "Nom : ";
    divGetUsername.appendChild(getUsername);
    let labelUsername = document.createElement("input");
    labelUsername.type = "text";
    labelUsername.id = "username";
    labelUsername.minLength = 3;
    labelUsername.maxLength = 20;
    labelUsername.placeholder = "Capybara93";
    labelUsername.required = true;
    divGetUsername.appendChild(labelUsername)
    formLevel.appendChild(divGetUsername)

    // label et radio pour le niveau
    let divGetLevel = document.createElement("div")
    divGetLevel.id = "radioLevel"
    formLevel.appendChild(divGetLevel)

    let legendLevel = document.createElement("legend")
    legendLevel.innerHTML = "Difficulté : "
    divGetLevel.appendChild(legendLevel)

    // on cree les boutons radio pour le ressenti du niveau
    for (let i = 1; i <= 5; i++) {
        let divLevel = document.createElement("div")
        let level = document.createElement("input")
        level.type = "radio"
        level.id = i
        level.name = "chooseLevel"
        level.value = i

        let labelLevel = document.createElement("label")

        labelLevel.htmlFor = String(i)

        labelLevel.innerHTML = i
        if (i === 1) {
            level.checked = true;
        }
        divLevel.appendChild(level)
        divLevel.appendChild(labelLevel)
        divGetLevel.append(divLevel)
    }

    let divButtonValidate = document.createElement("div")
    divButtonValidate.classList.add("validateButton");

    let buttonValidate = document.createElement("input")
    buttonValidate.type = "submit"
    buttonValidate.value = "Validez"
    buttonValidate.id = "validate"

    divButtonValidate.appendChild(buttonValidate)

    let divButtonBackToMenu = document.createElement("div")
    divButtonBackToMenu.classList.add("divButtonBackToMenu");

    let buttonBackToMenu = document.createElement("button")
    buttonBackToMenu.innerHTML = "Retour"
    buttonBackToMenu.id = "editretour"


    buttonBackToMenu.addEventListener('click', function () {
        menuedition.style.display = "none"
        mainmenu.style.display = "block"
    })

    divButtonBackToMenu.appendChild(buttonBackToMenu)
    screen.appendChild(divButtonBackToMenu)


    formLevelSelector.appendChild(divButtonValidate)

    let validate = document.querySelector("#validate");

    let username = document.querySelector("#username");
    let namelevel = document.querySelector("#namelevel");
    let divNbBlocs = document.createElement("div")
    divNbBlocs.classList.add("recapText")

    let textNbBlocs = document.createElement("p")
    let nbBlocs = document.createElement("span")
    textNbBlocs.innerHTML = "Nombre de blocs : "
    nbBlocs.innerHTML = counterNbBlocs()
    textNbBlocs.appendChild(nbBlocs)
    divNbBlocs.appendChild(textNbBlocs)
    divButtonBackToMenu.appendChild(divNbBlocs)

    function counterNbBlocs() {
        let cpt = 0
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains("char") || elements[i].classList.contains("sky") || elements[i].classList.contains("finish")) {
            } else {
                cpt++
            }
        }
        return cpt
    }


    // pour compter le nombre de bloc
    container.addEventListener("click", function () {
        let cpt = counterNbBlocs()
        nbBlocs.innerHTML = cpt
    })

    // pour compter le nombre de bloc si l'utilisateur supprime
    container.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        let cpt = counterNbBlocs()
        nbBlocs.innerHTML = cpt
    })

    validate.addEventListener('click', function () {

        if (username.value.length < 3) {
            alert("Votre nom doit contenir au moins 3 caractères !");
            return;
        }
        else if (namelevel.value.length < 3) {
            alert("Le nom de niveau doit contenir au moins 3 caractères !");
            return;
        }
        else {
            let chosenLevel = document.querySelector("input[type='radio'][name=chooseLevel]:checked").value;
            screen.innerHTML = screen.innerHTML;

            // Récapitulatif 
            let titleScene = document.createElement('h1');
            titleScene.innerHTML = 'Récapitulatif';
            recap.appendChild(titleScene)

            let divEdit = document.createElement('div')
            divEdit.classList.add("divEdit");

            let nameLevel = document.createElement("p")
            nameLevel.innerHTML = "Nom du niveau : " + namelevel.value
            nameLevel.classList.add("recapText")

            let auteur = document.createElement("p")
            auteur.innerHTML = "Auteur : " + username.value
            auteur.classList.add("recapText")

            let difficulty = document.createElement("p")
            difficulty.innerHTML = "Difficulté : " + chosenLevel
            difficulty.classList.add("recapText")

            divEdit.appendChild(auteur)
            divEdit.appendChild(nameLevel)
            divEdit.appendChild(difficulty)
            recap.appendChild(divEdit)

            exportjson(namelevel, username, chosenLevel, divEdit)
        }
        return false;
    })
    // Exporation
    function exportjson(title, user, difficulty, divEdit) {
        container.style.display = "none"
        screen.style.display = "none"

        let listBlock = []

        for (let i = 0; i < elements.length; i++) {
            let dict = { "type": elements[i].className }
            listBlock.push(dict)
        }

        let obj = {
            "title": title.value,
            "creator": user.value,
            "difficulty": difficulty,
            "blocks": listBlock
        };

        let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

        let contentButton = document.createElement('div')
        contentButton.classList.add("contentButton");

        let div = document.createElement('div')
        div.classList.add("divDownload");

        let a = document.createElement('a');
        a.classList.add("editLink");
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Exportez votre niveau';

        // Retour au menu
        let divBack = document.createElement("div")
        divBack.classList.add("divBack");

        let buttonBack = document.createElement("button")
        buttonBack.innerHTML = "Retour au menu"
        buttonBack.id = "return"

        contentButton.appendChild(div)
        div.appendChild(a);
        divBack.appendChild(buttonBack)
        contentButton.appendChild(divBack);
        divEdit.appendChild(contentButton);

        recap.style.display = "block"

        buttonBack.addEventListener('click', function () {
            menuedition.style.display = "none"
            mainmenu.style.display = "block"
        })

    }
}
