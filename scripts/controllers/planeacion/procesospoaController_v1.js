'use strict';
angular.module('GenesisApp')
  .controller('procesospoaController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        console.log($(window).width());
        setTimeout(() => {
          document.querySelector("#content").style.backgroundColor = "white";
        }, 2000);
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $('.modal').modal();
        $scope.Tabs = 0;
        $scope.SysDay = new Date();

        $scope.cargarPermisosUsuario();
        //
        // $scope.hojaIndicadoresActivarCamposDesactivados()
        setTimeout(() => {
          $scope.$apply();
        }, 1500);

        //////////////////////////////////////////////////////////
      }

      $scope.cargarPermisosUsuario = function () {
        $scope.permisos = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_consulta_permisos_usuario',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.Tabs = 0
            swal({
              title: "Error", text: 'No tiene permisos, por favor contactar al area de Planeación',
              allowOutsideClick: false,
              showConfirmButton: false,
              type: "warning"
            }).catch(swal.noop); return
          }
          if (data.length) {
            $scope.permisos = data[0]

            setTimeout(() => {
              if ($scope.permisos.BADC_ESTADO == 'A') {

                // if ($scope.permisos.BADC_ADMIN != 'S') {
                //   swal({
                //     title: "Mensaje", text: 'Modulo en Actualización ...',
                //     // allowOutsideClick: false,
                //     // showConfirmButton: false,
                //     type: "success",
                //   }).catch(swal.noop);
                //   return
                // }

                setTimeout(() => {

                  console.table(data)
                  $scope.hojaProcesosLimpiar()
                  $scope.hojaIndicadoresLimpiar()
                  $scope.hojaPDMLimpiar()
                  $scope.hojaAutoLimpiar()
                  $scope.hojaProcesosListar(); // ACTIVAR


                  $scope.SetTab(1); //OJO ACTIVAR
                  $scope.SetTab(2);
                }, 1500);
              } else {
                swal({
                  title: "Error", text: 'Usuario inactivo, por favor contactar al area de Planeación',
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  type: "warning"
                }).catch(swal.noop); return
              }
            }, 1000);
            setTimeout(() => { $scope.$apply(); }, 500);
            setTimeout(() => {
              $('.tabs').tabs();
            }, 1500);
            // console.table(data)
          }
        });
      }

      /////// PROCESOS ///////
      $scope.hojaProcesosLimpiar = function () {
        $scope.hojaProcesos = {
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },

          formulario: {
            listadoTipo: [
              { codigo: 1, nombre: 'Estrategico' },
              { codigo: 2, nombre: 'Misional' },
              { codigo: 3, nombre: 'Apoyo' },
              { codigo: 4, nombre: 'Evaluacion' }
            ],
            listadoCategoria: [
              { codigo: 1, nombre: 'Oficina' },
              { codigo: 2, nombre: 'Subgerencia' },
              { codigo: 3, nombre: 'Coordinacion Nacional o Regional' },
            ],
            listadoObjetivoPerspectiva: [],
            listadoObjetivoEstrategico: []
            // listadoObjetivoEstrategico: [
            //   { codigo: 1, nombre: 'Mejorar calidad en la atención en salud' },
            //   { codigo: 2, nombre: 'Crecer poblacionalmente' },
            //   { codigo: 3, nombre: 'Ser sostenibles financieramente' },
            //   { codigo: 4, nombre: 'Fortalecer institucionalmente la empresa' }
            // ],
          }
        }

      }

      $scope.hojaProcesosListarlistadoPerspectiva = function () {
        $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_obtener_objetivos_perspectiva',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaProcesosListarObjetivoEstrategico = function () {
        $scope.hojaProcesos.formulario.listadoObjetivoEstrategico = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_obtener_objetivo_estrategico'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.formulario.listadoObjetivoEstrategico = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaProcesosListar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaProcesos.listadoTabla = [];
        $scope.hojaProcesos.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_consulta_proceso'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.listadoTabla = data
            $scope.hojaProcesos.listadoTablaTemp = data
            $scope.initPaginacion('hojaProcesos', $scope.hojaProcesos.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });

      }

      $scope.hojaProcesosCrearNuevo = function () {
        $scope.hojaProcesos.formulario.nombre = '';
        $scope.hojaProcesos.formulario.tipo = '';
        $scope.hojaProcesos.formulario.categoria = '';
        $scope.hojaProcesos.formulario.descripcion = '';
        $scope.hojaProcesos.formulario.soporteB64 = '';
        $scope.hojaProcesos.formulario.soporteExt = '';
        $scope.hojaProcesos.formulario.soporteUrl = '';
        $scope.hojaProcesos.formulario.estado = 'A';
        $scope.hojaProcesos.formulario.perspectiva = '';
        $scope.hojaProcesos.formulario.objetivoEstrategico = '';
        $scope.hojaProcesos.formulario.objetivoTactivoCod = '';
        $scope.hojaProcesos.formulario.objetivoTactivo = '';
        $scope.hojaProcesos.formulario.anioInicial = '';
        $scope.hojaProcesos.formulario.anioFinal = '';
        $scope.hojaProcesos.formulario.listadoObjetivos = [];
        $scope.hojaProcesos.formulario.idProcesoSeleccionado = '';

        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.agregarObjetivo = function () {
        if (!$scope.hojaProcesos.formulario.perspectiva || !$scope.hojaProcesos.formulario.objetivoEstrategico || !$scope.hojaProcesos.formulario.objetivoTactivo
          || !$scope.hojaProcesos.formulario.anioInicial || !$scope.hojaProcesos.formulario.anioFinal
        ) {
          swal("¡Importante!", "Debe diligenciar los objetivos", "warning").catch(swal.noop);
          return
        }
        $scope.hojaProcesos.formulario.listadoObjetivos.push(
          {
            codigo_perspectiva: $scope.hojaProcesos.formulario.perspectiva,
            nombre_perspectiva: $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva.find(e => e.codigo == $scope.hojaProcesos.formulario.perspectiva).nombre,
            codigo_estrategico: $scope.hojaProcesos.formulario.objetivoEstrategico,
            nombre_estrategico: $scope.hojaProcesos.formulario.listadoObjetivoEstrategico.find(e => e.codigo == $scope.hojaProcesos.formulario.objetivoEstrategico).nombre,
            codigo_tactico: 0,
            nombre_tactico: $scope.hojaProcesos.formulario.objetivoTactivo,
            existen_indicador: 0,
            anio_inicial: $scope.hojaProcesos.formulario.anioInicial,
            anio_final: $scope.hojaProcesos.formulario.anioFinal,
            estado: 'A'
          }
        );
        $scope.hojaProcesos.formulario.perspectiva = '';
        $scope.hojaProcesos.formulario.objetivoEstrategico = '';
        $scope.hojaProcesos.formulario.objetivoTactivo = '';
        $scope.hojaProcesos.formulario.objetivoTactivoCod = '';
        $scope.hojaProcesos.formulario.anioInicial = '';
        $scope.hojaProcesos.formulario.anioFinal = '';
        $scope.actualizarConsObjetivo();
      }
      $scope.editarObjetivo = function (data) {
        $scope.hojaProcesos.formulario.perspectiva = data.codigo_perspectiva;
        $scope.hojaProcesos.formulario.objetivoEstrategico = data.codigo_estrategico;
        $scope.hojaProcesos.formulario.objetivoTactivoCod = data.codigo_tactico;
        $scope.hojaProcesos.formulario.objetivoTactivo = data.nombre_tactico;
        $scope.hojaProcesos.formulario.anioInicial = parseInt(data.anio_inicial);
        $scope.hojaProcesos.formulario.anioFinal = parseInt(data.anio_final);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.guardarObjetivoEditado = function () {
        if (!$scope.hojaProcesos.formulario.perspectiva || !$scope.hojaProcesos.formulario.objetivoEstrategico || !$scope.hojaProcesos.formulario.objetivoTactivo
          || !$scope.hojaProcesos.formulario.anioInicial || !$scope.hojaProcesos.formulario.anioFinal
        ) {
          swal("¡Importante!", "Debe diligenciar los objetivos", "warning").catch(swal.noop);
          return
        }

        let data = $scope.hojaProcesos.formulario.listadoObjetivos.find(e => e.codigo_tactico == $scope.hojaProcesos.formulario.objetivoTactivoCod)
        data.codigo_perspectiva = $scope.hojaProcesos.formulario.perspectiva;
        data.nombre_perspectiva = $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva.find(e => e.codigo == $scope.hojaProcesos.formulario.perspectiva).nombre;
        data.codigo_estrategico = $scope.hojaProcesos.formulario.objetivoEstrategico;
        data.nombre_estrategico = $scope.hojaProcesos.formulario.listadoObjetivoEstrategico.find(e => e.codigo == $scope.hojaProcesos.formulario.objetivoEstrategico).nombre;
        data.nombre_tactico = $scope.hojaProcesos.formulario.objetivoTactivo;
        data.anio_inicial = $scope.hojaProcesos.formulario.anioInicial;
        data.anio_final = $scope.hojaProcesos.formulario.anioFinal;
        $scope.hojaProcesos.formulario.perspectiva = '';
        $scope.hojaProcesos.formulario.objetivoEstrategico = '';
        $scope.hojaProcesos.formulario.objetivoTactivoCod = '';
        $scope.hojaProcesos.formulario.objetivoTactivo = '';
        $scope.hojaProcesos.formulario.anioInicial = '';
        $scope.hojaProcesos.formulario.anioFinal = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.quitarObjetivo = function (index, x) {
        if ($scope.hojaProcesos.formulario.listadoObjetivos[index].existen_indicador != '0') {
          swal("¡Importante!", "No es posible eliminar el objetivo, Existe un indicador relacionado", "warning").catch(swal.noop);
          return
        }

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
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_u_objetivo_proceso",
            procesoCod: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
            tacticoCod: x.codigo_tactico,
            estado: 'X',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            $scope.hojaProcesos.formulario.listadoObjetivos.splice(index, 1);
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
          }
        })

        // $scope.actualizarConsObjetivo()
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.actualizarEstadoObjetivos = function (x) {
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
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_u_objetivo_proceso",
            procesoCod: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
            tacticoCod: x.codigo_tactico,
            estado: x.estado == 'A' ? 'I' : 'A',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            x.estado = x.estado == 'A' ? 'I' : 'A';
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
          }
        })
      }

      $scope.actualizarConsObjetivo = function () {
        $scope.hojaProcesos.formulario.listadoObjetivos.forEach((element, index) => {
          element.codigo_tactico = index + 1;
        });
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.validarFormProcesos = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaProcesos.formulario.nombre) resolve(false);
          if (!$scope.hojaProcesos.formulario.tipo) resolve(false);
          if (!$scope.hojaProcesos.formulario.categoria) resolve(false);
          if (!$scope.hojaProcesos.formulario.descripcion) resolve(false);
          resolve(true)
        });
      }

      $scope.guardarFormProcesos = function () {
        $scope.validarFormProcesos().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.hojaProcesos.formulario.idProcesoSeleccionado == '' ? '¿Desea crear el proceso?' : '¿Desea actualizar el proceso?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $scope.cargarSoporte().then((resultSoporte) => {
                $http({
                  method: 'POST',
                  url: "php/planeacion/procesospoa.php",
                  data: {
                    function: "p_ui_proceso",
                    codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,

                    nombre: $scope.hojaProcesos.formulario.nombre,
                    tipo: $scope.hojaProcesos.formulario.tipo,
                    categoria: $scope.hojaProcesos.formulario.categoria,
                    descripcion: $scope.hojaProcesos.formulario.descripcion,
                    soporte: resultSoporte ? resultSoporte : $scope.hojaProcesos.formulario.soporteUrl,

                    estado: $scope.hojaProcesos.formulario.estado,
                    jsonObjetivos: JSON.stringify($scope.hojaProcesos.formulario.listadoObjetivos),
                    jsonObjetivosCantidad: $scope.hojaProcesos.formulario.listadoObjetivos.length,
                    accion: $scope.hojaProcesos.formulario.idProcesoSeleccionado == '' ? 'I' : 'U',

                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                    $scope.hojaProcesosListar(1);
                    $scope.closeModal()
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                })
              })
            }
          })
        })
      }

      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaProcesos.formulario.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporte",
              codigo: "SoporteProceso",
              // codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
              base64: $scope.hojaProcesos.formulario.soporteB64
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      document.querySelector('#procesosFile').addEventListener('change', function (e) {
        $scope.hojaProcesos.formulario.soporteB64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.hojaProcesos.formulario.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.hojaProcesos.formulario.soporteB64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#procesosFile').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#procesosFile').value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.modalCrearProcesos = function () {
        $scope.hojaProcesosCrearNuevo()
        $scope.openModal('modalCrearProcesos');
      }
      // EDITAR PROCESO
      $scope.modalEditarProcesos = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_objetivo_proceso",
            codigo: x.UNIN_CODIGO,
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }

          $scope.hojaProcesos.formulario.nombre = x.UNIC_NOMBRE;
          $scope.hojaProcesos.formulario.tipo = x.UNIC_MACRO_PROCESO;
          $scope.hojaProcesos.formulario.categoria = x.UNIC_CATEGORIA ?? '';
          $scope.hojaProcesos.formulario.descripcion = x.UNIC_DESCRIPCION ?? '';
          $scope.hojaProcesos.formulario.soporteB64 = '';
          $scope.hojaProcesos.formulario.soporteExt = '';
          $scope.hojaProcesos.formulario.soporteUrl = x.UNIC_SOPORTE ?? '';
          $scope.hojaProcesos.formulario.estado = x.UNIC_ESTADO;
          $scope.hojaProcesos.formulario.perspectiva = '';
          $scope.hojaProcesos.formulario.objetivoEstrategico = '';
          $scope.hojaProcesos.formulario.objetivoTactivo = '';
          $scope.hojaProcesos.formulario.objetivoTactivoCod = '';
          $scope.hojaProcesos.formulario.anioInicial = '';
          $scope.hojaProcesos.formulario.anioFinal = '';
          $scope.hojaProcesos.formulario.idProcesoSeleccionado = x.UNIN_CODIGO;
          $scope.hojaProcesos.formulario.listadoObjetivos = [];

          data.forEach(x => {
            $scope.hojaProcesos.formulario.listadoObjetivos.push(
              {
                codigo_perspectiva: x.CODIGO_PERSPECTIVA,
                nombre_perspectiva: x.NOMBRE_PERSPECTIVA,
                codigo_estrategico: x.UNIN_OBJETIVO_COD_ESTR,
                nombre_estrategico: x.NOMBRE,
                codigo_tactico: x.UNIN_OBJETIVO_COD_TACT,
                nombre_tactico: x.UNIC_NOMBRE,
                existen_indicador: x.EXISTE_INDICADOR,
                anio_inicial: x.UNIC_ANIO_INICIAL,
                anio_final: x.UNIC_ANIO_FINAL,
                estado: x.UNIC_ESTADO
              }
            );
          })

          // NOMBRE: "RENTABILIDAD"
          // UNIC_NOMBRE: "NUEVO PROCESO"
          // UNIC_SOPORTE: null
          // UNIN_OBJETIVO_COD_ESTR: "14"
          // UNIN_OBJETIVO_COD_TACT: "1"

          // UNIC_CATEGORIA: null
          // UNIC_DESCRIPCION: null
          // UNIC_ESTADO: "A"
          // UNIC_MACRO_PROCESO: null
          // UNIC_NOMBRE: "TODOS"
          // UNIC_SOPORTE: null
          // UNIN_CODIGO: "12"


          $scope.openModal('modalCrearProcesos');
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }


      $scope.obtenerTipoProceso = function (tipo = null) {
        if (!tipo) { return 'Ninguno' }
        return $scope.hojaProcesos.formulario.listadoTipo.find(e => e.codigo == tipo).nombre
      }
      $scope.obtenerCategoriaProceso = function (tipo = null) {
        if (!tipo) { return 'Ninguna' }
        return $scope.hojaProcesos.formulario.listadoCategoria.find(e => e.codigo == tipo).nombre
      }
      $scope.obtenerEstado = function (tipo = null) {
        const tipos = {
          A: "Activo",
          I: "Inactivo",
        };
        return tipos[tipo] || "Ninguno";
      }

      /////// PROCESOS ///////


      /////// INDICADORES ///////
      /////// INDICADORES ///////
      /////// INDICADORES ///////
      $scope.hojaIndicadoresLimpiar = function () {
        $scope.hojaIndicadores = {
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 20,
            valmaxpag: 10,
            pages: []
          },
          filtros: {
            activo: false,
            proceso: '',
            dependencia: '',
            periodicidadAnalisis: ''
          },

          formulario: {},
          graficoSemaforizacion: null,
          listadoObjetivos: [],
          listadoNivel: [
            { codigo: '1', nombre: 'Nacional' },
            { codigo: '2', nombre: 'Regional' },
            { codigo: '3', nombre: 'Regional o Nacional' },
            { codigo: '4', nombre: 'Subregional' },
          ],
          listadoRegionales: [
            { codigo: '8001', nombre: 'Atlántico' },
            { codigo: '13001', nombre: 'Bolivar' },
            { codigo: '15001', nombre: 'Boyacá' },
            { codigo: '20001', nombre: 'Cesar' },
            { codigo: '23001', nombre: 'Cordoba' },
            { codigo: '44001', nombre: 'Guajira' },
            { codigo: '47001', nombre: 'Magdalena' },
            { codigo: '50001', nombre: 'Meta' },
            { codigo: '70001', nombre: 'Sucre' },
          ],

          listadoDependencias: [],
          listadoTipologias: [],
          listadoTipoVigencia: [
            { codigo: 'A', nombre: 'Automática' },
            { codigo: 'M', nombre: 'Manual' },
          ],
          listadoUnidadMedida: [
            { codigo: '1', nombre: 'Numérica' },
            { codigo: '2', nombre: 'Porcentaje' },
            { codigo: '3', nombre: 'Fracción' },
            { codigo: '4', nombre: 'Días' },
            { codigo: '5', nombre: 'Horas' },
            { codigo: '6', nombre: 'Tasa' },
            { codigo: '7', nombre: 'Valor Absoluto' },
            { codigo: '8', nombre: 'Veces' },
            { codigo: '9', nombre: 'Pesos' },
          ],
          listadoFrecuencia: [
            { codigo: 'M', nombre: 'Mensual', meses: 12 },
            { codigo: 'B', nombre: 'Bimestral', meses: 6 },
            { codigo: 'T', nombre: 'Trimestral', meses: 4 },
            { codigo: 'S', nombre: 'Semestral', meses: 2 },
            { codigo: 'A', nombre: 'Anual', meses: 1 },
          ],
          //
          listadoVigencia: [
            { codigo: 'M', nombre: 'Meses' },
            { codigo: 'A', nombre: 'Años' },
          ],
          listadoClasifIndicador: [
            { codigo: 'O', nombre: 'Operativo' },
            { codigo: 'T', nombre: 'Táctico' },
            { codigo: 'E', nombre: 'Estratégico' },
            // { codigo: 'P', nombre: 'Plan de Mejoramiento' },
            { codigo: 'R', nombre: 'Otros' },
          ],
          listadoPrioridad: [
            { codigo: 'A', nombre: 'Alta' },
            { codigo: 'M', nombre: 'Media' },
            { codigo: 'B', nombre: 'Baja' },
          ],
          listadoTipoNorma: [
            { codigo: 'I', nombre: 'Institucional' },
            { codigo: 'N', nombre: 'Nación' },
            { codigo: 'M', nombre: 'Ministerio' },
            { codigo: 'L', nombre: 'Local' },
          ],
          listadoPeriodicidadReporte: [
            { codigo: 'E', nombre: 'Semanal' },
            { codigo: 'M', nombre: 'Mensual' },
            { codigo: 'B', nombre: 'Bimestral' },
            { codigo: 'S', nombre: 'Semestral' },
            { codigo: 'A', nombre: 'Anual' },
          ],
          listadoPeriodicidadAnalisis: [
            { codigo: 'E', nombre: 'Semanal' },
            { codigo: 'M', nombre: 'Mensual' },
            { codigo: 'B', nombre: 'Bimestral' },
            { codigo: 'S', nombre: 'Semestral' },
            { codigo: 'A', nombre: 'Anual' },
          ],
          listadotipoCalculo: [
            { codigo: 'CA', nombre: 'Cifra Absoluta' },
            { codigo: 'PO', nombre: 'Porcentaje' },
            { codigo: 'RA', nombre: 'Razón' },
            { codigo: 'TA', nombre: 'Tasa' },
            { codigo: 'VA', nombre: 'Variación' },
            { codigo: 'DI', nombre: 'Diferencia' },
            { codigo: 'AJ', nombre: 'Ajuste' },
            { codigo: 'DE', nombre: 'Desempeño' },
            { codigo: 'TL', nombre: 'Talento' },
            { codigo: 'CT', nombre: 'Capital de Trabajo' },
            { codigo: 'PR', nombre: 'Promedio' },
          ],
          listadoAnio: []

        }

        // $scope.modalDatosCorrespVars.listadoAnio = []
        // $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        for (let i = 2023; i <= $scope.SysDay.getFullYear() + 2; i++) {
          $scope.hojaIndicadores.listadoAnio.push({ 'codigo': i });
        }


        $scope.hojaIndicadoresObtenerDependencias();
        $scope.hojaIndicadoresObtenerTipologias();
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadoresListar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaIndicadores.listadoTabla = [];
        $scope.hojaIndicadores.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_lista_indicadores',
            codigoId: null
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          // if (data.toString().substr(0, 3) == '<br' || data == 0) {
          //   swal("Error",  'Sin datos', "warning").catch(swal.noop); return
          // }
          if (data.length) {
            $scope.hojaIndicadores.listadoTabla = data
            $scope.hojaIndicadores.listadoTablaTemp = data
            $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
        ///////////////////////////////////
        // const data = [
        //   { indicador: 'Indicador de Prueba', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '100%', analisis: '0%', estado: 'A' },
        //   { indicador: 'Indicador de Prueba 2', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '50%', analisis: '0%', estado: 'A' },
        //   { indicador: 'Indicador de Prueba 3', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '0%', analisis: '0%', estado: 'A' },
        // ];
        // $scope.hojaIndicadores.listadoTabla = data;
        // $scope.hojaIndicadores.listadoTablaTemp = data;
        // $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
        // setTimeout(() => { $scope.$apply(); }, 500);

      }

      $scope.hojaIndicadoresCrearNuevo = function () {
        $scope.hojaIndicadoresActivarCamposDesactivados()
        // console.log($scope.hojaIndicadores.formulario.idIndicadorSeleccionado, $scope.hojaIndicadores.formulario.nombre)
        // if ($scope.hojaIndicadores.formulario.idIndicadorSeleccionado != '' && $scope.hojaIndicadores.formulario.nombre) {
        $scope.hojaIndicadores.formulario.anio = $scope.SysDay.getFullYear();;

        $scope.hojaIndicadores.formulario.nombre = '';
        $scope.hojaIndicadores.formulario.nombreDsb = false;
        $scope.hojaIndicadores.formulario.estado = 'A';
        $scope.hojaIndicadores.formulario.proceso = '';
        $scope.hojaIndicadores.formulario.tipoProceso = '';
        $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        $scope.hojaIndicadores.formulario.nivel = '';
        $scope.hojaIndicadores.formulario.regional = '';
        $scope.hojaIndicadores.formulario.dependencia = '';
        $scope.hojaIndicadores.formulario.definicion = '';
        //
        $scope.hojaIndicadores.formulario.lineaBase = '';
        $scope.hojaIndicadores.formulario.meta = '';
        $scope.hojaIndicadores.formulario.metaVigencia = '';
        $scope.hojaIndicadores.formulario.tipoVigencia = '';
        $scope.hojaIndicadores.formulario.tipoVigenciaDsb = false;
        $scope.hojaIndicadores.formulario.unidadMedida = '';
        $scope.hojaIndicadores.formulario.frecuencia = '';
        //
        $scope.hojaIndicadores.formulario.acumulativo = '';
        $scope.hojaIndicadores.formulario.fuenteNumerador = '';
        $scope.hojaIndicadores.formulario.fuenteDenominador = '';
        //
        $scope.hojaIndicadores.formulario.vigencia = '';
        $scope.hojaIndicadores.formulario.clasificacionIndicador = '';
        $scope.hojaIndicadores.formulario.prioridad = '';
        $scope.hojaIndicadores.formulario.tipoNorma = '';
        $scope.hojaIndicadores.formulario.norma = '';

        $scope.hojaIndicadores.formulario.planDeMejoramiento = '';
        $scope.hojaIndicadores.formulario.descripcionPlanDeMejoramiento = '';
        $scope.hojaIndicadores.formulario.tipologia = '';
        $scope.hojaIndicadores.formulario.fenix = '';

        $scope.hojaIndicadores.formulario.periodicidadReporte = '';
        $scope.hojaIndicadores.formulario.periodicidadAnalisis = '';
        //
        $scope.hojaIndicadores.formulario.responsableReporte = '';
        $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        $scope.hojaIndicadores.formulario.responsableAnalisis = '';
        $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        $scope.hojaIndicadores.formulario.actores = '';
        $scope.hojaIndicadores.formulario.listadoActores = [];
        $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        $scope.hojaIndicadores.formulario.descripcionNumerador = '';
        $scope.hojaIndicadores.formulario.descripcionDenominador = '';
        $scope.hojaIndicadores.formulario.descripcionConstante = '';

        $scope.hojaIndicadores.formulario.tipoCalculo = '';
        $scope.hojaIndicadores.formulario.semaforizacionEstado = '';
        $scope.hojaIndicadores.formulario.semaforizacionSentido = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor1 = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor2 = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor3 = '';
        $scope.hojaIndicadores.formulario.semaforizacionValorMax = '';

        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';
        // }



        ////////////////////////////////////////////////
        // $scope.hojaIndicadores.formulario.nombre = 'INDICADOR AUDITORIA INTERNA';
        // $scope.hojaIndicadores.formulario.estado = 'A';
        // $scope.hojaIndicadores.formulario.proceso = '';
        // $scope.hojaIndicadores.formulario.tipoProceso = '';
        // $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        // $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        // $scope.hojaIndicadores.formulario.nivel = '1';
        // $scope.hojaIndicadores.formulario.dependencia = '';
        // $scope.hojaIndicadores.formulario.definicion = 'DEFINICION PRUEBA INDICADOR';
        // //
        // $scope.hojaIndicadores.formulario.lineaBase = '60';
        // $scope.hojaIndicadores.formulario.meta = '100';

        // $scope.hojaIndicadores.formulario.unidadMedida = '1';
        // $scope.hojaIndicadores.formulario.frecuencia = 'M';
        // //
        // $scope.hojaIndicadores.formulario.fuenteNumerador = 'FUENTE NUMERADOR PRUEBA INDICADOR';
        // $scope.hojaIndicadores.formulario.fuenteDenominador = 'FUENTE DENOMINADOR PRUEBA INDICADOR';
        // //
        // $scope.hojaIndicadores.formulario.vigencia = 'M';
        // $scope.hojaIndicadores.formulario.clasificacionIndicador = 'O';
        // $scope.hojaIndicadores.formulario.prioridad = 'A';
        // $scope.hojaIndicadores.formulario.tipoNorma = 'I';
        // $scope.hojaIndicadores.formulario.norma = 'NORMA PRUEBA INDICADOR';
        // $scope.hojaIndicadores.formulario.periodicidadReporte = 'S';
        // $scope.hojaIndicadores.formulario.periodicidadAnalisis = 'M';
        // //
        // $scope.hojaIndicadores.formulario.responsableReporte = '1069712551 - LEON ESPITIA ROCIO';
        // $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        // $scope.hojaIndicadores.formulario.responsableAnalisis = '1042454684 - ARIZA NUNEZ KEVIN JAVIER';
        // $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        // $scope.hojaIndicadores.formulario.actores = '';
        // $scope.hojaIndicadores.formulario.listadoActores = [];
        // // $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        // $scope.hojaIndicadores.formulario.listadoActoresTabla = [{ "codigo": 8901020441, "nombre": "CAJACOPI EPS SAS" }];

        // $scope.hojaIndicadores.formulario.tipoCalculo = '';
        // $scope.hojaIndicadores.formulario.semaforizacionEstado = 'S';
        // $scope.hojaIndicadores.formulario.semaforizacionSentido = 'A';
        // $scope.hojaIndicadores.formulario.semaforizacionValor1 = '40';
        // $scope.hojaIndicadores.formulario.semaforizacionValor2 = '40';
        // $scope.hojaIndicadores.formulario.semaforizacionValor3 = '20';


        // $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';
        ////////////////////////////////////////////////

        setTimeout(() => {
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
            i.setAttribute("disabled", true);
          });
        }, 1000);

        if ($scope.hojaIndicadores.graficoSemaforizacion) {
          $scope.hojaIndicadores.graficoSemaforizacion.destroy()
          $scope.hojaIndicadores.graficoSemaforizacion = null;
        }

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      // EDITAR INDICADOR
      $scope.modalEditarIndicador = function (x) {
        console.log(x);
        $scope.modalDatosIndicador = x;

        $scope.itemSeleccionado = x.CODIGO;

        $scope.hojaIndicadoresActivarCamposDesactivados()
        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = x.CODIGO;

        $scope.hojaIndicadores.formulario.anio = x.REGN_ANNO;
        $scope.hojaIndicadores.formulario.nombre = x.REGN_NOM_INDICADOR;
        $scope.hojaIndicadores.formulario.nombreDsb = false
        $scope.hojaIndicadores.formulario.estado = x.REGC_ESTADO;
        $scope.hojaIndicadores.formulario.proceso = x.REGN_PROCESO;
        // $scope.hojaIndicadores.formulario.tipoProceso = '';
        // $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        $scope.hojaIndicadores.listadoObjetivos = [];

        $scope.hojaIndicadores.formulario.nivel = x.REGN_NIVEL.split('-')[0];
        $scope.hojaIndicadores.formulario.regional = x.REGN_REGIONAL;
        $scope.hojaIndicadores.formulario.dependencia = x.REGN_DEPENDENCIA.split('-')[0];
        $scope.hojaIndicadores.formulario.definicion = x.REGC_OBJETIVO_INDICADOR;
        //
        $scope.hojaIndicadores.formulario.lineaBase = x.REGN_LINEA_BASE.replace(',', '.');
        $scope.hojaIndicadores.formulario.meta = x.REGN_META.replace(',', '.');
        $scope.hojaIndicadores.formulario.metaVigencia = x.REGN_META_VIGENCIA.replace(',', '.');
        $scope.hojaIndicadores.formulario.tipoVigencia = x.REGC_TIPO_VIGENCIA.split('-')[0];
        $scope.hojaIndicadores.formulario.tipoVigenciaDsb = true;
        if ($scope.permisos.BADC_ADMIN == 'S') {
          $scope.hojaIndicadores.formulario.nombreDsb = false
          $scope.hojaIndicadores.formulario.tipoVigenciaDsb = false
        }
        $scope.hojaIndicadores.formulario.unidadMedida = x.REGN_UNIDAD_MEDIDA.split('-')[0];
        // $scope.hojaIndicadores.formulario.frecuencia = x.REGC_FRECUENCIA.split('-')[0];
        //
        $scope.hojaIndicadores.formulario.acumulativo = x.REGC_ACUMULATIVO;
        $scope.hojaIndicadores.formulario.fuenteNumerador = x.REGN_FUENTE_NUMERADOR;
        $scope.hojaIndicadores.formulario.fuenteDenominador = x.REGN_FUENTE_DENOMINADOR;
        //
        $scope.hojaIndicadores.formulario.vigencia = x.REGC_VIGENCIA.split('-')[0];
        $scope.hojaIndicadores.formulario.clasificacionIndicador = x.REGC_CLASIFICACION.split('-')[0];
        $scope.hojaIndicadores.formulario.prioridad = x.REGC_PRIORIDAD.split('-')[0];
        $scope.hojaIndicadores.formulario.tipoNorma = x.REGC_TIPO_NORMA ? x.REGC_TIPO_NORMA.split('-')[0] : '';
        $scope.hojaIndicadores.formulario.norma = x.REGC_NORMA;

        $scope.hojaIndicadores.formulario.planDeMejoramiento = x.REGC_PLANMEJORAMIENTO;
        $scope.hojaIndicadores.formulario.descripcionPlanDeMejoramiento = x.REGV_DESC_PLANMEJORAMIENTO;
        $scope.hojaIndicadores.formulario.tipologia = x.REGC_TIPOLOGIA.split('-')[0];
        $scope.hojaIndicadores.formulario.fenix = x.REGC_FENIX;


        $scope.hojaIndicadores.formulario.periodicidadReporte = x.REGC_PERIODICIDAD_REPORTE.split('-')[0];
        $scope.hojaIndicadores.formulario.periodicidadAnalisis = x.REGC_PERIODICIDAD_ANALISIS.split('-')[0];
        //
        $scope.hojaIndicadores.formulario.responsableReporte = `${x.REGV_RESPONSABLE_REPORTE} - ${x.NOMBRE_RESPONSABLE_REPORTE}`;
        $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        $scope.hojaIndicadores.formulario.responsableAnalisis = `${x.REGV_RESPONSABLE_ANALISIS} - ${x.NOMBRE_RESPONSABLE_ANALISIS}`;
        $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        $scope.hojaIndicadores.formulario.actores = '';
        $scope.hojaIndicadores.formulario.listadoActores = [];
        $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        $scope.hojaIndicadores.formulario.descripcionNumerador = x.REGN_DESCRIPCION_NUMERADOR;
        $scope.hojaIndicadores.formulario.descripcionDenominador = x.REGN_DESCRIPCION_DENOMINADOR;
        $scope.hojaIndicadores.formulario.descripcionConstante = x.REGN_DESCRIPCION_CONSTANTE;

        $scope.hojaIndicadores.formulario.tipoCalculo = x.REGC_TIPO_CALCULO.split('-')[0];
        $scope.hojaIndicadores.formulario.semaforizacionEstado = x.REGC_SEMAFORIZACION;
        $scope.hojaIndicadores.formulario.semaforizacionSentido = x.REGC_TIPO.split('-')[0];
        $scope.hojaIndicadores.formulario.semaforizacionValor1 = x.REGC_DATO1.replace(',', '.');
        $scope.hojaIndicadores.formulario.semaforizacionValor2 = x.REGC_DATO2.replace(',', '.');
        $scope.hojaIndicadores.formulario.semaforizacionValor3 = x.REGC_DATO3.replace(',', '.');
        $scope.hojaIndicadores.formulario.semaforizacionValorMax = x.REGC_DATOMAX.replace(',', '.');

        setTimeout(() => {
          $scope.calcularGraficoSemaforizacion('hojaIndicadores');
          $scope.hojaIndicadoresObtenerTipoyObjetivos(x.REGN_PROCESO, `${x.REGN_COD_ESTR}_${x.REGN_COD_TACT}`)
          // setTimeout(() => {
          //   $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = `${x.REGN_COD_ESTR}_${x.REGN_COD_TACT}`;
          //   setTimeout(() => { $scope.$apply(); }, 500);
          // }, 3000);
        }, 500);
        $scope.modalObtenerDatosActores(x);

        $scope.openModal('modalCrearIndicadores');
        document.getElementById('modalCrearIndicadores_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => {

          if (!$scope.permisos.BADC_ACTUALIZAR_FICHA == 'S') {
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
              i.setAttribute("disabled", true);
            });
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
              i.setAttribute("disabled", true);
            });
          }
        }, 1000);
      }

      $scope.hojaIndicadoresCalcularMetaVigencia = function () {
        if (!$scope.hojaIndicadores.formulario.acumulativo || !$scope.hojaIndicadores.formulario.meta || !$scope.hojaIndicadores.formulario.periodicidadAnalisis) {
          return
        }
        if ($scope.hojaIndicadores.formulario.acumulativo == 'N') {
          $scope.hojaIndicadores.formulario.metaVigencia = $scope.hojaIndicadores.formulario.meta;
          return
        } else {
          const meses = ($scope.hojaIndicadores.listadoFrecuencia.find(e => e.codigo === $scope.hojaIndicadores.formulario.periodicidadAnalisis.split('-')[0])).meses;
          $scope.hojaIndicadores.formulario.metaVigencia = parseFloat((parseFloat(parseInt($scope.hojaIndicadores.formulario.meta) / parseInt(meses))).toFixed(2)).toString().replace(/\./g, ',');
        }
      }

      $scope.hojaIndicadoresActivarCamposDesactivados = function () {
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });
        //
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
          i.removeAttribute("disabled");
        });
      }

      $scope.modalObtenerDatosActores = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_responsable_indicador",
            codigoId: x.CODIGO,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            data.forEach(e => {
              $scope.hojaIndicadores.formulario.listadoActoresTabla.push({
                "codigo": e.REGV_RESPONSABLE,
                "nombre": e.TERC_NOMBRE
              })
            })
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalFichaTecnica = function (x) {
        $scope.itemSeleccionado = x.CODIGO
        $scope.modalFichaTecnicaDatos = x
        $scope.modalFichaTecnicaVars = {}
        $scope.modalFichaTecnicaVars.nombre = x.REGN_NOM_INDICADOR
        $scope.modalFichaTecnicaVars.definicion = x.REGC_OBJETIVO_INDICADOR
        $scope.modalFichaTecnicaVars.numerador = x.REGN_DESCRIPCION_NUMERADOR
        $scope.modalFichaTecnicaVars.denominador = x.REGN_DESCRIPCION_DENOMINADOR
        // $scope.modalFichaTecnicaVars.fuenteNumerador = x.REGN_FUENTE_NUMERADOR
        // $scope.modalFichaTecnicaVars.fuenteDenominador = x.REGN_FUENTE_DENOMINADOR

        $scope.modalFichaTecnicaVars.clasificacionIndicador = x.REGC_CLASIFICACION.split('-')[1]
        $scope.modalFichaTecnicaVars.prioridad = x.REGC_PRIORIDAD.split('-')[1]
        // $scope.modalFichaTecnicaVars.tipoNorma = x.REGC_TIPO_NORMA ? x.REGC_TIPO_NORMA.split('-')[1] : ''
        $scope.modalFichaTecnicaVars.periodicidadReporte = x.REGC_PERIODICIDAD_REPORTE.split('-')[1]
        $scope.modalFichaTecnicaVars.periodicidadAnalisis = x.REGC_PERIODICIDAD_ANALISIS.split('-')[1]
        $scope.modalFichaTecnicaVars.responsableRegistro = x.REGV_RESPONSABLE.split('-')[1]

        $scope.modalFichaTecnicaVars.idIndicadorSeleccionado = x.CODIGO;

        $scope.modalFichaTecnicaVars.dependencia = x.REGN_DEPENDENCIA.split('-')[1];
        $scope.modalFichaTecnicaVars.proceso = x.UNIC_NOMBRE;

        $scope.modalFichaTecnicaVars.semaforizacionEstado = x.REGC_SEMAFORIZACION
        $scope.modalFichaTecnicaVars.semaforizacionSentido = x.REGC_TIPO.split('-')[0]
        $scope.openModal('modalFichaTecnica');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadoresEliminar = function () {
        $scope.modalFichaTecnicaVars.idIndicadorSeleccionado;
        swal({
          title: 'Observación',
          input: 'textarea',
          inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          allowOutsideClick: false,
          // inputValue: $scope.Vista1.Obs,
          width: '500px',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal({
                  title: "Mensaje",
                  text: "¡Debe una observación!",
                  type: "warning",
                }).catch(swal.noop);
              }
            })
          }
        }).then(function (observacion) {
          //
          if (observacion)
            swal({
              title: '¿Desea eliminar el Indicador?',
              text: '',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
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
                  url: "php/planeacion/procesospoa.php",
                  data: {
                    function: 'p_eliminar_indicador',

                    codigoIndicador: $scope.modalFichaTecnicaVars.idIndicadorSeleccionado,

                    observacion,
                    responsable: $scope.Rol_Cedula
                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", "Indicador eliminado!", "success").catch(swal.noop);
                    $scope.closeModal()
                    $scope.hojaIndicadoresListar(1);
                    setTimeout(() => { $scope.$apply(); }, 500);
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                });
              }
            });
        }).catch(swal.noop);
      }

      $scope.modalGraficoIndicador = function (x) {
        $scope.itemSeleccionado = x.CODIGO
        // $scope.modalDatosCorrespVars.listado
        $scope.modalDatosCambio = x;
        if (x.REGC_SEMAFORIZACION == 'N') {
          swal("Mensaje", "Semaforización no activa", "warning").catch(swal.noop);
          return
        }
        setTimeout(() => {
          $scope.openModal('modalGraficoIndicador');
        }, 1000);
        $scope.modalGraficoVars = {};
        $scope.modalGraficoVars = x;

        $scope.modalGraficoVars.anio = $scope.SysDay.getFullYear();

        $scope.modalGraficoObtenerdatos(x);

      }

      $scope.cargarGraficoPeriodoChange = function () {
        // if ($scope.modalGraficoVars.anioAnterior != $scope.modalGraficoVars.anio) {
        // $scope.modalGraficoVars.anioAnterior = $scope.modalGraficoVars.anio;
        $scope.modalGraficoObtenerdatos($scope.modalGraficoVars);
        // }
      }

      $scope.modalGraficoObtenerdatos = function (x) {
        if ($scope.graficoIndicador) {
          $scope.graficoIndicador.destroy()
          $scope.graficoIndicador = null;
        }
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_indicador",
            codigoIndicador: x.CODIGO,
            anio: x.REGN_ANNO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.graficoIndicador.destroy()
            $scope.graficoIndicador = null;
            setTimeout(() => { $scope.$apply(); }, 500);
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {

            $scope.modalGraficoVars.listado = data;
            setTimeout(() => {
              var dataMeses, dataSerie, dataMeta = [], dataPlotBands, dato1_Max, dato2_Min, dato2_Max, dato3_Min

              if ($scope.modalGraficoVars.REGC_TIPO.split('-')[0] == 'A') { // Orden Ascendente
                dato1_Max = parseFloat($scope.modalGraficoVars.REGC_DATO1);
                dato2_Min = dato1_Max
                dato2_Max = dato2_Min + parseFloat($scope.modalGraficoVars.REGC_DATO2);
                dato3_Min = dato2_Max;

                dataPlotBands = [
                  {
                    color: 'hsl(206deg 90% 69.5% / 10%)', // Color value
                    from: parseFloat($scope.modalGraficoVars.REGC_DATOMAX),
                    to: 10000000,
                    label: {
                      text: 'Exceso'
                    }
                  },
                  { // Light air
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }

                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato3_Min,
                    to: parseFloat($scope.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      // text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              } else { // Orden Descendente
                dato3_Min = parseFloat($scope.modalGraficoVars.REGC_DATOMAX) - parseFloat($scope.modalGraficoVars.REGC_DATO1);
                dato2_Max = dato3_Min
                dato2_Min = dato2_Max - parseFloat($scope.modalGraficoVars.REGC_DATO2);
                dato1_Max = dato2_Min;
                // dato3_Min = 100 - parseFloat($scope.modalGraficoVars.REGC_DATO2);
                // dato2_Max = dato3_Min
                // dato2_Min = dato2_Max - parseFloat($scope.modalGraficoVars.REGC_DATO2);
                // dato1_Max = dato2_Min;
                dataPlotBands = [
                  { // Light air
                    from: dato3_Min,
                    to: parseFloat($scope.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      // text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              }
              // M:Mensual; B:Bimestral; T:Trimestral; S:Semestral; A:Anual;
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'M') {// Mensual
                dataMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(1) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(1),
                  $scope.filtrarPeriodoAcumulado(2),
                  $scope.filtrarPeriodoAcumulado(3),
                  $scope.filtrarPeriodoAcumulado(4),
                  $scope.filtrarPeriodoAcumulado(5),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(7),
                  $scope.filtrarPeriodoAcumulado(8),
                  $scope.filtrarPeriodoAcumulado(9),
                  $scope.filtrarPeriodoAcumulado(10),
                  $scope.filtrarPeriodoAcumulado(11),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(1))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(2))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(3))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(4))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(5))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(7))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(8))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(9))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(10))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(11))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'B') {// Bimestral
                dataMeses = ['Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(2) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(2),
                  $scope.filtrarPeriodoAcumulado(4),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(8),
                  $scope.filtrarPeriodoAcumulado(10),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(2))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(4))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(8))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(10))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'T') {// Trimestral
                dataMeses = ['Mar', 'Jun', 'Sep', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(3) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(3),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(9),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(3))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(9))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'S') {// Semestral
                dataMeses = ['Jun', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(6) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'A') {// Anual
                dataMeses = ['Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(12)
                  // $scope.filtrarPeriodoAcumulado(12) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.'))
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia(12))
              }

              //GENERAR GRAFICO
              $scope.graficoIndicador = Highcharts.chart('graficoIndicador', {
                chart: {
                  type: 'line'
                },
                title: {
                  text: $scope.modalGraficoVars.REGN_NOM_INDICADOR
                },
                // subtitle: {
                //   text: $scope.modalGraficoVars.UNIC_NOMBRE
                // },
                xAxis: {
                  categories: dataMeses
                },
                yAxis: {
                  // min: 0,
                  // max: 110,
                  // tickInterval: 10,
                  gridLineColor: '',
                  title: {
                    text: ''
                  },
                  plotBands: dataPlotBands
                },

                plotOptions: {
                  line: {
                    dataLabels: {
                      enabled: true
                    },
                  }
                },
                series: [
                  {
                    name: 'Periodo',
                    color: '#00e8ff',
                    lineWidth: 3,
                    data: dataSerie
                  },
                  {
                    type: 'line',
                    name: 'META',
                    color: '#32ff08',
                    lineWidth: 4,
                    data: dataMeta,
                    marker: {
                      enabled: false
                    },
                    // enableMouseTracking: false,
                  },
                  //
                  {
                    name: 'Linea base',
                    //color: '#00e8ff',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))]],
                  }
                  //
                ],
                // exporting: { enabled: false },
                credits: { enabled: false },
              });
              //GENERAR GRAFICO

            }, 500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.filtrarPeriodoAcumulado = function (periodo) {
        // console.log($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo)[0].GESN_ACUMULADO)
        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_ACUMULADO.toString()).replace(',', '.'));

        //console.log($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))
        const observacion = ($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESC_OBSERVACION;
        if (observacion === null) {
          return null
        }
        return dato == 0 ? 0 : dato
      }
      $scope.filtrarPeriodoMetaVigencia = function (periodo) {
        // console.log($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo)[0].GESN_ACUMULADO)
        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_META_VIGENCIA.toString()).replace(',', '.'));
        return dato == 0 ? null : dato
      }

      $scope.modalDatosCorresp = function (x) {
        // x.seleccionado = true
        $scope.itemSeleccionado = x.CODIGO
        $scope.modalDatosCambio = x;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.modalDatosCorrespVars = {}
        $scope.modalDatosCorrespVars = JSON.parse(JSON.stringify(x));
        $scope.modalDatosCorrespVarsPeriodo = {}
        // $scope.modalDatosCorrespVars.listadoAnio = []
        $scope.modalDatosCorrespVars.vista = 1
        // $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        // for (let i = 2021; i <= $scope.SysDay.getFullYear(); i++) {
        //   $scope.modalDatosCorrespVars.listadoAnio.push({ 'codigo': i });
        // }
        $scope.modalDatosCorrespVars.anioAnterior = $scope.SysDay.getFullYear();
        $scope.modalDatosCorrespVars.anio = x.REGN_ANNO;
        // $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        setTimeout(() => { $scope.$apply(); }, 500);
        setTimeout(() => {
          $scope.modalDatosCorrespObtenerdatos(x);
          $scope.openModal('modalDatosCorresp');
          setTimeout(() => { swal.close() }, 700);
        }, 1000);
      }

      $scope.cargarDatosPeriodoChange = function () {
        if ($scope.modalDatosCorrespVars.anioAnterior != $scope.modalDatosCorrespVars.anio) {
          $scope.modalDatosCorrespVars.anioAnterior = $scope.modalDatosCorrespVars.anio;
          $scope.modalDatosCorrespObtenerdatos($scope.modalDatosCorrespVars);
        }
      }

      $scope.modalDatosCorrespObtenerdatos = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_indicador",
            codigoIndicador: x.CODIGO,
            anio: x.REGN_ANNO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.modalDatosCorrespVars.listado = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalDatosCorrespObtenerdatos_traza = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_traza_gestion_indicador",
            codigoIndicador: $scope.modalDatosCorrespVars.CODIGO,
            anio: $scope.modalDatosCorrespVars.anio.toString(),
            periodo: $scope.modalDatosCorrespVarsPeriodo.periodo
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Mensaje", 'No existen datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Traza.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalDatosCorrespGestionarPeriodo = function (x, index) {
        console.log($scope.modalDatosCorrespVars);
        $scope.modalDatosCorrespVars.vista = 2;
        $scope.modalDatosCorrespVarsPeriodo.anio = x.GESN_ANNO
        $scope.modalDatosCorrespVarsPeriodo.periodoNombre = x.GESN_PERIODO_NOMBRE
        $scope.modalDatosCorrespVarsPeriodo.periodo = x.GESN_PERIODO
        $scope.modalDatosCorrespVarsPeriodo.numerador = x.GESN_NUMERADOR != null ? x.GESN_NUMERADOR.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.denominador = x.GESN_DENOMINADOR != null ? x.GESN_DENOMINADOR.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.constante = x.GESN_CONSTANTE != null ? x.GESN_CONSTANTE.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.nota = x.GESC_OBSERVACION
        $scope.modalDatosCorrespVarsPeriodo.accion = x.GESN_ACUMULADO == '0' ? 'I' : 'U'
        $scope.modalDatosCorrespVarsPeriodo.resultado = x.GESN_RESULTADO;

        document.querySelector('#fileGestionIndic').value = '';
        $scope.modalDatosCorrespVarsPeriodo.soporteNombre = '';
        $scope.modalDatosCorrespVarsPeriodo.soporteExt = '';
        $scope.modalDatosCorrespVarsPeriodo.soporteB64 = '';
        $scope.modalDatosCorrespVarsPeriodo.listadoAdjuntos = []
        $scope.listarSoportesGestionIndi();

        // Tipo de calculo Variacion - Buscar resultado del periodo anterior
        // if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'VA') {
        //   if (index == 0) {
        //     $scope.modalDatosCorrespVarsPeriodo.numerador = 0;
        //   } else {
        //     $scope.modalDatosCorrespVarsPeriodo.numerador = $scope.modalDatosCorrespVars.listado[index - 1].GESN_RESULTADO.replace(',', '.')
        //   }
        // }

        $scope.calcularResultadoPeriodo()
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.calcularResultadoPeriodo = function () {
        $scope.modalDatosCorrespVarsPeriodo.resultado = '?'
        if ($scope.modalDatosCorrespVarsPeriodo.numerador == '' || $scope.modalDatosCorrespVarsPeriodo.denominador == '') return;

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'PO') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'RA') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante)
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'VA') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DI') {

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            100 - (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) * 100
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) -
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) * parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador)) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DE') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            1 -
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) /
              (parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador) * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante)))
          )
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TL') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'CT') {
          // if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'PR') {

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) + parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) / 2
          ).toFixed(2)
        }

      }

      $scope.hojaIndicadoresAtrasModalPeriodo = function () {
        $scope.modalDatosCorrespVars.vista = 1;
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalDatosCorrespValidarForm = function () {
        return new Promise((resolve) => {
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.numerador) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.denominador) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'CA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DE' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TL' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if (!$scope.modalDatosCorrespVarsPeriodo.nota) resolve(false)
          resolve(true)
        });
      }

      $scope.modalDatosCorrespGuardarPeriodo = function () {
        $scope.modalDatosCorrespValidarForm().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.modalDatosCorrespVarsPeriodo.accion == 'I' ? '¿Desea registrar el periodo?' : '¿Desea actualizar el periodo?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {

              const datos =
                [{
                  pcod_id: $scope.modalDatosCorrespVars.CODIGO,
                  panno: $scope.modalDatosCorrespVars.anio.toString(),
                  pperiodo: $scope.modalDatosCorrespVarsPeriodo.periodo,
                  pnumerador: $scope.modalDatosCorrespVarsPeriodo.numerador.replace('.', ','),
                  pdenominador: $scope.modalDatosCorrespVarsPeriodo.denominador.replace('.', ','),
                  pconstante: $scope.modalDatosCorrespVarsPeriodo.constante.replace('.', ','),
                  pobservacion: $scope.modalDatosCorrespVarsPeriodo.nota,
                  presponsable: $scope.Rol_Cedula
                }]
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: 'p_ui_gestion_indicador',
                  datos: JSON.stringify(datos),
                  cantidad: '1',
                  accion: $scope.modalDatosCorrespVarsPeriodo.accion
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", "Datos guardados", "success").catch(swal.noop);

                  $scope.modalDatosCorrespVars.vista = 1;
                  $scope.modalDatosCorrespObtenerdatos($scope.modalDatosCorrespVars);
                  $scope.hojaIndicadoresListar();

                  setTimeout(() => { $scope.$apply(); }, 500);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              });
            }
          });
        });
      }

      // $scope.hojaIndicadoresSetTab = function (tab) {
      //   $scope.hojaIndicadores.formulario.tabs = tab;
      //   setTimeout(() => { $scope.$apply(); }, 500);
      // }

      $scope.hojaIndicadoresObtenerTipoyObjetivos = function (proceso, objetivo) {
        const dato = $scope.hojaProcesos.listadoTabla.find(e => e.UNIN_CODIGO === $scope.hojaIndicadores.formulario.proceso);

        $scope.hojaIndicadores.formulario.tipoProceso = $scope.obtenerTipoProceso(dato.UNIC_MACRO_PROCESO);
        $scope.hojaIndicadores.formulario.tipoProcesoCod = dato.UNIC_MACRO_PROCESO;

        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_objetivo_proceso",
            codigo: proceso,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'El proceso no tiene objetivos', "warning").catch(swal.noop); return
          }
          $scope.hojaIndicadores.listadoObjetivos = data;

          setTimeout(() => {
            $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = objetivo
          }, 500);
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresObtenerDependencias = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_listar_cargo_dependencias",
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoDependencias.push(
              { codigo: e.Codigo, nombre: e.Nombre }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }
      $scope.hojaIndicadoresObtenerTipologias = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_tipologias",
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoTipologias.push(
              { codigo: e.CODIGO, nombre: e.NOMBRE }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresBuscarResponsables = function (responsable, listado) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_funcionario",
            funcionario: $scope.hojaIndicadores.formulario[responsable],
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          if (data.length == 1) {
            $scope.hojaIndicadores.formulario[responsable] = `${data[0].DOCUMENTO} - ${data[0].NOMBRE_FUNCIONARIO}`;
            return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.formulario[listado].push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE_FUNCIONARIO
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }
      $scope.hojaIndicadoresBuscarActores = function (actor) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_obtener_tercero",
            funcionario: actor,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.formulario.listadoActores.push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE.toString().toUpperCase()
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresAgregarActores = function () {
        if (!$scope.hojaIndicadores.formulario.actores || !$scope.hojaIndicadores.formulario.listadoActores.length) { return }
        if ($scope.hojaIndicadores.formulario.actores.toString().indexOf('-') == -1) { return }
        const dato = $scope.hojaIndicadores.formulario.listadoActores.find(e => e.codigo == $scope.hojaIndicadores.formulario.actores.split('-')[0].trim());

        if ($scope.hojaIndicadores.formulario.listadoActoresTabla.findIndex(e => e.codigo == dato.codigo) != -1) {
          $scope.hojaIndicadores.formulario.actores = '';
          swal("Error", 'Actor duplicado', "warning").catch(swal.noop); return
        }

        $scope.hojaIndicadores.formulario.listadoActoresTabla.push(dato);
        $scope.hojaIndicadores.formulario.actores = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.hojaIndicadoresQuitarActores = function (index) {
        $scope.hojaIndicadores.formulario.listadoActoresTabla.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      // GRAFICOS
      $scope.calcularGraficoSemaforizacion = function (hoja) {
        if ($scope[hoja].graficoSemaforizacion) {
          $scope[hoja].graficoSemaforizacion.destroy()
          $scope[hoja].graficoSemaforizacion = null;
        }
        var data = [];
        if ($scope[hoja].formulario.semaforizacionSentido == '') {
          swal("Error", 'Debe escoger el Tipo de Orden', "warning").catch(swal.noop); return
        }
        if ($scope[hoja].formulario.semaforizacionValor1 == '' ||
          $scope[hoja].formulario.semaforizacionValor2 == '' ||
          $scope[hoja].formulario.semaforizacionValor3 == '' ||
          $scope[hoja].formulario.semaforizacionValorMax == '') {
          return false
        }

        if ((parseFloat($scope[hoja].formulario.semaforizacionValor1) +
          parseFloat($scope[hoja].formulario.semaforizacionValor2) +
          parseFloat($scope[hoja].formulario.semaforizacionValor3)) != parseFloat($scope[hoja].formulario.semaforizacionValorMax)) {
          swal("Error", 'La suma de los valores debe dar el 100% del valor máximo', "warning").catch(swal.noop); return
        }

        if ($scope[hoja].formulario.semaforizacionSentido == 'A') {
          data = [
            {
              name: 'Baja', y: parseFloat($scope[hoja].formulario.semaforizacionValor1), color: "#FA0501",
              datoAnterior: 0, datoSiguiente: $scope[hoja].formulario.semaforizacionValor1
            },
            {
              name: 'Media', y: parseFloat($scope[hoja].formulario.semaforizacionValor2), color: "#FADE09",
              datoAnterior: $scope[hoja].formulario.semaforizacionValor1, datoSiguiente: parseFloat($scope[hoja].formulario.semaforizacionValor1) + parseFloat($scope[hoja].formulario.semaforizacionValor2)
            },
            {
              name: 'Alta', y: parseFloat($scope[hoja].formulario.semaforizacionValor3), color: "#06FA12",
              datoAnterior: parseFloat($scope[hoja].formulario.semaforizacionValor1) + parseFloat($scope[hoja].formulario.semaforizacionValor2),
              datoSiguiente: parseFloat($scope[hoja].formulario.semaforizacionValorMax)
            }]
        } else {
          var dato3_Min = parseFloat($scope[hoja].formulario.semaforizacionValorMax) - parseFloat($scope[hoja].formulario.semaforizacionValor1);
          var dato2_Max = dato3_Min
          var dato2_Min = dato2_Max - parseFloat($scope[hoja].formulario.semaforizacionValor2);
          var dato1_Max = dato2_Min;


          data = [
            {
              name: 'Alta', y: parseFloat($scope[hoja].formulario.semaforizacionValor1), color: "#FA0501",
              datoAnterior: parseFloat($scope[hoja].formulario.semaforizacionValorMax), datoSiguiente: dato3_Min
            },
            {
              name: 'Media', y: parseFloat($scope[hoja].formulario.semaforizacionValor2), color: "#FADE09",
              datoAnterior: dato2_Max, datoSiguiente: dato2_Min
            },
            {
              name: 'Baja', y: parseFloat($scope[hoja].formulario.semaforizacionValor3), color: "#06FA12",
              datoAnterior: dato1_Max, datoSiguiente: 0
            }
          ];
          // data = [
          //   {
          //     name: 'Alta', y: parseFloat($scope[hoja].formulario.semaforizacionValor1), color: "#06FA12",
          //     datoAnterior: parseFloat($scope[hoja].formulario.semaforizacionValorMax), datoSiguiente: dato3_Min
          //   },
          //   {
          //     name: 'Media', y: parseFloat($scope[hoja].formulario.semaforizacionValor2), color: "#FADE09",
          //     datoAnterior: dato2_Max, datoSiguiente: dato2_Min
          //   },
          //   {
          //     name: 'Baja', y: parseFloat($scope[hoja].formulario.semaforizacionValor3), color: "#FA0501",
          //     datoAnterior: dato1_Max, datoSiguiente: 0
          //   }
          // ];

        }

        $scope[hoja].graficoSemaforizacion = Highcharts.chart(`${hoja}_graficoSemaforizacion`, {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            width: 400,
            height: 400
          },
          title: {
            text: 'Semaforización',
            align: 'center',
            verticalAlign: 'middle',
            y: 60,
            style: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            pointFormat: '{point.datoAnterior} - <b>{point.datoSiguiente}</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Rango',
            innerSize: '50%',
            data

          }],
          exporting: { enabled: false },
          credits: { enabled: false },
        });
      }


      $scope.modalCrearIndicadores = function () {
        $scope.hojaIndicadoresCrearNuevo()
        $scope.openModal('modalCrearIndicadores');
        document.getElementById('modalCrearIndicadores_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
      }

      $scope.validarFormIndicadores = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaIndicadores.formulario.anio) resolve(false);
          if (!$scope.hojaIndicadores.formulario.nombre) resolve(false);
          if (!$scope.hojaIndicadores.formulario.proceso) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoProceso) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoProcesoCod) resolve(false);
          if (!$scope.hojaIndicadores.formulario.objetivoEstrategicoTactico) resolve(false);
          if (!$scope.hojaIndicadores.formulario.nivel) resolve(false);
          if ($scope.hojaIndicadores.formulario.nivel === '2' && !$scope.hojaIndicadores.formulario.regional) resolve(false);
          if (!$scope.hojaIndicadores.formulario.dependencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.definicion) resolve(false);
          if (!$scope.hojaIndicadores.formulario.acumulativo) resolve(false);
          if (!$scope.hojaIndicadores.formulario.periodicidadAnalisis) resolve(false);
          if (!$scope.hojaIndicadores.formulario.meta) resolve(false);
          if (!$scope.hojaIndicadores.formulario.metaVigencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoVigencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.unidadMedida) resolve(false);
          if (!$scope.hojaIndicadores.formulario.lineaBase) resolve(false);
          if (!$scope.hojaIndicadores.formulario.fuenteNumerador) resolve(false);
          if (!$scope.hojaIndicadores.formulario.fuenteDenominador) resolve(false);

          if (!$scope.hojaIndicadores.formulario.vigencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.clasificacionIndicador) resolve(false);
          if (!$scope.hojaIndicadores.formulario.prioridad) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.tipoNorma) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.norma) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.frecuencia) resolve(false);

          if (!$scope.hojaIndicadores.formulario.planDeMejoramiento) resolve(false);
          if ($scope.hojaIndicadores.formulario.planDeMejoramiento == 'S' && !$scope.hojaIndicadores.formulario.descripcionPlanDeMejoramiento) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipologia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.fenix) resolve(false);

          if (!$scope.hojaIndicadores.formulario.periodicidadReporte) resolve(false);
          if (!$scope.hojaIndicadores.formulario.responsableReporte) resolve(false);
          if (!$scope.hojaIndicadores.formulario.responsableAnalisis) resolve(false);
          if ($scope.hojaIndicadores.formulario.listadoActoresTabla.length == 0) resolve(false);

          if (!$scope.hojaIndicadores.formulario.tipoCalculo) resolve(false);
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' && ($scope.hojaIndicadores.formulario.semaforizacionValor1 == '' ||
            $scope.hojaIndicadores.formulario.semaforizacionValor2 == '' ||
            $scope.hojaIndicadores.formulario.semaforizacionValor3 == '')) {
            resolve(false);
          }
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' && $scope.hojaIndicadores.formulario.semaforizacionSentido == '') {
            resolve(false);
          }
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' &&
            ((parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1) +
              parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2) +
              parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor3)) != parseFloat($scope.hojaIndicadores.formulario.semaforizacionValorMax))) {
            resolve(false);
          }

          resolve(true)
        });
      }

      $scope.guardarFormIndicadores = function () {
        $scope.validarFormIndicadores().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          //
          const dato = [{
            pregn_id: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado,
            pregn_proceso: $scope.hojaIndicadores.formulario.proceso,
            pcod_estr: $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico.split('_')[0],
            pcod_tact: $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico.split('_')[1],
            pnombre: $scope.hojaIndicadores.formulario.nombre,
            pnivel: $scope.hojaIndicadores.formulario.nivel,
            pregional: $scope.hojaIndicadores.formulario.nivel === '2' ? $scope.hojaIndicadores.formulario.regional : '',
            pestado: $scope.hojaIndicadores.formulario.estado,
            pdependencia: $scope.hojaIndicadores.formulario.dependencia,
            pobjetivo_indicador: $scope.hojaIndicadores.formulario.definicion,
            plinea_base: $scope.hojaIndicadores.formulario.lineaBase.replace('.', ','),
            pmeta: $scope.hojaIndicadores.formulario.meta.replace('.', ','),
            pmeta_vigencia: $scope.hojaIndicadores.formulario.metaVigencia.replace('.', ','),
            ptipo_vigencia: $scope.hojaIndicadores.formulario.tipoVigencia,
            punidad_medida: $scope.hojaIndicadores.formulario.unidadMedida,
            pfrecuencia: $scope.hojaIndicadores.formulario.frecuencia,
            pacumulativo: $scope.hojaIndicadores.formulario.acumulativo,
            pfuente_numerador: $scope.hojaIndicadores.formulario.fuenteNumerador,
            pfuente_denominador: $scope.hojaIndicadores.formulario.fuenteDenominador,
            pvigencia: $scope.hojaIndicadores.formulario.vigencia,
            pclasificacion: $scope.hojaIndicadores.formulario.clasificacionIndicador,
            pprioridad: $scope.hojaIndicadores.formulario.prioridad,
            ptipo_norma: $scope.hojaIndicadores.formulario.tipoNorma,
            pnorma: $scope.hojaIndicadores.formulario.norma,
            pperiodicidad_reporte: $scope.hojaIndicadores.formulario.periodicidadReporte,
            pperiodicidad_analisis: $scope.hojaIndicadores.formulario.periodicidadAnalisis,
            presponsable_reporte: $scope.hojaIndicadores.formulario.responsableReporte.split('-')[0].trim(),
            presponsable_analisis: $scope.hojaIndicadores.formulario.responsableAnalisis.split('-')[0].trim(),

            pdescripcion_numerador: $scope.hojaIndicadores.formulario.descripcionNumerador,
            pdescripcion_denominador: $scope.hojaIndicadores.formulario.descripcionDenominador,
            pdescripcion_constante: $scope.hojaIndicadores.formulario.descripcionConstante,
            panno: $scope.hojaIndicadores.formulario.anio,

            psemaforizacion: $scope.hojaIndicadores.formulario.semaforizacionEstado,
            ptipo_calculo: $scope.hojaIndicadores.formulario.tipoCalculo,
            ptipo: $scope.hojaIndicadores.formulario.semaforizacionSentido,
            pdato1: $scope.hojaIndicadores.formulario.semaforizacionValor1.replace(',', '.'),
            pdato2: $scope.hojaIndicadores.formulario.semaforizacionValor2.replace(',', '.'),
            pdato3: $scope.hojaIndicadores.formulario.semaforizacionValor3.replace(',', '.'),

            pdatomax: $scope.hojaIndicadores.formulario.semaforizacionValorMax.replace(',', '.'),

            pplanmejoramiento: $scope.hojaIndicadores.formulario.planDeMejoramiento,
            pdesc_planmejoramiento: $scope.hojaIndicadores.formulario.descripcionPlanDeMejoramiento,

            ptipologia: $scope.hojaIndicadores.formulario.tipologia,
            pfenix: $scope.hojaIndicadores.formulario.fenix,

            presponsable: $scope.Rol_Cedula,

          }];

          var actores = [];
          $scope.hojaIndicadores.formulario.listadoActoresTabla.forEach(e => {
            actores.push({
              doc_responsable: e.codigo.toString(),
              nom_responsable: e.nombre
            })
          })
          const text = $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '' ? '¿Desea crear el indicador?' : '¿Desea actualizar el indicador?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_indicador",
                  datosJson: JSON.stringify(dato),
                  // cantidadJson: 1,
                  listadoActoresTabla: JSON.stringify(actores),
                  cantidadActores: $scope.hojaIndicadores.formulario.listadoActoresTabla.length,
                  accion: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '' ? 'I' : 'U',
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  if ($scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '') {
                    $scope.hojaIndicadoresListar(1);
                  } else {
                    $scope.actualizaUnicoIndicadores()
                  }
                  swal({
                    title: data.Nombre,
                    text: "¿Desea ver el indicador?",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    allowOutsideClick: false

                  }).then(function (result) {
                    if (result) {
                      setTimeout(() => {
                        const datos = $scope.hojaIndicadores.listadoTabla.find(e => e.CODIGO == data.Indicador)
                        $scope.modalEditarIndicador(datos);
                      }, 1500);
                    }
                  }).catch(swal.noop);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
          //
        })
      }

      $scope.actualizaUnicoIndicadores = function () {
        let datos = $scope.hojaIndicadores.listadoTabla.find(e => e.CODIGO == $scope.hojaIndicadores.formulario.idIndicadorSeleccionado)

        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_lista_indicadores',
            codigoId: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado
          }
        }).then(function ({ data }) {
          if (data.length) {

            Object.entries(datos).forEach(([clave, valor]) => {
              datos[clave] = data[0][clave]
            });

            // datos = data[0].CODIGO;
            // datos = data[0].REGN_PROCESO;
            // datos = data[0].UNIC_NOMBRE;
            // datos = data[0].REGN_COD_ESTR;
            // datos = data[0].NOMBRE;
            // datos = data[0].REGN_COD_TACT;
            // datos = data[0].REGN_COD_INDICADOR;
            // datos = data[0].REGN_NIVEL;
            // datos = data[0].REGN_REGIONAL;
            // datos = data[0].REGN_DEPENDENCIA;
            // datos = data[0].REGC_OBJETIVO_INDICADOR;
            // datos = data[0].REGN_LINEA_BASE;
            // datos = data[0].REGN_META;
            // datos = data[0].REGN_META_VIGENCIA;
            // datos = data[0].REGN_UNIDAD_MEDIDA;
            // datos = data[0].REGC_FRECUENCIA;
            // datos = data[0].REGN_FUENTE_NUMERADOR;
            // datos = data[0].REGN_FUENTE_DENOMINADOR;
            // datos = data[0].REGC_VIGENCIA;
            // datos = data[0].REGC_CLASIFICACION;
            // datos = data[0].REGC_PRIORIDAD;
            // datos = data[0].REGC_TIPO_NORMA;
            // datos = data[0].REGC_NORMA;
            // datos = data[0].REGC_PERIODICIDAD_REPORTE;
            // datos = data[0].REGC_PERIODICIDAD_ANALISIS;
            // datos = data[0].REGC_TIPO_CALCULO;
            // datos = data[0].REGV_RESPONSABLE_REPORTE;
            // datos = data[0].NOMBRE_RESPONSABLE_REPORTE;
            // datos = data[0].REGV_RESPONSABLE_ANALISIS;
            // datos = data[0].NOMBRE_RESPONSABLE_ANALISIS;
            // datos = data[0].REGC_DATO1;
            // datos = data[0].REGC_DATO2;
            // datos = data[0].REGC_DATO3;
            // datos = data[0].REGC_ESTADO;
            // datos = data[0].REGC_ACUMULATIVO;
            // datos = data[0].REGN_DESCRIPCION_NUMERADOR;
            // datos = data[0].REGN_DESCRIPCION_DENOMINADOR;
            // datos = data[0].REGN_DESCRIPCION_CONSTANTE;
            // datos = data[0].REGN_ANNO;
            // datos = data[0].REGC_TIPO_VIGENCIA;
            // datos = data[0].REGC_DATOMAX;
            // datos = data[0].DILIGENCIAMIENTO;
            // datos = data[0].REGN_NOM_INDICADOR;
            // datos = data[0].REGC_TIPO;
            // datos = data[0].REGC_SEMAFORIZACION;
            // datos = data[0].REGV_RESPONSABLE;
            // datos = data[0].ESTADO_ACTUAL;
            // datos = data[0].REGC_PLANMEJORAMIENTO;
            // datos = data[0].REGV_DESC_PLANMEJORAMIENTO;
            // datos = data[0].REGC_TIPOLOGIA;
            // datos = data[0].REGC_FENIX;

            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });


      }

      $scope.hojaIndicadoresEditarMetaVigencia = function (x) {
        swal({
          title: 'Meta Vigencia',
          input: 'number',
          inputValue: x.GESN_META_VIGENCIA.toString().replace(',', '.'),
          inputAttributes: {
            maxlength: 32
          }
        }).then((result) => {
          if (result) {
            console.log(x);
            const datos = {
              gesn_id: x.GESN_ID,
              anno: x.GESN_ANNO,
              periodo: x.GESN_PERIODO,
              meta_vigencia: result.toString().replace('.', ',')
            }

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
              url: "php/planeacion/procesospoa.php",
              data: {
                function: 'p_u_metaVigencia',
                datos: JSON.stringify(datos),
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", "Meta Actualizada", "success").catch(swal.noop);

                $scope.modalDatosCorrespObtenerdatos($scope.modalDatosCorrespVars);

                setTimeout(() => { $scope.$apply(); }, 500);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });

          }
        })

      }

      $scope.hojaIndicadoresActivarFiltro = function () {
        $scope.hojaIndicadores.filtros.activo = !$scope.hojaIndicadores.filtros.activo;
        $scope.hojaIndicadores.filtros.proceso = '';
        $scope.hojaIndicadores.filtros.dependencia = '';
        $scope.hojaIndicadores.filtros.periodicidadAnalisis = '';
        $scope.hojaIndicadores.filtros.anio = '';
        if(!$scope.hojaIndicadores.filtros.activo){
          $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
        }
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadoresAplicarFiltro = function () {
        // let listadoTabla;
        let listadoTabla = $scope.hojaIndicadores.listadoTabla;

        if ($scope.hojaIndicadores.filtros.proceso != '') {
          listadoTabla = listadoTabla.filter(x => x.REGN_PROCESO === $scope.hojaIndicadores.filtros.proceso)
        }
        if ($scope.hojaIndicadores.filtros.dependencia != '') {
          listadoTabla = listadoTabla.filter(x => x.REGN_DEPENDENCIA.split('-')[0] === $scope.hojaIndicadores.filtros.dependencia)
        }
        if ($scope.hojaIndicadores.filtros.periodicidadAnalisis != '') {
          listadoTabla = listadoTabla.filter(x => x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] === $scope.hojaIndicadores.filtros.periodicidadAnalisis)
        }
        if ($scope.hojaIndicadores.filtros.anio != '') {
          listadoTabla = listadoTabla.filter(x => x.REGN_ANNO.split('-')[0] === $scope.hojaIndicadores.filtros.anio)
        }

        $scope.initPaginacion('hojaIndicadores', listadoTabla);
        setTimeout(() => { $scope.$apply(); }, 500);
      }



      $scope.descargarFichaTecnica = function (x) {

        window.open('views/planeacion/formatos/formatoFichaTecnica.php?cod_id=' + x.CODIGO
          , '_blank', "width=1080,height=1100");

      }

      $scope.descargarInformeMultiple = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: { function: 'p_descarga_informe_multiple' }
        }).then(function ({ data }) {
          if (data.length) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Multiple Indicadores.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.descargarInformeIndividual = function (x) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_descarga_informe_individual',
            cod_id: x.CODIGO,
            anno: x.REGN_ANNO,
          }
        }).then(function ({ data }) {
          if (data.length) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Individual Indicadores.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.descargarInformeFiltrado = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        //
        let data = [];
        $scope.hojaIndicadores.listadoTablaTemp
        $scope.hojaIndicadores.listadoTablaTemp.forEach(e => {
          data.push({
            'ANIO': e.REGN_ANNO,
            'NOMBRE_INDICADOR': e.REGN_NOM_INDICADOR,
            'PROCESO': e.UNIC_NOMBRE,
            'TIPO': e.REGC_CLASIFICACION,
            'OBJETIVO_ESTRATEGICO_TACTICO': e.NOMBRE,
            'REGN_NIVEL': e.REGN_NIVEL,
            'REGIONAL': e.REGN_REGIONAL,
            'DEPENDENCIA': e.REGN_DEPENDENCIA,
            'ESTADO': 'ACTIVO',
            'DEFINICION_INDICADOR': e.REGC_OBJETIVO_INDICADOR,
            'ACUMULATIVO': e.REGC_ACUMULATIVO,
            'REGC_PERIODICIDAD_ANALISIS': e.REGC_PERIODICIDAD_ANALISIS.split('-')[0],
            'META': e.REGN_META,
            'META_VIGENCIA': e.REGN_META_VIGENCIA,
            'TIPO_VIGENCIA': e.REGC_TIPO_VIGENCIA.split('-')[0],
            'UNIDAD_MEDIDA': e.REGN_UNIDAD_MEDIDA.split('-')[0],
            'REGN_LINEA_BASE': e.REGN_LINEA_BASE,
            'REGN_FUENTE_NUMERADOR': e.REGN_FUENTE_NUMERADOR,
            'REGN_FUENTE_DENOMINADOR': e.REGN_FUENTE_DENOMINADOR,
            'REGC_VIGENCIA': e.REGC_VIGENCIA.split('-')[0],
            'REGC_CLASIFICACION': e.REGC_CLASIFICACION.split('-')[0],
            'REGC_PRIORIDAD': e.REGC_PRIORIDAD.split('-')[0],
            'REGC_TIPO_NORMA': e.REGC_TIPO_NORMA,
            'REGC_NORMA': e.REGC_NORMA,
            'REGC_PERIODICIDAD_REPORTE': e.REGC_PERIODICIDAD_REPORTE,
            'NOMBRE_RESPONSABLE_REPORTE': e.NOMBRE_RESPONSABLE_REPORTE,
            'NOMBRE_RESPONSABLE_ANALISIS': e.NOMBRE_RESPONSABLE_ANALISIS,
            'FORMA_CALCULO': e.REGC_TIPO_CALCULO.split('-')[0],
            'SEMAFORIZACION': e.REGC_SEMAFORIZACION.split('-')[0],
            'TIPO_ORDEN': e.REGC_TIPO.split('-')[0],
            'DESCRIPCION_NUMERADOR': e.REGN_DESCRIPCION_NUMERADOR,
            'DESCRIPCION_DENOMINADOR': e.REGN_DESCRIPCION_DENOMINADOR,
            'DESCRIPCION_CONSTANTE': e.REGN_DESCRIPCION_CONSTANTE,
            'VALOR1': e.REGC_DATO1,
            'VALOR2': e.REGC_DATO2,
            'VALOR3': e.REGC_DATO3,
            'VALOR_MAX': e.REGC_DATOMAX,
            'DILIGENCIAMIENTO': e.DILIGENCIAMIENTO,
            'ESTADO_ACTUAL': e.ESTADO_ACTUAL.split('-')[0],
            'TIENE_PLAN_MEJORAMIENTO': e.REGC_PLANMEJORAMIENTO,
            'CANTIDAD_PLAN_MEJORAMIENTO': e.REGV_DESC_PLANMEJORAMIENTO,
            'RESPONSABLE_REGISTRO': e.REGV_RESPONSABLE
          })
        });
        //
        if (data.length) {
          var ws = XLSX.utils.json_to_sheet(data);
          /* add to workbook */
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
          /* write workbook and force a download */
          XLSX.writeFile(wb, "Exportado Indicadores.xlsx");
          const text = `Registros encontrados ${data.length}`
          swal('¡Mensaje!', text, 'success').catch(swal.noop);
        } else {
          swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
        }
      }


      document.querySelector('#fileGestionIndic').addEventListener('change', function (e) {
        $scope.hojaProcesos.formulario.soporteB64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP' || x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.modalDatosCorrespVarsPeriodo.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.modalDatosCorrespVarsPeriodo.soporteNombre = `${files[i].name.replace(/(.ZIP|.zip|.PDF|.pdf)/g, '')}`;
                  // $scope.modalDatosCorrespVarsPeriodo.soporteNombre = `${files[i].name.replace('(.ZIP|.zip)', '')}.${$scope.modalDatosCorrespVarsPeriodo.soporteExt}`;
                  $scope.modalDatosCorrespVarsPeriodo.soporteB64 = result;
                  $scope.guardarSoporteGestionIndic();
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileGestionIndic').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileGestionIndic').value = '';
              swal('Advertencia', '¡Los archivos seleccionados deben ser formato ZIP o PDF!', 'info');
            }
          }
        }
      });

      $scope.listarSoportesGestionIndi = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {

            function: 'p_listar_soportes_gestion_indicador',
            cod_id: $scope.modalDatosCorrespVars.CODIGO,
            anno: $scope.modalDatosCorrespVars.REGN_ANNO,
            periodo: $scope.modalDatosCorrespVarsPeriodo.periodo

          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.modalDatosCorrespVarsPeriodo.listadoAdjuntos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.eliminarSoportesGestionIndi = function (ruta) {

        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $http({
              method: 'POST',
              url: "php/planeacion/procesospoa.php",
              data: {
                function: 'p_actualizar_soportes_gestion_indicador',
                ruta
              }
            }).then(function ({ data }) {
              if (data.Codigo == '0') {
                swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                $scope.listarSoportesGestionIndi()
                setTimeout(() => { $scope.$apply(); }, 500);
                // } else {
              } else {
                swal('¡Mensaje!', data, 'info').catch(swal.noop);
              }
            })

          }
        })


      }

      $scope.guardarSoporteGestionIndic = function () {
        swal({
          title: 'Confirmar',
          text: '¿Desea cargar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $scope.cargarSoporteGestionIndic().then((resultSoporte) => {
              $http({
                method: 'POST',
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_guardar_soporte_gestion_indicador",

                  cod_id: $scope.modalDatosCorrespVars.CODIGO,
                  anno: $scope.modalDatosCorrespVars.REGN_ANNO,
                  periodo: $scope.modalDatosCorrespVarsPeriodo.periodo,
                  nombre: `${$scope.modalDatosCorrespVarsPeriodo.soporteNombre}.${$scope.modalDatosCorrespVarsPeriodo.soporteExt}`,
                  ruta: resultSoporte,
                  responsable: $scope.Rol_Cedula
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.listarSoportesGestionIndi();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            })
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            document.querySelector('#fileGestionIndic').value = '';
          }
        }).catch(swal.noop);
      }

      $scope.cargarSoporteGestionIndic = function () {
        return new Promise((resolve) => {
          if (!$scope.modalDatosCorrespVarsPeriodo.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporteGestionIndic",
              nombre: $scope.modalDatosCorrespVarsPeriodo.soporteNombre,
              base64: $scope.modalDatosCorrespVarsPeriodo.soporteB64,
              ext: $scope.modalDatosCorrespVarsPeriodo.soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      // Compromisos
      $scope.abrirModalCompromisos = function (x) {
        $scope.closeModal()
        setTimeout(() => {
          $scope.openModal('modalCompromisos');
          $scope.limpiarModalCompromisos(x);
          $scope.listarCompromisosIndicador();
        }, 700);
      }

      $scope.limpiarModalCompromisos = function (x) {
        $scope.modalCompromisosVars = {
          codId: $scope.modalDatosCorrespVars.CODIGO,
          anio: $scope.modalDatosCorrespVars.REGN_ANNO,
          periodo: x.GESN_PERIODO,
          periodoNombre: x.GESN_PERIODO_NOMBRE,

          listadoCompromisos: [],
          idCompromiso: '',

          nombre: '',
          descripcion: '',
          fechaInicio: '',
          fechaVencimiento: '',
          estado: 'P', // P Pendiente - C Cumplio - N No Cumplio

          observacion: '',

          soporteB64: '',
          soporteExt: '',
          soporteNombre: '',
          listadoAdjuntos: [],

          activarForm: 'N'
        }
        document.querySelector('#fileGestionIndic').value = '';

      }

      $scope.crearModalCompromisos = function () {
        $scope.modalCompromisosVars.idCompromiso = '';
        $scope.modalCompromisosVars.nombre = '';
        $scope.modalCompromisosVars.descripcion = '';
        $scope.modalCompromisosVars.fechaInicio = '';
        $scope.modalCompromisosVars.fechaVencimiento = '';
        $scope.modalCompromisosVars.estado = 'P';

        $scope.modalCompromisosVars.soporteB64 = '';
        $scope.modalCompromisosVars.soporteExt = '';
        $scope.modalCompromisosVars.soporteNombre = '';

        $scope.modalCompromisosVars.activarForm = 'S';
        $scope.modalCompromisosVars.gestionTerminada = 'N';
        document.querySelector('#fileGestionIndic').value = '';
        $scope.modalCompromisosVars.listadoAdjuntos = [];

        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.atrasModalCompromisos = function () {
        $scope.modalCompromisosVars.activarForm = 'N';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.editarModalCompromisos = function (x) {
        $scope.modalCompromisosVars.nombre = x.GESC_NOMBRE;
        $scope.modalCompromisosVars.descripcion = x.GESC_DESCRIPCION;
        const fechaInicio = x.GESF_FECHA_INICIO.split('/');
        const fechaVencimiento = x.GESF_FECHA_VENCIMIENTO.split('/');
        $scope.modalCompromisosVars.fechaInicio = new Date(`${fechaInicio[2]}/${fechaInicio[1]}/${fechaInicio[0]}`);
        $scope.modalCompromisosVars.fechaVencimiento = new Date(`${fechaVencimiento[2]}/${fechaVencimiento[1]}/${fechaVencimiento[0]}`);

        $scope.modalCompromisosVars.estado = x.GESC_ESTADO.split('-')[0];

        $scope.modalCompromisosVars.observacion = x.GESC_OBSERVACION;
        $scope.modalCompromisosVars.listadoAdjuntos = [];

        $scope.modalCompromisosVars.idCompromiso = x.GESN_ID_COMPROMISO;
        $scope.modalCompromisosVars.activarForm = 'S';

        $scope.modalCompromisosVars.gestionTerminada = x.GESC_ESTADO.split('-')[0] == 'P' ? 'N' : 'S';
        $scope.listarSoportesCompromisos();

        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar select'), function (i) {
          i.setAttribute("disabled", true);
        });

        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest select'), function (i) {
          i.setAttribute("disabled", true);
        });

        if ($scope.modalCompromisosVars.gestionTerminada == 'N' && $scope.permisos.BADC_EDITAR_PLAN == 'S') {
          angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest input'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest textarea'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest select'), function (i) {
            i.removeAttribute("disabled");
          });

          angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar input'), function (i) {
            i.removeAttribute("readonly");
          });
        }

        // if ($scope.modalCompromisosVars.gestionTerminada == 'S') {
        //   angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest textarea'), function (i) {
        //     i.setAttribute("readonly", true);
        //   });
        //   angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest select'), function (i) {
        //     i.setAttribute("disabled", true);
        //   });
        // } else {
        //   angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest textarea'), function (i) {
        //     i.removeAttribute("readonly");
        //   });
        //   angular.forEach(document.querySelectorAll('.formIndicCompromisos_Desactivar_Gest select'), function (i) {
        //     i.removeAttribute("disabled");
        //   });
        // }

      }

      $scope.listarCompromisosIndicador = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_listar_compromisos_gestion_indicador",

            cod_id: $scope.modalCompromisosVars.codId,
            anno: $scope.modalCompromisosVars.anio,
            periodo: $scope.modalCompromisosVars.periodo,
            // idCompromiso: $scope.modalCompromisosVars.idCompromiso
          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.modalCompromisosVars.listadoCompromisos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.validarFormCompromisos = function () {
        return new Promise((resolve) => {

          if (!$scope.modalCompromisosVars.nombre) resolve(false);
          if (!$scope.modalCompromisosVars.descripcion) resolve(false);
          if (!$scope.modalCompromisosVars.fechaInicio) resolve(false);
          if (!$scope.modalCompromisosVars.fechaVencimiento) resolve(false);
          if (!$scope.modalCompromisosVars.estado) resolve(false);

          if ($scope.modalCompromisosVars.idCompromiso !== '' && !$scope.modalCompromisosVars.observacion) resolve(false);
          if ($scope.modalCompromisosVars.idCompromiso !== '' && $scope.modalCompromisosVars.estado == 'P') resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormCompromisos = function () {
        $scope.validarFormCompromisos().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.modalCompromisosVars.idCompromiso == '' ? '¿Desea crear el compromiso?' : '¿Desea actualizar el compromiso?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              const datos = {
                cod_id: $scope.modalCompromisosVars.codId,
                anio: $scope.modalCompromisosVars.anio,
                periodo: $scope.modalCompromisosVars.periodo,

                nombre: $scope.modalCompromisosVars.nombre,
                descripcion: $scope.modalCompromisosVars.descripcion,
                fechaInicio: $scope.formatDate($scope.modalCompromisosVars.fechaInicio),
                fechaVencimiento: $scope.formatDate($scope.modalCompromisosVars.fechaVencimiento),
                estado: $scope.modalCompromisosVars.estado,

                idCompromiso: $scope.modalCompromisosVars.idCompromiso,
                observacion: $scope.modalCompromisosVars.observacion,
                responsable: $scope.Rol_Cedula
              }

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_compromisos_gestion_indicador",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.atrasModalCompromisos();
                  $scope.listarCompromisosIndicador();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })

        })
      }

      document.querySelector('#fileGestionIndicCompromiso').addEventListener('change', function (e) {
        $scope.hojaProcesos.formulario.soporteB64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP' || x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.modalCompromisosVars.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.modalCompromisosVars.soporteNombre = `${files[i].name.replace(/(.ZIP|.zip|.PDF|.pdf)/g, '')}`;
                  $scope.modalCompromisosVars.soporteB64 = result;
                  $scope.guardarSoporteCompromisos();
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileGestionIndicCompromiso').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileGestionIndicCompromiso').value = '';
              swal('Advertencia', '¡Los archivos seleccionados deben ser formato ZIP o PDF!', 'info');
            }
          }
        }
      });

      $scope.listarSoportesCompromisos = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {

            function: 'p_listar_soportes_compromisos',
            cod_id: $scope.modalCompromisosVars.codId,
            anno: $scope.modalCompromisosVars.anio,
            periodo: $scope.modalCompromisosVars.periodo,
            idCompromiso: $scope.modalCompromisosVars.idCompromiso,

          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.modalCompromisosVars.listadoAdjuntos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.guardarSoporteCompromisos = function () {
        swal({
          title: 'Confirmar',
          text: '¿Desea cargar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $scope.cargarSoporteCompromisos().then((resultSoporte) => {
              const datos = {
                cod_id: $scope.modalCompromisosVars.codId,
                anio: $scope.modalCompromisosVars.anio,
                periodo: $scope.modalCompromisosVars.periodo,
                idCompromiso: $scope.modalCompromisosVars.idCompromiso,

                nombre: `${$scope.modalCompromisosVars.soporteNombre}.${$scope.modalCompromisosVars.soporteExt}`,
                ruta: resultSoporte,
                responsable: $scope.Rol_Cedula
              }
              $http({
                method: 'POST',
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_guardar_soporte_compromisos",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.listarSoportesCompromisos();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })


            })
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            document.querySelector('#fileGestionIndicCompromiso').value = '';
          }
        }).catch(swal.noop);
      }

      $scope.cargarSoporteCompromisos = function () {
        return new Promise((resolve) => {
          if (!$scope.modalCompromisosVars.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporteCompromisos",
              nombre: $scope.modalCompromisosVars.soporteNombre,
              base64: $scope.modalCompromisosVars.soporteB64,
              ext: $scope.modalCompromisosVars.soporteExt

            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }
      // Compromisos

      // Plan de Mejoramiento
      $scope.abrirModalPlanMejora = function (x) {
        $scope.closeModal()
        setTimeout(() => {
          $scope.openModal('modalPlanMejora');
          $scope.limpiarModalPlanMejora(x);
          $scope.listarPlanMejoraIndicador();
        }, 700);
      }

      $scope.limpiarModalPlanMejora = function (x) {
        $scope.modalPlanMejoraVars = {
          codId: $scope.modalDatosCorrespVars.CODIGO,
          anio: $scope.modalDatosCorrespVars.REGN_ANNO,
          periodo: x.GESN_PERIODO,
          periodoNombre: x.GESN_PERIODO_NOMBRE,

          listadoPlanMejora: [],
          idPlanMejora: '',

          descripcion: '',
          coreccion: '',
          acciones: '',
          accionMejora: '',
          indicadores: '',
          meta: '',
          fechaInicio: '',
          fechaTerminacion: '',
          comentarios: '',
          estado: '',

          activarForm: 'N',
          gestionTerminada: 'N',

          listadoPlanMejoraSeguimiento: [],

          fechaSeguimientoSeg: '',
          porcentajeAvanceSeg: '',
          verificacionSeg: '',
          comentariosSeg: '',

          activarFormSeg: 'N',

        }
      }

      $scope.listarPlanMejoraIndicador = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_listar_planmejora_gestion_indicador",

            cod_id: $scope.modalPlanMejoraVars.codId,
            anno: $scope.modalPlanMejoraVars.anio,
            periodo: $scope.modalPlanMejoraVars.periodo,

          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.modalPlanMejoraVars.listadoPlanMejora = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.crearModalPlanMejora = function () {
        $scope.modalPlanMejoraVars.idPlanMejora = '';
        $scope.modalPlanMejoraVars.descripcion = '';
        $scope.modalPlanMejoraVars.correccion = '';
        $scope.modalPlanMejoraVars.acciones = '';
        $scope.modalPlanMejoraVars.accionMejora = '';
        $scope.modalPlanMejoraVars.indicadores = '';
        $scope.modalPlanMejoraVars.meta = '';
        $scope.modalPlanMejoraVars.fechaInicio = '';
        $scope.modalPlanMejoraVars.fechaTerminacion = '';
        $scope.modalPlanMejoraVars.comentarios = '';
        $scope.modalPlanMejoraVars.estado = 'A';

        $scope.modalPlanMejoraVars.activarForm = 'S';
        $scope.modalPlanMejoraVars.gestionTerminada = 'N';

        // $scope.modalPlanMejoraVars.listadoPlanMejora = [];
        $scope.modalPlanMejoraVars.listadoPlanMejoraSeguimiento = [];

        $scope.modalPlanMejoraVars.fechaSeguimientoSeg = '';
        $scope.modalPlanMejoraVars.porcentajeAvanceSeg = ''
        $scope.modalPlanMejoraVars.verificacionSeg = ''
        $scope.modalPlanMejoraVars.comentariosSeg = ''
        $scope.modalPlanMejoraVars.activarFormSeg = 'N';

        angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        // angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar select'), function (i) {
        //   i.removeAttribute("disabled");
        // });

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.atrasModalPlanMejora = function () {
        $scope.modalPlanMejoraVars.activarForm = 'N';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.editarModalPlanMejora = function (x) {
        $scope.modalPlanMejoraVars.descripcion = x.GESC_DESCRIPCION;
        $scope.modalPlanMejoraVars.correccion = x.GESC_CORRECCION;
        $scope.modalPlanMejoraVars.acciones = x.GESC_ACCIONES;
        $scope.modalPlanMejoraVars.accionMejora = x.GESC_ACCION_MEJORA;
        $scope.modalPlanMejoraVars.indicadores = x.GESC_INDICADORES;
        $scope.modalPlanMejoraVars.meta = x.GESC_META;

        const fechaInicio = x.GESF_FECHA_INICIO.split('/');
        const fechaTerminacion = x.GESF_FECHA_TERMINACION.split('/');
        $scope.modalPlanMejoraVars.fechaInicio = new Date(fechaInicio[2], fechaInicio[1], fechaInicio[0]);
        $scope.modalPlanMejoraVars.fechaTerminacion = new Date(fechaTerminacion[2], fechaTerminacion[1], fechaTerminacion[0]);
        $scope.modalPlanMejoraVars.comentarios = x.GESC_COMENTARIOS;
        $scope.modalPlanMejoraVars.estado = x.GESN_ESTADO.split('-')[0];

        $scope.modalPlanMejoraVars.idPlanMejora = x.GESN_ID_PLANMEJORA;
        $scope.modalPlanMejoraVars.activarForm = 'S';
        $scope.modalPlanMejoraVars.gestionTerminada = 'S';

        $scope.listarPlanMejoraIndicadorSeg();




        if (x.GESN_ESTADO.split('-')[0] == 'A') {
          $scope.modalPlanMejoraVars.gestionTerminada = 'N';
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar_Gest select'), function (i) {
            i.removeAttribute("disabled");
          });

          // if ($scope.validarPermisos(['AS'])) {
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar input'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar textarea'), function (i) {
            i.removeAttribute("readonly");
          });
          // }
        } else {
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar textarea'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.formIndicPlanMejora_Desactivar_Gest select'), function (i) {
            i.setAttribute("disabled", true);
          });
        }
      }

      $scope.validarFormPlanMejora = function () {
        return new Promise((resolve) => {

          if (!$scope.modalPlanMejoraVars.descripcion) resolve(false);
          if (!$scope.modalPlanMejoraVars.correccion) resolve(false);
          if (!$scope.modalPlanMejoraVars.acciones) resolve(false);
          if (!$scope.modalPlanMejoraVars.accionMejora) resolve(false);
          if (!$scope.modalPlanMejoraVars.indicadores) resolve(false);
          if (!$scope.modalPlanMejoraVars.meta) resolve(false);

          if (!$scope.modalPlanMejoraVars.fechaInicio) resolve(false);
          if (!$scope.modalPlanMejoraVars.fechaTerminacion) resolve(false);
          if (!$scope.modalPlanMejoraVars.comentarios) resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormPlanMejora = function () {
        $scope.validarFormPlanMejora().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.modalPlanMejoraVars.idPlanMejora == '' ? '¿Desea crear el plan de mejoramiento?' : '¿Desea actualizar el plan de mejoramiento?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              const datos = {
                cod_id: $scope.modalPlanMejoraVars.codId,
                anio: $scope.modalPlanMejoraVars.anio,
                periodo: $scope.modalPlanMejoraVars.periodo,

                descripcion: $scope.modalPlanMejoraVars.descripcion,
                correccion: $scope.modalPlanMejoraVars.correccion,
                acciones: $scope.modalPlanMejoraVars.acciones,
                accionMejora: $scope.modalPlanMejoraVars.accionMejora,
                indicadores: $scope.modalPlanMejoraVars.indicadores,
                meta: $scope.modalPlanMejoraVars.meta,

                fechaInicio: $scope.formatDate($scope.modalPlanMejoraVars.fechaInicio),
                fechaTerminacion: $scope.formatDate($scope.modalPlanMejoraVars.fechaTerminacion),
                comentarios: $scope.modalPlanMejoraVars.comentarios,
                estado: $scope.modalPlanMejoraVars.estado,

                idPlanMejora: $scope.modalPlanMejoraVars.idPlanMejora,
                responsable: $scope.Rol_Cedula
              }

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_planmejora_gestion_indicador",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.atrasModalPlanMejora();
                  $scope.listarPlanMejoraIndicador();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })

        })
      }




      $scope.crearModalPlanMejoraSeg = function () {
        $scope.modalPlanMejoraVars.fechaSeguimientoSeg = '';
        $scope.modalPlanMejoraVars.porcentajeAvanceSeg = ''
        $scope.modalPlanMejoraVars.verificacionSeg = ''
        $scope.modalPlanMejoraVars.comentariosSeg = ''
        $scope.modalPlanMejoraVars.activarFormSeg = 'S';

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.atrasModalPlanMejoraSeg = function () {
        $scope.modalPlanMejoraVars.activarFormSeg = 'N';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.listarPlanMejoraIndicadorSeg = function () {
        $scope.modalPlanMejoraVars.listadoPlanMejoraSeguimiento = [];

        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_listar_planmejora_seg_gestion_indicador",

            cod_id: $scope.modalPlanMejoraVars.codId,
            anno: $scope.modalPlanMejoraVars.anio,
            periodo: $scope.modalPlanMejoraVars.periodo,
            idPlanMejora: $scope.modalPlanMejoraVars.idPlanMejora

          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.modalPlanMejoraVars.listadoPlanMejoraSeguimiento = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.validarFormPlanMejoraSeg = function () {
        return new Promise((resolve) => {

          if (!$scope.modalPlanMejoraVars.fechaSeguimientoSeg) resolve(false);
          if (!$scope.modalPlanMejoraVars.porcentajeAvanceSeg) resolve(false);
          if (!$scope.modalPlanMejoraVars.verificacionSeg) resolve(false);
          if (!$scope.modalPlanMejoraVars.comentariosSeg) resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormPlanMejoraSeg = function () {
        $scope.validarFormPlanMejoraSeg().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = '¿Desea crear el seguimiento?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              const datos = {
                cod_id: $scope.modalPlanMejoraVars.codId,
                anio: $scope.modalPlanMejoraVars.anio,
                periodo: $scope.modalPlanMejoraVars.periodo,
                idPlanMejora: $scope.modalPlanMejoraVars.idPlanMejora,

                fechaSeguimiento: $scope.formatDate($scope.modalPlanMejoraVars.fechaSeguimientoSeg),
                porcentajeAvance: $scope.modalPlanMejoraVars.porcentajeAvanceSeg,
                verificacion: $scope.modalPlanMejoraVars.verificacionSeg,
                comentarios: $scope.modalPlanMejoraVars.comentariosSeg,

                responsable: $scope.Rol_Cedula
              }

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_planmejora_seg_gestion_indicador",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.atrasModalPlanMejoraSeg();
                  $scope.listarPlanMejoraIndicador();
                  $scope.listarPlanMejoraIndicadorSeg();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })

        })
      }
      // Plan de Mejoramiento


      $scope.generarIndicadorNuevo = function (x) {
        var options = {
          2023: 2023, 2024: 2024, 2025: 2025, 2026: 2026,
        };
        swal({
          title: 'Seleccione el año',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result_annio) {
          if (result_annio) {

            const text = '¿Desea crear el indicador para el año siguiente?';
            swal({
              title: 'Confirmar',
              text,
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
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
                  url: "php/planeacion/procesospoa.php",
                  data: {
                    function: "p_genera_nuevo_indicador",
                    cod_id: x.CODIGO,
                    anno: result_annio,
                    responsable: $scope.Rol_Cedula
                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    $scope.closeModal()
                    $scope.hojaIndicadoresListar(1);
                    swal({
                      title: data.Nombre,
                      text: "¿Desea ver el indicador?",
                      type: "success",
                      showCancelButton: true,
                      confirmButtonText: "Si",
                      cancelButtonText: "No",
                      allowOutsideClick: false

                    }).then(function (result) {
                      if (result) {
                        setTimeout(() => {
                          const datos = $scope.hojaIndicadores.listadoTabla.find(e => e.CODIGO == data.Indicador)
                          $scope.modalEditarIndicador(datos);
                        }, 1500);
                      }
                    }).catch(swal.noop);

                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                })
              }
            })
          }
        })
      }

      ////////////// PDM ////////////////
      ////////////// PDM ////////////////
      ////////////// PDM ////////////////
      $scope.modalCrearPDM = function () {
        $scope.hojaPDMCrearNuevo()
        $scope.openModal('modalCrearPDM');
        document.getElementById('modalCrearPDM_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
      }

      $scope.hojaPDMLimpiar = function () {
        $scope.hojaPDM = {
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },
          filtros: {
            activo: false,
            autoPDM: ''
            // frecuencia: '',
            // tipoOrden: ''
          },

          formulario: {},
          graficoSemaforizacion: null,
          grafico: null,
          modalGraficoVars: null,
          // listadoObjetivos: [],
          listadoAutoPDM: [],
          listadoNivel: [
            { codigo: '1', nombre: 'Nacional' },
            { codigo: '2', nombre: 'Regional' },
          ],
          listadoRegionales: [
            { codigo: '8001', nombre: 'Atlántico' },
            { codigo: '13001', nombre: 'Bolivar' },
            { codigo: '15001', nombre: 'Boyacá' },
            { codigo: '20001', nombre: 'Cesar' },
            { codigo: '23001', nombre: 'Cordoba' },
            { codigo: '44001', nombre: 'Guajira' },
            { codigo: '47001', nombre: 'Magdalena' },
            { codigo: '50001', nombre: 'Meta' },
            { codigo: '70001', nombre: 'Sucre' },
          ],

          listadoTipoVigencia: [
            { codigo: 'A', nombre: 'Automática' },
            { codigo: 'M', nombre: 'Manual' },
          ],
          listadoUnidadMedida: [
            { codigo: '1', nombre: 'Numérica' },
            { codigo: '2', nombre: 'Porcentaje' },
            { codigo: '3', nombre: 'Fracción' },
            { codigo: '4', nombre: 'Días' },
            { codigo: '5', nombre: 'Horas' },
            { codigo: '6', nombre: 'Tasa' },
            { codigo: '7', nombre: 'Valor Absoluto' },
            { codigo: '8', nombre: 'Veces' },
            { codigo: '9', nombre: 'Pesos' },
          ],
          listadoFrecuencia: [
            { codigo: 'M', nombre: 'Mensual', meses: 12 },
            { codigo: 'B', nombre: 'Bimestral', meses: 6 },
            { codigo: 'T', nombre: 'Trimestral', meses: 4 },
            { codigo: 'S', nombre: 'Semestral', meses: 2 },
            { codigo: 'A', nombre: 'Anual', meses: 1 },
          ],
          //
          listadotipoCalculo: [
            { codigo: 'CA', nombre: 'Cifra Absoluta' },
            { codigo: 'PO', nombre: 'Porcentaje' },
            { codigo: 'RA', nombre: 'Razón' },
            { codigo: 'TA', nombre: 'Tasa' },
            { codigo: 'VA', nombre: 'Variación' },
            { codigo: 'DI', nombre: 'Diferencia' },
            { codigo: 'AJ', nombre: 'Ajuste' },
            { codigo: 'DE', nombre: 'Desempeño' },
            { codigo: 'TL', nombre: 'Talento' },
            { codigo: 'CT', nombre: 'Capital de Trabajo' },
            { codigo: 'PR', nombre: 'Promedio' },
          ],
          listadoAnio: []

        }

        for (let i = 2023; i <= $scope.SysDay.getFullYear() + 2; i++) {
          $scope.hojaPDM.listadoAnio.push({ 'codigo': i });
        }

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaPDMListar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaPDM.listadoTabla = [];
        $scope.hojaPDM.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_lista_pdm'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.length) {
            $scope.hojaPDM.listadoTabla = data
            $scope.hojaPDM.listadoTablaTemp = data
            $scope.initPaginacion('hojaPDM', $scope.hojaPDM.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });

      }

      $scope.hojaPDMActivarFiltro = function () {
        $scope.hojaPDM.filtros.activo = !$scope.hojaPDM.filtros.activo;
        $scope.hojaPDM.filtros.autoPDM = '';
        $scope.hojaPDM.filtros.anio = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaPDMAplicarFiltro = function () {
        // let listadoTabla;
        let listadoTabla = $scope.hojaPDM.listadoTabla;

        if ($scope.hojaPDM.filtros.autoPDM != '') {
          listadoTabla = listadoTabla.filter(x => x.REGC_AUTOPDM.split('-')[0] === $scope.hojaPDM.filtros.autoPDM)
        }
        if ($scope.hojaPDM.filtros.anio != '') {
          listadoTabla = listadoTabla.filter(x => x.REGN_ANNO.split('-')[0] === $scope.hojaPDM.filtros.anio)
        }
        $scope.initPaginacion('hojaPDM', listadoTabla);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaPDMCrearNuevo = function () {
        $scope.hojaPDMActivarCamposDesactivados()

        $scope.hojaPDM.formulario.anio = $scope.SysDay.getFullYear();;
        $scope.hojaPDM.formulario.nivel = '';
        $scope.hojaPDM.formulario.regional = '';
        $scope.hojaPDM.formulario.fechaInicio = '';
        $scope.hojaPDM.formulario.fechaTerminacion = '';
        $scope.hojaPDM.formulario.estado = 'A';

        $scope.hojaPDM.formulario.autoPDM = '';
        $scope.hojaPDM.formulario.componente = '';
        $scope.hojaPDM.formulario.hallazgo = '';
        $scope.hojaPDM.formulario.descripcionHallazgo = '';
        $scope.hojaPDM.formulario.accionMejora = '';
        $scope.hojaPDM.formulario.descripcionMejora = '';
        $scope.hojaPDM.formulario.descripcion = '';

        $scope.hojaPDM.formulario.frecuencia = '';
        $scope.hojaPDM.formulario.meta = '';
        $scope.hojaPDM.formulario.unidadMedida = '';
        $scope.hojaPDM.formulario.accionMejoraEstado = 'E';

        $scope.hojaPDM.formulario.descripcionNumerador = '';
        $scope.hojaPDM.formulario.descripcionDenominador = '';
        $scope.hojaPDM.formulario.descripcionConstante = '';

        $scope.hojaPDM.formulario.fuenteDatos = '';

        $scope.hojaPDM.formulario.responsables = '';
        $scope.hojaPDM.formulario.listadoResponsables = [];
        $scope.hojaPDM.formulario.listadoResponsablesTabla = [];

        $scope.hojaPDM.formulario.tipoCalculo = '';
        $scope.hojaPDM.formulario.semaforizacionEstado = '';
        $scope.hojaPDM.formulario.semaforizacionSentido = '';
        $scope.hojaPDM.formulario.semaforizacionValor1 = '';
        $scope.hojaPDM.formulario.semaforizacionValor2 = '';
        $scope.hojaPDM.formulario.semaforizacionValor3 = '';
        $scope.hojaPDM.formulario.semaforizacionValorMax = '';

        $scope.hojaPDM.formulario.idPDMSeleccionado = '';



        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        // $scope.hojaPDM.formulario.nivel = '';
        // $scope.hojaPDM.formulario.regional = '';
        // $scope.hojaPDM.formulario.fechaInicio = '';
        // $scope.hojaPDM.formulario.fechaTerminacion = '';
        // $scope.hojaPDM.formulario.estado = 'A';

        // $scope.hojaPDM.formulario.componente = 'COMPONENTE';
        // $scope.hojaPDM.formulario.hallazgo = 'HALLAZGO';
        // $scope.hojaPDM.formulario.descripcionHallazgo = 'DESCRIPCION HALLAZGO';
        // $scope.hojaPDM.formulario.accionMejora = 'ACCIONMEJORA';
        // $scope.hojaPDM.formulario.descripcionMejora = 'DESCRIPCIONMEJORA';
        // $scope.hojaPDM.formulario.descripcion = 'DESCRIPCION';

        // $scope.hojaPDM.formulario.frecuencia = 'M';
        // $scope.hojaPDM.formulario.meta = '100';
        // $scope.hojaPDM.formulario.unidadMedida = '1';
        // $scope.hojaPDM.formulario.accionMejoraEstado = 'S';

        // $scope.hojaPDM.formulario.descripcionNumerador = 'DESCRIPCIONNUMERADOR';
        // $scope.hojaPDM.formulario.descripcionDenominador = 'DESCRIPCIONDENOMINADOR';
        // $scope.hojaPDM.formulario.descripcionConstante = 'DESCRIPCIONCONSTANTE';

        // $scope.hojaPDM.formulario.fuenteDatos = 'fuenteDatos';

        // $scope.hojaPDM.formulario.responsables = '';
        // $scope.hojaPDM.formulario.listadoResponsables = [];
        // $scope.hojaPDM.formulario.listadoResponsablesTabla = [];

        // $scope.hojaPDM.formulario.tipoCalculo = 'PO';
        // $scope.hojaPDM.formulario.semaforizacionEstado = 'S';
        // $scope.hojaPDM.formulario.semaforizacionSentido = 'A';
        // $scope.hojaPDM.formulario.semaforizacionValor1 = '30';
        // $scope.hojaPDM.formulario.semaforizacionValor2 = '30';
        // $scope.hojaPDM.formulario.semaforizacionValor3 = '40';
        // $scope.hojaPDM.formulario.semaforizacionValorMax = '100';
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////



        // }
        ////////////////////////////////////////////////

        if ($scope.hojaPDM.graficoSemaforizacion) {
          $scope.hojaPDM.graficoSemaforizacion.destroy()
          $scope.hojaPDM.graficoSemaforizacion = null;
        }

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaPDMActivarCamposDesactivados = function () {
        angular.forEach(document.querySelectorAll('.formPDM_Desactivar_Admin input'), function (i) {
          i.removeAttribute("readonly");
        });
        //
        angular.forEach(document.querySelectorAll('.formPDM_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formPDM_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formPDM_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });
        //
        angular.forEach(document.querySelectorAll('.formPDM_Desactivar_Estado select'), function (i) {
          i.removeAttribute("disabled");
        });
      }

      $scope.hojaPDMBuscarResponsable = function (responsable) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_obtener_tercero",
            funcionario: responsable,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaPDM.formulario.listadoResponsables.push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE.toString().toUpperCase()
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaPDMAgregarResponsable = function () {
        if (!$scope.hojaPDM.formulario.responsables || !$scope.hojaPDM.formulario.listadoResponsables.length) { return }
        if ($scope.hojaPDM.formulario.responsables.toString().indexOf('-') == -1) { return }
        const dato = $scope.hojaPDM.formulario.listadoResponsables.find(e => e.codigo == $scope.hojaPDM.formulario.responsables.split('-')[0].trim());

        if ($scope.hojaPDM.formulario.listadoResponsablesTabla.findIndex(e => e.codigo == dato.codigo) != -1) {
          $scope.hojaPDM.formulario.responsables = '';
          swal("Error", 'Responsable duplicado', "warning").catch(swal.noop); return
        }

        $scope.hojaPDM.formulario.listadoResponsablesTabla.push(dato);
        $scope.hojaPDM.formulario.responsables = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.hojaPDMQuitarResponsable = function (index) {
        $scope.hojaPDM.formulario.listadoResponsablesTabla.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarFormPDM = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaPDM.formulario.anio) resolve(false);
          if (!$scope.hojaPDM.formulario.nivel) resolve(false);
          if ($scope.hojaPDM.formulario.nivel === '2' && !$scope.hojaPDM.formulario.regional) resolve(false);
          if (!$scope.hojaPDM.formulario.fechaInicio) resolve(false);
          if (!$scope.hojaPDM.formulario.fechaTerminacion) resolve(false);
          if ($scope.hojaPDM.formulario.fechaInicio > $scope.hojaPDM.formulario.fechaTerminacion) resolve(false);

          if (!$scope.hojaPDM.formulario.autoPDM) resolve(false);
          if (!$scope.hojaPDM.formulario.componente) resolve(false);
          if (!$scope.hojaPDM.formulario.hallazgo) resolve(false);
          if (!$scope.hojaPDM.formulario.descripcionHallazgo) resolve(false);
          if (!$scope.hojaPDM.formulario.accionMejora) resolve(false);
          if (!$scope.hojaPDM.formulario.descripcionMejora) resolve(false);
          if (!$scope.hojaPDM.formulario.descripcion) resolve(false);


          if (!$scope.hojaPDM.formulario.frecuencia) resolve(false);
          if (!$scope.hojaPDM.formulario.meta) resolve(false);
          if (!$scope.hojaPDM.formulario.unidadMedida) resolve(false);
          if (!$scope.hojaPDM.formulario.accionMejoraEstado) resolve(false);

          if (!$scope.hojaPDM.formulario.fuenteDatos) resolve(false);

          if ($scope.hojaPDM.formulario.listadoResponsablesTabla.length == 0) resolve(false);

          if (!$scope.hojaPDM.formulario.tipoCalculo) resolve(false);
          if ($scope.hojaPDM.formulario.semaforizacionEstado == 'S' && ($scope.hojaPDM.formulario.semaforizacionValor1 == '' ||
            $scope.hojaPDM.formulario.semaforizacionValor2 == '' ||
            $scope.hojaPDM.formulario.semaforizacionValor3 == '')) {
            resolve(false);
          }
          if ($scope.hojaPDM.formulario.semaforizacionEstado == 'S' && $scope.hojaPDM.formulario.semaforizacionSentido == '') {
            resolve(false);
          }
          if ($scope.hojaPDM.formulario.semaforizacionEstado == 'S' &&
            ((parseFloat($scope.hojaPDM.formulario.semaforizacionValor1) +
              parseFloat($scope.hojaPDM.formulario.semaforizacionValor2) +
              parseFloat($scope.hojaPDM.formulario.semaforizacionValor3)) != parseFloat($scope.hojaPDM.formulario.semaforizacionValorMax))) {
            resolve(false);
          }

          resolve(true)
        });
      }

      $scope.guardarFormPDM = function () {
        $scope.validarFormPDM().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          //
          const dato = [{
            pcod_pdm: $scope.hojaPDM.formulario.idPDMSeleccionado,

            panno: $scope.hojaPDM.formulario.anio,
            pnivel: $scope.hojaPDM.formulario.nivel,
            pregional: $scope.hojaPDM.formulario.nivel === '2' ? $scope.hojaPDM.formulario.regional : '',
            pestado: $scope.hojaPDM.formulario.estado,

            pfecha_inicio: $scope.formatDate($scope.hojaPDM.formulario.fechaInicio),
            pfecha_terminacion: $scope.formatDate($scope.hojaPDM.formulario.fechaTerminacion),

            pautopdm: $scope.hojaPDM.formulario.autoPDM,
            pcomponente: $scope.hojaPDM.formulario.componente,
            phallazgo: $scope.hojaPDM.formulario.hallazgo,
            pdescripcion_hallazgo: $scope.hojaPDM.formulario.descripcionHallazgo,
            paccion_mejora: $scope.hojaPDM.formulario.accionMejora,
            pdescripcion_mejora: $scope.hojaPDM.formulario.descripcionMejora,
            pdescripcion: $scope.hojaPDM.formulario.descripcion,

            pfrecuencia: $scope.hojaPDM.formulario.frecuencia,
            pmeta: $scope.hojaPDM.formulario.meta.replace('.', ','),
            punidad_medida: $scope.hojaPDM.formulario.unidadMedida,
            paccion_mejora_estado: $scope.hojaPDM.formulario.accionMejoraEstado,

            pfuente_datos: $scope.hojaPDM.formulario.fuenteDatos,

            pdescripcion_numerador: $scope.hojaPDM.formulario.descripcionNumerador,
            pdescripcion_denominador: $scope.hojaPDM.formulario.descripcionDenominador,
            pdescripcion_constante: $scope.hojaPDM.formulario.descripcionConstante,

            ptipo_calculo: $scope.hojaPDM.formulario.tipoCalculo,
            psemaforizacion: $scope.hojaPDM.formulario.semaforizacionEstado,
            psemaforizacion_sentido: $scope.hojaPDM.formulario.semaforizacionSentido,
            pdato1: $scope.hojaPDM.formulario.semaforizacionValor1.replace(',', '.'),
            pdato2: $scope.hojaPDM.formulario.semaforizacionValor2.replace(',', '.'),
            pdato3: $scope.hojaPDM.formulario.semaforizacionValor3.replace(',', '.'),

            pdatomax: $scope.hojaPDM.formulario.semaforizacionValorMax.replace(',', '.'),

            presponsable: $scope.Rol_Cedula,

          }];

          var responsables = [];
          $scope.hojaPDM.formulario.listadoResponsablesTabla.forEach(e => {
            responsables.push({
              doc_responsable: e.codigo.toString(),
            })
          })
          // console.log(dato);
          const text = $scope.hojaPDM.formulario.idPDMSeleccionado == '' ? '¿Desea crear el PDM?' : '¿Desea actualizar el PDM?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_pdm",
                  datosJson: JSON.stringify(dato),
                  // cantidadJson: 1,
                  listadoResponsablesTabla: JSON.stringify(responsables),
                  cantidadResponsables: responsables.length,
                  accion: $scope.hojaPDM.formulario.idPDMSeleccionado == '' ? 'I' : 'U',
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaPDMListar(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
          //
        })
      }

      $scope.modalEditarPDM = function (x) {
        console.log(x);
        // $scope.modalDatosIndicador = x;

        $scope.itemSeleccionado_PDM = x.CODIGO;
        $scope.hojaPDMActivarCamposDesactivados()
        $scope.hojaPDM.formulario.idPDMSeleccionado = x.CODIGO;

        $scope.hojaPDM.formulario.anio = x.REGN_ANNO;
        $scope.hojaPDM.formulario.nivel = x.REGC_NIVEL.split('-')[0];
        $scope.hojaPDM.formulario.regional = x.REGN_REGIONAL;
        $scope.hojaPDM.formulario.estado = x.REGC_ESTADO;

        const fechaInicio = x.REGF_FECHA_INICIO.split('/');
        const fechaTerminacion = x.REGF_FECHA_TERMINACION.split('/');
        $scope.hojaPDM.formulario.fechaInicio = new Date(`${fechaInicio[2]}/${fechaInicio[1]}/${fechaInicio[0]}`);
        $scope.hojaPDM.formulario.fechaTerminacion = new Date(`${fechaTerminacion[2]}/${fechaTerminacion[1]}/${fechaTerminacion[0]}`);

        $scope.hojaPDM.formulario.autoPDM = x.REGC_AUTOPDM.split('-')[0];
        $scope.hojaPDM.formulario.componente = x.REGC_COMPONENTE;
        $scope.hojaPDM.formulario.hallazgo = x.REGC_HALLAZGO;
        $scope.hojaPDM.formulario.descripcionHallazgo = x.REGC_DESCRIPCION_HALLAZGO;
        $scope.hojaPDM.formulario.accionMejora = x.REGC_ACCION_MEJORA;
        $scope.hojaPDM.formulario.descripcionMejora = x.REGC_DESCRIPCION_MEJORA;
        $scope.hojaPDM.formulario.descripcion = x.REGC_DESCRIPCION;
        //
        $scope.hojaPDM.formulario.frecuencia = x.REGC_FRECUENCIA.split('-')[0];
        $scope.hojaPDM.formulario.meta = x.REGN_META.replace(',', '.');
        $scope.hojaPDM.formulario.unidadMedida = x.REGN_UNIDAD_MEDIDA.split('-')[0];
        $scope.hojaPDM.formulario.accionMejoraEstado = x.REGC_ACCION_MEJORA_ESTADO;
        //
        $scope.hojaPDM.formulario.descripcionNumerador = x.REGC_DESCRIPCION_NUMERADOR;
        $scope.hojaPDM.formulario.descripcionDenominador = x.REGC_DESCRIPCION_DENOMINADOR;
        $scope.hojaPDM.formulario.descripcionConstante = x.REGC_DESCRIPCION_CONSTANTE;

        $scope.hojaPDM.formulario.fuenteDatos = x.REGC_FUENTE_DATOS;

        $scope.hojaPDM.formulario.responsables = '';
        $scope.hojaPDM.formulario.listadoResponsables = [];
        $scope.hojaPDM.formulario.listadoResponsablesTabla = [];

        $scope.hojaPDM.formulario.tipoCalculo = x.REGC_TIPO_CALCULO.split('-')[0];
        $scope.hojaPDM.formulario.semaforizacionEstado = x.REGC_SEMAFORIZACION;
        $scope.hojaPDM.formulario.semaforizacionSentido = x.REGC_TIPO_SENTIDO.split('-')[0];
        $scope.hojaPDM.formulario.semaforizacionValor1 = x.REGC_DATO1.replace(',', '.');
        $scope.hojaPDM.formulario.semaforizacionValor2 = x.REGC_DATO2.replace(',', '.');
        $scope.hojaPDM.formulario.semaforizacionValor3 = x.REGC_DATO3.replace(',', '.');
        $scope.hojaPDM.formulario.semaforizacionValorMax = x.REGC_DATOMAX.replace(',', '.');

        setTimeout(() => {
          $scope.calcularGraficoSemaforizacion('hojaPDM');
        }, 500);
        $scope.modalObtenerDatosRespPDM(x);

        $scope.openModal('modalCrearPDM');
        document.getElementById('modalCrearPDM_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => {
          if (!$scope.permisos.BADC_EDITAR_FICHA_PDM == 'S') {
            angular.forEach(document.querySelectorAll('.formPDM_Desactivar_Admin input'), function (i) {
              i.setAttribute("readonly", true);
            });
          }

          if (!$scope.permisos.BADC_EDITAR_FICHA_PDM == 'S') {
            angular.forEach(document.querySelectorAll('.formPDM_Desactivar input'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formPDM_Desactivar textarea'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formPDM_Desactivar select'), function (i) {
              i.setAttribute("disabled", true);
            });
            angular.forEach(document.querySelectorAll('.formPDM_Desactivar_Estado select'), function (i) {
              i.setAttribute("disabled", true);
            });
          }
        }, 1000);
      }

      $scope.modalObtenerDatosRespPDM = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_responsable_pdm",
            codigo: x.CODIGO,
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            data.forEach(e => {
              $scope.hojaPDM.formulario.listadoResponsablesTabla.push({
                "codigo": e.REGV_RESPONSABLE,
                "nombre": e.TERC_NOMBRE
              })
            })
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalGraficoPDM = function (x) {
        $scope.itemSeleccionado_PDM = x.CODIGO

        $scope.modalDatosCambio_PDM = x;
        if (x.REGC_SEMAFORIZACION == 'N') {
          swal("Mensaje", "Semaforización no activa", "warning").catch(swal.noop);
          return
        }
        setTimeout(() => {
          $scope.openModal('modalGraficoPDM');
        }, 1000);
        $scope.hojaPDM.modalGraficoVars = {};
        $scope.hojaPDM.modalGraficoVars = x;


        // $scope.hojaPDM.modalGraficoVars.anio = $scope.SysDay.getFullYear();

        $scope.modalGraficoObtenerDatosPDM(x);

      }

      $scope.modalGraficoObtenerDatosPDM = function (x) {
        if ($scope.hojaPDM.grafico) {
          $scope.hojaPDM.grafico.destroy()
          $scope.hojaPDM.grafico = null;
        }
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_pdm",
            codigo: x.CODIGO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.hojaPDM.grafico.destroy()
            $scope.hojaPDM.grafico = null;
            setTimeout(() => { $scope.$apply(); }, 500);
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {

            $scope.hojaPDM.modalGraficoVars.listado = data;
            setTimeout(() => {
              var dataMeses, dataSerie, dataMeta = [], dataPlotBands, dato1_Max, dato2_Min, dato2_Max, dato3_Min

              if ($scope.hojaPDM.modalGraficoVars.REGC_TIPO_SENTIDO.split('-')[0] == 'A') { // Orden Ascendente
                dato1_Max = parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATO1);
                dato2_Min = dato1_Max
                dato2_Max = dato2_Min + parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATO2);
                dato3_Min = dato2_Max;

                dataPlotBands = [
                  {
                    color: 'hsl(206deg 90% 69.5% / 10%)', // Color value
                    from: parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATOMAX),
                    to: 10000000,
                    label: {
                      text: 'Exceso'
                    }
                  },
                  { // Light air
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }

                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato3_Min,
                    to: parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      // text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              } else { // Orden Descendente
                dato3_Min = parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATOMAX) - parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATO1);
                dato2_Max = dato3_Min
                dato2_Min = dato2_Max - parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATO2);
                dato1_Max = dato2_Min;
                dataPlotBands = [
                  { // Light air
                    from: dato3_Min,
                    to: parseFloat($scope.hojaPDM.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      // text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              }
              // M:Mensual; B:Bimestral; T:Trimestral; S:Semestral; A:Anual;
              if (x.REGC_FRECUENCIA.split('-')[0] == 'M') {// Mensual
                dataMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(1) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado_PDM(1),
                  $scope.filtrarPeriodoAcumulado_PDM(2),
                  $scope.filtrarPeriodoAcumulado_PDM(3),
                  $scope.filtrarPeriodoAcumulado_PDM(4),
                  $scope.filtrarPeriodoAcumulado_PDM(5),
                  $scope.filtrarPeriodoAcumulado_PDM(6),
                  $scope.filtrarPeriodoAcumulado_PDM(7),
                  $scope.filtrarPeriodoAcumulado_PDM(8),
                  $scope.filtrarPeriodoAcumulado_PDM(9),
                  $scope.filtrarPeriodoAcumulado_PDM(10),
                  $scope.filtrarPeriodoAcumulado_PDM(11),
                  $scope.filtrarPeriodoAcumulado_PDM(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(1))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(2))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(3))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(4))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(5))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(7))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(8))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(9))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(10))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(11))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(12))
              }
              if (x.REGC_FRECUENCIA.split('-')[0] == 'B') {// Bimestral
                dataMeses = ['Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado_PDM(2) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado_PDM(2),
                  $scope.filtrarPeriodoAcumulado_PDM(4),
                  $scope.filtrarPeriodoAcumulado_PDM(6),
                  $scope.filtrarPeriodoAcumulado_PDM(8),
                  $scope.filtrarPeriodoAcumulado_PDM(10),
                  $scope.filtrarPeriodoAcumulado_PDM(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(2))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(4))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(8))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(10))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(12))
              }
              if (x.REGC_FRECUENCIA.split('-')[0] == 'T') {// Trimestral
                dataMeses = ['Mar', 'Jun', 'Sep', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado_PDM(3) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado_PDM(3),
                  $scope.filtrarPeriodoAcumulado_PDM(6),
                  $scope.filtrarPeriodoAcumulado_PDM(9),
                  $scope.filtrarPeriodoAcumulado_PDM(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(3))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(9))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(12))
              }
              if (x.REGC_FRECUENCIA.split('-')[0] == 'S') {// Semestral
                dataMeses = ['Jun', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado_PDM(6) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado_PDM(6),
                  $scope.filtrarPeriodoAcumulado_PDM(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(6))
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(12))
              }
              if (x.REGC_FRECUENCIA.split('-')[0] == 'A') {// Anual
                dataMeses = ['Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado_PDM(12)
                  $scope.filtrarPeriodoAcumulado_PDM(12)
                ];
                dataMeta.push($scope.filtrarPeriodoMetaVigencia_PDM(12))
              }

              //GENERAR GRAFICO
              $scope.hojaPDM.grafico = Highcharts.chart('graficoPDM', {
                chart: {
                  type: 'line'
                },
                title: {
                  text: $scope.hojaPDM.modalGraficoVars.REGN_NOM_INDICADOR
                },
                // subtitle: {
                //   text: $scope.modalGraficoVars.UNIC_NOMBRE
                // },
                xAxis: {
                  categories: dataMeses
                },
                yAxis: {
                  // min: 0,
                  // max: 110,
                  // tickInterval: 10,
                  gridLineColor: '',
                  title: {
                    text: ''
                  },
                  plotBands: dataPlotBands
                },

                plotOptions: {
                  line: {
                    dataLabels: {
                      enabled: true
                    },
                  }
                },
                series: [
                  {
                    name: 'Periodo',
                    color: '#00e8ff',
                    lineWidth: 3,
                    data: dataSerie
                  },
                  {
                    type: 'line',
                    name: 'META',
                    color: '#32ff08',
                    lineWidth: 4,
                    data: dataMeta,
                    marker: {
                      enabled: false
                    },
                    // enableMouseTracking: false,
                  },
                  //
                  // {
                  //   name: 'Linea base',
                  //   //color: '#00e8ff',
                  //   dashStyle: 'ShortDash',
                  //   lineWidth: 3,
                  //   data: [[0, parseFloat($scope.hojaPDM.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.hojaPDM.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))]],
                  // }
                  //
                ],
                // exporting: { enabled: false },
                credits: { enabled: false },
              });
              //GENERAR GRAFICO

            }, 500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }
      $scope.modalGraficoObtenerDatosPDM_traza = function () {

        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_pdm_traza",
            codigo: $scope.hojaPDM.modalDatosCorrespVars.CODIGO,
            periodo: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.periodo
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.hojaPDM.grafico.destroy()
            $scope.hojaPDM.grafico = null;
            setTimeout(() => { $scope.$apply(); }, 500);
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Traza.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.filtrarPeriodoAcumulado_PDM = function (periodo) {
        const dato = parseFloat((($scope.hojaPDM.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_RESULTADO.toString()).replace(',', '.'));

        const observacion = ($scope.hojaPDM.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESC_OBSERVACION;
        if (observacion === null) {
          return null
        }
        return dato == 0 ? 0 : dato
      }
      $scope.filtrarPeriodoMetaVigencia_PDM = function (periodo) {
        const dato = parseFloat((($scope.hojaPDM.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_META.toString()).replace(',', '.'));
        return dato == 0 ? null : dato
      }

      $scope.modalDatosCorrespPDM = function (x) {
        // x.seleccionado = true
        $scope.itemSeleccionado_PDM = x.CODIGO;
        $scope.modalDatosCambio_PDM = x;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.hojaPDM.modalDatosCorrespVars = {}
        $scope.hojaPDM.modalDatosCorrespVars = JSON.parse(JSON.stringify(x));
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo = {}

        $scope.hojaPDM.modalDatosCorrespVars.vista = 1

        $scope.hojaPDM.modalDatosCorrespVars.anioAnterior = $scope.SysDay.getFullYear();
        $scope.hojaPDM.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        setTimeout(() => { $scope.$apply(); }, 500);
        setTimeout(() => {
          $scope.modalDatosCorrespObtenerDatosPDM(x);
          $scope.openModal('modalDatosCorrespPDM');
          setTimeout(() => { swal.close() }, 700);
        }, 1000);
      }

      $scope.modalDatosCorrespObtenerDatosPDM = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_pdm",
            codigo: x.CODIGO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.hojaPDM.modalDatosCorrespVars.listado = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.hojaPDMAtrasModalPeriodo = function () {
        $scope.hojaPDM.modalDatosCorrespVars.vista = 1;
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalDatosCorrespGestionarPeriodo_PDM = function (x) {
        // console.log($scope.modalDatosCorrespVars);
        $scope.hojaPDM.modalDatosCorrespVars.vista = 2;
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.anio = x.GESN_ANNO
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.periodoNombre = x.GESN_PERIODO_NOMBRE
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.periodo = x.GESN_PERIODO
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador = x.GESN_NUMERADOR != null ? x.GESN_NUMERADOR.toString().replace(',', '.') : ''
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador = x.GESN_DENOMINADOR != null ? x.GESN_DENOMINADOR.toString().replace(',', '.') : ''
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante = x.GESN_CONSTANTE != null ? x.GESN_CONSTANTE.toString().replace(',', '.') : ''
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.analisis = x.GESC_OBSERVACION
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.accion = x.GESV_RESPONSABLE == '-' ? 'I' : 'U'
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = x.GESN_RESULTADO;

        document.querySelector('#fileGestionIndic_PDM').value = '';
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteNombre = '';
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteExt = '';
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteB64 = '';
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.listadoAdjuntos = []
        $scope.listarSoportesGestion_PDM();

        $scope.calcularResultadoPeriodo_PDM()
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.calcularResultadoPeriodo_PDM = function () {
        $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = '?'
        if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador == '' || $scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador == '') return;


        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'PO') {
          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }
        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'RA') {
          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador)
          ).toFixed(2)
        }
        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA') {
          if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador))
            * parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante)
          ).toFixed(2)
        }

        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'VA') {
          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador)) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }

        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DI') {

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            100 - (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador)) * 100
          ).toFixed(2)
        }

        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ') {
          if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) -
            ((parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) * parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador)) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }

        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DE') {
          if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            1 -
            (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador) * parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante))
          ).toFixed(2)
        }
        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TL') {
          if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador)) * parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante))
          ).toFixed(2)
        }
        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'CT') {
          // if ($scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }
        if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'PR') {

          $scope.hojaPDM.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) + parseFloat($scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador)) / 2
          ).toFixed(2)
        }

      }

      document.querySelector('#fileGestionIndic_PDM').addEventListener('change', function (e) {
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP' || x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteNombre = `${files[i].name.replace(/(.ZIP|.zip|.PDF|.pdf)/g, '')}`;
                  // $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteNombre = `${files[i].name.replace('(.ZIP|.zip)', '')}.${$scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteExt}`;
                  $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteB64 = result;
                  $scope.guardarSoporteGestionIndic();
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileGestionIndic_PDM').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileGestionIndic_PDM').value = '';
              swal('Advertencia', '¡Los archivos seleccionados deben ser formato ZIP o PDF!', 'info');
            }
          }
        }
      });

      $scope.listarSoportesGestion_PDM = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_listar_soportes_gestion_pdm',
            codigo: $scope.hojaPDM.modalDatosCorrespVars.CODIGO,
            periodo: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.periodo
          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.hojaPDM.modalDatosCorrespVarsPeriodo.listadoAdjuntos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.guardarSoporteGestion_PDM = function () {
        swal({
          title: 'Confirmar',
          text: '¿Desea cargar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $scope.cargarSoporteGestion_PDM().then((resultSoporte) => {
              $http({
                method: 'POST',
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_guardar_soporte_gestion_pdm",

                  codigo: $scope.modalDatosCorrespVars.CODIGO,
                  anno: $scope.modalDatosCorrespVars.REGN_ANNO,
                  periodo: $scope.modalDatosCorrespVarsPeriodo.periodo,
                  nombre: `${$scope.modalDatosCorrespVarsPeriodo.soporteNombre}.${$scope.modalDatosCorrespVarsPeriodo.soporteExt}`,
                  ruta: resultSoporte,
                  responsable: $scope.Rol_Cedula
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.listarSoportesGestion_PDM();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            })
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            document.querySelector('#fileGestionIndic_PDM').value = '';
          }
        }).catch(swal.noop);
      }

      $scope.cargarSoporteGestion_PDM = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporteGestion_PDM",
              nombre: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteNombre,
              base64: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteB64,
              ext: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.eliminarSoportesGestion_PDM = function (ruta) {
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $http({
              method: 'POST',
              url: "php/planeacion/procesospoa.php",
              data: {
                function: 'p_actualizar_soportes_gestion_pdm',
                ruta
              }
            }).then(function ({ data }) {
              if (data.Codigo == '0') {
                swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                $scope.listarSoportesGestion_PDM()
                setTimeout(() => { $scope.$apply(); }, 500);
                // } else {
              } else {
                swal('¡Mensaje!', data, 'info').catch(swal.noop);
              }
            })
          }
        })

      }

      $scope.modalDatosCorrespValidarForm_PDM = function () {
        return new Promise((resolve) => {
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'CA' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DE' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TL' && !$scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if (!$scope.hojaPDM.modalDatosCorrespVarsPeriodo.analisis) resolve(false)
          resolve(true)
        });
      }

      $scope.modalDatosCorrespGuardarPeriodo_PDM = function () {
        $scope.modalDatosCorrespValidarForm_PDM().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }

          // if (['PO', 'RA', 'TA', 'VA', 'DI', 'AJ', 'DE'].includes($scope.hojaPDM.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0])
          //   && $scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador == '0') {
          //   swal("Error", 'Operación incorrecta', "warning").catch(swal.noop); return
          // }

          const text = $scope.hojaPDM.modalDatosCorrespVarsPeriodo.accion == 'I' ? '¿Desea registrar el periodo?' : '¿Desea actualizar el periodo?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {

              const datos =
                [{
                  pcod_pdm: $scope.hojaPDM.modalDatosCorrespVars.CODIGO,
                  pperiodo: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.periodo,
                  pnumerador: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.numerador.replace('.', ','),
                  pdenominador: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.denominador.replace('.', ','),
                  pconstante: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.constante.replace('.', ','),
                  panalisis: $scope.hojaPDM.modalDatosCorrespVarsPeriodo.analisis,
                  presponsable: $scope.Rol_Cedula
                }]
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: 'p_ui_gestion_pdm',
                  datos: JSON.stringify(datos),
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", "Datos guardados", "success").catch(swal.noop);

                  $scope.hojaPDM.modalDatosCorrespVars.vista = 1;
                  // $scope.modalDatosCorrespObtenerDatosPDM($scope.hojaPDM.modalDatosCorrespVars);
                  $scope.modalDatosCorrespPDM($scope.modalDatosCambio_PDM);
                  setTimeout(() => { $scope.$apply(); }, 500);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              });
            }
          });
        });
      }

      $scope.modalSeguimientoPDM = function (x) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.itemSeleccionado_PDM = x.CODIGO;
        $scope.hojaPDM.modalDatosSeguimiento = {}
        $scope.hojaPDM.modalDatosSeguimiento = JSON.parse(JSON.stringify(x));
        $scope.hojaPDM.modalDatosSeguimiento.vista = 1; // Listar seguimientos
        // $scope.hojaPDM.modalDatosSeguimiento.vista = 11; // Form seguimientos
        // $scope.hojaPDM.modalDatosSeguimiento.vista = 2; // Listar gestiones
        // $scope.hojaPDM.modalDatosSeguimiento.vista = 21; // Form gestion

        $scope.hojaPDM.modalDatosSeguimientoGestion = { vars: {} }

        setTimeout(() => { $scope.$apply(); }, 500);
        setTimeout(() => {
          $scope.modalDatosSeguimientoObtenerDatosPDM(x);
          $scope.openModal('modalDatosSeguimientoPDM');
          setTimeout(() => { swal.close() }, 700);
        }, 1000);
      }

      $scope.modalDatosSeguimientoObtenerDatosPDM = function (x) {
        $scope.hojaPDM.modalDatosSeguimiento.listado = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_seguimientos_pdm",
            codigo: x.CODIGO
          }
        }).then(function ({ data }) {
          // if (data.toString().substr(0, 3) == '<br' || data == 0) {
          //   swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          // }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.hojaPDM.modalDatosSeguimiento.listado = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalCrearSeguimientoPDM = function () {
        $scope.hojaPDM.modalDatosSeguimiento.vars = {
          codPDM: $scope.hojaPDM.modalDatosSeguimiento.CODIGO,
          codSeguimiento: '',
          fechaInicio: '',
          fechaFin: '',
          // hallazgo: 'HALLAZGO PRUEBA',
          // accion: 'ACCION PRUEBA',
          hallazgo: '',
          accion: '',
          estado: 'A',
          estadoSelec: 'A',
          accionMejoraEstado: '',
          cantidad: 0,
          soporteExt: '',
          soporteNombre: '',
          soporteB64: '',
        }

        $scope.hojaPDM.modalDatosSeguimiento.vista = 11; // Form seguimientos
        setTimeout(() => { $scope.$apply(); }, 500);
        $scope.modalActivaCamposSeguimientoPDM()
      }



      $scope.modalEditarSeguimientoPDM = function (x) {
        $scope.modalActivaCamposSeguimientoPDM()

        $scope.hojaPDM.modalDatosSeguimiento.vars = {
          codPDM: x.SEGN_COD_PDM,
          codSeguimiento: x.SEGN_SEGUIMIENTO,
          fechaInicio: $scope.convertDate(x.SEGF_FECHA_INICIO),
          fechaFin: $scope.convertDate(x.SEGF_FECHA_FIN),
          hallazgo: x.SEGC_HALLAZGO,
          accion: x.SEGC_ACCION,
          estado: x.SEGC_ESTADO.split('-')[0],
          estadoSelec: x.SEGC_ESTADO.split('-')[0],
          cantidad: x.CANTIDAD,
          accionMejoraEstado: x.SEGC_ACCION_MEJORA,
          listadoTraza: [],
          soporteExt: '',
          soporteNombre: '',
          soporteB64: '',
        }
        $scope.listarSoportesSeguimiento_PDM()
        $scope.modalDatosSeguimientoObtenerDatosTrazaPDM()
        $scope.hojaPDM.modalDatosSeguimiento.vista = 11; // Form seguimientos

        if (x.SEGC_ESTADO.split('-')[0] != 'A') {
          $scope.modalDesactivaCamposSeguimientoPDM()
        }


        setTimeout(() => { $scope.$apply(); }, 500);

      }

      $scope.modalDesactivaCamposSeguimientoPDM = function () {
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar select'), function (i) {
          i.setAttribute("disabled", true);
        });
      }

      $scope.modalActivaCamposSeguimientoPDM = function () {
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formSeguimiento_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });
      }


      $scope.modalDatosSeguimientoObtenerDatosTrazaPDM = function () {
        $scope.hojaPDM.modalDatosSeguimiento.vars.listadoTraza = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_seguimientos_pdm_traza",
            codPDM: $scope.hojaPDM.modalDatosSeguimiento.vars.codPDM,
            codSeguimiento: $scope.hojaPDM.modalDatosSeguimiento.vars.codSeguimiento,
          }
        }).then(function ({ data }) {
          // if (data.toString().substr(0, 3) == '<br' || data == 0) {
          //   swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          // }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.hojaPDM.modalDatosSeguimiento.vars.listadoTraza = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.validarFormSeguimientoPDM = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.fechaInicio) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.fechaFin) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.hallazgo) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.accion) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.accionMejoraEstado) resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormSeguimientoPDM = function () {
        $scope.validarFormSeguimientoPDM().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = !$scope.hojaPDM.modalDatosSeguimiento.vars.codSeguimiento ? '¿Desea crear el seguimiento?' : '¿Desea actualizar el seguimiento?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              const datos = {
                codPDM: $scope.hojaPDM.modalDatosSeguimiento.vars.codPDM,
                codSeguimiento: $scope.hojaPDM.modalDatosSeguimiento.vars.codSeguimiento,
                fechaInicio: $scope.formatDate($scope.hojaPDM.modalDatosSeguimiento.vars.fechaInicio),
                fechaFin: $scope.formatDate($scope.hojaPDM.modalDatosSeguimiento.vars.fechaFin),

                hallazgo: $scope.hojaPDM.modalDatosSeguimiento.vars.hallazgo,
                accion: $scope.hojaPDM.modalDatosSeguimiento.vars.accion,
                estado: $scope.hojaPDM.modalDatosSeguimiento.vars.estado,
                accionMejora: $scope.hojaPDM.modalDatosSeguimiento.vars.accionMejoraEstado,

                responsable: $scope.Rol_Cedula
              }

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_seguimiento_pdm",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.atrasModalSeguimiento();
                  $scope.modalDatosSeguimientoObtenerDatosPDM($scope.hojaPDM.modalDatosSeguimiento);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })

        })
      }

      document.querySelector('#fileSeguimiento_PDM').addEventListener('change', function (e) {
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP' || x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.hojaPDM.modalDatosSeguimiento.vars.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.hojaPDM.modalDatosSeguimiento.vars.soporteNombre = `${files[i].name.replace(/(.ZIP|.zip|.PDF|.pdf)/g, '')}`;
                  $scope.hojaPDM.modalDatosSeguimiento.vars.soporteB64 = result;
                  $scope.guardarSoporteSeguimiento_PDM();
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileSeguimiento_PDM').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileSeguimiento_PDM').value = '';
              swal('Advertencia', '¡Los archivos seleccionados deben ser formato ZIP o PDF!', 'info');
            }
          }
        }
      });

      $scope.listarSoportesSeguimiento_PDM = function () {
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_listar_soportes_seguimiento_pdm',
            codPDM: $scope.hojaPDM.modalDatosSeguimiento.vars.codPDM,
            codSeguimiento: $scope.hojaPDM.modalDatosSeguimiento.vars.codSeguimiento
          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.guardarSoporteSeguimiento_PDM = function () {
        swal({
          title: 'Confirmar',
          text: '¿Desea cargar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $scope.cargarSoporteSeguimiento_PDM().then((resultSoporte) => {
              $http({
                method: 'POST',
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_guardar_soporte_seguimiento_pdm",

                  codPDM: $scope.hojaPDM.modalDatosSeguimiento.vars.codPDM,
                  codSeguimiento: $scope.hojaPDM.modalDatosSeguimiento.vars.codSeguimiento,
                  nombre: `${$scope.hojaPDM.modalDatosSeguimiento.vars.soporteNombre}.${$scope.hojaPDM.modalDatosSeguimiento.vars.soporteExt}`,
                  ruta: resultSoporte,
                  responsable: $scope.Rol_Cedula
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.listarSoportesSeguimiento_PDM();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            })
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            document.querySelector('#fileSeguimiento_PDM').value = '';
          }
        }).catch(swal.noop);
      }

      $scope.cargarSoporteSeguimiento_PDM = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaPDM.modalDatosSeguimiento.vars.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporteSeguimiento_PDM",
              nombre: $scope.hojaPDM.modalDatosSeguimiento.vars.soporteNombre,
              base64: $scope.hojaPDM.modalDatosSeguimiento.vars.soporteB64,
              ext: $scope.hojaPDM.modalDatosSeguimiento.vars.soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.eliminarSoportesSeguimiento_PDM = function (ruta) {
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $http({
              method: 'POST',
              url: "php/planeacion/procesospoa.php",
              data: {
                function: 'p_actualizar_soportes_seguimiento_pdm',
                ruta
              }
            }).then(function ({ data }) {
              if (data.Codigo == '0') {
                swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                $scope.listarSoportesSeguimiento_PDM()
                setTimeout(() => { $scope.$apply(); }, 500);
                // } else {
              } else {
                swal('¡Mensaje!', data, 'info').catch(swal.noop);
              }
            })
          }
        })

      }
      // //
      // //

      $scope.modalSeguimientoListarGestionPDM = function (codigo_pdm, codigo_seg, estado_seg) {
        if (!$scope.listadosPDM) {
          $scope.listadosPDM = {}
          $scope.cargarListasPDM();
        }
        $scope.hojaPDM.modalDatosSeguimiento.vista = 2; // Listar gestiones
        $scope.hojaPDM.modalDatosSeguimiento.listadoGestiones = []
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM = codigo_pdm
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento = codigo_seg
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoSeguimiento = estado_seg.split('-')[0]
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_seguimientos_gestion_pdm",
            codigo_pdm,
            codigo_seg
          }
        }).then(function ({ data }) {
          // if (data.toString().substr(0, 3) == '<br' || data == 0) {
          //   swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          // }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.hojaPDM.modalDatosSeguimiento.listadoGestiones = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalSeguimientoCrearGestionPDM = function () {
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.fechaCierre = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.observacion = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.consideraciones = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAvance = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAccion = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.oportunidadEjecucion = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.porcentajeAvance = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoHallazgo = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.area = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = [];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoTraza = []

        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteExt = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteNombre = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteB64 = '';

        $scope.hojaPDM.modalDatosSeguimiento.vista = 21; // Listar gestiones
        $scope.listarSoportesSeguimientoGestion_PDM();
        $scope.modalActivaCamposGestionPDM();

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalDesactivaCamposGestionPDM = function () {
        angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar select'), function (i) {
          i.setAttribute("disabled", true);
        });

        angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar select'), function (i) {
          i.setAttribute("disabled", true);
        });

      }

      $scope.modalActivaCamposGestionPDM = function () {

        if ($scope.permisos.BADC_EDITAR_GESTION_PDM == 'S') {
          angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar input'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar textarea'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formAuditorGestionPDM_desactivar select'), function (i) {
            i.removeAttribute("disabled");
          });

          // if ($scope.permisos.BADC_EDITAR_GESTION_PDM == 'S') {
          angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar input'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar textarea'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.formGestionPDM_desactivar select'), function (i) {
            i.removeAttribute("disabled");
          });
        }

      }

      $scope.modalSeguimientoEditarGestionPDM = function (x) {
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion = x.SEGN_GESTION;
        $scope.modalDesactivaCamposGestionPDM();
        $scope.modalTrazaSeguimientoGestionPDM();
        $scope.listarSoportesSeguimientoGestion_PDM();

        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.fechaCierre = $scope.convertDate(x.SEGF_FECHA_CIERRE);
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAccion = x.SEGC_ESTADO_ACCION.split('-')[0];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.oportunidadEjecucion = x.SEGC_OPORTUNIDAD_EJECUCION.split('-')[0];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.porcentajeAvance = x.SEGC_PORCENTAJE_AVANCE.split('-')[0];

        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.area = x.SEGC_AREA.split('-')[0];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAvance = x.SEGC_ESTADO_AVANCE.split('-')[0];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoHallazgo = x.SEGC_ESTADO_HALLAZGO ? x.SEGC_ESTADO_HALLAZGO.split('-')[0] : '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.observacion = x.SEGC_OBSERVACIONES;
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.consideraciones = x.SEGC_CONSIDERACIONES;

        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = [];
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteExt = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteNombre = '';
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteB64 = '';

        $scope.hojaPDM.modalDatosSeguimiento.vista = 21; // Listar gestiones
        $scope.modalActivaCamposGestionPDM();
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalTrazaSeguimientoGestionPDM = function () {
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoTraza = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "P_LISTA_SEGUIMIENTOS_GESTION_PDM_TRAZA",
            codPDM: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM,
            codSeguimiento: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento,
            codGestion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion
          }
        }).then(function ({ data }) {
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoTraza = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.validarFormSeguimientoGestionPDM = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.fechaCierre) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAccion) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.oportunidadEjecucion) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.porcentajeAvance) resolve(false);
          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.area) resolve(false);

          if ($scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion != '' && !$scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAvance) resolve(false);
          if ($scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion != '' && !$scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoHallazgo) resolve(false);
          // if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.observacion) resolve(false);
          // if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.consideraciones) resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormSeguimientoGestionPDM = function () {
        $scope.validarFormSeguimientoGestionPDM().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = !$scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion ? '¿Desea crear la gestión?' : '¿Desea actualizar la gestión?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              const datos = {
                codPDM: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM,
                codSeguimiento: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento,
                codGestion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion,

                fechaCierre: $scope.formatDate($scope.hojaPDM.modalDatosSeguimientoGestion.vars.fechaCierre),
                observacion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.observacion,
                consideraciones: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.consideraciones,
                estadoAvance: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAvance,
                estadoAccion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoAccion,
                oportunidadEjecucion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.oportunidadEjecucion,
                porcentajeAvance: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.porcentajeAvance,
                estadoHallazgo: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoHallazgo,
                area: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.area,

                responsable: $scope.Rol_Cedula
              }

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_seguimiento_gestion_pdm",
                  datos: JSON.stringify(datos)
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.atrasModalSeguimiento();
                  $scope.modalSeguimientoListarGestionPDM($scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM, $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento, $scope.hojaPDM.modalDatosSeguimientoGestion.vars.estadoSeguimiento);
                  // $scope.modalDatosSeguimientoObtenerDatosPDM($scope.hojaPDM.modalDatosSeguimiento);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })

        })
      }

      document.querySelector('#fileSeguimientoGestion_PDM').addEventListener('change', function (e) {
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP' || x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteNombre = `${files[i].name.replace(/(.ZIP|.zip|.PDF|.pdf)/g, '')}`;
                  $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteB64 = result;
                  $scope.guardarSoporteSeguimientoGestion_PDM();
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#fileSeguimientoGestion_PDM').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#fileSeguimientoGestion_PDM').value = '';
              swal('Advertencia', '¡Los archivos seleccionados deben ser formato ZIP o PDF!', 'info');
            }
          }
        }
      });

      $scope.listarSoportesSeguimientoGestion_PDM = function () {
        $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = []
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_listar_soportes_seguimiento_gestion_pdm',
            codPDM: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM,
            codSeguimiento: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento,
            codGestion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion,
          }
        }).then(function ({ data }) {
          if (data.length) {
            $scope.hojaPDM.modalDatosSeguimientoGestion.vars.listadoAdjuntos = data;
            setTimeout(() => { $scope.$apply(); }, 500);
            // } else {
            // swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      $scope.guardarSoporteSeguimientoGestion_PDM = function () {
        swal({
          title: 'Confirmar',
          text: '¿Desea cargar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });
            $scope.cargarSoporteSeguimientoGestion_PDM().then((resultSoporte) => {
              $http({
                method: 'POST',
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_guardar_soporte_seguimiento_gestion_pdm",

                  codPDM: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codPDM,
                  codSeguimiento: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codSeguimiento,
                  codGestion: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.codGestion,
                  nombre: `${$scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteNombre}.${$scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteExt}`,
                  ruta: resultSoporte,
                  responsable: $scope.Rol_Cedula
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.listarSoportesSeguimientoGestion_PDM();
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            })
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            document.querySelector('#fileSeguimientoGestion_PDM').value = '';
          }
        }).catch(swal.noop);
      }

      $scope.cargarSoporteSeguimientoGestion_PDM = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteB64) { resolve(''); return }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporteSeguimientoGestion_PDM",
              nombre: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteNombre,
              base64: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteB64,
              ext: $scope.hojaPDM.modalDatosSeguimientoGestion.vars.soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.eliminarSoportesSeguimientoGestion_PDM = function (ruta) {
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el soporte?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando Soporte...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $http({
              method: 'POST',
              url: "php/planeacion/procesospoa.php",
              data: {
                function: 'p_actualizar_soportes_seguimiento_gestion_pdm',
                ruta
              }
            }).then(function ({ data }) {
              if (data.Codigo == '0') {
                swal('¡Mensaje!', data.Nombre, 'success').catch(swal.noop);
                $scope.listarSoportesSeguimientoGestion_PDM()
                setTimeout(() => { $scope.$apply(); }, 500);
                // } else {
              } else {
                swal('¡Mensaje!', data, 'info').catch(swal.noop);
              }
            })
          }
        })

      }
      //
      $scope.cargarListasPDM = function () {
        $scope.listadosPDM.tiposEstadoAvance = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_listar_tipos_estado_avance',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.listadosPDM.tiposEstadoAvance = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });

        $scope.listadosPDM.porcentajesAvance = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_listar_porcentajes_avance',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.listadosPDM.porcentajesAvance = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.atrasModalSeguimiento = function () {
        $scope.hojaPDM.modalDatosSeguimiento.vista = $scope.hojaPDM.modalDatosSeguimiento.vista == 2 ? $scope.hojaPDM.modalDatosSeguimiento.vista - 1 : $scope.hojaPDM.modalDatosSeguimiento.vista
        $scope.hojaPDM.modalDatosSeguimiento.vista = $scope.hojaPDM.modalDatosSeguimiento.vista.toString().substr(0, 1)
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.descargarFichaTecnicaPDM = function (x) {
        window.open('views/planeacion/formatos/formatoFichaTecnicaPDM.php?cod_pdm=' + x.idPDMSeleccionado
          , '_blank', "width=1080,height=1100");
      }

      ////////////// PDM ////////////////
      ////////////// PDM ////////////////
      ////////////// PDM ////////////////

      $scope.hojaAutoLimpiar = function () {
        $scope.hojaAuto = {
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },
          formulario: {}
        }

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaAutoListar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaAuto.listadoTabla = [];
        $scope.hojaAuto.listadoTablaTemp = [];
        $scope.hojaPDM.listadoAutoPDM = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_lista_autopdm'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.length) {
            $scope.hojaAuto.listadoTabla = data
            $scope.hojaAuto.listadoTablaTemp = data
            $scope.initPaginacion('hojaAuto', $scope.hojaAuto.listadoTabla);
            data.forEach(e => {
              // if(e.BAUC_ESTADO == 'A')
              $scope.hojaPDM.listadoAutoPDM.push({
                codigo: e.BAUN_ID,
                nombre: e.BAUC_NOMBRE.toString().toUpperCase(),
                estado: e.BAUC_ESTADO
              })
            })
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaAutoCrearNuevo = function () {

        $scope.hojaAuto.formulario.codigo = '';
        $scope.hojaAuto.formulario.nombre = '';
        $scope.hojaAuto.formulario.estado = 'A';

        $scope.hojaAuto.formulario.idAutoSeleccionado = '';

        $scope.openModal('modalCrearAutos');

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarFormAuto = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaAuto.formulario.codigo) resolve(false);
          if (!$scope.hojaAuto.formulario.nombre) resolve(false);
          if (!$scope.hojaAuto.formulario.estado) resolve(false);

          resolve(true)
        });
      }

      $scope.guardarFormAuto = function () {
        $scope.validarFormAuto().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          //
          const dato = [{
            v_pcod_auto: $scope.hojaAuto.formulario.idAutoSeleccionado,

            v_pcodigo: $scope.hojaAuto.formulario.codigo,
            v_pnombre: $scope.hojaAuto.formulario.nombre,
            v_pestado: $scope.hojaAuto.formulario.estado,

            presponsable: $scope.Rol_Cedula,

          }];

          // console.log(dato);
          const text = $scope.hojaAuto.formulario.idAutoSeleccionado == '' ? '¿Desea crear el Auto?' : '¿Desea actualizar el Auto?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_autopdm",
                  datosJson: JSON.stringify(dato),
                  accion: $scope.hojaAuto.formulario.idAutoSeleccionado == '' ? 'I' : 'U',
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaAutoListar(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
          //
        })
      }

      $scope.modalEditarAuto = function (x) {
        console.log(x);

        $scope.hojaAuto.formulario.idAutoSeleccionado = x.BAUN_ID;

        $scope.hojaAuto.formulario.codigo = x.BAUC_CODIGO;
        $scope.hojaAuto.formulario.nombre = x.BAUC_NOMBRE;
        $scope.hojaAuto.formulario.estado = x.BAUC_ESTADO;

        $scope.openModal('modalCrearAutos');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.generarIndicadorNuevoPDM = function (x) {
        var options = {
          2023: 2023, 2024: 2024, 2025: 2025,
        };

        swal({
          title: 'Seleccione el año',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result_cod) {
          if (result_cod) {

            options = {
              S: 'Si', N: 'No'
            };

            swal({
              title: '¿Desea copiar la gestión al nuevo hallazgo?',
              input: 'select',
              inputOptions: options,
              inputPlaceholder: 'Seleccionar',
              showCancelButton: true,
              allowOutsideClick: false,
              width: 'auto',
              inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                  if (value !== '') {
                    resolve();
                  } else {
                    swal.close();
                  }
                })
              }
            }).then(function (gestion) {
              if (gestion) {

                const text = '¿Desea crear el hallazgo?';
                swal({
                  title: 'Confirmar',
                  text,
                  type: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
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
                      url: "php/planeacion/procesospoa.php",
                      data: {
                        function: "p_genera_nuevo_PDM",
                        cod_pdm: x.idPDMSeleccionado,
                        anno: result_cod,
                        gestion
                      }
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) == '<br' || data == 0) {
                        swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                      }
                      if (data.Codigo == 0) {
                        swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                        $scope.hojaPDMListar(1);
                        $scope.closeModal()
                        // data.Cons
                        swal({
                          title: data.Nombre,
                          text: "¿Desea ver el Hallazgo nuevo?",
                          type: "success",
                          showCancelButton: true,
                          confirmButtonText: "Si",
                          cancelButtonText: "No",
                          allowOutsideClick: false

                        }).then(function (result) {
                          if (result) {
                            $scope.modalEditarPDM(($scope.hojaPDM.listadoTabla.filter(e => e.CODIGO == data.Cons))[0])
                            setTimeout(() => { $scope.$apply(); }, 500);
                          }
                        }).catch(swal.noop);

                        // $scope.modalEditarPDM($scope.hojaPDM.listadoTabla.filter(e => e.CODIGO == x.idPDMSeleccionado))


                      }
                      if (data.Codigo == 1) {
                        swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                      }
                    })
                  }
                })
                /////
              }
            })
          }
        })
      }

      $scope.descargarInformeMultiplePDM = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: { function: 'p_descarga_informe_multiple_pdm' }
        }).then(function ({ data }) {
          if (data.length) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Multiple Hallazgos.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }


      $scope.hojaIndicadoresEliminar_PDM = function (x) {

        // console.log(x.idPDMSeleccionado)
        swal({
          title: 'Observación',
          input: 'textarea',
          inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          allowOutsideClick: false,
          // inputValue: $scope.Vista1.Obs,
          width: '500px',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal({
                  title: "Mensaje",
                  text: "¡Debe una observación!",
                  type: "warning",
                }).catch(swal.noop);
              }
            })
          }
        }).then(function (observacion) {
          //
          if (observacion)
            swal({
              title: '¿Desea eliminar el Hallazgo?',
              text: '',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
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
                  url: "php/planeacion/procesospoa.php",
                  data: {
                    function: 'p_eliminar_indicador_pdm',

                    cod_pdm: x.idPDMSeleccionado,
                    observacion,
                    responsable: $scope.Rol_Cedula
                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", "Hallazgo eliminado!", "success").catch(swal.noop);
                    $scope.closeModal()
                    $scope.hojaPDMListar(1);
                    setTimeout(() => { $scope.$apply(); }, 500);
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                });
              }
            });
        }).catch(swal.noop);
      }


      /////// INDICADORES ///////
      $scope.obtenerEstadoIndicadores = function (tipo = null) {
        const tipos = {
          A: "Activo",
          I: "Inactivo",
          S: "Activa",
          N: "Inactiva",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.obtenerEstadoGestionIndicador = function (orden, tipo = null) {
        if (orden == 'A') {
          const tipos = {
            BAJA: "etiquetaRoja",
            MEDIA: "etiquetaNaranja",
            ALTA: "etiquetaVerde",
            EXCESO: "etiquetaGris"
          }
          return tipos[tipo] || "Ninguno";
        } else {
          const tipos = {
            ALTA: "etiquetaVerde",
            MEDIA: "etiquetaNaranja",
            BAJA: "etiquetaRoja",
            EXCESO: "etiquetaGris"
          }
          return tipos[tipo] || "Ninguno";
        }
      }

      $scope.obtenerMesNombre = function (tipo = null, longitud = 3) {
        const tipos = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return tipos[tipo].substr(0, longitud)
      }

      $scope.initPaginacion = function (hoja, info) {
        $scope[hoja].listadoTablaTemp = info;
        $scope[hoja].varsTabla.currentPage = 0;
        $scope[hoja].varsTabla.pageSize = 20;
        $scope[hoja].varsTabla.valmaxpag = 10;
        $scope[hoja].varsTabla.pages = [];
        $scope.configPages(hoja);
      }

      $scope.filter = function (hoja, val) {
        $scope[hoja].listadoTablaTemp = $filter('filter')($scope[hoja].listadoTabla, val);
        if ($scope[hoja].listadoTablaTemp.length > 0) {
          $scope.setPage(hoja, 1);
        }
        $scope.configPages(hoja);
      }

      $scope.configPages = function (hoja) {
        $scope[hoja].varsTabla.pages.length = 0;
        var ini = $scope[hoja].varsTabla.currentPage - 4;
        var fin = $scope[hoja].varsTabla.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
        } else {
          if (ini >= Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope[hoja].varsTabla.pages.push({
            no: i
          });
        }

        if ($scope[hoja].varsTabla.currentPage >= $scope[hoja].varsTabla.pages.length)
          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.pages.length - 1;
      }
      $scope.setPage = function (hoja, index) {
        $scope[hoja].varsTabla.currentPage = index - 1;
      }
      $scope.paso = function (hoja, tipo) {
        if (tipo == 'next') {
          var i = $scope[hoja].varsTabla.pages[0].no + 1;
          if ($scope[hoja].varsTabla.pages.length > 9) {
            var fin = $scope[hoja].varsTabla.pages[9].no + 1;
          } else {
            var fin = $scope[hoja].varsTabla.pages.length;
          }

          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.currentPage + 1;
          if ($scope[hoja].listadoTablaTemp.length % $scope[hoja].varsTabla.pageSize == 0) {
            var tamanomax = parseInt($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
          } else {
            var tamanomax = parseInt($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope[hoja].varsTabla.pages[0].no - 1;
          if ($scope[hoja].varsTabla.pages.length > 9) {
            var fin = $scope[hoja].varsTabla.pages[9].no - 1;
          } else {
            var fin = $scope[hoja].varsTabla.pages.length;
          }

          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope[hoja].varsTabla.pages.length;
          }
        }
        $scope.calcular(hoja, i, fin);
      }
      $scope.calcular = function (hoja, i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope[hoja].varsTabla.pages = [];
        for (i; i <= fin; i++) {
          $scope[hoja].varsTabla.pages.push({
            no: i
          });
        }
      }

      $scope.formatDate = function (date) {
        if (date === undefined) { return }
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
        // return [year, month, day].join('-');
      }

      $scope.convertDate = function (text) {
        let vtext = text.split('/')
        return new Date(`${vtext[2]}/${vtext[1]}/${vtext[0]}`);
      }

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }
      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        if (x == 1 && $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva.length == 0) {
          $scope.hojaProcesosListarlistadoPerspectiva(); // ACTIVAR
          $scope.hojaProcesosListarObjetivoEstrategico(); // ACTIVAR
        }
        if (x == 2 && $scope.hojaIndicadores.listadoTabla.length == 0) {
          $scope.hojaIndicadoresListar();
        }
        if (x == 3 && $scope.hojaPDM.listadoTabla.length == 0) {
          $scope.hojaPDMListar();
          $scope.hojaAutoListar();
        }
        if (x == 4 && $scope.hojaAuto.listadoTabla.length == 0) {
          $scope.hojaAutoListar();
        }
      }

      $scope.descargarSoporte = function (ruta) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'descargaFile',
            ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }

      $scope.replaceVar = function (x) {
        x.CODIGO_2 = x.CODIGO.replace(/\_/g, '.')
        return x.CODIGO.replace(/\_/g, '.')
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
