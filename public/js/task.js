//tie into HTML elements
let _addTaskButton = document.querySelector("#add-task");
let _submitNewTaskButton = document.querySelector("#submit-new-task");
let _taskModal = document.querySelector("#task-modal");

//collect buttons
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
    let assigneeString = formAssignee.value.split("-");
    assigneeString = `${assigneeString[0]} ${assigneeString[1]}`;
    
    const taskObj = {
        task: formTask.value,
        assignee: assigneeString,
        roomate_id: assignee.dataset.roommateId
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