'use strict';
angular.module('GenesisApp')
  .controller('consultaIntegralController', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication', 'digitalizacionHTTP',
    function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication, digitalizacionHTTP) {
      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
      }
      $('.tabs').tabs();
      $scope.paso = 1;
      $scope.Tabs = 'HOJA1';
      $scope.Tabs_soportesAC = 1;
      $scope.mostrarTab = 1;
      $scope.subpaso = 1;
      $scope.obtenerDocumento();
      $scope.busqueda = {
        tipo: 1
      };
      $scope.consulta_seleccion = [
        {
          nombre: 'Aseguramiento',
          componentes: [
            { nombre: "Portabilidad RS", id: '0', func: "P_OBTENER_PORTABILIDAD" },
            { nombre: "Traslados A Favor EPS RS", id: '1', func: "traslado" },
            { nombre: "Traslados Eps Subsidiado RS", id: '2', func: "s2" },
            { nombre: "Automatico Traslados EPS Contributivo RS", id: '3', func: "s2automatico" },
            { nombre: "Traslados Eps Contributivo RS", id: '4', func: "r2traslado" },
            //{ nombre: "Automatico Traslados EPS Contributivo RS", id: '5', func: "r2autotraslado" },
            { nombre: "MS Maestro Ingresos RS", id: '6', func: "maestroingreso" },
            { nombre: "NS Maestro Novedades RS", id: '7', func: "maestronovedad" },
            { nombre: "MS Consolidado BDUA Actual RS", id: '8', func: "consolidado" },
            { nombre: "MS Consolidado BDUA Historico RS", id: '9', func: "consolidadohistorico" },
            { nombre: "LMA Liquidacion Mensual De Afiliados RS", id: '10', func: "liquidacionmensual" },
            { nombre: "Eliminaciones RESOL 2199/2013 RS", id: '11', func: "eliminacion" },
            { nombre: "SAT RS", id: '12', func: "sats" },

            { nombre: "R1 RC", id: '13', func: "bduacrc1" },
            { nombre: "R2 RC", id: '14', func: "bduacrc2" },
            { nombre: "S2 Automatico RC", id: '15', func: "cs2" },
            { nombre: "Aportantes MA RC", id: '16', func: "cama" },
            { nombre: "MC RC", id: '17', func: "cmc" },
            { nombre: "NC RC", id: '18', func: "cnc" },
            { nombre: "Afiliaciones RC", id: '19', func: "conafil" },
            { nombre: "BDUA Interna RC", id: '20', func: "cbi" },
            { nombre: "Pila RC", id: '21', func: "cp" },
            { nombre: "Periodos Preliquidados RC", id: '22', func: "cpp" },
            { nombre: "Nove Retiro Pila RC", id: '23', func: "cnrp" },
            { nombre: "Compensacion Cotizante RC", id: '24', func: "ccc" },
            { nombre: "CR RC", id: '25', func: "ccr" },
            { nombre: "Gestion Glosa BDUA RC", id: '26', func: "cggb" },
            { nombre: "SAT RC", id: '27', func: "satc" },
          ]
        },
        {
          nombre: 'Asistencial',
          componentes: [
            { nombre: "Contratación - Escenarios", id: '0', func: "P_OBTENER_CONTRATOS_PRESTACION" },
            { nombre: "Autorizaciones", id: '1', func: "P_OBTENER_AUTORIZACIONES" },
            { nombre: "Tutelas", id: '2', func: "P_OBTENER_TUTELAS" },
            { nombre: "Alto Costo", id: '3', func: "P_OBTENER_SINIESTROS_CONFIRMADOS_ALTOCOSTO" },
            { nombre: "Facturas", id: '4', func: "P_OBTENER_FACTURAS" },
            { nombre: "Codigo de Urgencia", id: '5', func: "P_OBTENER_CODIGOS_URGENCIAS" },
            { nombre: "PQRDS", id: '6', func: "P_OBTENER_PQRS" },
            { nombre: "Censo", id: '7', func: "P_OBTENER_LISTA_CENSO" },
          ]
        },
        {
          nombre: 'Financiero',
          componentes: [
            { nombre: "Incapacidades", id: '0', func: "P_OBTENER_INCAPACIDADES" },
          ]
        },
        {
          nombre: 'Gestión Clínica',
          componentes: [
            { nombre: "Seguimiento Cancer", id: '0', func: "seguimiento_cancer" },
            { nombre: "Soportes Alto Costo", id: '1', func: "soportes_alto_costo" },
            { nombre: "Seguimiento Telefonico", id: '2', func: "seguimiento_telefonico" },
            { nombre: "Seguimiento Grupos Priorizados", id: '3', func: "seguimiento_telefonico" },
          ]
        },
      ]

      $scope.seleccionarAfiliado = function (documento, numero) {
        $scope.busqueda.documento = documento,
          $scope.busqueda.numero = numero
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/consultaAfiliados/consultaIntegral.php",
          data: {
            function: 'P_OBTENER_DATOS_AFILIADOS',
            v_ptipodocumento: documento,
            v_pdocumento: numero,
          }
        }).then(function (response) {
          if (response.data.Codigo == 1) {
            swal('Información', response.data.Nombre, 'error');
            return;
          }
          swal.close();
          $scope.paso = 2
          $scope.seleccion(1);
          $scope.datosBasico = response.data;

          consultaHTTP.obtenerAnexos(documento, numero).then(function (response) {
            $scope.anexodata = response;
          })
        })
      }
      $scope.estadoanexo = function (data) {
        $scope.editruta = data.RUTA;
        $scope.ftp = data.FTP;
        $scope.inforapida = data;
        ngDialog.open({
          template: 'views/consultaAfiliados/modalestadoanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'estadoanexoctrl',
          scope: $scope
        });
      }
      $scope.tabla_datos = [];
      $scope.buscar = function () {
        $scope.tabla_datos = [];
        $scope.busqueda.tipo = $scope.mostrarTab;
        if ($scope.busqueda.tipo == 1) {
          if (($scope.busqueda.documento == '') || ($scope.busqueda.documento == null) || ($scope.busqueda.documento == undefined)) {
            swal('Información', "Para este tipo de busqueda, es necesario el tipo de documento del afiliado", 'error');
            return;
          } else if (($scope.busqueda.numero == '') || ($scope.busqueda.numero == null) || ($scope.busqueda.numero == undefined)) {
            swal('Información', "Para este tipo de busqueda, es necesario el numero del documento del afiliado", 'error');
            return;
          }
          $scope.seleccionarAfiliado($scope.busqueda.documento, $scope.busqueda.numero);

        } else {
          if (($scope.busqueda.primerNombre == '') || ($scope.busqueda.primerNombre == null) || ($scope.busqueda.primerNombre == undefined)) {
            swal('Información', "Para este tipo de busqueda, es necesario el Primer Nombre del afiliado", 'error');
            return;
          } else if (($scope.busqueda.primerApellido == '') || ($scope.busqueda.primerApellido == null) || ($scope.busqueda.primerApellido == undefined)) {
            swal('Información', "Para este tipo de busqueda, es necesario el Primer Apellido del afiliado", 'error');
            return;
          }
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/consultaAfiliados/consultaIntegral.php",
            data: {
              function: 'P_OBTENER_DATOS_AFILIADOS_APELLIDOS',
              v_papellido1: $scope.busqueda.primerApellido,
              v_papellido2: $scope.busqueda.segundoApellido,
              v_pnombre1: $scope.busqueda.primerNombre,
              v_pnombre2: $scope.busqueda.segundoNombre
            }
          }).then(function (response) {
            if (response.data.Codigo == 1) {
              swal('Información', response.data.Nombre, 'error');
              return;
            }
            $scope.tabla_datos = response.data
            swal.close();
            // console.log(response);
            // $scope.paso=2
            // $scope.subpaso=1;
            // $scope.datosBasico=response.data;
          })
        }



      }
      $scope.borrar = function () {
        $scope.busqueda = {
          documento: '',
          numero: '',
          tipo: 1
        };
      }

      $scope.seleccion = function (id) {
        $scope.subpaso = 1;
        $scope.gestion_seleccionada = id;
        // $scope.gestion_seleccionada2=0;
        $scope.seleccion2(0);

      }
      $scope.seleccion2 = function (id) {
        $scope.filtrar = '';
        // $scope.subpaso=2;
        $scope.gestion_seleccionada2 = id;
        if (($scope.gestion_seleccionada == 0) && ($scope.gestion_seleccionada2 != 0)) {
          $scope.busqueda_consulta_aseguramiento($scope.consulta_seleccion[$scope.gestion_seleccionada].componentes[$scope.gestion_seleccionada2].func)
        } else {
          $scope.busqueda_consulta($scope.consulta_seleccion[$scope.gestion_seleccionada].componentes[$scope.gestion_seleccionada2].func)
        }
      }

      $scope.busqueda_consulta = function (funcion) {
        $scope.datos_tabla = [];
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/consultaAfiliados/consultaIntegral.php",
          data: {
            function: funcion,
            v_ptipodocumento: $scope.busqueda.documento,
            v_pdocumento: $scope.busqueda.numero,
          }
        }).then(function (response) {
          $scope.datos_tabla = response.data
          $scope.mostrarTabla = funcion;
          $scope.mostrarFormulario = "";
          swal.close();
        })
      }

      $scope.busqueda_consulta_aseguramiento = function (funcion) {
        $scope.datos_tabla = [];
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();

        $http({
          method: 'POST',
          url: "php/bdua/funbdua.php",
          data: {
            function: funcion,
            strNumeroDocumento: $scope.busqueda.numero + ""
          }
        }).then(function (response) {
          swal.close();
          $scope.datos_tabla = response.data
          $scope.mostrarTabla = funcion;
          
        })

      }
      $scope.exportar = function (JSONData) {
        var data = JSONData;
        // / * Si el componente xlsx no se importa, entonces importe * /
        if (typeof XLSX == 'undefined') XLSX = require('xlsx');
        // / * Crear hoja de trabajo * /
        var ws = XLSX.utils.json_to_sheet(data);
        // / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "data");
        // / * Generar archivo xlsx * /
        XLSX.writeFile(wb, "data.xlsx");
      }

      $scope.abirDetalleAutorizacion = function (data) {
        $scope.autorizacion_selecionada = data;
        $scope.dialogNewAfil = ngDialog.open({
          template: 'views/consultaAfiliados/modal/modalDetalleAutorizacion.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalconsultaautorizacionesController',
          scope: $scope

        });
      }
      $scope.abirDetallePQRDS = function (data) {
        $scope.data_pqrds = data;
        $scope.dialogNewAfil = ngDialog.open({
          template: 'views/consultaAfiliados/modal/modalDetallePQRDS.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalconsultaPQRSDController',
          scope: $scope

        });
      }

      $scope.setTab = function (x) {
        $scope.Tabs_soportesAC = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.descargarSoportes = function (ruta) {
        $http({
          method: 'POST',
          url: "php/altocosto/busquedasoportesaltoc.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }

      $scope.Mostar_Formulario = function(x){
        $scope.tab = 1;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCancer.php",
          data: {
            function: "obtenerRespuestas",
            cod: x.RADICADO,
          },
        }).then(function ({data}) {
          $scope.mostrarFormulario = 'SC';
          // $scope.v1 = data[0].V1;
          // $scope.v2 = data[0].V2;
          // $scope.v3 = data[0].V3;
          // $scope.v4 = data[0].V4;
          // $scope.v5 = data[0].V5;
          // $scope.v6 = data[0].V6;
          // $scope.v7 = data[0].V7;
          // $scope.v8 = data[0].V8;
          // $scope.v9 = data[0].V9;
          // $scope.v10 = data[0].V10;
          // $scope.v11 = data[0].V11;
          // $scope.v12 = data[0].V12;
          // $scope.v13 = data[0].V13;
          // $scope.v14 = data[0].V14;
          // $scope.v15 = data[0].V15;
          // $scope.v16 = data[0].V16;
          // $scope.v17 = data[0].V17;
          // $scope.v18 = data[0].V18;
          // $scope.v19 = data[0].V19;
          // $scope.v20 = data[0].V20;
          // $scope.v21 = data[0].V21;
          // $scope.v22 = data[0].V22;
          // $scope.v23 = data[0].V23;
          // $scope.v24 = data[0].V24;
          // $scope.v25 = data[0].V25;
          // $scope.v26 = data[0].V26;
          // $scope.v27 = data[0].V27;
          // $scope.v28 = data[0].V28;
          // $scope.v29 = data[0].V29;
          // $scope.v30 = data[0].V30;
          // $scope.v31 = data[0].V31;
          // $scope.v32 = data[0].V32;
          // $scope.v33 = data[0].V33;
          // $scope.v34 = data[0].V34; revisar variable 531 era datalist
          for (let i = 1; i <= 148; i++) {
            $scope['v'+i] = data[0]['V'+i];            
          }
          for (let i = 461; i < 468; i++) {
            $scope['v'+i] = data[0]['V'+i];    
          }
          for (let i = 531; i < 539; i++) {
            $scope['v'+i] = data[0]['V'+i];    
          }
          for (let i = 661; i < 669; i++) {
            $scope['v'+i] = data[0]['V'+i];    
          }
          for (let i = 1141; i < 1146; i++) {
            $scope['v'+i] = data[0]['V'+i];    
          }
        });
      }

      $scope.setTab2 = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        $(".tabIII").removeClass("tabactiva");
        $(".tabIV").removeClass("tabactiva");
        $(".tabV").removeClass("tabactiva");
        $(".tabVI").removeClass("tabactiva");
        $(".tabVII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            break;
          case 2:
            $(".tabII").addClass("tabactiva");
            break;
          case 3:
            $(".tabIII").addClass("tabactiva");
            break;
          case 4:
            $(".tabIV").addClass("tabactiva");
            break;
          case 5:
            $(".tabV").addClass("tabactiva");
            break;
          case 6:
            $(".tabVI").addClass("tabactiva");
            break;
          case 7:
            $(".tabVII").addClass("tabactiva");
            break;
          default:
        }
      };
  
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      };
    }
  ]);
