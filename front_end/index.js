const xhttp = new XMLHttpRequest();
// local endpointroot
// const endPointRoot = "http://localhost:8888/API/v1/";
// heroku endpointroot
const endPointRoot = "https://mighty-fortress-40496.herokuapp.com/API/v1/";
  
let params = "";
let resource = "";  

function verifyUser() {
  const userName = document.getElementById('id').value
  const password = document.getElementById('pw').value
  // console.log(userName, password)
  if (userName == "amir" && password == "admin") {
    window.location.href = "admin.html"
    }
  else {
    window.location.href = "user.html"
  }
}

function signup() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  
  if (username.length == 0 || password.length == 0) {
    window.alert("Please enter valid username / password")
  } else {
    createNewUser()
    window.alert("User Created")
  }
}

// method to add items onSubmit
function createNewUser() {
  params = `?username=${document.getElementById("username").value.trim()}&?password=${document.getElementById("password").value.trim()}`
  console.log(params)
  xhttp.open("POST", endPointRoot + "user/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhttp.send(params),
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.response)
    }
  }
}