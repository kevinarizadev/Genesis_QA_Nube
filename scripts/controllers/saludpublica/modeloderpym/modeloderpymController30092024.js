'use strict';
angular.module('GenesisApp')
  .controller('modeloderpymController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        setTimeout(() => {
          $scope.Tabs = 1;
          $('#tabs_1').click();
        }, 1000);
        setTimeout(() => {
          $scope.Tabsmotivos = 1;
        }, 500);
        $scope.consultaPrestador = true;
        $scope.SysDay = new Date();
        $('.modal').modal();
        $scope.limpiar('1');
        $scope.limpiar('2');
        $scope.limpiar('3');
        $scope.limpiar('4');
        $scope.limpiar('5');
        $(".modal").modal();
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
        $scope.Vista2 = {
          Mostrar_Sol: 10
        };
        $scope.Vista3 = {
          Mostrar_Sol: 10
        };
        $scope.Vista4 = {
          Mostrar_Sol: 10
        };
        $scope.Vista5 = {
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
      }

      $scope.Estado_Solicitud_Color = function (Estado) {

        if (!Estado) return;
        if (Estado == 'red') {
          return { "background-color": "rgb(255,0,0) !important;" }
        }
        if (Estado == 'yellow') {
          return { "background-color": "rgb(255, 255, 0) !important;" }
        }
        if (Estado == 'green') {
          return { "background-color": "rgb(0,255,0)!important" }
        }
      }
      $scope.Estado_Solicitud_Clase = function (Estado) {

        // estado con menos de 4 horas
        if (!Estado) return;
        if (Estado == 'red') {
          return "Con_pulse_X"
        }
        // estado con entre 4 y 8 horas
        if (Estado == 'yellow') {
          return "Con_pulse_A"
        }
        // estado con menos de 4 horas
        if (Estado == 'green') {
          return "Con_pulse_V"
        }
      }
      
      $scope.listado_de_anno_Rpym = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'lista_de_anno_Rpym',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.listadoAnnos = data;
          }
        });
      }
      $scope.listado_de_mes_Rpym = function (info) {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'P_OBTENER_MES',
            vpanno:info,
          }
        }).then(function ({ data }) {
          console.log(data);
          $scope.listaMeses = data;
          if (data && data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.listadoMes = [];
            $scope.listaMeses.forEach(e => {
              if (e.mes == 1) {
                var mesSeleccionado = {
                  "Codigo": "01",
                  "Nombre": "ENERO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 2) {
                var mesSeleccionado = {
                  "Codigo": "02",
                  "Nombre": "FEBRERO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 3) {
                var mesSeleccionado = {
                  "Codigo": "03",
                  "Nombre": "MARZO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 4) {
                var mesSeleccionado = {
                  "Codigo": "04",
                  "Nombre": "ABRIL"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 5) {
                var mesSeleccionado = {
                  "Codigo": "05",
                  "Nombre": "MAYO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 6) {
                var mesSeleccionado = {
                  "Codigo": "06",
                  "Nombre": "JUNIO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 7) {
                var mesSeleccionado = {
                  "Codigo": "07",
                  "Nombre": "JULIO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 8) {
                var mesSeleccionado = {
                  "Codigo": "08",
                  "Nombre": "AGOSTO"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 9) {
                var mesSeleccionado = {
                  "Codigo": "09",
                  "Nombre": "SEPTIEMBRE"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 10) {
                var mesSeleccionado = {
                  "Codigo": "10",
                  "Nombre": "OCTUBRE"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 11) {
                var mesSeleccionado = {
                  "Codigo": "11",
                  "Nombre": "NOVIEMBRE"
                }
                $scope.listadoMes.push(mesSeleccionado);
              } else if (e.mes == 12) {
                var mesSeleccionado = {
                  "Codigo": "12",
                  "Nombre": "DICIEMBRE"
                }
                $scope.listadoMes.push(mesSeleccionado);
              }
            })
          }
        });
      }
      $scope.consultasInforme = function (datosConsulta) {
        if (datosConsulta == 1) {
          $scope.Vista3.filtrar_Programacion = '';
          $scope.consultaPrestador = true;
          $scope.consultaTotal = false;
          $scope.consultaConsolidado = false;
          $scope.Vista3_datos = [];
          $scope.Vista4_datos = [];
          $scope.Vista5_datos = [];
          $scope.listadoMes = [];
          $scope.limpiar('3');
        } else if (datosConsulta == 2) {
          $scope.Vista4.filtrar_Programacion = '';
          $scope.consultaTotal = true;
          $scope.consultaPrestador = false;
          $scope.consultaConsolidado = false;
          $scope.Vista3_datos = [];
          $scope.Vista4_datos = [];
          $scope.Vista5_datos = [];
          $scope.listadoMes = [];
          $scope.limpiar('4');
        } else if (datosConsulta == 3) {
          $scope.Vista5.filtrar_Programacion = '';
          $scope.consultaConsolidado = true;
          $scope.consultaPrestador = false;
          $scope.consultaTotal = false;
          $scope.Vista3_datos = [];
          $scope.Vista4_datos = [];
          $scope.Vista5_datos = [];
          $scope.listadoMes = [];
          $scope.limpiar('5');
        }
      }
      // Creacion de selec año actual para arriba
      // $scope.seleccdeAños1 = function () {
      //   var currentYear = new Date().getFullYear();
      //   var years = [];
      //   for (var i = currentYear; i <= currentYear + 10; i++) {
      //     years.push(i);
      //   }
      //   $scope.annos = years;
      // }
      $scope.limpiar = function (Tabs) {
        // console.log(Tabs);
        $scope.listaAnos = [];
        switch (Tabs) {
          case '2':
            $scope.consulProg = {
              numeroNit: '',
              anno: '',
              tipodeRegimen: ''
            }
            break;
          case '3':
            $scope.consulResumen = {
              numeroNit: '',
              anno: '',
              mes: '',
              numeroContrato: '',
              tipodeRegimen: ''
            }
            break;
          case '4':
            $scope.consulTotal = {
              anno: '',
              mes: '',
              tipodeRegimen: ''
            }
            break;
          case '5':
            $scope.consulConsolidado = {
              anno: '',
              mes: ''
            }
            break;


          default:
        }
      }
      $scope.listar_tabla_Actvidades = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista1_datos = [];
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'lista_de_actividadesRpym',
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.Vista1_datos = response.data;
            $scope.init_pag_Tabla(response.data);
          }
        });
      }
      $scope.listar_tabla_Programacion = function () {
        $scope.Vista2.filtrar_Programacion = '';
        if ($scope.consulProg.numeroNit == '' || $scope.consulProg.anno == '' || $scope.consulProg.tipodeRegimen == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el proceso de consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        }
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista2_datos = [];
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'lista_de_programacionRpym',
            vpnit: $scope.consulProg.numeroNit,
            vpanno: $scope.consulProg.anno,
            vpregimen: $scope.consulProg.tipodeRegimen
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.vistaConsulta = false;
            $scope.Vista2_datos = response.data.varCursor;
            $scope.init_pag_Tabla(response.data.varCursor);
            $scope.limpiar('2');
          }
        });
      }
      $scope.listadecontratoRpym = function (nit, regimen) {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'lista_de_contrato_Rpym',
            vpnit: nit,
            vpregimen: regimen,
          }
        }).then(function ({ data }) {
          console.log(data);
          swal.close();
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.listadoContrato = data;
            if ($scope.listadoContrato.length > 0) {
              $scope.consulResumen.numeroContrato = $scope.listadoContrato[0].num_contrato;
            }
          }
        });
      }
      $scope.listar_tabla_detalle_por_prestador = function () {
        if ($scope.consulResumen.numeroNit == '' || $scope.consulResumen.anno == '' || $scope.consulResumen.mes == '' || $scope.consulResumen.numeroContrato == '' || $scope.consulResumen.tipodeRegimen == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el proceso de consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        }
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista3_datos = [];
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'P_OBTENER_RESUMEN_DETALLE',
            vpnit: $scope.consulResumen.numeroNit,
            vpvpregimen: $scope.consulResumen.tipodeRegimen,
            vpanno: $scope.consulResumen.anno,
            vpmes: $scope.consulResumen.mes,
            vpcontrato: $scope.consulResumen.numeroContrato
          }
        }).then(function (response) {
          console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.consultaPrestador = false;
            $scope.Vista3_datos = response.data;
            $scope.init_pag_Tabla(response.data);
            // $scope.limpiar('3');
          }
        });
      }
      $scope.listar_tabla_detalle_total = function () {
        if ($scope.consulTotal.anno == '' || $scope.consulTotal.mes == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el proceso de consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        }
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista4_datos = [];
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'P_OBTENER_RESUMEN_TOTAL',
            vpanno: $scope.consulTotal.anno,
            vpmes: $scope.consulTotal.mes,
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.consultaTotal = false;
            $scope.Vista4_datos = response.data.varCursor;
            $scope.init_pag_Tabla(response.data.varCursor);
            // $scope.limpiar('3');
          }
        });
      }
      $scope.listar_tabla_consolidado = function () {
        if ($scope.consulConsolidado.anno == '' || $scope.consulConsolidado.mes == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el proceso de consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        }
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista5_datos = [];
        $http({
          method: 'POST',
          url: "php/saludpublica/modeloderpym/modeloderpym.php",
          data: {
            function: 'LISTAR_TABLA_CONSOLIDADO',
            vpanno: $scope.consulConsolidado.anno,
            vpmes: $scope.consulConsolidado.mes
          }
        }).then(function (response) {
          console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.consultaConsolidado = false;
            $scope.Vista5_datos = response.data.varCursor;
            $scope.init_pag_Tabla(response.data.varCursor);
            // $scope.limpiar('5');
          }
        });
      }
      $scope.descargar_reporte_por_Prestador = function () {
        if ($scope.consulResumen.numeroNit != "" && $scope.consulResumen.tipodeRegimen != "" && $scope.consulResumen.anno != "" && $scope.consulResumen.mes != "" && $scope.consulResumen.numeroContrato != "") {
          // console.log($scope.F_Inicio)
          var nit_prestador = $scope.consulResumen.numeroNit;
          var regimen_prestador = $scope.consulResumen.tipodeRegimen;
          var anno_prestador = $scope.consulResumen.anno;
          var mes_prestador = $scope.consulResumen.mes;
          var contrato_prestador = $scope.consulResumen.numeroContrato;
          window.open(
            "views/saludpublica/formatos/formato_reporte_por_prestador_rpym.php?nit_prestador=" +
            nit_prestador +
            "&regimen_prestador=" +
            regimen_prestador +
            "&anno_prestador=" +
            anno_prestador +
            "&mes_prestador=" +
            mes_prestador +
            "&contrato_prestador=" +
            contrato_prestador,
            "_blank",
            "width=900,height=1100"
          );
        } else {
          swal({
            type: "error",
            title: "No se permiten campos vacios",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      };
      $scope.descargar_reporte_por_total = function () {
        if ($scope.consulTotal.anno != "" && $scope.consulTotal.mes != "" ) {
          // console.log($scope.F_Inicio)
          var anno_total = $scope.consulTotal.anno;
          var mes_total = $scope.consulTotal.mes;
          window.open(
            "views/saludpublica/formatos/formato_reporte_total_rpym.php?anno_total=" +
            anno_total +
            "&mes_total=" +
            mes_total
          );
        } else {
          swal({
            type: "error",
            title: "No se permiten campos vacios",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      };
      $scope.descargar_reporte_consolidado = function () {
        if ($scope.consulConsolidado.anno != "" && $scope.consulConsolidado.mes != "") {
          var anno_consolidado = $scope.consulConsolidado.anno;
          var mes_consolidado = $scope.consulConsolidado.mes;
          window.open(
            "views/saludpublica/formatos/formato_reporte_consolidado_rpym.php?anno_consolidado=" +
            anno_consolidado +
            "&mes_consolidado=" +
            mes_consolidado,
            "_blank",
            "width=900,height=1100"
          );
        } else {
          swal({
            type: "error",
            title: "No se permiten campos vacios",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      };
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }
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
        var x = document.getElementById("myTime").value;
      };
      $scope.Tab_motivos = function (datosConsulta) {
        $scope.Tabsmotivos = datosConsulta;
        $scope.consultasInforme($scope.Tabsmotivos);
      }
      $scope.Set_Tab = function (x, grupo) {
        // console.log(grupo);
        //  console.log(x);
        $scope.Vista2_datos = '';
        $scope.Vista3_datos = '';
        $scope.Vista4_datos = '';
        $scope.Vista5_datos = '';
        $scope.grupos = grupo;
        $scope.Tabs = x;
        if (x == 1) {
          $scope.Vista1.filtrar_Actividades = '';
          $scope.listar_tabla_Actvidades();
        }
        if (x == 2) {
          $scope.Vista2.filtrar_Programacion = '';
          $scope.Vista2_datos = [];
          $scope.limpiar('2');
          $scope.listado_de_anno_Rpym();
          $scope.vistaConsulta = true;
        }
        if (x == 3) {
          $scope.Vista3.filtrar_Programacion = '';
          $scope.Vista4.filtrar_Programacion = '';
          $scope.Vista5.filtrar_Programacion = '';
          setTimeout(() => {
            $scope.Tabsmotivos = 1;
            $('#tabsMotivo_1').click();
          }, 500);
          $scope.Vista3_datos = [];
          $scope.Vista4_datos = [];
          $scope.Vista5_datos = [];
          $scope.listado_de_anno_Rpym();
          $scope.consultaPrestador = false;
          $scope.consultaTotal = false;
        }

      }
      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable].toString().replace(/[^0-9]/g, '');// (564) 564 - 4564
          $scope[form][variable] = valor;
          const input = $scope[form][variable].toString().replace(/\D/g, '').substring(0, 10); // 1234567890
          const zip = input.substring(0, 3);//123
          const middle = input.substring(3, 6);//456
          const last = input.substring(6, 10);//7890
          if (input.length > 6) { $scope[form][variable] = `(${zip}) ${middle} - ${last}`; }
          else if (input.length > 3) { $scope[form][variable] = `(${zip}) ${middle}`; }
          else if (input.length > 0) { $scope[form][variable] = `(${zip}`; }
          if (input.length >= 2 && zip.substring(0, 2).toString() != '60') {
            swal('Mensaje', 'El teléfono debe contener la siguiente estructura: (60) + el indicativo de la ciudad + el número del teléfono', 'info').catch(swal.noop);
          }
        } else { $scope[form][variable] = ''; }
      }
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
      $scope.chg_filtrar1 = function (varFiltro) {

        if ($scope.Vista1[varFiltro] == '' || $scope.Vista1[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = '';
          $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista1.Filtrar_tconsulta = '';

        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista1.Filtrar_tconsulta = '';
        }
      }
      $scope.chg_filtrar2 = function (varFiltro) {
        // console.log(varFiltro);
        if ($scope.Vista2[varFiltro] == '' || $scope.Vista2[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista2[varFiltro] = '';
          $scope.list_DatosTemp = $filter('filter')($scope.Vista2_datos, $scope.Vista2[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista2.Filtrar_tconsulta = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista2_datos, $scope.Vista2[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista2.Filtrar_tconsulta = '';
        }
      }
      $scope.chg_filtrar3 = function (varFiltro) {
        // console.log(varFiltro);
        if ($scope.Vista3[varFiltro] == '' || $scope.Vista3[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista3[varFiltro] = '';
          $scope.list_DatosTemp = $filter('filter')($scope.Vista3_datos, $scope.Vista3[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista3.Filtrar_tconsulta = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista3_datos, $scope.Vista3[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista3.Filtrar_tconsulta = '';
        }
      }
      $scope.chg_filtrar4 = function (varFiltro) {
        // console.log(varFiltro);
        if ($scope.Vista4[varFiltro] == '' || $scope.Vista4[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista4[varFiltro] = '';
          $scope.list_DatosTemp = $filter('filter')($scope.Vista4_datos, $scope.Vista4[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista4.Filtrar_tconsulta = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista4_datos, $scope.Vista4[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista4.Filtrar_tconsulta = '';
        }
      }
      $scope.chg_filtrar5 = function (varFiltro) {
        // console.log(varFiltro);
        if ($scope.Vista5[varFiltro] == '' || $scope.Vista5[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista5[varFiltro] = '';
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista5_datos, $scope.Vista5[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista5.Filtrar_tconsulta = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista5_datos, $scope.Vista5[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista5.Filtrar_tconsulta = '';
        }
      }
      $scope.init_pag_Tabla = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.Vista1.Mostrar_Sol = 10;
        $scope.Vista2.Mostrar_Sol = 10;
        $scope.Vista3.Mostrar_Sol = 10;
        $scope.Vista4.Mostrar_Sol = 10;
        $scope.configPages();
      }
      $scope.init_pag_cant_Mostrar = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.list_DatosTemp.length;
          $scope.valmaxpag = $scope.list_DatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
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
      $scope.formatPeso2 = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace(".", ",");
            num = num.split(",");
            num[0] = num[0]
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num[0] = num[0].split("").reverse().join("").replace(/^[\.]/, "");
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + "0";
            }
            return num[0] + "," + num[1];
          } else {
            num = num
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return num;
          }
        }
      };
      $scope.handleKeyPress = function (e, form) {
        // console.log(e, form);
        if ($scope[form].observaciones == null || $scope[form].observaciones == undefined || $scope[form].observaciones == '') { $scope.count = 0; }
        if ($scope[form].observaciones.length < $scope.count) { $scope.count = $scope[form].observaciones.length }
        else ($scope[form].observaciones.length > $scope.count)
        { $scope.count = $scope[form].observaciones.length }
        if (e.keyCode == 8) {
          if ($scope.count == 0) {
            $scope.count = 0;
          }
          else {
            $scope.count = $scope.count - 1;
          }
        } else {
          $scope.count = $scope.count + 1;
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
