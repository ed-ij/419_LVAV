var database;

var annotationPageAddress = "../myAnnotate.html";
var fileTreePageAddress = "loadFileTree/loadPage.html";

var annotationServer = "https://example.com/"; // this is the root directory for the file structure you want to get videos from
var fileTreeServer = annotationServer; // this is generally the same as above but has been setup to allow different structures if you need that

var config = {
    apiKey: "",
    authDomain: "example.firebaseapp.com",
    databaseURL: "https://example.firebaseio.com",
    projectId: "example",
    storageBucket: "example.appspot.com",
    messagingSenderId: "example"
};
