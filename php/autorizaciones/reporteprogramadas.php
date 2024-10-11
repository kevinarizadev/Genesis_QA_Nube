<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Autorizaciones Programadas" . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$ubicacion = $_GET['ubicacion'];
$anio = $_GET['anio'];
$mes = $_GET['mes'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>CANTIDAD</th>
    <th>ESTADO</th>
    <th>IPS</th>
    <th>NIT</th>
    <th>REGIMEN</th>
    <th>VALOR</th>
    </tr>
    <?php
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUTPRO.P_LISTA_GESTION_PROGRAMADA_DETALLE(:v_pubicacion,:v_panno,:v_pmes,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_panno', $anio);
	oci_bind_by_name($consulta, ':v_pmes', $mes);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);
    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";
        echo $row->CANTIDAD;
        echo "</td>";
        echo "<td>";
        echo $row->ESTADO;
        echo "</td>";
        echo "<td>";
        echo $row->IPS;
        echo "</td>";
        echo "<td>";
        echo $row->NIT;
        echo "</td>";
        echo "<td>";
        echo $row->REGIMEN;
        echo "</td>";
        echo "<td>";
        echo $row->VALOR;
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>

</table>