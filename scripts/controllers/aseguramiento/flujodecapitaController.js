"use strict";
angular.module("GenesisApp").controller("flujodecapitaController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.tipodeItem = 0;
    $scope.Rol_Cedula = sessionStorage.getItem("cedula");
    $scope.rolcod = sessionStorage.getItem("rolcod");
    $(document).ready(function () {
      $scope.SysDay = new Date();
      $scope.verTemp_a_oficial = false;
      $scope.obtener_correo();
      $scope.listar_Procesos();
      $scope.Limpiar();
      $scope.obtenerMes();
      // $scope.seleccdeAnnos();
      $scope.Filtrar_Sol = 10;
      $scope.Vista1 = {
        Mostrar_Sol: 10,
      };
      $scope.list_DatosTemp = [];
      $scope.Rol_Cedula = sessionStorage.getItem("cedula");
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
    $scope.Limpiar = function () {
      $scope.paso1 = {
        annoActual: "",
        Mes: "",
      };
      $scope.btnGuardarDsb = false;
      setTimeout(() => {
        $scope.$apply();
      }, 700);
    };
    $scope.obtener_token = function () {
      $http({
        method: "POST",
        url: "php/aseguramiento/flujo_de_capita.php",
        data: {
          function: "obtener_token",
        },
      }).then(function (response) {
        $scope.respuestat = response.data;
      });
    };
    $scope.obtener_correo = function () {
      $http({
        method: "POST",
        url: "php/financiera/reportes/funcreportes.php",
        data: {
          function: "obtener_correo",
          codigoc: $scope.Rol_Cedula,
        },
      }).then(function (response) {
        $scope.correo = response.data.Correo;
        $scope.respuestac = response.data;
      });
    };
    $scope.listar_Procesos = function () {
      $http({
        method: "POST",
        url: "php/aseguramiento/flujodecapita.php",
        data: { function: "listar_item_Reporte" },
      }).then(function ({ data }) {
        if (data && data.toString().substr(0, 3) != "<br") {
          $scope.selec_tipo_Proceso = data;
        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: data,
            type: "warning",
          }).catch(swal.noop);
        }
      });
    };
    $scope.listar_historicoRS = function () {
      swal({
        title: "Cargando...",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      swal.showLoading();
      $scope.Vista1_datos = [];
      $http({
        method: "POST",
        url: "php/aseguramiento/flujodecapita.php",
        data: { function: "listarhistoricoRS" },
      }).then(function ({ data }) {
        swal.close();
        $scope.Vista1_datos = data;
        $scope.initPaginacion(data);
      });
    };
    $scope.listar_historicoRC = function () {
      swal({
        title: "Cargando...",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
      swal.showLoading();
      $scope.Vista1_datos = [];
      $http({
        method: "POST",
        url: "php/aseguramiento/flujodecapita.php",
        data: { function: "listarhistoricoRC" },
      }).then(function ({ data }) {
        swal.close();
        $scope.Vista1_datos = data;
        $scope.initPaginacion(data);
      });
    };
    $scope.changeItem = function (item) {
      $scope.item = JSON.parse(item);
    };
    $scope.SeleccionarItem = function () {
      console.log($scope.tipodeItem);
      if ($scope.tipodeItem == "0") {
        $scope.vercontenidoCapita = false;
      } else {
        $scope.ocultarTodo();
        $scope.vercontenidoCapita = true;
        switch ($scope.tipodeItem) {
          case "1": // Paso 1
            $scope.titulo_selec_Proceso = "Paso 1";
            $scope.titulo_segundario = "Cargue Archivo Insumo Precapita";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "2": // Paso 2
            $scope.titulo_selec_Proceso = "Paso 2";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "3": // Paso 3
            $scope.titulo_selec_Proceso = "Paso 3";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "4": // Paso 4
            $scope.titulo_selec_Proceso = "Paso 4";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "5": // Paso 5
            $scope.titulo_selec_Proceso = "Paso 5";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "6": // Paso 6
            $scope.titulo_selec_Proceso = "Paso 6";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "7": // Paso 7
            $scope.titulo_selec_Proceso = "Paso 7";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "8": // Unificacion de contratos RC
            $scope.titulo_selec_Proceso = "Unificacion de contratos RC";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
            case "9": // Unificacion de contratos RC
            $scope.titulo_selec_Proceso = "Unificacion de contratos RS";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = false;
            break;
          case "10": // Paso 10
            $scope.titulo_selec_Proceso = "RC Exportar Temp a Oficial";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = true;
            $scope.listar_historicoRC();
            break;
          case "11": // Paso 11
            $scope.titulo_selec_Proceso = "RS Exportar Temp  a Oficial";
            $scope.titulo_Paso_1 = true;
            $scope.verTemp_a_oficial = true;
            $scope.listar_historicoRS();
            break;
        }
      }
    };
    $scope.generar_flujo_de_Capita = function (x) {
      if ($scope.tipodeItem == "0") {
        $scope.vercontenidoCapita = false;
      } else {
        $scope.ocultarTodo();
        $scope.vercontenido = true;
        $scope.vercontenidoCapita = true;
        switch ($scope.tipodeItem) {
          case "1": // Paso 1
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_1_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "2": // Paso 2
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_2_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "3": // Paso 3
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_3_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "4": // Paso 4
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_4_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "5": // Paso 5
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_5_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "6": // Paso 6
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_6_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "7": // Paso 7
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso del paso 1?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "paso_7_Capita",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "8": // Unificacion de contratos RC
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso Unificacion de contratos RC?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "Unificacion_de_contratos_RC",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "9": // Unificacion de contratos RS
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso Unificacion de contratos RS?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "Unificacion_de_contratos_RS",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "10": // RC Exportar Temp a Oficial
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "SP_capita_cargue_historico_RC",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
          case "11": //RS Exportar Temp  a Oficial
            var datosRC = {
              correo: $scope.correo,
              periodo: $scope.paso1.Mes + "/" + $scope.paso1.annoActual,
            };
            swal({
              title: "¿Desea Generar Proceso?",
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
                    url: "php/aseguramiento/flujodecapita.php",
                    data: {
                      function: "SP_capita_cargue_historico_RS",
                      datos: datosRC,
                    },
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Proceso ejecutado en segundo plano, cuando finalice, recibira un correo corporativo indicando el estado del cargue",
                        type: "success",
                      });
                      $scope.paso1.Mes = "";
                      $scope.listar_Procesos();
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false,
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
              .catch(swal.noop);
            break;
        }
      }
    };
    $scope.ocultarTodo = function () {
      $scope.contenido1 = false;
      $scope.contenido2 = false;
    };
    $scope.obtenerMes = function () {
      $scope.paso1.annoActual = $scope.SysDay.getFullYear();
      var mes = $scope.SysDay.getMonth();
      var mesActual = mes  - 1;
      $scope.Mes = mesActual;
      $scope.Mes = [
        {
          codigo: "1",
          nombre: "Enero",
        },
        {
          codigo: "2",
          nombre: "Febrero",
        },
        {
          codigo: "3",
          nombre: "Marzo",
        },
        {
          codigo: "4",
          nombre: "Abril",
        },
        {
          codigo: "5",
          nombre: "Mayo",
        },
        {
          codigo: "6",
          nombre: "Junio",
        },
        {
          codigo: "7",
          nombre: "Julio",
        },
        {
          codigo: "8",
          nombre: "Agosto",
        },
        {
          codigo: "9",
          nombre: "Septiembre",
        },
        {
          codigo: "10",
          nombre: "Octubre",
        },
        {
          codigo: "11",
          nombre: "Noviembre",
        },
        {
          codigo: "12",
          nombre: "Diciembre",
        },
      ];
      var meses = $scope.Mes.filter(function (x) {
        return x.codigo >= mes;
      }).map(function (x) {
        return {
          codigo: x.codigo,
          nombre: x.nombre,
        };
      });
      $scope.listadeMeses = meses;
    };
    $scope.cancelar_proceso_Capita = function () {
      $scope.tipodeItem = "";
      $scope.vercontenidoCapita = false;
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
    $(window).on("resize", function () {
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
  },
]);
