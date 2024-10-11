<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function P_LISTA_IPS_URGENCIA()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_CD.p_lista_ips_urgencia(:v_pnit,:v_json_row); end;');;
  oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $respuesta = $clob->read($clob->size());
  } else {
    $respuesta = json_encode([]);
  }
  echo $respuesta;
}
?>
