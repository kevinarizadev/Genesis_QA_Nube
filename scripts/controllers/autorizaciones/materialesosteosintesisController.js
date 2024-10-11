"use strict";
angular.module("GenesisApp").controller("materialesosteosintesisController", ["$scope","$http","$filter",function ($scope, $http, $filter) {
      $scope.function_Inicio = function () {
        $scope.filterEstado = "";
        $scope.buscarIps = "";
        $scope.tipoProceso = "";
        document.getElementById("id_cargue_cotizacion").value = "";
        document.getElementById("id_cargue_soporte").value = "";
        $scope.listProcedimientos = [];
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem("cedula");
        $scope.municipio = sessionStorage.getItem("municipio");
        $scope.departamento = sessionStorage.getItem("dpto");
        $scope.sessionNit = sessionStorage.getItem("nit");
        $scope.show_procesodeasignacionProveedor =  false;
        $scope.show_nueva_solicitud_Regional = false;
        $scope.show_nueva_solicitud_Prestador = false;
        $scope.show_volver_nuevaSolicitud = false;
        $scope.show_volver_nuevaSolicitudes = false;
        $scope.show_tipoSolicitud = false;
        $scope.show_botoninsertarProveedor = false;
        $scope.show_botonactualizarProveedor = false;
        $scope.show_ipsSolicitante = false;
        $scope.show_nombreIps = false;
        $scope.soporteCotizacion = false;
        $scope.show_verCotizacion = false;
        $scope.show_verAdjuntos = false;
        $scope.show_pqr = false;
        $scope.show_botonguardarNuevo = false;
        $scope.show_botonguardarEditar = false;
        $scope.show_botonguarar_function_cambiarEstado = false;
        $scope.show_disponibiidadmaterial_Soporte = false;
        $scope.show_disponibiidadmaterial_Observacion = false;
        $scope.show_estadoRevision = false;
        $scope.show_disponibiidadMaterial = false;
        $scope.show_tablaProveedore = false;
        $scope.show_motivodeDevolucion = false;
        $scope.show_motivodeAnulacion = false;
        $scope.show_documentosAdjuntar = false;
        $scope.fechaActual = new Date().toISOString().split("T")[0];
        $scope.SysDay = new Date();
        $scope.proceso = false;
        $scope.fechaCirugia = false;
        $(".modal").modal();
        $scope.show_formulariodatosBasicos = false;
        $scope.show_formularioinformacionMedica = false;
        $scope.show_vistadematerialesSeleccionados = false;
        $scope.show_vistadesoportesCargados = false;
        $scope.show_procesodeasignacionProcedimiento = false;
        $scope.show_boton_editar = false;
        $scope.show_boton_guardar = false;
        $scope.show_tabs_nuevaSolicitud = false;
        $scope.function_cambioiconoCotizacion();
        $scope.function_cambioiconoAdjunto();
        $scope.function_limpiar("form1");
        $scope.function_limpiar("form2");
        $scope.function_limpiar("form3");
        $scope.function_limpiar("cargue");
        $scope.function_limpiar("gastoQuirurgico");
        $scope.function_limpiar("2");
        $scope.function_limpiar("modalUsuario");
        $scope.function_limpiar("modalObservacio");
        $scope.function_ObtenerRoluser();
        $scope.function_pobternersSolicitudes("T");
        $scope.soporte_FL = [];
        $scope.materialesSeleccionados = [];
        $scope.proveedoresSeleccionados = [];
        $scope.procedimientoSeleccionados = [];
        $scope.listSoportes = [];
        $scope.list_DatosTemp = [];
        $scope.datos = [];
        $scope.modalUsuario.nombrefunCreado = [];
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10,
        };
        //TABLA
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
      };
      $scope.function_limpiar = function (Tabs) {
        $scope.tituloSolicitud = "";
        $scope.noteContent = "";
        $scope.text1 = "";
        $scope.text2 = "";
        $scope.text3 = "";
        $scope.text4 = "";
        $scope.text5 = "";
        $scope.text6 = "";
        $scope.text7 = "";
        switch (Tabs) {
          case "form1":
            document.getElementById("id_cargue_cotizacion").value = "";
            document.getElementById("id_cargue_soporte").value = "";
            $scope.form1 = {
              fechaSolicitud: $scope.formatDatefecha($scope.SysDay),
              selecctipoDocumento: "",
              tipoProceso: "",
              numeroDocumento: "",
              nombrePaciente: "",
              generoPaciente: "",
              edadPaciente: "",
              nivelSisben: "",
              regimenPaciente: "",
              seccionalPaciente: "",
              diagnosticoPrincipal: "",
              diagnosticoSegundario: "",
              oficinaSeccional: "",
              nombreMedico: "",
              ipsSolicitante: "",
              nombreIps: "",
              procedimiento: "",
              especialidad: "",
              cuentaconCotizacion: "",
              cotizacionCargada: [],
              adjuntos: [],
              tipoSolicitud: "",
              fechaCirugia: "",
              tipoProceso: "",
              numeroPqr: "",
            };
            break;
          case "form2":
            $scope.show_motivodeDevolucion = false;
            $scope.show_motivodeAnulacion = false;
            $scope.form2 = {
              documento: "",
              consecutivo: "",
              estadoRevision: "",
              motivoDevolucion: "",
              observacionDevolucion: "",
              motivoaAnulacion: "",
              observacionAnulacion: "",
              estadoRevision: "",
              adjuntoProveedor: "",
              disponibiidadMaterial: "",
            };
            break;
          case "form3":
            $scope.form3 = {
              numeroDocumento: "",
              numeroRegistro: "",
              motivoaAnulacion: "",
              observacionAnulacion: "",
            };
            break;
          case "gastoQuirurgico":
            $scope.form3 = {
              adjuntogastoQuirurgico: "",
            };
            break;
          case "cargue":
            $scope.cargue = {
              cotizacion: "",
              soporte: "",
            };
            break;
          case "2":
            $scope.material = {
              referencia: "",
              nombre: "",
              pos: "",
              mipres: "",
              cantidad: "",
            };
            break;
          case "4":
            $scope.procedimiento = {
              referencia: "",
              nombre: "",
            };
            break;
          case "modalUsuario":
            $scope.modalUsuario = {
              numeroDocumento: "",
              nombreFuncionario: "",
              nombrefunCreado: "",
              tipoUser: "",
              estadoVisible: "",
            };
            break;
          case "modalObservacio":
            $scope.modalObservacio = {
              numeroConsecutivo: "",
              nombrePaciente: "",
              observaciones: "",
            };
            break;
          default:
        }
      };
      $scope.function_ObtenerRoluser = function () {
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_OBTENER_ROL",
            vpnit: $scope.sessionNit,
          },
        }).then(function (response) {
            $scope.rolAmbito = response.data[0].Ambito;
            $scope.rolObtenido = response.data[0].Nombre;
            // $scope.show_nueva_solicitud_Prestador = true;
            if (response.data.Codigo == 1) {
              $("#modalpermisos").modal("open");
              return;
            }
            if (response.data && response.data.toString().substr(0, 3) != "<br") {
            if($scope.sessionNit == 0){
            if ($scope.rolObtenido == "REGIONAL" && $scope.rolAmbito == "A") {
              $scope.list_DatosTemp = [];
              $scope.listSoportes = [];
              $scope.show_tablaSolicitud = true;
              $scope.show_formulariodatosBasicos = false;
              $scope.show_vistadesoportesCargados = false;
              $scope.function_pobternersSolicitudes($scope.filterEstado);
            } 
            if ($scope.rolObtenido == "ESPECIALISTA" && $scope.rolAmbito == "A") {
              $scope.list_DatosTemp = [];
              $scope.listSoportes = [];
              $scope.tituloTabla = "GESTION AMBULATORIA";
              $scope.show_tabladeSolicitudes = true;
              $scope.show_formulariodatosBasicos = false;
              $scope.show_nueva_solicitud_Regional = false;
              $scope.show_tablaSolicitud = false;
              $scope.show_vistadesoportesCargados = false;
              $scope.function_pobternersSolicitudes($scope.filterEstado);
            } 
            if ($scope.rolObtenido == "ESPECIALISTA" && $scope.rolAmbito == "H") {
              $scope.list_DatosTemp = [];
              $scope.listSoportes = [];
              $scope.tituloTabla = "GESTION HOSPITALARIA";
              $scope.show_tabladeSolicitudes = true;
              $scope.show_formulariodatosBasicos = false;
              $scope.show_nueva_solicitud_Regional = false;
              $scope.show_tablaSolicitud = false;
              $scope.show_vistadesoportesCargados = false;
              $scope.function_pobternersSolicitudes($scope.filterEstado);
            } 
            if ($scope.rolObtenido == "ADMINISTRADOR" && $scope.sessionNit == 0) {
              $scope.tituloTabla = "SIGUIMIENTO DE SOLICITUDES";
              $scope.show_tabs_nuevaSolicitud = false;
              
              $scope.show_tabs_Solicitudes = true;
              $scope.show_tabladeSolicitudes = true;
              $scope.show_Administrador = true;
              $scope.show_botoninsertarProveedor = false;
              $scope.function_pobternersSolicitudes($scope.filterEstado);
              setTimeout(() => {
                  $("#tabs_3").click();
                }, 500);
            }
            }
            if($scope.sessionNit != 0){
            if ($scope.rolObtenido == "PRESTADOR") {
              $scope.list_DatosTemp = [];
              $scope.listSoportes = [];
              $scope.show_tablaSolicitud = true;
              $scope.show_nueva_solicitud_Prestador = true;
            }
            if ($scope.rolObtenido == "PROVEEDOR") {
              $scope.show_tabs_nuevaSolicitud = false;
              $scope.show_tablaSolicitud = false;
              $scope.show_tabs_Solicitudes = false;
              $scope.show_Administrador = false;
              $scope.show_tablaProveedore = true;
              $scope.show_botoninsertarProveedor = false;
            }
          }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_cambioiconoCotizacion = function () {
        if (document.getElementById("id_cargue_cotizacion").value == "") {
          $scope.classcolorCotizacion = "icon-x-red";
        } else {
          $scope.classcolorCotizacion = "icon-ok-green";
        }
      };
      $scope.function_cambioiconoAdjunto = function () {
        if (document.getElementById("id_cargue_soporte").value == "") {
          $scope.classcolorAdjunto = "icon-x-red";
        } else {
          $scope.classcolorAdjunto = "icon-ok-green";
        }
      };
      $scope.function_set_Tab = function (x, grupo, info) {
       // console.log("Line 1341 function_set_Tab", x, grupo, info);
        $scope.grupos = grupo;
        $scope.Tabs = x;
        if (x == 3) {
          $scope.list_DatosTemp = [];
          $scope.tituloTabla = "SIGUIMIENTO DE SOLICITUDES";
          $scope.show_procesodeasignacionProcedimiento = false;
          $scope.show_formulariodatosBasicos = false;
          $scope.show_vistadesoportesCargados = false;
          $scope.show_tabs_nuevaSolicitud = false;
          
          $scope.show_tabs_Solicitudes = true;
          $scope.show_tabladeSolicitudes = true;
          $scope.show_Administrador = true;
          $scope.show_botoninsertarProveedor = false;
          $scope.function_pobternersSolicitudes($scope.filterEstado);
        }
        if (x == 4) {
          $scope.function_plistaFuncionario();
          $scope.show_tabladeSolicitudes = false;
          $scope.show_vistadesoportesCargados = false;
          $scope.show_formulariodatosBasicos = false;
          $scope.show_tablaSolicitud = false;
          $scope.show_vistaAdministrador = true;
        }
      };
      $scope.function_nuevaSolicitud = function (accion) {
        if(accion == 'R'){
          $scope.editartituloGestion = '';
          $scope.consecutivotituloGestion = '';
          $scope.function_Obtener_Tipos_Documentos();
          $scope.function_p_listaOficina();
          $scope.function_limpiar("form1");
          $scope.function_limpiar("4");
          
          $scope.show_pqr = false;
          $scope.tituloFormulario = "NUEVA SOLICITUD";
          $scope.soporteCotizacion = false;
          $scope.show_verCotizacion = false;
          $scope.show_verAdjuntos = false;
          
          $scope.vervaloresdeEstado = false;
          $scope.show_formularioinformacionMedica = false;
          $scope.show_tablaSolicitud = false;
          $scope.show_botonguardarNuevo = true;
          
          $scope.show_formulariodatosBasicos = true;
          $scope.show_documentosAdjuntar = false;
          $scope.fechaCirugia = false;
          $scope.show_ipsSolicitante = true;
          $scope.show_nombreIps = true;
          $scope.show_botonguardarEditar = false;
          $scope.show_tipoSolicitud = true;
        }if(accion == 'P'){
          $scope.editartituloGestion = '';
          $scope.consecutivotituloGestion = '';
          $scope.function_limpiar("4");
          $scope.function_limpiar("form1");
          $scope.function_Obtener_Tipos_Documentos(); 
          $scope.function_p_listaOficina();
          $scope.show_documentosAdjuntar = true;
          $scope.show_pqr = false;
          $scope.tituloFormulario = "NUEVA SOLICITUD";
          $scope.soporteCotizacion = false;
          $scope.show_verCotizacion = false;
          $scope.show_verAdjuntos = false;
          
          $scope.show_botonguardarEditar = false;
          
          $scope.vervaloresdeEstado = false;
          $scope.show_formularioinformacionMedica = false;
          $scope.show_tablaSolicitud = false;
          $scope.show_botonguardarNuevo = false;
          $scope.show_botonactualizarProveedor = false;
          $scope.show_botoninsertarProveedor = true;
          $scope.show_formulariodatosBasicos = true;
          $scope.function_p_listaIps_solicitante($scope.sessionNit, "E");
          $scope.fechaCirugia = true;
          $scope.tituloSolicitud = "HOSPITALARIO";
          $scope.noteContent = "Por favor adjunte los siguientes documentos en el adjunto:";
          $scope.text1 = "Fotocopia del documento de identidad";
          $scope.text2 = "Historia clinica completa";
          $scope.text3 = "Adres";
          $scope.text4 = "Orden medica";

        }
      };
      $scope.function_editarSolicitud = function (info){
        $scope.function_limpiar("form1");
        //console.log('function_editarSolicitud',info);
        if(info.COD_TIPO_SOLICITUD == 'A'){
          let editar = [];
          
          document.getElementById("id_cargue_cotizacion").value = "";
          document.getElementById("id_cargue_soporte").value = "";
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTERNER_SOLICITUD",
              vpdocumento: info.DOCUMENTO,
              vpnumero: info.CONSECUTIVO,
            },
          }).then(function ({ data }) {
            $scope.function_Obtener_Tipos_Documentos();
            editar = data;
            $scope.editartituloGestion = '/ GESTION # ';
            $scope.consecutivotituloGestion = editar[0].CONSECUTIVO;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_botonactualizarProveedor = false;
            $scope.show_formulariodatosBasicos = true;
            $scope.show_ipsSolicitante = true;
            $scope.show_nombreIps = true;
            $scope.show_botonguardarEditar = true;
            $scope.show_botonguardarNuevo = false;
            $scope.tituloFormulario = "EDITAR SOLICITUD AMBULATORIA";
            $scope.form1.documentoEditar = editar[0].DOCUMENTO;
            $scope.form1.consecutivoEditar = editar[0].CONSECUTIVO;
            $scope.form1.fechaSolicitud = editar[0].FECHA_SOLICITUD;
            setTimeout(() => {
              $scope.form1.selecctipoDocumento = editar[0].TIPO_ID;
              }, 1000);
            $scope.form1.numeroDocumento = editar[0].AFILIADO;
            $scope.form1.diagnosticoPrincipal = editar[0].COD_DX;
            $scope.form1.diagnosticoSegundario = editar[0].COD_DX1;
            $scope.form1.numerodocumentoMedico = editar[0].DOCUMENTO_MEDICO;
            $scope.form1.nombreMedico = editar[0].NOMBRE_MEDICO;
            $scope.form1.ipsSolicitante = editar[0].NIT_SOLICITANTE;
            $scope.form1.procedimiento = editar[0].ESPECIALIDAD_MEDICO;
            $scope.form1.cuentaconCotizacion = editar[0].COTIZACION;
            $scope.form1.tipoSolicitud = editar[0].COD_TIPO_SOLICITUD;
            $scope.form1.tipoProceso = editar[0].COD_PROCESO;
            $scope.form1.numeroPqr = editar[0].NUMERO_PQR;
            $scope.form1.procedimiento  = editar[0].ESPECIALIDAD_MEDICO;
            $scope.form1.especialidad = editar[0].ESPECIALIDAD_MEDICO;
            if ($scope.form1.cuentaconCotizacion == "S") {
              $scope.show_verCotizacion = true;
              $scope.show_verAdjuntos = true;
            } else {
              $scope.show_verCotizacion = false;
              $scope.show_verAdjuntos = true;
            }
            $scope.cargue.cotizacion = editar[0].SOPORTE_COTIZACION;
            $scope.cargue.soporte = editar[0].ADJUNTO;
            $scope.function_validarsirequiereSoporte($scope.form1.cuentaconCotizacion);
            setTimeout(() => {
              $scope.fuction_validartipoSolicitud($scope.form1.tipoSolicitud);
              $scope.function_obtenerPqr($scope.form1.tipoProceso);
              $scope.function_buscarAfiliado("E");
              $scope.function_p_listaIps_solicitante($scope.form1.ipsSolicitante, "E");
              $scope.function_p_listaOficina();
              swal.close();
              $scope.$apply();
            }, 2000);
          });
          return
        }
        if(info.COD_TIPO_SOLICITUD == 'H'){
          let editar = [];
          
          document.getElementById("id_cargue_cotizacion").value = "";
          document.getElementById("id_cargue_soporte").value = "";
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTERNER_SOLICITUD",
              vpdocumento: info.DOCUMENTO,
              vpnumero: info.CONSECUTIVO,
            },
          }).then(function ({ data }) {
            $scope.function_Obtener_Tipos_Documentos();
            editar = data;
            $scope.editartituloGestion = '/ GESTION # ';
            $scope.consecutivotituloGestion = editar[0].CONSECUTIVO;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_documentosAdjuntar = true;
            $scope.show_tablaSolicitud = false;
            $scope.show_botonguardarEditar = false;
            $scope.show_formulariodatosBasicos = true;
            $scope.show_ipsSolicitante = false;
            $scope.proceso = false;
            $scope.show_nombreIps = false;
            $scope.show_botoninsertarProveedor = false;
            $scope.show_botonactualizarProveedor = true;
            $scope.fechaCirugia = true;
            $scope.show_botonguardarNuevo = false;
            $scope.tituloFormulario = "EDITAR SOLICITUD HOSPITALARIA";
            $scope.form1.documentoEditar = editar[0].DOCUMENTO;
            $scope.form1.consecutivoEditar = editar[0].CONSECUTIVO;
            $scope.form1.fechaSolicitud = editar[0].FECHA_SOLICITUD;
            setTimeout(() => {
            $scope.form1.selecctipoDocumento = editar[0].TIPO_ID;
            }, 1000);
            $scope.form1.numeroDocumento = editar[0].AFILIADO;
            $scope.form1.diagnosticoPrincipal = editar[0].COD_DX;
            $scope.form1.diagnosticoSegundario = editar[0].COD_DX1;
            $scope.form1.numerodocumentoMedico = editar[0].DOCUMENTO_MEDICO;
            $scope.form1.nombreMedico = editar[0].NOMBRE_MEDICO;
            $scope.form1.ipsSolicitante = editar[0].NIT_SOLICITANTE;
            $scope.form1.procedimiento  = editar[0].ESPECIALIDAD_MEDICO;
            $scope.form1.especialidad = editar[0].ESPECIALIDAD_MEDICO;
            $scope.form1.cuentaconCotizacion = editar[0].COTIZACION;
            $scope.form1.fechaCirugia = moment(editar[0].FECHA_QX, 'DD/MM/YYYY').toDate();
            if ($scope.form1.cuentaconCotizacion == "S") {
              $scope.show_verCotizacion = true;
              $scope.show_verAdjuntos = true;
            } else {
              $scope.show_verCotizacion = false;
              $scope.show_verAdjuntos = true;
            }
            $scope.cargue.cotizacion = editar[0].SOPORTE_COTIZACION;
            $scope.cargue.soporte = editar[0].ADJUNTO;
            $scope.function_validarsirequiereSoporte($scope.form1.cuentaconCotizacion);
            $scope.tituloSolicitud = "HOSPITALARIO";
            $scope.noteContent = "Por favor adjunte los siguientes documentos en el adjunto:";
            $scope.text1 = "Fotocopia del documento de identidad";
            $scope.text2 = "Historia clinica completa";
            $scope.text3 = "Adres";
            $scope.text4 = "Orden medica";
           setTimeout(() => {
            // $scope.fuction_validartipoSolicitud($scope.form1.tipoSolicitud);
            // $scope.function_obtenerPqr($scope.form1.tipoProceso);
            $scope.function_buscarAfiliado("E");
            $scope.function_p_listaIps_solicitante($scope.form1.ipsSolicitante, "E");
            $scope.function_p_listaOficina();
            swal.close();
            $scope.$apply();
          }, 2000);
          });
          return
        }
      }
      $scope.function_buscarAfiliado = function (accion) {
        if ( $scope.form1.selecctipoDocumento == "" || $scope.form1.numeroDocumento == "" ) {
          swal({
            title: "¡Alerta!",
            text: "No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTENER_DATOS_BASICOS",
              vptipodocumento: $scope.form1.selecctipoDocumento,
              vpdocumento: $scope.form1.numeroDocumento,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if (data.CODIGO == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: data.NOMBRE,
                  type: "warning",
                }).catch(swal.noop);
                $scope.function_limpiar("1");
              } else {
                if (accion != "E") {
                  swal({
                    title: "Afiliado",
                    text: "Cargado Correctamente",
                    type: "success",
                  }).catch(swal.noop);
                }
                ($scope.form1.tipoDocumento = data.TipoDocumento),
                  ($scope.form1.numeroDocumento = data.Documento),
                  ($scope.form1.nombrePaciente = data.NombreCompleto),
                  ($scope.form1.generoPaciente = data.Sexo),
                  ($scope.form1.edadPaciente = data.EdadAnhos),
                  ($scope.form1.nivelSisben = data.NIVEL),
                  ($scope.form1.regimenPaciente = data.Regimen),
                  ($scope.form1.codigoRegimen = data.CodigoRegimen),
                  ($scope.form1.sexo = data.SexoCodigo),
                  ($scope.form1.edad = data.EdadDias),
                  ($scope.form1.seccionalPaciente = data.Departamento),
                  ($scope.form1.codigoseccional = data.cod_municipio),
                  setTimeout(() => {
                    $scope.$apply();
                    swal.close();
                  }, 500);
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
      $scope.function_estadodisponibilidadMaterial = function (rev) {
        // $scope.function_p_lista_motivos(rev);
        if (rev == "S") {
          $scope.show_disponibiidadmaterial_Soporte = true;
          $scope.show_disponibiidadmaterial_Observacion = true;
          $scope.show_botonguarar_function_p_u_ips_materiales = true;
          return;
        }
        if (rev == "N") {
          $scope.show_disponibiidadmaterial_Observacion = false;
          $scope.show_disponibiidadmaterial_Soporte = false;
          $scope.show_botonguarar_function_p_u_ips_materiales = true;
          return;
        }
      };
      $scope.function_estadoRevision = function (rev) {
        $scope.function_p_lista_motivos(rev);
        if (rev == "A") {
          $scope.show_botonguarar_function_cambiarEstado = true;
          $scope.show_botonguarar_function_p_u_ips_materiales = false;
          $scope.show_motivodeDevolucion = false;
          $scope.show_motivodeAnulacion = false;
          return;
        }
        if (rev == "X") {
          $scope.show_botonguarar_function_cambiarEstado = true;
          $scope.show_motivodeDevolucion = false;
          $scope.show_motivodeAnulacion = true;
          $scope.show_botonguarar_function_p_u_ips_materiales = false;
          return;
        }
        if (rev == "D") {
          $scope.show_botonguarar_function_cambiarEstado = true;
          $scope.show_motivodeDevolucion = true;
          $scope.show_motivodeAnulacion = false;
          $scope.show_botonguarar_function_p_u_ips_materiales = false;
          return;
        }
      };
      $scope.function_p_lista_motivos = function (accion) {
        $scope.listaMotivos = [];
        if (accion == "A") {
          return;
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_LISTA_MOTIVOS",
              vptipo: accion,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              $scope.listaMotivos = data;
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
      $scope.function_show_control_Vista = function (accion, data) {
        //console.log("linea 243 show_control_Vista data", data);
        //console.log("linea 244 show_control_Vista accion", accion);
        if (accion == "asignacionProveedor") {
          $scope.materialesSeleccionados = [];
          $scope.procedimientoSeleccionados = [];
          $scope.listProcedimientos = [];
          $scope.numeroRegistro = data.CONSECUTIVO;
          $scope.numeroDocumento = data.DOCUMENTO;
          $scope.show_procesodeasignacionProveedor = true;
          $scope.show_procesodeasignacionProcedimiento = false;
          $scope.show_tabladeSolicitudes = false;
          $scope.function_p_lista_ips_materiales();
        }
        if (accion == "cargueCups") {
          $scope.materialesSeleccionados = [];
          $scope.procedimientoSeleccionados = [];
          $scope.listProcedimientos = [];
          $scope.buscard1 = "";
          $scope.numeroRegistro = data.CONSECUTIVO;
          $scope.numeroDocumento = data.DOCUMENTO;
          $scope.show_procesodeasignacionProveedor = false;
          $scope.show_procesodeasignacionProcedimiento = true;
          $scope.show_tabladeSolicitudes = false;
          $scope.versoportoGx = data.GASTO_QX;
          //console.log($scope.versoportoGx);
        } else {
          $scope.show_procesodeasignacionProcedimiento = false;
        }
      };
      $scope.function_asignacionProveedor =  function (info){
        //console.log(info);
        $scope.proveedoresSeleccionados = [];
        if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ESPECIALISTA' && info.TIPO_SOLICITUD === "AMBULATORIO" ) {
          $scope.numeroRegistro = info.CONSECUTIVO;
          $scope.numeroDocumento = info.DOCUMENTO;
          $scope.show_volver_nuevaSolicitudes = true;
          $scope.show_procesodeasignacionProveedor = true;
          $scope.show_volver_nuevaSolicitud = false;
          $scope.show_tabladeSolicitudes = false;
          $scope.show_estadoRevision = false;
          $scope.function_p_lista_ips_materiales();
          return
        }
        if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ADMINISTRADOR' && info.TIPO_SOLICITUD === "AMBULATORIO" ) {
          $scope.numeroRegistro = info.CONSECUTIVO;
          $scope.numeroDocumento = info.DOCUMENTO;
          $scope.show_volver_nuevaSolicitudes = true;
          $scope.show_procesodeasignacionProveedor = true;
          $scope.show_volver_nuevaSolicitud = false;
          $scope.show_tabladeSolicitudes = false;
          $scope.show_estadoRevision = false;
          $scope.function_p_lista_ips_materiales();
          return
        }
        if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ESPECIALISTA' && info.TIPO_SOLICITUD === "HOSPITALARIO" ) {
          $scope.numeroRegistro = info.CONSECUTIVO;
          $scope.numeroDocumento = info.DOCUMENTO;
          $scope.show_volver_nuevaSolicitudes = true;
          $scope.show_procesodeasignacionProveedor = true;
          $scope.show_volver_nuevaSolicitud = false;
          $scope.show_tabladeSolicitudes = false;
          $scope.show_estadoRevision = false;
          $scope.function_p_lista_ips_materiales();
          return
        }
        if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ADMINISTRADOR' && info.TIPO_SOLICITUD === "HOSPITALARIO" ) {
          $scope.numeroRegistro = info.CONSECUTIVO;
          $scope.numeroDocumento = info.DOCUMENTO;
          $scope.show_volver_nuevaSolicitudes = true;
          $scope.show_procesodeasignacionProveedor = true;
          $scope.show_volver_nuevaSolicitud = false;
          $scope.show_tabladeSolicitudes = false;
          $scope.show_estadoRevision = false;
          $scope.function_p_lista_ips_materiales();
          return
        }
      }
      $scope.function_p_listaSoporte = function (info) {
        $scope.numconsecutivo = info.CONSECUTIVO;
        $scope.nombredelaGestion = info.TIPO_SOLICITUD;
        //console.log(info);
        $scope.show_tabladeSolicitudes = false;
        $scope.listSoportes = [];
        $scope.function_limpiar("form2");
        //console.log("p_listaSoporte", info);
        $scope.form2.documento = info.DOCUMENTO;
        $scope.form2.consecutivo = info.CONSECUTIVO;
        $scope.form2.reglon = info.RENGLON;
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_LISTA_SOPORTES",
            vpnumero: info.CONSECUTIVO,
          },
        }).then(function ({ data }) {
          //
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.show_vistadematerialesSeleccionados = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.vervaloresdeEstado = false;
            $scope.show_formularioinformacionMedica = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = true;
            if ($scope.sessionNit != 0) {
              $scope.show_tablaProveedore = false;
              if (info.DISPONIBILIDAD === "SI") {
                $scope.show_disponibiidadMaterial = false;
              }
              if (info.DISPONIBILIDAD === "SIN RESPUESTA") {
                $scope.show_disponibiidadMaterial = true;
              }
              $scope.show_estadoRevision = false;
            } else {
              if (info.ESTADO_PR === "ACTIVA" && $scope.rolObtenido == 'ESPECIALISTA') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = true;
                $scope.show_estadoRevision = true;
              }
              if (info.ESTADO_PR === "ACTIVA" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = true;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "ACTIVA" && $scope.rolObtenido == 'ADMINISTRADOR') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = false;
                $scope.show_estadoRevision = true;
              }
              if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ESPECIALISTA' ) {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = true;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'REGIONAL' ) {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = true;
                $scope.show_estadoRevision = false;
                $scope.show_tabs_Solicitudes = false;
              }
              if (info.ESTADO_PR === "APROBADO" && $scope.rolObtenido == 'ADMINISTRADOR') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = false;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "PROCESADA" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_volver_nuevaSolicitud = true;
                $scope.show_volver_nuevaSolicitudes = false;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "PROCESADA" && $scope.rolObtenido == 'ESPECIALISTA') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = true;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "PROCESADA" && $scope.rolObtenido == 'ADMINISTRADOR') {
                $scope.show_volver_nuevaSolicitud = false;
                $scope.show_volver_nuevaSolicitudes = false;
                $scope.show_estadoRevision = false;
              }
              if (info.ESTADO_PR === "ANULADA") {
                $scope.show_estadoRevision = false;
              }
              if (info.DISPONIBILIDAD === "SI") {
                $scope.show_disponibiidadMaterial = false;
              }
              $scope.show_disponibiidadMaterial = false;
              $scope.show_tablaProveedore = false;
            }
            if ($scope.rolObtenido == "ADMINISTRADOR" && $scope.sessionNit != 0) {
              let elementosAValidar = [
                {
                  Codigo: "1",
                  Nombre: "GASTO QUIRURGICO",
                  Ruta: data[0].Gasto,
                },
                {
                  Codigo: "2",
                  Nombre: "ADJUNTO",
                  Ruta: data[0].adjunto,
                },
              ];
              elementosAValidar.forEach(function (elemento) {
                if (elemento.Ruta != null) {
                  $scope.listSoportes.push(elemento);
                }
              });
            } else {
              let elementosAValidar = [
                {
                  Codigo: "1",
                  Nombre: "GASTO QUIRURGICO",
                  Ruta: data[0].Gasto,
                },
                {
                  Codigo: "2",
                  Nombre: "COTIZACION DE MATERIALES",
                  Ruta: data[0].cotizacion,
                },
                {
                  Codigo: "3",
                  Nombre: "DOCUMENTOS ADJUNTO",
                  Ruta: data[0].adjunto,
                },
              ];
              elementosAValidar.forEach(function (elemento) {
                //console.log(elemento);
                if (elemento.Ruta != null) {
                  $scope.listSoportes.push(elemento);
                }
              });
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
      $scope.function_siguiente = function (info) {
        // PROCESO DE ASIGNACION DE PROCEDIMIENTO
        if (info == "0") {
          if ($scope.form1.tipoSolicitud == "" || $scope.form1.tipoSolicitud == undefined) {
            swal({
              title: "¡Alerta!",
              text: "Por favor seleccione el tipo de solicitud",
              type: "warning",
            }).catch(swal.noop);
            $scope.validarVacio("id_label_tipoSolicitud");
            return;
          }
          if ( $scope.form1.tipoSolicitud == "A" || $scope.form1.tipoSolicitud == undefined ) {
            if ( $scope.form1.cuentaconCotizacion == "" || $scope.form1.cuentaconCotizacion == undefined) {
              swal({
                title: "¡Alerta!",
                text: "Por favor confirme si tiene una cotizacion",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_cuentaconCotizacion");
              return;
            }
            if ($scope.form1.cuentaconCotizacion == "S") {
              if (
                document.getElementById("id_cotizacion_input").files.length == 0
              ) {
                swal({
                  title: "¡Alerta!",
                  text: "Por favor adjunte la cotizacion",
                  type: "warning",
                }).catch(swal.noop);
                $scope.validarVacio("id_label_cotizacion");
                return;
              }
            }
            if (
              $scope.form1.tipoProceso == "" ||
              $scope.form1.tipoProceso == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione el proceso",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_tipoProceso");
              return;
            }
            // if ($scope.form1.tipoProceso == "P") {
            //   if ($scope.form1.numeroPqr == "") {
            //     swal({
            //       title: "¡Alerta!",
            //       text: "Por favor ingrese el numero de la PQR",
            //       type: "warning",
            //     }).catch(swal.noop);
            //     $scope.validarVacio("id_label_numeroPqr");
            //     return;
            //   }
            // }
            if (
              $scope.form1.selecctipoDocumento == "" ||
              $scope.form1.selecctipoDocumento == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione el tipo de documento",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_selecctipoDocumento");
              return;
            }
            if (
              $scope.form1.numeroDocumento == "" ||
              $scope.form1.numeroDocumento == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor ingrese el numero de documento",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_numeroDocumento");
              return;
            }
            if (
              $scope.form1.diagnosticoPrincipal == "" ||
              $scope.form1.diagnosticoPrincipal == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione el diagnostico",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_diagnosticoPrincipal");
              return;
            }
            if (
              $scope.form1.oficinaSeccional == "" ||
              $scope.form1.oficinaSeccional == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione la oficina seccional",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_oficinaSeccional");
              return;
            }
            if (
              $scope.form1.nombreMedico == "" ||
              $scope.form1.nombreMedico == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor ingrese el nombre del medico tratente",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_nombreMedico");
              return;
            } else {
              $scope.show_procesodeasignacionProcedimiento = true;
              $scope.show_formulariodatosBasicos = false;
              $scope.show_formularioinformacionMedica = false;
            }
          }
          if (
            $scope.form1.tipoSolicitud == "H" ||
            $scope.form1.tipoSolicitud == "N" ||
            $scope.form1.tipoSolicitud == undefined
          ) {
            if (
              $scope.form1.cuentaconCotizacion == "" ||
              $scope.form1.cuentaconCotizacion == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor confirme si tiene una cotizacion",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_cuentaconCotizacion");
              return;
            }
            if ($scope.form1.cuentaconCotizacion == "S") {
              if (
                document.getElementById("id_cotizacion_input").files.length == 0
              ) {
                swal({
                  title: "¡Alerta!",
                  text: "Por favor adjunte la cotizacion",
                  type: "warning",
                }).catch(swal.noop);
                $scope.validarVacio("id_label_cotizacion");
                return;
              }
            }
            if (
              $scope.form1.selecctipoDocumento == "" ||
              $scope.form1.selecctipoDocumento == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione el tipo de documento",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_selecctipoDocumento");
              return;
            }
            if (
              $scope.form1.numeroDocumento == "" ||
              $scope.form1.numeroDocumento == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor ingrese el numero de documento",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_numeroDocumento");
              return;
            }
            if (
              $scope.form1.diagnosticoPrincipal == "" ||
              $scope.form1.diagnosticoPrincipal == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione el diagnostico",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_diagnosticoPrincipal");
              return;
            }
            if (
              $scope.form1.oficinaSeccional == "" ||
              $scope.form1.oficinaSeccional == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor seleccione la oficina seccional",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_oficinaSeccional");
              return;
            }
            if (
              $scope.form1.nombreMedico == "" ||
              $scope.form1.nombreMedico == undefined
            ) {
              swal({
                title: "¡Alerta!",
                text: "Por favor ingrese el nombre del medico tratente",
                type: "warning",
              }).catch(swal.noop);
              $scope.validarVacio("id_label_nombreMedico");
              return;
            } else {
              $scope.show_procesodeasignacionProcedimiento = true;
              $scope.show_formulariodatosBasicos = false;
              $scope.show_formularioinformacionMedica = false;
            }
          }
        }
        // validaciones nueva solicitud vista 2
        if (info == "1") {
          $scope.documentoaVisualizarQX = [];
          if ($scope.procedimientoSeleccionados.length == 0) {
            swal({
              title: "¡Alerta!",
              text: "Por favor agregue procedimiento",
              type: "warning",
            }).catch(swal.noop);
            return
          } else {
            $scope.show_formulariodatosBasicos = false;
          
            $scope.show_procesodeasignacionProcedimiento = false;
          }
          swal({
            title: "Cargando Proceso de Materiales...",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          swal.showLoading();
          // $scope.documentoaVisualizar = '';
          // $scope.titulodelSoporte = opcion.Nombtre;
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "DESCARGARFILE",
              ruta: $scope.versoportoGx,
            },
          }).then(function (response) {
          
            // window.open("temp/" + response.data);
            $scope.documentoaVisualizarQX = "temp/" + response.data;
            $scope.show_formularioinformacionMedica = true;
            swal.close();
          });
          // validaciones nueva solicitud vista 3
        }
        if (info == "2") {
          if ($scope.materialesSeleccionados.length <= 0) {
            swal({
              title: "¡Alerta!",
              text: "Por favor agregue los materiales",
              type: "warning",
            }).catch(swal.noop);
          } else {
            $scope.show_formulariodatosBasicos = false;
            $scope.show_formularioinformacionMedica = false;
            
            $scope.show_procesodeasignacionProcedimiento = false;
          }
        }
      };
      $scope.fuction_validartipoSolicitud = function (val) {
        //console.log(val);
        let validacion = '';
         validacion = val;
        if (validacion == "N") {
          $scope.show_documentosAdjuntar = true;
          $scope.fechaCirugia = false;
          $scope.tituloSolicitud = "NO PBS";
          $scope.noteContent = "Por favor adjunte los siguientes documentos en el adjunto:";
          $scope.text1 = "Fotocopia del documento de identidad";
          $scope.text2 = "Historia clinica completa";
          $scope.text3 = "Adres";
          $scope.text4 = "Solicitud de materiales firmada por el especialista pertinente";
          $scope.text5 = "Mipres";
          $scope.text6 = "Tutela con fallo firmado por el juez";
          $scope.text7 = "Formato de integridad (en caso que se requier)";
        }
        if (validacion == "A") {
          $scope.show_documentosAdjuntar = true;
          $scope.tituloSolicitud = "AMBULATORIO";
          $scope.noteContent = "Por favor adjunte los siguientes documentos en el adjunto:";
          $scope.text1 = "Fotocopia del documento de identidad";
          $scope.text2 = "Historia clinica completa";
          $scope.text3 = "Adres";
          $scope.text4 = "Orden medica";
          $scope.fechaCirugia = false;
          $scope.proceso = true;
        } else {
          $scope.proceso = false;
          $scope.show_pqr = false;
        }
      };
      $scope.function_validarsirequiereSoporte = function (accion) {
        //console.log('function_validarsirequiereSoporte', accion);
        if (accion == "S") {
          $scope.soporteCotizacion = true;
        } else {
          $scope.soporteCotizacion = false;
        }
      };
      $scope.function_accionVolver = function(accion,num){
        //console.log(accion);
        $scope.Vista1.Filtrar_tprincipal = '';
        $scope.function_limpiar("form1");
        if(accion == 'nuevaSolicitud'){
          if ($scope.rolObtenido == 'ADMINISTRADOR' &&  $scope.rolAmbito == 'A') {
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_tabladeSolicitudes = true;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
            return
          }
          if ($scope.rolObtenido == 'ESPECIALISTA' &&  $scope.rolAmbito == 'A') {
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_tabladeSolicitudes = true;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
            return
          }
          if ($scope.rolObtenido == 'ESPECIALISTA' &&  $scope.rolAmbito == 'H') {
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_tabladeSolicitudes = true;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_formulariodatosBasicos = false;
          }
          if ($scope.rolObtenido == 'REGIONAL' &&  $scope.rolAmbito == 'A') {
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = true;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
            return
          }
        }
        if(accion == 'nuevaSolicitudes'){
          if ($scope.rolObtenido == 'ADMINISTRADOR' &&  $scope.rolAmbito == 'A') {
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_tabladeSolicitudes = true;
            $scope.show_procesodeasignacionProcedimiento = false;
            $scope.show_procesodeasignacionProveedor = false
            $scope.function_pobternersSolicitudes($scope.filterEstado);
            return
          }
          if ($scope.rolObtenido == 'REGIONAL') {
            $scope.show_formulariodatosBasicos =  false;
            $scope.show_nueva_solicitud_Regional = true;
            $scope.show_tablaSolicitud = true;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_nueva_solicitud_Prestador = false;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
          }
          if ($scope.rolObtenido == 'PRESTADOR') {
            $scope.show_formulariodatosBasicos =  false;
            $scope.show_tablaSolicitud = true;
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
          }
          if ($scope.rolObtenido == 'PROVEEDOR') {
            $scope.show_formulariodatosBasicos =  false;
            $scope.show_tablaSolicitud = false;
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tablaProveedore = true;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
          }
          if ($scope.rolObtenido == 'ESPECIALISTA' && num == 1) {
            $scope.show_volver_nuevaSolicitud = false;
            $scope.show_volver_nuevaSolicitudes = true;
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_procesodeasignacionProveedor = false;
            $scope.show_tablarespuestaProveedores = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_procesodeasignacionProcedimiento = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_tabladeSolicitudes = true;
            
            $scope.show_formulariodatosBasicos = false;
            $scope.show_formularioinformacionMedica = false;
            
            $scope.show_procesodeasignacionProcedimiento = false;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
          }
          if ($scope.rolObtenido == 'ESPECIALISTA' && num == 2) {
            $scope.show_volver_nuevaSolicitud = false;
            $scope.show_volver_nuevaSolicitudes = true;
            $scope.show_nueva_solicitud_Regional = false;
            $scope.show_tablaSolicitud = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_procesodeasignacionProveedor = false;
            $scope.show_tablarespuestaProveedores = false;
            $scope.show_formulariodatosBasicos = false;
            $scope.show_vistadesoportesCargados = false;
            $scope.show_procesodeasignacionProcedimiento = true;
            $scope.show_tabladeSolicitudes = false; 
            $scope.show_formulariodatosBasicos = false;
            $scope.show_formularioinformacionMedica = false;
            $scope.function_pobternersSolicitudes($scope.filterEstado);
          }
        }
      }
      $scope.function_pobternersSolicitudes = function (estado) {
        $scope.list_DatosTemp = [];
        $scope.Vista1_datos = [];
     
        // $scope.show_tablarespuestaProveedores = false;
        if ($scope.sessionNit == 0) {
          if (estado == undefined) {
            return;
          } else {
            $scope.filterEstado = estado;
          }
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTERNER_SOLICITUDES",
              //Ternario basico donde se valida que si el departamento es = 1 lo envia igual si no//
              //entra en la segunda condicion que agrega el 0//
              vpnit: $scope.sessionNit,
              vpgrupo: $scope.departamento == 1? $scope.departamento: ("0" + $scope.departamento).slice(-2),
              vpestado: $scope.filterEstado,
              vpambito: $scope.rolAmbito,
            },
          }).then(function ({ data }) {
            //console.log("function_pobternersSolicitudes 1145", data);
            if (data && data.toString().substr(0, 3) != "<br") {
              if(data.length == 0){
                return
              }
              $scope.Vista1_datos = data;
              $scope.init_pag_Tabla(data);

              if($scope.rolObtenido == 'REGIONAL' && data.length == 0){
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
  
              }else{
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
              }
              if (data[0].ESTADO_PR == "ACTIVA" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
                
                
                
                
              }
              if (data[0].ESTADO_PR == "ACTIVA" && $scope.rolObtenido == 'PRESTADOR') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
                
                
                
              }
              if (data[0].ESTADO_PR == "ACTIVA" && $scope.rolObtenido == 'ESPECIALISTA') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
                
                
                
              }
              if (data[0].ESTADO_PR == "ACTIVA" && $scope.rolObtenido == 'ADMINISTRADOR') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
                
                
                
              }
              if (data[0].ESTADO_PR == "PROCESADA" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
                
                
                
                $scope.show_proveedor = true;
                $scope.show_disponibiidadMaterial = false;
      
                return
              }
              if (data[0].ESTADO_PR == "PROCESADA" && $scope.rolObtenido == 'PRESTADOR') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
                
                
                $scope.show_proveedor = true;
                $scope.show_disponibiidadMaterial = false;
         
                return
              }
              if (data[0].ESTADO_PR == "APROBADO" && $scope.rolObtenido == 'REGIONAL' ) {
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
                $scope.show_tabs_Solicitudes = false;
                
                
                
              }
              if (data[0].ESTADO_PR == "APROBADO" && $scope.rolObtenido == 'PRESTADOR' ) {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                $scope.show_tabs_Solicitudes = false;
                
                
                
                return
              }
              if (data[0].ESTADO_PR == "ANULADA" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
                
                
              }
              if (data[0].ESTADO_PR == "ANULADA" && $scope.rolObtenido == 'PRESTADOR') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
                
              }
              if (data[0].ESTADO_PR == "EN DEVOLUCION" && $scope.rolObtenido == 'REGIONAL') {
                $scope.show_nueva_solicitud_Regional = true;
                $scope.show_nueva_solicitud_Prestador = false;
                
              }
              if (data[0].ESTADO_PR == "EN DEVOLUCION" && $scope.rolObtenido == 'PRESTADOR') {
                $scope.show_nueva_solicitud_Regional = false;
                $scope.show_nueva_solicitud_Prestador = true;
                
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        } else {
          $scope.list_DatosTemp = [];
          $scope.Vista1_datos = [];
          if (estado == undefined) {
            return;
          } else {
            $scope.filterEstado = estado;
          }
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTERNER_SOLICITUDES",
              vpnit: $scope.sessionNit,
              vpgrupo: 1,
              vpestado: $scope.filterEstado,
              vpambito: $scope.rolAmbito,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if(data.length == 0){
                return
              }
              $scope.Vista1_datos = data;
              $scope.init_pag_Tabla(data);
              if (data[0].ESTADO_PR == "PROCESADA") {
                $scope.show_disponibiidadMaterial = false;
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
      $scope.function_p_listaIps_solicitante = function (data, accion) {
        //console.log("function_p_listaIps_solicitante", "data", data, "accion", accion);
        $scope.listaIpssolicitante = [];
        $scope.form1.nombreIps = "";
        var ips = data;
        if(data == 0){
         return
        }else{
        if (accion == "I") {
          if ($scope.buscarIps == "") {
            swal({
              title: "¡Alerta!",
              text: "Por favor ingrese el nit o el nombre de la ips solicitante",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_OBTENER_IPS_SOLICITANTE",
                vpnit: ips,
              },
            }).then(function ({ data }) {
              if (data && data.toString().substr(0, 3) != "<br") {
                $scope.listaIpssolicitante = data;
                $scope.form1.nombreIps = data[0].Nombre;
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
        if (accion == "E") {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTENER_IPS_SOLICITANTE",
              vpnit: ips,
            },
          }).then(function ({ data }) {
            
            if (data && data.toString().substr(0, 3) != "<br") {
              $scope.listaIpssolicitante = data;
              $scope.form1.nombreIps = data[0].Nombre;
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
      $scope.function_seleccionarips = function (data) {
        // 
        if ($scope.tipoaut == "1") {
          $scope.form1.ipsSolicitante = data.Codigo;
          $scope.form1.nombreIps = data.Nombre;
          $("#modalips").modal("close");
          $scope.buscard1 = "";
          setTimeout(() => {
            $scope.$apply();
            $scope.validarVacio("id_form2_nombreIp", "id_nombreIps_label");
          }, 1000);
        }
      };
      $scope.function_plistaFuncionario = function () {
        $scope.list_DatosTemp = [];
        $scope.Vista1_datos = [];
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_LISTA_FUNCIONARIOS",
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.Vista1_datos = data;
            $scope.init_pag_Tabla(data);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_p_listaOficina = function (info) {
        $scope.listOficinas = [];
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_LISTA_OFICINA",
            // vpregional: $scope.municipio,
            vpregional: "8001",
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.listOficinas = data;
            if (data.length === 1) {
              $scope.form1.oficinaSeccional = data[0].Codigo;
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
      $scope.function_guardarcupsMateriales = function () {
        if($scope.procedimientoSeleccionados.length == 0 ){
          swal({
            title: "¡Alerta!",
            text: "Por favor agregue los cups",
            type: "warning",
          }).catch(swal.noop);
          return
        } if($scope.materialesSeleccionados.length == 0){
          swal({
            title: "¡Alerta!",
            text: "Por favor agregue los materiales",
            type: "warning",
          }).catch(swal.noop);
          return
        }else{
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_UI_SOLICITUD_MATERIAL",
            vdocumento: $scope.numeroDocumento,
            vnumero: $scope.numeroRegistro,
            vptipodocumento: $scope.form1.selecctipoDocumento,
            vpafiliado: $scope.form1.numeroDocumento,
            vptiposolicitud: $scope.form1.tipoSolicitud,
            vpproceso: $scope.form1.tipoProceso,
            vpnumeropqr: $scope.form1.numeroPqr,
            vpnumerotutela: $scope.form1.numeroTutela,
            vpcoddx: $scope.form1.diagnosticoPrincipal,
            vpcoddx1: $scope.form1.diagnosticoSegundario,
            vpoficina: $scope.form1.oficinaSeccional,
            vpdocumentomedico: "",
            vpnombremedico: $scope.form1.nombreMedico,
            vpcotizacion: $scope.form1.cuentaconCotizacion,
            vpsoporte: "",
            vpfechaorden: $scope.formatDatefecha($scope.SysDay),
            vpnitsolicitante: $scope.form1.ipsSolicitante,
            vpespmedico: $scope.form1.especialidad,
            vpestado: "",
            vpfechaaprobacion: "",
            vpaccion: "C",
            vpadjunto: "",
            vpcantproductos: $scope.cantidadMateriales,
            vjsonproductos: JSON.stringify($scope.materialesSeleccionados),
            vpcantcups: $scope.cantidadProcedimiento,
            vjsoncups: JSON.stringify($scope.procedimientoSeleccionados),
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if (data.Codigo == 0) {
              swal({
                title: "Información",
                html: data.Nombre,
                type: "success",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.function_Inicio();
                $scope.$apply();
              }, 2000);
            } else {
              swal("Notificación", data.Nombre, "warning");
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
      $scope.function_insertarSolicitud = function () {
        var fechaqx = '';
        if ( $scope.form1.selecctipoDocumento == "" || $scope.form1.numeroDocumento == "" || $scope.form1.diagnosticoPrincipal == "" || $scope.form1.oficinaSeccional == "" || $scope.form1.nombreMedico == "" || $scope.form1.ipsSolicitante == "" || $scope.form1.procedimiento == "" || $scope.form1.cuentaconCotizacion == "" || $scope.form1.tipoSolicitud == "") {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form1_selecctipoDocumento_label",
              id_input: "id_form1_selecctipoDocumento",
            },
            {
              Codigo: "2",
              id_label: "id_form1_numeroDocumento_label",
              id_input: "id_form1_numeroDocumento",
            },
            {
              Codigo: "3",
              id_label: "id_form1_diagnosticoPrincipal_label",
              id_input: "id_form1_diagnosticoPrincipal",
            },
            {
              Codigo: "4",
              id_label: "id_form1_oficinaSeccional_label",
              id_input: "id_form1_oficinaSeccional",
            },
            {
              Codigo: "5",
              id_label: "id_form1_numerodocumentoMedico_label",
              id_input: "id_form1_numerodocumentoMedico",
            },
            {
              Codigo: "6",
              id_label: "id_form1_nombreMedico_label",
              id_input: "id_form1_nombreMedico",
            },
            {
              Codigo: "7",
              id_label: "id_form1_ipsSolicitante_label",
              id_input: "id_form1_ipsSolicitante",
            },
            {
              Codigo: "8",
              id_label: "id_form1_procedimiento_label",
              id_input: "id_form1_procedimiento",
            },
            {
              Codigo: "9",
              id_label: "id_form1_cuentaconCotizacion_label",
              id_input: "id_form1_cuentaconCotizacion",
            },
            {
              Codigo: "10",
              id_label: "id_form1_tipoSolicitud_label",
              id_input: "id_form1_tipoSolicitud",
            },
            {
              Codigo: "11",
              id_label: "id_cargue_soporte_label",
              id_input: "id_cargue_soporte",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }
        if($scope.form1.cuentaconCotizacion == 'S' && document.getElementById("id_cargue_cotizacion").files.length == 0){
            swal({
              title: "¡Alerta¡",
              text: "Por favor cargue la cotizacion",
              type: "warning",
            }).catch(swal.noop);
            return
        }
        if(document.getElementById("id_cargue_soporte").files.length == 0){
          swal({
            title: "¡Alerta¡",
            text: "Por favor cargue los documentos solicitados",
            type: "warning",
          }).catch(swal.noop);
          return
        }
        if ($scope.form1.tipoSolicitud == "A" && $scope.form1.tipoProceso == "") {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "12",
              id_label: "id_form1_tipoProceso_label",
              id_input: "id_form1_tipoProceso",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }
        if ( $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == null || $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == "aN/aN/NaN") {
          fechaqx = "";
        } else {
          fechaqx = $scope.formatDatefecha($scope.form1.fechaCirugia);
        }
        if ($scope.form1.tipoProceso == "P" && $scope.show_pqr != true) {
          swal({
            title: "¡Alerta¡",
            text: 'El Afiliado no cuenta con una PQR, por favor cambie el proceso para proceder a guardar',
            type: "warning",
          }).catch(swal.noop);
          return;
        }
        if ($scope.form1.tipoProceso == "P" && $scope.form1.numeroPqr == '') {
          swal({
            title: "¡Alerta¡",
            text: 'Por favor ingrese al icono de PQR y seleccione el numero de pqr asociada',
            type: "warning",
          }).catch(swal.noop);
          return;
        }

        if ($scope.form1.tipoSolicitud == "H" && $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == undefined || $scope.form1.fechaCirugia == "aN/aN/NaN") {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "13",
              id_label: "id_form1_fechaCirugia_label",
              id_input: "id_form1_fechaCirugia",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_UI_SOLICITUD_INSERT",
              vdocumento: $scope.form1.documentoEditar,
              vnumero: $scope.form1.consecutivoEditar,
              vptipodocumento: $scope.form1.selecctipoDocumento,
              vpafiliado: $scope.form1.numeroDocumento,
              vptiposolicitud: $scope.form1.tipoSolicitud,
              vpproceso: $scope.form1.tipoProceso,
              vpnumeropqr: $scope.form1.numeroPqr,
              vpnumerotutela: $scope.form1.numeroTutela,
              vpcoddx: $scope.form1.diagnosticoPrincipal,
              vpcoddx1: $scope.form1.diagnosticoSegundario,
              vpoficina: $scope.form1.oficinaSeccional,
              vpdocumentomedico: $scope.form1.numerodocumentoMedico,
              vpnombremedico: $scope.form1.nombreMedico,
              vpcotizacion: $scope.form1.cuentaconCotizacion,
              vpsoporte:
              $scope.form1.cotizacionCargada || $scope.cargue.cotizacion,
              vpcantsoportes: $scope.cantidadSoporte,
              vpfechaorden: $scope.formatDatefecha($scope.SysDay),
              vpnitsolicitante: $scope.form1.ipsSolicitante,
              vpespmedico: $scope.form1.especialidad,
              vpestado: "T",
              vpfechaaprobacion: "",
              vpaccion: "I",
              vpadjunto: $scope.form1.adjuntos || $scope.cargue.soporte,
              vpcantproductos: "",
              vjsonproductos: "",
              vpcantcups: "",
              vjsoncups: "",
              vppfechaqx: fechaqx,
              vpdocsolicitante:'',
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if (data.Codigo == 0) {
                swal({
                  title: "Información",
                  html: data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                // swal({
                //   title: "Información",
                //   html: data[0].Mensaje + ' ' + '<br> Consecutivo #' + ' ' + data[0].Consecutivo,
                //   type: "success"
                // }).catch(swal.noop);
                setTimeout(() => {
                  $scope.function_Inicio();
                  $scope.$apply();
                }, 2000);
              } else {
                swal("Notificación", data.Nombre, "warning");
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
      $scope.function_insertar_o_actualizarsolicitudProveedor = function (accion) {
        if(accion == 'I'){
          var fechaqx = '';
          if ( $scope.form1.selecctipoDocumento == "" || $scope.form1.numeroDocumento == "" || 
            $scope.form1.diagnosticoPrincipal == "" || $scope.form1.oficinaSeccional == "" || 
            $scope.form1.nombreMedico == "" || $scope.form1.procedimiento == "" || $scope.form1.cuentaconCotizacion == "") {
            swal({
              title: "Notificación",
              text: "Completa todos los campos obligatorios (*).",
              type: "warning",
            }).catch(swal.noop);
            let elementosAValidar = [
              {
                Codigo: "1",
                id_label: "id_form1_selecctipoDocumento_label",
                id_input: "id_form1_selecctipoDocumento",
              },
              {
                Codigo: "2",
                id_label: "id_form1_numeroDocumento_label",
                id_input: "id_form1_numeroDocumento",
              },
              {
                Codigo: "3",
                id_label: "id_form1_diagnosticoPrincipal_label",
                id_input: "id_form1_diagnosticoPrincipal",
              },
              {
                Codigo: "4",
                id_label: "id_form1_oficinaSeccional_label",
                id_input: "id_form1_oficinaSeccional",
              },
              {
                Codigo: "5",
                id_label: "id_form1_numerodocumentoMedico_label",
                id_input: "id_form1_numerodocumentoMedico",
              },
              {
                Codigo: "6",
                id_label: "id_form1_nombreMedico_label",
                id_input: "id_form1_nombreMedico",
              },
              {
                Codigo: "7",
                id_label: "id_form1_procedimiento_label",
                id_input: "id_form1_procedimiento",
              },
              {
                Codigo: "8",
                id_label: "id_form1_cuentaconCotizacion_label",
                id_input: "id_form1_cuentaconCotizacion",
              },
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          }
          if($scope.form1.cuentaconCotizacion == 'S' && document.getElementById("id_cargue_cotizacion").files.length == 0){
              swal({
                title: "¡Alerta¡",
                text: "Por favor cargue la cotizacion",
                type: "warning",
              }).catch(swal.noop);
              return
          }
          if(document.getElementById("id_cargue_soporte").files.length == 0){
            swal({
              title: "¡Alerta¡",
              text: "Por favor cargue los documentos solicitados",
              type: "warning",
            }).catch(swal.noop);
            return
          }
          if ( $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == null || $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == "aN/aN/NaN") {
            fechaqx = "";
          } else {
            fechaqx = $scope.formatDatefecha($scope.form1.fechaCirugia);
          }
       
          if ($scope.form1.tipoSolicitud == "H" && $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == undefined || $scope.form1.fechaCirugia == "aN/aN/NaN") {
            swal({
              title: "Notificación",
              text: "Completa todos los campos obligatorios (*).",
              type: "warning",
            }).catch(swal.noop);
            let elementosAValidar = [
              {
                Codigo: "13",
                id_label: "id_form1_fechaCirugia_label",
                id_input: "id_form1_fechaCirugia",
              },
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          } else {
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_UI_SOLICITUD_INSERT",
                vdocumento: $scope.form1.documentoEditar,
                vnumero: $scope.form1.consecutivoEditar,
                vptipodocumento: $scope.form1.selecctipoDocumento,
                vpafiliado: $scope.form1.numeroDocumento,
                vptiposolicitud: 'H',
                vpproceso: '',
                vpnumeropqr: $scope.form1.numeroPqr,
                vpnumerotutela: $scope.form1.numeroTutela,
                vpcoddx: $scope.form1.diagnosticoPrincipal,
                vpcoddx1: $scope.form1.diagnosticoSegundario,
                vpoficina: $scope.form1.oficinaSeccional,
                vpdocumentomedico: $scope.form1.numerodocumentoMedico,
                vpnombremedico: $scope.form1.nombreMedico,
                vpcotizacion: $scope.form1.cuentaconCotizacion,
                vpsoporte: $scope.form1.cotizacionCargada || $scope.cargue.cotizacion,
                vpcantsoportes: $scope.cantidadSoporte,
                vpfechaorden: $scope.formatDatefecha($scope.SysDay),
                vpnitsolicitante: $scope.sessionNit,
                vpespmedico: $scope.form1.especialidad,
                vpestado: "T",
                vpfechaaprobacion: "",
                vpaccion: 'I',
                vpadjunto: $scope.form1.adjuntos || $scope.cargue.soporte,
                vpcantproductos: "",
                vjsonproductos: "",
                vpcantcups: "",
                vjsoncups: "",
                vppfechaqx: fechaqx,
                vpdocsolicitante:  $scope.responsable,
              },
            }).then(function ({ data }) {
              if (data && data.toString().substr(0, 3) != "<br") {
                if (data.Codigo == 0) {
                  swal({
                    title: "Información",
                    html: data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  // swal({
                  //   title: "Información",
                  //   html: data[0].Mensaje + ' ' + '<br> Consecutivo #' + ' ' + data[0].Consecutivo,
                  //   type: "success"
                  // }).catch(swal.noop);
                  setTimeout(() => {
                    $scope.function_Inicio();
                    $scope.$apply();
                  }, 2000);
                } else {
                  swal("Notificación", data.Nombre, "warning");
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
          var fechaqx = '';
          if ( $scope.form1.selecctipoDocumento == "" || $scope.form1.numeroDocumento == "" || $scope.form1.diagnosticoPrincipal == "" || $scope.form1.oficinaSeccional == "" || 
               $scope.form1.nombreMedico == "" || $scope.form1.procedimiento == "" || $scope.form1.cuentaconCotizacion == "") {
            swal({
              title: "Notificación",
              text: "Completa todos los campos obligatorios (*).",
              type: "warning",
            }).catch(swal.noop);
            let elementosAValidar = [
              {
                Codigo: "1",
                id_label: "id_form1_selecctipoDocumento_label",
                id_input: "id_form1_selecctipoDocumento",
              },
              {
                Codigo: "2",
                id_label: "id_form1_numeroDocumento_label",
                id_input: "id_form1_numeroDocumento",
              },
              {
                Codigo: "3",
                id_label: "id_form1_diagnosticoPrincipal_label",
                id_input: "id_form1_diagnosticoPrincipal",
              },
              {
                Codigo: "4",
                id_label: "id_form1_oficinaSeccional_label",
                id_input: "id_form1_oficinaSeccional",
              },
              {
                Codigo: "5",
                id_label: "id_form1_numerodocumentoMedico_label",
                id_input: "id_form1_numerodocumentoMedico",
              },
              {
                Codigo: "6",
                id_label: "id_form1_nombreMedico_label",
                id_input: "id_form1_nombreMedico",
              },
              {
                Codigo: "7",
                id_label: "id_form1_procedimiento_label",
                id_input: "id_form1_procedimiento",
              },
              {
                Codigo: "8",
                id_label: "id_form1_cuentaconCotizacion_label",
                id_input: "id_form1_cuentaconCotizacion",
              },
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          }
          if ( $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == null || $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == "aN/aN/NaN") {
            fechaqx = "";
          } else {
            fechaqx = $scope.formatDatefecha($scope.form1.fechaCirugia);
          }
       
          if ($scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == undefined || $scope.form1.fechaCirugia == "aN/aN/NaN") {
            swal({
              title: "Notificación",
              text: "Completa todos los campos obligatorios (*).",
              type: "warning",
            }).catch(swal.noop);
            let elementosAValidar = [
              {
                Codigo: "13",
                id_label: "id_form1_fechaCirugia_label",
                id_input: "id_form1_fechaCirugia",
              },
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          } else {
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_UI_SOLICITUD_UPDATE",
                vdocumento: $scope.form1.documentoEditar,
                vnumero: $scope.form1.consecutivoEditar,
                vptipodocumento: $scope.form1.selecctipoDocumento,
                vpafiliado: $scope.form1.numeroDocumento,
                vptiposolicitud: 'H',
                vpproceso: '',
                vpnumeropqr: $scope.form1.numeroPqr,
                vpnumerotutela: $scope.form1.numeroTutela,
                vpcoddx: $scope.form1.diagnosticoPrincipal,
                vpcoddx1: $scope.form1.diagnosticoSegundario,
                vpoficina: $scope.form1.oficinaSeccional,
                vpdocumentomedico: $scope.form1.numerodocumentoMedico,
                vpnombremedico: $scope.form1.nombreMedico,
                vpcotizacion: $scope.form1.cuentaconCotizacion,
                vpsoporte1: $scope.form1.cotizacionCargada,
                vpsoporte2: $scope.cargue.cotizacion,
                vpcantsoportes: $scope.cantidadSoporte,
                vpfechaorden: $scope.formatDatefecha($scope.SysDay),
                vpnitsolicitante: $scope.form1.ipsSolicitante,
                vpespmedico: $scope.form1.especialidad,
                vpestado: "T",
                vpfechaaprobacion: "",
                vpaccion: 'U',
                vpadjunto1: $scope.form1.adjuntos,
                vpadjunto2: $scope.cargue.soporte,
                vpcantproductos: "",
                vjsonproductos: "",
                vpcantcups: "",
                vjsoncups: "",
                vppfechaqx: fechaqx,
                vpdocsolicitante:  $scope.responsable,
              },
            }).then(function ({ data }) {
              if (data && data.toString().substr(0, 3) != "<br") {
                if (data.Codigo == 0) {
                  swal({
                    title: "Información",
                    html: data.Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  // swal({
                  //   title: "Información",
                  //   html: data[0].Mensaje + ' ' + '<br> Consecutivo #' + ' ' + data[0].Consecutivo,
                  //   type: "success"
                  // }).catch(swal.noop);
                  setTimeout(() => {
                    $scope.function_Inicio();
                    $scope.$apply();
                  }, 2000);
                } else {
                  swal("Notificación", data.Nombre, "warning");
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
      $scope.function_actualizarSolicitud = function () {
        var fechaqx = '';
        if ( $scope.form1.selecctipoDocumento == "" || $scope.form1.numeroDocumento == "" || $scope.form1.diagnosticoPrincipal == "" || $scope.form1.oficinaSeccional == "" || $scope.form1.nombreMedico == "" || $scope.form1.ipsSolicitante == "" || $scope.form1.procedimiento == "" || $scope.form1.cuentaconCotizacion == "" || $scope.form1.tipoSolicitud == ""
        ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form1_selecctipoDocumento_label",
              id_input: "id_form1_selecctipoDocumento",
            },
            {
              Codigo: "2",
              id_label: "id_form1_numeroDocumento_label",
              id_input: "id_form1_numeroDocumento",
            },
            {
              Codigo: "3",
              id_label: "id_form1_diagnosticoPrincipal_label",
              id_input: "id_form1_diagnosticoPrincipal",
            },
            {
              Codigo: "4",
              id_label: "id_form1_oficinaSeccional_label",
              id_input: "id_form1_oficinaSeccional",
            },
            {
              Codigo: "5",
              id_label: "id_form1_numerodocumentoMedico_label",
              id_input: "id_form1_numerodocumentoMedico",
            },
            {
              Codigo: "6",
              id_label: "id_form1_nombreMedico_label",
              id_input: "id_form1_nombreMedico",
            },
            {
              Codigo: "7",
              id_label: "id_form1_ipsSolicitante_label",
              id_input: "id_form1_ipsSolicitante",
            },
            {
              Codigo: "8",
              id_label: "id_form1_procedimiento_label",
              id_input: "id_form1_procedimiento",
            },
            {
              Codigo: "9",
              id_label: "id_form1_cuentaconCotizacion_label",
              id_input: "id_form1_cuentaconCotizacion",
            },
            {
              Codigo: "10",
              id_label: "id_form1_tipoSolicitud_label",
              id_input: "id_form1_tipoSolicitud",
            },
            {
              Codigo: "11",
              id_label: "id_cargue_soporte_label",
              id_input: "id_cargue_soporte",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }
        if ($scope.form1.tipoSolicitud == "A" && $scope.form1.tipoProceso == "" ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "12",
              id_label: "id_form1_tipoProceso_label",
              id_input: "id_form1_tipoProceso",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }
        if ( $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == null || $scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == "aN/aN/NaN") {
          fechaqx = "";
        } else {
          fechaqx = $scope.formatDatefecha($scope.form1.fechaCirugia);
        }
        if($scope.form1.cuentaconCotizacion == 'S' && document.getElementById("id_cargue_cotizacion").files.length == 0 && $scope.cargue.cotizacion == null ){
          swal({
            title: "¡Alerta¡",
            text: "Por favor cargue la cotizacion",
            type: "warning",
          }).catch(swal.noop);
          return
        }
        if($scope.form1.cuentaconCotizacion == 'N'){

          $scope.cargue.cotizacion = '' ;
        }
        if ($scope.form1.tipoSolicitud == "H" && ($scope.form1.fechaCirugia == "" || $scope.form1.fechaCirugia == undefined || $scope.form1.fechaCirugia == "aN/aN/NaN")) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "13",
              id_label: "id_form1_fechaCirugia_label",
              id_input: "id_form1_fechaCirugia",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_UI_SOLICITUD_UPDATE",
              vdocumento: $scope.form1.documentoEditar,
              vnumero: $scope.form1.consecutivoEditar,
              vptipodocumento: $scope.form1.selecctipoDocumento,
              vpafiliado: $scope.form1.numeroDocumento,
              vptiposolicitud: $scope.form1.tipoSolicitud,
              vpproceso: $scope.form1.tipoProceso,
              vpnumeropqr: $scope.form1.numeroPqr,
              vpnumerotutela: $scope.form1.numeroTutela,
              vpcoddx: $scope.form1.diagnosticoPrincipal,
              vpcoddx1: $scope.form1.diagnosticoSegundario,
              vpoficina: $scope.form1.oficinaSeccional,
              vpdocumentomedico: $scope.form1.numerodocumentoMedico,
              vpnombremedico: $scope.form1.nombreMedico,
              vpcotizacion: $scope.form1.cuentaconCotizacion,
              vpsoporte1: $scope.form1.cotizacionCargada,
              vpsoporte2: $scope.cargue.cotizacion,
              vpcantsoportes: $scope.cantidadSoporte,
              vpfechaorden: $scope.formatDatefecha($scope.SysDay),
              vpnitsolicitante: $scope.form1.ipsSolicitante,
              vpespmedico: $scope.form1.especialidad,
              vpestado: "",
              vpfechaaprobacion: "",
              vpaccion: "U",
              vpadjunto1: $scope.form1.adjuntos,
              vpadjunto2: $scope.cargue.soporte,
              vpcantproductos: "",
              vjsonproductos: "",
              vpcantcups: "",
              vjsoncups: "",
              vppfechaqx: fechaqx,
              vpdocsolicitante:  $scope.responsable,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if (data.Codigo == 0) {
                swal({
                  title: "Información",
                  html: data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                // swal({
                //   title: "Información",
                //   html: data[0].Mensaje + ' ' + '<br> Consecutivo #' + ' ' + data[0].Consecutivo,
                //   type: "success"
                // }).catch(swal.noop);
                setTimeout(() => {
                  $scope.function_Inicio();
                  $scope.$apply();
                }, 1000);
              } else {
                swal("Notificación", data[0].Nombre, "warning");
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
      $scope.function_Obtener_Tipos_Documentos = function () {
        $scope.Tipos_Documentos = [];
        $http({
          method: "POST",
          url: "php/genesis/funcgenesis.php",
          data: {
            function: "Obtener_Tipos_Documentos",
            Tipo: "S",
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            $scope.Tipos_Documentos = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_cambiarEstado = function () {
        $scope.elementosAValidar = [];
        if($scope.form2.estadoRevision == '' || $scope.form2.estadoRevision == undefined ){
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form2_estadoRevision_label",
              id_input: "id_form2_estadoRevision",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;

        } if($scope.form2.estadoRevision == 'X' && ($scope.form2.motivoaAnulacion == '' || $scope.form2.motivoaAnulacion == undefined  || $scope.form2.observacionAnulacion == '' || $scope.form2.observacionAnulacion == undefined)){
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form2_estadoRevision_label",
              id_input: "id_form2_estadoRevision",
            },
            {
              Codigo: "2",
              id_label: "id_form2_motivoaAnulacion_label",
              id_input: "id_form2_motivoaAnulacion",
            },
            {
              Codigo: "3",
              id_label: "id_form2_observacionAnulacion_label",
              id_input: "id_form2_observacionAnulacion",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;

        }if($scope.form2.estadoRevision == 'D' && ($scope.form2.motivoDevolucion == '' || $scope.form2.motivoDevolucion == undefined || $scope.form2.observacionDevolucion == '' || $scope.form2.observacionDevolucion == undefined)){
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form2_estadoRevision_label",
              id_input: "id_form2_estadoRevision",
            },
            {
              Codigo: "2",
              id_label: "id_form2_motivoDevolucion_label",
              id_input: "id_form2_motivoDevolucion",
            },
            {
              Codigo: "3",
              id_label: "id_form2_observacionDevolucion_label",
              id_input: "id_form2_observacionDevolucion",
            }
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        }else{

        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_U_ESTADO_MATERIALES",
            vpdocumento: $scope.form2.documento,
            vpnumero: $scope.form2.consecutivo,
            vpmotivo: $scope.form2.motivoaAnulacion || $scope.form2.motivoDevolucion,
            vpestado: $scope.form2.estadoRevision,
            vpobservacion: $scope.form2.observacionAnulacion || $scope.form2.observacionDevolucion,
          },
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if (data[0].Codigo == 0) {
              swal({
                title: "Información",
                html: data[0].Nombre,
                type: "success",
              }).catch(swal.noop);
              setTimeout(() => {
                $scope.function_Inicio();
                $scope.$apply();
              }, 2000);
            } else {
              swal("Notificación", data[0].Nombre, "warning");
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
      $scope.function_buscarDiagnostico = function (diag, numero) {
        // setTimeout(() => { $scope.apply(); }, 200);
        if (diag == "" || diag == undefined) {
          swal(
            "Importante",
            "El campo  de texto no puede estar vacio!",
            "info"
          );
          return;
        }
        if (numero == 1) {
          if (
            $scope.form1.edad == "" ||
            $scope.form1.edad == undefined ||
            $scope.form1.sexo == "" ||
            $scope.form1.sexo == undefined
          ) {
            swal(
              "Importante",
              "Debe diligenciar la informacion del paciente!",
              "info"
            );
            return;
          } else {
            var sexo = $scope.form1.sexo;
            var edad = $scope.form1.edad;
          }
        }
        // setTimeout(() => {
        //   $scope.apply();
        // }, 500);
        $http({
          method: "POST",
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: "obtenerDiagnostico",
            codigo: diag,
            sexo: sexo,
            edad: edad,
          },
        }).then(function (response) {
          $scope.listDiagnosticos = [];
          if (response.data["0"].Codigo == "-1") {
            swal("Importante", response.data["0"].Nombre, "info");
            $scope.inactivebarradiag = true;
          } else if (response.data["0"].Codigo == "0") {
            swal(
              "Importante",
              "Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico",
              "info"
            );
            $scope.inactivebarradiag = true;
          } else {
            $scope.listDiagnosticos = response.data;
            $scope.inactivebarradiag = false;
          }
        });
      };
      $scope.function_seleccionardiagnostico = function (data, tipo, numero) {
        if (numero == 1) {
          var text = "";
          if ($scope.tipoaut == "1") {
            if (tipo == "P") {
              $scope.form1.diagnosticoPrincipal = data.Nombre;
              $scope.form1.diagnosticoPrincipal = data.Codigo;
              text = "Principal";
            } else {
              if($scope.form1.diagnosticoPrincipal ===  $scope.form1.diagnosticoSegundario){
                swal({
                  title: "¡Alerta¡",
                  text: 'El diagnostico principal no puede ser igual al segundario.',
                  type: "warning",
                }).catch(swal.noop);
                return
              }else{
              $scope.form1.diagnosticoSegundario = data.Nombre;
              $scope.form1.diagnosticoSegundario = data.Codigo;
              text = "Secundario";
              $("#modaldiagnostico").modal("close");
              }
            }
          }
          swal({
            title: "Completado",
            text: "Diagnostico " + text + " Registrado",
            showConfirmButton: false,
            type: "success",
            timer: 800,
          });
        }
      };
      $scope.function_buscarProcedimiento = function (servicio) {
        $scope.listProcedimientos = [];
        if (servicio == "buscard1") {
          if ($scope.buscard1 == undefined || $scope.buscard1 == "") {
            swal({
              title: "¡Alerta!",
              text: "!Por favor digite el nombre o codigo del servicio!",
              type: "warning",
            }).catch(swal.noop);
            $scope.listProcedimientos = [];
          } else {
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_LISTA_CUPS",
                vpcoincidencia: $scope.buscard1,
              },
            }).then(function (response) {
              if (response.data[0].Codigo == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: "No se encontro informacion asociada",
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.listProcedimientos = response.data;
              }
            });
          }
        }
      };
      $scope.function_p_lista_ips_materiales = function () {
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_LISTA_IPS_MATERIALES",
          },
        }).then(function (response) {
          if (response.data[0].Codigo == "0") {
            swal({
              title: "¡Alerta¡",
              text: "No se encontro informacion asociada",
              type: "warning",
            }).catch(swal.noop);
          } else {
            $scope.listProveedor = response.data;
          }
        });
      };
      $scope.function_p_lista_gestion_ips = function (accion) {
        $scope.show_tabladeSolicitudes = false;
        $scope.list_DatosTemp = [];
        $scope.Vista1_datos = [];
        $http({
          method: "POST",
          url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
          data: {
            function: "P_LISTA_GESTION_IPS",
            vpdocumento: accion.DOCUMENTO,
            vpnumero: accion.CONSECUTIVO,
          },
        }).then(function ({ data }) {
          
          if (data[0].Codigo == "0") {
            swal({
              title: "¡Alerta¡",
              text: "No se encontro informacion asociada",
              type: "warning",
            }).catch(swal.noop);
          } else {
            $scope.show_tablarespuestaProveedores = true;
            $scope.Vista1_datos = data;
            $scope.init_pag_Tabla(data);
          }
        });
      };
      $scope.function_agregarProveedor = function (data) {
        
        // Verifica si el proveedor ya está en la lista
        var existeProveedor = $scope.proveedoresSeleccionados.some(function(proveedor) {
            return proveedor.NIT === data.CODIGO;
        });
        // Si el proveedor no existe, lo agrega
        if (!existeProveedor) {
            var nuevoProveedor = {
                NIT: data.CODIGO,
                NOMBRE: data.NOMBRE,
            };
            $scope.proveedoresSeleccionados.push(nuevoProveedor);
            $scope.cantidadProveedores = $scope.proveedoresSeleccionados.length;
        } else {
          swal({
            title: "¡Alerta¡",
            text: 'El proveedor ya ha sido agregado.',
            type: "warning",
          }).catch(swal.noop);
        }
      };
    
      $scope.function_quitarProveedor = function (accion) {
        // Aquí puedes agregar lógica para quitar el material de la lista
        var index = $scope.proveedoresSeleccionados.indexOf(accion);
        if (index !== -1) {
          $scope.proveedoresSeleccionados.splice(index, 1);
        }
      };
      $scope.function_p_u_ips_materiales_asignarProveedor = function (accion,info) {
        if ($scope.proveedoresSeleccionados.length == 0) {
          swal({
            title: "Notificación",
            html: "Por favor, asigne un proveedor",
            type: "warning",
          }).catch(swal.noop);
        } else {
          swal({
            title: "IMPORTANTE",
            text: "¿Esta seguro de asignar este proveedor?",
            type: "question",
            showCancelButton: true,
          }).then((result) => {
            if (result) {
              if (info == undefined) {
                $scope.documento = "";
                $scope.renglon = "";
                $scope.numero = "";
              } else {
                $scope.renglon = info.RENGLON;
                $scope.documento = info.DOCUMENTO;
                $scope.numero = info.NUMERO;
              }
              $http({
                method: "POST",
                url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
                data: {
                  function: "P_U_IPS_MATERIALES",
                  vpdocumento: $scope.numeroDocumento || $scope.form2.documento || $scope.documento || $scope.form3.Documento,
                  vpnumero: $scope.numeroRegistro || $scope.form2.consecutivo || $scope.numero || $scope.form3.Consecutivo,
                  vprenglon: $scope.form2.reglon || $scope.renglon || $scope.form3.Renglon,
                  vpcantips: $scope.cantidadProveedores,
                  vpjasonips: JSON.stringify($scope.proveedoresSeleccionados),
                  vpaccion: accion,
                  vpdisponibilidad: $scope.form2.disponibiidadMaterial,
                  vpestado: accion,
                  vpobservacion: $scope.form2.observacionAnulacion,
                  vpadjunto: $scope.form2.adjuntoProveedor,
                  vpgasto: $scope.form3.adjuntogastoQuirurgico,
                },
              }).then(function ({ data }) {
                
                if (data && data.toString().substr(0, 3) != "<br") {
                  if (data[0].Codigo == 0) {
                    swal({
                      title: "Información",
                      html: data[0].Nombre,
                      type: "success",
                    }).catch(swal.noop);
                    $scope.show_tablarespuestaProveedores = false;
                    $("#modalgastosQuirurgico").modal("close");
                    setTimeout(() => {
                      $scope.function_Inicio();
                      $scope.$apply();
                    }, 2000);
                  } else {
                    swal("Notificación", data[0].Nombre, "warning");
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
      };
      $scope.function_p_u_ips_materiales = function (accion, info) {
        if(accion == "G" && ($scope.form2.disponibiidadMaterial == '' || $scope.form2.disponibiidadMaterial == undefined)){
          swal({
            title: "¡Alerta¡",
            text: "Por favor informar si Cuentas con la disponibilidad de los materiales",
            type: "warning",
          }).catch(swal.noop)
          return
        } 
        if(accion == "G" && (document.getElementById("id_cargue_adjuntoProveedor").files.length == 0 || document.getElementById("id_cargue_adjuntoProveedor").files.length == undefined || $scope.form2.observacionAnulacion == '')){
          swal({
            title: "¡Alerta¡",
            text: "Por favor adjunte el soporte y agregue una observacion",
            type: "warning",
          }).catch(swal.noop)
          return
        } 
        if (accion == "Q" && (document.getElementById("id_cargue_adjuntogastoQuirurgico").files.length == 0 || document.getElementById("id_cargue_adjuntogastoQuirurgico").files.length == undefined)) {
          swal({
            title: "¡Alerta¡",
            text: "Por favor cargue el gasto QX",
            type: "warning",
          }).catch(swal.noop);
        return
        }else{
        swal({
          title: "IMPORTANTE",
          text: "¿Esta seguro de seguir con el proceso?",
          type: "question",
          showCancelButton: true,
        }).then((result) => {
          if (result) {
            if (info == undefined) {
              $scope.documento = "";
              $scope.renglon = "";
              $scope.numero = "";
            } else {
              $scope.renglon = info.RENGLON;
              $scope.documento = info.DOCUMENTO;
              $scope.numero = info.NUMERO;
            }
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_U_IPS_MATERIALES",
                vpdocumento: $scope.numeroDocumento || $scope.form2.documento || $scope.documento || $scope.form3.Documento,
                vpnumero: $scope.numeroRegistro || $scope.form2.consecutivo || $scope.numero || $scope.form3.Consecutivo,
                vprenglon: $scope.form2.reglon || $scope.renglon || $scope.form3.Renglon,
                vpcantips: $scope.cantidadProveedores,
                vpjasonips: JSON.stringify($scope.proveedoresSeleccionados),
                vpaccion: accion,
                vpdisponibilidad: $scope.form2.disponibiidadMaterial,
                vpestado: accion,
                vpobservacion: $scope.form2.observacionAnulacion,
                vpadjunto: $scope.form2.adjuntoProveedor,
                vpgasto: $scope.form3.adjuntogastoQuirurgico,
              },
            }).then(function ({ data }) {
              
              if (data && data.toString().substr(0, 3) != "<br") {
                if (data[0].Codigo == 0) {
                  swal({
                    title: "Información",
                    html: data[0].Nombre,
                    type: "success",
                  }).catch(swal.noop);
                  $scope.show_tablarespuestaProveedores = false;
                  $("#modalgastosQuirurgico").modal("close");
                  setTimeout(() => {
                    $scope.function_Inicio();
                    $scope.$apply();
                  }, 2000);
                } else {
                  swal("Notificación", data[0].Nombre, "warning");
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
      };
      $scope.function_p_u_anula_materiales = function () {
        if ($scope.form3.motivoaAnulacion == "" || $scope.form3.motivoaAnulacion == undefined || $scope.form3.observacionAnulacion == "" || $scope.form3.observacionAnulacion == undefined ) {
          swal({
            title: "Notificación",
            text: "Completa todos los campos obligatorios (*).",
            type: "warning",
          }).catch(swal.noop);
          let elementosAValidar = [
            {
              Codigo: "1",
              id_label: "id_form3_motivoaAnulacion_label",
              id_input: "id_form3_motivoaAnulacion",
            },
            {
              Codigo: "2",
              id_label: "id_form3_observacionAnulacion_label",
              id_input: "id_form3_observacionAnulacion",
            },
          ];
          elementosAValidar.forEach(function (elemento) {
            $scope.validarVacio(elemento.id_input, elemento.id_label);
          });
          return;
        } else {
          swal({
            title: "IMPORTANTE",
            text: "¿Esta seguro de anular la solicitud?",
            type: "question",
            showCancelButton: true,
          }).then((result) => {
            if (result) {
              $http({
                method: "POST",
                url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
                data: {
                  function: "P_U_ANULA_MATERIALES",
                  vpdocumento: $scope.form3.numeroDocumento,
                  vpnumero: $scope.form3.numeroRegistro,
                  vpmotivo: $scope.form3.motivoaAnulacion,
                  vpobservacion: $scope.form3.observacionAnulacion,
                },
              }).then(function ({ data }) {
                
                if (data && data.toString().substr(0, 3) != "<br") {
                  if (data.Codigo == 0) {
                    swal({
                      title: "Información",
                      html: data[0].Nombre,
                      type: "success",
                    }).catch(swal.noop);
                    $("#modalobservaciones").modal("close");
                    setTimeout(() => {
                      $scope.function_Inicio();
                      $scope.$apply();
                    }, 2000);
                  } else {
                    swal("Notificación", data[0].Nombre, "warning");
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
      };
      $scope.function_agregarProcedimiento = function (data) {
      // Verifica si el procedimiento ya está en la lista
        var existenteProcedimiento = $scope.procedimientoSeleccionados.some(function(procedimiento){
          return procedimiento.CODIGO_PRDUCTO === data.Codigo;
        });
      // Si el  procedimiento no existe, lo agrega
       if (!existenteProcedimiento) {
        var nuevoProcedimiento = {
          CODIGO_PRDUCTO: data.Codigo,
          NOMBRE: data.Nombre,
        };
        $scope.procedimientoSeleccionados.push(nuevoProcedimiento);
        $scope.cantidadProcedimiento = $scope.procedimientoSeleccionados.length;
        ($scope.buscard1 = ""), ($scope.listProcedimientos = []);
        $scope.function_limpiar("4");
        }else{
          swal({
            title: "¡Alerta¡",
            text: 'El procedimiento ya ha sido agregado.',
            type: "warning",
          }).catch(swal.noop);
          ($scope.buscard1 = ""), ($scope.listProcedimientos = []);
          $scope.function_limpiar("4");
        }
      };
      $scope.function_quitarProcedimiento = function (material) {
        // Aquí puedes agregar lógica para quitar el material de la lista
        var index = $scope.procedimientoSeleccionados.indexOf(material);
        if (index !== -1) {
          $scope.procedimientoSeleccionados.splice(index, 1);
        }
      };
      $scope.function_buscarEspecialidades = function (servicio) {
        if (servicio == "buscard3") {
          if ($scope.buscard3 == undefined || $scope.buscard3 == "") {
            swal({
              title: "¡Alerta!",
              text: "!Por favor digite el nombre o codigo del servicio!",
              type: "warning",
            }).catch(swal.noop);
            $scope.listEspecialidades = [];
          } else {
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_LISTA_PRODUCTOS",
                vpcoincidencia: $scope.buscard3,
              },
            }).then(function (response) {
              if (response.data[0].Codigo == "0") {
                swal({
                  title: "¡Alerta¡",
                  text: "No se encontro informacion asociada",
                  type: "warning",
                }).catch(swal.noop);
              } else {
                $scope.listEspecialidades = response.data;
              }
            });
          }
        }
      };
      $scope.function_obtenerPqr = function (accion) {
        $scope.list_pqr = [];
        if (accion == "P") {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTENER_PQR",
              vptipodocumento: $scope.form1.selecctipoDocumento,
              vpdocumento: $scope.form1.numeroDocumento,
            },
          }).then(function ({ data }) {
            if (data.Codigo == 1) {
              $scope.show_pqr = false;
              swal({
                title: "¡Alerta¡",
                text: data.Nombre,
                type: "warning",
              }).catch(swal.noop);
              return;
            } else {
              $scope.show_pqr = true;
              $scope.list_pqr = data;
              
            }
          });
        }else{
          $scope.show_pqr = false;
          $scope.list_DatosTemp = [];
          $scope.form1.numeroPqr = '';
        }
      };
      $scope.function_seleccionarPqr = function (data) {
        //console.log("linea 2558 - function_seleccionarEspecialidad", data);
        $scope.form1.numeroPqr = data.CODIGO_PQR;
        // var codigo = data.CODIGO;
        // var nombre = data.NOMBRE;
        // $scope.buscard7 = '',
        // $scope.form1.procedimiento = codigo +'-'+ nombre;
        // $scope.form1.especialidad = codigo;
        // console.log('linea 1191 - function_seleccionarEspecialidad', $scope.form1.procedimiento);
        // $scope.material.nombre = data.Nombre;
        // $scope.material.referencia = data.Codigo;
        // $scope.material.pos = data.POS;
        $("#modalPqr").modal("close");
      };
      $scope.function_seleccionarEspecialidad = function (data) {
       // console.log("linea 1186 - function_seleccionarEspecialidad", data);
        
        var codigo = data.CODIGO;
        var nombre = data.NOMBRE;
        ($scope.buscard7 = ""),
          ($scope.form1.procedimiento = codigo + "-" + nombre);
        $scope.form1.especialidad = codigo;
       // console.log("linea 1191 - function_seleccionarEspecialidad",$scope.form1.procedimiento);
        $scope.material.nombre = data.Nombre;
        $scope.material.referencia = data.Codigo;
        $scope.material.pos = data.POS;
        $scope.listEspecialidades = [];
        $("#modalespecialidad").modal("close");
      };
      $scope.function_agregarMaterial = function () {
        $scope.buscard3 = "";
        if ($scope.material.pos == "S") {
          if ( $scope.material.referencia == "" || $scope.material.pos == "" || $scope.material.cantidad == "") {
            swal({
              title: "¡Alerta!",
              text: "Por favor ingrese los campos requeridos para agregar el material",
              type: "warning",
            }).catch(swal.noop);
            return;
           } else {
            let existenteMaterial = $scope.materialesSeleccionados.some(function(materiales){
              return materiales.CODIGO_PRDUCTO === $scope.material.referencia;
            });
            if(!existenteMaterial){
            var nuevoMaterial = {
              CODIGO_PRDUCTO: $scope.material.referencia,
              POS: $scope.material.pos,
              NOMBRE: $scope.material.nombre,
              MIPRES: $scope.material.mipres,
              CANTIDAD: $scope.material.cantidad,
            };
            $scope.materialesSeleccionados.push(nuevoMaterial);
            $scope.cantidadMateriales = $scope.materialesSeleccionados.length;
            $scope.function_limpiar("2");
          
          }else{
            swal({
              title: "¡Alerta¡",
              text: 'El material ya ha sido agregado.',
              type: "warning",
            }).catch(swal.noop);
            $scope.function_limpiar("2");
          }
        }
        if ($scope.material.pos == "N") {
          if ( $scope.material.referencia == "" || $scope.material.pos == "" || $scope.material.mipres == "" || $scope.material.cantidad == "" ) {
            swal({
              title: "¡Alerta!",
              text: "Por favor ingrese los campos requeridos para agregar el material",
              type: "warning",
            }).catch(swal.noop);
            return;
          } else {
            let existenteMaterial = $scope.materialesSeleccionados.some(function(materiales){
              return materiales.CODIGO_PRDUCTO === $scope.material.referencia;
            });
            if(!existenteMaterial){
                  var nuevoMaterial = {
                    CODIGO_PRDUCTO: $scope.material.referencia,
                    POS: $scope.material.pos,
                    NOMBRE: $scope.material.nombre,
                    MIPRES: $scope.material.mipres,
                    CANTIDAD: $scope.material.cantidad,
                  };
                  $scope.materialesSeleccionados.push(nuevoMaterial);
                  $scope.cantidadMateriales = $scope.materialesSeleccionados.length;
                  $scope.function_limpiar("2");
            }else{
              swal({
                title: "¡Alerta¡",
                text: 'El material ya ha sido agregado.',
                type: "warning",
              }).catch(swal.noop);
              $scope.function_limpiar("2");
            }
          }
         }
        }
      };
      $scope.function_quitarMaterial = function (material) {
        // Aquí puedes agregar lógica para quitar el material de la lista
        var index = $scope.materialesSeleccionados.indexOf(material);
        if (index !== -1) {
          $scope.materialesSeleccionados.splice(index, 1);
        }
      };
      $scope.function_buscarFuncionario = function () {
        if (
          $scope.modalUsuario.numeroDocumento == "" ||
          $scope.modalUsuario.numeroDocumento == ""
        ) {
          swal({
            title: "¡Alerta!",
            text: "No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_OBTENER_FUNCIONARIO",
              vpcoincidencia: $scope.modalUsuario.numeroDocumento,
            },
          }).then(function ({ data }) {
            if (data.Codigo == "1") {
              swal({
                title: "Funcionario",
                text: data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            } else {
              swal({
                title: "Funcionario",
                text: "Cargado correctamente",
                type: "success",
              }).catch(swal.noop);
              ($scope.modalUsuario.nombrefunCreado = data[0].Nombre),
                setTimeout(() => {
                  $scope.$apply();
                  swal.close();
                }, 1000);
            }
          });
        }
      };
      $scope.function_guardaruserMateriales = function (accion) {
        if (accion == "I") {
          var accion = "I";
        } else {
          accion = "U";
        }
        if (
          $scope.modalUsuario.numeroDocumento == "" ||
          $scope.modalUsuario.tipoUser == ""
        ) {
          swal({
            title: "Notificación",
            text: "No se permiten campos vacios en el formulario",
            type: "warning",
          }).catch(swal.noop);
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
            data: {
              function: "P_UI_FUNCIONARIOS",
              vpdocumento: $scope.modalUsuario.numeroDocumento,
              vptipo: $scope.modalUsuario.tipoUser,
              vpestado: $scope.modalUsuario.estadoVisible,
              vpaccion: accion,
            },
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != "<br") {
              if (data[0].Codigo == 0) {
                swal("Notificación", data[0].Nombre, "success");
                $scope.function_limpiar("modalUsuario");
                $scope.function_plistaFuncionario();
                $("#modalnuevoUser").modal("close");
              }
              if (data[0].Codigo == 1) {
                swal("Notificación", data[0].Nombre, "warning");
                $scope.function_limpiar("modalUsuario");
                $scope.function_plistaFuncionario();
                $("#modalnuevoUser").modal("close");
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
      $scope.function_editaruserMateriales = function (opcion) {
        // $scope.function_limpiar('modalUsuario');
        if (opcion.estado == "Inactivo") {
          var estado = "I";
        } else {
          var estado = "A";
        }
        $scope.function_disabledModal("E");
        $scope.function_openmodals("nuevoUsuario", "E");
        // $("#modaleditarUser").modal("open");
        $scope.modalUsuario.numeroDocumento = opcion.documento;
        $scope.modalUsuario.nombrefunCreado = opcion.nombre;
        $scope.modalUsuario.tipoUser = opcion.cod_tipo;
        $scope.modalUsuario.estadoVisible = estado;
      };
      $scope.function_openmodals = function (tipo, opcion, accion) {
        //console.log("function_openmodals", tipo, "/", opcion);
        $scope.buscard6 = "";
        $scope.buscard7 = "";
        $scope.busquedadetallegestionIps = "";
        $scope.busquedadetallegestionOber = "";
        $scope.tipoaut = opcion;
        var soptAdjunto = "";
        switch (tipo) {
          case "procedimiento":
            $scope.listEspecialidad = [];
            $scope.inactivebarradiag = true;
            $("#modalespecialidad").modal("open");
            $http({
              method: "POST",
              url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
              data: {
                function: "P_LISTA_ESPECIALIDAD",
                vpnit: $scope.form1.ipsSolicitante ||  $scope.sessionNit,
              },
            }).then(function ({ data }) {
              
              if (data && data.toString().substr(0, 3) != "<br") {
                $scope.listEspecialiadad = data;
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: data,
                  type: "warning",
                }).catch(swal.noop);
              }
            });
            setTimeout(() => {
              $("#modalespecialidad #diaginput").focus();
            }, 100);
            break;
          case "diagnostico":
            $scope.listDiagnosticos = [];
            $scope.inactivebarradiag = true;
            $("#modaldiagnostico").modal("open");
            setTimeout(() => {
              $("#modaldiagnostico #diaginput").focus();
            }, 100);
            break;
          case "verSoportes":
            if (opcion === 1) {
              soptAdjunto = $scope.cargue.cotizacion || opcion[0].adjunto;
            }
            if (opcion === 2) {
              soptAdjunto = $scope.cargue.soporte || opcion[0].cotizacion;
            }
            if (opcion.Codigo == 0) {
              swal({
                title: "¡Alerta!",
                text: "No hay documento ",
                type: "warning",
              }).catch(swal.noop);
            } else {
              swal({
                title: "Cargando Documento...",
                allowEscapeKey: false,
                allowOutsideClick: false,
              });
              swal.showLoading();
              $scope.documentoaVisualizar = "";
              $scope.titulodelSoporte = opcion.Nombtre;
              $http({
                method: "POST",
                url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
                data: {
                  function: "DESCARGARFILE",
                  ruta: soptAdjunto || opcion.Ruta || opcion.ADJUNTO,
                },
              }).then(function (response) {
                swal.close();
                // window.open("temp/" + response.data);
                $scope.documentoaVisualizar = "temp/" + response.data;
              });

              $("#modalsoportes").modal("open");
            }
            break;
          case "nuevoUsuario":
            if (opcion == "N") {
              $scope.modalUsuario.nombrefunCreado = [];
              $scope.function_limpiar("modalUsuario");
              $scope.function_disabledModal("N");
              $scope.show_modalBuscar = true;
              $scope.titulo_modal_usuario = "Agregar Usuario";
              $("#modalnuevoUser").modal("open");
              setTimeout(() => {
                $("#numeroDocumento").focus();
              }, 100);
              $scope.show_boton_editar = false;
              $scope.show_boton_guardar = true;
            } else {
              $scope.modalUsuario.nombrefunCreado = [];
              $scope.function_disabledModal("E");
              $scope.show_modalBuscar = false;
              $scope.titulo_modal_usuario = "Editar Usuario";
              $("#modalnuevoUser").modal("open");
              setTimeout(() => {
                $("#numeroDocumento").focus();
              }, 100);
              $scope.show_boton_editar = true;
              $scope.show_boton_guardar = false;
            }
            break;
          case "ips":
            $scope.listEspecialidad = [];
            $scope.listIps = [];
            $("#modalips").modal("open");
            setTimeout(() => {
              $("#modalips #ipsinput").focus();
            }, 100);
            break;
          case "gastosQuirurgico":
            $scope.form3.Documento = opcion.DOCUMENTO;
            $scope.form3.Consecutivo = opcion.CONSECUTIVO;
            $scope.form3.Renglon = opcion.RENGLON;
            $("#modalgastosQuirurgico").modal("open");
            setTimeout(() => {
              $("#modalgastosQuirurgico #ipsinput").focus();
            }, 100);
            break;
          case "pqr":
            $scope.listIps = [];
            $("#modalPqr").modal("open");
            break;
          case "observacion":
            $scope.function_p_lista_motivos("X");
            $scope.form3.numeroDocumento = opcion.DOCUMENTO;
            $scope.form3.numeroRegistro = opcion.CONSECUTIVO;
            $("#modalObservacion").modal("open");
            break;
          default:
        }
      };
      $scope.function_closemodals = function (tipo) {
        switch (tipo) {
          case "especialidad":
            $("#modalespecialidad").modal("close");
            break;
          case "diagnostico":
            $("#modaldiagnostico").modal("close");
            break;
          case "nuevoUsuario":
            // $scope.function_limpiar('1');
            $("#modalnuevoUser").modal("close");
            break;
          case "verSoportes":
            $("#modalsoportes").modal("close");
            break;
          case "ips":
            $("#modalips").modal("close");
            break;
          case "gastosQuirurgico":
            $("#modalgastosQuirurgico").modal("close");
            break;
          case "pqr":
            $("#modalPqr").modal("close");
            break;
          case "observacion":
            $("#modalObservacion").modal("close");
            break;
          default:
        }
      };
      $scope.function_disabledModal = function (accion) {
        if (accion == "E") {
          document.getElementById("numeroDocumento").disabled = true;
          document.getElementById("nombrefunCreado").disabled = true;
        } else {
          document.getElementById("numeroDocumento").disabled = false;
          document.getElementById("nombrefunCreado").disabled = true;
        }
      };
      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable]
            .toString()
            .replace(/[^0-9]/g, ""); // (564) 564 - 4564
          $scope[form][variable] = valor;
          const input = $scope[form][variable]
            .toString()
            .replace(/\D/g, "")
            .substring(0, 10); // 1234567890
          const zip = input.substring(0, 3); //123
          const middle = input.substring(3, 6); //456
          const last = input.substring(6, 10); //7890
          if (input.length > 6) {
            $scope[form][variable] = `(${zip}) ${middle} - ${last}`;
          } else if (input.length > 3) {
            $scope[form][variable] = `(${zip}) ${middle}`;
          } else if (input.length > 0) {
            $scope[form][variable] = `(${zip}`;
          }
          if (input.length >= 2 && zip.substring(0, 2).toString() != "60") {
            swal(
              "Mensaje",
              "El teléfono debe contener la siguiente estructura: (60) + el indicativo de la ciudad + el número del teléfono",
              "info"
            ).catch(swal.noop);
          }
        } else {
          $scope[form][variable] = "";
        }
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      };
      $scope.formatTexto = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, "");
        valor = valor.replace(/(\r\n|\n|\r)/g, " ");
        input.value = valor.toString().toUpperCase();
      };
      $scope.filtroEstado = function (valor) {
        $scope.Vista1.Filtrar_tprincipal = valor;
        $scope.chg_filtrar("Filtrar_tprincipal");
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
          $scope.list_DatosTemp = $filter("filter")(
            $scope.Vista1_datos,
            $scope.Vista1[varFiltro]
          );
          $scope.configPages();
          varFiltro = "";
          $scope.Vista1.Filtrar_tprincipal = "";
        } else {
          $scope.list_DatosTemp = $filter("filter")(
            $scope.Vista1_datos,
            $scope.Vista1[varFiltro]
          );
          $scope.configPages();
          varFiltro = "";
          $scope.Vista1.Filtrar_tprincipal = "";
        }
      };
      $scope.init_pag_Tabla = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.Vista1.Mostrar_Sol = 10;
        $scope.configPages();
      };
      $scope.init_pag_cant_Mostrar = function (valor) {
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
      document.addEventListener("change", (e) => {
        var input = e.target.defaultValue;
        let id2 = e.target.id;
        if (e.target.matches(".cargueArchivo1")) {
          setTimeout(() => {
            $scope.$apply();
          }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            const x = files[0].name.split(".");
            if (x[x.length - 1].toUpperCase() == "PDF") {
              if (files[0].size < 15485760 && files[0].size > 0) {
                $scope.getBase64(files[0]).then(function (result) {
                  $scope.form1.cotizacionCargada = result;
                });
              } else {
                let padre = document.querySelector(`#${id2}`).parentElement
                  .nextElementSibling.firstElementChild;
                let input = padre;
                let idText = input.id;
                document.querySelector(`#${idText}`).value = "";
                document.querySelector(`#${id2}`).value = "";
                swal(
                  "Advertencia",
                  "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                  "info"
                );
              }
            } else {
              let padre = document.querySelector(`#${id2}`).parentElement
                .nextElementSibling.firstElementChild;
              let input = padre;
              let idText = input.id;
              document.querySelector(`#${idText}`).value = "";
              document.querySelector(`#${id2}`).value = "";
              swal(
                "Advertencia",
                "¡El archivo seleccionado debe ser formato PDF!",
                "info"
              );
            }
          }
        }
      });
      document.addEventListener("change", (e) => {
        var input = e.target.defaultValue;
        let id2 = e.target.id;
        if (e.target.matches(".cargueArchivo2")) {
          setTimeout(() => {
            $scope.$apply();
          }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            const x = files[0].name.split(".");
            if (x[x.length - 1].toUpperCase() == "PDF") {
              if (files[0].size < 15485760 && files[0].size > 0) {
                $scope.getBase64(files[0]).then(function (result) {
                  $scope.form1.adjuntos = result;
                });
              } else {
                let padre = document.querySelector(`#${id2}`).parentElement
                  .nextElementSibling.firstElementChild;
                let input = padre;
                let idText = input.id;
                document.querySelector(`#${idText}`).value = "";
                document.querySelector(`#${id2}`).value = "";
                swal(
                  "Advertencia",
                  "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                  "info"
                );
              }
            } else {
              let padre = document.querySelector(`#${id2}`).parentElement
                .nextElementSibling.firstElementChild;
              let input = padre;
              let idText = input.id;
              document.querySelector(`#${idText}`).value = "";
              document.querySelector(`#${id2}`).value = "";
              swal(
                "Advertencia",
                "¡El archivo seleccionado debe ser formato PDF!",
                "info"
              );
            }
          }
        }
      });
      document.addEventListener("change", (e) => {
        var input = e.target.defaultValue;
        let id2 = e.target.id;
        if (e.target.matches(".cargueArchivo3")) {
          setTimeout(() => {
            $scope.$apply();
          }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            const x = files[0].name.split(".");
            if (x[x.length - 1].toUpperCase() == "PDF") {
              if (files[0].size < 15485760 && files[0].size > 0) {
                $scope.getBase64(files[0]).then(function (result) {
                  $scope.form2.adjuntoProveedor = result;
                });
              } else {
                let padre = document.querySelector(`#${id2}`).parentElement
                  .nextElementSibling.firstElementChild;
                let input = padre;
                let idText = input.id;
                document.querySelector(`#${idText}`).value = "";
                document.querySelector(`#${id2}`).value = "";
                swal(
                  "Advertencia",
                  "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                  "info"
                );
              }
            } else {
              let padre = document.querySelector(`#${id2}`).parentElement
                .nextElementSibling.firstElementChild;
              let input = padre;
              let idText = input.id;
              document.querySelector(`#${idText}`).value = "";
              document.querySelector(`#${id2}`).value = "";
              swal(
                "Advertencia",
                "¡El archivo seleccionado debe ser formato PDF!",
                "info"
              );
            }
          }
        }
      });
      document.addEventListener("change", (e) => {
        var input = e.target.defaultValue;
        let id2 = e.target.id;
        if (e.target.matches(".cargueArchivo4")) {
          setTimeout(() => {
            $scope.$apply();
          }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            const x = files[0].name.split(".");
            if (x[x.length - 1].toUpperCase() == "PDF") {
              if (files[0].size < 15485760 && files[0].size > 0) {
                $scope.getBase64(files[0]).then(function (result) {
                  $scope.form3.adjuntogastoQuirurgico = result;
                });
              } else {
                let padre = document.querySelector(`#${id2}`).parentElement
                  .nextElementSibling.firstElementChild;
                let input = padre;
                let idText = input.id;
                document.querySelector(`#${idText}`).value = "";
                document.querySelector(`#${id2}`).value = "";
                swal(
                  "Advertencia",
                  "¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!",
                  "info"
                );
              }
            } else {
              let padre = document.querySelector(`#${id2}`).parentElement
                .nextElementSibling.firstElementChild;
              let input = padre;
              let idText = input.id;
              document.querySelector(`#${idText}`).value = "";
              document.querySelector(`#${id2}`).value = "";
              swal(
                "Advertencia",
                "¡El archivo seleccionado debe ser formato PDF!",
                "info"
              );
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
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
      $scope.validarVacio = function (id, label) {
        // console.log("id", id, "label", label);
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
        // console.log("id", id, "label", label);
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
      if (document.readyState !== "loading") {
        $scope.function_Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.function_Inicio();
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
