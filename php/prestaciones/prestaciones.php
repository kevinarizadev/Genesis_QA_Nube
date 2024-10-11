<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function listar_reportes(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN pq_genesis_prestaciones.p_tipos_reporte(:v_json_row); end;');
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	}else{
		echo 0;
	}
	oci_close($c);
}

function individual_prestaciones(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN pq_genesis_prestaciones.p_individual_prestaciones(:v_afiliado,:v_json_out); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_afiliado', $request -> documento);
    oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    }else{
      echo 0;
    }
    oci_close($c);
}
?>
