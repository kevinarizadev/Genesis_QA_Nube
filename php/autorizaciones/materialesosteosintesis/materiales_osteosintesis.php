<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();  
function P_U_ANULA_MATERIALES()
{
  require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_u_anula_materiales(:v_pdocumento, :v_pnumero, :v_pmotivo, :v_pobservacion, :v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	oci_bind_by_name($consulta, ':v_pmotivo', $request->vpmotivo);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
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
function P_OBTERNER_SOLICITUD()
{
	// este sp se recibe un cursor
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_obterner_solicitud(:v_pdocumento,:v_pnumero,:v_response);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
	oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
	$cursor = oci_new_cursor($c);
	oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
	oci_execute($consulta);
	oci_execute($cursor, OCI_DEFAULT);
	$datos = [];
	oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
	oci_free_statement($consulta);
	oci_free_statement($cursor);
	echo json_encode($datos);
	oci_close($c);
}
function CARGARSOPORTEPROVEEDOR($archivo,$nombre)
{
  require('../../sftp_cloud/UploadFile.php');
  $path = 'MaterialesOsteosintesis/Soportes' .'-'. date('dmY');
  $hoy = date('dmY_His');
  $name = $nombre .'_'. $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  return $subio;
}
function P_U_IPS_MATERIALES()
{
	require_once('../../config/dbcon.php');
	global $request;
  if($request->vpdisponibilidad){
    if ($request->vpdisponibilidad == 'S') {
      $soporteProveedor = CARGARSOPORTEPROVEEDOR($request->vpadjunto,'Cotizacion Proveedor');
      $vpdisponibilidad = 'S';
    }
    }else{
        $vpdisponibilidad= '';

    }
    if($request->vpgasto){
        $soportegastoQuirurgico = CARGARSOPORTEPROVEEDOR($request->vpgasto,'Gasto Quirurgico');
      }else{
          $soportegastoQuirurgico= '';
  
      }
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_u_ips_materiales(:v_pdocumento, :v_pnumero, :v_prenglon, :v_pcant_ips, 
                                                                            :v_pjasonips, :v_paccion, :v_pdisponibilidad, :v_pestado,
                                                                            :v_pobservacion, :v_padjunto, :v_pgasto, :v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
  oci_bind_by_name($consulta, ':v_prenglon', $request->vprenglon);
  oci_bind_by_name($consulta, ':v_pcant_ips', $request->vpcantips);
  oci_bind_by_name($consulta, ':v_pjasonips', $request->vpjasonips);
  oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
  oci_bind_by_name($consulta, ':v_pdisponibilidad', $vpdisponibilidad);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
  oci_bind_by_name($consulta, ':v_padjunto', $soporteProveedor);
  oci_bind_by_name($consulta, ':v_pgasto', $soportegastoQuirurgico);
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
function P_U_ESTADO_MATERIALES()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_u_estado_materiales(:v_pdocumento, :v_pnumero, :v_pmotivo, :v_pestado, :v_pobservacion, :v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
  oci_bind_by_name($consulta, ':v_pmotivo', $request->vpmotivo);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_pobservacion', $request->vpobservacion);
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
function P_LISTA_GESTION_IPS()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_gestion_ips(:v_pdocumento, :v_pnumero ,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
  oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
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
function P_OBTENER_IPS_SOLICITANTE()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.P_OBTENER_IPS_SOLICITANTE(:v_pnit,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
function P_LISTA_MOTIVOS()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.P_LISTA_motivos(:v_ptipo,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_ptipo', $request->vptipo);
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
function P_LISTA_IPS_MATERIALES()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_ips_materiales(:v_json_row);end;');
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
function P_LISTA_ESPECIALIDAD()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.P_LISTA_ESPECIALIDAD(:v_pnit,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
function P_OBTENER_ROL()
{
	require_once('../../config/dbcon.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_obtener_rol(:v_pnit,:v_json_row);end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
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
function P_UI_FUNCIONARIOS()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_ui_funcionarios(:v_pdocumento,:v_ptipo,:v_pestado,:v_paccion,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
  oci_bind_by_name($consulta, ':v_ptipo', $request->vptipo);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
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
function P_LISTA_FUNCIONARIOS()
{
  require_once('../../config/dbcon.php');
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_funcionarios(:v_json_row);end;');
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
function P_OBTENER_FUNCIONARIO()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_obtener_funcionario(:v_pcoincidencia,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->vpcoincidencia);
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
function P_LISTA_OFICINA()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_oficina(:v_pregional,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pregional', $request->vpregional);
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
function P_OBTENER_DATOS_BASICOS()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_ptipodocumento', $request->vptipodocumento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
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
function P_OBTERNER_SOLICITUDES()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_obterner_solicitudes(:v_pnit,:v_pgrupo,:v_pestado,:v_pambito,:v_response);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnit', $request->vpnit);
  oci_bind_by_name($consulta, ':v_pgrupo', $request->vpgrupo);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_pambito', $request->vpambito);
  $cursor = oci_new_cursor($c);
  oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($cursor, OCI_DEFAULT);
  $datos = [];
  oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
  oci_free_statement($consulta);
  oci_free_statement($cursor);
  echo json_encode($datos);
  oci_close($c);
}
function CARGARSOPORTECOTIZACION($archivo,$nombre)
{
  // var_dump($archivo,$nombre);
  require('../../sftp_cloud/UploadFile.php');
  $path = 'MaterialesOsteosintesis/Soportes' .'-'. date('dmY');
  $hoy = date('dmY_His');
  $name = $nombre .'_'. $hoy . '.pdf';
  list(, $archivo) = explode(';', $archivo); // Proceso para traer el Base64
  list(, $archivo) = explode(',', $archivo); // Proceso para traer el Base64
  $base64 = base64_decode($archivo); // Proceso para traer el Base64
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $subio = UploadFile($path, $name);
  return $subio;
}
function P_UI_SOLICITUD_INSERT()
{
  require_once('../../config/dbcon.php');
  global $request;
  // var_dump($request);
  if ($request->vpcotizacion == 'S') {
    $soporteCotizacion = CARGARSOPORTECOTIZACION($request->vpsoporte,'Cotizacion');
  }
  $path = 'MaterialesOsteosintesis/Soportes'.'-'. date('dmY');
  $hoy = date('dmY_His');
  $name =  'Adjunto' .'_'. $hoy . '.pdf';
  list(, $request->vpadjunto) = explode(';', $request->vpadjunto); // Proceso para traer el Base64
  list(, $request->vpadjunto) = explode(',', $request->vpadjunto); // Proceso para traer el Base64
  $base64 = base64_decode($request->vpadjunto);
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $ruta = $path;
  include_once('../../sftp_cloud/UploadFile.php');
  $datosAdjunto  = UploadFile($ruta, $name);
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_ui_solicitud(:v_documento,:v_numero,:v_ptipo_documento,:v_pafiliado,:v_ptipo_solicitud,
  :v_pproceso,:v_pnumero_pqr,:v_pnumero_tutela,:v_pcod_dx,:v_pcod_dx1,:v_poficina,:v_pdocumento_medico,:v_pnombre_medico,:v_pcotizacion,:v_psoporte,
  :v_pfecha_orden,:v_pnit_solicitante,:v_pesp_medico,:v_pestado,:v_pfecha_aprobacion,:v_paccion,:v_padjunto,:v_pcant_productos,:v_json_productos,:v_pcant_cups,
  :v_json_cups,:vp_pfecha_qx,:v_pdoc_solicitante,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_documento', $request->vdocumento);
  oci_bind_by_name($consulta, ':v_numero', $request->vnumero);
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->vptipodocumento);
  oci_bind_by_name($consulta, ':v_pafiliado', $request->vpafiliado);
  oci_bind_by_name($consulta, ':v_ptipo_solicitud', $request->vptiposolicitud);
  oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
  oci_bind_by_name($consulta, ':v_pnumero_pqr', $request->vpnumeropqr);
  oci_bind_by_name($consulta, ':v_pnumero_tutela', $request->vpnumerotutela);
  oci_bind_by_name($consulta, ':v_pcod_dx', $request->vpcoddx);
  oci_bind_by_name($consulta, ':v_pcod_dx1', $request->vpcoddx1);
  oci_bind_by_name($consulta, ':v_poficina', $request->vpoficina);
  oci_bind_by_name($consulta, ':v_pdocumento_medico', $request->vpdocumentomedico);
  oci_bind_by_name($consulta, ':v_pnombre_medico', $request->vpnombremedico);
  oci_bind_by_name($consulta, ':v_pcotizacion', $request->vpcotizacion);
  oci_bind_by_name($consulta, ':v_psoporte', $soporteCotizacion);
  oci_bind_by_name($consulta, ':v_pfecha_orden', $request->vpfechaorden);
  oci_bind_by_name($consulta, ':v_pnit_solicitante', $request->vpnitsolicitante);
  oci_bind_by_name($consulta, ':v_pesp_medico', $request->vpespmedico);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_pfecha_aprobacion', $request->vpfechaaprobacion);
  oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
  oci_bind_by_name($consulta, ':v_padjunto',  $datosAdjunto);
  oci_bind_by_name($consulta, ':v_pcant_productos', $request->vpcantproductos);
  oci_bind_by_name($consulta, ':v_json_productos', $request->vjsonproductos);
  oci_bind_by_name($consulta, ':v_pcant_cups', $request->vpcantcups);
  oci_bind_by_name($consulta, ':v_json_cups', $request->vjsoncups);
  oci_bind_by_name($consulta, ':vp_pfecha_qx', $request->vppfechaqx);
  oci_bind_by_name($consulta, ':v_pdoc_solicitante', $request->vpdocsolicitante);
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
function P_UI_SOLICITUD_UPDATE()
{
  require_once('../../config/dbcon.php');
  global $request;
  // var_dump($request);
  if (empty($request->vpsoporte1)) {
    $soporteCotizacion = $request->vpsoporte2;
    // var_dump('411',$soporteCotizacion);
  } else {
    $soporteCotizacion = CARGARSOPORTECOTIZACION($request->vpsoporte1, 'Cotizacion');
    // var_dump('414', $soporteCotizacion);
  }
  if (empty($request->vpadjunto1)) {
    $datosAdjunto = $request->vpadjunto2;
  } else {
      $path = 'MaterialesOsteosintesis/Soportes' . '-' . date('dmY');
      $hoy = date('dmY_His');
      $name = 'Adjunto_' . $hoy . '.pdf';
    if (strpos($request->vpadjunto1, ';') !== false) {
        list(, $base64String) = explode(';', $request->vpadjunto1);
        if (strpos($base64String, ',') !== false) {
            list(, $base64Data) = explode(',', $base64String);
            $fileContent = base64_decode($base64Data, true);
            if ($fileContent === false) {
                throw new Exception('Base64 decode failed');
            }
            $tempFilePath = '../../../temp/' . $name;
            if (file_put_contents($tempFilePath, $fileContent) === false) {
                throw new Exception('Failed to write file');
            }
            $ruta = $path;
            include_once('../../sftp_cloud/UploadFile.php');
            $uploadResult = UploadFile($ruta, $name);
            if ($uploadResult === false) {
                throw new Exception('File upload failed');
            }
            $datosAdjunto = $uploadResult;
        } else {
            throw new Exception('Invalid Base64 data after comma split');
        }
    } else {
        throw new Exception('Invalid Base64 data after semicolon split');
    }
  }
    $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_ui_solicitud(:v_documento,:v_numero,:v_ptipo_documento,:v_pafiliado,:v_ptipo_solicitud,
    :v_pproceso,:v_pnumero_pqr,:v_pnumero_tutela,:v_pcod_dx,:v_pcod_dx1,:v_poficina,:v_pdocumento_medico,:v_pnombre_medico,:v_pcotizacion,:v_psoporte,
    :v_pfecha_orden,:v_pnit_solicitante,:v_pesp_medico,:v_pestado,:v_pfecha_aprobacion,:v_paccion,:v_padjunto,:v_pcant_productos,:v_json_productos,:v_pcant_cups,
    :v_json_cups,:vp_pfecha_qx,:v_pdoc_solicitante,:v_json_row);end;');
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_documento', $request->vdocumento);
    oci_bind_by_name($consulta, ':v_numero', $request->vnumero);
    oci_bind_by_name($consulta, ':v_ptipo_documento', $request->vptipodocumento);
    oci_bind_by_name($consulta, ':v_pafiliado', $request->vpafiliado);
    oci_bind_by_name($consulta, ':v_ptipo_solicitud', $request->vptiposolicitud);
    oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
    oci_bind_by_name($consulta, ':v_pnumero_pqr', $request->vpnumeropqr);
    oci_bind_by_name($consulta, ':v_pnumero_tutela', $request->vpnumerotutela);
    oci_bind_by_name($consulta, ':v_pcod_dx', $request->vpcoddx);
    oci_bind_by_name($consulta, ':v_pcod_dx1', $request->vpcoddx1);
    oci_bind_by_name($consulta, ':v_poficina', $request->vpoficina);
    oci_bind_by_name($consulta, ':v_pdocumento_medico', $request->vpdocumentomedico);
    oci_bind_by_name($consulta, ':v_pnombre_medico', $request->vpnombremedico);
    oci_bind_by_name($consulta, ':v_pcotizacion', $request->vpcotizacion);
    oci_bind_by_name($consulta, ':v_psoporte', $soporteCotizacion);
    oci_bind_by_name($consulta, ':v_pfecha_orden', $request->vpfechaorden);
    oci_bind_by_name($consulta, ':v_pnit_solicitante', $request->vpnitsolicitante);
    oci_bind_by_name($consulta, ':v_pesp_medico', $request->vpespmedico);
    oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
    oci_bind_by_name($consulta, ':v_pfecha_aprobacion', $request->vpfechaaprobacion);
    oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
    oci_bind_by_name($consulta, ':v_padjunto',  $datosAdjunto);
    oci_bind_by_name($consulta, ':v_pcant_productos', $request->vpcantproductos);
    oci_bind_by_name($consulta, ':v_json_productos', $request->vjsonproductos);
    oci_bind_by_name($consulta, ':v_pcant_cups', $request->vpcantcups);
    oci_bind_by_name($consulta, ':v_json_cups', $request->vjsoncups);
    oci_bind_by_name($consulta, ':vp_pfecha_qx', $request->vppfechaqx);
    oci_bind_by_name($consulta, ':v_pdoc_solicitante', $request->vpdocsolicitante);
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
function P_UI_SOLICITUD_MATERIAL()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_ui_solicitud(:v_documento,:v_numero,:v_ptipo_documento,:v_pafiliado,:v_ptipo_solicitud,
  :v_pproceso,:v_pnumero_pqr,:v_pnumero_tutela,:v_pcod_dx,:v_pcod_dx1,:v_poficina,:v_pdocumento_medico,:v_pnombre_medico,:v_pcotizacion,:v_psoporte,
  :v_pfecha_orden,:v_pnit_solicitante,:v_pesp_medico,:v_pestado,:v_pfecha_aprobacion,:v_paccion,:v_padjunto,:v_pcant_productos,:v_json_productos,:v_pcant_cups,
  :v_json_cups,:vp_pfecha_qx,:v_pdoc_solicitante,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_documento', $request->vdocumento);
  oci_bind_by_name($consulta, ':v_numero', $request->vnumero);
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->vptipodocumento);
  oci_bind_by_name($consulta, ':v_pafiliado', $request->vpafiliado);
  oci_bind_by_name($consulta, ':v_ptipo_solicitud', $request->vptiposolicitud);
  oci_bind_by_name($consulta, ':v_pproceso', $request->vpproceso);
  oci_bind_by_name($consulta, ':v_pnumero_pqr', $request->vpnumeropqr);
  oci_bind_by_name($consulta, ':v_pnumero_tutela', $request->vpnumerotutela);
  oci_bind_by_name($consulta, ':v_pcod_dx', $request->vpcoddx);
  oci_bind_by_name($consulta, ':v_pcod_dx1', $request->vpcoddx1);
  oci_bind_by_name($consulta, ':v_poficina', $request->vpoficina);
  oci_bind_by_name($consulta, ':v_pdocumento_medico', $request->vpdocumentomedico);
  oci_bind_by_name($consulta, ':v_pnombre_medico', $request->vpnombremedico);
  oci_bind_by_name($consulta, ':v_pcotizacion', $request->vpcotizacion);
  oci_bind_by_name($consulta, ':v_psoporte', $soporteCotizacion);
  oci_bind_by_name($consulta, ':v_pfecha_orden', $request->vpfechaorden);
  oci_bind_by_name($consulta, ':v_pnit_solicitante', $request->vpnitsolicitante);
  oci_bind_by_name($consulta, ':v_pesp_medico', $request->vpespmedico);
  oci_bind_by_name($consulta, ':v_pestado', $request->vpestado);
  oci_bind_by_name($consulta, ':v_pfecha_aprobacion', $request->vpfechaaprobacion);
  oci_bind_by_name($consulta, ':v_paccion', $request->vpaccion);
  oci_bind_by_name($consulta, ':v_padjunto',  $datosAdjunto);
  oci_bind_by_name($consulta, ':v_pcant_productos', $request->vpcantproductos);
  oci_bind_by_name($consulta, ':v_json_productos', $request->vjsonproductos);
  oci_bind_by_name($consulta, ':v_pcant_cups', $request->vpcantcups);
  oci_bind_by_name($consulta, ':v_json_cups', $request->vjsoncups);
  oci_bind_by_name($consulta, ':vp_pfecha_qx', $request->vppfechaqx);
  oci_bind_by_name($consulta, ':v_pdoc_solicitante', $request->vpdocsolicitante);
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
function P_LISTA_DETALLE()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_detalle(:v_pnumero,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
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
function P_LISTA_CUPS()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_cups(:v_pcoincidencia,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->vpcoincidencia);
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
function P_LISTA_PRODUCTOS()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_productos(:v_pcoincidencia,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pcoincidencia', $request->vpcoincidencia);
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
function P_OBTENER_PQR()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.P_OBTENER_PQR(:v_ptipo_documento,:v_pdocumento,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_ptipo_documento', $request->vptipodocumento);
  oci_bind_by_name($consulta, ':v_pdocumento', $request->vpdocumento);
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
function P_LISTA_SOPORTES()
{
  require_once('../../config/dbcon.php');
  global $request;
  $consulta = oci_parse($c, 'BEGIN pq_genesis_materiales.p_lista_soportes(:v_pnumero,:v_json_row);end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pnumero', $request->vpnumero);
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
function DESCARGARFILE (){
  global $request;
  $fileexists = false;
  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
      require_once('../config/ftpcon.php'); $fileexists = true;
    }
  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
    require_once('../config/sftp_con.php'); $fileexists = true;
  }
  if($fileexists) {
    $file_size = ftp_size($con_id, $request->ruta);
    if ($file_size != -1) {
      $ruta = $request->ruta;
      $name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
      $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
      $name = $name . '.' . $ext;
      $local_file = '../../../temp/' . $name;
      $handle = fopen($local_file, 'w');
      if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
        echo $name;
      } else {
        echo "0 - Error Al descargar el archivo";
      }
      ftp_close($con_id);
      fclose($handle);
    } else {
      echo "0 - Error Archivo no existe";
    }
  } else {
    require('../../sftp_cloud/DownloadFile.php');
    echo( DownloadFile($request->ruta) );
    // echo( DownloadFile($request->ruta) );
  }
}
