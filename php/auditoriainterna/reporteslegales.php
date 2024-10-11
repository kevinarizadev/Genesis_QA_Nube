<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
    function obtenerCalendario(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $year = $request->year;
        //$mes = $request->mes;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_CALENDARIO(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
        //oci_bind_by_name($consulta,':v_pperiodo',$mes);
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
    function obtenerProgramacion_Temp(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $year = $request->year;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_PROGRAMACION_TEMP(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function obtenerProgramacion(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $year = $request->year;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_PROGRAMACION(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function obtenerListaFecha(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $fecha = $request->fecha;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_REPORTE_CALENDARIO(:v_pfecha,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pfecha',$fecha);
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
    function obtenerListaReporte(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_REPORTES_2(:v_response); end;');
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

    function p_lista_detalle_gestion(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.p_lista_detalle_gestion(:v_pdocumento,:v_response); end;');
        oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
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

    function obtenerEntes(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_ENTES(:v_json_row); end;');
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
    function obtenerTipoNorma(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_TIPO_NORMA(:v_json_row); end;');
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

    
    function obtenerListaCargos(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_CARGOS(:v_json_row); end;');
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


    function obtenerListaArchivos(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_TIPO_ARCHIVO(:v_json_row); end;');
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

    function p_obtener_rol(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $cedula = $request->cedula;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_BCK.p_obtener_rol(:v_pdocumento, :v_json_row); end;');
        oci_bind_by_name($consulta,':v_pdocumento',$cedula);
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

    
    function insertarReporte(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $json = json_decode($request->json);
        $numero = $json->numero;
        $codigo_reporte = $json->codigo_reporte;
        $fecha_reporte = $json->fecha_reporte;
        $hora = $json->hora;
        $alerta = $json->alerta;
        $fecha_limite = $json->fecha_limite;
        $frecuencia = $json->frecuencia;
        $objetivo = $json->objetivo;
        $entes = $json->entes;
        $elabora = $json->elabora;
        $revisa = $json->revisa;
        $reporta = $json->reporta;
        $accion = $json->accion;
        $link_cargue = $json->link_cargue;
        $fecha_cargue = $json->fecha_cargue;
        $estadop = $json->estadop;
        $contenido = $json->Contenido_r;   
        $v_pestado_cargue = $json->v_pestado_cargue;   
        $fuente = $json->fuente; 
        $v_pdias_habiles = $json->v_pdias_habiles;    
        $v_pobservacion_gestion  = $json->v_pobservacion_gestion;    
        $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.p_inserta_reporte(
            :v_pnumero,
            :v_pcodigo_reporte,
            :v_pfecha_reporte,
            :v_phora,
            :v_pfecha_notifica,
            :v_pfechalimite,
            :v_pfrecuencia,
            :v_pobjetivo,
            :v_pentes,
            :v_pelabora,
            :v_previsa,
            :v_preporta,
            :v_paccion,
            :v_plink_cargue,
            :v_pfecha_cargue,
            :v_estadop,
            :v_pcontenido,
            :v_pestado_cargue,
            :v_pfuente,
            :v_pdias_habiles,
            :v_pobservacion_gestion,
            :v_json_row
        ); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pcodigo_reporte',$codigo_reporte);
        oci_bind_by_name($consulta,':v_pfecha_reporte',$fecha_reporte);
        oci_bind_by_name($consulta,':v_phora',$hora);
        oci_bind_by_name($consulta,':v_pfecha_notifica',$alerta);
        oci_bind_by_name($consulta,':v_pfechalimite',$fecha_limite);
        oci_bind_by_name($consulta,':v_pfrecuencia',$frecuencia);
        oci_bind_by_name($consulta,':v_pobjetivo',$objetivo);
        oci_bind_by_name($consulta,':v_pentes',$entes);
        oci_bind_by_name($consulta,':v_pelabora',$elabora);
        oci_bind_by_name($consulta,':v_previsa',$revisa);
        oci_bind_by_name($consulta,':v_preporta',$reporta);
        oci_bind_by_name($consulta,':v_paccion',$accion);
        oci_bind_by_name($consulta,':v_plink_cargue',$link_cargue);
        oci_bind_by_name($consulta,':v_pfecha_cargue',$fecha_cargue);
        oci_bind_by_name($consulta,':v_estadop',$estadop);
        oci_bind_by_name($consulta,':v_pcontenido',$contenido);
        oci_bind_by_name($consulta,':v_pestado_cargue',$v_pestado_cargue);
        oci_bind_by_name($consulta,':v_pfuente',$fuente);
        oci_bind_by_name($consulta,':v_pdias_habiles',$v_pdias_habiles);
        oci_bind_by_name($consulta,':v_pobservacion_gestion',$v_pobservacion_gestion);
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

    
    function verReporte(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $numero = $request->numero;
        $anno = $request->anno;
        $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_DETALLE_REPORTE(:v_pnumero,:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_panno',$anno);
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
    // function cargarReporte(){
    //     require_once('../config/dbcon_produccion.php');
    //     global $request;
    //     $numero = $request->numero;
    //     $url = $request->url;
    //     $consulta = oci_parse($c,'BEGIN OASIS.pq_genesis_calendario_bck.P_LISTA_DETALLE_REPORTE(:v_pnumero,:v_purl,:v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_pnumero',$numero);
    //     oci_bind_by_name($consulta,':v_purl',$url);
    //     $clob = oci_new_descriptor($c,OCI_D_LOB);
    //     oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    //     oci_execute($consulta,OCI_DEFAULT);
    //     if (isset($clob)) {
    //         $json = $clob->read($clob->size());
    //         echo $json;
    //     }else{
    //         echo 0;
    //     }
    //     oci_close($c);
    // }


    // function reporteFileUrl(){
    //     require_once('../config/dbcon_produccion.php');
    //     require_once('../config/ftpcon.php');
    //     include('../upload_file/subir_archivo.php');
    //     global $request;
    //     $fileRuta = json_decode($request->file);
    //     $location = json_decode($request->location);
    //     $hoy = date('dmY');
    //     $path = '/cargue_ftp/Digitalizacion/Genesis/Colmena/'.$location.'/';
    //     $estado = 0;
    //     $name = $hoy.'_'.$fileRuta->name;  
    //     $SubirFTP = subirFTPIntranet($fileRuta->base64,$path,$name,$fileRuta->ext);
    //     if ($SubirFTP != '0 - Error') {
    //         $rutas->url = $SubirFTP;
    //     } else {
    //         $estado = $estado + 1;
    //     }
    //     if($estado == 0){
    //         echo json_encode($rutas);
    //     }else{
    //         echo '0';
    //     }
    // }

    
function reporteFileUrl(){
    require('../sftp_cloud/UploadFile.php');
    global $request;
    $archivo = $request->base64;
    $path = 'ReportesLegales/' . date('dmY');
    $hoy = date('dmY_His');
    $name = $request->codigo .  '_' . $hoy . '.pdf';
    list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
    list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
    $base64 = base64_decode($archivo); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $subio = UploadFile($path, $name);
    echo $subio;
    }

    function obtenerGestion(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $year = $request->year;
        $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.P_LISTA_GESTION(:v_panno,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_panno',$year);
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
    function listarCargo(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $cargo = $request->id;
        $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.P_LISTA_RESPONSABLES(:v_pcargo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcargo',$cargo);
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
    // function asignarReporte(){
    //     require_once('../config/dbcon_produccion.php');
    //     global $request;
    //     $numero = $request->numero;
    //     $elabora_cod = $request->elabora_cod;
    //     $elabora_cedula = $request->elabora_cedula;
    //     $reporta_cod = $request->reporta_cod;
    //     $reporta_cedula = $request->reporta_cedula;
    //     $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.P_ACTUALIZA_RESPONSABLES(:v_pnumero,:v_elabora,:v_reporta,:v_cargo_reporta,:v_cargo_elabora,:v_json_row); end;');
    //     oci_bind_by_name($consulta,':v_pnumero',$numero);
    //     oci_bind_by_name($consulta,':v_elabora',$elabora_cedula);
    //     oci_bind_by_name($consulta,':v_reporta',$reporta_cedula);
    //     oci_bind_by_name($consulta,':v_cargo_reporta',$elabora_cod);
    //     oci_bind_by_name($consulta,':v_cargo_elabora',$reporta_cod);
    //     $clob = oci_new_descriptor($c,OCI_D_LOB);
    //     oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    //     oci_execute($consulta,OCI_DEFAULT);
    //     if (isset($clob)) {
    //         $json = $clob->read($clob->size());
    //         echo $json;
    //     }else{
    //         echo 0;
    //     }
    //     oci_close($c);
    // }

        // EXPORTAR REPORTES
    function p_obtener_reportes_legales(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.p_obtener_reportes_legales(:v_cur_conver); end;');
        $cursor = oci_new_cursor($c);
        oci_bind_by_name($consulta, ':v_cur_conver', $cursor, -1, OCI_B_CURSOR);
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = [];
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);
        echo json_encode($datos);
    }

    function p_lista_frecuencia(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.p_lista_frecuencia(:v_json_row); end;');
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

    function asignarReporte(){
            require_once('../config/dbcon_produccion.php');
            global $request;
            $numero = $request->numero;
            $reporte = $request->reporte;
            $accion = $request->accion;
            $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.P_UI_RESPONSABLE(:v_pdocumento,:v_preporte,:v_paccion, :v_json_row); end;');
            oci_bind_by_name($consulta,':v_pdocumento',$numero);
            oci_bind_by_name($consulta,':v_preporte',$reporte);
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
    // function cuenta_Gestiona(){
    //     require_once('../config/dbcon_produccion.php');
    //     global $request;
    //     $consulta = oci_parse($c,'BEGIN pq_genesis_calendario_bck.P_GESTIONA(:v_json_row); end;');
    //     $clob = oci_new_descriptor($c,OCI_D_LOB);
    //     oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    //     oci_execute($consulta,OCI_DEFAULT);
    //     if (isset($clob)) {
    //         $json = $clob->read($clob->size());
    //         echo $json;
    //     }else{
    //         echo 0;
    //     }
    //     oci_close($c);
    // }
    function misReportesCedula(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $tipo = $request->tipo;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_BCK.P_OBTENER_MIS_REPORTES(:v_ptipo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
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

    function VerSoporte()
            {
            global $request;
            require('../sftp_cloud/DownloadFile.php');
            echo (DownloadFile($request->ruta));
            }

            
    function P_LISTA_FUNCIONARIO(){
        require_once('../config/dbcon_produccion.php');
        global $request;
        $tipo = $request->tipo;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CALENDARIO_BCK.P_LISTA_FUNCIONARIO(:v_pdoc_jefe,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pdoc_jefe',$tipo);
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

    
//     function updateJson(){
//         require_once('../config/dbcon_prod.php');
//         global $request;
//         $id = "1";
//         $json_send = $request->json;
//         $consulta = oci_parse($c,'begin PQ_GENESIS_INTRANET.P_ACTUALIZA_SMOD(:v_prol,:v_pjsonin,:v_json_row); end;');
//         oci_bind_by_name($consulta, ':v_prol',$id);
//         oci_bind_by_name($consulta,':v_pjsonin',$json_send);
//         $clob = oci_new_descriptor($c,OCI_D_LOB);
//         oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
//         oci_execute($consulta);
//         $json = $clob->read($clob->size());
//         echo $json;
//         oci_close($c);
//    }
//    function JsonFilesUrls(){
//         require_once('../config/dbcon_prod.php');
//         require_once('../config/ftpcon.php');
//         include('../upload_file/subir_archivo.php');
//         global $request;
//         $array_PDFs = json_decode($request->PDFs);
//         // echo json_encode($array_PDFs);
//         $arrlength = count($array_PDFs);
//         $hoy = date('dmY');
//         $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
//         if ($arrlength == 0) {
//             $res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
//             echo json_encode($res);
//         } else {
//             $estado = 0;
//             for ($i=0; $i < $arrlength; $i++) { 
//                 $name = $hoy.'_'.$array_PDFs[$i]->name;   
//                 $SubirFTP = subirFTP($array_PDFs[$i]->base64,$path,$name,$array_PDFs[$i]->ext);
//                 if ($SubirFTP != '0 - Error') {
//                     $rutas[$i]->url = $SubirFTP;
//                     $rutas[$i]->macro = $array_PDFs[$i]->macro;
//                     $rutas[$i]->proce = $array_PDFs[$i]->proce;
//                     $rutas[$i]->tipo = $array_PDFs[$i]->tipo;
//                     $rutas[$i]->id = $array_PDFs[$i]->id;
//                 } else {
//                     $estado = $estado + 1;
//                 }
//             }
//             if($estado == 0){
//                 echo json_encode($rutas);
//             }else{
//                 echo '0';
//             }
//         }
//     }
//     function JsonFileUrl(){
//         require_once('../config/dbcon_prod.php');
//         require_once('../config/ftpcon.php');
//         include('../upload_file/subir_archivo.php');
//         global $request;
//         $fileRuta = json_decode($request->file);
//         // echo json_encode($fileRuta);
//         $hoy = date('dmY');
//         $path = '/cargue_ftp/Digitalizacion/Genesis/Calidad/Procesos/';
//         $estado = 0;
//         $name = $hoy.'_'.$fileRuta->name;  
//         $SubirFTP = subirFTP($fileRuta->base64,$path,$name,$fileRuta->ext);
//         if ($SubirFTP != '0 - Error') {
//             $rutas->url = $SubirFTP;
//         } else {
//             $estado = $estado + 1;
//         }
//         if($estado == 0){
//             echo json_encode($rutas);
//         }else{
//             echo '0';
//         }
//     }
?>