  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import {
     getDatabase,
     ref,
     set,
     push,
     onChildAdded,
     update,
     remove
     } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAHiAk1kGVE2bXedIO3xrpRwnCKDlVK6-A",
    authDomain: "todo-app-b79c6.firebaseapp.com",
    projectId: "todo-app-b79c6",
    storageBucket: "todo-app-b79c6.appspot.com",
    messagingSenderId: "228039732110",
    appId: "1:228039732110:web:441d847d52fefce23792df",
    measurementId: "G-L0S2F1Y3H2"
  };


  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var DATABASE = getDatabase(app);
  var dataList = [];

  var firstName = document.getElementById('inputFirstName4');
 var lastName = document.getElementById('inputLastName4');
 var email = document.getElementById('inputEmail4');
 var password = document.getElementById('inputPassword4')
 var address = document.getElementById('inputAddress');
 var address2 = document.getElementById('inputAddress2');
 var city = document.getElementById('inputCity');
 var state = document.getElementById('inputState');
 var age = document.getElementById('inputAge');
 var table = document.getElementById("table")
// var flexRadioDefault = document.getElementsByName('flexRadioDefault');

  window.sendingDataToDatabase = function(){

    var selectedGender;
    var radios = document.getElementsByName('flexRadioDefault');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selectedGender = radios[i].value;
        break;
      }
    }

    var userData = {
      uFirstName:firstName.value.trim(),
      uLastName:lastName.value.trim(),
      uEmail:email.value.trim(),
      uAddress:address.value.trim(),
      uAddress2:address2.value.trim(),
      uCity:city.value.trim(),
      uState:state.value,
      uAge:age.value.trim(),
      // uflexRadioDefault:flexRadioDefault.value
      uGender:selectedGender
    }
    var referkey = ref(DATABASE)
    var rendomId = push(referkey).key;
    userData.id = rendomId;
    var reference = ref(DATABASE,`user data/${userData.id}`);
    set(reference,userData)
    // console.log(userData)
  };

  function gettingDataFromDatabase (){
    var refe = ref(DATABASE,'user data')
    onChildAdded(refe, function(data){
      render(data.val());
    });
  }
  window.onload = gettingDataFromDatabase();

  function render(data){
    if(data || data == " "){
      dataList.push(data)
      var p = document.createElement('p')
      p.innerHTML = 'Please fill out these inputs'
    }
    table.innerHTML = '';
    var thead = document.createElement('thead')
    // thead.toLUpperCase()
    thead.innerHTML = `
    <tr class="px-3">
    <th>S.No</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Address</th>
    <th>Address2</th>
    <th>Gender</th>
    <th>State</th>
    <th>City</th>
    <th>Birth Date</th>
    <th>Id</th>
    <th class = "px-5">Buttons</th>
  </tr>
    `
    table.appendChild(thead);
    var tbody = document.createElement('tbody')
    for(var i = 0; i<dataList.length; i++){
      var thead = document.getElementById('thead')
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataList[i].uFirstName}</td>
          <td>${dataList[i].uLastName}</td>
          <td>${dataList[i].uEmail}</td>
          <td>${dataList[i].uAddress}</td>
          <td>${dataList[i].uAddress2}</td>
          <td>${dataList[i].uGender}</td>
          <td>${dataList[i].uState}</td>
          <td>${dataList[i].uCity}</td>
          <td>${dataList[i].uAge}</td>
          <td>${dataList[i].id}</td>
          <td><button class = "btn btn-info align-self-center" onclick="editData(${i},'${dataList[i].id}')">Edit</button></td>
          <td><button class = "btn-close" aria-label="Close align-self-center" onclick="deleteData(${i},'${dataList[i].id}')"></button></td>

        </tr>
    </Table>
      `
      table.appendChild(tbody)
    }
  }

  window.editData = function(index, id){
    // console.log("qwertyui")
    var updatefirstName = document.getElementById('inputFirstName4').value;
    var updatelastName = document.getElementById('inputLastName4').value;
    var updateemail = document.getElementById('inputEmail4').value;
    var updatepassword = document.getElementById('inputPassword4').value
    var updateaddress = document.getElementById('inputAddress').value;
    var updateaddress2 = document.getElementById('inputAddress2').value;
    var updatecity = document.getElementById('inputCity').value;
    var updatestate = document.getElementById('inputState').value;
    var updateage = document.getElementById('inputAge').value;


    userData.uFirstName=updatefirstName;
    userData.uLastName=updatelastName;
    var reference = ref(DATABASE,`user data/${id}`);
    update(reference)
    render()
  }


window.deleteData = function(index,id){
  dataList.splice(index,1);
  var reference = ref(DATABASE,`user data/${id}`);
  remove(reference);
  render()
}

window.checking = function() {
  if(userData){
    submitButton.disabled = true;
  }
 else if (firstName.value.trim() === '') {
    alert("Please Enter your First Name");
    firstName.focus();
    return false;
  } else if (lastName.value.trim() === '') {
    alert("Please Enter your Last Name");
    lastName.focus();
    return false;
  } else if (email.value.trim() === '') {
    alert("Please Enter your Email");
    email.focus();
    return false;
  } else if (password.value.trim() === '') {
    alert("Please Enter your Password");
    password.focus();
    return false;
  } else if (address.value.trim() === '') {
    alert("Please Enter your Address");
    address.focus();
    return false;
  } else if (address2.value.trim() === '') {
    alert("Please Enter your Address 2");
    address2.focus();
 // sendingDataToDatabase();    return false;
  } else if (state.value === '') {
    alert("Please Select your State");
    state.focus();
    return false;
  } else if (city.value.trim() === '') {
    alert("Please Enter your City");
    city.focus();
    return false;
  } else if (age.value.trim() === '') {
    alert("Please Enter your birth Date");
    age.focus();
    return false;
  } else{
    submitButton.disabled = false;
  }
  // If all checks pass, the form will be submitted

}


function areAllInputsEmpty() {
  return (
    firstName.value.trim() === '' &&
    lastName.value.trim() === '' &&
    email.value.trim() === '' &&
    password.value.trim() === '' &&
    address.value.trim() === '' &&
    address2.value.trim() === '' &&
    state.value === '' &&
    city.value.trim() === '' &&
    age.value.trim() === ''
  );
}
var submitButton = document.getElementById('button');
function toggleSubmitButton() {

  if (areAllInputsEmpty()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}toggleSubmitButton()