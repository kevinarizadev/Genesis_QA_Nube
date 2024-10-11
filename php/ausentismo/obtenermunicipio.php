<?php
	require_once('../config/dbcon_prod.php');
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
	$consulta = oci_parse($c,'begin PQ_GENESIS_AU.P_OBTENER_MUNICIPIOS(:v_json_row); end;');


	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

	oci_execute($consulta,OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo '['.$json.']';
	}else{
		echo 0;
	}
	oci_close($c);
?>
