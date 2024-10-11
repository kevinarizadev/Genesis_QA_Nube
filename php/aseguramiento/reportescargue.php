<?php
require_once('../config/dbcon_prod.php');
header("Content-Type: text/plain");
header("Content-Disposition: attachment; filename=Reporte Gestion Cargue"."_".date("dmY").".txt");

$v_pinicial = $_GET['v_pinicial'];
$v_pfinal = $_GET['v_pfinal'];


       $consulta = oci_parse ($c,"SELECT N.NOVF_FECHA AS FECHA_NOVEDAD,
                                   T.TERC_NOMBRE AS RESPONSABLE,
                                   E.AFIC_TIPO_DOCUMENTO AS TIPODOCUMENTO,
                                   E.AFIC_DOCUMENTO AS DOCUMENTO_AFILIADO,
                                   E.AFIC_PRIMER_APELLIDO AS PRIMER_APELLIDO,
                                   E.AFIC_SEGUNDO_APELLIDO AS SEGUNDO_APELLIDO,
                                   E.AFIC_PRIMER_NOMBRE AS PRIMER_NOMBRE,
                                   E.AFIC_SEGUNDO_NOMBRE AS SEGUNDO_NOMBRE,
                                   E.AFIF_NACIMIENTO AS NACIMIENTO,
                                   CASE E.AFIC_SEXO WHEN 'F' THEN 'FEMENINO' WHEN 'M' THEN 'MASCULINO' END SEXO,
                                   'DIR' NOVEDAD,
                                   N.NOVC_CAMPO1_ANTERIOR AS DIRECCION_ANTERIOR,
                                   N.NOVC_CAMPO2_ANTERIOR AS LOCALIDAD_ANTERIOR,
                                   N.NOVC_CAMPO3_ANTERIOR AS TELEFONO_ANTERIOR,
                                   N.NOVC_CAMPO4_ANTERIOR AS CELULAR_ANTERIOR,
                                   N.NOVC_CAMPO5_ANTERIOR AS CELULAR2_ANTERIOR,
                                   N.NOVC_CAMPO6_ANTERIOR AS CORREO_ANTERIOR,
                                   N.NOVC_CAMPO1_NUEVO AS DIRECCION_NUEVO,
                                   N.NOVC_CAMPO2_NUEVO AS LOCALIDAD_NUEVO,
                                   N.NOVC_CAMPO3_NUEVO AS TELEFONO_NUEVO,
                                   N.NOVC_CAMPO4_NUEVO AS CELULAR_NUEVO,
                                   N.NOVC_CAMPO5_NUEVO AS CELULAR2_NUEVO,
                                   N.NOVC_CAMPO6_NUEVO AS CORREO_NUEVO,
                                   UB.UBGC_NOMBRE AS UBICACION,
                                   N.NOVT_OBSERVACION AS OBSERVACION
                                   FROM oasis.ENOV_NOVEDAD N
                                   INNER JOIN oasis.EAFI_AFILIADO E ON E.AFIC_TIPO_DOCUMENTO = N.NOVC_TIPO_DOC_AFILIADO AND E.AFIC_DOCUMENTO = N.NOVC_AFILIADO
                                   INNER JOIN oasis.BTER_TERCERO T ON T.TERV_CODIGO = N.NOVV_RESPONSABLE
                                   INNER JOIN oasis.BUBG_UBICACION_GEOGRAFICA UB ON UB.UBGN_CODIGO = N.NOVN_UBICACION
                                   WHERE N.NOVN_EMPRESA = 1
                                   AND N.NOVC_DOCUMENTO = 'NS'
                                   AND N.NOVC_CONCEPTO = 'DIR'
                                   AND N.NOVC_ESTADO = 'P'
                                   AND ((N.NOVF_FECHA BETWEEN &v_pinicial AND &v_pfinal)
                                   -- OR (&v_inicial = '01/01/1500' AND &v_final = '01/01/1500')
                                    )
                                  -- AND (((N.NOVV_RESPONSABLE = &v_res) OR (&v_res = '0')))
                                   AND ((N.NOVN_UBICACION =(select oasis.f_obtener_cod_departamento(bter.tern_acceso) tern_acceso
                                                               from oasis.bter_tercero bter where bter.terv_codigo in( select susu.USUV_TERCERO 
                                                                                                                       from  oasis.susu_usuario susu 
                                                                                                                       where upper(susu.USUC_CODIGO) =upper(user))
                                                        )
                                   )
                                   )

                                   ORDER BY N.NOVF_FECHA,E.AFIC_TIPO_DOCUMENTO,E.AFIC_DOCUMENTO");


oci_bind_by_name($consulta,':v_pinicial',$v_pinicial);
oci_bind_by_name($consulta,':v_pfinal',$v_pfinal);


oci_execute($consulta);
$row = array();
              echo   'FECHA_NOVEDAD'.'|'.
                     'RESPONSABLE'.'|'.
                     'TIPODOCUMENTO'.'|'.
                     'DOCUMENTO_AFILIADO'.'|'.
                     'PRIMER_APELLIDO'.'|'.
                     'SEGUNDO_APELLIDO'.'|'.
                     'PRIMER_NOMBRE'.'|'.
                     'SEGUNDO_NOMBRE'.'|'.
                     'NACIMIENTO'.'|'.
                     'NOVEDAD'.'|'.
                     'DIRECCION_ANTERIOR'.'|'.
                     'LOCALIDAD_ANTERIOR'.'|'.
                     'TELEFONO_ANTERIOR'.'|'.
                     'CELULAR_ANTERIOR'.'|'.
                     'CELULAR2_ANTERIOR'.'|'.
                     'CORREO_ANTERIOR'.'|'.
                     'DIRECCION_NUEVO'.'|'.
                     'LOCALIDAD_NUEVO'.'|'.
                     'TELEFONO_NUEVO'.'|'.
                     'CELULAR_NUEVO'.'|'.
                     'CELULAR2_NUEVO'.'|'.
                     'CORREO_NUEVO'.'|'.
                     'UBICACION'.'|'.
                     'OBSERVACION';
;
echo "\n";
while( $rows = oci_fetch_assoc($consulta))
{
                echo   $rows['FECHA_NOVEDAD']. '|' .
                      $rows['RESPONSABLE']. '|' .
                      $rows['TIPODOCUMENTO']. '|' .
                      $rows['DOCUMENTO_AFILIADO']. '|' .
                      $rows['PRIMER_APELLIDO']. '|' .
                      $rows['SEGUNDO_APELLIDO']. '|' .
                      $rows['PRIMER_NOMBRE']. '|' .
                      $rows['SEGUNDO_NOMBRE']. '|' .
                      $rows['NACIMIENTO']. '|' .
                      $rows['NOVEDAD']. '|' .
                      $rows['DIRECCION_ANTERIOR']. '|' .
                      $rows['LOCALIDAD_ANTERIOR']. '|' .
                      $rows['TELEFONO_ANTERIOR']. '|' .
                      $rows['CELULAR_ANTERIOR']. '|' .
                      $rows['CELULAR2_ANTERIOR']. '|' .
                      $rows['CORREO_ANTERIOR']. '|' .
                      $rows['DIRECCION_NUEVO']. '|' .
                      $rows['LOCALIDAD_NUEVO']. '|' .
                      $rows['TELEFONO_NUEVO']. '|' .
                      $rows['CELULAR_NUEVO']. '|' .
                      $rows['CELULAR2_NUEVO']. '|' .
                      $rows['CORREO_NUEVO']. '|' .
                      $rows['UBICACION']. '|' .
                      $rows['OBSERVACION']."\n";
}
oci_close($c);

?>















