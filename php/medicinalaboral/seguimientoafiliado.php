<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_DATOS_BASICOS_AFILIADO_INCAPACIDAD_PROLONGADA(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_DATOS_BASICOS_AFILIADO_INCAPACIDAD_PROLONGADA(
                                                                :v_ptipo_documento,
                                                                :v_pdocumento,
                                                                :v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
	oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
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

function P_REGISTRO_INCAPACIDAD_PROLONGADA(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_REGISTRO_INCAPACIDAD_PROLONGADA(
                                                                :v_ptipo,
                                                                :v_ptipo_documento,
                                                                :v_pdocumento, 
                                                                :v_pactualiza, 
                                                                :v_json_in,
                                                                :v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo',$request->tipo);
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta,':v_pactualiza',$request->actualiza);
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
	oci_bind_by_name($consulta,':v_json_in',$request->jsonDatos);
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

function P_CONSULTA_PRELIMINAR_SEGUIMIENTO_INCAPACIDAD_PROLONGADA(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_SEGUIMIENTO_INCAPACIDAD_PROLONGADA(
                                                                :v_ptipo_documento,
                                                                :v_pdocumento,
																:v_pid,
                                                                :v_cur_conver); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta,':v_pid',$request->id);
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

function P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN(
                                                                :v_ptipo_documento,
                                                                :v_pdocumento,
																:v_pid,
                                                                :v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
	oci_bind_by_name($consulta,':v_pid',$request->id);
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

 function P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN_DETALLE(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN_DETALLE(
                                                                :v_ptipo_documento,
                                                                :v_pdocumento,
																:v_pid,
                                                                :v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
	oci_bind_by_name($consulta,':v_pid',$request->id);
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

function P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL_SIGUIMIENTO(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL_SIGUIMIENTO(
                                                                :v_ptipo_documento,
                                                                :v_pdocumento,
																:v_pid,
                                                                :v_json_row); end;');
	oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
	oci_bind_by_name($consulta,':v_pid',$request->id);
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

function P_CONSULTA_PRELIMINAR_INCAPACIDAD_PROLONGADA(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_INCAPACIDAD_PROLONGADA(:v_cur_conver); end;');
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

function P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL(:v_json_row); end;');
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

function P_ACTUALIZAR_ESTADO_SEGUIMIENTO(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_ACTUALIZAR_ESTADO_SEGUIMIENTO(:v_ptipo_documento,
																							:v_pdocumento,
																							:v_pid,
																							:v_pobservacion,
																							:v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento', $request->tipodoc);
	oci_bind_by_name($consulta,':v_pdocumento', $request->documento);
	oci_bind_by_name($consulta,':v_pid',$request->id);
	oci_bind_by_name($consulta,':v_pobservacion',$request->observacion);
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

function reporteFileUrl(){
    require('../sftp_cloud/UploadFile.php');
    global $request;
    $archivo = $request->base64;
    $path = 'MedicinaLaboral/SeguimientoAfiliado/' . date('dmY');
    $hoy = date('dmY_His');
    $name = $request->codigo .  '_' . $hoy . '.pdf';
    list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
    list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
    $base64 = base64_decode($archivo); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $subio = UploadFile($path, $name);
    echo $subio;
}

function P_EXPORTAR_INFORMACION_INCAPACIDAD_PROLONGADA()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_EXPORTAR_INFORMACION_INCAPACIDAD_PROLONGADA(:V_PFECHA_INICIO,:V_PFECHA_FIN,:v_pestado,:v_json_row); end;');
  oci_bind_by_name($consulta, ':V_PFECHA_INICIO', $request->fechainicio);
  oci_bind_by_name($consulta, ':V_PFECHA_FIN', $request->fechaFinal);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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

function P_EXPORTAR_CALIFICACION_ORIGEN()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_EXPORTAR_CALIFICACION_ORIGEN(:V_PFECHA_INICIO,:V_PFECHA_FIN,:v_pestado,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':V_PFECHA_INICIO', $request->fechainicio);
  oci_bind_by_name($consulta, ':V_PFECHA_FIN', $request->fechaFinal);
  oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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

function descargaFile()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile($request->ruta));
}

function P_DATOS_BASICOS_CALIFICACION_DE_ORIGEN(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_DATOS_BASICOS_CALIFICACION_DE_ORIGEN(:v_ptipo_documento,
																									 :v_pdocumento,
																									 :v_json_row); end;');
	oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
	oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
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

// function P_INSERTAR_SOPORTES_CALIFICACION_ORIGEN(){
// 	require_once('../config/dbcon_prod.php');
// 	global $request;
// 	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_INSERTAR_SOPORTES_CALIFICACION_ORIGEN(:v_tipo_doc,
// 																									  :v_numero_documento,
// 																									  :v_rutas,
// 																									  :v_pid,
// 																									  :v_res); end;');
// 	oci_bind_by_name($consulta,':v_tipo_doc',$request->tipo);
// 	oci_bind_by_name($consulta,':v_numero_documento',$request->documento);
// 	oci_bind_by_name($consulta,':v_rutas',$request->rutas);
// 	oci_bind_by_name($consulta,':v_pid',$request->id);
// 	$clob = oci_new_descriptor($c,OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
// 	oci_execute($consulta,OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	}else{
// 		echo 0;
// 	}
// 	oci_close($c);
// }

function P_CONSULTA_PRELIMINAR_CALIFICACION_DE_ORIGEN(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR_CALIFICACION_DE_ORIGEN(:v_json_row); end;');
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
//  RUTAS ----------------
function subirruta()
{
    require_once('../config/dbcon_prod.php');
    global $request;
    $rutas = json_decode($request->rutas);
    $ruta = json_encode($rutas); // Asegurarse de que es una cadena de texto
    $consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_INSERTAR_SOPORTES_CALIFICACION_ORIGEN(:v_tipo_doc,
																									   :v_numero_documento,
																									   :v_rutas,
																									   :v_cantidad,
																									   :v_observacion,
																									   :v_pid,
																									   :v_ptipo,
																									   :v_json_res); end;');
    oci_bind_by_name($consulta, ':v_tipo_doc', $request->tipodoc);
    oci_bind_by_name($consulta, ':v_numero_documento', $request->numerodoc);
    oci_bind_by_name($consulta, ':v_pid', $request->id);
    oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
    $jsonarchivos = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_rutas', $jsonarchivos, -1, OCI_B_CLOB);
    $jsonarchivos->writeTemporary($ruta); // Ahora $ruta es una cadena de texto
    oci_bind_by_name($consulta, ':v_cantidad', $request->cantidad);
    oci_bind_by_name($consulta, ':v_observacion', $request->observacion);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
}

function guardaradjuntosCapacidad()
{
  require_once('../config/dbcon_login.php');
  //  require_once('../config/ftpcon.php');
  //  include('subir_archivo.php');
  global $request;
  // variables de parametros
  $archivos = json_decode($request->data);
  //
  $hoy = date('dmY');
  $hora = date('h_i_s');
  $path = 'MedicinaLaboral/Seguimiento_Afiliado/' . $hoy;
  $subiofile = 0;
  $rutas = [];
  require('../sftp_cloud/UploadFile.php');
  for ($i = 0; $i < count($archivos); $i++) {
    $tipodoc = $archivos[$i]->tipodoc;
    $numdoc = $archivos[$i]->numero;
    $name = $archivos[$i]->tipodoc . '_' . $archivos[$i]->numero . '_' . $archivos[$i]->codigo . '_' . $hora . '.' . $archivos[$i]->ext;
    list(, $archivos[$i]->achivobase) = explode(';', $archivos[$i]->achivobase); // Proceso para traer el Base64
    list(, $archivos[$i]->achivobase) = explode(',', $archivos[$i]->achivobase); // Proceso para traer el Base64
    $base64 = base64_decode($archivos[$i]->achivobase); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
    $subio = UploadFile($path, $name);
    // $subio = UploadFile($path, $name);
    if (substr($subio, 0, 11) == '/cargue_ftp') {
      array_push($rutas, (object)[
        'ruta' => $subio,
        'codigo' => $archivos[$i]->codigo
      ]);
      $subiofile = $subiofile + 1;
    }
  }

  if ($subiofile == count($archivos)) {
    subirruta($tipodoc, $numdoc, json_encode($rutas), count($archivos), "Archivo cargado desde Genesis");
  } else {
    echo json_decode('{"mensaje":"Error subiendo los archivos","codigo":1}');
  }
}

	function cargarAdjuntos() {
		global $request;
		$soporte = json_decode($request->soporte_File);
		$estado = 0;
		$response = [];
	
		foreach ($soporte as $archivo) {
			if (isset($archivo->base64) && !empty($archivo->base64)) {
				$path = 'MedicinaLaboral/SeguimientoAfiliado/adjuntos_list';
				$nombreArchivo = basename($archivo->codigo . date('dmY_His') . '.pdf'); // Obtener el nombre de archivo existente
	
				// Verificar si el string contiene el delimitador ';' antes de explotar
				if (strpos($archivo->base64, ';') !== false) {
					list(, $archivo->base64) = explode(';', $archivo->base64);
				} else {
					$estado++;
					continue; // Saltar a la siguiente iteración del bucle
				}
	
				// Verificar si el string contiene el delimitador ',' antes de explotar
				if (strpos($archivo->base64, ',') !== false) {
					list(, $archivo->base64) = explode(',', $archivo->base64);
				} else {
					$estado++;
					continue; // Saltar a la siguiente iteración del bucle
				}
	
				$base64 = base64_decode($archivo->base64);
				file_put_contents('../../temp/' . $nombreArchivo, $base64);
	
				include_once('../sftp_cloud/UploadFile.php');
				$subio = UploadFile($path, $nombreArchivo);
	
				if (substr($subio, 0, 11) === '/cargue_ftp') {
					$response[] = $subio;
				} else {
					$response[] = ""; // Añadir un valor vacío si no se pudo subir
					$estado++;
				}
			} else {
				// Verificar si la propiedad 'ruta' existe antes de acceder a ella
				if (isset($archivo->ruta)) {
					$response[] = $archivo->ruta;
				} else {
					$response[] = ""; // Añadir un valor vacío si la propiedad 'ruta' no existe
				}
			}
		}
	
		echo json_encode($response);
	}

	function P_DATOS_BASICOS_AFILIADO_PERDIDA_CAPACIDAD_LABORAL(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_DATOS_BASICOS_AFILIADO_PERDIDA_CAPACIDAD_LABORAL(:v_ptipo_documento,
																													:v_pdocumento,
																													:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
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

	function P_REGISTRO_CALIFICACION_ORIGEN(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_REGISTRO_CALIFICACION_ORIGEN(
																	:v_ptipo,
																	:v_ptipo_documento,
																	:v_pdocumento, 
																	:v_pid,
																	:v_pactualiza,
																	:v_json_in,
																	:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
		oci_bind_by_name($consulta,':v_pid',$request->id);
		oci_bind_by_name($consulta,':v_pactualiza',$request->actualiza);
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
		oci_bind_by_name($consulta,':v_json_in',$request->jsonDatos);
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

	function P_REGISTRAR_PERDIDAD_CAPACIDAD_LABORAL(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_REGISTRAR_PERDIDAD_CAPACIDAD_LABORAL(:v_ptipo,
																										:v_ptipo_documento,
																										:v_pdocumento, 
																										:v_pid,
																										:v_pactualiza,
																										:v_json_in,
																										:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
		oci_bind_by_name($consulta,':v_pid',$request->id);
		oci_bind_by_name($consulta,':v_pactualiza',$request->actualiza);
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipodoc);
		oci_bind_by_name($consulta,':v_json_in',$request->jsonDatos);
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
	
	function P_OBTENER_ULTIMO_EMPLEADOS(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_OBTENER_ULTIMO_EMPLEADOS(:v_ptipo_documento,
																							:v_pdocumento,
																							:v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo);
		oci_bind_by_name($consulta,':v_pdocumento',$request->cedula);
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

?>
