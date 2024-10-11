<?php
require_once('../config/dbcon_prod.php');
//Si se comentas las dos filas del header se se descargara el archivo y sera visualizado por el navegador.
header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reporte capitas radicadas.txt"');
$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$nit = $_GET['nit'];
$consulta = oci_parse($c, 'begin pq_genesis_repo.p_archivo_capitas(:v_ptercero,:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado); end;');
oci_bind_by_name($consulta, ':v_ptercero', $nit);
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();
         echo 
          'FACC_DOCUMENTO'.'|'.
          'FACN_NUMERO'.'|'.
          'FACN_UBICACION'.'|'.
          'FACC_CONCEPTO'.'|'.
          'FACF_FECHA'.'|'.
          'F_RADICACION'.'|'.
          'FACF_CONFIRMACION'.'|'.
          'FACT_OBSERVACION'.'|'.
          'FACC_PREFIJO'.'|'.
          'FACC_FACTURA'.'|'.
          'FACN_FACTURA2'.'|'.
          'FACN_PLAN'.'|'.
          'MVCV_CUENTA'.'|'.
          'MVCC_NATURALEZA'.'|'.
          'MVCV_VALOR'.'|'.
          'MVCV_TERCERO'.'|'.
          'TERC_NOMBRE'.'|'.
          'MVCN_CENTRO_COSTO'.'|'.
          'FACN_PROYECTO'.'|'.
          'FACN_ANNO'.'|'.
          'FACN_PERIODO'.'|';
          echo "\n";
  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)

{
     echo $row['FACC_DOCUMENTO']. '|' .
          $row['FACN_NUMERO']. '|' .
          $row['FACN_UBICACION']. '|' .
          $row['FACC_CONCEPTO']. '|' .
          $row['FACF_FECHA']. '|' .
          $row['F_RADICACION']. '|' .
          $row['FACF_CONFIRMACION']. '|' .
          $row['FACT_OBSERVACION']. '|' .
          $row['FACC_PREFIJO']. '|' .
          $row['FACC_FACTURA']. '|' .
          $row['FACN_FACTURA2']. '|' .
          $row['FACN_PLAN']. '|' .
          $row['MVCV_CUENTA']. '|' .
          $row['MVCC_NATURALEZA']. '|' .
          $row['MVCV_VALOR']. '|' .
          $row['MVCV_TERCERO']. '|' .
          $row['TERC_NOMBRE']. '|' .
          $row['MVCN_CENTRO_COSTO']. '|' .
          $row['FACN_PROYECTO']. '|' .
          $row['FACN_ANNO']. '|' .
          $row['FACN_PERIODO']. '|' ."\n";
 }
oci_close($c);
