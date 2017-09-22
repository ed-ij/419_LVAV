<?php include_once "common/header.php"; ?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages ?>
<body>
<div>
<!DOCTYPE  HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta  http-equiv="Content-Type" content="text/html;  charset=iso-8859-1">
    <title>Search Annotations</title>
  </head>
  <p><body><div class="search">
    <h1>Search Details</h1><br/>
    <p>You  may search by annotation keyword</p><br/>
    <form  method="post" action="search.php?go"  id="searchform">
      <input  type="text" name="name">
      <input  type="submit" name="submit" class="button"value="Search">
    </form><br/><br/>
  </body>
</html>
</p>
<?php
  if(isset($_POST['submit'])){
  if(isset($_GET['go'])){
  $name=$_POST['name'];
  $user = $_SESSION['username'];
  $sql="SELECT video_id,annotation_start_time,annotation_end_time FROM annotations WHERE annotation_text LIKE '%" . $name .  "%' and user_name='$user'";
  //-run  the query against the mysql query function
  $result=mysqli_query($link,$sql);
  //-create  while loop and loop through result set
  while($row=mysqli_fetch_array($result)){
    $ID  =$row['video_id'];
		  
	$sql2 = "select * from `videos` WHERE video_data_id ='$ID'";
	$res2= mysqli_query($link, $sql2);
	$t = mysqli_fetch_row($res2);
  //-display the result of the array
  echo "<ul>\n\n\n";
  echo "<li>" . "<a  href=annotate.php?pid=$ID>". $t[1] ." at time ".$row['annotation_start_time']." ending at time " .$row['annotation_end_time']." </a></li>\n";
  echo "</ul>";
	}
  }
  else{
  echo  "<p>Please enter a search query</p>";
  }
  
  }
?>

</div>
<?php include_once "common/sidebar.php"; ?>
</body>
<?php include_once "common/footer.php"; ?> 