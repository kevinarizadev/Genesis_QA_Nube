"use strict";
angular
  .module("GenesisApp")
  .controller("eventosatelController", [
    "$scope",
    "$http",
    "$filter",
    function ($scope, $http, $filter) {
      $scope.Inicio = function () {
        $scope.sysDay = new Date();
        $scope.tipo_documento = "";
        $scope.numero_Identicacion = "";
        $scope.verDatosAfiliado = false;
        $scope.cancelarBoton = false;
        $scope.tipoEvento = "";
        $scope.fechaEstructuracion = "";
        $scope.fechaDictamen = "";
        $scope.NumDictamen = "";
        $scope.fechadeDiagnostico = "";
        $scope.soporte_FL = "";
        $scope.fileEventoAtel = "";
        $scope.diaginputAtel = "";
        $scope.diagnosticoATELmodal = "";
        $scope.entidadCalificadora = "";
        $scope.fechainicio = "";
        $scope.fechafinalAtel = "";
        $scope.fechaIniexportar = "";
        $scope.fechafinalAtelExportar = "";
        $scope.datosfiltradosFecha = "";
        $scope.visibilidadFiltro = false;
        $scope.visibilidadExportar = false;
        $scope.tipoEventoFiltrar = "";
        $scope.tipoEventoExportar = "";
        $scope.buscarUsuarioAtel = "";
        $scope.Mostrar_Pag = 10;
        $scope.diagnostico1 = "";
        $scope.diagnostico2 = "";
        $scope.diagnostico3 = "";
        $scope.diagnostico4 = "";
        $scope.diagnostico5 = "";
        $scope.contadorInput = 0;
        $scope.diagnosticoATEL1 = "";
        $scope.diagnosticoATEL2 = "";
        $scope.diagnosticoATEL3 = "";
        $scope.diagnosticoATEL4 = "";
        $scope.diagnosticoATEL5 = "";
        $scope.cedulaSesion = sessionStorage.getItem("cedula");
        $scope.nombreSesion = sessionStorage.getItem("nombre");
        $scope.infoUsuarioSesion();
        $(".modal").modal();
        $(".tabs").tabs();
      };

      $scope.limpiarATEL = function () {
        $scope.tipo_documento = "";
        $scope.numero_Identicacion = "";
        $scope.verDatosAfiliado = false;
        $scope.cancelarBoton = false;
        $scope.tipoEvento = "";
        $scope.fechaEstructuracion = "";
        $scope.fechaDictamen = "";
        $scope.NumDictamen = "";
        $scope.diagnosticoATELmodal = "";
        $scope.fechadeDiagnostico = "";
        $scope.soporte_FL = "";
        $scope.fileEventoAtel = "";
        $scope.diaginputAtel = "";
        $scope.diagnosticoATELmodal = "";
        $scope.entidadCalificadora = "";
        $scope.visibilidadFiltro = false;
        $scope.fechainicio = "";
        $scope.fechafinalAtel = "";
        $scope.fechaIniexportar = "";
        $scope.fechafinalAtelExportar = "";
        $scope.tipoEventoFiltrar = "";
        $scope.tipoEventoExportar = "";
        $scope.diagnostico1 = "";
        $scope.diagnostico2 = "";
        $scope.diagnostico3 = "";
        $scope.diagnostico4 = "";
        $scope.diagnostico5 = "";
        $scope.contadorInput = 0;
        $scope.diagnosticoATEL1 = "";
        $scope.diagnosticoATEL2 = "";
        $scope.diagnosticoATEL3 = "";
        $scope.diagnosticoATEL4 = "";
        $scope.diagnosticoATEL5 = "";
      };

      $scope.AbrirModal = function () {
        $scope.datosDiagnostico = [];
        $scope.diaginputAtel = "";
        $("#modaldiagnosticoATEL").modal("open");
        setTimeout(() => {
          $("#diaginputAtel").focus();
        }, 100);
      };

      $scope.AbrirModalBucarUsuario = function () {
        $scope.usuarioPermiso = [];
        $scope.buscarUsuarioAtel = "";
        $("#modalbuscarUsuarioATEL").modal("open");
        setTimeout(() => {
          $("#buscarUsuarioAtel").focus();
        }, 100);
      };

      $scope.buscarUsuario = function () {
        if (
          $scope.buscarUsuarioAtel == null ||
          $scope.buscarUsuarioAtel == ""
        ) {
          swal({
            title: "Campos Obligatorios",
            text: "Por favor complete los campos",
            type: "info",
          });
        } else if ($scope.buscarUsuarioAtel.length > 2) {
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "P_CONSULTAR_USUARIOS",
              buscarusuario: $scope.buscarUsuarioAtel,
            },
          }).then(function (response) {
            $scope.usuarioPermiso = response.data;
          });
        }
      };

      $scope.cambiarPermisos = function (x, accion, estadoA) {
        $scope.estadoFinal = estadoA == true ? 1 : 2;
        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: {
            function: "SeleccionarUsuarios",
            cedula: x.CEDULA,
            accion,
            estado: $scope.estadoFinal,
          },
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "success",
                timer: 1000,
              }).catch(swal.noop);
              $scope.ObtenerUsuariosPermisos();
            }
            if (data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "warning",
              }).catch(swal.noop);
            }
          }
        });
      };

      $scope.seleccionarUsuario = function (x) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false,
        });
        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: {
            function: "SeleccionarUsuarios",
            cedula: x.cedula,
            accion: "N",
            estado: x.estado,
          },
        }).then(function (response) {
          if (response.data.codigo == 0) {
            swal({
              title: "Mensaje",
              text: response.data.mensaje,
              type: "success",
            });
            $scope.closeModal();
            $scope.ObtenerUsuariosPermisos();
          } else {
            swal({
              title: "Mensaje",
              text: response.data.mensaje,
              type: "error",
            });
          }
        });
      };

      $scope.seleccionarNuevosDiagnostico = function (diagA, cod) {
        let inputs = document.querySelectorAll(".diagnosticoAd");
        inputs.forEach((ele) => {
          console.log(ele.textContent);
          if (cod == "1" && ele.textContent == "") {
            return swal({
              title: "Mensaje",
              text: "El diagnostico N°1 se encuentra vacio",
              type: "warning",
            }).catch(swal.noop);
          }
          if (cod == "2" && ele.textContent == "") {
            return swal({
              title: "Mensaje",
              text: "El diagnostico N°2 se encuentra vacio",
              type: "warning",
            }).catch(swal.noop);
          }
          if (cod == "3" && ele.textContent == "") {
            return swal({
              title: "Mensaje",
              text: "El diagnostico N°3 se encuentra vacio",
              type: "warning",
            }).catch(swal.noop);
          }
          if (cod == "4" && ele.textContent == "") {
            return swal({
              title: "Mensaje",
              text: "El diagnostico N°4 se encuentra vacio",
              type: "warning",
            }).catch(swal.noop);
          }
          if (cod == "5" && ele.textContent == "") {
            return swal({
              title: "Mensaje",
              text: "El diagnostico N°5 se encuentra vacio",
              type: "warning",
            }).catch(swal.noop);
          }
        });
        if (
          cod == 1 &&
          $scope.diagnostico1 != "" &&
          $scope.diagnostico1 != null
        ) {
          $scope.diagnosticoATEL1 = "";
          $scope.diagnosticoATEL1 = diagA;
          swal({
            title: "Mensaje",
            text: "Has Agregado el diagnostico N°1",
            type: "success",
          }).catch(swal.noop);
          // document.getElementById("selecDiagnostico").style.display = 'none';
        }
        if (
          cod == 2 &&
          $scope.diagnostico2 != "" &&
          $scope.diagnostico2 != null
        ) {
          $scope.diagnosticoATEL2 = "";
          $scope.diagnosticoATEL2 = diagA;
          swal({
            title: "Mensaje",
            text: "Has Agregado el diagnostico N°2",
            type: "success",
          }).catch(swal.noop);
          // document.getElementById("selecDiagnostico2").style.display = 'none';
        }
        if (cod == 3 && $scope.diagnostico3 != "") {
          $scope.diagnosticoATEL3 = "";
          $scope.diagnosticoATEL3 = diagA;
          swal({
            title: "Mensaje",
            text: "Has Agregado el diagnostico N°3",
            type: "success",
          }).catch(swal.noop);
          //  document.getElementById("selecDiagnostico3").style.display = 'none';
        }
        if (
          cod == 4 &&
          $scope.diagnostico4 != "" &&
          $scope.diagnostico4 != null
        ) {
          $scope.diagnosticoATEL4 = "";
          $scope.diagnosticoATEL4 = diagA;
          swal({
            title: "Mensaje",
            text: "Has Agregado el diagnostico N°4",
            type: "success",
          }).catch(swal.noop);
        }
        if (
          cod == 5 &&
          $scope.diagnostico5 != "" &&
          $scope.diagnostico5 != null
        ) {
          $scope.diagnosticoATEL5 = "";
          $scope.diagnosticoATEL5 = diagA;
          swal({
            title: "Mensaje",
            text: "Has Agregado el diagnostico N°5",
            type: "success",
          }).catch(swal.noop);
        }
        // $scope.closeModal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      };

      $scope.buscarMasDiagnosticos = function (diagnosticoNuevo) {
        if ($scope.diagnostico1 == "" || $scope.diagnostico1 == null) {
          swal({
            title: "Mensaje",
            text: "Diagnostico 1 Vacio",
            type: "info",
          });
        } else if ($scope.diagnostico1.length > 2) {
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "obtenerDiagnosticos",
              sexo: $scope.sexoDiag,
              edad: $scope.edadDias,
              codigo: diagnosticoNuevo,
            },
          }).then(function (response) {
            $scope.datosDiagnosticoNuevo = response.data;
          });
        }
      };

      $scope.filterUsuariosPermisos = function (valor) {
        $scope.listadoUsuariosPermisosTemp = $filter("filter")(
          $scope.listadoUsuariosPermisos,
          valor
        );
      };

      $scope.ObtenerUsuariosPermisos = function () {
        $scope.listadoUsuariosPermisosTemp = [];
        $scope.listadoUsuariosPermisos = [];

        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: { function: "visualizarUsuariosPermisos" },
        }).then(function ({ data }) {
          for (const usu in data) {
            if (data[usu].ADMIN == 1 || data[usu].ADMIN == true) {
              data[usu].ADMIN = true;
            } else {
              data[usu].ADMIN = false;
            }
            if (data[usu].ESTADO == 1 || data[usu].ESTADO == true) {
              data[usu].ESTADO = true;
            } else {
              data[usu].ESTADO = false;
            }
          }

          $scope.listadoUsuariosPermisos = data;
        });
      };
      $scope.ObtenerUsuariosPermisos();

      $scope.infoUsuarioSesion = function () {
        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: {
            function: "p_ver_permisos_funcs",
            cedula: $scope.cedulaSesion,
          },
        }).then(function ({ data }) {
          $scope.sesionUsuarios = data;
          if (
            $scope.sesionUsuarios.estado == 2 &&
            $scope.sesionUsuarios.CARGAR_REPORTE == 2 &&
            $scope.sesionUsuarios.ADMIN == 2
          ) {
            $scope.TabsAtel = 0;
            swal({
              title: "NO PERMITIDO",
              text: "No tienes permisos para acceder a este modulo",
              type: "warning",
            });
          } else if ($scope.sesionUsuarios.CARGAR_REPORTE == 1) {
            $scope.TabsAtel = 1;
            $("#tabRegistro").click();
          } else if ($scope.sesionUsuarios.estado == 1) {
            $scope.TabsAtel = 2;
            $("#tabConsultaAtel").click();
          } else if ($scope.sesionUsuarios.ADMIN == 1) {
            $scope.TabsAtel = 3;
            $("#tabPermiso").click();
          }
          setTimeout(() => {
            $(".tabs").tabs();
            $scope.$apply();
          }, 500);
        });
      };

      $scope.closeModal = function () {
        $(".modal").modal("close");
      };

      $scope.Filtroporfecha = function () {
        if (
          $scope.fechainicio == "" ||
          $scope.fechainicio == null ||
          $scope.fechafinalAtel == "" ||
          $scope.fechafinalAtel == null
        ) {
          swal({
            title: "Campos Obligatorios (*)",
            text: "Por favor seleccione las fechas",
            type: "info",
          });
        } else if ($scope.fechainicio > $scope.fechafinalAtel) {
          swal({
            title: "Error",
            text: "La fecha de inicio no puede ser mayor a la final",
            type: "error",
          });
        } else if (
          $scope.tipoEventoFiltrar == null ||
          $scope.tipoEventoFiltrar == ""
        ) {
          swal({
            title: "Campos Obligatorios (*)",
            text: "Por favor seleccione el campo de tipo de evento",
            type: "info",
          });
        } else {
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "cargar_registrosATEL",
              fechaIniciofiltro: formatDate($scope.fechainicio),
              fechaFinalfiltro: formatDate($scope.fechafinalAtel),
              vptipoevento: $scope.tipoEventoFiltrar,
            },
          }).then(function (response) {
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if (response.data.Codigo == 1) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.registroConsulta = response.data;
                $scope.registroConsultaTemp = response.data;
                $scope.inactiveCancelfiltro = true;
                $scope.currentPage = 0;
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

      $scope.validarFecha = function () {
        if ($scope.fechaEstructuracion > $scope.fechaDictamen) {
          document.getElementById("fechaMayor").style.color = "red";
          document.getElementById("fechaMayor").style.display = "block";
        } else {
          document.getElementById("fechaMayor").style.display = "none";
        }
      };

      $scope.exportarArchivo = function () {
        if (
          $scope.fechaIniexportar == "" ||
          $scope.fechaIniexportar == null ||
          $scope.fechafinalAtelExportar == "" ||
          $scope.fechafinalAtelExportar == null
        ) {
          swal({
            title: "Campos Obligatorios (*)",
            text: "Por favor seleccione las fechas",
            type: "info",
          });
        } else if (
          $scope.tipoEventoExportar == null ||
          $scope.tipoEventoExportar == ""
        ) {
          swal({
            title: "Campos Obligatorios (*)",
            text: "Por favor seleccione el campo tipo de evento",
            type: "info",
          });
        } else {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false,
          });
          setTimeout(() => {
            $http({
              method: "POST",
              url: "php/medicinalaboral/eventosatel.php",
              data: {
                function: "exportar_datos",
                fechainicioE: formatDate($scope.fechaIniexportar),
                fechaFinalE: formatDate($scope.fechafinalAtelExportar),
                tipoeventoE: $scope.tipoEventoExportar,
              },
            }).then(function ({ data }) {
              console.log(data);
              if (data.length) {
                var ws = XLSX.utils.json_to_sheet(data);
                /* add to workbook */
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                /* write workbook and force a download */
                XLSX.writeFile(wb, "Exportado EventoATEL.xlsx");
                const text = `Registros encontrados ${data.length}`;
                swal("¡Mensaje!", text, "success").catch(swal.noop);
              } else {
                swal("¡Mensaje!", "Sin datos a mostrar", "info").catch(
                  swal.noop
                );
              }
            });
          }, 500);
        }
      };

      $scope.obtenerRegistrosAtel = function () {
        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: { function: "P_CONSULTA_PRELIMINAR" },
        }).then(function (response) {
          $scope.registroConsulta = response.data;
          $scope.registroConsultaTemp = response.data;
          $scope.iniciodePaginacion(response.data);
          $scope.inactiveCancelfiltro = false;
          $scope.fechainicio = "";
          $scope.tipoEventoFiltrar = "";
          $scope.fechafinalAtel = "";
        });
      };

      // ACTUALIZAR TABLA -----------
      $scope.actualizarTabla = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Actualizando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false,
        });
        setTimeout(() => {
          $scope.registroConsulta = [];
          $scope.registroConsultaTemp = [];
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: { function: "P_CONSULTA_PRELIMINAR" },
          }).then(function (response) {
            swal.close();
            $scope.registroConsulta = response.data;
            console.log($scope.registroConsulta);
            $scope.iniciodePaginacion(response.data);
            $scope.limpiarATEL();
          });
        }, 500);
      };

      // Filtro y Paginacion       ---------------------
      $scope.iniciodePaginacion = function (info) {
        $scope.registroConsultaTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      };

      $scope.Mostrarnumerodatos = function () {
        $scope.currentPage = 0;
        if ($scope.Mostrar_Pag == 0) {
          $scope.pageSize = $scope.registroConsulta.length;
          $scope.valmaxpag = $scope.registroConsulta.length;
        } else {
          $scope.pageSize = $scope.Mostrar_Pag;
          $scope.valmaxpag = $scope.Mostrar_Pag;
        }
      };

      $scope.abrirFormFiltro = function () {
        $scope.visibilidadFiltro = !$scope.visibilidadFiltro;
        $scope.visibilidadExportar = false;
      };

      $scope.abrirFormExportar = function () {
        $scope.visibilidadExportar = !$scope.visibilidadExportar;
        $scope.visibilidadFiltro = false;
      };

      $scope.filterATEL = function (valor) {
        $scope.registroConsultaTemp = $filter("filter")(
          $scope.registroConsulta,
          valor
        );
        $scope.configPages();
      };

      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.registroConsultaTemp.length / $scope.pageSize) >
            $scope.valmaxpag
          )
            fin = 10;
          else
            fin = Math.ceil(
              $scope.registroConsultaTemp.length / $scope.pageSize
            );
        } else {
          if (
            ini >=
            Math.ceil(
              $scope.registroConsultaTemp.length / $scope.vaTabla.pageSize
            ) -
              $scope.vaTabla.valmaxpag
          ) {
            ini =
              Math.ceil(
                $scope.registroConsultaTemp.length / $scope.vaTabla.pageSize
              ) - $scope.vaTabla.valmaxpag;
            fin = Math.ceil(
              $scope.registroConsultaTemp.length / $scope.vaTabla.pageSize
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
        if ($scope.registroConsultaTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt(
            $scope.registroConsultaTemp.length / $scope.pageSize
          );
        } else {
          var tamanomax =
            parseInt($scope.registroConsultaTemp.length / $scope.pageSize) + 1;
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
          if ($scope.registroConsultaTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt(
              $scope.registroConsultaTemp.length / $scope.pageSize
            );
          } else {
            var tamanomax =
              parseInt($scope.registroConsultaTemp.length / $scope.pageSize) +
              1;
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

      // FIN FILTRO Y PAGINACION ----------------------------

      // VER ADJUNTO
      $scope.descargarSoporte = function (ruta) {
        $http({
          method: "POST",
          url: "php/medicinalaboral/eventosatel.php",
          data: {
            function: "descargaFile",
            ruta: ruta,
          },
        }).then(function (response) {
          var win = window.open("temp/" + response.data, "_blank");
          win.focus();
        });
      };
      // FIN VER ADJUNTO

      $scope.Obtener_DatosAfiliado = function () {
        if (
          $scope.tipo_documento == "" ||
          $scope.numero_Identicacion == "" ||
          $scope.tipo_documento == "" ||
          $scope.tipo_documento == null ||
          $scope.numero_Identicacion == null
        ) {
          swal({
            title: "Mensaje",
            text: "Por favor seleccione tipo y numero de documento",
            type: "info",
          });
        } else {
          swal({
            title: "Cargando información...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "obtenerDatosAtel",
              TipoDoc: $scope.tipo_documento,
              Numero: $scope.numero_Identicacion,
            },
          }).then(function (response) {
            swal.close();
            $scope.Tipos_Afiliado = response.data;
            console.log($scope.Tipos_Afiliado);
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              if ($scope.Tipos_Afiliado.Codigo == 1) {
                swal({
                  title: "Mensaje",
                  text: response.data.Nombre,
                  type: "info",
                });
              } else {
                $scope.edadDias = $scope.Tipos_Afiliado[0].edad_dia;
                $scope.sexoDiag = $scope.Tipos_Afiliado[0].genero;
                $scope.verDatosAfiliado = true;
                $scope.cancelarBoton = true;
                $scope.filtroPdfEventoAtel();
                return;
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

      $scope.buscarDiagnosticoAtel = function () {
        if ($scope.diaginputAtel == "" || $scope.diaginputAtel == null) {
          swal({
            title: "Mensaje",
            text: "Campo Vacio",
            type: "info",
          });
        } else if ($scope.diaginputAtel.length > 2) {
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "obtenerDiagnosticos",
              sexo: $scope.sexoDiag,
              edad: $scope.edadDias,
              codigo: $scope.diaginputAtel,
            },
          }).then(function (response) {
            $scope.datosDiagnostico = response.data;
            console.log($scope.datosDiagnostico);
          });
        }
      };

      $scope.contadorDiagnostico = function () {
        $scope.calseDiv1 = "col s12";
        $scope.calseDiv2 = "col s6";
        if (
          $scope.diagnosticoATELmodal == "" ||
          $scope.diagnosticoATELmodal == null
        ) {
          swal({
            title: "Mensaje",
            text: "No puedes agregar otro Diagnostico sin agregar el principal",
            type: "info",
          });
        }
        if ($scope.contadorInput > 4) {
          swal({
            title: "Atencion!",
            text: "Solo esta permitido agregar 5 dignosticos adicionales",
            type: "error",
          });
        } else if (
          ($scope.contadorInput == 1 && $scope.diagnosticoATEL1 == "") ||
          ($scope.contadorInput == 2 && $scope.diagnosticoATEL2 == "") ||
          ($scope.contadorInput == 3 && $scope.diagnosticoATEL3 == "") ||
          ($scope.contadorInput == 4 && $scope.diagnosticoATEL4 == "") ||
          ($scope.contadorInput == 5 && $scope.diagnosticoATEL5 == "")
        ) {
          swal({
            title: "Complete el Diagnostico",
            text: "Se necesita completar el campo de Diagnostico para agregar uno nuevo",
            type: "error",
          });
        } else {
          $scope.contadorInput = $scope.contadorInput + 1;
          $scope.datosDiagnosticoNuevo = "";
        }
      };

      $scope.agregar = false;
      $scope.txtDiag = false;
      $scope.seleccionardiagnostico = function (diag) {
        $scope.diagnosticoATELmodal = `${diag.Nombre}`;
        $scope.agregar = true;
        $scope.txtDiag = true;

        setTimeout(() => {
          $scope.txtDiag = false;
        }, 4000);
        // $scope.closeModal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      };

      $scope.cancelarEventoatel = function () {
        swal({
          title: "¿Deseas cancelar el registro?",
          text: "",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result) {
            $scope.tipo_documento = "";
            $scope.numero_Identicacion = "";
            $scope.verDatosAfiliado = false;
            $scope.cancelarBoton = false;
            $scope.tipoEvento = "";
            $scope.fechaEstructuracion = "";
            $scope.fechaDictamen = "";
            $scope.NumDictamen = "";
            $scope.diagnosticoATELmodal = "";
            $scope.fechadeDiagnostico = "";
            $scope.soporte_FL = "";
            $scope.fileEventoAtel = "";
            $scope.diaginputAtel = "";
            $scope.diagnosticoATELmodal = "";
            $scope.entidadCalificadora = "";
            setTimeout(() => {
              $scope.$apply();
            }, 500);
          }
        });
      };

      // PDF CONFIGURACION       ----------------  ARCHIVO FILE ---------------------
      const codigoAtela = "MED_LAB_ATEL";
      $scope.filtroPdfEventoAtel = function () {
        document
          .querySelector("#fileEventoAtel")
          .addEventListener("change", function (e) {
            $scope.soporte_FL = "";
            setTimeout(() => {
              $scope.$apply();
            }, 500);
            var files = e.target.files;
            if (files.length != 0) {
              const x = files[0].name.split(".");
              if (x[x.length - 1].toUpperCase() == "PDF") {
                if (files[0].size < 15485760 && files[0].size > 0) {
                  $scope.getBase64(files[0]).then(function (result) {
                    $scope.soporte_FL = result;
                    setTimeout(function () {
                      $scope.$apply();
                    }, 300);
                  });
                } else {
                  document.querySelector("#fileEventoAtel").value = "";
                  swal(
                    "Advertencia",
                    "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                    "info"
                  );
                }
              } else {
                document.querySelector("#fileEventoAtel").value = "";
                swal(
                  "Advertencia",
                  "¡El archivo seleccionado debe ser formato PDF!",
                  "info"
                );
              }
            }
          });
      };

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      $scope.cargarRegistroEventoA = function () {
        return new Promise((resolve) => {
          $http({
            method: "POST",
            url: "php/medicinalaboral/eventosatel.php",
            data: {
              function: "cargarRegistroAtel",
              codigoAtel: codigoAtela,
              base64: $scope.soporte_FL,
            },
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != "<br") {
              resolve(data);
            } else {
              resolve(false);
            }
          });
        });
      };

      // Registrar   EVENTO ATEL ----------------------------
      $scope.validaFormEventosA = function () {
        if (
          $scope.tipoEvento == "" ||
          $scope.fechaEstructuracion == "" ||
          $scope.fechaDictamen == "" ||
          $scope.NumDictamen == "" ||
          $scope.diagnosticoATELmodal == "" ||
          $scope.fechadeDiagnostico == "" ||
          $scope.entidadCalificadora == "" ||
          $scope.tipoEvento == null ||
          $scope.fechaEstructuracion == null ||
          $scope.fechaDictamen == null ||
          $scope.NumDictamen == null ||
          $scope.entidadCalificadora == null
        ) {
          swal({
            title: "Campos Obligatorios (*)",
            text: "Por favor complete los campos vacios",
            type: "warning",
          });
        } else if ($scope.soporte_FL == "") {
          swal(
            "Campos Obligatorios",
            "No has adjuntado el archivo para el Registro!",
            "error"
          ).catch(swal.noop);
        } else if ($scope.fechaEstructuracion > $scope.fechaDictamen) {
          swal({
            title: "Error",
            text: "La fecha de Estructuracion no puede ser mayor a la de Dictamen",
            type: "error",
          });
        } else {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false,
          });
          $scope.cargarRegistroEventoA().then((result) => {
            if (result) {
              const datosAgregar = {
                tipo_documento: $scope.tipo_documento,
                documento: $scope.numero_Identicacion,
                fecha_estructuracion: formatDate($scope.fechaEstructuracion),
                fecha_dictamen: formatDate($scope.fechaDictamen),
                numero_dictamen: $scope.NumDictamen,
                entidad_calificadora: $scope.entidadCalificadora,
                diagnostico: $scope.diagnosticoATELmodal,
                //diagnostico: $scope.diagnosticoATELmodal.split("-").pop(),
                fecha_diagnostico: formatDate($scope.fechadeDiagnostico),
                ruta: result,
                diagnostico1: $scope.diagnosticoATEL1,
                diagnostico2: $scope.diagnosticoATEL2,
                diagnostico3: $scope.diagnosticoATEL3,
                diagnostico4: $scope.diagnosticoATEL4,
                diagnostico5: $scope.diagnosticoATEL5,
              };
              const data = [];
              data.unshift(datosAgregar);
              $http({
                method: "POST",
                url: "php/medicinalaboral/eventosatel.php",
                data: {
                  function: "p_cargarEventoAtel",
                  data: JSON.stringify(data),
                  evento: $scope.tipoEvento,
                },
              }).then(function ({ data }) {
                console.log(data);
                if (data.Codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.limpiarATEL();
                  $scope.soporte_FL = "";
                } else {
                  swal({
                    title: "Mensaje",
                    text: data.Nombre,
                    type: "error",
                  }).catch(swal.noop);
                }
              });
              $scope.actualizarTabla();
            } else {
              // no se cargo el archivo
              swal("Advertencia", "¡No se cargo el archivo!", "error");
            }
          });
        }
      };

      function formatDate(date) {
        var dd = ("0" + date.getDate()).slice(-2);
        var mm = ("0" + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return dd + "/" + mm + "/" + yyyy; //+' '+hh+':'+mi+':00';
      }

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
      $scope.Obtener_Tipos_Documentos();

      $scope.SetTabAtel = function (x) {
        // if ($scope.sesionUsuarios.estado == 2 && $scope.sesionUsuarios.CARGAR_REPORTE == 2 && $scope.sesionUsuarios.ADMIN == 2) {
        //   $scope.TabsAtel = 1;
        //   $('#tabRegistro').click();
        //   swal({
        //     title: "NO PERMITIDO",
        //     text: "No tienes permisos para acceder a este modulo",
        //     type: "warning",
        //   })
        // } else {
        $scope.TabsAtel = x;
        $scope.limpiarATEL();

        // }
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
