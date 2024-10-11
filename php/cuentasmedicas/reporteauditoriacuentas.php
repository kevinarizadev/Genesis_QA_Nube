<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_obtener_productividad()
{
	require_once('../config/dbcon_prod.php');
	// require_once('../config/dbcon_produccion.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.P_OBTENER_PRODUCTIVIDAD(:v_presponsable,:v_ptipo,:v_pfecha1,:v_pfecha2,:V_JSON_ROW); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->Cedula);
	oci_bind_by_name($consulta, ':v_ptipo', $request->Tipo);
	oci_bind_by_name($consulta, ':v_pfecha1', $request->Fecha_Inicio);
	oci_bind_by_name($consulta, ':v_pfecha2', $request->Fecha_Fin);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_lista_funcionario()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../config/dbcon_produccion.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_analitica_datos.p_lista_funcionario(:v_pcoincidencia,:v_pjson_out); end;');
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}


function p_obtener_productividad_glosas()
{
	require_once('../config/dbcon_prod.php');
	// require_once('../config/dbcon_produccion.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.p_obtener_productividad_glosas(:v_pjson_in,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pjson_in', $request->datos);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_obtener_tercero()
{
  require_once('../config/dbcon_prod.php');
  // require_once('../config/dbcon_produccion.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis.p_obtener_tercero(:v_pcodigo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->ips);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}
