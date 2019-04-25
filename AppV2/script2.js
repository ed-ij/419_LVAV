document.addEventListener("DOMContentLoaded", init, false);

var addNew;
var labelnameDiv;
var lbText;
var caDiv;
var createAnnotation;

var submit;
var colorPick;
var cp;
var namebox;
var labelName;
var labelBox;
var newButton;
var newLabel;
//var annArray = [];
var cow = 0;
var newAnnotationBox = null;
var nAB = null;
var a;


var idArray = [];

var labelArray = [];

var annotationList = [];
var video;
var user = "";
var videoURL = "";

var currentAnnotation = null;
var canHeight;
var canWidth,
    drag = false,
    editting = false,
    list = [],
    mouseX,
    mouseY,
    closeEnough = 5,
    dragTL = false, dragBL = false,dragTR = false,dragBR = false, time = 0, reloaded=false, playingSeg=false;

var color;
var label;
var invisibox;

var canvas = document.createElement("canvas");
var videoDiv = document.getElementById("vid-div");
var videoContainer = document.getElementById('videoContainer');
var video = document.getElementById('video');
var videoControls = document.getElementById('video-controls');

var finalAnnotations = [];
var getEndTime;
var stringEndTime;
var getStartTime;
var stringStartTime;

var color;
var label;


var beginTimeText;
var beginTime;
var endTimeText;
var endTime;
var finalize;

var btAssign;
var endAssign;
var check;
var newLabelCreate = document.getElementById('new-new');
var labelContainer = document.getElementById('label-home');
labelContainer.id = "labelContainer";
//var labelPods = document.createElement('div');
//labelContainer.appendChild(labelPods);
var newBox;

var busy1 = false;
var busy2 = false;


// for firebase integration:
var database;

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


/*window.setInterval(redraw, 250); // Call redraw every second.
window.onbeforeunload = function(){
    sessionStorage.time = video.currentTime;
    return null;
}
window.onload = function() {
    var time = sessionStorage.getItem(time);
}*/

canvas.className = "canvases";
videoDiv.appendChild(canvas);
canvas.style.position = 'relative';
//video.currentTime = sessionStorage.time;
//canvas.style.zIndex = video.zIndex + 1;
//video.addEventListener("play", redraw);
canWidth = canvas.width;
canHeight = canvas.height;
var ctx = canvas.getContext("2d");

var supportsVideo = !!document.createElement('video').canPlayType;



if (supportsVideo) {
    // Obtain handles to main elements
    // Hide the default controls
    video.controls = false;

    // Display the user defined video controls
    videoControls.setAttribute('data-state', 'visible');

    // Obtain handles to buttons and other elements
    var playpause = document.getElementById('playpause');
    var stop = document.getElementById('stop');
    var mute = document.getElementById('mute');
    var volinc = document.getElementById('volinc');
    var voldec = document.getElementById('voldec');
    var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
    var fullscreen = document.getElementById('fs');

    var currentTime = document.getElementById('current-time');
    currentTime.style.position = "relative";
    currentTime.style.display = "inline-block";
    currentTime.innerHTML = video.duration;
    currentTime.style.backgroundColor = "black";
    currentTime.style.fontSize = "20px";
    currentTime.style.padding = "5px";

    var vidDur = document.getElementById('vid-duration');
    vidDur.style.position = "relative";
    vidDur.style.display = "inline-block";
    vidDur.innerHTML = video.duration;
    vidDur.style.backgroundColor = "black";
    vidDur.style.fontSize = "20px";
    vidDur.style.padding = "5px";
    vidDur.style.left = "5px";


    progress.style.display = "inline-block";
    // If the browser doesn't support the progress element, set its state for some different styling
    var supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) progress.setAttribute('data-state', 'fake');

    // Check if the browser supports the Fullscreen API
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    // If the browser doesn't support the Fulscreen API then hide the fullscreen button
    if (!fullScreenEnabled) {
        fullscreen.style.display = 'none';
    }

    // Check the volume
    var checkVolume = function(dir) {
        if (dir) {
            var currentVolume = Math.floor(video.volume * 10) / 10;
            if (dir === '+') {
                if (currentVolume < 1) video.volume += 0.1;
            }
            else if (dir === '-') {
                if (currentVolume > 0) video.volume -= 0.1;
            }
            // If the volume has been turned off, also set it as muted
            // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
            if (currentVolume <= 0) video.muted = true;
            else video.muted = false;
        }
        changeButtonState('mute');
    }


    // Change the volume
    var alterVolume = function(dir) {
        checkVolume(dir);
    }

    // Set the video container's fullscreen state
    var setFullscreenData = function(state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
        // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
        fullscreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
    }

    // Checks if the document is currently in fullscreen mode
    var isFullScreen = function() {
        return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    // Fullscreen
    var handleFullscreen = function() {
        // If fullscreen mode is active...
        if (isFullScreen()) {
            // ...exit fullscreen mode
            // (Note: this can only be called on document)
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            setFullscreenData(false);
        }
        else {
            // ...otherwise enter fullscreen mode
            // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
            if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
            else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
            else if (videoContainer.webkitRequestFullScreen) {
                // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
                // ensures that our custom controls are visible:
                // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
                // figure[data-fullscreen=true] .controls { z-index:2147483647; }
                video.webkitRequestFullScreen();
            }
            else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
            setFullscreenData(true);
        }
    }


    // Only add the events if addEventListener is supported
    if (document.addEventListener) {
        // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
        video.addEventListener('loadedmetadata', function() {
            progress.setAttribute('max', video.duration);
        });

        // Changes the button state of certain button's so the correct visuals can be displayed with CSS
        var changeButtonState = function(type) {
            // Play/Pause button
            if (type == 'playpause') {
                if (video.paused || video.ended) {
                    playpause.setAttribute('data-state', 'play');
                }
                else {
                    playpause.setAttribute('data-state', 'pause');
                }
            }
            // Mute button
            else if (type == 'mute') {
                mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
            }
        }

        // Add event listeners for video specific events
        video.addEventListener('play', function() {
            changeButtonState('playpause');
            video.ontimeupdate = function(){
                document.getElementById('current-time').innerHTML = video.currentTime;
            }
        }, false);
        video.addEventListener('pause', function() {
            changeButtonState('playpause');
        }, false);
        video.addEventListener('volumechange', function() {
            checkVolume();
        }, false);

        // Add events for all buttons
        playpause.addEventListener('click', function(e) {
            if (video.paused || video.ended) video.play();
            else video.pause();
        });

        // The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
        stop.addEventListener('click', function(e) {
            video.pause();
            video.currentTime = 0;
            progress.value = 0;
            // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
            changeButtonState('playpause');
        });
        mute.addEventListener('click', function(e) {
            video.muted = !video.muted;
            changeButtonState('mute');
        });
        volinc.addEventListener('click', function(e) {
            alterVolume('+');
        });
        voldec.addEventListener('click', function(e) {
            alterVolume('-');
        });
        fs.addEventListener('click', function(e) {
            handleFullscreen();
        });

        // As the video is playing, update the progress bar
        video.addEventListener('timeupdate', function() {
            // For mobile browsers, ensure that the progress element's max attribute is set
            if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
            progress.value = video.currentTime;
            progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
        });

        // React to the user clicking within the progress bar

        //    progress.addEventListener('click', function(e) {
        //var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
        /*var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
            video.currentTime = pos * video.duration;*/

        /*var x = e.pageX - this.offsetLeft;
            var x = x - this.offsetParent.offsetLeft;
            var clickedVal = x * progress.max / progress.offsetWidth;

            video.currentTime = clickedVal;*/





        //   });



        /*   function clickedBar(e){
            if(!myMovie.paused && !myMovie.ended){
                var mouseX=e.pageX-bar.offsetLeft;
                var newtime=mouseX*myMovie.duration/barSize;
                myMovie.currentTime=newtime;
                progressBar.style.width=mouseX+'px';
            }
        }*/
        // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
        document.addEventListener('fullscreenchange', function(e) {
            setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
        });
        document.addEventListener('webkitfullscreenchange', function() {
            setFullscreenData(!!document.webkitIsFullScreen);
        });
        document.addEventListener('mozfullscreenchange', function() {
            setFullscreenData(!!document.mozFullScreen);
        });
        document.addEventListener('msfullscreenchange', function() {
            setFullscreenData(!!document.msFullscreenElement);
        });

        videoName = getVideoName();
        console.log(videoName);

        newLabel = document.getElementById('create-new');
        newLabel.addEventListener('click', function(){ //Create New Label is pressed.

            if(busy1 == false)
            {
                busy1 = true;
                createNewLabel();
            }
        });

        newBox = document.getElementById('new-new'); //container holding all new labels
        newBox.addEventListener('click', function(e){ //Submit is pressed
            if(e.target && e.target.id == "submit")
            {

                color = document.getElementById("colorPick").value;
                label = document.getElementById("namebox").value;

                submitLabel(color, label);

            }
        });



        labelContainer.addEventListener('click', function(e){ //Create New Annotation is pressed
            var num = 0;
            if(e.target && e.target.id == "addNew")
            {
                //console.log(e.target.parentElement.parentElement.children);
                color = e.target.parentElement.style.backgroundColor;
                label = e.target.parentElement.id;
                var boxInd;

                if(busy2 == false)
                {
                    busy2 = true;

                    var numibox = document.getElementsByTagName('tot');
                    for(var i = 0; i < numibox.length; i++)
                    {
                        if(e.target.parentElement == numibox[i])
                        {
                            boxInd = i;
                        }
                    }

                    var kids = e.target.parentElement.parentElement.children;
                    kids = kids.length;
                    //console.log(kids);
                    createNewAnnotation(color, label, kids, e.target.parentElement.parentElement);


                }


            }
        });


        labelContainer.addEventListener('click', function(e){

            if(e.target && e.target.id == "finalize")
            {
                busy1 = false;
                busy2 = false;

                finalizeNewAnno();
                var dad = e.target.parentElement;
                dad.parentElement.removeChild(nAB);
                discardAnnotation();

            }

        });

        labelContainer.addEventListener('click', function(e){

            if(e.target && e.target.id == "delete")
            {

                var thisid = e.target.parentElement.id;
                var kids = e.target.parentElement.parentElement.children;
                //console.log(kids.length);
                for(var i = 0; i < kids.length; i++)
                {

                    if(kids[i].id == thisid)
                        kids[i].parentElement.removeChild(kids[i]);
                    if(kids[i].id == "nAB")
                        kids[i].parentElement.removeChild(kids[i]);

                    busy2 = false;

                }
            }
        });


    }
}

canvas.addEventListener('click', function(){
    if(video.paused == false)
        video.pause();

});

/*
labelContainer.addEventListener('click', function(e){

    if(e.target && e.target.id == "invisibox")
    {

    }
});
*/




//Start New Shit
//Function creates new input form to get label name and color
function createNewLabel(){ //Creates box in which you can name label and select color


    if(document.getElementById('newButton') == null)
    {
        newButton = document.createElement('div');
        labelName = document.createElement('div');
        namebox = document.createElement('input');
        cp = document.createElement('div');
        colorPick = document.createElement('input');
        submit = document.createElement('button');






        newButton.id = "newButton";
        newButton.style.width = "100% - 5px";


        labelName.id = 'labelname';
        labelName.innerHTML = "LABEL: ";


        namebox.setAttribute("name", "text");
        namebox.id = 'namebox';


        cp.id = "cp";
        cp.innerHTML = "COLOR: ";


        colorPick.setAttribute("type", "color");
        colorPick.id = 'colorPick';


        submit.id = "submit";
        submit.innerHTML = "SUBMIT";

        labelName.appendChild(namebox);
        newButton.appendChild(labelName);
        newButton.appendChild(cp);
        newButton.appendChild(colorPick);
        newButton.appendChild(submit);
        newLabelCreate.appendChild(newButton);

        //submit.addEventListener('click', submitLabel);
    }
}

//function executes when Submit is pressed on input form. Creates The Label with Create
// new Annotation button.
function submitLabel(color, label){

    /*color = document.getElementById("colorPick").value;
    label = document.getElementById("namebox").value;*/

    createAnnotation = document.createElement('div');
    labelnameDiv = document.createElement('div');
    caDiv = document.createElement('div');
    addNew = document.createElement('button');



    createAnnotation.id = label;
    createAnnotation.className = "createAnnotation";
    createAnnotation.style.backgroundColor = color;
    createAnnotation.style.color = "white";
    createAnnotation.style.margin = "1px";



    caDiv.id = "caDiv";


    lbText = document.createElement('div');
    lbText.id = "lbText";
    lbText.innerHTML = "LABEL: ";


    labelnameDiv.id = "labelnameDiv";
    labelnameDiv.innerHTML = document.getElementById("namebox").value;


    addNew.id = "addNew";
    addNew.innerHTML = "&#43 Create New Annotation";
    addNew.style.backgroundColor = color;
    addNew.style.color = "white";

    firebaseNewLabel(labelnameDiv.innerHTML, color, videoName);




    newLabelCreate.removeChild(newButton);
    caDiv.appendChild(lbText);
    caDiv.appendChild(labelnameDiv);
    createAnnotation.appendChild(caDiv);
    createAnnotation.appendChild(addNew);

    invisibox = document.createElement('tot');
    invisibox.appendChild(createAnnotation);
    invisibox.id = "invisibox";
    labelContainer.appendChild(invisibox);
    //createAnnotation.addEventListener('click',createNewAnnotation);

}

//Create New Annotation is pressed, so this should create the form
//to draw the square and get the begin and end times.
function createNewAnnotation(color, label, index, e){

    newAnnotationBox = document.createElement('div');
    a = document.createElement('a');
    //check = document.createElement('button');
    beginTimeText = document.createElement('div');
    beginTime = document.createElement('div');
    endTimeText = document.createElement('div');
    endTime = document.createElement('div');
    finalize = document.createElement('button');
    btAssign = document.createElement('button');
    endAssign = document.createElement('button');



    newAnnotationBox.id = label + index;
    newAnnotationBox.style.backgroundColor = color;
    newAnnotationBox.innerHTML = label + ": " + index;
    newAnnotationBox.style.width = "80%";
    newAnnotationBox.style.float = "right";
    newAnnotationBox.style.color = "white";
    newAnnotationBox.style.padding = "10px";
    newAnnotationBox.style.margin = "1px";
    newAnnotationBox.name = "nabox";


    nAB = document.createElement('bil');
    nAB.class = "nAB";
    nAB.id = "nAB";
    nAB.style.backgroundColor = color;


    a.innerHTML = "&#10006";
    a.style.float = "right";
    a.style.padding = "2px";
    a.style.color = "white";
    a.id = "delete";


    /*check.type = "button";
    check.class = "check";
    check.id = label + cow;
    check.style.position = "relative";
    check.style.left = "30%";
    check.innerHTML = "Draw Annotation";*/


    beginTimeText.innerHTML = "BEGIN: ";


    beginTime.id = "beginTime";
    beginTime.class = "without_ampm";


    btAssign.id = "btAssign";
    btAssign.class = "assign-buttons";
    btAssign.innerHTML = "ASSIGN";


    endTime.id = "endTime";
    endTime.class = "without_ampm";
    endTime.max = video.duration;



    endTimeText.innerHTML = "END:";


    endAssign.name = "submit";
    endAssign.id = "endAssign";
    endAssign.class = "assign-buttons";
    endAssign.innerHTML = "ASSIGN";


    finalize.id = "finalize";
    finalize.class = "check";
    finalize.innerHTML = "FINALIZE";


    newAnnotationBox.appendChild(a);
    //newAnnotationBox.appendChild(check);
    nAB.appendChild(beginTimeText);
    beginTimeText.appendChild(beginTime);
    beginTimeText.appendChild(btAssign);
    endTimeText.appendChild(endTime);
    endTimeText.appendChild(endAssign);
    nAB.appendChild(endTimeText);
    nAB.appendChild(finalize);


    /*invisibox.appendChild(newAnnotationBox);
    invisibox.appendChild(nAB);*/

    e.appendChild(newAnnotationBox);
    e.appendChild(nAB);

    //nAB.style.display = "none";


    drawEditAnnotation(color, label);
    cow++;
    //annArray.push(newAnnotationBox);
}


function drawEditAnnotation(){
    /* if(check.parentElement.style.border == "5px solid lime") //draw annotation already selected
    {
        check.parentElement.style.border == "none";
        canvas.addEventListener('mouseover', function(){
            canvas.style.cursor = "default";
        } );


    }
    else //new draw annotation selected
    {*/
    /* var all = document.getElementsByTagName('*');

        for(var i = 0; i < all.length; i++)
        {
            all[i].style.border = "none";
        }

        var allbils = document.getElementsByTagName('bil');

        for(var i = 0; i < allbils.length; i++)
        {
            if(allbils[i].id != check.id)
                allbils[i].style.display = "none";
            else
                allbils[i].style.display = "block";

        }*/






    btAssign.addEventListener('click', function(){

        getStartTime = video.currentTime;
        getStartTime = getStartTime.toFixed(2);
        stringStartTime = getStartTime.toString();
        beginTime.innerHTML = stringStartTime;

    });

    endAssign.addEventListener('click', function(){


        getEndTime = video.currentTime;
        getEndTime = getEndTime.toFixed(2);
        stringEndTime = getEndTime.toString();
        endTime.innerHTML = stringEndTime;

    });

    canvas.addEventListener('mouseover', function(){
        canvas.style.cursor = "crosshair";
    } );
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);


    //}
}

function finalizeNewAnno(){

    var x, y, w, h;
    x = currentAnnotation.x;
    y = currentAnnotation.y;
    w = currentAnnotation.w;
    h = currentAnnotation.h;
    /*
    var newAnnotation = {id: newAnnotationBox.id, begin: getStartTime, end: getEndTime, x: x, y: y, w: w, h: h};
    finalAnnotations.push(newAnnotation);
    */
    //console.log(newAnnotation);

    var newAnnotationKey = database.ref().child('annotations').push().key;
    console.log(newAnnotationKey);
    var newAnnotationStatus = firebaseUpdate(newAnnotationKey, newAnnotationBox.id, getStartTime, getEndTime, x, y, w, h, videoName);
    console.log(newAnnotationStatus);

}
//END My code/*
function mouseDown(e) {
    // Calculate relative mouse coordinates.
    video.pause();
    var pos = getPosition(canvas);

    mouseX = e.pageX - pos.x;
    mouseY = e.pageY - pos.y;



    /*var xPos = event.pageX - pos.x;
    var yPos = event.pageY - pos.y;
	*/
    mouseX *= canvas.width/canvas.offsetWidth;
    mouseY *= canvas.height/canvas.offsetHeight;



    if (currentAnnotation == null) {

        startAnnotation(mouseX, mouseY);
    }
    else if (checkCloseEnough(mouseX, currentAnnotation.x) && checkCloseEnough(mouseY, currentAnnotation.y)) {
        dragTL = true;
    }
    // 2. top right
    else if (checkCloseEnough(mouseX, currentAnnotation.x + currentAnnotation.w) && checkCloseEnough(mouseY, currentAnnotation.y)) {
        dragTR = true;

    }
    // 3. bottom left
    else if (checkCloseEnough(mouseX, currentAnnotation.x) && checkCloseEnough(mouseY, currentAnnotation.y + currentAnnotation.h)) {
        dragBL = true;

    }
    // 4. bottom right
    else if (checkCloseEnough(mouseX, currentAnnotation.x + currentAnnotation.w) && checkCloseEnough(mouseY, currentAnnotation.y + currentAnnotation.h)) {
        dragBR = true;

    }
    // (5.) none of them
    else {
        // handle not resizing
        startAnnotation(mouseX, mouseY);
    }
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}

function startAnnotation(x, y) {

    currentAnnotation =  new Annotation();
    currentAnnotation.start = video.currentTime;
    //document.getElementById("start-time").value = currentAnnotation.start;
    currentAnnotation.x = x;
    currentAnnotation.y = y;
    //redraw();
    // if there isn't a rect yet
    if (currentAnnotation.w === undefined) {
        currentAnnotation.x = mouseX;
        currentAnnotation.y = mouseY;
        currentAnnotation.w = 1;
        currentAnnotation.h = 1;
        dragBR = true;
    }

    redraw();
    showInputField();
}

function finalizeAnnotation() {
    if (!currentAnnotation) {
        return;
    }
    var contentField = document.getElementById("content-text");
    if(currentAnnotation.dbID == null){
        currentAnnotation.content = contentField.value;
        currentAnnotation.end = video.currentTime;
        currentAnnotation.dbID= -1;
        currentAnnotation.username=user;
        if (currentAnnotation.content == ""
            || currentAnnotation.end - currentAnnotation.start <= 0) {
            return;
        }

        annotationList.push(currentAnnotation);
    }
    else {//find in the list and update
        if (editting = true){
            currentAnnotation.content = contentField.value;
            for (var i = 0; i<annotationList.length; i++){
                if (annotationList[i].dbID == currentAnnotation.dbID){
                    //update its stuff instead
                    annotationList[i] = currentAnnotation;
                    //make sure we mark it somehow so we know it changed in the db
                    annotationList[i].changed = true;
                }

            }

        }}
    editting = false;
    annotationList.sort(compareAnnotations);
    currentAnnotation = null;
    hideInputField();
}

function discardAnnotation() {
    currentAnnotation = null;
    //hideInputField();
    editting = false;
    redraw();
}

function drawAnnotation(ann, ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(ann.x + 0.5,ann.y + 0.5, ann.w, ann.h);
    ctx.stroke();
    if (currentAnnotation!=null){
        drawHandles();  }
}

function redraw() {

    /*var currentTime = video.currentTime;
    if (editting == false){
        document.getElementById("end-time").value = currentTime; //change this if editting so it doesn't get weird.
    }*/

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentAnnotation) {
        drawAnnotation(currentAnnotation, ctx);
    }

    for (var i = 0; i < annotationList.length; i++) {
        var ann = annotationList[i];
        if (currentTime >= ann.start && currentTime <= ann.end) {
            drawAnnotation(ann, ctx);
        }
    }
    updateList();
}

function drawSquare(x, y, radius) {
    ctx.fillStyle = color;
    ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius);
}

function drawHandles() {
    drawSquare(currentAnnotation.x, currentAnnotation.y, closeEnough);
    drawSquare(currentAnnotation.x + currentAnnotation.w, currentAnnotation.y, closeEnough);
    drawSquare(currentAnnotation.x + currentAnnotation.w, currentAnnotation.y + currentAnnotation.h, closeEnough);
    drawSquare(currentAnnotation.x, currentAnnotation.y + currentAnnotation.h, closeEnough);
}

function checkCloseEnough(p1, p2) {
    return Math.abs(p1 - p2) < closeEnough;
}

function mouseUp() {
    dragTL = false;
    dragTR = false;
    dragBL = false;
    dragBR = false;
}

function mouseMove(e) {
    if (currentAnnotation!=null){
        pos = getPosition(canvas);
        mouseX = e.pageX - pos.x;
        mouseY = e.pageY - pos.y;

        mouseX *= canvas.width/canvas.offsetWidth;
        mouseY *= canvas.height/canvas.offsetHeight;
        if (dragTL) {
            currentAnnotation.w += currentAnnotation.x - mouseX;
            currentAnnotation.h += currentAnnotation.y - mouseY;
            currentAnnotation.x = mouseX;
            currentAnnotation.y = mouseY;
        } else if (dragTR) {
            currentAnnotation.w = Math.abs(currentAnnotation.x - mouseX);
            currentAnnotation.h += currentAnnotation.y - mouseY;
            currentAnnotation.y = mouseY;
        } else if (dragBL) {
            currentAnnotation.w += currentAnnotation.x - mouseX;
            currentAnnotation.h = Math.abs(currentAnnotation.y - mouseY);
            currentAnnotation.x = mouseX;
        } else if (dragBR) {
            currentAnnotation.w = Math.abs(currentAnnotation.x - mouseX);
            currentAnnotation.h = Math.abs(currentAnnotation.y - mouseY);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw();
    }
}

function updateList() {
    var currentTime = video.currentTime;
    var contentList = document.getElementById("annotation-list");
    //contentList.innerHTML = "";


    for (var i = 0; i < annotationList.length; i++) {
        var item = document.createElement('li');
        var current = annotationList[i];
        var a = document.createElement('a');
        var linkText = document.createTextNode(current.content);
        a.appendChild(linkText);
        a.title = "anno";
        a.href = "javascript:playSegment("+current.start+","+current.end+")";
        var contentString = "   [" + current.start + "-" + current.end + "] ";
        var userString= " (" + current.username + ")";
        var btn = document.createElement("BUTTON");        // Create a <button> element
        var t = document.createTextNode("X");       // Create a text node
        btn.setAttribute("onClick", 'removeAnno('+i+')');
        btn.appendChild(t);                                // Append the text to <button>
        item.appendChild(btn);
        var ebtn = document.createElement("BUTTON");        // Create a <button> element
        var et = document.createTextNode("Edit");       // Create a text node
        ebtn.setAttribute("onClick", 'editAnno('+i+')');
        ebtn.appendChild(et);                                // Append the text to <button>
        item.appendChild(ebtn);
        item.appendChild(document.createTextNode(contentString));
        item.appendChild(a);
        item.appendChild(document.createTextNode(userString));

        if (currentTime >= current.start && currentTime <= current.end) {
            if(current.dbID == -1){
                item.style.color = "#FF0000";
                item.style.fontWeight  = 'bold';
            }
            else{
                item.style.color="#0000FF";
                item.style.fontWeight  = 'bold';
            }
        }

        list.appendChild(item);
    }

    contentList.appendChild(list);
}

function removeAnno(index){
    var sure = window.confirm("Remove this annotation? (This will remove the database entry)");
    if (sure == true){
        if (annotationList[index].dbID == -1){
            annotationList.splice(index,1);
            updateList();
        }
        else //this requires some mysqli
        {
            var page = "deleteanno.php?q="+annotationList[index].dbID;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                var xmlhttp = new XMLHttpRequest();
            }
            else {
                // code for IE6, IE5
                var  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    // Request completed
                    annotationList.splice(index,1);
                    updateList();
                }
            }
            xmlhttp.open("POST", page, true);
            xmlhttp.send();

        }
    }
}

function editAnno(index){ //this needs some adjustments still
    currentAnnotation = annotationList[index];
    video.currentTime = currentAnnotation.start;
    document.getElementById("content-text").value = currentAnnotation.content;
    document.getElementById("start-time").value = currentAnnotation.start;
    document.getElementById("end-time").value = currentAnnotation.end;
    showInputField();
    editting=true;
}

function showInputField() {
    var inputArea = document.getElementById("input-area");
    document.getElementById("input-area").value = "1";
    inputArea.style.display = "block";
}

function startbut() {
    document.getElementById("start-time").value = video.currentTime;
    currentAnnotation.start = video.currentTime;
}

function endbut() {
    document.getElementById("end-time").value =video.currentTime;
    currentAnnotation.end = video.currentTime;
}

function playSegment(start, end){
    video.pause();
    var source = video.src;
    video.src = videoURL+"#t="+start+","+end;
    console.log(videoURL);
    video.play();
    playingSeg = true;
}

function hideInputField() {
    var inputArea = document.getElementById("input-area");
    document.getElementById("start-time").value = "";
    document.getElementById("end-time").value = "";
    document.getElementById("content-text").value = "";
    inputArea.style.display = "none";
}

function compareAnnotations(a, b) {
    return a.start - b.start;
}

function Annotation() {
    var username = "";
    var dbID = -1;
    var start = 0;
    var end = 0;
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var content = "";
    var changed = false;
}



// Firebase Integration Functions

function firebaseUpdate(key, label, startTime, endTime, x, y, w, h, videoName) {
    var annotationData = {
        label: label,
        start: startTime,
        end: endTime,
        x: x,
        y: y,
        w: w,
        h: h,
        video: videoName,
    };
    var updates = {};
    updates['/annotations/' + key] = annotationData;
    updates[videoName + '/annotations/' + label] = key;
    return database.ref().update(updates);
}

function firebaseNewLabel(label, color, videoName) {
    var updates = {};
    updates[videoName + '/labels/' + label] = color;
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

function getVideoName() {
    var longVideoName = video.getAttribute("src");
    var videoName = "";
    longVideoName = longVideoName.slice(0, -4);
    longVideoName = longVideoName.replace("https://ece46medsrv.ece.unm.edu/", "");
    if (longVideoName.includes("https://ece46medsrv.ece.unm.edu/")){
        videoName = longVideoName.replace("https://ece46medsrv.ece.unm.edu/", "");
    }
    else {
        videoName = longVideoName;
    }
    return videoName;
}
