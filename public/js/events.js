let _eventModal = document.querySelector("#event-modal");
let _addButton = document.querySelector("#add-event");
let _modalCloseButton = document.querySelector(".close");

_addButton.addEventListener("click", (event) => {
    event.preventDefault();
    _bedCover.style.display = "block";
    _eventModal.style.display = "block";
})

_modalCloseButton.addEventListener("click", () => {
    _bedCover.style.display = "none";
    _eventModal.style.display = "none";
});

document.querySelector("#eventForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const attendees = getSelectedAttendees(
        document.getElementById("eventForm").elements["attendees"]
    );
    const eventObj = {
        what: document.querySelector("#what").value,
        date: document.querySelector("#date").value,
        time: document.querySelector("#time").value,
        attendees: attendees,
    };
    console.log(eventObj);
    fetch("/events", {
        method: "POST",
        body: JSON.stringify(eventObj),
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => {
        console.log(res);
        if (res.ok) {
            alert("event added to database");
        } else {
            alert("could not process inputted data");
        }
    });
});

document.querySelectorAll(".delete-button").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
        console.log(e.target.parentNode.parentNode.parentNode);
        e.target.parentNode.parentNode.parentNode.remove();
    });
});

function getSelectedAttendees(list) {
    var selected = [];
    for (var i = 1; i < list.options.length; i++) {
        if (list.options[i].selected == true) {
            selected.push(list.options[i].value);
        }
    }
    return selected;
}
function reloadThePage() {
    window.location.reload(true);
}
