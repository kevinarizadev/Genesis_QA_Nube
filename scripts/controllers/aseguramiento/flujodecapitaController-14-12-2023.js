'use strict';
angular.module('GenesisApp')
  .controller('flujodecapitaController', ['$scope', '$http',
    function ($scope, $http,) {
      $scope.tipodeItem = 0;
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      $scope.rolcod = sessionStorage.getItem('rolcod');
      $(document).ready(function () {
        $scope.SysDay = new Date();
        $scope.obtener_token();
        $scope.obtener_correo();
        $scope.listar_Procesos();
        $scope.paso1_Limpiar();
        $scope.obtenerMes();
        // $scope.seleccdeAnnos();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
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
        ///////////////////////////////////////////////////////////////////
      });
      $scope.paso1_Limpiar = function () {
        $scope.paso1 = {
          annoActual: '',
          Mes: ''
        };
        $scope.btnGuardarDsb = false;
        setTimeout(() => {
          $scope.$apply();
        }, 700);
      }
      $scope.obtener_token = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/flujodecapita.php",
          data: {
            function: 'obtener_token'
          }
        }).then(function (response) {
          $scope.respuestat = response.data;
        });
      }
      $scope.obtener_correo = function () {
        $http({
          method: 'POST',
          url: "php/financiera/reportes/funcreportes.php",
          data: {
            function: 'obtener_correo', codigoc: $scope.Rol_Cedula
          }
        }).then(function (response) {
          $scope.correo = response.data.Correo;
          $scope.respuestac = response.data;
        });
      }
      $scope.listar_Procesos = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/flujodecapita.php",
          data: { function: 'listar_item_Reporte' }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.selec_tipo_Proceso = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.changeItem = function (item) {
        $scope.item = JSON.parse(item)
        console.log($scope.item)
      };
      $scope.SeleccionarItem = function () {
        console.log($scope.tipodeItem);
        if ($scope.tipodeItem == "0") {
          $scope.vercontenidoCapita = false;
        } else {
          $scope.ocultarTodo();
          $scope.vercontenidoCapita = true;
          switch ($scope.tipodeItem) {
            case "1":// Paso 1
              $scope.titulo_selec_Proceso = "Paso 1";
              $scope.titulo_Paso_1 = true;
              $scope.vista_Paso_1 = 1;
              break;
          }
        }
      }
      $scope.generar_flujodeCapita = function (x) {
        console.log(x);
        console.log($scope.tipodeItem);
        if ($scope.tipodeItem == "0") {
          $scope.vercontenidoCapita = false;
        } else {
          $scope.ocultarTodo();
          $scope.vercontenido = true;
          $scope.vercontenidoCapita = true;
          switch ($scope.tipodeItem) {
            case "1":// Paso 1
              var datosRC = {
                // "correo": $scope.correo,
                // "responsable": $scope.Rol_Cedula,
                "periodo": '07/2023'
              }
              swal({
                title: '¿Desea Generar Proceso del paso 1?',
                text: "Generar Proceso",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false
              }).then(function (result) {
                if (result) {
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: 'paso_1_Capita',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    console.log(response);
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              }).catch(swal.noop);
              break;
          }
        }
      }
      $scope.ocultarTodo = function () {
        $scope.contenido1 = false;
        $scope.contenido2 = false;
      }
      // $scope.generar_flujodeCapita = function () {
      //   var datosRC = {
      //     "correo": $scope.correo,
      //     "responsable": $scope.Rol_Cedula
      //   }
      //   swal({
      //     title: "¿Desea confirmar el cargue?",
      //     type: "question",
      //     showCancelButton: true,
      //     allowOutsideClick: false
      //   }).catch(swal.noop)
      //     .then((willDelete) => {
      //       if (willDelete) {
      //         $http({
      //           url: "php/aseguramiento/flujodecapita.php",
      //           data: {
      //             function: 'paso_1_Capita',
      //             datos: datosRC
      //           },
      //         }).then(function (res) {
      //           console.log(res);
      //           // $scope.lis_info_LMA = res.data;
      //           swal({
      //             title: "Mensaje",
      //             text: "Generando reporte en segundo plano, cuando termine de cargar",
      //             type: "success",
      //           });
      //         });
      //       }
      //     });
      // };
      // $scope.cargaAnnos = function () {
      //   $http({
      //     method: 'POST',
      //     url: "php/financiera/funcfinanciera.php",
      //     data: { function: 'cargaannos' }
      //   }).then(function (res) {
      //     $scope.Annos = res.data;
      //     $scope.anno = $scope.Annos[0].ANNO;
      //     $scope.cargaPeriodos();
      //   })
      // }
      $scope.obtenerMes = function () {
        $scope.paso1.annoActual = $scope.SysDay.getFullYear();
        var mes = $scope.SysDay.getMonth();
        console.log(mes);
        var mesActual = mes + 1;
        $scope.Mes = mesActual;
        console.log($scope.Mes);
        $scope.Mes = [
          {
            "codigo": "1",
            "nombre": "Enero"
          },
          {
            "codigo": "2",
            "nombre": "Febrero"
          },
          {
            "codigo": "3",
            "nombre": "Marzo"
          },
          {
            "codigo": "4",
            "nombre": "Abril"
          },
          {
            "codigo": "5",
            "nombre": "Mayo"
          },
          {
            "codigo": "6",
            "nombre": "Junio"
          },
          {
            "codigo": "7",
            "nombre": "Julio"
          },
          {
            "codigo": "8",
            "nombre": "Agosto"
          },
          {
            "codigo": "9",
            "nombre": "Septiembre"
          },
          {
            "codigo": "10",
            "nombre": "Octubre"
          },
          {
            "codigo": "11",
            "nombre": "Noviembre"
          },
          {
            "codigo": "12",
            "nombre": "Diciembre"
          },
        ];
        var meses = $scope.Mes.filter(function(x) {
          return x.codigo > mes;
        }).map(function(x) {
          return {
            codigo: x.codigo,
            nombre: x.nombre
          };
        });
        $scope.listadeMeses = meses;
      }
      $scope.cancelar_proceso_Capita = function () {
        $scope.tipodeItem = '';
        $scope.vercontenidoCapita = false;
      }

      $(window).on('resize', function () {
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
      });
    }]);
