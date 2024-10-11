<?php
// KEVIN ARIZA 10-10-2024
// if (!isset($_SESSION)) {
//     session_start();
// }
// if (array_key_exists('usu', $_SESSION)) {
//     $usu = $_SESSION['usu'];
//     $acc = $_SESSION['acc'];
// 	//$servidor = "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.17)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.18)(PORT = 1521))(LOAD_BALANCE = yes)(FAILOVER=YES) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = oasis)))";
// 	$c = oci_connect($usu,$acc, 'SVEPSORACLESCANL001.cajacopieps.local/OASIS','AL32UTF8');
//         //$c = oci_connect($usu,$acc, '192.168.50.17/OASIS','AL32UTF8');
// 	//$c = oci_connect($usu,$acc, '192.168.50.17/OASIS','AL32UTF8');
// 	//$c = oci_connect($usu,$acc, $servidor,'AL32UTF8');
// 	if (!$c) {
// 	    $e = oci_error();
// 	    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
// 	}else{
//        $t = oci_parse($c,"alter session set NLS_NUMERIC_CHARACTERS=',.'");
// 	   oci_execute($t,OCI_COMMIT_ON_SUCCESS);
// 	      $q = oci_parse($c,"alter session set NLS_LANGUAGE='SPANISH'");
// 	    oci_execute($q,OCI_COMMIT_ON_SUCCESS);
// 	   //echo("arg1");
// 	}
// } else {
//     echo "Su session a Caducado por favor presione la tecla F5";
//     // header("Location: ../../../index.html");
//     die();
// }

if (!isset($_SESSION)) {
	session_start();
}
if (array_key_exists('usu', $_SESSION)) {
	$usu = $_SESSION['usu'];
	$acc = $_SESSION['acc'];

	if ($_SESSION['ambiente'] == 'QA') {
		$conexion = '192.168.50.14/OASISQA';
	} else {
		$conexion = '172.52.12.126/eps_oasisqa.privsubnetbdqac.vcnqacajacopiep.oraclevcn.com';
	}
	// $usu = 'usuweb';
	// $acc = 'Cajacopi2023.';

	// $c = oci_connect($usu, $acc, '192.168.50.14/OASISQA', 'AL32UTF8');
	// $c = oci_connect($usu, $acc, '172.52.12.126/eps_oasisqa.privsubnetbdqac.vcnqacajacopiep.oraclevcn.com', 'AL32UTF8');
	$c = oci_connect($usu, $acc, $conexion, 'AL32UTF8');
	if (!$c) {
		$e = oci_error();
		trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	} else {
		$t = oci_parse($c, "alter session set NLS_NUMERIC_CHARACTERS=',.'");
		oci_execute($t, OCI_COMMIT_ON_SUCCESS);
		$q = oci_parse($c, "alter session set NLS_LANGUAGE='SPANISH'");
		oci_execute($q, OCI_COMMIT_ON_SUCCESS);

		//echo("arg1");
	}
} else {
	echo "Su session a Caducado por favor presione la tecla F5";
	// header("Location: ../../../index.html");
	die();
}