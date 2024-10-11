<?php

function subirValidaciion()
{
  if (isset($_POST['archivo'])) {
    $name = $_POST['archivo'];
  } else {
    $name = $_POST['archivoAct'];
  }
  $ano = $_GET['ano'];
  // $periodo = $_GET['periodo'] < 10 ? '0' . $_GET['periodo'] : $_GET['periodo'];
  $periodo = strlen($_GET['periodo']) == 1 ? '0' . $_GET['periodo'] : $_GET['periodo'];
  // $periodo = $_GET['periodo'];
  $archiveName = explode('.', $name);
  if (isset($_FILES['fileInput'])) {
    $base64 = file_get_contents($_FILES['fileInput']['tmp_name']);
  } else if (isset($_FILES['MD_Act'])) {
    $base64 = file_get_contents($_FILES['MD_Act']['tmp_name']);
  }
  file_put_contents('../../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  $ubicacion =   '../../../temp/';
  // $ruta = $ubicacion . $archiveName[0] . '.txt';

  //cargue_ftp/Digitalizacion/Genesis/Gestion_Medicamento/'||v_panno||'/'||lpad(v_pperiodo,2,0)||'/'||v_ptercero||'';
  // $ruta = 'Gestion_Medicamento/'
  // $ruta = $ubicacion . $archiveName[0] . '.txt';

  $x = explode('_', $archiveName[0])[0];
  $nit = $x;
  $ruta = 'cargue_ftp/digitalizacion/genesis/Gestion_1552/' . $ano . '/' . $periodo . '/' . $nit;
  $zip = new ZipArchive();
  $cantFiles = 0;
  $nameFiles = [];
  if ($zip->open($ubicacion . $name) === TRUE) {
    for ($i = 0; $i < $zip->numFiles; $i++) {
      $cantFiles = $zip->numFiles;
      array_push($nameFiles, $nombresFichZIP['name'][$i] = $zip->getNameIndex($i));
    }

    $fileUnzip = explode('.', $nameFiles[0])[0] . '.' . strtolower(explode('.', $nameFiles[0])[1]);
    if ($cantFiles == 1 && $fileUnzip == $archiveName[0] . '.txt') {
      $estado = $zip->extractTo($ubicacion);
      if ($estado) {
        // require('../../sftp_cloud/UploadFile.php');
        // $subio = UploadFile($ruta, $archiveName[0] . '.txt');

        // $sa = file_get_contents($ubicacion.$nameFiles[0]);
        // echo $sa;
        if (filesize($ubicacion . $archiveName[0] . '.txt') > 0) {
          require_once('../../config/sftp_con.php');
          // include('../../upload_file/subir_archivo_juridica.php');

          // explode('-', $subio);
          // if ($subio[0] != '0') {
          //   echo $subio;
          // } else {
          //   echo '0';
          // }

          // $tmpfile = $nameFiles[0];
          // file_put_contents($tmpfile, 'genesisactual/temp/'.$tmpfile);
          $tmpfile =  $ubicacion . $nameFiles[0];
          // echo $tmpfile;
          if (is_dir('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $ruta) == TRUE) {
            // $subio = @ftp_put($con_id, $ruta . '/' . $tmpfile, $tmpfile, FTP_BINARY);
            $subio = @ftp_put($con_id, $ruta . '/' . $nameFiles[0], $tmpfile, FTP_BINARY);
            if ($subio) {
              unlink($tmpfile);
              echo $ruta;
            } else {
              unlink($tmpfile);
              echo '0 - Error';
            }
          } else {
            if (ftp_mkdir($con_id, $ruta)) {
              $subio = ftp_put($con_id, $ruta . '/' . $nameFiles[0], $tmpfile, FTP_BINARY);
              if ($subio) {
                unlink($tmpfile);
                // echo $ruta;
              } else {
                unlink($tmpfile);
                echo '0 - Error';
              }
            } else {
              echo '0';
            }
          }
          ftp_close($con_id);
        } else {
          echo "size0";
        }
      }
    } else {
      echo 1;
    }
  }else{
    echo "Error al leer zip";
  }

  $zip->close();
}



subirValidaciion();
