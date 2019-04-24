(function () {
    'use strict';

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


    var idArray = [];


    var annotationList = [];
    var videoPlayer = null;
    var user = "";
    var videoURL = "";
    var canvas = null;
    var currentAnnotation = null;
    var canHeight;
    var canWidth,
        ctx = null,
        drag = false,
        editting = false,
        list = [],
        mouseX,
        mouseY,
        closeEnough = 5,
        dragTL = false, dragBL = false,dragTR = false,dragBR = false, time = 0, reloaded=false, playingSeg=false;


    canvas = document.createElement("canvas");
    canvas.className = "canvases";
    //canvas.style.zIndex = videoPlayer.zIndex + 1;
    var videoDiv = document.getElementById("vid-div");
    videoDiv.appendChild(canvas);
    canvas.style.position = 'relative';
    // Does the browser actually support the video element?
    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        // Obtain handles to main elements
        var videoContainer = document.getElementById('videoContainer');
        var video = document.getElementById('video');
        var videoControls = document.getElementById('video-controls');

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






        // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
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
            progress.addEventListener('click', function(e) {
                //var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
                var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
                video.currentTime = pos * video.duration;
            });

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



            newLabel = document.getElementById('create-new');

            newLabel.addEventListener('click',function(){

                if(document.getElementById('newButton') == null)
                {
                    newButton = document.createElement('div');

                    labelBox = document.getElementById('new-labels');
                    labelBox.appendChild(newButton);

                    newButton.id = 'newButton';
                    newButton.style.position = "relative";

                    document.getElementById('newButton').style.width = "100% - 5px";

                    newButton.style.backgroundColor ="darkgray";
                    newButton.style.border ="5px dashed gray";
                    newButton.style.paddingTop = "10px";

                    labelName = document.createElement('div');
                    newButton.appendChild(labelName);
                    labelName.id = 'labelname';
                    document.getElementById('labelname').style.width = "70%";

                    labelName.style.position = "relative";
                    labelName.style.left = "5%";
                    labelName.style.top = "10%";
                    labelName.innerHTML = "LABEL NAME: ";

                    namebox = document.createElement('input');
                    namebox.setAttribute("name", "text");
                    labelName.appendChild(namebox);
                    namebox.style.lineHeight = "1.5";
                    namebox.style.fontSize = "20px";
                    namebox.id = 'namebox';
                    namebox.style.marginBottom = "10px";
                    namebox.style.marginTop = "10px";
                    namebox.style.borderLeft = "1px solid slategray";
                    namebox.style.borderBottom = "1px solid slategray";
                    namebox.style.paddingLeft = "5px";



                    cp = document.createElement('div');
                    newButton.appendChild(cp);
                    cp.style.position = "relative";
                    cp.innerHTML = "COLOR: ";
                    cp.style.display = "inline-block";
                    cp.style.marginLeft = "6%";
                    /* var select = document.createElement('select');

                newButton.appendChild(select);
                select.id = "select";*/
                    colorPick = document.createElement('input');
                    newButton.appendChild(colorPick);
                    colorPick.setAttribute("type", "color");
                    colorPick.id = 'colorPick';
                    colorPick.style.position = "relative";
                    colorPick.style.left = "1%";
                    colorPick.style.display = "inline-block";



                    submit = document.createElement('button');
                    newButton.appendChild(submit);
                    submit.id = "submit";
                    document.getElementById('submit').style.minWidth = "20%";
                    document.getElementById('submit').style.height = "50px";


                    submit.style.position = "relative";
                    submit.style.h = "5%";
                    submit.innerHTML = "SUBMIT";
                    submit.style.left = "15%";
                    submit.style.top = "10%";
                    submit.style.marginBottom = "20px";
                    submit.style.fontSize = "20px";
                    submit.style.display = "inline-block";


                    submit.addEventListener('click', function(){


                        var color = document.getElementById("colorPick").value;
                        var label = document.getElementById("namebox").value;
                        var invisibox = document.createElement('div');

                        createAnnotation = document.createElement('div');

                        labelBox.appendChild(invisibox);
                        invisibox.appendChild(createAnnotation);

                        createAnnotation.id = label;
                        createAnnotation.style.position = "relative";
                        createAnnotation.style.backgroundColor = color;
                        createAnnotation.style.border ="2px solid darkgray";
                        createAnnotation.style.paddingTop = "10px";
                        createAnnotation.style.paddingBottom = "10px";


                        document.getElementById(label).style.width = "99%";

                        caDiv = document.createElement('div');
                        createAnnotation.appendChild(caDiv);
                        caDiv.id = "caDiv";

                        lbText = document.createElement('div');
                        caDiv.appendChild(lbText);

                        lbText.id = "lbText";
                        lbText.style.marginLeft = "5%";
                        lbText.style.fontWeight = "1000";
                        lbText.innerHTML = "LABEL: ";
                        lbText.style.letterSpacing = "1.5px";
                        lbText.style.fontSize = "20px";
                        lbText.style.display = "inline-block";
                        createAnnotation.style.color = "white";


                        labelnameDiv = document.createElement('div');
                        caDiv.appendChild(labelnameDiv);

                        labelnameDiv.id = "labelnameDiv";
                        labelnameDiv.style.position = "relative";
                        labelnameDiv.style.display = "inline-block";
                        labelnameDiv.innerHTML = document.getElementById("namebox").value;

                        addNew = document.createElement('div');
                        createAnnotation.appendChild(addNew);
                        addNew.id = "addNew";
                        addNew.style.position = "relative";
                        addNew.style.display = "inline";
                        addNew.innerHTML = "&#43 Create New Annotation";
                        addNew.style.left = "50%";
                        addNew.style.fontSize = "12px";
                        labelBox.removeChild(newButton);

                        createAnnotation.addEventListener('click',function(){

                            var newAnnotationBox = document.createElement('div');
                            invisibox.appendChild(newAnnotationBox);

                            newAnnotationBox.id = "newAnnotationBox";
                            newAnnotationBox.style.position = "relative";
                            newAnnotationBox.style.backgroundColor = color;
                            newAnnotationBox.style.border ="2px solid darkgray";
                            newAnnotationBox.style.width = "80%";
                            newAnnotationBox.style.left = "18%";
                            newAnnotationBox.innerHTML = label;
                            newAnnotationBox.style.color = "white";

                        });
                    });
                }
            });//End create new label function


        }
    }
})();


