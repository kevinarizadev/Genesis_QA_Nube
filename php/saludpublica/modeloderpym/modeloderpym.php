<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();	
function P_U_GESTION_NT()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_u_gestion_nt(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_pcantidad_registros,:v_json_nt,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
	oci_bind_by_name($consulta, ':v_pcantidad_registros', $request->vpcantidadregistros);
	oci_bind_by_name($consulta, ':v_json_nt', $request->vjsonnt);
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
function P_OBTENER_NT()
{
	// este sp se recibe un cursor
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_NT(:v_pdocumento,:v_pnumero,:v_pubicacion,:v_response); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
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
function P_OBTENER_CONTRATO_NT()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_contrato_NT(:v_pnit,:v_pregimen,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregimen', $request->vpregimen);
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
function P_OBTENER_PRESTADOR()
{
	// este sp se recibe un cursor
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_prestador(:v_pprestador,:v_response); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pprestador', $request->vpprestador);
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
function P_LISTA_PRESTADOR()
{
	// este sp se recibe un cursor
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_lista_prestador(:v_pubicacion,:v_response); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pubicacion', $request->vpubicacion);
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
function lista_de_contrato_Rpym()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_contrato(:v_pnit,:v_pregimen,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregimen', $request->vpregimen);
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

function lista_de_anno_Rpym()
{
	require_once('../../config/dbcon.php');
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_anno(:v_json_row);end;');
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
function P_OBTENER_MES()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_mes(:v_panno,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_panno', $request->vpanno);
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
function Cargar_Listado_promocion()
{
	require_once('../config/dbcon_prod.php');
	$array = array();
	global $request;
	$datos = $request->archivo;
	$name = uniqid();
	$base_to_php = explode(',', $datos);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../temp/" . $name . ".csv";
	file_put_contents($filepath, $data);
	$ruta = "../../temp/" . $name . ".csv";
	$txt_file = fopen($ruta, 'r');
	$a = 1;
	while ($line = fgets($txt_file)) {
		array_push($array, $line);
		$a++;
	}
	fclose($txt_file);
	unset($array[0]);
	$prueba = [];
	foreach ($array as $fila_v) {
		$columnas = explode("|", $fila_v);
		$datos2 = explode("\r\n", $columnas[4]);
		// $fecha_proceso = stripslashes();
		$object = (object) [
			'tipo_documento' => $columnas[0],
			'documento' => $columnas[1],
			'responsable' => $columnas[2],
			'fecha_proceso' => $columnas[3],
			'codigo_sat' => $datos2[0]
			// 'responsable_cargue'=> $request->responsable,
		];
		$prueba[] = $object;
	};

	$datos_entrada = json_encode($prueba);
	$datos_entrada1 = stripslashes($datos_entrada);
	$consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.P_cargue_archivo_afil(:json_ingreso,:json_resp,:v_pjson_existe); end;');
	oci_bind_by_name($consulta, ':json_ingreso', $datos_entrada1);
	oci_bind_by_name($consulta, ':json_resp', $salidarespuesta, 4000);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_existe', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		if ($json != '') {
			$arrResponse = array('codigo' => 0, 'datos' => $json, 'respuesta' => $salidarespuesta);
			echo json_encode($arrResponse);
		} else {
			$arrResponse = array('codigo' => 1, 'respuesta' => $salidarespuesta);
			echo json_encode($arrResponse);
		}
	} else {
		echo 0;
	}
	oci_close($c);
}
function lista_p_ui_actividades()
{
	require_once('../../config/dbcon.php');
	$array = array();
	global $request;
	$datos = $request->archivo;
	$name = uniqid();
	$base_to_php = explode(',', $datos);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".txt";
	file_put_contents($filepath, $data);
	$ruta = "../../../temp/" . $name . ".txt";
	$txt_file = fopen($ruta, 'r');
	$a = 1;
	while ($line = fgets($txt_file)) {
		array_push($array, $line);
		$a++;
	}
	fclose($txt_file);
	unset($array[0]);
	$prueba = [];
	// $cantidad = 0;
	foreach ($array as $fila_v) {
		$columnas = explode("|", $fila_v);
		$datos2 = explode("\r\n", $columnas[8]);
		// $fecha_proceso = stripslashes();
		$object = (object) [
			'vposicion1' => $columnas[0],
			'vposicion2' => $columnas[1],
			'vposicion3' => $columnas[2],
			'vposicion4' => $columnas[3],
			'vposicion5' => $columnas[4],
			'vposicion6' => $columnas[5],
			'vposicion7' => $columnas[6],
			'vposicion8' => $columnas[7],
			'vposicion9' => $datos2[0]
			// 'responsable_cargue'=> $request->responsable,
		];
		$prueba[] = $object;
		// $cantidad += 1;
	};
	$datos_entrada = json_encode($prueba);
	$datos_entrada1 = stripslashes($datos_entrada);
	// echo $cantidad;
	$responsoble = '1';
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_ui_actividades(:v_presponsable,:v_pjson_detalle,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_presponsable', $responsoble);
	// oci_bind_by_name($consulta,':v_pcantidad_json',$cantidad);
	oci_bind_by_name($consulta, ':v_pjson_detalle', $datos_entrada1);
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
// function lista_p_ui_actividades()
// {
// 	require_once('../../config/dbcon.php');
// 	global $request;
// 	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_ui_actividades(:v_presponsable,:v_pcantidad_json,:v_pjson_detalle);end;');
// 	$clob = oci_new_descriptor($c, OCI_D_LOB);
// 	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
// 	oci_execute($consulta, OCI_DEFAULT);
// 	if (isset($clob)) {
// 		$json = $clob->read($clob->size());
// 		echo $json;
// 	} else {
// 		echo 0;
// 	}
// 	oci_close($c);
// }
function lista_de_actividadesRpym()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.P_OBTENER_ACTIVIDADES(:v_json_row);end;');
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
function P_OBTENER_RESUMEN_DETALLE()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_resumen_detalle(:v_pnit,:v_pregimen,:v_panno,:v_pmes,:v_pcontrato,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_pregimen', $request->vpvpregimen);
	oci_bind_by_name($consulta, ':v_panno', $request->vpanno);
	oci_bind_by_name($consulta, ':v_pmes', $request->vpmes);
	oci_bind_by_name($consulta, ':v_pcontrato', $request->vpcontrato);
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
//Funcion con cursor y $json
function lista_de_programacionRpym()
{
	require_once('../../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.P_OBTENER_PROGRAMACION(:v_pnit,:v_panno,:v_pregimen,:v_result,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
	oci_bind_by_name($consulta, ':v_panno', $request->vpanno);
	oci_bind_by_name($consulta, ':v_pregimen', $request->vpregimen);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	// if (!isset($json)) {
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	$informacion = [
		"varCursor" => $datos,
		"varJson" => $json,
	];
	echo json_encode($informacion);
	// PRINT_R($informacion);
	// } else {
	// echo json_encode($json);
	// }
}
//Funcion con cursor y $json
function P_OBTENER_RESUMEN_TOTAL()
{
	require_once('../../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_resumen_total(:v_panno,:v_pmes,:v_result,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_panno', $request->vpanno);
	oci_bind_by_name($consulta, ':v_pmes', $request->vpmes);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	// if (!isset($json)) {
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	$informacion = [
		"varCursor" => $datos,
		"varJson" => $json,
	];
	echo json_encode($informacion);
	// PRINT_R($informacion);
	// } else {
	// echo json_encode($json);
	// }
}
function LISTAR_TABLA_CONSOLIDADO()
{
	require_once('../../config/dbcon.php');
	global $request;
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_consolidado(:v_panno,:v_pmes,:v_result,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_panno', $request->vpanno);
	oci_bind_by_name($consulta, ':v_pmes', $request->vpmes);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
	oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	$informacion = [
		"varCursor" => $datos,
		"varJson" => $json,
	];
	echo json_encode($informacion);
	// PRINT_R($informacion);
	// } else {
	// echo json_encode($json);
	// }
}
function P_I_PROCESO_NT()
{
	global $request;
	$array = array();
	$datos = $request->datos;
	// echo json_encode($datos->archivo);
	$name = uniqid();
	$base_to_php = explode(',', $datos->archivo);
	$data = base64_decode($base_to_php[1]);
	$filepath = "../../../temp/" . $name . ".txt";
	file_put_contents($filepath, $data);
	$ruta = "../../../temp/" . $name . ".txt";
	$txt_file = fopen($ruta, 'r');
	$a = 1;
	while ($line = fgets($txt_file)) {
		array_push($array, $line);
		$a++;
	}
	fclose($txt_file);
	$prueba = [];
	foreach ($array as $fila_v) {
	$columnas = explode(";", $fila_v);
	if(count($columnas) != 31){
			$informacion = [
				"Codigo" => 1,
				"Nombre" => 'El archivo cargado no cumple con la estructura',
			];
			echo json_encode($informacion);
		exit;
	}
	$informacion = explode("\r\n", $columnas[30]);
	$object = (object) [
						'DEPARTAMENTO' => $columnas[0],
						'MUNICIPIO' => $columnas[1],
						'NIT' => $columnas[2],
						'DOCUMENTO' => $columnas[3],
						'NUMERO' => $columnas[4],
						'PROGRAMA' => $columnas[5],
						'COD_ACTIVIDAD' => $columnas[6],
						'RECIEN_NACIDO' => $columnas[7],
						'DOS_MESES' => $columnas[8],
						'TRES_MESES' => $columnas[9],
						'CUATRO_MESES' => $columnas[10],
						'CINCO_MESES' => $columnas[11],
						'SEIS_MESES' => $columnas[12],
						'SIETE_MESES' => $columnas[13],
						'OCHO_A_11_MESES' => $columnas[14],
						'DOCE_MESES' => $columnas[15],
						'TRECE_A_17_MESES' => $columnas[16],
						'DIESIOCHO_MESES' => $columnas[17],
						'CINCO_ANNOS' => $columnas[18],
						'NINNAS_DE_9_A_17_ANNOS' => $columnas[19],
						'NINNOS_DE_9_A_14_ANNOS' => $columnas[20],
						'MUJERES_EN_EDAD_FERTIL' => $columnas[21],
						'ADULTOS_DE_60_ANNOS_Y_MAS' => $columnas[22],
						'PRIMERA_INFANCIA' => $columnas[23],
						'INFANCIA' => $columnas[24],
						'ADOLESCENCIA' => $columnas[25],
						'JUVENTUD' => $columnas[26],
						'ADULTEZ' => $columnas[27],
						'VEJEZ' => $columnas[28],
						'ACTIVIDADES_ANNO' => $columnas[29],
						'ACTIVIDAD_MES' => $informacion[0],
						];
	$prueba[] = $object;
	};
	$bloques = array_chunk($prueba, 50);
	for ($i=0; $i < count($bloques); $i++) { 
		$info = json_encode($bloques[$i]);
		$contadordelineas = count($bloques[$i]);
				require_once('../../config/dbcon_prod.php');
				$consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_i_proceso_nt(:v_json_nt,:v_pcantidad_registros,:v_pnit,:v_pregimen,:v_pcontrato,:v_json_row); end;');
				oci_bind_by_name($consulta, ':v_json_nt', $info);
				oci_bind_by_name($consulta, ':v_pcantidad_registros', $contadordelineas);
				oci_bind_by_name($consulta, ':v_pnit', $request -> vpnit);                
				oci_bind_by_name($consulta, ':v_pregimen', $request -> vpregimen);
				oci_bind_by_name($consulta, ':v_pcontrato', $request -> vpcontrato);
				$clob = oci_new_descriptor($c, OCI_D_LOB);
				oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
				oci_execute($consulta, OCI_DEFAULT);
				if (isset($clob)) {
					$json = $clob->read($clob->size());
					// debido a que se envia bloques de 50 optenemos dos respuesta y genera un error al mostrar el error y este if nos ayuda a poder imprimir o enviar una sola respuesta.
					if($i + 1 == count($bloques) ){
						echo $json;
					}
				} else {
					echo 0;
				}
				oci_close($c);
		}
	
}
