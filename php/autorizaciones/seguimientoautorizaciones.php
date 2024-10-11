<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function P_OBTENER_ACAS_AUTORIZACIONES(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_ACAS_AUTORIZACIONES(:v_pconcepto, :v_pmotivo, :v_pasunto, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pconcepto',$request->concepto);
    oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);
    oci_bind_by_name($consulta,':v_pasunto',$request->asunto);
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


function p_obtener_acas_autorizaciones2(){
 
    require_once('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.p_obtener_acas_autorizaciones2(:v_jsonout_eps, :v_jsonout_ips); end;');
    
    oci_bind_by_name($consulta, ':v_jsonout_eps', $respuesta,4000);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_jsonout_ips', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
        $json2 = $clob->read($clob->size());
        echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
    }else{
        echo '{"json_ips":'.$json2.', "json_eps":'.$respuesta.'}';
    }
    oci_close($c);
    
}




function obtenerDpto(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_TIC.P_OBTENER_DPTO_AUTORIZACIONES_IPS(:v_json_row); end;');
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

function P_OBTENER_LISTADO_ACAS_AUTORIZACIONES()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cedula = $request->cedula;
	$estado = $request->estado;
	$tipo = $request->tipo;
	$asunto = $request->asunto;
	$concepto = $request->concepto;
		$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_OBTENER_LISTADO_ACAS_AUTORIZACIONES(:v_pcedula,
                                                                                                :v_pestado,
                                                                                                :v_pmotivo, 
                                                                                                :v_pasunto,
                                                                                                :v_pconcepto,
                                                                                                :v_json_row); end;');	
    oci_bind_by_name($consulta, ':v_pcedula', $cedula);
	oci_bind_by_name($consulta, ':v_pestado', $estado);
	oci_bind_by_name($consulta, ':v_pmotivo', $tipo);
	oci_bind_by_name($consulta, ':v_pasunto', $asunto);
	oci_bind_by_name($consulta, ':v_pconcepto', $concepto);
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

function P_OBTENER_OBTENERACASDETALLESXTICKET_IPS()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$ticket = $request->ticket;
	$ubicacion = $request->ubicacion;
		$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_OBTENER_OBTENERACASDETALLESXTICKET_IPS(:ticket, :ubicacion, :v_json_row); end;');	
    oci_bind_by_name($consulta, ':ticket', $ticket);
	oci_bind_by_name($consulta, ':ubicacion', $ubicacion);
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



function P_EXPORTAR_INFORMACION_MESAS_DE_AYUDA()
{
	    require_once('../config/dbcon_prod.php');
		$consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_TIC.P_EXPORTAR_INFORMACION_MESAS_DE_AYUDA(:v_cur_conver); end;');	
        $cursor = oci_new_cursor($c);
        oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta, OCI_DEFAULT);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = [];
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
}

?>