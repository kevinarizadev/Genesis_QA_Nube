"use strict";
angular.module("GenesisApp").controller("pre_validador_202_controller", [
  "$scope",
  "$http",
  "$q",
  function ($scope, $http, $q) {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
      $(".modal").modal();
      // $('.modal').modal({ dismissible: false });
      $(".fechas").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy-MM-dd",
        dateInput: true,
      });

      $scope.init();
    });

    $scope.init = function () {
      $scope.tipoUsuario = sessionStorage.getItem("nit");
      $scope.tipoUsuario != 0 ? $scope.obtenerIPS($scope.tipoUsuario) : null;
      $scope.paso = 1;
      $scope.tab = 1;
      $scope.InputSearch = "";
      $scope.IPS = "";
      $scope.Annos = [];
      $scope.Periodos = [];
      $scope.Trimestres = [
        { IDE: 1, NOMBRE: "TRIMESTRE 1" },
        { IDE: 2, NOMBRE: "TRIMESTRE 2" },
        { IDE: 3, NOMBRE: "TRIMESTRE 3" },
        { IDE: 4, NOMBRE: "TRIMESTRE 4" },
      ];
      $scope.fileInput = "";
      $scope.anno = "";
      $scope.periodo = "";
      $scope.regimen = "";
      $scope.placeholder = "";
    };

    $scope.soloNumeros = function () {
      let input = document.getElementById("Form_Nombre");
      let valor = input.value;
      var patron = /^[0-9]{0,15}$/;
      if (!patron.test(valor)) {
        input.value = input.value.slice(0, -1);
      }
    };

    $scope.obtenerIPS = function (nit) {
      if (!nit) {
        return swal("Importante", "Debe diligenciar NIT!", "info");
      }
      $scope.placeholder = "";
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
        url: "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
        data: {
          function: "ConsultaIPS",
          nit: nit,
        },
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) != "<br") {
          if (data.CODIGO == 0) {
            if (nit != 0) {
              return swal("Importante", data.MENSAJE, "info");
            }
            $scope.IPS = {
              nit: "0",
              razon_social: "CONSOLIDADO",
            };
            $scope.cargaAnnos();
          } else {
            $scope.IPS = data[0];
            $scope.cargaAnnos();
          }
          swal.close();
        } else {
          swal("Error", "Parametro de busqueda errado", "error");
        }
      });
    };

    $scope.cargaAnnos = function () {
      let annoTemp = {
        ANNO: new Date().getFullYear().toString(),
      };
      $http({
        method: "POST",
        url: "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
        data: { function: "cargaannos" },
      }).then(function (res) {
        if (res.data.toString().substr(0, 3) != "<br") {
          if (res.data.length > 0) {
            $scope.Annos = res.data;
            $scope.anno = res.data[0].ANNO;
            $scope.cargaPeriodos(res.data[0].ANNO);
          } else {
            $scope.Annos.push(annoTemp);
            $scope.anno = $scope.Annos[0].ANNO;
          }
        }
        setTimeout(() => {
          $scope.$apply();
        }, 300);
        $scope.paso = 2;
      });
    };

    $scope.cargaPeriodos = function (anno) {
      if ($scope.anno != "") {
        $scope.anno = anno;
        $http({
          method: "POST",
          url: "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
          data: { function: "cargaperiodos", anno: anno },
        }).then(function (res) {
          if (res.data.toString().substr(0, 3) != "<br") {
            if (res.data.length > 0) {
              $scope.Periodos = res.data;
              // $scope.periodo = res.data[0].IDE;
              // $scope.actualizaPlaceHolder($scope.anno, $scope.periodo);
            } else {
              // $scope.Annos.push(annoTemp);
              // $scope.anno = $scope.Annos[0];
            }
          }
        });
      }
    };

    $scope.actualizaPlaceHolder = function (anno, periodo, regimen = "") {
      $scope.XnombreArch = "";
      if (document.getElementById("fileInput")) {
        let Xperiodo = periodo < 10 ? "0" + periodo : periodo;
        let placeholder =
          $scope.IPS.nit != undefined ? $scope.IPS.nit : $scope.idUser;
        var Xplaceholder = "";
        if (regimen != "") {
          $scope.XnombreArch =
            $scope.IPS.nit + "_" + Xperiodo + anno + "_" + regimen;
          Xplaceholder =
            "Archivo ( " +
            placeholder +
            "_" +
            Xperiodo +
            anno +
            "_" +
            regimen +
            ".txt )";
          $scope.placeholder =
            placeholder + "_" + Xperiodo + anno + "_" + regimen + ".txt";
        } else {
          $scope.XnombreArch = $scope.IPS.nit + "_" + Xperiodo + anno;
          Xplaceholder =
            "Archivo ( " + placeholder + "_" + Xperiodo + anno + ".txt )";
          $scope.placeholder = placeholder + "_" + Xperiodo + anno + ".txt";
        }

        setTimeout(() => {
          $scope.$apply();
        }, 500);
        document
          .querySelector("#file-upload-wrapper")
          .setAttribute("data-text", Xplaceholder);
      }
    };

    $scope.loadFile = function (x) {
      // var ValidarExistente = false;
      if (x == "A") {
        var y = $scope.dataActMed.ruta.split("/");
        var nombreAct = y[6] + "_" + y[5] + y[4];
        $scope.XnombreArch = nombreAct;
        $scope.inputFile = document.querySelector("#Actualizarfile");
        $scope.Ano = parseInt(y[4]);
        $scope.periodo = parseInt(y[5]);
      } else {
        $scope.inputFile = document.querySelector("#fileInput");
      }
      // $scope.inputFile = document.querySelector('#fileInput');
      if ($scope.inputFile.files[0].name.split(".")[0] == $scope.XnombreArch) {
        if (
          $scope.inputFile.files[0].name.split(".")[1].toUpperCase() == "TXT"
        ) {
          if ($scope.inputFile.files.length != 0) {
            //Valida que exista el archivo
            // if ($scope.inputFile.files[0].size > 0 && $scope.inputFile.files[0].size <= 18085760) { //Valida que el archivo no pese mas de 10 Megas
            document
              .querySelector("#file-upload-wrapper2")
              .setAttribute("data-text", $scope.inputFile.files[0].name);
            document
              .querySelector("#file-upload-wrapper2")
              .classList.add("green-custom");
            if (x == "A") {
              $scope.ValidarArchivo(2, $scope.Ano, $scope.periodo);
              // tipo año periodo
            }
            setTimeout(() => {
              $scope.$apply();
            }, 500);
            // } else {
            //     swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 18 megabytes', 'error');
            //     document.getElementById('fileInput').value = '';
            // }
          } else {
            swal("Advertencia", "¡Ya existe un archivo en el sistema!", "info");
            if (document.getElementById("fileInput") != null) {
              document.getElementById("fileInput").value = "";
            }
          }
        } else {
          swal(
            "Tipo de archivo incorrecto",
            "Extension del archivo incorrecta debe ser .txt",
            "warning"
          );
          if (document.getElementById("fileInput") != null) {
            document.getElementById("fileInput").value = "";
          }
        }
      } else {
        swal(
          "Nombre de archivo incorrecto",
          "Debe ingresar archivo con nombre valido",
          "warning"
        );
        if (document.getElementById("fileInput") != null) {
          document.getElementById("fileInput").value = "";
        }
      }
    };

    $scope.ValidarArchivo = function (tipo, anno, periodo, regimen) {
      if ($scope.IPS.nit == "0") {
        if (regimen == "")
          return swal({
            title: "!NOTIFICACION¡",
            type: "error",
            text: "Debe elegir un regimen",
          }).catch(swal.noop);
      }
      var formData = new FormData();
      formData.append("tipo", tipo);
      formData.append("anno", $scope.anno);
      formData.append("periodo", periodo);
      formData.append("function", "validaEstructura");
      formData.append("fileName", $scope.XnombreArch);
      formData.append("file", $scope.inputFile.files[0]);
      formData.append("regimen", regimen != "" ? regimen : "NA");
      if (tipo == 2) {
        formData.append("codProceso", $scope.dataActMed.proceso);
      }
      if (anno != "" && periodo != "") {
        swal({ title: "Cargando...", allowOutsideClick: false });
        swal.showLoading();
        $http
          .post(
            "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
            formData,
            {
              transformRequest: angular.identity,
              headers: { "Content-Type": undefined },
            }
          )
          .then(function (response) {
            if (response.data.length != 0) {
              if (
                tipo == 1
                  ? response.data[0].tipo_error.CODIGO == 0
                  : response.data[0].tipo_error == 1
              ) {
                if (response.data[0].errores.length > 0) {
                  var list =
                    "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                  list +=
                    "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" +
                    $scope.XnombreArch +
                    " <small class='float-right red-text'> Errores: " +
                    response.data[0].errores.length +
                    "</small>" +
                    "</div><div class='collapsible-body'>";
                  response.data[0].errores.forEach(function (error, j) {
                    console.log(error);
                    list +=
                      "<p style='padding: 1rem;'><span><b>Error: </b>" +
                      error.mensaje +
                      " en la <b>fila: </b> " +
                      error.fila +
                      " <b>columna: </b>" +
                      error.columna +
                      "</p>";
                  });
                  list += "</div></li>";
                  swal({
                    title: "Advertencia",
                    width: 800,
                    html:
                      "<b>" +
                      "Los siguientes archivos presentan errores de estructura." +
                      "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" +
                      list +
                      "</ul>",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    // confirmButtonText: "Descargar",
                    showCloseButton: true,
                    type: "warning",
                  })
                    .then((resp) => {
                      if (resp) {
                        window.open(
                          "php/saludpublica/pre-resolucion202/formato_errores.php?data=" +
                            JSON.stringify(response.data[0])
                        );
                      }
                    })
                    .catch(swal.noop);
                  $(document).ready(function () {
                    $(".collapsible").collapsible();
                  });
                }
              } else {
                if (tipo == 1) {
                  if (response.data[0].tipo_error.CODIGO == 1) {
                    swal({
                      title: "!NOTIFICACION¡",
                      type: "error",
                      text:
                        response.data[0].errores[0].mensaje +
                        " en columna " +
                        response.data[0].errores[0].columna +
                        " fila " +
                        response.data[0].errores[0].fila,
                    }).catch(swal.noop);
                  } else if (response.data[0].tipo_error.CODIGO == 2) {
                    swal({
                      title: "!NOTIFICACION¡",
                      type: "error",
                      text: response.data[1].resp[0].Nombre,
                    }).catch(swal.noop);
                  } else {
                    if (response.data[1].resp[0].Codigo == 0) {
                      swal({
                        title: "!NOTIFICACION¡",
                        type: "success",
                        text:
                          response.data[1].resp[0].Nombre +
                          " Numero de radicado: " +
                          response.data[1].resp[0].Proceso,
                      }).catch(swal.noop);
                    } else {
                      swal({
                        title: "!NOTIFICACION¡",
                        type: "error",
                        text: response.data[1].resp[0].Nombre,
                      }).catch(swal.noop);
                    }
                  }
                } else if (tipo == 2) {
                  if (response.data[1].resp.Codigo == 0) {
                    swal({
                      title: "!NOTIFICACION¡",
                      type: "success",
                      text: response.data[1].resp.Archivo,
                    }).catch(swal.noop);
                  } else {
                    swal({
                      title: "!NOTIFICACION¡",
                      type: "error",
                      text: response.data[1].resp[0].Nombre,
                    }).catch(swal.noop);
                  }
                  $scope.obtenerCargues();
                  $(".modal").modal("close");
                } else {
                  swal({
                    title: "!NOTIFICACION¡",
                    type: "error",
                    text: "OCURRIO UN ERROR COMUNIQUESE CON AREA TIC",
                  }).catch(swal.noop);
                }
              }
            }
          });
      } else {
        swal("Advertencia", "Debe Seleccionar el año y el periodo", "warning");
      }
      // Añadido el 26 de julio
      if (document.getElementById("fileInput") != null) {
        document.getElementById("fileInput").value = "";
      }
      if (document.querySelector("#file-upload-wrapper") != null) {
        document
          .querySelector("#file-upload-wrapper")
          .setAttribute("data-text", "Cargar Archivo");
        document
          .querySelector("#file-upload-wrapper")
          .classList.remove("green-custom");
      }
    };

    $scope.LimpiarForm = function () {
      //$scope.anno = new Date().getFullYear;
      $scope.periodo = "";
      if (document.getElementById("fileInput") != null) {
        document.getElementById("fileInput").value = "";
      }
      document
        .querySelector("#file-upload-wrapper")
        .setAttribute("data-text", "Cargar Archivo");
      document
        .querySelector("#file-upload-wrapper")
        .classList.remove("green-custom");
    };

    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (
          Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize) >
          $scope.valmaxpag
        )
          fin = 10;
        else
          fin = Math.ceil(
            $scope.archivosRadicadosDataTemp.length / $scope.pageSize
          );
      } else {
        if (
          ini >=
          Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize) -
            $scope.valmaxpag
        ) {
          ini =
            Math.ceil(
              $scope.archivosRadicadosDataTemp.length / $scope.pageSize
            ) - $scope.valmaxpag;
          fin = Math.ceil(
            $scope.archivosRadicadosDataTemp.length / $scope.pageSize
          );
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
    };

    $scope.calcularCant = function (x) {
      for (let i = 0; i < x.length; i++) {
        if (x[i].estado_cargue == "CON ERRORES") {
          $scope.cErrores++;
        } else if (x[i].estado_cargue == "PENDIENTE") {
          $scope.cPP++;
        } else if (x[i].estado_cargue == "VALIDADO") {
          $scope.cValidados++;
        }
      }
    };

    $scope.obtenerCargues = function () {
      $scope.archivosRadicadosData = [];
      $scope.archivosRadicadosDataTemp = [];
      $http({
        method: "POST",
        url: "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
        data: {
          function: "listarRadicados",
          nit: $scope.IPS.nit,
        },
      }).then(function ({ data }) {
        if (data.length > 0) {
          $scope.archivosRadicadosData = data;
          $scope.archivosRadicadosDataTemp = $scope.archivosRadicadosData;
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.valmaxpag = 10;
          $scope.pages = [];
          $scope.configPages();
          $scope.cErrores = 0;
          $scope.cPP = 0;
          $scope.cValidados = 0;
          $scope.calcularCant($scope.archivosRadicadosData);
        }
      });
    };

    $scope.verdetalle = function (x) {
      window.open(
        "php/saludpublica/pre-resolucion202/formato_errores.php?radicado=" +
          x.proceso
      );
    };

    $scope.actualizarSoporte = function (x) {
      document.getElementById("Actualizarfile").value = "";
      var periodo =
        x.periodo.split("/")[1] < 10
          ? "0" + x.periodo.split("/")[1]
          : x.periodo.split("/")[1];
      var nombreAct = x.nit + "_" + periodo + x.periodo.split("/")[0];
      document
        .querySelector("#file-upload-wrapper2")
        .setAttribute("data-text", nombreAct);
      $scope.dataActMed = "";
      $("#Modal_ActualizaSoporte").modal("open");
      $scope.dataActMed = x;
    };

    $scope.download = function (ruta, x) {
      swal({ title: "Buscando archivo...", allowOutsideClick: false });
      swal.showLoading();
      if (ruta != undefined) {
        let nom_archivo = "";
        if (x.nit == 0) {
          nom_archivo =
            x.nit +
            "_" +
            (x.periodo.split("/")[1] < 10
              ? "0" + x.periodo.split("/")[1]
              : x.periodo.split("/")[1]) +
            x.periodo.split("/")[0] +
            "_" +
            x.regimen +
            ".txt";
        } else {
          nom_archivo =
            x.nit +
            "_" +
            (x.periodo.split("/")[1] < 10
              ? "0" + x.periodo.split("/")[1]
              : x.periodo.split("/")[1]) +
            x.periodo.split("/")[0] +
            ".txt";
        }
        $http({
          method: "POST",
          url: "php/saludpublica/pre-resolucion202/preValidadorRes202.php",
          data: {
            function: "downloadFiles",
            ruta: ruta + "/" + nom_archivo,
          },
        }).then(function ({ data }) {
          if (data == "0 - Archivo no encontrado")
            return swal("Advertencia", data.substr(1), "warning");
          var downloadLink = document.createElement("a");
          document.body.appendChild(downloadLink);
          downloadLink.style = "display: none";
          downloadLink.href = "temp/" + data.trim();
          downloadLink.download = data;
          downloadLink.click();
          downloadLink.remove();
          swal.close();
        });
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

    // Fin Controller
  },
]);
