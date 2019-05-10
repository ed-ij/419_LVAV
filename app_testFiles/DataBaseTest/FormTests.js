document.addEventListener("DOMContentLoaded", init, false);

/*
    Initialize the app.
*/
var database;
var endTime = document.getElementById("end-time-create");
var startTime = document.getElementById("start-time-create");
var label = document.getElementById("label-create");
var endTimeEdit = document.getElementById("end-time-edit");
var startTimeEdit = document.getElementById("start-time-edit");
var labelEdit = document.getElementById("label-edit");

function init() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAggWr9t0RNu2u5XzDSuZp85EYxB9G8tyI",
        authDomain: "lsvav-ece420.firebaseapp.com",
        databaseURL: "https://lsvav-ece420.firebaseio.com",
        projectId: "lsvav-ece420",
        storageBucket: "lsvav-ece420.appspot.com",
        messagingSenderId: "542547803047"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    console.log("Database setup complete");
}

function createAnnotation() {
    var currentLabel = label.value;
    console.log(currentLabel);
    var currentStartTime =startTime.value;
    console.log(currentStartTime);
    var currentEndTime = endTime.value;
    console.log(currentEndTime);
	if (currentLabel == "" || currentEndTime - currentStartTime <= 0) {
        return;
    }
    var newAnnotationKey = database.ref().child('annotations').push().key;
    console.log(newAnnotationKey);
    var videoName = "placeholderVideoTitle";
    var annotationData = {
        label: currentLabel,
        start: currentStartTime,
        end: currentEndTime,
        username: "defaultUser",
    };
    var updates = {};
    updates['/annotations/' + newAnnotationKey] = annotationData;
    updates['/videos/' + videoName + '/annotations/' + newAnnotationKey] = true;
    return database.ref().update(updates);
}
function getAnnotation() {
    var searchKey = document.getElementById("annotation-id-edit").value;
    console.log(searchKey);
	if (searchKey == "") {
        return;
    }
    var annotationRef = database.ref().child('annotations/'+[searchKey]);
    return annotationRef.once('value').then(function(snapshot){
        startTimeEdit.value = snapshot.val().start;
        endTimeEdit.value = snapshot.val().end;
        labelEdit.value = snapshot.val().label;
    });
}
function editAnnotation() {
    var currentLabel = labelEdit.value;
    console.log(currentLabel);
    var currentStartTime = startTimeEdit.value;
    console.log(currentStartTime);
    var currentEndTime = endTimeEdit.value;
    console.log(currentEndTime);
    var annotationKey = document.getElementById("annotation-id-edit").value;
    console.log(annotationKey);
	if (currentLabel == "" || annotationKey == "" || currentEndTime - currentStartTime <= 0) {
        return;
    }
    var annotationData = {
        label: currentLabel,
        start: currentStartTime,
        end: currentEndTime,
    };
    var updates = {};
    updates['/annotations/' + annotationKey] = annotationData;
    return database.ref().update(updates);
        //todo store keys, they are last element of reference address
}
function removeAnnotation() {
    var removeKey = document.getElementById("annotation-id-remove").value;
    console.log(removeKey);
    var videoName = "placeholderVideoTitle";
	if (removeKey == "") {
        return;
    }
    var annotationRef = database.ref().child('annotations/' + removeKey);
    annotationRef.remove()
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
    var videoRef = database.ref().child('videos/' + videoName + '/annotations/' + removeKey);
    videoRef.remove()
        .then(function() {
            console.log("Remove succeeded.")
        })
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
}
