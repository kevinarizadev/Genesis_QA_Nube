<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Acas - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$data = $_GET['data'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NUMERO</th>
        <th>ASUNTO</th>
        <th>MOTIVO</th>
        <th>FECHA RADICACION</th>
        <th>FECHA CIERRE</th>
        <th>UBICACION</th>
        <th>REMITENTE</th>
        <th>RESPONSABLE</th>
        <th>DIAS</th>
        <th>ESTADO</th>
        <th>PRIORIDAD</th>
        <th>DETALLE</th>
        <th>DESCRIPCION</th>
        <th>DESCRIPCION CIERRE</th>
    </tr>
    <?php

    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_OBTENER_ACAS_2(:v_pjson_row_in,:v_reg_data_principal); end;');
    oci_bind_by_name($consulta, ':v_pjson_row_in', $data);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_reg_data_principal", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['NUMERO'];
        echo "</td>";
        echo "<td>";
        echo $row['ASUNTO'];
        echo "</td>";
        echo "<td>";
        echo $row['MOTIVO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_APERTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_CIERRE'];
        echo "</td>";
        echo "<td>";
        echo $row['UBICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_REMITENTE'];
        echo "</td>";
        echo "<td>";
        echo $row['RESPONSABLE'];
        echo "</td>";
        echo "<td>";
        echo $row['DIAS'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "<td>";
        echo $row['PRIORIDAD'];
        echo "</td>";
        echo "<td>";
        echo $row['DETALLE'];
        echo "</td>";
        echo "<td>";
        echo $row['DESCRIPCION'];
        echo "</td>";
        echo "<td>";
        echo $row['DESCRIPCION_CIERRE'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>