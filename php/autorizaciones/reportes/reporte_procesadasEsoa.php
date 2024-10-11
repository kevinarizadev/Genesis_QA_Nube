<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte autorizaciones procesadas ESOA" . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$v_panno = $_GET['ann'];
$v_pnumero = $_GET['per'];
?>
<h1>REPORTE DE AUTORIZACIONES PROCESADAS ESOA</h1>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>AUTF_SOLICITUD_REAL</th>
        <th>AUTF_CONFIRMADO</th>
        <th>TERC_NOMBRE</th>
        <th>AUTN_NUMERO</th>
        <th>AUTN_UBICACION</th>
        <th>DEPARTAMENTO</th>
        <th>AUDC_PRODUCTO</th>
        <th>PROC_NOMBRE</th>
        <th>AUTC_TIPO_DOC_AFILIADO</th>
        <th>AUTC_AFILIADO</th>
        <th>AFIC_PRIMER_APELLIDO</th>
        <th>AFIC_SEGUNDO_APELLIDO</th>
        <th>AFIC_PRIMER_NOMBRE</th>
        <th>AFIC_SEGUNDO_NOMBRE</th>
        <th>VALOR</th>
        <th>AUTC_ESTADO</th>
    </tr>
    <?php
    $empresa = 1;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT.P_REPORTE_AUT_ACTIVAS_PROCESADAS(:v_pempresa,
                                                                        :v_panno,
                                                                        :v_pnumero,
                                                                        :v_pjson_row_out,
                                                                        :v_result); end;');
    oci_bind_by_name($consulta, ':v_pempresa', $empresa);
    oci_bind_by_name($consulta, ':v_panno', $v_panno);
    oci_bind_by_name($consulta, ':v_pnumero', $v_pnumero);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $json, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        //var_dump($row);
        echo "<tr>";
        echo "<td>";
        echo $row['AUTF_SOLICITUD_REAL'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTF_CONFIRMADO'];
        echo "</td>";
        echo "<td>";
        echo $row['TERC_NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTN_NUMERO'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTN_UBICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['DEPARTAMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['AUDC_PRODUCTO'];
        echo "</td>";
        echo "<td>";
        echo $row['PROC_NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTC_TIPO_DOC_AFILIADO'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTC_AFILIADO'];
        echo "</td>";
        echo "<td>";
        echo $row['AFIC_PRIMER_APELLIDO'];
        echo "</td>";
        echo "<td>";
        echo $row['AFIC_SEGUNDO_APELLIDO'];
        echo "</td>";
        echo "<td>";
        echo $row['AFIC_PRIMER_NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['AFIC_SEGUNDO_NOMBRE'];
        echo "</td>";
        echo "<td>";
        echo $row['VALOR'];
        echo "</td>";
        echo "<td>";
        echo $row['AUTC_ESTADO'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>