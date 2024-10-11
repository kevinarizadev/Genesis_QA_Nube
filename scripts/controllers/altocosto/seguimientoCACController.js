"use strict";
angular
  .module("GenesisApp")
  .controller("seguimientoCACController", ["$scope", "consultaHTTP", "$http", "$timeout", "afiliacionHttp", "ngDialog", "$filter", "$q",
    function ($scope, consultaHTTP, $http, $timeout, afiliacionHttp, ngDialog, $filter, $q) {
      $scope.Inicio = function () {
        $scope.list_siniestro = [];
        $scope.seguimientoId = '';
        $scope.list_DatosTemp = [];
        $scope.observacion = [];
        $(".tabs").tabs();
        $(".modal").modal();
        $scope.control_vista_Tabs('resumen');
        $scope.tablaGestion = false;
        $scope.tablaseguimientoTelefonico = false;
        $scope.show_Preguntas = false;
        $scope.verinfoAfiliado = false;
        $scope.vistaseguimientoTelefonico = false;
        $scope.listatabladegestionLlamadas = false;
        $scope.tablagestionLlamadas = false;
        $scope.vistabuscarGestion = false;
        $scope.listatabladellamadasPendientes = false;
        $scope.vistabusquedaSeguimiento = false;
        $scope.vistabuscarGestion = false;
        $scope.resumenCohorte = false;
        $scope.vista_nuevoafiliadoSeguimiento = false;
        $scope.preguntasGestion = false;
        $scope.list_busquedaSeguimiento = [];
        $scope.vista_nuevoafiliadoGestion = false;
        $scope.limpiar("nuevoAfiliadoFormSeguTele");
        $scope.limpiar("nuevoAfiliadoFormgestionLlamada");
        $scope.limpiar("nuevoAfiliadoFormgestionManual");
        $scope.limpiar("casosCerrados");
        $scope.limpiar("filtroGestion");
        $scope.limpiar("buscar1");
        $scope.limpiar("buscar2");
        $scope.limpiar("buscar3");
        $scope.limpiar("observacionesSeguimiento");
        $scope.limpiar("observacionesSeguimiento2");
        $scope.limpiar("consulcasocerrado");
        $scope.limpiar("consulgestion");
        $scope.limpiar("seguimiento");
        $scope.seguimiento = {
          observacion: "",
        };
        $scope.filtrar = {
          paginacionCerrados: 10,
          mostrarSeguimiento: 10,
        };
        $scope.selectedDomiciliaria = "";

      };
      $scope.control_vista_Tabs = function (vista) {
        //console.log(vista);
        $scope.vista = vista;
        if (vista == "resumen") {
          $scope.enSeguimiento = false;
          $scope.listatablaenseguimiento = false;
          $scope.verpreguntas_seguimiento = [];
          $scope.show_preguntas_seguimiento = false;
          $scope.formSeguimiento = [];
          $scope.resumenRegional = true;
          $scope.resumenCohorte = false;
          $scope.show_Preguntas = false;
          $scope.vistabuscarGestion = false;
          $scope.vistacasosenSeguimiento = false;
          $scope.vistaseguimientoTelefonico = false;
          $scope.vistacasosCerrarados = false;
          $scope.resumenFuentes = false;
          $scope.preguntasGestion = false;
          $scope.preguntasSeguimientoTelefonico = false;
          $scope.resumenRegionales();
        } else if (vista == "tablaSeguimiento") {
          $scope.enSeguimiento = true;
          $scope.verpreguntas_seguimiento = [];
          $scope.show_preguntas_seguimiento = false;
          $scope.formSeguimiento = [];
          $scope.resumenRegional = false;
          $scope.list_DatosTemp = [];
          $scope.Tipos_Documentos = [];
          $scope.show_Preguntas = false;
          $scope.preguntasGestion = false;
          $scope.tablaGestion = false;
          $scope.tablaseguimientoTelefonico = true;
          $scope.vistabuscarGestion = false;
          $scope.vistacasosenSeguimiento = false;
          $scope.vistacasosCerrarados = false;
          $scope.vistaseguimientoTelefonico = true;
          $scope.vista_nuevoafiliadoSeguimiento = false;
          $scope.vista_filtroSeguimiento = false;
          $scope.listatabladellamadasPendientes = false;
          $scope.vistabusquedaSeguimiento = false;
          $scope.preguntasSeguimientoTelefonico = false;
          $scope.resumenCohorte = false;
          $scope.resumenFuentes = false;
          $scope.filtrocheck_option = "";
          $scope.verinfoAfiliado = false;
          $scope.resumenFuentes = false;
          $scope.limpiar("nuevoAfiliadoFormSeguTele");
          $scope.listatablaenseguimiento = false;
        } else if (vista == "tablacasoCerrado") {
          $scope.enSeguimiento = false;
          $scope.listatablaenseguimiento = false;
          $scope.verpreguntas_seguimiento = [];
          $scope.show_preguntas_seguimiento = false;
          $scope.preguntasGestion = false;
          $scope.formSeguimiento = [];
          $scope.limpiar("buscar3");
          $scope.Obtener_Tipos_Documentos();
          $scope.resumenRegional = false;
          $scope.list_DatosTemp = [];
          $scope.Tipos_Documentos = [];
          $scope.vistaseguimientoTelefonico = false;
          $scope.resumenCohorte = false;
          $scope.vistacasosenSeguimiento = false;
          $scope.vistabuscarGestion = false;
          $scope.vistacasosCerrarados = true;
          $scope.vista_consultacasoCerrado = true;
          $scope.resumenFuentes = false;
          $scope.vista_exportarcasoCerrado = false;
          $scope.preguntasSeguimientoTelefonico = false;
          // $scope.Obtene_casosCerrados();
          // $('#tabs_4').click();
        } else if (vista == "tablaGestion") {
          $scope.enSeguimiento = false;
          $scope.verpreguntas_seguimiento = [];
          $scope.show_preguntas_seguimiento = false;
          $scope.listatablaenseguimiento = false;
          $scope.limpiar("filtroGestion");
          $scope.limpiar("nuevoAfiliadoFormgestionManual");
          $scope.limpiar("nuevoAfiliadoFormgestionLlamada");
          $scope.limpiar("consulgestion");
          // $scope.botondecontroldeProcesos('gestionLlamadas');
          $scope.seguimientoId = '';
          // $scope.listatabladegestionLlamadas = false;
          // $scope.listatabladegestionManual = true;
          // $scope.requerimientopendiente = true;
          // $scope.Condicion = false;
          $scope.vista_nuevoafiliadoManual = false;
          $scope.gestionllamadaManual = true;
          $scope.activacionselect_requerimientoPendiente = 'A';
          // $scope.vista_boton_nuevagestionGestion = false;
          // $scope.vista_boton_nuevagestionManual = true;
          $scope.vista_nuevoafiliadoGestion = false;
          $scope.Obtener_Gestion();
          $scope.Obtener_Tipos_Documentos();
          $scope.listaselectMarcacion();
          $scope.listatabladegestionLlamadas = true;
          $scope.listatabladegestionManual = false;
          // $scope.requerimientopendiente = false;
          // $scope.Condicion = true;
          $scope.gestionllamada = true;
          // $scope.gestionmanual = false;
          // $scope.vista_boton_nuevagestionGestion = true;
          // $scope.vista_boton_nuevagestionManual = false;
          $scope.preguntasGestion = false;
          $scope.formSeguimiento = [];
          $scope.resumenRegional = false;
          $scope.show_Preguntas = false;
          $scope.vistabuscarGestion = false;
          // $scope.listatabladegestionLlamadas = false;
          $scope.vistaseguimientoTelefonico = false;
          $scope.tablaGestion = true;
          // $scope.listatabladegestionManual = false;
          $scope.tablaseguimientoTelefonico = false;
          $scope.resumenCohorte = false;
          $scope.resumenFuentes = false;
          $scope.preguntasSeguimientoTelefonico = false;
          $scope.list_DatosTemp = [];
        }
      }
      $scope.exportarcasocerradoExcel = function () {
        // $http({
        //   method: "POST",
        //   url: "php/altocosto/seguimientoCAC.php",
        //   data: {
        //     function: "exportarcasosCerrados",
        //     VPCOHORTE: $scope.consulcasocerrado.cohorte,
        //     VPREGIONAL: $scope.consulcasocerrado.regional,
        //     VPFECHA1:$scope.formatDatefecha($scope.consulcasocerrado.fechaInicio),
        //     VPFECHA2: $scope.formatDatefecha($scope.consulcasocerrado.fechaFinal)
        //   },
        // }).then(function ({ data }) {
        //   swal.close();
        // if (data && data.toString().substr(0, 3) != "<br") {
        //   $scope.exportar = data;
        //   console.log($scope.exportar);
        if ($scope.consulcasocerrado.cohorte == '' || $scope.consulcasocerrado.regional == '' || $scope.consulcasocerrado.fechaInicio == '' || $scope.consulcasocerrado.fechaFinal == '') {
          swal('Información', "Por favor digite información para poder generar el reporte", 'info');
          return
        } else {
          var fecha_inicial = $scope.formatDatefecha($scope.consulcasocerrado.fechaInicio);
          var fecha_final = $scope.formatDatefecha($scope.consulcasocerrado.fechaFinal);
          window.open('views/altocosto/formatos/reportecasosCerrados.php?cohorte=' + $scope.consulcasocerrado.cohorte + '&regional=' + $scope.consulcasocerrado.regional + '&fechainical=' +
            fecha_inicial + '&fechafinal=' + fecha_final);

          swal({
            title: "Mensaje",
            text: "Reporte Generado",
            type: "success",
          });
          $scope.limpiar('consulcasocerrado');
        }
        // } else {
        //   swal({
        //     title: "¡Ocurrio un error!",
        //     text: data,
        //     type: "warning",
        //   }).catch(swal.noop);
        // }
        // });
      }
      $scope.exportargestionExcel = function () {
        if ($scope.consulgestion.fechaInicio == '' || $scope.consulgestion.fechaFinal == '') {
          swal('Información', "Por favor digite información para poder generar el reporte", 'info');
          return
        } else {
          var fecha_inicial = $scope.formatDatefecha($scope.consulgestion.fechaInicio);
          var fecha_final = $scope.formatDatefecha($scope.consulgestion.fechaFinal);
          window.open('views/altocosto/formatos/reportecasosenGestion.php?fechainical=' +
            fecha_inicial + '&fechafinal=' + fecha_final);

          swal({
            title: "Mensaje",
            text: "Reporte Generado",
            type: "success",
          });
          $scope.limpiar('consulgestion');
        }
      }
      $scope.lista_Regional = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "listaRegional",
          },
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.listRegionales = data;
            //console.log($scope.listRegionales);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      $scope.lista_Cohortes = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "listaCohorte",
          },
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.listCohortes = data.Cohortes;
            //console.log($scope.listCohortes);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      $scope.resumenRegionales = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_Regionales",
          },
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.list_resumen_regional = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      $scope.limpiar = function (Tabs) {
        //console.log(Tabs);
        switch (Tabs) {
          case "nuevoAfiliadoFormSeguTele":
            $scope.listatablaenSeguimiento = false;
            $scope.list_siniestro = [];
            $scope.list_DatosTemp = [];
            $scope.nuevoAfiliadoFormSeguTele = {
              tipoDocumento: "",
              numDocumento: "",
              cohortes: "",
              clasificacion: "",
              marca: "",
            };
            break;
          case "casosCerrados":
            $scope.filtro = {
              filtrarcasosCerrados: "",
            };
            break;
          case "filtroGestion":
            $scope.filtro = {
              bucartablaGestion: "",
            };
            break;
          case "buscar1":

            $scope.buscar1 = {
              tipoSolicitud: "ND",
              Tipo_Doc: "",
              Num_Doc: "",
              siniestro: "",
              estado: "",
            };
            break;
          case "buscar2":
            $scope.buscar2 = {
              tipoSolicitud: "ND",
              Tipo_Doc: "",
              Num_Doc: "",
              siniestro: "",
              estado: "",
            };
            break;
          case "buscar3":
            $scope.list_DatosTemp = [];
            $scope.buscar3 = {
              Tipo_Doc: "",
              Num_Doc: "",
            };
            break;
          case "nuevoAfiliadoFormgestionLlamada":
            $scope.list_siniestro = [];
            $scope.nuevoAfiliadoFormgestionLlamada = {
              tipoDocumento: "",
              numDocumento: "",
              cohortes: "",
              clasificacion: "",
              siniestro: "",
              marca: "",
            };
            break;
          case "nuevoAfiliadoFormgestionManual":
            $scope.list_siniestro = [];
            $scope.nuevoAfiliadoFormgestionManual = {
              tipoDocumento: "",
              numDocumento: "",
              cohortes: "",
              clasificacion: "",
              siniestro: "",
              marca: "",
              tipo_marcacion: "",
              observacion:""
            };
            break;
          case "observacionesSeguimiento":
            $scope.modal1 = {
              observacion: "",
            };
            break;
          case "observacionesSeguimiento2":
            $scope.modal2 = {
              observacion: "",
            };
            break;
          case "consulcasocerrado":
            $scope.consulcasocerrado = {
              fechaInicio: "",
              fechaFinal: "",
              cohorte: "",
              regional: "",
            };
            break;
          case "consulgestion":
            $scope.consulgestion = {
              fechaInicio: "",
              fechaFinal: "",
            };
            break;
          case "seguimiento":
            $scope.seguimiento = {
              observacion: "",
            };
            break;
        }
      }
      $scope.consulta_formulario = function (x) {
       // console.log(x);
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_RESPUESTA_PREGUNTA_SN",
            VPSINIESTRO: x.NO_DE_SINIESTRO || x.NUMEROSINIESTRO,
            VIDGESTION: x.IDGESTION
          },
        }).then(function ({ data }) {
          //console.log(data);
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.verPreguntas = data;
            $scope.vistacasosCerrarados = false;
            $scope.vistacasosenSeguimiento = false;
            $scope.listatablaenSeguimiento = false;
            $scope.show_Preguntas = true;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.consulta_formularioSeguimiento = function (x) {
        $scope.verpreguntas_seguimiento = [];
        $scope.modal2.observacion = '';
        //console.log(x);
        $scope.agregar_observacionSeguimiento(x);
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_RESPUESTA_PREGUNTA_SN",
            VPSINIESTRO: x.NUMEROSINIESTRO,
            VIDGESTION: x.IDGESTION
          },
        }).then(function ({ data }) {
          //console.log(data);
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.verpreguntas_seguimiento = data;
            $scope.vistacasosCerrarados = false;
            $scope.vistacasosenSeguimiento = false;
            $scope.listatablaenSeguimiento = false;
            $scope.show_preguntas_seguimiento = true;

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.agregar_observacionSeguimiento = function (x) {
        $scope.inf_1 = x;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "obervacionSeguimiento",
            PNUNUMERO: x.IDSEGUIMIENTO
          },
        }).then(function ({ data }) {
         // console.log(data);
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.inf_2 = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.consulta_observacion_de_Segumiento = function (data) {
        $scope.modal1.observacion = [];
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "consultaobservaciondeSegumiento",
            PIIDSEGUIMIENTO: data.IDSEGUIMIENTO,
            PISINISTESTRO: data.NUMEROSINIESTRO
          },
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.modal1.observacion = data[0].Descripcion;

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.resumencohorteGeneral = function (info) {
        $scope.textRegonal = info.REGIONAL;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_Cohorte",
            vregonal: $scope.textRegonal
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.list_resumen = response.data;
            $scope.resumenCohorte = true;
            $scope.resumenRegional = false;
            $scope.resumenFuentes = false;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      $scope.resumenestadoGestion = function (info) {
        $scope.estadoGestion = info.REGIONAL;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_estado_Gestion",
            vregonal: $scope.estadoGestion
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if (response.data.Codigo == 0) {
              swal({
                title: "¡Info!",
                text: response.data.Nombre,
                type: "info",
              }).catch(swal.noop);
              return
            } else {
              $scope.list_resumen_pendiente = response.data;
              $scope.estadoFuente = response.data[0].ESTADO;
              $scope.resumenFuentes = true;
              $scope.resumenCohorte = false;
              $scope.resumenRegional = false;
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
      $scope.resumenestadoPendiente = function (info) {
        $scope.estadoPendiente = info.REGIONAL;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_estado_Pendiente",
            vregonal: $scope.estadoPendiente
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if (response.data.Codigo == 0) {
              swal({
                title: "¡Info!",
                text: response.data.Nombre,
                type: "info",
              }).catch(swal.noop);
              return
            } else {
              $scope.list_resumen_pendiente = response.data;
              $scope.estadoFuente = response.data[0].ESTADO;
              $scope.resumenFuentes = true;
              $scope.resumenCohorte = false;
              $scope.resumenRegional = false;
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
      $scope.resumenestadoSeguimiento = function (info) {
        $scope.estadoSeguimiento = info.REGIONAL;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_estado_Seguimiento",
            vregonal: $scope.estadoSeguimiento
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if (response.data.Codigo == 0) {
              swal({
                title: "¡Info!",
                text: response.data.Nombre,
                type: "info",
              }).catch(swal.noop);
              return
            } else {
              $scope.list_resumen_pendiente = response.data;
              $scope.estadoFuente = response.data[0].ESTADO;
              $scope.resumenFuentes = true;
              $scope.resumenCohorte = false;
              $scope.resumenRegional = false;
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
      $scope.resumenestadoCerrado = function (info) {
        $scope.estadoCerrado = info.REGIONAL;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "resumen_estado_Cerrado",
            vregonal: $scope.estadoCerrado
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if (response.data.Codigo == 0) {
              swal({
                title: "¡Info!",
                text: response.data.Nombre,
                type: "info",
              }).catch(swal.noop);
              return
            } else {
              $scope.list_resumen_pendiente = response.data;
              $scope.estadoFuente = response.data[0].ESTADO;
              $scope.resumenFuentes = true;
              $scope.resumenCohorte = false;
              $scope.resumenRegional = false;
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
      $scope.imagenesCohorte = function (data) {
        if (data === 'ARTRITIS') {
          return 'assets/images/Cohorte/bone-broken-broken.svg';
        } if (data === 'CANCER') {
          return 'assets/images/Cohorte/cancer.svg';
        } if (data === 'ENFERMEDAD RENAL') {
          return 'assets/images/Cohorte/renal.svg';
        } if (data === 'ENFERMEDADES HUERFANAS') {
          return 'assets/images/Cohorte/hands.svg';
        } if (data === 'HEMOFILIA') {
          return 'assets/images/Cohorte/hand-blood.svg';
        } if (data === 'HEPATITIS C') {
          return 'assets/images/Cohorte/liver.svg';
        } if (data === 'VIH') {
          return 'assets/images/Cohorte/vih.svg';
        } else {
          return 'assets/images/Cohorte/i-pathology.svg';
        }
      }
      //Codigo Pablo
      $scope.controdeVistas = function (accion) {
        if (accion == 'nuevoSeguimiento') {
          // $scope.Obtener_Seguimiento();
          $scope.limpiar("nuevoAfiliadoFormSeguTele");
          if ($scope.vista_nuevoafiliadoSeguimiento == false) {
            $scope.vista_nuevoafiliadoSeguimiento = true;
            $scope.vista_filtroSeguimiento = false;

            $scope.botondecontroldeProcesos('sg_nuevoAfiliado');
          } else {
            $scope.vista_nuevoafiliadoSeguimiento = false;

          }
        } if (accion == 'filtroSeguimiento') {
          if ($scope.vista_filtroSeguimiento == false) {
            $scope.vista_nuevoafiliadoSeguimiento = false;
            $scope.vista_filtroSeguimiento = true;
          } else {
            $scope.vista_filtroSeguimiento = false;
          }
        } if (accion == 'consultacasoCerrado') {
          if ($scope.vista_exportarcasoCerrado == false) {
            $scope.vista_exportarcasoCerrado = true;
            $scope.vista_consultacasoCerrado = false;
            $scope.lista_Cohortes();
            $scope.lista_Regional();
          } else {
            $scope.vista_consultacasoCerrado = false;
          }
        } if (accion == 'nuevagestionManual') {
          if ($scope.vista_nuevoafiliadoManual == false) {
            $scope.limpiar("nuevoAfiliadoFormgestionManual");
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.vista_nuevoafiliadoManual = true;
            $scope.vista_filtroGestion = false;
            $scope.vista_exportarGestion = false;
          } else {
            $scope.vista_nuevoafiliadoManual = false;
          }
        } if (accion == 'nuevaGestion') {
          $scope.limpiar("nuevoAfiliadoFormgestionLlamada");
          if ($scope.vista_nuevoafiliadoGestion == false) {
            $scope.vista_nuevoafiliadoGestion = true;
            $scope.vista_nuevoafiliadoManual = false;
            $scope.vista_filtroGestion = false;
            $scope.vista_exportarGestion = false;
            $scope.botondecontroldeProcesos('sg_nuevoAfiliadoGestion');
          } else {
            $scope.vista_nuevoafiliadoGestion = false;
          }
        }
        if (accion == 'filtroGestion') {
          if ($scope.vista_filtroGestion == false) {
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.vista_nuevoafiliadoManual = false;
            $scope.vista_filtroGestion = true;
            $scope.vista_exportarGestion = false;
          } else {
            $scope.vista_filtroGestion = false;
          }
        } if (accion == 'exportarGestion') {
          if ($scope.vista_exportarGestion == false) {
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.vista_nuevoafiliadoManual = false;
            $scope.vista_filtroGestion = false;
            $scope.vista_exportarGestion = true;

          } else {
            $scope.vista_exportarGestion = false;
          }
        }
      };
      $scope.botondecontroldeProcesos = function (accion) {
        //console.log(accion);
        switch (accion) {
          case "llamadasPendientes":
            // $scope.Obtene_P_Lista_Marca_Usuario();
            $scope.verpreguntas_seguimiento = [];
            $scope.show_preguntas_seguimiento = false;
            $scope.filtro.bucartablaseguimiento = '';
            $scope.listatabladegestionLlamadas = false;
            $scope.listatabladellamadasPendientes = true;
            $scope.listatablaenSeguimiento = false;
            $scope.vistabusquedaSeguimiento = false;
            $scope.vista_nuevoafiliadoSeguimiento = false;
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.verinfoAfiliado = false;
            $scope.vista_filtroSeguimiento = false;
            $scope.vista_exportarGestion = false;
            $scope.list_DatosTemp = [];
            $scope.Obtener_Seguimiento();
            $scope.Obtener_Tipos_Documentos();
            $scope.Obtener_listados();
            $scope.limpiar("nuevoAfiliadoFormSeguTele");

            break;
          case "enSeguimiento":
            $scope.verpreguntas_seguimiento = [];
            $scope.show_preguntas_seguimiento = false;
            $scope.Obtener_listaenSeguimiento();
            $scope.limpiar("nuevoAfiliadoFormSeguTele");
            $scope.filtro.bucartablaseguimiento = '';
            $scope.listatablaenSeguimiento = true;
            $scope.listatabladellamadasPendientes = false;
            $scope.vistabusquedaSeguimiento = false;
            $scope.vista_nuevoafiliadoSeguimiento = false;
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.verinfoAfiliado = false;
          case "sg_buscar":
            $scope.limpiar('buscar1');
            $scope.vistabusquedaSeguimiento = true;
            $scope.listatabladellamadasPendientes = false;
            break;
          case "gestionLlamadas_manual":
            $scope.seguimientoId = '';
            $scope.listatabladegestionLlamadas = false;
            $scope.listatabladegestionManual = true;
            // $scope.requerimientopendiente = true;
            // $scope.Condicion = false;
            $scope.gestionllamadaManual = true;
            $scope.activacionselect_requerimientoPendiente = 'A';
            // $scope.vista_boton_nuevagestionGestion = false;
            // $scope.vista_boton_nuevagestionManual = true;
            $scope.controdeVistas('nuevagestionManual');
            break;
          case "g_buscar":
            $scope.vista_filtroSeguimiento = true;
            $scope.listatablaPendientes = false;
            break;
          case "sg_nuevoAfiliado":
            $scope.nuevoAfiliado();
            $scope.filtrocheck_option = 'N';
            $scope.listatabladellamadasPendientes = true;
            $scope.vista_nuevoafiliadoSeguimiento = true;
            $scope.vista_nuevoafiliadoGestion = false;
            $scope.listatablaPendientes = false;
            $scope.vista_filtroSeguimiento = false;
            break;
          case "sg_nuevoAfiliadoGestion":
            $scope.nuevoAfiliado();
            $scope.filtrocheck_option = 'N';
            $scope.vista_nuevoafiliadoSeguimiento = false;
            $scope.vista_nuevoafiliadoGestion = true;
            $scope.listatablaPendientes = false;
            $scope.vista_filtroSeguimiento = false;
            $scope.listatabladellamadasPendientes = true;
            break;
          case "consultacasoCerrado":
            $scope.limpiar('buscar3');
            $scope.vistacasosCerrarados = true;
            $scope.vistacasosenSeguimiento = false;
            $scope.show_Preguntas = false;
            break;
        }

      }
      $scope.controldevistaInicial = function (accion) {
        if (accion == "CC") {
          $scope.vistacasosCerrarados = true;
          $scope.vistacasosenSeguimiento = false;
        } else if ("CS") {
          $scope.vistacasosCerrarados = false;
          $scope.vistacasosenSeguimiento = true;
        }
      }
      $scope.observaciones = [];
      $scope.trazabilidad = 0;
      $scope.textoColor = "black";
      $scope.bloquearDireccion = true;
      $scope.bloquearEdad = true;
      $scope.bloquearGenero = true;
      $scope.bloquearCorreo = true;
      $scope.bloquearCIE10 = true;
      $scope.bloquearPortabilidad = true;
      $scope.bloquearCohorte = true;
      $scope.bloquearClasifiacion = true;
      $scope.bloquearRegional = true;
      $scope.bloquearSiniestro = true;
      $scope.bloquearTipodoc = true;
      $scope.bloquearNumdoc = true;
      $scope.bloquearNombresyapellidos = true;
      $scope.bloquearPortabilidad = true;
      $scope.bloquearDescripcioPortabilidad = true;
      $scope.bloquearTelefono1 = true;
      $scope.bloquearTelefono2 = true;
      $scope.Modificado = false;
      $scope.bloquearCorreo = true;
      $scope.editartelefono1 = function () {
        $scope.Modificado = true;
        $scope.bloquearTelefono1 = false;
      };
      $scope.editartelefono2 = function () {
        $scope.Modificado = true;
        $scope.bloquearTelefono2 = false;
      };
      $scope.editarcorreo = function () {
        $scope.Modificado = true;
        $scope.bloquearCorreo = false;
      };
      $scope.Act_Zona = { Codigo: "" };
      $scope.ViaPrincipal = { Codigo: "" };
      $scope.Letra = { Codigo: "" };
      $scope.Cuadrante = { Codigo: "" };
      $scope.CuadranteVG = { Codigo: "" };
      $scope.SelectLetraVG = { Codigo: "" };
      $scope.Bis = false;
      $scope.validarCorreo = function () {
        let correo = $scope.formSeguimiento.CORREO;
        let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correo || !correoRegex.test(correo)) {
          // El correo electrónico es inválido
          $scope.correoInvalido = true;
        } else {
          // El correo electrónico es válido
          $scope.correoInvalido = false;
         // console.log("El correo electrónico es válido");
        }
      };
      $scope.validarTelefono1 = function () {
        $scope.formSeguimiento.TELEFONO1 =
          $scope.formSeguimiento.TELEFONO1.replace(/\D/g, "");
        let telefono1 = $scope.formSeguimiento.TELEFONO1;
        let telefonoRegex1 = /^3\d{0,9}$/;
        if (!telefono1 || !telefonoRegex1.test(telefono1)) {
          // El número de teléfono es inválido
          $scope.telefonoInvalido1 = true;
        } else {
          // El número de teléfono es válido
          $scope.telefonoInvalido1 = false;
          //console.log("El número de teléfono es válido");
        }
      };
      $scope.validarTelefono2 = function () {
        $scope.formSeguimiento.TELEFONO2 =
          $scope.formSeguimiento.TELEFONO2.replace(/\D/g, "");
        let telefono2 = $scope.formSeguimiento.TELEFONO2;
        let telefonoRegex2 = /^3\d{0,9}$/;
        if (!telefono2 || !telefonoRegex2.test(telefono2)) {
          // El número de teléfono es inválido
          $scope.telefonoInvalido2 = true;
        } else {
          // El número de teléfono es válido
          $scope.telefonoInvalido2 = false;
         // console.log("El número de teléfono es válido");
        }
      };
      $scope.Patologia_Afiliados = function (tipoDoc, doc) {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_PATOLOGIA_AFILIADOS",
            P_VC_TIPO_DOC: tipoDoc,
            P_VC_DOCUMENTO: doc,
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.patologiaAfiliados = response.data;
            //codigo pablo


            $scope.data_Cohorte = response.data[0].Cohorte;
            $scope.data_Tipodoc = response.data[0].Tipodoc;
            $scope.Numero_Documento = response.data[0].Numero_Documento;
            $scope.data_Apellidos = response.data[0].Apellidos;
            $scope.data_Nombres = response.data[0].Nombres;
            $scope.data_Ubicacion = response.data[0].Ubicacion;
            //codigo pablo
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      //Codigo Pablo
      $scope.mesadeAyuda = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "PMESA_AYUDA",
            vcohorte: $scope.data_Cohorte,
            vusuario: sessionStorage.getItem("cedula"),
            vtipodocumento: $scope.data_Tipodoc,
            vpcedula: $scope.Numero_Documento,
            vpapellido: $scope.data_Apellidos,
            vnombres: $scope.data_Nombres,
            vubicacion: $scope.data_Ubicacion,
            vpobservacion: $scope.seguimiento.observacion,
          },
        }).then(function (response) {
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            //console.log(response);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      //Codigo Pablo
      $scope.dataSiniestro = function (siniestro) {
        $scope.idSeguimiento = siniestro.IDSEGUIMIENTO;
       // console.log($scope.idSeguimiento);
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_SESION",
            P_NU_NUMERO: siniestro.IDSEGUIMIENTO,
            P_V_USUARIO: sessionStorage.getItem("usuario"),
          },
        }).then(function (response) {
          //console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if (response.data.Codigo == 1) {
              swal({
                title: "¡Mensaje!",
                text: response.data.mensaje,
                type: "warning",
              }).catch(swal.noop);
              // setTimeout(() => {
              //   $scope.$apply();
              //   $scope.control_vista_Tabs('llamadasPendientes');
              //   // $scope.botondecontroldeProcesos('gestionLlamadas');
              // }, 2000);
              return
            } else {
              // $scope.preguntasSeguimientoTelefonico = true;
              $scope.cant_llamadas = response.data.IntentoLLamadas;
             // console.log($scope.cant_llamadas);

              $scope.obtener_preguntas();
              $scope.listatabladellamadasPendientes = false;
              $scope.verinfoAfiliado = true;
              // $scope.tablaSeguimiento = true;
              $scope.formSeguimiento = siniestro;
              $scope.selectedEstado = "";
              //$scope.seguimiento.observacion = "";
              $scope.selectedResponsable = "";
              $scope.formSeguimiento.NombreCompleto = siniestro.NOMBRES + " " + siniestro.APELLIDOS;
              $scope.Patologia_Afiliados(
                siniestro.TIPODOCUMENTO,
                siniestro.NUMDOCUMENTO
              );
              $scope.P_ST_INICIAR_GESTION(siniestro.IDSEGUIMIENTO);
              $scope.trazabilidad = 0;

            }
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      // Modal nuevo afiliado
      $scope.nuevoAfiliado = function () {
        setTimeout(() => {
          $scope.filtrocheck_option = "";
          $scope.$apply();
        }, 1000);
        $scope.Obtene_P_Lista_Marca_Usuario();
        $scope.MPFiltrar_Diag = "";
        // $scope.dialogNuevoAfiliado = ngDialog.open({
        //   template: "views/altocosto/modal/modalNuevoAfiliado.html",
        //   className: "ngdialog-theme-plain",
        //   controller: "seguimientoCACController",
        //   scope: $scope,
        // });
      };
      $scope.enviarAfiliado = function () {
        if ($scope.nuevoAfiliadoFormSeguTele.tipoDocumento == null || $scope.nuevoAfiliadoFormSeguTele.tipoDocumento == undefined || $scope.nuevoAfiliadoFormSeguTele.tipo == ''
          || $scope.nuevoAfiliadoFormSeguTele.numDocumento == null || $scope.nuevoAfiliadoFormSeguTele.numDocumento == undefined || $scope.nuevoAfiliadoFormSeguTele.numDocumento == ''
          || $scope.nuevoAfiliadoFormSeguTele.cohortes == null || $scope.nuevoAfiliadoFormSeguTele.cohortes == undefined || $scope.nuevoAfiliadoFormSeguTele.cohortes == ''
          || $scope.nuevoAfiliadoFormSeguTele.clasificacion == null || $scope.nuevoAfiliadoFormSeguTele.clasificacion == undefined || $scope.nuevoAfiliadoFormSeguTele.clasificacion == ''
          || $scope.nuevoAfiliadoFormSeguTele.marca == null || $scope.nuevoAfiliadoFormSeguTele.marca == undefined || $scope.nuevoAfiliadoFormSeguTele.marca == '') {
          swal({
            title: "¡Mensaje!",
            text: "Ingrese la informacion en los campos requeridos (*).",
            type: "warning",
          }).catch(swal.noop);
          return;
        } else {

          swal({
            title: "Cargando",
            html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: "#fff",
            showCloseButton: false,
          });

          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_ST_GET_EAFI_AFILIADOS",
              ...$scope.nuevoAfiliadoFormSeguTele,
            },
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != "<br") {

              if (Number(response.data.Codigo) === 2) {
                $scope.dialogNuevoAfiliado = ngDialog.close({
                  template: "views/altocosto/modal/modalNuevoAfiliado.html",
                  className: "ngdialog-theme-plain",
                  controller: "seguimientoCACController",
                  scope: $scope,
                });
                $scope.filtrado();
                swal.close();
                swal({
                  title: "¡Mensaje!yyy",
                  text: response.data.Descripcion,
                  type: "success",
                }).catch(swal.noop);
                $scope.dialogNuevoAfiliado.close();
                $scope.Inicio();
                setTimeout(() => {
                  $scope.$apply();
                  $scope.control_vista_Tabs('tablaSeguimiento');
                  $scope.botondecontroldeProcesos('llamadasPendientes');
                  // $scope.botondecontroldeProcesos('g_gestionLlamadas');
                }, 2000);
              }
              if (Number(response.data.Codigo) === 0) {
                swal({
                  title: "¡Mensaje!",
                  text: response.data.Descripcion,
                  type: "success",
                }).catch(swal.noop);
                // $scope.dialogNuevoAfiliado.close();
                // $scope.dialogNuevoAfiliado = ngDialog.close({
                //   template: "views/altocosto/modal/modalNuevoAfiliado.html",
                //   className: "ngdialog-theme-plain",
                //   controller: "seguimientoCACController",
                //   scope: $scope,
                // });
                $scope.Inicio();
                setTimeout(() => {
                  $scope.$apply();
                  $scope.control_vista_Tabs('tablaSeguimiento');
                  $scope.botondecontroldeProcesos('llamadasPendientes');
                  // $scope.botondecontroldeProcesos('g_gestionLlamadas');
                }, 1000);
              } else {
                swal({
                  title: "¡Mensaje!",
                  text: response.data.Descripcion,
                  type: "warning",
                }).catch(swal.noop);
                // $scope.dialogNuevoAfiliado.close();
                // $scope.dialogNuevoAfiliado = ngDialog.close({
                //   template: "views/altocosto/modal/modalNuevoAfiliado.html",
                //   className: "ngdialog-theme-plain",
                //   controller: "seguimientoCACController",
                //   scope: $scope,
                // });
              }

            } else {
              swal({
                title: "¡Mensaje!",
                text: "Ha ocurrido un error de conexión.",
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      // Validar campos
      $scope.validateFiels = function (obj) {
        let objProp = Object.values(obj).every((value) => {
          if (value === null || value === undefined || value === false) {
            return false;
          }
          return true;
        });
        return objProp;
      };
      $scope.AbrirModalDireccion = function () {
        $scope.bloquearCampodirrecion = false;
        $scope.dialogDiagreg = ngDialog.open({
          template: "views/altocosto/modal/modalDireccion.html",
          className: "ngdialog-theme-plain",
          controller: "seguimientoCACController",
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope,
        });
        $scope.dialogDiagreg.closePromise.then(function (data) {
          if (data.value != "$closeButton") {
            $scope.Act_Direccion2 = data.value;
            $scope.formSeguimiento.DIRECCION = $scope.Act_Direccion2;
            $scope.Localaidad2 = $("#barrio").val();
            $scope.Act_Barrio = $scope.Localaidad2;
          } else {
            $scope.Act_Direccion;
            $scope.Act_Barrio = $scope.barrio;
          }
        });
      };
      $scope.SetTab = function (x) {
        //console.log(x);
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      };
      //listados
      $scope.Obtener_Tipos_Documentos = function () {
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
      $scope.Obtene_P_Lista_Cohortes = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "ObtenePListaCohortes",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.list_cohortes = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.Obtene_P_Lista_Clasificacion = function (datos) {
        $scope.pruebas = $scope.nuevoAfiliadoFormSeguTele.cohortes;
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "ObtenePListaClasificacion",
            vpcohorte: datos,
          },
        }).then(function (response) {
         // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.list_clasificacion = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.Obtene_P_Lista_Marca_Usuario = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "ObtenePListaMarcaUsuario",
          },
        }).then(function (response) {
          //console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.list_marca = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.lista_requerimiento_Pendiente = function (x) {
        //console.log(x);
        $scope.info1 = x;
        if ($scope.info1 == '' || $scope.info1 == undefined) {
          return
        } else {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "listarequerimientoPendiente",
              VPCOHORTE: $scope.info1,
            },
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != "<br") {
              $scope.listrequerimientoPendiente = data;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.listar_motivos_Estudio = function (x) {
        //console.log(x);
        $scope.info2 = x;
        if ($scope.info2 == '' || $scope.info2 == undefined) {

          return
        } else {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "listarmotivosEstudio",
              VPCOHORTE: $scope.info2,
            },
          }).then(function ({ data }) {
            swal.close();
            if (data && data.toString().substr(0, 3) != "<br") {
              $scope.listmotivosEstudio = data;
              //console.log($scope.listmotivosEstudio);
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });

        }
      }
      $scope.preguntasgestionManual = function (data1, data2) {
       // console.log(data1, data2);
        $scope.data_PVDOCUMENTO = data1;
        $scope.data_VVCCOHORTE = data2;
        if ($scope.data_PVDOCUMENTO == '' || $scope.data_PVDOCUMENTO == undefined || $scope.data_VVCCOHORTE == '' || $scope.data_VVCCOHORTE == undefined) {

          return
        } else {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION_MANUAL",
              PVDOCUMENTO: $scope.data_PVDOCUMENTO,
              VVCCOHORTE: $scope.data_VVCCOHORTE,
            },
          }).then(function ({ data }) {
            //console.log(data);
            swal.close();
            if (data && data.toString().substr(0, 3) != "<br") {
              $scope.id_observaciondeGestion = data[0].preguntas[0].id;
              $scope.id_tipopreguntadegestionObservacion = data[0].preguntas[0].idTipoPregunta;
              $scope.nombreobservaciondeGestion = data[0].preguntas[0].pregunta;
              $scope.id_fechadeGestion = data[0].preguntas[1].id;
              $scope.id_tipopreguntadegestionFecha = data[0].preguntas[1].idTipoPregunta;
              $scope.nombrefechadeGestion = data[0].preguntas[1].pregunta;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.Obtener_Consulta_Siniestro = function (varFilter) {
        if (
          $scope[varFilter].tipoDocumento == "" ||
          $scope[varFilter].tipoDocumento == null ||
          $scope[varFilter].numDocumento == "" ||
          $scope[varFilter].numDocumento == null
        ) {
          swal({
            title: "Notificación",
            text: "No hay se visualizara informacion si no llena los campos requeridos (*)",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_CONSULTA_SINIESTRO",
              vptipodoc: $scope[varFilter].tipoDocumento,
              vpnumdoc: $scope[varFilter].numDocumento,
            },
          }).then(function (response) {
           // console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != "<br") {
              if (response.data[0].Codigo == 1) {

                swal({
                  title: "¡Atencion!",
                  text: response.data[0].Nombre,
                  type: "warning",
                }).catch(swal.noop);
                return

              } else {


                if(response.data[0].ESTADO_AFILIADO == 'FALLECIDO' ){
                  swal({
                    title: "¡Atencion!",
                    text: 'No se puede agregar una gestion a un afiliado fallecido',
                    type: "warning",
                  }).catch(swal.noop);
                  return
                
                } if(response.data[0].ESTADO_AFILIADO == 'RETIRADO' ){
                  swal({
                    title: "¡Atencion!",
                    text: 'No se puede agregar una gestion a un afiliado retirado',
                    type: "warning",
                  }).catch(swal.noop);
                  return

                }else{

                  $scope.list_siniestro = response.data
                }

              }


              // $scope.numeroRadicado = response.data[0].RADICADO;
              // console.log($scope.numeroRadicado);
              if (varFilter == 'nuevoAfiliadoFormSeguTele') {
                $scope.buscarnuevoAfiliadoFormSeguTele = "";
                $scope.show_nuevoAfiliadoFormSeguTele = true;
                $scope.show_nuevoAfiliadoFormgestionLlamada = false;
              } else {
                $scope.buscarnuevoAfiliadoFormgestionLlamada = "";
                $scope.show_nuevoAfiliadoFormSeguTele = false;
                $scope.show_nuevoAfiliadoFormgestionLlamada = true;

              }
              if ($scope.activacionselect_requerimientoPendiente == 'A') {

                $scope.lista_requerimiento_Pendiente(response.data[0].COHORTE);
                $scope.listar_motivos_Estudio(response.data[0].COHORTE);
                $scope.preguntasgestionManual($scope[varFilter].numDocumento, response.data[0].COHORTE);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.select_siniestro = function (datos, varFilter) {
        //console.log(datos, '', '/', '', varFilter);
        $scope[varFilter].cohortes = datos.DESCRIPCION_COHORTE;
        $scope[varFilter].clasificacion = datos.CLASE_CONCEPTO;
        $scope.tablanuevoAfiliadoSiniestro = false;
        let selectNumeroRadicado = $scope[varFilter].siniestro = datos.RADICADO;
       // console.log(selectNumeroRadicado);
        $scope.selectRadicado = selectNumeroRadicado;
      };
      $scope.estadosJSON = [];
      $scope.Obtener_listados = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "consultar_listadocac",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listado = response.data;
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.estado = [
        {
          CODIGO: "AC",
          NOMBRE: "AC",
        },
        {
          CODIGO: "PL",
          NOMBRE: "PL",
        },
      ];
      $scope.Obtener_Seguimiento = function () {
        $scope.list_DatosTemp = [];
        $scope.tablagestionLlamadas = true;
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $scope.filtro_dato = [];
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS",
          },
        }).then(function (response) {
          //console.log(response);
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.filtro_dato = response.data;
            $scope.initPaginacion(response.data);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.Obtener_Gestion = function () {
        $scope.list_DatosTemp = [];
        $scope.listatabladegestionLlamadas = true;
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $scope.filtro_dato = [];
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_GESTION_USUARIOS_FILTROS",
          },
        }).then(function (response) {
          swal.close();
         // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.filtro_dato = response.data;
            $scope.initPaginacion(response.data);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.busquedaenTablas = function (varfiltro) {
       // console.log(varfiltro);
        if (varfiltro == 'buscar1') {

          if ($scope[varfiltro].tipoSolicitud == 'ND') {
            swal({
              title: 'Cargando...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            $scope.list_DatosTemp = [];
            let consulta1 = [];
            if ($scope[varfiltro].Tipo_Doc != "" && $scope[varfiltro].Num_Doc.length >= 5) {
              consulta1.push(
                {
                  TIPO: "TIPODOC",
                  VALOR: $scope[varfiltro].Tipo_Doc,
                },
                {
                  TIPO: "DOCUMENTO",
                  VALOR: $scope[varfiltro].Num_Doc,
                }
              );
            } else {
              swal({
                title: "Alerta",
                text: 'Por favor ingrese el tipo documento y numero de documento a buscar',
                type: "warning",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.control_vista_Tabs('tablaGestion');
                $scope.$apply();
              }, 1000);
              return
            }
            //console.log(consulta1);
            $scope.filtro_dato = [];
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS",
                P_V_JSON: JSON.stringify(consulta1),
              },
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != "<br") {
                swal.close();
                $scope.filtro_dato = response.data;
                $scope.initPaginacion(response.data);
                //console.log('d', $scope.list_busquedaSeguimiento);
                $scope.limpiar(varfiltro);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          } else if ($scope[varfiltro].tipoSolicitud == 'NS') {
            $scope.list_DatosTemp = [];
            let consulta2 = [];
            if ($scope[varfiltro].siniestro != "") {
              consulta2.push({
                TIPO: "SINIESTRO",
                VALOR: $scope[varfiltro].siniestro,
              });
            } else {
              swal({
                title: "Alerta",
                text: 'Por favor ingrese el numero de siniestro a buscar',
                type: "warning",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.Obtener_Seguimiento();
                $scope.$apply();
              }, 1000);
              return
            }
            $scope.filtro_dato = [];
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS",
                P_V_JSON: JSON.stringify(consulta2),
              },
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != "<br") {

                $scope.filtro_dato = response.data;
                $scope.initPaginacion(response.data);
                // $scope.list_busquedaSeguimiento = response.data;
                //console.log('s', $scope.list_busquedaSeguimiento);
                $scope.limpiar(varfiltro);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          }
        } else {

          if ($scope[varfiltro].tipoSolicitud == 'ND') {
            swal({
              title: 'Cargando...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            $scope.list_DatosTemp = [];
            let consulta1 = [];
            if ($scope[varfiltro].Tipo_Doc != "" && $scope[varfiltro].Num_Doc.length >= 5) {
              consulta1.push(
                {
                  TIPO: "TIPODOC",
                  VALOR: $scope[varfiltro].Tipo_Doc,
                },
                {
                  TIPO: "DOCUMENTO",
                  VALOR: $scope[varfiltro].Num_Doc,
                }
              );
            } else {
              swal({
                title: "Alerta",
                text: 'Por favor ingrese el tipo documento y numero de documento a buscar',
                type: "warning",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.control_vista_Tabs('tablaGestion');
                $scope.$apply();
              }, 1000);
              return
            }
            $scope.filtro_dato = [];
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_ST_GET_GESTION_USUARIOS_FILTROS",
                P_V_JSON: JSON.stringify(consulta1),
              },
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != "<br") {
                swal.close();
                $scope.filtro_dato = response.data;
                $scope.initPaginacion(response.data);
                //console.log('d', $scope.list_busquedaSeguimiento);
                $scope.limpiar(varfiltro);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          } else if ($scope[varfiltro].tipoSolicitud == 'NS') {
            $scope.list_DatosTemp = [];
            let consulta2 = [];
            if ($scope[varfiltro].siniestro != "") {
              consulta2.push({
                TIPO: "SINIESTRO",
                VALOR: $scope[varfiltro].siniestro,
              });
            } else {
              swal({
                title: "Alerta",
                text: 'Por favor ingrese el numero de siniestro a buscar',
                type: "warning",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.Obtener_Seguimiento();
                $scope.$apply();
              }, 1000);
              return
            }
            $scope.filtro_dato = [];
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_ST_GET_GESTION_USUARIOS_FILTROS",
                P_V_JSON: JSON.stringify(consulta2),
              },
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != "<br") {
                $scope.filtro_dato = response.data;
                $scope.initPaginacion(response.data);
                $scope.limpiar(varfiltro);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          }

        }
      };
      Promise.all([
        afiliacionHttp.obtenerViaPrincipal(),
        afiliacionHttp.obtenerLetra(),
        afiliacionHttp.obtenerNumero(),
        afiliacionHttp.obtenerCuadrante(),
        afiliacionHttp.obtenerZona(),
      ]).then(function (responses) {
        $scope.viaprincipal = responses[0];
        $scope.letras = responses[1];
        $scope.Numeros = responses[2];
        $scope.Cuadrantes = responses[3];
        $scope.Zonas = responses[4].Zona;
      });
      $scope.GuardarDireccion = function (accion) {
       // console.log(accion);
        $scope.closeThisDialog($("#direcciond").val());
      };
      $scope.chg_filtrar = function (varFiltro) {
        if ($scope.filtro[varFiltro] == "" || $scope.filtro[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: "Por favor digite que desea buscar..",
            type: "warning",
          }).catch(swal.noop);
          $scope.filtro[varFiltro] = "";

          // setTimeout(() => {
          //   $scope.Obtene_casosCerrados();
          //   $scope.$apply();
          // }, 1000);
        } else {
          $scope.list_DatosTemp = $filter("filter")($scope.filtro_dato, $scope.filtro[varFiltro]
          );
          $scope.configPages();
          varFiltro = "";
          $scope.filtro.filtrarcasosCerrados = "";
        }
      };
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        // $scope.Vista1.Mostrar_Sol = 10;
      };
      $scope.initMostrar = function (valor) {
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
          )
            fin = 10;
          else fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
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
      $scope.paso = function (tipo) {
        if (tipo == "next") {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.siniestros.length % $scope.pageSize == 0) {
            var tamanomax = parseInt(
              $scope.siniestros.length / $scope.pageSize
            );
          } else {
            var tamanomax =
              parseInt($scope.siniestros.length / $scope.pageSize) + 1;
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
      $scope.guardar = function () {
        $scope.valid_min_caract_Observacion =
          $scope.seguimiento.observacion.length;
        if (
          $scope.selectedEstado >= 1 &&
          $scope.selectedEstado <= 4 &&
          $scope.valid_min_caract_Observacion < 30
        ) {
          swal({
            title: "¡Información!",
            html: "El campo <strong>Observaciones</strong> require como minimo 30 caracteres para el guardado del seguimiento",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if (
          $scope.cant_llamadas == 2 &&
          $scope.selectedEstado >= 1 &&
          $scope.selectedEstado <= 4 &&
          $scope.selectedDomiciliaria == ""
        ) {
          swal({
            title: "¡Información!",
            html: "El campo <strong>Visita Domiciliaria</strong> es obligatorio para el guardado del seguimiento",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if (!$scope.selectedEstado || $scope.selectedEstado.trim() === "") {
          swal({
            title: "¡Información!",
            html: "El campo <strong>estado de la llamada</strong> es obligatorio para el guardado del seguimiento",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if (
          $scope.selectedEstado != 5 &&
          (!$scope.seguimiento.observacion ||
            $scope.seguimiento.observacion.trim() === "")
        ) {
          swal({
            title: "¡Información!",
            html: "El campo <strong>Observación</strong> es obligatorio para el guardado del seguimiento",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if ($scope.selectedEstado == 5 && !$scope.selectedResponsable) {
          swal({
            title: "¡Información!",
            html: "El campo <strong>Responsable de la llamada</strong> es obligatorio para el guardado del seguimiento",
            type: "warning",
          }).catch(swal.noop);
          return;
        }

        // Obtener la fecha actual
        var fechaActual = new Date();
        // Sumar un día
        fechaActual.setDate(fechaActual.getDate() + 1);
        // Obtener el día, mes y año actualizado
        var dia = fechaActual.getDate();
        var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        var año = fechaActual.getFullYear();
        // Formatear la fecha en el formato deseado (dd/mm/aaaa)
        var fechaMañana = dia + "/" + mes + "/" + año;

        let jsonData = [
          {
            Id: Number($scope.formSeguimiento.NUMEROSINIESTRO),
            IdSeguimiento: $scope.formSeguimiento.IDSEGUIMIENTO,
            Fechareprogramacion: fechaMañana,
            Tipodocumento: $scope.formSeguimiento.TIPODOCUMENTO,
            Numerodocumento: $scope.formSeguimiento.NUMDOCUMENTO,
            Barrio: "",
            Modificado: $scope.Modificado == true ? "S" : "N",
            Direccion: $scope.formSeguimiento.DIRECCION,
            Telefono1: $scope.formSeguimiento.TELEFONO1,
            Telefono2: $scope.formSeguimiento.TELEFONO2,
            Correo: $scope.formSeguimiento.CORREO,
            Pluripatologico: $scope.formSeguimiento.PLURIPATOLOGICO,
            Estadollamada: $scope.selectedEstado,
            Observacion: $scope.seguimiento.observacion,
            Responsablellamada: $scope.selectedResponsable,
            UsuarioSesion: sessionStorage.getItem("usuario"),
          },
        ];

        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_POST_GESTION_USUARIOS",
            p_v_json: JSON.stringify(jsonData),
          },
        })
          .then(function (response) {
           // console.log(response);
            if (
              response.data &&
              response.data.toString().substr(0, 3) !== "<br"
            ) {
              swal({
                title: "Éxito",
                text: "Los datos se guardaron correctamente",
                type: "success",
              }).catch(swal.noop);
              $scope.preguntasSeguimientoTelefonico = true;

              if (
                $scope.cant_llamadas == 2 &&
                $scope.selectedEstado >= 1 &&
                $scope.selectedEstado <= 4 &&
                $scope.selectedDomiciliaria == "S"
              ) {
                $scope.mesadeAyuda();
              }
              if ($scope.selectedEstado == 5) {
                $scope.obtener_preguntas($scope.formSeguimiento.IDSEGUIMIENTO);
                $scope.busqueda($scope.formSeguimiento.COHORTE);
                $scope.idGestion = $scope.formSeguimiento.IDSEGUIMIENTO;
                $scope.Siniestro = $scope.formSeguimiento.NUMEROSINIESTRO;
                $scope.ClaseRequerido = "requerido";
              } else {
                $scope.control_vista_Tabs("tablaSeguimiento");
              }
              // $scope.Inicio();
              // setTimeout(() => {
              //   $scope.$apply();
              //   $scope.control_vista_Tabs(2,'tablaSeguimiento');
              //   $scope.botondecontroldeProcesos('llamadasPendientes');
              //   // $scope.botondecontroldeProcesos('g_gestionLlamadas');
              // }, 1000);
            } else {
              // Ocurrió un error en la solicitud
              swal({
                title: "¡Ocurrió un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          })
          .catch(function (error) {
            // Ocurrió un error en la comunicación con el servidor
            swal({
              title: "¡Ocurrió un error!",
              text: "No se pudo realizar la solicitud al servidor",
              type: "error",
            }).catch(swal.noop);
          });
      };
      // -------------------------------------------
      // preguntas 1
      // -------------------------------------------
      $scope.obtener_preguntas = function (numero) {
       // console.log(numero);
        if (numero == null) {
          $scope.preguntasGestion = true;

        } else {
          $scope.preguntasGestion = true;
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_ST_GET_CONFIG_PREGUNTAS_TIPOS",
              P_NU_NUMERO: Number(numero),
            },
          }).then(function (response) {
           // console.log("Fila 1111");
            //console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != "<br") {
              //console.log("response", response.data);
              $scope.preguntas = response.data[0].preguntas;
              $scope.dataPregunta = response.data[0];
              $scope.control_vista_Tabs("preguntas");
              $scope.tipoPreguntaLado = "1";
            } else {
              swal({
                title: "¡Ocurrió un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.busqueda = function (concepto) {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_LISTAR_IPS_ALTOCOSTO",
            V_PCONCEPTO: concepto,
          },
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.ListarResultado = [];
          } else {
            $scope.ListarResultado = response.data;
          }
        });
      };
      $scope.busquedaIPS = function (concepto, index, bus) {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_LISTAR_IPS",
            V_PCONCEPTO: concepto,
          },
        }).then(function (response) {
          if (bus == "nit") {
            let data = response.data;
            if (data.length > 0) {
              $scope.preguntas[index].nombreIPS = data[0].razon_social;
            }
          }
        });
      };
      //nuevo
      $scope.buscar_listado_select = function (nombre, index) {
        if (nombre.length >= 6) {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_LISTAR_IPS",
              V_PCONCEPTO: nombre,
            },
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.ListarResultado = "";
            } else {
              if (response.data[0].codigo == 1) {
                $scope.json_prestador = [];
              } else {
                if (response.data.length == 1) {
                  $scope.seleccion_opcion2(
                    response.data[0].nit,
                    response.data[0].razon_social,
                    index
                  );
                } else {
                  $scope.json_prestador = response.data;
                 // console.log($scope.json_prestador);
                }
              }
            }
          });
        }
      };
      $scope.seleccion_opcion2 = function (codigo, razon_social, index) {
        $scope.preguntas[index].nombreIPS = razon_social;
        $scope.preguntas[index].respuesta = codigo;
        $scope.json_prestador = [];
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      };
      // Buscardor ips 2
      $scope.buscar_listado_select_ips = function (nombre, index) {
        if (nombre.length >= 6) {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_LISTAR_IPS",
              V_PCONCEPTO: nombre,
            },
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.json_prestador_ips = "";
            } else {
              if (response.data[0].codigo == 1) {
                $scope.json_prestador_ips = [];
              } else {
                if (response.data.length == 1) {
                  $scope.seleccion_opcion2(
                    response.data[0].nit,
                    response.data[0].razon_social,
                    index
                  );
                } else {
                  $scope.json_prestador_ips = response.data;
                  //console.log($scope.json_prestador_ips);
                }
              }
            }
          });
        }
      };
      $scope.seleccion_opcion2_ips = function (codigo, razon_social, index) {
        //console.log("a buscar loco");
        $scope.preguntas[index].nombreIPS = razon_social;
        $scope.preguntas[index].respuesta = codigo;
        $scope.json_prestador_ips = [];
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      };
      $scope.mostrarPregunta = function (item) {
        //valida si tiene hijos
        //console.log(item);
        if (item.tieneHijos == "N") {
          return;
        }

        let hijosTempo = [];
        let nietosTmp = [];
        // desaparece todos los hijos
        for (let i = 0; i < item.hijos.length; i++) {
          let tmp = JSON.parse(item.hijos[i].hijos);
          hijosTempo.push(tmp);
        }
        let TodosHijos = [].concat(...hijosTempo);
        do {
          for (const iterator of TodosHijos) {
            const condi = (element) => element.id == iterator;
            let i = $scope.preguntas.findIndex(condi);
            if (i != -1) {
              $scope.preguntas[i].aparecer = "N";
              if ($scope.trazabilidad != 1) {
                $scope.preguntas[i].respuesta = "";
              }

              //busca nietos
              for (let j = 0; j < $scope.preguntas[i].hijos.length; j++) {
                let tmp = JSON.parse($scope.preguntas[i].hijos[j].hijos);
                nietosTmp.push(tmp);
              }
            }
          }
          TodosHijos = [].concat(...nietosTmp);
          nietosTmp = [];
        } while (TodosHijos.length != 0);

        //busca los nietos

        //respuesta elegida
        let respuesta = item.respuesta;
        if (respuesta != undefined && respuesta != "") {
          let hijosRes = [];
          // busca todos los hijos en la respuesta
          for (let i = 0; i < item.hijos.length; i++) {
            if (item.hijos[i].codigo == respuesta) {
              hijosRes = JSON.parse(item.hijos[i].hijos);
            }
          }

          //aparece los hijo en la respuesta
          for (const iterator of hijosRes) {
            const condi = (element) => element.id == iterator;
            let i = $scope.preguntas.findIndex(condi);
            if (i != -1) {
              $scope.preguntas[i].aparecer = "S";
            }
          }
        }
      };
      $scope.guardarPreguntas = function () {
        if ($scope.validarRequerido()) {
          swal({
            title: "¡Información!",
            html: "Los campos señalados en rojo son requeridos",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        const jsonData = $scope.preguntas.map((value) => {
          return {
            Siniestro: $scope.Siniestro,
            IdGestion: Number($scope.formSeguimiento.IDGESTION),
            IdSeguimiento: Number($scope.formSeguimiento.IDSEGUIMIENTO),
            IdPregunta: Number(value.id),
            IdTipoPregunta: Number(value.idTipoPregunta),
            Respuesta:
              value.input.typeInput === "date"
                ? moment(value.respuesta).format("DD/MM/YYYY") || ""
                : value.respuesta || "",
            UsuarioSesion: sessionStorage.getItem("usuario"),
          };
        });
        let funcion =
          $scope.tipoPreguntaLado == "1"
            ? "P_ST_POST_RESPUESTA_PREGUNTA"
            : "P_ST_POST_RESPUESTA_PREGUNTA_GESTION";

        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: funcion,
            P_V_JSON: JSON.stringify(jsonData),
          },
        })
          .then((response) => {
            if (
              response.data &&
              response.data.toString().substr(0, 3) !== "<br"
            ) {
              if (response.data.codigo != 1) {
                swal({
                  title: "Éxito",
                  text: "Los datos se guardaron correctamente",
                  type: "success",
                }).catch(swal.noop);
                let ir = $scope.tipoPreguntaLado == "1" ? "tablaSeguimiento" : "tablaGestion";
                $scope.control_vista_Tabs(ir);
              } else {
                swal({
                  title: "¡Ocurrió un error!",
                  text: response.data.mensaje,
                  type: "warning",
                }).catch(swal.noop);
                // $scope.control_vista_Tabs('tablaSeguimiento')
              }
            } else {
              // Ocurrió un error en la solicitud
              swal({
                title: "¡Ocurrió un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          })
          .catch((error) => {
            // Ocurrió un error en la comunicación con el servidor
            swal({
              title: "¡Ocurrió un error!",
              text: "No se pudo realizar la solicitud al servidor",
              type: "error",
            }).catch(swal.noop);
          });
      };
      $scope.guardar_observacionSeguimiento = function () {
        if ($scope.modal2.observacion == '') {
          swal({
            title: "¡Información!",
            html: "Por favor ingrese la observación",
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        var informacion = {
          "Id": $scope.inf_1.ID,
          "Siniestro": $scope.inf_1.NUMEROSINIESTRO,
          "IdSeguimiento": $scope.inf_1.IDSEGUIMIENTO,
          "IdPregunta": $scope.inf_2[0].preguntas[0].id,
          "IdTipoPregunta": $scope.inf_2[0].preguntas[0].idTipoPregunta,
          "Respuesta": $scope.modal2.observacion,
          "UsuarioSesion": $scope.inf_1.FUNCIONARIO_RESPONSABLE
        };
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: 'guardarobservacionSeguimiento',
            P_V_JSON: JSON.stringify(informacion),
          },
        })
          .then((response) => {
            if (
              response.data &&
              response.data.toString().substr(0, 3) !== "<br"
            ) {
              if (response.data.codigo != 1) {
                swal({
                  title: "Éxito",
                  text: "Los datos se guardaron correctamente",
                  type: "success",
                }).catch(swal.noop);
                // let ir = $scope.tipoPreguntaLado == "1" ? "tablaSeguimiento" : "tablaGestion";
                // console.log(ir);
                $scope.control_vista_Tabs('tablaSeguimiento');
                $scope.botondecontroldeProcesos('enSeguimiento');
                $("#modalObservacionesSeguimiento").modal("close");
                $scope.modal2.observacion = '';
              } else {
                swal({
                  title: "¡Ocurrió un error!",
                  text: response.data.mensaje,
                  type: "warning",
                }).catch(swal.noop);
                // $scope.control_vista_Tabs('tablaSeguimiento')
              }
            } else {
              // Ocurrió un error en la solicitud
              swal({
                title: "¡Ocurrió un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          })
          .catch((error) => {
            // Ocurrió un error en la comunicación con el servidor
            swal({
              title: "¡Ocurrió un error!",
              text: "No se pudo realizar la solicitud al servidor",
              type: "error",
            }).catch(swal.noop);
          });
      };
      $scope.capturainfogestionManua = function (data1, data2) {
        $scope.reqPendeinte = JSON.parse(data1);
        //console.log($scope.reqPendeinte);
        $scope.motEstudio = JSON.parse(data2);
        //console.log($scope.motEstudio);
      }

      $scope.guardar_gestionManual = function () {
        if ($scope.nuevoAfiliadoFormgestionManual.tipoDocumento == '' || $scope.nuevoAfiliadoFormgestionManual.numDocumento == '' || $scope.selectRadicado == '' 
        || $scope.nuevoAfiliadoFormgestionManual.requerimiento == '' || $scope.nuevoAfiliadoFormgestionManual.motivosestudio == '' ||
         $scope.nuevoAfiliadoFormgestionManual.fechanuevoafiliado == '' || $scope.nuevoAfiliadoFormgestionManual.tipo_marcacion == '') {
          swal({
            title: "¡Información!",
            html: "Los campos señalados en rojo son requeridos",
            type: "warning",
          }).catch(swal.noop);
          return
        } else {
          $http({
            method: "POST",
            url: "php/altocosto/seguimientoCAC.php",
            data: {
              function: "P_ST_GET_EAFI_AFILIADOS_GESTION",
              PVTIPO_DOCUMENTO: $scope.nuevoAfiliadoFormgestionManual.tipoDocumento,
              PVDOCUMENTO: $scope.nuevoAfiliadoFormgestionManual.numDocumento,
              p_v_siniestro: $scope.selectRadicado,
              p_v_marca: $scope.nuevoAfiliadoFormgestionManual.tipo_marcacion,
            },
          }).then((response) => {
           // console.log(response);
            if (response.data && response.data.toString().substr(0, 3) !== "<br") {
              $scope.seguimientoId = response.data.IdSeguimiento;

              swal({
                title: "Éxito",
                text: "Los datos se guardaron correctamente",
                type: "success",
              }).catch(swal.noop);

              setTimeout(function () {
                $scope.gestionManual();
       
              }, 1000);

            } else {
              swal({
                title: "¡Ocurrió un error!",
                text: response.data,
                type: "warning",
              }).catch(swal.noop);
            }
          })
          // id_observaciondeGestion: ,
          // id_tipopreguntadegestionObservacion: ,
          // id_fechadeGestion: $scope.id_fechadeGestion,
          // id_tipopreguntadegestionFecha: $scope.id_tipopreguntadegestionFecha,
          // nombrefechadeGestion: $scope.nombrefechadeGestion,


        }
      }
      $scope.gestionManual = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_INICIAR_GESTION_MANUAL",
            PNUNUMERO: $scope.seguimientoId,
          },
        }).then((response) => {
         // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) !== "<br") {
            if (response.data.Codigo == 0) {
              const jsonData = [{
                Siniestro: $scope.selectRadicado,
                IdSeguimiento: $scope.seguimientoId,
                IdGestion: response.data.IdGestion,
                IdPregunta: $scope.motEstudio.ID,
                IdTipoPregunta: $scope.motEstudio.TIPO_PREGUNTA_ID,
                Respuesta: $scope.motEstudio.CODIGO,
                UsuarioSesion: sessionStorage.getItem("usuario"),

              }, {
                Siniestro: $scope.selectRadicado,
                IdSeguimiento: $scope.seguimientoId,
                IdGestion: response.data.IdGestion,
                IdPregunta: $scope.reqPendeinte.ID,
                IdTipoPregunta: $scope.reqPendeinte.TIPO_PREGUNTA_ID,
                Respuesta: $scope.reqPendeinte.CODIGO,
                UsuarioSesion: sessionStorage.getItem("usuario"),

              },
              // **********************************************
              {
                Siniestro: $scope.selectRadicado,
                IdSeguimiento: $scope.seguimientoId,
                IdGestion: response.data.IdGestion,
                IdPregunta: $scope.id_observaciondeGestion,
                IdTipoPregunta: $scope.id_tipopreguntadegestionObservacion,
                Respuesta: $scope.nuevoAfiliadoFormgestionManual.observacion,
                UsuarioSesion: sessionStorage.getItem("usuario"),
              }, {
                Siniestro: $scope.selectRadicado,
                IdSeguimiento: $scope.seguimientoId,
                IdGestion: response.data.IdGestion,
                IdPregunta: $scope.id_fechadeGestion,
                IdTipoPregunta: $scope.id_tipopreguntadegestionFecha,
                Respuesta: $scope.formatDatefecha($scope.nuevoAfiliadoFormgestionManual.fechanuevoafiliado),
                UsuarioSesion: sessionStorage.getItem("usuario"),
              }

              ];
             // console.log(Object.keys(jsonData).length); // 3
             // console.log($scope.seguimientoId);
              //console.log(jsonData)
              $http({
                method: "POST",
                url: "php/altocosto/seguimientoCAC.php",
                data: {
                  function: "P_ST_POST_RESPUESTA_PREGUNTA_GESTION_MANUAL",
                  P_V_JSON: JSON.stringify(jsonData),
                },
              }).then((response) => {
                //console.log(response);
                if (response.data && response.data.toString().substr(0, 3) !== "<br") {
                  if (response.data.codigo == 0) {
                    $scope.control_vista_Tabs("tablaGestion");
                    // let ir = $scope.tipoPreguntaLado == "1" ? "tablaSeguimiento" : "tablaGestion";
                    // $scope.control_vista_Tabs(ir);
                  } else {
                    swal({
                      title: "¡Ocurrió un error!",
                      text: response.data.mensaje,
                      type: "warning",
                    }).catch(swal.noop);
                    // $scope.control_vista_Tabs('tablaSeguimiento')
                  }
                } else {
                  // Ocurrió un error en la solicitud
                  swal({
                    title: "¡Ocurrió un error!",
                    text: response.data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              })
                .catch((error) => {
                  // Ocurrió un error en la comunicación con el servidor
                  swal({
                    title: "¡Ocurrió un error!",
                    text: "No se pudo realizar la solicitud al servidor",
                    type: "error",
                  }).catch(swal.noop);
                });
            }
          } else {
            // Ocurrió un error en la solicitud
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        })
      }
      $scope.fechaActualFuncion = function () {
        let fechaActual = new Date();
        let dia = fechaActual.getDate();
        let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
        let anio = fechaActual.getFullYear();

        // Agregar un cero inicial si el día o el mes es menor a 10
        if (dia < 10) {
          dia = "0" + dia;
        }
        if (mes < 10) {
          mes = "0" + mes;
        }

        var fechaFormateada = anio + "-" + mes + "-" + dia;

        return fechaFormateada;
      };
      $scope.validacionDinamica = function (validation, type, input) {
       // console.log(validation,'','-','',type,'','-','',input);
        let res;
        if (input != "date") {
          return "";
        }
        if (validation != type) {
          switch (type) {
            case "fechaMaxHoy":
              res = "2100-09-02";
              break;
            case "fechaMinHoy":
              res = "1900-09-02";
              break;

            default:
              res = "";
              break;
          }
          return res;
        }
        switch (validation) {
          case "fechaMaxHoy":
            res = $scope.fechaActualFuncion();
            break;
          case "fechaMinHoy":
            res = $scope.fechaActualFuncion();
            break;

          default:
            res = "";
            break;
        }
        return res;
      };
      $scope.validarRequerido = function () {
        if ($scope.preguntas) {
          //console.log($scope.preguntas);
        }
        let validar = false;

        for (let index = 0; index < $scope.preguntas.length; index++) {
          let respuesta = $scope.preguntas[index].respuesta;
          let aparecer = $scope.preguntas[index].aparecer;
          let requerido = $scope.preguntas[index].requerido;

          //validacion si es visible
          if (aparecer == "S") {
            //si es requerido
            if (requerido == "S") {
              // si tiene datos
              if (respuesta == "" || respuesta == undefined) {
                $scope.preguntas[index].ClaseRequerido = $scope.ClaseRequerido;
                validar = true;
              }
            }
          }
        }

        return validar;
      };

      // -------------------------------------------
      // preguntas 2
      // -------------------------------------------
      $scope.P_ST_INICIAR_GESTION = function (P_NU_NUMERO) {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_INICIAR_GESTION",
            P_NU_NUMERO: P_NU_NUMERO,
          },
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.info = [];
          } else {
            $scope.info = response.data;
          }
        });
      };
      $scope.Obtener_listaenSeguimiento = function () {
        $scope.list_DatosTemp = [];
        $scope.tablagestionLlamadas = true;
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $scope.filtro_dato = [];
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_USUARIOS_EN_SEGUIMIENTO",
          },
        }).then(function (response) {
          //console.log(response);
          swal.close();
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.filtro_dato = response.data;
            $scope.initPaginacion(response.data);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.obtener_preguntasGestion = function (numero, siniestro) {
        //console.log(numero);
        //console.log(siniestro);

        //$scope.nombre = siniestro
        //$scope.formSeguimiento.NombreCompleto = siniestro.Nombres + ' ' + siniestro.Apellidos;
        //console.log($scope.formSeguimiento.NombreCompleto );
        $scope.dataSiniestro(siniestro);
        //console.log(siniestro );
        $scope.observaciones = [];
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION",
            P_NU_NUMERO: Number(numero),
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.preguntas = response.data[0].preguntas;
            $scope.dataPregunta = response.data[0];
            $scope.formSeguimiento = siniestro;
            $scope.control_vista_Tabs("preguntas");
            $scope.tipoPreguntaLado = "2";
            $scope.formSeguimiento.NombreCompleto = siniestro.NOMBRES + " " + siniestro.APELLIDOS;
            $scope.idGestion = $scope.formSeguimiento.IDSEGUIMIENTO;
            $scope.Siniestro = $scope.formSeguimiento.NUMEROSINIESTRO;
            $scope.ClaseRequerido = "requerido";
            $scope.busqueda($scope.formSeguimiento.COHORTE);
            $scope.trazabilidad = 1;
            $scope.preguntas.forEach((element) => {
              $scope.mostrarPregunta(element);
            });
            $scope.mostrarGestion = true;
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_AG_GET_HISTORICO_RESPUESTA_PREGUNTA_GESTION",
                P_I_ID_SEGUIMIENTO: Number($scope.idGestion),
                P_I_SINISTESTRO: Number($scope.Siniestro),
              },
            }).then(function (response) {
              if (
                response.data &&
                response.data.toString().substr(0, 3) != "<br"
              ) {
                $scope.observaciones = response.data;
              } else {
                swal({
                  title: "¡Ocurrió un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
            $http({
              method: "POST",
              url: "php/altocosto/seguimientoCAC.php",
              data: {
                function: "P_ST_MOSTRAR_GESTION",
                P_V_SINIESTRO: Number($scope.Siniestro),
                P_I_TIPO: $scope.dataPregunta.codigo,
                P_I_GESTION: siniestro.IDGESTION,
              },
            }).then(function (response) {
              if (
                response.data &&
                response.data.toString().substr(0, 3) != "<br"
              ) {
                $scope.gestion = response.data;
              } else {
                swal({
                  title: "¡Ocurrió un error!",
                  text: response.data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.Obtene_casosCerrados = function () {
        if ($scope.buscar3.Tipo_Doc == '' || $scope.buscar3.Num_Doc == '') {
          swal({
            title: "¡Atencion!",
            text: 'Ingrese los campos requeridos (*).',
            type: "error",
          }).catch(swal.noop);
          return
        }
        swal({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
        swal.showLoading();
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_ST_GET_USUARIOS_GESTIONADOS",
            VPDOCUMENTO: $scope.buscar3.Tipo_Doc,
            VDOCUMENTO: $scope.buscar3.Num_Doc
          },
        }).then(function ({ data }) {

          if (data && data.toString().substr(0, 3) != "<br") {
            swal.close();
            $scope.listaconsultacasosCerrados = data;
            $scope.vistacasosCerrarados = false;
            $scope.vistacasosenSeguimiento = true;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.listaselectMarcacion = function () {
        $http({
          method: "POST",
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: "P_MARCA_USUARIOS",
          },
        }).then(function ({ data }) {
          swal.close();
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.list_marca_usuario = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      $scope.reiniciarBusqueda = function () {
        $scope.list_busquedaSeguimiento = [];
      }
      // $scope.excel = function () {
      //   swal({
      //     title: "Cargando",
      //     html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
      //     showConfirmButton: false,
      //     allowOutsideClick: false,
      //     allowEscapeKey: false,
      //     background: "#fff",
      //     showCloseButton: false,
      //   });
      //   $http({
      //     method: "POST",
      //     url: "php/altocosto/seguimientoCAC.php",
      //     data: {
      //       function: "P_ST_GET_GESTION_USUARIOS_FILTROS",
      //     },
      //   }).then(function (response) {
      //     swal.close();
      //     console.log(response);
      //     if (response.data && response.data.toString().substr(0, 3) != "<br") {
      //       $scope.descarga = []
      //       response.data.forEach(x => {
      //         $scope.descarga.push({
      //           TIPO: "TIPODOC",
      //           VALOR: x.TIPODOCUMENTO,
      //         },
      //           {
      //             TIPO: "DOCUMENTO",
      //             VALOR: x.NUMDOCUMENTO,
      //           }
      //         );
      //       });
      //       $http({
      //         method: "POST",
      //         url: "php/altocosto/seguimientoCAC.php",
      //         data: {
      //           function: "generateExcelFile",
      //           P_V_JSON: JSON.stringify($scope.descarga),
      //         },
      //         responseType: "arraybuffer", // Set the response type to 'arraybuffer'
      //       })
      //         .then(function (response) {
      //           console.log(response.data);
      //           var link = document.createElement("a");
      //           var blob = new Blob([response.data], {
      //             type: "application/octet-stream",
      //           });
      //           link.href = URL.createObjectURL(blob);
      //           link.download = "gestion.xlsx";
      //           swal.close();
      //           link.target = "_blank";
      //           document.body.appendChild(link); // Append the link to the document body
      //           link.click();
      //           document.body.removeChild(link); // Remove the link from the document body after the download
      //         })
      //         .catch(function (error) {
      //           swal("Error", "La respuesta no es válida", "error");
      //         });
      //     } else {
      //       swal({
      //         title: "¡Ocurrio un error!",
      //         text: response.data,
      //         type: "warning",
      //       }).catch(swal.noop);
      //     }
      //   });

      // }
      $scope.descargaInfo = function () {
        let enviado = [];
        if ($scope.Tipo_Doc !== "" && $scope.Num_Doc.length >= 5) {
          enviado.push(
            {
              TIPO: "TIPODOC",
              VALOR: $scope.Tipo_Doc,
            },
            {
              TIPO: "DOCUMENTO",
              VALOR: $scope.Num_Doc,
            }
          );
        }
        if ($scope.siniestro) {
          enviado.push({
            TIPO: "SINIESTRO",
            VALOR: $scope.siniestro,
          });
        }
        //console.log(enviado);

      }
      $scope.handleKeyPress = function (e, form) {
        // console.log(e, form);
        if (
          $scope[form].observacion == null ||
          $scope[form].observacion == undefined ||
          $scope[form].observacion == ""
        ) {
          $scope.count = 0;
        }
        if ($scope[form].observacion.length < $scope.count) {
          $scope.count = $scope[form].observacion.length;
        } else $scope[form].observacion.length > $scope.count;
        {
          $scope.count = $scope[form].observacion.length;
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
      //ps nuevo casos cerrados
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      };
      $scope.openmodals = function (tipo, data) {
        //console.log(tipo);
        switch (tipo) {
          case 'observacionenSeguimiento':
            $scope.consulta_observacion_de_Segumiento(data);
            $("#modalObservaciones").modal("open");
            break;
          case 'observacionesSeguimiento':
            $scope.agregar_observacionSeguimiento(data);
            $("#modalObservacionesSeguimiento").modal("open");
            break;
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        // console.log(tipo);
        switch (tipo) {
          case 'observacionenSeguimiento':
            $("#modalObservaciones").modal("close");
            break;
          case 'observacionesSeguimiento':
            $("#modalObservacionesSeguimiento").modal("close");
            break;
          default:
        }
      }
      // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.validaGestion = function (item) {
        $scope.mostrarGestion = item.respuesta == "G" ? true : false;
      };
      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
    },
  ])
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
