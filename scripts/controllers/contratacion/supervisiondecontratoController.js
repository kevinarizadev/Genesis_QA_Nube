"use strict";angular
  .module("GenesisApp")
  .controller("supervisiondecontratoController", ["$scope","$http","$window",function ($scope, $http, $window) {
      // *********** FUNCTION DE INICIO *************
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem("cedula");
        var cargo = JSON.parse(sessionStorage.getItem('inicio_perfil'));
        $scope.cargo = cargo.cod_cargo;
        if($scope.cargo == '178'){
          $scope.show_tab_administracion = true;
        }else{
          $scope.show_tab_administracion = false;
        }
        $scope.SysDay = new Date();
        $scope.evaluacionInicial = false;
        $scope.vistaConsulta = true;
        $scope.vistaconsultaContrato = false;
        $scope.vistanuevaSupervision = false;
        $scope.visualTable = false;
        $scope.visualtableDetalle = false;
        $scope.iniciarprocesodeEvaluacion = false;
        $scope.vistaResulto = false;
        $scope.vistaUpdate = false;
        $scope.calcularResultado = false;
        $scope.vistapreguntasUpdate = false;
        $scope.vistarespuestaUpdate = false;
        $scope.show_tab_inicio = true;
        $scope.show_tablasupersotesActual = false;
        $scope.show_tablasupersotesSuplentes = false;
        $scope.listconsultasupervisorActual =[];
        $scope.listconsultasupervisoSuplente = [];
        $scope.lista_Contrato = [];
        $scope.listaprocesosedit1 = [];
        $scope.listaprocesosedit2 = [];
        $scope.lista_pregunta_procesos = [];
        // $scope.id_codigoProceso = '';
        $scope.function_p_obtener_ips_supervisor();
        $scope.function_p_obtener_consol();
        $scope.limpiar("nuevasuper");
        $scope.limpiar("form1");
        $scope.limpiar("result");
        $scope.limpiar("editresult");
        $scope.limpiar("edit");
        $scope.limpiar("consulta");
        $(".modal").modal();
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10,
        };
        $scope.list_DatosTemp = [];
        // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        $scope.maxDate = yyyy + "-" + mm + "-" + dd;
        // Collapsible materializecss
        document.addEventListener("DOMContentLoaded", function () {
          var elems = document.querySelectorAll(".collapsible");
          var instances = M.Collapsible.init(elems, options);
        });
        $(document).ready(function () {
          $(".collapsible").collapsible();
        });
        // Collapsible materializecss
        setTimeout(() => {
          $("#tabs_1").click();
        }, 500);
      };
      $scope.limpiar = function (fun) {
        switch (fun) {
          case "nuevasuper":
            $scope.nuevasuper = {
              fecha_Vista: "",
              prestadorSupervisado: "",
              nombreContratista: "",
              selecRegimen: "",
              regional: "",
              numeroDocumento: "",
              representante_prestador: "",
              cargo_repredentante: "",
              observaciones: "",
            };
            break;
          case "form1":
            $scope.lista_pregunta_procesos = [];
            $scope.listaContrato = [];
            $scope.listaConsulta = [];
            $scope.form1 = {
              prestadorSupervisado: "",
              nombreContratista: "",
              fecha_Vista: "",
              selecRegimen: "",
              super_cajacopi: "",
              regional: "",
              numeroDocumento: "",
              representante_prestador: "",
              cargo_repredentante: "",
              supervisor_cajacopi: "",
              represante_prestador: "",
              cargo_representante: "",
              numero_contrato: "",
              objeto: "",
              fechainicio: "",
              fechafinal: "",
              formato_pago: "",
              valor: "",
              tipo_garantia: "",
              vigencia_garantia: "",
              observaciones: "",
              observacionesResult1: "",
              observacionesResult2: "",
            };
            break;
          case "form2":
            $scope.form2 = {
              nombre_prest_consulta: "",
            };
            break;
          case "result":
            $scope.result = {
              proceso1: "",
              proceso2: "",
              proceso3: "",
              proceso4: "",
              proceso5: "",
              proceso6: "",
              proceso7: "",
              total: "",
              calificacion: "",
            };
            break;
          case "edit":
            $scope.listaContrato = [];
            $scope.listaConsulta = [];
            $scope.edit = {
              prestadorSupervisado: "",
              nombreContratista: "",
              fecha_Vista: "",
              selecRegimen: "",
              super_cajacopi: "",
              regional: "",
              numeroDocumento: "",
              representante_prestador: "",
              cargo_repredentante: "",
              supervisor_cajacopi: "",
              represante_prestador: "",
              cargo_representante: "",
              numero_contrato: "",
              objeto: "",
              fechainicio: "",
              fechafinal: "",
              formato_pago: "",
              valor: "",
              tipo_garantia: "",
              vigencia_garantia: "",
              observaciones: "",
              observacionesResult1: "",
              observacionesResult2: "",
            };
            break;
          case "editresult":
            $scope.editresult = {
              proceso1: "",
              proceso2: "",
              proceso3: "",
              proceso4: "",
              proceso5: "",
              proceso6: "",
              proceso7: "",
              total: "",
              calificacion: "",
            };
            break;
            case "consulta":
              $scope.listconsultasupervisorActual =[];
              $scope.listconsultasupervisoSuplente = [];
              $scope.consulta = {
                numeroDocumento: "",
                selecTipo: "",
                nombreFuncionario: "",
                cargoSupervisor: "",
                nombrefuncionarioActual: "",
                documentosupervisorActual: "",
                nombresuncionarioSumplente: "",
                documentosupervisorSumplente: "",
              };
              break;
          default:
        }
      };
      $scope.function_bucarSupervision = function (dato) {
        $scope.limpiar("form2");
        $scope.function_consulta_Contrato(dato);
        $scope.vistaConsulta = false;
        $scope.vistaconsultaContrato = true;
      };
      $scope.function_obtener_supervision_detalle = function (data) {
        if (data.ID_PROCESO == "" || data.ID_PROCESO == null) {
          swal({
            title: "Notificación",
            text: "!Por favor ingrese el nombre o numero del prestador a consultar!",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_SUPERVISION_DETALLE",
              vpnit: data.NIT,
              vpidproceso: data.ID_PROCESO,
            },
          }).then(function ({ data }) {
  
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              $scope.listaconsultaDetalle = data;
              $scope.visualTable = false;
              $scope.visualtableDetalle = true;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.function_consulta_Contrato = function (data) {
        if (data.CODIGO == "" || data.CODIGO == null) {
          swal({
            title: "Notificación",
            text: "!Por favor ingrese el nombre o numero del prestador a consultar!",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_SUPERVISION_FINAL",
              vpnit: data.CODIGO,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              $scope.listaconsultaContrato = data;
              $scope.visualTable = true;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.function_controlVista = function (vista){
        if(vista == 'vistaconsultaContrato'){
         $scope.visualtableDetalle = false;
         $scope.vistaconsultaContrato = true;
         $scope.visualTable = true;
        }
       }
      $scope.function_p_obtener_consol = function () {
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_CONSOL",
            vpinterventor: $scope.responsable,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.listaConsolidado = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_p_obtener_ips_supervisor = function () {
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_IPS_SUPERVISOR",
            vpinterventor: $scope.responsable,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.lista_Contrato = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_CALCULA_ROL",
            vdocumento: $scope.responsable,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.tipodeRol = data.Nombre;
            if(data.Nombre == 'SUPERVISOR'){
              $scope.show_supervisorRol = true;
            }else{
              $scope.show_supervisorRol = false;
              $scope.show_numeroProceso = true;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_nuevaSupervision = function (dato) {
        $scope.limpiar("form1");
        $scope.function_p_obtener_ips_supervision(dato);
        $scope.listContrato = [];
        $scope.vistaConsulta = false;
        $scope.vistaconsultaContrato = false;
        $scope.vistanuevaSupervision = true;
      };
      $scope.function_p_obtener_ips_supervision = function (data) {
        if (data.CODIGO == "" || data.CODIGO == null) {
          swal({
            title: "Notificación",
            text: "!Por favor ingrese el nombre o numero del prestador a consultar!",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_IPS_SUPERVISION",
              valorNit: data.CODIGO,
            },
          }).then(function ({ data }) {
            // console.log('linea 293',data)
            if (data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              $scope.nuevasuper.prestadorSupervisado = data[0].CODIGO;
              $scope.nuevasuper.nombreContratista = data[0].NOMBRE;
              $scope.nuevasuper.regional = data[0].REGIONAL;
              $scope.codigoubicacionLsitacontrato = data[0].COD_REGIONAL;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      };
      $scope.function_optener_contrato_Total = function () {
        $scope.listContrato = [];
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_CONTRATOS",
            vpdocumento: $scope.nuevasuper.selecRegimen,
            vpnit: $scope.nuevasuper.prestadorSupervisado,
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data.Codigo == 1){
              swal({
                title: "INFORMACION",
                text: data.Nombre,
                type: "info",
              }).catch(swal.noop);
            }else{
              $scope.listContrato = data;
              $scope.nuevasuper.observaciones = data[0].SERVCIOS;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_validar_informacion = function () {
          if ($scope.nuevasuper.fecha_Vista == "" || $scope.nuevasuper.fecha_Vista == undefined || $scope.nuevasuper.fecha_Vista == null|| $scope.nuevasuper.selecRegimen == "" || $scope.nuevasuper.prestadorSupervisado == "" || $scope.nuevasuper.representante_prestador == "" || $scope.nuevasuper.cargo_repredentante == "" ) {
            swal("Importante", "Complete los campos requeridos (*)", "info");
            let elementosAValidar = [
              {
                Codigo: "1",
                id_label: "id_nuevasuper_fecha_Vista_label",
                id_input: "id_nuevasuper_fecha_Vista",
              },
              {
                Codigo: "2",
                id_label: "id_nuevasuper_selecRegimen_label",
                id_input: "id_nuevasuper_selecRegimen",
              },
              {
                Codigo: "3",
                id_label: "id_nuevasuper_numeroDocumento_label",
                id_input: "id_nuevasuper_numeroDocumento",
              },
              {
                Codigo: "4",
                id_label: "id_nuevasuper_representante_prestador_label",
                id_input: "id_nuevasuper_representante_prestador",
              },
              {
                Codigo: "5",
                id_label: "id_nuevasuper_cargo_repredentante_label",
                id_input: "id_nuevasuper_cargo_repredentante",
              }
              
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          } else {
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea seguir con el proceso de supervision?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                $scope.iniciarprocesodeEvaluacion = true;
                $scope.vistanuevaSupervision = false;
                setTimeout(() => {
                  $scope.function_p_obtener_preguntas_inicial();
                  $scope.$apply();
                }, 50);
              }
            });
          }
      };
      $scope.function_p_obtener_preguntas_inicial = function () {
        $scope.evaluacionInicial = true;
        $scope.lista_pregunta_procesos = [];
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_PREGUNTAS",
            vpproceso: 1,
          },
        }).then(function ({data}) {
          // console.log('linea 374',data);
          if (data && data.toString().substr(0, 3) != "<br") {
            data.forEach((element) => {
              if ($scope.lista_pregunta_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO) == -1) {
                $scope.lista_pregunta_procesos.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  PREGUNTAS: [
                    {
                      CODIGO_PROCESO: element.CODIGO_PROCESO,
                      NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                      CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                      NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                      SELECT: "",
                      OBSERVACION: "",
                    },
                  ],
                });
              } else {
                $scope.lista_pregunta_procesos[$scope.lista_pregunta_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO)].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: "",
                  OBSERVACION: "",
                });
              }
            });
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_guardarPregunta_inicial = function (codProceso){
        if(codProceso == 1){
         $scope.id_codigoProceso = '';
        }
        let datos = [];
        let vacioEncontrados = 0;
        $scope.lista_pregunta_procesos.forEach((x) => {
          x.PREGUNTAS.forEach((y) => {
            if (y.SELECT == "" ||((y.SELECT == "1" || y.SELECT == "2" || y.SELECT == "3") &&(y.OBSERVACION == "" || y.OBSERVACION == undefined))) {
              vacioEncontrados = vacioEncontrados + 1;
              document.getElementById('insert'+ x.CODIGO_PROCESO).style.display ="block";
            let elementosAValidar = [
              {
                Codigo: y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
                id_label: 'insert' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'label',
                id_input: 'insert' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
              },
              {
                Codigo:  y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
                id_label: 'insert' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'obs_label',
                id_input: 'insert' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'obs',
              }
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            } else {
              datos.push({
                CODIGO_PROCESO: y.CODIGO_PROCESO,
                CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                SELECT: y.SELECT,
                OBSERVACION: y.OBSERVACION,
              });
            }
          });
          $scope.contPreguntas = datos.length;
        });
        if (vacioEncontrados == 0) {
          swal({
            title: "IMPORTANTE",
            text: "¿Esta seguro que desea calcular el contrato?",
            type: "question",
            showCancelButton: true,
          }).then((result) => {
            if (result) {
                $http({
                  method: "POST",
                  url: "php/contratacion/supervisiondecontrato.php",
                  data: {
                    function: "P_UI_SUPERVISION_2",
                    vpdocumento: $scope.nuevasuper.selecRegimen,
                    vpnit: $scope.nuevasuper.prestadorSupervisado,
                    vpregional: $scope.codigoubicacionLsitacontrato,
                    vpfechavisita: $scope.formatDatefecha($scope.nuevasuper.fecha_Vista),
                    vpcedulasupervisorips: $scope.nuevasuper.numeroDocumento,
                    vprepresentanteips: $scope.nuevasuper.representante_prestador,
                    vpcargorepreentante: $scope.nuevasuper.cargo_repredentante,
                    vpobservacion: $scope.nuevasuper.observaciones,
                    vpaccion: "I",
                    vpcantidadpreguntas: datos.length,
                    vpidproceso: $scope.id_codigoProceso,
                    // El JSON,toString sirve apara tomar un array y enviarlo como json
                    vjsonpreguntas: JSON.stringify(datos),
                  },
                }).then(function ({ data }) {
                  $scope.id_codigoProceso = data.Renglon;
                  // console.log('linea 598 function_guardarPregunta_inicial',data);
                  if (data && data.toString().substr(0, 3) != "<br") {
                    if( data.Proceso == 7 && $scope.tipodeRol == 'SUPLENTE' ){
                      swal({
                        title: "INFORMACION",
                        text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
                        type: "success",
                      }).catch(swal.noop);
                      setTimeout(() => {
                        $scope.Inicio();
                        $scope.$apply();
                      }, 1000);
                      return;
                    }else{
                    $scope.function_generar_Preguntas(data.Proceso,data.Renglon);
                    swal({
                      title: "Proceso de supervision",
                      text: "Guardado con exito",
                      type: "success",
                    }).catch(swal.noop);
                    $scope.lista_pregunta_procesos = "";
                  }
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: data,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                });
            }
          });
            }else{
              setTimeout(() => {
                swal("Importante","Complete los campos requeridos (*)", "info");
                $scope.$apply();
          },1000)
          return;
          }
      }
      $scope.function_generar_Preguntas = function (codProceso,idproceso) {
        // console.log(codProceso,'-',idproceso);
        let numero = '1';
        $scope.secuencia =  Number.parseInt(codProceso) + Number.parseInt(numero);
        if($scope.secuencia == 8 && $scope.tipodeRol == 'SUPERVISOR'){
          $scope.calcularResultado = true;
          $scope.evaluacionInicial = false;
          return;
        }
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_PREGUNTAS",
            vpproceso: $scope.secuencia,
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.lista_pregunta_procesos = [];
            data.forEach((element) => {
              if ($scope.lista_pregunta_procesos.findIndex((e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO) == -1) {
                $scope.lista_pregunta_procesos.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  PREGUNTAS: [
                    {
                      CODIGO_PROCESO: element.CODIGO_PROCESO,
                      NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                      CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                      NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                      SELECT: "",
                      OBSERVACION: "",
                    },
                  ],
                });
              } else {
                $scope.lista_pregunta_procesos[
                  $scope.lista_pregunta_procesos.findIndex(
                    (e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO
                  )
                ].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: "",
                  OBSERVACION: "",
                });
              }
            });
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_calcula_Resultado = function () {
        let idproceso = $scope.id_codigoProceso !== undefined ? $scope.id_codigoProceso : $scope.id_proceso_Editar;
        // console.log('linea 704 function_calcula_Resultado','$scope.id_codigoProceso','=',$scope.id_codigoProceso,'$scope.id_proceso_Editar','=', $scope.id_proceso_Editar);
        // console.log('linea 705 function_calcula_Resultado','-','idproceso','=',idproceso);
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_CALCULA_RESULTADO",
              vpidproceso: idproceso,
            },
          }).then(function ({data}) {
            if ( data && data.toString().substr(0, 3) != "<br") {
              swal.close();
              swal({
                title: "Resumen de la supervision",
                text: "Datos Calculados",
                type: "success",
              }).catch(swal.noop);
              $scope.vistapreguntasUpdate = false;
              $scope.function_vistade_Resultado($scope.id_codigoProceso);
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
      };
      $scope.function_vistade_Resultado = function (codiProceso) {
        // if (data == "U") {
        //   $scope.iniciarprocesodeEvaluacion = false;
        //   $scope.vistapreguntasUpdate = false;
        //   $scope.vistarespuestaUpdate = true;
        //   $scope.function_optener_Resultado("U");
        // }
        // if (data == "I") {
          $scope.iniciarprocesodeEvaluacion = false;
          $scope.vistanuevaSupervision = false;
          $scope.vistaResulto = true;
          $scope.function_optener_Resultado(codiProceso);
        // }
      };
      $scope.function_optener_Resultado = function (accion) {
        var idproceso = $scope.id_codigoProceso !== undefined ? $scope.id_codigoProceso : $scope.id_proceso_Editar;
          swal({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_RESULTADO",
              vpidproceso: idproceso,
            },
          }).then(function (response) {
            if (
              response.data &&
              response.data.toString().substr(0, 3) != "<br"
            ) {
              swal.close();
              $scope.result.proceso1 = response.data[0].PROCESO_1;
              $scope.result.proceso2 = response.data[0].PROCESO_2;
              $scope.result.proceso3 = response.data[0].PROCESO_3;
              $scope.result.proceso4 = response.data[0].PROCESO_4;
              $scope.result.proceso5 = response.data[0].PROCESO_5;
              $scope.result.proceso6 = response.data[0].PROCESO_6;
              $scope.result.proceso7 = response.data[0].PROCESO_7;
              $scope.result.total = response.data[0].TOTAL;
              $scope.result.calificacion = response.data[0].CALIFICACION;
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        // }
      };
      $scope.function_guardarprocesoUpdate = function(codProceso){
        // console.log('function_guardarprocesoUpdate',codProceso);
      let idproceso = $scope.id_codigoProceso !== undefined ? $scope.id_codigoProceso : $scope.id_proceso_Editar ;
      // console.log(idproceso);
      let datos = [];
      let vacioEncontrados = 0;
      $scope.listaprocesosedit1.forEach((x) => {
        x.PREGUNTAS.forEach((y) => {
          if (y.select == "" ||((y.select == "1" || y.select == "2" || y.select == "3") &&(y.Observacion == "" || y.Observacion == undefined))) {
            vacioEncontrados = vacioEncontrados + 1;
            document.getElementById(x.Cod_proceso).style.display ="block";
          let elementosAValidar = [
            {
              Codigo: y.Cod_proceso + '_' + y.Cod_pregunta,
              id_label:  y.Cod_proceso + '_' + y.Cod_pregunta,
              id_input:  y.Cod_proceso + '_' + y.Cod_pregunta,
            },
            {
              Codigo:  y.Cod_proceso + '_' + y.Cod_pregunta,
              id_label:  y.Cod_proceso + '_' + y.Cod_pregunta,
              id_input:  y.Cod_proceso + '_' + y.Cod_pregunta,
            }
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          } else {
            if(y.Cod_proceso == codProceso){

              datos.push({
                CODIGO_PROCESO: y.Cod_proceso,
                CODIGO_PREGUNTA: y.Cod_pregunta,
                SELECT: y.select,
                OBSERVACION: y.Observacion,
              });
            }
          }
        });
        $scope.contPreguntas = datos.length;
      });
      if (vacioEncontrados == 0) {
      swal({
        title: "IMPORTANTE",
        text: "¿Esta seguro que desea calcular el contrato?",
        type: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result) {
            $http({
              method: "POST",
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: "P_UI_SUPERVISION_2",
                vpdocumento: $scope.nuevasuper.selecRegimen,
                vpnit: $scope.nuevasuper.prestadorSupervisado,
                vpregional: $scope.codigoubicacionLsitacontrato,
                vpfechavisita: '',
                vpcedulasupervisorips: $scope.nuevasuper.numeroDocumento,
                vprepresentanteips: $scope.nuevasuper.representante_prestador,
                vpcargorepreentante: $scope.nuevasuper.cargo_repredentante,
                vpobservacion: $scope.nuevasuper.observaciones,
                vpaccion: "U",
                vpcantidadpreguntas: $scope.contPreguntas,
                vpidproceso: idproceso || codProceso,
                // El JSON,toString sirve apara tomar un array y enviarlo como json
                vjsonpreguntas: JSON.stringify(datos),
              },
            }).then(function ({ data }) {
              // console.log(data);
              if( $scope.numeroproceso != codProceso){
                // console.log('fila 694 $scope.numeroproceso != codProceso');
                $scope.function_actualizarprocesoSupervision(data.Renglon);
            
              }if (data && data.toString().substr(0, 3) != "<br") {
                swal({
                  title: "Proceso de supervision",
                  text: "Guardado con exito",
                  type: "success",
                }).catch(swal.noop);
                $scope.lista_procesos = "";
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          
        }
      });
          }else{
            setTimeout(() => {
              swal("Importante","Complete los campos requeridos (*)", "info");
              $scope.$apply();
        },1000)
      return;
       }
      }
      $scope.function_generar_PreguntasUpdate = function (accion) {
        var numero1 = '1';
        var numero2 = accion;
        $scope.secuencia =  Number.parseInt(numero1) + Number.parseInt(numero2);
        if($scope.secuencia == 8 && $scope.tipodeRol == 'SUPERVISOR'){
          $scope.calcularResultado = true;
          return;
        }
        if( $scope.secuencia == 8 && $scope.tipodeRol == 'SUPLENTE' ){
          swal({
            title: "INFORMACION",
            text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
            type: "success",
          }).catch(swal.noop);
          setTimeout(() => {
            $scope.Inicio();
            $scope.$apply();
          }, 2000);
          return;
          
        }else{
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_PREGUNTAS",
            vpproceso: $scope.secuencia,
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.listaprocesosedit2 = [];
            response.data.forEach((element) => {
              if (
                $scope.listaprocesosedit2.findIndex(
                  (e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO
                ) == -1
              ) {
                $scope.listaprocesosedit2.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  PREGUNTAS: [
                    {
                      CODIGO_PROCESO: element.CODIGO_PROCESO,
                      NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                      CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                      NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                      SELECT: "",
                      OBSERVACION: "",
                    },
                  ],
                });
              } else {
                $scope.listaprocesosedit2[
                  $scope.listaprocesosedit2.findIndex(
                    (e) => e.CODIGO_PROCESO == element.CODIGO_PROCESO
                  )
                ].PREGUNTAS.push({
                  CODIGO_PROCESO: element.CODIGO_PROCESO,
                  NOMBRE_PROCESO: element.NOMBRE_PROCESO,
                  CODIGO_PREGUNTA: element.CODIGO_PREGUNTA,
                  NOMBRE_PREGUNTA: element.NOMBRE_PREGUNTA,
                  SELECT: "",
                  OBSERVACION: "",
                });
              }
            });
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      };
      $scope.function_guardarpreguntasUpdate = function(codoProceso){
        let idproceso = $scope.id_codigoProceso !== undefined ? $scope.id_codigoProceso : $scope.id_proceso_Editar;
        // console.log('linea 1011 function_calcula_Resultado','$scope.id_codigoProceso','=',$scope.id_codigoProceso,'$scope.id_proceso_Editar','=', $scope.id_proceso_Editar);
        // console.log('linea 1012 function_calcula_Resultado','-','idproceso','=',idproceso);
        let datos = [];
        let vacioEncontrados = 0;
        if($scope.secuencia== '8' && $scope.tipodeRol != 'SUPERVISOR'){
          swal({
            title: "INFORMACION",
            text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
            type: "success",
          }).catch(swal.noop);
          setTimeout(() => {
            $scope.Inicio();
            $scope.$apply();
          }, 1000);
          $scope.show_numeroProceso = false;
          return
        }else{
          // $scope.calcularResultado = true;
          $scope.show_supervisorRol = true;
          $scope.show_numeroProceso = true;
        }
        $scope.listaprocesosedit2.forEach((x) => {
          x.PREGUNTAS.forEach((y) => {
            if (y.SELECT == "" ||((y.SELECT == "1" || y.SELECT == "2" || y.SELECT == "3") &&(y.OBSERVACION == "" || y.OBSERVACION == undefined))) {
              vacioEncontrados = vacioEncontrados + 1;
              document.getElementById('update'+ x.CODIGO_PROCESO).style.display ="block";
              let elementosAValidar = [
                {
                  Codigo: y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
                  id_label: 'update' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'label',
                  id_input: 'update' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
                },
                {
                  Codigo:  y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA,
                  id_label: 'update' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'obs_label',
                  id_input: 'update' + y.CODIGO_PROCESO + '_' + y.CODIGO_PREGUNTA+'obs',
                }
              ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            } else {
              datos.push({
                CODIGO_PROCESO: y.CODIGO_PROCESO,
                CODIGO_PREGUNTA: y.CODIGO_PREGUNTA,
                SELECT: y.SELECT,
                OBSERVACION: y.OBSERVACION,
              });
            }
          });
          $scope.contPreguntas = datos.length;
        });
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro que desea calcular el contrato?",
          type: "question",
          showCancelButton: true,
        }).then((result) => {
          if (result) {
            if (vacioEncontrados == 0) {
              $http({
                method: "POST",
                url: "php/contratacion/supervisiondecontrato.php",
                data: {
                  function: "P_UI_SUPERVISION_2",
                  vpdocumento: $scope.nuevasuper.selecRegimen,
                  vpnit: $scope.nuevasuper.prestadorSupervisado,
                  vpregional: $scope.codigoubicacionLsitacontrato,
                  vpfechavisita: '',
                  vpcedulasupervisorips: $scope.nuevasuper.numeroDocumento,
                  vprepresentanteips: $scope.nuevasuper.representante_prestador,
                  vpcargorepreentante: $scope.nuevasuper.cargo_repredentante,
                  vpobservacion: $scope.nuevasuper.observaciones,
                  vpaccion: "I",
                  vpcantidadpreguntas: datos.length,
                  vpidproceso:idproceso,
                  // El JSON,toString sirve apara tomar un array y enviarlo como json
                  vjsonpreguntas: JSON.stringify(datos),
                },
              }).then(function ({ data }) {
                // console.log(data);
                $scope.function_actualizarprocesoSupervision(data.Renglon);
                $scope.function_generar_PreguntasUpdate(data.Proceso);
                if (data && data.toString().substr(0, 3) != "<br") {
                  $scope.lista_procesos = "";
                  $scope.listaprocesosedit2 = [];
                  if( data.Proceso == 7 && $scope.tipodeRol == 'SUPLENTE' ){
                    swal({
                      title: "INFORMACION",
                      text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
                      type: "success",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.Inicio();
                      $scope.$apply();
                    }, 1000);
                    return;
                  }else{
                  // if(data.Proceso== '7' && $scope.tipodeRol != 'SUPERVISOR'){
                  //   swal({
                  //     title: "INFORMACION",
                  //     text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
                  //     type: "success",
                  //   }).catch(swal.noop);
                  //   setTimeout(() => {
                  //     $scope.Inicio();
                  //     $scope.$apply();
                  //   }, 1000);
                  //   $scope.show_numeroProceso = false;
                  //   return
                  // }else{
                  //   // $scope.calcularResultado = true;
                  //   $scope.show_supervisorRol = true;
                  //   $scope.show_numeroProceso = true;
                  // }

               
                  swal({
                    title: "Proceso de supervision",
                    text: "Guardado con exito",
                    type: "success",
                  }).catch(swal.noop);
                 
                  }
        
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              });
            }else{
                    setTimeout(() => {
                      swal("Importante","Complete los campos requeridos (*)", "info");
                      $scope.$apply();
                },1000)
              return;
            }
          }
        });
      }
      $scope.function_editarSupervision = function (info) {
        // console.log('line 1124 function_editarSupervision',info);
        $scope.id_proceso_Editar = info.ID_PROCESO;
        $scope.show_numeroProceso = true;
        let num_proceso = info.PROCESO;
        if(num_proceso == '8' && $scope.tipodeRol != 'SUPERVISOR'){
          swal({
            title: "INFORMACION",
            text: 'Has terminado el proceso de supervison por favor informar a su supervisor',
            type: "success",
          }).catch(swal.noop);
          setTimeout(() => {
            $scope.Inicio();
            $scope.$apply();
          }, 1000);
          $scope.show_numeroProceso = false;
          return
        }else{
          $scope.show_supervisorRol = true;
          $scope.show_numeroProceso = true;
        }
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_OBTENER_SUPERVISION_3",
            vpproceso: $scope.id_proceso_Editar ,
          },
        }).then(function ({ data }) {
          $scope.procesoActual = 0;
          let max = 0;
          data.detalle.forEach((x) => {
            let xx = x.Cod_proceso;
            if ($scope.procesoActual < xx) {
              max = xx ;
            }
            $scope.procesoActual = xx;
          });
          $scope.vistaConsulta = false;
          $scope.vistapreguntasUpdate = true;
          $scope.function_generar_PreguntasUpdate($scope.procesoActual);

          data.detalle.forEach(element => {
            if (($scope.listaprocesosedit1.findIndex((e) => e.Cod_proceso == element.Cod_proceso)) == -1) {
              $scope.listaprocesosedit1.push({"Cod_proceso": element.Cod_proceso, "Nombre_proceso": element.Nombre_proceso,
                PREGUNTAS: [{
                  Cod_proceso: element.Cod_proceso,
                  Nombre_proceso: element.Nombre_proceso,
                  Cod_pregunta: element.Cod_pregunta,
                  Nombre_pregunta: element.Nombre_pregunta,
                  select: element.Respuesta,
                  Observacion: element.Observacion
                }]
              });
            } else {
              $scope.listaprocesosedit1[$scope.listaprocesosedit1.findIndex((e) => e.Cod_proceso == element.Cod_proceso)].PREGUNTAS.push({
                Cod_proceso: element.Cod_proceso,
                Nombre_proceso: element.Nombre_proceso,
                Cod_pregunta: element.Cod_pregunta,
                Nombre_pregunta: element.Nombre_pregunta,
                select: element.Respuesta,
                Observacion: element.Observacion
              })
            }
          });
            }); 
      };
      $scope.function_actualizarprocesoSupervision = function (info) {
        // console.log('function_actualizarprocesoSupervision',info);
        $scope.listaprocesosedit1 = [];
             $http({
               method: "POST",
               url: "php/contratacion/supervisiondecontrato.php",
               data: {
                 function: "P_OBTENER_SUPERVISION_3",
                 vpproceso:  info,
               },
             }).then(function ({ data }) {
               $scope.procesoActual = 0;
               let max = 0;
               data.detalle.forEach((x) => {
                 let xx = x.Cod_proceso;
                 if ($scope.procesoActual < xx) {
                   max = xx ;
                 }
                 $scope.procesoActual = xx;
               });
               $scope.vistaConsulta = false;
               $scope.vistapreguntasUpdate = true;
               data.detalle.forEach(element => {
                 if (($scope.listaprocesosedit1.findIndex((e) => e.Cod_proceso == element.Cod_proceso)) == -1) {
                   $scope.listaprocesosedit1.push({"Cod_proceso": element.Cod_proceso, "Nombre_proceso": element.Nombre_proceso,
                     PREGUNTAS: [{
                       Cod_proceso: element.Cod_proceso,
                       Nombre_proceso: element.Nombre_proceso,
                       Cod_pregunta: element.Cod_pregunta,
                       Nombre_pregunta: element.Nombre_pregunta,
                       select: element.Respuesta,
                       Observacion: element.Observacion
                     }]
                   });
                 } else {
                   $scope.listaprocesosedit1[$scope.listaprocesosedit1.findIndex((e) => e.Cod_proceso == element.Cod_proceso)].PREGUNTAS.push({
                     Cod_proceso: element.Cod_proceso,
                     Nombre_proceso: element.Nombre_proceso,
                     Cod_pregunta: element.Cod_pregunta,
                     Nombre_pregunta: element.Nombre_pregunta,
                     select: element.Respuesta,
                     Observacion: element.Observacion
                   })
                 }
               });
                 }); 
                 
      };
      $scope.function_eliminarSupervcion = function (info){
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro que desea eliminar la supervision?",
          type: "question",
          showCancelButton: true,
        }).then((result) => {
          if (result) {
           
              $http({
                method: "POST",
                url: "php/contratacion/supervisiondecontrato.php",
                data: {
                  function: "P_UI_SUPERVISION_2",
                  vpdocumento: "",
                  vpnit: "",
                  vpregional: "",
                  vpfechavisita: "",
                  vpcedulasupervisorips: "",
                  vprepresentanteips: "",
                  vpcargorepreentante: "",
                  vpobservacion: "",
                  vpaccion: "D",
                  vpcantidadpreguntas: "",
                  vpidproceso: info.ID_PROCESO,
                  // El JSON,toString sirve apara tomar un array y enviarlo como json
                  vjsonpreguntas: "",
                },
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != "<br") {
                    if(data.Codigo == 0){
                      swal({title: "SUPERVISION",
                              text: data.Nombre,
                              type: "success",
                            }).catch(swal.noop);
                            setTimeout(() => {
                                    $scope.Inicio();
                                    $scope.$apply();
                                  }, 2000);

                    }else{
                      swal({
                        title: "¡Ocurrio un error!",
                        text: data.Nombre,
                        type: "warning",
                      }).catch(swal.noop);
                      setTimeout(() => {
                        $scope.Inicio();
                        $scope.$apply();
                      }, 2000);

                    }
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              });
           
          }
        });

      }
      $scope.function_imprimirSupervision = function (info, accion) {
        if (accion == "P") {
          $window.open(
            "views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=" +
            info.ID_PROCESO
          );
        }if (accion == "N") {
          $window.open(
            "views/contratacion/formatos/view_formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=" +
              info.DOCUMENTO +
              "&vpnumero=" +
              info.CONTRATO +
              "&vpubicacion=" +
              info.UBICACION +
              "&vprenglon=" +
              info.RENGLON
          );
        } if (accion == "S"){
          $window.open(
            "views/contratacion/formatos/formulariosupervisiondeloscontratosprincipal.php?&vpdocumento=" +
              info.DOCUMENTO +
              "&vpnumero=" +
              info.CONTRATO +
              "&vpubicacion=" +
              info.UBICACION +
              "&vprenglon=" +
              info.RENGLON
          );
        }
      };
      $scope.function_lista_supervisores = function () {
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_LISTA_SUPERVISORES",
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.listSupervisores = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.guadar_gestion_supervisor = function () {
        if($scope.regionaldelSupervision == '' || $scope.regionaldelSupervision == undefined || 
        $scope.documentosupervisorActual == '' ||$scope.documentosupervisorActual == undefined ||
        $scope.documentosupervisorSumplente == '' || $scope.documentosupervisorSumplente == undefined){
          swal({
            title: "¡Alerta!",
            text: "No se permiten campos vacios por favor seleccione el supervisor y sumplente",
            type: "warning",
          }).catch(swal.noop);
        }else{
        $http({
          method: "POST",
          url: "php/contratacion/supervisiondecontrato.php",
          data: {
            function: "P_U_GESTION_SUPERVISOR",
            vpregional: $scope.regionaldelSupervision,
            vpinterventor: $scope.documentosupervisorActual,
            vpsuplente: $scope.documentosupervisorSumplente,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data.Codigo == 0){
              $("#modalbuscarSupervisores").modal("close");
              swal({
                title: "Control de supervision",
                text: data.Nombre,
                type: "success",
              }).catch(swal.noop);
              $scope.limpiar("consulta");
              $scope.show_tablasupersotesActual = false;
              $scope.show_tablasupersotesSuplentes = false;
              $scope.function_lista_supervisores();
            }else{
              swal({
                title: "¡Ocurrio un error!",
                text: data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      }
      };
      $scope.function_obtener_funcionarios = function (info) {
        if(info == 'I'){
          if($scope.consulta.documentosupervisorActual == '' || $scope.consulta.documentosupervisorActual == undefined){
            swal({
              title: "¡Alerta!",
              text: "Por favor escriba el nombre o cedula del supervisor a buscar",
              type: "warning",
            }).catch(swal.noop);
            return
          }else{
          $scope.listconsultasupervisorActual =[];
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_FUNCIONARIOS",
              vpfuncionario: $scope.consulta.documentosupervisorActual,
              vptipo: info,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if(data.Codigo == "1"){
                swal({
                  title: "¡Alerta!",
                  text: data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
  
            }else{

              $scope.tittle_tabla_supervisores = 'LISTA DE SUPERVISORES';
              $scope.listconsultasupervisorActual = data;
              $scope.show_tablasupersotesActual = true;
              $scope.show_tablasupersotesSuplentes = false;
        
            }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
        }else{
          if($scope.consulta.documentosupervisorSumplente == '' || $scope.consulta.documentosupervisorSumplente == undefined){
            swal({
              title: "¡Alerta!",
              text: "Por favor escriba el nombre o cedula del supervisor a buscar",
              type: "warning",
            }).catch(swal.noop);
            return
  
          }else{
          $scope.listconsultasupervisoSuplente = [];
          $http({
            method: "POST",
            url: "php/contratacion/supervisiondecontrato.php",
            data: {
              function: "P_OBTENER_FUNCIONARIOS",
              vpfuncionario: $scope.consulta.documentosupervisorSumplente,
              vptipo: info,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if(data.Codigo == "1"){
                swal({
                  title: "¡Alerta!",
                  text: data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
        
              }else{
                $scope.tittle_tabla_Suplentes = 'LISTA DE SUPERVISORES SUPLENTES';
                $scope.listconsultasupervisoSuplente = data;
                $scope.show_tablasupersotesActual = false;
                $scope.show_tablasupersotesSuplentes = true;
              }
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
      };
      $scope.function_supervisorSeleccionado = function (info,accion){
        $scope.consulta.documentosupervisorActual = '';
        $scope.consulta.documentosupervisorSumplente = '';
        if(accion == 'I'){
         $scope.listconsultasupervisorActual =[];
         $scope.show_tablasupersotesActual = false;
          $scope.documentosupervisorActual = info.CODIGO;
          $scope.consulta.nombrefuncionarioActual = info.NOMBRE;
        }else{
         $scope.listconsultasupervisoSuplente = [];
         $scope.show_tablasupersotesSuplentes = false;
          $scope.documentosupervisorSumplente =info.CODIGO;
          $scope.consulta.nombrefuncionarioSumplente = info.NOMBRE;
        }
      }
      $scope.function_guardar_Resultado = function (accion) {
        let idproceso = $scope.id_codigoProceso !== undefined ? $scope.id_codigoProceso : $scope.id_proceso_Editar;
        // console.log('linea 1509 function_calcula_Resultado','$scope.id_codigoProceso','=',$scope.id_codigoProceso,'$scope.id_proceso_Editar','=', $scope.id_proceso_Editar);
        // console.log('linea 1510 function_calcula_Resultado','-','idproceso','=',idproceso);
        // console.log('linea 1511 function_calcula_Resultado','-','accion','=',accion);
        if (accion == "U") {
          if ($scope.edit.observacionesResult2 == "" && $scope.edit.observacionesResult2 == "") {
            swal("Importante", "Complete los campos requeridos (*)", "info");
          } else {
            $http({
              method: "POST",
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: "P_UI_CIERRE_SUPERVISION",
                vpidproceso: idproceso ,
                vpconclusiones: $scope.edit.observacionesResult1,
                vprecomendaciones: $scope.edit.observacionesResult2,
                vpaccion: accion,
              },
            }).then(function (response) {
              if (
                response.data &&
                response.data.toString().substr(0, 3) != "<br"
              ) {
                $scope.Inicio();
                swal({
                  title: "Contrato",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                $window.open(
                  "views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=" +
                  $scope.id_proceso_Editar  
                );
              } else {
                wal({
                  title: "¡Ocurrio un error!",
                  text: data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
          }
        } else if (accion == "I") {
          if ($scope.form1.observacionesResult1 == "" || $scope.form1.observacionesResult2 == "") {
            swal("Importante", "Complete los campos requeridos (*)", "info");
            let elementosAValidar = [
              {
                Codigo: "1",
                id_label: "id_form1observacionesResult1_label",
                id_input: "id_form1observacionesResult1",
              },
              {
                Codigo: "2",
                id_label: "id_form1observacionesResult2_label",
                id_input: "id_form1observacionesResult2",
              }
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          } else {
            $http({
              method: "POST",
              url: "php/contratacion/supervisiondecontrato.php",
              data: {
                function: "P_UI_CIERRE_SUPERVISION",
                vpidproceso: $scope.id_proceso_Editar ,
                vpconclusiones: $scope.form1.observacionesResult1,
                vprecomendaciones: $scope.form1.observacionesResult2,
                vpaccion: accion,
              },
            }).then(function ({data}) {
              if (data && data.toString().substr(0, 3) != "<br") {
                swal({
                  title: "Contrato",
                  text: data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                $window.open(
                  "views/contratacion/formatos/supervisiondeloscontratos.php?&vprenglon=" +
                  idproceso
                );
                $scope.Inicio();
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
      };
      $scope.formattexto_Mayuscula = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        
        // Remover caracteres que no son letras ni espacios
        valor = valor.replace(/[^a-zA-Z\s]/g, "");
        
        // Convertir el texto a mayúsculas
        input.value = valor.toUpperCase();
      };
      $scope.openmodals = function (tipo, info) {
        $scope.buscard1 = "";
        $scope.buscard2 = "";
        switch (tipo) {
          case "listprestadoresSupervisados":
            $scope.listadodePrestadores2 = [];
            $("#modallistprestadoresSupervisados").modal("open");
            setTimeout(() => {
              $("#buscard2").focus();
            }, 100);
            break;
          case "consultaPrestador":
            $scope.listadodePrestadores1 = [];
            $("#modalconsultaPrestador").modal("open")
            setTimeout(() => {
              $("#buscard1").focus();
            }, 100);
            break;
            case "buscarSupervisores":
              $scope.buscarlistconsultaSupervisores = '';
              $scope.limpiar("consulta");
              $scope.show_tablasupersotesActual = false;
              $scope.show_tablasupersotesSuplentes = false;
              $("#modalbuscarSupervisores").modal("open");
              $scope.documentosupervisorActual = info.DOC_SUPERVISOR;
              $scope.consulta.nombrefuncionarioActual = info.NOM_SUPERVISOR;
              $scope.documentosupervisorSumplente = info.DOC_SUPLENTE;
              $scope.consulta.nombrefuncionarioSumplente = info.NOM_SUPLENTE;
              $scope.regionaldelSupervision = info.COD_DPTO;
              setTimeout(() => {
                $("#id_consulta_numeroDocumento").focus();
              }, 100);
              break;
          default:
        }
      };
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case "listprestadoresSupervisados":
            $("#modallistprestadoresSupervisados").modal("close");
            break;
          case "consultaPrestador":
            $("#modalconsultaPrestador").modal("close");
            break;
            case "buscarSupervisores":
              $("#modalbuscarSupervisores").modal("close");
              break;
          default:
        }
      };
      $scope.Set_Tab = function (x, grupo, info) {
        $scope.grupos = grupo;
        $scope.Tabs = x;
        $scope.infoEditar = info;
        if (x == 1) {
          $scope.show_procesoSupervision = true;
          $scope.show_administracion = false;
        }
        if (x == 2) {
          $scope.show_procesoSupervision = false;
          $scope.show_administracion = true;
          $scope.function_lista_supervisores();
        }
      };
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatHora = function (date) {
        if (minutos < 10) {
          minutos = "0" + minutos;
        }
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var minutos = d.getMinutes();
        return hh + ":" + minutos + ":00";
      };
      $scope.formatPeso = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
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
            return "$" + num + "";
          }
        }
      };
      $scope.formatDatehora = function (date) {
        var x = document.getElementById("myTime").value;
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
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
      $scope.validarVacio = function (id, label) {
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      $scope.validarllenos = function (id, label) {
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else if (Texto != null) {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      $scope.test = function () {
        $scope.lista_procesos.forEach((t) => {
          t.PREGUNTAS.forEach((e) => {
            if (
              e.SELECT == "" ||
              e.OBSERVACION == "" ||
              e.OBSERVACION == undefined
            ) {
              document.getElementById(e.CODIGO_PROCESO).style.display = "block";
            }
          });
        });
      };
      $scope.testUpdata = function () {
        $scope.lista_procesos_edit.forEach((t) => {
          t.PREGUNTAS.forEach((e) => {
            if (
              e.select == "" ||
              e.Observacion == "" ||
              e.Observacion == undefined
            ) {
              document.getElementById(e.Cod_proceso).style.display = "block";
            }
          });
        });
      };
      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $(".tooltipped").tooltip({ delay: 50 });
      });
    },
  ])
  .directive("textUpper", function () {
    return {
      require: "ngModel",
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      },
    };
  })
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
