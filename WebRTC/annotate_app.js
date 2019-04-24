/*
================================================================================
    Video Annotation Platform App JS
    Based on a project by Abby

    Class: ECE 419 & 420

    V0.0.1
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
var canWidth,
	  ctx = null,

      drag = false,
      mouseX,
      mouseY,
      closeEnough = 5,
      dragTL = dragBL = dragTR = dragBR = false;

/*
================================================================================
    Hooks.
================================================================================
*/

document.addEventListener("DOMContentLoaded", init, false);
window.setInterval(redraw, 250); // Call redraw every second.

/*
    Initialize the app.
*/
function init() {
	var database = firebase.database();

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
    //canvas.addEventListener("click", actOnClick, false);

	canWidth = canvas.width;
	canHeight = canvas.height;
     canvas.addEventListener('mousedown', mouseDown, false);
      canvas.addEventListener('mouseup', mouseUp, false);
      canvas.addEventListener('mousemove', mouseMove, false);
	  ctx = canvas.getContext('2d');
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
function mouseDown(e) {
    // Calculate relative mouse coordinates.
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
		document.getElementById("start-time").value = videoPlayer.currentTime;
    currentAnnotation.x = x;
    currentAnnotation.y = y;
    if (currentAnnotation.w === undefined) {
        currentAnnotation.x = mouseX;
        currentAnnotation.y = mouseY;
				currentAnnotation.w = 1;
        dragBR = true;
      }

    redraw();
		showInputField();
}

/*    Set current annotation start time, only really needed for edit annotation functionality  */
function setStartTime() {
		currentAnnotation.start = videoPlayer.currentTime;
		document.getElementById("start-time").value = videoPlayer.currentTime;
		}

/*		    Set current annotation end time, seperated from finalize annotation to make usage clearer  */
function setEndTime() {
		currentAnnotation.end = videoPlayer.currentTime;
		document.getElementById("end-time").value = videoPlayer.currentTime;
		}

/*    Finalize current annotation to list*/
function finalizeAnnotation() {
    if (!currentAnnotation) {
        return;
    }
    var contentField = document.getElementById("content-text");
    currentAnnotation.content = contentField.value;
		currentAnnotation.username = "defaultUser";
	  currentAnnotation.dbID=-1;
    if (currentAnnotation.content == ""
        || currentAnnotation.end - currentAnnotation.start <= 0) {
        return;
    }

    annotationList.push(currentAnnotation);
    annotationList.sort(compareAnnotations);
    //currentAnnotation = null;
		finalizeDatabaseAnnotation();
}
/*    Finalize current annotation  to database*/

function finalizeDatabaseAnnotation() {
    if (!currentAnnotation) {
        return;
    }
    var contentField = document.getElementById("content-text");
		if (currentAnnotation.content == ""
        || currentAnnotation.end - currentAnnotation.start <= 0) {
        return;
/*    var newAnnotationRef = database.push();
 			newAnnotationRef.set({
				category: contentField.value,
				start: currentAnnotation.start,
    		end: videoPlayer.currentTime,
				x: currentAnnotation.x,
				y: currentAnnotation.y,
				w: currentAnnotation.w,
				h: currentAnnotation.h,
				username: "defaultUser",
				//video: videoName													//todo store keys, they are last element of reference address
			}); */
			firebase.database().ref('users/' + abcde).set({
    		username: "name",
  		});
			return;
    }
		// need to rewrite the annotation list function to pull from the database
    currentAnnotation = null;
}

/*
    Discard current annotation.
*/
function discardAnnotation() {
    currentAnnotation = null;
    redraw();
}

/*
    Draw annotation box.
*/
function drawAnnotation(ann, ctx) {
	  ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 1;
	  ctx.fillStyle = "#FF0000";
      ctx.beginPath();
      ctx.rect(ann.x, ann.y, ann.w, ann.h);
	  ctx.fillText(ann.content, (ann.x-5),(ann.y-5));
      ctx.stroke();
		if (currentAnnotation!=null){
		drawHandles();  }
}

/*
    Redraw the canvas. Called automatically every second and on certain events.
		**Will need to be rewritten to work with the firebase database annotations
*/
function redraw() {

    var currentTime = videoPlayer.currentTime;
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
      ctx.fillStyle = "#FF0000";
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
      dragTL = dragTR = dragBL = dragBR = false;
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
      	}
				else if (dragTR) {
        	currentAnnotation.w = Math.abs(currentAnnotation.x - mouseX);
        	currentAnnotation.h += currentAnnotation.y - mouseY;
        	currentAnnotation.y = mouseY;
      	}
				else if (dragBL) {
        	currentAnnotation.w += currentAnnotation.x - mouseX;
        	currentAnnotation.h = Math.abs(currentAnnotation.y - mouseY);
        	currentAnnotation.x = mouseX;
      	}
				else if (dragBR) {
        	currentAnnotation.w = Math.abs(currentAnnotation.x - mouseX);
        	currentAnnotation.h = Math.abs(currentAnnotation.y - mouseY);
      	}
      	ctx.clearRect(0, 0, canvas.width, canvas.height);
      	redraw();
			}
    }

/*
    Update the annotation list
		**Will need to be rewritten to work with the firebase database annotations
*/
function updateList() {
    var currentTime = videoPlayer.currentTime;
    var contentList = document.getElementById("annotation-list");
    contentList.innerHTML = "";

    var list = document.createElement('ul');
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
    for (var i = 0; i < annotationList.length; i++) {
        var item = document.createElement('li');
        var current = annotationList[i];
        var contentString = "   [" + current.start + "-" + current.end + "] "
                            + current.content + " (" + current.username + ")";
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

        if (currentTime >= current.start && currentTime <= current.end) {
					if(current.dbID ==-1){
						item.style.color = "#FF0000";
					}
					else{
						item.style.color="#FFF000";
					}
					item.style.fontWeight  = 'bold';
        }
				list.appendChild(item);
    	}
    	contentList.appendChild(list);
		}

/*
	Removes an annotation from the list
	**Will need to be rewritten to work with the firebase database annotations
*/
function removeAnno(index){
	var sure = window.confirm("Remove this annotation? (This will remove the database entry)");
	if (sure == true){
		annotationList.splice(index,1);
		updateList();
	}
}

/*
	Edit an existing annotation
	**Will need to be rewritten to work with the firebase database annotations
*/
function editAnno(index){
	currentAnnotation = annotationList[index];
	showInputField();
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
		**Will need to be rewritten to work with the firebase database annotations
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
/*
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
/*fsdunction getCookie(key) {
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
/*function clearCookie(key) {
    setCookie(key, "", 0);
}
*/
/*
================================================================================
    Annotation class.
================================================================================
*/
function Annotation() {
    var username = "defaultUser";
	var dbID = -1;
    var start = 0;
    var end = 0;
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var content = "";
}
