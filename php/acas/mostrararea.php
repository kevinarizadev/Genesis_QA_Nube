<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

	function mostrarArea(){
		// Llamamos la conexion a la base de datos
		require_once('../config/dbcon_prod.php');
		// Recibimos los parametros enviados desde servicio de consulta
		// Preparamos la consulta para ser ejecutada y enlazamos los parametros
		$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.P_OBTENER_AREA(:v_json_row); end;');
		// Asignamos los valores a los parametros
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB); 
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

	}


	function mostrarCriticidad(){
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c,'begin PQ_GENESIS_ACAS.p_obtener_criticidad(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
	}
?>
