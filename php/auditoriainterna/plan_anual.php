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

function P_OBTENER_ADMINS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cedula = $request->cedula;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_OBTENER_ADMINS(:v_cedula, :v_result);end;');
    oci_bind_by_name($consulta, ':v_cedula', $cedula);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_UI_ADMINS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_UI_ADMINS(:v_cedula, :v_creacion, :v_modificacion, :v_aprobacion, :v_consulta, :v_estado, :v_responsable, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_cedula', $request->cedula);
    oci_bind_by_name($consulta, ':v_creacion', $request->creacion);
    oci_bind_by_name($consulta, ':v_modificacion', $request->modificacion);
    oci_bind_by_name($consulta, ':v_aprobacion', $request->aprobacion);
    oci_bind_by_name($consulta, ':v_consulta', $request->consulta);
    oci_bind_by_name($consulta, ':v_estado', $request->estado);
    oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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

function P_LISTA_FUNCIONARIO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_ANALITICA_DATOS.P_LISTA_FUNCIONARIO(:v_pcoincidencia, :v_pjson_out); end;');
    oci_bind_by_name($consulta, ':v_pcoincidencia', $request->query);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_REGIONALES()
{
    require_once('../config/dbcon_prod.php');
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_OBTENER_REGIONALES(:v_result);end;');
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_OBTENER_AREAS()
{
    require_once('../config/dbcon_prod.php');
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_OBTENER_AREAS(:v_result);end;');
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_LISTAR_JEFES()
{
    require_once('../config/dbcon_prod.php');
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTAR_JEFES(:v_result);end;');
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_UI_PLAN_AUDITORIA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_UI_PLAN_AUDITORIA(:v_json_in, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_json_in', $request->json);
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

function P_UI_PLAN_AUDITORIA_DETALLE()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_UI_PLAN_AUDITORIA_DETALLE(:v_json_in, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_json_in', $request->json);
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

function P_LISTA_PLAN_AUDITORIA()
{
    require_once('../config/dbcon_prod.php');
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_PLAN_AUDITORIA(:v_result);end;');
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_LISTA_PLAN_AUDITORIA_DETALLE()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_PLAN_AUDITORIA_DETALLE(:v_codigo, :v_result);end;');
    oci_bind_by_name($consulta, ':v_codigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

// function P_LISTA_PLAN_AUDITORIA_TRAZA()
// {
//     require_once('../config/dbcon_prod.php');
//     $cursor = oci_new_cursor($c);
//     $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_PLAN_AUDITORIA_TRAZA(:v_codigo, :v_result);end;');
//     oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
//     oci_execute($consulta);
//     oci_execute($cursor, OCI_DEFAULT);
//     if (!isset($json)) {
//         $datos = [];
//         oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
//         oci_free_statement($consulta);
//         oci_free_statement($cursor);
//         echo json_encode($datos);
//     } else {
//         echo json_encode($json);
//     }
// }

// function  P_LISTA_PLAN_AUDITORIA_DETALLE_TRAZA()
// {
//     require_once('../config/dbcon_prod.php');
//     $cursor = oci_new_cursor($c);
//     $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_PLAN_AUDITORIA_DETALLE_TRAZA(:v_codigo, :v_renglon, :v_result);end;');
//     oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
//     oci_execute($consulta);
//     oci_execute($cursor, OCI_DEFAULT);
//     if (!isset($json)) {
//         $datos = [];
//         oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
//         oci_free_statement($consulta);
//         oci_free_statement($cursor);
//         echo json_encode($datos);
//     } else {
//         echo json_encode($json);
//     }
// }

function  P_DESCARGA_PLAN_AUDITORIA_DETALLE()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_PLAN_AUDITORIA_TRAZA(:v_codigo, :v_fecha_inicio, :v_fecha_fin, :v_result);end;');
    oci_bind_by_name($consulta, ':v_codigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function P_DESCARGA_PLAN_AUDITORIA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_DESCARGA_PLAN_AUDITORIA(:v_codigo, :v_result);end;');
    oci_bind_by_name($consulta, ':v_codigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function SUBIR_SOPORTES()
{
    if (count($_FILES) >= 1) {
        $soportes = $_FILES;
        $nombres_soportes = explode(",", $_POST['nombres_soportes']);
        $i = 0;
        $sw = false;
        while ($i < count($soportes) && $sw == false) {
            if ($soportes[$nombres_soportes[$i]]['size'] > 13000000) {
                $response = ["codigo" => 1, "mensaje" => "El archivo " . $soportes[$nombres_soportes[$i]]['name'] . " excede los 13 MegaBytes"];
                $sw = true;
            }
            $i++;
        }
        if (!$sw) {
            $i = 0;
            $folderTemp = $_SERVER['DOCUMENT_ROOT'] . '/genesis/temp/';
            $rutaFtp = "Auditoria_Interna/Plan_anual_auditoria/" . $_POST['plan'];
            $arrRutasCargadas = [];
            while ($i < count($soportes) && $sw == false) {
                $b64 = file_get_contents($soportes[$nombres_soportes[$i]]['tmp_name']);
                $fileName = $nombres_soportes[$i] . '_' . $_POST['plan'] . '_' . date('d_m_Y') . '.' . explode("/", $soportes[$nombres_soportes[$i]]['type'])[1];
                file_put_contents($folderTemp . $fileName, $b64);
                require_once('../sftp_cloud/UploadFile.php');
                $subio = UploadFile($rutaFtp, $fileName);
                if (substr($subio, 0, 11) == '/cargue_ftp') {
                    array_push($arrRutasCargadas, $subio);
                } else {
                    echo json_encode((object) [
                        'codigo' => -1,
                        'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
                    ]);
                }
                $i++;
            }
            if (count($soportes) != count($arrRutasCargadas)) {
                $response = ["codigo" => 1, "mensaje" => "No se cargaron correctamente todos los archivos"];
            } else {
                $response = ["codigo" => 0, "mensaje" => $arrRutasCargadas];
            }
        }
        echo  json_encode($response);
    } else {
        $response = ["codigo" => 1, "mensaje" => "No se encontraron archivos"];
        echo (json_encode($response));
    }
}

function P_APRUEBA_PLAN_AUDITORIA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_APRUEBA_PLAN_AUDITORIA(:v_json_in, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_json_in', $request->json);
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

function P_I_ACTA_MODIFICACION()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_I_ACTA_MODIFICACION(:v_json_in, :v_json_row); end;');
    oci_bind_by_name($consulta, ':v_json_in', $request->json);
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

function P_LISTA_SOPORTES_HISTORICO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUDITORIA_INTERNA.P_LISTA_SOPORTES_HISTORICO(:v_codigo, :v_result);end;');
    oci_bind_by_name($consulta, ':v_codigo', $request->codigo);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
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

function DESCARGAR_SOPORTE()
{
    require_once('../sftp_cloud/DownloadFile.php');
    global $request;
    $ruta = DownloadFile($request->ruta);
    echo $ruta;
}

function dep($data)
{
    $format  = print_r('<pre>');
    $format .= print_r($data);
    $format .= print_r('</pre>');
    return $format;
}
