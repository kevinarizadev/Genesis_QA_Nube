'use strict';
angular.module('GenesisApp')
  .controller('autorizaciontutelasController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
        $scope.StatusVer = 0;
        $scope.FiltroBuscar = '';
        $scope.MostrarDatos = '';
        $scope.obtenerListadoTutelas();
        $("#modalips").modal();
        $("#habilitarbotonfinalizar").attr('disabled', 'disabled');
      }

      $scope.listLimpiar = function () {
        $scope.listadoTutelas = [];
      }
      $scope.obtenerListadoTutelas = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $scope.listadoTutelas = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizaciontutelas.php",
          data: {
            function: 'P_lista_tutela_areas',
          }
        }).then(function ({ data }) {
          swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.listadoTutelas = data;
            $scope.initPaginacion($scope.listadoTutelas);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }


      $scope.obtenerListadoTutelaAreas = function (numero, ubicacion) {
        $scope.listadoGestiones = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizaciontutelas.php",
          data: {
            function: 'p_obtener_tutelas_areas',
            numero, ubicacion
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br' && response.data != 0) {
            $scope.HojaAnticipo = true;
            $scope.listadoGestiones = response.data;
          } else {
            if (response == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", response, "warning").catch(swal.noop);
          }
        });
      }
      $scope.abrirmodal = function (dato) {
        $scope.listIps = [];
        $scope.buscard2 = '';
        $scope.v_pnumero = dato.NUMERO;
        $scope.v_pubicacion = dato.UBICACION;
        $scope.v_pproducto = dato.COD_PRODUCTO;
        $scope.v_psubclasificacion = dato.COD_SUBCLASIFICACION;
        // $scope.v_psubclasificacion = 0;
        $("#modalips").modal("open");
        setTimeout(() => {
          $('#modalips #ipsinput').focus();
        }, 100);
      }
      $scope.buscarIps = function (ips) {
        if (ips != "" || ips != undefined) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizaciontutelas.php",
            data: { function: 'p_obtener_listado_ips',
                    v_pnumero:$scope.v_pnumero,
                    v_pubicacion:$scope.v_pubicacion,
                    v_pproducto:$scope.v_pproducto,
                    // v_psubclasificacion:$scope.v_psubclasificacion,
                    v_psubclasificacion:0,
                    ips: ips
                  }
          }).then(function (response) {
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'IPS no encontrada', 'info');
              $scope.inactivebarraips = true;
            } else {
              $scope.listIps = response.data;
              $scope.inactivebarraips = false;
            }
          })
        } else {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        }
      }
      $scope.listadoipsenviar = [];
      $scope.seleccionarips = function(nitips,nombreips,contrato,ubicacion,direccion,clasificacion){
        for (var i=0; i<$scope.listadoGestiones.length; i++) {
              if ($scope.listadoGestiones[i].COD_PRODUCTO == $scope.v_pproducto && $scope.listadoGestiones[i].COD_SUBCLASIFICACION == $scope.v_psubclasificacion) {
                  $scope.listadoGestiones[i].NIT_ASIGNADO = nitips;
                  $scope.listadoGestiones[i].PRESTADOR_ASIGNADO = nombreips;
                  var datosrecibidos = { "CODIGO":$scope.v_pproducto, 
                                         "CODIGO_SUBCLASE": $scope.v_psubclasificacion, 
                                         "PRESTADOR_ASIGNADO": nitips,
                                         "CONTRATO": contrato,
                                         "UBICACION_CONTRATO": ubicacion,
                                         "DIRECCION": direccion,
                                         "CLASIFICACION": clasificacion,
                                         };
                  $scope.listadoipsenviar.push(datosrecibidos);
              }
          }
          $("#modalips").modal("close");
          $scope.listIps = [];
          if($scope.listadoGestiones.length == $scope.listadoipsenviar.length){
            $("#habilitarbotonfinalizar").removeAttr('disabled');
         }
      }

      $scope.FinalizarRevision = function () {
        swal({
          title: 'Confirmar',
          text: 'Seguro Desea Finalizar La Asignacion?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aprobar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizaciontutelas.php",
              data: { function: 'Finalizar_Asignacion_ips',
              v_pnumero:$scope.v_pnumero.toString(),
              v_pubicacion:$scope.v_pubicacion.toString(),
              v_pjson_servicio: JSON.stringify($scope.listadoipsenviar),
              v_pcantidad_serv: $scope.listadoipsenviar.length}
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                $scope.listadoipsenviar = [];
                swal({ title: "Completado", text: response.data.Nombre, type: "success", });
                setTimeout(() => {
                  $scope.atras();
                  $scope.obtenerListadoTutelas();
                }, 1500);
              } else {
                swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "error", timer: 5000 });
              }
            })
          }
        })
      }
      $scope.atras = function () {
        $("#habilitarbotonfinalizar").attr('disabled', 'disabled');
        $scope.documentosrevisados = []
        $scope.HojaAnticipo = false;
      }



      $scope.initPaginacion = function (info) {
        $scope.listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.MostrarDatos = 10;
        $scope.configPages();
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.listDatosTemp.length;
          $scope.valmaxpag = $scope.listDatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
          $scope.listDatosTemp = $filter('filter')($scope.listadoTutelas, val);
          $scope.configPages();
          $scope.Filter_Val = val;
        } else {
          $scope.listDatosTemp = $filter('filter')($scope.listadoTutelas, '');
          $scope.configPages();
          $scope.Filter_Val = '';
        }
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.listDatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
        if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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
          if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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

      $scope.Ajustar_Pantalla = function () {
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
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });

function FormatSwal() {
  const input = document.querySelectorAll('#textarea_swal')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
}