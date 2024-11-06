<?php
	
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function obtener_Listado_ips_usuario(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT.p_lista_funcionarios(:v_paccion,:v_json_row); end;');
		 oci_bind_by_name($consulta,':v_paccion',$request->tipo);
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

    function obtener_Listado(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin PQ_GENESIS_AUT.p_obtener_funcionario(:v_pnit,:v_paccion,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_paccion',$request->tipo);
		oci_bind_by_name($consulta,':v_pnit',$request->codigo);
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
	function Cambiar_estado_Usuario(){
		require_once('../config/dbcon_prod.php');
		global $request;
 		$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT.p_ui_funcionarios(:v_pdocumento,:v_pvalor,:v_ptecho,:v_pestado,:v_pexcepcion,:v_paccion,:v_pter_estado,:v_ppqr,:v_panticipo,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pdocumento',$request->documentousuario);
		oci_bind_by_name($consulta,':v_pvalor',$request->valorsignar);
		oci_bind_by_name($consulta,':v_ptecho',$request->techoasignar);
		oci_bind_by_name($consulta,':v_pestado',$request->estado);
		oci_bind_by_name($consulta,':v_pexcepcion',$request->excepcionasignar);
		oci_bind_by_name($consulta,':v_paccion',$request->accion);
		oci_bind_by_name($consulta,':v_pter_estado',$request->estado2);
		oci_bind_by_name($consulta,':v_ppqr',$request->controlpqr);
		oci_bind_by_name($consulta,':v_panticipo',$request->controlanticipo);
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
	
	function OBTENER_PRESTADOR_AUDITOR()
	{
		require_once('../config/dbcon_prod.php');
	  global $request;
	  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.p_lista_ips_admin(:v_pnit, :v_ptipo, :v_json_row); end;');
	  oci_bind_by_name($consulta, ':v_pnit', $request->documento);
	  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
	  $clob = oci_new_descriptor($c, OCI_D_LOB);
	  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	  oci_execute($consulta, OCI_DEFAULT);
	  if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	  } else {
		echo "Error que nadie sabe";
	  }
	  oci_close($c);
	}
	function GuardarListaIpsUsuario()
	{
		require_once('../config/dbcon_prod.php');
	  global $request;
	  $accion="";
	  $consulta = oci_parse($c, 'BEGIN pq_genesis_censo_hospitalario.P_ui_admin_auditor(:v_pnit,:v_paccion,:v_pcantidad_auditor,:v_pjson_auditor,:v_ptipo, :v_json_row); end;');
	  oci_bind_by_name($consulta, ':v_pnit', $request->nit);
	  oci_bind_by_name($consulta, ':v_paccion', $accion);
	  oci_bind_by_name($consulta, ':v_pcantidad_auditor', $request->cantidad_auditor);
	  oci_bind_by_name($consulta, ':v_pjson_auditor', $request->json_auditor);
	  oci_bind_by_name($consulta, ':v_ptipo', $request->tipo);
	  $clob = oci_new_descriptor($c, OCI_D_LOB);
	  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	  oci_execute($consulta, OCI_DEFAULT);
	  if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	  } else {
		echo "Error que nadie sabe";
	  }
	  oci_close($c);
	}