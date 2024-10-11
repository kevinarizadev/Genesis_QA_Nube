"use strict";
angular
  .module("GenesisApp", [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({enabled: true,requireBase: false,});})
  .controller("ControladorIMP", ["$scope","$http","$timeout","$location","$sce","$q",
    function ($scope, $http, $timeout, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        };
        $scope.generaciondeFormato();
        $scope.SysDay = new Date();
      });
      $scope.generaciondeFormato = function () {
        $http({
          method: "POST",
          url: "../../../php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_SUPERVISION",
            vpdocumento: $location.search().vpdocumento.toString(),
            vpnumero: $location.search().vpnumero.toString(),
            vpubicacion: $location.search().vpubicacion.toString(),
            vprenglon: $location.search().vprenglon.toString(),
          },
        }).then(function ({ data }) {
        $scope.infoFormato = data;
        // Extraer fecha de data.cab[0].Fecha_visita
        var fechaVisita = data.cab[0].Fecha_visita;
        // Fechas originales en formato 'dd/mm/yyyy'
        var fechasRangos = [
            { inicio: '01/01/2023', final: '31/12/2023', version: 'Version: 02', fecha: 'Fecha: Febrero 2023' },
            { inicio: '01/01/2024', final: '31/12/2024', version: 'Version: 03', fecha: 'Fecha: Enero 2024' },
            // Agrega más rangos de fechas aquí según sea necesario
        ];
        // Función para convertir cadenas de fecha de 'dd/mm/yyyy' a objetos Date
        function convertToDate(dateString) {
            var parts = dateString.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        // Convertir la fecha de visita a un objeto Date
        var visitaDate = convertToDate(fechaVisita);
        // Función para verificar en cuál rango cae la fecha de visita
        function obtenerVersionYFecha(visitaDate, fechasRangos) {
            for (var i = 0; i < fechasRangos.length; i++) {
                var startDate = convertToDate(fechasRangos[i].inicio);
                var endDate = convertToDate(fechasRangos[i].final);
                if (visitaDate >= startDate && visitaDate <= endDate) {
                    return { version: fechasRangos[i].version, fecha: fechasRangos[i].fecha };
                }
            }
            // Si no cae en ningún rango, puedes devolver valores por defecto
            return { version: 'Version: Desconocida', fecha: 'Fecha: Desconocida' };
        }
        // Obtener la versión y fecha correspondiente
        var resultado = obtenerVersionYFecha(visitaDate, fechasRangos);
        $scope.version = resultado.version;
        $scope.Fecha = resultado.fecha;
      $scope.optenerResultado(data.cab[0].Id_proceso);
        });
      };
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
    document.addEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      const body = document.querySelector("body");

      body.onkeydown = function (e) {
        if (e.keyCode === 17 || e.keyCode === 80) {
          return false;
        } else {
          return false;
        }
      };
      var mediaQueryList = window.matchMedia("print");
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          console.log("se hizo antes de imprimir");
        } else {
          console.log("se hizo despues de imprimir");
          setTimeout(function () {
            window.close();
          }, 10);
        }
      });
    },
  ]);
