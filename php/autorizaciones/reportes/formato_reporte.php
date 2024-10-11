<?php
require_once('../../../php/config/dbcon_prod.php');header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="reportes_autorizaciones.txt"');
$vpempresa = 1;
$vpfinicial = $_GET['fecha_inicio'];
$vpffinal = $_GET['fecha_final']; 
$vpubicacion = $_GET['ubicacion']; 
$vpestado = $_GET['estado'];
$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT. P_REPORTE_PROG(:v_pubicacion,
                                                                    :v_pfinicial,
                                                                    :v_pffinal,
                                                                    :v_pestado,
                                                                    :v_pjson_row_out,
                                                                    :v_result); end;');
oci_bind_by_name($consulta, ':v_pubicacion', $vpubicacion);
oci_bind_by_name($consulta, ':v_pfinicial', $vpfinicial);
oci_bind_by_name($consulta, ':v_pffinal', $vpffinal);
oci_bind_by_name($consulta, ':v_pestado', $vpestado);
oci_bind_by_name($consulta, ':v_pjson_row_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$rows = array();
echo              
        'DOC_INTERNO'.'|'.
        'TIPO_DOCUMENTO_AFILIADO'.'|'.
        'DOCUMENTO_AFILIADO'.'|'.
        'AFIC_NOMBRE'.'|'.
        'AFIC_PORTABILIDAD'.'|'.
        'DEPARTAMENTO'.'|'.
        'MUNICIPIO'.'|'.
        'DIAGNOSTICO_PPAL'.'|'.
        'DIAC_NOMBRE'.'|'.
        'DIAGNOSTICO_SEC'.'|'.
        'DIAC_NOMBRE'.'|'.
        'COD_SERVICIO'.'|'.
        'CLAC_NOMBRE'.'|'.
        'FECHA_ORDEN'.'|'.
        'FECHA_ENTREGA'.'|'.
        'JUSTIFICACION'.'|'.
        'NIT'.'|'.
        'IPS'.'|'.
        'NIT_SOLICITANTE'.'|'.
        'IPS_SOLICITANTE'.'|'.
        'RESPONSABLE'.'|'.
        'FECHA_SOLITUD'.'|'.
        'CONTRATO_DOCUMENTO'.'|'.
        'CONTRATO_NUMERO'.'|'.
        'CONTRATO_UBICACION'.'|'.
        'MARCA'.'|'.
        'CORREO'.'|'.
        'CELULAR'.'|'.
        'AUTN_NUMERO'.'|'.
        'FECHA_CREACION'.'|'.
        'AUTN_NUMERO_CORREGIDO'.'|'.
        'STATUS'.'|'.
        'AUDITADA'.'|'.
        'PERTINENCIA'.'|'.
        'JUSTIFICACION_PERT'.'|'.
        'OBSERVACION'.'|'.
        'JUSTIFICACION_ANULACION'.'|'.
        'ESTADO'.'|'.
        'RADICADO_POR'.'|'.
        'NOMBRE_RADICADO_POR'.'|'.
        'APRODADO_POR'.'|'.
        'FECHA_APROBADO'.'|'.
        'PROCESADO_POR'.'|'.
        'FECHA_PROCESADO'.'|'.
        'ANULADO_POR'.'|'.
        'FECHA_ANULADO'.'|'.
        'ESTADO_LIBERADO'.'|'.
        'FECHA_PROGRAMACION'.'|'.
        'ORIGEN'.'|'.
        'DIRECCION_AFILIADO'.'|'.
        'FECHA_MARCACION'.'|'.
        'PRON_DIRECCION'.'|'.
        'TIPO_PROGRAMADA'.'|'.
        'FTP'.'|'.
        'ALTO_COSTO'.'|'.
        'NOMBRE_MEDICO'.'|'.
        'ESPECIALIDAD'.'|'.
        'VALOR_PRODUCTO'.'|'.
        'VALOR_TOTAL'.'|'.
        'REGIMEN'.'|'.
'ESTADO';
echo "\n";
while (($rows = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
  echo
  $rows['DOC_INTERNO'] . '|' .
  $rows['TIPO_DOCUMENTO_AFILIADO'] . '|' .
  $rows['DOCUMENTO_AFILIADO'] . '|' .
  $rows['AFIC_NOMBRE'] . '|' .
  $rows['AFIC_PORTABILIDAD'] . '|' .
  $rows['DEPARTAMENTO'] . '|' .
  $rows['MUNICIPIO'] . '|' . 
  $rows['DIAGNOSTICO_PPAL'] . '|' . 
  $rows['DIAC_NOMBRE'] . '|' . 
  $rows['DIAGNOSTICO_SEC'] . '|' .   
  $rows['DIAC_NOMBRE'] . '|' .   
  $rows['COD_SERVICIO'] . '|' . 
  $rows['CLAC_NOMBRE'] . '|' . 
  $rows['FECHA_ORDEN'] . '|' .
  $rows['FECHA_ENTREGA'] . '|' .
  $rows['JUSTIFICACION'] . '|' .
  $rows['NIT'] . '|' .
  $rows['IPS'] . '|' .
  $rows['NIT_SOLICITANTE'] . '|' .
  $rows['IPS_SOLICITANTE'] . '|' .
  $rows['RESPONSABLE'] . '|' .
  $rows['FECHA_SOLITUD'] . '|' .
  $rows['CONTRATO_DOCUMENTO'] . '|' .
  $rows['CONTRATO_NUMERO'] . '|' .
  $rows['CONTRATO_UBICACION'] . '|' .
  $rows['MARCA'] . '|' .
  $rows['CORREO'] . '|' .
  $rows['CELULAR'] . '|' .
  $rows['AUTN_NUMERO'] . '|' .
  $rows['FECHA_CREACION'] . '|' . 
  $rows['AUTN_NUMERO_CORREGIDO'] . '|' . 
  $rows['STATUS'] . '|' . 
  $rows['AUDITADA'] . '|' .   
  $rows['PERTINENCIA'] . '|' .   
  $rows['JUSTIFICACION_PERT'] . '|' . 
  $rows['OBSERVACION'] . '|' . 
  $rows['JUSTIFICACION_ANULACION'] . '|' .
  $rows['ESTADO'] . '|' .
  $rows['RADICADO_POR'] . '|' .
  $rows['NOMBRE_RADICADO_POR'] . '|' .
  $rows['APRODADO_POR'] . '|' .
  $rows['FECHA_APROBADO'] . '|' .
  $rows['PROCESADO_POR'] . '|' .
  $rows['FECHA_PROCESADO'] . '|' .
  $rows['ANULADO_POR'] . '|' .
  $rows['FECHA_ANULADO'] . '|' .
  $rows['ESTADO_LIBERADO'] . '|' .
  $rows['FECHA_PROGRAMACION'] . '|' .
  $rows['ORIGEN'] . '|' .
  $rows['DIRECCION_AFILIADO'] . '|' .
  $rows['FECHA_MARCACION'] . '|' .
  $rows['PRON_DIRECCION'] . '|' .
  $rows['TIPO_PROGRAMADA'] . '|' . 
  $rows['FTP'] . '|' . 
  $rows['ALTO_COSTO'] . '|' . 
  $rows['NOMBRE_MEDICO'] . '|' .   
  $rows['ESPECIALIDAD'] . '|' .   
  $rows['VALOR_PRODUCTO'] . '|' . 
  $rows['VALOR_TOTAL'] . '|' . 
  $rows['REGIMEN'] . '|' .
  $rows['ESTADO'] . '|' ."\n";
}
oci_close($c);
?>