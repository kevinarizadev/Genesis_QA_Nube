<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();



    function Obtener_datos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_GESTION_PROGRAMADA(:v_pubicacion,:v_panno,:v_pmes,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_panno', $request->anio);
	oci_bind_by_name($consulta, ':v_pmes', $request->mes);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
    function Obtener_datos_descarga()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_GESTION_PROGRAMADA_DETALLE(:v_pubicacion,:v_panno,:v_pmes,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	oci_bind_by_name($consulta, ':v_panno', $request->anio);
	oci_bind_by_name($consulta, ':v_pmes', $request->mes);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}


