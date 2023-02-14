const _signupStepOne = document.querySelector("#signup-step-one");
const _signupStepTwo = document.querySelector("#signup-step-two");

// Form fields
const _signupEmail = document.querySelector("#email");
const _signupFirstName = document.querySelector("#first-name");
const _signupLastName = document.querySelector("#last-name");
const _signupPassword = document.querySelector("#password");
const _signupHome = document.querySelector("#home");
const _signupZipcode = document.querySelector("#zipcode");

//buttons
const _nextButton = document.querySelector("#signup-next");
const _joinButton = document.querySelector("#signup-join-home");
const _createButton = document.querySelector("#signup-create-home");
const _backButton = document.querySelector("#back-button");

const submitForm = async (event) => {
    event.preventDefault();

    try {
    const roommateObj = {
        first_name: _signupFirstName.value,
        last_name: _signupLastName.value,
        email: _signupEmail.value,
        password: _signupPassword.value,
        home_name: _signupHome.value,
        zipcode: _signupZipcode.value
    }
    
    const createRes = await fetch("/roommates", { 
        method: "POST",
        body: JSON.stringify(roommateObj),
        headers:{
            "Content-Type":"application/json"
        } });
    } catch (error) {
        console.log(error);
    }
}

_nextButton.addEventListener("click", (event) => {
    console.log(_signupEmail.value);
    console.log(_signupEmail.value);
    console.log(_signupEmail.value);
    if(_signupEmail.value.length == 0 || _signupFirstName.value.length == 0 || _signupPassword.value.length == 0){
        alert("Please fill in all required fields");
    }
    else {
        _signupStepOne.style.display = "none";
        _signupStepTwo.style.display = "block";
    }
})

_backButton.addEventListener("click", (event) => {
    _signupStepOne.style.display = "block";
    _signupStepTwo.style.display = "none";
})

_joinButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const roommateObj = {
            first_name: _signupFirstName.value,
            last_name: _signupLastName.value,
            email: _signupEmail.value,
            password: _signupPassword.value,
            home_name: _signupHome.value,
            zipcode: _signupZipcode.value
        }
    
        const createRes = await fetch("/roommates/join", { 
            method: "POST",
            body: JSON.stringify(roommateObj),
            headers:{
                "Content-Type":"application/json"
            }
        });

        console.log(createRes.json());
    } catch (error) {
        console.log(error);
    }
});

_createButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
    const roommateObj = {
        first_name: _signupFirstName.value,
        last_name: _signupLastName.value,
        email: _signupEmail.value,
        password: _signupPassword.value,
        home_name: _signupHome.value,
        zipcode: _signupZipcode.value
    }
    
    const createRes = await fetch("/roommates/create", { 
        method: "POST",
        body: JSON.stringify(roommateObj),
        headers:{
            "Content-Type":"application/json"
        } });
    } catch (error) {
        console.log(error);
    }
});