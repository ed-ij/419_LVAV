<?php 
 require('/common/DBConnection/connection.php');
 
	$user = $_POST['sqluser'];
	$like = $_POST['sql'];
	$sql = "SELECT src_video_name,user_name,annotation_text,annotation_start_time,annotation_end_time,annotation_x,annotation_y,
	annotation_box_width,annotation_box_height,annotation_creation_time,annotation_modified_date


	FROM annotations inner join videos on videos.video_data_id=annotations.video_id 
	where  annotations.annotation_text LIKE '%".$like."%'";
	$result = mysqli_query($link,$sql);
 
	if (!$result)
	die('Couldn\'t fetch records'); 
	$finfo = $result->fetch_fields();
	$headers = array(); 

	foreach ($finfo as $val)   
	{	             
		$headers[] = $val->name; 
	}   
	$fp = fopen('php://output', 'w'); 
	if ($fp && $result)   
	{             
 		header('Content-Type: text/csv');        
 		header('Content-Disposition: attachment; filename="export.csv"'); 
 		header('Pragma: no-cache'); 
 		header('Expires: 0');  
 		fputcsv($fp, $headers);  
		while ($row = $result->fetch_assoc()) 
		{  
			fputcsv($fp, array_values($row));  
		} 
		die; 
	}  
?>