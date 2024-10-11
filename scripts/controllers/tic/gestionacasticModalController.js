'use strict';
angular.module('GenesisApp')
  .controller('gestionacasticModalController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $http({
        method: 'POST',
        url: "php/tic/controlacas/Racas.php",
        data: { function: 'obtenerAcasDetalleXticket', ticket: $scope.ticket, ubicacion: $scope.ubicacion }
      }).then(function (response) {
        $scope.listacasdetalle = response.data;
        setTimeout(function () {
          $("#chat_comment")[0].scrollTop = $("#chat_comment")[0].scrollHeight;
        }, 300);
      });

      
      $scope.DescargarRespuesta = function (ruta) {
        $http({
          method: 'POST',
          url: "php/acas/consultarsolicitudacas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }
    }])
