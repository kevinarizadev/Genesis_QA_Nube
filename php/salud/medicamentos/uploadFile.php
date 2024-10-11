<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($_POST['function'])) {
    $function = $_POST['function'];
} else {
    $function = $request->function;
}
$function();

function subirArchivoFTP()
{
    $dia = $_POST['dia'];
    $mes = $_POST['mes'];
    $año = $_POST['año'];
    $nit = $_POST['nit'];
    $tipo = $_POST['tipo'];
    $nombreArchivo = $_FILES['archivo']['name'];
    $base64 = file_get_contents($_FILES['archivo']['tmp_name']);
    $response = '';

    file_put_contents('../../../temp/' . $nombreArchivo, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $rutaTemp =   '../../../temp/' . $nombreArchivo;
    $contenido = file_get_contents($rutaTemp);
    if (mb_check_encoding($contenido, 'UTF-8') && strpos($contenido, "\xEF\xBB\xBF") !== 0) { // Validamos que el formato de codificacion sea utf-8
        if ($_FILES['archivo']['size'] > 0) { //validamos que el archivo no este vacio
            require_once('../../config/sftp_con.php');
            $rutaFtp = '/cargue_ftp/digitalizacion/genesis/Gestion_Medicamento/' . $año . '/' . $mes . '/' . $dia . '/' . $nit;
            if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $rutaFtp) == TRUE) {
                $subio = @ftp_put($con_id, $rutaFtp . '/' . $nombreArchivo, $rutaTemp, FTP_BINARY);
                if ($subio) {
                    unlink($rutaTemp);
                    if ($tipo == 1) {
                        insertarRuta($nombreArchivo, $rutaFtp, $nit, $año, $mes, $dia);
                    } else {
                        actualizarCargue(intval($nit), intval($año), intval($mes), intval($dia), intval($_POST['codProceso']));
                    }
                } else {
                    unlink($rutaTemp);
                    echo '0 - Error';
                }
            } else {
                if (ftp_mkdir($con_id, $rutaFtp)) {
                    $subio = ftp_put($con_id, $rutaFtp . '/' . $nombreArchivo, $rutaTemp, FTP_BINARY);
                    if ($subio) {
                        unlink($rutaTemp);
                        echo $tipo;
                        if ($tipo == 1) {
                            insertarRuta($nombreArchivo, $rutaFtp . '/' . $nombreArchivo, $nit, $año, $mes, $dia);
                            echo "insertarRuta";
                        } else {
                            // actualizarCargue();
                            actualizarCargue(intval($nit), intval($año), intval($mes), intval($dia), intval($_POST['codProceso']));
                        }
                    } else {
                        unlink($rutaTemp);
                        echo '0 - Error';
                    }
                } else {
                    echo '0';
                }
            }
            ftp_close($con_id);
        }
    } else {
        $resul = (object)[
            'CODIGO' => 1,
            'MENSAJE' => 'Error de codificacion por favor usar codificacion UTF-8'
        ];
        $obj2 = '[{"Codigo":1, "Nombre": "Error de codificacion por favor usar codificacion UTF-8"}]';
        $dato = '[{"radicado":""},{"resp":' . ($obj2) . '}]';
        echo $dato;
        //echo 'Error de codificacion';
    }
}

function insertarRuta($nombrArchivo, $rutaFTP, $nit, $anno, $periodo, $dia)
{
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_medicamentos_2.P_INSERTAR_GESTION_MEDICAMENTOS(:v_ptercero,:v_pruta,:v_panno,:v_pperiodo,:v_pdia,:v_pnomarch,:v_pradicado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_pruta', $rutaFTP);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pdia', $dia);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    oci_bind_by_name($consulta, ':v_PRADICADO', $json2, 4000);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        $dato = '[{"radicado":' . json_encode($json2) . '},{"resp":' . ($json) . '}]';
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
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_medicamentos_2.p_listar_archivos_cargados (:V_PTERCERO,:V_JSON_ROW); end;');
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

function actualizarCargue($nit, $anno, $periodo, $dia, $proceso)
{
    require_once('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_medicamentos_2.p_re_cargar_archivo(:v_ptercero,:v_panno,:v_pperiodo, :v_pdia, :v_pcodigo_proceso,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pdia', $dia);
    oci_bind_by_name($consulta, ':v_pcodigo_proceso', $proceso);
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
