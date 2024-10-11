'use strict';
angular.module('GenesisApp')
  .controller('consultasupervisionController', ['$scope', '$http', '$window',
    function ($scope, $http, $window) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        $scope.SysDay = new Date();
        $scope.vistaResumen = true;
        $scope.vistaConsulta = false;
        $('.modal').modal();
        $scope.vistaconsultaContrato = false;
        $scope.visualTable = false;
        $scope.listContratos = '';
        $scope.lista_Contrato = [];
        $scope.contaContrato = [];
        $scope.resumencontaContrato = [];
        $scope.function_consultaInicio();
        $scope.limpiar('form1');
        $scope.limpiar('result');
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
          default:
        }
      }
      $scope.function_inicioContador = function (consulta) {
        $http({
          method: 'POST',
          url: "php/contratacion/consultasupervision.php",
          data: {
            function: 'P_OBTENER_CONSOL',
            vpinterventor: consulta.DOCUMENTO_SUPERVISOR,
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
      $scope.function_consultaInicio = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/consultasupervision.php",
          data: {
            function: 'P_LISTA_CONSOL',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.resumencontaContrato = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.function_control_inicio_Seccion = function (consulta) {
        let numero = '';
        numero =  consulta.DOCUMENTO_SUPERVISOR;
        $scope.nombredelsupervisado = consulta.NOMBRE_SUPERVISOR;
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/consultasupervision.php",
          data: {
            function: 'P_OBTENER_IPS_SUPERVISOR',
            vpinterventor:numero ,
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.lista_Contrato = data;
            $scope.vistaResumen = false;
            $scope.vistaConsulta = true;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.function_controlVista = function (vista){
        if(vista == 'vistaconsultaContrato'){
         $scope.visualtableDetalle = false;
         $scope.vistaconsultaContrato = true;
         $scope.visualTable = true;
        }
       }
      $scope.controlarVista = function (){
        $scope.vistaConsulta = true;
      }
      $scope.function_bucarSupervision = function (dato) {
        $scope.limpiar("form2");
        $scope.function_consulta_Contrato(dato);
        $scope.vistaConsulta = false;
        $scope.vistaconsultaContrato = true;
      };
      $scope.function_obtener_supervision_detalle = function (data) {
        if (data.ID_PROCESO == "" || data.ID_PROCESO == null) {
          swal({
            title: "Notificación",
            text: "!Por favor ingrese el nombre o numero del prestador a consultar!",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_SUPERVISION_DETALLE",
              vpnit: data.NIT,
              vpidproceso: data.ID_PROCESO,
            },
          }).then(function ({ data }) {
  
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              $scope.listaconsultaDetalle = data;
              $scope.visualTable = false;
              $scope.visualtableDetalle = true;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.function_consulta_Contrato = function (data) {
        if (data.CODIGO == "" || data.CODIGO == null) {
          swal({
            title: "Notificación",
            text: "!Por favor ingrese el nombre o numero del prestador a consultar!",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_SUPERVISION_FINAL",
              vpnit: data.CODIGO,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              $scope.listaconsultaContrato = data;
              $scope.visualTable = true;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.function_imprimirSupervision = function (info, accion) {
        console.log(info, accion);
        if (accion == "P") {
          $window.open(
            "views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=" +
            info.ID_PROCESO
          );
        }if (accion == "N") {
          $window.open(
            "views/contratacion/formatos/view_formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=" +
              info.DOCUMENTO +
              "&vpnumero=" +
              info.CONTRATO +
              "&vpubicacion=" +
              info.UBICACION +
              "&vprenglon=" +
              info.RENGLON
          );
        } if (accion == "S"){
          $window.open(
            "views/contratacion/formatos/formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=" +
              info.DOCUMENTO +
              "&vpnumero=" +
              info.CONTRATO +
              "&vpubicacion=" +
              info.UBICACION +
              "&vprenglon=" +
              info.RENGLON
          );
        }
      };
      $scope.function_verResultado = function (info) {
        $scope.ips = info.IPS;
        $("#modalresulltados").modal("open");
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/consultasupervision.php",
          data: {
            function: 'P_OBTENER_RESULTADO',
            vpidproceso: info.ID_PROCESO
          }
        }).then(function (response) {
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
      $scope.openmodals = function (modal) {
        console.log(modal);
        $(`#${modal}`).modal('open');
        switch (modal) {
          case 'permisos':
            $("#modalpermisos").modal("open");
            break;
            case 'resultado':
              $("#modalresulltados").modal("open");
              break;
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
