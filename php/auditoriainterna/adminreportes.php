<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_ui_reportes(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $numero = $request->numero;
    $tipo = $request->tipo;
    $nombre = $request->nombre;
    $anno = $request->anno;
    $numeroNorma = $request->numeroNorma;
    $accion = $request->accion;
    $estadoNorma = $request->estadoNorma;
    $AdjuntoNorma = $request->AdjuntoNorma;
    $anexo = $request->anexo;
    $proceso = $request->proceso;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.p_ui_reportes(:v_pnumero,:v_ptipo,:v_pnombre,:v_panno,:v_pnumero_norma,:v_paccion,:v_pestado,:v_padjunto,:v_padjunto_norma,:v_pproceso, :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnumero',$numero);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
    oci_bind_by_name($consulta,':v_pnombre',$nombre);
    oci_bind_by_name($consulta,':v_panno',$anno);
    oci_bind_by_name($consulta,':v_pnumero_norma',$numeroNorma);
    oci_bind_by_name($consulta,':v_paccion',$accion);
    oci_bind_by_name($consulta,':v_pestado',$estadoNorma);
    oci_bind_by_name($consulta,':v_padjunto',$anexo);
    oci_bind_by_name($consulta,':v_padjunto_norma',$AdjuntoNorma);
    oci_bind_by_name($consulta,':v_pproceso',$proceso);
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

function obtenerReportes(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_REPORTES_2(:v_response); end;');
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}


function p_obtener_rol(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.p_obtener_rol(:v_json_row); end;');
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

function obtenerProcesos(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.P_LISTA_PROCESO(:v_json_row); end;');
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


function p_obtener_funcionario(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $nombre = $request->nombre;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.p_obtener_funcionario(:v_pcoincidencia,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pcoincidencia',$nombre);
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

function p_ui_funcionarios(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $documento = $request->documento;
    $tipo = $request->tipo;
    $estado = $request->estado;
    $accion = $request->accion;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.p_ui_funcionarios(:v_pdocumento,:v_ptipo,:v_pestado,:v_paccion,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento',$documento);
    oci_bind_by_name($consulta,':v_ptipo',$tipo);
    oci_bind_by_name($consulta,':v_pestado',$estado);
    oci_bind_by_name($consulta,':v_paccion',$accion);
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

function p_lista_funcionarios(){
    require_once('../config/dbcon_produccion.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO.p_lista_funcionarios(:v_json_row); end;');
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

function cargarAnexoAdmin(){
    global $request;
    $archivo = $request->soporte;
    $path = 'Planeacion/AdminReportes/';
    $hoy = date('dmY_His');
    $name = $request->codigo .  '_' . $hoy . '.pdf';
    list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
    list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
    $base64 = base64_decode($archivo); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $subio = UploadFile($path, $name);
    echo $subio;
    
    }

    function cargarUrlReportes(){
        global $request;
        $soporte = json_decode($request->soporte_File);
        $estado = 0;
        $response = [];

        foreach ($soporte as $archivo) {
            if (isset($archivo->base64)) {
                $path = ($archivo->tipo == 1) ? 'Planeacion/AdminReportes/Normas/' : 'Planeacion/AdminReportes/Anexos/';
                $nombreArchivo = basename($archivo->nombre); // Obtener el nombre de archivo existente

                list(, $archivo->base64) = explode(';', $archivo->base64);
                list(, $archivo->base64) = explode(',', $archivo->base64);
                $base64 = base64_decode($archivo->base64);

                file_put_contents('../../temp/' . $nombreArchivo, $base64);

                include_once('../sftp_cloud/UploadFile.php');
                $subio = UploadFile($path, $nombreArchivo);

                if (substr($subio, 0, 11) === '/cargue_ftp') {
                    $response[] = $subio;
                } else {
                    $estado++;
                }
            }else{
                $response[] = $archivo->ruta;
            }
        }

        if ($estado === 0) {
            echo json_encode($response);
        } 

        // global $request;
        // $soporte = json_decode($request->soporte_File);
        // $subioNorma ="";
        // $subioAnexo ="";
        // for ($i = 0; $i < 2; $i++) {
        //         $hoy = date('dmY');
        //         $hora = date('h_i_s');
        //         $pathA = 'Planeacion/AdminReportes/Anexos';
        //         $pathN = 'Planeacion/AdminReportes/Normas';
        //         $name= $soporte[$i]->tipo.$hoy.$hora.'.'.'pdf';
        //         $estado = 0;
        //         list(, $soporte[$i]->base64) = explode(';', $soporte[$i]->base64);
        //         list(, $soporte[$i]->base64) = explode(',', $soporte[$i]->base64);
        //         $base64 = base64_decode($soporte[$i]->base64);
        //         file_put_contents('../../temp/'.$name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
        //         if ($soporte[$i]->tipo == 1) {
        //             $ruta = $pathN;
        //         }elseif($soporte[$i]->tipo == 2){
        //             $ruta = $pathA;
        //         }
        //         // include_once('../sftp_cloud/UploadFile.php');
        //         include_once('../sftp_cloud/UploadFile.php');
        //         $subio = UploadFile($ruta, $name);
        //         if (substr($subio, 0, 11) == '/cargue_ftp') {
        //         if($soporte[$i]->tipo == 1){
        //             $subioNorma = $subio;
        //         }elseif($soporte[$i]->tipo == 2){
        //             $subioAnexo = $subio;
        //         }
        //         } else {
        //             $estado = $estado + 1;
        //         }
        //             $response = array('subioNorma' => $subioNorma,'subioAnexo' => $subioAnexo);
        //             $jsonResponse = json_encode($response);
        //     }
        //     if($estado == 0){               
        //         echo $jsonResponse;
        //     }else{
        //         echo '0';
        //     }        
        }


        function VerSoporte()
            {
            global $request;
            require('../sftp_cloud/DownloadFile.php');
            echo (DownloadFile($request->ruta));
            }

?>