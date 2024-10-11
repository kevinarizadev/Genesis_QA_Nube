'use strict';
angular.module('GenesisApp')
   .controller('reporteautController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
      function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {

        $scope.Inicio = function () {
        $scope.departamento = sessionStorage.getItem('dpto').toString().padEnd(4,'0');
        $scope.fecha_inicio = "";
        $scope.fecha_final = "";


        }
        $scope.buscarReporte = function(){
          if ($scope.fecha_inicio == '' || $scope.fecha_inicio == undefined || $scope.fecha_inicio == null ||
             $scope.fecha_final == '' || $scope.fecha_final == undefined || $scope.fecha_final == null) {
            swal({
                  title: "Notificación",
                  text: "Completa todos los campos obligatorios (*).",
                  }).catch(swal.noop);
                  return
          }else{
            var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
            var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
            window.open('php/autorizaciones/reportes/formato_reporte.php?ubicacion=' + $scope.departamento +  '&fecha_inicio=' +
              fecha_inicio + '&fecha_final=' +
              fecha_final);
          }
        }


        if (document.readyState !== 'loading') {
          $scope.Inicio();
        } else {
          document.addEventListener('DOMContentLoaded', function () {
            $scope.Inicio();
          });
        }
   
      }]).filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });