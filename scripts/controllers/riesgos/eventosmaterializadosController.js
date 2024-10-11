'use strict';
angular.module('GenesisApp')
  .controller('eventosmaterializadosController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', function ($scope, consultaHTTP, notification, cfpLoadingBar, $http) {
    $scope.menu = 'tablaEventos';
    $scope.listadosSelect = {};
    $scope.disabledButton = false;
    $scope.listadoEventos = [];
    $scope.userCreate = ''
    $scope.userCargo = ''
    $scope.userDateCreate = ''
    $scope.nombre_procesos = '';
    $scope.fecha_Descubrimiento = '';
    $scope.tipo_perdida = '';
    $scope.clase_evento = '';
    $scope.fechaActual = new Date()
    $scope.permisosModulo = {
      listar: 'EM01',
      guardar: 'EM02',
      editar: 'EM03'
    }
    $scope.editMode = false;
    $scope.permisosValidos = [];
    $scope.formulario = {
      numeroReferencia: {
        value: 0,
        required: false
      },
      proceso: {
        value: '',
        required: true
      },
      fechaDescubrimiento: {
        value: '',
        required: true
      },
      fechaInicio: {
        value: '',
        required: true
      },
      fechaFinalizacion: {
        value: '',
        required: true
      },
      descripcion: {
        value: '',
        required: true,
      },
      productoAfectado: {
        value: '',
        required: true
      },
      claseEvento: {
        value: '',
        required: true
      },
      tipoPerdida: {
        value: '',
        required: true
      },
      divisa: {
        value: '',
        required: true
      },
      cuantia: {
        value: '',
        required: true
      },
      cuantiaTotalRecuperada: {
        value: '',
        required: true
      },
      cuantiaRecuperadaSeguros: {
        value: '',
        required: true
      },
      PlanDeAccion: {
        value: '',
        required: true
      },
      cuentaPlanAfectada: {
        value: '',
        required: true
      },
      fechaContabilizacion: {
        value: '',
        required: true
      },
    };
    $scope.datosRegistro = {
      usuarioCreador: JSON.parse(sessionStorage.getItem("inicio_perfil")).nombre,
      cargo: JSON.parse(sessionStorage.getItem("inicio_perfil")).cargo,
      fechaRegistro: new Date()
    }

    $scope.mostrarVista = function (vista) {
      switch (vista) {
        case 'formularioEventos':
          $scope.menu = 'formularioEventos';
          break;
        case 'tablaEventos':
          $scope.menu = 'tablaEventos';
          break;
        default:
          break;
      }
    }

    $scope.obtenerProcesos = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'consultar_listado',
        }
      }).then(({ data }) => {
        $scope.listadoDatos = data;
      });
    }

    $scope.obtenerProcesos()

    $scope.infomacionFormulario = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'listado_select_eventos_materializados',
        }
      }).then(({ data }) => {
        $scope.listadosSelect = { ...data };
      });
    }

    $scope.permisos = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'permisos_usuario_modulo',
          P_V_CODIGO: 'EM00',
          P_V_USUARIO: sessionStorage.getItem("usuario"),
        }
      }).then(({ data }) => {
        $scope.permisosValidos = data.Acciones
          .filter((accion) => Boolean(accion.Permisos))
          .map((accion) => accion.Codigo)
      });
    }


    $scope.permisos();

    $scope.infomacionFormulario();

    $scope.formatDatefecha = function (date) {
      var d = new Date(date);
      var dd = ("0" + d.getDate()).slice(-2);
      var mm = ("0" + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    }

    $scope.ListadoEventosMate = function (proceso, fecha, tipoPerdida, claseEvento) {
      // if (proceso == "" || fecha == "" || tipoPerdida == "" || claseEvento == "") {
      //   swal('Campos Vacios', 'Por favor complete los campos para filtrar', 'warning');
        
      // }else{
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'listado_grilla_eventos_materializado',
          fecha: fecha == '' ? "" : $scope.formatDatefecha(fecha),
          proceso,
          tipoPerdida,
          claseEvento
        }
      }).then(({ data }) => {
        swal.close();
        $scope.listadoEventos = data;
      });
    // }



  }

  $scope.ListadoEventosMate('','','','')


  $scope.exportarArchivo = function () {
  if (!$scope.listadoEventos) {
      swal({
        title: "Info",
        text: "No hay datos para exportar",
        type: "info",
      })
    } else {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });  
      var ws = XLSX.utils.json_to_sheet($scope.listadoEventos);
      /* add to workbook */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
      /* write workbook and force a download */
      XLSX.writeFile(wb, "Eventos Materializados.xls");
      const text = `Registros encontrados ${$scope.listadoEventos.length}`
      swal.close()
      swal('¡Mensaje!', text, 'success').catch(swal.noop);
      
    }
}

    // $scope.ListadoEventos()

    $scope.editarEvento = function (editarData) {
      const [, userCreate, , cargo, , dateCreate] = editarData.DATOS_REGISTRO.split('-')
      editarData.DATOS_REGISTRO == 'OASIS' ? $scope.userCreate = 'OASIS'  : $scope.userCreate = userCreate.trim()
      editarData.DATOS_REGISTRO == 'OASIS' ? $scope.userCargo = 'OASIS' : $scope.userCargo = cargo.trim()
      editarData.DATOS_REGISTRO == 'OASIS' ? $scope.userDateCreate = 'OASIS' : $scope.userDateCreate = dateCreate
      $scope.editMode = true;
      $scope.menu = 'formularioEventos';
      $scope.formulario.numeroReferencia.value = Number(editarData.REFERENCIA);
      $scope.formulario.proceso.value = editarData.PROCESO
      $scope.formulario.fechaDescubrimiento.value = new Date(editarData.FECHA_DESCUBRIMIENTO)

      $scope.formulario.fechaInicio.value = new Date(editarData.FECHA_INICIO)
      $scope.formulario.fechaFinalizacion.value = new Date(editarData.FECHA_FINALIZACION)
      $scope.formulario.descripcion.value = editarData.DESCRIPCION_EVENTO
      $scope.formulario.productoAfectado.value = editarData.PRODUCTO_SERVICIO_AFECTADO
      $scope.formulario.claseEvento.value = editarData.CLASE_EVENTO
      $scope.formulario.tipoPerdida.value = editarData.TIPO_PERDIDA
      $scope.formulario.divisa.value = editarData.DIVISA
      $scope.formulario.cuantia.value = Number(editarData.CUANTIA)
      $scope.formulario.cuantiaTotalRecuperada.value = Number(editarData.CUANTIA_TOTAL_RECUPERADA)
      $scope.formulario.cuantiaRecuperadaSeguros.value = Number(editarData.CUANTIA_RECUPERADA_SEGUROS)
      $scope.formulario.cuentaPlanAfectada.value = editarData.CUENTAS_PLAN_CUENTAS_AFECTADAS
      $scope.formulario.fechaContabilizacion.value = new Date(editarData.FECHA_CONTABILIZACION)
      $scope.formulario.PlanDeAccion.value = editarData.PLAN_DE_ACCION
    }

    $scope.enviarFormulario = function () {
      const formularioValido = $scope.validarFormulario();

      if (!formularioValido) {
        swal('Información', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
        $scope.camposInvalidos()
        return
      }

      const valorFormulario = $scope.valorFormulario()
      $scope.disabledButton = true;
      const datosRegistros = JSON.parse(sessionStorage.getItem("inicio_perfil"));

      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_POST_GUARDAR_EVENTO_MATERIALIZADO',
          P_V_NUMERO_REFERENCIA: valorFormulario.numeroReferencia,
          P_V_ESTADO: "A",
          P_V_PROCESO: valorFormulario.proceso,
          P_D_FECHA_DESCUBRIMIENTO: $scope.parseDateSend(valorFormulario.fechaDescubrimiento),
          P_D_FECHA_INICIO: $scope.parseDateSend(valorFormulario.fechaInicio),
          P_D_FECHA_FINALIZACION: $scope.parseDateSend(valorFormulario.fechaFinalizacion),
          P_V_DESCRIPCION_EVENTO: valorFormulario.descripcion,
          P_V_PRODUCTO_SERVICIO_AFECTADO: valorFormulario.productoAfectado,
          P_V_CLASE_EVENTO: valorFormulario.claseEvento,
          P_V_TIPO_PERDIDA: valorFormulario.tipoPerdida,
          P_V_DIVISA_ID: valorFormulario.divisa,
          P_I_CUANTIA: valorFormulario.cuantia,
          P_I_CUANTIA_TOTAL_RECUPERADA: valorFormulario.cuantiaTotalRecuperada,
          P_I_CUANTIA_RECUPERADA_SEGUROS: valorFormulario.cuantiaRecuperadaSeguros,
          P_V_CUENTAS_PLAN_CUENTAS_AFECTADAS: valorFormulario.cuentaPlanAfectada,
          P_D_FECHA_CONTABILIZACION: $scope.parseDateSend(valorFormulario.fechaContabilizacion),
          P_V_DATOS_REGISTRO: 'Nombre - ' + datosRegistros.nombre + '- Cargo - ' + datosRegistros.cargo + '- Fecha registro - ' + new Date().toLocaleString(),
          P_V_USUARIO_CREACION: sessionStorage.getItem("usuario"),
          p_v_plan_de_accopm: valorFormulario.PlanDeAccion,
        }
      })
        .then(({ data, config }) => {
          if (data.codigo == 0) {
            $scope.menu = 'tablaEventos';
            $scope.ListadoEventos();
            $scope.limpiarFormulario();
            swal('Información', data.mensaje, 'success');
          } else {
            swal('Información', data.mensaje, 'error');
          }
          $scope.disabledButton = false;
        })
    }

    $scope.convertirMonedaPesos = function (keyForm) {
      const valueMoneda = Number(`${$scope.formulario[keyForm].value}`.replace('$', '').replace(/,/g, '').replace(/\./, ''));
      if ($scope.formulario['divisa'].value == '0') {
        return valueMoneda.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) ?? 0;
      } else {
        return valueMoneda.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 0;
      }
    }

    $scope.parseDate = function (date) {
      if (date) {
        return new Date(date).toLocaleString();
      }else{
        return ""
      }
    }

    $scope.parseDateSend = function (date) {
      return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString().split(' ')[0]
    }

    $scope.validarFormulario = function () {
      return Object.values($scope.formulario).some(({ required, value }) => {
        if (required) {
          if (!!value || value < 0) {
            return true
          }
        } else {
          return false
        }
      })
    }

    $scope.camposInvalidos = function () {
      return Object.entries($scope.formulario).forEach(([key, value]) => {
        if (value.required) {
          if (value.value != '' && value.value != null && value.value != undefined) {
            $scope.formulario[key]['invalid'] = false
          } else {
            if (key == 'cuantia' || key == 'cuantiaTotalRecuperada' || key == 'cuantiaRecuperadaSeguros') {
              if (value.value === 0) {
                $scope.formulario[key]['invalid'] = false
              } else {
                $scope.formulario[key]['invalid'] = true
              }
            } else {
              $scope.formulario[key]['invalid'] = true
            }
          }
        } else {
          $scope.formulario[key]['invalid'] = false
        }
      })
    }

    $scope.validarCampo = function (campo) {
      const campoForm = $scope.formulario[campo]
      if (campoForm.required) {
        if (campoForm.value != '' && campoForm.value != null && campoForm.value != undefined) {
          $scope.formulario[campo]['invalid'] = false
        } else {
          if (campoForm.value === 0) {
            $scope.formulario[campo]['invalid'] = false

          } else {
            $scope.formulario[campo]['invalid'] = true

          }
        }
      } else {
        $scope.formulario[campo]['invalid'] = false
      }
    }

    $scope.valorFormulario = function () {
      const valorForm = {}
      Object.entries($scope.formulario).forEach(([key, value]) => {
        valorForm[key] = value.value;

        if (value.value) {
          $scope.formulario[key]['invalid'] = false
        }
      })
      return valorForm;
    }

    $scope.limpiarFormulario = function () {
      $scope.editMode = false
      Object.entries($scope.formulario).forEach(([key, value]) => {
        if (key == 'numeroReferencia') {
          $scope.formulario[key].value = 0;
        } else {
          $scope.formulario[key].value = '';
        }
      })
    }
  }]);
