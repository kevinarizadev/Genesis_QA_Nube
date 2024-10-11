<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte casos en gestion"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
$fechainical = $_GET['fechainical'];
$fechafinal = $_GET['fechafinal'];
//var_dump($vpnumero);
//var_dump($vpmes);
?>
<h1>GESTION</h1>
<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th center>ID GESTION</th>
    <th center>ID SEGUIMIENTO</th>
    <th center>NUMERO DE SINIESTRO</th>
    <th center>TIPODOCUMENTO</th>
    <th center>NUMERO DOCUMENTO</th>
    <th center>NOMBRES</th>
    <th center>APELLIDOS</th>
    <th center>COD ESTADO AFILIACION</th>
    <th center>EDAD</th>
    <th center>SEXO</th>
    <th center>UBICACION</th>
    <th center>PORTABILIDAD</th>
    <th center>UBICACION PORTABILIDAD</th>
    <th center>DIRECCION</th>
    <th center>TELEFONO</th>
    <th center>CORREO ELECTRONICO</th>
    <th center>FECHA REGISTRO</th>
    <th center>FECHA LLAMADA EFECTIVA</th>
    <th center>ORIGEN</th>
    <th center>NUMERO INTENTO LLAMADAS</th>
    <th center>NUMERO INTENTO GESTIONES</th>
    <th center>ESTADO DE LA LLAMADA</th>
    <th center>GESTION</th>
    <th center>FECHA INICIO GESTION</th>
    <th center>FECHA ULTIMA GESTION</th>
    <th center>FECHA DIAGNOSTICO</th>
    <th center>CIE 10</th>
    <th center>CLASIFICACION PATOLOGIA</th>
    <th center>PATOLOGIAS ASOCIADAS</th>
    <th center>PLURIPATOLOGICO</th>
    <th center>EGPC CONCEPTO</th>
    <th center>CONC NOMBRE</th>
    <th center>FECHA REPROGRAMACION</th>
    <th center>TIPO REQ PENDIENTE</th>
    <th center>OBSERVACION</th>
    <th center>USUARIO INCIO</th>
    <th center>USUARIO FINAL</th>
  </tr>
  <?php
  $consulta = oci_parse($c, 'BEGIN OASIS.PQ_ST_SEGUIMIENTOTELEFONICO.P_EXCEL_GESTION(:V_PFECHA_1,:V_PFECHA_2,:V_RESPUESTA);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':V_PFECHA_1', $fechainical);
  oci_bind_by_name($consulta, ':V_PFECHA_2', $fechafinal);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':V_RESPUESTA', $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);
  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
    // var_dump(json_encode($row));
  {
    echo "<tr>";
    echo "<td center>";
    echo $row['ID_GESTION'];
    echo "</td>";
    echo "<td center>";
    echo $row['ID_SEGUIMIENTO'];
    echo "</td>";
    echo "<td center>";
    echo $row['NO_DE_SINIESTRO'];
    echo "</td>";
    echo "<td center>";
    echo $row['TIPODOCUMENTO'];
    echo "</td>";
    echo "<td center>";
    echo $row['NUMERO_DOCUMENTO'];
    echo "</td>";
    echo "<td center>";
    echo $row['NOMBRES'];
    echo "</td>";
    echo "<td center>";
    echo $row['APELLIDOS'];
    echo "</td>";
    echo "<td center>";
    echo $row['COD_ESTADO_AFILIACION'];
    echo "</td>";
    echo "<td center>";
    echo $row['EDAD'];
    echo "</td>";
    echo "<td center>";
    echo $row['SEXO'];
    echo "</td>";
    echo "<td center>";
    echo $row['UBICACION'];
    echo "</td>";
    echo "<td center>";
    echo $row['PORTABILIDAD'];
    echo "</td>";
    echo "<td center>";
    echo $row['UBICACION_PORTABILIDAD'];
    echo "</td>";
    echo "<td center>";
    echo $row['DIRECCION'];
    echo "</td>";
    echo "<td center>";
    echo $row['TELEFONO'];
    echo "</td>";
    echo "<td center>";
    echo $row['CORREO_ELECTRONICO'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_REGISTRO'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_LLAMADA_EFECTIVA'];
    echo "</td>";
    echo "<td center>";
    echo $row['ORIGEN'];
    echo "</td>";
    echo "<td center>";
    echo $row['NUMERO_INTENTO_LLAMADAS'];
    echo "</td>";
    echo "<td center>";
    echo $row['NUMERO_INTENTO_GESTIONES'];
    echo "</td>";
    echo "<td center>";
    echo $row['ESTADO_DE_LA_LLAMADA'];
    echo "</td>";
    echo "<td center>";
    echo $row['GESTION'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_INICIO_GESTION'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_ULTIMA_GESTION'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_DIAGNOSTICO'];
    echo "</td>";
    echo "<td center>";
    echo $row['CIE_10'];
    echo "</td>";
    echo "<td center>";
    echo $row['CLASIFICACION_PATOLOGIA'];
    echo "</td>";
    echo "<td center>";
    echo $row['PATOLOGIAS_ASOCIADAS'];
    echo "</td>";
    echo "<td center>";
    echo $row['PLURIPATOLOGICO'];
    echo "</td>";
    echo "<td center>";
    echo $row['EGPC_CONCEPTO'];
    echo "</td>";
    echo "<td center>";
    echo $row['CONC_NOMBRE'];
    echo "</td>";
    echo "<td center>";
    echo $row['FECHA_REPROGRAMACION'];
    echo "</td>";
    echo "<td center>";
    echo $row['TIPO_REQ_PENDIENTE'];
    echo "</td>";
    echo "<td center>";
    echo $row['OBSERVACION'];
    echo "</td>";
    echo "<td center>";
    echo $row['USUARIO_INCIO'];
    echo "</td>";
    echo "<td center>";
    echo $row['USUARIO_FINAL'];
    echo "</td>";
    echo "</tr>";
  }
  oci_close($c);

  ?>
