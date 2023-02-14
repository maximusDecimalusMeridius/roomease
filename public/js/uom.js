// //tie into HTML elements
let _submitNewTaskButton = document.querySelector("#submit-new-task");
let _uomModal = document.querySelector("#uom-modal");

// //collect buttons
let editMe = document.querySelectorAll(".edit");
let deleteMe = document.querySelectorAll(".delete");

// //new task form fields/data
let editForm = document.querySelector(".edit-uom-form");
// let formAssignee = document.querySelector("#assignee");

let addTask = document.querySelector("#add-task");
let _modalCloseButton = document.querySelector(".close");

let edit = false;
let uomId;

// Add button for new tasks (display modals)
addTask.addEventListener("click", (event) => {
  event.preventDefault();
  _bedCover.style.display = "block";
  _uomModal.style.display = "block";
});

_modalCloseButton.addEventListener("click", () => {
  _bedCover.style.display = "none";
  _uomModal.style.display = "none";
});

// Event listeners for delete buttons
for (let i = 0; i < deleteMe.length; i++) {
  deleteMe[i].addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`/uoms/${event.target.parentNode.parentNode.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        location.href = "/uoms";
      } else {
        console.log(res.error);
      }
    });
  });
}

// Submit new uom button
document.querySelector("#uomForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = getPeeps(document.getElementById("uomForm").elements["u"]);
  const me = getPeeps(document.getElementById("uomForm").elements["me"]);
  const uomObj = {
    what: document.querySelector("#what").value,
    me: me,
    u: u,
    amount: document.querySelector("#amount").value,
  };
  console.log(uomObj);
  fetch("/uoms", {
    method: "POST",
    body: JSON.stringify(uomObj),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      location.reload();
    } else {
      console.log(res.body);
    }
  });
});

function getPeeps(list) {
  return list.options[list.options.selectedIndex].value;
}
// edit post
document.querySelectorAll(".edit").forEach((editButton) => {
  editButton.addEventListener("click", (e) => {
      e.preventDefault();
      uomId = e.target.parentNode.parentNode.id;
      console.log(uomId);

      const editUomForm = document.querySelector(`[data-edit-uom-id="${uomId}"]`);
      
      if(!editUomForm.classList.contains("hide")){
          editUomForm.classList.add("hide");
      } else {
          document.querySelectorAll(".edit-uom-form").forEach((form) => {
              form.classList.add("hide");
          });
          editUomForm.classList.remove("hide");
      }
      
  });
});

document.querySelectorAll(".edit-uom-form").forEach((editUOM) => {
  editUOM.addEventListener("submit", (e) => {
      e.preventDefault();
      const uomObj = {
        what: document.querySelector(`[data-edit-what="${uomId}"]`).value,
        me: document.querySelector(`[data-edit-me="${uomId}"]`).value,
        u: document.querySelector(`[data-edit-u="${uomId}"]`).value,
        amount: document.querySelector(`[data-edit-amount="${uomId}"]`).value,
      };
      fetch(`/uoms/${uomId}`, {
          method: "PUT",
          body: JSON.stringify(uomObj),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => {
              if (res.ok) {
                location.reload();
              }
          })
          .catch((err) => {
              console.log(err);
          });
  });
});