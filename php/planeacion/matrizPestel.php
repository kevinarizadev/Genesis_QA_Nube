<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_ui_PESTEL(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $cedula = $request->cedula;
    $datos = $request->datos;
    $cantidad = $request->cantidad;
    $consulta = oci_parse($c,'begin oasis.PQ_GENESIS_PLANEACION_CI.p_ui_matriz_pestel(:v_pjson,:v_pcantidad,:v_presponsable,:v_pjson_row); end;');
    oci_bind_by_name($consulta,':v_pjson', $request->datos);
    oci_bind_by_name($consulta,':v_pcantidad', $request->cantidad);
    oci_bind_by_name($consulta,':v_presponsable', $request->cedula);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }else{
        echo 0;
    }
    oci_close($c);

}

function descargarExcel(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin oasis.PQ_GENESIS_PLANEACION_CI.p_listar_matriz_pestel(:v_presponse); end;');
    oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);

}





?>