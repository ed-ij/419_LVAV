var database;

var annotationPage = "../annotationPage.html";
var fileTreePage = "fileTree/loadPage.html";

var annotationServer = "https://example.com/"; // this is the root directory for the file structure you want to get videos from
var fileTreeServer = annotationServer; // this is generally the same as above but has been setup to allow different structures if you need that

var config = {
    // this data can be copied and pasted from the firebase console
    // first select "Add app" from just below the project name
    // then selecting the web app icon
    // give your app a nickname and copy the config data across
    apiKey: "",
    authDomain: "example.firebaseapp.com",
    databaseURL: "https://example.firebaseio.com",
    projectId: "example",
    storageBucket: "example.appspot.com",
    messagingSenderId: "example",
    appId: "example"
};
