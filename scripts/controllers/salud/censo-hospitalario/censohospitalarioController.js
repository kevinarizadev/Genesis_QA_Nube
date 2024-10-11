"use strict";
angular.module("GenesisApp").controller("censohospitalarioController", [
  "$scope",
  "notification",
  "$http",
  "$timeout",
  "$filter",
  "$q",
  function ($scope, notification, $http, $timeout, $filter, $q) {
    $scope.inicio = function () {
      $scope.maxDate = new Date();
      $(".tabs").tabs();
      $(".modal").modal();
      $scope.currentView = "pendientes";
      $scope.gestion = ""; //inicialmente estaba en ver
      $scope.datosInicio = {
        documento: sessionStorage.getItem("cedula"),
        ubicacion: sessionStorage.getItem("municipio"),
      };
      $scope.prestador = '';
      $scope.prestadorQuery = '';
      $scope.rol = '';
      $scope.listaCensosPendientes = [];
      $scope.listaCensosCerrados = [];
      $scope.listaEvoluciones = [];
      $scope.AutorizacionesGestionadas = [];
      $scope.AutorizacionesPendientes = [];
      $scope.listaMotivoGlosa = [];
      $scope.listaEventosAdversos = [];
      $scope.listaEventosAdversosDeta = [];
      $scope.listaMotivoEgreso = [];
      $scope.listaDiagnosticos = [];
      $scope.listaHospitalizacion = [];
      $scope.listaMotivosEspecificos = [];
      $scope.Tipos_Documentos = [];
      $scope.listaIps = [];
      $scope.listaDiagnosticos = [];
      $scope.listaTiposEstancia = [];
      $scope.listaProductos = [];
      $scope.listaPendientesAdm = [];
      $scope.listaPrestadores = [];
      $scope.listaFuncionarios = [];
      $scope.limpiar_campos();
      $scope.limpiar_glosa();
      if ($scope.listaMotivoEgreso.length == 0) {
        $scope.initSelects();
      }
      $scope.obtener_rol();
    };

    $scope.obtener_rol = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">CONSULTANDO PRESTADORES ASIGNADOS...</p>',
        width: 400,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_ROL',
        }
      }).then(function ({ data }) {
        $scope.rol = data;
        $scope.obtener_acceso();
      });
    }

    $scope.limpiarEvolucion = function () {
      $scope.listaDiagnosticos = [];
      $scope.glosa_evolucion = {
        cod_cups: '',
        cups_nombre: '',
        cantidad: '',
        valor_con: '',
        valor_glosa: '',
        motivo_glosa: '',
        motivo_nombre: '',
        observacion: ''
      };
      $scope.evolucion = {
        num_censo: "",
        ubicacion: "",
        hospitalizacion: "", //clasificacion
        diagnostico: "",
        descripcion: "", // observacion
        adverso: false,
        evento_adverso: "",
        evento_adverso_detalle: "",
        responsable: "",
        cierre: false,
        fecha_cierre: "",
        motivo_cierre: "",
        remision: "",
        glosa: false,
        num_glosas: 0,
        glosas: [],
        pendientes: '',
        fecha_cierre_temp: "",
      };
    }

    $scope.limpiar_campos = function () {
      $scope.censo = {};
      $scope.tipoUsuario = [];
      $scope.productoSelect = {};
      $scope.fichaPaciente = {};
      $scope.ips = '';
      $scope.pasosNuevoCenso = 1;
      $scope.filtro = {
        pendientes: "",
        cerrados: "",
        evoluciones: "",
        autorizaciones_pendientes: "",
        autorizaciones_gestionadas: "",
        glosas: "",
        prestadores: ""
      }
      $scope.adminAuditores = {
        nit: '',
        auditores: [],
        cantidad_auditor_temp: 0,
        cantidad_auditor: 0
      };
      $scope.limpiarEvolucion();
      $scope.queja = {
        censo: '',
        motivo: '',
        descripcion: ''
      };
      $scope.entrevistaMedico = {
        censo: '',
        motivo: '',
        descripcion: ''
      };
      $scope.detalleEvocion = {
        NOMBRE: "",
        AUDITOR: "",
        FECHA: "",
        HORA: "",
        DOCUMENTO: "",
        NUMERO: "",
        UBICACION: "",
        OBSERVACION: "",
        GLOSA: "",
        OBSGLOSA: "",
        VALOR: "",
        MOTIVO: "",
        DIAGNOSTICO: "",
        EVENTO: "",
        RELACION: "",
      };
      $scope.scope = '';
      $scope.titulo_autorizaciones = 'LISTA AUTORIZACIONES DE: ';
      $scope.producto_temp = '';
      $scope.nuevoCenso = {
        tipo_doc: '',
        documento: '1063306644',
        nombre_1: '',
        nombre_2: '',
        apellido_1: '',
        apellido_2: '',
        sexo: '',
        nacimiento: '',
        edad: '',
        regimen: '',
        ips: '',
        municipio: '',
        diagnostico_principal: '',
        diagnostico_alterno: '',
        diagnostico_alterno_2: '',
        tipo_estancia: '',
        fecha_ingreso: '',
        protocolo_manejo: ''
      };
      $scope.afiliado = {
        REGIMEN: '',
        EDAD: '',
        NACIMIENTO: '',
        SEXO: '',
        NOMUBICGEO: '',
        UBICGEO: '',
        PNOMBRE: '',
        SNOMBRE: '',
        NOMBRE_COMPLETO: '',
        PAPELLIDO: '',
        SAPELLIDO: '',
        MUNICIPIO: '',
        PORTABILIDAD: '',
        GESTION_RIESGO: '',
        AFIC_ALTO_COSTO: '',
      };
      $scope.gestion_aut = {
        num_esoa: '',
        ubicacion: '',
        productos: [],
        cantidad: 0
      };
    }


    $scope.limpiar_glosa = function () {
      $scope.glosa = {
        censo: '',
        ubicacion: '',
        glosas: [],
        cantidad_glosa: 0
      };
      $scope.glosa_evento = {
        cod_cups: '',
        cups_nombre: '',
        cantidad: '',
        valor_con: '',
        valor_glosa: '',
        motivo_glosa: '',
        motivo_nombre: '',
        observacion: ''
      };
    }

    $scope.initSelects = function () {
      $scope.Obtener_Tipos_Documentos();
      $scope.configModal();
    };

    $scope.configModal = function () {
      $('.modal').each(function (i, obj) {
        obj.addEventListener('click', function (event) {
          event.stopPropagation();
        });
        var backdropElement = obj.querySelector('.modal-backdrop');
        if (backdropElement) {
          backdropElement.removeEventListener('click', obj.close);
        }
        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
            event.preventDefault();
          }
        });
      });
    }

    $scope.check_adverso_glosa = function (adverso) {
      if (adverso == true) {
        $scope.evolucion.glosa = true;
        document.getElementById("check_glosa").disabled = true;
      } else {
        document.getElementById("check_glosa").disabled = false;
      }
    }

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

    $scope.setPasoCensoNuevo = function (paso) {
      if (paso == 2) {
        $scope.nuevoCenso.nombre_1 = $scope.afiliado.PNOMBRE;
        $scope.nuevoCenso.nombre_2 = $scope.afiliado.SNOMBRE;
        $scope.nuevoCenso.apellido_1 = $scope.afiliado.PAPELLIDO;
        $scope.nuevoCenso.apellido_2 = $scope.afiliado.SAPELLIDO;
        $scope.nuevoCenso.edad = $scope.afiliado.EDAD.split(' ')[0];
        $scope.nuevoCenso.regimen = $scope.afiliado.REGIMEN;
        $scope.nuevoCenso.sexo = $scope.afiliado.SEXO;
        $scope.nuevoCenso.nacimiento = $scope.afiliado.NACIMIENTO;
        $scope.nuevoCenso.municipio = $scope.afiliado.UBICGEO;
      }
      $scope.pasosNuevoCenso = paso;

    }

    $scope.obtenerPendientesAdmin = function () {
      if ($scope.listaPendientesAdm.length == 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "OBTENER_PENDIENTES",
          },
        }).then(function ({ data }) {
          swal.close();
          if (data.length > 0) {
            $scope.listaPendientesAdm = data;
          }
        });
      }
    }

    $scope.obtenerCensoPendientes = function (nit, tipo) {
      swal({ title: "Obteniendo datos" });
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "OBTENER_LISTA_CENSO_2",
          nit: nit,
          documento: $scope.datosInicio.documento,
          tipo: tipo,
        },
      }).then(function (res) {
        swal.close();
        if (res.data.length > 0) {
          $scope.listaCensosPendientes = res.data;
          $scope.gestion = 'ver';
          $scope.initPaginacion(res.data, 'pendientes');
        } else {
          return swal({
            title: "!NOTIFICACION¡",
            text: "NO HAY CENSOS PENDIENTES POR GESTION",
            type: "info",
          });
        }
      });
    };

    // $scope.obtenerCensoPendientes = function () {
    //   swal({ title: "Obteniendo datos" });
    //   swal.showLoading();
    //   $http({
    //     method: "POST",
    //     url: "php/salud/censo-hospitalario/censohospitalario.php",
    //     data: {
    //       function: "obtenerCensoPendientes",
    //       ubicacion: $scope.datosInicio.ubicacion,
    //       documento: $scope.datosInicio.documento,
    //     },
    //   }).then(function (res) {
    //     swal.close();
    //     if (res.data.length > 0) {
    //       $scope.listaCensosPendientes = res.data;
    //       $scope.initPaginacion(res.data);
    //     }
    //   });
    // };

    $scope.initPaginacion = function (info, tabla) {
      if (tabla == 'pendientes') {
        $scope.Lista_Tabla_Temp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
      } else {
        $scope.Lista_Tabla_Temp_Cerrados = info;
        $scope.currentPage_cerrados = 0;
        $scope.pageSize_cerrados = 10;
        $scope.valmaxpag_cerrados = 10;
        $scope.pages_cerrados = [];
      }

      $scope.configPages(tabla);
    };

    $scope.chg_filtrar = function (val, tabla) {
      $scope.filter(val, tabla);
    };

    $scope.filter = function (val, tabla) {
      if (tabla == 'pendientes') {
        $scope.Lista_Tabla_Temp = $filter("filter")(
          $scope.listaCensosPendientes,
          val
        );
        if ($scope.Lista_Tabla_Temp.length > 0) {
          $scope.setPage(1);
          $scope.configPages(tabla);
        }
      } else {
        $scope.Lista_Tabla_Temp_Cerrados = $filter("filter")(
          $scope.listaCensosCerrados,
          val
        );
        if ($scope.Lista_Tabla_Temp_Cerrados.length > 0) {
          $scope.setPage(1, tabla);
          $scope.configPages(tabla);
        }
      }
    };

    $scope.configPages = function (tabla) {
      if (tabla == 'pendientes') {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) >
            $scope.valmaxpag
          )
            fin = 10;
          else fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
        } else {
          if (
            ini >=
            Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) -
            $scope.valmaxpag
          ) {
            ini =
              Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) -
              $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }

        if ($scope.currentPage >= $scope.pages.length) {
          $scope.currentPage = $scope.pages.length - 1;
        }
      } else {
        $scope.pages_cerrados.length = 0;
        var ini = $scope.currentPage_cerrados - 4;
        var fin = $scope.currentPage_cerrados + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.Lista_Tabla_Temp_Cerrados.length / $scope.pageSize_cerrados) >
            $scope.valmaxpag_cerrados
          )
            fin = 10;
          else fin = Math.ceil($scope.Lista_Tabla_Temp_Cerrados.length / $scope.pageSize_cerrados);
        } else {
          if (
            ini >=
            Math.ceil($scope.Lista_Tabla_Temp_Cerrados.length / $scope.pageSize_cerrados) -
            $scope.valmaxpag_cerrados
          ) {
            ini =
              Math.ceil($scope.Lista_Tabla_Temp_Cerrados.length / $scope.pageSize_cerrados) -
              $scope.valmaxpag_cerrados;
            fin = Math.ceil($scope.Lista_Tabla_Temp_Cerrados.length / $scope.pageSize_cerrados);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages_cerrados.push({
            no: i,
          });
        }

        if ($scope.currentPage_cerrados >= $scope.pages_cerrados.length) {
          $scope.currentPage_cerrados = $scope.pages_cerrados.length - 1;
        }
      }

    };

    $scope.setPage = function (index, tabla) {
      if (tabla == 'pendientes') {
        $scope.currentPage = index - 1;
      } else {
        $scope.currentPage_cerrados = index - 1;
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
        if ($scope.Lista_Tabla_Temp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt(
            $scope.Lista_Tabla_Temp.length / $scope.pageSize
          );
        } else {
          var tamanomax =
            parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize) + 1;
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

    $scope.showModals = function (id, datos = null) {
      if (id != undefined) {
        var modalElement = document.getElementById(id);
        modalElement.style.display = 'block';
        var backdropElement = document.createElement('div');
        backdropElement.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(backdropElement);
        document.body.style.overflow = 'hidden';
        if (id == 'modalAgregarDiagnostico' || id == 'diagnostico_alterno_2' || id == 'diagnostico_alterno') {
          $scope.scope = datos;
          $scope.closeModal('modalNuevoCenso');
        }
        if (id == 'modalAgregarProducto') {
          $scope.censo = datos;
          $scope.closeModal('modalNuevaEvolucion');
        }
        $scope.censo = datos;
        if (id == "modalDetalleCenso") {
          $scope.obtenerFichaPaciente(datos.CENN_NUMERO, datos.CENN_UBICACION);
        }
        if (id == 'modalNuevaQueja') {
          $scope.obtenerMotivosEspecificos();
        }
        if (id == 'modalNuevoCenso') {
          $scope.obtenerTiposEstancia();
        }
        if (id == 'modalNuevaEvolucion') {
          $scope.censo = datos;
          $scope.obtenerHospitalizacion();
          $scope.obtenerPendientesAdmin();
        }
        if (id == 'modalNuevaGlosa') {
          $scope.obtenerMotivoGlosa();
        }
      }
    };

    $scope.closeModal = function (id) {
      if (id != undefined) {
        // $("#" + id).modal("close");
        var modalElement = document.getElementById(id);
        var backdropElement = document.querySelector('.modal-backdrop');
        modalElement.style.display = 'none';
        if (backdropElement != null) {
          backdropElement.remove();
        }
        document.body.style.overflow = 'auto';
        if (id == 'modalAgregarDiagnostico' || id == 'diagnostico_alterno_2' || id == 'diagnostico_alterno') {
          $scope.showModals('modalNuevoCenso');
        }
        if (id == 'modalAgregarProducto') {
          $scope.showModals('modalNuevaEvolucion', $scope.censo);
        }
        if (id == 'modalNuevaGlosa') {
          $scope.limpiar_glosa();
        }
      }
    }

    $scope.censoDetalle = function (value) {
      $scope.obtenerMotivoGlosa();
      $scope.obtenerEventosAdversos();
      $scope.obtenerMotivoEgreso();
      $scope.currentView = "evolucion";
      $scope.censo = value;
      $scope.AutorizacionesGestionadas = []
      $scope.AutorizacionesPendientes = []
      $scope.listaEvoluciones = [];
      $scope.obtenerEvoluciones(value.CENN_UBICACION, value.CENN_NUMERO);
      // $scope.obtenerAutorizaciones(
      //   value.CENC_TIPO_DOCUMENTO,
      //   value.CENC_AFILIADO,
      //   value.CENV_TERCERO
      // );
    };

    $scope.autorizaciones = function (censo) {
      $scope.gestion = "ver";
      $scope.currentView = "autorizaciones";
      $scope.titulo_autorizaciones = 'LISTA AUTORIZACIONES DE: ' + censo.NOMBRE_AFILIADO;
      $scope.censo = censo;
      $scope.AutorizacionesGestionadas = []
      $scope.AutorizacionesPendientes = []
      $scope.P_OBTENER_AUTORIZACIONES($scope.censo, $scope.rol.Nombre);
    }

    $scope.obtenerTiposEstancia = function () {
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "obtenerTiposEstancia"
        },
      }).then(function (res) {
        swal.close();
        if (res.data.length > 0) {
          $scope.listaTiposEstancia = res.data;
        }
      });
    }

    $scope.obtenerEvoluciones = function (ubicacion, numerocenso) {
      swal({ title: "Obteniendo datos" });
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "obtenerEvoluciones",
          ubicacion: ubicacion,
          numerocenso: numerocenso,
        },
      }).then(function (res) {
        swal.close();
        if (res.data.length > 0) {
          $scope.listaEvoluciones = res.data;
        }
      });
    };

    $scope.obtenerMotivoGlosa = function () {
      if ($scope.listaMotivoGlosa.length == 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "obtenerMotivoGlosa",
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaMotivoGlosa = res.data;
          }
        });
      }
    };

    $scope.obtenerEventosAdversos = function () {
      if ($scope.listaEventosAdversos.length == 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "obtenerEventosAdversos",
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaEventosAdversos = res.data;
          }
        });
      }
    };

    $scope.obtenerEventosAdvDeta = function (evento) {
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "obtenerEventosAdvDeta",
          evento: evento,
        },
      }).then(function (res) {
        if (res.data.length > 0) {
          $scope.listaEventosAdversosDeta = res.data;
        }
      });
    };

    $scope.obtenerMotivoEgreso = function () {
      if ($scope.listaMotivoEgreso.length == 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "obtenerMotivoEgreso",
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaMotivoEgreso = res.data;
          }
        });
      }
    };

    $scope.formatDate = function (date, separador = '/', format = 'DD-MM-AAAA') {
      let d = date;
      let dd = ("0" + d.getDate()).slice(-2);
      let mm = ("0" + (d.getMonth() + 1)).slice(-2);
      let yyyy = d.getFullYear();
      if (format == 'DD-MM-AAAA') {
        return dd + separador + mm + separador + yyyy; //+' '+hh+':'+mi+':00';
      } else {
        return yyyy + separador + mm + separador + dd;
      }
    };

    $scope.FormatSoloNumero = function (ID) {
      const input = document.getElementById(ID);
      var valor = input.value;
      valor = valor.replace(/[^0-9]/g, "");
      input.value = valor;
    };

    $scope.consultarDiagnostico = function (value) {
      if (value.length > 3) {
        $scope.listaDiagnosticos = [];
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "consultarDiagnostico",
            keyword: value,
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaDiagnosticos = res.data;
          }
        });
      }
    };

    $scope.obtenerHospitalizacion = function () {
      if ($scope.listaHospitalizacion.length == 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "obtenerhospitalizacion",
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaHospitalizacion = res.data;
          }
        });
      }
    };

    $scope.nuevaEvolucion = function () {
      $scope.evolucion.num_censo = $scope.censo.CENN_NUMERO;
      $scope.evolucion.ubicacion = $scope.censo.CENN_UBICACION;
      $scope.evolucion.responsable = sessionStorage.getItem("cedula");
      if ($scope.evolucion.glosa) {
        if ($scope.evolucion.glosas.length > 0) {
          $scope.evolucion.glosas.forEach(glosa => {
            glosa.observacion = $scope.evolucion.descripcion;
            glosa.valor_glosa = glosa.valor_glosa.replaceAll(".", '');
            // if ($scope.productoSelect.VALORP == '' || $scope.productoSelect.VALORP == undefined) {
            //   return swal({
            //     title: "!NOTIFICACION¡",
            //     text: "OCURRIO UN ERROR CON EL VALOR DEL CONTRATO POR FAVOR RECARGUE LA PAGINA",
            //     type: "error",
            //   });
            // }
            // glosa.valor_con = $scope.productoSelect.VALOR2;
          });
        } else {
          $scope.glosa_evolucion.valor_glosa = $scope.glosa_evolucion.valor_glosa.replaceAll(".", '');
          $scope.glosa_evolucion.observacion = $scope.evolucion.descripcion;
          $scope.glosa_evolucion.valor_con = $scope.productoSelect.VALOR2;
          $scope.evolucion.glosas.push($scope.glosa_evolucion);
        }
      }
      $scope.evolucion.num_glosas = $scope.evolucion.glosas.length;
      if ($scope.evolucion.cierre === true) {
        $scope.evolucion.fecha_cierre = $scope.formatDate($scope.evolucion.fecha_cierre_temp);
      }
      const objecion = $scope.evolucion.glosa == true ? 'S' : 'N';
      const adverso = $scope.evolucion.adverso == true ? 'S' : 'N';
      const cierre = $scope.evolucion.cierre == true ? 'S' : 'N';
      $scope.evolucion.glosa = objecion;
      $scope.evolucion.adverso = adverso;
      $scope.evolucion.cierre = cierre;
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      if ($scope.evolucion.diagnostico.length > 3) {
        if ($scope.evolucion.diagnostico.includes(' ')) {
          const diag = $scope.evolucion.diagnostico.split(' ')[0];
          $scope.evolucion.diagnostico = diag;
        }
      } else {
        return swal({
          title: "!NOTIFICACION¡",
          text: "DEBE ELEGIR UN DIAGNOSTICO DE LA LISTA O DIGITAR UNO VALIDO",
          type: "error",
        });
      }
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "nuevaEvolucion",
          evolucion: $scope.evolucion,
        },
      }).then(function ({ data }) {
        swal.close();
        swal({
          title: "!NOTIFICACION¡",
          text: data.mensaje.toUpperCase(),
          type: data.codigo == 1 ? "success" : "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
        }).then(() => {
          if (data.codigo == 1) {
            $scope.listaProductos = [];
            $scope.obtenerEvoluciones($scope.censo.CENN_UBICACION, $scope.censo.CENN_NUMERO);
            $scope.obtenerCensoPendientes($scope.tipoUsuario[0].NIT, $scope.tipoUsuario[0].TIPO);
            $scope.closeModal('modalNuevaGlosa');
            $scope.closeModal('modalNuevaEvolucion')
            $scope.limpiar_glosa();
            $scope.limpiarEvolucion();
            document.getElementById("check_glosa").disabled = false;
          }
        });
      });
    };

    $scope.ObservacionEvolucion = function (evolucion) {
      swal({
        html: `
          <div div class= "row" >
            <div class="col s12">
              <div class="form-group shadow-textarea">
                <label style="font-size: inherit;">OBSERVACION</label>
                <textarea class="form-control z-depth-1" rows="5" cols="15" id="observacio_evolucion"
                  style="margin: 0px;min-height: 200px ; text-transform:uppercase" maxlength="4000" readonly></textarea>
              </div>
            </div>
          </div>
        `,
        width: 1200,
        height: 1200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonText: "CERRAR",
        showConfirmButton: false,
        animation: false,
      });
      document.getElementById('observacio_evolucion').value = evolucion.OBSERVACION;
      // setTimeout(() => {
      //   document.getElementById('observacio_evolucion').value = evolucion.OBSERVACION;
      // }, 500);
    }

    $scope.obtenerEvolucionDetalle = function (datos) {
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "obtenerEvolucionDetalle",
          censo: datos.NUMERO,
          renglon: datos.RENGLON,
          ubicacion: datos.UBICACION,
        },
      }).then(function (res) {
        if (res.data.length > 0) $scope.detalleEvocion = res.data[0];
      });
    };

    $scope.obtenerMotivosEspecificos = function (datos) {
      if ($scope.listaMotivosEspecificos.length === 0) {
        $http({
          method: "POST",
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: "obtenerMotivosEspecificos",
          },
        }).then(function (res) {
          if (res.data.length > 0) {
            $scope.listaMotivosEspecificos = res.data;
            // $scope.registrarQueja(
            //   $scope.listaMotivosEspecificos,
            //   datos.RENGLON
            // );
          }
        });
      } else {
        // $scope.registrarQueja($scope.listaMotivosEspecificos, datos.RENGLON);
      }
    };

    $scope.volverNuevoCenso = function (paso) {
      $scope.pasosNuevoCenso = paso - 1;
    }

    $scope.obtenerFichaPaciente = function (cod_censo, ubi) {
      $scope.fichaPaciente = {};
      $http({
        method: "POST",
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: "obtenerFichaPaciente",
          ubicacion: ubi,
          numerocenso: cod_censo
        },
      }).then(function ({ data }) {
        $scope.fichaPaciente = data[0];
        console.log(data);

      })
    }

    $scope.FormatPeso = function (NID) {
      const input = document.getElementById('' + NID + '');
      var valor = input.value;
      valor = valor.replace(/[^0-9,]/g, '');
      if (NID == 'valorGlosaEvento') {
        if (parseInt(valor) < 0 || parseInt(valor) > parseInt($scope.productoSelect.VALOR2)) {
          input.value = '0';
          return swal({
            title: "!NOTIFICACION¡",
            text: "VALOR A GLOSAR NO PUEDE SER SUPERIOR AL VALOR DEL PRODUCTO",
            type: "error",
          });
        }

      }
      var array = null;
      var regex = new RegExp("\\,");
      if (!regex.test(valor)) {
        valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
      } else {
        array = valor.toString().split(',');
        if (array.length > 2) {
          input.value = 0;
        } else {
          array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
          if (array[1].length > 2) {
            array[1] = array[1].substr(0, 2);
          }
        }
      }
      if (!regex.test(valor)) {
        input.value = valor;
      } else {
        if (valor == ',') {
          input.value = 0;
        } else {
          if (valor.substr(0, 1) == ',') {
            input.value = 0 + ',' + array[1];
          } else {
            input.value = array[0] + ',' + array[1];
          }
        }
      }
    }

    $scope.nuevaGlosa = function (censo) {
      $scope.glosa.censo = censo.CENN_NUMERO;
      $scope.glosa_evento.censo = censo.CENN_NUMERO;
    }

    $scope.consultarAfiliado = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'consultaAfiliado',
          tipo_doc: $scope.nuevoCenso.tipo_doc,
          documento: $scope.nuevoCenso.documento
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          swal.close();
          $scope.afiliado = data[0];
          $scope.afiliado.NOMBRE_COMPLETO = data[0].PNOMBRE + ' ' + data[0].SNOMBRE + ' ' + data[0].PAPELLIDO + ' ' + data[0].SAPELLIDO;
          $scope.setPasoCensoNuevo(2);
        } else {
          return swal('!NOTIFICACION¡', "NO SE ENCONTRARON DATOS PARA ESTA CONSULTA", 'error');
        }

      });
    }

    $scope.consultaIps = function () {
      $scope.listaIps = [];
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'consultarIps',
          query: $scope.ips_query,
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          swal.close();
          $scope.listaIps = data;
        } else {
          swal.close();
        }
      });
    }

    $scope.consultaDiagnostico = function (query) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'obtenerDiagnostico',
          query: query
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          swal.close();
          $scope.listaDiagnosticos = data;
        } else {
          swal.close();
        }
      });
    }

    $scope.seleccionarDiagnostico = function (dx, model) {
      $scope.nuevoCenso[model] = dx.CODIGO + ' - ' + dx.NOMBRE;
      $scope.closeModal('modalAgregarDiagnostico');
      $scope.diagnostico = '';
    }

    $scope.seleccionarProducto = function (cups, model) {
      $scope.productoSelect = cups;
      $scope.glosa_evento[model] = cups.CODIGO + ' - ' + cups.NOMBRE;
      $scope.glosa_evento.cod_cups = cups.CODIGO;
      $scope.glosa_evento.valor_con = cups.VALORP.trim();
      $scope.glosa_evolucion[model] = cups.CODIGO + ' - ' + cups.NOMBRE;
      $scope.glosa_evolucion.cod_cups = cups.CODIGO;
      $scope.glosa_evolucion.valor_con = cups.VALORP.trim();
      $scope.closeModal('modalAgregarProducto');
      $scope.cups_modal = '';
      $scope.listaProductos = [];
      setTimeout(() => {
        $scope.$apply();
      }, 500);
    }

    $scope.guardarCensoNuevo = function () {
      console.log($scope.nuevoCenso);
      $scope.nuevoCenso = {};
      $scope.pasosNuevoCenso = 1;
      $scope.closeModal('modalNuevoCenso');
    }

    $scope.agregar_glosa_evolucion = function (glosa_in, scope) {
      const g = JSON.stringify(glosa_in);
      let cont_prod = 0;
      if (scope != undefined) {
        let glosa = JSON.parse(g);
        $scope.btn_nueva_glosa = false;
        $scope[scope].observacion = $scope.evolucion.descripcion;
        // $scope[scope].valor_con = $scope.productoSelect.VALOR2;
        glosa.valor_con = $scope.productoSelect.VALOR2;
        $scope.evolucion.glosas.forEach(gl => {
          if (gl.cod_cups == glosa.cod_cups) {
            cont_prod++;
          }
        });
        if (cont_prod > 0) {
          return swal({
            title: "!NOTIFICACION¡",
            text: "ESTE PRODUCTO YA FUE GLOSADO",
            type: "error",
          });
        }
        $scope.evolucion.glosas.push(glosa);
      } else {
        $scope.glosa.glosas.forEach(gl => {
          if (gl.CODIGO == glosa.CODIGO) {
            cont_prod++;
          }
        });
        if (cont_prod > 0) {
          return swal({
            title: "!NOTIFICACION¡",
            text: "ESTE PRODUCTO YA FUE GLOSADO",
            type: "error",
          });
        }
        $scope.glosa.glosas.push(glosa);
      }
      $scope.glosa_evento = {
        cod_cups: '',
        cups_nombre: '',
        cantidad: '',
        valor_con: '',
        valor_glosa: '',
        motivo_glosa: '',
        motivo_nombre: '',
        observacion: ''
      };
      $scope.productoSelect = {};
    }

    $scope.remover_glosa_evolucion = function (glosa, scope) {
      if (scope == 'evolucion') {
        let index = $scope.evolucion.glosas.findIndex((g) => g == glosa);
        if (index > -1) {
          $scope.evolucion.glosas.splice(index);
        }
      } else {
        let index = $scope.glosa.glosas.findIndex((g) => g == glosa);
        if (index > -1) {
          $scope.glosa.glosas.splice(index);
        }
      }
    }

    $scope.consultarProducto = function (cups, id = null) {
      $scope.listaProductos = [];
      if (cups != undefined && cups != '') {
        if (cups.length > 5) {
          $http({
            method: 'POST',
            url: "php/salud/censo-hospitalario/censohospitalario.php",
            data: {
              function: 'P_OBTENER_PRODUCTO',
              codigo: cups,
              regimen: $scope.censo.REGIMEN.substring(0, 1),
              contrato: $scope.censo.NUM_CONTRATO,
              edad: $scope.censo.EDAD_DIAS,
              sexo: $scope.censo.SEXO
            }
          }).then(function ({ data }) {
            if (data.length > 0) {
              swal.close();
              if (data[0].CODIGO == -1) {
                $scope.listaProductos = [];
                return swal({
                  title: "!NOTIFICACION¡",
                  text: data[0].NOMBRE,
                  type: "error",
                });
              } else {
                $scope.listaProductos = data;
                if (id != null) {
                  document.getElementById(id).value = data[0].CODIGO + ' - ' + data[0].NOMBRE;
                  $scope.glosa_evento.cod_cups = data[0].CODIGO;
                  $scope.glosa_evento.cups_nombre = data[0].NOMBRE;
                  $scope.productoSelect = data[0];
                }
              }
            } else {
              swal.close();
            }
          });
        }
      }
    }

    $scope.agregar_nueva_glosa_evolucion = function () {
      $scope.btn_nueva_glosa = true;
      $scope.glosa_evento = {};
      $scope.glosa_evolucion = {};
    }

    $scope.guardarGlosa = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      if ($scope.glosa.glosas.length == 0) {
        if (
          $scope.glosa_evento.cod_cups != '' &&
          $scope.glosa_evento.cantidad != '' &&
          $scope.productoSelect.VALOR2 != '' &&
          $scope.glosa_evento.valor_glosa != '' &&
          $scope.glosa_evento.observacion != '') {
          $scope.glosa.glosas.push($scope.glosa_evento);
        } else {
          return swal({
            title: "!NOTIFICACION¡",
            text: "DEBE DILIGENCIAR TODOS LOS CAMPOS",
            type: "error",
          });
        }
      }

      $scope.glosa.censo = $scope.censo.CENN_NUMERO;
      $scope.glosa.ubicacion = $scope.censo.CENN_UBICACION
      $scope.glosa.cantidad_glosa = $scope.glosa.glosas.length;
      $scope.glosa.glosas.forEach((glosa, index) => {
        $scope.glosa.glosas[index].valor_con = $scope.productoSelect.VALOR2;
        $scope.glosa.glosas[index].valor_glosa = $scope.glosa.glosas[index].valor_glosa.replaceAll(".", '');
        if (glosa.cod_cups.includes(' ')) {
          const diag = glosa.cod_cups.split(' ')[0];
          $scope.glosa.glosas[index].cod_cups = diag;
        }
        // glosa.valor_con = glosa.valor_con.replace(".", '');
        // glosa.valor_glosa = glosa.valor_glosa.replace(".", '');
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'P_UI_GLOSA',
          glosa: $scope.glosa
        }
      }).then(function ({ data }) {
        swal({
          title: "!NOTIFICACION¡",
          text: data.Nombre.toUpperCase(),
          type: data.Codigo == 0 ? "success" : "error",
        }).then(() => {
          if (data.Codigo == 0) {
            $scope.productoSelect = {};
            $scope.listaProductos = [];
            $scope.limpiar_glosa();
            $scope.closeModal('modalNuevaGlosa');
            setTimeout(() => {
              $scope.obtenerCensoPendientes($scope.tipoUsuario[0].NIT, $scope.tipoUsuario[0].TIPO);
            }, 500);
          }
        });
      });
    }

    $scope.gestionarAutorizacion = async function (aut) {

      // $scope.OBTENER_DETALLE_AUT(aut);
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando el detalle...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_DETALLE_AUT',
          codigo: aut.SOAN_NUMERO
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          $scope.autDetalle = data[0];
          $scope.titulo_autorizaciones = 'GESTIONAR AUT NUM: ' + aut.SOAN_NUMERO;
          $scope.gestion = "gestion_pendientes";
          $scope.autDetalleTemp = $scope.autDetalle;
        }
        swal.close();
      });
    }

    $scope.OBTENER_DETALLE_AUT = function (AUT) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_DETALLE_AUT',
          autorizacion: JSON.stringify({ nitavanzado: 0, documentoavanzado: 0, numero: AUT.SOAN_NUMERO, ubicacion: AUT.SOAN_UBICACION, anno: 0, mes: 0 }),
        }
      }).then(function ({ data }) {
        console.log(data);
        $scope.autDetalle = data;
        swal.close();
      });
    }

    $scope.download = function (ruta) {
      if (ruta != '') {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Descargando Adjunto...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false,
        });
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          swal.close();
          window.open("temp/" + response.data);
        });
      }
    }



    // $scope.gestionarAutorizacion = async function () {
    //   let resp = await swal({
    //     title: "¿Es pertinente esta Autorizacion?",
    //     type: "warning",
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //     showCancelButton: true,
    //     cancelButtonText: "NO, CERRAR",
    //     confirmButtonText: "SI, CONTINUAR",
    //   }).then((resultx) => {
    //     if (resultx) {
    //       console.log("continuar");
    //       return true;
    //     }
    //     return false;
    //   }).catch(swal.noop);
    //   if (resp == undefined) {
    //     await swal({
    //       title: "¿Es pertinente esta Autorizacion?",
    //       html: `
    //           <div class="col">
    //            <div div class= "row" >
    //               <div class="col s12">
    //                 <div class="form-group shadow-textarea">
    //                   <label style="font-size: inherit;">OBSERVACION</label>
    //                     <textarea class="form-control z-depth-1" rows="5" cols="15" id="observacio_autorizaciones"
    //                     style="margin: 0px;min-height: 200px ; text-transform:uppercase" maxlength="4000"></textarea>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           `,
    //       width: '500px',
    //       showCancelButton: true,
    //       cancelButtonText: "CANCELAR GESTION",
    //       confirmButtonText: "GUARDAR",
    //       preConfirm: function () {
    //         return new Promise(function (resolve) {
    //           let observacion = $('#observacio_autorizaciones').val()
    //           if (observacion != '') {
    //             resolve(
    //               { status: true, observacion: observacion }
    //             )
    //           } else {
    //             resolve(
    //               { status: false, observacion: "" }
    //             )
    //           }
    //         })
    //       }
    //     }).then(function (resultx) {
    //       if (resultx.status) {
    //         console.log("exito");

    //       } else {
    //         console.log(resultx);
    //       }

    //     }).catch(swal.noop);
    //   }
    // }

    $scope.atras = function (pantalla, gestion = 'ver') {
      if (pantalla == 'AUT') {
        if ($scope.gestion == 'ver') {
          $scope.currentView = 'pendientes';
        }
        $scope.gestion = 'ver';
      } else {
        $scope.gestion = gestion;
        $scope.currentView = 'pendientes';
      }
    }

    $scope.P_OBTENER_AUTORIZACIONES = function (censo, accion) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'P_OBTENER_AUTORIZACIONES',
          prestador: censo.CENV_TERCERO,
          tipodocumento: censo.CENC_TIPO_DOCUMENTO,
          documento: censo.CENC_AFILIADO,
          censo: censo.CENN_NUMERO,
          ubicacion: censo.CENN_UBICACION,
          accion: accion
        }
      }).then(function ({ data }) {
        $scope.AutorizacionesGestionadas = data.GESTIONADAS;
        $scope.AutorizacionesPendientes = data.PENDIENTES;
        swal.close();
      });
    }

    $scope.selectPertinencia = function (id_producto, id_select) {
      if (id_producto != undefined && id_select != undefined) {
        const i = $scope.autDetalleTemp.DETALLES.findIndex((p) => p.renglon == id_producto);
        const pertinencia = document.getElementById(id_select).value;
        if (i > -1) {
          $scope.autDetalleTemp.DETALLES[i].pertinencia = pertinencia;
          if (pertinencia == 'N') {
            swal({
              title: "OBSERVACION",
              html: `
                    <div class="col">
                      <div div class= "row" >
                        <div class="col s12">
                          <div class="form-group shadow-textarea">
                            <label style="font-size: inherit;">OBSERVACION</label>
                            <textarea class="form-control z-depth-1" rows="5" cols="15" id="observacio_pertinencia"
                            style="margin: 0px;min-height: 200px ; text-transform:uppercase" maxlength="4000"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    `,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showCancelButton: false,
              showLoaderOnConfirm: true,
              width: '500px',
              animation: "slide-from-top",
              preConfirm: function () {
                return new Promise(function (resolve) {
                  let observacion = $('#observacio_pertinencia').val()
                  if (observacion != '') {
                    resolve(
                      { status: true, observacion: observacion }
                    )
                  } else {
                    resolve(
                      { status: false, observacion: "" }
                    )
                  }
                })
              }
            }).then(function (resultx) {
              if (resultx.status) {
                $scope.autDetalleTemp.DETALLES[i].pertinencia_observacion = resultx.observacion;
              } else {
                document.getElementById(id_select).value = '';
                $scope.autDetalleTemp.DETALLES[i].pertinencia = undefined;
                return swal({
                  title: "!NOTIFICACION¡",
                  text: "DEBE DILIGENCIAR UNA OBSERVACION",
                  type: "error",
                });
              }
            }).catch(swal.noop);
          }
        }
      }
    }

    $scope.gestionarPertinencia = function (detalle) {
      let conta = 0;
      $scope.gestion_aut.productos = [];
      $scope.autDetalleTemp.DETALLES.forEach(p => {
        console.log(p);
        if (p.pertinencia == undefined) {
          conta++;
        }
        $scope.gestion_aut.productos.push(
          {
            estado: p.pertinencia,
            renglon: p.renglon,
            observacion: p.observacion,
            cantidad: p.cantidad,
            codigo: p.cod_producto,
            subclas: p.subclas,
            subclasn: p.subclasn,
          }
        );
      });
      if (conta > 0) {
        return swal({
          title: "!NOTIFICACION¡",
          text: "DEBE MARCAR LA PERTINENCIA DE TODOS LOS PRODUCTOS",
          type: "error",
        });
      }
      $scope.gestion_aut.num_esoa = detalle.NUMERO;
      $scope.gestion_aut.ubicacion = detalle.UBICACION;
      $scope.gestion_aut.cantidad = $scope.gestion_aut.productos.length;
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'GESTIONA_ESOA',
          gestion: $scope.gestion_aut,
        }
      }).then(function ({ data }) {
        swal({
          title: "!NOTIFICACION¡",
          text: data.Nombre,
          type: data.Codigo == 0 ? "success" : "error",
        });
      }).then(() => {
        $scope.P_OBTENER_AUTORIZACIONES($scope.censo, $scope.rol.Nombre);
        $scope.obtenerCensoPendientes($scope.tipoUsuario[0].NIT, $scope.tipoUsuario[0].TIPO);
        $scope.atras('AUT');
      })
    }

    $scope.verGlosas = function (modal, censo, ubicacion, evolucion = '') {
      $scope.listaGlosas = [];
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_GLOSAS',
          censo: censo,
          ubicacion: ubicacion,
          evolucion: evolucion
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          $scope.currentView = "glosas";
          $scope.listaGlosas = data;
        } else {
          return swal({
            title: "!NOTIFICACION¡",
            text: "NO SE ENCONTRARON GLOSAS",
            type: "error",
          });
        }
        swal.close();
      });
    }

    $scope.ObservacionGlosa = function (glosa) {
      swal({
        html: `
          <div div class= "row" >
            <div class="col s12">
              <div class="form-group shadow-textarea">
                <label style="font-size: inherit;">OBSERVACION</label>
                <textarea class="form-control z-depth-1" rows="5" cols="15" id="observacio_glosa"
                  style="margin: 0px;min-height: 200px ; text-transform:uppercase" maxlength="4000" readonly></textarea>
              </div>
            </div>
          </div>
        `,
        width: 1200,
        height: 1200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonText: "CERRAR",
        showConfirmButton: false,
        animation: false,
      });
      document.getElementById('observacio_glosa').value = glosa.OBSERVACION;
    }

    $scope.consultar_prestador_auditor = function (documento, tipo_documento) {
      if (tipo_documento == '') {
        $scope.listaFuncionarios = [];
      } else {
        $scope.listaPrestadores = [];
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
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_PRESTADOR_AUDITOR',
          documento: documento,
          tipo_documento: tipo_documento
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          if (data.length > 1) {
            if (tipo_documento == '') {
              $scope.listaFuncionarios = data;
            } else {
              $scope.listaPrestadores = data;
            }
          } else {
            if (tipo_documento == '') {
              $scope.listaFuncionarios = data;
            } else {
              $scope.listaPrestadores = data;
              $scope.adminAuditores.auditores = data[0].AUDITORES;
              $scope.adminAuditores.cantidad_auditor_temp = data[0].AUDITORES.length;
              $scope.adminAuditores.nit = data[0].NIT;
              $scope.ips_selected = data[0];
            }
          }
        } else {
          return swal({
            title: "!NOTIFICACION¡",
            text: `NO SE ENCONTRO ${tipo_documento == 'I' ? 'PRESTADOR' : 'FUNCIONARIO'}`,
            // text: "NO SE ENCONTRO " + tipo_documento == '' ? 'PRESTADOR' : 'FUNCIONARIO',
            type: "error",
          });
        }
        swal.close();
      });
    }

    $scope.agregarFuncionario = function (funcionario) {
      if (funcionario != undefined) {
        let fun = $scope.adminAuditores.auditores.find((f) => f.NIT == funcionario.NIT);
        if (fun == undefined) {
          $scope.adminAuditores.auditores.push({ NIT: funcionario.NIT, ESTADO: 'A', NOMBRE: funcionario.NOMBRE });
        } else {
          return swal({
            title: "!NOTIFICACION¡",
            text: `${funcionario.NOMBRE} YA SE ENCUENTRA ASIGNADO`,
            type: "error",
          });
        }
      }
    }

    $scope.removerFuncionario = function (funcionario) {
      if (funcionario != undefined) {
        let index = $scope.adminAuditores.auditores.findIndex((f) => f.NIT == funcionario.NIT);
        if (index > -1) {
          $scope.adminAuditores.auditores.splice(index, 1);
        }
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
    }

    $scope.guardarFuncionariosAdmin = function () {
      $scope.adminAuditores.cantidad_auditor = $scope.adminAuditores.auditores.length;
      if ($scope.adminAuditores.nit == '') {
        $scope.adminAuditores.nit = $scope.ips_selected.NIT;
      }
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Asignado responsables...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'P_UI_ADMIN_AUDITOR',
          json: $scope.adminAuditores,
          accion: $scope.adminAuditores.cantidad_auditor_temp != $scope.adminAuditores.cantidad_auditor ? 'U' : 'I'
        }
      }).then(function ({ data }) {
        swal({
          title: "!NOTIFICACION¡",
          text: data.Nombre,
          type: data.Codigo == 1 ? "error" : "success",
        });
      });

    }

    $scope.obtener_acceso = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">CONSULTANDO PRESTADORES ASIGNADOS...</p>',
        width: 400,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'P_OBTENER_ACCESO',
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          $scope.gestion = 'prestadores';
          $scope.tipoUsuario = data;
        } else {
          $scope.gestion = 'ver';
        }
        swal.close();
      });
    }

    $scope.selectPrestador = function (prestador, accion) {
      if (accion == 'censos_pendientes') {
        $scope.prestador = prestador;
        $scope.obtenerCensoPendientes(prestador.NIT, prestador.TIPO);
      }
      if (accion == 'agregar_funcionarios') {
        $scope.listaPrestadores = [];
        $scope.ips_selected = prestador;
        $scope.listaPrestadores = [...$scope.listaPrestadores, prestador];
        // $scope.consultar_prestador_auditor(prestador, 'I');
      }
    }

    $scope.cancelar_admin = function () {
      $scope.ips_selected = undefined;
      $scope.listaPrestadores = [];
      $scope.prestador = ''
      $scope.funcionario_query = ''
    }

    $scope.obtenerCensosCerrados = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">CONSULTANDO DATOS...</p>',
        width: 400,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'OBTENER_CENSO_CERRADO',
          nit: $scope.prestador.NIT
        }
      }).then(function ({ data }) {
        if (data.length > 0) {
          $scope.listaCensosCerrados = data;
          $scope.initPaginacion(data, 'cerrados');
        }
        swal.close();
      });
    }

    $scope.agregarFactura = function (censo) {
      $scope.valorFactura = '';
      $scope.numeroFactura = '';
      let valorFormateado = '';
      swal({
        title: 'Actualizar Factura',
        html: `
            <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
            <div class="row m-b">
             <strong class="switch" style="font-weight: 100; font-size: 0.9rem">${censo.NOMBRE_AFILIADO}</strong>
            </div
            <div class="row">
            <div class="col s12 no-padding label-new m-b">
            <input type="text" class="margin border-none input-text-new w-100 m-l" oninput="this.value = this.value.replace(/[^0-9A-Za-z]/g, '');" autocomplete="off" id="numeroFactura" />
          <label>Numero factura</label>  
            </div>
            <div class="col s12 no-padding label-new m-b">
            <input type="text" class="margin border-none input-text-new w-100 m-l" onkeyup="FormatPeso('valorFactura')" autocomplete="off" id="valorFactura" />
          <label>Valor factura</label>  
            </div>
            </div>
          </div>
                  `,

        width: '500px',
        allowOutsideClick: false,
        confirmButtonText: 'Actualizar',
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve(
              $scope.valorFactura = $('#valorFactura').val(),
              $scope.numeroFactura = $('#numeroFactura').val(),
              // {
              //     soporte: $('#SporteProce').val(),
              // }
            )
          })
        }
      }).then(function (result) {
        if ($scope.valorFactura == '' && $scope.numeroFactura == '') {
          return swal('Advertencia', '¡Por favor ingresar valor y numero de factura!', 'warning');
        }
        valorFormateado = $scope.valorFactura.replaceAll("$", '').replaceAll('.', '');
        $http({
          method: 'POST',
          url: "php/salud/censo-hospitalario/censohospitalario.php",
          data: {
            function: 'ACTUALIZA_FACTURA_CENSO_CERRADO',
            censo: censo.CENN_NUMERO,
            ubi: censo.CENN_UBICACION,
            fact: $scope.numeroFactura,
            valor: valorFormateado,
          }
          // data: { function: 'ConsultaCensoCerrado', tipoDoc: $scope.formCensoCerrado.tipoDoc, numDoc: $scope.formCensoCerrado.numDoc }
        }).then(function ({ data }) {
          if (data.Codigo == 0) {
            swal('Notificacíon', '¡Factura Actualizada!', 'success');
          }
        });
      })
    }

    $scope.ui_vobo_aut = function (aut, accion) {
      if (accion == 'S') {
        swal({
          title: "Por favor indique la fecha de ingreso",
          html: `
                  <div class="col">
                  <label style="font-weight: bold;">Fecha</label>
                  <input id="datetimepicker" type="date" class="form-control" style="text-align:center"  max="`+ $scope.formatDate($scope.maxDate, '-', 'AAAA-MM-DD') + `" autofocus>
                  </div>
                  `,
          width: '500px',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          cancelButtonText: "CANCELAR GESTION",
          confirmButtonText: "GUARDAR",
          preConfirm: function () {
            return new Promise(function (resolve) {
              let fecha = $('#datetimepicker').val()
              if (fecha != '') {
                const f = fecha.split('-');
                resolve(
                  { status: true, fecha: f[2] + '/' + f[1] + '/' + f[0] }
                )
              } else {
                resolve(
                  { status: false, fecha: "" }
                )
              }
            })
          }
        }).then(function (resultx) {
          if (resultx.status) {
            $scope.voboAUT(aut, accion, resultx.fecha);
          }
        }).catch(swal.noop);
      } else {
        $scope.voboAUT(aut, accion);
      }
    }

    $scope.voboAUT = function (aut, accion, fecha = '') {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">ENVIANDO RESPUESTA...</p>',
        width: 400,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
      });
      $http({
        method: 'POST',
        url: "php/salud/censo-hospitalario/censohospitalario.php",
        data: {
          function: 'P_UI_VOBO_AUT',
          numero: aut.NUMERO,
          ubicacion: aut.UBICACION,
          accion: accion,
          fecha: fecha
        }
      }).then(function ({ data }) {
        swal({
          title: "!NOTIFICACION¡",
          text: data.Nombre,
          type: data.Codigo == '0' ? 'success' : "error",
          showConfirmButton: true,
        }).then(() => {
          if (data.Codigo == '0') {
            $scope.obtenerCensoPendientes($scope.tipoUsuario[0].NIT, $scope.tipoUsuario[0].TIPO);
            $scope.currentView = 'pendientes';
          }
        })
      });
    }
    // FIN CONTROLLER

    jQuery(document).ready(function () {
      jQuery('[data-toggle="modal"]').each(function () {
        jQuery(this).attr('data-backdrop', 'static');
        jQuery(this).attr('data-keyboard', 'false');
      });
    });

    if (document.readyState !== "loading") {
      $scope.inicio();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        $scope.inicio();
      });
    }
  },
]);

