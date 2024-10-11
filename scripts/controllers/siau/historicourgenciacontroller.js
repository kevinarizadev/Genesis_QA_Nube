'use strict';
angular.module('GenesisApp')
  .controller('historicourgenciacontroller', ['$scope', 'notification', 'cfpLoadingBar', '$http', function ($scope, notification, cfpLoadingBar, $http) {
    $(document).ready(function () {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal12').modal();
    });
    $scope.permisoveraccion = sessionStorage.getItem('cargo');
    $scope.cedulapermiso = sessionStorage.getItem('cedula');
    $scope.filtro = "";
    $scope.inactive2 = true;
    $scope.tipoDoc = "0";
    $scope.inactive1 = true;

    $scope.abrirmodal = function (data) {
      $scope.info = data;
      $scope.inactive2 = false;
      $('#modal12').modal('open');
    }

    $scope.descargar = function (ruta) {
      $http({
        method: 'POST',
        url: "php/juridica/tutelas/functutelas.php",
        data: {
          function: 'descargaAdjunto',
          ruta: ruta
        }
      }).then(function (response) {
        //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
        window.open("temp/" + response.data);
      });
    }

    $scope.obtenerhistorico = function () {
      if ($scope.filtro != "" && $scope.filtro != null && $scope.filtro != undefined) {
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
          data: { function: 'obtenerhistorico', coincidencia: $scope.filtro }
        }).then(function (response) {
          if (response.data["0"].length > 0) {
            $scope.HistoricoUrgencia = response.data["0"];
            $scope.Nombre = $scope.HistoricoUrgencia["0"].Nombre;
            $scope.total = $scope.HistoricoUrgencia.length;
            if ($scope.total <= 10) {
              $scope.quantity = $scope.total;
            }
            else {
              $scope.quantity = 10;
            }
            $scope.inactive1 = false;
          } else {
            notification.getNotification('info', 'No se encontraron urgencias!', 'Notificacion');
          }
        });
      } else {
        notification.getNotification('warning', 'Por favor proporciene un filtro', 'Notificacion');
      }
    }
    $scope.cambiarestado = function (datosenviar) {
      swal({
        title: datosenviar.estado == 'APROBADO' ? '¿Desea Reversar este codigo Aprobado?' : '¿Desea Reversar este codigo Anulado?',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        html: '<label styles="font-size: 21px;font-weight: 500;" for="Observacion">Observacion</label>',
        type: "info",
        input: 'text',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: true,
        });
        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
          data: {
            function: 'reversar_codigo',
            v_pcodigo: datosenviar.Codigo,
            v_pubicacion: datosenviar.ubicacion,
            v_pestado: datosenviar.estado == 'APROBADO' ? 'N' : 'P',
            v_pobservacion: result
          }
        }).then(function (response) {
          $scope.obtenerhistorico();
          if (response.data.Codigo == 1) {
            swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
          } else {
            swal({ title: "Completado", text: response.data.Nombre, type: "success", });
          }
        })
      });
    }
  }])