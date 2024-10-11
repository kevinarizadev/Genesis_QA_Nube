'use strict';
angular.module('GenesisApp')
  .controller('imprimirautoanuladaController', ['$scope', '$http',
    function ($scope, $http) {
      $scope.Inicio = function () {
        $scope.switch_view = false;
        $scope.required_fiels = true;
        $scope.text_fiels = '';
        $scope.cedula = sessionStorage.getItem('cedula');
        $scope.rol = sessionStorage.getItem('rolcod');
        $scope.limpiar();
        $scope.Obtener_Tipos_Documentos();
      };
      $scope.limpiar = function () {
        $scope.controlInicio('1');
        $scope.temptipoDoc = '';
        // $scope.filterautprint = 'AFILIADO';
        $scope.tempnumero = "";
        $scope.tempubicacion = "";
        $scope.tempdocumento = "";
        $scope.Autorizaciones = [];
        $scope.inactive1 = true;
        $scope.Nombre = "";
        $scope.total = 0;
        $scope.quantitY = 0;
      }
      $scope.controlInicio = function (data) {
        if (data = '1') {
          $scope.limpiarAfiliado = true;
          $scope.limpiarAutorizacion = false;
          $scope.temptipoDoc = "";
          $scope.tempdocumento = "";
          $scope.filterautprint = 'AFILIADO';
        } if (data = '2') {
          $scope.limpiarAfiliado = false;
          $scope.limpiarAutorizacion = true;
          $scope.tempnumero = "";
          $scope.tempubicacion = "";
          $scope.filterautprint = 'AUTORIZACION';
        }
      }
      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.buscarAutPrint = function (data) {
        console.log(data);
       // var consulta = data;
        $scope.Autorizaciones = [];
        var tipodocumento = 'CC';
        var documento = 0;
        var numero = 0;
        var ubicacion = 0;
        if ($scope.filterautprint == 'AUTORIZACION') {
          if (($scope.tempnumero == '' || $scope.tempnumero == null) || ($scope.tempubicacion == '' || $scope.tempubicacion == null)) {
            $scope.required_fiels = true;
            $scope.text_fiels = 'Datos de la Autorización Incompletos';
          } else {
            tipodocumento = 'CC';
            documento = 0;
            numero = $scope.tempnumero;
            ubicacion = $scope.tempubicacion;
            $scope.required_fiels = false;
          }
        }
        if ($scope.filterautprint == 'AFILIADO') {


       if (($scope.temptipoDoc == '' || $scope.temptipoDoc == null) || ($scope.tempdocumento == '' || $scope.tempdocumento == null)) {
           $scope.required_fiels = true;
        $scope.text_fiels = 'Datos del Afiliado Incompletos';
         } else {
          var numero = 0;
       var ubicacion = 0;
            tipodocumento = $scope.temptipoDoc;
            documento = $scope.tempdocumento;
           $scope.required_fiels = false;
          }
        }

        if ($scope.required_fiels == false) {
          $scope.json = { "numero": numero, "ubicacion": ubicacion, "tipodoc": tipodocumento, "afiliado": documento };
          console.log($scope.json);
          $http({
            method: 'POST',
            url: "php/autorizaciones/print/imprimirautoanulada.php",
            data: { function: 'p_imprimir_autorizacion_web', autorizacion: JSON.stringify($scope.json) }
          }).then(function (response) {
            console.log(response);
            if (response.data != 0) {
              $scope.Autorizaciones = response.data;
              $scope.Nombre = response.data["0"].Nombre;
              $scope.inactive1 = false;
              $scope.total = $scope.Autorizaciones.length;
              if ($scope.total <= 10) {
                $scope.quantity = $scope.total;
              }
              else {
                $scope.quantity = 10;
              }
            }
            else {
              $scope.inactive1 = true;
              swal('Info', 'Afiliado No Tiene Autorizaciones!', 'info').catch(swal.noop);
            }
          });
        } else {
          swal('Info', $scope.text_fiels, 'warning').catch(swal.noop);
        }
      };
      $scope.print = function (data, x) {
        //console.log(data,'-', x);
        if (x == 'false' || x == 'true' ) {
          window.open('views/autorizaciones/formatoautorizacionanuladasPrint.php?numero=' + data.CODIGO + '&ubicacion=' + data.AUTN_UBICACION, '_blank');
          $scope.inactive1 = true;
          $scope.limpiar();
        }else{

          swal('Info', 'No se puede imprimir la Autorizacion!', 'info').catch(swal.noop);


        }
      }
      $scope.actualizarprint = function (num) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/print/Uautorizaciones.php",
          data: { function: 'actualizarprint', numero: num }
        }).then(function (response) {

          if (response.data == 1) {
            $scope.buscarAutPrint();
            swal({
              type: 'success',
              title: 'Completado',
              text: 'Impresión habilitada!',
              timer: 3000
            }).catch(swal.noop);
          }
        });
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      }
      $scope.controSwitch = function () {
        if ($scope.switch_view == false) {
          $scope.limpiar();
          $scope.controlInicio('1');
          $scope.limpiarAfiliado = true;
          $scope.limpiarAutorizacion = false;
          $scope.filterautprint = 'AUTORIZACION';
        } else {
          $scope.limpiar();
          $scope.controlInicio('2');
          $scope.limpiarAfiliado = false;
          $scope.limpiarAutorizacion = true;
          $scope.filterautprint = 'AFILIADO';


        }
      }
      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
    },
  ])
  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
