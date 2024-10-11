<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($_POST['function'])) {
    $function = $_POST['function'];
} else {
    $function = $request->function;
}
$function();


function P_LISTA_CUPS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_PROD.P_LISTA_CUPS(:v_pcodigo, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pcodigo', $request->query);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo json_encode([]);
    }
    oci_close($c);
}

function  P_CONSULTA_PRODUCTOS_PGP()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_PROD.p_consulta_productos_pgp(:v_pcodigo, :v_pregimen, :v_response);end;');
    oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_pregimen', $request->regimen);
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

function p_lista_municipios_pgp()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_PROD.p_lista_municipios_pgp(:v_pnumero, :v_pubicacion, :v_pregimen, :v_response);end;');
    oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
    oci_bind_by_name($consulta, ':v_pregimen', $request->regimen);
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

function p_lista_dx_pgp()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_PROD.p_lista_dx_pgp(:v_pnumero, :v_pubicacion, :v_pregimen, :v_response);end;');
    oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
    oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
    oci_bind_by_name($consulta, ':v_pregimen', $request->regimen);
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
