'use strict';
angular.module('GenesisApp')
  .controller('consultareferenciaController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Obtener_Tipos_Documentos();
        $scope.SysDay = new Date();
        $('.modal').modal();
        $scope.limpiar('consulta1');

        $scope.listrefrencias = [];
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
        $scope.list_DatosTemp = [];
        //TABLA
        // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        $scope.filtrocheck_option = {};
      }
      $scope.limpiar = function (accion) {
        switch (accion) {
          case 'consulta1':
            $scope.consulta1 = {
              selecctipoDocumento: '',
              numeroDocumento: ''
            }
            break;
          default:
        }
      }
      
      $scope.Obtener_Tipos_Documentos = function () {
        $scope.Tipos_Documentos = [];
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.consultarReferencias = function () {
        if ( $scope.consulta1.selecctipoDocumento == '' || $scope.consulta1.numeroDocumento == '' ) {
          swal({
            title: "Notificación",
            text: 'Por favor llene los campos requeridos para poder realizar la consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        } else {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $scope.Vista1_datos = [];
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/consultareferencia.php",
            data: {
              function: 'consultadeRefrencias',
              vptipodocumento: $scope.consulta1.selecctipoDocumento,
              vpdocumento: $scope.consulta1.numeroDocumento
            }
          }).then(function ({data}) {
            swal.close();
            console.log(data);
            if (data && data.toString().substr(0, 3) != '<br') {
              if(data.varJson.Codigo == 1){
                swal({
                  title: "¡Info!",
                  text: data.varJson.Nombre,
                  type: "warning"
                }).catch(swal.noop);
              }else{
                $scope.limpiar('consulta1');
                $scope.Vista1_datos = data.varCursor;
                $scope.tablaConsulta = true;
                setTimeout(() => {
                  $scope.$apply()
                }, 500);
                $scope.initPaginacion(data.varCursor);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text:  data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatHora = function (date) {
        if (minutos < 10) { minutos = "0" + minutos; }
        var d = new Date(date);
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var minutos = d.getMinutes();
        return hh + ':' + minutos + ':00';
      }
      $scope.formatDatehora = function (date) {
        // console.log(date);
        var x = document.getElementById("myTime").value;
        // console.log(x);
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      }
      $scope.formatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor.toString().toUpperCase();
      }
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
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
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
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
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
      });
    }])
  .directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
