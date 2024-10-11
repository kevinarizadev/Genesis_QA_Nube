<?php
require_once('../../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reporte facturas devueltas.txt"');

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_facturas_devueltas(:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado);end;');
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();

         echo 
          'AÑO'.'|'.
          'MES'.'|'.
          'DFECHA_RECHAZO'.'|'.
          'CNIT'.'|'.
          'TERC_NOMBRE'.'|'.
          'CCOD_HABILITACION'.'|'.
          'VNUMERO_RECIBO'.'|'.
          'VCODIGO_PROCESO'.'|'.
          'VMOTIVO_RECHAZO'.'|'.
          'NOMBRE'.'|'.
          'VNUMERO_FACTURA'.'|'.
          'RAFV_NETO'.'|'.
          'FRAD'.'|';
          echo "\n";

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{
    //var_dump($row);
     echo 
          $row['AÑO']. '|' .
          $row['MES']. '|' .
          $row['DFECHA_RECHAZO']. '|' .
          $row['CNIT']. '|' .
          $row['TERC_NOMBRE']. '|' .
          $row['CCOD_HABILITACION']. '|' .
          $row['VNUMERO_RECIBO']. '|' .
          $row['VCODIGO_PROCESO']. '|' .
          $row['VMOTIVO_RECHAZO']. '|' .
          $row['NOMBRE']. '|' .
          $row['VNUMERO_FACTURA']. '|' .
          $row['RAFV_NETO']. '|' .
          $row['FRAD']. '|' ."\n";
 }
oci_close($c);

?>
