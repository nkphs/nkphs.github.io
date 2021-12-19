var selectedRoom = "";
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
var exitedOrNot = ["In Exam","Exited"];
function getRoomDetails(){
$("#tab_room").empty();
$("#tab_minimized").empty();
$("#tab_exited").empty();
var rootRef = firebase.database().ref('examination/room');

rootRef.on("child_added", snap => {
var roomID = snap.child("roomid").val();
var roomOTP = snap.child("otp").val();
var roomAccessor = snap.child("accessedBy").val();
var updbtn = '<button onclick="updateRoom(\'' + roomID + '\')" class="button">Update Room OTP</button>';
if(roomID == document.getElementById("roomID").value && document.getElementById("roomAccessor").value.length >= 10){
	if(roomAccessor.includes(document.getElementById("roomAccessor").value) || document.getElementById("roomAccessor").value == "NKPHS@ExamAdmin"){
		getStudentDetails();
		selectedRoom = roomID;
		$("#tab_room").append("<tr id=trRoom" + roomID + "><td>" + roomID + "</td><td><input type=\"text\" onclick=\"generateOTP(this.id)\" id=\"roomOTP" + roomID + "\" value=\"" + roomOTP +"\"></td><td>" + updbtn + "</td></tr>");
	}
	}
});
}

function getStudentDetails(){
$("#tab_student").empty();

var rootRef = firebase.database().ref('examination/room/' + selectedRoom + "/attendance");

rootRef.on("child_added", snap => {
var studentClass = snap.child("class").val();
var minimized = snap.child("minimized").val();
var studentName = snap.child("name").val();
var studentRoll = snap.child("roll").val();
var room = snap.child("room").val();
var exitStatus = snap .child("exit").val();
var startExam = snap.child("startTime").val();
var endExam = snap.child("endTime").val();
var removebtn = '<button onclick="removeFromDB(' + studentRoll + ')" class="button">Remove</button>';
if(exitStatus == 1){
exitStatus = "End at: <b>" + endExam + "<b>";	
}
else{
exitStatus = "In Exam";
}
    $("#tab_student").append("<tr id=trStudent" + studentRoll + "><td>" + studentClass + "</td><td>" + studentName +"</td><td>" + studentRoll + "</td><td>" + minimized + "</td><td>" + startExam + "</td><td>" + exitStatus + "</td><td>" + removebtn + "</td></tr>");
});

var rootRef = firebase.database().ref('examination/room/' + selectedRoom + "/attendance");

rootRef.on("child_changed", snap => {
var studentClass = snap.child("class").val();
var minimized = snap.child("minimized").val();
var studentName = snap.child("name").val();
var studentRoll = snap.child("roll").val();
var room = snap.child("room").val();
var changedID = new Date().getTime();
var exitStatus = snap .child("exit").val();
var removebtn = '<button onclick="removeFromList(' + changedID + ')" class="button">Remove</button>';
	if(minimized > 0){
		Swal.fire({
  			position: 'top-end',
  			icon: 'info',
  			text: studentName + ', Class - ' + studentClass + ', Roll No.: -' + studentRoll + ' minimized the app',
  			showConfirmButton: true
		})
		$("#tab_minimized").append("<tr id=trMinimized" + changedID + "><td>" + studentClass + "</td><td>" + studentName +"</td><td>" + studentRoll + "</td><td>" + minimized + "</td><td>" + removebtn + "</td></tr>");
	}
  if(exitStatus == 1){
      $("#tab_exited").append("<tr><td>" + studentClass + "</td><td>" + studentName +"</td><td>" + studentRoll + "</td><td>" + exitedOrNot[exitStatus] + "</td></tr>");
    }
	});
}

function updateRoom(roomid) {
	firebase.database().ref("examination/room/" + selectedRoom).update({
        otp: document.getElementById("roomOTP" + selectedRoom).value
    });
}
function generateOTP(room) {
    var otp = Math.floor(1000 + Math.random() * 9000);
    document.getElementById(room).value = otp;
}
function removeFromList(stdID) {
	document.getElementById("trMinimized" + stdID).style.display = "none";
}

function removeFromDB(stdID) {
Swal.fire({
  title: 'Are you sure?',
  text: "Selected student will be removed from current Exam room.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref('examination/room/' + selectedRoom + '/attendance/' + stdID).remove();
    document.getElementById("trStudent" + stdID).style.display = "none";
    Swal.fire(
      'Deleted!',
      'Student Removed.',
      'success'
    )
  }
});
}
