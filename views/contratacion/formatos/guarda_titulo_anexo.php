<?php
Session_Start();
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();
    function guarda_session(){
        global $request;
        unset($_SESSION['titulo_anexoxxx']);
        unset($_SESSION['titulo_anexo']);
        $_SESSION['titulo_anexo'] = $request->titulo_anexo;
        // $_SESSION['titulo_anexoxxx'] = 'aaaaaaaaaaaaa';
        // var_dump($_SESSION);
        // print_r($_SESSION);
        echo(json_encode($_SESSION));
   }
