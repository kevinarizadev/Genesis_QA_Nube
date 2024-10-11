<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function listarhistoricoRS()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_capita.listar_historico_RS(:v_historico);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_historico', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function listarhistoricoRC()
{
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_capita.listar_historico_RC(:v_historico);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_historico', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function listar_item_Reporte(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN oasis.pq_genesis_capita.p_listar_item_reporte(:json_out); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':json_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}
function obtenerdocumento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS.P_OBTENER_DOCUMENTO(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function obtener_token()
{
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL => "https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Oracle_017/payload",
		//CURLOPT_URL => "https://192.168.215.2/rest/forms/v1/SP_Oracle_017/payload",
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => "",
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "GET",
		CURLOPT_POSTFIELDS => ""
	]);
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		$json = json_decode($response);
		$_SESSION['tokens'] = ($json->data->payloadId);
	}
}
function paso_1_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_cargue_insumo_server-oracle/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_2_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_cargue_insumo_RC/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_3_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_cargue_insumo_RS/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_4_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_delete_RC/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_5_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_delete_RS/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_6_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_INSERT_RC/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function paso_7_Capita()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_INSERT_RS/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function Unificacion_de_contratos_RC()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Unificacion_contratos_RC/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function Unificacion_de_contratos_RS()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_Unificacion_contratos_RS/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function SP_capita_cargue_historico_RC()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_capita_cargue_historico_RC/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
function SP_capita_cargue_historico_RS()
{
  if(!isset($_SESSION)) session_start();
  obtener_token();
	global $request;
	$datos = $request->datos;
  // var_dump($datos);
	$tokens = $_SESSION['tokens'];
	$username =  'secureForm';
	$password = 'Cajacopi1#';
	$curl = curl_init();

	curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://goanywhere.cajacopieps.com/rest/forms/v1/SP_capita_cargue_historico_RS/payload/' . $tokens . '/submit',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_USERPWD => $username . ":" . $password,
		CURLOPT_CUSTOMREQUEST => "POST",
		CURLOPT_POSTFIELDS => json_encode($datos),
		CURLOPT_HTTPHEADER => array(
			'Authorization: Basic c2VjdXJlRm9ybTpDYWphY29waTEj',
			'Content-Type: application/json'
		),
	));
	$response = curl_exec($curl);
	$err = curl_error($curl);
	curl_close($curl);
	if ($err) {
		echo $err;
	} else {
		echo $response;
	}
}
?>
