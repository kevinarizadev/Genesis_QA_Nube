<?php
	// Llamamos la conexion a la base de datos
header("Content-Type: text/html;charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: text/xml');

	require_once('../config/dbcon_prod.php');
	// Recibimos los parametros enviados desde servicio de consulta
	$nit = $_GET['nit'];
	$factura = $_GET['factura'];
	$recibo = $_GET['recibo'];
	$documento = $_GET['documento'];
	// Preparamos la consulta para ser ejecutada y enlazamos los parametros
	$consulta = oci_parse($c,'begin p_mostrar_facdd(:terv_codigo,:fcdc_factura,:fcdn_recibo,:afic_documento,:v_json_row); end;');
	// Asignamos los valores a los parametros
	oci_bind_by_name($consulta,':terv_codigo',$nit);
	oci_bind_by_name($consulta,':fcdc_factura',$factura);
	oci_bind_by_name($consulta,':fcdn_recibo',$recibo);
	oci_bind_by_name($consulta,':afic_documento',$documento);
	// Preparamos las variables de salida tipo CLOB
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	// Ejecutamos la consulta
	oci_execute($consulta,OCI_DEFAULT);
	// Devolvemos los resultados en formato JSON
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	}else{
		echo 0;
	}
	// Cerramos la conexion a la base de datos
	oci_close($c);
?>