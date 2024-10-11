<?php
require_once('../../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="radicacion de facturas BINT.txt"');
$vpfinicial = $_GET['fecha_inicio'];
$vpffinal = $_GET['fecha_final'];
$consulta = oci_parse($c, 'BEGIN pq_genesis_repo.p_radicacion_facturas_bint(:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado);end;');
oci_bind_by_name($consulta, ':v_pfinicial', $vpfinicial);
oci_bind_by_name($consulta, ':v_pffinal', $vpffinal);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$rows = array();
echo

  'DOC_OASIS'.'|' .
  'FACC_CONCEPTO'.'|' .
  'FACH_HORA'.'|' .
  'FACV_TERCERO'.'|' .
  'TERC_NOMBRE'.'|' .
  'FACC_ESTADO'.'|' .
  'FACC_FACTURA'.'|' .
  'FACV_TOTAL_PROVEEDOR'.'|' .
  'DEPARTAMENTO'.'|' .
  'MUNICIPIO'.'|' .
  'DOC_MODIFICADO'.'|' .
  'NOM_MODIFICADO'.'|' .
  'DOC_RESPONSABLE'.'|' .
  'NOM_RESPONSABLE'.'|';
echo "\n";
while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
    $rows['DOC_OASIS'] . '|' .
    $rows['FACC_CONCEPTO'] . '|' .
    $rows['FACH_HORA'] . '|' .
    $rows['FACV_TERCERO'] . '|' .
    $rows['TERC_NOMBRE'] . '|' .
    $rows['FACC_ESTADO'] . '|' .
    $rows['FACC_FACTURA'] . '|' .
    $rows['FACV_TOTAL_PROVEEDOR'] . '|' .
    $rows['DEPARTAMENTO'] . '|' .
    $rows['MUNICIPIO'] . '|' .
    $rows['DOC_MODIFICADO'] . '|' .
    $rows['NOM_MODIFICADO'] . '|' .
    $rows['DOC_RESPONSABLE'] . '|' .
    $rows['NOM_RESPONSABLE'] . '|' ."\n";
}
oci_close($c);
?>
