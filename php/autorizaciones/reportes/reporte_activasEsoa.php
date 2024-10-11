<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte de solicitudes activas ESOA" . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>
<h1>REPORTE DE SOLICITUDES ACTIVAS ESOA    </h1>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>SOAC_ESTADO</th>
        <th>SOAF_FECHA</th>
        <th>TERC_NOMBRE</th>
        <th>SOAN_NUMERO</th>
        <th>SOAN_UBICACION</th>
        <th>DEPARTAMENTO</th>
        <th>SADC_PRODUCTO</th>
        <th>PROC_NOMBRE</th>
        <th>SOAC_TIPO_DOC_AFILIADO</th>
        <th>SOAC_AFILIADO</th>
        <th>AFIC_PRIMER_NOMBRE</th>
        <th>AFIC_SEGUNDO_NOMBRE</th>
        <th>AFIC_PRIMER_APELLIDO</th>
        <th>AFIC_SEGUNDO_APELLIDO</th>
        <th>VALOR</th>
    </tr>
    <?php
   $empresa = 1;
   $cursor = oci_new_cursor($c);
   $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT.P_REPORTE_SOLICITUDES_ACTIVAS_ESOA(:v_pempresa,:v_pjson_row_out,:v_result);end;');
   $clob = oci_new_descriptor($c, OCI_D_LOB);
   oci_bind_by_name($consulta, ':v_pempresa', $empresa);
   $cursor = oci_new_cursor($c);
   oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
   oci_bind_by_name($consulta, ':v_pjson_row_out', $json, 4000);
   oci_execute($consulta);
   oci_execute($cursor, OCI_DEFAULT);
    while (($row = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
    //var_dump($row);
    {
  echo "<tr>";
  echo "<td>";
  echo $row['SOAC_ESTADO'];
  echo "</td>";
  echo "<td>";
  echo $row['SOAF_FECHA'];
  echo "</td>";
  echo "<td>";
  echo $row['TERC_NOMBRE'];
  echo "</td>";
  echo "<td>";
  echo $row['SOAN_NUMERO'];
  echo "</td>";
  echo "<td>";
  echo $row['SOAN_UBICACION'];
  echo "</td>";
  echo "<td>";
  echo $row['DEPARTAMENTO'];
  echo "</td>";
  echo "<td>";
  echo $row['SADC_PRODUCTO'];
  echo "</td>";
  echo "<td>";
  echo $row['PROC_NOMBRE'];
  echo "</td>";
  echo "<td>";
  echo $row['SOAC_TIPO_DOC_AFILIADO'];
  echo "</td>";
  echo "<td>";
  echo $row['SOAC_AFILIADO'];
  echo "</td>";
  echo "<td>";
  echo $row['AFIC_PRIMER_NOMBRE'];
  echo "</td>";
  echo "<td>";
  echo $row['AFIC_SEGUNDO_NOMBRE'];
  echo "</td>";
  echo "<td>";
  echo $row['AFIC_PRIMER_APELLIDO'];
  echo "</td>";
  echo "<td>";
  echo $row['AFIC_SEGUNDO_APELLIDO'];
  echo "</td>";
  echo "<td>";
  echo $row['VALOR'];
  echo "</td>";
  echo "</tr>";
    }
    oci_close($c);
    ?>
</table>