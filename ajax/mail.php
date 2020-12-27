<?php 
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$address = $_POST['address'];
	$order = $_POST['order'];

	$subject = "=?utf-8?B?".base64_encode("Сообщение с сайта")."?=";
	$headers = "Form: $name\r\nReply-to: $name\r\nContent-type: text/html; charset=utf-8\r\n";

	$success = mail("dzirtdp2014@mail.ru", $subject, $message, $headers, $order);

	echo $success;
 ?>