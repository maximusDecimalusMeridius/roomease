const settingsForm = document.getElementsByClassName("submitBtn")[0];

// if a user tries to submit the form with either the first_name, email, or home as empty, then
settingsForm.addEventListener("click", (e) => {
  e.preventDefault();
  let roommateId = e.target.id
  const userObj = {
      first_name: document.querySelector(`[data-edit-fname="${roommateId}"]`)
      .value,
      last_name: document.querySelector(`[data-edit-lname="${roommateId}"]`)
      .value,
    };
    console.log(userObj.last_name +" " +userObj.first_name)
  if (userObj.first_name===""){
    alert("Roommate must have a first name")
    return
  }
  fetch(`/roommates/${roommateId}`, {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        location.href=`/`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
