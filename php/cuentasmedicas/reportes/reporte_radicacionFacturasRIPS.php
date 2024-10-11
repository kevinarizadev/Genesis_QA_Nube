<?php
require_once('../../../php/config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte de radicacion facturas RIPS.txt"');
$FECHA_INICIAL = $_GET['fechaInicio'];
$FECHA_FINAL = $_GET['fecha_final'];
?>
<?php
$consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_radicacion_facturas_rips(:v_pfinicial,:v_pffinal,
:v_pjson_out,
:v_presultado); end;');
oci_bind_by_name($consulta, ':v_pfinicial', $FECHA_INICIAL);
oci_bind_by_name($consulta, ':v_pffinal', $FECHA_FINAL);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();
echo 'AÑO,'.'|'.
     'MES,'.'|'.
     'FECHA_RADICACION,'.'|'.
     'FACV_TERCERO,'.'|'.
     'TERC_NOMBRE,'.'|'.
     'FACN_RECIBO,'.'|'.
     'CODIGO_PROCESO,'.'|'.
     'FACC_FACTURA,'.'|'.
     'FACV_TOTAL_PROVEEDOR,'.'|'.
     'FACH_HORA,'.'|'.
     'FACC_ESTADO';
     echo "\n";

     // Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($curs))
{
	echo 	    $rows['AÑO']. '|' .
				$rows['MES']. '|' .
				$rows['FECHA_RADICACION']. '|' .
				$rows['FACV_TERCERO']. '|' .
				$rows['TERC_NOMBRE']. '|' .
				$rows['FACN_RECIBO']. '|' .
				$rows['CODIGO_PROCESO']. '|' .
				$rows['FACC_FACTURA']. '|' .
				$rows['FACV_TOTAL_PROVEEDOR']. '|' .
                $rows['FACH_HORA']. '|' .
				$rows['FACC_ESTADO']. '|' ."\n";
 }
    oci_close($c);
?>
