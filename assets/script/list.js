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
tasks.innerHTML = "";                           // 
data.map((dat, index) => {
    return (tasks.innerHTML += `
    <div id=${index}>
        <span class="fw-bold">${dat.text}</span>
        <span class="small text-secondary">${dat.date}</span>
        <p>${dat.description}</p>

        <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
        </div>
    `);
});

resetForm();
};

let acceptData = () => {
    data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    createTasks();
    console.log(data);
};

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
}

add.setAttribute("data-bs-dismiss", "modal");
add.click();

(() => {
    add.setAttribute("data-bs-dismiss", "");
})();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
    };

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

(() => {
data = JSON.parse(localStorage.getItem("data")) || [];
console.log(data);
createTasks();
})();

// function de clonage des listes
function duplicate(){
    idElements++;
    let newtodoList = document.createElement('div')

    let listCreated = document.getElementById('listToClone');
    let clonedDiv = listCreated.cloneNode(true);

    let inputs = document.querySelectorAll('input');

    console.log(inputs);

    inputs.forEach(input => {
        let id = input.getAttribute("id");
        console.log(id);
        console.log(idElements);
        if(id){
            input.setAttribute('id', id + idElements);
        }
    });
    form.appendChild(clonedDiv);
    console.log(clonedDiv)
}

addCateg.addEventListener('click',duplicate);   