'use strict';

angular.module('GenesisApp')

  .controller('consultaautipsController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp','$sce', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp,$sce) {

    $(document).ready(function () {
    });     
    $scope.inactiveseccion4tab4 = false;
    $scope.activetipotabIV = true;
    $scope.nofindproductstabI = false;
    $scope.nofindproductstabIV = false;
    $scope.inactimiprestab1 = true;
    $scope.inactimiprestab4 = true;
    $scope.inactivetagmipres = true;
    $scope.inactivetagctc = true;
    $scope.inactivetagtutela = true;
    $scope.inactivetagsiniestro = true;
    $scope.nameservicio = 'de orden'
    $scope.inactivebarrapro = true;
    $scope.verAutorizaciones = true;


    // wizard

    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invfinalizartabI = true;
    $scope.invfinalizartabIV = true;

    // variables TAB II
    //secciones de ng hide
    $scope.inactiveseccion1tab2 = false;
    $scope.inactiveseccion2tab2 = true;
    $scope.productosagregadostabII = [];
    $scope.nofindproductstabII = false;
    // wizard
    $scope.invsolicitudtabII = true;
    $scope.invproductotabII = true;
    $scope.invfinalizartabII = true;


    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;
    $scope.v_encabezado = null;
    $scope.fechactual = null;

    //Se valida fecha actual

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    $scope.fechactual = hoy;
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    $scope.maxDate = yyyy + '-' + mm + '-' + dd;
    $scope.filterOptions = 'AFILIADO';
    $scope.autdocumento = null;
    $scope.autnumero = null;
    $scope.autubicacion = null;
    function validate_fecha(fecha) {
      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }

    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);
      //Devuelva true o false...
      return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
    }

    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.calcularEdad = function (date, tipo) {
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }
        if (edad > 1900) {
          edad -= 1900;
        }
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        if (tipo == 1) {
          if (edad > 0) {
            $scope.cantidadanosaut = 'años'
            if (edad == 1) {
              $scope.cantidadanosaut = 'años'
            }
            $scope.edadaut = edad;
          } else {
            if (meses > 0) {
              $scope.cantidadanosaut = 'meses'
              if (meses == 1) {
                $scope.cantidadanosaut = 'mes'
              }
              $scope.edadaut = meses;
            } else {
              if (dias > 0) {
                $scope.cantidadanosaut = 'dias'
                if (dias == 1) {
                  $scope.cantidadanosaut = 'dia'
                }
                $scope.edadaut = dias;
              }
            }
          }
        } else if (tipo == 3) {
          if (edad > 0) {
            $scope.cantidadanosautedit = 'años'
            if (edad == 1) {
              $scope.cantidadanosautedit = 'años'
            }
            $scope.edadautedit = edad;
          } else {
            if (meses > 0) {
              $scope.cantidadanosautedit = 'meses'
              if (meses == 1) {
                $scope.cantidadanosautedit = 'mes'
              }
              $scope.edadautedit = meses;
            } else {
              if (dias > 0) {
                $scope.cantidadanosautedit = 'dias'
                if (dias == 1) {
                  $scope.cantidadanosautedit = 'dia'
                }
                $scope.edadautedit = dias;
              }
            }
          }
        } else {
          if (edad > 0) {
            $scope.cantidadanosautpro = 'años'
            if (edad == 1) {
              $scope.cantidadanosautpro = 'años'
            }
            $scope.edadautpro = edad;
          } else {
            if (meses > 0) {
              $scope.cantidadanosautpro = 'meses'
              if (meses == 1) {
                $scope.cantidadanosautpro = 'mes'
              }
              $scope.edadautpro = meses;
            } else {
              if (dias > 0) {
                $scope.cantidadanosautpro = 'dias'
                if (dias == 1) {
                  $scope.cantidadanosautpro = 'dia'
                }
                $scope.edadautpro = dias;
              }
            }
          }
        }
      }
    }

    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        if (response.data.CODIGO != "0") {
          if (tipo == '3') {
            $scope.infoafiliadoautedit = null;
            $scope.infoafiliadoautedit = response.data;
            if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {
              $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';
              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');
            } else {
              $scope.afirownumIV = 1;
              if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }
              if ($scope.infoafiliadoautedit.TUTELA == 'true') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }
              if ($scope.infoafiliadoautedit.GESTION_RIESGO == 'true') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }
              if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }
              if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }
              if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {
                $scope.afirownumIV = $scope.afirownumIV + 1;
              }

              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);
              $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;
              $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;
              $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;
              $scope.datosAfiModalNov = $scope.infoafiliadoautedit;
              $scope.inactiveseccion1tab4 = true;
              $scope.inactiveseccion2tab4 = false;
              $scope.productosagregadostabIV = [];
            }
          }
        } else {
          swal('Importante', response.data.NOMBRE, 'info')
        }
      });
    }
    $scope.valservicio = false;
    $scope.valespecialidad = false;
   
    $scope.buscardocumentos = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtener_soportes', documento: $scope.infoafiliadoautedit.Documento,
          tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
        }
      }).then(function (response) {
        $scope.documentosAfiliado = response.data;
      })

    }


    $scope.limpiar = function () {

      $scope.verAutorizaciones = true;
      $scope.verAutorizacionesEdit = false;
      $scope.inactiveseccion4tab4 = false;
      $scope.check_option = false;
      $scope.autdocumento = null;
      $scope.autnumero = null;
      $scope.autubicacion = null;
      $scope.filtaut = null
      $scope.showsenso = -1;
      $scope.listarAutorizacionesTemp = [];
      $scope.listarAutorizaciones = [];
      $scope.filterOptions = $scope.tempfilterOptions;
    }
  
    $scope.viewdataAut = true;
    $scope.viewdataAutprog = true;
    $scope.verAutorizaciones = true;
    $scope.verAutorizacionesEdit = false;
    $scope.inactivebarraproedit = true;
    $scope.jsonautorizacion = {
      documento: '',
      numero: '',
      ubicacion: '',
      nit: '',
      nitavanzado: '',
      documentoavanzado: '',
      responsableavanzado: '',
      estadoavanzado: '',
      diagnosticoavanzado: '',
      servicioavanzado: '',
      filtro_ordenavanzado: 'N',
      fecha_ordeniniavanzado: null,
      fecha_ordenfinavanzadoparseada: null,
      fecha_ordeniniavanzadoparseada: null,
      fecha_ordenfinavanzado: null,
      filtro_confirmadoavanzado: 'N',
      fecha_confirmadoiniavanzado: null,
      fecha_confirmadoiniavanzadoparseada: null,
      fecha_confirmadofinavanzadoparseada: null
    }


    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }


    $scope.tempjsonaut = {};

    $scope.buscarAutorizaciones = function () {
      $scope.nameaut = 'Autorizaciones';
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $scope.tempfilterOptions = $scope.filterOptions;
      if ($scope.filterOptions == 'AFILIADO') {
        // Avanzado
        if ($scope.documento == '' || $scope.documento == 0 || $scope.documento == null) {
          $scope.validatefiltros = true;
        } else {
          $scope.validatefiltros = false;
        }
      }
      if ($scope.filterOptions == 'AUTORIZACION') {
        // Avanzado
        if ($scope.numero == '' || $scope.numero == 0 || $scope.numero == null) {
          $scope.validatefiltros = true;
        }
        // if ($scope.ubicacion == '' || $scope.ubicacion == 0 || $scope.ubicacion == '') {
        //   $scope.validatefiltros = true;
        // }

        if ($scope.numero) {
          $scope.validatefiltros = false;
        }
      }

      if ($scope.filterOptions == 'IPS') {
        // Avanzado
        if ($scope.nit == '' || $scope.nit == 0 || $scope.nit == null) {
          $scope.validatefiltros = true;
        } else {
          $scope.validatefiltros = false;
        }
      }

      if ($scope.validatefiltros == false) {
          var temptipodocumento = '';
          var tempdocumento = 0;
          var tempnumero = 0;
          var tempubicacion = 0;
          if ($scope.filterOptions == 'AFILIADO') {
            temptipodocumento = $scope.consultatipodocumento;
            tempdocumento = $scope.documento;
            tempnumero = 0;
            tempubicacion = 0;
          }
          if ($scope.filterOptions == 'AUTORIZACION') {
            tempdocumento = 0;
            tempnumero = $scope.numero;
            tempubicacion = $scope.ubicacion;
          }
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'p_consulta_autorizaciones_2',tipodocumento:temptipodocumento, documento: tempdocumento, numero: tempnumero, ubicacion: tempubicacion, ips: $scope.nit }
          }).then(function (response) {
            if (response.data.info.CODIGO == '0') {
              $scope.verAutorizaciones = true;
              $scope.infoafiliadoautedit = [];
              swal('Importante', response.data.info.NOMBRE, 'info');
              $scope.listarAutorizaciones = [];
            } else {
              $scope.verAutorizaciones = false;
              swal.close();
              $scope.infoafiliadoautedit = response.data.info;
              $scope.listarAutorizaciones = response.data.aut;
              $scope.initPaginacion($scope.listarAutorizaciones);
              if (response.data.tipo != 'IPS') {
                $scope.afirownumIV = 1;
                if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                if ($scope.infoafiliadoautedit.TUTELA == 'true') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                if ($scope.infoafiliadoautedit.GESTION_RIESGO == 'true') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {
                  $scope.afirownumIV = $scope.afirownumIV + 1;
                }
                $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
              }
              $scope.validatefiltros = true;

            }
          })
      } else {
        if ($scope.filterOptions == 'AFILIADO') {
          $scope.textvalidate = "Datos del AFILIADO no pueden estar vacios!"
        }
        if ($scope.filterOptions == 'AUTORIZACION') {
          $scope.textvalidate = "Datos de la AUTORIZACION no pueden estar vacios!"
        }
        swal('Importante', $scope.textvalidate, 'info');

      }
    }


    $scope.initPaginacion = function (info) {
      $scope.listarAutorizacionesTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    }
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
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
      if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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
        if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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

    $scope.filter = function (val) {
      $scope.listarAutorizacionesTemp = $filter('filter')($scope.listarAutorizaciones, val);
      if ($scope.listarAutorizacionesTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }



    $scope.calcularEdad = function (date) {
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }

        if (edad > 1900) {
          edad -= 1900;
        }



        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }



        if (edad > 0) {

          $scope.cantidadanosautedit = 'años'

          if (edad == 1) {

            $scope.cantidadanosautedit = 'años'

          }

          $scope.edadautedit = edad;

        } else {

          if (meses > 0) {

            $scope.cantidadanosautedit = 'meses'

            if (meses == 1) {

              $scope.cantidadanosautedit = 'mes'

            }

            $scope.edadautedit = meses;

          } else {

            if (dias > 0) {

              $scope.cantidadanosautedit = 'dias'

              if (dias == 1) {

                $scope.cantidadanosautedit = 'dia'

              }

              $scope.edadautedit = dias;

            }

          }

        }




      }

    }
    $scope.v_encabezado = null;
    $scope.v_detalle = null;
    $scope.v_encabezadov = null;
    $scope.v_detallev = null;
    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
      swal({ title: 'Buscando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          $scope.totalaut  = response.data.total;

          if ($scope.v_encabezadov.ESTADO == 'A') {
            $scope.verPrintDetalle = true;
          } else {
            $scope.verAutorizaciones = false;
            $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
            $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
          }
        }
        swal.close();
      })
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