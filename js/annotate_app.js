/*
================================================================================
    Video Annotation Platform App JS
    
    Class: ECE 435
================================================================================
*/

/*
================================================================================
    Variables.
================================================================================
*/
var annotationList = [];
var videoPlayer = null;
var canvas = null;
var currentAnnotation = null;
var canHeight;
var canWidth;

/*
================================================================================
    Hooks.
================================================================================
*/

document.addEventListener("DOMContentLoaded", init, false);
window.setInterval(redraw, 1000); // Call redraw every second.

/*
    Initialize the app.
*/
function init() {
    // Setup video links.
    var videoLinks = document.getElementsByClassName("video-link");
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = loadVideo(link.getAttribute("url"));
        // TODO
    };

    videoPlayer = document.getElementById("video-player");

    // Create drawing canvas.
    canvas = document.createElement("canvas");
    canvas.className = "canvases";
    canvas.style.zIndex = videoPlayer.zIndex + 1;
    var videoDiv = document.getElementById("video-div");
    videoDiv.appendChild(canvas);
    videoPlayer.addEventListener("play", redraw);
    canvas.addEventListener("click", actOnClick, false);
	
	canWidth = canvas.width;
	canHeight = canvas.height;
}

/*
================================================================================
    General.
================================================================================
*/

/*
    Load a video.
*/
function loadVideo(url) {
    // TODO
}

/*
    Called on mouse click.
*/
function actOnClick(event) {
    // Calculate relative mouse coordinates.
    var pos = getPosition(canvas);
	
    var xPos = event.pageX - pos.x;
    var yPos = event.pageY - pos.y;
	
	xPos *= canvas.width/canvas.offsetWidth;
	yPos *= canvas.height/canvas.offsetHeight;

	
    if (currentAnnotation == null) {
        startAnnotation(xPos, yPos);
    }
}

/*
    Get element position.

    Source: http://www.kirupa.com/html5/get_element_position_using_javascript.htm
*/
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



/*
    Start a new annotation.
*/
function startAnnotation(x, y) {
    videoPlayer.pause();
    currentAnnotation =  new Annotation();
    currentAnnotation.start = videoPlayer.currentTime;
    currentAnnotation.x = x;
    currentAnnotation.y = y;
    redraw();
    showInputField();
}

/*
    Finalize current annotation.
*/
function finalizeAnnotation() {
    if (!currentAnnotation) {
        return;
    }
    var contentField = document.getElementById("content-text");
    currentAnnotation.content = contentField.value;
    currentAnnotation.end = videoPlayer.currentTime

    if (currentAnnotation.content == ""
        || currentAnnotation.end - currentAnnotation.start <= 0) {
        return;
    }

    annotationList.push(currentAnnotation);
    annotationList.sort(compareAnnotations);
    currentAnnotation = null;
    hideInputField();
}

/*
    Discard current annotation.
*/
function discardAnnotation() {
    currentAnnotation = null;
    hideInputField();
    redraw();
}

/*
    Draw annotation box.
*/
function drawAnnotation(ann, ctx) {
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 1;
	
	if (ann.x-25 < 0){
		ann.x = 25;
	}
	else if (ann.x > canWidth-25){
		ann.x = canWidth-25;
	}
	
	if (ann.y-25 < 0){
		ann.y = 25;
	}
	else if (ann.y > canHeight-25){
		ann.y = canHeight-25;
	}
	
	
    ctx.strokeRect((ann.x-25), (ann.y-25), 50, 50);
	
}

/*
    Redraw the canvas. Called automatically every second and on certain events.
*/
function redraw() {
    var currentTime = videoPlayer.currentTime;
    var ctx = canvas.getContext("2d");
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

/*
    Update the annotation list.
*/
function updateList() {
    var currentTime = videoPlayer.currentTime;
    var contentList = document.getElementById("annotation-list");
    contentList.innerHTML = "";
    
    var list = document.createElement('ul');

    for (var i = 0; i < annotationList.length; i++) {
        var item = document.createElement('li');
        var current = annotationList[i];
        var contentString = "[" + current.start + "-" + current.end + "] "
                            + current.content + " (" + current.username + ")";
        item.appendChild(document.createTextNode(contentString));

        if (currentTime >= current.start && currentTime <= current.end) {
            item.style.color = "#FF0000";
        }
        
        list.appendChild(item);
    }

    contentList.appendChild(list);
}

/*
    Display input field.
*/
function showInputField() {
    var inputArea = document.getElementById("input-area");
    inputArea.style.display = "block";
}

/*
    Hide input field.
*/
function hideInputField() {
    var inputArea = document.getElementById("input-area");
    inputArea.style.display = "none";
}

/*
    Comparator for sorting the annotation array.
*/
function compareAnnotations(a, b) {
    return a.start - b.start;
}

/*
================================================================================
    Cookie handling.
================================================================================
*/

/*
    Create a cookie.
    
    Params:
        key     Cookie key.
        value   Cookie value.
        exdays  Days until expiration.
*/
function setCookie(key, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = key + "=" + value + "; " + expires;
}

/*
    Retrieve a cookie value by key.
    
    Params:
        key     Cookie key.
    
    Return:
        Value for the specified cookie key.
*/
function getCookie(key) {
    var name = key + "=";
    var tokens = document.cookie.split(";");
    for(var i = 0; i < tokens.length; i++) {
        var c = tokens[i];
        while (c.charAt(0)==" ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

/*
    Clear a cookie.
    
    Params:
        key     Cookie key to clear.
*/
function clearCookie(key) {
    setCookie(key, "", 0);
}

/*
================================================================================
    Annotation class.
================================================================================
*/
function Annotation() {
    var username = getCookie("user");
    var start = 0;
    var end = 0;
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;
    var content = "";
}