<?php include_once "common/header.php"; ?>
<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>
<?php include("auth.php"); //include auth.php file on all secure pages ?>
<body>
<div class="login">
<h1>Upload</h1><br/>
<form name="upload" action = "uploadact.php" method="POST" ENCTYPE="multipart/form-data">
<div class="file-upload-container">
<div class="file-upload-override-button left">
Choose File
<input type="file" class="file-upload-button" id="file-upload-button"name = "userfile"/>
</div>
<div class="file-upload-filename left" id="file-upload-filename">No file selected</div>
<div class="both"></div>
</div><br/>
<input type="submit" class = "button"name ="upload" value="upload">
</form>
</div>
<script>
$("#file-upload-button").change(function () {
var fileName = $(this).val().replace('C:\\fakepath\\', '');
$("#file-upload-filename").html(fileName);
});
</script>
<?php include_once "common/sidebar.php"; ?>
</body>
<?php include_once "common/footer.php"; ?> 