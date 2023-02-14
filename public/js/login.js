let _loginButton = document.querySelector("#login-button");
let _loginEmail = document.querySelector("#email");
let _loginPassword = document.querySelector("#password");
let _createButton = document.querySelector("#create-button");

_loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const loginObj = {
        email: _loginEmail.value,
        password: _loginPassword.value
    }
    console.log(loginObj);
    fetch("/login",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/dashboard"
        } else {
            alert("trumpet sound")
        }
    })
})

_createButton.addEventListener("click", (event) => {
    location.href="/signup";
})