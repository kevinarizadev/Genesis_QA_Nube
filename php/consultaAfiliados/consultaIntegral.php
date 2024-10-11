<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_OBTENER_DATOS_AFILIADOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_DATOS_AFILIADOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_DATOS_AFILIADOS_APELLIDOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_DATOS_AFILIADOS_APELLIDOS(       :v_papellido1,
                                                                                                                    :v_papellido2,
                                                                                                                    :v_pnombre1,
                                                                                                                    :v_pnombre2,
                                                                                                                    :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_papellido1', $request->v_papellido1);
    oci_bind_by_name($consulta, ':v_papellido2', $request->v_papellido2);
    oci_bind_by_name($consulta, ':v_pnombre1', $request->v_pnombre1);
    oci_bind_by_name($consulta, ':v_pnombre2', $request->v_pnombre2);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_AUTORIZACIONES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_AUTORIZACIONES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_BENEFICIARIOS_GRUPOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_BENEFICIARIOS_GRUPOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_CODIGOS_URGENCIAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_CODIGOS_URGENCIAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_CONTRATOS_PRESTACION()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_CONTRATOS_PRESTACION(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_EMPLEADORES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_EMPLEADORES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_FACTURAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_FACTURAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_GLOSAS_BDUA()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_GLOSAS_BDUA(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_INCAPACIDADES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_INCAPACIDADES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_NOVEDADES()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_NOVEDADES(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_REFERENCIAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_REFERENCIAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}


function P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_TRASLADOS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_TRASLADOS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_TUTELAS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_TUTELAS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}
function P_OBTENER_PORTABILIDAD()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_PORTABILIDAD(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_PQRS()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.P_OBTENER_PQRS(       :v_ptipodocumento,
                                                                                                        :v_pdocumento,
                                                                                                        :v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipodocumento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function P_OBTENER_LISTA_CENSO()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c, 'BEGIN PQ_GENESIS_INTEGRACION_CONSULTA.p_obtener_lista_censo(:v_ptipo_documento,:v_pdocumento,:v_pjson_row ); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_ptipo_documento', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
    oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function soportes_alto_costo()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_CONSULTA_SOPORTE_SINIESTRO(:v_ptipo_doc,:v_pnum_doc,:v_pjson_row_out); end;');
    oci_bind_by_name($consulta, ':v_ptipo_doc', $request->v_ptipodocumento);
    oci_bind_by_name($consulta, ':v_pnum_doc', $request->v_pdocumento);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        $resultados = [];
        $posiciones_por_cohorte = [];
        foreach (json_decode($json) as $dato) {
            $indice = array_search($dato->NOM_COHORTE, array_column($resultados, "NOM_COHORTE"));
            if ($indice !== false) {
                $resultados[$indice]["SOPORTE"][] = obtenerObjetoRuta($dato->SOPORTE);
            } else {
                $nuevo_objeto = [
                    "TIPO_DOCUMENTO" => $dato->TIPO_DOCUMENTO,
                    "NUM_DOCUMENTO" => $dato->NUM_DOCUMENTO,
                    "DOCUMENTO" => $dato->DOCUMENTO,
                    "COD_COHORTE" => $dato->COD_COHORTE,
                    "NOM_COHORTE" => $dato->NOM_COHORTE,
                    "SOPORTE" => [obtenerObjetoRuta($dato->SOPORTE)],
                ];
                $resultados[] = $nuevo_objeto;
                $posiciones_por_cohorte[$dato->NOM_COHORTE] = count($resultados) - 1;
            }
        }
        $posiciones_por_cohorte_objeto = (object) $posiciones_por_cohorte;
        array_unshift($resultados, $posiciones_por_cohorte_objeto);
        echo json_encode($resultados);
    } else {
        echo 0;
    }
    oci_close($c);
}

function obtenerObjetoRuta($ruta)
{
    $partes_ruta = explode('/', $ruta);
    $nombre_archivo = end($partes_ruta);

    return (object) [
        "nombre_archivo" => $nombre_archivo,
        "ruta" => $ruta,
    ];
}

function seguimiento_cancer()
{
    global $request;
    require_once('../config/dbcon_prod.php');
    $tipodoc = $request->v_ptipodocumento;
    $cedula = $request->v_pdocumento;
    $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_CAC_ORI.P_OBTENER_SEGUIMIENTO_TIPOYDOC(:v_tipo_doc,:v_num_doc,:v_json_out); end;');
    oci_bind_by_name($consulta, ':v_tipo_doc', $tipodoc);
    oci_bind_by_name($consulta, ':v_num_doc', $cedula);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    } else {
        echo 0;
    }
    oci_close($c);
}

function seguimiento_telefonico()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $tipodoc = $request->v_ptipodocumento;
    $cedula = $request->v_pdocumento;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN oasis.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_USUARIOS_GESTIONADOS_FILTRO(:V_TIPO_DOCUMENTO, :V_DOCUMENTO, :V_RESPUESTA); end;');
    oci_bind_by_name($consulta, ':V_TIPO_DOCUMENTO', $tipodoc);
    oci_bind_by_name($consulta, ':V_DOCUMENTO', $cedula);
    oci_bind_by_name($consulta, ':V_RESPUESTA', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    // if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
    oci_close($c);
}
