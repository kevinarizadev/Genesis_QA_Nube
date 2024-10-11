<?php
	
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


	function traerdatosmesadeayuda()
	{
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN pq_genesis_acas.p_califica_mesa(:v_documento,:v_json_out ); end;');
		oci_bind_by_name($consulta, ':v_documento', $request->documento);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
	}
	function calificarestamesadeayuda()
	{
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c, 'BEGIN pq_genesis_acas.p_actualiza_mesa_de_ayuda(:v_numero_acas,:v_ubicacion,:v_solicitante,:v_calificacion,:v_observacion,:v_satisfaccion,:v_tipo_atencion,:v_prespuesta ); end;');
		oci_bind_by_name($consulta, ':v_numero_acas', $request->numeroacas);
		oci_bind_by_name($consulta, ':v_ubicacion', $request->vubicacion);
		oci_bind_by_name($consulta, ':v_solicitante', $request->documento);
		oci_bind_by_name($consulta, ':v_calificacion', $request->calificacion);
		oci_bind_by_name($consulta, ':v_observacion', $request->observacion);
		oci_bind_by_name($consulta, ':v_satisfaccion', $request->satisfaccion);
		oci_bind_by_name($consulta, ':v_tipo_atencion', $request->tipoinsatisfaccion);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
	}
