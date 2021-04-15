<?php
extract($_POST);

$msg = $_POST('message');
$subject = $_POST('phoneno');
$msg = wordwrap($msg,70);
// send email
mail("hemanthchandragiri2001@gmail.com",$subject,$msg);//works when hosted

?>