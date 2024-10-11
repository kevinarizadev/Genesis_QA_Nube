<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function consultadeRefrencias()
{
	require_once('../../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_REFERENCIA.p_consulta_referencia_afiliado(:v_ptipo_documento,:v_pdocumento,:v_response,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipo_documento', $request->vptipodocumento);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	$informacion = [
		"varCursor" => $datos,
		"varJson" => json_decode($json),
	];
	echo json_encode($informacion);

}
