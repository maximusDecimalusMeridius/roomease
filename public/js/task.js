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
        
        if(event.target.dataset.clicked != "true"){
            for(let j = 0; j < _editButtons.length; j++){
                _editButtons[j].dataset.clicked = "false";
                _editButtons[j].parentNode.parentNode.classList.remove("highlight-task");
                _editButtons[j].parentNode.firstElementChild.classList.add("hide");
                _editButtons[j].parentNode.lastElementChild.classList.remove("hide");
            }
            event.target.parentNode.parentNode.firstElementChild.classList.toggle("hide");
            event.target.parentNode.parentNode.firstElementChild.nextElementSibling.classList.toggle("hide");
            event.target.dataset.clicked = "true";
            event.target.parentNode.parentNode.classList.toggle("highlight-task");
            event.target.parentNode.firstElementChild.classList.toggle("hide");
            event.target.parentNode.lastElementChild.classList.toggle("hide");
        } else {
            event.target.parentNode.parentNode.firstElementChild.classList.toggle("hide");
            event.target.parentNode.parentNode.firstElementChild.nextElementSibling.classList.toggle("hide");
            event.target.dataset.clicked = "";
            event.target.parentNode.parentNode.classList.toggle("highlight-task");
            event.target.parentNode.firstElementChild.classList.toggle("hide");
            event.target.parentNode.lastElementChild.classList.toggle("hide");
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