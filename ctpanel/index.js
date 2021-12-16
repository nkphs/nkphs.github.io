var clID = "";
var adm = "";
var parameters = location.search.substring(1).split("=");
clID = parameters[1];
adm = parameters[2];
if(adm == "adm"){
	document.getElementById("admOnlyH").style.display = "block";
	document.getElementById("admOnlyF").style.display = "block";
}
document.getElementById("studentClass").innerHTML = "Class - " + clID;
var config = {
    apiKey: "AIzaSyCSoiDuslBP3AsGgA7tNT1Bq02XB8wEGe8",
    authDomain: "nkphs2020.firebaseapp.com",
    databaseURL: "https://nkphs2020-default-rtdb.firebaseio.com",
    projectId: "nkphs2020",
    storageBucket: "nkphs2020.appspot.com",
    messagingSenderId: "876141817104",
    appId: "1:876141817104:web:2bfb5de3f60265d3128995",
    measurementId: "G-BQCBG9T67D"
   };
firebase.initializeApp(config); 


function getAllStudent(){
$("#studentList").empty();
var rootRef = firebase.database().ref('student/2022/' + clID);
rootRef.on("child_added", snap => {
var roll = snap.child("roll").val();
var name = snap.child("name").val();
var sl = snap.child("sl").val();
var orderStatus = snap.child("orderStatus").val();
var deliveryStatus = snap.child("deliveryStatus").val();
var updbtn = 'Current Status: ' + orderStatus + '<br><select name="orderStatus" id="orderStatus' + roll +'"><option value="No Order">No Order</option><option value="Order Placed">Order Placed</option><option value="Ready for Collect">Ready for Collect</option><option value="Order Completed">Order Completed</option></select><br><button onclick="updateOrder(\'' + roll + '\')" class="button">Update Order Status</button>';
var removebtn = '<button onclick="removeStudent(\'' + roll + '\')" class="button">Remove Student</button>';
var editbtn = '<button onclick="editStudent(\'' + roll + '\',\'' + name + '\',\'' + sl + '\')" class="button">Edit Details</button>';
if(adm == "adm"){
    $("#studentList").append("<tr id=trRoll" + roll + "><td>" + roll + "</td><td>" + name + "</td><td>" + sl + "</td><td>" + editbtn + "</td><td>" + updbtn + "</td><td>" + removebtn + "</td></tr>");
}
else{
	$("#studentList").append("<tr id=trRoll" + roll + "><td>" + roll + "</td><td>" + name + "</td><td>" + sl + "</td><td>" + editbtn + "</td><td>" + removebtn + "</td></tr>");
}
});
}

function updateOrder(roll){
Swal.fire({
  title: 'Are you sure?',
  text: "Order status will be updated",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref('student/2022/' + clID + "/" + roll).update({
        orderStatus: document.getElementById("orderStatus" + roll).value
    });
    Swal.fire(
      'Updated!',
      'Order Status Updated.',
      'success'
    )
  }
});


	
}


function editStudent(roll,name,sl){
  document.getElementById("myForm").style.display = "block";
  document.getElementById("studentNameUpdate").value = name;
  document.getElementById("studentRollUpdate").value = roll;
  document.getElementById("secondLanguageUpdate").value = sl;
}

function updateStudent(){
Swal.fire({
  title: 'Are you sure?',
  text: "Student details will be updated",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref('student/2022/' + clID + "/" + document.getElementById("studentRollUpdate").value).update({
        name: document.getElementById("studentNameUpdate").value,
        sl:document.getElementById("secondLanguageUpdate").value,
    });
    Swal.fire(
      'Updated!',
      'Student Details Updated.',
      'success'
    )
    document.getElementById("stuentFormUpdate").reset();
    document.getElementById("myForm").style.display = "none";
  }
});

}

function addStudent(){

if(document.getElementById("studentName").value !="" && document.getElementById("studentRoll").value!="" ){
Swal.fire({
  title: 'Are you sure?',
  text: "New student will be entered into class " + clID,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Add New Student'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref('student/2022/' + clID + "/" + document.getElementById("studentRoll").value).update({
        name: document.getElementById("studentName").value,
        roll: document.getElementById("studentRoll").value,
        sl:document.getElementById("secondLanguage").value,
        orderStatus: "No Order"
    });
    Swal.fire(
      'Added!',
      'New Student Added.',
      'success'
    )
    document.getElementById("stuentForm").reset();
  }
});
}
else{
	Swal.fire(
      'Access Denied',
      'Student details needed',
      'error'
    )
}
}

function removeStudent(roll){
Swal.fire({
  title: 'Are you sure?',
  text: "Selected student details will be removed from class " + clID,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref('student/2022/' + clID + "/" + roll).remove();
    document.getElementById("trRoll" + roll).style.display = "none";
    Swal.fire(
      'Deleted!',
      'Student Removed.',
      'success'
    )
  }
});
}