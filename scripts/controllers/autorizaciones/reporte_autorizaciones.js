"use strict";
angular.module("GenesisApp").controller("reporteautorizacionesController", ["$scope","consultaHTTP","notification","cfpLoadingBar","$http", "$window","$filter",
  function ($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
    
    $scope.Inicio = function () {
      $scope.departamento = sessionStorage.getItem('dpto').toString().padEnd(4,'0');
      $scope.tiporeporte = "";
      $scope.shw_parametros = false;
      $scope.limpiar('1');
      $scope.limpiar('2');
      }

      $scope.limpiar = function (accion) {
        switch (accion) {
          case '1':
            $scope.tiporeporte = '';
            $scope.shw_parametros = false;
            $scope.anno = "";
            $scope.periodo = "";
            break;
          case '2':
            $scope.tiporeporte = '';
            $scope.shw_parametros = false;
            $scope.fecha_inicio = "";
            $scope.fecha_final = "";
            $scope.estado = "";
            break;
          default:
        }
      }
    var dat = { prov: "navb" };
    $.getJSON("php/obtenersession.php", dat)
      .done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.rolcod = $scope.sesdata.rolcod;
        $scope.obtenerreporte();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        //console.log("navbar error obteniendo variables");
      });
    $scope.obtenerreporte = function () {
      $http({
        method: "POST",
        url: "php/informes/obtenerreportes.php",
        data: { function: "obtenerreportes", v_prol: $scope.rolcod },
      }).then(function (response) {
        $scope.Reportes = response.data;
      });
    };
    $(document).ready(function () {
      $scope.responsable = sessionStorage.getItem("cedula");
      // console.log($scope.responsable
    });
    $scope.buscaReporte = function () {
      $scope.anno = "";
      $scope.periodo = "";
      $scope.estado = "";
      if ($scope.tiporeporte == "0") {
        $scope.shw_parametros = false;
      } else {
        $scope.hideall();
        $scope.shw_parametros = true;
        switch ($scope.tiporeporte) {
          case "97":
            $scope.titulo_Reporte = "Reporte de Solicitudes Activas ESOA";
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_estado = false;
            break;
          case "98":
            $scope.titulo_Reporte = "Reporte de Autorizaciones Gestionadas ESO";
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_estado = false;
            break;
          case "99":
            $scope.titulo_Reporte = "Reporte de Autorizaciones Procesadas ESOA";
            $scope.shw_annos = true;
            $scope.shw_periodo = true;
            $scope.show_fecha_inicio = false;
            $scope.show_fecha_final = false;
            $scope.show_estado = false;
            break;
            case "105":
              $scope.titulo_Reporte = "Reporte de Activas Programadas";
              $scope.shw_annos = false;
              $scope.shw_periodo = false;
              $scope.show_fecha_inicio = true;
              $scope.show_fecha_final = true;
              $scope.show_estado = true;
              break;
              case "106":
              $scope.titulo_Reporte = "Autorizaciones Manuales Hospitalarias";
              $scope.shw_annos = true;
              $scope.shw_periodo = true;
              $scope.show_fecha_inicio = false;
              $scope.show_fecha_final = false;
              $scope.show_estado = false;
              break;
        
        }
      }
    };
    $scope.hideall = function () {
      $scope.shw_annos = false;
      $scope.shw_ciclo = false;
      $scope.shw_periodo = false;
    };

    $scope.cargaAnnos = function () {
      $http({
        method: "POST",
        url: "php/autorizaciones/reportes_autorizaciones.php",
        data: { function: "cargaannos" },
      }).then(function (res) {
        $scope.Annos = res.data;
        $scope.anno = $scope.Annos[0].ANNO;
        $scope.cargaPeriodos();
      });
    };

    $scope.cargaPeriodos = function () {
      if ($scope.anno != "X" || $scope.anno === undefined) {
        $http({
          method: "POST",
          url: "php/autorizaciones/reportes_autorizaciones.php",
          data: { function: "cargaperiodos", anno: $scope.anno },
        }).then(function (res) {
          $scope.Periodos = res.data;
          $scope.periodo = $scope.Periodos[0].IDE;
        });
      }
    };

    $scope.generaReporte = function () {
      switch ($scope.tiporeporte) {
        case "97":
          window.open("php/autorizaciones/reportes/reporte_activasEsoa.php");
      
            $scope.hideall();
            $scope.tiporeporte = '';
            $scope.shw_parametros = false;
          break;
        case "98":
          window.open(
            "php/autorizaciones/reportes/reporte_gestionadasEsoa.php");
            $scope.hideall();
            $scope.tiporeporte = '';
            $scope.shw_parametros = false;
          break;
        case "99":
          if ($scope.anno == "" || $scope.periodo == "") {
            swal({
              title: "¡Alerta!",
              text: "Por favor seleccione el año y el mes para generar el reporte ",
              type: "warning",
            }).catch(swal.noop);

            return;
          } else {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Generando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            window.open(
              "php/autorizaciones/reportes/reporte_procesadasEsoa.php?ann=" +$scope.anno +"&per=" +$scope.periodo);
              setTimeout(function () {
                $scope.hideall();
                $scope.limpiar('1');
                swal.close();
                $scope.$apply();
              }, 2000);
          }
          break;
          case "105":
          if ($scope.estado == '' || $scope.estado == undefined || $scope.estado == null  ||$scope.fecha_inicio == '' || $scope.fecha_inicio == undefined || $scope.fecha_inicio == null || $scope.fecha_final == '' || $scope.fecha_final == undefined || $scope.fecha_final == null) {
            swal({
              title: "¡Alerta!",
              text: "Completa todos los campos obligatorios(*)",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Generando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
            var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
            window.open('php/autorizaciones/reportes/formato_reporte.php?ubicacion=' + $scope.departamento +  '&fecha_inicio=' + fecha_inicio + '&fecha_final=' + fecha_final + '&estado=' + $scope.estado);
            setTimeout(function () {
              $scope.hideall();
              $scope.limpiar('2');
              swal.close();
              $scope.$apply();
            }, 2000);
          }
          break;
          case "106":
          if ($scope.anno == '' || $scope.anno == undefined || $scope.anno == null  ||$scope.periodo == '' || $scope.periodo == undefined || $scope.periodo == null) {
            swal({
              title: "¡Alerta!",
              text: "Completa todos los campos obligatorios(*)",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Generando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            window.open('php/autorizaciones/reportes/formato_autorizaciones_manuales_hospitalarias.php?vpanno=' + $scope.anno +  '&vpnumero=' + $scope.periodo);
            setTimeout(function () {
              $scope.hideall();
              $scope.limpiar('2');
              swal.close();
              $scope.$apply();
            }, 2000);
          }
          break;
      }
    };
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
