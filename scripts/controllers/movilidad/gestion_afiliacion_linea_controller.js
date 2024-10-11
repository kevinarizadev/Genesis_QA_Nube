'use strict';
angular.module('GenesisApp').controller('gestion_afiliacion_linea_controller', ['$scope', '$http', 'consultaHTTP', 'notification', 'ngDialog', 'afiliacionHttp', '$filter', function ($scope, $http, consultaHTTP, notification, ngDialog, afiliacionHttp, $filter) {
  $(document).ready(function () {
    $('.tabs').tabs();
    $scope.editarafiliacion = false;
    $scope.vereditarbene = false;
    // document.querySelector("#afiempresa_tipo_cotizante").focus();
    // swal({
    //   html: "Señor Aportante en este acceso usted podrá disfrutar de nuestro servicio virtual de afiliación para movilidad régimen contributivo que hemos diseñado especialmente para usted. <br><br>La información que diligencie en los datos del cotizante y los beneficiarios debe ser acorde a los documentos de identidad de cada uno. Si se presentan inconsistencias en la información ingresada y los documentos anexos, el formulario será rechazado. ",
    //   width: 800,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   showConfirmButton: true,
    //   confirmButtonText: "Aceptar",
    //   animation: false
    // });
    // console.clear();
    console.log("1");
    //$scope.btns_gestion = true;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    // document.getElementById("afiempresa_fecha_ingreso").setAttribute("max", today);
  });

  $.getJSON("php/obtenersession.php").done(function (respuesta) {
    $scope.sesdata = respuesta;
    if ($scope.sesdata.cedula == "32612938" || $scope.sesdata.cedula == "32856342" ||   $scope.sesdata.cedula == "55313031" 
      || $scope.sesdata.cedula == "1193146754" || $scope.sesdata.cedula == "1044394720" || $scope.sesdata.cedula == "1140857421" || $scope.sesdata.cedula == "1129523418") {
      $scope.btns_gestion = false;
    } else {
      $scope.btns_gestion = true;
    }
  });

  $scope.resize_screen = "";
  $scope.tabs = {
    select: 1
  };
  $scope.seleccionar = function (tab_numer) {
    $scope.tabs.select = tab_numer;
    switch (tab_numer) {
      case 1:

        break;
      case 2:
        setTimeout(() => {
          document.querySelector("#afiempresa_tipo_cotizante").focus();
        }, 100);
        break;
      case 3:
        setTimeout(() => {
          document.querySelector("#afi_beneficiarios_tipo_documento").focus();
        }, 100);
        break;
      case 4:

        break;
      case 5:

        break;
      case 6:

        break;
    }
  }

  function validar_json(str) {
    try {
      if (typeof str !== "string") {
        return false;
      } else {
        return (typeof JSON.parse(str) === 'object');
      }
    } catch (e) {
      return false;
    }
  }

  $scope.format_date = function (tipo, date) {
    if (date != undefined && date != null && date != "") {
      if (tipo <= 0) {
        let fecha = date.split("/");
        return new Date(fecha[2], (fecha[1] - 1), fecha[0]);
      } else if (tipo > 0) {
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        if (tipo == 1) {
          return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
        } else if (tipo == 2) {
          return año + '/' + mes + '/' + dia;
        } else if (tipo == 3) {
          var resultado = new Date(año, (mes - 1), (dia - 1));
          dia = resultado.getDate();
          mes = resultado.getMonth() + 1;
          año = resultado.getFullYear();
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 4) {
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 5) {
          return año;
        } else if (tipo == 6) {
          return mes;
        } else if (tipo == 7) {
          return dia;
        }
      }
    } else {
      return "";
    }
  }

  function fechaActual() {
    var date = new Date();
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var año = date.getFullYear();
    return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
  }
  $(document).on("wheel", "input[type=number]", function (e) {
    $(this).blur();
  });
  $scope.historial = {
    listado: new Array(),
    estado: "N",
    fecha_inicio: "",
    fecha_fin: "",
    detalle: -1,
    estado_detalle: "",
    rechazo: "",
    tipo_solicitud: "",
    condicion: "",
    tipo_cotizante: "",
    vista_aportante: false,
    tipo_documento_aportante: "",
    numero_documento_aportante: "",
    nombre_aportante: "",
    direccion_aportante: "",
    telefono_aportante: "",
    correo_aportante: "",
    departamento_aportante: "",
    municipio_aportante: "",
    tipo_documento: "",
    numero_documento: "",
    nombre: "",
    // primer_nombre: "",
    // segundo_nombre: "",
    // primer_apellido: "",
    // segundo_apellido: "",
    fecha_nacimiento: "",
    sexo: "",
    estado_civil_cotizante: "",
    departamento_cotizante: "",
    municipio_cotizante: "",
    direccion_cotizante: "",
    zona_cotizante: "",
    telefono_f_cotizante: "",
    telefono_c_cotizante: "",
    correo_cotizante: "",
    ips_atencion: "",
    penciones_afp: "",
    riesgos_laborales_arl: "",
    salario_basico_mensual: "",
    fecha_ingreso: "",
    fecha_inicio_relacion_l: "",
    fecha_fin_relacion_l: "",
    actividad_economica: "",
    diligenciador: "",
    barrio_cotizante: "",
    motivo_rechazo: "",
    usuario_procesa_nal: "",
    // vista_beneficiario: "NO",
    // tipo_documento_beneficiario: "",
    // numero_documento_beneficiario: "",
    // primer_nombre_beneficiario: "",
    // segundo_nombre_beneficiario: "",
    // primer_apellido_beneficiario: "",
    // segundo_apellido_beneficiario: "",
    // fecha_nacimiento_beneficiario: "",
    // sexo_beneficiario: "",
    // parentesco: "",
    // options_parentesco: new Array(),
    // eps_anterior: "",
    // options_eps_anterior: new Array(),
    // ubicacion_beneficiario: "",
    // departamento_beneficiario: "",
    // options_departamento_beneficiario: new Array(),
    // municipio_beneficiario: "",
    // options_municipio_beneficiario: new Array(),
    // direccion_beneficiario: "",
    // zona_beneficiario: "",
    // telefono_f_beneficiario: "",
    // telefono_c_beneficiario: "",
    // correo_beneficiario: "",
    // ips_atencion_beneficiario: "",
    // options_ips_atencion_beneficiario: new Array(),
    listado_beneficiarios: new Array(),
    listado_soportes: new Array(),
    listado_soportes_beneficiarios: new Array(),
    options_motivos_rechazo: new Array()
  }
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@inicio control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      $scope.editarafi = {
        numeroderadicado:"",
        tipo_doc_portante: "",
        numero_portante: "",
        condicion: "",
        tipo_cotizante: "",
        tipo_documento: "",
        numero: 0,
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        fecha_nacimiento: "",
        sexo: "",
        direccion_cotizante: "",
        barrio_cotizante: "",
        departamento_cotizante: "",
        municipio_cotizante: "",
        zona_cotizante: "",
        ips_atencion: "",
        telefono_f_cotizante: "",
        telefono_c_cotizante: "",
        estado_civil_cotizante: "",
        correo_cotizante: "",
        penciones_afp: "",
        coti_arl: "",
        salario_basico_mensual: "",
        fecha_ingreso: "",
        listado_beneficiarios: new Array(),
        listado_beneficiariosactualizar: new Array(),
      };
      $scope.editarbene={
        ben_documento_anterio:"",
        ben_tipo_doc: "",
        ben_documento: "",
        ben_pri_nombre: "",
        ben_seg_nombre: "",
        ben_pri_apellido: "",
        ben_seg_apellido: "",
        ben_fecha_nacimiento: "",
        genero: "",
        ben_direccion: "",
        ben_barrio: "",
        cod_departamento: "",
        cod_municipio: "",
        zona: "",
        ips_atencion: "",
        telefono: "",
        celular: "",
        eps_anterior: "",
        parentesco: ""
      };
      $scope.listadocoti_bene=[];
      $scope.limpiaractualizar = function(){
          $scope.editarafi.numeroderadicado="";
          $scope.editarafi.tipo_doc_portante= "";
          $scope.editarafi.numero_portante= "";
          $scope.editarafi.condicion= "";
          $scope.editarafi.tipo_cotizante= "";
          $scope.editarafi.tipo_documento= "";
          $scope.editarafi.numero= 0;
          $scope.editarafi.primer_nombre= "";
          $scope.editarafi.segundo_nombre= "";
          $scope.editarafi.primer_apellido= "";
          $scope.editarafi.segundo_apellido= "";
          $scope.editarafi.fecha_nacimiento= "";
          $scope.editarafi.sexo= "";
          $scope.editarafi.direccion_cotizante= "";
          $scope.editarafi.barrio_cotizante= "";
          $scope.editarafi.departamento_cotizante= "";
          $scope.editarafi.municipio_cotizante= "";
          $scope.editarafi.zona_cotizante= "";
          $scope.editarafi.ips_atencion= "";
          $scope.editarafi.telefono_f_cotizante= "";
          $scope.editarafi.telefono_c_cotizante= "";
          $scope.editarafi.estado_civil_cotizante= "";
          $scope.editarafi.correo_cotizante= "";
          $scope.editarafi.penciones_afp= "";
          $scope.editarafi.coti_arl= "";
          $scope.editarafi.salario_basico_mensual= "";
          $scope.editarafi.fecha_ingreso= "";
      }
      $scope.listadoestadocivil = function(){
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_estado_civil',
            coincidencia: ''
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_estado_civil_cotizante = response.data;
          } else {
            $scope.options_estado_civil_cotizante = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_estado_civil', 'info');
          }
        });
      }
      $scope.listadoestadocivil();
      $scope.lista_afp = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_afp'
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_penciones_afp = response.data;
          } else {
            $scope.options_penciones_afp = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
          }
        });
      }
      $scope.lista_afp();
      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();

      $scope.generar_direccion = function (varible, objeto, next = "") {
        ngDialog.open({
          template: 'views/movilidad/modal/modal_direccion.html',
          className: 'ngdialog-theme-plain',
          controller: 'modaldireccioncontroller',
          className: 'ngdialog-theme-plain',
          scope: $scope
        }).closePromise.then(function (data) { //Respuesta del valor registrado en modal de direccion
          if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value.direccionModal != '') { //Valida que la direccion nunca se asigne vacia
            $scope[varible][objeto] = data.value.direccionModal;
            $scope.formatcurrency(6);
            if (next != "") {
              document.querySelector('[name="' + next + '"]').focus();
            }
            // if($scope.formatcurrency(6)){
    
            // }else{
            //   //document.querySelector('[name="' + next + '"]').focus();
            //   document.querySelector("#" + varible + "_" + objeto).focus();
            // }
          }
        });
      }

      $scope.lista_condicion = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_condicion'
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_condicion = response.data;
          } else {
            $scope.options_condicion = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_condicion', 'info');
          }
        });
      }
      $scope.lista_condicion();
      $scope.lista_tipo_cotizante = function (condicion) {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_tipo_cotizante',
            condicion: condicion
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_tipo_cotizante = response.data;
          } else {
            $scope.options_tipo_cotizante = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_tipo_cotizante', 'info');
          }
        });
        if ($scope.editarafi.condicion == 'E' || $scope.editarafi.condicion == 'P') {
          $scope.lista_arl();
        } else {
          $scope.lista_arl();
        }
        if ($scope.editarafi.condicion == 'I') {
          $scope.lista_actividad();
        }
      }
      $scope.lista_arl = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_arl'
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_riesgos_laborales_arl = response.data;
          } else {
            $scope.options_riesgos_laborales_arl = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
          }
        });
      }
      $scope.lista_actividad = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_actividad'
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.afiliacion.options_actividad = response.data;
          } else {
            $scope.afiliacion.options_actividad = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el actividad', 'info');
          }
        });
      }
      $scope.lista_departamento = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_departamento',
            coincidencia: ''
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_departamento_cotizante = response.data;
            $scope.options_departamento_beneficiario = response.data;
          } else {
            $scope.options_departamento_cotizante = new Array();
            $scope.options_departamento_beneficiario = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_departamento', 'info');
          }
        });
      }
      $scope.lista_departamento();
      $scope.lista_municipio_cambiar = function (tipo,departamento) {
        $scope.beneficialistodomuni=[];
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
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'lista_municipio',
                departamento: departamento,
                coincidencia: ''
              }
            }).then(function (response) {
              swal.close();
              if (validar_json(angular.toJson(response.data))) {
                if(tipo=='D'){
                  $scope.afiliacionlistodomuni= response.data;
                }else{
                  $scope.beneficialistodomuni= response.data;
                }
              } else {
                if(tipo=='D'){
                  $scope.afiliacionlistodomuni= [];
                }else{
                  $scope.beneficialistodomuni= [];
                }
              }
            });
      }
      $scope.lista_eps = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_eps',
            coincidencia: ""
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.listado_eps_anterior = response.data;
          } else {
            $scope.listado_eps_anterior = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_eps', 'info');
          }
        });
      }
      $scope.lista_eps();
      $scope.lista_ips_beneficiario = function (codigoubica) {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_ips',
            ubicacion: codigoubica
          }
        }).then(function (response2) {
          if (validar_json(angular.toJson(response2.data))) {
            $scope.listaipsbeneficiario = response2.data;
            // $scope.afi_cambio_ips.ips_atencion = response.data.datos_basicos.IPS_ACTUAL;
          } else {
            $scope.listaipsbeneficiario  = new Array();
            // swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
          }
        });
      }
      $scope.lista_ips_cambiar_cotizante = function (codigoubica) {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_ips',
            ubicacion: codigoubica
          }
        }).then(function (response2) {
          if (validar_json(angular.toJson(response2.data))) {
            $scope.listaipscotizante = response2.data;
            // $scope.afi_cambio_ips.ips_atencion = response.data.datos_basicos.IPS_ACTUAL;
          } else {
            $scope.listaipscotizante  = new Array();
            // swal('Mensaje', 'No se obtuvo resultados para el lista_ips', 'info');
          }
        });
      }
      $scope.lista_parentesco = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_parentezco'
          }
        }).then(function (response) {
          console.log(response.data);
          if (validar_json(angular.toJson(response.data))) {
            $scope.options_parentesco = response.data;
          } else {
            $scope.options_parentesco = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
          }
        });
      }
      $scope.lista_parentesco();
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fin control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  $scope.limpiar_detalle_solicitud = function () {
    //$scope.historial.fecha_inicio = "";
    //$scope.historial.fecha_fin = "";
    $scope.historial.rechazo = "";
    $scope.historial.tipo_solicitud = "";
    $scope.historial.condicion = "";
    $scope.historial.tipo_cotizante = "";
    $scope.historial.vista_aportante = false;
    $scope.historial.tipo_documento_aportante = "";
    $scope.historial.numero_documento_aportante = "";
    $scope.historial.nombre_aportante = "";
    $scope.historial.direccion_aportante = "";
    $scope.historial.telefono_aportante = "";
    $scope.historial.correo_aportante = "";
    $scope.historial.departamento_aportante = "";
    $scope.historial.municipio_aportante = "";
    $scope.historial.tipo_documento = "";
    $scope.historial.numero_documento = "";
    $scope.historial.nombre = "";
    // $scope.historial.primer_nombre = "";
    // $scope.historial.segundo_nombre = "";
    // $scope.historial.primer_apellido = "";
    // $scope.historial.segundo_apellido = "";
    $scope.historial.fecha_nacimiento = "";
    $scope.historial.sexo = "";
    $scope.historial.estado_civil_cotizante = "";
    $scope.historial.departamento_cotizante = "";
    $scope.historial.municipio_cotizante = "";
    $scope.historial.direccion_cotizante = "";
    $scope.historial.zona_cotizante = "";
    $scope.historial.telefono_f_cotizante = "";
    $scope.historial.telefono_c_cotizante = "";
    $scope.historial.correo_cotizante = "";
    $scope.historial.ips_atencion = "";
    $scope.historial.penciones_afp = "";
    $scope.historial.riesgos_laborales_arl = "";
    $scope.historial.salario_basico_mensual = "";
    $scope.historial.fecha_ingreso = "";
    $scope.historial.fecha_inicio_relacion_l = "";
    $scope.historial.fecha_fin_relacion_l = "";
    $scope.historial.listado_beneficiarios = new Array();
    $scope.historial.listado_soportes = new Array();
    $scope.historial.listado_soportes_beneficiarios = new Array();
  }
  $scope.cerrar_detalle = function () {
    $scope.historial.detalle = -1;
    $scope.historial.estado_detalle = "";
    $scope.limpiar_detalle_solicitud();
  }
  $scope.lista_solicitud_afiliacion = function (rad_unico) {
    $scope.filtro_tabla = rad_unico;
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });
    $scope.cerrar_detalle();
    if ($scope.historial.estado == 'T' && ($scope.filtro_tabla == "" || $scope.filtro_tabla == undefined)) {
      swal('Información', 'El filtro TODOS requiere un documento valido.', 'info');
    }else{
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: ($scope.filtro_tabla == undefined || $scope.filtro_tabla == "") ? 'lista_solicitudes_afiliacion' : 'lista_solicitudes_afiliacion_rad',
          origen: "N",
          estado: $scope.historial.estado,
          fecha_inicio: $scope.format_date(1, $scope.historial.fecha_inicio),
          fecha_fin: $scope.format_date(1, $scope.historial.fecha_fin),
          filtro: $scope.filtro_tabla
        }
      }).then(function (response) {
        swal.close();
        if (validar_json(angular.toJson(response.data))) {
          $scope.historial.listado = response.data;
          // $scope.historial.listado.push({
          //   RADICADO: "61",
          //   CONDICION: "EMPLEADO",
          //   APORTANTE: "NIT 900215262",
          //   COTIZANTE: "CC 1069469173",
          //   AFILIADO: "YEIMI ISABEL TORRES PEDROZA",
          //   SMVV_RESPONSABLE: "1143461706",
          //   FECHA_SOLICITUD: "29/03/2020",
          //   TIPO: "Inclusión"
          // });
        } else {
          $scope.historial.listado = new Array();
          // swal('Mensaje', 'No se obtuvo resultados para el lista_solicitudes_afiliacion', 'info');
        }
      });
    }
  }
  $scope.lista_solicitud_afiliacion();
  $scope.obtener_estado = function (codigo) {
    var estado = codigo;
    switch (codigo) {
      case 'N':
        estado = "PENDIENTE";
        break;
      case 'S':
        estado = "PROCESADO";
        break;
      case 'R':
        estado = "RECHAZADO";
        break;
    }
    return estado;
  }
  $scope.descargar_archivo = function (ruta, ftp) {
    if (ruta != "" && ruta != null && ruta != undefined && ruta.length > 10) {
      $http({
        method: 'POST',
        url: "php/intranet/intranet_procesos.php",
        data: {
          function: 'descargaAdjunto',
          ruta: ruta,
          ftp: ftp
        }
      }).then(function (response) {
        window.open("temp/" + response.data);
      });
    } else {
      swal('Url no válida', 'No se encontró ningún archivo', 'warning');
    }
  }
  $scope.ver_detalle_solicitud = function (solicitud) {
    $scope.listadocoti_bene=[];
    $scope.editarafi.listado_beneficiariosactualizar=[];
    $scope.limpiaractualizar();
    $scope.editarafiliacion = false;
    $scope.vereditarbene = false;
    //console.log($scope.btns_gestion);
    if (solicitud.RADICADO == $scope.historial.detalle) {
      $scope.historial.detalle = -1;
      $scope.historial.estado_detalle = "";
    } else {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      if (solicitud.ESTADO == 'N') {
        afiliacionHttp.serviceFDC(solicitud.COTIZANTE.split(" ")[0], solicitud.COTIZANTE.split(" ")[1], 'ObtenerFosyga').then(function (response) {
          $scope.adres_data = response.data;
          if (($scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO' 
            || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO - CM'
            || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIARCAJACOPI ATLÁNTICO') 
            && $scope.adres_data.FechaFinAfiliacion != "31/12/2999") {
              notification.getNotification('info', 'Afiliado presenta novedad solicitud de traslado, debe reportar afiliación a la EPS receptora.', 'Información');
          }
        });
      }
      $scope.historial.detalle = solicitud.RADICADO;
      $scope.historial.estado_detalle = solicitud.ESTADO;
      $scope.limpiar_detalle_solicitud();
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'detalle_afiliacion',
          origen: "S",
          codigo: solicitud.RADICADO,
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
           // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@inicio control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
           var datoslista = {tipodoc:response.data.datos_basicos.TIPO_DOC_COTIZANTE,
            numerodoc:response.data.datos_basicos.ID_COTIZANTE,
            nombres:response.data.datos_basicos.NOMBRE_DILIGENCIADO,
            parentesco:'COTIZANTE'};
$scope.listadocoti_bene.push(datoslista);
var beneficiarios = response.data.beneficiarios;
for (let i = 0; i < beneficiarios.length; i++) {
const element = {tipodoc:beneficiarios[i].BEN_TIPO_DOC,
              numerodoc:beneficiarios[i].BEN_DOCUMENTO,
              nombres:beneficiarios[i].BEN_NOMBRE,
              parentesco:beneficiarios[i].PARENTESCO};
              $scope.listadocoti_bene.push(element);
}
$scope.editarafiliacion = false;
$scope.editarafi.numeroderadicado=solicitud.RADICADO;
$scope.editarafi.tipo_doc_portante=response.data.datos_basicos.TIPO_DOC_APORTANTE;
$scope.editarafi.numero_portante=response.data.datos_basicos.ID_APORTANTE;
$scope.editarafi.condicion=response.data.datos_basicos.COD_CONDICION;
$scope.editarafi.tipo_documento=response.data.datos_basicos.TIPO_DOC_COTIZANTE;
$scope.editarafi.numero= parseInt(response.data.datos_basicos.ID_COTIZANTE);
$scope.editarafi.primer_nombre=response.data.datos_basicos.COT_PRI_NOMBRE;
$scope.editarafi.segundo_nombre=response.data.datos_basicos.COT_SEG_NOMBRE;
$scope.editarafi.primer_apellido=response.data.datos_basicos.COT_PRI_APELLIDO;
$scope.editarafi.segundo_apellido=response.data.datos_basicos.COT_SEG_APELLIDO;
var ftemp = response.data.datos_basicos.F_NACIMIENTO.split("/");
$scope.editarafi.fecha_nacimiento=new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
$scope.editarafi.sexo=response.data.datos_basicos.GENERO == 'Masculino'?'M':'F';
$scope.editarafi.direccion_cotizante=response.data.datos_basicos.DIRECCION;
$scope.editarafi.barrio_cotizante=response.data.datos_basicos.BARRIO;
// $scope.editarafi.departamento_cotizante=response.data.datos_basicos.BARRIO;
$scope.editarafi.departamento_cotizante=response.data.datos_basicos.UBGN_CODIGO;
$scope.editarafi.zona_cotizante=response.data.datos_basicos.ZONA == 'Urbana'?'U':'R';
$scope.editarafi.telefono_f_cotizante=parseInt(response.data.datos_basicos.TELEFONO);
$scope.editarafi.telefono_c_cotizante=parseInt(response.data.datos_basicos.CELULAR);
$scope.editarafi.estado_civil_cotizante=response.data.datos_basicos.COD_ESTADO_CIVIL;
$scope.editarafi.correo_cotizante=response.data.datos_basicos.CORREO;
$scope.editarafi.penciones_afp=response.data.datos_basicos.COD_AFP;
$scope.editarafi.salario_basico_mensual=parseInt(response.data.datos_basicos.SALARIO);
$scope.editarafi.salario_basico_mensual = numeral($scope.editarafi.salario_basico_mensual).format('$ 0,0[.]0');
var ftempingreso = response.data.datos_basicos.FECHA_INGRESO.split("/");
$scope.editarafi.fecha_ingreso=new Date(ftempingreso[2], (ftempingreso[1] - 1), ftempingreso[0]);
$scope.lista_tipo_cotizante(response.data.datos_basicos.COD_CONDICION);
$scope.lista_municipio_cambiar('D',response.data.datos_basicos.UBGN_CODIGO);
$scope.lista_ips_cambiar_cotizante(response.data.datos_basicos.MUNICIPIO_COT);
setTimeout(() => {
  $scope.editarafi.municipio_cotizante=response.data.datos_basicos.MUNICIPIO_COT;
$scope.editarafi.tipo_cotizante=response.data.datos_basicos.COD_TIPO_COTIZANTE;
$scope.editarafi.ips_atencion=response.data.datos_basicos.COD_IPS_ATENCION;
$scope.editarafi.coti_arl=response.data.datos_basicos.COD_ARL;
}, 500);
$scope.editarafi.listado_beneficiarios=response.data.beneficiarios;
if (response.data.beneficiarios.length >= 1) {
for (var j = 0; j < response.data.beneficiarios.length; j++) {
$scope.editarafi.listado_beneficiariosactualizar.push({
tipo_documento_new:response.data.beneficiarios[j].BEN_TIPO_DOC,
documento_new:response.data.beneficiarios[j].BEN_DOCUMENTO,
primer_nombre:response.data.beneficiarios[j].BEN_PRI_NOMBRE,
segundo_nombre:response.data.beneficiarios[j].BEN_SEG_NOMBRE,
primer_apellido:response.data.beneficiarios[j].BEN_PRI_APELLIDO,
segundo_apellido:response.data.beneficiarios[j].BEN_SEG_APELLIDO,
fecha_nacimiento:response.data.beneficiarios[j].BEN_FECHA_NACIMIENTO,
sexo:response.data.beneficiarios[j].GENERO,
ubicacion:response.data.beneficiarios[j].COD_UBICACION,
direccion:response.data.beneficiarios[j].BEN_DIRECCION,
barrio:response.data.beneficiarios[j].BEN_BARRIO,
telefono:response.data.beneficiarios[j].TELEFONO,
celular:response.data.beneficiarios[j].CELULAR,
eps_ant:response.data.beneficiarios[j].EPS_ANTERIOR,
parentesco:response.data.beneficiarios[j].COD_PARENTESCO,
tipo_documento_old:response.data.beneficiarios[j].BEN_TIPO_DOC,
documento_old:response.data.beneficiarios[j].BEN_DOCUMENTO,
});
}
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fin control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          $scope.historial.condicion = response.data.datos_basicos.NOMBRE;
          $scope.historial.tipo_cotizante = response.data.datos_basicos.TIPO_COTIZANTE;
          $scope.historial.tipo_solicitud = response.data.datos_basicos.TIPO_SOLICITUD;
          $scope.historial.tipo_documento_aportante = response.data.datos_basicos.TIPO_DOC_APORTANTE;
          $scope.historial.numero_documento_aportante = response.data.datos_basicos.ID_APORTANTE;
          $scope.historial.nombre_aportante = response.data.datos_basicos.NOMBRE_APORTANTE;
          $scope.historial.direccion_aportante = "NULL";
          $scope.historial.telefono_aportante = "NULL";
          $scope.historial.correo_aportante = "NULL";
          $scope.historial.departamento_aportante = "NULL";
          $scope.historial.municipio_aportante = "NULL";
          $scope.historial.tipo_documento = response.data.datos_basicos.TIPO_DOC_COTIZANTE;
          $scope.historial.numero_documento = response.data.datos_basicos.ID_COTIZANTE;
          $scope.historial.nombre = response.data.datos_basicos.NOMBRE_DILIGENCIADO;
          // $scope.historial.primer_nombre = response.data.datos_basicos;
          // $scope.historial.segundo_nombre = response.data.datos_basicos;
          // $scope.historial.primer_apellido = response.data.datos_basicos;
          // $scope.historial.segundo_apellido = response.data.datos_basicos;
          $scope.historial.fecha_nacimiento = response.data.datos_basicos.F_NACIMIENTO;
          $scope.historial.sexo = response.data.datos_basicos.GENERO;
          $scope.historial.estado_civil_cotizante = response.data.datos_basicos.ESTADO_CIVIL;
          $scope.historial.departamento_cotizante = response.data.datos_basicos.DEPARTAMENTO_NOMBRE;
          $scope.historial.municipio_cotizante = response.data.datos_basicos.UBICACION;
          $scope.historial.direccion_cotizante = response.data.datos_basicos.DIRECCION;
          $scope.historial.zona_cotizante = response.data.datos_basicos.ZONA;
          $scope.historial.telefono_f_cotizante = response.data.datos_basicos.TELEFONO;
          $scope.historial.telefono_c_cotizante = response.data.datos_basicos.CELULAR;
          $scope.historial.correo_cotizante = response.data.datos_basicos.CORREO;
          $scope.historial.ips_atencion = response.data.datos_basicos.IPS_ATENCION;
          $scope.historial.penciones_afp = response.data.datos_basicos.AFP;
          $scope.historial.riesgos_laborales_arl = response.data.datos_basicos.ARL;
          $scope.historial.salario_basico_mensual = response.data.datos_basicos.SALARIO;
          $scope.historial.fecha_ingreso = response.data.datos_basicos.FECHA_INGRESO;
          $scope.historial.actividad_economica = response.data.datos_basicos.ACTIVIDAD_IND;
          $scope.historial.diligenciador = response.data.datos_basicos.NOMBRE_DILIGENCIADO;
          $scope.historial.motivo_rechazo = response.data.datos_basicos.MOTIVO_RECHAZO;
          $scope.historial.usuario_procesa_nal = response.data.datos_basicos.USUARIO_PROCESA_NAL;
          $scope.historial.barrio_cotizante = response.data.datos_basicos.BARRIO;

          if ($scope.historial.tipo_solicitud == 'Afiliación') {
            $scope.historial.fecha_inicio_relacion_l = $scope.format_date(0, response.data.datos_basicos.FECHA_INGRESO);
            $scope.historial.fecha_fin_relacion_l = "";
          } else {
            $scope.historial.fecha_inicio_relacion_l = "";
            $scope.historial.fecha_fin_relacion_l = "";
          }
          $scope.historial.listado_beneficiarios = response.data.beneficiarios;
          //$scope.historial.listado_soportes = response.data.adjuntos;
          // CNVU
          if (response.data.beneficiarios.length >= 1) {
            for (let ii = 0; ii < response.data.beneficiarios.length; ii++) {
              var doc = response.data.beneficiarios[ii].BEN_DOCUMENTO;
              for (let i = 0; i < response.data.adjuntos.length; i++) {
                if (response.data.adjuntos[i].DOCUMENTO == doc) {
                  $scope.historial.listado_soportes_beneficiarios.push({
                    tipo_doc: response.data.adjuntos[i].SMVC_TIPO_DOC_BEN,
                    documento: response.data.adjuntos[i].DOCUMENTO,
                    RUTA: response.data.adjuntos[i].RUTA,
                    TIPO_ARCHIVO: response.data.adjuntos[i].TIPO_ARCHIVO,
                    FTP: response.data.adjuntos[i].FTP
                    //nombre_archivo: response.adjuntos[i].TIPO_ARCHIVO
                  });
                }
                // if (response.data.adjuntos[i].DOCUMENTO == $scope.editarafi.numero.toString()) {
                //   $scope.historial.listado_soportes.push({
                //     tipo_doc: response.data.adjuntos[i].SMVC_TIPO_DOC_BEN,
                //     documento: response.data.adjuntos[i].DOCUMENTO,
                //     RUTA: response.data.adjuntos[i].RUTA,
                //     TIPO_ARCHIVO: response.data.adjuntos[i].TIPO_ARCHIVO,
                //     FTP: response.data.adjuntos[i].FTP
                //     //nombre_archivo: response.adjuntos[i].TIPO_ARCHIVO
                //   });
                // }
                /*else{
                  $scope.historial.listado_soportes = new Array();
                }*/
              }
            }
            for (let i = 0; i < response.data.adjuntos.length; i++) {
              if (response.data.adjuntos[i].DOCUMENTO == $scope.editarafi.numero.toString()  || response.data.adjuntos[i].DOCUMENTO == null) {
                $scope.historial.listado_soportes.push({
                  tipo_doc: response.data.adjuntos[i].SMVC_TIPO_DOC_BEN,
                  documento: response.data.adjuntos[i].DOCUMENTO,
                  RUTA: response.data.adjuntos[i].RUTA,
                  TIPO_ARCHIVO: response.data.adjuntos[i].TIPO_ARCHIVO,
                  FTP: response.data.adjuntos[i].FTP,
                  CODIGO: response.data.adjuntos[i].CODIGO,
                  TIPO_ADJ: response.data.adjuntos[i].TIPO_ADJ
                });
              }
            }
          }else{
            $scope.historial.listado_soportes = response.data.adjuntos;
          }
          //console.log($scope.historial.listado_soportes);
          //console.log($scope.historial.listado_soportes_beneficiarios);
          // CNVU
          if (solicitud.TIPO == "Afiliación") {
            $scope.historial.vista_aportante = true;
          } else {
            $scope.historial.vista_aportante = false;
          }
          setTimeout(() => {
            document.querySelector("#detalle_solicitud").scrollIntoView();
            swal.close();
          }, 60);
        } else {
          swal('Mensaje', 'No se obtuvo resultados para el detalle_afiliacion', 'info');
        }
      });
    }
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@inicio control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      $scope.permitireditar = function () {
        $scope.editarafi.municipio_cotizante = $scope.editarafi.municipio_cotizante;
        console.log($scope.editarafi.municipio_cotizante);
        $scope.editarafiliacion = true;
      }
      $scope.permitireditaratras = function () {
        // $scope.limpiaractualizar();
        $scope.editarafiliacion = false;
        $scope.vereditarbene = false;
      }
      $scope.Editarbeneficiario = function (beneficiario) {
        console.log(beneficiario);
        $scope.vereditarbene = true;
        $scope.editarbene.ben_documento_anterio=parseInt(beneficiario.BEN_DOCUMENTO);
        $scope.editarbene.ben_tipo_doc=beneficiario.BEN_TIPO_DOC;
        $scope.editarbene.ben_documento=parseInt(beneficiario.BEN_DOCUMENTO);
        $scope.editarbene.ben_pri_nombre=beneficiario.BEN_PRI_NOMBRE;
        $scope.editarbene.ben_seg_nombre=beneficiario.BEN_SEG_NOMBRE;
        $scope.editarbene.ben_pri_apellido=beneficiario.BEN_PRI_APELLIDO;
        $scope.editarbene.ben_seg_apellido=beneficiario.BEN_SEG_APELLIDO;
        var ftemnaci = beneficiario.BEN_FECHA_NACIMIENTO.split("/");
        $scope.editarbene.ben_fecha_nacimiento=new Date(ftemnaci[2], (ftemnaci[1] - 1), ftemnaci[0]);
        $scope.editarbene.genero=beneficiario.GENERO == 'Masculino'?'M':'F';
        $scope.editarbene.ben_direccion=beneficiario.BEN_DIRECCION;
        $scope.editarbene.ben_barrio=beneficiario.BEN_BARRIO;
        $scope.editarbene.cod_departamento=beneficiario.COD_DEPARTAMENTO;
        $scope.editarbene.zona=beneficiario.BEN_ZONA == 'Urbana'?'U':'R';
        $scope.lista_municipio_cambiar('B',beneficiario.COD_DEPARTAMENTO);
        $scope.lista_ips_beneficiario(beneficiario.COD_UBICACION);
        setTimeout(() => {
          $scope.editarbene.cod_municipio=beneficiario.COD_UBICACION;
          $scope.editarbene.ips_atencion=beneficiario.COD_BEN_IPS_ATENCION;
        }, 1500);
        $scope.editarbene.telefono=parseInt(beneficiario.TELEFONO);
        $scope.editarbene.celular=parseInt(beneficiario.CELULAR);
        $scope.editarbene.eps_anterior=beneficiario.EPS_ANTERIOR;
        $scope.editarbene.parentesco=beneficiario.COD_PARENTESCO;
      }
      $scope.cargarbeneficiario = function () {
        for (var j = 0; j < $scope.editarafi.listado_beneficiariosactualizar.length; j++) {
          if ($scope.editarafi.listado_beneficiariosactualizar[j].documento_old == $scope.editarbene.ben_documento_anterio) {
            $scope.editarafi.listado_beneficiariosactualizar[j].tipo_documento_new = $scope.editarbene.ben_tipo_doc;
        $scope.editarafi.listado_beneficiariosactualizar[j].documento_new=$scope.editarbene.ben_documento.toString();
        $scope.editarafi.listado_beneficiariosactualizar[j].primer_nombre= $scope.editarbene.ben_pri_nombre;
        $scope.editarafi.listado_beneficiariosactualizar[j].segundo_nombre= $scope.editarbene.ben_seg_nombre;
        $scope.editarafi.listado_beneficiariosactualizar[j].primer_apellido= $scope.editarbene.ben_pri_apellido;
        $scope.editarafi.listado_beneficiariosactualizar[j].segundo_apellido= $scope.editarbene.ben_seg_apellido;
        $scope.editarafi.listado_beneficiariosactualizar[j].fecha_nacimiento = $scope.format_date(1, $scope.editarbene.ben_fecha_nacimiento);
        $scope.editarafi.listado_beneficiariosactualizar[j].sexo = $scope.editarbene.genero;
        $scope.editarafi.listado_beneficiariosactualizar[j].direccion = $scope.editarbene.ben_direccion;
        $scope.editarafi.listado_beneficiariosactualizar[j].barrio = $scope.editarbene.ben_barrio;
        $scope.editarafi.listado_beneficiariosactualizar[j].ubicacion = $scope.editarbene.cod_municipio;
        $scope.editarafi.listado_beneficiariosactualizar[j].telefono = $scope.editarbene.telefono == null ? "" : $scope.editarbene.telefono.toString();
        $scope.editarafi.listado_beneficiariosactualizar[j].celular = $scope.editarbene.celular.toString();
        $scope.editarafi.listado_beneficiariosactualizar[j].eps_ant = $scope.editarbene.eps_anterior;
        $scope.editarafi.listado_beneficiariosactualizar[j].parentesco = $scope.editarbene.parentesco;
          }
        }
        swal('Mensaje', 'Beneficiario Cargado Continuar actualizacion en el boton de Actualizar', 'success');
        $scope.vereditarbene = false;
      }
      $scope.actualizarcotizante = function () {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea actualizar la solicitud del afiliado?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {

          if (result) {
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
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'Actualizar_Radicado_solicitud',
                tipo_doc_portante: $scope.editarafi.tipo_doc_portante,
                numero_portante: $scope.editarafi.numero_portante.toString(),
                condicion: $scope.editarafi.condicion,
                tipo_cotizante: $scope.editarafi.tipo_cotizante,
                tipo_doc_cotizante: $scope.editarafi.tipo_documento,
                doc_cotizante: $scope.editarafi.numero.toString(),
                pri_nombre: $scope.editarafi.primer_nombre,
                seg_nombre: $scope.editarafi.segundo_nombre,
                pri_apellido: $scope.editarafi.primer_apellido,
                seg_apellido: $scope.editarafi.segundo_apellido,
                nacimiento: $scope.format_date(1, $scope.editarafi.fecha_nacimiento),
                genero: $scope.editarafi.sexo,
                estado_civil_cotizante: $scope.editarafi.estado_civil_cotizante,
                direccion: $scope.editarafi.direccion_cotizante,
                municipio_cotizante: $scope.editarafi.municipio_cotizante,
                zona_cotizante: $scope.editarafi.zona_cotizante,
                ips_atencion: $scope.editarafi.ips_atencion,
                telef: $scope.editarafi.telefono_f_cotizante.toString(),
                celular: $scope.editarafi.telefono_c_cotizante.toString(),
                correo_cotizante: $scope.editarafi.correo_cotizante,
                afp: $scope.editarafi.penciones_afp,
                arl: $scope.editarafi.coti_arl,
                salario: $scope.editarafi.salario_basico_mensual.replace(/[^\d]*/g, ''),
                fecha_ingreso: $scope.format_date(1, $scope.editarafi.fecha_ingreso),
                barrio: $scope.editarafi.barrio_cotizante,
                numeroderadicado: $scope.editarafi.numeroderadicado,
                beneficiarios: angular.toJson($scope.editarafi.listado_beneficiariosactualizar),
                cantidad_beneficiarios: $scope.editarafi.listado_beneficiariosactualizar.length,
                origen:'S'
              }
            }).then(function(response){
              swal.close();
                if (response.data.codigo == 0) {
                  $scope.historial.detalle = -1;
                  $scope.permitireditaratras();
                  // $scope.lista_solicitud_afiliacion();
                  swal('Mensaje', response.data.mensaje, 'success');
                  $scope.lista_solicitud_afiliacion();
                  $scope.permitireditaratras();
                } else {
                  swal('Mensaje', response.data.mensaje, 'error');
                }
            });
          }
        }).catch(swal.noop);
      }


      $scope.devolver_new = function(){
        swal({
          title: 'Escribir la Justificacion de devolucion',
          showCancelButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          html: `<div class="row">
                                  <div class="input-field col s12" style="padding:0">
                                  <textarea id="justificacionanulacion2" class="materialize-textarea" style="max-height: 10em;
                                                  overflow: auto;text-transform:uppercase"></textarea>
                                  <label for="observacion">Justificación: <span style="color:red;">*</span></label>
                                </div>
      </div>`,
          preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                  $('#justificacionanulacion2').val(),
              ])
              
            });
          }
        }).then(function (result) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if (result[0]) {
            var  motivo_devolucion = result[0];
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: { function: 'p_cambiar_esatado_devolucion', 
                      motivo_devolucion: motivo_devolucion,
                      radicado:$scope.editarafi.numeroderadicado,
                      responsable:$scope.sesdata.cedula}
            }).then(function (response) {
              if (response.data.codigo == 0) {
                swal({ title: "Completado", text: response.data.mensaje, type: "success", });
              } else {
                swal({ title: "No Completado", text: response.data.mensaje, showConfirmButton: false, type: "warning", timer: 5000 });
              }
              $scope.cerrar_detalle();
              $scope.lista_solicitud_afiliacion();
            })
          } else {
            swal({ title: "ANULACIÓN", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
          }
          swal.close();
        });
      }
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fin control de cambio Yordis@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  $scope.imprimir_solicitud = function (solicitud) {
    //console.log(solicitud);
    // window.open('views/movilidad/soporte/formulario_afi_re_no_sgsss.php?datos=' + JSON.stringify(solicitud), '_blank', "width=900,height=1100");
    var h = screen.height;
    var w = screen.width;
    var leftPos = screen.width - 960;
    if (solicitud.APORTANTE != null) {
      var aportantePOS = solicitud.APORTANTE.indexOf("&");
      if (aportantePOS != -1){
        solicitud.APORTANTE = solicitud.APORTANTE.replace("&","Y");
        solicitud.APORTANTEpos = aportantePOS;
      }else{
        solicitud.APORTANTE = solicitud.APORTANTE;
      }
    }
    window.open('views/movilidad/soporte/formulario_afi_re_no_sgsss.php?datos=' + JSON.stringify(solicitud), "customWindow", "width=960, height=" + h + ", top=0, left=0");
  }
  $scope.format_date = function (tipo, date) {
    if (date != undefined && date != null && date != "") {
      if (tipo <= 0) {
        let fecha = date.split("/");
        return new Date(fecha[2], (fecha[1] - 1), fecha[0]);
      } else if (tipo > 0) {
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        if (tipo == 1) {
          return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
        } else if (tipo == 2) {
          return año + '/' + mes + '/' + dia;
        } else if (tipo == 3) {
          var resultado = new Date(año, (mes - 1), (dia - 1));
          dia = resultado.getDate();
          mes = resultado.getMonth() + 1;
          año = resultado.getFullYear();
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 4) {
          return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
        } else if (tipo == 5) {
          return año;
        } else if (tipo == 6) {
          return mes;
        } else if (tipo == 7) {
          return dia;
        }
      }
    } else {
      return "";
    }
  }
  $scope.rechazar = function () {
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_causal_rechazo'
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data))) {
          var options = {};
          response.data.forEach(element => {
            options[element.CODIGO] = element.NOMBRE;
          });
          swal({
            title: 'Motivo del rechazo',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Seleccionar',
            showCancelButton: true,
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value !== '') {
                  resolve();
                } else {
                  reject('Debes seleccionar un motivo');
                }
              });
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then(function (result) {
            if (result) {
              $scope.historial.rechazo = result;
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
                url: "php/movilidad/afiliacion_linea.php",
                data: {
                  function: 'gestion_nacional',
                  numero: $scope.historial.detalle,
                  gestion: "R",
                  causal_rechazo: $scope.historial.rechazo,
                  modulo: "",
                  fecha_inicio: "",
                  fecha_retiro: ""
                }
              }).then(function (response) {
                //swal.close();
                if (validar_json(angular.toJson(response.data))) {
                  if (response.data.codigo == 0) {
                    $scope.historial.detalle = -1;
                    $scope.historial.estado_detalle = "";
                    $scope.limpiar_detalle_solicitud();
                    swal('Mensaje', response.data.mensaje, 'success');
                    //CNVU
                    setTimeout(function () {
                      //swal.close();
                      $scope.lista_solicitud_afiliacion();
                      //$scope.$apply();
                    }, 5000);
                    //CNVU
                  } else {
                    swal('Mensaje', response.data.mensaje, 'warning');
                  }
                } else {
                  swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
                }
              });
            }
          }).catch(swal.noop);
        } else {
          swal('Mensaje', 'No se obtuvo resultados para el lista_causal_rechazo', 'info');
        }
      });
    } else {
      swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }

  $scope.rechazar_new = function () {
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      $http({
        method: 'POST',
        url: "php/movilidad/afiliacion_linea.php",
        data: {
          function: 'lista_causal_rechazo'
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data))) {
          $scope.historial.options_motivos_rechazo = response.data;
          $('#modalRechazar').modal();
          $('#modalRechazar').modal('open');
        } else {
          $scope.historial.options_motivos_rechazo = new Array();
          swal('Mensaje', 'No se obtuvo resultados para el lista_causal_rechazo', 'info');
        }
      });
    } else {
      swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }

  $scope.rechazar_confirmado = function (valor) {
    //console.log(valor);
    if ($scope.historial.rechazo == "" || $scope.historial.rechazo == undefined || $scope.historial.rechazo == null) {
      swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
      $scope.historial.rechazo = "";
    } else {
      var codigo_select_list = $scope.historial.rechazo.split("-");
      var i = $scope.historial.options_motivos_rechazo.findIndex(elemt => elemt.CODIGO == codigo_select_list[0]);
      if (i != -1) {
        if (codigo_select_list[1] != $scope.historial.options_motivos_rechazo[i].NOMBRE.trim()) {
          swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
          $scope.historial.rechazo = "";
        }else{
          $scope.historial.rechazo = codigo_select_list[0];
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
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'gestion_nacional',
              numero: $scope.historial.detalle,
              gestion: "R",
              causal_rechazo: $scope.historial.rechazo,
              modulo: "",
              fecha_inicio: "",
              fecha_retiro: ""
            }
          }).then(function (response) {
            //swal.close();
            if (validar_json(angular.toJson(response.data))) {
              if (response.data.codigo == 0) {
                $scope.historial.detalle = -1;
                $scope.historial.estado_detalle = "";
                $scope.limpiar_detalle_solicitud();
                $scope.cerrarModal('R');
                swal('Mensaje', response.data.mensaje, 'success');
                //CNVU
                setTimeout(function () {
                  //swal.close();
                  $scope.lista_solicitud_afiliacion();
                  //$scope.$apply();
                }, 5000);
                //CNVU
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              }
            } else {
              swal('Mensaje', 'Error al intentar rechazar la solicitud #' + $scope.historial.detalle, 'error');
            }
          });
        }
      } else {
        swal('Mensaje', 'No selecciono algún item de la lista.', 'warning');
        $scope.historial.rechazo = "";
      }
    }
  }

  $scope.aprobar = function (solicitud) {
    //console.log($scope.adres_data);
    if ($scope.historial.detalle != -1 && $scope.historial.detalle != "") {
      swal({
        // title: '¿Desea aprobar esta solicitud?',
        type: 'question',
        // text:  ($scope.historial.tipo_solicitud!='Incusión de beneficiarios')?'Seleccionar el proceso:':'',
        // input: ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') ? 'select' : '',
        // inputOptions: ['Por EMOV', 'Por ENOV'],
        // inputPlaceholder: 'Seleccionar el modulo',
        // inputValidator: function (value) {
        //   return new Promise(function (resolve, reject) {
        //     if (value != '') {
        //       if (value == 1) {
        //         document.querySelector('#enov-proceso').hidden = false;
        //       } else {
        //         document.querySelector('#enov-proceso').hidden = true;
        //       }
        //       resolve();
        //     } else {
        //       reject('Modulo no valido');
        //     }
        //   });
        // },
        html: ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') ? '<h2 class="swal2-title" id="swal2-title">¿Desea aprobar esta solicitud?</h2><br><select id="apro-modulo" class="swal2-select input-out-new" style="display: block;">' +
          '<option value="" disabled="">Seleccionar proceso</option>' +
          '<option value="EMOV">EMOV</option>' +
          '<option value="ENOV">ENOV</option>' +
          '</select><br>' +
          '<select id="apro-proceso" class="swal2-select input-out-new" style="display: none;">' +
          '<option value="" disabled="">Seleccionar proceso</option>' +
          '<option value="N06">N06</option>' +
          '<option value="CRA">CRA</option>' +
          '<option value="CRI">CRI</option>' +
          '<option value="N08">N08</option>' +
          '</select>' : '<h2 class="swal2-title" id="swal2-title">¿Desea aprobar esta solicitud?</h2>',
        onOpen: function () {
          if ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') {
            $("#apro-proceso").hide();
            $("#apro-modulo").val("");
            if (($scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO' || $scope.adres_data.EPS == 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO - CM') && $scope.adres_data.FechaFinAfiliacion != "31/12/2999") {
              $("#apro-modulo option[value='EMOV']").hide();
              //$("#apro-proceso option[value='N06']").hide();
              $("#apro-proceso option[value='CRI']").hide();
              $("#apro-proceso option[value='N08']").hide();
            }else{
              $("#apro-modulo option[value='EMOV']").show();
              //$("#apro-proceso option[value='N06']").show();
              $("#apro-proceso option[value='CRI']").show();
              $("#apro-proceso option[value='N08']").show();
            }
            $('#apro-modulo').on('change', function () {
              if (this.value == 'ENOV') {
                $("#apro-proceso").show().val("");
              } else if (this.value == 'EMOV') {
                $("#apro-proceso").hide().val("");
              }
            });
          }
        },
        preConfirm: function () {
          return new Promise(function (resolve) {
            if ($scope.historial.tipo_solicitud != 'Incusión de beneficiarios') {
              // if($('#apro-modulo').val()){

              // }
              resolve([$('#apro-modulo').val(), $('#apro-proceso').val()]);
            } else {
              resolve();
            }
          })
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result) {
          console.log(result);
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if ($scope.historial.tipo_solicitud == 'Afiliación') {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'gestion_nacional',
                numero: $scope.historial.detalle,
                gestion: "A",
                causal_rechazo: "",
                modulo: (result[0] == "EMOV") ? "IN" : result[1],
                fecha_inicio: $scope.format_date(1, $scope.historial.fecha_inicio_relacion_l),
                fecha_retiro: $scope.format_date(1, $scope.historial.fecha_fin_relacion_l)
              }
            }).then(function (response) {
              //swal.close();
              console.log(response);
              if (validar_json(angular.toJson(response.data))) {
                if (response.data.codigo == 0) {
                  $scope.historial.detalle = -1;
                  $scope.historial.estado_detalle = "";
                  $scope.limpiar_detalle_solicitud();
                  swal('Mensaje', response.data.mensaje, 'success');
                  //CNVU
                  setTimeout(function () {
                    $scope.lista_solicitud_afiliacion();
                    //swal.close();
                    //$scope.$apply();
                  }, 5000);
                  //CNVU
                } else {
                  if (response.data.mensaje_detalle == undefined) {
                    response.data.mensaje_detalle = '';
                  }
                  swal('Mensaje', response.data.mensaje + '<br>' + response.data.mensaje_detalle, 'warning');
                }
              } else {
                swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
              }
            });
          } else if ($scope.historial.tipo_solicitud == 'Incusión de beneficiarios') {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'gestion_nacional',
                numero: $scope.historial.detalle,
                gestion: "A",
                causal_rechazo: "",
                modulo: "",
                fecha_inicio: "",
                fecha_retiro: ""
              }
            }).then(function (response) {
              //swal.close();
              console.log(response);
              if (validar_json(angular.toJson(response.data))) {
                if (response.data.codigo == 0) {
                  $scope.historial.detalle = -1;
                  $scope.limpiar_detalle_solicitud();
                  swal('Mensaje', response.data.mensaje, 'success');
                  //CNVU
                  setTimeout(function () {
                    $scope.lista_solicitud_afiliacion();
                    //swal.close();
                    //$scope.$apply();
                  }, 5000);
                  //CNVU
                } else {
                  swal('Mensaje', response.data.mensaje, 'warning');
                }
              } else {
                swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
              }
            });
          }
        }
      }).catch(swal.noop);
    } else {
      swal('Mensaje', 'Error al intentar aprobar la solicitud #' + $scope.historial.detalle, 'error');
    }
  }

  // Paginacion
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.q = "";
  $scope.getData = function () {
    // if ($scope.medicamentos.orden != "") {
    //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
    // } else {
    return $filter('filter')($scope.historial.listado, $scope.q);
    // }
  }
  $scope.numberOfPages = function () {
    return Math.ceil($scope.getData().length / $scope.pageSize);
  }
  $scope.$watch('q', function (newValue, oldValue) {
    if (oldValue != newValue) {
      $scope.currentPage = 0;
    }
  }, true);
  $scope.btns_paginacion = function (value) {
    $scope.currentPage = value;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $scope.validar = function (tipo = "", param = "") {
    switch (tipo) {
      case 0: // longitud <= y
        return (param.x.toString().length <= param.y);
        break;
      case 1: // longitud == y
        return (param.x.toString().length == param.y);
        break;
      case 2: // longitud >= y
        return (param.x.toString().length >= param.y);
        break;
      case 3: // numerico = false
        if (!isNaN(param)) {
          const regeN = new RegExp('^[0-9]+$', 'i');
          param = parseInt(param);
          if (regeN.test(param)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
        break;
      case 4: // numerico entero
        return Number.isInteger(param);
        break;
      case 5: // json object
        var str = angular.toJson(param);
        try {
          if (typeof str !== "string") {
            return false;
          } else {
            return (typeof JSON.parse(str) === 'object');
          }
        } catch (e) {
          return false;
        }
        break;
      case 6: // array length == x
        return (Array.isArray(param.array) && param.array.length == param.x);
        break;
      case 7: // array length > x
        return (Array.isArray(param.array) && param.array.length > param.x);
        break;
      case 8: // fecha dd/mm/aaaa
        var fecha = param.split("/");
        var day = parseInt(fecha[0]);
        var month = parseInt(fecha[1]);
        var year = parseInt(fecha[2]);
        return (isNaN(day) || isNaN(month) || isNaN(year));
        break;
      case 9: // identificar logitud de caracter y numero
        var str = param.str.substring(0, param.split);
        var num = param.str.substring(param.split);
        if (!isNaN(num) && isNaN(str)) {
          const regS = new RegExp('^[A-Z]+$', 'i');
          const regN = new RegExp('^[0-9]+$', 'i');
          if (regS.test(str) && regN.test(num)) {
            num = parseInt(num);
            return (typeof str == "string" && typeof num == "number");
          }
        } else {
          return false;
        }
        break;
      case 10: // string not number
        var str = param;
        if (isNaN(str)) {
          const regS = new RegExp('^[A-Z]+$', 'i');
          if (regS.test(str)) {
            return (typeof str == "string");
          }
        } else {
          return false;
        }
        break;
      case 11: // Celular
        let telefono = param,
          numero = [300, 301, 302, 303, 304, 305, 306, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 350, 351].findIndex(elemt => elemt == (telefono.substring(0, 3)));
        const expresion = /^3[\d]{9}$/;
        if (telefono.length == 10 && !isNaN(telefono) && expresion.test(telefono) && numero != -1) {
          return true;
        } else {
          return false;
        }
        break;
      case 12: // Correo
        return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(param);
        break;
      case 13:
        var option = document.querySelector("#" + param.datalist + ">option[value='" + param.value + "']");
        if (option != null) {
          return option.value.length > 0;
        }
        return false;
        break;
      default:
        swal('Error', 'Tipo de validacion invalida', 'error');
        console.log(tipo, param);
        break;
    }
  }

  // CNVU - ABRIR MODAL INTERNO
  $scope.abrirModal = function (tipo_solicitud, modal) {
    $scope.tipo_solicitud = tipo_solicitud;
    switch (modal) {
      case "P":
        $('#modalAnadir').modal();
        $('#modalAnadir').modal('open');
        break;
      case "R":
        $('#modalRechazar').modal();
        $('#modalRechazar').modal('open');
        break;
      default:
        swal('Error', 'Tipo de validacion invalida', 'error');
        break;
    }
    // (function () {
    //   $('#modalAnadir').modal();
    // }());
    // $('#modalAnadir').modal('open');
  }

  $scope.cerrarModal = function (modal) {
    switch (modal) {
      case "P":
        $('#modalAnadir').modal('close');
        break;
      case "R":
        $('#modalRechazar').modal('close');
        $scope.historial.rechazo = "";
        break;
      default:
        swal('Error', 'Modal erroneo.', 'error');
        break;
    }
  }

  // CNVU - ACCION FUNCIONARIOS
  $scope.accionFuncionario = function (accion, tipo, funcionario) {
    console.log(accion, tipo, funcionario, $scope.tipo_solicitud);
    swal({
      title: 'Cargando información...',
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/movilidad/afiliacion_linea.php",
      data: {
        function: 'accion_funcionarios',
        accion: accion,
        tipo: tipo,
        funcionario: funcionario,
        ambiente: $scope.tipo_solicitud
      }
    }).then(function (response) {
      // swal.close();
      if (response.data.codigo == 0) {
        swal('Información', response.data.mensaje, 'success');
        setTimeout(function () {
          $scope.cerrarModal('P');
        }, 200);
        $scope.listadoFuncionarios();
      } else {
        swal('Información', response.data.mensaje, 'info');
      }
    });
  }

  // CNVU - LISTADO ASESORES
  $scope.listadoFuncionarios = function () {
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
      url: "php/movilidad/afiliacion_linea.php",
      data: { function: 'lista_funcionarios' }
    }).then(function (response) {
      swal.close();
      $scope.listado_funcionarios = response.data.funcionarios;
      $scope.listado_funcionarios_nacional = response.data.funcionarios_nacional;
      $scope.listado_funcionarios_seccional = response.data.funcionarios_seccional;
    });
  }
  // $scope.listadoFuncionarios();

  $scope.filter = function () {
    $scope.listDatosTemp = $filter('filter')($scope.historial.listado, $scope.q);
  }
}]);