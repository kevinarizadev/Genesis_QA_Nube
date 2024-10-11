'use strict';
angular.module('GenesisApp')
  .controller('evaluaciondeldesempenoController', ['$scope', '$http', '$window', '$filter',
    function ($scope, $http, $window, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        $scope.show_Gestion = false;
        if($scope.responsable == '22645406' || $scope.responsable == '1140842461' ){
          $scope.show_Gestion = true;
        }
        setTimeout(() => {
          $('#tabs_1').click();
        }, 1000);
        $scope.list = [];
        $scope.datosparaenviar = [];
        $scope.listipsReceptora = [];
        $scope.Vista1_datos = [];
        $scope.SysDay = new Date();
        $scope.verFormulario = true;
        $scope.verPreguntas = false;
        $scope.pregunta1 = true;
        $scope.pregunta2 = false;
        $scope.pregunta3 = false;
        $scope.vistaResulto = false;
        $scope.cantPreguntas = '';
        $scope.limpiar('form1');
        $scope.limpiar('result');
        $('.modal').modal();
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
        $scope.list_DatosTemp = [];
        $scope.pasarsiguiente = 0;
        // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        // Collapsible materializecss
        document.addEventListener('DOMContentLoaded', function () {
          var elems = document.querySelectorAll('.collapsible');
          var instances = M.Collapsible.init(elems, options);
        });
        $(document).ready(function () {
          $('.collapsible').collapsible();
        });
        // Collapsible materializecss
      }
      $scope.limpiar = function (fun) {
        switch (fun) {
          case 'form1':
            $scope.datosparaenviar = [];
            $scope.listaContrato = [];
            $scope.form1 = {
              fechaVista: new Date(),
              nombredelEvaluado: '',
              Cargo: '',
              JefeInmediato: '',
              Area: '',
            }
            break;
          case 'result':
            $scope.result = {
              numeroEvaluacion: '',
              proceso1: '',
              proceso2: '',
              proceso3: '',
              total: '',
              calificacion: '',
              // Observaciones plan de desarrollo
              observacionesResult1: '',
              observacionesResult2: '',
              observacionesResult3: '',
              observacionesResult4: '',
              observacionesResult5: ''
            }
            break;
          default:
        }
      }
      $scope.consultaFuncionario = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista1_datos = [];
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluaciondeldesempeno.php",
          data: {
            function: 'consultarFuncionario',
         vpdocjefe: $scope.responsable,
        //vpdocjefe: 72001276,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.Vista1_datos = data;
            $scope.initPaginacion(data);
            if (data == 0) {
              $("#modalpermisos").modal("open");
              $scope.verFormulario = false;
            } else {
              $scope.verFormulario = true;

            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
    $scope.seleccionarFuncionario = function (data) {
        $scope.listipsReceptora = [];
        $scope.numerodocumentEvaluado = data.DOCUMENTO;
        $scope.numerodocumentJefe = data.DOC_JEFE;
        $scope.form1.nombredelEvaluado = data.NOMBRE;
        $scope.form1.Cargo = data.CARGO;
        $scope.form1.JefeInmediato = data.NOM_JEFE;
        $scope.form1.Area = data.NOM_AREA;
        $("#modallistFuncionarios").modal("close");
      }
       /* $scope.seleccionarFuncionario = function (info) {
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluaciondeldesempeno.php",
          data: {
            function: 'P_VALIDA_FUCNIONARIO',
            vpdocumento: info.DOCUMENTO,
          }
        }).then(function ({ data }) {
          console.log(data);
          if (data && data.toString().substr(0, 3) != '<br') {
            if(data.Codigo != 0){
              swal({
                title: "¡Atencion!",
                text: data.Nombre,
                type: "warning"
              }).catch(swal.noop);
            }else{
              $scope.listipsReceptora = [];
              $scope.buscarFuncionario = '';
              $scope.numerodocumentEvaluado = info.DOCUMENTO;
              $scope.numerodocumentJefe = info.DOC_JEFE;
              $scope.form1.nombredelEvaluado = info.NOMBRE;
              $scope.form1.Cargo = info.CARGO;
              $scope.form1.JefeInmediato = info.NOM_JEFE;
              $scope.form1.Area = info.NOM_AREA;
              $("#modallistFuncionarios").modal("close");
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }*/

      $scope.validadorFormulario = function () {
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.validacioncamposVacios .red-text'), function (i) { // Limpia campos en rojo antes de buscar
          i.classList.remove('red-text');
        });
        if ($scope.form1.fechaVista == '' || $scope.form1.fechaVista == undefined) {
          Campos_Empty = true; document.querySelector('#fechaVista_label').classList.add('red-text');
          swal('Importante', 'Complete los campos requeridos (*)', 'info')
          return;
        } if ($scope.form1.nombredelEvaluado == '' || $scope.form1.nombredelEvaluado == undefined) {
          Campos_Empty = true; document.querySelector('#nombredelEvaluado_label').classList.add('red-text');
          swal('Importante', 'Complete los campos requeridos (*)', 'info')
        } else {
          $scope.titulos();
          $scope.verPreguntas = true;
          $scope.verFormulario = false;
        }
      }
      $scope.titulos = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluaciondeldesempeno.php",
          data: {
            function: 'consultaProceso',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.preguntas1 = data[0].NOMBRE_PROCESO;
            $scope.preguntas2 = data[1].NOMBRE_PROCESO;
            $scope.preguntas3 = data[2].NOMBRE_PROCESO;
            swal({
              title: "ATENCION",
              text: "Tener presente responder las" + " " + 24 + " " + "preguntas de la evaluación",
              type: "warning"
            }).catch(swal.noop);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.consulta_Pregunta_rellenar = function (codigo_proceso) {
        $scope.procesodeConsulta = codigo_proceso;
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluaciondeldesempeno.php",
          data: {
            function: 'obtenerPregunta',
            vpproceso: codigo_proceso
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.cantidaddePregunta = data.length;
            $scope.list = data;

            setTimeout(() => {
              $scope.rellenarRespuestas(codigo_proceso);
            }, 900);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.rellenarRespuestas = function (proceso) {
        for (var j = 0; j < $scope.datosparaenviar.length; j++) {
          if ($scope.datosparaenviar[j].CODIGO_PROCESO == proceso) {
            $scope.datosparaenviar[j];
            for (var h = 0; h < $scope.list.length; h++) {
              for (var w = 0; w < $scope.list[h].RESPUESTAS.length; w++) {
                if ($scope.datosparaenviar[j].CODIGO_PROCESO == proceso
                  && $scope.datosparaenviar[j].COD_COMPETENCIA == $scope.list[h].COD_COMPETENCIA
                  && $scope.datosparaenviar[j].SELECT == $scope.list[h].RESPUESTAS[w].COD_RESPUESTA) {
                  let idCm = `${proceso}-${$scope.datosparaenviar[j].COD_COMPETENCIA}`;
                  document.getElementById('CM-' + idCm).value = $scope.datosparaenviar[j].OBSERVACION;
                  let id = `${$scope.list[h].COD_COMPETENCIA}-${$scope.list[h].RESPUESTAS[w].COD_RESPUESTA}-${proceso}`;
                  document.getElementById('NC-' + id).checked = true;
                }
              }
            }
          }
        }
      }
      $scope.validadorPreguntas = function (proceso, competencia, respuesta) {
        $scope.existe = 0;
        if ($scope.datosparaenviar.length > 0) {
          for (var j = 0; j < $scope.datosparaenviar.length; j++) {
            if ($scope.datosparaenviar[j].CODIGO_PROCESO == proceso && $scope.datosparaenviar[j].COD_COMPETENCIA == competencia) {
              $scope.datosparaenviar[j].SELECT = respuesta;
              $scope.datosparaenviar[j].OBSERVACION = document.getElementById("CM-" + proceso + "-" + competencia).value;
              if (respuesta == 1) {
                document.querySelector('#CM-' + proceso + '-' + competencia).classList.add('bordercolor');
              } else {
                document.querySelector('#CM-' + proceso + '-' + competencia).classList.remove('bordercolor');
                document.querySelector("#CM-" + proceso + "-" + competencia).classList.remove('bordercolorContestado');
              }
              if ($scope.datosparaenviar[j].OBSERVACION = document.getElementById("CM-" + proceso + "-" + competencia).value != "") {
                document.querySelector("#CM-" + proceso + "-" + competencia).classList.remove('bordercolor');
                document.querySelector("#CM-" + proceso + "-" + competencia).classList.add('bordercolorContestado');
              }
              $scope.existe = 1;
            }
          }
          if ($scope.existe == 0) {
            var datosenvi = {
              "CODIGO_PROCESO": proceso,
              "COD_COMPETENCIA": competencia,
              "SELECT": respuesta,
              "OBSERVACION": '',
            }
            $scope.datosparaenviar.push(datosenvi);
          }
        } else {
          var datosenvi = {
            "CODIGO_PROCESO": proceso,
            "COD_COMPETENCIA": competencia,
            "SELECT": respuesta,
            "OBSERVACION": '',
          }
          $scope.datosparaenviar.push(datosenvi);
        }
        $scope.cantPreguntas = $scope.datosparaenviar.length;
        if (datosenvi) {
          if (datosenvi.SELECT == 1) {
            document.querySelector('#CM-' + datosenvi.CODIGO_PROCESO + '-' + datosenvi.COD_COMPETENCIA).classList.add('bordercolor');
          } else {
            document.querySelector('#CM-' + datosenvi.CODIGO_PROCESO + '-' + datosenvi.COD_COMPETENCIA).classList.remove('bordercolor');
            document.querySelector('#CM-' + datosenvi.CODIGO_PROCESO + "-" + datosenvi.COD_COMPETENCIA).classList.remove('bordercolorContestado');
          }
        }
      }
      $scope.validarconteo = function () {
        for (var j = 0; j < $scope.datosparaenviar.length; j++) {
          if ($scope.datosparaenviar[j].CODIGO_PROCESO == $scope.procesodeConsulta) {
            let idCm = `${$scope.procesodeConsulta}-${$scope.datosparaenviar[j].COD_COMPETENCIA}`;
            $scope.datosparaenviar[j].OBSERVACION = document.getElementById('CM-' + idCm).value;
          }
          if ($scope.datosparaenviar[j].OBSERVACION == '' && $scope.datosparaenviar[j].SELECT == 1) {
            swal('Importante', 'Por favor ingrese la observacion para poder seguir', 'info')
            return;
          } else {

          }
        } if ($scope.cantidaddePregunta != $scope.cantPreguntas && $scope.cantPreguntas < 5) {
          swal('Importante', 'Complete las 5 preguntas de competencias organizacionales para poder seguir', 'info')
          $scope.pregunta1 = true;
        } else if ($scope.cantidaddePregunta != $scope.cantPreguntas && $scope.cantPreguntas < 18) {
          swal('Importante', 'Complete las 13 preguntas de las competencias blandas para poder seguir', 'info')
        } else if ($scope.cantidaddePregunta != $scope.cantPreguntas && $scope.cantPreguntas < 24) {
          swal('Importante', 'Complete las 6 preguntas de las competencias tecnicas para poder seguir', 'info')
          document.getElementById('preguntas1').style.display = 'none'
          document.getElementById('preguntas2').style.display = 'none'
          $scope.pregunta3 = true;
        } else if ($scope.cantPreguntas == 5) {
          $scope.pregunta2 = true;
          document.getElementById('preguntas1').style.display = 'none';
        } else if ($scope.cantPreguntas == 17) {
          document.getElementById('preguntas1').style.display = 'none'
          document.getElementById('preguntas2').style.display = 'none'
          $scope.pregunta3 = true;
        } if ($scope.cantPreguntas == 24) {
          swal({
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            cancelButtonText: "Cancelar",
            confirmButtonText: "OK",
            type: "warning",
            text: "Esta Seguro de Guardar La Evaluación",
          }).then(function (result) {
            if (result == true) {
              swal({
                title: 'Cargando...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/talentohumano/evaluaciondeldesempeno.php",
                data: {
                  function: 'generar_Evaluacion',
                  vpdocumento: $scope.numerodocumentEvaluado,
                  vpcargo: $scope.form1.Cargo,
                  vpjefe: $scope.numerodocumentJefe,
                  vparea: $scope.form1.Area,
                  vpfechaevaluacion: $scope.formatDatefecha($scope.form1.fechaVista),
                  vpaccion: "I",
                  vpcantidadpreguntas: $scope.cantPreguntas,
                  vjsonpreguntas: JSON.stringify($scope.datosparaenviar)
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  $scope.Inicio();
                  swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "OK",
                    type: "success",
                    text: "Evaluación guardada con Éxito",
                  }).then(function (result) {
                    if (result == true) {
                      $scope.Inicio();
                    }
                  });
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning"
                  }).catch(swal.noop);
                }
              });
            } else {
              $scope.cantPreguntas = 24;
              $scope.validacionGneral = 0;
            }
          });
        }
      }
      $scope.controldeVistas = function (vista) {
        if (vista == 'vistaGestion') {
          $scope.vistaGestion = true;
          $scope.vistaResulto = false;
          $scope.limpiar('result');
          $scope.Set_Tab('2');
          setTimeout(() => {
            $('#tabs_2').click();
          }, 1000);
        }
      }
      $scope.plandeDesarrollo = function (info) {
        $scope.vistaGestion = false;
        $scope.vistaResulto = true;
        $scope.numerodeEvaluacion = info.EVALUACION;
        $scope.docEmpleado = info.DOC_EMPLEADO;
        $scope.nombredelEvaluado = info.FUNCIONARIO;
        $scope.result.numeroEvaluacion = info.EVALUACION;
        $scope.result.proceso1 = info.PORC_PROCESO_1 + "%";
        $scope.result.proceso2 = info.PORC_PROCESO_2 + "%";
        $scope.result.proceso3 = info.PORC_PROCESO_3 + "%";
        $scope.result.total = info.PUNTAJE + "%";
      }
      $scope.p_obtener_planDesarrollo = function (dato) {
        $http({
          method: 'POST',
          url: "php/talentohumano/evaluaciondeldesempeno.php",
          data: {
            function: 'pobtenerplandesarrollo',
            vptipo: dato,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.Codigo == 0) {
              $scope.buscarGestion = '';
              swal({
                title: "!Info¡",
                text: data.Nombre + "" + 'evaluacion inferiores al 80%',
                type: "info",
              }).catch(swal.noop);
              $scope.listdeEvaluaciones = [];
              return
            } else {
              $scope.listdeEvaluaciones = data;
              $scope.validacionlistdeEvaluaciones = data.length;
              $scope.plan = data[0].PLAN;
              $scope.completado = true;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.guardar_Resultado = function () {
        if ($scope.infoswaltotalEvaluacion > 80) {
          $http({
            method: 'POST',
            url: "php/talentohumano/evaluaciondeldesempeno.php",
            data: {
              function: 'guardarResultado',
              vpevaluacion: $scope.numerodeEvaluacion,
              vpdocumento: $scope.docEmpleado,
              vpfortalezas: $scope.result.observacionesResult1,
              vpareas_mejorar: $scope.result.observacionesResult2,
              vpcomentarios_evaluado: $scope.result.observacionesResult3,
              vpcompromisos_evaluado: $scope.result.observacionesResult4,
              vpcomentarios_evaluador: $scope.result.observacionesResult5
            }
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != '<br') {
              swal({
                title: "Evaluacion",
                text: data.Nombre,
                type: "success",
              }).catch(swal.noop);
              $scope.verFormulario = true;
              $scope.iniciarProcesos = false;
              $scope.vistaResulto = false;
              $scope.Set_Tab(2);
              $scope.p_obtener_planDesarrollo('P');
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        } if ($scope.infoswaltotalEvaluacion < 80 && $scope.result.observacionesResult1 == '' || $scope.result.observacionesResult2 == '' || $scope.result.observacionesResult3 == '' || $scope.result.observacionesResult4 == '' || $scope.result.observacionesResult5 == '') {
          swal('Importante', 'Complete los campos requeridos (*)', 'info')
        } else {
          $http({
            method: 'POST',
            url: "php/talentohumano/evaluaciondeldesempeno.php",
            data: {
              function: 'guardarResultado',
              vpevaluacion: $scope.numerodeEvaluacion,
              vpdocumento: $scope.docEmpleado,
              vpfortalezas: $scope.result.observacionesResult1,
              vpareas_mejorar: $scope.result.observacionesResult2,
              vpcomentarios_evaluado: $scope.result.observacionesResult3,
              vpcompromisos_evaluado: $scope.result.observacionesResult4,
              vpcomentarios_evaluador: $scope.result.observacionesResult5
            }
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != '<br') {
              swal({
                title: "Evaluacion",
                text: data.Nombre,
                type: "success",
              }).catch(swal.noop);
              $scope.verFormulario = true;
              $scope.iniciarProcesos = false;
              $scope.vistaResulto = false;
              $scope.Set_Tab(2);
              $scope.p_obtener_planDesarrollo('P');
            } else {
              wal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.imprimirSupervision = function (info, dato) {
        if (dato == 'N') {
          $window.open('views/talentohumano/formatos/view_evaluaciondedesempeno.php?&n_evaluacion=' + info.EVALUACION + '&vpnumero=' + info.DOC_EMPLEADO);
          $scope.verFormulario = true;
          $scope.iniciarProcesos = false;
          $scope.vistaResulto = false;
          $scope.Set_Tab('2');
        } else {
          $window.open('views/talentohumano/formatos/evaluaciondedesempeno.php?&n_evaluacion=' + info.EVALUACION + '&vpnumero=' + info.DOC_EMPLEADO);
          $scope.verFormulario = true;
          $scope.iniciarProcesos = false;
          $scope.vistaResulto = false;
          $scope.Set_Tab('2');
        }
      }
      $scope.Set_Tab = function (x) {
        $scope.Tabs = x;
        if (x == 1) {
          $scope.vistaGestion = false;
          $scope.plandedesarrollo = false;
          $scope.formularioEvaluacion = true;
          $scope.buscarGestion = '';
          $scope.listdeEvaluaciones = [];
        } if (x == 2) {
          $scope.p_obtener_planDesarrollo('P');
          $scope.buscarGestion = '';
          $scope.listdeEvaluaciones = [];
          $scope.filtrocheck_option = 'PLAN_DE_DESARROLLO';
          $scope.plandedesarrollo = true;
          $scope.formularioEvaluacion = false;
          $scope.vistaGestion = true;
        } if (x == 3) {
          $scope.p_obtener_planDesarrollo('T');
          $scope.buscarGestion = '';
          $scope.listdeEvaluaciones = [];
          $scope.filtrocheck_option = 'CONSOLIDADO_GENERAL';
          $scope.plandedesarrollo = true;
          $scope.formularioEvaluacion = false;
          $scope.vistaGestion = true;
        }
      }
      $scope.openmodals = function (tipo, info) {
        $scope.listadodePrestadores = [];
        switch (tipo) {
          case 'listdeFuncionario':
            $("#modallistFuncionarios").modal("open");
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'listdeFuncionario':
            $("#modallistFuncionarios").modal("close");
            break;
          default:
        }
      }
      $scope.formatDatefecha = function (date) {
        console.log(date);
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatHora = function (date) {
        if (minutos < 10) { minutos = "0" + minutos; }
        var d = new Date(date);
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var minutos = d.getMinutes();
        return hh + ':' + minutos + ':00';
      }
      $scope.formatPeso = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace(".", ",");
            num = num.split(",");
            num[0] = num[0]
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num[0] = num[0].split("").reverse().join("").replace(/^[\.]/, "");
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + "0";
            }
            return num[0] + "," + num[1];
          } else {
            num = num
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return "$" + num + "";
          }
        }
      };
      $scope.formatDatehora = function (date) {
        var x = document.getElementById("myTime").value;
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      }
      $scope.formatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor.toString().toUpperCase();
      }
      $scope.chg_filtrar = function (varFiltro) {
        if ($scope.Vista1[varFiltro] == '' || $scope.Vista1[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista1.Filtrar_tconsulta = '';
        }
      }
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.list_DatosTemp.length;
          $scope.valmaxpag = $scope.list_DatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
          console.log($scope.calcular);
        }
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
      });
    }])
  .directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
