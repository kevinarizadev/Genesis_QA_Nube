<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato de Anexo 3</title>
  <!-- <link rel="icon" href="../../../../assets/images/icon.ico" /> -->
  <link rel="stylesheet" type="text/css" href="../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em 2em 2em 2em;
      /* margin-left: 0.5em; */
    }

    @media print {
      #btnprint {
        display: none !important;
      }
    }

    * {
      font-family: 'Open Sans', sans-serif;
      /* font-size: px; */
      /* border: 0.5px solid black; */
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      text-align: justify;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .bold {
      font-weight: 600;
    }

    .text7 {
      text-align: justify;
      font-size: 14px;
    }

    table {
      width: 100%;
    }

    #table1,
    #table1 tr th,
    #table1 tr td {
      border: .5px solid #111;
      /* border-collapse: collapse; */
      font-size: 13px;
      /* border-spacing: 0 0 !important; */
    }

    #table2,
    #table2 tr th,
    #table2 tr td {
      border: .5px solid #111;
      border-collapse: collapse;
      font-size: 11px;
      border-spacing: 0 0 !important;
    }
  </style>

  <script src="../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../bower_components/angular/angular.js"></script>
  <script src="../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../scripts/controllers/medicinalaboral/formato_seguimientoController.js"></script>

</head>

<body ng-controller="formatoseguimientoAfiliadoController">
  <table id="table1" style="border: #fff;">


  </table>
  <br />
  <br />
  <table id="table2">
    <thead>
      <tr style="font-weight:600;">
        <td rowspan="3" style="text-align: center;width:13%;">
          <img src="../../assets/images/logo_cajacopieps.png" width=100px; height="50px">
        </td>
        <td colspan="4" style="text-align: center;font-weight:600;padding:0.1% 0%;">
          LISTA DE SEGUIMIENTOS DE {{title}}
        </td>
      </tr>
      <tr>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;" colspan="4">
          <span></span>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;">
        <span> DOCUMENTO: {{detallesSeguimiento[0].TIPO_DOCUMENTO}} - {{detallesSeguimiento[0].DOCUMENTO}}</span>
        </td>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;">
          <span>AFILIADO: {{detallesSeguimiento[0].NOMBRE_Y_APELLIDOS}} </span> 
        </td>
        <td style="text-align: center;font-weight:600;padding:0.1% 0%;">
         <span> FECHA: {{formatDate(hoy)}}</span>
        </td>
      </tr>
      <tr style="top: 2rem">
        <th style=" width: 12%;">
          FECHA SEGUIMIENTO
        </th>
        <th colspan="2" style="text-align: center;">
          OBSERVACION
        </th>
        <th style=" width: 15%">
          RESPONSABLE
        </th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="x in detallesSeguimiento">
        <td>
          {{x.FECHA_REGISTRO}}
        </td>
        <td colspan="2">
          {{x.OBSERVACION}}

          {{x.OBSERVACION.length>100?x.OBSERVACION.slice(0, 100) + "...":x.OBSERVACION}}
        </td>
        <td>
          {{x.RESPONSABLE}}
        </td>

      </tr>
    </tbody>
  </table>

  <div class="default-background" style="text-align: center;" id="btnprint">
    <button onclick="window.print();">Imprimir</button>
  </div>

 


</body>


</html>
