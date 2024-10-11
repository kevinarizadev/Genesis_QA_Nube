<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function listar_servicios(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin oasis.PQ_CTAS_PRESTADORES.listar_servicios(:v_jsonrow); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_jsonrow', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
  }
function listar_cuenta(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin oasis.PQ_CTAS_PRESTADORES.listar_cuenta(:v_jsonrow); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_jsonrow', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
  }
function listar_SubServicios(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin oasis.PQ_CTAS_PRESTADORES.listar_SubServicios(:v_jsonrow); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_jsonrow', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
  }

function Cargar_Confirma()
{
	require_once('../config/dbcon_prod.php');
	$array = array();
	global $request;
	$datos = $request->archivo;
    $registros = json_decode($datos);
	// $name = uniqid();
	// $base_to_php = explode(',', $datos);
	// $data = base64_decode($base_to_php[1]);
	// $filepath = "../../temp/" . $name . ".csv";
	// file_put_contents($filepath, $data);
	// $ruta = "../../temp/" . $name . ".csv";
	// $txt_file = fopen($ruta, 'r');
	// $a = 1;
	// while ($line = fgets($txt_file)) {
	// 	array_push($array, $line);
	// 	$a++;
	// }
	// fclose($txt_file);
	// unset($array[0]);
	// $prueba = [];
	// foreach ($array as $fila_v) {
	// 	$columnas = explode("|", $fila_v);
	// 	$datos2 = explode("\r\n", $columnas[10]);
	// 	// $fecha_proceso = stripslashes();
	// 	$object = (object) [
	// 		'v_Pnit' => $columnas[0],
	// 		'v_Pdv' => $columnas[1],
	// 		'v_Ptipo' => $columnas[2],
	// 		'v_Prazon_social' => $columnas[3],
	// 		'v_Pcod_banco' => $columnas[4],
	// 		'v_Pno_cuenta' => $columnas[5],
	// 		'v_Ptipo_cuenta' => $columnas[6],
	// 		'v_Pvalor' => $columnas[7],
	// 		'v_Pnom_banco' => $columnas[8],
	// 		'V_PTipoEgreso' => $columnas[9],
	// 		'V_PRugblo' => $datos2[0],
	// 	];
	// 	$prueba[] = $object;
	// };
	// $datos_entrada = json_encode($prueba);
	// $datos_entrada1 = stripslashes($datos_entrada);
	// $registros = json_decode($datos_entrada1);
    $respuesta = ["CODIGO" => 1, "MENSAJE" => "Datos cargados"];
    
    try {
        for ($i = 0; $i < count($registros); $i++) {
            // $float_val = strtr($registros[$i]->VALOR, [',' => '.', '.' => ',']);
            $numero_sin_coma = str_replace(',', '', $registros[$i]->VALOR);
            $float_val = str_replace('.', ',', $numero_sin_coma);
            // $string_val = str_replace('.', '', $registros[$i]->VALOR);
            // $valornuevo_val = str_replace(',', '.', $string_val);
            // $float_val = floatval($valornuevo_val);
            
            $consulta = oci_parse($c, 'BEGIN oasis.PQ_CTAS_PRESTADORES.p_insertar_registro(:v_Pnit,
                                                                                            :v_Pdv,
                                                                                            :v_Ptipo,
                                                                                            :v_Prazon_social,
                                                                                            :v_Pcod_banco,
                                                                                            :v_Pno_cuenta,
                                                                                            :v_Ptipo_cuenta,
                                                                                            :v_Pvalor,
                                                                                            :v_Pnom_banco,
                                                                                            :V_PTipoEgreso,
                                                                                            :V_PRugblo,
                                                                                            :v_json_row
                                                                                            ); end;');
            oci_bind_by_name($consulta, ':v_Pnit', $registros[$i]->NIT);
            oci_bind_by_name($consulta, ':v_Pdv', $registros[$i]->Dig);
            oci_bind_by_name($consulta, ':v_Ptipo', $registros[$i]->NIT_CC);
            oci_bind_by_name($consulta, ':v_Prazon_social', $registros[$i]->RAZON_SOCIAL);
            oci_bind_by_name($consulta, ':v_Pcod_banco', $registros[$i]->CODIGO_BANCO);
            oci_bind_by_name($consulta, ':v_Pno_cuenta', $registros[$i]->No_CUENTA);
            oci_bind_by_name($consulta, ':v_Ptipo_cuenta', $registros[$i]->TIPO);
            oci_bind_by_name($consulta, ':v_Pvalor', $float_val);
            oci_bind_by_name($consulta, ':v_Pnom_banco', $registros[$i]->NOMBRE_BANCO);
            oci_bind_by_name($consulta, ':V_PTipoEgreso', $registros[$i]->EGRESO);
            oci_bind_by_name($consulta, ':V_PRugblo', $registros[$i]->RUBRO);
    
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    
            oci_execute($consulta, OCI_DEFAULT);
    
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                $resultado = json_decode($json, true);
                if ($resultado['CODIGO'] !== '0') {
                    throw new Exception("Error al insertar registro en la posicion $i: " . $resultado['MENSANJES']);
                }
            } else {
                throw new Exception("Error al obtener CLOB en la posición $i");
            }
        }
    } catch (Exception $e) {
        $respuesta["CODIGO"] = 99;
        $respuesta["MENSAJE"] = $e->getMessage();
    }
    
    oci_close($c);
    echo json_encode($respuesta);
}


function limpiar_Tabla(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'begin oasis.PQ_CTAS_PRESTADORES.p_LimpiarTabla(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
  }