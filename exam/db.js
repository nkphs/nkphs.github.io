var examDate = "";
var examDateKey = "";
var controller = 0;

var finalInstruction = "<b>Do not minimize the app or do not press back button once exam has started</b>";
var finalNotice = "<b>It is hereby notified to all students of class ...</b>";
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

function questionUpload() {
swal("Nprth Kolkata Public High School","Enter Examination Admin Password Here:", {
    content: {
    element: "input",
    attributes: {
      placeholder: "Type your password",
      type: "password",
    },
  },
})
  .then((value) => {

  if (value != null) {
    if (value == window.atob("TktQSFNARXhhbWluYXRpb24=")){
        document.getElementById("questionUpload").style.display = "block"
        getAllDates();
  }
  else{
  swal("North Kolkata Public High School","You are not authorized!","error");
        document.getElementById("questionUpload").style.display = "none"
  }
  }
});
}
function invigilation() {
    swal("Nprth Kolkata Public High School","Enter Invigilation Password Here:", {
    content: {
    element: "input",
    attributes: {
      placeholder: "Type your password",
      type: "password",
    },
  },
})
  .then((value) => {

  if (value != null) {
    if (value == window.atob("TktQSFNASW52aWdpbGF0aW9u")){
        document.getElementById("invigilation").style.display = "block"
        getAllRooms();
  }
  else{
  swal("North Kolkata Public High School","You are not authorized!","error");
        document.getElementById("invigilation").style.display = "none"
  }
  }
});
}
function scorecard(){
    //window.open("scorecard.html");
}
function evaluation(){
    //window.open("evaluation.html");
}

function getAllDates(){
    $("#tab_report").empty();
    var rootRef = firebase.database().ref('examination/student');

rootRef.on("child_added", snap => {
var examID = snap.child("id").val();
getAllPapers(examID);
});
}

function getAllSettings(){
var rootRef = firebase.database().ref('examination/portal');
rootRef.on("child_added", snap => {
var settingsActivation = snap.child("activation").val();
var settingsID = snap.child("id").val();
    if(settingsID == "exam"){
      $("#portalStatus").val(settingsActivation);
    }
    });
rootRef.on("child_changed", snap => {
var settingsActivation = snap.child("activation").val();
var settingsID = snap.child("id").val();
    if(settingsID == "exam"){
      $("#portalStatus").val(settingsActivation);
    }
    });
}

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

function loadAllNotice(){
    $("#noticeAllView").empty();
    var rootRef = firebase.database().ref('notices/student');

rootRef.on("child_added", snap => {
var noticeID = snap.child("id").val();
var noticeClass = snap.child("class").val();
var noticeDate = snap.child("date").val();
var noticeMonth = snap.child("month").val();
var noticeMain = snap.child("main").val();
var noticeNB = snap.child("nb").val();
var updbtn = '<button onclick="updateNotice(\'' + noticeID + '\')" class="button">Update Notice Details</button>';
var removebtn = '<button onclick="removeNotice(\'' + noticeID + '\')" class="button">Remove Notice</button>';
    $("#noticeAllView").append("<tr id=trNotice" + noticeID + "><td>" + noticeID + "</td><td><input type=\"text\" id=\"noticeClass" + noticeID + "\" value=\"" + noticeClass +"\"></td><td><input type=\"text\" id=\"noticeDate" + noticeID + "\" value=\"" + noticeDate +"\"></td><td><input type=\"text\" id=\"noticeMonth" + noticeID + "\" value=\"" + noticeMonth +"\"></td><td><textarea id=\"noticeMain" + noticeID + "\">" + noticeMain +"</textarea></td><td><input type=\"text\" id=\"noticeNB" + noticeID + "\" value=\"" + noticeNB +"\"></td><td>" + updbtn + "</td><td>" + removebtn + "</td></tr>");
});
}

function getAllPapers(examID) {
    var rootRef = firebase.database().ref('examination/student/' + examID);

rootRef.on("child_added", snap => {

var examDate = snap.child("examDate").val();
var examName = snap.child("examName").val();
var examClass = snap.child("class").val();
var examSubject = snap.child("examSubject").val();
var examFullMarks  = snap.child("examFullMarks").val();
var examTime = snap.child("examTime").val();
var examType = snap.child("examType").val();
var examLink = snap.child("examLink").val();
var questionDownloadable = snap.child("downloadable").val();
var examActivation = snap.child("examActivation").val();
var examInstruction = snap.child("examInstruction").val();
var examPassCode = snap.child("examPassCode").val();
var examRoom = snap.child("examRoom").val();
var examMultiple = snap.child("multiple").val();
var updbtn = '<button onclick="updateExam(\'' + examID + '\',\'' + examClass + '\',\'' + examMultiple + '\')" class="button">Update Exam Details</button>';
var removebtn = '<button onclick="removeExam(\'' + examID + '\',\'' + examClass + '\')" class="button">Remove Exam</button>';

if(examDate != null){
  if(examMultiple == "YES"){

    $("#tab_report").append("<tr id=tr" + examID + examClass +"><td>" + examName + "</td><td>" + examDate + "</td><td>" + examClass + "</td><td><input type=\"text\" id=\"downloadable" + examID + examClass + "\" value=\"" + questionDownloadable + "\"></td><td><input type=\"text\" id=\"examActivation" + examID + examClass + "\" value=\"" + examActivation + "\"></td><td>" + examSubject + "<br><hr>" + snap.child("examSubject2").val() + "</td><td><input type=\"text\" id=\"examTime" + examID + examClass + "\" value=\"" + examTime + "\"></td><td><input type=\"text\" id=\"examFullMarks" + examID + examClass + "\" value=\"" + examFullMarks + "\"></td><td>" + examInstruction + "</td><td>" + examType + "<br><hr>" + snap.child("examType2").val() + "</td><td>" + examLink + "<br><hr>" + snap.child("examLink2").val() + "</td><td><input type=\"text\" id=\"examPassCode" + examID + examClass + "\" value=\"" + examPassCode + "\"><br><hr><input type=\"text\" id=\"examPassCode2" + examID + examClass + "\" value=\"" + snap.child("examPassCode2").val() + "\"></td><td><input type=\"text\" id=\"examRoom" + examID + examClass + "\" value=\"" + examRoom + "\"></td><td>" + updbtn + "</td><td>" + removebtn + "</td></tr>");
  }
  else{
    $("#tab_report").append("<tr id=tr" + examID + examClass +"><td>" + examName + "</td><td>" + examDate + "</td><td>" + examClass + "</td><td><input type=\"text\" id=\"downloadable" + examID + examClass + "\" value=\"" + questionDownloadable + "\"></td><td><input type=\"text\" id=\"examActivation" + examID + examClass + "\" value=\"" + examActivation + "\"></td><td>" + examSubject + "</td><td><input type=\"text\" id=\"examTime" + examID + examClass + "\" value=\"" + examTime + "\"></td><td><input type=\"text\" id=\"examFullMarks" + examID + examClass + "\" value=\"" + examFullMarks + "\"></td><td>" + examInstruction + "</td><td>" + examType + "</td><td>" + examLink + "</td><td><input type=\"text\" id=\"examPassCode" + examID + examClass + "\" value=\"" + examPassCode + "\"></td><td><input type=\"text\" id=\"examRoom" + examID + examClass + "\" value=\"" + examRoom + "\"></td><td>" + updbtn + "</td><td>" + removebtn + "</td></tr>");
  }
}

});
}

function updateExam(ID,cls,mult) {
    Swal.fire({
  title: 'Are you sure?',
  text: "Selected item will be updated.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref("examination/student/" + ID + "/" + cls).update({
        downloadable: document.getElementById("downloadable" + ID + cls).value,
        examActivation: document.getElementById("examActivation" + ID + cls).value,
        examFullMarks: document.getElementById("examFullMarks" + ID + cls).value,
        examPassCode: document.getElementById("examPassCode" + ID + cls).value,
        examRoom: document.getElementById("examRoom" + ID + cls).value,
        examTime: document.getElementById("examTime" + ID + cls).value,
    });
    if(mult == "YES"){
      firebase.database().ref("examination/student/" + ID + "/" + cls).update({
        examPassCode2: document.getElementById("examPassCode2" + ID + cls).value
    });
    }
    Swal.fire(
      'Success!',
      'Exam Details Updated.',
      'success'
    )
  }
});
}
function removeExam(ID,cls) {
    Swal.fire({
  title: 'Are you sure?',
  text: "Selected item will be removed from Exam List.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove'
}).then((result) => {
  if (result.isConfirmed) {
    document.getElementById("tr" + ID + cls).style.display = "none";
    firebase.database().ref("examination/student/" + ID + "/" + cls).remove(); 
    Swal.fire(
      'Deleted!',
      'Exam Details Removed.',
      'success'
    )
  }
});
    
}

function updateRoom(ID){
        Swal.fire({
  title: 'Are you sure?',
  text: "Selected room details will be updated.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref("examination/room/" + ID).update({
        otp: document.getElementById("roomOTP" + ID).value,
        accessedBy: document.getElementById("accessedBy" + ID).value
    });
    Swal.fire(
      'Success!',
      'Room Details Updated.',
      'success'
    )
  }
});
}
function removeRoom(ID) {
    Swal.fire({
  title: 'Are you sure?',
  text: "Selected room details will be removed from Room List.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove'
}).then((result) => {
  if (result.isConfirmed) {
    document.getElementById("trRoom" + ID).style.display = "none";
    firebase.database().ref("examination/room/" + ID).remove(); 
    Swal.fire(
      'Deleted!',
      'Room Details Removed.',
      'success'
    )
  }
});
    
}


function updateNotice(ID){
        Swal.fire({
  title: 'Are you sure?',
  text: "Selected notice details will be updated.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Update'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.database().ref("notices/student/" + ID).update({
        class: document.getElementById("noticeClass" + ID).value,
        date: document.getElementById("noticeDate" + ID).value,
        month: document.getElementById("noticeMonth" + ID).value,
        main: document.getElementById("noticeMain" + ID).value,
        nb: document.getElementById("noticeNB" + ID).value
    });
    Swal.fire(
      'Success!',
      'Notice Details Updated.',
      'success'
    )
  }
});
}
function removeNotice(ID) {
    Swal.fire({
  title: 'Are you sure?',
  text: "Selected notice will be removed from online Notice Board.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Remove'
}).then((result) => {
  if (result.isConfirmed) {
    document.getElementById("trNotice" + ID).style.display = "none";
    firebase.database().ref("notices/student/" + ID).remove(); 
    Swal.fire(
      'Deleted!',
      'Notice Removed.',
      'success'
    )
  }
});
    
}


function submitQuestionPaper() {
  var date = new Date($('#examDate').val());
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  examDate = [day, month, year].join('/');
  examDateKey = [day, month, year].join('-');

    Swal.fire({
  title: 'Do you want to save the question paper?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: `Save`,
  denyButtonText: `Don't save`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
    callDBSave();
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
}
function callDBSave(){
    firebase.database().ref("examination/student/" + examDateKey).update({
        id: examDateKey
    });
    firebase.database().ref("examination/student/" + examDateKey + "/" + document.getElementById("examClass").value).update({
        class:document.getElementById("examClass").value,
        downloadable: "NO",
        examActivation: "OFF",
        examDate: examDate,
        examFullMarks: document.getElementById("examFullMarks").value,
        examInstruction: finalInstruction,
        examLink: document.getElementById("examLink").value,
        examName: document.getElementById("examName").value,
        examPassCode: document.getElementById("examPassCode").value,
        examRoom: document.getElementById("examRoom").value,
        examSubject: document.getElementById("examSubject").value,
        examTime: document.getElementById("examTime").value,
        examType: document.getElementById("examType").value,
    });
    Swal.fire(
      'Success',
      'New Question Added.',
      'success'
    )
}


function convert() {    
    var input_str; //store input
    var text_input; //store input after beging trim()med
    var output_html=""; //store output
    var counter;    
    
    input_str=document.getElementById('examInstruction').value; //get input and store it in input_str
    text_input=input_str.trim(); //trim() input
    if(text_input.length > 0){
        boldcounter = 0;
        italiccounter = 0;
        underlinecounter = 0;
        centercounter = 0;
        output_html+="<p>"; //begin by creating paragraph
        for(counter=0; counter < text_input.length; counter++){
            switch (text_input[counter]){
                case '\n':
                    if (text_input[counter+1]==='\n'){
                        output_html+="</p>\n<p>";
                        counter++;
                    }
                    else output_html+="<br>";           
                    break;
                
                case ' ':
                    if(text_input[counter-1] != ' ' && text_input[counter-1] != '\t')
                        output_html+=" ";                                                       
                    break;
                    
                case '\t':
                    if(text_input[counter-1] != '\t')
                        output_html+=" ";
                    break;
                
                case '&':
                    output_html+="&amp;";
                    break;
                
                case '"':
                    output_html+="&quot;";
                    break;
                case '*':
                    if(boldcounter == 0){
                        output_html+="<b>";
                        boldcounter ++;
                    }
                    else{
                        output_html+="</b>";
                        boldcounter = 0;
                    }
                    break;
                case '_':
                    if(italiccounter == 0){
                        output_html+="<i>";
                        italiccounter ++;
                    }
                    else{
                        output_html+="</i>";
                        italiccounter = 0;
                    }
                    break;
                case '`':
                    if(underlinecounter == 0){
                        output_html+="<u>";
                        underlinecounter ++;
                    }
                    else{
                        output_html+="</u>";
                        underlinecounter = 0;
                    }
                    break;
                case '^':
                    if(centercounter == 0){
                        output_html+="<center>";
                        centercounter ++;
                    }
                    else{
                        output_html+="</center>";
                        centercounter = 0;
                    }
                    break;
                
                case '>':
                    output_html+="&gt;";
                    break;
                
                case '<':
                    output_html+="&lt;";
                    break;              
                
                default:
                    output_html+=text_input[counter];
                    
            }
                    
        }
        output_html+="</p>"; //finally close paragraph
    }
    //document.getElementById('out_html').value = output_html; // display output html 
    finalInstruction = output_html;
    document.getElementById("nothingTest").innerHTML = output_html;
}

var el = document.getElementById('examInstruction');
el.onkeyup = convert;


function convertNotice() {    
    var input_str; //store input
    var text_input; //store input after beging trim()med
    var output_html=""; //store output
    var counter;    
    
    input_str=document.getElementById('noticeInstruction').value; //get input and store it in input_str
    text_input=input_str.trim(); //trim() input
    if(text_input.length > 0){
        boldcounter = 0;
        italiccounter = 0;
        underlinecounter = 0;
        centercounter = 0;
        output_html+="<p>"; //begin by creating paragraph
        for(counter=0; counter < text_input.length; counter++){
            switch (text_input[counter]){
                case '\n':
                    if (text_input[counter+1]==='\n'){
                        output_html+="</p>\n<p>";
                        counter++;
                    }
                    else output_html+="<br>";           
                    break;
                
                case ' ':
                    if(text_input[counter-1] != ' ' && text_input[counter-1] != '\t')
                        output_html+=" ";                                                       
                    break;
                    
                case '\t':
                    if(text_input[counter-1] != '\t')
                        output_html+=" ";
                    break;
                
                case '&':
                    output_html+="&amp;";
                    break;
                
                case '"':
                    output_html+="&quot;";
                    break;
                case '*':
                    if(boldcounter == 0){
                        output_html+="<b>";
                        boldcounter ++;
                    }
                    else{
                        output_html+="</b>";
                        boldcounter = 0;
                    }
                    break;
                case '_':
                    if(italiccounter == 0){
                        output_html+="<i>";
                        italiccounter ++;
                    }
                    else{
                        output_html+="</i>";
                        italiccounter = 0;
                    }
                    break;
                case '`':
                    if(underlinecounter == 0){
                        output_html+="<u>";
                        underlinecounter ++;
                    }
                    else{
                        output_html+="</u>";
                        underlinecounter = 0;
                    }
                    break;
                case '^':
                    if(centercounter == 0){
                        output_html+="<center>";
                        centercounter ++;
                    }
                    else{
                        output_html+="</center>";
                        centercounter = 0;
                    }
                    break;
                
                case '>':
                    output_html+="&gt;";
                    break;
                
                case '<':
                    output_html+="&lt;";
                    break;              
                
                default:
                    output_html+=text_input[counter];
                    
            }
                    
        }
        output_html+="</p>"; //finally close paragraph
    }
    //document.getElementById('out_html').value = output_html; // display output html 
    finalNotice = output_html;
    document.getElementById("noticeMain").innerHTML = output_html;
}

var el = document.getElementById('noticeInstruction');
el.onkeyup = convertNotice;



function generateOTP(room) {
    var otp = Math.floor(1000 + Math.random() * 9000);
    document.getElementById(room).value = otp;
}
function submitRoomDetails(){
    firebase.database().ref("examination/room/" + document.getElementById("roomID").value).update({
        roomid: document.getElementById("roomID").value,
        otp: document.getElementById("roomOTP").value,
        accessedBy: document.getElementById("roomAccessor").value
    });
    Swal.fire(
      'Success',
      'New Room Added.',
      'success'
    )
}

window.onload = (event) => {
  if(location.search.substring(1).split("=")[1] == "mobs"){
    controller = 1;
    getAllSettings();
    document.getElementById("defaultOpen").style.display = "none";
    openPage(event, 'Settings');
  }
};

function openPage(evt, tabName) {
  if(controller == 1){
    var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  }
  else{
    document.getElementById("defaultOpen").click();
    Swal.fire(
      'Access Denied',
      'Login to proceed.',
      'error'
    )
  }
}
function openLogin(evt, tabName) {
    var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


function checkLogin() {
  if(document.getElementById("loginPassword").value == "ExamAdmin@NKPHS"){
    controller = 1;
    Swal.fire(
      'Success',
      'Choose tab to proceed.',
      'success'
    )
    getAllSettings();
  }
  else{
    controller = 0;
    Swal.fire(
      'Access Denied',
      'Login to proceed.',
      'error'
    )
  }
}

function changePortal(){
      Swal.fire({
  title: 'Do you want to update exam portal activation?',
  showDenyButton: false,
  showCancelButton: true,
  confirmButtonText: `Update`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Udated!', 'Exam Portal Activation Updated', 'success')
    firebase.database().ref("examination/portal/exam").update({activation:document.getElementById("portalStatus").value});
  }
})
  
}

function uploadNewNotice() {
    Swal.fire({
  title: 'Do you want to upload new notice?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: `Upload`,
  denyButtonText: `Don't upload`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Uploaded!', '', 'success')
    callNoticeSave();
  } else if (result.isDenied) {
    Swal.fire('Changes are not updated', '', 'info')
  }
})
}

function callNoticeSave(){
  var d = new Date();
  var noticeID = d.getTime();
    firebase.database().ref("notices/student/" + noticeID).update({
        id: noticeID,
        class: document.getElementById("noticeClass").value,
        date: document.getElementById("noticeDate").value,
        month: document.getElementById("noticeMonth").value,
        main: finalNotice,
        nb: document.getElementById("noticeNB").value,
    });
    Swal.fire(
      'Success',
      'New Notice Uploaded.',
      'success'
    )
}


