<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
function P_ST_INICIAR_GESTION_MANUAL ()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_INICIAR_GESTION_MANUAL(:P_NU_NUMERO,:V_JSON_ROW); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->PNUNUMERO);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
//codigo insertado Pablo//
function P_MARCA_USUARIOS ()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_MARCA_USUARIOS (:v_pjson_row_out); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION_MANUAL()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION_MANUAL(:P_V_DOCUMENTO,:V_VC_COHORTE,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_DOCUMENTO', $request->PVDOCUMENTO);
  oci_bind_by_name($consulta, ':V_VC_COHORTE', $request->VVCCOHORTE);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_EAFI_AFILIADOS_GESTION()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_EAFI_AFILIADOS_GESTION(:P_V_TIPO_DOCUMENTO,:P_V_DOCUMENTO,:p_v_siniestro,:p_v_marca,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_TIPO_DOCUMENTO', $request->PVTIPO_DOCUMENTO);
  oci_bind_by_name($consulta, ':P_V_DOCUMENTO', $request->PVDOCUMENTO);
  oci_bind_by_name($consulta, ':p_v_siniestro', $request->p_v_siniestro);
  oci_bind_by_name($consulta, ':p_v_marca', $request->p_v_marca);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function exportarcasosCerrados()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_EXCEL_GESTIONADOS(:V_PCOHORTE, :V_PREGIONAL, :V_PFECHA_1, :V_PFECHA_2, :V_RESPUESTA );end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PCOHORTE', $request->VPCOHORTE);
  oci_bind_by_name($consulta, ':V_PREGIONAL', $request->VPREGIONAL);
  oci_bind_by_name($consulta, ':V_PFECHA_1', $request->VPFECHA1);
  oci_bind_by_name($consulta, ':V_PFECHA_2', $request->VPFECHA2);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESPUESTA', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
}
function listaRegional()
{
  // este sp se recibe un cursor
  require_once('../config/dbcon.php');
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.p_lista_seccionales(:v_seccionales);end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_seccionales', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (!isset($json)) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}
function listarequerimientoPendiente()
{
  // este sp se recibe un cursor
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.p_lista_req_pendiente(:V_COHORTE, :V_REQ_PENDIENTE);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_COHORTE', $request->VPCOHORTE);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_REQ_PENDIENTE', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (!isset($json)) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}
function listarmotivosEstudio()
{
  // este sp se recibe un cursor
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.p_lista_mot_estudios(:V_COHORTE, :V_MOT_ESTUDIOS);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_COHORTE', $request->VPCOHORTE);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_MOT_ESTUDIOS', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (!isset($json)) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}
function listaCohorte()
{
  require_once('../config/dbcon_prod.php');
  // global $request;
  $tipoDocumento = 'AL';
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.p_listado_cohortes(:v_pdocumento,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':v_pdocumento', $tipoDocumento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_RESPUESTA_PREGUNTA_SN()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_RESPUESTA_PREGUNTA_SN(:V_PSINIESTRO,:V_IDGESTION,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':V_PSINIESTRO', $request->VPSINIESTRO);
  oci_bind_by_name($consulta, ':V_IDGESTION', $request->VIDGESTION);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function guardarobservacionSeguimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_POST_RESPUESTA_PREGUNTA_OBSERVACION(:P_V_JSON,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function obervacionSeguimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS_TIPOS_OBSERVACION(:P_NU_NUMERO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->PNUNUMERO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function consultaobservaciondeSegumiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_GET_OBSERVACION_GENERAL(:P_I_ID_SEGUIMIENTO,:P_I_SINISTESTRO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_I_ID_SEGUIMIENTO', $request->PIIDSEGUIMIENTO);
  oci_bind_by_name($consulta, ':P_I_SINISTESTRO', $request->PISINISTESTRO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_Cohorte()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_COHORTE(:v_regional,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_regional', $request->vregonal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_Regionales()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_REGIONAL(:v_json_out); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_estado_Gestion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_LLAMADAS_GESTION(:v_regional,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_regional', $request->vregonal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_estado_Pendiente()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_LLAMADAS_PENDIENTES(:v_regional,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_regional', $request->vregonal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_estado_Seguimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_LLAMADAS_SEGUIMIENTOS(:v_regional,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_regional', $request->vregonal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function resumen_estado_Cerrado()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_RESUMEN_LLAMADAS_CERRADAS(:v_regional,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_regional', $request->vregonal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function PMESA_AYUDA()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_MESA_AYUDA(:v_cohorte,:v_usuario,:v_tipo_documento,:v_pcedula,:v_papellido,:v_pnombres,:v_ubicacion,:v_pobservacion,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':v_cohorte', $request->vcohorte);
  oci_bind_by_name($consulta, ':v_usuario', $request->vusuario);
  oci_bind_by_name($consulta, ':v_tipo_documento', $request->vtipodocumento);
  oci_bind_by_name($consulta, ':v_pcedula', $request->vpcedula);
  oci_bind_by_name($consulta, ':v_papellido', $request->vpapellido);
  oci_bind_by_name($consulta, ':v_pnombres', $request->vnombres);
  oci_bind_by_name($consulta, ':v_ubicacion', $request->vubicacion);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_USUARIOS_GESTIONADOS()
{
  // este sp se recibe un cursor
  require_once('../config/dbcon.php');
  global $request;
  $cursor = oci_new_cursor($c);
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_USUARIOS_GESTIONADOS(:V_PDOCUMENTO, :V_DOCUMENTO, :V_RESPUESTA );end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PDOCUMENTO', $request->VPDOCUMENTO);
  oci_bind_by_name($consulta, ':V_DOCUMENTO', $request->VDOCUMENTO);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESPUESTA', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  if (!isset($json)) {
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  } else {
    echo json_encode($json);
  }
}
//codigo insertado Pablo//
// function generateExcelFile()
// {
//   require_once 'vendor/autoload.php';
//   require_once('../config/dbcon_prod.php');
//   global $request;
//   $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_DATA_EXCEL_GESTION(:V_JSON_ROW); end;');
//   $clob = oci_new_descriptor($c, OCI_D_LOB);
//   oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
//   oci_execute($consulta, OCI_DEFAULT);

//   if (isset($clob)) {
//     $respuesta = $clob->read($clob->size());
//   } else {
//     $respuesta = json_encode([]);
//   }
//   // echo $respuesta;
//   $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('response.xlsx');
//   $hoja = $spreadsheet->getActiveSheet();
//   $data = json_decode($respuesta, true);
//   $indice = 8; // Índice de la primera fila
//   $columnaInicial = 'B';
//   $indiceFila = 8;
//   foreach ($data as $elemento) {
//     $columna = $columnaInicial;
//     $hoja->getColumnDimension($columna)->setWidth(24);
//     $hoja->setCellValue($columna . $indiceFila, $elemento['NroSiniestro']);
//     $hoja->getStyle($columna . $indiceFila)->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_NUMBER);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Regional']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['TipoDocumento']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['NumeroDocumento']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['NombreCompleto']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['EstadoAfiliado']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Edad']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Sexo']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Direccion']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Telefono']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['CorreoElectronico']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Cie10']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Portabilidad']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Cohorte']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['ClasificacionPatologia']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['FechaDiagnostico']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Pluripatologia']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['PatologiasAsociadas']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['Observacion']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['EstadoSeguimiento']);
//     $columna++;
//     $hoja->setCellValue($columna . $indiceFila, $elemento['UsuarioGestion']);
//     $columna++;
//     $fechaOriginal = $elemento['FechaInicioGestion'];
//     $fechaSinHora = substr($fechaOriginal, 0, 9);
//     $hoja->setCellValue($columna . $indiceFila, $fechaSinHora);
//     // Obtener el estilo de la celda
//     $style = $hoja->getStyle($columna . $indiceFila);
//     // Aplicar alineación horizontal y vertical centrada
//     $style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
//     $style->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
//     // Aplicar formato de fecha "dd/mm/yyyy"
//     $style->getNumberFormat()->setFormatCode('dd/mm/yyyy');
//     // Reemplazar el formato de mes a número
//     $fechaCellValue = $hoja->getCell($columna . $indiceFila)->getValue();
//     $fechaCellValue = str_replace(
//       ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
//       ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
//       $fechaCellValue
//     );
//     $hoja->getCell($columna . $indiceFila)->setValue($fechaCellValue);
//     $columna++; // Incrementar la columna
//     $hoja->setCellValue($columna . $indiceFila, $elemento['FechaCierreGestion']);
//     $fechaCierreOriginal = $elemento['FechaCierreGestion'];
//     $fechaCierreSinHora = substr($fechaCierreOriginal, 0, 9);
//     $hoja->setCellValue($columna . $indiceFila, $fechaCierreSinHora);
//     // Obtener el estilo de la celda
//     $style = $hoja->getStyle($columna . $indiceFila);
//     // Aplicar alineación horizontal y vertical centrada
//     $style->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
//     $style->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
//     // Aplicar formato de fecha "dd/mm/yyyy"
//     $style->getNumberFormat()->setFormatCode('dd/mm/yyyy');
//     // Reemplazar el formato de mes a número
//     $fechaCierreCellValue = $hoja->getCell($columna . $indiceFila)->getValue();
//     $fechaCierreCellValue = str_replace(
//       ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
//       ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
//       $fechaCierreCellValue
//     );
//     $hoja->getCell($columna . $indiceFila)->setValue($fechaCierreCellValue);
//     $hoja->getColumnDimension($columna)->setAutoSize(true);
//     $indiceFila++; // Incrementar el índice para la siguiente fila
//   }
//   $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
//   // Enviar las cabeceras para descargar el archivo
//   header('Content-Type: application/octet-stream');
//   header('Content-Disposition: attachment; filename="response.xlsx"');
//   // Imprimir el archivo
//   $writer->save('php://output');
// }
function P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS(:P_V_JSON,:V_JSON_ROW);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
  /* require_once('../config/dbcon_prod.php');
    global $request;
    // echo $request->P_V_JSON;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS(  :P_V_JSON,
                                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;*/
}
function P_ST_GET_USUARIOS_EN_SEGUIMIENTO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_USUARIOS_EN_SEGUIMIENTO(:V_RESPONSE);end;');
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESPONSE', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
  /* require_once('../config/dbcon_prod.php');
    global $request;
    // echo $request->P_V_JSON;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS(  :P_V_JSON,
                                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;*/
}
function P_ST_GET_GESTION_USUARIOS_FILTROS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_GESTION_USUARIOS_FILTROS(:P_V_JSON,:V_RESPONSE);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESPONSE', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);

  /*  require_once('../config/dbcon_prod.php');
    global $request;
    // echo $request->P_V_JSON;
    $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_GESTION_USUARIOS_FILTROS(      :P_V_JSON,
                                                                                                                :V_JSON_ROW); end;');
    oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $respuesta = $clob->read($clob->size());
    } else {
        $respuesta = json_encode([]);
    }
    echo $respuesta;*/
}
function P_ST_GET_PATOLOGIA_AFILIADOS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_PATOLOGIA_AFILIADOS(  :P_VC_TIPO_DOC,
                                                                                                     :P_VC_DOCUMENTO,
                                                                                                     :V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_VC_TIPO_DOC', $request->P_VC_TIPO_DOC);
  oci_bind_by_name($consulta, ':P_VC_DOCUMENTO', $request->P_VC_DOCUMENTO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_SESION()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_SESION(:P_NU_NUMERO,
        :P_V_USUARIO,
        :V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
  oci_bind_by_name($consulta, ':P_V_USUARIO', $request->P_V_USUARIO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
//Procedimiento para obtener las preguntas del lado de gestion
function P_ST_INICIAR_GESTION()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  // echo $request->P_NU_NUMERO;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_INICIAR_GESTION(               :P_NU_NUMERO,
                                                                                                            :V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  // echo $request->P_NU_NUMERO;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION(    :P_NU_NUMERO,
                                                                                                                    :V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_MOSTRAR_GESTION()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  // echo $request->P_NU_NUMERO;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_MOSTRAR_GESTION(    :P_V_SINIESTRO,
                                                                                                 :P_I_TIPO,
                                                                                                 :P_I_GESTION,
                                                                                                 :V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':P_V_SINIESTRO', $request->P_V_SINIESTRO);
  oci_bind_by_name($consulta, ':P_I_TIPO', $request->P_I_TIPO);
  oci_bind_by_name($consulta, ':P_I_GESTION', $request->P_I_GESTION);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function consultar_listadocac()
{

  require_once('../config/dbcon_prod.php');
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_ESTADOS_LLAMADA( :v_json_row); end;');;

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json_estadollamada = $clob->read($clob->size());
  } else {
    $json_estadollamada = json_encode([]);
  }
  oci_close($c);
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_RESPONSABLE_ATENDER_LLAMADA( :v_json_row); end;');;

  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $jsonResponsable = $clob->read($clob->size());
  } else {
    $jsonResponsable = json_encode([]);
  }
  oci_close($c);

  $formato = array(
    'EstadoLlamada' => json_decode($json_estadollamada),
    'Reponsable' => json_decode($jsonResponsable)

  );
  $respuesta = json_encode($formato);
  echo $respuesta;
}
function P_ST_POST_GESTION_USUARIOS()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_POST_GESTION_USUARIOS( :P_V_JSON,
                                                                                                  :V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_JSON', $request->p_v_json);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {

    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
// P_ST_GET_CONFIG_PREGUNTAS(V_JSON_ROW OUT CLOB)
function P_ST_GET_CONFIG_PREGUNTAS()
{

  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS( :V_JSON_ROW); end;');;
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
// P_ST_GET_CONFIG_PREGUNTAS(V_JSON_ROW OUT CLOB)
// function P_ST_GET_CONFIG_PREGUNTAS_DEV() {

//     require_once('../config/dbcon_prod.php');
//     global $request;

//     $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS_TIPOS(
//                                                                                                             :P_NU_NUMERO,
//                                                                                                             :V_JSON_ROW); end;');
//     oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
//     $clob = oci_new_descriptor($c, OCI_D_LOB);
//     oci_bind_by_name($consulta, ':V_JSON_ROW', $clob, -1, OCI_B_CLOB);
//     oci_execute($consulta, OCI_DEFAULT);
//     if (isset($clob)) {
//         $respuesta = $clob->read($clob->size());
//     } else {
//         $respuesta = json_encode([]);
//     }
//     echo $respuesta;
// }
function P_ST_GET_CONFIG_PREGUNTAS_TIPOS()
{
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_CONFIG_PREGUNTAS_TIPOS(:P_NU_NUMERO,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_NU_NUMERO', $request->P_NU_NUMERO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_LISTAR_IPS_ALTOCOSTO()
{
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_LISTAR_IPS_ALTOCOSTO(:V_PCONCEPTO,:V_JSON_ROW); end;');
  oci_bind_by_name($consulta, ':V_PCONCEPTO', $request->V_PCONCEPTO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_LISTAR_IPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_LISTAR_IPS(:v_nit,:v_json_out); end;');
  oci_bind_by_name($consulta, ':v_nit', $request->V_PCONCEPTO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_POST_RESPUESTA_PREGUNTA()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_POST_RESPUESTA_PREGUNTA(:P_V_JSON,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_POST_RESPUESTA_PREGUNTA_GESTION()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_POST_RESPUESTA_PREGUNTA_GESTION(:P_V_JSON,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_POST_RESPUESTA_PREGUNTA_GESTION_MANUAL()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_POST_RESPUESTA_PREGUNTA_GESTION(:P_V_JSON,:V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_JSON', $request->P_V_JSON);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_AG_GET_HISTORICO_RESPUESTA_PREGUNTA_GESTION()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_AG_GET_HISTORICO_RESPUESTA_PREGUNTA_GESTION(
        :P_I_ID_SEGUIMIENTO,
        :P_I_SINISTESTRO,
        :V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_I_ID_SEGUIMIENTO', $request->P_I_ID_SEGUIMIENTO);
  oci_bind_by_name($consulta, ':P_I_SINISTESTRO', $request->P_I_SINISTESTRO);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_ST_GET_EAFI_AFILIADOS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_ST_GET_EAFI_AFILIADOS(
        :P_V_TIPO_DOCUMENTO ,
        :P_V_DOCUMENTO ,
        :p_v_siniestro  ,
        :p_v_marca ,
        :V_JSON_ROW); end;');;
  oci_bind_by_name($consulta, ':P_V_TIPO_DOCUMENTO', $request->tipoDocumento);
  oci_bind_by_name($consulta, ':P_V_DOCUMENTO', $request->numDocumento);
  oci_bind_by_name($consulta, ':p_v_siniestro', $request->siniestro);
  oci_bind_by_name($consulta, ':p_v_marca', $request->marca);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function ObtenePListaCohortes()
{
  require_once('../config/dbcon_prod.php');
  global $request;

  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_LISTADO_COHORTES(:v_pjson_row_out); end;');;
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function ObtenePListaClasificacion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_LISTADO_CLASIFICACIONES(:v_p_cohorte,:v_pjson_row_out); end;');;
  oci_bind_by_name($consulta, ':v_p_cohorte', $request->vpcohorte);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function ObtenePListaMarcaUsuario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_MARCA_USUARIOS(:v_pjson_row_out); end;');;
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
function P_CONSULTA_SINIESTRO()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN oasis.PQ_GENESIS_GESTION_ACGS.P_CONSULTA_SINIESTRO(:v_ptipo_doc,:v_pnum_doc,:v_pjson_row); end;');;
  oci_bind_by_name($consulta, ':v_ptipo_doc', $request->vptipodoc);
  oci_bind_by_name($consulta, ':v_pnum_doc', $request->vpnumdoc);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
