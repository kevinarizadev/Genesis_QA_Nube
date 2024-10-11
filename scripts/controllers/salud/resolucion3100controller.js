"use strict";
angular.module("GenesisApp").controller("resolucion_3100_controller", [
  "$scope",
  "$http",
  "$q",
  function ($scope, $http, $q) {
    $(document).ready(function () {
      $scope.nit = sessionStorage.getItem("nit");
      $scope.seleccionAnt = 0;
      $scope.SysDay = new Date();
      $scope.maxDate = new Date();
      $scope.maxDate = $scope.maxDate.setDate($scope.SysDay.getDate() + 189);
      $scope.auditoriaActual = {
        PLAN_ID_AUDITORIA: "",
        NOMBRE: "",
        NITS_NIT: "",
        EMAIL: "",
        PLAN_SEDE_IPS: "",
        SEDE_NOMBRE: "",
        DEPA_NOMBRE: "",
        MUNI_NOMBRE: "",
        DIRECCION: "",
        FECHA_PROGRAMACION: "",
        PLAF_FECHA_REPROGRAMACION: "",
        RUTA: "",
        PLAC_ESTADO: "",
      };
      $scope.nitSeleccionado = "";
      $(".modal").modal();
      $(".tabs").tabs();
      // $('.modal').modal({ dismissible: false });
      $(".fechas").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy-MM-dd",
        dateInput: true,
      });
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
      if (document.getElementById("fileInput")) {
        document
          .getElementById("fileInput")
          .addEventListener("change", $scope.loadFile, false);
      }
      $scope.inicio();
    });

    $scope.limpiar = function () {
      $scope.avance_hallazgos = {
        Auditoria: "",
        Porcentaje: "",
        Total_Planes: "",
        Total_Subsanados: "",
      };
      $scope.temp = {
        FECHA: "",
        // 'FECHA_AUD': ''
      };
      $scope.usuario = sessionStorage.getItem("cedula");
      $scope.ObtenerGrupoServiciosyServicios();
      $scope.ObtenerAuditores();
      $scope.ObtenerEstandar();
      $scope.lista_preAuditorias = [];
      $scope.lista_servicios_preAuditorias = [];
      $scope.servicios_evaluar = [];
      $scope.InputSearch = "";
      // $scope.InputSearch = '806010305';
      $scope.servicios_evaluar = [];
      $scope.paso = 1;
      $scope.FECHA = "";
      $scope.swEstandar = { sw: false, index: "", documento: "" };
      $scope.JSONpreAuditoria = {
        IPS: "",
        SEDE: "",
        UBICACION: "",
        GRUPO_SERVICIO: [],
        AUDITORES: [],
        FECHA: "",
        RAZON_SOCIAL: "",
      };
      $scope.ArrAuditores = [];
      $scope.ArrAuditoresTemp = [];
      $scope.ArrEstandares = [];
      $scope.ArrEstandaresTemp = [];
      $scope.ArrPrestadores = [];
      $scope.listaGserviciosyServicios = [];
      $scope.listaGserviciosyServiciosTemp = [];
      $scope.lista_preguntasAuditorias = [];
      $scope.lista_preguntasAuditoriasTemp = [];
      $scope.sw = {
        acordeon: false,
        tabs: false,
      };
      $scope.codAuditoria = "";
      $scope.codCriterioTemp = "";
      $scope.codServicioTemp = "";
      $scope.codEstandarTemp = "";
      $scope.arrRespuestas = [];
      $scope.arrPlanMejoramiento = [];
      $scope.arrObservaciones = [];
      $scope.rutasEstandar = [];
    };

    $scope.inicio = function () {
      $scope.limpiar();

      $scope.fechaActual = new Date();
      $scope.arrIcons = [
        { cod: "1", icon: "icon-medkit" },
        { cod: "2", icon: "icon-user-md" },
        { cod: "3", icon: "icon-stethoscope" },
        { cod: "4", icon: "icon-ambulance" },
        { cod: "5", icon: "icon-heartbeat" },
        { cod: "6", icon: "icon-th-list" },
        { cod: 0, icon: "icon-left-open" },
      ];
      setTimeout(() => {
        if ($scope.nit != 0) $scope.listar_pre_auditorias(1);
      }, 300);
    };

    // CONSULTAS BASE DE DATOS
    $scope.ConsultaIPS = function (nit) {
      if (nit == null && nit == "") {
        return swal("Importante", "Debe diligenciar NIT!", "info");
      }
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
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "ConsultaIPS",
          nit: nit,
        },
      })
        .then(function ({ data }) {
          if (data.CODIGO == 0) {
            return swal("Importante", data.MENSAJE, "info");
          } else {
            $scope.JSONpreAuditoria.RAZON_SOCIAL = data[0].razon_social;
            $scope.ArrPrestadores = data;
            $scope.paso = 2;
          }
          swal.close();
        })
        .catch(swal.noop);
    };

    $scope.ObtenerGrupoServiciosyServicios = function () {
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "listaGrupoServicioYservicios",
        },
      })
        .then(function ({ data }) {
          var xdata = data;
          xdata.forEach((e) => {
            e.CHECK = false;
            if (e.CODIGO == 6) {
              e.CHECK = true;
            }
            e.SERVICIOS.forEach((x) => {
              x.CHECK = false;
              if (x.CODIGO == 40) {
                x.CHECK = true;
              }
            });
          });
          $scope.servicios_evaluar = xdata;
          $scope.servicios_evaluarTemp = $scope.servicios_evaluar;
          setTimeout(() => {
            $(".collapsible-header").addClass(function () {
              return "active";
            });
            $(".collapsible").collapsible({ accordion: true });
            $(".collapsible").collapsible({ accordion: true });
          }, 300);
        })
        .catch(swal.noop);
    };

    $scope.ObtenerAuditores = function () {
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "ObtenerAuditores",
        },
      }).then(function ({ data }) {
        var xdata = data;
        xdata.forEach((e) => {
          e.estandar = [];
        });
        $scope.ArrAuditoresTemp = xdata;
        //$scope.ArrAuditoresTemp.forEach((e) => {
          //if (e.documento == sessionStorage.getItem("cedula")) {
            //$scope.addYremoveAuditor(1, e);
            // $scope.ArrAuditores.push(e);
            // let v = $scope.ArrAuditoresTemp.findIndex(e.documento);
          //}
        //});
      });
    };

    $scope.ObtenerEstandar = function () {
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "ObtenerEstandar",
        },
      }).then(function (data) {
        $scope.ArrEstandaresTemp = data.data;
        $scope.ArrEstandares = data.data;
      });
    };

    // LOGICA CONTROLER
    $scope.abrirGrupo = function (x) {
      $scope.servicio_seleccionados = x;
      var btns_servicio_select = document.getElementById(
        "btns_servicio_select"
      );
      btns_servicio_select.classList.remove("slide-out-left");

      if (x.NOMBRE != $scope.servicio_seleccionados.NOMBRE) {
        btns_servicio_select.classList.remove("slide-in-right");
        setTimeout(() => {
          btns_servicio_select.classList.add("slide-in-right");
          $scope.$apply();
        }, 100);
      }
      setTimeout(() => {
        btns_servicio_select.classList.add("slide-in-right");
        document
          .getElementById("contain_acordeon")
          .classList.replace("s12", "s9");
        $scope.$apply();
      }, 15);
    };

    $scope.volver = function () {
      // var bnt_top = document.getElementById("btn_top");
      var btns_servicio_select = document.getElementById(
        "btns_servicio_select"
      );
      if (btns_servicio_select.classList.contains("slide-out-left")) {
        btns_servicio_select.classList.remove("slide-out-left");
      }
      // bnt_top.classList.remove("slide-out-left");
      // $scope.sw.btn_top = true;
      // bnt_top.classList.add('slide-in-right');
      btns_servicio_select.classList.remove("slide-in-right");
      setTimeout(() => {
        btns_servicio_select.classList.add("slide-out-left");
        // btns_servicio_select.classList.add('hide');
        $scope.$apply();
      }, 100);
      setTimeout(() => {
        document
          .getElementById("contain_acordeon")
          .classList.replace("s9", "s12");
        $scope.$apply();
      }, 300);
    };

    $scope.obtener_preguntas = function (servicio, estandar) {
      document.getElementById(estandar).style.color = "#9c1b54";
      if ($scope.seleccionAnt != 0)
        document.getElementById($scope.seleccionAnt).style.color = "black";
      $scope.seleccionAnt = estandar;
      $scope.lista_preguntasAuditoriasTemp = [];
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "listar_criterios",
          codAuditoria: $scope.codAuditoria,
          cedula: $scope.usuario,
          codServicio: servicio,
          codEstandar: estandar,
        },
      }).then(function ({ data }) {
        $scope.lista_preguntasAuditorias = data;
        $scope.lista_preguntasAuditoriasTemp = data;
        $scope.preguntas = true;

        setTimeout(() => {
          $scope.$apply();
          $scope.lista_preguntasAuditoriasTemp.forEach((e) => {
            document.getElementById(
              "C-" +
                e.codigo_servicio +
                "-" +
                e.codigo_estandar +
                "-" +
                e.codigo_criterio
            ).checked = e.check == 1 ? true : false;
            document.getElementById(
              "NC-" +
                e.codigo_servicio +
                "-" +
                e.codigo_estandar +
                "-" +
                e.codigo_criterio
            ).checked = e.check == 2 ? true : false;
            document.getElementById(
              "NA-" +
                e.codigo_servicio +
                "-" +
                e.codigo_estandar +
                "-" +
                e.codigo_criterio
            ).checked = e.check == 3 ? true : false;
          });
        }, 500);
      });
    };

    $scope.guardarAvanceAuditoria = function (x) {
      $scope.arrRespuestas = [];
      x.forEach((e) => {
        $scope.arrRespuestas.push({
          cod_auditoria: $scope.codAuditoria,
          codigo_criterio: e.codigo_criterio,
          codigo_estandar: e.codigo_estandar,
          codigo_servicio: e.codigo_servicio,
          check: e.check,
          observacion: e.observacion,
        });
      });
      // $scope.lista_preguntasAuditoriasTemp

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
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "guardarAvance",
          json: $scope.arrRespuestas,
        },
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != "<br") {
          if (data.CODIGO == 1) {
            // $scope.limpiar();
            return swal("Importante", data.MENSAJE, "success");
          } else {
            return swal("Importante", data.MENSAJE, "error");
          }
        }
        swal.close();
      });
    };

    $scope.ObservacionCriterioAuditoria = function (x) {
      $scope.codCriterioTemp = "";
      if (x.check == 2) {
        $scope.model = 2;
      } else {
        $scope.model = 1;
      }
      $scope.codCriterioTemp = x.codigo_criterio;
      $scope.observacionCriterio = x.observacion;
      $("#modal_registro_observacion_criterio").modal("open");
    };

    $scope.RegistrarObservacion = function (x) {
      if (
        $scope.observacionCriterio != "" &&
        $scope.observacionCriterio != undefined
      ) {
        $scope.lista_preguntasAuditoriasTemp.forEach((e) => {
          if (e.codigo_criterio == $scope.codCriterioTemp) {
            e.observacion = $scope.observacionCriterio;
          }
        });
      }
      $(".modal").modal("close");
    };

    $scope.RegistrarPlan = function () {
      // var fechaValida = $scope.validarFecha($scope.fechaLimite.getDate() + '-' + ((($scope.fechaLimite.getMonth() + 1) < 10) ? '0' + ($scope.fechaLimite.getMonth() + 1) : ($scope.fechaLimite.getMonth() + 1)) + '-' + $scope.fechaLimite.getFullYear());
      if (
        $scope.accion != undefined &&
        $scope.accion != "" &&
        $scope.responsable != undefined &&
        $scope.responsable != "" &&
        $scope.fechaLimite != undefined
      ) {
        $scope.accionMejora = {
          codAuditoria: $scope.codAuditoria,
          codCriterio: $scope.codCriterioTemp,
          accion: $scope.accion,
          responsable: $scope.responsable,
          fechaLimite:
            $scope.fechaLimite.getDate() +
            "-" +
            ($scope.fechaLimite.getMonth() + 1 < 10
              ? "0" + ($scope.fechaLimite.getMonth() + 1)
              : $scope.fechaLimite.getMonth() + 1) +
            "-" +
            $scope.fechaLimite.getFullYear(),
        };
        $scope.arrPlanMejoramiento.push($scope.accionMejora);
        $(".modal").modal("close");
        $scope.accionMejora = "";
      } else {
        swal("Importante", "Debe diligenciar todos los campos!", "info");
      }
    };

    $scope.BuscarUsuarios = function () {
      $scope.setPaso(2);
    };

    $scope.setPaso = function (paso) {
      if (paso == 3) {
        document.getElementById("6_40").setAttribute("disabled", true);
      }
      if (paso == 4) {
        let x = 0;
        $scope.servicios_evaluarTemp.forEach((e) => {
          e.SERVICIOS.forEach((q) => {
            if (e.CHECK) {
              x++;
            }
            if (q.CHECK) {
              x++;
            }
          });
        });
        if (x == 0) {
          swal(
            "Importante",
            "Debe asignar por lo menos un servicio a evaluar",
            "info"
          );
          return;
        }
        $scope.grupoServiciosaAuditar();
        let y = 0;
        $scope.servicios_evaluarTemp.forEach((e) => {
          e.SERVICIOS.forEach((q) => {
            if (e.CHECK) {
              y++;
            }
          });
        });
        if (y < 2) {
          swal(
            "Importante",
            "Debe asignar por lo menos un servicio a evaluar",
            "info"
          );
          return;
        }
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      if (paso == 5) {
        let contadorEstandares = 0;
        if ($scope.ArrAuditores.length == 0) {
          swal("Importante", "Debe asignar por lo menos a un auditor", "info");
          return;
        }
        if ($scope.ArrAuditores.length == 1) {
          $scope.ArrAuditores[0].estandar = $scope.ArrEstandares;
          contadorEstandares = $scope.ArrEstandares.length;
          swal(
            "Importante",
            "Se asignaran todos los estandares a este auditor",
            "info"
          );
          // });
        } else {
          $scope.ArrAuditores.forEach((e) => {
            contadorEstandares = contadorEstandares + e.estandar.length;
            if (e.estandar.length == 0) {
              swal(
                "Importante",
                "Todos los auditores deben auditar almenos 1 estandar",
                "info"
              );
              setTimeout(() => {
                $scope.paso = 4;
                $scope.$apply();
                return;
              }, 500);
            }
          });
        }
        if (contadorEstandares != 7) {
          swal("Importante", "Se deben asignar todos los estandares", "info");
          setTimeout(() => {
            $scope.paso = 4;
            $scope.$apply();
            return;
          }, 500);
        }
      }
      if ($scope.JSONpreAuditoria.IPS != "") {
        $scope.paso = paso;
      } else {
        swal({
          title: "¡Importante!",
          text: "Debe seleccionar una sede",
          type: "warning",
        }).catch(swal.noop);
      }
    };

    $scope.atras = function (val = 0) {
      if (val == 1) {
        $scope.listar_pre_auditorias(0);
        $scope.sw.tabs = false;
        $scope.sw.acordeon = false;
      }
      $scope.paso--;
      if ($scope.paso == 4) {
        $scope.ArrEstandaresTemp = [];
      }
    };

    $scope.grupoServiciosaAuditar = function () {
      var cont = 0;
      for (let i = 0; i < $scope.servicios_evaluarTemp.length; i++) {
        for (
          let j = 0;
          j < $scope.servicios_evaluarTemp[i].SERVICIOS.length;
          j++
        ) {
          if ($scope.servicios_evaluarTemp[i].SERVICIOS[j].CHECK == true) {
            cont++;
          }
        }
        if (cont > 0) {
          $scope.servicios_evaluarTemp[i].CHECK = true;
        } else {
          $scope.servicios_evaluarTemp[i].CHECK = false;
        }
        cont = 0;
      }
    };

    $scope.addYremoveAuditor = function (accion, json) {
      var cont = 0;
      if (accion == 1) {
        if ($scope.ArrAuditores.length < 4) {
          var index = $scope.ArrAuditoresTemp.indexOf(json);
          if (index !== -1) {
            $scope.ArrAuditores.forEach((e) => {
              if (e.documento == json.documento) {
                cont++;
              }
            });
            if (cont == 0) {
              $scope.ArrAuditoresTemp.splice(index, 1);
              $scope.ArrAuditores.push(json);
            } else {
              swal({
                title: "¡Importante!",
                text: "Este auditor ya fue elegido",
                type: "warning",
              }).catch(swal.noop);
            }
          }
        } else {
          swal({
            title: "¡Importante!",
            text: "El maximo de auditores por aditoria es de 4",
            type: "warning",
          }).catch(swal.noop);
        }
      }
      if (accion == 2) {
        var index = $scope.ArrAuditores.indexOf(json);
        if (index !== -1) {
          $scope.ArrAuditores[index].estandar.forEach((e) => {
            $scope.ArrEstandaresTemp.push(e);
          });
          $scope.ArrAuditores.splice(index, 1);
          $scope.ArrAuditoresTemp.push(json);
        }
        if ($scope.ArrAuditores.length == 1) {
          $scope.ObtenerEstandar();
        }
        $scope.swEstandar.sw = !$scope.swEstandar.sw;
      }
      if (accion == 3) {
        var index = $scope.ArrAuditores.indexOf(json);
        if (index !== -1) {
          $scope.ArrAuditores[index].estandar.forEach((e) => {
            $scope.ArrEstandaresTemp.push(e);
          });
          $scope.ArrAuditores.splice(index, 1);
          $scope.ArrAuditoresTemp.push(json);
        }
        $scope.swEstandar.sw = false;
      }
    };

    $scope.setSwal = function (x, y, edit = 0) {
      if (edit == 0) {
        if ($scope.ArrAuditores.length == 1) return;
      }
      $scope.swEstandar.sw = !$scope.swEstandar.sw;
      $scope.swEstandar.index = y;
      $scope.swEstandar.documento = x;
      setTimeout(() => {
        $scope.$apply();
      }, 500);
    };

    $scope.addYremoveEstandar = function (estandar, auditor, accion) {
      let cont = 0;
      let resp = $scope.validaEstadarDeAuditores(estandar);
      let indexAud = $scope.ArrAuditores.indexOf(auditor);
      if (accion == 1) {
        let indexEstd = $scope.ArrEstandaresTemp.indexOf(estandar);
        if (resp == 0) {
          if (indexEstd !== -1) {
            if (indexAud !== -1) {
              $scope.ArrAuditores[indexAud].estandar.push(estandar);
              $scope.ArrEstandaresTemp.splice(indexEstd, 1);
            }
          }
        }
      }
      if (accion == 2) {
        var indexEstd =
          $scope.ArrAuditores[indexAud].estandar.indexOf(estandar);
        if (indexEstd !== -1) {
          if (indexAud !== -1) {
            $scope.ArrEstandaresTemp.push(estandar);
            $scope.ArrAuditores[indexAud].estandar.splice(indexEstd, 1);
          }
        }
      }
      if ($scope.ArrEstandaresTemp.length == 0) {
        $scope.swEstandar.sw = false;
      }
    };

    $scope.validaEstadarDeAuditores = function (estandar) {
      let cont = 0;
      for (let i = 0; i < $scope.ArrAuditores.length; i++) {
        for (let j = 0; j < $scope.ArrAuditores[i].estandar.length; j++) {
          if ($scope.ArrAuditores[i].estandar[j] == estandar) {
            cont++;
          }
        }
      }
      if (cont > 0) {
        return 1;
      }
      return 0;
    };

    $scope.setIPS = function (x) {
      $scope.JSONpreAuditoria.IPS = x.nit;
      $scope.JSONpreAuditoria.SEDE = x.numero_sede;
      $scope.JSONpreAuditoria.UBICACION = x.ubicacion;
      $scope.JSONpreAuditoria.COD_UBICACION = x.cod_ubicacion;
      swal({
        title: "¡Importante!",
        text: "Prestador Seleccionado",
        type: "success",
        timer: 1500,
        showCancelButton: false,
        showConfirmButton: false,
      }).catch(swal.noop);
      $scope.setPaso(3);
    };

    $scope.guardar = function (x) {
      setTimeout(() => {
        $scope.$apply();
      }, 500);
      let json1 = [];

      if (x == "P") {
        if ($scope.JSONpreAuditoria.AUDITORES.length == 0) {
          $scope.ArrAuditores.forEach(function callback(e, index) {
            if (index == 0) {
              $scope.JSONpreAuditoria.AUDITORES.push({
                documento: e.documento,
                estandar: e.estandar,
                rol: 1,
              });
            } else {
              $scope.JSONpreAuditoria.AUDITORES.push({
                documento: e.documento,
                estandar: e.estandar,
                rol: 2,
              });
            }
          });
        }
        $scope.servicios_evaluarTemp.forEach((e) => {
          if (e.CHECK) {
            $scope.JSONpreAuditoria.GRUPO_SERVICIO.push(e);
          }
        });

        $scope.JSONpreAuditoria.GRUPO_SERVICIO.forEach((e) => {
          if (e.CHECK) {
            e.SERVICIOS.forEach((b) => {
              if (b.CHECK) {
                json1.push(b);
              }
            });
            e.SERVICIOS = json1;
            json1 = [];
          }
        });
        $scope.FECHA = $scope.temp.FECHA;
        var fechaLimite = new Date(); //fecha actual
        fechaLimite.setHours(0, 0, 0, 0); //llevar a hora 00:00:00
        fechaLimite.setDate(fechaLimite.getDate() + 30); //sumarle 30 días
        var fechaIngresada = new Date(
          $scope.FECHA.getFullYear(),
          $scope.FECHA.getMonth(),
          $scope.FECHA.getDate()
        );
        if ($scope.JSONpreAuditoria.SEDE != "") {
          if ($scope.JSONpreAuditoria.IPS != "") {
            if ($scope.JSONpreAuditoria.AUDITORES.length > 0) {
              if ($scope.JSONpreAuditoria.GRUPO_SERVICIO.length > 0) {
                if ($scope.FECHA != "" && $scope.FECHA != undefined) {
                  if (fechaIngresada <= fechaLimite) {
                    //   if (($scope.FECHA.getMonth() >= $scope.SysDay.getMonth())) {
                    //     if (($scope.FECHA.getDate() >= $scope.SysDay.getDate())) {
                    // if (($scope.FECHA >= $scope.SysDay) && ($scope.FECHA <= fechaMaxima)) {
                    $scope.JSONpreAuditoria.FECHA =
                      $scope.FECHA.getDate() +
                      "-" +
                      ($scope.FECHA.getMonth() + 1 < 10
                        ? "0" + ($scope.FECHA.getMonth() + 1)
                        : $scope.FECHA.getMonth() + 1) +
                      "-" +
                      $scope.FECHA.getFullYear();
                    swal({ title: "Enviando datos al servidor..." });
                    swal.showLoading();
                    $http({
                      method: "POST",
                      url: "php/salud/resolucion3100/resolucion3100.php",
                      data: {
                        function: "guardar_pre_auditoria",
                        json: JSON.stringify($scope.JSONpreAuditoria),
                      },
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) != "<br") {
                        if (data.CODIGO == 1) {
                          swal("Importante", data.MENSAJE, "success");
                        } else {
                          swal("Importante", data.MENSAJE, "error");
                        }
                        $scope.limpiar();
                      }
                    });
                  } else {
                    return swal(
                      "Importante",
                      "Debe seleccionar una fecha diferente!",
                      "info"
                    );
                  }
                  //   } else {
                  //     return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
                  //   }
                  // } else {
                  //   return swal('Importante', 'Debe seleccionar una fecha diferente!', 'info');
                  // }
                } else {
                  return swal(
                    "Importante",
                    "Debe seleccionar una fecha diferente!",
                    "info"
                  );
                }
              } else {
                return swal(
                  "Importante",
                  "Debe seleccionar almenos 1 grupo de servicio!",
                  "info"
                );
              }
            } else {
              return swal(
                "Importante",
                "Debe seleccionar almenos 1 auditor!",
                "info"
              );
            }
          } else {
            return swal("Importante", "Debe seleccionar un prestador!", "info");
          }
        }
      }
      if (x == "F") {
        swal({
          title: "Realmente",
          text: "desea finalizar la auditoria!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si, Continuar!",
          cancelButtonText: "No, Cancelar!",
        }).then(
          function () {
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
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: "guardarAuditoria",
                cedula: sessionStorage.getItem("cedula"),
                auditoria: $scope.codAuditoria,
              },
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != "<br") {
                if (data.CODIGO == 0) {
                  swal({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    title: "Notificacion",
                    text: data.MENSAJE,
                    type: "info",
                  }).then(() => {
                    $scope.listar_pre_auditorias(0);
                  });
                } else {
                  swal({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    title: "Notificacion",
                    text: data.MENSAJE,
                    type: "success",
                  }).then(() => {
                    $scope.listar_pre_auditorias(0);
                  });
                }
              }
              $scope.sw.tabs = false;
              $scope.sw.acordeon = false;
            });
          },
          function () {
            return false;
          }
        );
      }
    };

    $scope.listar_pre_auditorias = function (tipo) {
      $scope.ArrAuditores = [];
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
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "listar_Pre_Auditoria",
          doc: $scope.nit == 0 ? sessionStorage.getItem("cedula") : $scope.nit,
          auditoria: $scope.codAuditoria != "" ? $scope.codAuditoria : 0,
          tipo: $scope.nit == 0 ? tipo : 1,
        },
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != "<br") {
          if (tipo == 0) {
            $scope.InputSearch = data.length > 0 ? data[0].NITS_NIT : "0";
            const array = data;
            $scope.lista_preAuditorias = array;
            // $scope.lista_preAuditorias = [...array].sort((auditoria1, auditoria2) => {
            //   const fecha1 = new Date(auditoria1.fecha_auditoria.split("/").reverse().join("/"));
            //   const fecha2 = new Date(auditoria2.fecha_auditoria.split("/").reverse().join("/"));
            //   return fecha1 - fecha2;
            // });
          }
          if (tipo == 1) {
            $scope.check_option = true;
            $scope.lista_preAuditorias = data;
          }
          if (tipo != 0 && tipo != 1) {
            $("#modal_resumen").modal("open");
            $scope.lista_servicios_preAuditorias = data;
          }
        }
        swal.close();
      });
    };

    $scope.openModal = function (x) {
      $scope.codAuditoria = x.PLAN_ID_AUDITORIA;
      $scope.auditoriaActual = x;
      $scope.listar_pre_auditorias(2);
    };

    $scope.iniciarAuditoria = function (x) {
      $scope.codAuditoria = parseInt(x.PLAN_ID_AUDITORIA);
      $scope.auditoriaActual = x;
      $scope.sw.tabs = true;
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "listar_grupo_servicio",
          doc: sessionStorage.getItem("cedula"),
          numAuditoria: $scope.auditoriaActual.PLAN_ID_AUDITORIA,
        },
      }).then(function ({ data }) {
        $scope.listaGserviciosyServicios = data;
        $scope.listaGserviciosyServiciosTemp = data;
        $scope.listaGserviciosyServiciosTemp.forEach(function (e, i) {
          $scope.listaGserviciosyServiciosTemp[i].icon = $scope.arrIcons.find(
            (i) => i.cod == e.codigo_grupo_servicio
          );
        });
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      });
    };

    $scope.serviciosAuditoria = function (x) {
      $scope.servicioAuditoria = x;
      if (x.codigo_grupo_servicio == "99") {
        $scope.sw.tabs = false;
        $scope.sw.acordeon = false;
      } else {
        $scope.sw.acordeon = true;
      }
    };

    $scope.tabulaResultados = function (tipo, x) {
      $scope.auditoriaActual = x;
      $scope.tabulaciones = [];
      $("#modal_tabulacion").modal("open");
      if (tipo == 1) {
        $http({
          method: "POST",
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: "tabulacion_resultado",
            cedula: sessionStorage.getItem("cedula"),
            auditoria: x.PLAN_ID_AUDITORIA,
          },
        }).then(function ({ data }) {
          $scope.tabulaciones = data[0];
        });
      }
    };

    $scope.reprogramar = function (x) {
      $scope.auditoriaActual = x;
      $scope.resp = "";
      let SysDay = new Date(x.fecha_auditoria);
      swal({
        title: "Reprogramar auditoria",
        html: `
            <div class="col">
            <label style="font-weight: bold;">Fecha</label>
            <input id="datetimepicker" type="date" class="form-control" style="text-align:center"  min="+ ${SysDay} + " autofocus>
            </div>
            `,
        width: "auto",
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve({
              fecha: $("#datetimepicker").val(),
            });
          });
        },
      })
        .then(function (result) {
          if (result.fecha != "") {
            var fecha = result.fecha.toString().split("-");
            var Fecha_Inicio = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            result.fecha = Fecha_Inicio;
            $http({
              method: "POST",
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: "reprograma_auditoria",
                auditoria: x.PLAN_ID_AUDITORIA,
                fecha_reprogramacion: result.fecha,
                auditor: sessionStorage.getItem("cedula"),
              },
            })
              .then(function ({ data }) {
                swal.close();
                if (data.toString().substr(0, 3) != "<br") {
                  if (data != 0) {
                    if (data.Codigo == 0) {
                      swal({
                        title: "Mensaje",
                        text: data.Nombre,
                        type: "warning",
                      }).catch(swal.noop);
                    } else {
                      swal({
                        title: "Mensaje",
                        text: data.Nombre,
                        type: "success",
                      }).catch(swal.noop);
                    }
                  }
                }
                $scope.listar_pre_auditorias(0);
              })
              .catch(swal.noop);
            defered.resolve(result);
          } else {
            swal({
              title: "Mensaje",
              text: "¡Debe ingresar una fecha!",
              type: "warning",
            }).catch(swal.noop);
          }
          $scope.limpiar();
          $scope.listar_Pre_Auditoria(0);
        })
        .catch(swal.noop);
    };

    $scope.cargue_evidencias = function (tipo, data) {
      $scope.actaReunion = {
        B64: "",
        CODIGO_SERVICIO: 0,
        CODIGO_CRITERIO: 0,
        CODIGO_ESTANDAR: 0,
        CODIGO_AUDITORIA: $scope.codAuditoria,
        NIT: 0,
        RESPONSABLE: 0,
      };
      $scope.codAuditoria = $scope.codAuditoria;
      if (tipo == 1) {
        $scope.auditoriaActual = data;
        $("#modal_cargue_evidencias").modal("open", { dismissible: false });
        setTimeout(() => {
          document
            .querySelectorAll(".file-input-wrapper>input")
            .forEach((element, index) => {
              document
                .querySelector(`#${element.id}`)
                .addEventListener("change", function (e) {
                  var files = e.target.files;
                  if (files.length != 0) {
                    for (let i = 0; i < files.length; i++) {
                      const x = files[i].name.split(".");
                      if (x.pop().toUpperCase() == "PDF") {
                        if (files[i].size < 15485760 && files[i].size > 0) {
                          if (index == 7) {
                            $scope.getBase64(files[i]).then(function (result) {
                              $scope.actaReunion.B64 = result;
                              $scope.actaReunion.CODIGO_AUDITORIA = parseInt(
                                data.PLAN_ID_AUDITORIA
                              );
                              $scope.actaReunion.NIT = parseInt(data.NITS_NIT);
                              $scope.actaReunion.RESPONSABLE =
                                sessionStorage.getItem("cedula");
                              if (files[i].name.length <= 30) {
                                document.querySelector(
                                  `#actaReunion`
                                ).innerHTML = files[i].name;
                              } else {
                                document.querySelector(
                                  `#actaReunion`
                                ).innerHTML =
                                  files[i].name.slice(0, 30 - 3) + "...";
                              }
                              setTimeout(function () {
                                $scope.$apply();
                              }, 300);
                            });
                          }
                          $scope.getBase64(files[i]).then(function (result) {
                            $scope.ArrEstandares[index].B64 = result;
                            $scope.ArrEstandares[index].CODIGO_AUDITORIA =
                              parseInt(data.PLAN_ID_AUDITORIA);
                            $scope.ArrEstandares[index].NIT = parseInt(
                              data.NITS_NIT
                            );
                            $scope.ArrEstandares[index].RESPONSABLE =
                              sessionStorage.getItem("cedula");
                            if (files[i].name.length <= 30) {
                              document.querySelector(
                                `#file-button-text_${index + 1}`
                              ).innerHTML = files[i].name;
                            } else {
                              document.querySelector(
                                `#file-button-text_${index + 1}`
                              ).innerHTML =
                                files[i].name.slice(0, 30 - 3) + "...";
                            }
                            setTimeout(function () {
                              $scope.$apply();
                            }, 300);
                          });
                        } else {
                          document.querySelector(`#${element.id}`).value = "";
                          swal(
                            "Advertencia",
                            "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                            "info"
                          );
                        }
                      } else {
                        document.querySelector(`#${element.id}`).value = "";
                        swal(
                          "Advertencia",
                          "¡El archivo seleccionado debe ser formato PDF!",
                          "info"
                        );
                      }
                    }
                  }
                });
            });
        }, 1000);
      } else {
        $scope.soporteHallazgo = {
          B64: "",
          CODIGO_AUDITORIA: $scope.codAuditoria,
          CODIGO_SERVICIO: data.cod_servicio,
          CODIGO_CRITERIO: data.cod_criterio,
          CODIGO_ESTANDAR: data.cod_estandar,
          NIT: $scope.nitSeleccionado,
          RESPONSABLE: sessionStorage.getItem("cedula"),
        };
        if (tipo == 2) {
          $("#modal_cargue_evidencias_hallazgo").modal("open", {
            dismissible: false,
          });
        }
      }
    };

    $scope.uploadFile = function (tipo_soporte) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      let cont = 0;
      if (tipo_soporte == 1) {
        $scope.ArrEstandares.forEach((e) => {
          if (e.B64 != undefined) cont++;
        });
        if (cont != 7) {
          return swal(
            "Advertencia",
            "¡Debe cargar un archivo de evidencias por cada estandar!",
            "info"
          );
        }
        $scope
          .upload(
            $scope.ArrEstandares,
            tipo_soporte,
            $scope.auditoriaActual.NITS_NIT
          )
          .then(function (result) {
            if (result.toString().substr(0, 3) != "<br") {
              if (result == 0) {
                return swal(
                  "Advertencia",
                  "¡Ocurrio un error al cargar los archivos por favor intente nuevamente!",
                  "info"
                );
              }
              if (result.Codigo == 1) {
                $scope
                  .upload(
                    $scope.actaReunion,
                    4,
                    $scope.auditoriaActual.NITS_NIT
                  )
                  .then(function (result) {
                    if (result.toString().substr(0, 3) != "<br") {
                      if (result.Codigo == 1) {
                        swal({
                          title: "Mensaje",
                          text: result.Nombre,
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          showConfirmButton: true,
                          animation: false,
                          type: "success",
                        }).then((e) => {
                          $("#modal_cargue_evidencias").modal("close");
                          $scope.listar_pre_auditorias(0);
                        });
                      } else {
                        swal({
                          title: "Mensaje",
                          text: result.Nombre,
                          type: "error",
                        }).catch(swal.noop);
                      }
                    }
                  });
              } else {
                swal({
                  title: "Mensaje",
                  text: result.Nombre,
                  type: "error",
                }).catch(swal.noop);
              }
            }
          });
      } else if (tipo_soporte == 2) {
        let file = document.querySelector("#file_hallazgo");
        if (file.files.length != 0) {
          //Valida que exista el archivo
          if (file.files[0].size > 0 && file.files[0].size <= 15485760) {
            //Valida que el archivo no pese mas de 10 Megas
            if (file.files[0].type.split("/")[1].toUpperCase() == "PDF") {
              $scope.getBase64(file.files[0]).then(function (result) {
                $scope.soporteHallazgo.B64 = result;
                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false,
                });
                $scope
                  .upload(
                    $scope.soporteHallazgo,
                    tipo_soporte,
                    $scope.auditoriaActual.NITS_NIT
                  )
                  .then(function (result) {
                    if (result.toString().substr(0, 3) != "<br") {
                      if (result == 0) {
                        return swal(
                          "Advertencia",
                          "¡Ocurrio un error al cargar los archivos por favor intente nuevamente!",
                          "info"
                        );
                      }
                      if (result.Codigo == 1) {
                        $scope.listar_hallazgos($scope.auditoriaActual);
                        swal({
                          title: "Mensaje",
                          text: result.Nombre,
                          type: "success",
                        }).catch(swal.noop);
                      } else {
                        swal({
                          title: "Mensaje",
                          text: result.Nombre,
                          type: "error",
                        }).catch(swal.noop);
                      }
                    }
                  });
                setTimeout(function () {
                  $scope.$apply();
                }, 300);
              });
            } else {
              swal({
                title: "Mensaje",
                text: "Debe cargar un archivo con extension PDF",
                type: "info",
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: "Mensaje",
              text: "Archivo supera los 14 megabites permitidos",
              type: "info",
            }).catch(swal.noop);
          }
        } else {
          swal({
            title: "Mensaje",
            text: "Debe cargar un archivo",
            type: "info",
          }).catch(swal.noop);
        }
        document.getElementById("file_hallazgo").value = "";
        document.getElementById("file-button-text-hallazgo").innerHTML =
          "Seleccionar Arvhivo";
        $("#modal_cargue_evidencias_hallazgo").modal("close");
      }
    };

    $scope.upload = function (file, tipo_soporte, nit) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "uploadFiles",
          file: file,
          nit: nit,
          tipo_soporte: tipo_soporte,
        },
      }).then(function (data) {
        defered.resolve(data.data);
      });
      return promise;
    };

    $scope.obtenerRutas = function (tipo_soporte, data) {
      $scope.auditoriaActual = data;
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "obtenerRutas",
          auditoria:
            data.PLAN_ID_AUDITORIA != undefined
              ? parseInt(data.PLAN_ID_AUDITORIA)
              : parseInt($scope.codAuditoria),
          servicio: data.cod_servicio != undefined ? data.cod_servicio : "",
          estandar: data.cod_estandar != undefined ? data.cod_estandar : "",
          criterio: data.cod_criterio != undefined ? data.cod_criterio : "",
          tipo_soporte: tipo_soporte,
        },
      }).then(function ({ data }) {
        $scope.downloadFilesRutas = data;
        if (tipo_soporte == 1) {
          $("#modal_descarga_archivos").modal("open");
        } else {
          $scope.downloadFiles(data[0].RUTA);
        }
      });
    };

    $scope.downloadFiles = function (ruta) {
      if (ruta != undefined) {
        $http({
          method: "POST",
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: "downloadFiles",
            ruta: ruta,
          },
        }).then(function ({ data }) {
          window.open("temp/" + data.trim());
        });
      }
    };

    $scope.resultado_auditoria = function (x) {
      $scope.auditoriaActual = x;
      $("#modal_resultados_auditoria").modal("open");
      $scope.lista_resultado_auditoria = [];
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      swal.close();
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "resultado_auditoria",
          auditoria: x.PLAN_ID_AUDITORIA,
        },
      }).then(function ({ data }) {
        swal.close();
        if (data.toString().substr(0, 3) != "<br") {
          $scope.lista_resultado_auditoria = data;
        }
      });
      setTimeout(() => {
        $scope.$apply();
      }, 300);
    };

    $scope.porcentaje_avance_hallazgos = function (codAuditoria) {
      if (codAuditoria != null && codAuditoria != "") {
        $http({
          method: "POST",
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: "p_tabulacion_hallazgo",
            codAuditoria: codAuditoria,
          },
        }).then(function ({ data }) {
          $scope.avance_hallazgos = data;
        });
      }
    };

    $scope.listar_hallazgos = function (x) {
      $scope.auditoriaActual = x;
      $scope.codAuditoria = x.PLAN_ID_AUDITORIA;
      $scope.porcentaje_avance_hallazgos($scope.codAuditoria);
      $("#modal_hallazgos").modal("open");
      $scope.lista_hallazgos = [];
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "listar_hallazgos",
          auditoria: x.PLAN_ID_AUDITORIA,
        },
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != "<br") {
          if (data != "0") {
            $scope.lista_hallazgos = data;
            $scope.lista_hallazgos.forEach((e) => {
              if (e.ruta == null) {
                e.ruta = "";
              }
            });
          }
        }
      });
      setTimeout(() => {
        $scope.$apply();
      }, 300);
    };

    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    $scope.ajustesAdmin = function (tipo, dato) {
      $scope.auditoriaActual = dato;
      $scope.indice = 0;
      swal({
        title: "Seleccione Opcion",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: `
            <div class="col">
            <label style="font-weight: bold;">Filtrar por:</label>
            <select id="filtro" class="select-chosen-eps" style="text-align:center">
            <option value="" selected disabled>SELECCIONAR</option>
            <option value="1">INHABILITAR AUDITORIA</option>
            <option value="2">MODIFICAR AUDITORES</option>
            </select>
            </div>
            `,
        width: "300px",
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve({
              resp: $("#filtro").val(),
            });
          });
        },
      }).then(function (result) {
        if (result.resp == "1") {
          swal({
            title: "¿Desea inhabilitar esta auditoria?",
            text: "Una vez inhabilitada no podra reabrirse!",
            type: "question",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, continuar!",
            showCancelButton: true,
            allowOutsideClick: false,
          })
            .catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                $http({
                  method: "POST",
                  url: "php/salud/resolucion3100/resolucion3100.php",
                  data: {
                    function: "inhabilita_auditoria",
                    auditoria: dato.PLAN_ID_AUDITORIA,
                    responsable: $scope.usuario,
                  },
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) != "<br") {
                    $scope.listar_pre_auditorias(0);
                    if (data.CODIGO == 1) {
                      swal({
                        title: "Mensaje",
                        text: data.MENSAJE,
                        type: "success",
                      }).catch(swal.noop);
                    } else {
                      swal({
                        title: "Mensaje",
                        text: data.MENSAJE,
                        type: "info",
                      }).catch(swal.noop);
                    }
                  }
                });
              }
            });

          // if (data != undefined) {
          //
          // }
        } else if (result.resp == "2") {
          if (dato.PLAC_ESTADO == "P") {
            // corregir
            $scope.codAuditoria = dato.PLAN_ID_AUDITORIA;
            $scope.ObtenerEstandar();
            $scope.ArrAuditoresTemp.push();
            $scope.swEstandar.sw = false;
            let auditores = [];
            $scope.ArrAuditores = [];
            $http({
              method: "POST",
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: "listarAuditoresPorAuditoria",
                auditoria: parseInt(dato.PLAN_ID_AUDITORIA),
              },
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != "<br") {
                auditores = data;
                auditores.forEach((a) => {
                  $scope.ArrAuditoresTemp.forEach((au) => {
                    if (au.documento == parseInt(a.identificacion_auditor)) {
                      $scope.ArrEstandaresTemp.forEach((es) => {
                        a.estandar.forEach((e) => {
                          if (e.codigo_estandar == es.CODIGO) {
                            au.estandar.push(es);
                            // let index = $scope.ArrAuditoresTemp.indexOf(es);
                            // $scope.ArrEstandaresTemp.splice(index, 1);
                          }
                        });
                      });
                      $scope.ArrAuditores.push(au);
                      let index = $scope.ArrAuditoresTemp.indexOf(au);
                      $scope.ArrAuditoresTemp.splice(index, 1);
                      setTimeout(() => {
                        $scope.$apply();
                      }, 500);
                    }
                  });
                });
                setTimeout(() => {
                  $scope.ArrEstandaresTemp = [];
                  $scope.$apply();
                }, 500);
                $("#modalCambiarAuditores").modal("open");
              }
            });
          }
          console.log($scope.ArrAuditores);
        } else {
          swal({
            title: "¡Importante!",
            text: "Esta auditoria ya inicio",
            type: "warning",
          }).catch(swal.noop);
        }
      });
    };

    $scope.modalRegistrarPlanMejoramiento = function (x) {
      document.getElementById("responsable").disabled = false;
      document.getElementById("fechaLimite").disabled = false;
      document.getElementById("accion").disabled = false;
      $scope.showBtnAccionMejora = true;
      $scope.responsable = "";
      $scope.fechaLimite = "";
      $scope.accion = "";
      $scope.plan_accion = {
        cod_auditoria: parseInt($scope.codAuditoria),
        codigo_criterio: x.cod_criterio,
        codigo_estandar: x.cod_estandar,
        codigo_servicio: x.cod_servicio,
        plan_accion: "",
        responsable: "",
        fechaLimit: "",
      };
      $("#modal_registro_accion_mejora").modal("open");
    };

    $scope.RegistrarPlanMejoramiento = function (
      accion,
      responsable,
      fechaLimite
    ) {
      $scope.plan_accion.plan_accion = accion;
      $scope.plan_accion.responsable = responsable;
      $scope.plan_accion.fechaLimit =
        fechaLimite.getDate() +
        "-" +
        (fechaLimite.getMonth() + 1 < 10
          ? "0" + (fechaLimite.getMonth() + 1)
          : fechaLimite.getMonth() + 1) +
        "-" +
        fechaLimite.getFullYear();
      // $scope.plan_accion.fechaLimit = fechaLimite;
      $http({
        method: "POST",
        url: "php/salud/resolucion3100/resolucion3100.php",
        data: {
          function: "inserta_plan_accion",
          plan: $scope.plan_accion,
        },
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != "<br") {
          if (data.CODIGO == 1) {
            swal({
              title: "Mensaje",
              text: data.MENSAJE,
              type: "success",
            }).catch(swal.noop);
          } else {
            swal({
              title: "Mensaje",
              text: data.MENSAJE,
              type: "error",
            }).catch(swal.noop);
          }
        }
        $scope.listar_hallazgos($scope.auditoriaActual);

        $scope.accion = "";
        $scope.responsable = "";
        $scope.fechaLimite = "";
        $("#modal_registro_accion_mejora").modal("close");
      });
    };

    $scope.contaTextArea = function (model, id) {
      setTimeout(() => {
        $scope.$apply();
      }, 500);
      const contador = document.getElementById(id);
      const caracteresRestantes = 1500 - $scope[model].length;
      contador.innerHTML = `${caracteresRestantes} caracteres restantes`;
      setTimeout(() => {
        $scope.$apply();
      }, 300);
    };

    $scope.gestion_plan_accion = function (estado, data) {
      $scope.observacion = "";
      $scope.fechaSeguimiento = "";
      if (estado == 1) {
        if (data.estado == "P" && data.ruta == "") {
          var currentDate = new Date();
          var maxDate = new Date(
            currentDate.getFullYear() + 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          setTimeout(() => {
            $("#fechaSeguimiento").kendoDatePicker({
              start: "year",
              depth: "year",
              format: "MM/yyyy",
              parseFormats: ["MM/yyyy"],
              value: currentDate,
              min: currentDate,
              max: maxDate,
            });
          }, 300);

          swal({
            title: "FECHA DE SEGUIMIENTO",
            showCancelButton: false,
            confirmButtonText: "REGISTRAR",
            allowOutsideClick: false,
            allowEscapeKey: false,
            html: `
          <div class="row" style="margin: 1%">
          <div class="col s10">
          <input type="date" id="fechaSeguimiento" class="margin border-none input-text-new w-100 m-l"
          autocomplete="off">
          </div>
          </div>
                    `,
            preConfirm: function () {
              return new Promise(function (resolve) {
                resolve({
                  resp: document.getElementById("fechaSeguimiento").value,
                });
              });
            },
          }).then(function (result) {
            $scope.fechaSeguimiento = result.resp;
            $http({
              method: "POST",
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: "gestion_plan_accion",
                codigo_auditoria: $scope.auditoriaActual.PLAN_ID_AUDITORIA,
                codigo_servicio: data.cod_servicio,
                codigo_estandar: data.cod_estandar,
                codigo_criterio: data.cod_criterio,
                observacion: $scope.observacion,
                fechaObservacion: $scope.fechaSeguimiento,
                estado: estado == 1 ? "A" : "R",
                tipo_accion: data.ruta == "" && data.estado == "P" ? 1 : 2,
              },
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != "<br") {
                if (data.CODIGO == 1) {
                  $scope.listar_hallazgos($scope.auditoriaActual);
                  swal({
                    title: "Mensaje",
                    text: data.MENSAJE,
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "Mensaje",
                    text: data.MENSAJE,
                    type: "error",
                  }).catch(swal.noop);
                }
              }
            });
          });
        } else {
          $scope.fechaSeguimiento = "";
          $http({
            method: "POST",
            url: "php/salud/resolucion3100/resolucion3100.php",
            data: {
              function: "gestion_plan_accion",
              codigo_auditoria: $scope.auditoriaActual.PLAN_ID_AUDITORIA,
              codigo_servicio: data.cod_servicio,
              codigo_estandar: data.cod_estandar,
              codigo_criterio: data.cod_criterio,
              observacion: $scope.observacion,
              fechaObservacion: $scope.fechaSeguimiento,
              estado: estado == 1 ? "A" : "R",
              tipo_accion: data.ruta == "" && data.estado == "P" ? 1 : 2,
            },
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != "<br") {
              if (data.CODIGO == 1) {
                $scope.listar_hallazgos($scope.auditoriaActual);
                swal({
                  title: "Mensaje",
                  text: data.MENSAJE,
                  type: "success",
                }).catch(swal.noop);
              } else {
                swal({
                  title: "Mensaje",
                  text: data.MENSAJE,
                  type: "error",
                }).catch(swal.noop);
              }
            }
          });
        }
      }
      if (estado == 2) {
        if (data.estado == "P") {
          swal({
            title: "OBSERVACION",
            showCancelButton: false,
            confirmButtonText: "REGISTRAR",
            allowOutsideClick: false,
            allowEscapeKey: false,
            html: `
          <div class="row" style="margin: 1%">
          <div class="row">
          <div class="col s12" style="overflow: auto; height: 30vh; max-height: 30vh;">
            <textarea ng-model="observacion_hallazgo" id="observacion_hallazgo" maxlength="1500" style="height: 80%;"
              ng-change="contaTextArea('observacion_hallazgo','observacion_hallazgo')"></textarea>
            <label>Acción para el cumplimiento</label>
          </div>
          <div id="observacion_hallazgo"></div>
        </div>
          </div>
                    `,
            width: "700px",
            preConfirm: function () {
              return new Promise(function (resolve) {
                resolve({
                  resp: document.getElementById("observacion_hallazgo").value,
                });
              });
            },
          }).then(function (result) {
            $scope.observacion = result.resp;
            $http({
              method: "POST",
              url: "php/salud/resolucion3100/resolucion3100.php",
              data: {
                function: "gestion_plan_accion",
                codigo_auditoria: $scope.auditoriaActual.PLAN_ID_AUDITORIA,
                codigo_servicio: data.cod_servicio,
                codigo_estandar: data.cod_estandar,
                codigo_criterio: data.cod_criterio,
                observacion: $scope.observacion,
                fechaObservacion: $scope.fechaSeguimiento,
                estado: estado == 1 ? "A" : "R",
                tipo_accion: data.ruta == "" && data.estado == "P" ? 1 : 2,
              },
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != "<br") {
                if (data.CODIGO == 1) {
                  $scope.listar_hallazgos($scope.auditoriaActual);
                  swal({
                    title: "Mensaje",
                    text: data.MENSAJE,
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "Mensaje",
                    text: data.MENSAJE,
                    type: "error",
                  }).catch(swal.noop);
                }
              }
            });
          });
        }
      }
      if (estado == 3) {
        $scope.fechaSeguimiento = "";
        let observacion =
          "Hallazgo en ejecucion, sin embargo este no ha finalizado";
        $http({
          method: "POST",
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: "gestion_plan_accion",
            codigo_auditoria: $scope.auditoriaActual.PLAN_ID_AUDITORIA,
            codigo_servicio: data.cod_servicio,
            codigo_estandar: data.cod_estandar,
            codigo_criterio: data.cod_criterio,
            observacion: observacion,
            fechaObservacion: $scope.fechaSeguimiento,
            estado: "E",
            tipo_accion: data.ruta == "" && data.estado == "P" ? 1 : 2,
          },
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != "<br") {
            if (data.CODIGO == 1) {
              $scope.listar_hallazgos($scope.auditoriaActual);
              swal({
                title: "Mensaje",
                text: data.MENSAJE,
                type: "success",
              }).catch(swal.noop);
            } else {
              swal({
                title: "Mensaje",
                text: data.MENSAJE,
                type: "error",
              }).catch(swal.noop);
            }
          }
        });
      }
    };

    $scope.verPlan = function (x) {
      $scope.responsable = x.responsable;
      $scope.fechaLimite = new Date(x.fecha_limite);
      $scope.accion = x.plan_accion;
      $scope.plazo = x.plazo;
      $scope.backgroundColor = {
        "background-color":
          x.plazo == "corto" ? "green" : x.plazo == "mediano" ? "blue" : "red",
      };
      $scope.showBtnAccionMejora = false;
      $("#modal_registro_accion_mejora").modal("open");
      document.getElementById("responsable").disabled = true;
      document.getElementById("fechaLimite").disabled = true;
      document.getElementById("accion").disabled = true;
      // document.getElementById("btn_registrarPlan").disabled = true;
      // document.getElementById("btn_registrarPlan").style.display = 'none';
    };

    $scope.finalizarAuditoria = function (x) {
      $scope.auditoriaActual = x;
      swal({
        title: "MENSAJE",
        text: "¿Esta seguro de finalizar la auditoria?",
        type: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        cancelButtonText: "No, continuar!",
        confirmButtonText: "Si, finalizar!",
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve(true);
          });
        },
      })
        .then((res) => {
          //usar el sp de listar_hallazgos para continuar
          if (res) {
            swal({
              html: `<div class="loading">
                <div class="default-background"></div>
                <div class="default-background"></div>
                <div class="default-background"></div>
                </div><p style="font-weight: bold;">Espere un momento por favor...</p>
          `,
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false,
            });
          }

          $http({
            method: "POST",
            url: "php/salud/resolucion3100/resolucion3100.php",
            data: {
              function: "listar_hallazgos",
              auditoria: x.PLAN_ID_AUDITORIA,
            },
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != "<br") {
              if (data == 0) {
                $http({
                  method: "POST",
                  url: "php/salud/resolucion3100/resolucion3100.php",
                  data: {
                    function: "cerrar_auditoria",
                    auditoria: x.PLAN_ID_AUDITORIA,
                  },
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) != "<br") {
                    swal({
                      title: "Mensaje",
                      text: data.MENSAJE,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: true,
                      animation: false,
                      type: data.CODIGO == 1 ? "success" : "error",
                    }).then((e) => {
                      $scope.listar_pre_auditorias(0);
                    });
                  }
                });
              } else {
                swal({
                  title: "Mensaje",
                  text: "Aun quedan pendientes algunos hallazgos",
                  type: "error",
                }).catch(swal.noop);
              }
            }
          });
        })
        .catch(swal.noop);
    };

    $scope.verSeguimientos = function (seguimientos) {
      $scope.seguimientos = seguimientos;
      $("#modal_seguimientos").modal("open");
    };

    $scope.actualizarAuditores = function (ArrAuditores) {
      let json = {
        AUDITORES: ArrAuditores,
        CODIGO_AUDITORIA: $scope.codAuditoria,
      };
      if (json.AUDITORES != undefined && json.CODIGO_AUDITORIA != undefined) {
        swal({ title: "Enviando datos al servidor..." });
        swal.showLoading();
        json.AUDITORES.forEach(function callback(e, i) {
          if (i == 0) {
            e.rol = "1";
          } else {
            e.rol = "2";
          }
        });
        $http({
          method: "POST",
          url: "php/salud/resolucion3100/resolucion3100.php",
          data: {
            function: "actualizarAuditores",
            json: JSON.stringify(json),
          },
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != "<br") {
            swal({
              title: "Mensaje",
              text: data.MENSAJE,
              type: "info",
            }).catch(swal.noop);
          }
        });
      }
    };
  },
]);
