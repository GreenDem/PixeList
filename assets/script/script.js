// JS Barre d'xp

let maxBar = 100; // quantite max de la barre
let currentBar = 0; // initialisation à zéro
let progressBar; // Objet JS barre de progression
let intervalId; // 

// Fonction d'initalisation de la barre 
let initialisation = function (){
    progressBar = document.getElementById('progressBar');
    progressBar.value = currentBar;
    progressBar.max = maxBar;
}

// Itération à l'intérieur de la barre de progression 
let displayBar = function (){
    currentBar++;
    progressBar.value = currentBar;
}

// Appel de display barre toute les 100ms
// intervalId = setInterval(displayBar, 100)


// Remise a zero de la barre qd maxBar est atteint
displayBar = function() {
    currentBar++;
    if (currentBar > maxBar) {
        clearInterval(intervalId);
    } else{ 
    progressBar.value = currentBar;
}}

window.onload = function() {
    initialisation();
    intervalId = setInterval(displayBar , 100);
}
