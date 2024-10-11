<?php
	$postdata = file_get_contents("php://input");
	// error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();


	function P_OBTENER_CARGUES_RADICADOS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_CARGUES_RADICADOS(:v_pnit,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }

	function P_OBTENER_FACTURAS(){
    require_once('../config/dbcon.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_RIPS_GA.P_OBTENER_FACTURAS(:v_pnit,:v_recibo,:v_result); end;');
    oci_bind_by_name($consulta,':v_pnit',$request->nit);
    oci_bind_by_name($consulta,':v_recibo',$request->recibo);
    $cursor = oci_new_cursor($c);
    oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = [];
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);
    echo json_encode($datos);
  }


  function P_ACTUALIZA_ESTADO_VAL()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_ESTADO_VAL(:v_pnit,:v_precibo,:v_pfacturas,:v_pcantidad,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
    oci_bind_by_name($consulta, ':v_pfacturas', $request->facturas);
    oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }


  function P_ACTUALIZA_ESTADO_VAL_UNICAS()
  {
    require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS_GA.P_ACTUALIZA_ESTADO_VAL_UNICAS(:v_pnit,:v_precibo,:v_pfactura,:v_pcantidad,:v_json_row); end;');
    oci_bind_by_name($consulta, ':v_pnit', $request->nit);
    oci_bind_by_name($consulta, ':v_precibo', $request->recibo);
    oci_bind_by_name($consulta, ':v_pfactura', $request->factura);
    oci_bind_by_name($consulta, ':v_pcantidad', $request->cantidad);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
    } else {
      echo 0;
    }
    oci_close($c);
  }

  function Listar_Soportes()
  {
    global $request;

    include('../sftp_cloud/DownloadFile.php');
    $con_id = Connect_FTP();
    // Connect_FTP();
    // var_dump($con_id);
    $nit = $request->nit;
    $factura = $request->factura;

    // $ruta_carpeta = '/img/CuentasMedicas/Facturas_Pruebas/';
    $sftp = ssh2_sftp($con_id); // Creamos la conexion sftp
    $sftp_fd = intval($sftp);
    // $contents1 = ftp_nlist($sftp, "/img/CuentasMedicas/Facturas_Pruebas/".$nit.'/'.$factura.'/');


    if(!is_dir("ssh2.sftp://$sftp_fd/img/CuentasMedicas/Facturas/".$nit."/".$factura)){ // Validamos si se crearon los directorios
      echo '[]';
      return;
    }

    $handle = opendir("ssh2.sftp://$sftp_fd/img/CuentasMedicas/Facturas/".$nit."/".$factura);
    // echo "Directory handle: $handle\n";
    // echo "Entries:\n";
    $array = array();
    while (false != ($entry = readdir($handle))){
      if ($entry != '.' && $entry != '..'){
        array_push($array, ["ruta" => "/img/CuentasMedicas/Facturas/".$nit."/".$factura."/".$entry , "prefiix" => getNameFactura($factura,$entry)]);
        // echo "$entry\n";

      }
    }
    echo(json_encode($array));
    // var_dump($array);
  }


  function getNameFactura($carpeta,$factura) {
    $factura = (explode('.',$factura))[0];
    if($carpeta == $factura){
      return 'FAC';
      // return 'Factura de venta en salud';
    }
    $factura = substr($factura,0,3);
    // $facturas = [
    //     'FAC' => "Factura de venta en salud",
    //     'HEV' => "Resumen de atención u hoja de evolución",
    //     'EPI' => "Epicrisis",
    //     'PDX' => "Resultado de los procedimientos de apoyó diagnóstico",
    //     'DQX' => "Descripción quirúrgica",
    //     'RAN' => "Registro de anestesia",
    //     'CRC' => "Comprobante de recibido del usuario",
    //     'TAP' => "Traslado asistencial de pacientes",
    //     'TNA' => "Transporte no asistencial ambulatorio de la persona",
    //     'FAT' => "Factura de venta por el aseguradora SOAT, la ADRES o la entidad que haga sus veces",
    //     'FMO' => "Factura de venta del material de osteosíntesis expedida por el proveedor",
    //     'OPF' => "Orden o prescripción facultativa",
    //     'LPD' => "Lista de precios",
    //     'HAU' => "Hoja de atención de urgencia",
    //     'HAO' => "Hoja de atención odontológica",
    //     'HAM' => "Hoja de administración de medicamentos",
    //     'PDE' => "Evidencia del envio del trámite respectivo"
    // ];

    // return $facturas[$factura] ?? 'Otros documentos';

    return $factura;
}

function descargaAdjunto()
{
  global $request;
  require('../sftp_cloud/DownloadFile.php');
  echo (DownloadFile_API_OCR($request->ruta));
}
