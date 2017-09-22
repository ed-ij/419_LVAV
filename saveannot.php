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
	$sql="INSERT into `annotations`(`video_id`, `user_name`, `annotation_start_time`, `annotation_end_time`, `annotation_x`, `annotation_y`, `annotation_box_width`, `annotation_box_height`, `annotation_text`)
			VALUES ('$pid', '$points->username', '$points->start', '$points->end', '$points->x', '$points->y', '$points->w', '$points->h', '$points->content')";
	$link->query($sql);/*
    echo "Data is: " . $points->data . "<br>";
    echo "Point 1: " . $points->arPoints[0]->x . ", " . $points->arPoints[0]->y;*/
}
	
	
	
	?>
		