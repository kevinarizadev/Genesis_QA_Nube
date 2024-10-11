<?php
require('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte total" ." ". date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$vpanno = $_GET['anno_total'];
$vpmes = $_GET['mes_total'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>Año</th>
        <th>Mes</th>
        <th>Ips</th>
        <th>Contrato</th>
        <th>Actividad</th>
        <th>Estimacion mes</th>
        <th>Cant ejecucion</th>
        <th>Por ejecucion</th>
        <th>Valor actividad</th>
        <th>Valor a pagar</th>
    </tr>
    <?php

    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_resumen_total(:v_panno,:v_pmes,:v_result,:v_json_row);end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_panno', $vpanno);
    oci_bind_by_name($consulta, ':v_pmes', $vpmes);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_bind_by_name($consulta, ':v_json_row', $json, 4000);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    while (($row = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['ANNO'];
        echo "</td>";
        echo "<td>";
        echo $row['MES'];
        echo "</td>";
        echo "<td>";
        echo $row['IPS'];
        echo "</td>";
        echo "<td>";
        echo $row['NUM_CONTRATO'];
        echo "</td>";
        echo "<td>";
        echo $row['ACTIVIDAD'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTIMACION_MES'];
        echo "</td>";
        echo "<td>";
        echo $row['CANTIDAD_EJECUTADA'];
        echo "</td>";
        echo "<td>";
        echo $row['PORCENTAJE_EJECUCION'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR_ACTIVIDAD'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR_A_PAGAR'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>