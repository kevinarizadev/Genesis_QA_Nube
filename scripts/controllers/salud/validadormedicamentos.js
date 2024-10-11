"use strict";
angular.module("GenesisApp").controller("validadormedicamentosController", [
  "$scope",
  "notification",
  "$http",
  "$timeout",
  "$filter",
  "$q",
  function ($scope, notification, $http, $timeout, $filter, $q) {
    $scope.Inicio = function () {
      $scope.idUser = sessionStorage.getItem("nit");
      $scope.cedula = sessionStorage.getItem("cedula");
      $scope.paso = 1;
      $scope.placeHolderActualizar = "";
      $(".modal").modal();
      $scope.input();
      $scope.Limpiar();
      if ($scope.idUser != 0) {
        $scope.BuscarIPS($scope.idUser);
      }
    };

    $scope.setPaso = function (value) {
      $scope.paso = value;
    };

    $scope.input = function () {
      var inputs = document.querySelectorAll(".inputfile");
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
          labelVal = label.innerHTML;
        input.addEventListener("change", function (e) {
          $scope.form.archivoCargue =
            document.querySelector("#file-7").files[0];
          var fileName = "";
          if ($scope.placeHolderActualizar == "") {
            $scope.actualizaPlaceHolder($scope.form.fecha);
          }
          if (this.files && this.files.length > 1)
            fileName = (
              this.getAttribute("data-multiple-caption") || ""
            ).replace("{count}", this.files.length);
          else fileName = e.target.value.split("\\").pop();

          if (fileName) label.querySelector("span").innerHTML = fileName;
          else label.innerHTML = labelVal;
        });
      });
    };

    $scope.BuscarIPS = function (nit) {
      if (nit != "" && nit != undefined) {
        $http({
          method: "POST",
          url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
          data: { function: "Obt_Ips", Coincidencia: nit },
        }).then(function (res) {
          if (res.data.length > 0 && res.data.length < 2) {
            $scope.paso = 2;
            $scope.form.datosIPS = res.data[0];
            $scope.form.BuscarIPS = res.data[0].CODIGO;
          } else {
            swal("Advertencia", "No se encontraron resultados", "error");
          }
        });
      } else {
        swal("Advertencia", "Debe ingresar un nit", "warning");
      }
    };

    $scope.limpiarDatos = function () {
      $scope.actualizaPlaceHolder();
      $scope.form.fecha = "";
      $scope.form.archivoCargue = "";
    };

    $scope.cargarArchivo = function (x, tipo) {
      if (x == "A") {
        $scope.form.fecha = new Date();

        $scope.form.archivoCargue =
          document.querySelector("#fileUpdate").files[0];
      }
      if ($scope.form.fecha != "" && $scope.form.archivoCargue != "") {
        $scope.validacionesArchivo($scope.form.archivoCargue).then((resp) => {
          var dia = "";
          var mes = "";
          var año = "";
          if (resp) {
            swal({ title: "Validando..." });
            swal.showLoading();
            let request = window.XMLHttpRequest
              ? new XMLHttpRequest()
              : new ActiveXObject("Microsoft.XMLHTTP");
            let ajaxUrl = "php/salud/medicamentos/uploadFile.php";
            let form = new FormData();
            if (tipo == 1) {
              dia = new Date($scope.form.fecha).getDate();
              mes = new Date($scope.form.fecha).getMonth() + 1;
              año = new Date($scope.form.fecha).getFullYear();
            } else {
              dia = $scope.dataActMed.periodo.split("/")[2];
              mes = $scope.dataActMed.periodo.split("/")[1];
              año = $scope.dataActMed.periodo.split("/")[0];
              form.append("codProceso", $scope.dataActMed.proceso);
            }
            form.append("dia", dia);
            form.append("mes", mes);
            form.append("año", año);
            form.append("nit", $scope.form.BuscarIPS);
            form.append("tipo", tipo);
            form.append("archivo", $scope.form.archivoCargue);
            form.append("function", "subirArchivoFTP");
            request.open("POST", ajaxUrl, true);
            request.send(form);
            request.onreadystatechange = function () {
              swal.close();
              if (request.readyState == 4 && request.status == 200) {
                let objData = JSON.parse(request.responseText);
                if (tipo == 2) {
                  $("#Modal_Direccion").modal("close");
                  swal({
                    title: "!NOTIFICACION¡",
                    text: objData[0].Nombre + " - " + objData[0].SqlError == undefined ? '' : objData[0].SqlError,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    animation: false,
                    type: objData.Codigo == 0 ? "success" : "error",
                  }).then((e) => {
                    if (objData.Codigo == 0) $scope.archivosRadicados();
                  });
                } else {
                  if (objData[1].resp[0].Codigo == 0) {
                    swal({
                      title: "!NOTIFICACION¡",
                      text:
                        objData[1].resp[0].Nombre +
                        " Numero de radicado: " +
                        objData[1].resp[0].Proceso +
                        "Por favor dirigase a la pestaña Mis Cargues para verificar el estado",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: true,
                      animation: false,
                      type: "success",
                    }).then((e) => {
                      $scope.archivosRadicados();
                    });
                    // swal({
                    //     title: '!NOTIFICACION¡',
                    //     type: "success",
                    //     text: objData[1].resp[0].Nombre + ' Numero de radicado: ' + objData[1].resp[0].Proceso + 'Por favor dirigase a la pestaña Mis Cargues para verificar el estado',
                    // }).then(() => { //validar
                    //     $scope.archivosRadicados();
                    // });
                  } else {
                    swal({
                      title: "!NOTIFICACION¡",
                      type: "error",
                      text: objData[1].resp[0].Nombre,
                    }).catch(swal.noop);
                  }
                }
                $scope.limpiarDatos();
              } else {
                swal({
                  title: "!NOTIFICACION¡",
                  type: "error",
                  text: "Ocurrio un error de comunicacion del servidor, por favor actualice la pagina e intente nuevamente",
                }).catch(swal.noop);
              }
              // return false;
            };
          }
        });
      } else {
        swal("¡INFORMACION!", "Debe diligenciar todos los campos", "warning");
      }
    };

    $scope.validacionesArchivo = function (archivo) {
      let defered = $q.defer();
      let promise = defered.promise;

      if (archivo.type.split("/")[1] != "plain") {
        swal(
          "¡INFORMACION!",
          "Debe cargar un archivo de texto plano",
          "warning"
        );
        defered.resolve(false);
        return promise;
      }

      if (archivo.size > 31457260) {
        swal(
          "¡INFORMACION!",
          "El archivo no debe superar los 30 Megabytes",
          "warning"
        );
        defered.resolve(false);
        return promise;
      }

      if (archivo.name != $scope.placeholder) {
        swal(
          "¡INFORMACION!",
          "El nombre del archivo debe ser igual al sugerido",
          "warning"
        );
        defered.resolve(false);
        return promise;
      }

      defered.resolve(true);
      return promise;
    };

    $scope.actualizaPlaceHolder = function (x) {
      if (x != "" && x != undefined) {
        let dia = new Date(x).getDate();
        let mes = new Date(x).getMonth() + 1;
        let año = new Date(x).getFullYear();

        let Xdia = dia < 10 ? "0" + dia : dia;
        let Xmes = mes < 10 ? "0" + mes : mes;
        $scope.XnombreArch =
          "MD" + $scope.form.BuscarIPS + "_" + Xdia + Xmes + año + ".txt";
        $scope.placeholder = $scope.XnombreArch;
      } else {
        $scope.placeholder = "Seleccione una fecha";
      }
    };

    $scope.Limpiar = function () {
      // $scope.actualizaPlaceHolder('');
      $scope.dataActMed = "";
      $scope.form = {
        BuscarIPS: "",
        datosIPS: "",
        fecha: "",
        archivoCargue: "",
      };
    };

    $scope.setDefaultMinMax = function () {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 3);
      $scope.minDate = yesterday.toISOString().slice(0, 10);
      $scope.maxDate = new Date().toISOString().slice(0, 10);
    };

    $scope.archivosRadicados = function () {
      $scope.archivosRadicadosDataTemp = [];
      $scope.archivosRadicadosData = [];
      $scope.cErrores = 0;
      $scope.cPP = 0;
      $scope.cValidados = 0;
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/salud/medicamentos/uploadFile.php",
        data: {
          function: "listarRadicados",
          nit: $scope.form.BuscarIPS,
        },
      }).then(function (res) {
        swal.close();
        if (res.data.length > 0) {
          $scope.archivosRadicadosData = res.data;
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

    $scope.filter = function (val) {
      $scope.archivosRadicadosDataTemp = $filter("filter")(
        $scope.archivosRadicadosData,
        val
      );
      if ($scope.archivosRadicadosDataTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    };

    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
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

    $scope.verdetalle = function (x) {
      window.open(
        "php/salud/ValidadorMedicamentosIPS/ValidadorMedicamentos_Error.php?radicado=" +
          x.proceso
      );
    };

    $scope.actualizarSoporte = function (x) {
      $scope.placeHolderActualizar = "";
      $scope.dataActMed = "";
      let anno = x.periodo.split("/")[0];
      let mes =
        x.periodo.split("/")[1] >= 10
          ? x.periodo.split("/")[1]
          : "0" + x.periodo.split("/")[1];
      let dia = parseInt(x.periodo.split("/")[2]);
      $scope.placeholder =
        "MD" + x.nit + "_" + (dia < 10 ? "0" + dia : dia) + mes + anno + ".txt";
      $scope.placeHolderActualizar = $scope.placeholder;
      $("#Modal_Direccion").modal("open");
      $scope.dataActMed = x;
    };

    $scope.closeModal = function () {
      $(".modal").modal("close");
    };

    if (document.readyState !== "loading") {
      $scope.Inicio();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        $scope.Inicio();
      });
    }
  },
]);
