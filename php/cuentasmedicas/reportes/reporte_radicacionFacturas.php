<?php
require_once('../../../php/config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte de radicacion de facturas.txt"');
$FECHA_INICIAL = $_GET['fechaInicio'];
$FECHA_FINAL = $_GET['fecha_final'];
$TERCERO = $_GET['tercero'];
?>
<?php
    $consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_radicacion_facturas(:v_pfinicial,
	                                                                       :v_pffinal,
																		   :v_ptercero,           
																		   :v_pjson_out,
																		   :v_presultado); end;');
    oci_bind_by_name($consulta, ':v_pfinicial', $FECHA_INICIAL);
    oci_bind_by_name($consulta, ':v_pffinal', $FECHA_FINAL);
	oci_bind_by_name($consulta, ':v_ptercero', $TERCERO);
    oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
    $row = array();
       echo 'DEPARTAMENTO'.'|'.
			'MUNICIPIO'.'|'.
			'FACC_DOCUMENTO'.'|'.
			'FACN_NUMERO'.'|'.
			'FACN_UBICACION'.'|'.
			'TIPO_DOC'.'|'.
			'DOC_AFILIADO'.'|'.
			'UBICACION_AFILIADO'.'|'.
			'REGIMEN'.'|'.
			'NIT'.'|'.
			'IPS'.'|'.
			'FECHA_RADICACION'.'|'.
			'FECHA_CAUSACION'.'|'.
			'DOCUMENTO_AUDITOR'.'|'.
			'NOMBRE_AUDITOR'.'|'.
			'DOCUMENTO_RADICADOR'.'|'.
			'NOMBRE_RADICADOR'.'|'.
			'CONCEPTO_FACTURA'.'|'.
			'FACN_RECIBO'.'|'.
			'FACC_FACTURA'.'|'.
			'TOTAL_FACTURA'.'|'.
			'ESTADO_FAC'.'|'.
			'FECHA_PRESTACION_INICIAL'.'|'.
			'FECHA_PRESTACION_FINAL'.'|'.
			'MOTIVO_RADICACION'.'|'.
			'DOCUMENTO_CONTRATO'.'|'.
			'CON_NOMBRE_CONCEPTO'.'|'.
			'CON_NOMBRE_MOTIVO'.'|'.
			'CON_NOMBRE_ASUNTO'.'|'.
			'CON_ESTADO'.'|'.
			'FORMA_PAGO'.'|'.
			'NATURALEZA'.'|'.
			'FECHA_AUTORIZACION'.'|'.
			'TIPO_AUTORIZACION'.'|'.
			'ANTICIPO_AUTORIZACION'.'|'.
			'NUMERO_AUTORIZACION'.'|'.
			'FECHA_FACTURA'.'|'.
			'FACN_ANNO'.'|'.
			'FACN_PERIODO'.'|'.
			'AFIC_NOMBRE'.'|'.
			'FECHA_URGENCIA '.'|'.
			'NUMERO_URGENCIA '.'|'.
			'FACV_VALOR_FD '.'|'.
			'TIPO_FACTURA_DF '.'|'.
			'RESPONSABLE_DIGITAL';
            echo "\n";
            // Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($curs))
{
	echo 	    $rows['DEPARTAMENTO']. '|' .
				$rows['MUNICIPIO']. '|' .
				$rows['FACC_DOCUMENTO']. '|' .
				$rows['FACN_NUMERO']. '|' .
				$rows['FACN_UBICACION']. '|' .
				$rows['TIPO_DOC']. '|' .
				$rows['DOC_AFILIADO']. '|' .
				$rows['UBICACION_AFILIADO']. '|' .
				$rows['REGIMEN']. '|' .
				$rows['NIT']. '|' .
                $rows['IPS']. '|' .
				$rows['FECHA_RADICACION']. '|' .
				$rows['FECHA_CAUSACION']. '|' .
				$rows['DOCUMENTO_AUDITOR']. '|' .
				$rows['NOMBRE_AUDITOR']. '|' .
				$rows['DOCUMENTO_RADICADOR']. '|' .
				$rows['NOMBRE_RADICADOR']. '|' .
				$rows['CONCEPTO_FACTURA']. '|' .
				$rows['FACN_RECIBO']. '|' .
				$rows['FACC_FACTURA']. '|' .
                $rows['TOTAL_FACTURA']. '|' .
				$rows['ESTADO_FAC']. '|' .
				$rows['FECHA_PRESTACION_INICIAL']. '|' .
				$rows['FECHA_PRESTACION_FINAL']. '|' .
				$rows['MOTIVO_RADICACION']. '|' .
				$rows['DOCUMENTO_CONTRATO']. '|' .
				$rows['CON_NOMBRE_CONCEPTO']. '|' .
				$rows['CON_NOMBRE_MOTIVO']. '|' .
				$rows['CON_NOMBRE_ASUNTO']. '|' .
                $rows['CON_ESTADO']. '|' .
				$rows['FORMA_PAGO']. '|' .
				$rows['NATURALEZA']. '|' .
				$rows['FECHA_AUTORIZACION']. '|' .
				$rows['TIPO_AUTORIZACION']. '|' .
				$rows['ANTICIPO_AUTORIZACION']. '|' .
				$rows['NUMERO_AUTORIZACION']. '|' .
				$rows['FECHA_FACTURA']. '|' .
				$rows['FACN_ANNO']. '|' .
				$rows['FACN_PERIODO']. '|' .
				$rows['AFIC_NOMBRE']. '|' .
				$rows['FECHA_URGENCIA']. '|' .
				$rows['NUMERO_URGENCIA']. '|' .
				$rows['FACV_VALOR_FD']. '|' .
				$rows['TIPO_FACTURA_DF']. '|' .
				$rows['RESPONSABLE_DIGITAL']. '|' ."\n";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);
?>
