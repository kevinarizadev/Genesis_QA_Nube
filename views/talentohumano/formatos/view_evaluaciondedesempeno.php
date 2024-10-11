<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>FORMATO LISTA DE CHEQUEO DE LA EVALUACIÓN DE DESEMPEÑO CAJACOPI EPS SAS</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
            /* margin-left: 0.5em; */
        }

         * {
            font-family: 'Open Sans', sans-serif;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
           /* -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;*/
        } 

        #table1,
        #table1 tr th,
        #table1 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 71%;
            border-spacing: 0 0 !important;
        }

        .Firma {
            background-size: cover;
            width: 200px;
            height: 85px;
            margin: auto;
            background-position-y: 0;
            filter: grayscale(100%);
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/talentohumano/formatos/view_formatoevaluaciondeldesempenoController.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='ANT'">
    <table id="table1" width="100%" style="border: #FFF;">
        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=80px; height="40px">
            </td>
            <td colspan="7" rowspan="2" style="width: 60%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO LISTA DE CHEQUEO DE LA EVALUACIÓN DE DESEMPEÑO CAJACOPI EPS SAS</td>
            <td colspan="3">
                Código GH-FR-19
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="3">Version: 01</td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="7" style="text-align: center;padding:1% 0%;">
                PROCEDIMIENTO PARA EVALUACIÓN DEL DESEMPEÑO</td>
            <td colspan="3">Fecha: Diciembre 2022</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="2" style="text-align: center;padding:0% 0%;">FECHA DE EVALUACION</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">NOMBRE DEL EVALUADO</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">CARGO</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">JEFE INMEDIATO</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">AREA</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato[0].CARGO}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato[0].NOMBRE}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato[0].CARGO}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato[0].NOM_JEFE}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato[0].NOM_AREA}}</td>
        </tr>
        <br>
        <td colspan="11"></td>
        </br>

        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="11" style="text-align: left;">Evaluación competencias organizacionales (30%)</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Competencias </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Concepto</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">20</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">30</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">40</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">50</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Observaciones</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Lealtad</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es el Compromiso consciente que todos los trabajadores de CAJACOPI EPS tenemos con los objetivos y los intereses de la Organización para lograr su crecimiento y su contribución a la seguridad social en salud de nuestro país.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple con Las competencias establecidos por la organización </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple ocasionalmente con los elementos establecidos como normativas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '2' ? 'X' : '' }}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre cumple con las normativas organizacionales</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre cumple con las normativas organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '4' ? 'X' : '' }}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Responsabilidad</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Conjunto de requisitos de SGC y SST los cuales son: 1) normativos: ISO 9001:2015 y Resolución 0312 de 2019, y los procedimientos establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Se observa que en el ejercicio de sus funciones no cumple con los requisitos del SGC y SST tanto de normatividad como los establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[1].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente cumple con los requisitos del SGC y SST, generando así observaciones.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[1].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple solamente con los requisitos del SGC Y SST.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[1].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple y genera valor al SGC y SST.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[1].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[1].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumplimiento de SGC y SST</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tenemos la Capacidad de velar por la protección de todos los recursos asignados para la excelente prestación de los servicios de salud, cumpliendo eficiente y oportunamente con todas las tareas y compromisos adquiridos con nuestros usuarios o clientes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No proyecta Responsabilidad como parte de los valores organizacionales determinados por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[2].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple ocasionalmente con las responsabilidades alineado con los valores organizacionales</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[2].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre cumple y proyecta los valores organizacionales establecidos por la organización</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[2].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Permanentemente se destaca en el compromiso con los valores organizacionales</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[2].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[2].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Respeto</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">En Nuestra empresa convivimos con nuestras diferencias, aceptando la naturaleza y las habilidades de todas las personas involucradas con la Organización, reconociendo en cada uno de nuestros afiliados, clientes, empleados y proveedores la importancia y la contribución que hacen para el crecimiento de nuestra empresa y del país.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ha presentado constantes fallas en el cumplimiento de los pilares de ética y respeto establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[3].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente cumple el respeto alibneado con los pilares de la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[3].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre cumple con los pilares de ética establecidos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[3].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple con los pilares de ética establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[3].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[3].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Disciplina</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Entendida como la capacidad para practicar el orden y la constancia en el trabajo y en nuestra vida cotidiana, asociada a la capacidad para desarrollarnos de acuerdo con nuestros principios, deberes, objetivos y necesidades con un buen comportamiento social.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No proyecta en su desempeño diario la disciplina como los pilares de la orientación a la excelencia determinados por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[4].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente proyecta los pilares de la orientación a la excelencia establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[4].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre proyecta los pilares de la orientación a la excelencia determinada por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[4].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre proyecta los pilares de la orientación a la excelencia.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[4].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[4].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">Totalice por columna el puntaje obtenido:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Puntaje total:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].VALORES[0].VALOR}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">% Desempeño comp. Organizacionales:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PORC_PROCESO_1}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="11" style="text-align: left;">Evaluación competencias blandas (40%)</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Competencias </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Concepto</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">20</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">30</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">40</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">50</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Observaciones</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Adaptación al cambio</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la habilidad para modificar la propia conducta con el fin de alcanzar los objetivos o solucionar problemas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es resistente en cuanto a la aceptación y adaptación de los cambios establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[5].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre se adapta a los cambios establecidos por la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[5].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre cumple con las normativas organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[5].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Asume todos los cambios establecidos por la organización y se compromete en el desarrollo de los mismos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[5].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[5].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de Análisis</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para identificar, comprender y evaluar las diferentes variables que inciden en la consecución de un objetivo previo a la toma de decisiones, teniendo en cuenta su repercusión en los niveles de calidad y eficiencia esperados.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No identifica, no comprende, ni evalua las variables que intervienen para la consecución de sus objetivos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente identifica , comprende y evalua las variables que intervienen para la consecución de sus objetivos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Con frecuencia identifica, comprende y evalua las variables que inciden en la consecución de sus objetivos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre identifica, comprende y evalua las variables que inciden en la consecución de sus objetivos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Aprendizaje continuo</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la habilidad para transformar el conocimiento y las vivencias diarias en pro de las mejoras de los procesos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No utiliza los conocimientos adquiridos y las vivencias diarias para mejorar los procesos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[7].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Utiliza ocasionalmente los conocimientos adquiridos y las vivencias diarias para mejorar los procesos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[7].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre utiliza los conocimientos adquiridos y vivencias diarias para mejorar los procesos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[7].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre utiliza los conocimientos adquiridos y vivencias diarias mejorando así los procesos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[7].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[7].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de negociación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para llegar a acuerdos de mutuo beneficio, a través del intercambio de información, debate de ideas y utilización de estrategias efectivas, con personas o grupos que representan alto interés para la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No utiliza las herramientas para lograr acuerdos de mutuo beneficio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[8].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente utiliza las herramientas para lograr acuerdos de mutuo beneficio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[8].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre utiliza las herramientas para lograr acuerdos de mutuo beneficio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[8].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre utiliza las herramientas para lograr acuerdos de mutuo beneficio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[8].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[8].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Comunicación organizacional</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la capacidad para transmitir y/o recibir información que permita que los procesos internos y externos se desarrollen correctamente y exista un óptimo clima de trabajo para alcanzar los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No transmite y/o recibe correctamente la información para alcanzar los objetivos de la empresa. </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[9].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente transmite y/ o recibe correctamente la información para alcanzar los objetivos de la empresa.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[9].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre transmite y/o recibe correctamente la información para alcanzar los objetivos</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[9].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre transmite y/o recibe la información alcanzando los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[9].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[9].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Iniciativa</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para actuar proactivamente en los procesos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Presenta una actitud pasiva y apática ante las situación que exijan iniciativa. </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[10].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente demuestra iniciativa en el ejercicio de sus actividades y de los procesos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[10].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre presenta una actitud proactiva ante cualquier situación buscando pronta soluciones.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[10].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre presenta una actitud proactiva ante cualquier situación buscando pronta soluciones.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[10].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[10].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Liderazgo</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para dirigir asertivamente a las personas, logrando que éstas contribuyan a la adecuada a la consecución de los objetivos estrategicos y manteniendo un adecuado clima laboral.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No dirige asertivamente a su equipo de trabajo para el logro de los objetivos, ni genera un clima organizacional adecuado para sus dirigidos y/o no muestra liderazgo en su funcion.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[11].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente dirige asertivamente a su equipo de trabajo para el logro de los objetivos, ni genera un clima organizacional adecuado para sus dirigidos y/o no muestra liderazgo en su proceso.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[11].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre dirige asertivamente a su equipo de trabajo para el logro de los objetivos, generando casi siempre un clima organizacional adecuado para sus dirigidos y/o muestra liderazgo en su proceso.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[11].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre dirige asertivamente a su equipo de trabajo para el logro de los objetivos, generando un clima organizacional adecuado para sus dirigidos, o mjuestra liderazgo en su proceso.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[11].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[11].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Organización</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para coordinar armonicamente las actividades que le permitan el logro de los objetivos organizacionales y/ ser lider en su proceso.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No coordina las actividades de manera armonica para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[12].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente coordina las actividades de manera armonica para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[12].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre coordina las actividades de manera armonica para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[12].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre coordina las actividades de manera armonica para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[12].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[12].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Gestión organizacional</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la capacidad de planificar y hacer sus actividades verificando su eficacia y haciendo la mejora continua que se requiera.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No planifica, no ejectua, no verifica y no mejora continuamente sus actividades para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[13].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente planifica, ejecuta, verifica y presenta mejora a sus actividades para el logro de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[13].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre planifica, ejecuta, verifica y presenta mejoras en sus sus actividades para el logro de los objetivos organizacionales..</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[13].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre planifica, ejecuta, verifica la eficiacia y hace mejora continua de sus actividades para la superación de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[13].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[13].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Relaciones interpersonales</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de establecer y conservar vinculo armonico con las partes interesadas en el marco del desarrollo de los procesos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No establece, ni conserva vinculos armonicos con las partes interesadas en el marco del desarrollo de los procesos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[14].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando asi la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[14].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando asi la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[14].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando así la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[14].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[14].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Solución de problemas</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de reconocer las señales que identifican la presencia de una dificultad, anomalía o entorpecimiento del desarrollo normal de una tarea, recolectar la información necesaria para resolver los problemas detectados y escoger e implementar las mejores alternativas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando asi la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[15].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando asi la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[15].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando asi la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[15].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre reconoce las señales que permite identificar la presencia de una dificultad con el fin de resolver un problema, tomando así la mejor solución.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[15].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[15].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Toma de decisiones</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la capacidad de elegir la mejor opción entre varias alternativas para conseguir los objetivo organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No aplica las herramientas necesarias para elegir la mejor opción entre varias alternativas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[16].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente aplica las herramientas necesarias para elegir la mejor opción entre varias alternativas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[16].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre aplica las herramientas necesarias para elegir la mejor opción entre varias alternativas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[16].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre aplica las herramientas necesarias para elegir la mejor opción entre varias alternativas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[16].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[16].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Trabajo en equipo</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Es la capacidad para integrarse y trabajar efectivamente por los objetivo organizacionales, estableciendo relaciones de colaboración y cooperación.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No tiene la capacidad para integrarse y trabajar efectivamente con las partes interesadas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[17].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"> Ocasionalmente se integrar y trabaja efectivamente con las partes interesadas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[17].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre se integra y trabaja efectivamente con las partes interesadas con el fin de lograr los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[17].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Siempre se integra y trabaja efectivamente por un objetivo en común con las partes interesadas, estableciendo siempre relaciones de colaboración y cooperación.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[17].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[17].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">Totalice por columna el puntaje obtenido:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '2' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '3' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[0].COD_RESPUESTA == '4' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Puntaje total:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].VALORES[1].VALOR}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">% Desempeño comp. Organizacionales:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PORC_PROCESO_2}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="11" style="text-align: left;">Evaluación competencias técnicas (30%)</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Competencias </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Concepto</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">20</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">30</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">40</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ponderación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">50</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Obervaciones</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Manejo de paquete office</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para diseñar y desarrollar presentaciones, analizar datos, facilitar la comunicación entre las diferentes partes interesadas utilizando mecanismos como word, excel, power point , publisher, entre otros.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cuenta con la capacidad para el manejo de herramientas ofimáticas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[18].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene poco manejo de las herramientas ofimáticas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[18].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene conocimientos medios de las herramientas ofimáticas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[18].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cuenta con un alto dominio de las herramientas ofimáticas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[18].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[18].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de analisis de datos numericos</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad de comprender, analizar, manejar e interpretar datos numericos para el logro de los resultados en la ejecución de la labor realizada para el cumplimiento de los objetivos organizacionales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cuenta con la capacidad de comprender, analizar, manejar e interpretar datos numericos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[19].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente comprende, analiza, maneja e interpreta datos numericos en función de su labor.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[19].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre comprende, analiza, maneja e interpreta datos numericos en función de su labor.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[19].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Posee la capacidad de comprender, analizar, manejar e interpretar datos numericos para el logro de los reusltados en la ejecución de la labor.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[19].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[19].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Manejo de servicio (interno y externo)</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad conocer las necesidades del servicio in tyerno yexterno y brindar soluciones que apunten a las necesidades de la emptresa.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cuenta con la capacidad con el manejo de la plataforma.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[20].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene poco manejo de la plataforma DMS.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[20].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene conocimientos medios de la plataforma DMS</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[20].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cuenta con un alto dominio de la plataforma DMS.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[20].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[20].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Protocolo de comunicación </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para trasmitir y plasmar empaticamente a las partes interesadas la información requerida de acuerdo a cada proceso.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cuenta conn la capacidad para el manejo del servicio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[21].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente cuenta con la capacidad para el manejo del servicio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[21].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre cuenta con la capacidad para el manejo del servicio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[21].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Conoce y se desenvueklve en atender las necesidades del servicio tanto interno como externo.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[21].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[21].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Conocimiento del entorno corporativo</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para identificar las necesidades y fortalezar del entorno laboral que permita desarrollar estrategias para el cumplimiento de los objetivos de la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No identifica las necesidades y fortalezas del entorno laboral para el cumplimiento de los objetivos de su area.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[22].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Ocasionalmente identifica las necesidades y fortalezas del entorno laboral para el cumplimiento de los objetivos de su area.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[22].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Casi siempre identifica las necesidades y fortalezas del entorno laboral para el cumplimiento de los objetivos de su area.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[22].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Identifica las necesidades y fortalezas de su entorno laboral proponiendo estrategias y actividades que permiten cumplir los objetivos de su area y de la organización.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[22].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[22].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Plataformas digitales</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Capacidad para el ingreso, análisis, manejo y busqueda de la información de interes relacionada a cada proceso con las plataformas digitales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No posee la capacidad para manejar plataformas digitales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[23].COD_RESPUESTA == '1' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene poco manejo de las plataformas digitales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[23].COD_RESPUESTA == '2' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Tiene conocimientos medios en el manejo de las plataformas digitales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[23].COD_RESPUESTA == '3' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cuenta con un alto dominio en el manejo de las plataformas digitales.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[23].COD_RESPUESTA == '4' ? 'X' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[23].OBSERVACIONES}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">Totalice por columna el puntaje obtenido:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PREGUNTAS[6].COD_RESPUESTA == '1' ? '' : ''}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Puntaje total:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].VALORES[2].VALOR}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">% Desempeño comp. Organizacionales:</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato[0].PORC_PROCESO_3}}%</td>
            <td colspan="9" style="background-color:#1a2e63;color:white;padding:0% 0%;"></td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="11" style="text-align: left;">Evaluación competencias blandas (40%)</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="11" style="text-align: center;">2. PLAN DE DESARROLLO</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="11" style="text-align: center;padding:0% 0%;">En el caso de que el evaluado obtenga un porcentaje de desempeño inferior al 80%, se debe generar un plan de acompañamiento por 6 meses, en el cual se deben hacer un plan por cada criterio que obtuvo una calificación igual o inferior a 30 y un acta de compromiso donde debe quedar por sentado la obligación de cumplir cada una de las actividades del plan. Cada 2 meses el evaluado debe reunirse con el Jefe Directo y Gestión Humana a fin de que se haga seguimiento a la evolución del plan. A los 6 meses a manera de seguimiento, se hace una evaluación de desempeño, a fin de revisar la evolución del plan.</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="1" style="text-align: letf;padding:0% 0%;">Fortalezas del evaluado</td>
            <td colspan="10" style="text-align: center;padding:0% 0%;">{{infoFormato[0].FORTALEZAS}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="1" style="text-align: letf;padding:0% 0%;">Áreas Susceptibles de Mejorar</td>
            <td colspan="10" style="text-align: center;padding:0% 0%;">{{infoFormato[0].AREAS_MEJORAR}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="1" style="text-align: letf;padding:0% 0%;">Comentarios del Evaluado</td>
            <td colspan="10" style="text-align: center;padding:0% 0%;">{{infoFormato[0].COM_EVALUADO}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="1" style="text-align: letf;padding:0% 0%;">Compromisos del Evaluado</td>
            <td colspan="10" style="text-align: center;padding:0% 0%;">{{infoFormato[0].COMP_EVALUADO}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">Comentarios del Evaluador</td>
            <td colspan="10" style="text-align: center;padding:0% 0%;">{{infoFormato[0].COM_EVALUADOR}}</td>
        </tr>

        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="6" style="text-align: center;padding:0% 0%;">FIRMA EVALUCAION</td>
            <td colspan="5" style="text-align: center;padding:0% 0%;">FIRMA EVALUADOR</td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="6" style="text-align: left;padding:1% 0%;">FIRMA: </td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">FIRMA:</td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="6" style="text-align: left;padding:1% 0%;">NOMBRE: {{infoFormato[0].cab[0].nombre_supervisor_eps}} </td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">NOMBRE: {{infoFormato[0].cab[0].Representante_ips}} </td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="6" style="text-align: left;padding:1% 0%;">CC: {{infoFormato[0].cab[0].documento_supervisor_eps}}</td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">CC: {{infoFormato[0].cab[0].Documento_supervisor_ips}}</td>
        </tr>
    </table>
</body>

</html>