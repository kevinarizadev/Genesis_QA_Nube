<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
function ObtenerAcasXUsuarioyCantidad(){
	require_once('../config/dbcon_prod.php');
    global $request;
    $parea = $request->area;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_ASEG2.P_OBTENER_DPTO_ASEGURAMIENTO(:v_parea,:v_json_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_parea',$parea);
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
function obtenerAcasXPersona(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$estado = $request->estado;
	$cedula = $request->cedula;	
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG2.P_OBTENER_OBTENERACASXPERSONA(:estado,:cedula,:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	 oci_bind_by_name($consulta,':estado',$estado);
	 oci_bind_by_name($consulta,':cedula',$cedula);
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

function fechaExportar(){
	// este sp se recibe un cursor
	require_once('../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_ASEG2.P_EXPORTAR_ACASXPERSONA(:v_pfecha_inicio,:v_pfecha_fin,:v_response);end;');
    oci_bind_by_name($consulta,':v_pfecha_inicio',$request->v_pfecha_inicio);
    oci_bind_by_name($consulta,':v_pfecha_fin',$request->v_pfecha_fin);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (!isset($json)) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}

function obtenerAcasDetalleXticket(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$ticket = $request->ticket;
		$ubicacion = $request->ubicacion;
		$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG2.P_OBTENER_OBTENERACASDETALLESXTICKET(:ticket,:ubicacion,:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':ticket',$ticket);
		oci_bind_by_name($consulta,':ubicacion',$ubicacion);
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
function obtenerAcas(){
	require_once('../config/dbcon_prod.php');
    global $request;
    $parea = $request->area;
	$keyword = $request->keyword;
	$consulta =  oci_parse($c,'BEGIN PQ_GENESIS_ASEG2.P_OBTENER_BUSCARACAS(:v_parea,:v_pkeyword,:v_json_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta,':v_parea',$parea);
	oci_bind_by_name($consulta,':v_pkeyword',$keyword);
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