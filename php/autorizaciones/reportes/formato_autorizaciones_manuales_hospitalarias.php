<?php
require_once('../../../php/config/dbcon_prod.php');header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reportes_autorizaciones_manuales_hospitalarias.txt"');
$vpempresa = 1;
$vpanno = $_GET['vpanno'];
$vpnumero = $_GET['vpnumero']; 
$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT.P_REPORTE_AUT_MANUAL_HOSPI(:v_pempresa,
                                                                           :v_panno,
                                                                           :v_pnumero,
                                                                           :v_pjson_row_out,
                                                                           :v_result); end;');
oci_bind_by_name($consulta, ':v_pempresa', $vpempresa);
oci_bind_by_name($consulta, ':v_panno', $vpanno);
oci_bind_by_name($consulta, ':v_pnumero', $vpnumero);
oci_bind_by_name($consulta, ':v_pjson_row_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$rows = array();
echo              
'AUTC_UBICACION_SOLICITUD'.'|'.
'AUTF_SOLICITUD_REAL'.'|'.
'AUTF_ORDEN'.'|'.
'AUTF_CONFIRMADO'.'|'.
'NOMBRE_TERCERO'.'|'.
'AUTN_NUMERO'.'|'.
'AUTN_UBICACION'.'|'.
'AUTN_TIPO_SERVICIO'.'|'.
'DEPARTAMENTO'.'|'.
'AUDC_PRODUCTO'.'|'.
'PROC_NOMBRE'.'|'.
'AUTC_TIPO_DOC_AFILIADO'.'|'.
'AUTC_AFILIADO'.'|'.
'AFIC_PRIMER_APELLIDO'.'|'.
'AFIC_SEGUNDO_APELLIDO'.'|'.
'AFIC_PRIMER_NOMBRE'.'|'.
'AFIC_SEGUNDO_NOMBRE'.'|'.
'TOTAL'.'|'.
'AUTC_ESTADO'.'|'.
'PORC_INTERNACION'.'|'.
'AUTC_SOLESOA'.'|'.
'AUTC_SOLUNICAHOSPITALARIA'.'|'.
'AUTC_ANTICIPO'.'|'.
'NOMBRE_RESPONSABLE';
echo "\n";
while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
$rows['AUTC_UBICACION_SOLICITUD'] . '|' .
$rows['AUTF_SOLICITUD_REAL'] . '|' .
$rows['AUTF_ORDEN'] . '|' .
$rows['AUTF_CONFIRMADO'] . '|' .
$rows['NOMBRE_TERCERO'] . '|' .
$rows['AUTN_NUMERO'] . '|' .
$rows['AUTN_UBICACION'] . '|' .
$rows['AUTN_TIPO_SERVICIO'] . '|' .
$rows['DEPARTAMENTO'] . '|' .
$rows['AUDC_PRODUCTO'] . '|' .
$rows['PROC_NOMBRE'] . '|' .
$rows['AUTC_TIPO_DOC_AFILIADO'] . '|' .
$rows['AUTC_AFILIADO'] . '|' .
$rows['AFIC_PRIMER_APELLIDO'] . '|' .
$rows['AFIC_SEGUNDO_APELLIDO'] . '|' .
$rows['AFIC_PRIMER_NOMBRE'] . '|' .
$rows['AFIC_SEGUNDO_NOMBRE'] . '|' . 
$rows['TOTAL'] . '|' . 
$rows['AUTC_ESTADO'] . '|' . 
$rows['PORC_INTERNACION'] . '|' . 
$rows['AUTC_SOLESOA'] . '|' . 
$rows['AUTC_SOLUNICAHOSPITALARIA'] . '|' . 
$rows['AUTC_ANTICIPO'] . '|' . 
$rows['NOMBRE_RESPONSABLE'] . '|' ."\n";
}
oci_close($c);
?>