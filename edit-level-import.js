// Récupération du dropzone
const dropzone = document.getElementById('dropBox');

// Empêche le comportement par défaut lorsqu'un fichier est déposé sur la page
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Récupération des données du fichier déposé sur le dropzone
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    // Vérification que le fichier est bien au format JSON
    if (file.type === 'application/json') {

        // Création d'un objet FileReader pour lire le contenu du fichier
        const reader = new FileReader();

        // Lecture du contenu du fichier
        reader.readAsText(file);

        // Traitement du contenu du fichier lorsqu'il est lu
        reader.addEventListener('load', (e) => {
            const jsonContent = e.target.result;
            const jsonData = JSON.parse(jsonContent);
            alert("Nous avons bien reçu votre fichier JSON !")
        });
    } else {
        alert("Erreur, nous n'acceptons que des fichiers JSON")
    }
});
