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


form.addEventListener('submit', (even) =>{
    even.preventDefault();
    formValidation();
})

let acceptDatas = () =>{
    datas.push({
        category: categoryInput.value,
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value,
        //pined : pinedCheckbox.checked
    })
    localStorage.setItem("data", JSON.stringify(datas))
    read ();
}

function formValidation(){
    if((textInput.value ==="") || (categoryInput.value ==="")){
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
        tasks.innerHTML = "";
        datas.map((datas, index) => {
            return (tasks.innerHTML += `
                                            <div id=${index}>
                                            <span class="fw-bold">${datas.category}</span>
                                            <span class="fw-bold">${datas.text}</span>
                                            <span class="small text-secondary">${datas.date}</span>
                                            <span class="small text-secondary">${datas.description}</span>
                                            <input type="checkbox" id="pinedCheckbox" onchange="pinedElement(this)"">
                                            <span class="options">
                                            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#formModify" class="fas fa-edit"></i>
                                            <i onClick ="deleteTask(this);read()" class="fas fa-trash-alt"></i>
                                            </span>

                                            </div>
                                            `
                    )       
        })
    }
(() => {
    datas = JSON.parse(localStorage.getItem('data')) || [];
    console.log(datas);
    read();
})();

// UPDATE TASK

let modalTarget = document.querySelectorAll('.modify')
let textInputModify = document.getElementById('textInputModify');
let dateInputModify = document.getElementById('dateInputModify');
let textareaModify = document.getElementById('textareaModify');
let categoryModify = document.getElementById('categoryInputModify');




let editTask = (event) => {
    let editTargetId =event.parentElement.parentElement.id

    let category =datas[editTargetId].category
    let date=datas[editTargetId].date
    let description = datas[editTargetId].description
    let text = datas[editTargetId].text

    modalTarget[0].value=category
    modalTarget[1].value=text
    modalTarget[2].value=date
    modalTarget[3].value=description   

console.log(editTargetId)
    document.getElementById('modify').addEventListener('click', (e) =>{
    console.log('On a pas tous la chance de faire du ski en été')
    datas.splice(editTargetId, 1, ({
        category: categoryModify.value,
        text : textInputModify.value,
        date : dateInputModify.value,
        description : textareaModify.value,
    }))
    localStorage.setItem("data", JSON.stringify(datas))
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
