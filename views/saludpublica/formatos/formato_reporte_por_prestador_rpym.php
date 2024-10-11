<?php
require('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte por prestador" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");



$vpnit = $_GET['nit_prestador'];
$vpvpregimen = $_GET['regimen_prestador'];
$vpanno = $_GET['anno_prestador'];
$vpmes = $_GET['mes_prestador'];
$vpcontrato = $_GET['contrato_prestador'];
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
    $consulta = oci_parse($c, 'BEGIN pq_salud_publica_estimaciones.p_obtener_resumen_detalle(:v_pnit,:v_pregimen,:v_panno,:v_pmes,:v_pcontrato,:v_json_row);end;');
	oci_bind_by_name($consulta, ':v_pnit', $vpnit);
	oci_bind_by_name($consulta, ':v_pregimen', $vpvpregimen);
	oci_bind_by_name($consulta, ':v_panno', $vpanno);
	oci_bind_by_name($consulta, ':v_pmes', $vpmes);
	oci_bind_by_name($consulta, ':v_pcontrato', $vpcontrato);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ":v_json_row",  $clob, -1, OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $datos = json_decode($clob->read($clob->size()));
    foreach ($datos as $dato) {
        echo "<tr>";
        ////////////
        echo "<td>";
        echo $dato->ANNO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->MES;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->IPS;
        echo "</td>";
         ////////////
        echo "<td>";
        echo $dato->NUM_CONTRATO;
        echo "</td>";
         ////////////
        echo "<td>";
        echo $dato->ACTIVIDAD;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->ESTIMACION_MES;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CANTIDAD_EJECUTADA;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->PORCENTAJE_EJECUCION;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->VALOR_ACTIVIDAD;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->VALOR_A_PAGAR;
        echo "</td>";
    }

    // oci_close($c);
    // while (($row = oci_fetch_array($clob, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    //     echo "<tr>";
    //     echo "<td>";
    //     echo $row['ANNO'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['MES'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['IPS'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['NUM_CONTRATO'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['ACTIVIDAD'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['ESTIMACION_MES'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['CANTIDAD_EJECUTADA'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['PORCENTAJE_EJECUCION'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['VALOR_ACTIVIDAD'];
    //     echo "</td>";
    //     echo "<td>";
    //     echo $row['VALOR_A_PAGAR'];
    //     echo "</td>";
    //     echo "</tr>";
    // }

    oci_close($c);
    ?>
</table>