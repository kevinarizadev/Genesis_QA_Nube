<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de Certificación</title>
    <link rel="icon" href="../../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 3em;
            /* margin-left: 0.5em; */
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

        table,
        table tr th,
        table tr td {
            border: .5px solid black;
            /* border-collapse: collapse; */
            font-size: 12px;
            /* border-spacing: 0 0 !important; */
        }

        .paddingleft td {
            font-size: 13px !important;
            padding-left: 3em;
            padding-top: 1em;
            border-style: none !important;
        }

        .Firma {
            background-size: cover;
            width: 200px;
            height: 85px;
            /* margin: auto; */
            background-position-y: 0;
            filter: grayscale(100%);
        }

        .fs_12 {
          font-size: 12px !important;
        }
        .fondoAzul {
          background-color: #1a2e63;
          color: white !important;
        }
        #table4,
        #table4 tr th,
        #table4 tr td {
          border: .5px solid black;
          font-size: 12px;
          border-spacing: 0 0 !important;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/autorizaciones/anticipos/formatoanticipoController.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js"></script>

</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='CER'" id="body">
    <table id="table1" width="100%" style="border: #FFF;">

        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png">
                <!-- <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=100px; height="40px"></td> -->
            <td colspan="1" rowspan="2" style="width: 55%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO DE CERTIFICACIÓN</td>
            <td colspan="1">
                Código: RP-FR-13
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1">Versión: 02</td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1" style="text-align: center;padding:1% 0%;">
                PROCEDIMIENTO DE ANTICIPOS PARA PRESTACION DE SERVICIOS DE SALUD</td>
            <td colspan="1">Fecha: Enero 2024</td>
        </tr>

        <tr class="paddingleft">
            <td colspan="6" style="text-align:center">
                <b>EL SUSCRITO GERENTE REGIONAL {{Cert_FSECCIONAL}} DE CAJACOPI EPS SAS</b></td>
        </tr>
        <tr class="paddingleft">
            <td colspan="6" style="text-align:center;">
                <b>CERTIFICA</b></td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Que el servicio, procedimiento, insumo y/o medicamento {{Cert_PRODUCTO}} requerido para el usuario {{Cert_USUARIO}}, identificado con la {{Cert_TIPODOC}} No {{Cert_NUMDOC}} es pertinente conforme a la patología diagnosticada, consistente en {{Cert_DIAGNOSTICO}}. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Verificada la red contratada por Cajacopi EPS SAS no cuenta con la disponibilidad del servicio solicitado por anticipo. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                El paciente para la fecha de prestación de los servicios se encontraba activo en el Sistema de Información de Cajacopi EPS SAS y en la ADRES. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                La IPS que prestará la atención requerida objeto del anticipo cuenta con el servicio habilitado en el REPS. </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Esta información fue verificada directamente por el suscrito y cuenta con los soportes que así lo demuestran.
            </td>
        </tr>
        <tr style="text-align:left;" class="paddingleft">
            <td colspan="6">
                Se expide la presente constancia se expide a los {{Cert_FDIAS}} días del mes de {{Cert_FMES}} de {{Cert_FANIO}}.</td>
        </tr>
    </table>
    <div style="margin-top:2em;margin-left:3em;">
        <span>Atentamente</span>
        <br><br>
        <div>
            <div>
                <div class="Firma" style="background-image:url({{Firma.Val}});"></div>
            </div>
            <div>
                <span> ______________________________________</span>
                <br>
                <span>Gerente Regional {{Cert_FSECCIONAL}}</span>
                <br>
                <span>CAJACOPI EPS SAS</span>
            </div>
        </div>
        <!-- <img class="Firma" ng-src="{{Firma.Val}}">

        <br>
        <span> ______________________________________</span>
        <br>
        <span>Coordinador Seccional {{Cert_FSECCIONAL}}</span>
        <br>
        <span>CAJACOPI EPS</span> -->
    </div>

    <div class="fs_12" style="margin: 1 0vw;margin-top: 9vw;">
      <p><b>CONTROL DE CAMBIOS</b></p>
    </div>
    <!--  -->
    <table id="table4" width="100%">
      <tr>
        <th class="fondoAzul">VERSIÓN</th>
        <th class="fondoAzul">FECHA</th>
        <th class="fondoAzul">DESCRIPCIÓN</th>
      </tr>
      <tr>
        <td>01</td>
        <td>Febrero 2023.</td>
        <td>Emisión del Formato.</td>
      </tr>
      <tr>
        <td>02</td>
        <td>Enero 2024.</td>
        <td>Se agregó cuadro de Control de Cambio.</td>
      </tr>
    </table>

</body>

</html>
