<?php
Session_Start();
// error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function validaEstructura()
{
  global $request;
  // $ruta = $request->ruta;
  // echo $ruta;
  $ubicacion =   '../../../temp/';
  $sw = 0;
  // $m5 = '../../../temp/MD900465319_052022.zip';
  // $m4 = '../../../temp/MD900465319_022022.zip';
  // $pesa = '../../../temp/MD900073223_012022.zip';

  // $zip = new ZipArchive();
  // $cantFiles = 0;
  // $nameFiles = [];
  // if ($zip->open($pesa) === TRUE) {
  //   for ($i = 0; $i < $zip->numFiles; $i++) {
  //     $cantFiles = $zip->numFiles;
  //     array_push($nameFiles, $nombresFichZIP['name'][$i] = $zip->getNameIndex($i));
  //   }
  //   $zip->extractTo($ubicacion);
  // }

  $txt1 = "../../../temp/MD900073223_012022.txt";
  $txt2 = "../../../temp/MD900073223_012023.txt";
  $fp = fopen($txt2, "r");
  $arrErr = [];
  $arrErr2 = [];

  while (!feof($fp)) {
    $linea = fgets($fp);
    $lin = explode(',', $linea);
    if (sizeof($lin) > 32) {

      $sw = $sw + 1;
      array_push($arrErr, $sw);
      array_push($arrErr2, sizeof($lin));
    }
  }

  // echo json_encode($arrErr);
  echo json_encode($arrErr2);
  fclose($fp);
}
