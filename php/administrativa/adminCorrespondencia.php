<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function obtenerCorrespondencia()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORRESPONDENCIA(:v_presponsable,:v_p_tipocorrepondencia,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_p_tipocorrepondencia', $request->tipo_corresp);
	//oci_bind_by_name($consulta, ':v_tipo',$request->rol);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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


function p_obtener_areas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_AREAS (:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pjson_in', $request->data);
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

function P_OBTENER_AREAS_CORRESP()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_AREAS_CORRESP(:v_estado, :v_result); end;');
    oci_bind_by_name($consulta, ':v_estado', $request->estado);
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

function P_OBTENER_REGIONALES_CORRESP()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_REGIONALES_CORRESP(:v_ubicacion, :v_result); end;');
    oci_bind_by_name($consulta, ':v_ubicacion', $request->ubicacion);
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

function P_OBTENER_AREAS_RESP_CORRESP()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_AREAS_RESP_CORRESP(:v_pubicacion,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
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

function P_LISTA_FUNCIONARIO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_ANALITICA_DATOS.P_LISTA_FUNCIONARIO(:v_pcoincidencia, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pcoincidencia', $request->dato);
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

function P_INSERTAR_AREA_RESP_CORRESP(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_INSERTAR_AREA_RESP_CORRESP(:v_regional ,:v_area ,:v_responsable1 ,:v_responsable2 ,:v_responsable3 ,:v_cedula ,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_regional',$request->regional);
    oci_bind_by_name($consulta,':v_area',$request->area);
    oci_bind_by_name($consulta,':v_responsable1',$request->responsable1);
    oci_bind_by_name($consulta,':v_responsable2',$request->responsable2);
    oci_bind_by_name($consulta,':v_responsable3',$request->responsable3);
    oci_bind_by_name($consulta,':v_cedula',$request->cedula);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
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


function P_INSERTAR_AREA_CORRESP(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_INSERTAR_AREA_CORRESP(:v_nombre,:v_responsable,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_nombre',$request->Nombre_Area);
    oci_bind_by_name($consulta,':v_responsable',$request->cedula);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
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

function P_MODIFICAR_AREA_CORRESP(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_MODIFICAR_AREA_CORRESP(:v_codigo,:v_nombre,:v_estado,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_codigo',$request->codigo);
    oci_bind_by_name($consulta,':v_nombre',$request->nombre);
    oci_bind_by_name($consulta,':v_estado',$request->estado);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
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