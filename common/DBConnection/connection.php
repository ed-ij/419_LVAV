<?php
if(!($link = mysqli_connect("localhost:38313","root","praxus")))
{
     die('oops connection problem ! --> '.mysql_error());
}
if(!mysqli_select_db($link,"vid_anno_db"))
{
     die('oops database selection problem ! --> '.mysql_error());
}
?>