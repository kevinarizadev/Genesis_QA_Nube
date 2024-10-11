<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function obtenerafiliados()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipodocumento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
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

function obtenerServicios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $contrato = $request->contrato;
  $documentocontrato = $request->documentocontrato;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_SERVICIO_QX(:v_pcontrato,:v_pregimen,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcontrato', $contrato);
  oci_bind_by_name($consulta, ':v_pregimen', $documentocontrato);
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

function  adjuntos_ftp()
{
  global $request;
  $hoy = date('dmY');
  $hora = date('h_i_s');
  $path = 'Autorizaciones/Cirugias/' . $hoy;
  require('../sftp_cloud/UploadFile.php');
  $name = 'CIR_' . $hoy . $hora .'.' . $request->ext;
  list(, $request->achivobase) = explode(';', $request->achivobase); // Proceso para traer el Base64
  list(, $request->achivobase) = explode(',', $request->achivobase); // Proceso para traer el Base64
  $base64 = base64_decode($request->achivobase); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  if (substr($subio, 0, 11) == '/cargue_ftp') {
    echo $subio;
  } else {
    echo 0;
  }
}

function obtenerProducto()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $regimen = $request->regimen;
  $contrato = $request->contrato;
  $producto = $request->producto;
  $clasificacion = $request->clasificacion;
  $ubicacion = $request->ubicacion;
  $tipo = $request->tipo;
  $edad = $request->edad;
  $sexo = $request->sexo;
  $tipodocumentoafiliado = isset($request->tipodocumentoafiliado) ? $request->tipodocumentoafiliado : '';
  $documentoafiliado = isset($request->documentoafiliado) ? $request->documentoafiliado : '';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_OBTENER_PRODUCTO_QX(:v_pcodigo,:v_pclasificacion,:v_pregimen,:v_pcontrato,:v_pprogramada,:v_pedad, :v_psexo,:v_ptipodocumento,:v_pnumerodocumento,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pregimen', $regimen);
  oci_bind_by_name($consulta, ':v_pcontrato', $contrato);
  oci_bind_by_name($consulta, ':v_pcodigo', $producto);
  oci_bind_by_name($consulta, ':v_pclasificacion', $clasificacion);
  oci_bind_by_name($consulta, ':v_pprogramada', $tipo);
  oci_bind_by_name($consulta, ':v_pedad', $edad);
  oci_bind_by_name($consulta, ':v_psexo', $sexo);
  oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumentoafiliado);
  oci_bind_by_name($consulta, ':v_pnumerodocumento', $documentoafiliado);
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

function P_UI_AUTPRO_QX()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $data = json_decode($request->data);
  $productos = json_encode($request->productos);
  $datovacio = "";
  $timestamp = strtotime($data->fechaorden);
  $fechaorden = date('d/m/Y', $timestamp);
  if($data->fechaprogramacion==""){
    $fechaprogramacion="";
  }else{
    $timestamp = strtotime($data->fechaprogramacion);
    $fechaprogramacion = date('d/m/Y', $timestamp);
  }
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_AUTPRO.P_UI_AUTPRO_QX(:v_pubicacion,
                                                                    :v_pnumero,
                                                                    :v_ptipo_documento_afiliado,
                                                                    :v_pdocumento_afiliado,
                                                                    :v_pcorreo_afiliado,
                                                                    :v_pcelular_afiliado,
                                                                    :v_pdiagnostico_ppal,
                                                                    :v_pdiagnostico_sec,
                                                                    :v_pcod_servicio,
                                                                    :v_pfecha_orden,
                                                                    :v_pjustificacion,
                                                                    :v_pobservacion,
                                                                    :v_pnit,
                                                                    :v_paccion,
                                                                    :v_pnit_solicitante,
                                                                    :v_pcontrato,
                                                                    :v_pcontratodocumento,
                                                                    :v_pcontratoubicacion,
                                                                    :v_pfecha_programacion,
                                                                    :v_pftp,
                                                                    :v_palto_costo,
                                                                    :v_pnombre_medico,
                                                                    :v_pespecialidad,
                                                                    :v_padjunto,
                                                                    :v_pcant_cups,
                                                                    :v_json_cups,
                                                                    :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pubicacion', $datovacio);
  oci_bind_by_name($consulta, ':v_pnumero', $datovacio);
  oci_bind_by_name($consulta, ':v_ptipo_documento_afiliado', $data->tipodocumento);
  oci_bind_by_name($consulta, ':v_pdocumento_afiliado', $data->documento);
  oci_bind_by_name($consulta, ':v_pcorreo_afiliado', $data->correo);
  oci_bind_by_name($consulta, ':v_pcelular_afiliado', $data->celular);
  oci_bind_by_name($consulta, ':v_pdiagnostico_ppal', $data->dxprincipal);
  oci_bind_by_name($consulta, ':v_pdiagnostico_sec', $data->dxsecundario);
  oci_bind_by_name($consulta, ':v_pcod_servicio', $data->codservicio);
  oci_bind_by_name($consulta, ':v_pfecha_orden', $fechaorden);
  oci_bind_by_name($consulta, ':v_pjustificacion', $data->observacionips);
  oci_bind_by_name($consulta, ':v_pobservacion', $data->observacion);
  oci_bind_by_name($consulta, ':v_pnit', $data->codipsasignada);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_pnit_solicitante', $data->codips);
  oci_bind_by_name($consulta, ':v_pcontrato', $data->contrato);
  oci_bind_by_name($consulta, ':v_pcontratodocumento', $data->contratodocumento);
  oci_bind_by_name($consulta, ':v_pcontratoubicacion', $data->contratoubicacion);
  oci_bind_by_name($consulta, ':v_pfecha_programacion', $fechaprogramacion);
  oci_bind_by_name($consulta, ':v_pftp', $data->ftp);
  oci_bind_by_name($consulta, ':v_palto_costo', $data->altocosto);
  oci_bind_by_name($consulta, ':v_pnombre_medico', $data->medico);
  oci_bind_by_name($consulta, ':v_pespecialidad', $data->codespecialidad);
  oci_bind_by_name($consulta, ':v_padjunto', $data->ruta);
  oci_bind_by_name($consulta, ':v_pcant_cups', $request->cantidadproductos);
  oci_bind_by_name($consulta, ':v_json_cups', $productos);
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

function obtenerSolicitudes()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.p_lista_sol_qx(:v_pestado,:v_response); END;');
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $cursor1 = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $cursor1, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor1, OCI_DEFAULT);
  $datos1 = [];
  oci_fetch_all($cursor1, $datos1, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor1);
  echo json_encode($datos1);
}


function ActualizarSolicitud()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.p_ui_programacion_qx(:v_pdocumento,
                                                                               :v_pnumero,
                                                                               :v_pubicacion,
                                                                               :v_pfecha_programacion,
                                                                               :v_paccion,
                                                                               :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
  oci_bind_by_name($consulta, ':v_pfecha_programacion', $request->v_pfecha_programacion);
  oci_bind_by_name($consulta, ':v_paccion', $request->v_paccion);
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

function AprobarNegarSolicitud()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_MARCAR_PERTINENCIA_QX(:v_pdocumento,
                                                                               :v_pnumero,
                                                                               :v_pubicacion,
                                                                               :v_pertinencia,
                                                                               :v_justificacion_pert,
                                                                               :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pdocumento', $request->v_pdocumento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
  oci_bind_by_name($consulta, ':v_pertinencia', $request->v_pertinencia);
  oci_bind_by_name($consulta, ':v_justificacion_pert', $request->v_justificacion_pert);
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
