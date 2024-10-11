<?php
require_once('../../../php/config/dbcon_prod.php');
//setlocale(LC_ALL,"en_US.UTF-8", "es_ES","esp");
//header("Content-Type: text/html; charset=UTF-8");
header('Content-Disposition: attachment; filename="reporte consolidado.txt"');

$F_de_Exportacion = $_GET['F_de_Exportacion'];

$consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_descargar_soporte_cac(:v_pfecha_corte,:v_pdata);end;');
oci_bind_by_name($consulta, ':v_pfecha_corte', $F_de_Exportacion);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_pdata", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);
$row = array();
while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {

  echo
    $row['EGRC_VAR1'] ."\t".
    $row['EGRC_VAR2'] . "\t" .
    $row['EGRC_VAR3'] . "\t" .
    $row['EGRC_VAR4'] . "\t" .
    $row['EGRC_VAR5'] . "\t" .
    $row['EGRC_VAR6'] . "\t" .
    $row['EGRF_VAR7'] . "\t" .
    $row['EGRC_VAR8'] . "\t" .
    $row['EGRC_VAR9'] . "\t" .
    $row['EGRC_VAR10'] . "\t" .
    $row['EGRN_VAR11'] . "\t" .
    $row['EGRN_VAR12'] . "\t" .
    $row['EGRC_VAR13'] . "\t" .
    $row['EGRC_VAR14'] . "\t" .
    $row['EGRF_VAR15'] . "\t" .
    $row['EGRC_VAR16'] . "\t" .
    $row['EGRF_VAR17'] . "\t" .
    $row['EGRN_VAR18'] . "\t" .
    $row['EGRF_VAR19'] . "\t" .
    $row['EGRN_VAR19_1'] . "\t" .
    $row['EGRN_VAR20'] . "\t" .
    $row['EGRF_VAR21'] . "\t" .
    $row['EGRN_VAR21_1'] . "\t" .
    $row['EGRN_VAR22'] . "\t" .
    $row['EGRN_VAR23'] . "\t" .
    $row['EGRN_VAR24'] . "\t" .
    $row['EGRN_VAR25'] . "\t" .
    $row['EGRN_VAR26'] . "\t" .
    $row['EGRN_VAR27'] . "\t" .
    $row['EGRN_VAR27_1'] . "\t" .
    $row['EGRN_VAR28'] . "\t" .
    $row['EGRF_VAR28_1'] . "\t" .
    $row['EGRN_VAR29'] . "\t" .
    $row['EGRF_VAR29_1'] . "\t" .
    $row['EGRN_VAR30'] . "\t" .
    $row['EGRF_VAR30_1'] . "\t" .
    $row['EGRN_VAR31'] . "\t" .
    $row['EGRF_VAR31_1'] . "\t" .
    $row['EGRN_VAR32'] . "\t" .
    $row['EGRF_VAR32_1'] . "\t" .
    $row['EGRN_VAR33'] . "\t" .
    $row['EGRF_VAR33_1'] . "\t" .
    $row['EGRN_VAR34'] . "\t" .
    $row['EGRF_VAR34_1'] . "\t" .
    $row['EGRN_VAR35'] . "\t" .
    $row['EGRN_VAR36'] . "\t" .
    $row['EGRN_VAR37'] . "\t" .
    $row['EGRN_VAR38'] . "\t" .
    $row['EGRN_VAR39'] . "\t" .
    $row['EGRF_VAR40'] . "\t" .
    $row['EGRN_VAR41'] . "\t" .
    $row['EGRN_VAR42'] . "\t" .
    $row['EGRN_VAR43'] . "\t" .
    $row['EGRF_VAR44'] . "\t" .
    $row['EGRF_VAR45'] . "\t" .
    $row['EGRN_VAR46'] . "\t" .
    $row['EGRN_VAR47'] . "\t" .
    $row['EGRN_VAR48'] . "\t" .
    $row['EGRN_VAR49'] . "\t" .
    $row['EGRN_VAR50'] . "\t" .
    $row['EGRN_VAR51'] . "\t" .
    $row['EGRN_VAR52'] . "\t" .
    $row['EGRN_VAR53'] . "\t" .
    $row['EGRN_VAR54'] . "\t" .
    $row['EGRF_VAR55'] . "\t" .
    $row['EGRF_VAR56'] . "\t" .
    $row['EGRN_VAR57'] . "\t" .
    $row['EGRN_VAR58'] . "\t" .
    $row['EGRN_VAR59'] . "\t" .
    $row['EGRN_VAR60'] . "\t" .
    $row['EGRN_VAR61'] . "\t" .
    $row['EGRN_VAR62'] . "\t" .
    $row['EGRN_VAR62_1'] . "\t" .
    $row['EGRN_VAR62_2'] . "\t" .
    $row['EGRN_VAR62_3'] . "\t" .
    $row['EGRN_VAR62_4'] . "\t" .
    $row['EGRN_VAR62_5'] . "\t" .
    $row['EGRN_VAR62_6'] . "\t" .
    $row['EGRN_VAR62_7'] . "\t" .
    $row['EGRN_VAR62_8'] . "\t" .
    $row['EGRN_VAR62_9'] . "\t" .
    $row['EGRN_VAR62_10'] . "\t" .
    $row['EGRN_VAR62_11'] . "\t" .
    $row['EGRF_VAR63'] . "\t" .
    $row['EGRC_VAR63_1'] . "\t" .
    $row['EGRN_VAR64'] . "\t" .
    $row['EGRC_VAR65'] . "\t" .
    $row['EGRC_VAR66'] . "\t" .
    $row['EGRN_VAR67'] . "\t" .
    $row['EGRN_VAR68'] . "\t" .
    $row['EGRN_VAR69'] . "\t" .
    $row['EGRF_VAR69_1'] . "\t" .
    $row['EGRF_VAR69_2'] . "\t" .
    $row['EGRF_VAR69_3'] . "\t" .
    $row['EGRF_VAR69_4'] . "\t" .
    $row['EGRF_VAR69_5'] . "\t" .
    $row['EGRF_VAR69_6'] . "\t" .
    $row['EGRF_VAR69_7'] . "\t" .
    $row['EGRN_VAR70'] . "\t" .
    $row['EGRN_VAR70_1'] . "\t" .
    $row['EGRN_VAR70_2'] . "\t" .
    $row['EGRN_VAR70_3'] . "\t" .
    $row['EGRN_VAR70_4'] . "\t" .
    $row['EGRN_VAR70_5'] . "\t" .
    $row['EGRN_VAR70_6'] . "\t" .
    $row['EGRC_VAR70_7'] . "\t" .
    $row['EGRC_VAR70_8'] . "\t" .
    $row['EGRC_VAR70_9'] . "\t" .
    $row['EGRN_VAR71'] . "\t" .
    $row['EGRF_VAR72'] . "\t" .
    $row['EGRF_VAR73'] . "\t" .
    $row['EGRN_VAR74'] . "\t" .
    $row['EGRN_VAR75'] . "\t" .
    $row['EGRN_VAR76'] . "\t" .
    $row['EGRN_VAR77'] . "\t" .
    $row['EGRC_VAR78'] . "\t" .
    $row['EGRN_VAR79'] . "\t" .
    $row['EGRN_VAR80'] . "\t" .
    $row['EGRF_VAR80_1'] . "\t" .
    $row['EGRN_VAR81'] . "\t" .
    $row['EGRF_VAR82'] . "\n" ;
    //$row['EGRF_REPS'] . "\t" .
    //$row['EGRF_ULTIMO_CARGUE'] . "\n";
}
oci_close($c);
