<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon.php');
// Propiedades del documentos para que la tabla sea descargadad

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_AUTORIZACIONES_POR_IPS"."_".date("d-m-Y").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$nitips = $_GET['nitips'];
$fechainicio = $_GET['fechainicio'];
$fechafin = $_GET['fechafin'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
  <th>AUTN_AUTORIZACION_MANUAL</th>
  <th>AUTC_DOCUMENTO</th>
  <th>AUTN_UBICACION</th>
  <th>AUTV_PROVEEDOR</th>
  <th>TERC_NOMBRE</th>
  <th>AFIC_DOCUMENTO</th>
  <th>AFIC_NOMBRE</th>
  <th>DEPARTAMENTO</th>
  <th>NOMBRE_MUNICIPIO</th>
  <th>AUTN_CLASIFICACION</th>
  <th>CLAC_NOMBRE</th>
  <th>PROCESADO</th>
  <th>AFIC_CELULAR</th>
  <th>AFIC_TELEFONO</th>
  <th>AUTF_PSS_IPS</th>
  </tr>

  <?php

  global $request;
  $consulta = oci_parse($c, 'begin PQ_AUT_PRESTACION.p_consulta_prestacion(:v_pips,:v_pfecha_inicial,:v_pfecha_final,:v_response); end;');
  oci_bind_by_name($consulta, ':v_pips', $nitips);
  oci_bind_by_name($consulta, ':v_pfecha_inicial', $fechainicio);
  oci_bind_by_name($consulta, ':v_pfecha_final', $fechafin);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
    echo "<tr>";
    echo "<td>";echo $row['AUTN_AUTORIZACION_MANUAL'];echo "</td>";
    echo "<td>";echo $row['AUTC_DOCUMENTO'];echo "</td>";
    echo "<td>";echo $row['AUTN_UBICACION'];echo "</td>";
    echo "<td>";echo $row['AUTV_PROVEEDOR'];echo "</td>";
    echo "<td>";echo $row['TERC_NOMBRE'];echo "</td>";
    echo "<td>";echo $row['AFIC_DOCUMENTO'];echo "</td>";
    echo "<td>";echo $row['AFIC_NOMBRE'];echo "</td>";
    echo "<td>";echo $row['DEPARTAMENTO'];echo "</td>";
    echo "<td>";echo $row['NOMBRE_MUNICIPIO'];echo "</td>";
    echo "<td>";echo $row['AUTN_CLASIFICACION'];echo "</td>";
    echo "<td>";echo $row['CLAC_NOMBRE'];echo "</td>";
    echo "<td>";echo $row['PROCESADO'];echo "</td>";
    echo "<td>";echo $row['AFIC_CELULAR'];echo "</td>";
    echo "<td>";echo $row['AFIC_TELEFONO'];echo "</td>";
    echo "<td>";echo $row['AUTF_PSS_IPS'];echo "</td>";
    echo "</tr>";
  }

  oci_close($c);
  ?>
</table>
