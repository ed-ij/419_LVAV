<?php
if(!isset($_SESSION["username"])) {if(!isset($_SESSION["user_id"])){
header("Location: login.php");
exit(); }}
?>