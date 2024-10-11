'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatautorizacionController', ['$scope', '$http', '$location', '$timeout',
    function ($scope, $http, $location, $timeout) {
      $(document).ready(function () {
        setTimeout(function () {
          $scope.qrcode = new QRCode("qrcode");

        }, 100);
      });
      $scope.datosAU = [];
      $scope.hideObservacion=true;
      $scope.numero = $location.search().numero;
      $scope.ubicacion = $location.search().ubicacion;
      $http({
        method: 'POST',
        url: "../../php/autorizaciones/print/Rautorizaciones_ips.php",
        data: { function: 'obtenerautorizacion_web', numero: $scope.numero, ubicacion: $scope.ubicacion }
      }).then(function (response) {

        $scope.datosAU = response.data;
        if ($scope.datosAU.DatosBasico[0].autpor == 'USUARIO WEB') {
          $scope.datosAU.DatosBasico[0].autpor = sessionStorage.getItem('nombre');
        }
        if ($scope.datosAU.DatosBasico[0].cargo == 'SIN ASIGNAR') {
          $scope.datosAU.DatosBasico[0].cargo = sessionStorage.getItem('cargo');
        }
        if (sessionStorage.getItem('municipio')=='1') {
          $scope.hideObservacion=false;
        }else if($scope.datosAU.DatosBasico[0].aut_solnopbs=='S'){
          $scope.hideObservacion=false;
        }else{
          $scope.hideObservacion=true;
        }

        
        makeCode(JSON.stringify({
          'Autorizacion': $scope.datosAU.DatosBasico[0].numero,
          'Ubicacion': $scope.datosAU.DatosBasico[0].ubicacion
        }));

      })
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          console.log('se hizo antes de imprimir');
        } else {
          console.log('se hizo despues de imprimir');

        }
      });


      function makeCode(data) {
        generateBarcode($scope.datosAU.DatosBasico[0].numc);
        setTimeout(function () {
          $scope.qrcode.makeCode(data);
          $("#qrcode img").css('height', '130px');
          $("#qrcode img").css('margin-top', '20px');
        }, 100);



         setTimeout(function () {
           //window.print();
           setTimeout(function(){
              $http({
            method:'POST',
            url:"../../php/autorizaciones/print/Uautorizaciones.php",
            data: {function:'cerrarimpresionsinmanual',numero:$scope.numero, ubicacion:$scope.ubicacion}
          }).then(function(response){
            //window.close();           
          })
        },100);
           //setTimeout(function () {
document.querySelector("body").style.display="block"
         
            //window.close();
          // }, 100);
         }, 500);
      }
    
 function generateBarcode(data){
        //var datos = JSON.stringify({'Numero de Autorizacion': data});
        var datos = data;
        var value = "Este es mi codigo de barras";
        var btype = "code128";
      var  opciones = {
          barWidth: 2,
          barHeight:40,
        };
          $("#barcodeTarget").html("").barcode(datos, btype, opciones);
      }


    }]);
