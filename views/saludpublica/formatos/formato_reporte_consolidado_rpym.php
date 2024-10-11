<?php
require('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte consolidado" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$vpanno = $_GET['anno_consolidado'];
$vpmes = $_GET['mes_consolidado'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th class="center">Año</th>
        <th class="center">Mes</th>
        <th class="center">Nit</th>
        <th class="center">Ips</th>
        <th class="center">Municipio</th>
        <th class="center">Departemento</th>
        <th class="center">Contrato</th>
        <th class="center">Regimen</th>
        <th class="center">Valor contrato</th>
        <th class="center">Valor a pagar</th>
        <th class="center">Valor a descontar</th>
    </tr>
    <?php

    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_consolidado(:v_panno,:v_pmes,:v_result,:v_json_row);end;');
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
        echo "<td>";echo $row['ANNO'];echo "</td>";
        echo "<td>";echo $row['MES'];echo "</td>";
        echo "<td>";echo $row['NIT'];echo "</td>";
        echo "<td>";echo $row['IPS'];echo "</td>";
        echo "<td>";echo $row['NOMBRE_MUNICIPIO'];echo "</td>";
        echo "<td>";echo $row['DEPARTAMENTO'];echo "</td>";
        echo "<td>";echo $row['NUM_CONTRATO'];echo "</td>";
        echo "<td>";echo $row['REGIMEN'];echo "</td>";
        echo "<td>";echo $row['VALOR_CONTRATO'];echo "</td>";
        echo "<td>";echo $row['VALOR_APAGAR'];echo "</td>";
        echo "<td>";echo $row['VALOR_DESCUENTO'];echo "</td>";
        echo "</tr>";
    }
   
    oci_close($c);
    ?>
</table>