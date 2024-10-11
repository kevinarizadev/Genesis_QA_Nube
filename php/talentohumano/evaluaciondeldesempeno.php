<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function consultarFuncionario()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.P_LISTA_FUNCIONARIO(:v_pdoc_jefe,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdoc_jefe', $request->vpdocjefe);
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
function optenerResultado()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_obtener_resultado(:v_pevaluacion,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pevaluacion', $request->vpevaluacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
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
function guardarResultado()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_inserta_resultado(:v_pevaluacion,:v_pdocumento,:v_pfortalezas,:v_pareas_mejorar,:v_pcomentarios_evaluado,:v_pcompromisos_evaluado,:v_pcomentarios_evaluador,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pevaluacion', $request->vpevaluacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pfortalezas', $request->vpfortalezas);
	oci_bind_by_name($consulta, ':v_pareas_mejorar', $request->vpareas_mejorar);
	oci_bind_by_name($consulta, ':v_pcomentarios_evaluado', $request->vpcomentarios_evaluado);
	oci_bind_by_name($consulta, ':v_pcompromisos_evaluado', $request->vpcompromisos_evaluado);
	oci_bind_by_name($consulta, ':v_pcomentarios_evaluador', $request->vpcomentarios_evaluador);
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
function generar_Evaluacion()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_ui_evaluacion(:v_pdocumento,:v_pcargo,:v_pjefe,:v_parea,:v_pfecha_evaluacion,:v_pobservacion,:v_paccion,:v_pcantidad_preguntas,
	:v_json_preguntas,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pcargo', $request->vpcargo);
	oci_bind_by_name($consulta, ':v_pjefe', $request->vpjefe);
	oci_bind_by_name($consulta, ':v_parea', $request->vparea);
	oci_bind_by_name($consulta, ':v_pfecha_evaluacion', $request->vpfechaevaluacion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
	oci_bind_by_name($consulta, ':v_pcantidad_preguntas', $request->vpcantidadpreguntas);
	oci_bind_by_name($consulta, ':v_json_preguntas', $request->vjsonpreguntas);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0123;
	}
	oci_close($c);
}
function consultaProceso()
{
	require_once('../../php/config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_obtener_proceso(:v_json_row); end;');
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
function pobtenerplandesarrollo()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_obtener_plan_desarrollo(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->vptipo);
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
function obtenerPregunta()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_th.p_obtener_preguntas_2(:v_pproceso,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
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
function consultaReporte()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN  pq_genesis_th.p_obtener_formato(:v_pevaluacion,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pevaluacion', $request->vpevaluacion);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
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
