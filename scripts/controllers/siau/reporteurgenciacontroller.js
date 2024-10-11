'use strict';
angular.module('GenesisApp')
  .controller('reporteurgenciacontroller', ['$scope', 'notification', 'cfpLoadingBar', '$http', function ($scope, notification, cfpLoadingBar, $http) {
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
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
    });
    $scope.setTab = function (x) {
      $scope.Tap = x;
      setTimeout(function () {
        $scope.$apply();
      }, 500)
    }

    // $scope.inactive2 = true;
    // $scope.tipoDoc = "0";
    $scope.filtro = "";
    $scope.inactive1 = true;
    $scope.filtro1 = "";
    $scope.inactive2 = true;

    $scope.obtenerhistorico = function () {
      if (
        $scope.nitips != "" && $scope.nitips != null && $scope.nitips != undefined &&
        $scope.fechai != "" && $scope.fechai != null && $scope.fechai != undefined &&
        $scope.fechaf != "" && $scope.fechaf != null && $scope.fechaf != undefined &&
        $scope.fechaf >= $scope.fechai
      ) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
       });
        $http({
          method: 'POST',
          url: "php/siau/reporteurgencia.php",
          data: {
            function: 'obtener_reporte',
            nitips: $scope.nitips,
            fechai1: $scope.fechai,
            fechaf1: $scope.fechaf,
          }
        }).then(function (response) {
          $scope.HistoricoUrgencia = response.data;
          $scope.inactive1 = false;
            swal.close();
        });
      } else {
        $scope.HistoricoUrgencia=null;
        $scope.inactive1 = true;
        swal('Informanción', 'Error digitación de los campos, favor validar', 'error');
      }
    }

    $scope.obtenerhistorico1 = function () {
      if (
        $scope.fechai1 != "" && $scope.fechai1 != null && $scope.fechai1 != undefined &&
        $scope.fechaf1 != "" && $scope.fechaf1 != null && $scope.fechaf1 != undefined &&
        $scope.fechaf1 >= $scope.fechai1
      ) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
       });
        $http({
          method: 'POST',
          url: "php/siau/reporteurgencia.php",
          data: {
            function: 'obtener_reporte',
            nit: '',
            fechai1: $scope.fechai1,
            fechaf1: $scope.fechaf1,
          }
        }).then(function (response) {
            $scope.HistoricoUrgencia1 = response.data;
            $scope.inactive2 = false;
              swal.close();
        });
      } else {
        $scope.HistoricoUrgencia1=null;
        $scope.inactive2 = true;
        swal('Informanción', 'Error digitación de los campos, favor validar', 'error');
      }
    }
    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }
    $scope.descargarregistros = function (fechainicio,fechafin,nit) {
      var nitenviar;
      if(nit==1){
        nitenviar="";
      }else{
        nitenviar=$scope.nitips;
      }
      window.open('php/siau/descargar_reporte_urgencia.php?nit='+nitenviar+'&fechainicio='+formatDate(fechainicio)+'&fechafin='+formatDate(fechafin));
    }

  }])
