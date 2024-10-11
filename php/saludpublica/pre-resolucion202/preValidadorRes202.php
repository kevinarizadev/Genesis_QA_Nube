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
    if ($_FILES['file'] == null) return 0;

    $fileName = $_POST['regimen'] == "NA" ? $_FILES['file']['name'] : explode(".", $_FILES['file']['name'])[0] . ".txt";
    $partesNombre = explode('.', $fileName);
    if (count($partesNombre) > 2) {
        $fileName = $partesNombre[0] . '.' . $partesNombre[1];
    }
    $tipo = $_POST['tipo'];
    $anno = $_POST['anno'];
    $periodo = $_POST['periodo'] < 10 ? '0' . $_POST['periodo'] : $_POST['periodo'];
    $nit = explode('_', $_POST['fileName'])[0];
    $regimen = $_POST['regimen'];
    $status = validaCodificacion($_FILES['file']);
    if($status){
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
                    // EN CASO DE CARGAR A FTP EXITOSO SE GUARDA RUTA EN BASE DE DATOS
                    // nit, año, periodo, codigo_proceso, responsable
                    $comas = validaComas($fileName, $ruta);
                    if ($comas['status'] == true) {
                        if ($tipo != 1) {
                            actualizarCargue(intval($nit), intval($anno), intval($periodo), intval($_POST['codProceso']));
                        } else {
                            insertarRuta($fileName, $ruta, $nit, $periodo, $anno, $regimen);
                        }
                    } else {
                        echo $comas['msg'];
                    }
                    unlink('../../../temp/' . $fileName);
                } else {
                    // unlink('../../../temp/' . $fileName);
                    echo '0 - Error.';
                }
            } else {
                if (ftp_mkdir($con_id, $ruta)) {
                    $subio = ftp_put($con_id, $ruta . '/' . $fileName, $tmpfile, FTP_BINARY);
                    if ($subio) {
                        // EN CASO DE CARGAR A FTP EXITOSO SE GUARDA RUTA EN BASE DE DATOS
                        // nit, año, periodo, codigo_proceso, responsable
                        if ($tipo != 1) {
                            actualizarCargue(intval($nit), intval($anno), intval($periodo), intval($_POST['codProceso']));
                        } else {
                            insertarRuta($fileName, $ruta, $nit, $periodo, $anno, $regimen);
                        }
                        unlink('../../../temp/' . $fileName);
                    } else {
                        unlink($tmpfile);
                        echo '0 - Error';
                    }
                }
            }
            ftp_close($con_id);
        }else{
            echo json_encode([["tipo_error" => 0],  ["resp" => [["Nombre" => "No es posible cargar archivos vacios"]]]]);
        }
    }else{
        echo json_encode([["tipo_error" => ["CODIGO" => 2]],  ["resp" => [["Nombre" => "El formato de codificacion del del archivo es incorrecto, recuerde usar UTF-8 como formato de codificacion."]]]]);
    }
   
}

function insertarRuta($nombrArchivo, $rutaFTP, $nit, $anno, $periodo, $regimen)
{

    require('../../config/dbcon_prod.php');
    $ruta = $rutaFTP . '/' . $nombrArchivo;
    $ruta2 = $rutaFTP . '/';
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_valida_archivo_202(:v_pruta,:v_pnomarch,:v_json_error); end;');
    oci_bind_by_name($consulta, ':v_pruta', $ruta2);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_error', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        if (json_decode($json)[0]->Codigo == 0) {
            if ($_SESSION) {
                insertaGestion($nit, $anno, $periodo, $nombrArchivo, $_SESSION['cedula'], $regimen);
            } else {
                echo "Debe cerrar session";
            }
        } else {
            $dato = '[{"tipo_error" : 0},{"resp":[{"Nombre":"' . json_decode($json)[0]->Nombre . '"}]}]';
            echo $dato;
        }
    } else {
        echo 111;
    }
    oci_close($c);
}

function insertaGestion($nit, $periodo, $anno, $nombrArchivo, $responsable, $regimen)
{
    require('../../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_insertar_gestion_202(:v_ptercero,:v_panno,:v_pperiodo,:v_pnomarch,:v_responsable,:v_regimen, :v_pradicado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    oci_bind_by_name($consulta, ':v_responsable', $responsable);
    oci_bind_by_name($consulta, ':v_regimen', $regimen);
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

    require('../../config/dbcon_prod.php');
    try {
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
    } catch (\Throwable $th) {
        echo $th->getMessage();
    }
}


function downloadFiles()
{
    global $request;
    $fileexists = false;

    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
        require_once('../../config/sftp_con.php');
        $fileexists = true;
    }

    if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
        require_once('../../config/ftpcon.php');
        $fileexists = true;
    }

    if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE && $fileexists == false) {
        require_once('../../config/sftp_con_2.php');
        $fileexists = true;
    }
    if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
        require_once('../../config/l_ftpcon.php');
        $fileexists = true;
    }

    if ($fileexists) {
        $file_size = ftp_size($con_id, $request->ruta);
        if ($file_size != -1) {
            // $ruta = $request->ruta;
            $name = explode("/", $request->ruta)[count(explode("/", $request->ruta)) - 1]; //Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
            // $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
            // $name = $name;
            $local_file = '../../../temp/' . $name;
            $handle = fopen($local_file, 'w');
            if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
                echo $name;
            } else {
                echo "0 - Archivo no encontrado";
            }
            ftp_close($con_id);
            fclose($handle);
        } else {
            echo "0 - Archivo no encontrado";
        }
    } else {
        require('../../sftp_cloud/DownloadFile.php');
        echo (DownloadFile($request->ruta));
    }
}

function validaCodificacion($file)
{
    $contenido = file_get_contents($file['tmp_name']);
    if (mb_check_encoding($contenido, 'UTF-8') && strpos($contenido, "\xEF\xBB\xBF") !== 0 && mb_detect_encoding($contenido, ['UTF-8', 'ISO-8859-1', 'ISO-8859-5'], false) === 'UTF-8' ) {
        return true;
    } else {
        return false;
    }
}

function validaComas($nombrArchivo, $rutaFTP)
{
    require_once('../../config/dbcon_prod.php');
    $ruta2 = $rutaFTP . '/';
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_202.p_valida_archivo_202(:v_pruta,:v_pnomarch,:v_json_error); end;');
    oci_bind_by_name($consulta, ':v_pruta', $ruta2);
    oci_bind_by_name($consulta, ':v_pnomarch', $nombrArchivo);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_error', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        if (json_decode($json)[0]->Codigo == 0) {
            if ($_SESSION) {
                return ["status" => true, "msg" => ""];
                // return true;
            } else {
                return ["status" => false, "msg" => "Debe cerrar session"];
            }
        } else {
            // $dato = '[{"tipo_error" : 0},{"resp":[{"Nombre":"' . json_decode($json)[0]->Error . '"}]}]';
            $dato = [["tipo_error" => 0],  ["resp" => [["Nombre" => json_decode($json)[0]->Nombre]]]];
            return ["status" => false, "msg" => json_encode($dato)];
        }
    } else {
        echo 111;
    }
    oci_close($c);
}
