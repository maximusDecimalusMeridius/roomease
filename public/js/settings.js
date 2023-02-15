const settingsForm = document.getElementById("settings");

// if a user tries to submit the form with either the first_name, email, or home as empty, then
settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
