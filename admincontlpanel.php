<?php include_once "common/header.php"; 
require 'lib/PHPMailerAutoload.php';
?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages ?>

<div class="form">
<div id="user_management" class="user_management">
<h1>Hello <?php echo $_SESSION['username']?>!</h1>
Select an Action and a User to continue.
<?php 
if(isset($_POST['submit']))
{  $action=$_POST['action'];
   switch ($action){
		case 'activate':
			if(isset($_POST['checkbox'])){
					foreach($_POST['checkbox'] as $val){
					$sql3="update `users` set user_activated='1' where user_id='$val'";
					$result3=$link->query($sql3);
					}
					}
				break;
		case 'deactivate':
			if(isset($_POST['checkbox'])){
				foreach($_POST['checkbox'] as $val){
				$sql4="update `users` set user_activated='0' where user_id='$val'";
				$result4=$link->query($sql4);
				if($result4)
					echo "Complete";
				else 
					throw new Exception(mysqli_error($link)."[ $result4]");
				}
			}
			break;
		case 'delete':
		if(isset($_POST['checkbox'])){
				
				foreach($_POST['checkbox'] as $val){
				$sql6="delete from `users` where user_id='$val'";
				$result5=$link->query($sql6);
				if($result5)echo "Complete";
				else throw new Exception(mysqli_error($link)."[ $result5]");
		}
		}
			break;
   }
}?>
<form id='users' method='post' type="hidden" action=''><?php
$query = "select * from `users`";
$result = $link->query($query);
if($result){
	echo "<table class='usermanagement'><tr>
	<td>Select</td><td>User ID</td><td>User Name</td><td>User Email</td><td>User Activated</td><td>Unique ID Key</td><td>User Real Name</td></tr>";
	while ($row=mysqli_fetch_assoc($result)){
		echo "<br><tr><td>";
		echo "<input name='checkbox[]' type='checkbox' id=".$row['user_id']." value=".$row['user_id']."></td><td>".$row['user_id']." </td><td> ".$row['user_name']."</td><td> ".$row['user_email']."</td><td>"
		.$row['user_activated']."</td><td> ".$row['unique_id_key'] ."</td><td> ".$row['real_name']."\n\n</tr></td>";
	}
	echo "</table><br/>";
//pick action dropdown?>
<select id="action" name="action">                      
  <option value="0">--Select Action--</option>
  <option value="activate">Activate User(s)</option>
  <option value="deactivate">Deactivate User(s)</option>
  <option value="delete">Delete User</option>
</select>
<input id="button" type="submit" class="button" name="submit"></button>
</form>

<?php

	}
?>
</div>
<div id="emailall" class="emailall">
<br/>

Email all Users

<?php

if (isset($_POST['email'])){
	//PHPMailer example pulled from their github repository
	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = false;                               // Enable SMTP authentication
	$mail->Username = 'admin@example.com';                 // SMTP username
	$mail->Password = 'pickadminpass';                           // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom('from@example.com', 'Mailer');
	$mail->addReplyTo('info@example.com', 'Information');
	//do the mysqli thing here and do a loop to add all the users.
	$mail->addBCC('bcc@example.com');
	/*
	$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML
	*/

	$mail->Subject = $_POST['subject'];
	$mail->Body    = $_POST['body'];

	if(!$mail->send()) {
		echo 'Message could not be sent.';
		echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
		echo 'Message has been sent';
	}
}
?>
</div>
</div>


<?php include_once "common/sidebar.php"; ?>
<?php include_once "common/footer.php"; ?> 