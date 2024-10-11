<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function P_OBTENER_CONSOL()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_consol(:v_pinterventor,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pinterventor', $request->vpinterventor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_LISTA_CONSOL()
{
	require_once('../../php/config/dbcon.php');
	// global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_lista_consol(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_OBTENER_IPS_SUPERVISOR()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_ips_supervisor(:v_pinterventor,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pinterventor', $request->vpinterventor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_OBTENER_RESULTADO()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_resultado(:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
?>
