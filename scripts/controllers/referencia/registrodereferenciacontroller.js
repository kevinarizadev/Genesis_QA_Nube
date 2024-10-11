"use strict";
angular
  .module("GenesisApp")
  .controller("registrodereferenciacontroller", [
    "$scope",
    "$http",
    "$filter",
    function ($scope, $http, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem("cedula");
        setTimeout(() => {
          $scope.Tabs = 5;
        }, 500);
        $scope.SysDay = new Date();
        $scope.Tabsmotivos = 1;
        $scope.tipoProceso = "";
        $scope.respuestmodalValidacion = "";
        $scope.datoseleccionado = "";
        $scope.ciudaddeReferencia = "";
        $(".modal").modal();
        $scope.userAbrir = false;
        $scope.motivosAbrir = false;
        $scope.abrirGrupo = false;
        $scope.tablaConsulta = false;
        $scope.show_gestionRiesgo = false;
        $scope.show_tutela = false;
        $scope.ObtenerRoluser();
        $scope.limpiar("1");
        $scope.limpiar("2");
        $scope.limpiar("3");
        $scope.limpiar("4");
        $scope.limpiar("6");
        $scope.limpiar("7");
        $scope.limpiar("8");
        $scope.limpiar("direcionamientoAtomatico");
        $scope.limpiar("direcionamientoManual");
        $scope.listrefrencias = [];
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10,
        };
        $scope.list_DatosTemp = [];
        //TABLA
        // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
        var hoy = new Date();
        // Obtener el día actual
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; // Enero es 0
        var yyyy = hoy.getFullYear();

        // Obtener la hora actual
        // var horas = hoy.getHours();
        // var minutos = hoy.getMinutes();
        // var segundos = hoy.getSeconds();
        // Formatear la hora actual
        // var horaActual =
        //   ("0" + horas).slice(-2) +
        //   ":" +
        //   ("0" + minutos).slice(-2) +
        //   ":" +
        //   ("0" + segundos).slice(-2);
        // Si el día es menor que 10, agregue un cero delante (para el formato de dos dígitos)
        if (dd < 10) {
          dd = "0" + dd;
        }
        // Si el mes es menor que 10, agregue un cero delante (para el formato de dos dígitos)
        if (mm < 10) {
          mm = "0" + mm;
        }
        // Obtener la fecha actual en formato "YYYY-MM-DD"
        var fechaActual = yyyy + "-" + mm + "-" + dd;
        // Obtener la fecha anterior restando 1 día
        var ayer = new Date(hoy);
        ayer.setDate(hoy.getDate() - 1);
        var ddAyer = ayer.getDate();
        var mmAyer = ayer.getMonth() + 1; // Enero es 0
        var yyyyAyer = ayer.getFullYear();
        // Si el día es menor que 10, agregue un cero delante (para el formato de dos dígitos)
        if (ddAyer < 10) {
          ddAyer = "0" + ddAyer;
        }
        // Si el mes es menor que 10, agregue un cero delante (para el formato de dos dígitos)
        if (mmAyer < 10) {
          mmAyer = "0" + mmAyer;
        }
        // Obtener la fecha anterior en formato "YYYY-MM-DD"
        var fechaAyer = yyyyAyer + "-" + mmAyer + "-" + ddAyer;
        $scope.maxDate = fechaActual;
        $scope.minDate = fechaAyer;
        // $scope.horaActual = horaActual;
        $scope.filtrocheck_option = {};
        // Collapsible materializecss
        document.addEventListener("DOMContentLoaded", function () {
          var elems = document.querySelectorAll(".collapsible");
          var instances = M.Collapsible.init(elems, options);
        });
        $(document).ready(function () {
          $(".collapsible").collapsible();
        });
        // Collapsible materializecss
        // var fecha = new Date();
        // fecha.setDate(fecha.getDate() - 1);
        // $('#id_horaIngreso').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', lang : 'fr', weekStart : 1, nowText:'Now', minDate : fecha, maxDate : new Date()});
      };
      $scope.cargaAnnos = function () {
        $http({
           method: 'POST',
           url: "php/referencia/registroReferencia/registrodereferencia.php",
           data: { function: 'cargaannos' }
        }).then(function (res) {
           $scope.reporteAnnos = res.data;
          // $scope.anno = res.data.ANNO;
          //console.log( $scope.anno);
           //$scope.cargaCiclos();
        })
     }
      // $scope.cargaAnnos = function () {
      //   $http({
      //     method: "POST",
      //     url: "php/financiera/funcfinanciera.php",
      //     data: { function: "cargaannos" },
      //   }).then(function (res) {
      //     $scope.Annos = res.data;
      //     $scope.anno = $scope.Annos[0].ANNO;
      //     $scope.cargaPeriodos();
      //   });
      // };
      // $scope.cargaPeriodos = function () {
      //   if ($scope.anno != "X" || $scope.anno === undefined) {
      //     $http({
      //       method: "POST",
      //       url: "php/financiera/funcfinanciera.php",
      //       data: { function: "cargaperiodos", anno: $scope.anno },
      //     }).then(function (res) {
      //       $scope.Periodos = res.data;
      //       $scope.periodo = $scope.Periodos[0].IDE;
      //     });
      //   }
      // };
      $scope.obtenerHoraActual = function () {
        var hoy = new Date();
        var horas = hoy.getHours();
        var minutos = hoy.getMinutes();

        // Ajustar el formato a dos dígitos si es necesario
        horas = (horas < 10 ? "0" : "") + horas;
        minutos = (minutos < 10 ? "0" : "") + minutos;

        // Formatear la hora actual
        var horaActual = horas + ":" + minutos;

        // Asignar la hora actual al campo de entrada
        document.getElementById("id_horaIngreso").value = horaActual;
        document.getElementById("id_form3_horaAceptacion").value = horaActual;
        document.getElementById("id_modal3_horaAceptacion").value = horaActual;
        document.getElementById("id_modal4_horaAceptacion").value = horaActual;
        document.getElementById("id_direccionamiento_horaAceptacion").value = horaActual;
        document.getElementById("id_direccionamientoManual_horaAceptacion").value = horaActual;
        
        
        
      };
      // Llamar a la función para mostrar la hora actual cuando se cargue la página
      window.onload = function () {
        $scope.obtenerHoraActual();
      };
      $scope.avisoSeleccionado = function (info) {
        if (info == "V") {
          $scope.tituloprioridadReferencia =
            ">> EL USUARIO DEBE SER UBICADO EN UN TIEMPO MENOR DE 2 HORAS <<";
        }
        if (info == "P") {
          $scope.tituloprioridadReferencia =
            ">> EL USUARIO DEBE SER UBICADO EN UN TIEMPO MENOR DE 12 HORAS <<";
        }
        if (info == "A") {
          $scope.tituloprioridadReferencia =
            ">> EL USUARIO DEBE SER UBICADO EN UN TIEMPO MENOR DE 5 DIAS <<";
        }
      };
      $scope.obtenerreporte = function () {
        $http({
          method: "POST",
          url: "php/informes/obtenerreportes.php",
          data: {
            function: "obtenerreportes",
            v_prol: sessionStorage.getItem("rolcod"),
          },
        }).then(function (response) {
          $scope.Reportes = response.data;
          //console.log(response.data);
        });
      };
   // se activan los criterios de conusltas
   $scope.buscaReporte = function () {
    $scope.mostrar_radicado_contratos = false;
    $scope.datos_contrato = {};
    if ($scope.reporte.numeroReporte == "0") {
      $scope.shw_parametros = false;
      $scope.consmayudaaut = false;
      $scope.consproductos = false;
      $scope.consmovempresa = false;
      $scope.consmesaayudacas = false;
    } else {
      $scope.hideall();
      $scope.shw_parametros = true;
      switch ($scope.reporte.numeroReporte) {
        case "88":
          $scope.Nombrereporte = "Reporte CRUE";
          $scope.shw_fecha_inicio = true;
          $scope.shw_fecha_final = true;
          $scope.shw_numeroReferencia = false;
          break;
        case "90":
          $scope.Nombrereporte = "Traza Referencia";
          $scope.shw_fecha_inicio = false;
          $scope.shw_fecha_final = false;
          $scope.shw_numeroReferencia = true;
          break;
      }
    }
  };
  // se relacionan todos los criterior de consulta
  $scope.hideall = function () {
    $scope.shw_annos = false;
    $scope.shw_periodo = false;
    $scope.shw_numeroReferencia = false;
  };
  $scope.generaReporte = function () {
    switch ($scope.reporte.numeroReporte) {
      case "88":
        if ( $scope.reporte.fecha_inicio == "" || ($scope.reporte.fecha_inicio == undefined &&   $scope.reporte.fecha_final == "") || $scope.reporte.fecha_final == undefined) {
          swal(
            "Información",
            "Por favor digite información para poder generar el reporte",
            "info"
          );
          return;
        } else {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });  
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'P_REPORTE_CRUE',
              vpanno:$filter("date")(new Date($scope.reporte.fecha_inicio),"dd/MM/yyyy"),
              vpmes:$filter("date")(new Date($scope.reporte.fecha_final),"dd/MM/yyyy"),
             }
          }).then(function ({data}) {
            console.log(data);
              swal.close();
              if (data.length) {
                 // Crear un libro de Excel
                     var workbook = XLSX.utils.book_new();
                     // Convertir los datos JSON a hojas de Excel
                     var ipsSheet = XLSX.utils.json_to_sheet(data);
                     // var epsSheet = XLSX.utils.json_to_sheet($scope.autorizaciones.json_eps);
                     // Agregar las hojas al libro
                     XLSX.utils.book_append_sheet(workbook, ipsSheet, "Reporte Crue");
                     // XLSX.utils.book_append_sheet(workbook, epsSheet, "EPS");
                     // Generar un archivo Excel
                     XLSX.writeFile(workbook, "Reporte Crue.xlsx");            
                     $scope.shw_numeroReferencia = false;
                     swal({
                       title: "Mensaje",
                       text: "Reporte Generado",
                       type: "success",
                     });
                     $scope.limpiar("4"); 
                   }else{
                    swal({
                      title: "Informacion",
                      text: "No hay datos para generar el reporte",
                      type: "info",
                    });
                   }
          })  
        }
        break;
      case "90":
        if ($scope.reporte.numeroReferencia == "") {
          swal(
            "Información",
            "Por favor digite información para poder generar el reporte",
            "info"
          );
          return;
        } else {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });  
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'P_REPORTE_REFERENCIA',
              vpnumero:$scope.reporte.numeroReferencia,
             }
          }).then(function ({data}) {
            console.log(data);
              swal.close();
              if (data.length) {
                 // Crear un libro de Excel
                     var workbook = XLSX.utils.book_new();
                     // Convertir los datos JSON a hojas de Excel
                     var ipsSheet = XLSX.utils.json_to_sheet(data);
                     // var epsSheet = XLSX.utils.json_to_sheet($scope.autorizaciones.json_eps);
                     // Agregar las hojas al libro
                     XLSX.utils.book_append_sheet(workbook, ipsSheet, "Traza Referencia");
                     // XLSX.utils.book_append_sheet(workbook, epsSheet, "EPS");
                     // Generar un archivo Excel
                     XLSX.writeFile(workbook, "Traza Referencia.xlsx");            
                     $scope.shw_numeroReferencia = true;
                     swal({
                       title: "Mensaje",
                       text: "Reporte Generado",
                       type: "success",
                     });
                     $scope.limpiar("4"); 
                   }else{
                    swal({
                      title: "Informacion",
                      text: "No hay datos para generar el reporte",
                      type: "info",
                    });
                   }
          })  
        }
        break;
    }
  };
      $scope.limpiar = function (Tabs) {
        // console.log(Tabs);
        switch (Tabs) {
          case "1":
            $scope.form1 = {
              numeroDocumento: "",
              nombreFuncionario: "",
              nombrefunCreado: "",
              editarnumeroDocumento: "",
              editartipoUser: "",
              tipoUser: "",
            };
            $scope.modal2 = {
              nombreMotivo: "",
              pconcepto: "",
              pmotivo: "",
              estadoVisible: "",
              conceptoMotivo: "",
              motivoCentral: "",
              pestado: "",
            };
            $scope.form7 = {
              codigo: "",
              numeroDocumento: "",
              grupo: "",
            };
            break;
          case "2":
            $scope.form2 = {
              fechaIngreso: "",
              horaIngreso: "",
              selecctipoDocumento: "",
              tipoSolicitud: "",
              prioridadReferencia: "",
              seleccnumeroDocumento: "",
              tipoDocumento: "",
              numeroDocumento: "",
              nombrePaciente: "",
              generoPaciente: "",
              edad: "",
              edadPaciente: "",
              nivelSisben: "",
              regimenPaciente: "",
              seccionalPaciente: "",
              sexo: "",
              codigoseccional: "",
              diagnosticoPrincipal: "",
              diagnosticoSegundario: "",
              codigodiagnosticoPrincipal: "",
              codigodiagnosticoSegundario: "",
              nombreIps: "",
              nitIps: "",
              motivoRemision: "",
              SeccionalIps: "",
              UbicacionIps: "",
              nombreSolicitante: "",
              telefonoSolicitante: "",
              servicio1: "",
              servicio2: "",
              servicio3: "",
              cargoSolicitante: "",
              canalOrigen: "",
              codigoEspecialidad1: "",
              codigoEspecialidad2: "",
              codigoEspecialidad3: "",
              correo: "",
              vsedesolicitante: "",
              pacientePgp: "",
            };
            break;
          case "3":
            $scope.form3 = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              motivoCancelacion: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.direccionamiento = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              motivoCancelacion: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.direccionamientoManual = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              motivoCancelacion: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.direccionamientocontrol = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              motivoCancelacion: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.modal1 = {
              numeroReferencia: "",
              numeroDocumento: "",
              nombreFuncionario: "",
              observaciones: "",
              fechaIngreso: "",
              horaIngreso: "",
            };
            $scope.modal3 = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.listipsdireccionamientoHospitalario = [];
            $scope.listIps = [];
            $scope.modal4 = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };
            $scope.modal5 = {
              nombreipsRecep: "",
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              tipoTraslado: "",
              telefono: "",
              numeroDocumento: "",
              porconsultar: "",
              extencion: "",
              observaciones: "",
            };

            $scope.control = {
              numeroReferencia: "",
              nombrePaciente: "",
              edad: "",
              pacientePgp: "",
              diagnosticoPrincipal: "",
              diagnosticoSegundario: "",
              servicio1: "",
              servicio2: "",
              servicio3: "",
              observaciones: "",
            };
            break;
          case "4":
            $scope.form5 = {
              fechainicioReporte: "",
              fechafinalReporte: "",
              horainicioReporte: "",
              horafinalReporte: "",
              tipodeReporte: "",
            };
            $scope.hideall();
            $scope.shw_parametros = false;
            $scope.reporte = {
              numeroReferencia: "",
              anno: "",
              periodo: "",
              fecha_inicio: "",
              fecha_final: "",
            };
            break;
          case "6":
            $scope.form4 = {
              selecctipoDocumento: "",
              tipoSolicitud: "",
              seleccnumeroDocumento: "",
              tipoDocumento: "",
              numeroDocumento: "",
              nombrePaciente: "",
              generoPaciente: "",
              edad: "",
              edadPaciente: "",
              nivelSisben: "",
              regimenPaciente: "",
              seccionalPaciente: "",
              sexo: "",
              codigoseccional: "",
              diagnosticoPrincipal: "",
              diagnosticoSegundario: "",
              codigodiagnosticoPrincipal: "",
              codigodiagnosticoSegundario: "",
              nombreIps: "",
              nitIps: "",
              motivoRemision: "",
              SeccionalIps: "",
              UbicacionIps: "",
              nombreSolicitante: "",
              telefonoSolicitante: "",
              servicio1: "",
              servicio2: "",
              servicio3: "",
              cargoSolicitante: "",
              canalOrigen: "",
              codigoEspecialidad1: "",
              codigoEspecialidad2: "",
              codigoEspecialidad3: "",
              correo: "",
            };
            break;
          case "7":
            $scope.tablaConsulta = false;
            $scope.list_DatosTemp = [];
            $scope.form6 = {
              tipodeConsulta: "",
              tipodeEstado: "",
              anno: "",
            };
            break;
          case "8":
            $scope.modal6 = {
              motivoRechazo: "",
              observaciones: "",
            };
            break;
            
            case "direcionamientoAtomatico":
            $scope.direccionamiento = {
              aceptacionPaciente: "",
              fechaAceptacion: "",
              horaAceptacion: "",
              profesional: "",
              atendidoPor: "",
              cargo: "",
              motivoRechazo: "",
              telefono: "",
              extencion: "",
              observaciones: "",
            };
            break
            case "direcionamientoManual":
              $scope.direccionamiento = {
                nombreipsRecep: "",
                aceptacionPaciente: "",
                fechaAceptacion: "",
                horaAceptacion: "",
                profesional: "",
                atendidoPor: "",
                cargo: "",
                motivoRechazo: "",
                telefono: "",
                extencion: "",
                observaciones: "",
              };
              break

          default:
        }
      };
      $scope.consultarReferencias = function () {
        
        if ($scope.form6.tipodeConsulta == "") {
          swal({
            title: "Notificación",
            text: "Por favor seleccione el grupo",
            type: "warning",
          }).catch(swal.noop);
          return;
        } if ($scope.form6.anno == "") {
          swal({
            title: "Notificación",
            text: "Por favor seleccione el año",
            type: "warning",
          }).catch(swal.noop);
          return;
        }else if ($scope.form6.tipodeEstado == "") {
          swal({
            title: "Notificación",
            text: "Por favor seleccione el estado a consultar",
            type: "warning",
          }).catch(swal.noop);
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $scope.Vista1_datos = [];
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "consultadeRefrencias",
              consultaGrupo: $scope.form6.tipodeConsulta,
              vpanno: $scope.form6.anno,
              consultaEstado: $scope.form6.tipodeEstado,
            },
          }).then(function (response) {
            swal.close();
            // console.log(response);
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              $scope.Vista1_datos = response.data;
              $scope.tablaConsulta = true;
              $scope.vistadeEstado();
              // console.log(response.data);
              setTimeout(() => {
                $scope.$apply();
              }, 500);
              $scope.initPaginacion(response.data);
            }
          });
        }
      };
      $scope.vistadeEstado = function () {
        if ($scope.form6.tipodeEstado == "A") {
          $scope.nombredevariableabiertaoCerreda = "ABIERTAS";
        } else if ($scope.form6.tipodeEstado == "C") {
          $scope.nombredevariableabiertaoCerreda = "CERRADAS";
        }
      };
      $scope.Estado_Solicitud_Color = function (Estado) {
        if (!Estado) return;
        if (Estado.toString().toUpperCase() == "RED") {
          return { "background-color": "rgb(255,0,0) !important;" };
        }
        if (Estado.toString().toUpperCase() == "YELLOW") {
          return { "background-color": "rgb(255, 255, 0) !important;" };
        }
        if (Estado.toString().toUpperCase() == "GREEN") {
          return { "background-color": "rgb(0,255,0)!important" };
        }
        if (Estado.toString().toUpperCase() == "PURPLE") {
          return { "background-color": "rgb(71, 71, 165)!important" };
        }
      };
      $scope.Estado_Solicitud_Clase = function (Estado) {
        // estado con menos de 4 horas
        if (!Estado) return;
        if (Estado.toString().toUpperCase() == "RED") {
          return "Con_pulse_X";
        }
        // estado con entre 4 y 8 horas
        if (Estado.toString().toUpperCase() == "YELLOW") {
          return "Con_pulse_A";
        }
        // estado con menos de 4 horas
        if (Estado.toString().toUpperCase() == "GREEN") {
          return "Con_pulse_V";
        }
        // estado cerrado
        if (Estado.toString().toUpperCase() == "PURPLE") {
          return "Con_pulse_P";
        }
      };
      $scope.ObtenerRoluser = function () {
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerRol",
          },
        }).then(function (response) {
          // console.log(response);
          if (response.data.Codigo == 1) {
            swal({
              title: "Notificación",
              text: "No tienes permisos para ingresar al modulo",
              type: "warning",
            }).catch(swal.noop);
            $scope.inaguracion = false;
            return;
          }
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.rolObtenido = response.data[0].Nombre;
            // console.log($scope.rolObtenido);
            if (
              $scope.rolObtenido == "SUPERVISOR" &&
              $scope.responsable == "1140871550000000000000000000000"
            ) {
              setTimeout(() => {
                $scope.Tabs = 7;
                $("#tabs_7").click();
              }, 1000);
              $scope.rolseleccionadoResumen = false;
              $scope.rolseleccionadoReportes = false;
              $scope.rolseleccionadoConsulta = true;
              $scope.rolseleccionadoInicio = false;
              $scope.rolseleccionadoLreferencia = false;
              // $scope.listadouserReferencia();
            } else if ($scope.rolObtenido == "SUPERVISOR") {
              setTimeout(() => {
                $scope.Tabs = 1;
                $("#tabs_1").click();
              }, 1000);
              $scope.rolseleccionadoResumen = true;
              $scope.rolseleccionadoReportes = true;
              $scope.rolseleccionadoConsulta = true;
              $scope.rolseleccionadoInicio = true;
              $scope.rolseleccionadoLreferencia = true;
              // $scope.listadouserReferencia();
            } else {
              $scope.rolseleccionadoResumen = false;
              $scope.rolseleccionadoReportes = false;
              $scope.rolseleccionadoConsulta = false;
              $scope.rolseleccionadoInicio = true;
              $scope.rolseleccionadoLreferencia = true;
              $scope.listadouserReferencia();
              $scope.listarlistaResumen();
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.cambiarGrupo = function () {
        $scope.abrirGrupo = true;
        $scope.motivosAbrir = false;
        $scope.userAbrir = false;
      };
      $scope.crearUser = function () {
        $scope.listadouserReferencia();
        $scope.userAbrir = true;
        $scope.motivosAbrir = false;
        $scope.abrirGrupo = false;
      };
      $scope.crearMotivos = function (accion) {
        $scope.listarmotivodeRemision(accion);
        $scope.motivosAbrir = true;
        $scope.userAbrir = false;
        $scope.abrirGrupo = false;
      };
      $scope.cierreuserMotivo = function () {
        $scope.userAbrir = false;
        $scope.motivosAbrir = false;
        $scope.abrirGrupo = false;
      };
      $scope.guardarmotivosReferencia = function (accion) {
        if ($scope.modal2.nombreMotivo == "") {
          swal({
            title: "Notificación",
            text: "No se permiten campos vacios en el formulario",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "inserMotivos",
              pdocumento: "RF",
              pconcepto: $scope.conceptoMotivo,
              pmotivo: $scope.motivoCentral,
              pnombre: $scope.modal2.nombreMotivo,
              pestado: $scope.modal2.estadoVisible,
              paccion: accion,
            },
          }).then(function (response) {
            // console.log(response);
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal("Notificación", response.data.Nombre, "success");
                $("#modalnuevoMotivo").modal("close");
                $scope.listarmotivodeRemision();
                $scope.limpiar("1");
                $scope.Tab_motivos($scope.motivoCentral, $scope.conceptoMotivo);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                $scope.listarmotivodeRemision();
                $("#modalnuevoMotivo").modal("close");
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.editarmotivosReferencia = function (motivo, tabsmotivos) {
        // console.log(motivo, tabsmotivos);
        if (motivo.COD_ESTADO == "A") {
          var estado = "I";
        } else {
          estado = "A";
        }
        $scope.coceptoMotivo = motivo.CONCEPTO;
        $scope.controlTabsmotivos = tabsmotivos;
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "inserMotivos",
            pdocumento: "RF",
            pconcepto: motivo.CONCEPTO,
            pmotivo: motivo.MOTIVO,
            pnombre: motivo.NOMBRE,
            pestado: estado,
            paccion: "U",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $("#modalnuevoMotivo").modal("close");
            if (response.data.Codigo == 0) {
              swal("Notificación", response.data.Nombre, "success");
              $scope.Tab_motivos(
                $scope.controlTabsmotivos,
                $scope.coceptoMotivo
              );
            } else {
              swal("Notificación", response.data.Nombre, "warning");
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.guardaruserReferencia = function (accion) {
        // console.log(accion);
        if (accion == "I") {
          var accion = "I";
        } else {
          accion = "U";
        }
        if ($scope.form1.numeroDocumento == "" || $scope.form1.tipoUser == "") {
          swal({
            title: "Notificación",
            text: "No se permiten campos vacios en el formulario",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertuserReferencia",
              pdocumento: $scope.form1.numeroDocumento,
              ptipo: $scope.form1.tipoUser,
              pestado: $scope.form1.estadoVisible,
              paccion: accion,
            },
          }).then(function (response) {
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal("Notificación", response.data.Nombre, "success");
                $scope.limpiar("1");
                $scope.listadouserReferencia();
                $("#modaleditarUser").modal("close");
                // $scope.ObtenerRoluse();
                // $scope.Set_Tab(1, grupos);
              }
              if (response.data.Codigo == 1) {
                swal("Notificación", response.data.Nombre, "warning");
                $scope.limpiar("1");
                $scope.listadouserReferencia();
                $("#modalnuevoUser").modal("close");
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.editaruserReferencia = function (opcion) {
        // console.log(opcion);
        $("#modaleditarUser").modal("open");
        $scope.form1.numeroDocumento = opcion.DOCUMENTO;
        $scope.form1.nombreFuncionario = opcion.NOMBRE;
        $scope.form1.tipoUser = opcion.TIPO;
        $scope.form1.estadoVisible = opcion.COD_ESTADO;
      };
      $scope.Obtener_Tipos_Documentos = function () {
        $scope.Tipos_Documentos = [];
        $http({
          method: "POST",
          url: "php/genesis/funcgenesis.php",
          data: {
            function: "Obtener_Tipos_Documentos",
            Tipo: "S",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.buscarAfiliado = function () {
        if (
          $scope.form2.tipoSolicitud == "" ||
          $scope.form2.selecctipoDocumento == "" ||
          $scope.form2.seleccnumeroDocumento == ""
        ) {
          swal({
            title: "¡Alerta!",
            text: "No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerAfiliados",
              tipodocumento: $scope.form2.selecctipoDocumento,
              documento: $scope.form2.seleccnumeroDocumento,
              tiposolicitud: $scope.form2.tipoSolicitud,
            },
          }).then(function (response) {
            if (response.data.CODIGO == "0") {
              swal({
                title: "¡Alerta¡",
                text: response.data.NOMBRE,
                type: "warning",
              }).catch(swal.noop);
              $scope.limpiar("1");
            } else {
              swal({
                title: "Afiliado",
                text: "Cargado Correctamente",
                type: "success",
              }).catch(swal.noop);
              if (response.data.TUTELA == "true") {
                $scope.show_tutela = true;
                // console.log("ingreso para mostrar tutela");
              }
              if (response.data.GESTION_RIESGO == "true") {
                $scope.show_gestionRiesgo = true;
                // console.log("ingreso para mostrar gestion del riesgo");
              }
              // // Utilice la función JavaScript JSON.parse()para convertir texto en un objeto JavaScript:
              $scope.informacionAfilizado = JSON.parse(
                response.data.PATOLOGIAS
              );
              const descripcionMap = {};
              // Nuevo array para almacenar elementos únicos
              $scope.nuevoArray = [];
              // Iterar sobre el array original
              $scope.informacionAfilizado.forEach((dato) => {
                const descripcion = dato.DESCRIPCION_COHORTE;
                if (descripcion == undefined) {
                  return;
                }
                // Si la descripción aún no está en el mapa, agregarla y agregar el objeto al nuevo array
                if (!descripcionMap[descripcion]) {
                  descripcionMap[descripcion] = true;
                  $scope.nuevoArray.push(dato);
                }
              });
              ($scope.form2.tipoDocumento = response.data.TipoDocumento),
                ($scope.form2.numeroDocumento = response.data.Documento),
                ($scope.form2.nombrePaciente = response.data.NombreCompleto),
                ($scope.form2.generoPaciente = response.data.Sexo),
                ($scope.form2.edadPaciente = response.data.EdadAnhos),
                ($scope.form2.nivelSisben = response.data.NIVEL),
                ($scope.form2.regimenPaciente = response.data.Regimen),
                ($scope.form2.codigoRegimen = response.data.CodigoRegimen),
                ($scope.form2.sexo = response.data.SexoCodigo),
                ($scope.form2.edad = response.data.EdadDias),
                ($scope.form2.seccionalPaciente = response.data.Departamento),
                ($scope.form2.codigoseccional = response.data.cod_municipio);
              setTimeout(() => {
                $scope.$apply();
                swal.close();
              }, 1000);
            }
          });
        }
      };
      $scope.buscarFuncionario = function () {
        if (
          $scope.form1.numeroDocumento == "" ||
          $scope.form1.numeroDocumento == ""
        ) {
          swal({
            title: "¡Alerta!",
            text: "No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerFuncionario",
              ndocumento: $scope.form1.numeroDocumento,
            },
          }).then(function (response) {
            // console.log(response);
            if (response.data.Codigo == "1") {
              swal({
                title: "Funcionario",
                text: response.data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            } else {
              swal({
                title: "Funcionario",
                text: "Cargado correctamente",
                type: "success",
              }).catch(swal.noop);
              ($scope.form1.nombrefunCreado = response.data[0].NOMBRE),
                setTimeout(() => {
                  $scope.$apply();
                  swal.close();
                }, 1000);
            }
          });
        }
      };
      $scope.buscarIps = function () {
        // console.log(ips);
        if ($scope.buscard1.length <= 4) {
          swal({
            title: "¡Alerta!",
            text: "Para realizar una buena busqueda se requiere minimo 5 caracteres",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if ($scope.buscard1 == "") {
          swal({
            title: "¡Alerta!",
            text: "Por favor digite el nombre o nit de la Ips",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: { function: "obtenerNombreIps", ips: $scope.buscard1 },
          }).then(function (response) {
            // console.log(response);
            if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
              $scope.inactivebarraips = true;
            } else {
              $scope.listIps = response.data;
              $scope.inactivebarraips = false;
            }
          });
        }
      };
      $scope.seleccionarips = function (data) {
        // console.log(data);
        if ($scope.tipoaut == "1") {
          $scope.form2.nombreIps = data.NOMBRE;
          $scope.form2.nitIps = data.CODIGO;
          $scope.form2.SeccionalIps = data.SECCIONAL;
          $scope.form2.UbicacionIps = data.MUNICIPIO;
          $scope.form2.vsedesolicitante = data.COD_MUN;
          $("#modalips").modal("close");
          $scope.buscard1 = "";
          setTimeout(() => {
            $scope.$apply();
            $scope.validarVacio("id_form2_nombreIp", "id_nombreIps_label");
          }, 1000);
        }
      };
      $scope.listarmotivodeRemision = function (motivo) {
        $scope.list_DatosTemp = [];
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        // console.log(motivo);
        if (motivo == "RM") {
          $scope.Vista1.Filtrar_Rem = "";
        }
        if (motivo == "CA") {
          $scope.Vista1.Filtrar_mcancelacion = "";
        }
        if (motivo == "RE") {
          $scope.Vista1.Filtrar_mrechazo = "";
        }
        if (motivo == "NA") {
          $scope.Vista1.Filtrar_mambulancia = "";
        }
        // if (motivo == "CI") {
        //   $scope.Vista1.Filtrar_mcierre = "";
        // }
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenermotivosReferencia",
            motivoReferencia: motivo || "RM",
          },
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            swal.close();
            $scope.list_DatosTemp = response.data;
            $scope.conceptoMotivo = response.data[0].CONCEPTO;
            $scope.motivoCentral = response.data[0].MOTIVO;
            $scope.nombreMotivo = response.data[0].NOMBRE;
            $scope.codigoEstado = response.data[0].COD_ESTADO;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listarmotivoderemisionActivos = function () {
        $scope.listmotivosderemisionActivas = [];
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerlistamotivosreferenciaActivas",
            motivoReferencia: "RM",
          },
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            swal.close();
            $scope.listmotivosderemisionActivas = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listarmotivodecancelacionActivos = function () {
        $scope.listmotivosdecancelacionActivos = [];
        // console.log(motivo);
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerlistamotivosreferenciaActivas",
            motivoReferencia: "CA",
          },
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listmotivosdecancelacionActivos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listarmotivoderechazoActivos = function (motivo) {
        $scope.listmotivosderechazoActivos = [];
        //console.log(motivo);
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerlistamotivosreferenciaActivas",
            motivoReferencia: "RE",
          },
        }).then(function (response) {
          //console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listmotivosderechazoActivos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listarmotidecancelacionambulanciaActivos = function () {
        // console.log(motivo);
        $scope.listmotivocancelacionambulanciaActivas = [];
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerlistamotivosreferenciaActivas",
            motivoReferencia: "NA",
          },
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listmotivocancelacionambulanciaActivas = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listarmotivodeTraslado = function () {
        $scope.listmotivoTraslado = [];
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenermotivoTraslado",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listmotivoTraslado = response.data;
          }
        });
      };
      $scope.seleccionarMotivo = function (data) {
        if ($scope.tipoaut == "1") {
          $scope.form2.nombreIps = data.NOMBRE;
          $scope.form2.nitIps = data.CODIGO;
          $scope.form2.SeccionalIps = data.SECCIONAL;
          $scope.form2.UbicacionIps = data.MUNICIPIO;
          $("#modalips").modal("close");
        }
      };
      $scope.buscarDiagnostico = function (diag, numero) {
        // console.log(diag, numero);
        setTimeout(() => {
          $scope.apply();
        }, 200);
        if (diag == "" || diag == undefined) {
          swal(
            "Importante",
            "El campo  de texto no puede estar vacio!",
            "info"
          );
          return;
        }
        if (numero == 1) {
          if (
            $scope.form2.edad == "" ||
            $scope.form2.edad == undefined ||
            $scope.form2.sexo == "" ||
            $scope.form2.sexo == undefined
          ) {
            swal(
              "Importante",
              "Debe diligenciar la informacion del paciente!",
              "info"
            );
            return;
          } else {
            var sexo = $scope.form2.sexo;
            var edad = $scope.form2.edad;
          }
        }
        if (numero == 2) {
          if (
            $scope.form4.edad == "" ||
            $scope.form4.edad == undefined ||
            $scope.form4.sexo == "" ||
            $scope.form4.sexo == undefined
          ) {
            swal(
              "Importante",
              "Debe diligenciar la informacion del paciente!",
              "info"
            );
            return;
          } else {
            var sexo = $scope.form4.sexo;
            var edad = $scope.form4.edad;
          }
        }
        setTimeout(() => {
          $scope.apply();
        }, 500);
        $http({
          method: "POST",
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: "obtenerDiagnostico",
            codigo: diag,
            sexo: sexo,
            edad: edad,
          },
        }).then(function (response) {
          $scope.listDiagnosticos = [];
          if (response.data["0"].Codigo == "-1") {
            swal("Importante", response.data["0"].Nombre, "info");
            $scope.inactivebarradiag = true;
          } else if (response.data["0"].Codigo == "0") {
            swal(
              "Importante",
              "Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico",
              "info"
            );
            $scope.inactivebarradiag = true;
          } else {
            $scope.listDiagnosticos = response.data;
            $scope.inactivebarradiag = false;
          }
        });
      };
      $scope.seleccionardiagnostico = function (data, tipo, numero) {
        // console.log(data, tipo, numero);
        if (numero == 1) {
          var text = "";
          if ($scope.tipoaut == "1") {
            if (tipo == "P") {
              $scope.form2.diagnosticoPrincipal = data.Nombre;
              $scope.form2.codigodiagnosticoPrincipal = data.Codigo;
              text = "Principal";
              setTimeout(() => {
                $scope.$apply();
                $scope.validarVacio(
                  "id_form2_diagnosticoPrincipal",
                  "id_diagnosticoPrincipal_label"
                );
              }, 1000);
            } else {
              $scope.form2.diagnosticoSegundario = data.Nombre;
              $scope.form2.codigodiagnosticoSegundario = data.Codigo;
              text = "Secundario";
              $("#modaldiagnostico").modal("close");
              setTimeout(() => {
                $scope.$apply();
                $scope.validarVacio(
                  "id_form2_diagnosticoPrincipal",
                  "id_diagnosticoPrincipal_label"
                );
              }, 1000);
            }
          }
          swal({
            title: "Completado",
            text: "Diagnostico " + text + " Registrado",
            showConfirmButton: false,
            type: "success",
            timer: 800,
          });
        }
        if (numero == 2) {
          var text = "";
          if ($scope.tipoaut == "1") {
            if (tipo == "P") {
              $scope.form4.diagnosticoPrincipal = data.Nombre;
              $scope.form4.codigodiagnosticoPrincipal = data.Codigo;
              text = "Principal";
            } else {
              $scope.form4.diagnosticoSegundario = data.Nombre;
              $scope.form4.codigodiagnosticoSegundario = data.Codigo;
              text = "Secundario";
              $("#modaldiagnosticocontrarreferencia").modal("close");
            }
          }
          swal({
            title: "Completado",
            text: "Diagnostico " + text + " Registrado",
            showConfirmButton: false,
            type: "success",
            timer: 800,
          });
        }
      };
      $scope.guardarReferencias = function () {
        let inserfecha = $scope.formatDatefecha($scope.form2.fechaIngreso);
        let inserHora = document.getElementById("id_horaIngreso").value;
        $scope.inserfechaIngreso = inserfecha + " " + inserHora;
        if (
          $scope.inserfechaIngreso == "" ||
          $scope.inserfechaIngreso == null ||
          $scope.inserfechaIngreso == undefined ||
          $scope.inserfechaIngreso == "aN/aN/NaN " ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.form2.prioridadReferencia == "" ||
          $scope.form2.prioridadReferencia == null ||
          $scope.form2.prioridadReferencia == undefined ||
          $scope.form2.seleccnumeroDocumento == "" ||
          $scope.form2.seleccnumeroDocumento == null ||
          $scope.form2.seleccnumeroDocumento == undefined ||
          $scope.form2.pacientePgp == "" ||
          $scope.form2.pacientePgp == null ||
          $scope.form2.pacientePgp == undefined ||
          $scope.form2.nombreIps == "" ||
          $scope.form2.nombreIps == null ||
          $scope.form2.nombreIps == undefined ||
          $scope.form2.motivoRemision == "" ||
          $scope.form2.motivoRemision == null ||
          $scope.form2.motivoRemision == undefined ||
          $scope.form2.pacientePgp == "" ||
          $scope.form2.pacientePgp == null ||
          $scope.form2.pacientePgp == undefined ||
          $scope.form2.motivoRemision == "" ||
          $scope.form2.motivoRemision == null ||
          $scope.form2.motivoRemision == undefined ||
          $scope.form2.diagnosticoPrincipal == "" ||
          $scope.form2.diagnosticoPrincipal == null ||
          $scope.form2.diagnosticoPrincipal == undefined ||
          $scope.form2.servicio1 == "" ||
          $scope.form2.servicio1 == null ||
          $scope.form2.servicio1 == undefined ||
          $scope.form2.nombreSolicitante == "" ||
          $scope.form2.nombreSolicitante == null ||
          $scope.form2.nombreSolicitante == undefined ||
          $scope.form2.telefonoSolicitante == "" ||
          $scope.form2.telefonoSolicitante == null ||
          $scope.form2.telefonoSolicitante == undefined ||
          $scope.form2.cargoSolicitante == "" ||
          $scope.form2.cargoSolicitante == null ||
          $scope.form2.cargoSolicitante == undefined ||
          $scope.form2.canalOrigen == "" ||
          $scope.form2.canalOrigen == null ||
          $scope.form2.canalOrigen == undefined ||
          $scope.form2.correo == "" ||
          $scope.form2.correo == null ||
          $scope.form2.correo == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_fechaIngreso_label",
              id_input: "id_fechaIngreso",
            },
            {
              Codigo: "2",
              id_label: "id_horaIngreso_label",
              id_input: "id_horaIngreso",
            },
            {
              Codigo: "3",
              id_label: "id_tipoSolicitud_label",
              id_input: "id_tipoSolicitud",
            },
            {
              Codigo: "4",
              id_label: "id_prioridadReferencia_label",
              id_input: "id_prioridadReferencia",
            },
            {
              Codigo: "5",
              id_label: "id_selecctipoDocumento_label",
              id_input: "id_selecctipoDocumento",
            },
            {
              Codigo: "6",
              id_label: "id_seleccnumeroDocumento_label",
              id_input: "id_seleccnumeroDocumento",
            },
            {
              Codigo: "7",
              id_label: "id_nombreIps_label",
              id_input: "id_form2_nombreIp",
            },
            {
              Codigo: "8",
              id_label: "id_pacientePgp_label",
              id_input: "id_form2_pacientePgp",
            },
            {
              Codigo: "9",
              id_label: "id_motivoRemision_label",
              id_input: "id_form2_motivoRemision",
            },
            {
              Codigo: "10",
              id_label: "id_diagnosticoPrincipal_label",
              id_input: "id_form2_diagnosticoPrincipal",
            },
            {
              Codigo: "11",
              id_label: "id_servicio1_label",
              id_input: "id_form2_servicio1",
            },
            {
              Codigo: "12",
              id_label: "id_nombreSolicitante_label",
              id_input: "id_form2_nombreSolicitante",
            },
            {
              Codigo: "13",
              id_label: "id_telefonoSolicitante_label",
              id_input: "id_form2_telefonoSolicitante",
            },
            {
              Codigo: "14",
              id_label: "id_cargoSolicitante_label",
              id_input: "id_form2_cargoSolicitante",
            },
            {
              Codigo: "15",
              id_label: "id_canalOrigen_label",
              id_input: "id_form2_canalOrigen",
            },
            {
              Codigo: "16",
              id_label: "id_correo_label",
              id_input: "id_form2_correo",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "P_INSERTA_REFERENCIA",
              pdocumento: $scope.form2.tipoSolicitud,
              porigen: $scope.form2.canalOrigen,
              ptipodocumento: $scope.form2.tipoDocumento,
              pnumerodocumento: $scope.form2.numeroDocumento,
              codmuniipio: $scope.form2.codigoseccional,
              pregimen: $scope.form2.codigoRegimen,
              pmotivo_remision: $scope.form2.motivoRemision,
              pdiagnostico: $scope.form2.codigodiagnosticoPrincipal,
              pdiagnostico1: $scope.form2.codigodiagnosticoSegundario,
              pservicio: $scope.form2.codigoEspecialidad1,
              pservicio2: $scope.form2.codigoEspecialidad2,
              pservicio3: $scope.form2.codigoEspecialidad3,
              pfecha_recepcion: $scope.formatDatefecha($scope.SysDay),
              pips_solicitante: $scope.form2.nitIps,
              pdoc_solicitante: $scope.form2.nombreSolicitante,
              ptelefono: $scope.form2.telefonoSolicitante,
              pcargo_solicitante: $scope.form2.cargoSolicitante,
              vsedesolicitante: $scope.form2.vsedesolicitante,
              vppgp: $scope.form2.pacientePgp,
              vpprioridad: $scope.form2.prioridadReferencia,
              vpfechaingreso: $scope.inserfechaIngreso,
              vpcorreo: $scope.form2.correo,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Afiliado",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("2");
                  $scope.Set_Tab("5");
                  $scope.$apply();
                }, 2500);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("2");
                  $scope.Set_Tab("5");
                  $scope.$apply();
                }, 2500);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.guardarContrarreferencias = function () {
        if (
          $scope.form4.motivoRemision == "" ||
          $scope.form4.motivoRemision == null ||
          $scope.form4.motivoRemision == undefined ||
          $scope.form4.diagnosticoPrincipal == "" ||
          $scope.form4.diagnosticoPrincipal == null ||
          $scope.form4.diagnosticoPrincipal == undefined ||
          $scope.form4.servicio1 == "" ||
          $scope.form4.servicio1 == null ||
          $scope.form4.servicio1 == undefined ||
          $scope.form4.nombreSolicitante == "" ||
          $scope.form4.nombreSolicitante == null ||
          $scope.form4.nombreSolicitante == undefined ||
          $scope.form4.telefonoSolicitante == "" ||
          $scope.form4.telefonoSolicitante == null ||
          $scope.form4.telefonoSolicitante == undefined ||
          $scope.form4.cargoSolicitante == "" ||
          $scope.form4.cargoSolicitante == null ||
          $scope.form4.cargoSolicitante == undefined ||
          $scope.form4.canalOrigen == "" ||
          $scope.form4.canalOrigen == null ||
          $scope.form4.canalOrigen == undefined ||
          $scope.form4.correo == "" ||
          $scope.form4.correo == null ||
          $scope.form4.correo == undefined
        ) {
          swal({
            title: "Notificación",
            text: "No se permiten campos vacios en el formulario",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "P_INSERTA_REFERENCIA",
              pdocumento: $scope.tipoSolicitud,
              porigen: $scope.form4.canalOrigen,
              ptipodocumento: $scope.form4.tipoDocumento,
              pnumerodocumento: $scope.form4.numeroDocumento,
              codmuniipio: $scope.form4.codigoseccional,
              pregimen: $scope.form4.codigoRegimen,
              pmotivo_remision: $scope.form4.motivoRemision,
              pdiagnostico: $scope.form4.codigodiagnosticoPrincipal,
              pdiagnostico1: $scope.form4.codigodiagnosticoSegundario,
              pservicio: $scope.form4.codigoEspecialidad1,
              pservicio2: $scope.form4.codigoEspecialidad2,
              pservicio3: $scope.form4.codigoEspecialidad3,
              pfecha_recepcion: $scope.formatDatefecha($scope.SysDay),
              pips_solicitante: $scope.form4.nitIps,
              pdoc_solicitante: $scope.form4.nombreSolicitante,
              ptelefono: $scope.form4.telefonoSolicitante,
              vnumeroreferencia: $scope.codigoContrarreferencia,
              pcargo_solicitante: $scope.form4.cargoSolicitante,
              vppgp: $scope.form2.pacientePgp,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Afiliadó",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("6");
                  $scope.Set_Tab("3");
                  $scope.$apply();
                }, 2500);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("6");
                  $scope.Set_Tab("3");
                  $scope.$apply();
                }, 2500);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.openmodalValidacion = function (tipo, data) {
        $scope.datoseleccionado = data;
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "p_obtenerdireccionamiento",
            vpnumero: data.CODIGO,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.codigodeValidacion = data.Codigo;
            if (data.Codigo == 0) {
              $scope.modoValidacion("A");
            } else if (data.Codigo == 1) {
              // $scope.modoValidacion('M');
              $scope.openmodals("procesoGestion", $scope.datoseleccionado);
            } else if (data.Codigo == 2) {
              switch (tipo) {
                case "procesodeDireccionamiento":
                  $("#modaldeValidacion").modal("open");
                  break;
                default:
              }
            } else if (data.Codigo == 3) {
              $scope.openmodals("procesoGestion", $scope.datoseleccionado);
            }
          }
        });
      };
      $scope.modoValidacion = function (info) {
        $scope.respuestmodalValidacion = info;
        if (info != "A") {
          $scope.limpiar("direcionamientoManual");
          $scope.openmodals("procesodireccionamientoHospitalario_M",$scope.datoseleccionado);
          $("#modaldeValidacion").modal("close");
          $scope.direccionamientoIps("M");
        } else {
          $scope.limpiar("direcionamientoAtomatico");
          $scope.openmodals("procesodireccionamientoHospitalario_A",$scope.datoseleccionado);
          $("#modaldeValidacion").modal("close");
          $scope.direccionamientoIps("A");
        }
      };
      $scope.direccionamientoIps = function (estado) {
        if (estado == "M" && $scope.codigodeValidacion == 2) {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: "X",
              vpnumeroips: $scope.direccionamientoManual.pnumero,
              vptipo: $scope.tipoProceso,
              vpaccion: $scope.respuestmodalValidacion,
            },
          }).then(function (response) {
            if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsdireccionamientoHospitalario = response.data;
            }
          });
          // }
        } else if (estado == "A") {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: "X",
              vpnumeroips: $scope.direccionamiento.pnumero,
              vptipo: $scope.tipoProceso,
              vpaccion: $scope.respuestmodalValidacion,
            },
          }).then(function (response) {
            $scope.direccionamiento.nombreipsRecep = response.data[0].CODIGO;
            $scope.direccionamiento.nombreipsreceptoraVista =
              response.data[0].NOMBRE;
            if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsdireccionamientoHospitalario = response.data;
            }
          });
        }
      };
      $scope.seleccionar_ips_Direccionamiento = function (data) {
        if (data.length > 0) {
          $("#modallistipsdireccionamientoHospitalario_M").modal("close");
          $scope.direccionamientoManual.nombreipsRecep = data[0].CODIGO;
          $scope.direccionamientoManual.nombreipsreceptoraVista = data[0].NOMBRE;
          $scope.listipsdireccionamientoHospitalario = [];
        } else {
          $("#modallistipsdireccionamientoHospitalario_M").modal("close");
          $scope.direccionamientoManual.nombreipsRecep = data.CODIGO;
          $scope.direccionamientoManual.nombreipsreceptoraVista = data.NOMBRE;
          $scope.listipsdireccionamientoHospitalario = [];
        }
      };
      $scope.buscar_ips_Gestion = function () {
        if (
          $scope.procesodeGestion == undefined ||
          $scope.procesodeGestion.length <= 4
        ) {
          swal({
            title: "¡Alerta!",
            text: "Para realizar una buena busqueda se requiere minimo 5 caracteres",
            type: "warning",
          }).catch(swal.noop);
          $scope.listipsGestion = [];
          return;
        }
        if ($scope.procesodeGestion == "") {
          swal({
            title: "Notificación",
            text: "Ingrese el Nombre o Nit de La Ips a Buscar",
            type: "warning",
          }).catch(swal.noop);
          $scope.listipsGestion = [];
          return;
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: $scope.procesodeGestion,
              vpnumeroips: $scope.form3.pnumero,
              vptipo: $scope.tipoProceso,
              vpaccion: "M",
            },
          }).then(function (response) {
            // console.log(response);
            if (response.Codigo == 1) {
              swal("Alerta", response.Nombre, "warning");
            } else if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsGestion = response.data;
            }
          });
        }
      };
      $scope.seleccionar_ips_Gestion = function (data) {
        if (data.length > 0) {
          $scope.form3.nombreipsRecep = data.CODIGO;
          $scope.form3.nombreipsreceptoraVista = data.NOMBRE;
          $scope.listipsGestion = [];
          $("#modallistipsGestion").modal("close");
          $("#modalRedirecionamiento").modal("close");
        } else {
          $scope.form3.nombreipsRecep = data.CODIGO;
          $scope.form3.nombreipsreceptoraVista = data.NOMBRE;
          $scope.listipsGestion = [];
          $("#modallistipsGestion").modal("close");
          $("#modalRedirecionamiento").modal("close");
        }
      };
      $scope.buscar_ips_Traslado = function () {
        if (
          $scope.procesodeTraslado == undefined ||
          $scope.procesodeTraslado.length <= 4
        ) {
          swal({
            title: "¡Alerta!",
            text: "Para realizar una buena busqueda se requiere minimo 5 caracteres",
            type: "warning",
          }).catch(swal.noop);
          $scope.listipsTraslado = [];
          return;
        }
        if (
          $scope.procesodeTraslado == "" ||
          $scope.procesodeTraslado == undefined
        ) {
          swal(
            "Alerta",
            "Ingrese el Nit o Nombre de la Ips de Traslado",
            "error"
          );
          $scope.listipsTraslado = [];
          return;
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: $scope.procesodeTraslado,
              vpnumeroips: $scope.modal3.nombreipsRecep,
              vptipo: $scope.tipoProceso,
              vpaccion: $scope.respuestmodalValidacion,
            },
          }).then(function (response) {
            if (response.Codigo == 1) {
              swal("Alerta", response.Nombre, "warning");
            } else if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsTraslado = response.data;
            }
          });
        }
      };
      $scope.seleccionar_ips_Traslado = function (data) {
        if (data.length > 0) {
          $scope.procesodeTraslado = "";
          $scope.modal3.nombreipsRecep = data.CODIGO;
          $scope.listipsTraslado = [];
          $("#modallistipsTraslado").modal("close");
        } else {
          $scope.procesodeTraslado = "";
          $scope.modal3.nombreipsRecep = data.CODIGO;
          $scope.listipsTraslado = [];
          $("#modallistipsTraslado").modal("close");
        }
      };
      $scope.buscar_ips_gestion_Cierre = function () {
        if (
          $scope.procesodeCierre == undefined ||
          $scope.procesodeCierre.length <= 4
        ) {
          swal({
            title: "¡Alerta!",
            text: "Para realizar una buena busqueda se requiere minimo 5 caracteres",
            type: "warning",
          }).catch(swal.noop);
          $scope.listipsCierre = [];
          return;
        }
        if (
          $scope.procesodeCierre == "" ||
          $scope.procesodeCierre == undefined
        ) {
          swal(
            "Alerta",
            "Ingrese el Nit o Nombre de la Ips de Cierre",
            "error"
          );
          $scope.listipsCierre = [];
          return;
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: $scope.procesodeCierre,
              vpnumeroips: $scope.modal5.nombreipsRecep,
              vptipo: $scope.tipoProceso,
              vpaccion: $scope.respuestmodalValidacion,
            },
          }).then(function (response) {
            // console.log(response);
            if (response.Codigo == 1) {
              swal("Alerta", response.Nombre, "warning");
            } else if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsCierre = response.data;
            }
          });
        }
      };
      $scope.seleccionar_ips_gestion_Cierre = function (data) {
        //  console.log(data);
        if (data.length > 0) {
          $scope.modal5.nombreipsRecep = data.CODIGO;
          $scope.listipsCierre = [];
          $("#modallistipsCierre").modal("close");
          $("#modalRedirecionamiento").modal("close");
        } else {
          $scope.modal5.nombreipsRecep = data.CODIGO;
          $scope.listipsCierre = [];
          $("#modallistipsCierre").modal("close");
          $("#modalRedirecionamiento").modal("close");
        }
      };
      $scope.buscar_ips_gestion_Cancelacion = function () {
        if (
          $scope.procesodeCancelacion == undefined ||
          $scope.procesodeCancelacion.length <= 4
        ) {
          swal({
            title: "¡Alerta!",
            text: "Para realizar una buena busqueda se requiere minimo 5 caracteres",
            type: "warning",
          }).catch(swal.noop);
          $scope.listipsCancelacion = [];
          return;
        }
        if (
          $scope.procesodeCancelacion == "" ||
          $scope.procesodeCancelacion == undefined
        ) {
          swal(
            "Alerta",
            "Ingrese el Nit o Nombre de la Ips de Cancelacion",
            "error"
          );
          $scope.listipsCancelacion = [];
          return;
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "obtenerNombreipsReceptora",
              ips: $scope.procesodeCancelacion,
              vpnumeroips: $scope.modal4.pnumero,
              vptipo: 5,
              vpaccion: $scope.procesoCancelacion,
            },
          }).then(function (response) {
            if (response.Codigo == 1) {
              swal("Alerta", response.Nombre, "warning");
            } else if (response.data["0"].Codigo == "0") {
              swal("Importante", "IPS no encontrada", "info");
            } else {
              $scope.listipsCancelacion = response.data;
            }
          });
        }
      };
      $scope.seleccionar_ips_gestion_Cancelacion = function (data) {
        //  console.log(data);
        if (data.length > 0) {
          $scope.modal4.nombreipsRecep = data.CODIGO;
          $scope.listipsCancelacion = [];
          $("#modallistipsCancelacion").modal("close");
          $("#modalRedirecionamiento").modal("close");
        } else {
          $scope.modal4.nombreipsRecep = data.CODIGO;
          $scope.listipsCancelacion = [];
          $("#modallistipsCancelacion").modal("close");
          $("#modalRedirecionamiento").modal("close");
        }
      };
      $scope.buscarEspecialidades = function (servicio) {
        if (servicio == "buscard3") {
          if ($scope.buscard3 == undefined || $scope.buscard3 == "") {
            swal({
              title: "¡Alerta!",
              text: "!Por favor digite el nombre o codigo del servicio!",
              type: "warning",
            }).catch(swal.noop);
            $scope.listEspecialidades = [];
          } else {
            $http({
              method: "POST",
              url: "php/referencia/registroReferencia/registrodereferencia.php",
              data: {
                function: "obtenerEspecialidades",
                especialidades: $scope.buscard3,
              },
            }).then(function (response) {
              // console.log(response);
              if (response.data[0].Codigo == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: "No se encontro informacion asociada",
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.listEspecialidades = response.data;
              }
            });
          }
        } else if (servicio == "buscard4") {
          if ($scope.buscard4 == undefined || $scope.buscard4 == "") {
            swal({
              title: "¡Alerta!",
              text: "!Por favor digite el nombre o codigo del servicio!",
              type: "warning",
            }).catch(swal.noop);
            $scope.listEspecialidades = [];
            return;
          } else {
            $http({
              method: "POST",
              url: "php/referencia/registroReferencia/registrodereferencia.php",
              data: {
                function: "obtenerEspecialidades",
                especialidades: $scope.buscard4,
              },
            }).then(function (response) {
              // console.log(response);
              if (response.data[0].Codigo == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: "No se encontro informacion asociada",
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.listEspecialidades = response.data;
              }
            });
          }
        } else if (servicio == "buscard5") {
          if ($scope.buscard5 == undefined || $scope.buscard5 == "") {
            swal({
              title: "¡Alerta!",
              text: "!Por favor digite el nombre o codigo del servicio!",
              type: "warning",
            }).catch(swal.noop);
            $scope.listEspecialidades = [];
            return;
          } else {
            $http({
              method: "POST",
              url: "php/referencia/registroReferencia/registrodereferencia.php",
              data: {
                function: "obtenerEspecialidades",
                especialidades: $scope.buscard5,
              },
            }).then(function (response) {
              // console.log(response);
              if (response.data[0].Codigo == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: "No se encontro informacion asociada",
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.listEspecialidades = response.data;
              }
            });
          }
        }
      };
      $scope.seleccionarEspecialidad = function (data, x, numero) {
        // console.log(data, x, numero);
        // console.log(numero);
        if (numero == 1) {
          var service = x;
          // console.log(service);
          if (service == "servicio1") {
            ($scope.buscard3 = ""), ($scope.form2.servicio1 = data.Nombre);
            $scope.form2.codigoEspecialidad1 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio1").modal("close");
            setTimeout(() => {
              $scope.$apply();
              $scope.validarVacio("id_form2_servicio1", "id_servicio1_label");
            }, 1000);
          }
          if (service == "servicio2") {
            ($scope.buscard4 = ""), ($scope.form2.servicio2 = data.Nombre);
            $scope.form2.codigoEspecialidad2 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio2").modal("close");
          }
          if (service == "servicio3") {
            // console.log(data, x);
            ($scope.buscard5 = ""), ($scope.form2.servicio3 = data.Nombre);
            $scope.form2.codigoEspecialidad3 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio3").modal("close");
          }
        }
        if (numero == 2) {
          var service = x;
          // console.log(service);
          if (service == "servicio1") {
            ($scope.buscard3 = ""), ($scope.form4.servicio1 = data.Nombre);
            $scope.form4.codigoEspecialidad1 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio1contrarreferencia").modal("close");
          }
          if (service == "servicio2") {
            ($scope.buscard4 = ""), ($scope.form4.servicio2 = data.Nombre);
            $scope.form4.codigoEspecialidad2 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio2contrarreferencia").modal("close");
          }
          if (service == "servicio3") {
            // console.log(data, x);
            ($scope.buscard5 = ""), ($scope.form4.servicio3 = data.Nombre);
            $scope.form4.codigoEspecialidad3 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio3contrarreferencia").modal("close");
          }
        }
      };
      $scope.guardarprocesoGestion = function (tiposGes) {
        let inserfecha = $scope.formatDatefecha($scope.form3.fechaAceptacion);
        let inserHora = document.getElementById("id_form3_horaAceptacion").value;
        $scope.inserfechaform3Observacion = inserfecha + " " + inserHora;
        if (
          $scope.inserfechaform3Observacion == "" ||
          $scope.inserfechaform3Observacion == null ||
          $scope.inserfechaform3Observacion == undefined ||
          $scope.inserfechaform3Observacion == "aN/aN/NaN " ||
          $scope.form3.nombreipsRecep == "" ||
          $scope.form3.nombreipsRecep == null ||
          $scope.form3.nombreipsRecep == undefined ||
          $scope.form3.aceptacionPaciente == "" ||
          $scope.form3.aceptacionPaciente == null ||
          $scope.form3.aceptacionPaciente == undefined ||
          ($scope.form3.aceptacionPaciente == "N" &&
            $scope.form3.motivoRechazo == "") ||
          $scope.form3.motivoRechazo == null ||
          $scope.form3.motivoRechazo == undefined ||
          $scope.form3.fechaAceptacion == "" ||
          $scope.form3.fechaAceptacion == null ||
          $scope.form3.fechaAceptacion == undefined ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.form3.profesional == "" ||
          $scope.form3.profesional == null ||
          $scope.form3.profesional == undefined ||
          $scope.form3.atendidoPor == "" ||
          $scope.form3.atendidoPor == null ||
          $scope.form3.atendidoPor == undefined ||
          $scope.form3.cargo == "" ||
          $scope.form3.cargo == null ||
          $scope.form3.cargo == undefined ||
          $scope.form3.observaciones == "" ||
          $scope.form3.observaciones == null ||
          $scope.form3.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form3_nombreipsRecep_label",
              id_input: "id_form3_nombreipsRecep",
            },
            {
              Codigo: "2",
              id_label: "id_form3_aceptacionPaciente_label",
              id_input: "id_form3_aceptacionPaciente",
            },
            {
              Codigo: "3",
              id_label: "id_form3_motivoRechazo_label",
              id_input: "id_form3_motivoRechazo",
            },
            {
              Codigo: "4",
              id_label: "id_form3_fechaAceptacion_label",
              id_input: "id_form3_fechaAceptacion",
            },
            {
              Codigo: "5",
              id_label: "id_form3_horaAceptacion_label",
              id_input: "id_form3_horaAceptacion",
            },
            {
              Codigo: "6",
              id_label: "id_form3_profesiona_label",
              id_input: "id_form3_profesiona",
            },
            {
              Codigo: "7",
              id_label: "id_form3_atendidoPor_label",
              id_input: "id_form3_atendidoPor",
            },
            {
              Codigo: "8",
              id_label: "id_form3_cargo_label",
              id_input: "id_form3_cargo",
            },
            {
              Codigo: "9",
              id_label: "id_form3_observaciones_label",
              id_input: "id_form3_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.form3.pnumero,
              pdocumento: $scope.form3.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.form3.nombreipsRecep,
              ptipo_traslado: $scope.form3.tipoTraslado,
              paceptacion: $scope.form3.aceptacionPaciente,
              pmotivorechazo: $scope.form3.motivoRechazo,
              pmotivocancelacion: $scope.form3.motivoCancelacion,
              pfecha_gestion: $scope.inserfechaform3Observacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.form3.profesional,
              patendido_por: $scope.form3.atendidoPor,
              pcargo: $scope.form3.cargo,
              ptelefono: $scope.form3.telefono,
              pextension: $scope.form3.extencion,
              pobservacion: $scope.form3.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  // $scope.buscard2 = [];
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestion").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                // setTimeout(() => {
                //   // $scope.limpiar("3");
                //   // $scope.buscard2 = [];
                //   $("#modalprocesoGestion").modal("close");
                //   $scope.$apply();
                // }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          // $("#modalprocesoGestion").modal("close");
        }
      };
      $scope.guardarprocesodireccionamientoAutomatico = function (
        tiposGes,
        modo
      ) {
        let inserfecha = $scope.formatDatefecha(
          $scope.direccionamiento.fechaAceptacion
        );
        let inserHora = document.getElementById("id_direccionamiento_horaAceptacion").value ;
        $scope.inserfechadireccionamientoObservacion =
          inserfecha + " " + inserHora;
        if (
          $scope.inserfechadireccionamientoObservacion == "" ||
          $scope.inserfechadireccionamientoObservacion == null ||
          $scope.inserfechadireccionamientoObservacion == undefined ||
          $scope.inserfechadireccionamientoObservacion == "aN/aN/NaN " ||
          $scope.direccionamiento.nombreipsRecep == "" ||
          $scope.direccionamiento.nombreipsRecep == null ||
          $scope.direccionamiento.nombreipsRecep == undefined ||
          $scope.direccionamiento.aceptacionPaciente == "" ||
          $scope.direccionamiento.aceptacionPaciente == null ||
          $scope.direccionamiento.aceptacionPaciente == undefined ||
          ($scope.direccionamiento.aceptacionPaciente == "N" &&
            ($scope.direccionamiento.motivoRechazo == "" ||
              $scope.direccionamiento.motivoRechazo == null ||
              $scope.direccionamiento.motivoRechazo == undefined)) ||
          $scope.direccionamiento.fechaAceptacion == "" ||
          $scope.direccionamiento.fechaAceptacion == null ||
          $scope.direccionamiento.fechaAceptacion == undefined ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.direccionamiento.profesional == "" ||
          $scope.direccionamiento.profesional == null ||
          $scope.direccionamiento.profesional == undefined ||
          $scope.direccionamiento.atendidoPor == "" ||
          $scope.direccionamiento.atendidoPor == null ||
          $scope.direccionamiento.atendidoPor == undefined ||
          $scope.direccionamiento.cargo == "" ||
          $scope.direccionamiento.cargo == null ||
          $scope.direccionamiento.cargo == undefined ||
          $scope.direccionamiento.observaciones == "" ||
          $scope.direccionamiento.observaciones == null ||
          $scope.direccionamiento.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_direccionamiento_aceptacionPaciente_label",
              id_input: "id_direccionamiento_aceptacionPaciente",
            },
            {
              Codigo: "2",
              id_label: "id_direccionamiento_motivoRechazo_label",
              id_input: "id_direccionamiento_motivoRechazo",
            },
            {
              Codigo: "3",
              id_label: "id_direccionamiento_fechaAceptacion_label",
              id_input: "id_direccionamiento_fechaAceptacion",
            },
            {
              Codigo: "4",
              id_label: "id_direccionamiento_horaAceptacion_label",
              id_input: "id_direccionamiento_horaAceptacion",
            },
            {
              Codigo: "5",
              id_label: "id_direccionamiento_profesional_label",
              id_input: "id_direccionamiento_profesional",
            },
            {
              Codigo: "6",
              id_label: "id_direccionamiento_atendidoPor_label",
              id_input: "id_direccionamiento_atendidoPor",
            },
            {
              Codigo: "7",
              id_label: "id_direccionamiento_cargo_label",
              id_input: "id_direccionamiento_cargo",
            },
            {
              Codigo: "8",
              id_label: "id_direccionamiento_observaciones_label",
              id_input: "id_direccionamiento_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.direccionamiento.pnumero,
              pdocumento: $scope.direccionamiento.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.direccionamiento.nombreipsRecep,
              ptipo_traslado: $scope.direccionamiento.tipoTraslado,
              paceptacion: $scope.direccionamiento.aceptacionPaciente,
              pmotivorechazo: $scope.direccionamiento.motivoRechazo,
              pmotivocancelacion: $scope.direccionamiento.motivoCancelacion,
              pfecha_gestion: $scope.inserfechadireccionamientoObservacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.direccionamiento.profesional,
              patendido_por: $scope.direccionamiento.atendidoPor,
              pcargo: $scope.direccionamiento.cargo,
              ptelefono: $scope.direccionamiento.telefono,
              pextension: $scope.direccionamiento.extencion,
              pobservacion: $scope.direccionamiento.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  if (modo != "A") {
                    $("#modalprocesodireccionamientoHospitalario_M").modal(
                      "close"
                    );
                  } else {
                    $("#modalprocesodireccionamientoHospitalario_A").modal(
                      "close"
                    );
                  }
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("3");
                  if (modo != "A") {
                    $("#modalprocesodireccionamientoHospitalario_M").modal(
                      "close"
                    );
                  } else {
                    $("#modalprocesodireccionamientoHospitalario_A").modal(
                      "close"
                    );
                  }
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          if (modo != "A") {
            $("#modalprocesodireccionamientoHospitalario_M").modal("close");
          } else {
            $("#modalprocesodireccionamientoHospitalario_A").modal("close");
          }
        }
      };
      $scope.guardarprocesodireccionamientoManual = function (tiposGes, modo) {
        let inserfecha = $scope.formatDatefecha($scope.direccionamientoManual.fechaAceptacion);
        let inserHora = document.getElementById("id_direccionamientoManual_horaAceptacion").value;
        $scope.inserfechadireccionamientoManualObservacion = inserfecha + " " + inserHora;
        if (
          $scope.inserfechadireccionamientoManualObservacion == "" ||
          $scope.inserfechadireccionamientoManualObservacion == null ||
          $scope.inserfechadireccionamientoManualObservacion == undefined ||
          $scope.inserfechadireccionamientoManualObservacion == "aN/aN/NaN " ||
          $scope.direccionamientoManual.nombreipsRecep == "" ||
          $scope.direccionamientoManual.nombreipsRecep == null ||
          $scope.direccionamientoManual.nombreipsRecep == undefined ||
          $scope.direccionamientoManual.aceptacionPaciente == "" ||
          $scope.direccionamientoManual.aceptacionPaciente == null ||
          $scope.direccionamientoManual.aceptacionPaciente == undefined ||
          ($scope.direccionamientoManual.aceptacionPaciente == "N" &&
            ($scope.direccionamientoManual.motivoRechazo == "" ||
              $scope.direccionamientoManual.motivoRechazo == null ||
              $scope.direccionamientoManual.motivoRechazo == undefined)) ||
          $scope.direccionamientoManual.fechaAceptacion == "" ||
          $scope.direccionamientoManual.fechaAceptacion == null ||
          $scope.direccionamientoManual.fechaAceptacion == undefined ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.direccionamientoManual.profesional == "" ||
          $scope.direccionamientoManual.profesional == null ||
          $scope.direccionamientoManual.profesional == undefined ||
          $scope.direccionamientoManual.atendidoPor == "" ||
          $scope.direccionamientoManual.atendidoPor == null ||
          $scope.direccionamientoManual.atendidoPor == undefined ||
          $scope.direccionamientoManual.cargo == "" ||
          $scope.direccionamientoManual.cargo == null ||
          $scope.direccionamientoManual.cargo == undefined ||
          $scope.direccionamientoManual.observaciones == "" ||
          $scope.direccionamientoManual.observaciones == null ||
          $scope.direccionamientoManual.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_direccionamientoManual_aceptacionPaciente_label",
              id_input: "id_direccionamientoManual_aceptacionPaciente",
            },
            {
              Codigo: "2",
              id_label: "id_direccionamientoManual_motivoRechazo_label",
              id_input: "id_direccionamientoManual_motivoRechazo",
            },
            {
              Codigo: "3",
              id_label: "id_direccionamientoManual_fechaAceptacion_label",
              id_input: "id_direccionamientoManual_fechaAceptacion",
            },
            {
              Codigo: "4",
              id_label: "id_direccionamientoManual_horaAceptacion_label",
              id_input: "id_direccionamientoManual_horaAceptacion",
            },
            {
              Codigo: "5",
              id_label: "id_direccionamientoManual_profesional_label",
              id_input: "id_direccionamientoManual_profesional",
            },
            {
              Codigo: "6",
              id_label: "id_direccionamientoManual_atendidoPor_label",
              id_input: "id_direccionamientoManual_atendidoPor",
            },
            {
              Codigo: "7",
              id_label: "id_direccionamientoManual_cargo_label",
              id_input: "id_direccionamientoManual_cargo",
            },
            {
              Codigo: "8",
              id_label: "id_direccionamientoManual_observaciones_label",
              id_input: "id_direccionamientoManual_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.direccionamientoManual.pnumero,
              pdocumento: $scope.direccionamientoManual.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.direccionamientoManual.nombreipsRecep,
              ptipo_traslado: $scope.direccionamientoManual.tipoTraslado,
              paceptacion: $scope.direccionamientoManual.aceptacionPaciente,
              pmotivorechazo: $scope.direccionamientoManual.motivoRechazo,
              pmotivocancelacion:$scope.direccionamientoManual.motivoCancelacion,
              pfecha_gestion:$scope.inserfechadireccionamientoManualObservacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.direccionamientoManual.profesional,
              patendido_por: $scope.direccionamientoManual.atendidoPor,
              pcargo: $scope.direccionamientoManual.cargo,
              ptelefono: $scope.direccionamientoManual.telefono,
              pextension: $scope.direccionamientoManual.extencion,
              pobservacion: $scope.direccionamientoManual.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  if (modo != "A") {
                    $("#modalprocesodireccionamientoHospitalario_M").modal(
                      "close"
                    );
                  } else {
                    $("#modalprocesodireccionamientoHospitalario_A").modal(
                      "close"
                    );
                  }
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("3");
                  if (modo != "A") {
                    $("#modalprocesodireccionamientoHospitalario_M").modal(
                      "close"
                    );
                  } else {
                    $("#modalprocesodireccionamientoHospitalario_A").modal(
                      "close"
                    );
                  }
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          if (modo != "A") {
            $("#modalprocesodireccionamientoHospitalario_M").modal("close");
          } else {
            $("#modalprocesodireccionamientoHospitalario_A").modal("close");
          }
        }
      };
      $scope.guardarprocesogestionTraslado = function (gestion) {
        // console.log(gestion);
        let inserfecha = $scope.formatDatefecha($scope.modal3.fechaAceptacion);
        let inserHora = document.getElementById("id_modal3_horaAceptacion").value;
        $scope.inserfechamodal3Observacion = inserfecha + " " + inserHora;
        $scope.tipo_gestion = gestion;
        if (
          $scope.inserfechamodal3Observacion == "" ||
          $scope.inserfechamodal3Observacion == null ||
          $scope.inserfechamodal3Observacion == undefined ||
          $scope.inserfechamodal3Observacion == "aN/aN/NaN " ||
          $scope.modal3.nombreipsRecep == "" ||
          $scope.modal3.nombreipsRecep == null ||
          $scope.modal3.nombreipsRecep == undefined ||
          $scope.modal3.aceptacionPaciente == "" ||
          $scope.modal3.aceptacionPaciente == null ||
          $scope.modal3.aceptacionPaciente == undefined ||
          $scope.modal3.fechaAceptacion == "" ||
          $scope.modal3.fechaAceptacion == null ||
          $scope.modal3.fechaAceptacion == undefined ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.modal3.profesional == "" ||
          $scope.modal3.profesional == null ||
          $scope.modal3.profesional == undefined ||
          $scope.modal3.atendidoPor == "" ||
          $scope.modal3.atendidoPor == null ||
          $scope.modal3.atendidoPor == undefined ||
          $scope.modal3.cargo == "" ||
          $scope.modal3.cargo == null ||
          $scope.modal3.cargo == undefined ||
          $scope.modal3.observaciones == "" ||
          $scope.modal3.observaciones == null ||
          $scope.modal3.observaciones == undefined ||
          ($scope.modal3.aceptacionPaciente == "S" &&
            ($scope.modal3.tipoTraslado == "" ||
              $scope.modal3.tipoTraslado == null ||
              $scope.modal3.tipoTraslado == undefined)) ||
          ($scope.modal3.aceptacionPaciente == "N" &&
            ($scope.modal3.motivoRechazo == "" ||
              $scope.modal3.motivoRechazo == null ||
              $scope.modal3.motivoRechazo == undefined))
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_modal3_nombreipsRecep_label",
              id_input: "id_modal3_nombreipsRecep",
            },
            {
              Codigo: "2",
              id_label: "id_modal3_aceptacionPaciente_label",
              id_input: "id_modal3_aceptacionPaciente",
            },
            {
              Codigo: "3",
              id_label: "id_modal3_motivoRechazo_label",
              id_input: "id_modal3_motivoRechazo",
            },
            {
              Codigo: "4",
              id_label: "id_modal3_tipoTraslado_label",
              id_input: "id_modal3_tipoTraslado",
            },
            {
              Codigo: "5",
              id_label: "id_modal3_fechaAceptacion_label",
              id_input: "id_modal3_fechaAceptacion",
            },
            {
              Codigo: "6",
              id_label: "id_modal3_horaAceptacion_label",
              id_input: "id_modal3_horaAceptacion",
            },
            {
              Codigo: "7",
              id_label: "id_modal3_profesional_label",
              id_input: "id_modal3_profesional",
            },
            {
              Codigo: "8",
              id_label: "id_modal3_atendidoPor_label",
              id_input: "id_modal3_atendidoPor",
            },
            {
              Codigo: "9",
              id_label: "id_modal3_cargo_label",
              id_input: "id_modal3_cargo",
            },
            {
              Codigo: "10",
              id_label: "id_modal3_observaciones_label",
              id_input: "id_modal3_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.modal3.pnumero,
              pdocumento: $scope.modal3.numeroDocumento,
              ptipo_gestion: $scope.tipo_gestion,
              pips_receptora: $scope.modal3.nombreipsRecep,
              ptipo_traslado: $scope.modal3.tipoTraslado,
              paceptacion: $scope.modal3.aceptacionPaciente,
              pmotivorechazo: $scope.modal3.motivoRechazo,
              pfecha_gestion: $scope.inserfechamodal3Observacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.modal3.profesional,
              patendido_por: $scope.modal3.atendidoPor,
              pcargo: $scope.modal3.cargo,
              ptelefono: $scope.modal3.telefono,
              pextension: $scope.modal3.extencion,
              pobservacion: $scope.modal3.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  $("#modalprocesogestionTraslado").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("3");
                  $("#modalprocesogestionTraslado").modal("close");
                  $scope.$apply();
                }, 2500);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          $("#modalprocesogestionTraslado").modal("close");
        }
      };
      $scope.guardarprocesoGestioncierre = function (tiposGes) {
        let inserfecha = $scope.formatDatefecha($scope.modal5.fechaAceptacion);
        let inserHora = $scope.modal5.horaAceptacion;
        $scope.inserfechamodal5Observacion = inserfecha + " " + inserHora;
        if (
          $scope.inserfechamodal5Observacion == "" ||
          $scope.inserfechamodal5Observacion == null ||
          $scope.inserfechamodal5Observacion == undefined ||
          $scope.inserfechamodal5Observacion == "aN/aN/NaN " ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.modal5.nombreipsRecep == "" ||
          $scope.modal5.nombreipsRecep == null ||
          $scope.modal5.nombreipsRecep == undefined ||
          $scope.modal5.aceptacionPaciente == "" ||
          $scope.modal5.aceptacionPaciente == null ||
          $scope.modal5.aceptacionPaciente == undefined ||
          ($scope.modal5.aceptacionPaciente == "N" &&
            ($scope.modal5.motivoRechazo == "" ||
              $scope.modal5.motivoRechazo == null ||
              $scope.modal5.motivoRechazo == undefined)) ||
          $scope.modal5.profesional == "" ||
          $scope.modal5.profesional == null ||
          $scope.modal5.profesional == undefined ||
          $scope.modal5.atendidoPor == "" ||
          $scope.modal5.atendidoPor == null ||
          $scope.modal5.atendidoPor == undefined ||
          $scope.modal5.cargo == "" ||
          $scope.modal5.cargo == null ||
          $scope.modal5.cargo == undefined ||
          $scope.modal5.observaciones == "" ||
          $scope.modal5.observaciones == null ||
          $scope.modal5.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_modal5_nombreipsRecep_label",
              id_input: "id_modal5_nombreipsRecep",
            },
            {
              Codigo: "2",
              id_label: "id_modal5_aceptacionPaciente_label",
              id_input: "id_modal5_aceptacionPaciente",
            },
            {
              Codigo: "3",
              id_label: "id_modal5_motivoRechazo_label",
              id_input: "id_modal5_motivoRechazo",
            },
            {
              Codigo: "4",
              id_label: "id_modal5_fechaAceptacion_label",
              id_input: "id_modal5_fechaAceptacion",
            },
            {
              Codigo: "5",
              id_label: "id_modal5_horaAceptacion_label",
              id_input: "id_modal5_horaAceptacion",
            },
            {
              Codigo: "6",
              id_label: "id_modal5_profesional_label",
              id_input: "id_modal5_profesional",
            },
            {
              Codigo: "7",
              id_label: "id_modal5_atendidoPor_label",
              id_input: "id_modal5_atendidoPor",
            },
            {
              Codigo: "8",
              id_label: "id_modal5_cargo_label",
              id_input: "id_modal5_cargo",
            },
            {
              Codigo: "9",
              id_label: "id_modal5_observaciones_label",
              id_input: "id_modal5_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.modal5.pnumero,
              pdocumento: $scope.modal5.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.modal5.nombreipsRecep,
              ptipo_traslado: $scope.modal5.tipoTraslado,
              paceptacion: $scope.modal5.aceptacionPaciente,
              pmotivorechazo: $scope.modal5.motivoRechazo,
              pmotivocancelacion: $scope.modal5.motivoCancelacion,
              pfecha_gestion: $scope.inserfechamodal5Observacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.modal5.profesional,
              patendido_por: $scope.modal5.atendidoPor,
              pcargo: $scope.modal5.cargo,
              ptelefono: $scope.modal5.telefono,
              pextension: $scope.modal5.extencion,
              pobservacion: $scope.modal5.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestioncierre").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("3");
                  $("#modalprocesoGestioncierre").modal("close");
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          $("#modalprocesoGestioncierre").modal("close");
        }
      };
      $scope.guardarprocesoGestioncancelacion = function (tiposGes) {
        let inserfecha = $scope.formatDatefecha($scope.modal4.fechaAceptacion);
        let inserHora = document.getElementById("id_modal4_horaAceptacion").value ;
        $scope.inserfechamodal4Observacion = inserfecha + " " + inserHora;
        if (
          $scope.inserfechamodal4Observacion == "" ||
          $scope.inserfechamodal4Observacion == null ||
          $scope.inserfechamodal4Observacion == undefined ||
          $scope.inserfechamodal4Observacion == "aN/aN/NaN " ||
          $scope.modal4.nombreipsRecep == "" ||
          $scope.modal4.nombreipsRecep == null ||
          $scope.modal4.nombreipsRecep == undefined ||
          $scope.modal4.motivoCancelacion == "" ||
          $scope.modal4.motivoCancelacion == null ||
          $scope.modal4.motivoCancelacion == undefined ||
          $scope.modal4.fechaAceptacion == "" ||
          $scope.modal4.fechaAceptacion == null ||
          $scope.modal4.fechaAceptacion == undefined ||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined ||
          $scope.modal4.profesional == "" ||
          $scope.modal4.profesional == null ||
          $scope.modal4.profesional == undefined ||
          $scope.modal4.atendidoPor == "" ||
          $scope.modal4.atendidoPor == null ||
          $scope.modal4.atendidoPor == undefined ||
          $scope.modal4.cargo == "" ||
          $scope.modal4.cargo == null ||
          $scope.modal4.cargo == undefined ||
          $scope.modal4.observaciones == "" ||
          $scope.modal4.observaciones == null ||
          $scope.modal4.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_modal4_nombreipsRecep_label",
              id_input: "id_modal4_nombreipsRecep",
            },
            {
              Codigo: "2",
              id_label: "id_modal4_motivoCancelacion_label",
              id_input: "id_modal4_motivoCancelacion",
            },
            {
              Codigo: "3",
              id_label: "id_modal4_fechaAceptacion_label",
              id_input: "id_modal4_fechaAceptacion",
            },
            {
              Codigo: "4",
              id_label: "id_modal4_horaAceptacion_label",
              id_input: "id_modal4_horaAceptacion",
            },
            {
              Codigo: "5",
              id_label: "id_modal4_profesional_label",
              id_input: "id_modal4_profesional",
            },
            {
              Codigo: "6",
              id_label: "id_modal4_atendidoPor_label",
              id_input: "id_modal4_atendidoPor",
            },
            {
              Codigo: "7",
              id_label: "id_modal4_cargo_label",
              id_input: "id_modal4_cargo",
            },
            {
              Codigo: "8",
              id_label: "id_modal4_observaciones_label",
              id_input: "id_modal4_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // console.log($scope.form2);
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.modal4.pnumero,
              pdocumento: $scope.modal4.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.modal4.nombreipsRecep,
              ptipo_traslado: $scope.modal4.tipoTraslado,
              paceptacion: $scope.modal4.aceptacionPaciente,
              pmotivorechazo: $scope.modal4.motivoRechazo,
              pmotivocancelacion: $scope.modal4.motivoCancelacion,
              pfecha_gestion: $scope.inserfechamodal4Observacion,
              phora_gestion: inserHora,
              profesional_gestion: $scope.modal4.profesional,
              patendido_por: $scope.modal4.atendidoPor,
              pcargo: $scope.modal4.cargo,
              ptelefono: $scope.modal4.telefono,
              pextension: $scope.modal4.extencion,
              pobservacion: $scope.modal4.observaciones,
            },
          }).then(function (response) {
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              var data = response.data;
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar("3");
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestioncancelacion").modal("close");
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", response.data.Nombre, "warning");
                setTimeout(() => {
                  $scope.limpiar("3");
                  $("#modalprocesoGestioncancelacion").modal("close");
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
          $("#modalprocesoGestioncancelacion").modal("close");
        }
      };
      $scope.guardarObservaciones = function (obser) {
        let inserfecha = $scope.formatDatefecha($scope.modal1.fechaIngreso);
        let inserHora = $scope.modal1.horaIngreso;
        $scope.inserfechaObservacion = inserfecha + " " + inserHora;
        if (
          $scope.modal1.observaciones == "" ||
          $scope.inserfechaObservacion == "" ||
          $scope.inserfechaObservacion == null ||
          $scope.inserfechaObservacion == undefined ||
          $scope.inserfechaObservacion == "aN/aN/NaN "||
          inserfecha == "" ||
          inserfecha == null ||
          inserfecha == undefined ||
          inserfecha == "aN/aN/NaN " ||
          inserHora == "" ||
          inserHora == null ||
          inserHora == undefined 
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_modal1_fechaIngreso_label",
              id_input: "id_fechaIngreso_observaciones",
            },
            {
              Codigo: "2",
              id_label: "id_modal1_horaIngreso_label",
              id_input: "id_modal1_horaIngreso",
            },
            {
              Codigo: "3",
              id_label: "id_modal1_observaciones_label",
              id_input: "id_modal1_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "insertGestion",
              pnumero: $scope.modal1.numeroReferencia,
              pdocumento: $scope.modal1.numeroDocumento,
              ptipo_gestion: obser,
              pfecha_gestion: $scope.inserfechaObservacion,
              phora_gestion: inserHora,
              pobservacion: $scope.modal1.observaciones,
            },
          }).then(function (response) {
            // console.log(response);
            swal.close();
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              var data = response.data;
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal("Notificación", response.data.Nombre, "success");
                $scope.listrefrenciasActivas();
                $scope.modal1.observaciones = "";
                $("#modalObservaciones").modal("close");
              } else {
                swal("Notificación", response.data.Nombre, "warning");
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.detallesreferenciaIPS = function (opcion) {
        // console.log(opcion);
        $scope.openmodals("detallegestionIps", opcion);
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "P_OBTENER_REFERENCIAS_DETALLE",
            codigoreferencia: $scope.form3.porconsultar,
            documentopaciente: $scope.form3.numeroDocumento,
          },
        }).then(function (response) {
          // console.log(response);
          // $scope.verdetallesreferenciaIPS();
          $scope.listadetalleReferencia = response.data.ips;
          // console.log($scope.listadetalleReferencia);

          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
          if (response.data.CODIGO == "0") {
            swal({
              title: "¡Alerta¡",
              text: response.data.NOMBRE,
              type: "warning",
            }).catch(swal.noop);
          } else {
            setTimeout(() => {
              $scope.$apply();
              swal.close();
            }, 1000);
          }
        });
      };
      $scope.detallesreferenciaObser = function (opcion) {
        // console.log(opcion);
        $scope.openmodals("detalleObservacion", opcion);
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "P_OBTENER_REFERENCIAS_DETALLE",
            codigoreferencia: $scope.form3.porconsultar,
            documentopaciente: $scope.form3.numeroDocumento,
          },
        }).then(function (response) {
          // console.log(response);
          // $scope.verdetallesreferenciaObser();
          $scope.listadetalleObservacion = response.data.observaciones;

          // console.log($scope.listadetalleObservacion);
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
          if (response.data.CODIGO == "0") {
            swal({
              title: "¡Alerta¡",
              text: response.data.NOMBRE,
              type: "warning",
            }).catch(swal.noop);
          } else {
            setTimeout(() => {
              $scope.$apply();
              swal.close();
            }, 1000);
          }
        });
      };
      $scope.vistacontroldeGestion = function (control) {
        console.log(control);
        $scope.controlAcceso = control.RSPONSABLE_AUDITOR;
        if ($scope.controlAcceso > 0) {
          swal({
            title: "Notificación",
            text: "El control ya fue activado",
            type: "warning",
          }).catch(swal.noop);
          return;
        } else if ($scope.controlAcceso == null) {
          $scope.vistacontrolGestion = true;
          $scope.codigodocumentoReferencia = control.COD_DOCUMENTO;
          $scope.control.numeroReferencia = control.CODIGO;
          $scope.control.nombrePaciente = control.NOMBRE_PCTE;
          $scope.control.edad = control.EDAD;
          $scope.control.pacientePgp = control.SERVICIO_PGP;
          $scope.control.diagnosticoPrincipal = control.NOMBRE_DX;
          $scope.control.diagnosticoSegundario = control.NOMBRE_DX_1;
          $scope.control.servicio1 = control.SERVICIO;
          $scope.control.servicio2 = control.SERVICIO_ADICIONAL;
          $scope.openmodals("controlGestion", control);
        }
      };
      $scope.guardargestionControl = function () {
        if ($scope.control.observaciones == "") {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_control_observaciones_label",
              id_input: "id_control_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "gestionControl",
            vpdocumento: $scope.codigodocumentoReferencia,
            vpnumero: $scope.control.numeroReferencia,
            vpobservacion: $scope.control.observaciones,
          },
        }).then(function (response) {
          if (response.data.Codigo == "0") {
            swal({
              title: "Gestion de control",
              text: response.data.Nombre,
              type: "success",
            }).catch(swal.noop);
            $scope.control.observaciones = "";
            $("#modalcontroldeGestion").modal("close");
          } else {
            setTimeout(() => {
              $scope.$apply();
              swal.close();
            }, 1000);
          }
        });
      };
      $scope.verdetallesreferenciaIPS = function (datosentrada) {
        $scope.codigodereferencia = datosentrada.CODIGO;
        $scope.status = datosentrada.STATUS;
        $scope.ciudaddeReferencia = datosentrada.GRUPO;
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "P_OBTENER_REFERENCIAS_DETALLE",
            codigoreferencia: datosentrada.CODIGO,
            documentopaciente: datosentrada.DOCUMENTO,
          },
        }).then(function (response) {
          $scope.listadetalleReferencia = response.data.ips;
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
        });
      };
      $scope.verdetallesreferenciaObser = function (datosentrada) {
        // console.log(datosentrada);
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "P_OBTENER_REFERENCIAS_DETALLE",
            codigoreferencia: datosentrada.CODIGO,
            documentopaciente: datosentrada.DOCUMENTO,
          },
        }).then(function (response) {
          // console.log(response);
          // console.log(response.data.observaciones);
          $scope.verlistadetalleObservacion = response.data.observaciones;
          // console.log($scope.verlistadetalleObservacion);
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
        });
      };
      $scope.listrefrenciasActivas = function () {
        if ($scope.grupos == "") {
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $scope.Vista1_datos = [];
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "P_OBTENER_REFERENCIAS_ACTIVAS",
              grupo: $scope.grupos,
              responsable: $scope.rolObtenido,
            },
          }).then(function (response) {
            // console.log($scope.grupos);
            // console.log(response);
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              // console.log(response.data);
              setTimeout(() => {
                $scope.$apply();
                $scope.filtro_tabs();
                swal.close();
              }, 500);
              $scope.Vista1_datos = response.data;
              $scope.initPaginacion(response.data);
            }
          });
        }
      };
      $scope.plistadireccionamiento = function (opcion) {
        //console.log(opcion);
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "p_listadireccionamiento",
            vpcodigo: opcion.CODIGO,
          },
        }).then(function ({ data }) {
          //console.log(data);
          if (data && data.toString().substr(0, 3) != "<br") {
            swal.close();
            if (data.Codigo == 1) {
              swal({
                title: "¡Alerta¡",
                text: data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            } else {
              $scope.listaDireccionamientoHospitalario = data;
              //console.log($scope.listaDireccionamientoHospitalario);
              $("#modallistaRedireccionamiento").modal("open");
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listadouserReferencia = function () {
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $scope.Vista1_datos = [];
        $scope.Vista1.Filtrar_User = "";
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "listausuariosReferencia",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            swal.close();
            $scope.Vista1_datos = response.data;
            $scope.initPaginacion(response.data);
          }
        });
      };
      $scope.cambiargrupoReferencia = function () {
        if (
          $scope.form7.codigo == "" ||
          $scope.form7.numeroDocumento == "" ||
          $scope.form7.grupo == ""
        ) {
          swal({
            title: "Notificación",
            text: "No se permite campos vacios para realizar el cambio de grupo",
            type: "warning",
          }).catch(swal.noop);
          return;
        } else {
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "cambiargruposReferencia",
              vpnumero: $scope.form7.codigo,
              vpdocumento: $scope.form7.numeroDocumento,
              vpgrupo: $scope.form7.grupo,
            },
          }).then(function (response) {
            // console.log(response.data);
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              swal({
                title: "Grupo",
                text: "Actualizado correctamente",
                type: "success",
              }).catch(swal.noop);
              $scope.limpiar("1");
            }
          });
        }
      };
      $scope.listarlistaResumen = function () {
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerlistaResumen",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listadoresumen = response.data;
            // console.log($scope.listadoresumen);
            $scope.listresumenAtlantico = response.data[0];
            $scope.listresumenMagcordoba = response.data[1];
            $scope.listresumenMeta = response.data[2];
            $scope.listresumenCesarguajira = response.data[3];
            $scope.listresumenBolsuc = response.data[4];
            $scope.listresumenBogotros = response.data[5];
            if ($scope.listresumenAtlantico.codigo == 1) {
              $scope.nombreCodigoatl = "ATLANTICO";
              //console.log($scope.listresumenAtlantico);
            }
            if ($scope.listresumenMagcordoba.codigo == 2) {
              $scope.nombreCodigomagcord = "MAG - CORDOBA";
              // console.log($scope.listresumenMagcordoba);
            }
            if ($scope.listresumenMeta.codigo == 3) {
              $scope.nombreCodigomet = "META";
              // console.log($scope.listresumenMeta);
            }
            if ($scope.listresumenCesarguajira.codigo == 4) {
              $scope.nombreCodigocesguaj = "CESAR - GUAJIRA";
              // console.log($scope.listresumenCesarguajira);
            }
            if ($scope.listresumenBolsuc.codigo == 5) {
              $scope.nombreCodigoBolsucj = "BOLIVAR - SUCRE";
              // console.log($scope.listresumenBolsuc);
            }
            if ($scope.listresumenBogotros.codigo == 6) {
              $scope.nombreCodigobogotros = "BOGOTA - OTRAS";
              // console.log($scope.listresumenBogotros);
            }
          }
        });
      };
      $scope.apply = function () {
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      };
      // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatHora = function (date) {
        if (minutos < 10) {
          minutos = "0" + minutos;
        }
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var minutos = d.getMinutes();
        return hh + ":" + minutos + ":00";
      };
      $scope.formatDatehora = function (date) {
        // console.log(date);
        var x = document.getElementById("myTime").value;
        // console.log(x);
      };
      $scope.openmodals = function (tipo, opcion, accion) {
       // console.log(tipo,'-' ,opcion,'-' , accion);
        $scope.buscard1 = "";
        $scope.buscard6 = "";
        $scope.buscard7 = "";
        $scope.busquedadetallegestionIps = "";
        $scope.busquedadetallegestionOber = "";
        $scope.tipoaut = opcion;
        switch (tipo) {
          case "nuevoMotivo":
            // console.log(tipo, opcion);
            $("#modalnuevoMotivo").modal("open");
            setTimeout(() => {
              $("#modalnuevoMotivo").focus();
            }, 100);
            break;
          case "nuevoUsuario":
            // console.log(tipo, opcion);
            $("#modalnuevoUser").modal("open");
            setTimeout(() => {
              $("#modalnuevoUser").focus();
            }, 100);
            break;
          case "editarMotivo":
            $("#modaleditarMotivo").modal("open");
            setTimeout(() => {
              $("#modaleditarMotivo").focus();
            }, 100);
            break;
          case "editarUsuario":
            $("#modaleditarUser").modal("open");
            setTimeout(() => {
              $("#modaleditarUser").focus();
            }, 100);
            break;
          case "observaciones":
            // console.log(tipo, opcion);
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalObservaciones").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              ($scope.modal1.observaciones = ""),
                ($scope.modal1.fechaIngreso = ""),
                ($scope.modal1.horaIngreso = ""),
                ($scope.modal1.numeroReferencia = opcion.CODIGO);
              $scope.modal1.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal1.nombreFuncionario = opcion.NOMBRE_PCTE;

              $("#modalObservaciones").modal("open");
              setTimeout(() => {
                $("#modalObservaciones").focus();
              }, 100);
            }
            break;
          case "ips":
            $scope.listIps = [];
            $("#modalips").modal("open");
            setTimeout(() => {
              $("#modalips #ipsinput").focus();
            }, 100);
            break;
          case "diagnostico":
            $scope.listDiagnosticos = [];
            $scope.inactivebarradiag = true;
            $("#modaldiagnostico").modal("open");
            setTimeout(() => {
              $("#modaldiagnostico #diaginput").focus();
            }, 100);
            break;
          case "diagnosticocontrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modaldiagnosticocontrarreferencia").modal("open");
            setTimeout(() => {
              $("#modaldiagnosticocontrarreferencia #diaginput").focus();
            }, 100);
            break;
          case "procesoGestion":
            $scope.tipoProceso =
              opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            if (
              opcion.DOCUMENTO == "REFERENCIA" &&
              opcion.NOMBRE_STATUS == "POR LLEGAR"
            ) {
              setTimeout(() => {
                $("#modalprocesogestionTraslado").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar mas proceso de traslado",
                type: "warning",
              }).catch(swal.noop);
            }
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalprocesoGestion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              if (opcion.STATUS == "3" || opcion.STATUS == "4") {
                $scope.limpiar("3");
                $scope.listarmotivodeTraslado();
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.modal3.pnumero = opcion.CODIGO;
                $scope.modal3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.modal3.porconsultar = opcion.GRUPO;
                $("#modalprocesogestionTraslado").modal("open");
                setTimeout(() => {
                  $("#listipsTraslado #procesodeTraslado").focus();
                }, 100);
              } else {
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.form3.pnumero = opcion.CODIGO;
                $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.form3.porconsultar = opcion.GRUPO;
                $("#modalprocesoGestion").modal("open");
                setTimeout(() => {
                  $("#modalprocesoGestion #procesodeGestion").focus();
                }, 100);
              }
            }
            break;
          case "listipsGestion":
            $scope.listipsGestion = [];
            $scope.procesodeGestion = "";
            $("#modallistipsGestion").modal("open");
            setTimeout(() => {
              $("#modallistipsGestion #id_procesodeGestion").focus();
            }, 100);
            break;
          case "procesodireccionamientoHospitalario_A":
            $scope.tipoProceso =
              opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            if (
              opcion.DOCUMENTO == "REFERENCIA" &&
              opcion.NOMBRE_STATUS == "POR LLEGAR"
            ) {
              setTimeout(() => {
                $("#modalprocesogestionTraslado").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar mas proceso de traslado",
                type: "warning",
              }).catch(swal.noop);
            }
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalprocesoGestion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              if (opcion.STATUS == "3" || opcion.STATUS == "4") {
                $scope.limpiar("3");
                $scope.listarmotivodeTraslado();
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.modal3.pnumero = opcion.CODIGO;
                $scope.modal3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.modal3.porconsultar = opcion.GRUPO;
                $("#modalprocesogestionTraslado").modal("open");
                setTimeout(() => {
                  $("#listipsTraslado #procesodeTraslado").focus();
                }, 100);
              } else {
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.direccionamiento.pnumero = opcion.CODIGO;
                $scope.direccionamiento.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.direccionamiento.porconsultar = opcion.GRUPO;
                $("#modalprocesodireccionamientoHospitalario_A").modal("open");
                setTimeout(() => {
                  $("#modalprocesoGestion #procesodeGestion").focus();
                }, 100);
              }
            }
            break;
          case "procesodireccionamientoHospitalario_M":
            $scope.tipoProceso =
              opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            if (
              opcion.DOCUMENTO == "REFERENCIA" &&
              opcion.NOMBRE_STATUS == "POR LLEGAR"
            ) {
              setTimeout(() => {
                $("#modalprocesogestionTraslado").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar mas proceso de traslado",
                type: "warning",
              }).catch(swal.noop);
            }
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalprocesoGestion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              if (opcion.STATUS == "3" || opcion.STATUS == "4") {
                $scope.limpiar("3");
                $scope.listarmotivodeTraslado();
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.modal3.pnumero = opcion.CODIGO;
                $scope.modal3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.modal3.porconsultar = opcion.GRUPO;
                $("#modalprocesogestionTraslado").modal("open");
                setTimeout(() => {
                  $("#listipsTraslado #procesodeTraslado").focus();
                }, 100);
              } else {
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.direccionamientoManual.pnumero = opcion.CODIGO;
                $scope.direccionamientoManual.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.direccionamientoManual.porconsultar = opcion.GRUPO;
                $("#modalprocesodireccionamientoHospitalario_M").modal("open");
                setTimeout(() => {
                  $("#modalprocesoGestion #procesodeGestion").focus();
                }, 100);
              }
            }
            break;
          case "listipsdireccionamientoHospitalario_M":
            $("#modallistipsdireccionamientoHospitalario_M").modal("open");
            setTimeout(() => {
              $scope.direccionamientoIps("M");
              $(
                "#modallistipsdireccionamientoHospitalario_M #id_procesodireccionamientoHospitalario"
              ).focus();
            }, 100);
            break;
          case "listipsTraslado":
            $("#modallistipsTraslado").modal("open");
            setTimeout(() => {
              $("#modallistipsTraslado #id_procesodeTraslado").focus();
            }, 100);
            break;
          case "procesoGestioncierre":
            $scope.tipoProceso = opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            $scope.limpiar("3");
           /* if(opcion.DOCUMENTO == "APOYO DIAGNOSTICO"){
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal5.pnumero = opcion.CODIGO;
              $scope.modal5.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal5.porconsultar = opcion.GRUPO;
              $("#modalprocesoGestioncierre").modal("open");
            }*/
            if (opcion.STATUS != "4" ) {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } if (opcion.ESTADO == "C") {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "Ya se encuentra cerreda esta gestion",
                type: "warning",
              }).catch(swal.noop);
            } else {
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal5.pnumero = opcion.CODIGO;
              $scope.modal5.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal5.porconsultar = opcion.GRUPO;
              $("#modalprocesoGestioncierre").modal("open");
            }
            break;
          case "procesodireccionamientoHospitalario_M":
            $scope.tipoProceso =
              opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            if (
              opcion.DOCUMENTO == "REFERENCIA" &&
              opcion.NOMBRE_STATUS == "POR LLEGAR"
            ) {
              setTimeout(() => {
                $("#modalprocesogestionTraslado").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar mas proceso de traslado",
                type: "warning",
              }).catch(swal.noop);
            }
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalprocesoGestion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              if (opcion.STATUS == "3" || opcion.STATUS == "4") {
                $scope.limpiar("3");
                $scope.listarmotivodeTraslado();
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.modal3.pnumero = opcion.CODIGO;
                $scope.modal3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.modal3.porconsultar = opcion.GRUPO;
                $("#modalprocesogestionTraslado").modal("open");
                setTimeout(() => {
                  $("#listipsTraslado #procesodeTraslado").focus();
                }, 100);
              } else {
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.direccionamiento.pnumero = opcion.CODIGO;
                $scope.direccionamiento.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.direccionamiento.porconsultar = opcion.GRUPO;
                $("#modalprocesodireccionamientoHospitalario").modal("open");
                setTimeout(() => {
                  $("#modalprocesoGestion #procesodeGestion").focus();
                }, 100);
              }
            }
            break;
          case "listipsdireccionamientoHospitalario_M":
            $scope.listipsGestion = [];
            $scope.procesodeGestion = "";
            $("#modallistipsdireccionamientoHospitalario").modal("open");
            setTimeout(() => {
              $(
                "#modallistipsdireccionamientoHospitalario #id_procesodireccionamientoHospitalario"
              ).focus();
            }, 100);
            break;
          case "listipsTraslado":
            $("#modallistipsTraslado").modal("open");
            setTimeout(() => {
              $("#modallistipsTraslado #id_procesodeTraslado").focus();
            }, 100);
            break;
          case "procesoGestioncierre":
            $scope.tipoProceso =
              opcion.STATUS == 3 ? "2" : opcion.STATUS == 2 ? "1" : "3";
            $scope.limpiar("3");
            if (opcion.STATUS != "4") {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            }
            if (opcion.ESTADO == "C") {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "Ya se encuentra cerreda esta gestion",
                type: "warning",
              }).catch(swal.noop);
            } else {
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal5.pnumero = opcion.CODIGO;
              $scope.modal5.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal5.porconsultar = opcion.GRUPO;
              $("#modalprocesoGestioncierre").modal("open");
            }
            break;
          case "listipsCierre":
            $scope.listipsCierre = [];
            $scope.procesodeCierre = "";
            $("#modallistipsCierre").modal("open");
            setTimeout(() => {
              $("#modallistipsCierre #id_procesodeCierre").focus();
            }, 100);
            break;
          case "procesoGestioncancelacion":
            if (
              opcion.NOMBRE_STATUS == "CANCELADA" ||
              opcion.NOMBRE_STATUS == "CERRADA"
            ) {
              setTimeout(() => {
                $("#modalprocesoGestioncancelacion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: "No se puede gestionar el proceso",
                type: "warning",
              }).catch(swal.noop);
            } else {
              $scope.listarmotivodecancelacionActivos();
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal4.pnumero = opcion.CODIGO;
              $scope.modal4.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal4.porconsultar = opcion.GRUPO;
              $scope.procesoCancelacion = accion;
              $("#modalprocesoGestioncancelacion").modal("open");
              setTimeout(() => {
                $(
                  "#modalprocesoGestioncancelacion #id_procesodeCancelacion"
                ).focus();
              }, 100);
            }
            break;
          case "listipsCancelacion":
            $scope.listipsCancelacion = [];
            $scope.procesodeCancelacion = "";
            $("#modallistipsCancelacion").modal("open");
            setTimeout(() => {
              $("#modallistipsCancelacion #id_procesodeCancelacion").focus();
            }, 100);
            break;
          case "detalleObservacion":
            $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
            $scope.form3.porconsultar = opcion.CODIGO;
            $("#modaldetallegestionOber").modal("open");
            setTimeout(() => {
              $("#modaldetallegestionOber").focus();
            }, 100);
            break;
          case "detallegestionIps":
            $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
            $scope.form3.porconsultar = opcion.CODIGO;
            $("#modaldetallegestionIps").modal("open");
            setTimeout(() => {
              $("#modaldetallegestionIps").focus();
            }, 100);
            break;
          case "servicio1":
            $scope.buscard3 = "";
            $scope.listEspecialidades = [];
            $scope.inactivebarradiag = true;
            $("#modalservicio1").modal("open");
            setTimeout(() => {
              $("#modalservicio1 #id_service1").focus();
            }, 100);
            break;
          case "servicio2":
            $scope.buscard4 = "";
            $scope.listEspecialidades = [];
            $scope.inactivebarradiag = true;
            $("#modalservicio2").modal("open");
            setTimeout(() => {
              $("#modalservicio2  #id_service2").focus();
            }, 100);
            break;
          case "servicio3":
            $scope.buscard5 = "";
            $scope.listEspecialidades = [];
            $scope.inactivebarradiag = true;
            $("#modalservicio3").modal("open");
            setTimeout(() => {
              $("#modalservicio3  #id_service3").focus();
            }, 100);
            break;
          case "servicio1contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio1contrarreferencia").modal("open");
            setTimeout(() => {
              $("#modalservicio1contrarreferencia").focus();
            }, 100);
            break;
          case "servicio2contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio2contrarreferencia").modal("open");
            setTimeout(() => {
              $("#modalservicio2contrarreferencia").focus();
            }, 100);
            break;
          case "servicio3contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio3contrarreferencia").modal("open");
            setTimeout(() => {
              $("#modalservicio3contrarreferencia").focus();
            }, 100);
            break;
          case "paremetriciontimerespuesta":
            $scope.inactivebarradiag = true;
            $("#modaldeparemetriciontimerespuesta").modal("open");
            setTimeout(() => {
              $("#modaldeparemetriciontimerespuesta").focus();
            }, 100);
            break;
          case "controlGestion":
            $scope.control.observaciones = "";
            $("#modalcontroldeGestion").modal("open");
            setTimeout(() => {
              $("#modalcontroldeGestion #id_control_observaciones").focus();
            }, 100);
            break;
          case "cancelacion":
            $scope.listarmotivodecancelacionActivos();
            $scope.documentoCancelacion = "";
            $scope.numeroreferenciaCancelacion = "";
            $scope.reglonCancelacion = "";
            $scope.nombreipsCancelacion = "";
            $("#modalCancelacion").modal("open");
            ($scope.documentoCancelacion = opcion.DOCUMENTO),
              ($scope.numeroreferenciaCancelacion = opcion.NUMERO),
              ($scope.reglonCancelacion = opcion.RENGLON),
              ($scope.nombreipsCancelacion = opcion.TERC_NOMBRE),
              setTimeout(() => {
                $("#modalCancelacion #id_motivo_Cancelacion").focus();
              }, 100);
            break;
          case "fuente":
            $("#modalFuente").modal("open");
            break;
          default:
        }
      };
      $scope.closemodals = function (tipo) {
        // console.log(tipo);
        switch (tipo) {
          case "redireccionamiento":
            $("#modallistaRedireccionamiento").modal("close");
            break;
          case "Redirecionamiento":
            $("#modalRedirecionamiento").modal("close");
            break;
          case "Validacion":
            $("#modaldeValidacion").modal("close");
            break;
          case "nuevoMotivo":
            $("#modalnuevoMotivo").modal("close");
            $scope.limpiar("1");
            break;
          case "nuevoUsuario":
            $scope.limpiar("1");
            $("#modalnuevoUser").modal("close");
            break;
          case "editarUsuario":
            $("#modaleditarUser").modal("close");
            break;
          case "observaciones":
            $("#modalObservaciones").modal("close");
            $scope.limpiar("3");
            break;
          case "ips":
            $("#modalips").modal("close");
            break;
          case "diagnostico":
            $("#modaldiagnostico").modal("close");
            break;
          case "diagnosticocontrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modaldiagnosticocontrarreferencia").modal("close");
            break;
          case "procesoGestion":
            $("#modalprocesoGestion").modal("close");
            $scope.limpiar("3");
            break;
          case "procesodireccionamientoHospitalario_A":
            $("#modalprocesodireccionamientoHospitalario_A").modal("close");
            $scope.limpiar("3");
            break;
          case "procesodireccionamientoHospitalario_M":
            $("#modalprocesodireccionamientoHospitalario_M").modal("close");
            $scope.limpiar("3");
            break;
          case "listipsdireccionamientoHospitalario_M":
            $("#modallistipsdireccionamientoHospitalario_M").modal("close");
            break;
          case "procesoGestioncierre":
            $("#modalprocesoGestioncierre").modal("close");
            $scope.limpiar("3");
            break;
          case "procesoGestioncancelacion":
            $("#modalprocesoGestioncancelacion").modal("close");
            $scope.limpiar("3");
            break;
          case "listipsCancelacion":
            $("#modallistipsCancelacion").modal("close");
            break;
          case "listipsTraslado":
            $scope.procesodeTraslado = "";
            $scope.listipsTraslado = [];
            $("#modallistipsTraslado").modal("close");
            $scope.limpiar("3");
            break;
          case "procesogestionTraslado":
            $scope.procesodeTraslado = "";
            $scope.listipsTraslado = [];
            $("#modalprocesogestionTraslado").modal("close");
            $scope.limpiar("3");
            break;
          case "listipsGestion":
            $("#modallistipsGestion").modal("close");
            break;
          case "listipsCierre":
            $("#modallistipsCierre").modal("close");
            break;
          case "detalleObservacion":
            $("#modaldetallegestionOber").modal("close");
            break;
          case "detallegestionIps":
            $("#modaldetallegestionIps").modal("close");
            break;
          case "servicio1":
            $("#modalservicio1").modal("close");
            break;
          case "servicio2":
            $("#modalservicio2").modal("close");
            break;
          case "servicio3":
            $("#modalservicio3").modal("close");
            break;
          case "servicio1contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio1contrarreferencia").modal("close");

            break;
          case "servicio2contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio2contrarreferencia").modal("close");
            break;
          case "servicio3contrarreferencia":
            $scope.inactivebarradiag = true;
            $("#modalservicio3contrarreferencia").modal("close");
            break;
          case "paremetriciontimerespuesta":
            $scope.inactivebarradiag = true;
            $("#modaldeparemetriciontimerespuesta").modal("close");
            break;
          case "controlGestion":
            $scope.control.observaciones = "";
            $("#modalcontroldeGestion").modal("close");
            break;
          case "cancelacion":
            $("#modalCancelacion").modal("close");
            break;
          case "fuente":
            $("#modalFuente").modal("close");
            break;
          default:
        }
      };
      $scope.resumenCantidad = function () {
        $http({
          method: "POST",
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: "obtenerCantidades",
            grupo: $scope.grupos,
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.resumenCantidadesgeneral = response.data;
            // console.log($scope.resumenCantidadesgeneral);
          }
        });
      };
      $scope.proceso_cancelacion = function () {
        if (
          $scope.modal6.motivoCancelacion == undefined ||
          $scope.modal6.motivoCancelacion == "" ||
          $scope.modal6.observaciones == undefined ||
          $scope.modal6.observaciones == ""
        ) {
          swal({
            title: "¡Alerta!",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_modal6_motivoCancelacion_label",
              id_input: "id_modal6_motivoCancelacion",
            },
            {
              Codigo: "2",
              id_label: "id_modal6_observaciones_label",
              id_input: "id_modal6_observaciones",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: "P_U_CANCELACION",
              vpdocumento: $scope.documentoCancelacion,
              vpnumero: $scope.numeroreferenciaCancelacion,
              vprenglon: $scope.reglonCancelacion,
              vpmotivo: $scope.modal6.motivoCancelacion,
              vpobservacion: $scope.modal6.observaciones,
            },
          }).then(function ({ data }) {
            // console.log(data);
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              if (data.Codigo == 0) {
                swal("Notificación", data.Nombre, "success");
                $scope.busquedadetallegestionIps = "";
                $("#modalCancelacion").modal("close");
                $("#modaldetallegestionIps").modal("close");
                $scope.listrefrenciasActivas();
              } else {
                swal("Notificación", data.Nombre, "warning");
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.Set_Tab = function (x, grupo) {
        // console.log(x, grupo);
        $scope.grupos = grupo;
        $scope.Tabs = x;
        if (x == 1) {
          $scope.resumenCantidad(grupo);
          $scope.shw_parametros = false;
          $scope.limpiar("4");
        }
        if (x == 2) {
          $scope.listarmotivoderemisionActivos();
          $scope.limpiar("2");
          $scope.shw_parametros = false;
          $scope.limpiar("4");
          $scope.tituloprioridadReferencia = "";
        }
        if (x == 3) {
          $scope.filtrocheck_option.DOCUMENTO = "REFERENCIA";
          $scope.filtrocheck_option.ESTADO = "A";
          $scope.listrefrenciasActivas();
          $scope.Obtener_Tipos_Documentos();
          $scope.resumenCantidad(grupo);
          $scope.listarmotivoderechazoActivos();
          $scope.shw_parametros = false;
          $scope.limpiar("4");
          $scope.Vista1.Filtrar_tprincipal = "";
        }
        if (x == 4) {
          $scope.obtenerreporte();
          $scope.limpiar("4");
          // cargaAnnos();
        }
        if (x == 5) {
          $scope.listarlistaResumen();
          $scope.userAbrir = false;
          $scope.motivosAbrir = false;
          $scope.shw_parametros = false;
          $scope.limpiar("4");
        }
        if (x == 6) {
          $scope.shw_parametros = false;
          $scope.limpiar("4");
          $scope.limpiar("6");
          $scope.validacionDocumento = grupo.DOCUMENTO;
          $scope.validacionStatus = grupo.NOMBRE_STATUS;
          if (
            grupo.DOCUMENTO == "CONTRA REFERENCIA" &&
            grupo.NOMBRE_STATUS == "CERRADA"
          ) {
            swal({
              title: "Notificación",
              text: "No se permiten gestionar una contrarreferencia cerrada",
              type: "warning",
            });
            setTimeout(() => {
              $scope.listrefrenciasActivas();
              $scope.filtrocheck_option.ESTADO = "C";
            }, 1500);
          }
          if (
            grupo.DOCUMENTO == "REFERENCIA" &&
            grupo.NOMBRE_STATUS == "CERRADA"
          ) {
            swal({
              title: "Cargando...",
              allowEscapeKey: false,
              allowOutsideClick: false,
            });
            swal.showLoading();
            $http({
              method: "POST",
              url: "php/referencia/registroReferencia/registrodereferencia.php",
              data: {
                function: "validacion_contraReferencia",
                pcodigo: grupo.CODIGO,
              },
            }).then(function (response) {
              swal.close();
              if (response.data.CODIGO == "0") {
                swal({
                  title: "Notificación",
                  text: response.data.NOMBRE,
                  type: "warning",
                });
                setTimeout(() => {
                  $scope.Set_Tab("3");
                  $scope.listrefrenciasActivas();
                  $scope.filtrocheck_option.ESTADO = "C";
                }, 1500);
              } else {
                $scope.listarmotivodeRemision();
                $scope.codigoContrarreferencia = grupo.CODIGO;
                $scope.form4.tipoSolicitud = "CONTRARREFERENCIA";
                $scope.tipoSolicitud = "CF";
                $scope.epsReceptora = grupo.NIT_RECEPTORA;
                $http({
                  method: "POST",
                  url: "php/referencia/registroReferencia/registrodereferencia.php",
                  data: {
                    function: "obtenerAfiliados",
                    tipodocumento: grupo.TIPO_DOC,
                    documento: grupo.NUM_DOCUMENTO,
                    tiposolicitud: $scope.tipoSolicitud,
                  },
                }).then(function (response) {
                  if (response.data.CODIGO == 0) {
                    swal({
                      title: "Notificación",
                      text: response.data.NOMBRE,
                      type: "warning",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.limpiar("6");
                      $scope.Set_Tab("3");
                      $scope.$apply();
                    }, 1000);
                  } else {
                    $scope.listarmotivoderemisionActivos();
                    ($scope.form4.tipoDocumento = response.data.TipoDocumento),
                      ($scope.form4.numeroDocumento = response.data.Documento),
                      ($scope.form4.nombrePaciente =
                        response.data.NombreCompleto),
                      ($scope.form4.generoPaciente = response.data.Sexo),
                      ($scope.form4.edadPaciente = response.data.EdadAnhos),
                      ($scope.form4.nivelSisben = response.data.NIVEL),
                      ($scope.form4.regimenPaciente = response.data.Regimen),
                      ($scope.form4.codigoRegimen =
                        response.data.CodigoRegimen),
                      ($scope.form4.sexo = response.data.SexoCodigo),
                      ($scope.form4.edad = response.data.EdadDias),
                      ($scope.form4.seccionalPaciente =
                        response.data.Departamento),
                      ($scope.form4.codigoseccional =
                        response.data.cod_municipio);
                  }
                });
                $http({
                  method: "POST",
                  url: "php/referencia/registroReferencia/registrodereferencia.php",
                  data: {
                    function: "obtenerNombreIps",
                    ips: $scope.epsReceptora,
                  },
                }).then(function (response) {
                  swal.close();
                  $scope.form4.nombreIps = response.data[0].NOMBRE;
                  $scope.form4.nitIps = response.data[0].CODIGO;
                  $scope.form4.SeccionalIps = response.data[0].SECCIONAL;
                  $scope.form4.UbicacionIps = response.data[0].MUNICIPIO;
                });
              }
            });
          } else {
            setTimeout(() => {
              $scope.Set_Tab("3", grupo);
              $scope.$apply();
            }, 1200);
            swal({
              title: "Notificación",
              text: "No se permiten gestionar una contrarreferencia",
              type: "warning",
            }).catch(swal.noop);
            return;
          }
        }
        if (x == 7) {
          $scope.shw_parametros = false;
          $scope.limpiar("4");
          $scope.limpiar("7");
          $scope.cargaAnnos();
        }
      };
      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable]
            .toString()
            .replace(/[^0-9]/g, ""); // (564) 564 - 4564
          $scope[form][variable] = valor;
          const input = $scope[form][variable]
            .toString()
            .replace(/\D/g, "")
            .substring(0, 10); // 1234567890
          const zip = input.substring(0, 3); //123
          const middle = input.substring(3, 6); //456
          const last = input.substring(6, 10); //7890
          if (input.length > 6) {
            $scope[form][variable] = `(${zip}) ${middle} - ${last}`;
          } else if (input.length > 3) {
            $scope[form][variable] = `(${zip}) ${middle}`;
          } else if (input.length > 0) {
            $scope[form][variable] = `(${zip}`;
          }
          if (input.length >= 2 && zip.substring(0, 2).toString() != "60") {
            swal(
              "Mensaje",
              "El teléfono debe contener la siguiente estructura: (60) + el indicativo de la ciudad + el número del teléfono",
              "info"
            ).catch(swal.noop);
          }
        } else {
          $scope[form][variable] = "";
        }
      };
      $scope.Tab_motivos = function (x, motivo) {
        // console.log(x, motivo);
        $scope.listarmotivodeRemision(motivo);
        $scope.Tabsmotivos = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      };
      $scope.horaMilitar = function (NID) {
        // console.log(NID);
        document
          .getElementById("" + NID + "")
          .addEventListener("input", function () {
            var value = this.value.trim();
            var militaryRegex = /^([01]?[0-9]|2[0-3]):?[0-5]?[0-9]?$/;
            // Separar automáticamente la hora con ":" después de que el usuario haya ingresado dos números (horas)
            if (value.length === 2 && !value.includes(":")) {
              value += ":";
            }
            if (!value.match(militaryRegex)) {
              swal({
                title: "Notificación",
                text: '"Por favor, ingrese una hora válida en formato militar (HH:mm)."',
                type: "error",
              }).catch(swal.noop);
              return;
            }
            this.value = value; // Actualizar el valor del campo de entrada
            // console.log(this.value.length);
          });
      };
      $scope.validarhoraMilitar = function (NID) {
        // console.log(NID);
        if (NID == undefined || NID == "") {
          swal({
            title: "Notificación",
            text: '"Por favor, valide si la hora optenida es la que desea."',
            type: "error",
          }).catch(swal.noop);
          return;
        }
        if (NID.length < 5) {
          swal({
            title: "Notificación",
            text: '"Por favor, complete hora en formato militar (HH:mm)."',
            type: "error",
          }).catch(swal.noop);
          return;
        }
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      };
      $scope.formatTexto = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, "");
        valor = valor.replace(/(\r\n|\n|\r)/g, " ");
        input.value = valor.toString().toUpperCase();
      };
      /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
      $scope.filtro_tabs = function () {
        var datos = [];
        if ($scope.filtrocheck_option && $scope.filtrocheck_option.ESTADO) {
          // if(fil == 1){
          //   $scope.filtrocheck_option.DOCUMENTO == '';
          //   $scope.filtrocheck_option.ESTADO == 'A';

          // }
          $scope.Vista1_datos.forEach((element) => {
            //estado si - documento no
            if (
              $scope.filtrocheck_option.ESTADO &&
              $scope.filtrocheck_option.DOCUMENTO == "" &&
              element.ESTADO == $scope.filtrocheck_option.ESTADO
            ) {
              datos.push(element);
            }
            //estado no - documento si
            if (
              $scope.filtrocheck_option.ESTADO == "" &&
              $scope.filtrocheck_option.DOCUMENTO &&
              element.DOCUMENTO == $scope.filtrocheck_option.DOCUMENTO
            ) {
              datos.push(element);
            }
            //estado si - documento si
            if (
              $scope.filtrocheck_option.ESTADO &&
              $scope.filtrocheck_option.DOCUMENTO &&
              element.DOCUMENTO == $scope.filtrocheck_option.DOCUMENTO &&
              element.ESTADO == $scope.filtrocheck_option.ESTADO
            ) {
              datos.push(element);
            }
          });
        }
        setTimeout(() => {
          $scope.list_DatosTemp = datos;
          $scope.configPages();
          $scope.$apply();
        }, 1000);
      };
      $scope.chg_filtrar = function (varFiltro) {
        if (
          $scope.Vista1[varFiltro] == "" ||
          $scope.Vista1[varFiltro] == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Por favor digite que desea buscar..",
            type: "warning",
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = "";
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter("filter")(
            $scope.Vista1_datos,
            $scope.Vista1[varFiltro]
          );
          $scope.configPages();
          varFiltro = "";
          $scope.Vista1.Filtrar_tconsulta = "";
        }
      };
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      };
      $scope.initPaginacion2 = function (valor) {
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
      };
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) >
            $scope.valmaxpag
          ) {
            if ($scope.pageSize * 10 < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          } else {
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
          }
        } else {
          if (
            ini >=
            Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) -
              $scope.valmaxpag
          ) {
            ini =
              Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) -
              $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) {
          $scope.currentPage = 0;
        }
      };
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt(
            $scope.list_DatosTemp.length / $scope.pageSize
          );
        } else {
          var tamanomax =
            parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = $scope.pages.length + i - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      };
      $scope.paso = function (tipo) {
        if (tipo == "next") {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt(
              $scope.list_DatosTemp.length / $scope.pageSize
            );
          } else {
            var tamanomax =
              parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
      };
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }
      };
      // funcion para contar cada caracter de de una observacion
      $scope.handleKeyPress = function (e, form) {
        // console.log(e, form);
        if (
          $scope[form].observaciones == null ||
          $scope[form].observaciones == undefined ||
          $scope[form].observaciones == ""
        ) {
          $scope.count = 0;
        }
        if ($scope[form].observaciones.length < $scope.count) {
          $scope.count = $scope[form].observaciones.length;
        } else $scope[form].observaciones.length > $scope.count;
        {
          $scope.count = $scope[form].observaciones.length;
        }
        if (e.keyCode == 8) {
          if ($scope.count == 0) {
            $scope.count = 0;
          } else {
            $scope.count = $scope.count - 1;
          }
        } else {
          $scope.count = $scope.count + 1;
        }
      };
      $scope.validarVacio = function (id, label) {
        // console.log("id", id, "label", label);
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      $scope.validarllenos = function (id, label) {
        // console.log("id", id, "label", label);
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else if (Texto != null) {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $(".tooltipped").tooltip({ delay: 50 });
      });
    },
  ])
  .filter("formatoHora", function () {
    // Filtro personalizado para formatear la hora
    return function (input) {
      if (input == undefined) {
      } else {
        // Formato de 12 horas
        // return input.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
        // Formato de 24 horas
        return input.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    };
  })
  .directive("textUpper", function () {
    return {
      require: "ngModel",
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
      },
    };
  })
  .filter("inicio", function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    };
  });
