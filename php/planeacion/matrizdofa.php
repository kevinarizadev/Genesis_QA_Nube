<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_ui_dofa(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $cedula = $request->cedula;
    $datos = $request->datos;
    $cantidad = $request->cantidad;
    $ruta = $request->ruta;
    $consulta = oci_parse($c,'begin oasis.PQ_GENESIS_ENCUESTA.p_ui_dofa(:v_pdocumento,:v_json_preguntas,:v_pcantidad_respuestas,:v_pruta,:v_json_row); end;');
    oci_bind_by_name($consulta,':v_pdocumento', $request->cedula);
    oci_bind_by_name($consulta,':v_json_preguntas', $request->datos);
    oci_bind_by_name($consulta,':v_pcantidad_respuestas', $request->cantidad);
    oci_bind_by_name($consulta,':v_pruta', $request->ruta);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
    }else{
        echo 0;
    }
    oci_close($c);

}

function generarbase(){
require('../sftp_cloud/UploadFile.php');
global $request;
$archivo = $request->base64;
$path = 'Direccion/MatrizDOFA/' . date('dmY');
$hoy = date('dmY_His');
$name = $request->codigoDofa .  '_' . $hoy . '.pdf';
list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
$base64 = base64_decode($archivo); // Proceso para traer el Base64
file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
$subio = UploadFile($path, $name);
echo $subio;
}


?>