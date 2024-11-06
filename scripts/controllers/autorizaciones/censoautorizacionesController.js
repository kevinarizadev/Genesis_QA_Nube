'use strict';
angular.module('GenesisApp').controller('censoautorizacionesController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
    function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {

      $(document).ready(function () {
        $scope.Tabs = 1;
        $scope.verips = true;
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
        $('#modalautorizaciones').modal();
      });
      $scope.setTab = function (x) {
        $scope.Tap = x;
        setTimeout(function () {
          $scope.$apply();
        }, 500)
        if ($scope.Tap == "2") {
          $scope.verNotificaciones();
        }
      }

      $scope.Obtener_listado = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/censoautorizaciones.php",
          data: {
            function: 'Obtener_Listado_IPS',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Lista_Ips_censo = response.data;
          } else {
            
            $scope.Lista_Ips_censo = [];
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_listado();
      $scope.vercensos = function (datos) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/censoautorizaciones.php",
          data: {
            function: 'Obtener_Listado_censos',
            nit: datos.CENV_TERCERO
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.verips = false;
            $scope.nombreips = datos.PRESTADOR;
            $scope.nitips = datos.CENV_TERCERO;
            if (response.data.length) {
              $scope.Lista_censo = response.data;
              $scope.Lista_censoTemp = response.data;
              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 10;
              $scope.pages = [];
              $scope.configPages();
              setTimeout(() => { $scope.$apply(); }, 500);
              swal.close();
            } else {
              swal.close();
            }
          } else {
            $scope.verips = true;
            $scope.Lista_censo = [];
            $scope.Lista_censoTemp = [];
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.VerAutorizaciones = function (datos) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/censoautorizaciones.php",
          data: {
            function: 'Obtener_Autorizaciones',
            numero: datos.CENN_NUMERO,
            ubicacion: datos.CENN_UBICACION,
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Lista_Autorizaciones = response.data;
            $("#modalautorizaciones").modal("open");
          } else {
            $scope.Lista_Autorizaciones = [];
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.insertarSolicitud = function (dato) {
          swal({
            title: 'Confirmar',
            text: "¿Esta Seguro de Realizar Esta Solicitud?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/censoautorizaciones.php",
                  data: {
                    function: 'ProcesarCensoAutorizaciones',
                    numero: dato.CENN_NUMERO,
                    ubicacion: dato.CENN_UBICACION,
                  }
                }).then(function (response) {
                  var nitips = {'CENV_TERCERO':$scope.nitips,'PRESTADOR':$scope.nombreips};
                  setTimeout(() => {
                    $scope.vercensos(nitips);
                  }, 1000);
                  if (response.data.Codigo == '0') {
                    swal('Exitoso', response.data.Nombre, 'success');
                  } else {
                    swal('Importante', response.data.Nombre, 'info');
                  }
                });
            }
          })
      }

      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'modalautorizaciones':
            $("#modalautorizaciones").modal("close");
            break;

          default:
        }
      }
      //   !<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< gestion de solicitudes censo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      $scope.filter = function (val) {
        $scope.Lista_censoTemp = $filter('filter')($scope.Lista_censo, val);
        if ($scope.Lista_censoTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.filter_save = val;
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Lista_censoTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Lista_censoTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Lista_censoTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Lista_censoTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_censoTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }
          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.Lista_censoTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Lista_censoTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Lista_censoTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }
          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.AprobarNegar = function (datos, apr_nieg) {
        swal({
          title: apr_nieg == 'S' ? 'Aprobar Autorizacion' : 'No Pertinente',
          text: apr_nieg == 'S' ? '' : 'Justificacion',
          input: apr_nieg == 'S' ? 'date' : 'text',
          inputPlaceholder: 'Ingrese la Justificacion',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          confirmButtonText: apr_nieg == 'S' ? 'Aprobar' : 'Aceptar',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false,
          type: "info",
        }).then(function (result) {
          if (apr_nieg == 'N' && result == '') {
            swal("Importante", "Tiene que Ingresar una justificacion de anulacion", "info");
            return;
          }else{
            console.log("jhjjjjjjjjjjjjjjj")
          }
          $http({
            method: 'POST',
            url: "php/autorizaciones/censoautorizaciones.php",
            data: {
              function: 'AprobarNegarSolicitud',
              v_pdocumento: datos.DOCUMENTO,
              v_pnumero: datos.NUMERO,
              v_pubicacion: datos.UBICACION,
              v_pertinencia: apr_nieg,
              v_justificacion_pert: result,
            }
          }).then(function (response) {
            if (response.data.Codigo == "0") {
              setTimeout(() => {
                $scope.verNotificaciones();
              }, 1000);
              if (apr_nieg == 'S') {
                swal({
                  title: 'Exitoso ¿Imprimir Autorizacion?',
                  text: response.data.Nombre,
                  type: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Imprimir',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result) {
                    window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + response.data.Num_Aut + '&ubicacion=' + response.data.Ubicacion, '_blank');
                  }
                });
              } else {
                swal({
                  title: "Mensaje",
                  text: response.data.Nombre,
                  type: "success",
                });
              }
            } else {
              swal({
                title: "Mensaje",
                text: response.data.Nombre,
                type: "warning",
              });
            }
          });
        });
      }



      $scope.FormatPesoNumero = function (num) {
        if (num) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        } else {
          return "0"
        }
      }

    }]).filter('totalyor', function () {
      return function (input, property) {
        if (input != undefined) {
          function currencyFormat(num) {
            return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          }
          var i = input.length;
          var total = 0;
          while (i--)
            total += input[i][property];
          return currencyFormat(total);
        } else {
          return null;
        }
      }
    })
