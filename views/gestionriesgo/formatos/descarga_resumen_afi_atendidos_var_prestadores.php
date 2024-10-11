<?php
require_once('../../../php/config/dbcon_prod.php');
// header('Content-type: application/vnd.ms-excel;');
// header("Content-Disposition: attachment; filename=Reporte de pacientes cargados en malla sin soporte" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$vptipodoc = 'CC';
$vpdocmento = 12510162;
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>Tipo_Doc</th>
        <th>Documento</th>
        <th>Nombre completo</th>
        <th>Prestador que reporta 1</th>
        <th>Prestador que reporta 2</th>
    </tr>
    <?php
	$cursor = oci_new_cursor($c);
	$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_prestador_X_afiliado_detalle(:v_ptipo_doc,:v_pdocmento,:v_pjson_out,:v_Pdata);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_ptipo_doc', $vptipodoc);
	oci_bind_by_name($consulta, ':v_pdocmento', $vpdocmento);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
	oci_bind_by_name($consulta, ':v_Pdata', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor);
    $row = array();
    while (($row = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['EGRC_TIPO_DOC'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_DOCUEMNTO_AFIL'];
        echo "</td>";
        echo "<td>";
        echo $row['AFIC_PRIMER_APELLIDO']; $row['AFIC_SEGUNDO_NOMBRE'];$row['AFIC_PRIMER_NOMBRE']; $row['AFIC_SEGUNDO_NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_REPS_ANT'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_REPS_NUEVO'];
        echo "</td>";
        echo "</tr>";
    }
    oci_close($c);
    ?>
</table>