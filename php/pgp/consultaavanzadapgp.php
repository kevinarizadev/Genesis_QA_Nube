<?php

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = $request->function;
	$function();

function obtenerRegionales_2()
{
	require_once('../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis.p_listar_departamentos_presencia(:v_json_out); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_out', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function p_lista_facturas_pgp()
{
	require_once('../config/dbcon.php');
	global $request;
    $numero = "";
    $jsonPgp = json_decode($request->autorizacion);
    $cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'BEGIN OASIS.PQ_GENESIS_FACTURACION.p_lista_facturas_pgp(:v_pfecha_ini,:v_pfecha_fin,:v_pestado,:v_pcod_regional,:v_ptipo_documento,
                                                                         :v_pnum_documento, :v_pnit, :v_pjson, :v_presult); end;');
	oci_bind_by_name($consulta, ':v_pfecha_ini', $jsonPgp->fecha_ordeniniavanzadoparseada);
	oci_bind_by_name($consulta, ':v_pfecha_fin', $jsonPgp->fecha_ordenfinavanzadoparseada);
	oci_bind_by_name($consulta, ':v_pestado', $jsonPgp->estadoavanzado);
	oci_bind_by_name($consulta, ':v_pcod_regional', $jsonPgp->regional);
	oci_bind_by_name($consulta, ':v_ptipo_documento', $numero);
	oci_bind_by_name($consulta, ':v_pnum_documento', $numero);
	oci_bind_by_name($consulta, ':v_pnit', $jsonPgp->nit);
    oci_bind_by_name($consulta,':v_pjson', $json, 4000);
	oci_bind_by_name($consulta,':v_presult', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	if (isset($json) && json_decode($json)->Codigo == 0) {
		$datos = [];
		oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		oci_free_statement($consulta);
		oci_free_statement($cursor);

		echo json_encode($datos);
	} else {
		echo json_encode($json);
	}
}

