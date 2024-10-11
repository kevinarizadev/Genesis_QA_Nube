<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de pacientes cargados en malla sin soporte" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>Tipo_Doc</th>
        <th>Documento</th>
        <th>Nombre completo</th>
        <th>Gnero</th>
        <th>Regimen</th>
    </tr>
    <?php
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin oasis.pq_genesis_gestion_riesgo_erc.p_auditoria_soporte(:v_pdata);end;');;
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_pdata", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['TIPO_DOC'];
        echo "</td>";
        echo "<td>";
        echo $row['DOCUMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['P_NOMBRE']; $row['S_NOMBRE'];$row['P_APELLIDO']; $row['S_APELLIDO'];
        echo "</td>";
        echo "<td>";
        echo $row['GENERO'];
        echo "</td>";
        echo "<td>";
        echo $row['REGIMEN'];
        echo "</td>";
        echo "</tr>";
    }
    oci_close($c);
    ?>
</table>