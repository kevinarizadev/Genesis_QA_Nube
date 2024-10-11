<?php

// KEVIN ARIZA 10-10-2024
	// if (!isset($_SESSION)) {
	//     session_start();
	// }
	// /*session_unset();
	// session_destroy();
	// session_start();*/
	// $usu = 'usuweb';
	// $acc = 'KHR]E24ZAg{OvR';
	// //$servidor = "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.17)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.50.18)(PORT = 1521))(LOAD_BALANCE = yes)(FAILOVER=YES) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = oasis)))";
	// $c = oci_connect($usu,$acc, 'SVEPSORACLESCANL001.cajacopieps.local/OASIS','AL32UTF8');
	// //$c = oci_connect($usu,$acc, '192.168.50.17/OASIS','AL32UTF8');
	// // $c = oci_connect($usu,$acc, '192.168.50.14/OASIS','AL32UTF8');
	// // $c = oci_connect($usu,$acc, $servidor,'AL32UTF8');
	// if (!$c) {
	//     $e = oci_error();
	//     trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	// }


	if (!isset($_SESSION)) {
		session_start();
	}
	/*session_unset();
		session_destroy();
		session_start();*/
	$usu = 'usuweb';
	$acc = 'Cajacopi2024.';
	// $acc = 'KHR]E24ZAg{OvR';
	
	if ($_SESSION['ambiente'] == 'QA') {
		$conexion = '192.168.50.14/OASISQA';
	} else {
		$conexion = '172.52.12.126/eps_oasisqa.privsubnetbdqac.vcnqacajacopiep.oraclevcn.com';
	}
	
	// $c = oci_connect($usu, $acc, '192.168.50.14/OASISQA', 'AL32UTF8');
	
	// $c = oci_connect($usu, $acc, '172.52.12.126/eps_oasisqa.privsubnetbdqac.vcnqacajacopiep.oraclevcn.com', 'AL32UTF8');
	$c = oci_connect($usu, $acc, $conexion, 'AL32UTF8');
	$q = oci_parse($c, "alter session set CURRENT_SCHEMA=OASIS");
	oci_execute($q, OCI_COMMIT_ON_SUCCESS);
	// $c = oci_connect($usu,$acc, $servidor,'AL32UTF8');
	if (!$c) {
		$e = oci_error();
		trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
	}