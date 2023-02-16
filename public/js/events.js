let _eventModal = document.querySelector("#event-modal");
let _addEventButton = document.querySelector("#add-event");
const eventForm = document.getElementById("eventForm");
const formWhat = document.getElementById("what");
const formDate = document.getElementById("date");
const formTime = document.getElementById("time");
const formAttendees = document.getElementById("attendees");

let edit = false;
let eventId;
let oldAttendeesList = [];

// Add button for new tasks (display modals)
_addEventButton.addEventListener("click", (event) => {
    event.preventDefault();
    _bedCover.style.display = "block";
    _eventModal.style.display = "block";
    edit = false;
    eventForm.reset();
});

eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const attendees = getSelectedAttendees(eventForm.elements["attendees"]);
    const eventObj = {
        what: formWhat.value,
        date: formDate.value,
        time: formTime.value,
        attendees: attendees,
    };
    fetch("/events", {
        method: "POST",
        body: JSON.stringify(eventObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            console.log(res.ok);
            if (res.ok) {
                location.href = "/events";
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
        fetch(`/events/${e.target.parentNode.parentNode.parentNode.dataset.eventId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    location.href = "/events";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

document.querySelectorAll(".edit").forEach((editButton) => {
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        eventId = e.target.parentNode.parentNode.parentNode.dataset.eventId;
        console.log(eventId);

        const editEventForm = document.querySelector(`[data-edit-event-id="${eventId}"]`);

        if (!editEventForm.classList.contains("hide")) {
            editEventForm.classList.add("hide");
        } else {
            document.querySelectorAll(".edit-event-form").forEach((form) => {
                form.classList.add("hide");
            });
            editEventForm.classList.remove("hide");
        }
    });
});

document.querySelectorAll(".edit-event-form").forEach((editEvent) => {
    editEvent.addEventListener("submit", (e) => {
        const editEventForm = document.querySelector(`[data-edit-event-id="${eventId}"]`);
        const attendees = getSelectedAttendees(editEventForm.elements["attendees"]);
        e.preventDefault();
        const eventObj = {
            what: document.querySelector(`[data-edit-what="${eventId}"]`).value,
            date: document.querySelector(`[data-edit-date="${eventId}"]`).value,
            time: document.querySelector(`[data-edit-time="${eventId}"]`).value,
            attendees: attendees,
        };
        fetch(`/events/${eventId}`, {
            method: "PUT",
            body: JSON.stringify(eventObj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    location.href = "/events";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

function getSelectedAttendees(list) {
    var selected = [];
    for (var i = 0; i < list.options.length; i++) {
        if (list.options[i].selected == true) {
            selected.push(list.options[i].value);
        }
    }
    return selected;
}

document.getElementById("close").addEventListener("click", (e) => {
    console.log("close button clicked");
    _eventModal.style.display = "none";
    _bedCover.style.display = "none";
});
