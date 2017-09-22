<?php include_once "common/header.php"; ?>
<?php include("auth.php"); //include auth.php file on all secure pages ?>

<?php
$q = $_GET['q'];
$sql = "DELETE FROM `annotations` WHERE `annotation_id`=$q";
$result = mysqli_query($link,$sql);
echo $result;
?>