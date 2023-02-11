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
