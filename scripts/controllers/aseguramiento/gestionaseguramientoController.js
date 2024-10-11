'use strict';
angular.module('GenesisApp')
  .controller('gestionaseguramientoController', ['$scope', 'consultaHTTP', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, consultaHTTP, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $scope.panel = true;
      $scope.user = "";
      $scope.tipo = false;
      $scope.sysDay = new Date();
      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
      }
      $scope.obtenerListadoUser = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,   
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        document.getElementById('iconHome').style.display = 'none';
        document.getElementById('iconExportar').style.display = 'block';
        $http({
          method: 'POST',
          url: "php/aseguramiento/gestionaseguramiento.php",
          data: {
            function: 'ObtenerAcasXUsuarioyCantidad',
            area: 'A'
                }
        }).then(function (response) {
          $scope.listdeptsaseg = response.data;
          $scope.totalOpen = 0;
          $scope.totalClose = 0;
          for (const i in $scope.listdeptsaseg) {
            if ($scope.listdeptsaseg.hasOwnProperty(i)) {
              $scope.totalOpen += $scope.listdeptsaseg[i].ACTIVO;
              $scope.totalClose += $scope.listdeptsaseg[i].PROCESADO;
            }
          }
          setTimeout(() => {
            swal.close();
          }, 300);
        })
      }
      $scope.obtenerListadoUser();
      $scope.obtenerAcasXPersona = function (cedula, estado, nombre, tipo) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/aseguramiento/gestionaseguramiento.php",
          data: {
            function: 'obtenerAcasXPersona',
            cedula: cedula,
            estado: estado,

          }
        }).then(function (response) {
          $scope.listacas = response.data;
          $scope.panel = false;
          document.getElementById('iconExportar').style.display = 'none';
          document.getElementById('iconHome').style.display = 'block';
          $scope.visibilidadEx = false;
          $scope.tipo = (tipo == "Abiertos") ? true : false;
          $scope.user = tipo + ": " + nombre;
          $scope.cloneHeadFixed();
          setTimeout(() => {
            swal.close();
          }, 300);
        })
      }
      $scope.buscarAcas = function (texto) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/aseguramiento/gestionaseguramiento.php",
          data: { function: 'obtenerAcas', keyword: texto, area: 'A' }
        }).then(function (response) {
          $scope.listacas = response.data;
          $scope.panel = false;
          $scope.tipo = true;
          $scope.user = "encontrados de la búsqueda de: " + texto;
          $scope.filtrar = "";
          $scope.buscaracas = "";
          $scope.cloneHeadFixed();
          setTimeout(() => {
            swal.close();
          }, 300);
        })
      }
      $scope.verdescripcion = function (desc, ticket, ubicacion) {
        $scope.desc = desc;
        $scope.ticket = ticket;
        $scope.ubicacion = ubicacion;
        ngDialog.open({
          template: 'views/tic/modal/ModalDetalles.html',
          className: 'ngdialog-theme-plain',
          controller: 'gestionaseguramientoModalcontroller',
          scope: $scope
        });
      }
      $scope.obtenerAcasDetalleXticket = function (ticket, ubicacion) {
        $http({
          method: 'POST',
          url: "php/aseguramiento/gestionaseguramiento.php",
          data: {
            function: 'obtenerAcasDetalleXticket', ticket: ticket,
            ubicacion: ubicacion
          }
        }).then(function (response) {
          $scope.listacasdetalle = response.data;
        })
      }

      $scope.abrirFromExcel = function (){
        $scope.visibilidadEx = !$scope.visibilidadEx;
        $scope.fechI = "";
        $scope.fechF = "";
      }
  

      function formatDate(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';

      }

      $scope.generarExcel = function () {
        if ($scope.fechI == "" || $scope.fechF == "" || $scope.fechI == null || $scope.fechF == null ) {
          swal({
            title: "Campos Obligatorios",
            text: "Por favor seleccione las fechas",
            type: "info",
          })
        } else  if($scope.fechI > $scope.fechF){
          swal({
            title: "Campos Obligatorios",
            text: "Las fecha de Inicio no puede ser mayor a la final",
            type: "info",
          })
        } else {
          $http({
            method: 'POST',
            url: "php/aseguramiento/gestionaseguramiento.php",
            data: {
              function: 'fechaExportar',
              v_pfecha_inicio: formatDate($scope.fechI),
              v_pfecha_fin: formatDate($scope.fechF)
            }
            
          }).then(function({data}){
                console.log(data);   
                if (data.length) {
                  var ws = XLSX.utils.json_to_sheet(data);
                  /* add to workbook */
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                  /* write workbook and force a download */
                  XLSX.writeFile(wb, "Exportado Aseguramiento.xlsx");
                  const text = `Registros encontrados ${data.length}`
                  swal('¡Mensaje!', text, 'success').catch(swal.noop);
                } else {
                  swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
                }
               
          })
          
        }
      }


      $scope.cloneHeadFixed = function () {
        setTimeout(() => {
          var original = $('#tablaAseguramiento>thead');
          var clone = $('#tablaAseguramiento>thead').clone();
          var list = original[0].children[0].children;
          for (var i = 0; i < list.length; i++) {
            clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
          }
          $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
        }, 500);
      }
      $(".scroll_x").on("scroll", function () {
        $(".scroll_x").scrollLeft($(this).scrollLeft());
      });
      $(window).resize(function () {
        $scope.cloneHeadFixed();
      });
      $scope.colors = function (value) {
        return { height: Math.round(value * 100 / $scope.totalOpen) + '%' }
      }
    }])
