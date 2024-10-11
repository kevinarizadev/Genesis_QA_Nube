<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($_POST['function'])) {
    $function = $_POST['function'];
} else {
    $function = $request->function;
}
$function();

function cargaannos()
{
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo order by 1 desc");
    oci_execute($consulta);
    $rows = array();
    while ($row = oci_fetch_assoc($consulta)) {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
}

function cargaperiodos()
{
    global $request;
    require_once('../../config/dbcon_prod.php');
    $anno = $request->anno;

    $consulta = oci_parse($c, "SELECT pern_numero IDE, case when pern_numero = 1 then 'ENERO'
                                                 when pern_numero = 2 then 'FEBRERO'
                                                 when pern_numero = 3 then 'MARZO'
                                                 when pern_numero = 4 then 'ABRIL'
                                                 when pern_numero = 5 then 'MAYO'
                                                 when pern_numero = 6 then 'JUNIO'
                                                 when pern_numero = 7 then 'JULIO'
                                                 when pern_numero = 8 then 'AGOSTO'
                                                 when pern_numero = 9 then 'SEPTIEMBRE'
                                                 when pern_numero = 10 then 'OCTUBRE'
                                                 when pern_numero = 11 then 'NOVIEMBRE'
                                                 when pern_numero = 12 then 'DICIEMBRE'
                            end as NOMBRE
                  from bper_periodo
                  where pern_anno = :v_anno
                  and pern_numero not in (0,99)
                  and to_char(perf_inicial, 'YYYY/MM') <= to_char(sysdate, 'YYYY/MM') order by pern_numero asc");
    oci_bind_by_name($consulta, ':v_anno', $anno);
    oci_execute($consulta);
    $rows = array();
    while ($row = oci_fetch_assoc($consulta)) {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
}

function ConsultaIPS()
{
    global $request;
    require_once('../../config/dbcon_prod.php');
    $nit = $request->nit;

    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_resolucion_3100.p_listar_IPS(:v_nit, :v_json_out); end;');
    oci_bind_by_name($consulta, ':v_nit', $nit);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        //   $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function validaEstructura()
{
    require_once('validaciones.php');
    if (!isset($_FILES['file'])) return 0;
    $zip = new ZipArchive();
    $fileName = $_FILES['file']['name'];
    $tipo = $_POST['tipo'];
    $anno = $_POST['anno'];
    $periodo = $_POST['periodo'] < 10 ? '0' . $_POST['periodo'] : $_POST['periodo'];
    $nit = explode('_', $_POST['fileName'])[0];
    $base64 = file_get_contents($_FILES['file']['tmp_name']);
    file_put_contents('../../../temp/' . $fileName, $base64);
    $ubicacionTemp =   '../../../temp/';
    $ruta = 'cargue_ftp/digitalizacion/genesis/Gestion_202/' . $anno . '/' . $periodo . '/' . $nit;
    if ($_FILES['file']['size'] > 0) {
        $tmpfile =  $ubicacionTemp . $fileName;
        require_once('../../config/sftp_con.php');
        if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $ruta) == TRUE) {
            $subio = @ftp_put($con_id, $ruta . '/' . $fileName, $tmpfile, FTP_BINARY);
            if ($subio) {
                // unlink('../../../temp/' . $fileName);
                // EN CASO DE CARGAR A FTP EXITOSO SE GUARDA RUTA EN BASE DE DATOS
                // nit, año, periodo, codigo_proceso, responsable
                if ($tipo != 1) {
                    // echo "tipo 1";
                    actualizarCargue(intval($nit), intval($anno), intval($periodo), intval($_POST['codProceso']));
                    // print_r($_SESSION['cedula']);
                } else {
                    // echo "tipo 2";
                    insertarRuta($fileName, $ruta, $nit, $periodo, $anno);
                }
            } else {
                // unlink('../../../temp/' . $fileName);
                echo '0 - Error.';
            }
        } else {
            if (ftp_mkdir($con_id, $ruta)) {
                $subio = ftp_put($con_id, $ruta . '/' . $fileName, $tmpfile, FTP_BINARY);
                if ($subio) {
                    unlink('../../../temp/' . $fileName);
                    // EN CASO DE CARGAR A FTP EXITOSO SE GUARDA RUTA EN BASE DE DATOS
                    // nit, año, periodo, codigo_proceso, responsable
                    if ($tipo != 1) {
                        actualizarCargue(intval($nit), intval($anno), intval($periodo), intval($_POST['codProceso']));
                        // print_r($_SESSION['cedula']);
                    } else {
                        insertarRuta($fileName, $ruta, $nit, $periodo, $anno);
                    }
                    // echo $ruta;
                } else {
                    unlink($tmpfile);
                    echo '0 - Error';
                }
            }
        }
        ftp_close($con_id);
    }
}

function insertarRuta($nombrArchivo, $rutaFTP, $nit, $anno, $periodo)
{
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_valida_archivo_202(:v_pruta,:v_pnomarch,:v_json_error); end;');
    oci_bind_by_name($consulta, ':v_pruta', $rutaFTP);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_error', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        if (json_decode($json)[0]->Codigo == 0) {
            if ($_SESSION) {
                insertaGestion($nit, $anno, $periodo, $nombrArchivo, $_SESSION['cedula']);
            };
        } else {
            $dato = '[{"tipo_error" : 0},{"resp":[{"Nombre":"' . json_decode($json)[0]->Error . '"}]}]';
            echo $dato;
        }
    } else {
        echo 111;
    }
    oci_close($c);
}

function insertaGestion($nit, $periodo, $anno, $nombrArchivo, $responsable)
{
    require('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_insertar_gestion_202(:v_ptercero,:v_panno,:v_pperiodo, :v_pnomarch, :v_responsable, :v_pradicado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    oci_bind_by_name($consulta, ':v_responsable', $responsable);
    oci_bind_by_name($consulta, ':v_pradicado', $json2, 4000);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        $dato = '[{"tipo_error" : 0,"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
        echo $dato;
    } else {
        echo 0;
    }
    oci_close($c);
}

function listarRadicados()
{
    global $request;
    $nit = $request->nit;

    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_listar_archivos_cargados (:V_PTERCERO,:V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
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

function actualizarCargue($nit, $anno, $periodo, $proceso)
{

    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_re_cargar_archivo(:v_ptercero,:v_panno,:v_pperiodo,:v_pcodigo_proceso,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pcodigo_proceso', $proceso);

    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        $dato = '[{"tipo_error" : 0},{"resp":' . $json . '}]';
        echo $dato;
    } else {
        echo 0;
    }
    oci_close($c);
}
