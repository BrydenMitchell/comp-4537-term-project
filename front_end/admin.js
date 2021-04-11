const xhttp = new XMLHttpRequest();
// local endpointroot
// const endPointRoot = "http://localhost:8888/API/v1/";
// heroku endpointroot
const endPointRoot = "https://mighty-fortress-40496.herokuapp.com/API/v1/";
  
let params = "";
let resource = "";

// updates item
function updateItem() {
  if (document.getElementById("herbName").value.trim().length == 0 || document.getElementById("herbPrice").value.trim().length == 0 || document.getElementById("herbQuantity").value.trim().length == 0 ) {
    if (window.alert("Please Enter Valid Input")) {}
    else return; 
  }
  params = `?previousHerb=${getHashCode()}&?herbName=${document.getElementById("herbName").value.trim()}&?herbPrice=${document.getElementById("herbPrice").value}
  &?herbQuantity=${document.getElementById("herbQuantity").value}`
  console.log(params)
  xhttp.open("PUT", endPointRoot + "herbs/edit", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  // xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("success")
      if (window.alert("Item Updated")) {}
      else window.location.href = "adminViewStore.html"; 
    }
  }
}
// updates user
function updateUser() {
  if (document.getElementById("userName").value.trim().length == 0 || document.getElementById("userPassword").value.trim().length == 0) {
    if (window.alert("Please Enter Valid Input")) {}
    else return; 
  }
  params = `?previousName=${getHashCode()}&?userName=${document.getElementById("userName").value.trim()}&?userPassword=${document.getElementById("userPassword").value}`
  console.log(params)
  xhttp.open("PUT", endPointRoot + "users/edit", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  // xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("success")
      if (window.alert("User Updated")) {}
      else window.location.href = "adminViewUser.html"; 
    }
  }
}

// adds a single item 
function post() {
  if (document.getElementById("herbName").value.trim().length == 0 || document.getElementById("herbPrice").value.trim().length == 0 || document.getElementById("herbQuantity").value.trim().length == 0 ) {
    if (window.alert("Please Enter Valid Input")) {}
    else return; 
  }
    params = `?herbName=${document.getElementById("herbName").value.trim()}&?herbPrice=${document.getElementById("herbPrice").value}
  &?herbQuantity=${document.getElementById("herbQuantity").value}`
  console.log(params)
  xhttp.open("POST", endPointRoot + "herbs/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhttp.send(params),
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (window.alert("Item Added")) {}
      else window.location.href = "adminViewStore.html";     }
  }
}

// inventory display method
function getAll() {
  resource = "herbs/";
  xhttp.open("GET", endPointRoot + resource, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let obj = JSON.parse(this.response)
      // console.log(obj[0]['status'], obj.length);
      if (obj.length == 0) {
        document.getElementById('herbDisplay').innerHTML = "Store Empty"
      } else {
        displayHerbs(obj);
      }
    }
  }
}

// Users display method
function getAllUsers() {
  resource = "users/";
  xhttp.open("GET", endPointRoot + resource, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let obj = JSON.parse(this.response)
      // console.log(obj[0]['status'], obj.length);
      if (obj.length == 0) {
        document.getElementById('userDisplay').innerHTML = "Users Empty"
      } else {
        displayUsers(obj);
      }
    }
  }
}

// deletes single item entry
function del() {
  console.log(retrieveID())
  params = `?herbName=${retrieveID()}`
  console.log(params)
  xhttp.open("DELETE", endPointRoot + "herbs/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp)
      if (window.alert("Item Deleted")) {}
      else window.location.href = "adminViewStore.html";     }
  }
}

// deletes single user 
function deleteUser() {
  console.log(retrieveID())
  params = `?userName=${retrieveID()}`
  console.log(params)
  xhttp.open("DELETE", endPointRoot + "users/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log('success')
      // expression to reload after user clicks confirm
      if (window.alert("User Deleted")) {}
      else window.location.reload(); 
    }
  }
}

// deletes entire inventory
function delAll() {
  xhttp.open("DELETE", endPointRoot + "herbs", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      
      document.getElementById("demo").innerHTML = "All Entries Deleted"
    }
  }
}


// table generation for inventory display
function displayHerbs(obj) {
  console.log(obj)
  let table = document.createElement('table');
  let th1 = document.createElement('th')
  let th2 = document.createElement('th')
  let th3 = document.createElement('th')

  let text1 = document.createTextNode('Herb')
  let text2 = document.createTextNode('Price')
  let text3 = document.createTextNode('Quantity')

  th1.appendChild(text1)
  th2.appendChild(text2)
  th3.appendChild(text3)

  table.appendChild(th1)
  table.appendChild(th2)
  table.appendChild(th3)

  for (let i = 0; i < obj.length; i++) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    let text1 = document.createTextNode(obj[i]['herbName'])
    let text2 = document.createTextNode(obj[i]['herbPrice'])
    let text3 = document.createTextNode(obj[i]['herbQuantity'])

    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.setAttribute("id", obj[i]['herbName']);
    editBtn.setAttribute('onClick', 'retrieveID()');
    editBtn.setAttribute('onClick', 'moveToEdit()');

    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute("id", obj[i]['herbName']);
    deleteBtn.setAttribute('onClick', 'retrieveID()');
    deleteBtn.setAttribute('onClick', 'del()');

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    tr.appendChild(editBtn)
    tr.appendChild(deleteBtn)
    table.appendChild(tr)
  }
  document.getElementById('herbDisplay').innerHTML = ''
  document.getElementById('herbDisplay').appendChild(table)
}

// table generation for inventory display
function displayUsers(obj) {
  console.log(obj)
  let table = document.createElement('table');
  let th1 = document.createElement('th')
  let th2 = document.createElement('th')
  let th3 = document.createElement('th')

  let text1 = document.createTextNode('User ID')
  let text2 = document.createTextNode('User Name')
  let text3 = document.createTextNode('User Password')

  th1.appendChild(text1)
  th2.appendChild(text2)
  th3.appendChild(text3)

  table.appendChild(th1)
  table.appendChild(th2)
  table.appendChild(th3)

  for (let i = 0; i < obj.length; i++) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    let text1 = document.createTextNode(obj[i]['userID'])
    let text2 = document.createTextNode(obj[i]['userName'])
    let text3 = document.createTextNode(obj[i]['userPassword'])

    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.setAttribute("id", obj[i]['userName']);
    editBtn.setAttribute('onClick', 'retrieveID()');
    editBtn.setAttribute('onClick', 'moveToEditUser()');

    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute("id", obj[i]['userName']);
    deleteBtn.setAttribute('onClick', 'retrieveID()');
    deleteBtn.setAttribute('onClick', 'deleteUser()');

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    if (i != 0) {
      tr.appendChild(editBtn)
      tr.appendChild(deleteBtn)
    }

    table.appendChild(tr)
  }
  document.getElementById('userDisplay').innerHTML = ''
  document.getElementById('userDisplay').appendChild(table)
}

// changes to edit screen upon clicking edit button while hashing id of item
function moveToEdit() {
  window.location.href = `adminEditStore.html#${retrieveID()}`
}

// changes to edit screen upon clicking edit button while hashing id of item
function moveToEditUser() {
  window.location.href = `adminEditUser.html#${retrieveID()}`
}

// returns sanitized hashcode which references id of item to be editted
function getHashCode() {
  let hashcode = window.location.hash
  hashcode = hashcode.replace('#', '')
  hashcode = hashcode.replace('%20', ' ')
  document.getElementById('currentHerb').innerHTML = `Editing: ${hashcode}`
  console.log(hashcode)
  return hashcode
}

function retrieveID () {
  console.log(event.target.id)
  return event.target.id
}