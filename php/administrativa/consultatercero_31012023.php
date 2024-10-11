<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function Obt_Cedula()
{
	echo ($_SESSION["cedula"]);
	// echo "1003380258";
}

function Obt_Nit()
{
	echo ($_SESSION["nit"]);
	// echo "8001";
	// echo "1";
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function P_OBTENER_TERCERO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_OBTENER_TERCERO(:V_PCOINCIDENCIA,:V_PJSON_OUT); end;');
	oci_bind_by_name($consulta, ':V_PCOINCIDENCIA', $request->Nit);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':V_PJSON_OUT', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function P_LISTA_CLASE_IPS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_LISTA_CLASE_IPS(:v_json_row); end;');
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

function P_UI_TERCERO_MINUTA()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_GENESIS_CONTRATACION.P_UI_TERCERO_MINUTA(:v_pnit,:v_pprestador_salud,:v_pprestador_tecnologia,:v_pclase_ips,
  :v_pnaturaleza,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->Nit);
	oci_bind_by_name($consulta, ':v_pprestador_salud', $request->Prestador_salud);
	oci_bind_by_name($consulta, ':v_pprestador_tecnologia', $request->Prestador_tecnologia);
	oci_bind_by_name($consulta, ':v_pclase_ips', $request->Clase);
	oci_bind_by_name($consulta, ':v_pnaturaleza', $request->Naturaleza);
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
