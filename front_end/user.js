const xhttp = new XMLHttpRequest();
// local endpointroot
// const endPointRoot = "http://localhost:8888/API/v1/";
// heroku endpointroot
const endPointRoot = "https://mighty-fortress-40496.herokuapp.com/API/v1/";
  
let params = "";
let resource = "";  
  
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
      // document.getElementById("demo").innerHTML = this.responseText;
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

    // text2.setAttribute()
    
    let amountToBuyField = document.createElement('input')
    let amountToBuyFieldBtn = document.createElement('button')

    amountToBuyFieldBtn.innerHTML = 'Add to Order'
    amountToBuyField.setAttribute("placeholder", "Enter Quantity");
    amountToBuyField.setAttribute("id", obj[i]['herbName']);
    amountToBuyField.setAttribute("name", obj[i]['herbPrice']);
    amountToBuyFieldBtn.setAttribute("id", obj[i]['herbName']);


    amountToBuyField.setAttribute("onclick", 'retrieveID()');
    amountToBuyFieldBtn.setAttribute("onclick", 'retrieveID()');
    amountToBuyFieldBtn.setAttribute("onclick", 'addToOrder()');
    // editBtn.setAttribute('onClick', 'retrieveID()');
    // editBtn.setAttribute('onClick', 'put()');

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    tr.appendChild(amountToBuyField)
    tr.appendChild(amountToBuyFieldBtn)

    table.appendChild(tr)
  }
  document.getElementById('herbDisplay').innerHTML = ''
  document.getElementById('herbDisplay').appendChild(table)
}

function retrieveID () {
  console.log(event.target.id)
  return event.target.id
}

// method that adds an order upon clicking "Add to order"
function addToOrder (obj) {
  let totalCost = parseInt(document.getElementById(retrieveID()).name) * document.getElementById(retrieveID()).value

  params = `?herbName=${retrieveID()}&?herbQuantity=${document.getElementById(retrieveID()).value}&?herbPrice=${totalCost}`
  console.log(params)
  xhttp.open("POST", endPointRoot + "orders/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhttp.send(params),
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("success")
      window.alert("Order Created")
    }
  }
}

// order display method
function displayOrder() {
  resource = "orders/";
  xhttp.open("GET", endPointRoot + resource, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let obj = JSON.parse(this.response)
      // console.log(obj[0]['status'], obj.length);
      if (obj.length == 0) {
        document.getElementById('orderDisplay').innerHTML = "Orders Empty"
      } else {
        displayOrders(obj);
      }
    }
  }
}

// table generation for order display
function displayOrders(obj) {
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

    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.setAttribute("id", obj[i]['herbName']);
    deleteBtn.setAttribute('onClick', 'retrieveID()');
    deleteBtn.setAttribute('onClick', 'deleteOrder()');

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(deleteBtn)


    // tr.appendChild(amountToBuyField)
    // tr.appendChild(amountToBuyFieldBtn)

    table.appendChild(tr)
  }
  document.getElementById('orderDisplay').innerHTML = ''
  document.getElementById('orderDisplay').appendChild(table)
}

//  deletes single order
function deleteOrder() {
  params = `?herbName=${retrieveID()}`
  console.log(params)
  xhttp.open("DELETE", endPointRoot + "orders/1", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("order deleted")
    }
  }
}