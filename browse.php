<?php include_once "common/header.php"; ?>

<div id="main">

   <noscript>This site just doesn't work, period, without JavaScript</noscript>

<?php include("auth.php"); //include auth.php file on all secure pages ?>
<body>
<div class="form">

<table class="browse"><tr ><td class="top" colspan="4"><h2>Select a Video to Begin Annotation</h2></tr></td>
<?php if(empty($pid)) {      
  $number_of_categories_in_row = 4;      
  $total_vids =0;
  $counter=0;
  $result = mysqli_query($link,"      
    SELECT      
      c.src_video_name,      
      c.src_video_location,  
	  c.src_video_thumbnail_location,
	  c.video_data_id
    FROM      
      `videos` as c");      
  while ($row = mysqli_fetch_array($result)) {      
    $result_array[] =      
      '<a href="annotate.php?pid=' . $row[3] . '"><img class="thumb" src='.$row[2].'><br/>' .      
      $row[0] . '</a>&emsp;&emsp;';
	$total_vids++;
  }      
  mysqli_free_result($result);   
  $result_final = '<tr>&nbsp;';      
  foreach ($result_array as $category_link) {      
    if ($counter == $number_of_categories_in_row) {      
      $counter = 1;      
      $result_final .= "&nbsp;</tr>&nbsp;<tr>&nbsp;";      
    } else {$counter++;  }    
   $result_final .= "&nbsp;<td>" . $category_link . "</td>&nbsp;";      
  }      
      
  if ($counter) {      
    if ($number_of_categories_in_row - $counter)      
      $result_final .= "&nbsp;<td colspan='" .      
        ($number_of_categories_in_row - $counter) . "'>&nbsp;</td>&nbsp;";   ?>   
      <br />       
      <br /> <?php
   echo $result_final .= "</tr>";  
  }      
}
?></table>
</div>
<?php include_once "common/sidebar.php"; ?>
</body>
<?php include_once "common/footer.php"; ?> 