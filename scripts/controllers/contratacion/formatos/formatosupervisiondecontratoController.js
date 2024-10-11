
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
    function ($scope, $http, $timeout, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        $scope.generaciondeFormato();
      });

      $scope.generaciondeFormato = function () {
        $http({
          method: 'POST',
          url: "../../../php/contratacion/supervisiondecontrato.php",
          data: {
            function: 'P_OBTENER_SUPERVISION_IPS',
            vpidproceso: $location.search().vprenglon.toString()
          }
        }).then(function ({ data }) {
          $scope.infoFormato = data;
          var anno = data.cab[0].Fecha_visita.slice(6);
          if(anno == 2023 ){
             $scope.version = 'Version: 02',
             $scope.Fecha = 'Fecha: Febrero 2023'
          }else{
            $scope.version = 'Version: 03',
            $scope.Fecha = 'Fecha: Enero 2024'
          }
                 //Este codigo nos permite poder imprimir el formato y cerrar de una vez sea imprimido
                 $scope.optenerResultado($location.search().vprenglon.toString());
                 setTimeout(function () {
                  window.print();
                }, 1000);
        });
      }
     $scope.optenerResultado = function (data) {
       $http({
         method: "POST",
         url: "../../../php/contratacion/consultasupervision.php",
         data: {
           function: "P_OBTENER_RESULTADO",
           vpidproceso: data,
         },
       }).then(function ({ data }) {
         $scope.infoResultado = data;
       });
     };
        // Este codigo nos sirve para no permitir ver el codigo solo imprimir
        document.addEventListener('contextmenu', event => event.preventDefault());
        const body = document.querySelector('body');
  
        body.onkeydown = function (e) {
          if (e.keyCode === 17 || e.keyCode === 80) {
          } else {
            return false;
          }
        }
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            console.log('se hizo antes de imprimir');
          } else {
            console.log('se hizo despues de imprimir');
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });


    }]);
