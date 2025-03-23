// {
//   id: Number,
//   descricao: String,
//   create_at: Date,
//   prioridade: number // 0 - 5 onde 0 e maior prioridade do que 5
//   concluido: Boolean // true == concluido, false não concluido  
// }
let showModal = false;
let toDoList = [];//idList = 1
let toDoListFinished = []; //idList = 2
let elementToDoList;
let elementToDoListFinished;

function init() {
    elementToDoList = document.getElementById("toDoList");
    elementToDoListFinished = document.getElementById("toDoListFinished");
    getSavedList(1);
    getSavedList(2);
}

function getSavedList(idList){
    if(idList == 1){
        let listStr = localStorage.getItem("toDoList");
        if(listStr){
            listStr = JSON.parse(listStr);
            listStr = listStr.map((e)=>{
                return JSON.parse(e);
            });
            console.log(listStr);
            listStr.forEach(element => {
                addElementList(element, 1);
            });
        }
    }else{
        let listStrFinished = localStorage.getItem('toDoListFinished');
        if(listStrFinished){
            listStrFinished = JSON.parse(listStrFinished);
            listStrFinished = listStrFinished.map((e)=>{
                return JSON.parse(e);
            });
            console.log(listStrFinished);
            listStrFinished.forEach(element => {
                addElementList(element, 2);
            });
        }
        //Implementar buscar lista de tarefas concluidas na memoria
    }
}

function addElementList(item, idList){
    if(idList == 1){
        toDoList.push(item);
        makeHtmlList(item, idList);
        let listStr = toDoList.map((e)=>{
            return JSON.stringify(e);
        });
        localStorage.setItem("toDoList", JSON.stringify(listStr));
    }else{
        toDoListFinished.push(item);
        makeHtmlList(item, idList);
        let listStrFinished = toDoListFinished.map((e)=>{
            return JSON.stringify(e)});
        localStorage.setItem('toDoListFinished', JSON.stringify(listStrFinished));
        //Implementar salvar item na memoria
    }
    resetForm();
    closeModal();
}

function makeHtmlList(item, idList){
    let elementLi = createElementLi(item, idList);
    if(idList == 1){
        elementToDoList.appendChild(elementLi)
    }else{
        elementToDoListFinished.appendChild(elementLi);
    }
}

function createElementLi(item, idList){
    let li = document.createElement('li');
    li.setAttribute("id", item.id);
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "completeTask("+item.id+")");
    let p = document.createElement("p");
    p.innerText = item.descricao;
    if(idList != 2){
        li.appendChild(checkbox);
    }
    li.appendChild(p);
    li.classList.add("to-do-item");
    return li;
}

function createItemList(id, descricao, prioridade, concluido = false){
    return {
        id: Number(id),
        descricao: descricao,
        create_at: Date.now(),
        prioridade: prioridade,
        concluido: concluido
    };
}

function onSubmit(event){
    event.preventDefault();
    let form = document.getElementById("formToDo");
    let item = createItemList(form.itemId.value, form.descricao.value, form.prioridade.value, form.concluido.checked);
    if(item.concluido){
        addElementList(item, 2);
    }else{
        addElementList(item, 1);
    }
}

function resetForm(){
    let form = document.getElementById("formToDo");
    form.reset();
}

function openModal(){
    const modal = document.getElementById("modalForm");
    modal.classList.add("open");
}

function closeModal(){
    const modal = document.getElementById("modalForm");
    if(modal.classList.contains("open")){
        modal.classList.remove("open");
    }
}

function completeTask(id){
    const item = toDoList.filter((e)=> e.id === id)[0];
    if(item){
        removeElementList(item, 1);
        addElementList(item, 2);
    }
}

function deleteTaks(id, idList){
    if(idList == 1){
        const item = toDoList.filter((e)=> e.id === id)[0];
        if(item){
            removeElementList(item, 1);
        }
    }else{
        const item = toDoListFinished.filter((e)=> e.id === id)[0];
        if(item){
            removeElementList(item, 2);
        }
    }
}

function removeElementList(item, idList){
    if(idList == 1){
        let i = toDoList.findIndex((e)=>e.id == item.id);
        if(i != -1){
            toDoList = toDoList.filter((e)=> e.id != item.id);
            let list = document.getElementById("toDoList");
            for(let idx = 0; idx < list.children.length; idx++){
                let idElement = Number(list.children[idx].id);
                if(idElement == item.id){
                    list.removeChild(list.children[idx]);
                }
            }
        }
    }else{
        let i = toDoListFinished.findIndex((e)=>e.id == item.id);
        if(i != -1){
            toDoListFinished = toDoListFinished.filter((e)=> e.id != item.id);
            let list = document.getElementById("toDoListFinished");
            for(let idx = 0; idx < list.children.length; idx++){
                let idElement = Number(list.children[idx].id);
                if(idElement == item.id){
                    list.removeChild(list.children[idx]);
                }
            }
        }
    }

}

document.addEventListener("DOMContentLoaded", init);