<?php

require_once('../config/dbcon_prod.php');
$tipo = $_GET['tipo'];
$documento = $_GET['documento'];

$cursor = oci_new_cursor($c);
$consulta = oci_parse($c, 'begin PQ_GENESIS_ACAS.p_obtener_lis_2(:v_ptipo,:v_pdocumento,:v_json_row); end;');
oci_bind_by_name($consulta, ':v_ptipo', $tipo);
oci_bind_by_name($consulta, ':v_pdocumento', $documento);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_json_row", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$array = array();
while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
	if ($tipo == "A") {
		array_push(
			$array,
			array(
				'FECHA' => $row['FECHA'],
				'UBICACION' => $row['UBICACION'],
				'NUMERO' => $row['NUMERO'],
				'NUMEROTH' => $row['NUMEROTH'],
				'CODIGO' => $row['CODIGO'],
				'COD_CONCEPTO' => $row['COD_CONCEPTO'],
				'CONCEPTO' => $row['CONCEPTO'],
				'MOTIVO' => $row['MOTIVO'],
				'DESCRIPCION' => $row['DESCRIPCION'],
				'EMISOR_COD' => $row['EMISOR_COD'],
				'EMISOR' => $row['EMISOR'],
				'ASUNTO' => $row['ASUNTO'],
				'RECEPTOR_COD' => $row['RECEPTOR_COD'],
				'RECEPTOR' => $row['RECEPTOR'],
				'ADJUNTO' => $row['ADJUNTO'],
				'ESTADOACAS' => $row['ESTADOACAS'],
				'CANTIDAD' => $row['CANTIDAD'],
				'STYLEP' => $row['STYLEP'],
				'PRIORIDAD' => $row['PRIORIDAD'],
				'STYLE' => $row['STYLE'],
				'ESTADO' => $row['ESTADO'],
				'DIAS' => $row['DIAS']
			)
		);
	} else {
		array_push(
			$array,
			array(
				'FECHA' => $row['FECHA'],
				'UBICACION' => $row['UBICACION'],
				'NUMERO' => $row['NUMERO'],
				'NUMEROTH' => $row['NUMEROTH'],
				'CODIGO' => $row['CODIGO'],
				'COD_CONCEPTO' => $row['COD_CONCEPTO'],
				'CONCEPTO' => $row['CONCEPTO'],
				'MOTIVO' => $row['MOTIVO'],
				'DESCRIPCION' => $row['DESCRIPCION'],
				'EMISOR_COD' => $row['EMISOR_COD'],
				'EMISOR' => $row['EMISOR'],
				'OFICINA' => $row['OFICINA'],
				'ASUNTO' => $row['ASUNTO'],
				'RECEPTOR_COD' => $row['RECEPTOR_COD'],
				'RECEPTOR' => $row['RECEPTOR'],
				'ADJUNTO' => $row['ADJUNTO'],
				'ESTADOACAS' => $row['ESTADOACAS'],
				'CANTIDAD' => $row['CANTIDAD'],
				'STYLEP' => $row['STYLEP'],
				'PRIORIDAD' => $row['PRIORIDAD'],
				'STYLE' => $row['STYLE'],
				'ESTADO' => $row['ESTADO'],
				'dias' => $row['DIAS']
			)
		);
	}
}

echo json_encode($array);
