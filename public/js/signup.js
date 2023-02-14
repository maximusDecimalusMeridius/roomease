const _signupStepOne = document.querySelector("#signup-step-one");
const _signupStepTwo = document.querySelector("#signup-step-two");
const _stepOneWarning = document.querySelector("#step-one-warning");
const _stepTwoWarning = document.querySelector("#step-two-warning");

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
        _backButton.style.display = "flex";
    }
})

_backButton.addEventListener("click", (event) => {
    _signupStepOne.style.display = "block";
    _signupStepTwo.style.display = "none";
    _stepTwoWarning.textContent = "";
    _backButton.style.display = "none";
})

const success = () => {
    _bedCover.style.display = "block";
    _accountSuccessModal = document.createElement("div");
    _accountSuccessModal.textContent = "Account Created!";
    _accountSuccessModal.id = "success-modal"
    _bedCover.append(_accountSuccessModal);
    setTimeout(() => {
        location.href=`/`;
    }, "3000")
}

const failure = (step, message) => {
    const showWarning = () => {
        
    }
    
    if(step == 2){
        _stepTwoWarning.textContent = message;
        _backButton.style.border = "2px solid red";
        setTimeout(() => {
            _stepTwoWarning.textContent = "";
            _backButton.style.border = "0px";
        }, 3000)
    }
}

_joinButton.addEventListener("click", async (event) => {
    event.preventDefault();
 
    try {
        const roommateObj = {
            first_name: _signupFirstName.value,
            last_name: (_signupLastName.value == "" ? null : _signupLastName.value),
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
        console.log(createRes);
        if(createRes.ok){
            success();
        } else if(createRes.status == 409){
            failure(2, "Email already taken - please use another one");
        }
    } catch (error) {
        console.log(error);
    }
});

_createButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const roommateObj = {
            first_name: _signupFirstName.value,
            last_name: (_signupLastName.value == "" ? null : _signupLastName.value),
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
            }
        });

        if(createRes.ok){
            success();
        } else if(createRes.status == 409){
            failure("Email already taken - please use another one");
        }
    } catch (error) {
        console.log(error);
    }
});