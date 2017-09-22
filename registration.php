<?php include_once "common/header.php"; ?>
<?php
 require('/common/DBConnection/connection.php');
 //require_once "Mail.php";

 // If form submitted, insert values into the database.
 if(isset($_SESSION['error']))
 {
  echo '<p>'.$_SESSION['error']['username'].'</p>';
  echo '<p>'.$_SESSION['error']['email'].'</p>';
  echo '<p>'.$_SESSION['error']['password'].'</p>';
  unset($_SESSION['error']);
 }
 
 if (isset($_POST['username'])){
 $username = $_POST['username'];
 $email = $_POST['email'];
 $password = $_POST['password'];
 $conf_code = $_POST['confcode'];
 $real_name = $_POST['realname'];
 $dept = $_POST['dept'];
 
 //make sure username is the right length
 $username = stripslashes($username);
 $username = mysqli_real_escape_string($link,$username);
 
 //make sure email isn't already used
 $email = stripslashes($email);
 $email = mysqli_real_escape_string($link, $email);
 
 //make sure password fits correct format
 $password = stripslashes($password);
 $password = mysqli_real_escape_string($link,$password);
 
 $conf_code = stripslashes($conf_code);
 $conf_code = mysqli_real_escape_string($link,$conf_code);
 
 $real_name = stripslashes($real_name);
 $real_name = mysqli_real_escape_string($link,$real_name);
 
 $dept = stripslashes($dept);
 $dept = mysqli_real_escape_string($link,$dept);
 
 $query = "INSERT into `users` (user_name, user_password_hash, user_email, unique_id_key,real_name,dept) VALUES ('$username', '".md5($password)."', '$email','$conf_code','$real_name','$dept')";
 $result = mysqli_query($link,$query);
 if($result){
	echo "<div class='form'><h3>You are registered successfully. An admin will activate your account soon.</h3><br/></div>";
	
 }
 else{
	  echo "<div class='form'><h3>There was an error with your registration.</h3><br/>Click here to <a href='registration.php'>register</a></div>";
 
		throw new Exception(mysqli_error($link)."[ $result]");
 }}
 else{
	 
?>
<div class="login">
<h1>Registration</h1>
<div class="formholder">
<p>
<form name="registration" action="" method="post"></p>
<br>
Username: </br>
<input type="text" name="username" placeholder="Username" required /></br></br>
Email Address:</br>
<input type="email" name="email" placeholder="Email" required /></br></br>
Password: </br>
<input type="password" name="password" placeholder="Password" required /></br></br>
Registration Code (from dept):</br>
<input type="confcode" name="confcode" placeholder="Registration Code" required /></br></br>
First Name, Last Name:</br>
<input type="realname" name="realname" placeholder="John Q. User" required/></br></br>
Department:</br>
<input type="dept" name="dept" placeholder="Department of Education" required/></br></br>
<br>
<input type="submit" name="submit" class="button" value="Register" /></br>
</form></div>
</div>
<?php } ?>
</body>
</html>