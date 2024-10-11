<?php
require_once('../../../php/config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte de facturas no radidad por RIPS.txt"');
$FECHA_INICIAL = $_GET['fechaInicio'];
$FECHA_FINAL = $_GET['fecha_final'];
?>
<?php
$consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_facturas_validadas_no_radicadas_por_rips(:v_pfinicial,:v_pffinal,
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
     'FECHA_PROCESO,'.'|'.
     'NIT,'.'|'.
     'TERC_NOMBRE,'.'|'.
     'CODIGO_RECIBO,'.'|'.
     'CODIGO_PROCESO,'.'|'.
     'RAFC_FACTURA,'.'|'.
     'RAFV_NETO';
     echo "\n";
     // Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($curs))
{
	echo 	    $rows['AÑO']. '|' .
				$rows['MES']. '|' .
				$rows['FECHA_PROCESO']. '|' .
				$rows['NIT']. '|' .
				$rows['TERC_NOMBRE']. '|' .
				$rows['CODIGO_RECIBO']. '|' .
				$rows['CODIGO_PROCESO']. '|' .
				$rows['RAFC_FACTURA']. '|' .
				$rows['RAFV_NETO']. '|' ."\n";
 }
    oci_close($c);
?>