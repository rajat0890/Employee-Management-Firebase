function selectDate(){
    $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 80, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
        });
}

function addEmp(){
    var rootRef = firebase.database().ref().child("Employee");
    rootRef.on("child_added", snap => {
        var empNo = snap.ref.key;
        var empId = parseInt(empNo)+1;
        document.getElementById("empNoHidden").value = empId;
    });
    document.getElementById("viewEmployeeDiv").style.display = "none";
    document.getElementById("addEmployeeDiv").style.display = "block";
}


function viewEmployee(){
    document.getElementById("addEmployeeDiv").style.display = "none";
    document.getElementById("viewEmployeeDiv").style.display = "block";
document.getElementById("table_body").innerHTML = "";
    var rootRef = firebase.database().ref().child("Employee");
    rootRef.on("child_added", snap => {
        var firstname = snap.child("FIRSTNAME").val();
        var lastname = snap.child("LASTNAME").val();
        var email = snap.child("EMAIL").val();
        var mobile = snap.child("MOBILE").val();
        var dob = snap.child("DOB").val();
        var empNo = snap.ref.key;
        $("#table_body").append("<tr><td>"+ empNo +"</td><td>"+ firstname +" "+ lastname +"</td><td>"+ email +"</td><td>"+ mobile +"</td><td>"+ dob +"</td><td><a style='cursor:pointer' onclick='deleteEmp("+ empNo +")'>Remove</a> | <a style='cursor:pointer' id='update"+ empNo +"'>Update</a></td></tr>");
        document.getElementById("update"+empNo).onclick = function(){updateEmp(empNo,firstname,lastname,email,mobile,dob)};
    });
}

function addEmployee(){
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var emailAdd = document.getElementById("email_address").value;
    var mobNo = document.getElementById("mobile_number").value;
    var doB = document.getElementById("date_of_birth").value;
    var empNo = document.getElementById("empNoHidden").value;
    if(null == empNo || empNo == ""){
        empNo = "1";
    }
    writeEmployeeData(empNo,firstName,lastName,emailAdd,mobNo,doB);
}

var firebaseRef = firebase.database().ref();
function writeEmployeeData(empId,firstName,lastName,emailAdd,mobNo,doB) {
  firebaseRef.child("Employee").child(empId).set({
      FIRSTNAME : firstName,
      LASTNAME : lastName,
      MOBILE : mobNo,
      EMAIL : emailAdd,
      DOB : doB
  });
}

function deleteEmp(empId){
    firebaseRef.child("Employee").child(empId).remove();
    viewEmployee();
}

function updateEmp(empId,firstName,lastName,email,mobNo,doB){
    document.getElementById("first_name").value = firstName;
    document.getElementById("last_name").value = lastName;
    document.getElementById("email_address").value = email;
    document.getElementById("mobile_number").value = mobNo;
    document.getElementById("date_of_birth").value = doB;
    document.getElementById("empNoHidden").value = empId;
    document.getElementById("viewEmployeeDiv").style.display = "none";
    document.getElementById("addEmployeeDiv").style.display = "block";

}

