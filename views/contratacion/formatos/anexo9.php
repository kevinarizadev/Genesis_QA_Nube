<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../../scripts/controllers/contratacion/formatos/formatoanexosController.js"></script>
</head>

<body ng-controller="formatoanexosController">

<?php
sleep(3);
require './vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

// // Cargar el archivo de Excel
$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('anexo9.xlsx');
// Obtener la hoja activa
$sheet = $spreadsheet->getActiveSheet();
// Modificar un valor en la celda A1
$sheet->setCellValue('B1', 'ANEXO N° 9 ' );
//$sheet->setCellValue('B1', 'ANEXO N° 9 '.$_SESSION['titulo_anexo'] );
// Guardar los cambios
$uniq = uniqid();
$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('../../../temp/anexo9'.$uniq.'.xlsx');
header('Location: ../../../temp/anexo9'.$uniq.'.xlsx');

?>
