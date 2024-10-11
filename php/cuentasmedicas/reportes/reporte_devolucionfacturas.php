<?php
require_once('../../../php/config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte de devolucion de facturas.txt"');
$FECHA_INICIAL = $_GET['fechaInicio'];
$FECHA_FINAL = $_GET['fecha_final'];
?>
<?php
$consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_facturas_devueltas(:v_pfinicial,:v_pffinal,
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
     'DFECHA_RECHAZO,'.'|'.
     'CNIT,'.'|'.
     'TERC_NOMBRE,'.'|'.
     'CCOD_HABILITACION,'.'|'.
     'VNUMERO_RECIBO,'.'|'.
     'VCODIGO_PROCESO,'.'|'.
     'VMOTIVO_RECHAZO,'.'|'.
     'NOMBRE,'.'|'.
     'VNUMERO_FACTURA,'.'|'.
     'RAFV_NETO,'.'|'.
     'FRAD,';
     echo "\n";
     // Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($curs))
{
	echo 	    $rows['AÑO']. '|' .
				$rows['MES']. '|' .
				$rows['DFECHA_RECHAZO']. '|' .
				$rows['CNIT']. '|' .
				$rows['TERC_NOMBRE']. '|' .
				$rows['CCOD_HABILITACION']. '|' .
				$rows['VNUMERO_RECIBO']. '|' .
				$rows['VCODIGO_PROCESO']. '|' .
                $rows['VMOTIVO_RECHAZO']. '|' .
				$rows['NOMBRE']. '|' .
				$rows['VNUMERO_FACTURA']. '|' .
				$rows['RAFV_NETO']. '|' .
				$rows['FRAD']. '|' ."\n";
 }
    oci_close($c);
    ?>