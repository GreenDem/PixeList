let form = document.getElementById("form");
let textInput = document.getElementById("textInput");                   // récupération des éléments html
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let category = document.getElementById('category');
let addCateg = document.getElementById('addCateg');

let idElements = 0;

let data = [];                  // définition d'un tableau vide ou seront stockés les données a mettre dans le local storage

form.addEventListener("submit", (e) => { 
e.preventDefault();                             // event sur le bouton du formulaire 
formValidation();                               // appel de la fonction formValidation
});

let createTasks = () => {                       
tasks.innerHTML = "";                          
data.map((data, index) => {                      // on parcours l'objet data qui ous retourne de l'html. il incrémente et ajoute du html en plus de celui qu'il a deja
    return (tasks.innerHTML += `                
    <div id=${index}>
        <span class="fw-bold">${data.text}</span>
        <span class="small text-secondary">${data.date}</span>
        <p>${data.description}</p>

        <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
        </div>
    `);
});

resetForm();  // reset du formulaire après validation
};

let acceptData = () => {  // on pousse ce qu'on a récupéré de l'objet dans le local storage
    data.push({
    text: textInput.value,  // key = text         value = textinput.value
    date: dateInput.value,
    description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));         // on stringify le tableau pour que le local storage l'accepte

    createTasks();
    console.log(data);
};

let formValidation = () => {
    if (textInput.value === "") {               // on vérifie que les champs ne soient pas vides avant de les accepter
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
}

add.setAttribute("data-bs-dismiss", "modal");    // la modal disparait après validation du formulaire
add.click();

(() => {
    add.setAttribute("data-bs-dismiss", "");
})();
};

let resetForm = () => {                 // on reset le formulaire après validation
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
    };

let deleteTask = (e) => {                               // on supprime les tâches de la todolist
    e.parentElement.parentElement.remove();             // supprime l'élément HTML parent de l'élément HTML qui a déclenché l'événement Cela signifie que la ligne entière de la tâche sera supprimée de l'interface utilisateur.

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;  // on modifie les valeurs de l'input selectionné avec une nouvelle valeur
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

(() => {
data = JSON.parse(localStorage.getItem("data")) || [];    // on récupère l'objet dans le local storage en le "parsant" 
console.log(data);
createTasks();    // les datas de l'objet récupérés sont utilisées dans la fonction createTasks
})();

// // function de clonage des listes
// function duplicate(){
//     idElements++;
//     let newtodoList = document.createElement('div')

//     let listCreated = document.getElementById('listToClone');
//     let clonedDiv = listCreated.cloneNode(true);

//     let inputs = document.querySelectorAll('input');

//     console.log(inputs);

//     inputs.forEach(input => {
//         let id = input.getAttribute("id");
//         console.log(id);
//         console.log(idElements);
//         if(id){
//             input.setAttribute('id', id + idElements);
//         }
//     });
//     form.appendChild(clonedDiv);
//     console.log(clonedDiv)
// }

// addCateg.addEventListener('click',duplicate);   