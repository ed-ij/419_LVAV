<?php include_once "common/header.php"; ?>



   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages 
?>
	<div class="search">
	<h1> Search </h1>
	<sub> Helpful hint: input '%' to list all of your annotations</sub>
	<form name = "form1" action="query.php" method="post" >
		<input name="search" type="text" size="40" maxlength ="50" />
		<input type="submit" name="submit" class="button"value="search" />
	</form>

	<form method="post" action = "csv.php">
	<input type="submit" name="download" class="button" value="Download CSV"/>
	<input type="hidden" name="sql" value="<?php echo $_POST['search']; ?>">
	<input type="hidden" name="sqluser" value="<?php echo $_SESSION['username'];?>"><br/><br/>
	
	</form>
	
	
	<?php
	if(!empty($_POST['search'])){
	$user = $_SESSION['username'];
	
	$sql = "SELECT * FROM annotations WHERE annotation_text LIKE '%".$_POST['search']."%' and user_name='$user'";
	// query $sql
	$result = mysqli_query($link,$sql);
	if ($result->num_rows > 0) 
	{
	while($row= $result->fetch_assoc()){
		$c = $row['video_id'];
	$sql2 = "select * from `videos` WHERE video_data_id ='$c'";
	$res2= mysqli_query($link, $sql2);
	$t = mysqli_fetch_row($res2);
        	echo "<br> Annotation Text: ". $row["annotation_text"]. " - Start Time: ". $row["annotation_start_time"]. " , 
			End Time:" . $row["annotation_end_time"] . " in Video: '" .$t[1] ."'  <br>";
     	}
	}
	
	else 
	{
    	echo "No results!";
	}
	}
	else{
		echo 'please input';
	
	}
	?>
</div>
<?php include_once "common/sidebar.php"; ?>
<?php include_once "common/footer.php"; ?> 	