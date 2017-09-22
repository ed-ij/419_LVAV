<?php 
include_once "common/header.php"; ?>



<?php include("auth.php"); //include auth.php file on all secure pages ?>
<?php
/*if(!empty($anno)){ used this query to test and see if it was working or not*/
	
	
	/*
	$sql = "INSERT into `annotations` (`user_name`) values ($anno['username'])";//'INSERT into `annotations` 
			//';
			//echo $sql;
	if ($link->query($sql)===TRUE){
		echo "success";
	}
	else{
		echo "error";
	}
}*/

if (isset($_POST["points"])) {
    // Decode our JSON into PHP objects we can use
    $points = json_decode($_POST["points"]);
	$pid = $_GET['pid'];

    // Access our object's data and array values.
	$sql="update `annotations` set  `annotation_start_time`='$points->start', `annotation_end_time`= '$points->end', `annotation_x`='$points->x', `annotation_y`='$points->y'
	, `annotation_box_width`='$points->w', `annotation_box_height`='$points->h', `annotation_text`='$points->content' where `annotation_id`='$points->dbID'";
	$link->query($sql);/*
    echo "Data is: " . $points->data . "<br>";
    echo "Point 1: " . $points->arPoints[0]->x . ", " . $points->arPoints[0]->y;*/
}
	
	
	
	?>
		