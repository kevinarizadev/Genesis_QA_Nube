<?php
    header("Content-Type: text/html;charset=utf-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    // header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: POST");
    // header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: text/html;charset=utf-8");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    //echo 11111111;
    echo $postdata;
    //print_r($request);
    //$function = $request->function;
    echo $request->function;
    //$function();
    //echo "Api en desarrollo";

   function inserta_registro_aut()
    {
      global $request;
      require('../php/config/dbcon_qa.php');
      $consulta = oci_parse($c, 'begin oasis.PQ_WEBSERVICES_IPS.inserta_registro_aut(:v_ptercero,:v_ptipodocumento,:v_pdocumento,
      :v_pproducto,:v_pcantidad,:v_pfecha_prestacion,:v_pambito,:v_pdiagnostico,
      :v_pjson_out); end;');
      oci_bind_by_name($consulta, ':v_ptercero', $request->tercero);
      oci_bind_by_name($consulta, ':v_ptipodocumento', $request->tipo_doc);
      oci_bind_by_name($consulta, ':v_pdocumento', $request->numero_doc);
      oci_bind_by_name($consulta, ':v_pproductos', $request->productos);
      oci_bind_by_name($consulta, ':v_pfecha_prestacion', $request->fecha_prestacion);
      oci_bind_by_name($consulta, ':v_pmedico_tratante', $request->medico_tratante);
      oci_bind_by_name($consulta, ':v_pdiagnostico', $request->diagnostico);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      $json = $clob->read($clob->size());
      oci_close($c);
      echo $json;
      exit;
    }


?>
