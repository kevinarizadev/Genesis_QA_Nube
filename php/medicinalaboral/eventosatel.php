<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_CONSULTAR_USUARIOS(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTAR_USUARIOS(:v_pcoincidencia,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcoincidencia',$request->buscarusuario);
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

function SeleccionarUsuarios(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.p_ui_funcs(:v_pcedula,:v_paccion,:v_pestado,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcedula',$request->cedula);
	oci_bind_by_name($consulta,':v_paccion',$request->accion);
	oci_bind_by_name($consulta,':v_pestado',$request->estado);
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

function visualizarUsuariosPermisos(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.p_listar_funcs_prueba(:v_json_row); end;');
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

function p_ver_permisos_funcs(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.p_ver_permisos_funcs(:v_pcedula,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_pcedula',$request->cedula);
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


function obtenerDatosAtel(){
  require_once('../config/dbcon_prod.php');
		global $request;
		$TipoDoc = $request->TipoDoc;
		$Numero = $request->Numero;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_DATOS_BASICOS_AFILIADO(:v_ptipo_documento,:v_pdocumento,: v_json_row); end;');
		oci_bind_by_name($consulta,':v_ptipo_documento',$TipoDoc);
		oci_bind_by_name($consulta,':v_pdocumento',$Numero);
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

function obtenerDiagnosticos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$sexo = $request->sexo;
		$edad = $request->edad;
		$codigo = $request->codigo;
		$consulta = oci_parse($c,'begin oasis.PQ_MEDICINA_LABORAL.P_DIAGNOSTICOS(:v_pcie10,:v_psexo,:v_pedad,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_psexo', $request->sexo);
		oci_bind_by_name($consulta,':v_pedad', $request->edad);
		oci_bind_by_name($consulta,':v_pcie10', $request->codigo);
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

function cargarRegistroAtel(){
			require('../sftp_cloud/UploadFile.php');
		global $request;
		$archivo = $request->base64;
		$path = 'MedicinaLaboral/EventosAtel/' . date('dmY');
		$hoy = date('dmY_His');
		$name = $request->codigoAtel .  '_' . $hoy . '.pdf';
		list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
		list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
		$base64 = base64_decode($archivo); // Proceso para traer el Base64
		file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
		$subio = UploadFile($path, $name);
		echo $subio;
}


function p_cargarEventoAtel()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_REGISTRO_EVENTO_ATEL(:v_json_in,:v_paccion,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_json_in', $request->data);
 	oci_bind_by_name($consulta, ':v_paccion', $request->evento);
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

function P_CONSULTA_PRELIMINAR()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_PRELIMINAR(:v_json_row); end;');
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


function cargar_registrosATEL()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.P_CONSULTA_REGISTROS_MEDICINA_LABORAL(:v_pfecha_inicio,:v_pfecha_fin,:v_ptipoevento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->fechaIniciofiltro);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $request->fechaFinalfiltro);
	oci_bind_by_name($consulta, ':v_ptipoevento', $request->vptipoevento);
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

function exportar_datos()
{
  global $request;
  require_once('../config/dbcon_prod.php');
  $consulta = oci_parse($c, 'begin oasis.PQ_MEDICINA_LABORAL.p_exportar_informacion(:v_pfecha_inicio,:v_pfecha_fin,:v_tipoevento,:v_cur_conver); end;');
  oci_bind_by_name($consulta, ':v_pfecha_inicio', $request->fechainicioE);
  oci_bind_by_name($consulta, ':v_pfecha_fin', $request->fechaFinalE);
  oci_bind_by_name($consulta, ':v_tipoevento', $request->tipoeventoE);
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


?>