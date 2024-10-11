<?php
	// Llamamos la conexion a la base de datos
	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$documento =$_GET['documento'];
	$numero =$_GET['numero'];
  	$ubicacion =$_GET['ubicacion'];
  	$cedula =$_GET['cedula'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
//$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_ACTUA_TERCERO(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptercero,:v_prespuesta); end;');
$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.p_transfer_acas(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptercero_new,:v_prespuesta); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':v_pdocumento',$documento);
  	oci_bind_by_name($consulta,':v_pnumero',$numero);
  	oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
  	oci_bind_by_name($consulta,':v_ptercero_new',$cedula);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob,-1,OCI_B_CLOB);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>


