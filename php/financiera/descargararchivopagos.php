<?php
require_once('../config/dbcon_prod.php');
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="Pago red Prestadora.txt"');

$tipocuenta = $_GET['tipocuenta'];
$cuentabancaria = $_GET['cuentabancaria'];
$tiposervicio = $_GET['tiposervicio'];
$subtiposervicio = $_GET['subtiposervicio'];

 $consulta = oci_parse($c, 'begin oasis.PQ_CTAS_PRESTADORES.EXPORTAR_PLANO(:v_pTipoCuenta,:v_PNunCuenta,:v_pServicio,:v_pSubServicio,:v_json_row,:v_jsonrow); end;');
 oci_bind_by_name($consulta, ':v_pTipoCuenta', $tipocuenta);
 oci_bind_by_name($consulta, ':v_PNunCuenta', $cuentabancaria);
oci_bind_by_name($consulta, ':v_pServicio', $tiposervicio);
oci_bind_by_name($consulta, ':v_pSubServicio', $subtiposervicio);
oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_jsonrow", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);

$row = array();
        //  echo'RC'.'|';
        //   echo "\n";

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{

     echo $row['RC']."\n";
 }
oci_close($c);

?>
