<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function cargaannos()
{
    require_once('../../../php/config/dbcon_prod.php');
	$consulta = oci_parse($c, "SELECT distinct pern_anno ANNO from bper_periodo where pern_anno >= 2011 order by 1 desc");
	oci_execute($consulta);
	$rows = array();
	while ($row = oci_fetch_assoc($consulta)) {
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}


?>


