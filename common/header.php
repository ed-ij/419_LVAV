<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  

    <title>Video Annotation WebApp | <!-- Do Something Smart Here --></title>

    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link rel="shortcut icon" type="image/x-icon" href="https://cdn.css-tricks.com/favicon.ico" />

    <script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2'></script>


        <div id="header">


            <h1><a href="../WebApp/index.php">Video Annotation WebApp </a></h1>


<div id="control">
<?php
 require('/common/DBConnection/connection.php');
 session_start();

if(isset($_SESSION["username"])){
	?>
<p><a href="index.php" class="button">Home</a> &nbsp;<a href="account.php" class="button">Your Account</a> &nbsp;<a href="logout.php" class="button">Log out</a> </p>
<?php
}
else{
?>
 <p><a href="index.php" class="button">Home</a> &nbsp; <a class="button" href="login.php">Log in</a> &nbsp; <a class="button" href="registration.php">Sign up</a></p>

<?php
}
?>
                

<!-- IF LOGGED OUT -->
               
<!-- END OF IF STATEMENT -->

            </div>

        </div>
	</head>	
<body>