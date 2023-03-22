let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let add = document.getElementById("add");
let category = document.getElementById('category');
let msg = document.getElementById("msg");
let categoryInput = document.getElementById('categoryInput');



let pined = 0
let datas = []



form.addEventListener('submit', (even) =>{  // événement sur le bouton vaider du formulaire
    even.preventDefault();
    formValidation();                       // appel de la fonction  formValidation
})

let acceptDatas = () =>{
    datas.push({                                    // on push les éléments dans un tableau
        category: categoryInput.value,
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value,
        //pined : pinedCheckbox.checked
    })
    localStorage.setItem("data", JSON.stringify(datas))   // on stocke le tableau dans le local storage
    read ();                                                // appel de la fonction read
}

function formValidation(){
    if((textInput.value ==="") || (categoryInput.value ==="")){             // on empeche l'utilisateur d'envoyer des champs vide
        console.log('Veuillez renseigner les champs');
        msg.innerHTML = 'Veuillez renseigner ce champ';
    }else{
        console.log('Réussi');
        msg.innerHTML = '';
        acceptDatas();
        resetForm();
    }

}

add.setAttribute("data-bs-dismiss", "modal");       // la modal disparait après validation du formulaire

let resetForm = () => {                 // on reset le formulaire après validation
    categoryInput.value= "";
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
    };

// Fonction read
    let read = () => {
        tasks.innerHTML = "";                                           // on affecte un valeur vide à l'html de la div 'tasks'
        datas.map((datas, index) => {                                   // on utlise map pour attribuer toutes les valeurs du tableau datas dans local storage dans le html
            return (tasks.innerHTML += `
                                            <div class="taskCreated" id=${index}>
                                            <span class="fw-bold">${datas.category}</span>                                      
                                            <span class="fw-bold">${datas.text}</span>
                                            <span class="small text-secondary">${datas.date}</span>
                                            <span class="small text-secondary">${datas.description}</span>
                                            <input type="checkbox" class="checkBox" id="pinedCheckbox">
                                            <span class="options">
                                            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#formModify" class="fas fa-edit"></i>
                                            <i onClick ="deleteTask(this);read()" class="fas fa-trash-alt"></i>
                                            </span>

                                            </div>
                                            `
                    )       
        })
    }
(() => {                                                        // function IIFE - appelée dès sa définition (pareil que window.onLoad)
    datas = JSON.parse(localStorage.getItem('data')) || [];    // on affecte dans datas ce qui se trouve dans le local storage
    let checked = localStorage.getItem('borderColor')
    console.log(datas);
    console.log(checked)
    read();
})();

// UPDATE TASK

let modalTarget = document.querySelectorAll('.modify')                          // on selectionne les éléments html du formulaire de modification
let textInputModify = document.getElementById('textInputModify');
let dateInputModify = document.getElementById('dateInputModify');
let textareaModify = document.getElementById('textareaModify');
let categoryModify = document.getElementById('categoryInputModify');

let editTask = (event) => {
    let editTargetId =event.parentElement.parentElement.id                      // on cible les id des éléments parent au bouton 'edit'

    let category =datas[editTargetId].category                                  // on définit chaque cible que l'on souhaite modifié
    let text = datas[editTargetId].text
    let date=datas[editTargetId].date
    let description = datas[editTargetId].description
    
    modalTarget[0].value=category           
    modalTarget[1].value=text
    modalTarget[2].value=date
    modalTarget[3].value=description   

console.log(editTargetId)
    document.getElementById('modify').addEventListener('click', (e) =>{             // événement sur les éléments qui ont l'id 'modify'
    console.log('On a pas tous la chance de faire du ski en été')
    datas.splice(editTargetId, 1, ({
        category: categoryModify.value,
        text : textInputModify.value,
        date : dateInputModify.value,
        description : textareaModify.value,
    }))
    localStorage.setItem("data", JSON.stringify(datas))                             // on remet les modifcations dans le local storage
    resetFormModify()
    read()
})
}

let resetFormModify = () => {                 // on reset le formulaire après validation
    categoryModify.value= "";
    textInputModify.value = "";
    dateInputModify.value = "";
    textareaModify.value = "";
    };

console.log(document.querySelectorAll(".checkBox"))         // selections des checkboxs dans le html
let checkBoxs=document.querySelectorAll(".checkBox")

checkBoxs.forEach(checkBox => {                             // ajout / suppression d'une classe dans la condition
    checkBox.addEventListener('click', () => {                  // si checked - > contour vert  sinon rien
    if (checkBox.checked==true) {                       
        console.log('ok')
    checkBox.parentElement.classList.add('green')
    localStorage.setItem('borderColor', 'green')
    } else if (checkBox.checked==false) {
        console.log('pas OK')
    checkBox.parentElement.classList.remove('green')
    localStorage.removeItem('borderColor', 'green')
    }
})})


// DELETE FUNCTION
let deleteTask=(del)=>{                                                 // fonction delete du local storage
    del.parentElement.parentElement.remove();                           // on selectionne le parent du parent du bouton delete
    datas.splice(del.parentElement.parentElement.id,1);                 // on choisit quels élement supprimé et combien en supprimé
    localStorage.setItem("data", JSON.stringify(datas));                // on update le local storage
    console.log(datas);
};


// selection des couleurs select

// let select = document.getElementById('colorSelect');
// let selectModif = docuement.getElementById('colorSelectModif');

// select.addEventListener('click', () =>{
//     select.addEventListener('change', () =>{
//         switch (select.value){
//             case lightBlue:

//         }
    
//     })
// })
