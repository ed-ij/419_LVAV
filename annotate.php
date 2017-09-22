<?php include_once "common/header.php"; ?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages 
$usr = $_SESSION['username']?>

    <!--<script>
       // var audioSource = context.createMediaElementSource(document.getElementById("video-player"));
        //var filter = context.createBiquadFilter();
        //audioSource.connect(filter);
		//filter.connect(context.destination);
    //</script>-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <script>
            document.createElement('article');
        </script>
		
        <script src="js/firebase.js"> </script>
        <script src="js/MediaStreamer.js"> </script>
        <script src="js/annotate_app.js"></script>

    <body>
<?php 
  $pid = $_GET['pid'];
  $result = mysqli_query($link,"       
    SELECT       
      src_video_location      
    FROM `videos`       
    WHERE video_data_id = $pid       
  ");
?><script type="text/javascript">
	 user = <?php echo json_encode($_SESSION['username'])?>;
	
</script>	
        <article>
			
            <section class="experiment" style="text-align: center;">
				
				<?php while($row = mysqli_fetch_assoc($result)){
    foreach($row as $cname => $cvalue){
   
    echo "     <div id='video-div' class='video-div'>
      <video id='video-player' controls>  
      <source src=$cvalue type='video/mp4'>      
         />   
      </video> </div>"; ?><script>
 videoURL= "<?=$cvalue?>";
 console.log(videoURL);</script>  <?php
 }
 
} 
?>


<?php
	//save the annotations in a list we'll pass to load the annotations
	$result2 = mysqli_query($link,"SELECT * from `annotations` where video_id=$pid");
	
	$templist = array();
	while($row=mysqli_fetch_assoc($result2)){ 
		$templist = $row;
	?>
<script>
    //now put it into the javascript	
    list.push(<?php echo  json_encode($templist) ?>);

	
</script>
<?php
	}

?>
	
<script>
for (var i=0; i < list.length;i++)
	<?php if ($_SESSION['admin']==false){?> //if we're admin we get to see everyone's annotations
	if (list[i].user_name == user) <?php }?> //if we're not we only see our own
	LoadAnnotations(list[i]);
function SaveAnnotations(){
for (var i = 0; i < annotationList.length;i++){
	if (annotationList[i].dbID===-1){
		$.ajax({
		   url: 'saveannot.php?pid='+<?=$pid?>,
		   type: 'post',
		   data: {"points" : JSON.stringify(annotationList[i])},
		   success: function(data) {
				// Do something with data that came back. 
				console.log('not ded');
				sessionStorage.time=videoPlayer.currentTime;
				location.reload();
		   },
		   error: function(data) {
			   console.log('ded');
		   }
		});
	}
	else if (annotationList[i].changed ==true){
		$.ajax({
		   url: 'saveupdateannot.php?pid='+<?=$pid?>, //different php file so we can just modify the fields.
		   type: 'post',
		   data: {"points" : JSON.stringify(annotationList[i])},
		   success: function(data) {
				// Do something with data that came back. 
				console.log('not ded');
				sessionStorage.time=videoPlayer.currentTime;
				location.reload();
		   },
		   error: function(data) {
			   console.log('ded');
		   }
		});
	}
	else{
		continue;}
	}
}
	
</script>
<script>
	document.getElementById('sidebar')
	</script>
     
<!--				<div>
                    <a href="phpE7B2.tmp" title="Download WebM file to stream as pre-recorded media" download="chrome.webm" target="_blank">Download WebM video</a>
                </div>
                <div>
                    <a href="phpE7B2.tmp" title="Download WebM file to stream as pre-recorded media" download="chrome.mp4" target="_blank">Download MP4 video</a>
                </div>
-->
            <div class="input-area" id="input-area" style="display: none;">
                Annotation text:
                <form action="javascript:finalizeAnnotation();" style="display: inline;">
                    <input type="text" id="content-text">
                    <input type="submit" value="Finalize">
                    <input type="button" onclick="discardAnnotation()" value="Cancel">
					<p> Start time: <input type="text" id="start-time"><input type="button" onclick="startbut()" name="start" value="start" id="start/finish"> 
					End Time: <input type="text" id="end-time"><input type="button" name="end" onclick="endbut()" value="end" id="start/finish"> </p>
                </form>
            </div>
		</div>

        <!-- Annotation list -->
        <div class="annotation-list" id="annotation-list">
            <!-- Generated on-demand by JS -->
		
        </div>
		
		<div class="save-annots" id="save-annots">
			<button class='button' name="pid"  onclick="SaveAnnotations()"> Save Changes</button>
		</div>
		</section>
			
            <script>
                var channel = location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');

                // using firebase for sharing stream-packets i.e. chunks
                var firebase = new Firebase('https://chat.firebaseIO.com/' + channel);

                // messaging channel MUST have "send" method!
                firebase.send = function(data) {
                    firebase.push(data);
                };

                firebase.on('child_added', function(data) {
                    var stream = data.val();

                    // pass shared chunks/data/streaming-packets over "onstream"
                    streamer.onstream(stream);
                });
                
                firebase.onDisconnect().remove();

                // new MediaStream(socket, outputVideo)
                var streamer = new MediaStreamer(firebase, document.querySelector('video'));

                document.querySelector('input[type=file]').onchange = function() {
                    // "stream" method actually streams pre-recorded media i.e. webm file
                    streamer.stream(this.files[0]);
                };
            </script>
		 
        </article>

<?php include_once "common/sidebar.php"; ?>
