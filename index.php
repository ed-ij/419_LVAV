<?php include_once "common/header.php"; ?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages ?>

<div class="form">
<table border ="1" class ="index"><tr><td class="tablehead"><h2>
Hello <?php echo $_SESSION['username']; ?>!</h2></tr></td>
<?php
if($_SESSION['admin'] == true){ ?><tr>
<td class="tdl"><p><a href="admincontlpanel.php" class="button"><img src='/WebApp/PNG/users.png'/></a> &nbsp;<a href="admincontlpanel.php" >Admin Control Panel</a> </p><br>
For user administration purposes only.</br></td>
<?php } else if ($_SESSION['admin']==false){?><tr>
<td class="tdl"><p><a href="account.php" class="button"><img src='/WebApp/PNG/user.png'/></a> &nbsp;<a href="account.php" >Account Settings</a> </p><br>
Change your email address, password, personal information or mail settings.</br></td><?php }?>
<td class="tdr">
<p><a href="upload.php" class="button"><img src='/WebApp/PNG/up_alt.png'/></a> &nbsp;<a href="upload.php">Upload Video</a> </p><br>
Upload existing ogg or mp4 format video to the database for annotation.</br></td></tr>


<tr><td class="tdl">
<p><a href="query.php" class="button"><img src='/WebApp/PNG/server.png'/></a> &nbsp;<a href="query.php" >Export Database</a> </p><br>
Export your existing annotations by searching for the annotation.</br></td>
<td class="tdr">
<p><a href="browse.php" class="button"><img src='/WebApp/PNG/applications.png'/></a> &nbsp;<a href="browse.php" >Annotate Video</a> </p><br>
Find a video to add annotations to.</br></td></tr>
<tr><td class="tdl">
<p><a href="search.php" class="button"><img src='/WebApp/PNG/search.png'/></a> &nbsp;<a href="search.php" >Search Existing</a> </p><br>
Search existing annotations in the database, view a list and connect to the video which contains them for further annotation.</br>
</td><td class="tdr">
<p><a href="logout.php" class="button"><img src='/WebApp/PNG/exit.png'/></a> &nbsp;<a href="logout.php" >Log out</a> </p></td></tr>
</table>
</div>

<?php include_once "common/sidebar.php"; ?>

<?php include_once "common/footer.php"; ?> 