<?php
require_once('../../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reporte_facturas_PGP.txt"');
$vpempresa = 1;
$consulta = oci_parse($c, 'BEGIN pq_genesis_financiera.P_REPORTE_LISTADO_ESTADO_FAC_PGP(:v_pempresa,:v_pjson_row_out,:v_result);end;');
oci_bind_by_name($consulta, ':v_pempresa', $vpempresa);
oci_bind_by_name($consulta, ':v_pjson_row_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$rows = array();
echo
'FACC_DOCUMENTO' . '|' .
  'FACN_NUMERO' . '|' .
  'FACN_UBICACION' . '|' .
  'FACF_FECHA' . '|' .
  'CONTRATO' . '|' .
  'FACN_ANNO' . '|' .
  'FACN_PERIODO' . '|' .
  'FACV_TERCERO' . '|' .
  'TERC_NOMBRE' . '|' .
  'FACC_FACTURA' . '|' .
  'VALOR_DEBITO' . '|' .
  'VALOR_CREDITO' . '|' .
  'VALOR_RETENCION' . '|' .
  'VALOR_AF_RIPS' . '|' .
  'VALOR_PAGO' . '|' .
  'VALOR_FD'.'|'.
  'FECHA_FACTURA'.'|'.
  'CONTRATO_ADMINISTRATIVO'.'|'.
  'FACN_PROYECTO'.'|'.
  'FECHA_FD'.'|'.
  'VALOR_FN' . '|' .
  'FECHA_FN' . '|' .
  'VALOR_NB' . '|' .
  'FECHA_NB' . '|' .
  'COD_SERVICIOS'.'|';
echo "\n";
while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
  $rows['FACC_DOCUMENTO'] . '|' .
    $rows['FACN_NUMERO'] . '|' .
    $rows['FACN_UBICACION'] . '|' .
    $rows['FACF_FECHA'] . '|' .
    $rows['CONTRATO'] . '|' .
    $rows['FACN_ANNO'] . '|' .
    $rows['FACN_PERIODO'] . '|' .
    $rows['FACV_TERCERO'] . '|' .
    $rows['TERC_NOMBRE'] . '|' .
    $rows['FACC_FACTURA'] . '|' .
    $rows['VALOR_DEBITO'] . '|' .
    $rows['VALOR_CREDITO'] . '|' .
    $rows['VALOR_RETENCION'] . '|' .
    $rows['VALOR_AF_RIPS'] . '|' .
    $rows['VALOR_PAGO'] . '|' .
    $rows['VALOR_FD'] . '|' .
    $rows['FECHA_FACTURA'] . '|' . 
    $rows['CONTRATO_ADMINISTRATIVO'] . '|' . 
    $rows['FACN_PROYECTO'] . '|' .
    $rows['FECHA_FD'] . '|' .
    $rows['VALOR_FN'] . '|' .
    $rows['FECHA_FN'] . '|' .
    $rows['VALOR_NB'] . '|' .
    $rows['FECHA_NB'] . '|' .
    $rows['COD_SERVICIOS'] . '|' ."\n";
}
oci_close($c);
?>
