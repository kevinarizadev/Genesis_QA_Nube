<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function OBTENER_LISTA_CENSO_2()
{
  require_once('../../config/dbcon_prod.php');
  global $request;

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_lista_censo_2(:v_pnit, :v_pdocumento, :v_ptipo, :v_response); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerCensoPendientes()
{
  require_once('../../config/dbcon_prod.php');
  global $request;

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_lista_censo(:v_pubicacion,:v_pdocumento,:v_response); end;');
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}


function obtenerAutorizaciones()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_solicitud_hospitalarias(:v_ptipo_documento,:v_pdocumento,:v_ptercero,:v_json_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_doc);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_ptercero', $request->tercero);
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

function obtenerFichaPaciente()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_FICHA_PACIENTE(:v_pubicacion,:v_pnumerocenso,:v_response); end;');

  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pnumerocenso', $request->numerocenso);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerEvoluciones()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_LISTA_EVOLUCION(:v_pubicacion,:v_pnumerocenso,:v_response); end;');

  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pnumerocenso', $request->numerocenso);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerMotivoGlosa()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_MOTIVO_GLOSA(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerEventosAdversos()
{
  require_once('../../config/dbcon_prod.php');

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVENTOSADV(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerEventosAdvDeta()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVENTOSADV_DETA(:v_pcodigo_adv,:v_response); end;');

  oci_bind_by_name($consulta, ':v_pcodigo_adv', $request->evento);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerMotivoEgreso()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_MOTIVO_EGRESO(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function nuevaEvolucion()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  // $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_insertar_evolucion(:v_pnumero,:v_pubicacion,:v_pclasificacion,:v_pdiagnostico,:v_pvalor,:v_pobservacion,:v_pesadverso,:v_peventoadverso,:v_pdetalleeventoadverso,:v_presponsable,:v_pglosa,:v_pobsglosa,:v_preversglosa,:v_pmotivoglosa,:v_pcierre,:v_pfechacierre,:v_pmotivoegreso,:v_premision,:v_prespuesta);end;');
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_insertar_evolucion(
    :v_pnumero               ,
    :v_pubicacion            ,
    :v_pclasificacion        ,
    :v_pdiagnostico          ,
    :v_pobservacion          ,
    :v_pesadverso            ,
    :v_peventoadverso        ,
    :v_pdetalleeventoadverso ,
    :v_presponsable          ,
    :v_pcierre               ,
    :v_pfechacierre          ,
    :v_pmotivoegreso         ,
    :v_premision             ,
    :v_pcantidad_glosa       ,
    :v_pjson_glosas          ,
    :v_ppendientes          ,
    :v_prespuesta
    );end;');

  $x = "";
  $glosas = json_encode($request->evolucion->glosas);
  oci_bind_by_name($consulta, ':v_pnumero', $request->evolucion->num_censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->evolucion->ubicacion);
  oci_bind_by_name($consulta, ':v_pclasificacion', $request->evolucion->hospitalizacion);
  oci_bind_by_name($consulta, ':v_pdiagnostico', $request->evolucion->diagnostico);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->evolucion->descripcion);
  oci_bind_by_name($consulta, ':v_pesadverso', $request->evolucion->adverso);
  oci_bind_by_name($consulta, ':v_peventoadverso', $request->evolucion->evento_adverso);
  oci_bind_by_name($consulta, ':v_pdetalleeventoadverso', $request->evolucion->evento_adverso_detalle);
  oci_bind_by_name($consulta, ':v_presponsable', $request->evolucion->responsable);
  oci_bind_by_name($consulta, ':v_pcierre', $request->evolucion->cierre);
  oci_bind_by_name($consulta, ':v_pfechacierre', $request->evolucion->fecha_cierre);
  oci_bind_by_name($consulta, ':v_pmotivoegreso', $request->evolucion->motivo_cierre);
  oci_bind_by_name($consulta, ':v_premision', $request->evolucion->remision);
  oci_bind_by_name($consulta, ':v_pcantidad_glosa', $request->evolucion->num_glosas);
  oci_bind_by_name($consulta, ':v_pjson_glosas', $glosas);
  oci_bind_by_name($consulta, ':v_ppendientes', $request->evolucion->pendientes);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function consultarDiagnostico()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_diagnostico(:v_pcoincidencia, :v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->keyword);
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

function obtenerhospitalizacion()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_HOSPITALIZACION(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerEvolucionDetalle()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_EVOLUCION_DETALLE(:v_pubicacion,:v_pnumerocenso,:v_prenglon,:v_response); end;');

  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pnumerocenso', $request->censo);
  oci_bind_by_name($consulta, ':v_prenglon', $request->renglon);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerMotivosEspecificos()
{
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MACROMOTIVOS_ESPECIFICO(:v_json_row); end;');
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

function consultaAfiliado()
{
  require_once('../../config/dbcon_prod.php');
  global $request;

  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.p_obtener_info_paciente(:v_ptipo_documento,
																	:v_pnumero_documento,
																	:v_response); end;');
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->tipo_doc);
  oci_bind_by_name($consulta, ':v_pnumero_documento', $request->documento);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function consultarIps()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $ubi = "1";
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_IPS(:v_pubicacion,:v_pcoincidencia,:v_response); end;');

  oci_bind_by_name($consulta, ':v_pubicacion', $ubi);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->query);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function obtenerDiagnostico()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_diagnostico(:v_pcoincidencia, :v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->query);
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

function obtenerTiposEstancia()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin pq_genesis_censo_hospitalario.P_OBTENER_ESTANCIA(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function P_OBTENER_PRODUCTO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_censo_hospitalario.P_OBTENER_PRODUCTO(:v_pcodigo, :v_pregimen, :v_pcontrato, :v_pedad, :v_psexo, :v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pregimen', $request->regimen);
  oci_bind_by_name($consulta, ':v_pcontrato', $request->contrato);
  oci_bind_by_name($consulta, ':v_pedad', $request->edad);
  oci_bind_by_name($consulta, ':v_psexo', $request->sexo);
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

function P_UI_GLOSA()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $glosa = $request->glosa;
  $arrGlosas = json_encode($glosa->glosas);
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_censo_hospitalario.P_ui_glosa(:v_pnumero, :v_pubicacion, :v_pcantidad_glosa, :v_pjson_glosas, :v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnumero', $glosa->censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $glosa->ubicacion);
  oci_bind_by_name($consulta, ':v_pcantidad_glosa', $glosa->cantidad_glosa);
  oci_bind_by_name($consulta, ':v_pjson_glosas', $arrGlosas);
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

function P_OBTENER_AUTORIZACIONES()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_autorizaciones(:v_pprestador,:v_ptipodocumento,:v_pdocumento, :v_pnumero, :v_pubicacion, :v_paccion, :v_response_gestionadas,:v_response_pendientes); end;');
  $cursor_gestionadas = oci_new_cursor($c);
  $cursor_pendientes = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_pprestador', $request->prestador);
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipodocumento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_response_gestionadas', $cursor_gestionadas, -1, OCI_B_CURSOR);
  oci_bind_by_name($consulta, ':v_response_pendientes', $cursor_pendientes, -1, OCI_B_CURSOR);
  oci_execute($consulta, OCI_DEFAULT);
  oci_execute($cursor_gestionadas, OCI_DEFAULT);
  oci_execute($cursor_pendientes, OCI_DEFAULT);
  if (!isset($json)) {
    $gestionadas = [];
    $pendientes = [];
    oci_fetch_all($cursor_gestionadas, $gestionadas, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_fetch_all($cursor_pendientes, $pendientes, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor_gestionadas);
    oci_free_statement($cursor_pendientes);
    // echo json_encode($gestionadas);
    // echo json_encode($pendientes);
    $res = ["PENDIENTES" => $pendientes, "GESTIONADAS" => $gestionadas];
    echo json_encode($res);
  } else {
    $res = ["PENDIENTES" => [], "GESTIONADAS" => []];
    echo json_encode($res);
  }
  oci_close($c);
}

function OBTENER_DETALLE_AUT()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $tipodocumento = '';
  $filtro = 'SOLICITUD';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.P_LISTA_SOLICITUD( :v_tipo_doc,
                                                                        :v_pcodigo,
                                                                        :v_pfiltro,
                                                                        :v_json_row
                                                                      ); end;');
  oci_bind_by_name($consulta, ':v_tipo_doc', $tipodocumento);
  oci_bind_by_name($consulta, ':v_pcodigo', $request->codigo);
  oci_bind_by_name($consulta, ':v_pfiltro', $filtro);
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

function P_CONFIRMA_SOL_AUT()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $operacion = 'P';
  $documento = 'SW';
  $empresa = '1';
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ESOA.p_confirma_sol_aut_json(:v_pempresa,
                                                                        :v_pdocumento,
                                                                        :v_pnumero,
                                                                        :v_pubicacion,
                                                                        :v_poperacion,
                                                                        :v_pjson_row
                                                                      ); end;');
  oci_bind_by_name($consulta, ':v_pempresa', $empresa);
  oci_bind_by_name($consulta, ':v_pdocumento', $documento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_poperacion', $operacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo "Error que nadie sabe";
  }
  oci_close($c);
}


function OBTENER_GLOSAS()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_censo_hospitalario.p_obtener_glosas(:v_pnumero, :v_pubicacion, :v_pevolucion, :v_response); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_pevolucion', $request->evolucion);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function OBTENER_PENDIENTES()
{
  require_once('../../config/dbcon_prod.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_censo_hospitalario.p_obtener_pendientes(:v_response); end;');
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}

function OBTENER_PRESTADOR_AUDITOR()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_lista_ips_admin(:v_pnit, :v_ptipo, :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->documento);
  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo_documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo "Error que nadie sabe";
  }
  oci_close($c);
}

function P_UI_ADMIN_AUDITOR()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $tipo = '1';
  $auditores = json_encode($request->json->auditores);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.P_ui_admin_auditor(:v_pnit, :v_paccion, :v_pcantidad_auditor, :v_pjson_auditor, :v_ptipo, :v_json_row ); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->json->nit);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_pcantidad_auditor', $request->json->cantidad_auditor);
  oci_bind_by_name($consulta, ':v_pcantidad_auditor', $tipo);
  oci_bind_by_name($consulta, ':v_pjson_auditor', $auditores);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo "Error que nadie sabe";
  }
  oci_close($c);
}

function P_OBTENER_ACCESO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_acceso(:v_json_row ); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo "Error que nadie sabe";
  }
  oci_close($c);
}

function GESTIONA_ESOA()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $productos = json_encode($request->gestion->productos);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_gestiona_esoa(:v_pnumero, :v_pubicacion, :v_pproductos, :v_pcantidad, :v_json_row ); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->gestion->num_esoa);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->gestion->ubicacion);
  oci_bind_by_name($consulta, ':v_pproductos', $productos);
  oci_bind_by_name($consulta, ':v_pcantidad', $request->gestion->cantidad);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo "Error que nadie sabe";
  }
  oci_close($c);
}

function OBTENER_CENSO_CERRADO()
{
  require_once('../../config/dbcon_prod.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_censo_hospitalario.p_obtener_censo_cerrado(:v_pnit, :v_response); end;');
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);

  echo json_encode($datos);
}


function ACTUALIZA_FACTURA_CENSO_CERRADO()
{
  global $request;
  require_once('../../config/dbcon_prod.php');

  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.P_ui_factura_censo(:v_pnumero, :v_pubicacion, :v_pfactura, :v_pvalor, :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->censo);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubi);
  oci_bind_by_name($consulta, ':v_pfactura', $request->fact);
  oci_bind_by_name($consulta, ':v_pvalor', $request->valor);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
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


function OBTENER_ROL()
{
  require_once('../../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_rol(:v_json_row); end;');
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


function P_UI_VOBO_AUT()
{
  global $request;
  require_once('../../config/dbcon_prod.php');
  // print_r(["numero" => $request->numero, "ubicacion" => $request->ubicacion, "accion" => $request->accion,]);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.P_ui_vobo_aut(:v_pnumero,:v_pubicacion, :v_paccion, :v_pfecha, :v_pobservacion, :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  oci_bind_by_name($consulta, ':v_paccion', $request->accion);
  oci_bind_by_name($consulta, ':v_pfecha', $request->fecha);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->fecha);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
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
