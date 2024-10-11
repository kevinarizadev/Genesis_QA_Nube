"use strict";
angular.module("GenesisApp").controller("reportecuentasmedicaController", [
  "$scope","consultaHTTP","notification","cfpLoadingBar","$http","$window","$filter",function ($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
    $scope.empresa = 1;
    var dat = { prov: "navb" };
    $.getJSON("php/obtenersession.php", dat)
      .done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.rolcod = $scope.sesdata.rolcod;
        $scope.obtenerreporte();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("navbar error obteniendo variables");
      });
    $scope.obtenerreporte = function () {
      $http({
        method: "POST",
        url: "php/informes/obtenerreportes.php",
        data: { function: "obtenerreportes", v_prol: $scope.rolcod },
      }).then(function (response) {
        $scope.Reportes = response.data;
        $scope.limpiar();
      });
    };
    $(document).ready(function () {
      $scope.responsable = sessionStorage.getItem("cedula");
      // console.log($scope.responsable
    });
    $scope.limpiar = function () {
      $scope.nit = "";
      $scope.fecha_inicio = "";
      $scope.fecha_final = "";
      $scope.tiporeporte = "";
      $scope.titulo_Reporte = "";
    };
    $scope.hideall = function () {
      $scope.shw_nit = false;
      $scope.shw_annos = false;
      $scope.shw_periodo = false;
      $scope.shw_fecha_inicio = false;
      $scope.shw_fecha_final = false;
      $scope.mostrar_generar = false;
    };
    $scope.buscaReporte = function () {
      if ($scope.tiporeporte == "0") {
        $scope.shw_parametros = false;
      } else {
        $scope.hideall();
        $scope.shw_parametros = true;
        switch ($scope.tiporeporte) {
          case "89":
            $scope.titulo_Reporte = "Reporte de Devolucion de facturas";
            $scope.shw_nit = false;
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.mostrar_generar = true;
            break;
          case "100":
            $scope.titulo_Reporte = "Reporte de Radicacion de Facturas";
            $scope.shw_nit = true;
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.mostrar_generar = true;
            break;
          case "101":
            $scope.titulo_Reporte ="Reporte de Radicacion de Facturas por RIPS";
            $scope.shw_nit = false;
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.mostrar_generar = true;
            break;
          case "102":
            $scope.titulo_Reporte = "Reporte de Facturas validadas no radicadas por RIPS";
            $scope.shw_nit = false;
            $scope.shw_annos = false;
            $scope.shw_periodo = false;
            $scope.shw_fecha_inicio = true;
            $scope.shw_fecha_final = true;
            $scope.mostrar_generar = true;
            break;
        }
      }
    };
    $scope.generaReporte = function () {
      switch ($scope.tiporeporte) {
        case "89":
          if (
            $scope.fecha_inicio == "" ||
            $scope.fecha_inicio == undefined ||
            $scope.fecha_final == "" ||
            $scope.fecha_final == undefined
          ) {
            swal({
              title: "Notificación",
              text: "Por favor ingrese la fecha de inicio y final para generar el reporte",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            var fecha_inicio = $filter("date")(
              new Date($scope.fecha_inicio),
              "dd/MM/yyyy"
            );
            var fecha_final = $filter("date")(
              new Date($scope.fecha_final),
              "dd/MM/yyyy"
            );
            window.open(
              "php/cuentasmedicas/reportes/reporte_devolucionfacturas.php?fechaInicio=" +
                fecha_inicio +
                "&fecha_final=" +
                fecha_final
            );
            $scope.hideall();
            $scope.limpiar();
          }
          break;
        case "100":
          if ($scope.nit == "" || $scope.nit == undefined || $scope.fecha_inicio == "" || $scope.fecha_inicio == undefined || $scope.fecha_final == "" || $scope.fecha_final == undefined ) {
            swal({
              title: "Notificación",
              text: "Por favor ingrese el nit, fecha de inicio y final para generar el reporte",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            var fecha_inicio = $filter("date")(
              new Date($scope.fecha_inicio),
              "dd/MM/yyyy"
            );
            var fecha_final = $filter("date")(
              new Date($scope.fecha_final),
              "dd/MM/yyyy"
            );
            window.open(
              "php/cuentasmedicas/reportes/reporte_radicacionFacturas.php?fechaInicio=" + fecha_inicio + "&fecha_final=" +
                fecha_final +
                "&tercero=" +
                $scope.nit
            );
            $scope.hideall();
            $scope.limpiar();
          }
          break;
        case "101":
          if (
            $scope.fecha_inicio == "" ||
            $scope.fecha_inicio == undefined ||
            $scope.fecha_final == "" ||
            $scope.fecha_final == undefined
          ) {
            swal({
              title: "Notificación",
              text: "Por favor ingrese la fecha de inicio y final para generar el reporte",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            var fecha_inicio = $filter("date")(
              new Date($scope.fecha_inicio),
              "dd/MM/yyyy"
            );
            var fecha_final = $filter("date")(
              new Date($scope.fecha_final),
              "dd/MM/yyyy"
            );
            window.open(
              "php/cuentasmedicas/reportes/reporte_radicacionFacturasRIPS.php?fechaInicio=" +
                fecha_inicio +
                "&fecha_final=" +
                fecha_final
            );
            $scope.hideall();
            $scope.limpiar();
          }
          break;
        case "102":
          if (
            $scope.fecha_inicio == "" ||
            $scope.fecha_inicio == undefined ||
            $scope.fecha_final == "" ||
            $scope.fecha_final == undefined
          ) {
            swal({
              title: "Notificación",
              text: "Por favor ingrese la fecha de inicio y final para generar el reporte",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            var fecha_inicio = $filter("date")(
              new Date($scope.fecha_inicio),
              "dd/MM/yyyy"
            );
            var fecha_final = $filter("date")(
              new Date($scope.fecha_final),
              "dd/MM/yyyy"
            );
            window.open(
              "php/cuentasmedicas/reportes/reporte_facturanoradicadasporrips.php?fechaInicio=" +
                fecha_inicio +
                "&fecha_final=" +
                fecha_final
            );
            $scope.hideall();
            $scope.limpiar();
          }
          break;
      }
    };
    $scope.cargaAnnos = function () {
      $http({
        method: "POST",
        url: "php/cuentasmedicas/reportecuentamedica.php",
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
          url: "php/cuentasmedicas/reportecuentamedica.php",
          data: { function: "cargaperiodos", anno: $scope.anno },
        }).then(function (res) {
          $scope.Periodos = res.data;
          $scope.periodo = $scope.Periodos[0].IDE;
        });
      }
    };
    $scope.FormatSoloNumero = function (NID) {
      const input = document.getElementById("" + NID + "");
      var valor = input.value;
      valor = valor.replace(/[^0-9]/g, "");
      input.value = valor;
    };
  },
]);
