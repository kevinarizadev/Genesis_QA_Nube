<?php
	$ftp_server = "192.168.50.12";
	$con_id = ftp_connect($ftp_server);
	$lr = ftp_login($con_id, "oracle","yQtev!2017.");
	$ps = ftp_pasv($con_id, true);
	if ((!$con_id) || (!$lr)) {
		echo "Fallo en la conexión"; die;
	} else {
		return $con_id;
	}
?>
