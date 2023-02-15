//tie into HTML elements
let _addTaskButton = document.querySelector("#add-task");
let _submitNewTaskButton = document.querySelector("#submit-new-task");
let _taskModal = document.querySelector("#task-modal");

//collect buttons
let _allButtons = document.querySelectorAll(".buttons");
let _saveButtons = document.querySelectorAll(".save-button");
let _editButtons = document.querySelectorAll(".edit");
let _deleteButtons = document.querySelectorAll(".delete");

//new task form fields/data
let formTask = document.querySelector("#task");
let formAssignee = document.querySelector("#assignee");

// Add button for new tasks (display modals)
_addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    _bedCover.style.display = "block";
    _taskModal.style.display = "block";
})

// event listener for edit buttons
for(let i = 0; i < _editButtons.length; i++){
    _editButtons[i].addEventListener("click", (event) => {
        
        let buttonDiv = event.target.parentNode;
        let task = buttonDiv.parentNode.firstElementChild;
        let textarea = buttonDiv.parentNode.firstElementChild.nextElementSibling;

        if(event.target.dataset.clicked != "true"){
            for(let j = 0; j < _editButtons.length; j++){
                _editButtons[j].dataset.clicked = "false";
                _editButtons[j].parentNode.parentNode.classList.remove("highlight-task");
                _editButtons[j].parentNode.firstElementChild.classList.add("hide");
                _editButtons[j].parentNode.lastElementChild.classList.remove("hide");
                _editButtons[j].parentNode.parentNode.firstElementChild.nextElementSibling.classList.add("hide");
                _editButtons[j].parentNode.parentNode.firstElementChild.classList.remove("hide");
            }
            task.classList.toggle("hide");
            textarea.classList.toggle("hide");
            textarea.value = task.textContent; //pre-add old value
            event.target.dataset.clicked = "true";
            buttonDiv.parentNode.classList.toggle("highlight-task");
            buttonDiv.firstElementChild.classList.toggle("hide");
            buttonDiv.lastElementChild.classList.toggle("hide");
        } else {
            buttonDiv.parentNode.firstElementChild.classList.toggle("hide");
            textarea.classList.toggle("hide");
            event.target.dataset.clicked = "";
            buttonDiv.parentNode.classList.toggle("highlight-task");
            buttonDiv.firstElementChild.classList.toggle("hide");
            buttonDiv.lastElementChild.classList.toggle("hide");
        }
    })
}

//event listener for save buttons
for(let i = 0; i < _saveButtons.length; i++){
    console.log("count");
    _saveButtons[i].addEventListener("click", (event) => {
        console.log(event.target.parentNode.parentNode.firstElementChild.nextElementSibling);
        const taskObj = {
            task: event.target.parentNode.parentNode.firstElementChild.nextElementSibling.value
        }

        fetch(`/tasks/${event.target.parentNode.parentNode.dataset.taskId}`, {
            method: "PUT",
            body: JSON.stringify(taskObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                location.href="/tasks"
            } else {
                alert("trumpet sound")
            }
        })
    })
}

// Event listeners for delete buttons
for(let i = 0; i < _deleteButtons.length; i++){
    _deleteButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        fetch(`/tasks/${event.target.parentNode.parentNode.dataset.taskId}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
               location.href="/tasks"
            } else {
                alert("Error!");
            }
        })
    })
}

// Event listeners for submit new task button
_submitNewTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    // let assigneeString = formAssignee.value.split("-");
    // assigneeString = `${assigneeString[0]} ${assigneeString[1]}`;
    const taskObj = {
        task: formTask.value,
        roommate_id: formAssignee.value
    }
    // console.log(taskObj);
    fetch("/tasks",{
        method:"POST",
        body:JSON.stringify(taskObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/tasks"
        } else {
            alert("trumpet sound")
        }
    })
})