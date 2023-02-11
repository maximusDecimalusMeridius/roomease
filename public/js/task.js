//tie into HTML elements
let _addButton = document.querySelector("#add-task");
let _submitNewTaskButton = document.querySelector("#submit-new-task");
let _taskModal = document.querySelector("#task-modal");

//collect buttons
let _editButtons = document.querySelectorAll(".edit-button");
let _deleteButtons = document.querySelectorAll(".delete-button");

//new task form fields/data
let formTask = document.querySelector("#task");
let formAssignee = document.querySelector("#assignee");

// Add button for new tasks
_addButton.addEventListener("click", (event) => {
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
    alert("clicked!")
    event.preventDefault();
    const taskObj = {
        task: formTask.value,
        assignee: formAssignee.value
    }
    console.log(taskObj);
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