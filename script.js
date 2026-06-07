var recNo = "";
console.log("script.js loaded");

var connToken = "764066023|7385821567737639504|764064672";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var baseUrl = "https://api.jsonpowerdb.com:5567/";
var iml = "/api/iml";
var irl = "/api/irl";
function validateData() {

    if ($("#fullName").val() === "") {
        alert("Enter Full Name");
        return "";
    }

    if ($("#studentClass").val() === "") {
        alert("Enter Class");
        return "";
    }

    if ($("#birthDate").val() === "") {
        alert("Enter Birth Date");
        return "";
    }

    if ($("#address").val() === "") {
        alert("Enter Address");
        return "";
    }

    if ($("#enrollDate").val() === "") {
        alert("Enter Enrollment Date");
        return "";
    }

    var jsonStrObj = {
        "Roll-No": $("#rollNo").val(),
        "Full-Name": $("#fullName").val(),
        "Class": $("#studentClass").val(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val(),
        "Enrollment-Date": $("#enrollDate").val()
    };

    return JSON.stringify(jsonStrObj);
}
function saveData() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var putReqStr = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );

    jQuery.ajaxSetup({async:false});

    var resultObj = executeCommandAtGivenBaseUrl(
        putReqStr,
        baseUrl,
        iml
    );

    jQuery.ajaxSetup({async:true});

    alert("Record Saved Successfully");

    resetForm();
}
function resetForm() {

    $("#rollNo").val("");
    $("#fullName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollDate").val("");

    $("#rollNo").prop("disabled", false);

    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollDate").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);

    $("#rollNo").focus();
}

$(document).ready(function () {
    resetForm();
$("#updateBtn").click(function () {
    updateData();
});
    $("#resetBtn").click(function () {
        resetForm();
    });
    $("#saveBtn").click(function () {
    saveData();
});
    $("#rollNo").blur(function () {
    checkRollNo();
});

function getRollNoAsJsonObj() {
    var rollNo = $("#rollNo").val();

    var jsonStr = {
        "Roll-No": rollNo
    };

    return JSON.stringify(jsonStr);
}
function updateData() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var updateReq = createUPDATERecordRequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        recNo
    );

    jQuery.ajaxSetup({async:false});

    var resultObj = executeCommandAtGivenBaseUrl(
        updateReq,
        baseUrl,
        iml
    );

    jQuery.ajaxSetup({async:true});

    alert("Record Updated Successfully");

    resetForm();
}
function checkRollNo() {

    var rollNoJsonObj = getRollNoAsJsonObj();

    var getRequest = createGET_BY_KEYRequest(
        connToken,
        dbName,
        relName,
        rollNoJsonObj
    );

    jQuery.ajaxSetup({async:false});

    var resultObj = executeCommandAtGivenBaseUrl(
        getRequest,
        baseUrl,
        irl
    );

    jQuery.ajaxSetup({async:true});
    console.log(resultObj);
    if (resultObj.status === 200) {

    var dataObj = JSON.parse(resultObj.data);

recNo = dataObj.rec_no;

var data = dataObj.record;

    $("#fullName").val(data["Full-Name"]);
    $("#studentClass").val(data["Class"]);
    $("#birthDate").val(data["Birth-Date"]);
    $("#address").val(data["Address"]);
    $("#enrollDate").val(data["Enrollment-Date"]);

    $("#rollNo").prop("disabled", true);

    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollDate").prop("disabled", false);

    $("#updateBtn").prop("disabled", false);
}
else {

    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollDate").prop("disabled", false);

    $("#saveBtn").prop("disabled", false);

    $("#fullName").focus();
}
}
});