
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

function getAllRooms(){
    $("#tab_room").empty();
    var rootRef = firebase.database().ref('examination/room');

rootRef.on("child_added", snap => {
var roomID = snap.child("roomid").val();
var roomOTP = snap.child("otp").val();
var roomAccessor = snap.child("accessedBy").val();
var updbtn = '<button onclick="updateRoom(\'' + roomID + '\')" class="button">Update Room Details / Change OTP</button>';
var removebtn = '<button onclick="removeRoom(\'' + roomID + '\')" class="button">Remove Room</button>';
    $("#tab_room").append("<tr id=trRoom" + roomID + "><td>" + roomID + "</td><td><input type=\"text\" onclick=\"generateOTP(this.id)\" id=\"roomOTP" + roomID + "\" value=\"" + roomOTP +"\"></td><td><input type=\"text\" id=\"accessedBy" + roomID + "\" value=\"" + roomAccessor + "\"></td><td>" + updbtn + "</td><td>" + removebtn + "</td></tr>");
});
}