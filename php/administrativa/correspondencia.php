<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function p_obtener_operadores_correspondencia()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_OPERADORES_CORRESPONDENCIA(:v_json_row); end;');
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

function actualizarSoporteCorrep()
{
	global $request;
	// $ext =  $request->ext;
	$path = substr($request->ruta,35,12);
	$archivos =  $request->B64;
	$name = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];

	list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
	list(, $archivos) = explode(',', $archivos); // Proceso para traer el Base64
	$base64 = base64_decode($archivos); // Proceso para traer el Base64
	file_put_contents('../../temp/' . $name, $base64);
	require('../sftp_cloud/UploadFile.php');

	$subio = UploadFile($path, $name);
	//echo substr($path,36,strlen($path)-1);
	
	if ($subio[0] != '0') {
	echo $subio;
	} else {
	echo '0';
	}
}

function p_cambiar_estado_devolucion(){ 
	require_once('../config/dbcon_prod.php');	
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_CAMBIAR_ESTADO_DEVOLUCION(:v_pconsecutivo,:v_pmotivo,:v_pobservaciones,:v_responsable,:v_res); end;');
	oci_bind_by_name($consulta,':v_pconsecutivo',$request->consecutivo);	
	oci_bind_by_name($consulta,':v_pmotivo',$request->motivo);			
	oci_bind_by_name($consulta,':v_pobservaciones',$request->observaciones);						
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
	  $json = $clob->read($clob->size());
	  echo $json;
	}else{
	  echo 0;
	}
	oci_close($c);
}

function P_OBTENER_AREAS_UBI_RESP_CORRESP(){ 
	require_once('../config/dbcon_prod.php');	
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_AREAS_UBI_RESP_CORRESP(:v_ubicacion ,:v_area, :v_result); end;');
	oci_bind_by_name($consulta,':v_ubicacion',$request->ubicacion);	
	oci_bind_by_name($consulta,':v_area',$request->area);			
    $cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}

function p_actualiza_correspondencia() {
	require_once('../config/dbcon_prod.php');	
	// require_once('../../upload_file/subir_archivo.php');
	
	global $request;		
	$json_data = json_decode($request->correspondencia);		
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_CORRESPONDENCIA(:v_pjson_row_in,:v_pcantidad,:v_json_row); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($request->correspondencia);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());	
	$json_bd_response = json_decode($bd_response);			    
	
	if ($json_bd_response->Codigo == 1) {
		echo $bd_response;
	}else{					
		if ($json_bd_response->v_pqrfile) {
			$file = $json_data->pqrFile;
			$ext = $json_data->ext;
			$subirpqr = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoPQR,$ext);
			if ($subirpqr != 0) {
			// 	echo $bd_response;
			}
			
		}
		if ($json_bd_response->v_gradfile) {
			$file = $json_data->gradfile;
			$ext = $json_data->gradext;
			$subirgrad = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuiaRad,$ext);
			if ($subirgrad != 0) {
			// 	echo $bd_response;
			}
			
		}
		if ($json_bd_response->v_ggesfile) {
			$file = $json_data->ggesfile;
			$ext = $json_data->ggesext;
			$subirges = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuiaGes,$ext);
			if ($subirges != 0) {
			// 	echo $bd_response;
			}
			//echo $bd_response;
		}					
		echo $bd_response;
	}
	oci_close($c);
}



function p_obtener_ipq_correspondencia(){
	require_once('../config/dbcon.php');
	global $request;		
	$consulta  = oci_parse($c,'BEGIN PQ_GENESIS_PQR.P_OBTENER_IPQ_CORRESPONDENCIA(:v_len,
																		:v_pjson_row_in,
																		:v_responsable,
																		:v_json_row); end;');
	oci_bind_by_name($consulta,':v_len',$request->cantidad);	
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($request->correspondencias);
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
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



function p_actualizar_ruta_pq() {
	require_once('../config/dbcon_prod.php');
	// require('../upload_file/subir_archivo.php');

	global $request;	
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTULIZAR_RUTA_PQ(:v_codigo,:v_extension,:v_responsable,:v_ftp,:v_res); end;');
	oci_bind_by_name($consulta,':v_codigo',$request->codigo);	
	oci_bind_by_name($consulta,':v_extension',  $request->extension);
	oci_bind_by_name($consulta,':v_responsable',$request->responsable);
	oci_bind_by_name($consulta,':v_ftp',$request->ftp);	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->codigo == 1) {
		echo $bd_response;
	}else{	
			if ($request->extension) {
				$file = $request->file;
				$ext = $request->extension;			
				$subir = subirFTP3($file,$json_bd_response->ftp,$json_bd_response->archivo,$ext);
			}else{
			 echo 'Extension vacia';
			}
			if ($subir != 0) {
				echo $bd_response;
			}
			echo $bd_response;	
			
	}
	oci_close($c);

	}

	function subirFTP3($file,$path,$name,$ext){	
		// $archivo = $datos->zdocumentopermiso;
		  //$path = 'Siau/Pqr';
		  $day = date("dmY");
		  $hora = date("His");
		 // $ext= 'pdf';
		  //$nombre= $name.'_'.$day.'_'.$hora.'.'.$ext;
		  //echo $ext;
		  $nombre= $name.'.'.$ext;
		 // $file= $archivo;
		  list(, $file) = explode(';', $file);
		  list(, $file) = explode(',', $file);
		  $base64 = base64_decode($file);
		  file_put_contents('../../temp/'.$nombre, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
		  //$ruta = $path.'/'.$day;
			$ruta = $path;
			//echo $ruta;
			//echo $nombre;
			require('../sftp_cloud/UploadFile.php');
			$ruta = substr($ruta,35,strlen($ruta)-1);
			//echo $ruta;

		  $subio = UploadFile($ruta, $nombre);
		  if(substr($subio, 0,11) == '/cargue_ftp'){
			   //echo $subio;
		  } else{
			  echo json_encode((object) [
				  'codigo' => -1,
				  'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
			  ]);
		  }
	}
	

function p_obtener_func_areas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_FUNCIONARIOS (:v_parea,:v_pubicacion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_parea', $request->area);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->seccional);
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

function p_validar_documento_radicar()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_VALIDAR_DOCUMENTO_RADICAR(:v_premitente,:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_premitente', $request->remitente);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_documento_rad);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->documento_rad);
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

function P_OBTENER_PERMISO_CORRESPONDENCIA()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PERMISO_CORRESPONDENCIA(:v_presponsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->cedula);
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

function p_obtener_rol_correspondencia()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_ROL_CORRESPONDENCIA(:v_presponsble,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsble', $request->responsable);
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

function obtenerCorrespondencia()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CORRESPONDENCIA(:v_presponsable,:v_p_tipocorrepondencia,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $request->responsable);
	oci_bind_by_name($consulta, ':v_p_tipocorrepondencia', $request->tipo_corresp);
	//oci_bind_by_name($consulta, ':v_tipo',$request->rol);
	oci_bind_by_name($consulta, ':v_pestado', $request->estado);
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


function p_obtener_areas()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_AREAS (:v_json_row); end;');
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

function p_obtener_documentos_radicar()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_DOCUMENTOS_RADICAR(:v_json_row); end;');
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

function obtenerMediosRecepcionTipo()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_MEDIOS_TIPO(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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

function obtenerTipoRadicacion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_TIPO_RADICACION(:v_ptipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
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

function p_obtener_funcionario_eps()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_FUNCIONARIO_EPS(:v_pnit,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->nit);
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

function p_obtener_ciudades()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_CIUDADES(:v_json_row); end;');
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

function p_obtener_tercero()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.p_obtener_tercero(:v_pcoincidencia,:v_ptiporad,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pcoincidencia', $request->coincidencia);
	oci_bind_by_name($consulta, ':v_ptiporad', $request->tipo);
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

function p_inserta_operador_corresp() {
	require_once('../config/dbcon_prod.php');	
	global $request;				
	$consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PQR.P_INSERTA_OPERADOR_CORRESP(:v_pjson_row_in,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($request->operador);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());	
			echo $bd_response;
	
	oci_close($c);
}

function p_inserta_tercero_pqr() {
    require_once('../config/dbcon_prod.php');	
    global $request;				
    $consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PQR.P_INSERTA_TERCERO_PQR(:v_pjson_row_in,:v_pjson_row_out); end;');
    $jsonin = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
    $jsonin->writeTemporary($request->tercero);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
    $bd_response = $clob->read($clob->size());	
            echo $bd_response;
    
    oci_close($c);
}

function insertarDatosPqr() {
	require_once('../config/dbcon_prod.php');
	// require_once('../../upload_file/subir_archivo.php');
	global $request;
	$jsonpqr = '['.$request->pqr.']';
	$json_data = json_decode($request->pqr);
	$type = $request->action;	
	$numero = $request->numero;
	$pqrFile = $request->pqrFile;
	$fileguia = $request->gcorrespFile;

	$consulta = oci_parse($c, 'BEGIN oasis.PQ_GENESIS_PQR.P_UI_PQR(:v_pjson_row_in,:v_pnumero,:v_paccion,:v_pjson_row_out); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($jsonpqr);
	oci_bind_by_name($consulta,':v_pnumero',$numero);	
	oci_bind_by_name($consulta,':v_paccion',$type);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());
	$json_bd_response = json_decode($bd_response);
	if ($json_bd_response->Codigo == 0) {
		echo $bd_response;
	}else{
		// if ($json_bd_response->RequireFile == 1) {
			// $file = $pqrFile;
			// $ext = $json_data->ext;
			// $subir = subirFTP3($file,$json_bd_response->Ruta,$json_bd_response->NombreArchivo,$ext);
			$ext= $json_data->ext;
			$dia = date("dmY");
			// $day = date("dmY_His");
		$name= $json_bd_response->NombreArchivo.'.'.$ext;
		$file=$request->pqrFile;
		if(isset($file)){
			list(, $file) = explode(';', $file);
			list(, $file) = explode(',', $file);
			$base64 = base64_decode($file);
			file_put_contents('../../temp/'.$name, $base64); 
		
			$ruta = 'PQR/'.$dia;
			require('../sftp_cloud/UploadFile.php');
			$subio = UploadFile($ruta, $name);
			if(substr($subio, 0,11) == '/cargue_ftp'){
				// echo $subio;
				echo $bd_response;
			} else{
				echo json_encode((object) [
					'codigo' => -1,
					'mensaje' => 'No se recibio el archivo, intente subirlo nuevamente.'
				]);
			}
		}else{
			echo $bd_response;
		}
		
		// 	if ($subir != 0 && $json_bd_response->Rutaguia==null) {
		// 		echo $bd_response;
		// 	}
		// 	if ($json_bd_response->Rutaguia) {
		// 		$fileg = $fileguia;
		// 		$gext = $json_data->gext;
		// 		$subirad = subirFTP3($fileg,$json_bd_response->Ruta,$json_bd_response->NombreArhivoGuia,$gext);
		// 		if ($subirad != 0) {
		// 			echo $bd_response;
		// 		}
		// 		//echo $bd_response;
		// 	}
		// 	echo $bd_response;

		// }else{
		// 	echo $bd_response;
		// }
	}
	oci_close($c);
} 

function p_actualiza_courier() {
	require_once('../config/dbcon_prod.php');	
	global $request;				
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_ACTUALIZA_COURIER(:v_pjson_row_in,:v_pcantidad,:v_json_row); end;');
	$jsonin = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);	
	$jsonin->writeTemporary($request->couriers);
	oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);	
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	$bd_response = $clob->read($clob->size());	
			echo $bd_response;
	
	oci_close($c);
}

function p_obtener_areas_NUEVO()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_OBTENER_AREAS(:v_estado, :v_result); end;');
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}

function P_OBTENER_REGIONALES_CORRESP()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_REGIONALES_CORRESP(:v_pubicacion,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}

function P_OBTENER_AREAS_RESP_CORRESP()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_AREAS_RESP_CORRESP(:v_pubicacion,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
}

function p_obtener_detalle_correspondencia()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_DETALLE_CORRESPONDENCIA(:v_pnumero,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
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

function p_mostrar_traza()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin PQ_GENESIS_PQR.P_MOSTRAR_TRAZA (:v_ppqr, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ppqr', $request->pqr);
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

function obtenerPQRaseguramiento()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_INFO_PQR_ASE(:v_pqr,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pqr', $request->pqr);
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

function obtenerSeccionales()
{
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQR_SECCIONALES(:v_json_row); end;');
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

function obtenermotivosacciones()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.PQR_MOTIVOS_ACCIONES(:v_pmotivo,
																			:v_pmodulo,
																			:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pmotivo', $request->motivo);
	oci_bind_by_name($consulta, ':v_pmodulo', $request->modulo);
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

function p_obtener_pq_pqr()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_OBTENER_PQ_PQR(:v_correspondencia,:v_estado,:v_responsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_correspondencia', $request->corrrespondencia);
	oci_bind_by_name($consulta, ':v_estado', $request->estado);
	oci_bind_by_name($consulta, ':v_responsable', $request->responsable);
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

function descargaAdjunto(){
	global $request;
	$fileexists = false;
	if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
		require_once('../config/ftpcon.php');
		$fileexists = true;
	}
	if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
	// if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con.php');
		$fileexists = true;
	}
	if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $request->ruta) == TRUE) {
		require_once('../config/sftp_con_2.php');
	$fileexists = true;
	}
	
	if($fileexists) {
		$file_size = ftp_size($con_id, $request->ruta);
		if ($file_size != -1) {
			// $ruta = $request->ruta;
			$name = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
			// $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
			// $name = $name . '.' . $ext;
			$local_file = '../../temp/' . $name;
			// print_r($local_file);
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
		echo( DownloadFile($request->ruta) );
	}
}


function P_REPORTE_CORRESPONDENCIA()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_REPORTE_CORRESPONDENCIA(:v_pinicial,:v_pfinal,:v_result); end;');
	oci_bind_by_name($consulta, ':v_pinicial', $request->inicio);
	oci_bind_by_name($consulta, ':v_pfinal', $request->fin);
	$cursor = oci_new_cursor($c);
		oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
}

function P_DESCARGA_PAQUETES_PQR()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta  = oci_parse($c, 'BEGIN PQ_GENESIS_PQR.P_DESCARGA_PAQUETES_PQR(:v_tipo_correspondencia,:v_estado,:v_fechainicio,:v_fechafin,:,:v_result); end;');
	oci_bind_by_name($consulta, ':v_tipo_correspondencia', $request->tipo);
	oci_bind_by_name($consulta, ':v_estado', $request->estado);
	oci_bind_by_name($consulta, ':v_fechainicio', $request->inicio);
	oci_bind_by_name($consulta, ':v_fechafin', $request->fin);
	$cursor = oci_new_cursor($c);
		oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
		oci_execute($consulta);
		oci_execute($cursor, OCI_DEFAULT);
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
		oci_free_statement($consulta);
		oci_free_statement($cursor);
		echo json_encode($datos);
}


?>