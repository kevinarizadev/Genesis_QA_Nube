<?php
require_once('../../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reportes_pgp.txt"');


$fechaInicial = $_GET['fecha_inicio'];
$fechaFinal = $_GET['fecha_final']; 
$estado = $_GET['estado']; 
$dpto = $_GET['departamento']; 
$nit = $_GET['nit']; 

$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FACTURACION.p_lista_reporte_pgp(:v_pfecha_inicial,
                                                                            :v_pfecha_final,
                                                                            :v_pestado,
                                                                            :v_pdepartamento,
                                                                            :v_pnit,
                                                                            :v_response); end;');
oci_bind_by_name($consulta, ':v_pfecha_inicial', $fechaInicial);
oci_bind_by_name($consulta, ':v_pfecha_final', $fechaFinal);
oci_bind_by_name($consulta, ':v_pestado', $estado);
oci_bind_by_name($consulta, ':v_pdepartamento', $dpto);
oci_bind_by_name($consulta, ':v_pnit', $nit);
$cursor = oci_new_cursor($c);
oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor);
$rows = array();

echo
                'DOC_OASIS'.'|'.
                'FECHA_RAD'.'|'.
                'TERCERO'.'|'.
                'NOMBRE_PRESTADOR'.'|'.
                'TOTAL'.'|'.
                'ESTADO'.'|'.
                'FACTURA'.'|'.
                'DEPARTAMENTO'.'|'.
                'VALOR_DESCUENTO'.'|'.
                'FECHA_DESCUENTO';
echo "\n";
while (($rows = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
    $rows['DOC_OASIS'] . '|' .
    $rows['FECHA_RAD'] . '|' .
    $rows['TERCERO'] . '|' .
    $rows['NOMBRE_PRESTADOR'] . '|' .
    $rows['TOTAL'] . '|' .
    $rows['ESTADO'] . '|' .
    $rows['FACTURA'] . '|' . 
    $rows['DEPARTAMENTO'] . '|' . 
    $rows['VALOR_DESCUENTO'] . '|' . 
    $rows['FECHA_DESCUENTO'] . '|' . "\n";
}
oci_close($c);
?>