<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_LISTA_OBS_PROYECTO()
{
	// este sp se recibe un cursor
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_lista_obs_proyecto(:v_pcodigo,:v_response);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcodigo', $request->vpcodigo);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}

function P_UI_BITACORA_PROYECTOS()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_ui_bitacora_proyectos(:v_pcodigo, :v_pobservacion, :v_paccion, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcodigo', $request->vpcodigo);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_OBTENER_ROL()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_obtener_rol(:v_pdocumento, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_LISTA_AREA()
{
	require_once('../../php/config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.P_LISTA_AREA(:v_pjson_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_LISTA_RESPONSABLES()
{
	require_once('../../php/config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_lista_responsables(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_LISTA_FUN_RESPONSABLE()
{
	require_once('../../php/config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_lista_fun_responsable(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_UI_PROYECTOS_TIC()
{
	require_once('../../php/config/dbcon.php');
	global $request;
	// Decodificar el JSON recibido
	$soportes = json_decode($request->vpsoportes);
	$prueba = [];
	// Verificar si hay soportes para procesar
	if (count($soportes) > 0) {
		for ($i = 0; $i < $request->vpcantsoportes; $i++) {
			// Generar la fecha y hora actual
			$hoy = date('dmY');
			$hora = date('h_i_s');
			$path = 'Matrizdeseguimiento/Soportes' . $hoy;
			$name = $hoy . $hora . "_$i.pdf"; // Agregar el índice para diferenciar los archivos
			// Validar que el soporte tiene una RUTA válida
			if (isset($soportes[$i]->RUTA)) {
				// Decodificar la ruta base64
				list(, $soportes[$i]->RUTA) = explode(';', $soportes[$i]->RUTA);
				list(, $soportes[$i]->RUTA) = explode(',', $soportes[$i]->RUTA);
				$base64 = base64_decode($soportes[$i]->RUTA);
				// Guardar el archivo temporalmente
				$tempPath = '../../temp/' . $name;
				if (file_put_contents($tempPath, $base64) !== false) {
					// Subir el archivo al servidor FTP
					include_once('../sftp_cloud/UploadFile.php');
					$ruta = $path;
					$subio = UploadFile($ruta, $name);
					// Verificar si la subida fue exitosa
					if (substr($subio, 0, 11) == '/cargue_ftp') {
						$object = (object) [
							'RUTA' => $subio,
							'CODIGO' => $soportes[$i]->CODIGO,
						];
						$prueba[] = $object;
					} else {
						// Manejar error de subida
						error_log("Error al subir el archivo: $name");
					}
					// Eliminar el archivo temporal
					unlink($tempPath);
				} else {
					// Manejar error de escritura de archivo
					error_log("Error al guardar el archivo temporal: $name");
				}
			} else {
				// Manejar caso de ruta no válida
				error_log("No se encontró la RUTA en el soporte $i");
			}
		}
		// Asignar rutas inicial y final
		if (count($prueba) > 0) {
			$soporteinicial = $prueba[0]->RUTA;
		}
		if (count($prueba) > 1) {
			$soportecierre = $prueba[1]->RUTA;
		}
	} else {
		error_log("No hay soportes para procesar.");
	}
	// $nombreRandom = UUID();
	// 	$soportecierre = $prueba[1]->RUTA;
	// echo json_encode(["archivo1" => $soporteinicial, "archivo2" => isset($soportecierre) != null ? $soportecierre : "SIN SOPORTE"]);
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_ui_proyectos_tic(:v_parea,:v_pmodulo,:v_pinicial,:v_pfinal,:v_pbd,:v_pfront,:v_pdocumentacion,
	:v_padjunto,:v_pdescripcion,:v_pobservacion,:v_paccion,:v_psolicitud,:v_padjunto_cierre,:v_pcodigo,:v_psolicitante,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parea', $request->vparea);
	oci_bind_by_name($consulta, ':v_pmodulo', $request->vpmodulo);
	oci_bind_by_name($consulta, ':v_pinicial', $request->vpinicial);
	oci_bind_by_name($consulta, ':v_pfinal', $request->vpfinal);
	oci_bind_by_name($consulta, ':v_pbd', $request->vpbd);
	oci_bind_by_name($consulta, ':v_pfront', $request->vpfront);
	oci_bind_by_name($consulta, ':v_pdocumentacion', $request->vpdocumentacion);
	oci_bind_by_name($consulta, ':v_padjunto', $soporteinicial);
	oci_bind_by_name($consulta, ':v_pdescripcion', $request->vpdescripcion);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
	oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
	oci_bind_by_name($consulta, ':v_psolicitud', $request->vpsolicitud);
	oci_bind_by_name($consulta, ':v_padjunto_cierre', $soportecierre);
	oci_bind_by_name($consulta, ':v_pcodigo', $request->vpcodigo);
	oci_bind_by_name($consulta, ':v_psolicitante', $request->vpsolicitante);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 'no hay informacion';
	}
	oci_close($c);
}
function P_REPORTE_PROYECTO()
{
	// este sp se recibe un cursor
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_reporte_proyecto(:v_pestado,:v_response);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function P_LISTA_PROYECTO()
{
	// este sp se recibe un cursor
	require_once('../../php/config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_tic.p_lista_proyecto(:v_pcodigo,:v_response);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pcodigo', $request->vpcodigo);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function DESCARGARFILE()
{
	global $request;
	$fileexists = false;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../config/ftpcon.php');
		$fileexists = true;
	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con.php');
		$fileexists = true;
	}
	if ($fileexists) {
		$file_size = ftp_size($con_id, $request->ruta);
		if ($file_size != -1) {
			$ruta = $request->ruta;
			$name = explode("/", $ruta)[count(explode("/", $ruta)) - 1]; //Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
			$ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
			$name = $name . '.' . $ext;
			$local_file = '../../../temp/' . $name;
			$handle = fopen($local_file, 'w');
			if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
				echo $name;
			} else {
				echo "0 - Error Al descargar el archivo";
			}
			ftp_close($con_id);
			fclose($handle);
		} else {
			echo "0 - Error Archivo no existe";
		}
	} else {
		require('../sftp_cloud/DownloadFile.php');
		echo (DownloadFile($request->ruta));
		// echo( DownloadFile($request->ruta) );
	}
}
