<?php include_once "common/header.php"; ?>
<?php
 // If form submitted, insert values into the database.
 if (isset($_POST['username'])){
 $username = $_POST['username'];
 $password = $_POST['password'];
 $username = stripslashes($username);
 $username = mysqli_real_escape_string($link,$username);
 $password = stripslashes($password);
 $password = mysqli_real_escape_string($link,$password);
 //Checking is user existing in the database or not
 $query = "SELECT * FROM `users` WHERE user_name='$username' and user_password_hash='".md5($password)."'";
 $result = mysqli_query($link,$query) or die(mysql_error());
 $rows = mysqli_num_rows($result); 
 $check_allowed = mysqli_fetch_assoc($result);
		
 if($rows==1 && $check_allowed['user_activated']==1){
	 //check to make sure the account is activated
	
	 //check to see if is an admin or not
	 if ($check_allowed['admin']==1){
	 $_SESSION['admin']=true;
	 }
	 else
	 $_SESSION['admin'] = false;
	
 $_SESSION['username'] = $username;
 $user_id = mysqli_query($link,"SELECT
  `user_id`
FROM
  users
WHERE
  user_name = '$username'");
  $useid = mysqli_fetch_assoc($user_id);
  $_SESSION['user_id'] = $useid["user_id"];
 header("Location: index.php"); // Redirect user to index.php
 }
 else if(!$check_allowed['user_activated']){echo "Your account is not activated, check for your activation email or contact an admin";}
 else{
 echo "<div class='login'><h3>Username/password is incorrect.</h3><br/>Click here to <a href='login.php'>Login</a></div>";
 }
 }else{
?>
<div class="login">
<h1>Log In</h1>
<form action="" method="post" name="login"/><br><div class ="formholder">
Username:<br/>
<input type="text" name="username" placeholder="Username" required /><br/><br>
Password:<br/>
<input type="password" name="password" placeholder="Password" required /><br><br>
<input name="submit" class="button" type="submit" value="Login" />
</form><br/><br/>
<sub>
<p>Not registered yet? <a href='registration.php'>Register Here</a></sub></p>
</div></div>
<?php } ?>
</body>
</html>