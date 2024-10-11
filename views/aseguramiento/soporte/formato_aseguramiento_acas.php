<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Aseguramiento Acas ". date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>NOMBRE</th>
        <th>DOCUMENTO</th>
        <th>IDENTIFICACION</th>
        <th>NOMBRE_AUTORIZA</th>
        <th>UBICACION</th>
        <th>NUMERO</th>
        <th>ASUNTO</th>
        <th>DESC_ASUNTO</th>
        <th>FECHA_INGRESO</th>
        <th>FECHA_CIERRE</th>
        <th>DIAS</th>
        <th>ESTADO</th>
        <th>CIUDAD</th>
        <th>CONCEPTO</th>
        <th>SUBCONCEPTO</th>
        <th>DESCRIPCION</th>
        <th>DESCRIPCION_CIERRE</th>
        <th>CANTIDAD</th>
    </tr>
    <?php

    /* $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ASEG2.P_EXPORTAR_ACASXPERSONA(:v_json_row); end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);*/


    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ASEG2.P_EXPORTAR_ACASXPERSONA(:v_json_row); end;');
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_json_row", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {

        echo "<tr>";
        echo "<td>";
        echo $row['NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['DOCUMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['IDENTIFICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_AUTORIZA'];
        echo "</td>";
        echo "<td>";
        echo $row['UBICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['NUMERO'];
        echo "</td>";
        echo "<td>";
        echo $row['ASUNTO'];
        echo "</td>";
        echo "<td>";
        echo $row['DESC_ASUNTO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_INGRESO'];
        echo "</td>";
        echo "<td>";
        echo $row['FECHA_CIERRE'];
        echo "</td>";
        echo "<td>";
        echo $row['DIAS'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "<td>";
        echo $row['CIUDAD'];
        echo "</td>";
        echo "<td>";
        echo $row['CONCEPTO'];
        echo "</td>";
        echo "<td>";
        echo $row['SUBCONCEPTO'];
        echo "</td>";
        echo "<td>";
        echo $row['DESCRIPCION'];
        echo "</td>";
        echo "<td>";
        echo $row['DESCRIPCION_CIERRE'];
        echo "</td>";
        echo "<td>";
        echo $row['CANTIDAD'];
        echo "</td>";
        echo "</tr>";
    }
    /*foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";echo $row->nombre;echo "</td>";
        echo "<td>";echo $row->documento;echo "</td>";
        echo "<td>";echo $row->identificacion;echo "</td>";
        echo "<td>";echo $row->nombre_autoriza;echo "</td>";
        echo "<td>";echo $row->ubicacion;echo "</td>";
        echo "<td>";echo $row->numero;echo "</td>";
        echo "<td>";echo $row->estado;echo "</td>";
        echo "<td>";echo $row->asunto;echo "</td>";
        echo "<td>";echo $row->desc_asunto;echo "</td>";
        echo "<td>";echo $row->fecha_ingreso;echo "</td>";
        echo "<td>";echo $row->fecha_cierre;echo "</td>";
        echo "<td>";echo $row->dias;echo "</td>";
        echo "<td>";echo $row->ciudad;echo "</td>";
        echo "<td>";echo $row->concepto;echo "</td>";
        echo "<td>";echo $row->subconcepto;echo "</td>";
        echo "<td>";echo $row->descripcion;echo "</td>";
        echo "<td>";echo $row->cantidad;echo "</td>";
        echo "<td>";echo $row->descripcion_cierre;echo "</td>";
        echo "</tr>";
    }
*/
    oci_close($c);
    ?>
</table>