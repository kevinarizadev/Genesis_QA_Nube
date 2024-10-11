<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_obtener_listado_ips()
{
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_obtener_ips_autorizacion(:v_pnumero,:v_pubicacion,:v_pproducto,:v_psubclasificacion,:v_pnit,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->v_pnumero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->v_pubicacion);
  oci_bind_by_name($consulta, ':v_pproducto', $request->v_pproducto);
  oci_bind_by_name($consulta, ':v_psubclasificacion', $request->v_psubclasificacion);
  oci_bind_by_name($consulta, ':v_pnit', $request->ips);
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

function P_lista_tutela_areas()
{
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.P_lista_tutela_autorizacion(:v_pjson_row); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function p_obtener_tutelas_areas()
{
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.P_LISTA_PRODUCTOS_AUTORIZACION(:v_pnumero,:v_pubicacion,:v_pjson_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
  oci_bind_by_name($consulta, ':v_pubicacion', $request->ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function Finalizar_Asignacion_ips()
{
  require_once('../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_tut.p_ui_prestador(:v_pnumero,:v_pubicacion,:v_pjson_servicio,:v_pcantidad_serv,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pnumero',$request->v_pnumero);
  oci_bind_by_name($consulta, ':v_pubicacion',$request->v_pubicacion);
  oci_bind_by_name($consulta, ':v_pjson_servicio',$request->v_pjson_servicio);
  oci_bind_by_name($consulta, ':v_pcantidad_serv',$request->v_pcantidad_serv);
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

