'use strict';
angular.module('GenesisApp')
  .controller('procesosespecialesController', ['$scope', '$http','$filter',
    function ($scope, $http, $filter) {
      $scope.tipodeItem = 0;
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      $scope.rolcod = sessionStorage.getItem('rolcod');
      $(document).ready(function () {
           //TABLA
           $scope.Filtrar_Sol = 10;
           $scope.Vista1 = {
             Mostrar_Sol: 10
           };
           $scope.list_DatosTemp = [];
        $scope.obtener_token();
        $scope.obtenerreporte();
        $scope.obtener_correo();
        $scope.incioVacio();
        $scope.infoestadoLMA();
        $scope.lis_info_BDUA_subsidiado = new Array();
        $scope.lis_info_BDUA_contributivo = new Array();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.show_tabla_Cargue_Historico_Portabilidad = false;
        // $scope.lis_info_LMA = new Array();
        // console.log($(window).width());
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
      // Esta varible sirbe para activar el modo disable al boton de Apertura de capita.
      $scope.aperturalmaDisable = false;
      $scope.classebuttonApertura = "default-linear-gradient";
      $scope.incioVacio = function () {
        $scope.regimen = "";
        $scope.anno = "";
        $scope.periodo = "";
        $scope.nit = "";
      };
      $scope.cargaAnnos = function () {
        $http({
          method: 'POST',
          url: "php/financiera/funcfinanciera.php",
          data: { function: 'cargaannos' }
        }).then(function (res) {
          $scope.Annos = res.data;
          $scope.anno = $scope.Annos[0].ANNO;
          $scope.cargaPeriodos();
        })
      }
      $scope.cargaPeriodos = function () {
        if ($scope.anno != "X" || $scope.anno === undefined) {
          $http({
            method: 'POST',
            url: "php/financiera/funcfinanciera.php",
            data: { function: 'cargaperiodos', anno: $scope.anno }
          }).then(function (res) {
            $scope.Periodos = res.data;
            // console.log($scope.Periodos);
            // $scope.periodo = $scope.Periodos[0].IDE;
          })
        }
      }
      $scope.obtener_token = function () {
        $http({
          method: 'POST',
          url: "php/financiera/reportes/funcreportes.php",
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
      $scope.obtenerreporte = function () {
        // console.log($scope.rolcod);
        $http({
          method: 'POST',
          url: "php/informes/obtenerreportes_especiales.php",
          data: { function: 'obtenerreportes', v_prol: $scope.rolcod }
        }).then(function (response) {
          $scope.Reportes = response.data;
        })
      }
      $scope.changeItem = function (item) {
        $scope.item = JSON.parse(item)
        // console.log($scope.item)
      }
      $scope.listado_tabla_BDUA_subsidiado = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_BDUA_subsidiado" },
        }).then(function (res) {
          $scope.lis_info_BDUA_subsidiado = res.data;
        });
      };
      $scope.listado_tabla_BDUA_contributivo = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_BDUA_contributivo" },
        }).then(function (res) {
          $scope.lis_info_BDUA_contributivo = res.data;
        });
      };
      $scope.listado_tabla_LMA = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_LMA" },
        }).then(function (res) {
          $scope.lis_info_LMA = res.data;
        });
      };
      $scope.resumen_listado_tabla_LMA = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "resumen_lista_tabla_LMA" },
        }).then(function (resumen) {
          // console.log(resumen);
          $scope.resumen_lis_info_LMA = resumen.data;
        });
      };
      $scope.listado_tabla_LMA_2 = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_LMA_2" },
        }).then(function (res) {
          $scope.lis_info_LMA_2 = res.data;
        });
      };
      $scope.CargueHistoricoPortabilidad = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista1_datos = [];
        $http({
          method: "POST",
          url: "php/financiera/reportes/funcreportes.php",
          data: { function: "CargueHistorico_Portabilidad" },
        }).then(function ({data}) {
          swal.close();
          $scope.Vista1_datos = data;
          $scope.initPaginacion(data);
        });
      };
      $scope.SeleccionarItem = function () {
        if ($scope.tipodeItem == "0") {
          $scope.vercontenido = false;
          $scope.vercontenidoLMA = false;
        } else {
          $scope.ocultarTodo();
          $scope.incioVacio();
          $scope.vercontenido = true;
          $scope.vercontenidoLMA = true;
          switch ($scope.tipodeItem) {
            case "67"://Cargue de Bases de BDUA Subsidiado
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue de Bases de BDUA Subsidiado";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = true;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              $scope.show_tabla_Cargue_Historico_Portabilidad= false;
              $scope.listado_tabla_BDUA_subsidiado();
              break;
            case "22"://Archivo Tipo 017
              $scope.regimen = "X";
              $scope.show_regimen = true;
              $scope.show_ciclo = true;
              $scope.show_nit = true;
              $scope.Nombrereporte = "Archivo Tipo 017";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              $scope.show_tabla_Cargue_Historico_Portabilidad= false;
              break;
            case "72"://Recalculo Contable - Kprecal
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Recalculo Contable - Kprecal";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              $scope.show_tabla_Cargue_Historico_Portabilidad= false;
              break;
            case "70"://Cargue Bases de LMA
            $scope.show_ano = true;
            $scope.show_mensual = true;
            $scope.show_regimen = false;
            $scope.show_ciclo = false;
            $scope.show_nit = false;
            $scope.Nombrereporte = "Cargue Bases de LMA";
            $scope.vercontenido = false;
            $scope.contenido1 = false;
            $scope.contenido2 = false;
            $scope.contenido3 = true;
            $scope.show_tabla_list_BDUA_subsidiado = false;
            $scope.show_tabla_list_BDUA_contributivo = false;
            $scope.show_tabla_list_LMA = true;
            $scope.show_tabla_Cargue_Historico_Portabilidad= false;
            // $scope.listado_tabla_LMA();
            // $scope.listado_tabla_LMA_2();
            $scope.vista_lma = 1;
              $scope.obtener_fechaConfirmacionLMA();
              // $scope.resumen_listado_tabla_LMA();
              $scope.seleccdeAños();

              break;
            case "78": //Cargue de Bases de BDUA Contributivo
              $scope.show_ano = true;
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_mensual = true;
              $scope.show_trimestre = false;
              $scope.show_archivo_zip = false;
              $scope.show_archivo_txt = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue de Bases de BDUA Contributivo";
              $scope.contenido1 = true;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_ubicacion = false;
              $scope.show_concepto = false;
              $scope.show_fecha_recibico = false;
              $scope.show_fecha_respuesta = false;
              $scope.show_instructivo = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = true;
              $scope.show_tabla_list_LMA = false;
              $scope.show_tabla_Cargue_Historico_Portabilidad= false;
              $scope.listado_tabla_BDUA_contributivo();
              break;
            case "91": //Cargue Historico Portabilidad
              $scope.show_ano = true;
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_mensual = true;
              $scope.show_trimestre = false;
              $scope.show_archivo_zip = false;
              $scope.show_archivo_txt = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue Historico Portabilidad";
              $scope.contenido1 = true;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_ubicacion = false;
              $scope.show_concepto = false;
              $scope.show_fecha_recibico = false;
              $scope.show_fecha_respuesta = false;
              $scope.show_instructivo = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = true;
              $scope.show_tabla_list_LMA = false;
              $scope.show_tabla_Cargue_Historico_Portabilidad= true;
              $scope.CargueHistoricoPortabilidad();
              break;
          }
        }
      }
      $scope.infoestadoLMA = function () {
        $http({
          method: 'POST',
          url: "php/financiera/funcfinanciera.php",
          data: { function: 'actualizacion_estado_LMA' }
        }).then(function (infoEstado) {
          $scope.estado_Lma = infoEstado.data[0].cantidad;
          if ($scope.estado_Lma == "0") {
            $scope.aperturalmaDisable = true;
            $scope.classebuttonApertura = "default-linear-gradient-disabled";
            $http({
              method: 'POST',
              url: "php/financiera/funcfinanciera.php",
              data: { function: 'actualizacion_consulta_lma_Sqlsrv' }
            }).then(function (info_estado_Sqlsrv) {
              $scope.estado_Lma_sqlsrv = info_estado_Sqlsrv.data[0].cantidad;
              if ($scope.estado_Lma_sqlsrv > 0) {
                $scope.show_tabla_list_LMA = true;
                $scope.listado_tabla_LMA();
                $scope.listado_tabla_LMA_2();
                $scope.aperturalmaDisable = false;
                $scope.classebuttonApertura = "default-linear-gradient-disabled";
              }else{
                $scope.listado_tabla_LMA();

              }
            })
          } else if ($scope.estado_Lma == "1") {
            $scope.aperturalmaDisable = true;
            $scope.classebuttonApertura = "default-linear-gradient-disabled";
            $scope.show_tabla_list_LMA = true;
            $scope.listado_tabla_LMA();
            // $scope.listado_tabla_LMA_2();
          }
        })
      }
      $scope.Generar_reporte = function () {
        if ($scope.tipodeItem == "0") {
          $scope.vercontenido = false;
          $scope.vercontenidoLMA = false;
        } else {
          $scope.ocultarTodo();
          $scope.vercontenido = true;
          $scope.vercontenidoLMA = true;
          switch ($scope.tipodeItem) {
            case "67"://Cargue de Bases de BDUA Subsidiado
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                responsable: $scope.Rol_Cedula,
              }
              swal({
                title: '¿Desea Generar Proceso BDUA?',
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_BDUA_subsidiado',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intente Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incioVacio();
              $scope.ocultarTodo();
              $scope.vercontenido = false;
              break;
            case "22"://Archivo Tipo 017
              var datosRC = {
                "correo": $scope.correo,
                "regimen": $scope.regimen,
                "anno": $scope.anno,
                "ciclo": $scope.ciclo,
                "mes": $scope.item.IDE,
                "nit": $scope.nit

              }
              swal({
                title: '¿Desea Generar Proceso Archivo Tipo 017?',
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_017',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
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
              $scope.contenido1 = true;
              $scope.regimen = "";
              $scope.anno = "";
              $scope.periodo = "";
              $scope.nit = "";
              break;
            case "72"://Recalculo Contable - Kprecal
              // Recalculo Contable - Kprecal
              var datosRC = {
                "correo": $scope.correo,
                "anno": $scope.anno,
                "mes": $scope.item.IDE

              }
              swal({
                title: '¿Desea Generar Proceso Recalculo Contable - Kprecal?',
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Recalculo_contable',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
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
            case "70"://Cargue Bases de LMA
              // Cargue Bases de LMA
              var datosRC = {
                "correo": $scope.correo,
                "anno": $scope.anno,
                "mes": $scope.item.IDE,
                "fecha": $scope.item.PERF_FINAL,
                "responsable": $scope.Rol_Cedula
              }
              swal({
                title: '¿Desea Generar Proceso LMA?',
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_LMA',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
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
            case "78": //Cargue de Bases de BDUA Contributivo
              if (
                $scope.item == "" ||
                $scope.item == undefined ||
                $scope.anno == "" ||
                $scope.anno == undefined ||
                $scope.periodo == "" ||
                $scope.periodo == undefined
              ) {
                swal({
                  title: "Mensaje",
                  text: "No se puede cargar archivo si no completa todos los campos",
                  type: "warning",
                });
                $scope.contenido1 = true;
              } else {
                var datosRC = {
                  correo: $scope.correo,
                  anno: $scope.anno,
                  mes: $scope.item.IDE,
                  responsable: $scope.Rol_Cedula,
                };
                swal({
                  title: "¿Desea Generar Proceso BDUA?",
                  text: "Generar Proceso",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "#d33",
                  allowOutsideClick: false,
                })
                  .then(function (result) {
                    if (result) {
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false,
                      });
                      $http({
                        method: "POST",
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                          function: "Cargue_BDUA_contributivo",
                          datos: datosRC,
                        },
                      }).then(function (response) {
                        if (response.data.data) {
                          swal({
                            title: "Mensaje",
                            text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                            type: "success",
                          });
                        } else {
                          swal({
                            title: "Mensaje",
                            text: "Por Favor Intente Nuevamente",
                            type: "error",
                            allowOutsideClick: false
                          }).then((result) => {
                            location.reload();
                          });
                        }
                        $scope.respuestata = response.data;
                      });
                    }
                  })
                  .catch(swal.noop);
                $scope.tipodeItem = "0";
                $scope.incioVacio();
                $scope.ocultarTodo();
                $scope.vercontenido = false;
              }
              break;
            case "91": //Cargue Historico Portabilidad
              if (
                $scope.item == "" ||
                $scope.item == undefined ||
                $scope.anno == "" ||
                $scope.anno == undefined ||
                $scope.periodo == "" ||
                $scope.periodo == undefined
              ) {
                swal({
                  title: "Mensaje",
                  text: "No se puede cargar archivo si no completa todos los campos",
                  type: "warning",
                });
                $scope.contenido1 = true;
              } else {
                var datosRC = {
                  correo: $scope.correo,
                  periodo: $scope.item.IDE + "/" + $scope.anno,
                };
                swal({
                  title: "¿Desea Generar Cargue Historico Portabilidad?",
                  text: "Generar Proceso",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "#d33",
                  allowOutsideClick: false,
                })
                  .then(function (result) {
                    if (result) {
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false,
                      });
                      $http({
                        method: "POST",
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                          function: "Cargue_Historico_Portabilidad",
                          datos: datosRC,
                        },
                      }).then(function ({data}) {
                        let validacion = JSON.parse(data.substring(0, data.length - 1));
                        if (validacion.data.message == 'recibido') {
                          swal({
                            title: "Mensaje",
                            text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                            type: "success",
                          }).then((result) => {
                            location.reload();
                          });
                        } else {
                          swal({
                            title: "Mensaje",
                            text: "Por Favor Intente Nuevamente",
                            type: "error",
                            allowOutsideClick: false
                          }).then((result) => {
                            location.reload();
                          });
                        }
                        $scope.respuestata = data;
                      });
                    }
                  })
                  .catch(swal.noop);
                $scope.tipodeItem = "0";
                $scope.incioVacio();
                $scope.ocultarTodo();
                $scope.vercontenido = false;
              }
              break;
          }
        }
      }
      $scope.ocultarTodo = function () {
        $scope.contenido1 = false;
        $scope.contenido2 = false;
      }
      $scope.obtener_fechaConfirmacionLMA = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: {
            function: "obtener_fechaConfirmacionLMA"
          },
        }).then(function ({ data }) {
          if (data) {
            $scope.lma_mes = data[0].mes;
            $scope.lma_anno = data[0].año;
            $scope.lma_fechaentrega = data[0].mesentrega;
          } else {
            $scope.lma_fechaentrega = '';
          }
        });
      }
      $scope.Confirmar_reporte_lma = function () {
        if (!$scope.lma_fechaentrega || $scope.lma_fechaentrega == '') {
          swal("Mensaje", "Error al cargar la fecha de cargue", "info");
          return
        }
        var datosRC = {
          "correo": $scope.correo,
          "anno": $scope.lma_anno,
          "mes": $scope.lma_mes,
          "fecha": $scope.lma_fechaentrega,
          "responsable": $scope.Rol_Cedula
        }
        swal({
          title: "¿Desea confirmar el cargue?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $http({
                method: "POST",
                url: "php/financiera/funcfinanciera.php",
                data: {
                  function: "confirmarLMA",
                  datos: datosRC
                },
              }).then(function (res) {
               //console.log(res);
               // Inicio esta validacion funciona para corregir el error 500 que responde goanywhere
               if (res.data.data) {
                swal({
                  title: "Mensaje",
                  text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                  type: "success",
                });
              } else {
                swal({
                  title: "Mensaje",
                  text: "Por Favor Intente Nuevamente",
                  type: "error",
                  allowOutsideClick: false
                }).then((result) => {
                  location.reload();
                });
                 // Fin del codigo para corregir el error 500 que responde goanywhere
              }
                // $scope.lis_info_LMA = res.data;
               // swal({
               //   title: "Mensaje",
               //   text: res.data.data.message,
                
               //type: "success",
              //  });
                $scope.cancelar_reporte_lma ();
                $scope.incioVacio();
                $scope.ocultarTodo();
                $scope.infoestadoLMA();
              });
            }
          });
      };
      $scope.seleccdeAños = function () {
        var n = (new Date()).getFullYear()
        var select = document.getElementById("ano");
        for (var i = n; i >= 2023; i--)select.options.add(new Option(i, i));
        $scope.listaAnos = select;
      }

      $scope.cancelar_reporte_lma = function () {
        $scope.vercontenidoLMA = false;
        $scope.tipodeItem = '';
      }

      // $scope.Cargue_BDUA = function () {
      //    var datosRC = {
      //       "correo": $scope.correo,
      //       "anno": $scope.anno,
      //       "mes": $scope.periodo

      //    }
      //    swal({
      //       title: '¿Desea Generar Proceso BDUA?',
      //       text: "Generar Proceso",
      //       type: 'info',
      //       showCancelButton: true,
      //       confirmButtonText: "Confirmar",
      //       cancelButtonText: "Cancelar",
      //       cancelButtonColor: "#d33",
      //       allowOutsideClick: false
      //    }).then(function (result) {
      //       if (result) {
      //          swal({
      //             html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      //             width: 200,
      //             allowOutsideClick: false,
      //             allowEscapeKey: false,
      //             showConfirmButton: false,
      //             animation: false
      //          });
      //          $http({
      //             method: 'POST',
      //             url: "php/financiera/reportes/funcreportes.php",
      //             data: {
      //                function: 'Cargue_BDUA',
      //                datos: (datosRC)
      //             }
      //          }).then(function (response) {
      //             swal({
      //                title: "Mensaje",
      //                text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
      //                type: "success",
      //             })
      //             $scope.respuestata = response.data;
      //          });
      //       }
      //    }).catch(swal.noop);
      // }
      $scope.chg_filtrar = function (varFiltro) {
        if ($scope.Vista1[varFiltro] == '' || $scope.Vista1[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.Vista1.Filtrar_tconsulta = '';
        }

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
      $scope.formatPeso = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (num == '.0000') { return '0,00' }
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
            return num + "";
          }
        }
      };
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
