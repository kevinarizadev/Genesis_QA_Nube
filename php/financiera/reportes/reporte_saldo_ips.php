<?php
require_once('../../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Reporte de Saldo Ips.txt"');
$anno = $_GET['anno'];
$periodo = $_GET['periodo'];
$nit = $_GET['nit'];
$consulta = oci_parse($c, 'BEGIN pq_genesis_facturacion.p_lista_reporte_ips_auditoria(:v_panno,:v_pperiodo,:v_pnit,:v_response);end;');
oci_bind_by_name($consulta, ':v_panno', $anno);
oci_bind_by_name($consulta, ':v_pperiodo', $periodo);
oci_bind_by_name($consulta, ':v_pnit', $nit);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$rows = array();
echo
  'FACC_DOCUMENTO'.'|' .
  'FACN_NUMERO'.'|' .
  'FACN_UBICACION'.'|' .
  'FECHA_RAD'.'|' .
  'TERCERO'.'|' .
  'NOMBRE_PRESTADOR'.'|' .
  'TOTAL'.'|' .
  'ESTADO'.'|' .
  'FACTURA'.'|' .
  'DEPARTAMENTO'.'|' .
  'MUNICIPIO'.'|' .
  'SALDO'.'|';
echo "\n";
while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
    $rows['FACC_DOCUMENTO'] . '|' .
    $rows['FACN_NUMERO'] . '|' .
    $rows['FACN_UBICACION'] . '|' .
    $rows['FECHA_RAD'] . '|' .
    $rows['TERCERO'] . '|' .
    $rows['NOMBRE_PRESTADOR'] . '|' .
    $rows['TOTAL'] . '|' .
    $rows['ESTADO'] . '|' .
    $rows['FACTURA'] . '|' .
    $rows['DEPARTAMENTO'] . '|' .
    $rows['MUNICIPIO'] . '|' .
    $rows['CUOV_SALDO_OASIS'] . '|' ."\n";
}
oci_close($c);
?>
