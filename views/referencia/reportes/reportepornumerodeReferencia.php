<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE POR NUMERO DE REFERENCIA"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$vpnumero = $_GET['numeroReferencia'];
//var_dump($vpnumero);
//var_dump($vpmes);
?>
<h1>REPORTE REFERENCIA</h1>
<table cellspacing="0" cellpadding="0" border="1" align="center">
  <tr>
    <th>NUMERO</th>
    <th>RESPONSABLE_ACEPTACION</th>
    <th>FECHA</th>
    <th>TIPO_DOC</th>
    <th>NRO_DOC</th>
    <th>AFIC_PRIMER_APELLIDO</th>
    <th>AFIC_SEGUNDO_APELLIDO</th>
    <th>AFIC_PRIMER_NOMBRE</th>
    <th>AFIC_SEGUNDO_NOMBRE</th>
    <th>DEPARTAMENTO</th>
    <th>NOMBRE_MUNICIPIO</th>
    <th>EDAD</th>
    <th>SERVICIO</th>
    <th>NOMBRE_DX</th>
    <th>NOMBRE_DX</th>
    <th>MOTIVO_DE_REMISION</th>
    <th>NIT_SOLICITANTE</th>
    <th>DIGITO_VER</th>
    <th>HABILITACION</th>
    <th>IPS_REMISORA</th>
    <th>REGIONAL</th>
    <th>NIT_RECEPTORA</th>
    <th>IPS_RECEPTORA</th>
    <th>FECHA_DE_ACEPTACION</th>
    <th>HORA</th>
    <th>EMPRESATRASLADO</th>
    <th>NIT_DE_LA_EMPRESA_DE_TRASLADO</th>
    <th>TIPO_DE_TRASLADO</th>
    <th>TIPO_DE_RECORRIDO</th>
    <th>PROFESIONAL</th>
    <th>REMISION_EFECTIVAS</th>
    <th>SEXO</th>
    <th>NACIMIENTO</th>
    <th>FECHA_RECEPCION</th>
    <th>ESTATUS</th>
    <th>AFIC_REGIMEN</th>
    <th>FECHA_GESTION</th>
    <th>HORA_GESTION</th>
    <th>IPS_RECEPTORA</th>
    <th>TERC_NOMBRE</th>
    <th>MODC_NOMBRE</th>
    <th>MOTIVO_CANCELACION</th>
    <th>HORA_GESTION</th>
    <th>FECHA_GESTION</th>
    <th>HORA_GESTION</th>
    <th>TIPO_GESTION</th>
    <th>OBSERVACION</th>
    <th>RENGLON</th>
  </tr>
  <?php
  $consulta = oci_parse($c, 'begin oasis.pq_genesis_referencia.p_reporte_referencia(:v_pnumero,:v_response); end;');
  oci_bind_by_name($consulta, ':v_pnumero',$vpnumero);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_response", $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);

  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
  //var_dump($row);
  {

    echo "<tr>";
    echo "<td>";
    echo $row['NUMERO'];
    echo "</td>";
    echo "<td>";
    echo $row['RESPONSABLE_ACEPTACION'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_DOC'];
    echo "</td>";
    echo "<td>";
    echo $row['NRO_DOC'];
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
    echo $row['DEPARTAMENTO'];
    echo "</td>";
    echo "<td>";
    echo $row['NOMBRE_MUNICIPIO'];
    echo "</td>";
    echo "<td>";
    echo $row['EDAD'];
    echo "</td>";
    echo "<td>";
    echo $row['SERVICIO'];
    echo "</td>";
    echo "<td>";
    echo $row['NOMBRE_DX'];
    echo "</td>";
    echo "<td>";
    echo $row['NOMBRE_DX'];
    echo "</td>";
    echo "<td>";
    echo $row['MOTIVO_DE_REMISION'];
    echo "</td>";
    echo "<td>";
    echo $row['NIT_SOLICITANTE'];
    echo "</td>";
    echo "<td>";
    echo $row['DIGITO_VER'];
    echo "</td>";
    echo "<td>";
    echo $row['HABILITACION'];
    echo "</td>";
    echo "<td>";
    echo $row['IPS_REMISORA'];
    echo "</td>";
    echo "<td>";
    echo $row['REGIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['NIT_RECEPTORA'];
    echo "</td>";
    echo "<td>";
    echo $row['IPS_RECEPTORA'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_DE_ACEPTACION'];
    echo "</td>";
    echo "<td>";
    echo $row['HORA'];
    echo "</td>";
    echo "<td>";
    echo $row['EMPRESATRASLADO'];
    echo "</td>";
    echo "<td>";
    echo $row['NIT_DE_LA_EMPRESA_DE_TRASLADO'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_DE_TRASLADO'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_DE_RECORRIDO'];
    echo "</td>";
    echo "<td>";
    echo $row['PROFESIONAL'];
    echo "</td>";
    echo "<td>";
    echo $row['REMISION_EFECTIVAS'];
    echo "</td>";
    echo "<td>";
    echo $row['SEXO'];
    echo "</td>";
    echo "<td>";
    echo $row['NACIMIENTO'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_RECEPCION'];
    echo "</td>";
    echo "<td>";
    echo $row['ESTATUS'];
    echo "</td>";
    echo "<td>";
    echo $row['AFIC_REGIMEN'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['HORA_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['IPS_RECEPTORA'];
    echo "</td>";
    echo "<td>";
    echo $row['TERC_NOMBRE'];
    echo "</td>";
    echo "<td>";
    echo $row['MODC_NOMBRE'];
    echo "</td>";
    echo "<td>";
    echo $row['MOTIVO_CANCELACION'];
    echo "</td>";
    echo "<td>";
    echo $row['HORA_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['FECHA_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['HORA_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['TIPO_GESTION'];
    echo "</td>";
    echo "<td>";
    echo $row['OBSERVACION'];
    echo "</td>";
    echo "<td>";
    echo $row['RENGLON'];
    echo "</td>";
    echo "</tr>";
  }
  oci_close($c);

  ?>