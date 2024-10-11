'use strict';
angular.module('GenesisApp')
  .controller('supervisiondecontratoController', ['$scope', '$http', '$window',
    function ($scope, $http, $window) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        $scope.SysDay = new Date();
        $scope.vistaConsulta = true;
        $scope.vistaconsultaContrato = false;
        $scope.vistanuevaSupervision = false;
        $scope.visualTable = false;
        $scope.iniciarProcesos = false;
        $scope.vistaResulto = false;
        $scope.vistaUpdate = false;
        $scope.calcularResultado = false;
        $scope.iniciarproccesosPausados = false;
        $scope.preguntaProceso1 = false;
        $scope.preguntaProceso2 = false;
        $scope.preguntaProceso3 = false;
        $scope.preguntaProceso4 = false;
        $scope.preguntaProceso5 = false;
        $scope.preguntaProceso6 = false;
        $scope.preguntaProceso7 = false;
        $scope.preguntaProcesopausado = false;
        $scope.vistapreguntasUpdate = false;
        $scope.vistarespuestaUpdate = false;
        $scope.control_inicio_Seccion();
        $scope.inicioContador();
        $scope.limpiar('form1');
        $scope.limpiar('result');
        $scope.limpiar('editresult');
        $scope.limpiar('edit');
        $('.modal').modal();
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
        $scope.list_DatosTemp = [];
        // $scope.validar_datos();
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
        $scope.filtrocheck_option = {};
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
            $scope.listaContrato = [];
            $scope.listaConsulta = [];
            $scope.form1 = {
              nombre_prest_supervisado: '',
              nombre_prestsupervisado: '',
              fecha_Vista: '',
              selec_Grupo: '',
              super_cajacopi: '',
              regional: '',
              numeroDocumento: '',
              representante_prestador: '',
              cargo_repredentante: '',
              supervisor_cajacopi: '',
              represante_prestador: '',
              cargo_representante: '',
              numero_contrato: '',
              objeto: '',
              fechainicio: '',
              fechafinal: '',
              formato_pago: '',
              valor: '',
              tipo_garantia: '',
              vigencia_garantia: '',
              observaciones: '',
              observacionesResult1: '',
              observacionesResult2: ''
            }
            break;
          case 'form2':
            $scope.form2 = {
              nombre_prest_consulta: '',

            }
            break;
          case 'result':
            $scope.result = {
              proceso1: '',
              proceso2: '',
              proceso3: '',
              proceso4: '',
              proceso5: '',
              proceso6: '',
              proceso7: '',
              total: '',
              calificacion: ''
            }
            break;
          case 'edit':
            $scope.listaContrato = [];
            $scope.listaConsulta = [];
            $scope.edit = {
              nombre_prest_supervisado: '',
              nombre_prestsupervisado: '',
              fecha_Vista: '',
              selec_Grupo: '',
              super_cajacopi: '',
              regional: '',
              numeroDocumento: '',
              representante_prestador: '',
              cargo_repredentante: '',
              supervisor_cajacopi: '',
              represante_prestador: '',
              cargo_representante: '',
              numero_contrato: '',
              objeto: '',
              fechainicio: '',
              fechafinal: '',
              formato_pago: '',
              valor: '',
              tipo_garantia: '',
              vigencia_garantia: '',
              observaciones: '',
              observacionesResult1: '',
              observacionesResult2: ''
            }
            break;
          case 'editresult':
            $scope.editresult = {
              proceso1: '',
              proceso2: '',
              proceso3: '',
              proceso4: '',
              proceso5: '',
              proceso6: '',
              proceso7: '',
              total: '',
              calificacion: ''
            }
            break;
          default:
        }
      }
      $scope.consulta_supervisionPausada = function (ID) {
        //console.log(ID);
        $scope.vistaConsulta = false;
        $scope.iniciarproccesosPausados = true;
        $scope.preguntaProcesopausado = true;
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'obtenersupervisionPausada',
            vprenglon: ID.ID_PROCESO,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            //console.log(data);
            $scope.informacionGeneral = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.procesodepreguntasPausadas = function (P) {
        $scope.numerodeProceso = P;
        let info = P + 1;
        //console.log($scope.numerodeProceso);
        if (info == 8) {
          $scope.calcularResultado = true;
          $scope.preguntaProcesopausado = false;
          return
        }
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.numerodeProceso.PROCESO || info
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            //console.log(response);
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
              }
            });
            $scope.preguntasGeneral = $scope.lista_procesos;
          }
        });

      }
      $scope.inicioContador = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'cantadorContrato',
            vpinterventor: $scope.responsable,
            //vpinterventor: '32705299',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.contaContrato = data;

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.control_inicio_Seccion = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'listarContrato',
            //vpinterventor: '32705299',
            vpinterventor: $scope.responsable,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.lista_Contrato = data;

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.controldevistaInicial = function (info, dato) {
        $scope.filtrocheck_option = info;
        if (info == 'CC') {
          $scope.limpiar('form2');
          $scope.consulta_Contrato(dato);
          $scope.vistaConsulta = false;
          $scope.vistaconsultaContrato = true;
          $scope.vistanuevaSupervision = false;
        } else {
          $scope.limpiar('form1');
          $scope.consulta_Prestador2(dato);
          $scope.listContrato = [];
          $scope.vistaConsulta = false;
          $scope.vistanuevaSupervision = true;
          $scope.vistaconsultaContrato = false;
        }
      }
      $scope.consultar_lista_Contrato = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultarlistaContrato',
            vpnit: $scope.form1.nombre_prest_supervisado,
            vpregimen: $scope.form1.selec_Grupo
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listaContrato = response.data;
            $scope.ubicacionLsitacontrato = response.data[0].UBICACION;

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.optener_Contrato = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'optenerContrato',
            vpdocumento: $scope.form1.selec_Grupo,
            vpnumero: $scope.form1.numero_contrato,
            vpubicacion: $scope.ubicacionLsitacontrato
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.form1.cargo_representante = response.data[0].HABILITACION;
            $scope.form1.super_cajacopi = response.data[0].NOMBRE_INTERVENTOR;
            $scope.super_caajacopi = response.data[0].INTERVENTOR;
            $scope.form1.fechainicio = response.data[0].F_INICIAL;
            $scope.form1.fechafinal = response.data[0].F_FINAL;
            $scope.form1.formato_pago = response.data[0].FORMA_PAGO;
            $scope.form1.valor = $scope.formatPeso(response.data[0].VALOR);
            $scope.form1.tipo_garantia = response.data[0].GARANTIA;
            $scope.form1.vigencia_garantia = response.data[0].VIGENCIA_GARANTIA;
            $scope.consul_dias_Controtrato();
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.optener_contrato_Total = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaContratos',
            vpdocumento: $scope.form1.selec_Grupo,
            vpnit: $scope.form1.nombre_prest_supervisado,
          }
        }).then(function (response) {
          //console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listContrato = response.data;
            $scope.form1.observaciones = response.data[0].SERVCIOS;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.consul_dias_Controtrato = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consul_dias_Controtrato',
            vpdocumento: $scope.form1.selec_Grupo,
            vpnumero: $scope.form1.numero_contrato,
            vpubicacion: $scope.ubicacionLsitacontrato
          }
        }).then(function (response) {
          // //console.log(response.data);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if (response.data.Codigo != 0) {
              swal({
                title: 'IMPORTANTE',
                text: response.data.Nombre,
                type: 'warning',
                showCancelButton: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then(function () {
                swal({
                  title: "Ok",
                  text: 'Puedes seguir con el proceso de auditoria',
                  type: "success"
                }).catch(swal.noop);
              }, function (dismiss) {
                if (dismiss == 'cancel') {
                  setTimeout(() => {
                    $scope.limpiar('form1');
                    $scope.$apply();
                  }, 50);
                }
              });
            } else {
              $scope.optener_Contrato();
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
      $scope.validar_datos = function (data) {
        if (data == 'U') {
          if ($scope.edit.fecha_Vista == '' || $scope.edit.fecha_Vista == undefined || $scope.edit.nombre_prest_supervisado == ''
            || $scope.edit.representante_prestador == '' || $scope.edit.cargo_repredentante == '' || $scope.edit.observaciones == '') {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          } else {
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea actualizar el proceso de supervision?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                $scope.vistaUpdate = false;
                $scope.vistapreguntasUpdate = true;
                setTimeout(() => {
                  $scope.consulta_Pregunta('U');
                  $scope.$apply();
                }, 50);
              }
            });
          }
        } if (data == 'I') {
          if ($scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.selec_Grupo == '' || $scope.form1.nombre_prest_supervisado == ''
            || $scope.form1.representante_prestador == '' || $scope.form1.cargo_repredentante == '' || $scope.form1.observaciones == '') {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          } else {
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea seguir con el proceso de supervision?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                $scope.iniciarProcesos = true;
                $scope.vistanuevaSupervision = false;
                $scope.preguntaProceso1 = true;
                setTimeout(() => {
                  $scope.consulta_Pregunta1('I');
                  $scope.$apply();
                }, 50);
              }
            });
          }
        }
      }
      $scope.consulta_Pregunta1 = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: 1
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta2 = function (accion) {
        $scope.secuencia = accion + 1;
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta3 = function (accion) {
        //console.log(accion);
        $scope.secuencia = accion + 1;
        //console.log($scope.secuencia);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta4 = function (accion) {
        //console.log(accion);
        $scope.secuencia = accion + 1;
        //console.log($scope.secuencia);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta5 = function (accion) {
        //console.log(accion);
        $scope.secuencia = accion + 1;
        //console.log($scope.secuencia);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta6 = function (accion) {
        //console.log(accion);
        $scope.secuencia = accion + 1;
        //console.log($scope.secuencia);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta7 = function (accion) {
        //console.log(accion);
        $scope.secuencia = accion + 1;
        //console.log($scope.secuencia);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaPregunta',
            vpproceso: $scope.secuencia
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.lista_preguntas = response.data;
            $scope.lista_procesos = []

            response.data.forEach(element => {
              if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                $scope.lista_procesos.push({
                  "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                  PREGUNTAS: [{
                    CODIGO_PROCESO: element.CODIGO_PROCESO,
                    NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                    CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                    NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                    SELECT: '',
                    OBSERVACION: ''
                  }]
                });
              } else {
                // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: '',
                  OBSERVACION: ''
                })
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
      }
      $scope.consulta_Pregunta = function (accion, preguntas) {
        if (preguntas == null || preguntas == undefined) {
          $scope.numeroPregunta = '1';
        } else {
          $scope.numeroPregunta = preguntas;
          if (accion == 'U') {
            $http({
              method: 'POST',
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: 'consultaPregunta',
                vpproceso: $scope.numeroPregunta
              }
            }).then(function (response) {
              //console.log(response.data);
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.lista_preguntas = response.data;
                $scope.lista_procesos = []
                $scope.contarpreguntas = $scope.lista_procesos.length;
                //console.log($scope.contarpreguntas);
                response.data.forEach(e => {
                  let input1 = document.getElementById('uddate' + '-' + e.CODIGO_PROCESO + '_' + e.CODIGO_PREGUNTA);
                  let Texto1 = document.getElementById(e.CODIGO_PROCESO + '_' + e.CODIGO_PREGUNTA);
                  input1.classList.remove("error-input");
                  Texto1.classList.remove("red-text");
                  response.data.forEach(x => {
                    let Input2 = document.getElementById('obervacion-update' + '-' + x.CODIGO_PROCESO + '_' + x.CODIGO_PREGUNTA);
                    let Text2 = document.getElementById('id-obervacion-update' + '-' + x.CODIGO_PROCESO + '_' + x.CODIGO_PREGUNTA);
                    Input2.classList.remove("error-input");
                    Text2.classList.remove("red-text");
                  });
                });
                response.data.forEach(element => {
                  if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                    $scope.lista_procesos.push({
                      "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                      PREGUNTAS: [{
                        CODIGO_PROCESO: element.CODIGO_PROCESO,
                        NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                        CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                        NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                        SELECT: '',
                        OBSERVACION: ''
                      }]
                    });
                  } else {
                    // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                    $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                      CODIGO_PROCESO: element.CODIGO_PROCESO,
                      NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                      CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                      NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                      SELECT: '',
                      OBSERVACION: ''
                    })
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
          } else if (accion == 'I') {
            $http({
              method: 'POST',
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: 'consultaPregunta',
                vpproceso: $scope.numeroPregunta
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.lista_preguntas = response.data;
                $scope.lista_procesos = []

                response.data.forEach(element => {
                  if (($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)) == -1) {
                    $scope.lista_procesos.push({
                      "CODIGO_PROCESO": element.CODIGO_PROCESO, "NOMBRE_PROCESO": element.NOMBRE_PROCESO,
                      PREGUNTAS: [{
                        CODIGO_PROCESO: element.CODIGO_PROCESO,
                        NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                        CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                        NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                        SELECT: '',
                        OBSERVACION: ''
                      }]
                    });
                  } else {
                    // //console.log($scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO))
                    $scope.lista_procesos[$scope.lista_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                      CODIGO_PROCESO: element.CODIGO_PROCESO,
                      NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                      CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                      NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                      SELECT: '',
                      OBSERVACION: ''
                    })
                  }
                });
                $scope.contarpreguntas = $scope.lista_preguntas.length;
                //console.log($scope.contarpreguntas);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          }
        }

      }
      $scope.calculacontratoPausado = function () {
        let info = $scope.informacionGeneral;
        $scope.info_v_pidproceso = info.cab[0].Id_proceso;
        //console.log($scope.info_v_pidproceso);
        let preguntas = $scope.preguntasGeneral
        //console.log(info);
        var datos = [];
        let vacioEncontrados = 0;
        preguntas.forEach(x => {
          x.PREGUNTAS.forEach(y => {
            //console.log(y);
            if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
              vacioEncontrados = vacioEncontrados + 1;
              document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
            } else {
              datos.push({
                CODIGO_PROCESO: y.CODIGO_PROCESO,
                CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                SELECT: y.SELECT,
                OBSERVACION: y.OBSERVACION,
              })
            }
          });
          $scope.contPreguntas = datos.length;
          //console.log($scope.contPreguntas);
        });
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro de guardar el proceso de la supervision?",
          type: "question",
          showCancelButton: true,
        }).then((result) => {
          if (result) {
            if (vacioEncontrados == 0) {
              $http({
                method: 'POST',
                url: "php/contratacion/supervisiondecontrato.php",
                data: {
                  function: 'guardarrevisionContrato',
                  vpdocumento: '',
                  vpnit: '',
                  vpregional: '',
                  vpfechavisita: '',
                  vpcedulasupervisorips: '',
                  vprepresentanteips: '',
                  vpcargorepreentante: '',
                  vpobservacion: '',
                  vpaccion: 'I',
                  vpcantidadpreguntas: datos.length,
                  // El JSON,toString sirve apara tomar un array y enviarlo como json
                  vpidproceso: $scope.info_v_pidproceso,
                  vjsonpreguntas: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                // $scope.consulta_supervisionPausada(data.Renglon);
                // $scope.procesodepreguntasPausadas(data.Proceso);
                //console.log(data);
                if (data && data.toString().substr(0, 3) != '<br') {
                  $scope.procesodepreguntasPausadas(data.Proceso);
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning"
                  }).catch(swal.noop);
                }
              });
            } else {
              swal('Importante', 'Complete los campos requeridos (*)', 'info')
            }
          }
        });
      }
      $scope.cancular_Contrato = function (dato) {
        console.log(dato);
        if (dato == 'U') {
          if ($scope.edit.nombre_prest_supervisado == '' || $scope.edit.nombre_prest_supervisado == undefined || $scope.edit.fecha_Vista == '' || $scope.edit.fecha_Vista == undefined || $scope.edit.numeroDocumento == '' || $scope.edit.numeroDocumento == undefined || $scope.edit.representante_prestador == '' || $scope.edit.representante_prestador == undefined || $scope.edit.cargo_repredentante == '' || $scope.edit.cargo_repredentante == undefined || $scope.edit.observaciones == '' || $scope.edit.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos_edit.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                if (y.select == '' || ((y.select == '1' || y.select == '2' || y.select == '3') && (y.Observacion == '' || y.Observacion == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.Cod_proceso).style.display = 'block'
                } else {
                  datos.push({
                    Cod_proceso: y.Cod_proceso,
                    Cod_pregunta: y.Cod_pregunta,
                    select: y.select,
                    Observacion: y.Observacion,
                  })
                }
              });
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: $scope.edit.selec_Grupo,
                      vpnit: $scope.edit.nombre_prest_supervisado,
                      vpregional: $scope.codigoubicacionLsitacontrato,
                      vpfechavisita: $scope.formatDatefecha($scope.edit.fecha_Vista),
                      vpcedulasupervisorips: $scope.edit.numeroDocumento,
                      vprepresentanteips: $scope.edit.representante_prestador,
                      vpcargorepreentante: $scope.edit.cargo_repredentante,
                      vpobservacion: $scope.edit.observaciones,
                      vpaccion: 'U',
                      vpcantidadpreguntas: datos.length,
                      vpidproceso: $scope.idUpdata,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    // //console.log(data);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);
                      $scope.lista_preguntas = '';
                      $scope.lista_procesos_edit = '';
                      $scope.calcula_Resultado('U');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')
                }
              }
            });
          }
        } if (dato == 1) {
          $scope.preguntaProceso1 = true;
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: $scope.form1.selec_Grupo,
                      vpnit: $scope.form1.nombre_prest_supervisado,
                      vpregional: $scope.codigoubicacionLsitacontrato,
                      vpfechavisita: $scope.formatDatefecha($scope.form1.fecha_Vista),
                      vpcedulasupervisorips: $scope.form1.numeroDocumento,
                      vprepresentanteips: $scope.form1.representante_prestador,
                      vpcargorepreentante: $scope.form1.cargo_repredentante,
                      vpobservacion: $scope.form1.observaciones,
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = true;
                    $scope.dataReglon = data.Renglon;
                    $scope.consulta_Pregunta2(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }
        } if (dato == 2) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)

                    }
                  }).then(function ({ data 
                  }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = true;
                    $scope.consulta_Pregunta3(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }

        } if (dato == 3) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = false;
                    $scope.preguntaProceso4 = true;
                    $scope.consulta_Pregunta4(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }
        } if (dato == 4) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = false;
                    $scope.preguntaProceso4 = false;
                    $scope.preguntaProceso5 = true;
                    $scope.consulta_Pregunta5(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }
        } if (dato == 5) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = false;
                    $scope.preguntaProceso4 = false;
                    $scope.preguntaProceso5 = false;
                    $scope.preguntaProceso6 = true;
                    $scope.consulta_Pregunta6(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }
        } if (dato == 6) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = false;
                    $scope.preguntaProceso4 = false;
                    $scope.preguntaProceso5 = false;
                    $scope.preguntaProceso6 = false;
                    $scope.preguntaProceso7 = true;
                    $scope.consulta_Pregunta7(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }

        } if (dato == 7) {
          if ($scope.form1.nombre_prest_supervisado == '' || $scope.form1.nombre_prest_supervisado == undefined || $scope.form1.fecha_Vista == '' || $scope.form1.fecha_Vista == undefined || $scope.form1.numeroDocumento == '' || $scope.form1.representante_prestador == '' || $scope.form1.representante_prestador == undefined || $scope.form1.cargo_repredentante == '' || $scope.form1.cargo_repredentante == undefined || $scope.form1.observaciones == '' || $scope.form1.observaciones == undefined) {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
            $scope.iniciarProcesos = false;
            return;
          } else {
            $scope.textvalidate = "Complete los campos requeridos (*)";
            var datos = [];
            let vacioEncontrados = 0;
            $scope.lista_procesos.forEach(x => {
              x.PREGUNTAS.forEach(y => {
                //console.log(y);
                if (y.SELECT == '' || ((y.SELECT == '1' || y.SELECT == '2' || y.SELECT == '3') && (y.OBSERVACION == '' || y.OBSERVACION == undefined))) {
                  vacioEncontrados = vacioEncontrados + 1;
                  document.getElementById(x.CODIGO_PROCESO).style.display = 'block'
                } else {
                  datos.push({
                    CODIGO_PROCESO: y.CODIGO_PROCESO,
                    CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                    SELECT: y.SELECT,
                    OBSERVACION: y.OBSERVACION,
                  })
                }
              });
              $scope.contPreguntas = datos.length;
              //console.log($scope.contPreguntas);
            });
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea calcular el contrato?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                if (vacioEncontrados == 0) {
                  $http({
                    method: 'POST',
                    url: "php/contratacion/supervisiondecontrato.php",
                    data: {
                      function: 'guardarrevisionContrato',
                      vpdocumento: '',
                      vpnit: '',
                      vpregional: '',
                      vpfechavisita: '',
                      vpcedulasupervisorips: '',
                      vprepresentanteips: '',
                      vpcargorepreentante: '',
                      vpobservacion: '',
                      vpaccion: 'I',
                      vpcantidadpreguntas: datos.length,
                      // El JSON,toString sirve apara tomar un array y enviarlo como json
                      vpidproceso: $scope.dataReglon,
                      vjsonpreguntas: JSON.stringify(datos)
                    }
                  }).then(function ({ data }) {
                    //console.log(data);
                    $scope.preguntaProceso1 = false;
                    $scope.preguntaProceso2 = false;
                    $scope.preguntaProceso3 = false;
                    $scope.preguntaProceso4 = false;
                    $scope.preguntaProceso5 = false;
                    $scope.preguntaProceso6 = false;
                    $scope.preguntaProceso7 = false;
                    $scope.calcularResultado = true;
                    // $scope.consulta_Pregunta8(data.Proceso);
                    if (data && data.toString().substr(0, 3) != '<br') {
                      $scope.infoRenglon = data.Renglon;
                      swal({
                        title: "Proceso de supervision",
                        text: "Guardado con exito",
                        type: "success",
                      }).catch(swal.noop);

                      $scope.lista_preguntas = '';
                      $scope.lista_procesos = '';
                      // $scope.vistade_Resultado('I');
                    } else {
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data,
                        type: "warning"
                      }).catch(swal.noop);
                    }
                  });
                } else {
                  swal('Importante', $scope.textvalidate, 'info')

                }
              }
            });
          }

        }
      }
      $scope.calcula_Resultado = function (accion) {
        if (accion == 'U') {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'calculaResultado',
              vpidproceso: $scope.dataReglon || $scope.info_v_pidproceso
            }
          }).then(function (response) {
            //console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              swal.close();
              swal({
                title: "Resumen de la supervision",
                text: "Datos Calculados",
                type: "success",
              }).catch(swal.noop);
              $scope.vistade_Resultado('U');
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        } if (accion == 'I') {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'calculaResultado',
              vpidproceso: $scope.dataReglon || $scope.info_v_pidproceso
            }
          }).then(function (response) {
            //console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              swal.close();
              swal({
                title: "Resumen de la supervision",
                text: "Datos Calculados",
                type: "success",
              }).catch(swal.noop);
              $scope.preguntaProcesopausado = false;
              $scope.vistade_Resultado('I');
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });


        }

      }
      $scope.vistade_Resultado = function (data) {
        if (data == 'U') {
          $scope.iniciarProcesos = false;
          $scope.vistapreguntasUpdate = false
          $scope.vistarespuestaUpdate = true;
          $scope.optener_Resultado('U');
        } if (data == 'I') {
          $scope.iniciarProcesos = false;
          $scope.vistanuevaSupervision = false;
          $scope.vistaResulto = true;
          $scope.optener_Resultado('I');
        }
      }
      $scope.optener_Resultado = function (accion) {
        if (accion == 'U') {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'optenerResultado',
              vpidproceso: $scope.updateReglon
            }
          }).then(function (response) {
            // //console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              swal.close();
              $scope.editresult.proceso1 = response.data[0].PROCESO_1;
              $scope.editresult.proceso2 = response.data[0].PROCESO_2;
              $scope.editresult.proceso3 = response.data[0].PROCESO_3;
              $scope.editresult.proceso4 = response.data[0].PROCESO_4;
              $scope.editresult.proceso5 = response.data[0].PROCESO_5;
              $scope.editresult.proceso6 = response.data[0].PROCESO_6;
              $scope.editresult.proceso7 = response.data[0].PROCESO_7;
              $scope.editresult.total = response.data[0].TOTAL;
              $scope.editresult.calificacion = response.data[0].CALIFICACION;
              $scope.edit.observacionesResult1 = response.data[0].CONCLUSIONES;
              $scope.edit.observacionesResult2 = response.data[0].RECOMENDACIONES;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });

        } else if (accion == 'I') {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'optenerResultado',
              vpidproceso: $scope.infoRenglon || $scope.info_v_pidproceso
            }
          }).then(function (response) {
            //console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              swal.close();
              $scope.result.proceso1 = response.data[0].PROCESO_1;
              $scope.result.proceso2 = response.data[0].PROCESO_2;
              $scope.result.proceso3 = response.data[0].PROCESO_3;
              $scope.result.proceso4 = response.data[0].PROCESO_4;
              $scope.result.proceso5 = response.data[0].PROCESO_5;
              $scope.result.proceso6 = response.data[0].PROCESO_6;
              $scope.result.proceso7 = response.data[0].PROCESO_7;
              $scope.result.total = response.data[0].TOTAL;
              $scope.result.calificacion = response.data[0].CALIFICACION;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.imprimirSupervision = function (info, accion) {
        //console.log(info);
        //console.log(accion);
        if (accion == 'N') {
          $window.open('views/contratacion/formatos/view_formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=' + info.DOCUMENTO + '&vpnumero=' +
            info.CONTRATO + '&vpubicacion=' + info.UBICACION + '&vprenglon=' + info.RENGLON);
        } else {
          $window.open('views/contratacion/formatos/formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=' + info.DOCUMENTO + '&vpnumero=' +
            info.CONTRATO + '&vpubicacion=' + info.UBICACION + '&vprenglon=' + info.RENGLON);
        }
      }
      $scope.guardar_Resultado = function (accion) {
        if (accion == 'U') {
          if ($scope.edit.observacionesResult2 == '' && $scope.edit.observacionesResult2 == '') {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          } else {
            $http({
              method: 'POST',
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: 'guardarResultado',
                vpidproceso: $scope.updateReglon,
                vpconclusiones: $scope.edit.observacionesResult1,
                vprecomendaciones: $scope.edit.observacionesResult2,
                vpaccion: accion
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.Inicio();
                swal({
                  title: "Contrato",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                $window.open('views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=' + $scope.updateReglon);
              } else {
                wal({
                  title: "¡Ocurrio un error!",
                  text: data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          }
        } else if (accion == 'I') {
          if ($scope.form1.observacionesResult2 == '' && $scope.form1.observacionesResult2 == '') {
            swal('Importante', 'Complete los campos requeridos (*)', 'info')
          } else {
            $http({
              method: 'POST',
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: 'guardarResultado',
                vpidproceso: $scope.infoRenglon,
                vpconclusiones: $scope.form1.observacionesResult1,
                vprecomendaciones: $scope.form1.observacionesResult2,
                vpaccion: accion
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.Inicio();
                swal({
                  title: "Contrato",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                $window.open('views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=' + $scope.infoRenglon);

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
      }
      $scope.editarContrato = function (info) {
        $scope.updateReglon = info.RENGLON;
        let input1 = document.getElementById('edi_fecha_Vista');
        let Texto1 = document.getElementById('label_edi_fecha_Vista');
        input1.classList.remove("error-input");
        Texto1.classList.remove("red-text");
        let input2 = document.getElementById('idnumeroDocumento');
        let Texto2 = document.getElementById('id_edit_numeroDocumento_label');
        input2.classList.remove("error-input");
        Texto2.classList.remove("red-text");
        let input3 = document.getElementById('editrepresentanteprestador');
        let Texto3 = document.getElementById('id_editrepresentanteprestador_label');
        input3.classList.remove("error-input");
        Texto3.classList.remove("red-text");
        let input4 = document.getElementById('editcargorepredentante');
        let Texto4 = document.getElementById('id_edit_cargorepredentante_label');
        input4.classList.remove("error-input");
        Texto4.classList.remove("red-text");
        $scope.vistaUpdate = true;
        $scope.vistaconsultaContrato = false;
        // //console.log(info);
        $http({
          method: 'POST',
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'consultaReporteUnitario',
            vpdocumento: info.DOCUMENTO,
            vpnumero: info.CONTRATO,
            vpubicacion: info.UBICACION,
            vprenglon: info.RENGLON
          },
        }).then(function ({ data }) {
          var partesFecha = data.cab[0].Fecha_visita.split('/');
          var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
          // //console.log(data);
          $scope.edit.fecha_Vista = fecha;
          // //console.log($scope.edit.fecha_Vista);
          $scope.edit.nombre_prest_supervisado = data.cab[0].Nit;
          $scope.edit.supervisor_cajacopi = data.cab[0].Nombre_IPS;
          $scope.edit.regional = data.cab[0].Regional;
          $scope.edit.numeroDocumento = data.cab[0].Documento_supervisor_ips;
          $scope.edit.representante_prestador = data.cab[0].Representante_ips;
          $scope.edit.cargo_repredentante = data.cab[0].Cargo_repreentante;
          $scope.edit.observaciones = data.cab[0].observacion;
          $scope.idUpdata = data.cab[0].Id_proceso;
          // $scope.edit.selec_Grupo = $scope.data.cab[0].
          $scope.lista_procesos_edit = []
          data.detalle.forEach(element => {
            // //console.log(element);
            if (($scope.lista_procesos_edit.findIndex((e) => e.Cod_proceso == element.Cod_proceso)) == -1) {
              $scope.lista_procesos_edit.push({
                "Cod_proceso": element.Cod_proceso, "Nombre_proceso": element.Nombre_proceso,
                PREGUNTAS: [{
                  Cod_proceso: element.Cod_proceso,
                  Nombre_proceso: element.Nombre_proceso,
                  Cod_pregunta: element.Cod_pregunta,
                  Nombre_pregunta: element.Nombre_pregunta,
                  select: element.Cod_pregunta,
                  Observacion: element.Observacion
                }]
              });
            } else {
              // //console.log($scope.lista_procesos_edit.findIndex((e) => e.Cod_proceso == element.Cod_proceso))
              $scope.lista_procesos_edit[$scope.lista_procesos_edit.findIndex((e) => e.Cod_proceso == element.Cod_proceso)].PREGUNTAS.push({
                Cod_proceso: element.Cod_proceso,
                Nombre_proceso: element.Nombre_proceso,
                Cod_pregunta: element.Cod_pregunta,
                Nombre_pregunta: element.Nombre_pregunta,
                select: element.Cod_pregunta,
                Observacion: element.Observacion
              })
            }
          });
        });
      }
      $scope.validarFormularios = function () {
        if ($scope.form1.nombre_prest_supervisado != '' || $scope.form1.fecha_Vista != '' || $scope.form1.representante_prestador != '' || $scope.form1.numero_contrato != '' || $scope.form1.cargo_repredentante != '' || $scope.form1.observaciones != '') {
          $scope.iniciarProcesos = 1;
          $scope.vistanuevaSupervision = false;
        }
      }
      $scope.consulta_Prestador1 = function () {
        if ($scope.buscard1 == '' || $scope.buscard1 == null) {
          swal({
            title: "Notificación",
            text: '!Por favor ingrese el nombre o numero del prestador a consultar!',
            type: "warning"
          }).catch(swal.noop);
        } else {

          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'consultarPrestador',
              valorNit: $scope.buscard1
            }
          }).then(function ({ data }) {
            // //console.log(data);
            if (data && data.toString().substr(0, 3) != '<br') {
              swal.close();
              $scope.listadodePrestadores1 = data;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });

        }
      }
      $scope.consulta_Prestador2 = function (data) {
        if (data.CODIGO == '' || data.CODIGO == null) {
          swal({
            title: "Notificación",
            text: '!Por favor ingrese el nombre o numero del prestador a consultar!',
            type: "warning"
          }).catch(swal.noop);
        } else {

          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'consultarPrestador',
              valorNit: data.CODIGO
            }
          }).then(function ({ data }) {
            //console.log(data);
            if (data && data.toString().substr(0, 3) != '<br') {
              swal.close();

              $scope.form1.nombre_prest_supervisado = data[0].CODIGO;
              $scope.form1.supervisor_cajacopi = data[0].NOMBRE;
              $scope.form1.regional = data[0].REGIONAL;
              // $scope.listadodePrestadores2 = data;
              $scope.codigoubicacionLsitacontrato = data[0].COD_REGIONAL;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });

        }
      }
      $scope.consulta_Contrato = function (data) {
        //console.log(data);
        if (data.CODIGO == '' || data.CODIGO == null) {
          swal({
            title: "Notificación",
            text: '!Por favor ingrese el nombre o numero del prestador a consultar!',
            type: "warning"
          }).catch(swal.noop);
        } else {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: 'consultaunicoContratos',
              vpnit: data.CODIGO,
            }
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != '<br') {
              swal.close();
              $scope.listaConsulta = data;
              $scope.visualTable = true;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });

        }
      }
      $scope.openmodals = function (tipo, info) {
        $scope.buscard1 = "";
        $scope.buscard2 = "";
        switch (tipo) {
          case 'listprestadoresSupervisados':
            $scope.listadodePrestadores2 = [];
            $("#modallistprestadoresSupervisados").modal("open");
            setTimeout(() => {
              $('#buscard2').focus();
            }, 100);
            break;
          case 'consultaPrestador':
            $scope.listadodePrestadores1 = [];
            $("#modalconsultaPrestador").modal("open");
            setTimeout(() => {
              $('#buscard1').focus();
            }, 100);
            break;
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'listprestadoresSupervisados':
            $("#modallistprestadoresSupervisados").modal("close");
            break;
          case 'consultaPrestador':
            $("#modalconsultaPrestador").modal("close");
            break;
          default:
        }
      }
      $scope.formatDatefecha = function (date) {
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
          // //console.log(varFiltro);
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
          // //console.log($scope.calcular);
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
      $scope.validarVacio = function (id, label) {
        // //console.log(label);
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          input.classList.add("error-input");
          Texto.classList.add("red-text");
        } else {
          input.classList.remove("error-input");
          Texto.classList.remove("red-text");
        }
      }
      $scope.validarllenos = function (id, label) {
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          input.classList.add("error-input");
          Texto.classList.add("red-text");
        } else if (Texto != null) {
          input.classList.remove("error-input");
          Texto.classList.remove("red-text");
        }
      }
      $scope.test = function () {
        $scope.lista_procesos.forEach(t => {
          t.PREGUNTAS.forEach(e => {
            console.log
            if (e.SELECT == '' || e.OBSERVACION == '' || e.OBSERVACION == undefined) {
              document.getElementById(e.CODIGO_PROCESO).style.display = 'block';
            }
          });
        });
      }
      $scope.testUpdata = function () {
        $scope.lista_procesos_edit.forEach(t => {
          t.PREGUNTAS.forEach(e => {
            if (e.select == '' || e.Observacion == '' || e.Observacion == undefined) {
              document.getElementById(e.Cod_proceso).style.display = 'block';
            }
          });
        });
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
