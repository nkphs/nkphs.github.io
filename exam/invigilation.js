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

function getRoomDetails(){
$("#tab_room").empty();
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
	
    $("#tab_student").append("<tr id=trStudent" + studentRoll + "><td>" + studentClass + "</td><td>" + studentName +"</td><td>" + studentRoll + "</td><td>" + minimized + "</td></tr>");
});

var rootRef = firebase.database().ref('examination/room/' + selectedRoom + "/attendance");

rootRef.on("child_changed", snap => {
var studentClass = snap.child("class").val();
var minimized = snap.child("minimized").val();
var studentName = snap.child("name").val();
var studentRoll = snap.child("roll").val();
var room = snap.child("room").val();
var changedID = new Date().getTime();
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