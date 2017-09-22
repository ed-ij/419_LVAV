<head>
<script type='text/javascript' src="js/previewvideo.js">

</script>
<?php include_once "common/header.php"; 
ini_set('display_errors',1);
error_reporting(E_ALL);
if(isset($_POST['upload'])){
    $name       = $_FILES['userfile']['name'];
    if(isset($name)){
			$location = "videos/";
			$uploadfile =$location.basename($_FILES['userfile']['tmp_name']);			
    if(($_FILES["userfile"]["error"] == 0)){
		move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile);
				$username = $_SESSION['username'];
				
	$query =  "INSERT INTO videos (src_video_name, ul_user_name, src_video_location) VALUES ('$name', '$username', '$uploadfile')";
	$result = mysqli_query($link,$query);
                echo 'File uploaded successfully';
		} else{echo 'error uploading' + $_FILES["userfile"]["error"];}    }      
		
      else {
        echo 'You should select a file to upload !!';
		}
}
 ?>
 <body>
 <h1> Step 2: Select a Thumbnail</h1>
 
<video controls src='$uploadfile'></video>
<input type="submit" value="submit">

<?php include_once "common/sidebar.php"; ?>
</body>
<?php include_once "common/footer.php"; ?> 