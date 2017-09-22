<?php include_once "common/header.php"; ?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages ?>

<div class="account">
<h1><?php echo $_SESSION['username']?>'s User Control Panel</h1><br/>
<?php 
$email = "";
$query = "select user_email from `users` where user_name='".$_SESSION['username']."'";
$result = $link->query($query);
if($result){
$emailtag = mysqli_fetch_assoc($result);
$email = $emailtag['user_email'];}
else
	throw new Exception(mysqli_error($link)."[ $result]");
?>
<p>
</p>

<form id="account" type="text">
Update Email Address<br/>
&emsp;&emsp;<input id="email-address" type ="text" value=<?=$email?>><br/><br/>


<p> Change Password</p>

&emsp;&emsp;<input id="change-pass" type ="text" value=""><br/><br/>

<p> Confirm Password Change </p>

&emsp;&emsp;<input id="confirm-pass" type ="text" value=""><br/><br/>
<p>

<p> Disable Admin Emails </p>
&emsp;&emsp; <input type="checkbox" name="emails" value="disable"/> Check to disable.<br/><br/>
<a href='feedback.php'>Leave Feedback for Admins</a><br/><br/>

<input value="submit" class="button" type = "submit">
<br/><br/></form>
</div>


<?php include_once "common/sidebar.php"; ?>
<?php include_once "common/footer.php"; ?> 