<?php
// Llamamos la conexion a la base de datos
// require_once('../config/dbcon_prod.php');
 // Recibimos los parametros enviados desde servicio de consulta

// Preparamos la vista 
// $consulta = oci_parse($c,"select * from oasis.vw_bare_area");
// oci_execute($consulta);              
// $rows = array();
// while($row = oci_fetch_assoc($consulta))
// {
// 	$rows[] = $row;
// }
// echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
// oci_close($c);

	require_once('../config/dbcon_prod.php');
	$estado = 'A';
	$consulta = oci_parse($c, 'begin OASIS.PQ_GENESIS_PQR.P_OBTENER_AREAS_CORRESP(:v_estado, :v_result); end;');
    oci_bind_by_name($consulta, ':v_estado', $estado);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);

?>
