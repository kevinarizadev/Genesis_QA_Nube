'use strict';
angular.module('GenesisApp')
  .controller('consultaprogramadasController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {

    $(document).ready(function () {
      $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";

        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Vista = 0;
        $scope.Tap = 1;
        $('.tabs').tabs();

        setTimeout(() => {
          $scope.$apply();
        }, 500);
        $scope.cargaAnnos();
        var seccional = sessionStorage.getItem('municipio');
        $scope.seccionalfuncionario = seccional.toString()
        console.log($scope.seccionalfuncionario)
        if ($scope.seccionalfuncionario == '1') {
            $scope.seccionalfuncionario = '1000';
        } else {
            var dosPrimerasLetras = $scope.seccionalfuncionario.substring(0, 2);
            $scope.seccionalfuncionario = dosPrimerasLetras;
        }
    });
    $scope.verdatosdeips = false;
    $scope.listodatos = [];
    $scope.setTab = function (x) {
      $scope.Tap = x;
      setTimeout(function () {
        $scope.$apply();
      }, 500)
    }
    $scope.cargaAnnos = function () {
        $http({
           method: 'POST',
           url: "php/financiera/funcfinanciera.php",
           data: { function: 'cargaannos' }
        }).then(function (res) {
           $scope.Annos = res.data;
           $scope.anno = $scope.Annos[0].ANNO;
           $scope.cargaPeriodos();
        })
     }

     $scope.cargaPeriodos = function () {
        if ($scope.anno != "X" || $scope.anno === undefined) {
           $http({
              method: 'POST',
              url: "php/financiera/funcfinanciera.php",
              data: { function: 'cargaperiodos', anno: $scope.anno }
           }).then(function (res) {
              $scope.Periodos = res.data;
              // $scope.periodo = $scope.Periodos[0].IDE;
           })
        }
     }
    

    $scope.buscarcodigo = function (anio,mes) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/consultaprogramadas.php",
          data: {
            function: 'Obtener_datos',
            // ubicacion: "08",
            ubicacion: $scope.seccionalfuncionario,
            anio: anio,
            mes: mes.length == 1 ? '0'+mes:mes,
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if(response.data.length > 0){
                swal({
                  title: "Exito",
                  text: "Datos Encontrados",
                  type: "success"
              })
                $scope.listodatos = response.data;
                $scope.verdatosdeips = true;
            } else {
                $scope.verdatosdeips = false;
                swal({
                  title: "Informacion",
                  text: "No se encontraron datos en este mes",
                  type: "info"
              })
            }
        } else {
          
            swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
            }).catch(swal.noop);
        }
        })

      }
    $scope.descargarregistros = function (anio,mes) {
        var mesenv = mes.length == 1 ? '0'+mes:mes;
        window.open('php/autorizaciones/reporteprogramadas.php?ubicacion='+$scope.seccionalfuncionario+'&anio='+anio+'&mes='+mesenv);
      }
    

  }])
