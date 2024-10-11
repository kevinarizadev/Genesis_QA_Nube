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
    require_once('../config/dbcon_prod.php');
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
    require_once('../config/dbcon_prod.php');
    $anno = $request->anno;
    $consulta = oci_parse($c, "SELECT pern_numero IDE, case when pern_numero = 1 then 'ENERO'
                                                 when pern_numero = 2 then  'FEBRERO'
                                                 when pern_numero = 3 then  'MARZO'
                                                 when pern_numero = 4 then  'ABRIL'
                                                 when pern_numero = 5 then  'MAYO'
                                                 when pern_numero = 6 then  'JUNIO'
                                                 when pern_numero = 7 then  'JULIO'
                                                 when pern_numero = 8 then  'AGOSTO'
                                                 when pern_numero = 9 then  'SEPTIEMBRE'
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

function enviarDatos()
{
    // echo json_encode(["STATUS" => true, "MSG" => "NO TODOS LOS CARGUES FUERON EXITOSOS", "DATA" => ["ERRORES" => [["NOMBRE_ARCHIVO" => "2024_6_salud.txt", "MSG" => "El anio  y el periodo selecionado ya fueron cargados!"]], "COMPLETOS" => [["NIT" => "0", "RADICADO" => 18, "NOMBRE_ARCHIVO" => "2024_6_vivienda.txt"], ["NIT" => "0", "RADICADO" => 19, "NOMBRE_ARCHIVO" => "2024_6_demanda_efectiva.txt"]]]]);

    $anno = $_POST['anno'];
    $mes = $_POST['mes'];
    $nit = $_POST['nit'];
    $responsable = $_POST['responsable'];
    $rutas = [];
    $nombresArchivo = [];
    $success = [];
    $error = [];
    if (isset($_FILES) && count($_FILES) > 0) {
        foreach ($_FILES as $name => $file) {
            $tempName = $anno . '_' . $mes . '_' . $name . '.' . explode('.', $file['name'])[1];
            if ($name == 'salud') {
                $cant_comas = 112;
            } else if ($name == 'vivienda') {
                $cant_comas = 32;
            } else {
                $cant_comas = 12;
            }
            $status = subirArchivo($file, $tempName, $cant_comas);
            if ($status['STATUS']) {
                $json  = ["FTP" => $status['MSG'] . $tempName, "TEMP" => $status['TEMP']];
                array_push($nombresArchivo, $tempName);
                array_push($rutas, $status);
            } else {
                echo json_encode($status);
                return;
            }
        }
        $a = 0;
        while ($a < (count($rutas))) {
            $response = p_valida_archivo_consusalud($rutas[$a]);
            if ($response[0]->Codigo == 0) {
                $resp = p_insertar_gestion_consusalud($nit, $anno, $mes, $nombresArchivo[$a], $responsable);
                if ($resp['STATUS'] == true) {
                    // Archivo cargado,Revisar estado en la opcion MIS CARGUES
                    $json = ["NIT" => $nit, "RADICADO" => $resp['MSG'][0]->Proceso, "NOMBRE_ARCHIVO" => $rutas[$a]['NOMBRE']];
                    array_push($success, $json);
                } else {
                    $json = ["NOMBRE_ARCHIVO" => $rutas[$a]['NOMBRE'], "MSG" => $resp['MSG'][0]->Nombre];
                    array_push($error, $json);
                }
            } else {
                echo  json_encode(["STATUS" => FALSE, "MSG" => "ERROR DE VALIDACION", "DATA" => []]);
                return;
            }
            $a++;
        }
        if (count($success) > 0) {
            if (count($success) == count($_FILES)) {
                $json_out = ["STATUS" => TRUE, "MSG" => "SE CARGARON TODOS LOS SOPORTES EXITOSAMENTE", "DATA" => ["ERRORES" => $error, "COMPLETOS" => $success]];
            } else {
                $json_out = ["STATUS" => TRUE, "MSG" => "NO TODOS LOS CARGUES FUERON EXITOSOS", "DATA" => ["ERRORES" => $error, "COMPLETOS" => $success]];
            }
        } else {
            $json_out = ["STATUS" => FALSE, "MSG" => "EL AÑO Y PERIODO SELECCIONADO YA FUERON CARGADOS", "DATA" => ["ERRORES" => $error, "COMPLETOS" => $success]];
        }
        echo json_encode($json_out);
    } else {
        echo json_encode(["STATUS" => FALSE, "MSG" => "DEBE CARGAR AL MENOS 1 ARCHIVO", "DATA" => []]);
    }
}

function eliminarArchivos($ruta)
{
    unlink($ruta);
}

function p_insertar_gestion_consusalud($nit, $anno, $periodo, $nom_archivo, $resonsable)
{
    // echo (' nit->' . $nit . ' anno->' . $anno . ' periodo->' . $periodo . ' nom_archivo->' . $nom_archivo . ' resonsable' . $resonsable . "<br>");
    require('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_consusalud.p_insertar_gestion_consusalud(:v_ptercero,:v_panno,:v_pperiodo,:v_pnomarch,:v_responsable, :v_pradicado,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_ptercero', $nit);
    oci_bind_by_name($consulta, ':v_panno', $anno);
    oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
    oci_bind_by_name($consulta, ':v_pnomarch', $nom_archivo);
    oci_bind_by_name($consulta, ':v_responsable', $resonsable);
    oci_bind_by_name($consulta, ':v_pradicado', $json2, 4000);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        $resp = json_decode($json);
        // $dato = [["radicado" => json_decode($json2), "resp" => ($json)]];
        // echo json_encode($dato);
        if ($resp[0]->Codigo == 0) {
            return ["STATUS" => TRUE, "MSG" => json_decode($json)];
        } else {
            return ["STATUS" => FALSE, "MSG" => json_decode($json)];
        }
    } else {
        return ["STATUS" => FALSE, "MSG" => "Ocurrio un error inesperado, por favor recargar la pagina con CTR + F5"];
    }
    oci_close($c);
}


function subirArchivo($file, $name, $cant_comas)
{
    try {
        if (validaCodificacion($file) === true) {
            $base64 = file_get_contents($file['tmp_name']);
            file_put_contents('../../temp/' . $name, $base64);
            $rutaTemp = '../../temp/' . $name;
            $status_coma = contarComas($rutaTemp, $name, $cant_comas);
            // no hay errores en el array
            if (count($status_coma) == 0) {
                require('../config/sftp_con.php');
                $rutaFtp = '/cargue_ftp/digitalizacion/genesis/gestion_caracterizacion/';
                if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $rutaFtp) == TRUE) {
                    $subio = @ftp_put($con_id, $rutaFtp . $name, $rutaTemp, FTP_BINARY);
                    if ($subio) {
                        eliminarArchivos($rutaTemp);
                        return (["STATUS" => TRUE, "MSG" => $rutaFtp, "TEMP" => $rutaTemp, "NOMBRE" => $name]);
                    } else {
                        return (["STATUS" => FALSE, "MSG" => "Ocurrio un error al intentar cargar el archivo, por favor vuelva a intentarlo"]);
                    }
                } else {
                    if (ftp_mkdir($con_id, $rutaFtp)) {
                        $subio = @ftp_put($con_id, $rutaFtp . $name, $rutaTemp, FTP_BINARY);
                        if ($subio) {
                            eliminarArchivos($rutaTemp);
                            return (["STATUS" => TRUE, "MSG" => $rutaFtp, "TEMP" => $rutaTemp, "NOMBRE" => $name]);
                        } else {
                            return (["STATUS" => FALSE, "MSG" => "Ocurrio un error al intentar cargar el archivo, por favor vuelva a intentarlo"]);
                        }
                    } else {
                        return (["STATUS" => FALSE, "MSG" => "Ocurrio un error al intentar cargar el archivo, por favor vuelva a intentarlo"]);
                    }
                }
            } else {
                eliminarArchivos($rutaTemp);
                return ["STATUS" => FALSE, "MSG" => "Se encontraron registros con un numero de columnas diferentes a las permitidas", "DATA" => $status_coma];
            }
        } else {
            return (["STATUS" => FALSE, "MSG" => "El archivo " . $file['name'] . " no es un formato valido"]);
        }
    } catch (\Throwable $th) {
        return (["STATUS" => FALSE, "MSG" => $th->getMessage()]);
    }
}

function validaCodificacion($file)
{
    $contenido = file_get_contents($file['tmp_name']);
    if (
        mb_check_encoding($contenido, 'UTF-8') && strpos($contenido, "\xEF\xBB\xBF") !== 0 && mb_detect_encoding($contenido, ['UTF-8', 'ISO-8859-1', 'ISO-8859-5'], false) === 'UTF-8'
        //  && (!preg_match('%(?:
        //     [\xC2-\xDF][\x80-\xBF]        # non-overlong 2-byte
        //     |\xE0[\xA0-\xBF][\x80-\xBF]               # excluding overlongs
        //     |[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}      # straight 3-byte
        //     |\xED[\x80-\x9F][\x80-\xBF]               # excluding surrogates
        //     |\xF0[\x90-\xBF][\x80-\xBF]{2}    # planes 1-3
        //     |[\xF1-\xF3][\x80-\xBF]{3}                  # planes 4-15
        //     |\xF4[\x80-\x8F][\x80-\xBF]{2}    # plane 16
        //     )+%xs', $contenido))
    ) {
        return true;
    } else {
        return false;
    }
}

function contarComas($ruta, $name, $cant_comas)
{
    $fp = fopen($ruta, "r");
    $i = 0;
    $array_errors = [];
    while (!feof($fp)) {
        if (count($array_errors) == 100) {
            break;
        }
        $linea = fgets($fp);
        $i++;
        $cols = explode('|', $linea);
        if (count($cols) != $cant_comas) {
            array_push($array_errors, (object)[
                'fila' => $i,
                'num_columnas' => count($cols)
            ]);
        }
    }
    $errores[] = (object) [
        'nombre' => $name,
        'cantError' => count($array_errors),
        'errores' => $array_errors
    ];
    if (count($array_errors) == 0) {
        $errores = [];
    }
    return $errores;

    fclose($fp);
}

// function p_valida_archivo_consusalud($ruta, $nombre, $estructura)
function p_valida_archivo_consusalud($data)
{
    if (str_contains($data['NOMBRE'], 'salud')) {
        $tipo_estructura = "S";
    } else if (str_contains($data['NOMBRE'], 'vivienda')) {
        $tipo_estructura = "V";
    } else {
        $tipo_estructura = "D";
    }

    require('../config/dbcon_prod.php');
    $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_consusalud.p_valida_archivo_consusalud(:v_pruta,:v_pnomarch,:v_tipo_estructura,:v_json_error); end;');
    oci_bind_by_name($consulta, ':v_pruta', $data['MSG']);
    oci_bind_by_name($consulta, ':v_pnomarch', $data['NOMBRE']);
    oci_bind_by_name($consulta, ':v_tipo_estructura', $tipo_estructura);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_error', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        return json_decode($json);
    } else {
        return json_encode(["Codigo" => 1, "Error" => "Ocurrio un error inesperado, por favor recargar la pagina con CTR + F5", "radicado" => null]);
    }
    oci_close($c);
    return json_encode(["Codigo" => 1, "Error" => "Ocurrio un error inesperado, por favor recargar la pagina con CTR + F5", "radicado" => null]);
}

function p_leer_archivo_consusalud()
{
    require('../config/dbcon_prod.php');
    global $request;
    $data = $request->data;
    $a = 0;
    $resps = [];
    $listaRad = "";
    while ($a < count($data)) {
        $tipo_estructura = 'null';
        if (str_contains($data[$a]->NOMBRE_ARCHIVO, 'salud')) {
            $tipo_estructura = "S";
        } else if (str_contains($data[$a]->NOMBRE_ARCHIVO, 'vivienda')) {
            $tipo_estructura = "V";
        } else {
            $tipo_estructura = "D";
        }

        $consulta = oci_parse($c, 'BEGIN oasis.pq_genesis_consusalud.p_leer_archivo_consusalud (:v_ptercero,:v_tipo_estructura,:v_pcodigo_proceso,:v_pnomarch,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_ptercero', $data[$a]->NIT);
        oci_bind_by_name($consulta, ':v_tipo_estructura', $tipo_estructura);
        oci_bind_by_name($consulta, ':v_pcodigo_proceso', $data[$a]->RADICADO);
        oci_bind_by_name($consulta, ':v_pnomarch', $data[$a]->NOMBRE_ARCHIVO);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            $listaRad = $listaRad . " " . $data[$a]->RADICADO;
            array_push($resps, $json);
        } else {
            echo json_encode(["Codigo" => 1, "Error" => "Ocurrio un error inesperado, por favor recargar la pagina con CTR + F5", "radicado" => null]);
            return;
        }
        oci_close($c);
        $a++;
    }
    if (count($resps) === count($data)) {
        $json_out = ["STATUS" => TRUE, "MSG" => "RADICADOS $listaRad LEIDOS CORRECTAMENTE", "DATA" => []];
    } else {
        $json_out = ["STATUS" => TRUE, "MSG" => "RADICADOS $listaRad LEIDOS CORRECTAMENTE", "DATA" => []];
    }
}


function p_listar_gestion_consusalud()
{
    require('../config/dbcon_prod.php');
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'begin oasis.pq_genesis_consusalud.p_listar_gestion_consusalud(:v_response); end;');
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}
