'use strict';
angular.module('GenesisApp')
  .controller('eispsivigilaController', ['$scope', '$http',
    function ($scope, $http) {
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_validacioncamposVacios();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.listLimpiar();
        $scope.hoja1Limpiar();
        $scope.hoja2Limpiar();
        $scope.hoja3Limpiar();
        $scope.ObtenerRoluser();
        $scope.testsemanaVacio();
        $scope.obtenerPermisos();
        $scope.obtenerListadoCargues();
        $('.modal').modal();
        $scope.semanaActual = $scope.SysDay.getWeekNumber();
        $scope.iniciarVariables();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.ObtenerRoluser = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'obtenerRol',
            vpcedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          // console.log(data);
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.cargueReporte = data[0].cargar_reporte;
            $scope.rolObtenido = data[0].admin;
            $scope.cargueEstado = data[0].estado;
            if ($scope.cargueReporte == 'S') {
              $scope.cargue_Reporte = true;
            } else {
              $scope.cargue_Reporte = false;
            } if ($scope.rolObtenido == 'S') {
              $scope.rol_Obtenido = true;
            } else {
              $scope.rol_Obtenido = false;
            } if ($scope.cargueEstado == 'A') {
              $scope.cargue_Estado = true;
            } else {
              $scope.cargue_Estado = false;
            } if ($scope.cargueEstado == 'I') {
              $scope.openModal('permisos');
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.iniciarVariables = function () {
        $scope.arrlistPerido = [
          {
            id: 1, name: "Periodo 1",
            semanas: [
              {
                id: 1, name: "Semana 1",
              }, {
                id: 2, name: "Semana 2",
              }, {
                id: 3, name: "Semana 3",
              }, {
                id: 4, name: "Semana 4",
              }
            ]
          }, {
            id: 2, name: "Periodo 2",
            semanas: [
              {
                id: 5, name: "Semana 5",
              }, {
                id: 6, name: "Semana 6",
              }, {
                id: 7, name: "Semana 7",
              }, {
                id: 8, name: "Semana 8",
              }
            ]
          }, {
            id: 3, name: "Periodo 3",
            semanas: [
              {
                id: 9, name: "Semana 9",
              }, {
                id: 10, name: "Semana 10",
              }, {
                id: 11, name: "Semana 11",
              }, {
                id: 12, name: "Semana 12",
              }
            ]
          }, {
            id: 4, name: "Periodo 4",
            semanas: [
              {
                id: 13, name: "Semana 13",
              }, {
                id: 14, name: "Semana 14",
              }, {
                id: 15, name: "Semana 15",
              }, {
                id: 16, name: "Semana 16",
              }
            ]
          }, {
            id: 5, name: "Periodo 5",
            semanas: [
              {
                id: 17, name: "Semana 17",
              }, {
                id: 18, name: "Semana 18",
              }, {
                id: 19, name: "Semana 19",
              }, {
                id: 20, name: "Semana 20",
              }
            ]
          }, {
            id: 6, name: "Periodo 6",
            semanas: [
              {
                id: 21, name: "Semana 21",
              }, {
                id: 22, name: "Semana 22",
              }, {
                id: 23, name: "Semana 23",
              }, {
                id: 24, name: "Semana 24",
              }
            ]
          }, {
            id: 7, name: "Periodo 7",
            semanas: [
              {
                id: 25, name: "Semana 25",
              }, {
                id: 26, name: "Semana 26",
              }, {
                id: 27, name: "Semana 27",
              }, {
                id: 28, name: "Semana 28",
              }
            ]
          }, {
            id: 8, name: "Periodo 8",
            semanas: [
              {
                id: 29, name: "Semana 29",
              }, {
                id: 30, name: "Semana 30",
              }, {
                id: 31, name: "Semana 31",
              }, {
                id: 32, name: "Semana 32",
              }
            ]
          }, {
            id: 9, name: "Periodo 9",
            semanas: [
              {
                id: 33, name: "Semana 33",
              }, {
                id: 34, name: "Semana 34",
              }, {
                id: 35, name: "Semana 35",
              }, {
                id: 36, name: "Semana 36",
              }
            ]
          }, {
            id: 10, name: "Periodo 10",
            semanas: [
              {
                id: 37, name: "Semana 37",
              }, {
                id: 38, name: "Semana 38",
              }, {
                id: 39, name: "Semana 39",
              }, {
                id: 40, name: "Semana 40",
              }
            ]
          }, {
            id: 11, name: "Periodo 11",
            semanas: [
              {
                id: 41, name: "Semana 41",
              }, {
                id: 42, name: "Semana 42",
              }, {
                id: 43, name: "Semana 43",
              }, {
                id: 44, name: "Semana 44",
              }
            ]
          }, {
            id: 12, name: "Periodo 12",
            semanas: [
              {
                id: 45, name: "Semana 45",
              }, {
                id: 46, name: "Semana 46",
              }, {
                id: 47, name: "Semana 47",
              }, {
                id: 48, name: "Semana 48",
              }
            ]
          }, {
            id: 13, name: "Periodo 13",
            semanas: [
              {
                id: 49, name: "Semana 49",
              }, {
                id: 50, name: "Semana 50",
              }, {
                id: 51, name: "Semana 51",
              }, {
                id: 52, name: "Semana 52",
              }
            ]
          }
        ];
        $scope.arrlistPerido.forEach(e => {
          e.semanas.forEach(y => {
            if (y.id == $scope.semanaActual) {
              $scope.periodoActual = e.id;
            }
          })
        })
      }
      $scope.hoja1Limpiar = function () {
        $scope.hoja1 = {
          tipoCubo: '',
          anio: '',
          periodo: '',
          semana: '',
          files_cargue: '',
          archivoB64: '',
          nombreFile: '',
          textoFile: 'Cargar Archivo'
        };
        $scope.btnGuardarDsb = false;
        setTimeout(() => {
          $scope.$apply();
        }, 700);
      }
      $scope.hoja1LimpiarFile = (x) => {
        $scope.hoja1.archivoB64 = '';
        document.querySelector('#files_cargue').value = '';
        if (!x) {
          $scope.hoja1.nombreFile = ($scope.textInicio && $scope.hoja1.anio && $scope.hoja1.periodo && $scope.hoja1.semana && $scope.hoja1.semana != 'x') ? `${$scope.textInicio}_${$scope.hoja1.periodo}${$scope.hoja1.semana}${$scope.hoja1.anio}.txt` : '';
          $scope.hoja1.textoFile = ($scope.textInicio && $scope.hoja1.anio && $scope.hoja1.periodo && $scope.hoja1.semana && $scope.hoja1.semana != 'x') ? `Cargar Archivo (${$scope.hoja1.nombreFile})` : 'Cargar Archivo';
        }
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.listLimpiar = function () {
        $scope.list = {
          listadoAnio: [],
          arrlistPerido: [],
          arrlistSemana: [],
          listadoCargues: [],
          listadoFuncionarios: []
        };
        for (let i = 2019; i <= $scope.SysDay.getFullYear(); i++) {
          $scope.list.listadoAnio.push({ 'codigo': i });
        }
      }
      $scope.calcularNombreArchivo = () => {
        $scope.textInicio = "SEM";
        if ($scope.textInicio && $scope.hoja1.anio && $scope.hoja1.periodo & $scope.hoja1.semana != 'x') {
          $scope.hoja1.nombreFile = `${$scope.textInicio}_${$scope.hoja1.periodo}${$scope.hoja1.semana}${$scope.hoja1.anio}.txt`;
          $scope.hoja1.textoFile = `Cargar Archivo (${$scope.hoja1.nombreFile})`;
          $scope.hoja1LimpiarFile(1)
        } else {
          $scope.hoja1LimpiarFile()
        }
      }
      $scope.$watch("textInicio", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      $scope.$watch("hoja1.anio", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      $scope.$watch("hoja1.periodo", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      $scope.$watch("hoja1.semana", function (newValue, oldValue) {
        $scope.calcularNombreArchivo()
      });
      document.querySelector('#files_cargue').addEventListener('change', function (e) {
        $scope.Data = [];
        var files = e.target.files;
        if (files.length != 0 && files[0].size > 0) {
          swal({ title: 'Validando archivo...' });
          swal.showLoading();
          const ext = files[0].name.split('.').pop(), name = files[0].name.toString().toUpperCase();
          // if($scope.hoja1.nombreFile == )
          if (ext.toUpperCase() != 'TXT') {
            $scope.hoja1LimpiarFile()
            swal('Advertencia', '¡El archivo seleccionado debe ser formato TXT!', 'info');
            return;
          }
          if (files[0].size > 15485760) {
            $scope.hoja1LimpiarFile()
            swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (15MB)!', 'info');
            return;
          }
          if (name != $scope.hoja1.nombreFile.toUpperCase()) {
            $scope.hoja1LimpiarFile()
            swal("Advertencia", "¡Revisar si el nombre o el archivo corresponde al periodo y semana a cargar!", "info");
            return;
          }
          // if (files[0].size > 0) {
          $scope.validarEstructura(files[0], 83);
          // }
        } else {
          $scope.hoja1LimpiarFile()
        }
      });
      $scope.validarEstructura = function (progressEvent, tamaño) {
        var file = progressEvent;
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
          $scope.estado = true;
          var lines = this.result.split('\r\n');
          var datos;
          for (var line = 0; line < lines.length; line++) {
            datos = lines[line].split('|');
            // console.log(datos)
            if (datos != '' && datos != undefined && datos != null) {
              if (datos.length == tamaño) {
                $scope.estado = true;
              } else {
                $scope.estado = false;
                break;
              }
            }
            // $scope.Data.push({
            //   'IPSNROID': datos[0],
            //   'PREFIJOFACTURA': datos[1],
            // });
          }
          if ($scope.estado == true) {
            $scope.hoja1.textoFile = 'Archivo cargado y listo para ser validado';
            $scope.getBase64(file).then(function (result) {
              $scope.hoja1.archivoB64 = result;
              swal("Mensaje", "El archivo cumple con la cantidad de columnas!", "success").catch(swal.noop);
              setTimeout(function () { $scope.$apply(); }, 300);
            });

            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            $scope.hoja1LimpiarFile()
            // $scope.Data = [];
            swal('Advertencia', 'el archivo presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
          }
        };
        reader.readAsText(file);
      }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          const nombreCarpeta = `${$scope.hoja1.semana}${$scope.hoja1.anio}`;
          const nombreArchivo = `${$scope.textInicio}_${$scope.hoja1.periodo}${$scope.hoja1.semana}${$scope.hoja1.anio}`;
          $http({
            method: 'POST',
            url: "php/saludpublica/eispsivigila/eispsivigila.php",
            data: { function: "cargarSoporte", nombreCarpeta, nombreArchivo, base64: $scope.hoja1.archivoB64 }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }
      $scope.testsemanaVacio = function (x) {
        // console.log(x);
        var fileInput = document.getElementById('files_cargue');
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.validacioncamposVacios .red-text'), function (i) { // Limpia campos en rojo antes de buscar
          i.classList.remove('red-text');
        });
        Campos_Empty = true; document.querySelector('#tipoCubo_label').classList.add('red-text');
        Campos_Empty = true; document.querySelector('#anio_label').classList.add('red-text');
        Campos_Empty = true; document.querySelector('#periodo_label').classList.add('red-text');
        Campos_Empty = true; document.querySelector('#semana_label').classList.add('red-text');
        Campos_Empty = true; document.querySelector('#adjuntar_label').classList.add('red-text');
      }
      $scope.testsemanaDatos = function (x) {
        // console.log(x);
        var fileInput = document.getElementById('files_cargue');
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.validacioncamposVacios .red-text'), function (i) { // Limpia campos en rojo antes de buscar
          i.classList.remove('red-text');
        });
        if ($scope.hoja1.tipoCubo == '') {
          Campos_Empty = true; document.querySelector('#tipoCubo_label').classList.add('red-text');
        } if ($scope.hoja1.anio == '') {
          Campos_Empty = true; document.querySelector('#anio_label').classList.add('red-text');
        } if ($scope.hoja1.periodo == '') {
          Campos_Empty = true; document.querySelector('#periodo_label').classList.add('red-text');
        } if ($scope.hoja1.semana == '') {
          Campos_Empty = true; document.querySelector('#semana_label').classList.add('red-text');
        } else if (fileInput.files.length == 0) {
          Campos_Empty = true; document.querySelector('#adjuntar_label').classList.add('red-text');
        }
      }
      $scope.guardarCargue = () => {
        var fileInput = document.getElementById('files_cargue');
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.validacioncamposVacios .red-text'), function (i) { // Limpia campos en rojo antes de buscar
          i.classList.remove('red-text');
        });
        if ($scope.hoja1.tipoCubo == '') {
          Campos_Empty = true; document.querySelector('#tipoCubo_label').classList.add('red-text');
          swal({
            title: "Mensaje",
            text: "Completa todos los campos requeridos (*).",
            type: "warning",
          });
        } if ($scope.hoja1.anio == '') {
          Campos_Empty = true; document.querySelector('#anio_label').classList.add('red-text');
          swal({
            title: "Mensaje",
            text: "Completa todos los campos requeridos (*).",
            type: "warning",
          });
        } if ($scope.hoja1.periodo == '') {
          Campos_Empty = true; document.querySelector('#periodo_label').classList.add('red-text');
          swal({
            title: "Mensaje",
            text: "Completa todos los campos requeridos (*).",
            type: "warning",
          });
        } if ($scope.hoja1.semana == '') {
          Campos_Empty = true; document.querySelector('#semana_label').classList.add('red-text');
          swal({
            title: "Mensaje",
            text: "Completa todos los campos requeridos (*).",
            type: "warning",
          });
        } else if (fileInput.files.length == 0) {
          Campos_Empty = true; document.querySelector('#adjuntar_label').classList.add('red-text');
          swal({
            title: "Mensaje",
            text: "No hay un archivo cargado, cargue el archvio(*).",
            type: "warning",
          });
        } else {
          $scope.btnGuardarDsb = true;
          // $scope.hoja1.tipoCubo
          // $scope.hoja1.anio
          // $scope.hoja1.mes
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $scope.cargarSoporte().then((result) => {
            // console.log(result);
            if (result) {
              // swal("Mensaje", "Soporte Guardado!", "success").catch(swal.noop);
              const datos = {
                Tipo_reporte: $scope.hoja1.tipoCubo,
                Ano: $scope.hoja1.anio,
                Periodo: $scope.hoja1.periodo,
                Semana: $scope.hoja1.semana,
                Url: result,
                Responsable: $scope.Rol_Cedula
              }
              // console.log(datos);
              $http({
                method: 'POST',
                url: "php/saludpublica/eispsivigila/eispsivigila.php",
                data: {
                  function: "p_ui_cargue",
                  datos: JSON.stringify(datos)
                  // vidconsulta: $scope.idconsultaTabla
                }
              }).then(function ({ data }) {
                $scope.btnGuardarDsb = false;
                if (data.toString().substr(0, 3) != '<br') {
                  if (data.Codigo == 0) {
                    $scope.hoja1Limpiar();
                    $scope.hoja1LimpiarFile();

                    $scope.obtenerListadoCargues(1);
                    swal("¡Mensaje!", data.Nombre, "success").catch(swal.noop);
                  } else if (data.length > 0 && data.length < 1001) {

                    var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                    list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i><small class='float-right red-text'> Errores encontrados: " + data.length + "</small>" + "</div><div class='collapsible-body'>";
                    data.forEach(function (error, index) {
                      list += "<p style='padding: .5rem;'><span><b>Error #" + (index + 1) + ":</b> " + error.Nombre + "</span></p>";
                    });
                    list += "</div></li></ul>";
                    swal({
                      title: "Advertencia",
                      width: 600, html: list,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      confirmButtonText: 'Descargar Errores',
                      confirmButtonColor: '#188038',
                      // showCancelButton: true,
                      type: "warning"
                    }).then(function (result) {
                      if (result) {
                        var csv = data.map(function (d) {
                          return (d.Nombre);
                        }).join('\n')
                          .replace(/(^\[)|(\]$)/mg, '');
                        const url = URL.createObjectURL(new Blob([csv]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', `Errores SIVIGILA ${new Date().toLocaleDateString()}.txt`)
                        document.body.appendChild(link)
                        link.click()
                        $scope.hoja1LimpiarFile();
                      }
                    }).catch(swal.noop);
                    $(document).ready(function () {
                      $('.collapsible').collapsible();
                    });
                  } else if (data.length > 1000) {
                    const text = `Errores encontrados (${data.length})`;
                    swal("¡Mensaje!", text, "success").catch(swal.noop);

                    var csv = data.map(function (d) {
                      return (d.Nombre);
                    }).join('\n')
                      .replace(/(^\[)|(\]$)/mg, '');
                    const url = URL.createObjectURL(new Blob([csv]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', `Errores SIVIGILA ${new Date().toLocaleDateString()}.txt`)
                    document.body.appendChild(link)
                    link.click()
                    $scope.hoja1LimpiarFile();

                  } else {
                    swal("¡Importante!", data.Nombre, "warning").catch(swal.noop);
                  }
                } else {
                  swal("¡Importante!", data, "warning").catch(swal.noop);
                }
              })
            } else {
              $scope.btnGuardarDsb = false;
            }
          })
        }
      }
      $scope.hoja2Limpiar = function () {
        $scope.hoja2 = {
          filtro: ''
        };
        setTimeout(() => {
          $scope.$apply();
        }, 300);

      }
      $scope.obtenerListadoCargues = (x) => {
        $scope.list.listadoCargues = [];
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'p_consulta_cargue'
          }
        }).then(function ({ data }) {
          // console.log(data);
          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.list.listadoCargues = data;
            $scope.idConsulta(data);
          } else {
            // if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            if (data != 0) { swal("¡Importante!", data, "warning").catch(swal.noop); return }
          }
        });
      }
      $scope.idConsulta = function (x) {
        // console.log(x);
        $scope.x = x;
        $scope.x.forEach(e => {
          // console.log(e);
          $scope.idconsultaTabla = e.ID;
          // console.log($scope.idconsultaTabla);
        })
        $scope.idConsulta.forEach;
        // console.log($scope.idConsulta);
      }
      $scope.hoja3Limpiar = function () {
        $scope.hoja3 = {
          filtro: ''
        };
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }
      $scope.obtenerPermisos = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'p_ver_permisos_funcs',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          // console.log(data);
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.permisos = data;
            setTimeout(() => {
              if ($scope.permisos.CARGAR_REPORTE === undefined) {
                $scope.Tabs = 2;
                $('#tabConsulta').click();
              } else {
                $scope.Tabs = 1;
                $('#tabCargue').click();
              }
              setTimeout(() => {
                $('.tabs').tabs();
                $scope.$apply();
              }, 500);
            }, 1000);
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }
      $scope.obtenerListadoFuncs = function (x) {
        $scope.list.listadoFuncionarios = [];
        // Recibe x para no mostrar swalLoading
        // $scope.list.listadoFuncionarios = [];
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'p_listar_funcs'
          }
        }).then(function ({ data }) {
          // console.log(data);
          data.forEach(e => {
            if (e.ADMIN == 'S') {
              $scope.rolAdmin = e.id;
            }
          })

          if (!x) swal.close();
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.list.listadoFuncionarios = data;
          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }
      $scope.selecionarUsuario = function () {
        if ($scope.buscard1 == '' || $scope.buscard1 == undefined) {
          swal({
            title: "¡Alerta!",
            text: 'Por favor digite el nombre o numero de cedula del funcionario',
            type: "warning"
          }).catch(swal.noop);
        } else {

          $http({
            method: 'POST',
            url: "php/saludpublica/eispsivigila/eispsivigila.php",
            data: {
              function: 'p_obtener_funcionario',
              vpnit: $scope.buscard1,
            }
          }).then(function ({ data }) {
            if (data != undefined) {
              if (data.Codigo == '1') {
                swal('Importante', data.Nombre, 'info');
              } else {
                $scope.listFuncionarios = data;

              }
            }
          });
        }
      }
      $scope.seleccionarFuncionario = function (data) {
        $scope.buscard1 = '';
        var funcionaraSelect = data.CODIGO;
        $("#modalfuncionarios").modal("close");
        $scope.agregarUsuario(funcionaraSelect);
      }
      $scope.agregarUsuario = function (datos) {
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'p_ui_funcs',
            cedula: datos
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "success",
              }).catch(swal.noop);
              $scope.obtenerListadoFuncs(1);
              $scope.buscard1 = '';
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
      }
      $scope.modificarUsuario = function (x, accion, estado) {
        // console.log(x);
        // console.log(accion);
        // console.log(estado);
        // swal({
        //   title: '¿Desea actualizar el estado del funcionario?',
        //   text: X.NOMBRE,
        //   showCancelButton: true,
        //   confirmButtonText: "Confirmar",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        $http({
          method: 'POST',
          url: "php/saludpublica/eispsivigila/eispsivigila.php",
          data: {
            function: 'p_ui_funcs',
            cedula: x.CEDULA, accion, estado,
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data != undefined) {
            if (data.codigo == 0) {
              swal({
                title: "Mensaje",
                text: data.mensaje,
                type: "success",
                timer: 1000
              }).catch(swal.noop);
              $scope.obtenerListadoFuncs(1);
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
        //   }
        // }).catch(swal.noop);
      }
      Date.prototype.getWeekNumber = function () {
        var d = new Date(+this);  //Creamos un nuevo Date con la fecha de "this".
        d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
        d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
        //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
      };
      $scope.openModal = function (modal) {
        // console.log(modal);
        $(`#${modal}`).modal('open');
        switch (modal) {
          case 'funcionarios':
            $scope.buscard1 = '';
            $scope.listFuncionarios = [];
            $("#modalfuncionarios").modal("open");
            setTimeout(() => {
              $('#modalfuncionarios #ipsinput').focus();
            }, 100);
            break;
          case 'permisos':
            $("#modalpermisos").modal("open");
            setTimeout(() => {
              $('#modalfuncionarios #ipsinput').focus();
            }, 100);
            break;
        }
      }
      $scope.closeModal = function (modal) {
        $(".modal").modal("close");
        switch (modal) {
          case 'funcionarios':
            $("#modalfuncionarios").modal("close");
            break;
        }
      }
      $scope.SetTab = function (x, y) {
        $scope.Tabs = x;
        if (x == 1) {
          $scope.testsemanaVacio();
          $scope.hoja1Limpiar();
          $scope.hoja2Limpiar();
          $scope.hoja3Limpiar();
        } if (x == 2) {
          $scope.testsemanaVacio();
          $scope.hoja1Limpiar();
          $scope.hoja2Limpiar();
          $scope.hoja3Limpiar();
        } if (x == 3) {
          $scope.testsemanaVacio();
          $scope.hoja1Limpiar();
          $scope.hoja2Limpiar();
          $scope.hoja3Limpiar();
          $scope.obtenerListadoFuncs();
        }

        // console.log(x);
        //   console.log(y);
      }
      $scope.Ajustar_validacioncamposVacios = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#validacioncamposVacios").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#validacioncamposVacios").style.zoom = 0.8;
        }
        // if ($(window).width() < 1100) {
        //   document.querySelector("#validacioncamposVacios").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1100 && $(window).width() < 1300) {
        //   document.querySelector("#validacioncamposVacios").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1300 && $(window).width() < 1500) {
        //   document.querySelector("#validacioncamposVacios").style.zoom = 0.8;
        // }
        // if ($(window).width() > 1500) {
        //   document.querySelector("#validacioncamposVacios").style.zoom = 0.9;
        // }
      }
      $(window).on('resize', function () {
        $scope.Ajustar_validacioncamposVacios();
      });
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
