<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function descargaFile()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}

function cargarSoporte()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->codigo .  '_' . $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function cargarSoporteGestionIndic()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/GestionPeriodo/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function cargarSoporteCompromisos()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/Compromisos/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_consulta_permisos_usuario()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_permisos_usuario(:v_pcedula,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcedula', $request->cedula);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_consulta_proceso()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_proceso(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_obtener_objetivos_perspectiva()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_obtener_objetivo_perspectiva(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_obtener_objetivo_estrategico()
{
  // global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_obtener_objetivo_estrategico(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_consulta_objetivo_proceso()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_objetivo_proceso(:v_pproceso,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_u_objetivo_proceso()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_u_objetivo_proceso(:v_pproceso,:v_ptactico,:v_pestado,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pproceso', $request->procesoCod);
  oci_bind_by_name($consulta, ':v_ptactico', $request->tacticoCod);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_ui_proceso()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_proceso(:v_pcodigo,:v_pnombre,:v_pmacropro,:v_pcategoria,:v_pdescripcion,:v_psoporte,
  :v_pestado,:v_pjson_det,:v_pcantidad,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pnombre', $request->nombre);
  oci_bind_by_name($consulta, ':v_pmacropro', $request->tipo);
  oci_bind_by_name($consulta, ':v_pcategoria', $request->categoria);
  oci_bind_by_name($consulta, ':v_pdescripcion', $request->descripcion);
  oci_bind_by_name($consulta, ':v_psoporte', $request->soporte);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
  oci_bind_by_name($consulta, ':v_pjson_det', $request->jsonObjetivos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->jsonObjetivosCantidad);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_listar_cargo_dependencias()
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_cargo_dependencias(:v_json_row); end;');
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

function p_lista_indicadores()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_indicadores(:v_pregid,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregid', $request->codigoId);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_consulta_indicador()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_indicador(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_consulta_responsable_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_responsable_indicador(:v_pregid,
  :v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregid', $request->codigoId);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_lista_funcionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_analitica_datos.p_lista_funcionario(:v_pcoincidencia,:v_pjson_out); end;');
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_obtener_tercero()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis.p_obtener_tercero(:v_pcodigo,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->funcionario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_ui_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_indicador(:v_pjson,:v_pjson_det,:v_pcantidad_det,:v_paccion,
  :v_pjson_row); end;');

  oci_bind_by_name($consulta, ':v_pjson', $request->datosJson);
  // oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidadJson);
  oci_bind_by_name($consulta, ':v_pjson_det', $request->listadoActoresTabla);
  oci_bind_by_name($consulta, ':v_pcantidad_det', $request->cantidadActores);

  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_lista_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_gestion_indicador(:v_pregn_id,:v_panno,:v_pjson_row,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->codigoIndicador);
  oci_bind_by_name($consulta, ':v_panno', $request->anio);
  oci_bind_by_name($consulta, ':v_pjson_row', $json, 4000);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_lista_traza_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_traza_gestion_indicador(:v_pregn_id,:v_pperiodo,:v_pjson_row,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->codigoIndicador);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pjson_row', $json, 4000);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_ui_gestion_indicador()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_gestion_indicador(:v_pjson,:v_pcantidad,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_eliminar_indicador()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_eliminar_indicador(:v_pregn_id,:v_pobservacion,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->codigoIndicador);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_u_metaVigencia()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_u_metaVigencia(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos, 4000);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_descarga_ficha_tecnica()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.P_DESCARGA_FICHA_TECNICA(:v_pregn_id,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_descarga_informe_multiple()
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_descarga_informe_multiple(:v_presponse); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_descarga_informe_individual()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_descarga_informe_individual(:v_pregn_id,:v_panno,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_listar_soportes_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_soportes_gestion_indicador(:v_pregn_id,:v_panno,:v_pperiodo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_guardar_soporte_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_guardar_soporte_gestion_indicador(:v_pregn_id,:v_panno,:v_pperiodo,:v_pnombre,:v_pruta,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pnombre', $request->nombre);
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_ui_compromisos_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_compromisos_gestion_indicador(:v_pdatos,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdatos', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_listar_compromisos_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_compromisos_gestion_indicador(:v_pregn_id,:v_panno,:v_pperiodo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  // oci_bind_by_name($consulta, ':v_pcompromiso', $request->idCompromiso);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_listar_soportes_compromisos()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_soportes_compromisos(:v_pregn_id,:v_pperiodo,:v_pcompromiso,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pcompromiso', $request->idCompromiso);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_guardar_soporte_compromisos()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_guardar_soporte_compromisos(:v_pdatos,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdatos', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_ui_planmejora_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_planmejora_gestion_indicador(:v_pdatos,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdatos', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_listar_planmejora_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_planmejora_gestion_indicador(:v_pregn_id,:v_panno,:v_pperiodo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}



function p_ui_planmejora_seg_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_planmejora_seg_gestion_indicador(:v_pdatos,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pdatos', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_listar_planmejora_seg_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_planmejora_seg_gestion_indicador(:v_pregn_id,:v_panno,:v_pperiodo,:v_pplanmejora,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pplanmejora', $request->idPlanMejora);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_genera_nuevo_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_genera_nuevo_indicador(:v_pregn_id,:v_panno,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pregn_id', $request->cod_id);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_actualizar_soportes_gestion_indicador()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualizar_soportes_gestion_indicador(:v_pruta,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_lista_tipologias()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_tipologias(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_actualiza_gestion_indicador()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualiza_gestion_indicador(:v_pusuario,:v_pjson_in,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pusuario', $request->responsable);
  oci_bind_by_name($consulta, ':v_pjson_in', $request->datos);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}


//////////////////////////////
//////////////////////////////
//////////////////////////////
function p_ui_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_pdm(:v_pjson,:v_pjson_det,:v_pcantidad_det,:v_paccion,
  :v_pjson_row); end;');

  oci_bind_by_name($consulta, ':v_pjson', $request->datosJson);
  // oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidadJson);
  oci_bind_by_name($consulta, ':v_pjson_det', $request->listadoResponsablesTabla);
  oci_bind_by_name($consulta, ':v_pcantidad_det', $request->cantidadResponsables);

  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_lista_pdm()
{
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_pdm(:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_consulta_responsable_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_consulta_responsable_pdm(:v_pcodigo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_lista_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_gestion_pdm(:v_pcod_pdm,:v_pjson_row,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo);
  oci_bind_by_name($consulta, ':v_pjson_row', $json, 4000);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_lista_gestion_pdm_traza()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_gestion_pdm_traza(:v_pcod_pdm,:v_pperiodo,:v_pjson_row,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pjson_row', $json, 4000);

  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (isset($json) && json_decode($json)->Codigo == 0) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}

function p_listar_soportes_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_soportes_gestion_pdm(:v_pcod_pdm,:v_pperiodo,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_guardar_soporte_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_guardar_soporte_gestion_pdm(:v_pcod_pdm,:v_panno,:v_pperiodo,:v_pnombre,:v_pruta,
  :v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pperiodo', $request->periodo);
  oci_bind_by_name($consulta, ':v_pnombre', $request->nombre);
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function cargarSoporteGestionIndic_PDM()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/GestionPeriodo/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_actualizar_soportes_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualizar_soportes_gestion_pdm(:v_pruta,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_ui_gestion_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_gestion_pdm(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos);
  // oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  // oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}


function p_lista_seguimientos_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_seguimientos_pdm(:v_pcod_pdm,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_lista_seguimientos_pdm_traza()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_seguimientos_pdm_traza(:v_pcod_pdm,:v_pcod_seg,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_ui_seguimiento_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_seguimiento_pdm(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos);
  // oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  // oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_lista_seguimientos_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_seguimientos_gestion_pdm(:v_pcod_pdm,:v_pcod_seg,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codigo_pdm);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codigo_seg);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_ui_seguimiento_gestion_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_seguimiento_gestion_pdm(:v_pjson,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datos);
  // oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
  // oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_listar_tipos_estado_avance()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_tipos_estado_avance(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_listar_porcentajes_avance()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_porcentajes_avance(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_lista_seguimientos_gestion_pdm_traza()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_seguimientos_gestion_pdm_traza(:v_pcod_pdm,:v_pcod_seg,:v_pcod_gestion,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  oci_bind_by_name($consulta, ':v_pcod_gestion', $request->codGestion);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_listar_soportes_seguimiento_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_soportes_seguimiento_pdm(:v_pcod_pdm,:v_pcod_seg,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_listar_soportes_seguimiento_gestion_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_listar_soportes_seguimiento_gestion_pdm(:v_pcod_pdm,:v_pcod_seg,:v_pcod_gestion,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  oci_bind_by_name($consulta, ':v_pcod_gestion', $request->codGestion);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function cargarSoporteSeguimiento_PDM()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/Seguimiento/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function cargarSoporteSeguimientoGestion_PDM()
{
  require('../sftp_cloud/UploadFile.php');
  global $request;
  $archivo = $request->base64;
  $path = 'Planeacion/POA/SeguimientoGestion/' . date('dmY');
  $hoy = date('dmY_His');
  $name = $request->nombre .  '_' . $hoy .'.'.$request->ext;
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  echo $subio;
}

function p_guardar_soporte_seguimiento_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_guardar_soporte_seguimiento_pdm(:v_pcod_pdm,:v_pcod_seg,:v_pnombre,:v_pruta,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  oci_bind_by_name($consulta, ':v_pnombre', $request->nombre);
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_guardar_soporte_seguimiento_gestion_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_guardar_soporte_seguimiento_gestion_pdm(:v_pcod_pdm,:v_pcod_seg,:v_pcod_gestion,:v_pnombre,:v_pruta,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->codPDM);
  oci_bind_by_name($consulta, ':v_pcod_seg', $request->codSeguimiento);
  oci_bind_by_name($consulta, ':v_pcod_gestion', $request->codGestion);
  oci_bind_by_name($consulta, ':v_pnombre', $request->nombre);
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_actualizar_soportes_seguimiento_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualizar_soportes_seguimiento_pdm(:v_pruta,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_actualizar_soportes_seguimiento_gestion_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_actualizar_soportes_seguimiento_gestion_pdm(:v_pruta,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pruta', $request->ruta);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}



function p_ui_autopdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_ui_autopdm(:v_pjson,:v_paccion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pjson', $request->datosJson);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
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

function p_lista_autopdm()
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_lista_autopdm(:v_presponse); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_descarga_ficha_tecnica_pdm()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.P_DESCARGA_FICHA_TECNICA_PDM(:v_pcod_pdm,:v_presponse); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->cod_pdm);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}

function p_genera_nuevo_PDM()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_genera_nuevo_PDM(:v_pcod_pdm,:v_panno,:v_pgestion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->cod_pdm);
  oci_bind_by_name($consulta, ':v_panno', $request->anno);
  oci_bind_by_name($consulta, ':v_pgestion', $request->gestion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}

function p_descarga_informe_multiple_pdm()
{
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_descarga_informe_multiple_pdm(:v_presponse); end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_presponse', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
}


function p_eliminar_indicador_pdm()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_planeacion_ci.p_eliminar_indicador_pdm(:v_pcod_pdm,:v_pobservacion,:v_presponsable,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pcod_pdm', $request->cod_pdm);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
  oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }
  oci_close($c);
}
