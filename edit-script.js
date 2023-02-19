// pour recuperer une variable en css
let ele = document.querySelector(':root');
let cs = getComputedStyle(ele);
let numberColumn = cs.getPropertyValue('--main-number-column')


let container = document.getElementById("container")
let elements = container.childNodes;

function editLevel(size) {
    container.style.display = "grid"

    container.innerHTML = ""
    /* ━━━━━━━━━━ CREATION DE LA GRILLE  ━━━━━━━━━━ */
    for (let i = 0; i < size; i++) {
        let div = document.createElement('div');
        // Ligne d'arrivée
        if (i === size - 1) {
            div.classList.add('finish');
        }
        // Ligne d'arrivée
        else if (i === (size - numberColumn - 1)) {
            div.classList.add("finish2")
        }
        // Ligne d'arrivée
        else if (i === (size - 2 * numberColumn - 1)) {
            div.classList.add('finish3');
        }
        // bloc terre dernière ligne de la grid
        else if (i >= size - numberColumn) {
            div.classList.add('floor');
        }
        // position du character
        else if (i === size - 3 * numberColumn) {
            div.classList.add('char');
        }
        // position du character
        else if (i === size - 2 * numberColumn) {
            div.classList.add("char2")
        }
        // le reste c'est du ciel (transparent)
        else {
            div.classList.add('sky');
        }
        container.appendChild(div);

        /* ━━━━━━━━━━ SELECTION 3 CASES  ━━━━━━━━━━ */
        function selectedBlocPer3(i) {
            let tab = []

            let last = null;
            let secondLast = null;
            let thirdLast = null;

            // La ligne en vertical qui met des obstacles au niveau du "floor"
            if (i >= (4 * numberColumn + 1)
                && i <= (5 * numberColumn - 2)) {
                last = elements[i];
                secondLast = elements[i - (1 * numberColumn)];
                thirdLast = elements[i - (2 * numberColumn)];
            }

            // La ligne en vertical qui met des obstacles au niveau du "bas du character"
            else if (i > (3 * numberColumn)
                && i < (4 * numberColumn - 1)) {
                last = elements[i + 1 * numberColumn];
                // + 1 * numbercolumn = descente
                secondLast = elements[i];
                thirdLast = elements[i - numberColumn];
            }

            // La ligne en vertical qui met des obstacles au niveau de la "tête du character"
            else if (i > (2 * numberColumn)
                && i < (3 * numberColumn - 1)) {
                last = elements[i + (2 * numberColumn)];
                secondLast = elements[i + 1 * numberColumn];
                thirdLast = elements[i];
            } else { }
            tab.push(last);
            tab.push(secondLast);
            tab.push(thirdLast);
            return tab;
        }

        /* ━━━━━━━━━━ CLIC GAUCHE ━━━━━━━━━━ */
        div.addEventListener('click', function (e) {
            let last = null;
            let secondLast = null;
            let thirdLast = null;
            // i = index de chaque cellule
            // Affiche l'index de la cellule
            let i = [...elements].indexOf(e.target)

            // Interdiction de poser sur la ligne 1,2 et character et ligne d'arrivée
            // pour ne pas mettre d'obstable sur les deux premières lignes qui sont le ciel et le bloc ou est posé le personnage
            if (i < 2 * numberColumn || i == 4 * numberColumn || div.classList.contains("char") || div.classList.contains("char2") || div.classList.contains("finish") || div.classList.contains("finish1") || div.classList.contains("finish2")) {
                // 0 à nombre de main number-column - 1
                // i < 2 *  main-number-column de CSS
                // i == 4 * 20 = 4 lignes + 1 index/carrés
                // console.log("pas modifiable");
                return;
            }
            else {
                // A : bloc terre
                // B : bloc ciel
                // C : bloc obstacle milieu
                // D : bloc obstacle haut
                // E : bloc du bas

                // T : Terraformation : vert
                // S : Vitesse : bleu ciel
                // M : Multiplicateur : rouge
                // G : Bouclier : gris
                // P : Score : violet 

                // Ligne au niveau de la tête du character
                if (i > 2 * numberColumn && i <= 4 * numberColumn - 2) {
                    if (div.classList.contains("sky")) {
                        div.classList.remove("sky");
                        if (i > 3 * numberColumn) {
                            // B devient C (ciel -> mid)
                            div.classList.add("mid");
                        }
                        else {
                            // B devient D (ciel -> haut)
                            div.classList.add("up");
                        }
                    }
                    // C devient T (up -> terra)
                    else if (div.classList.contains("up") || div.classList.contains("mid")) {
                        div.classList.remove("up");
                        div.classList.remove("mid");
                        div.classList.add("terra");
                    }
                    // T devient S (terra -> speed)
                    else if (div.classList.contains("terra")) {
                        div.classList.remove("terra");
                        div.classList.add("speed");
                    }
                    // S devient M (speed -> multi)
                    else if (div.classList.contains("speed")) {
                        div.classList.remove("speed");
                        div.classList.add("multi");
                    }
                    // M devient G (multi -> shield)
                    else if (div.classList.contains("multi")) {
                        div.classList.remove("multi");
                        div.classList.add("shield");
                    }
                    // G devient P (shield -> score)
                    else if (div.classList.contains("shield")) {
                        div.classList.remove("shield");
                        div.classList.add("score");
                    }
                    // P devient B (score -> ciel)
                    else if (div.classList.contains("score")) {
                        div.classList.remove("score");
                        div.classList.add("sky");
                    }
                }
                else if (i > 4 * numberColumn && i <= 5 * numberColumn - 2) {
                    if (div.classList.contains("floor")) {
                        div.classList.remove("floor");
                        div.classList.add("down");
                    } else {
                        div.classList.remove("down");
                        div.classList.add("floor");
                    }
                }
            }
        })

        div.addEventListener('mouseover', function (e) {
            let i = [...elements].indexOf(e.target)

            // Si c'est les 2 premières lignes où est le character, on ignore
            if (i < 2 * numberColumn || i == 4 * numberColumn || div.classList.contains("char") || div.classList.contains("char2") || div.classList.contains("finish") || div.classList.contains("finish1") || div.classList.contains("finish2")) {
                return;
            }
            else {
                let tab = selectedBlocPer3(i);
                for (let i = 0; i < tab.length; i++) {
                    tab[i].classList.add("hover");
                }
            }
        })

        div.addEventListener('mouseleave', function (e) {
            let i = [...elements].indexOf(e.target)
            // Si c'est les 2 premières lignes où est le character, on ignore
            if (i < 2 * numberColumn || i == 4 * numberColumn || div.classList.contains("char") || div.classList.contains("char2") || div.classList.contains("finish") || div.classList.contains("finish1") || div.classList.contains("finish2")) {
                return;
            }
            else {
                let tab = selectedBlocPer3(i);
                for (let i = 0; i < tab.length; i++) {
                    tab[i].classList.remove("hover");
                }
            }
        })

        /* ━━━━━━━━━━ CLIC DROIT ━━━━━━━━━━ */
        // Rajoute un nouveau bloc à la fin pour qu'on est toujours le même nombre de bloc
        div.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            let i = [...elements].indexOf(e.target)
            // Ne peut pas supprimer le personnage
            if (i < 2 * numberColumn || i == 4 * numberColumn || div.classList.contains("char") || div.classList.contains("char2") || div.classList.contains("finish") || div.classList.contains("finish1") || div.classList.contains("finish2")) {
                return;
            }
            else {
                let tab = selectedBlocPer3(i);
                let counter = 5
                for (let j = 0; j < tab.length; j++) {
                    // Eenleve la class de la cellule qu'on va supprimer
                    tab[j].classList.remove('floor');
                    tab[j].classList.remove('up');
                    tab[j].classList.remove('mid');
                    tab[j].classList.remove('down');
                    tab[j].classList.remove('hover');
                    tab[j].classList.remove('terra');
                    tab[j].classList.remove('speed');
                    tab[j].classList.remove('multi');
                    tab[j].classList.remove('shield');
                    tab[j].classList.remove('score');

                    // Supprime l'element
                    container.removeChild(tab[j])

                    // Si l'élement correspond à la dernière ligne de la grille, on lui ajoute la class "floor"
                    if (counter == 5) {
                        tab[j].classList.add('floor');
                    }
                    // Sinon on lui ajoute la class "sky"
                    else {
                        tab[j].classList.add('sky');
                    }
                    // insertion de l'élement
                    // on commence par la dernière ligne
                    // puis l'avant derniere
                    // et enfin la dernière
                    container.insertBefore(tab[j], elements[counter * numberColumn - 2])

                    // on décrémente pour passer a la ligne au dessus
                    counter--
                }
            }
        }) // listener
    } // for
} // editLevel