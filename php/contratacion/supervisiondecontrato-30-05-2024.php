<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function P_CALCULA_ROL()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_calcula_rol(:v_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_documento', $request->vdocumento);
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
function P_OBTENER_SUPERVISION_DETALLE()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision_detalle(:v_pnit,:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
function P_U_GESTION_SUPERVISOR()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_u_gestion_supervisor(:v_pregional,:v_pinterventor,:v_psuplente,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pregional', $request->vpregional);
	oci_bind_by_name($consulta, ':v_pinterventor', $request->vpinterventor);
	oci_bind_by_name($consulta, ':v_psuplente', $request->vpsuplente);
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
function P_OBTENER_FUNCIONARIOS()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_funcionarios(:v_pfuncionario,:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfuncionario', $request->vpfuncionario);
	oci_bind_by_name($consulta, ':v_ptipo', $request->vptipo);
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
function P_LISTA_SUPERVISORES()
{
	require_once('../../php/config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_lista_supervisores(:v_json_row); end;');
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
function P_CALCULA_RESULTADO()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_calcula_resultado(:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
function P_OBTENER_IPS_SUPERVISION()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_ips_supervision(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->valorNit);
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
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_UI_CIERRE_SUPERVISION()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_cierre_supervision(:v_pidproceso,:v_pconclusiones,:v_precomendaciones,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
	oci_bind_by_name($consulta, ':v_pconclusiones', $request->vpconclusiones);
	oci_bind_by_name($consulta, ':v_precomendaciones', $request->vprecomendaciones);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
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
function P_UI_SUPERVISION_2()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_ui_supervision_2(:v_pdocumento,:v_pnit,:v_pregional,:v_pfecha_visita,
	:v_pcedulasupervisor_ips,:v_prepresentante_ips,:v_pcargo_repreentante,:v_pobservacion,:v_paccion,:v_pcantidad_preguntas,:v_json_preguntas,:v_pidproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregional', $request->vpregional);
	oci_bind_by_name($consulta, ':v_pfecha_visita', $request->vpfechavisita);
	oci_bind_by_name($consulta, ':v_pcedulasupervisor_ips', $request->vpcedulasupervisorips);
	oci_bind_by_name($consulta, ':v_prepresentante_ips', $request->vprepresentanteips);
	oci_bind_by_name($consulta, ':v_pcargo_repreentante', $request->vpcargorepreentante);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
	oci_bind_by_name($consulta, ':v_pcantidad_preguntas', $request->vpcantidadpreguntas);
	oci_bind_by_name($consulta, ':v_json_preguntas', $request->vjsonpreguntas);
	oci_bind_by_name($consulta, ':v_pidproceso', $request->vpidproceso);
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
function P_OBTENER_PREGUNTAS()
{
	require_once('../../php/config/dbcon.php');
  global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_preguntas(:v_pproceso,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
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
function P_OBTENER_SUPERVISION_3()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision_3(:v_pproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
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
function P_OBTENER_CONTRATOS()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN  pq_genesis_supervision.p_obtener_contratos(:v_pdocumento,:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
function P_OBTENER_SUPERVISION_FINAL()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN  pq_genesis_supervision.p_obtener_supervision_final(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
}function P_OBTENER_SUPERVISION_IPS()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision_ips(:v_pidproceso,:v_json_row); end;');
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
function P_OBTENER_SUPERVISION()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_supervision(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_prenglon,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
	oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglon);
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
