<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function Obtener_Listado_IPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_ips_censo_cerrado(:v_response); END;');
  $cursor1 = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $cursor1, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor1, OCI_DEFAULT);
  $datos1 = [];
  oci_fetch_all($cursor1, $datos1, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor1);
  echo json_encode($datos1);
}



function Obtener_Listado_censos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_lista_censo_cerrado(:v_pnit,:v_response); END;');
  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
  $cursor1 = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $cursor1, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor1, OCI_DEFAULT);
  $datos1 = [];
  oci_fetch_all($cursor1, $datos1, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor1);
  echo json_encode($datos1);
}

function Obtener_Autorizaciones()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_obtener_aut_censo(:v_pnumero,:v_pubicacion,:v_response); END;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $cursor1 = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $cursor1, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor1, OCI_DEFAULT);
  $datos1 = [];
  oci_fetch_all($cursor1, $datos1, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor1);
  echo json_encode($datos1);
}


function ProcesarCensoAutorizaciones()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_gestion_censo_aut(:v_pnumero,:v_pubicacion,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
