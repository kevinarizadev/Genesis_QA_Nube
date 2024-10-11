<?php
require_once('../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte supervision de contrato" . "_" . date("dmY") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$fechainicio = $_GET['fecha_inicio'];
$fechafinal = $_GET['fecha_final'];
//var_dump($fechainicio);
//var_dump($fechafinal);
?>
<h1>REPORTE SUPERVISION DE CONTRATO</h1>
<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>DEPARTAMENTO </th>
    <th>NOMBRE_MUNICIPIO</th>
    <th>UBICACION </th>
    <th>NIT </th>
    <th>IPS </th>
    <th>NUMERO </th>
    <th>UBICACION </th>
    <th>RENGLON </th>
    <th>PROCESO_1 </th>
    <th>PROCESO_2 </th>
    <th>PROCESO_3 </th>
    <th>PROCESO_4 </th>
    <th>PROCESO_5 </th>
    <th>PROCESO_6 </th>
    <th>PROCESO_7 </th>
    <th>TOTAL </th>
    <th>CALIFICACION</th>
  </tr>
  <?php
  $consulta = oci_parse($c, 'BEGIN pq_genesis_supervision.p_obtener_reporte_supervision(:v_pinicial,:v_pfinal,:v_json_row); end;');
  oci_bind_by_name($consulta, ':v_pinicial', $fechainicio);
  oci_bind_by_name($consulta, ':v_pfinal', $fechafinal);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  $datos = json_decode($json);
  foreach ($datos as $row) {
    //while (($row = oci_fetch_array($clob, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
    //var_dump($row); 
    echo "<tr>";
    echo "<td>";
    echo $row->DEPARTAMENTO;
    echo "</td>";
    echo "<td>";
    echo $row->NOMBRE_MUNICIPIO;
    echo "</td>";
    echo "<td>";
    echo $row->UBICACION;
    echo "</td>";
    echo "<td>";
    echo $row->NIT;
    echo "</td>";
    echo "<td>";
    echo $row->IPS;
    echo "</td>";
    echo "<td>";
    echo $row->NUMERO;
    echo "</td>";
    echo "<td>";
    echo $row->UBICACION;
    echo "</td>";
    echo "<td>";
    echo $row->RENGLON;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_1;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_2;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_3;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_4;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_5;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_6;
    echo "</td>";
    echo "<td>";
    echo $row->PROCESO_7;
    echo "</td>";
    echo "<td>";
    echo $row->TOTAL;
    echo "</td>";
    echo "<td>";
    echo $row->CALIFICACION;
    echo "</td>";
    echo "</tr>";
  }
  oci_close($c);
  ?>
</table>