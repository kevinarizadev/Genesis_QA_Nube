'use strict';
angular.module('GenesisApp').controller('seguimientoCACController', ['$scope', 'consultaHTTP', '$http', '$timeout', 'afiliacionHttp', 'ngDialog', '$filter', '$q', function ($scope, consultaHTTP, $http, $timeout, afiliacionHttp, ngDialog, $filter, $q) {

  $(document).ready(function () {
    $('.tabs').tabs();
    $('.modal').modal();
    $scope.Tabs = 1;
  });
  $scope.observaciones = [];
  $scope.trazabilidad = 0;
  $scope.textoColor = 'black';
  $scope.bloquearDireccion = true;
  $scope.bloquearEdad = true;
  $scope.bloquearGenero = true;
  $scope.bloquearCorreo = true;
  $scope.bloquearCIE10 = true;
  $scope.bloquearPortabilidad = true;
  $scope.bloquearCohorte = true;
  $scope.bloquearClasifiacion = true;
  $scope.bloquearRegional = true;
  $scope.bloquearSiniestro = true;
  $scope.bloquearTipodoc = true;
  $scope.bloquearNumdoc = true;
  $scope.bloquearNombresyapellidos = true;
  $scope.bloquearPortabilidad = true;
  $scope.bloquearDescripcioPortabilidad = true;
  $scope.bloquearTelefono = true;
  $scope.Modificado = false
  $scope.bloquearCorreo = true;
  $scope.editartelefono = function () {
    $scope.Modificado = true
    $scope.bloquearTelefono = false;
  }
  $scope.editarcorreo = function () {
    $scope.Modificado = true
    $scope.bloquearCorreo = false;
  }
  $scope.Act_Zona = { Codigo: '' };
  $scope.ViaPrincipal = { Codigo: '' };
  $scope.Letra = { Codigo: '' };
  $scope.Cuadrante = { Codigo: '' };
  $scope.CuadranteVG = { Codigo: '' };
  $scope.SelectLetraVG = { Codigo: '' };
  $scope.Bis = false;
  $scope.validarCorreo = function () {
    let correo = $scope.formSeguimiento.Correo;
    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo || !correoRegex.test(correo)) {
      // El correo electrónico es inválido
      $scope.correoInvalido = true;
    } else {
      // El correo electrónico es válido
      $scope.correoInvalido = false;
      console.log('El correo electrónico es válido');
    }
  };
  $scope.validarTelefono = function () {
    $scope.formSeguimiento.Telefono = $scope.formSeguimiento.Telefono.replace(/\D/g, '');
    let telefono = $scope.formSeguimiento.Telefono;
    let telefonoRegex = /^3\d{0,9}$/;
    if (!telefono || !telefonoRegex.test(telefono)) {
      // El número de teléfono es inválido
      $scope.telefonoInvalido = true;
    } else {
      // El número de teléfono es válido
      $scope.telefonoInvalido = false;
      console.log('El número de teléfono es válido');
    }
  };
  $scope.Patologia_Afiliados = function (tipoDoc, doc) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_PATOLOGIA_AFILIADOS',
        P_VC_TIPO_DOC: tipoDoc,
        P_VC_DOCUMENTO: doc,
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.patologiaAfiliados = response.data;
      } else {
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  };
  $scope.dataSiniestro = function (siniestro) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_SESION',
        P_NU_NUMERO: siniestro.IdSeguimiento,
        P_V_USUARIO: sessionStorage.getItem("usuario"),
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (response.data.Codigo === 1) {
          swal({
            title: "¡Mensaje!",
            text: 'El seguimiento se encuentra en gestión por el usuario ' + response.data.SesionUsuario,
            type: "warning"
          }).catch(swal.noop);
        } else {
          $scope.formSeguimiento = siniestro;
          $scope.selectedEstado = "";
          $scope.observacion = "";
          $scope.selectedResponsable = "";
          $scope.formSeguimiento.NombreCompleto = siniestro.Nombres + ' ' + siniestro.Apellidos
          $scope.Patologia_Afiliados(siniestro.TipoDocumento, siniestro.NumDocumento)
          $scope.P_ST_INICIAR_GESTION(siniestro.IdSeguimiento);
          $scope.trazabilidad = 0;
          $scope.mostrarVista('formularioSeguimiento');
        }
      } else {
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.mostrarVista = function (vista) {
    $scope.vista = vista
    if (vista == 'tablaSeguimiento') {
      $scope.iniciarFormulario();
    } else if (vista == 'tablaGestion') {
      $scope.iniciarFormularioVista2();
    }


  }
  $scope.nuevoAfiliadoForm = {
    tipoDocumento: null,
    numDocumento: null,
    siniestro: null,
    marca: null
  }
  // Modal nuevo afiliado
  $scope.nuevoAfiliado = function () {
    $scope.Obtene_P_Lista_Marca_Usuario();
    $scope.MPFiltrar_Diag = '';
    $scope.dialogNuevoAfiliado = ngDialog.open({
      template: 'views/altocosto/modal/modalNuevoAfiliado.html',
      className: 'ngdialog-theme-plain',
      controller: 'seguimientoCACController',
      scope: $scope
    });
  }
  $scope.select_Siniestro = function (datos) {
    console.log(datos);
    $scope.nuevoAfiliadoForm.cohortes = datos.DESCRIPCION_COHORTE;
    $scope.nuevoAfiliadoForm.clasificacion = datos.CLASE_CONCEPTO;
    $scope.tablanuevoAfiliadoSiniestro = false;
    $scope.nuevoAfiliadoForm.siniestro = datos.RADICADO;

  }
  $scope.enviarAfiliado = function () {

    if (!$scope.validateFiels($scope.nuevoAfiliadoForm)) {
      swal({
        title: "¡Mensaje!",
        text: 'Ingrese todos los campos.',
        type: "warning"
      }).catch(swal.noop);
      return;
    }

    swal({
      title: 'Cargando',
      html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#fff',
      showCloseButton: false,
    });

    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_EAFI_AFILIADOS',
        ...$scope.nuevoAfiliadoForm
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        if (Number(response.data.Codigo) === 2) {
          $scope.dialogNuevoAfiliado = ngDialog.close({
            template: 'views/altocosto/modal/modalNuevoAfiliado.html',
            className: 'ngdialog-theme-plain',
            controller: 'seguimientoCACController',
            scope: $scope
          });
          //$scope.dialogNuevoAfiliado.close();
          $scope.filtrado();
          swal.close();
          swal({
            title: "¡Mensaje!",
            text: response.data.Descripcion,
            type: "success"
          }).catch(swal.noop);
        } else {
          swal({
            title: "¡Mensaje!",
            text: response.data.Descripcion,
            type: "warning"
          }).catch(swal.noop);
        }
      } else {
        swal({
          title: "¡Mensaje!",
          text: 'Ha ocurrido un error de conexión.',
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.Estado_Solicitud_Color = function (Estado) {
    if (Estado.toString().toUpperCase() == 'VERDE') {
      return { "background-color": "rgb(3, 197, 20) !important;" }
    }
    if (Estado.toString().toUpperCase() == 'AZUL') {
      return { "background-color": "rgb(51, 70, 255)!important" }
    }
    if (Estado.toString().toUpperCase() == 'ROJO') {
      return { "background-color": "rgb(245, 75, 75) !important;" }
    }
    if (Estado.toString().toUpperCase() == 'AMARILLO') {
      return { "background-color": "rgb(255, 235, 59) !important;" }
    }
  }
  $scope.Estado_Solicitud_Clase = function (Estado) {
    if (Estado.toString().toUpperCase() == 'VERDE') {
      return "Con_pulse_VERDE"
    }
    if (Estado.toString().toUpperCase() == 'AZUL') {
      return "Con_pulse_AZUL"
    }
    if (Estado.toString().toUpperCase() == 'ROJO') {
      return "Con_pulse_ROJO"
    }
    if (Estado.toString().toUpperCase() == 'AMARILLO') {
      return "Con_pulse_AMARILLO"
    }
  }
  // Validar campos
  $scope.validateFiels = function (obj) {
    let objProp = Object.values(obj).every(value => {
      if (value === null || value === undefined || value === false) {
        return false;
      }
      return true;
    });
    return objProp;
  }
  $scope.AbrirModalDireccion = function () {
    $scope.bloquearCampodirrecion = false;
    $scope.dialogDiagreg = ngDialog.open({
      template: 'views/altocosto/modal/modalDireccion.html',
      className: 'ngdialog-theme-plain',
      controller: 'seguimientoCACController',
      closeByDocument: false,
      closeByEscape: false,
      scope: $scope
    });
    $scope.dialogDiagreg.closePromise.then(function (data) {
      if (data.value != "$closeButton") {
        $scope.Act_Direccion2 = data.value;
        $scope.formSeguimiento.Direccion = $scope.Act_Direccion2;
        $scope.Localaidad2 = $('#barrio').val();
        $scope.Act_Barrio = $scope.Localaidad2

      } else {
        $scope.Act_Direccion;
        $scope.Act_Barrio = $scope.barrio;
      }
    });
  }
  $scope.SetTab = function (x) {
    $scope.Tabs = x;
    setTimeout(() => {
      $scope.$apply();
    }, 500);
  }
  //listados
  $scope.Obtener_Tipos_Documentos = function () {
    $http({
      method: 'POST',
      url: "php/genesis/funcgenesis.php",
      data: {
        function: 'Obtener_Tipos_Documentos',
        Tipo: 'S'
      }
    }).then(function (response) {
      console.log(response);
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
  $scope.Obtene_P_Lista_Cohortes = function () {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'ObtenePListaCohortes',
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.list_cohortes = response.data;
      } else {
        swal({
          title: "¡Ocurrio un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.Obtene_P_Lista_Clasificacion = function (datos) {
    $scope.pruebas = $scope.nuevoAfiliadoForm.cohortes;
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'ObtenePListaClasificacion',
        vpcohorte: datos,
      }
    }).then(function (response) {
      console.log(response);
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.list_clasificacion = response.data;
      } else {
        swal({
          title: "¡Ocurrio un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.Obtene_P_Lista_Marca_Usuario = function () {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'ObtenePListaMarcaUsuario',
      }
    }).then(function (response) {
      console.log(response);
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.list_marca = response.data;
      } else {
        swal({
          title: "¡Ocurrio un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.Obtener_Consulta_Siniestro = function () {
    if ($scope.nuevoAfiliadoForm.tipoDocumento == '' || $scope.nuevoAfiliadoForm.tipoDocumento == null || $scope.nuevoAfiliadoForm.numDocumento == '' || $scope.nuevoAfiliadoForm.numDocumento == null) {
      swal({
        title: "Notificación",
        text: "No hay se visualizara informacion si no llena los campos requeridos (*)",
        type: "warning"
      }).catch(swal.noop);
    } else {
      $http({
        method: 'POST',
        url: "php/altocosto/seguimientoCAC.php",
        data: {
          function: 'consulta_siniestro',
          vptipodoc: $scope.nuevoAfiliadoForm.tipoDocumento,
          vpnumdoc: $scope.nuevoAfiliadoForm.numDocumento
        }
      }).then(function (response) {
        console.log(response);
        if (response.data && response.data.toString().substr(0, 3) != '<br') {
          $scope.MPFiltrar_Diag_3 = '';
          $scope.tablanuevoAfiliadoSiniestro = true;
          $scope.initPaginacionnuevoAfiliado(response.data);

        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: response.data,
            type: "warning"
          }).catch(swal.noop);
        }
      });

    }

  }
  $scope.estadosJSON = [];
  $scope.Obtener_listados = function () {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'consultar_listadocac'
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.listado = response.data;

      } else {
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }





    });
  }
  //$scope.Obtene_P_Lista_Cohortes();
  $scope.Obtener_listados();
  $scope.Obtener_Tipos_Documentos();
  $scope.estado = [
    {
      CODIGO: "AC",
      NOMBRE: "AC"
    },
    {
      CODIGO: "PL",
      NOMBRE: "PL"
    },
  ]
  //filtrado
  $scope.filtrado = function () {
    swal({
      title: 'Cargando',
      html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#fff',
      showCloseButton: false,
    });

    let enviado = [];
    if
      (($scope.Vista1.Tipo_Doc != "") && ($scope.Vista1.Num_Doc.length >= 5)) {
      enviado.push(
        {
          TIPO: "TIPODOC",
          VALOR: $scope.Vista1.Tipo_Doc
        },
        {
          TIPO: "DOCUMENTO",
          VALOR: $scope.Vista1.Num_Doc
        },
      )
    }
    if (($scope.Vista1.estado)) {
      enviado.push(
        {
          TIPO: "ESTADO",
          VALOR: $scope.Vista1.estado
        },
      )
    }
    if (($scope.Vista1.siniestro)) {
      enviado.push(
        {
          TIPO: "SINIESTRO",
          VALOR: $scope.Vista1.siniestro
        },
      )
    }
    console.log(enviado)

    //cosnumo el sp
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_SEGUIMIENTO_USUARIOS_FILTROS',
        P_V_JSON: JSON.stringify(enviado)
      }
    }).then(function (response) {
      swal.close();

      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.siniestros = response.data;
        $scope.initPaginacion($scope.siniestros);
      } else {
        swal({
          title: "¡Ocurrio un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });

  }

  $scope.mostrarAlert = function (hola) {
    alert(hola)
  }

  //
  $scope.excel = function () {
    // Display a loading message using SweetAlert
    swal({
      title: 'Cargando',
      html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#fff',
      showCloseButton: false,
    });

    let enviado = [];

    // Check if Tipo_Doc and Num_Doc have values and meet the length requirement
    if ($scope.Vista2.Tipo_Doc !== "" && $scope.Vista2.Num_Doc.length >= 5) {
      enviado.push({
        TIPO: "TIPODOC",
        VALOR: $scope.Vista2.Tipo_Doc
      }, {
        TIPO: "DOCUMENTO",
        VALOR: $scope.Vista2.Num_Doc
      });
    }




    // Check if siniestro has a value
    if ($scope.Vista2.siniestro) {
      enviado.push({
        TIPO: "SINIESTRO",
        VALOR: $scope.Vista2.siniestro
      });
    }

    console.log(enviado)



    // Send a POST request to the server to generate the Excel file
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'generateExcelFile',
        P_V_JSON: JSON.stringify(enviado)
      },
      responseType: 'arraybuffer'  // Set the response type to 'arraybuffer'
    }).then(function (response) {
      // Create a download link for the Excel file
      var link = document.createElement('a');
      var blob = new Blob([response.data], { 'type': 'application/octet-stream' });
      link.href = URL.createObjectURL(blob);
      link.download = 'gestion.xlsx';
      swal.close();

      link.target = '_blank';
      document.body.appendChild(link); // Append the link to the document body
      link.click();
      document.body.removeChild(link); // Remove the link from the document body after the download
    }).catch(function (error) {
      swal('Error', 'La respuesta no es válida', 'error');
    });

  }
  //filtrado
  $scope.filtrado2 = function () {

    swal({
      title: 'Cargando',
      html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#fff',
      showCloseButton: false,
    });

    let enviado = [];
    if
      (($scope.Vista2.Tipo_Doc != "") && ($scope.Vista2.Num_Doc.length >= 5)) {
      enviado.push(
        {
          TIPO: "TIPODOC",
          VALOR: $scope.Vista2.Tipo_Doc
        },
        {
          TIPO: "DOCUMENTO",
          VALOR: $scope.Vista2.Num_Doc
        },
      )
    }
    if (($scope.Vista2.estado)) {
      enviado.push(
        {
          TIPO: "ESTADO",
          VALOR: $scope.Vista2.estado
        },
      )
    }
    if (($scope.Vista2.siniestro)) {
      enviado.push(
        {
          TIPO: "SINIESTRO",
          VALOR: $scope.Vista2.siniestro
        },
      )
    }
    console.log(enviado)

    //cosnumo el sp
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_GESTION_USUARIOS_FILTROS',
        P_V_JSON: JSON.stringify(enviado)
      }
    }).then(function (response) {
      swal.close();

      if (response.data && response.data.toString().substr(0, 3) != '<br') {
        $scope.siniestrosGestion = response.data;
        $scope.initPaginacionGestgion($scope.siniestrosGestion);
      } else {
        swal({
          title: "¡Ocurrio un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });

  }
  $scope.iniciarFormulario = function () {
    $scope.Vista1 = {
      Tipo_Doc: "",
      Num_Doc: "",
      siniestro: "",
      estado: "",
    }
    $scope.siniestros = [];
    setTimeout(() => {
      $scope.$apply();
    }, 500);
    $scope.filtrado();
  }
  $scope.iniciarFormulario();

  $scope.iniciarFormularioVista2 = function () {
    $scope.Vista2 = {
      Tipo_Doc: "",
      Num_Doc: "",
      siniestro: "",
      estado: "",
    }
    $scope.siniestrosGestion = [];
    setTimeout(() => {
      $scope.$apply();
    }, 500);
    $scope.filtrado2();
  }
  $scope.iniciarFormularioVista2();
  Promise.all([
    afiliacionHttp.obtenerViaPrincipal(),
    afiliacionHttp.obtenerLetra(),
    afiliacionHttp.obtenerNumero(),
    afiliacionHttp.obtenerCuadrante(),
    afiliacionHttp.obtenerZona()
  ]).then(function (responses) {
    $scope.viaprincipal = responses[0];
    $scope.letras = responses[1];
    $scope.Numeros = responses[2];
    $scope.Cuadrantes = responses[3];
    $scope.Zonas = responses[4].Zona;
  });
  $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento, Barrio) {
    $scope.closeThisDialog($('#direcciond').val());
  }
  $scope.initPaginacion = function (info) {
    $scope.siniestros = info;
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.valmaxpag = 10;
    $scope.pages = [];
    $scope.configPages();
  }
  $scope.initPaginacionGestgion = function (info) {
    $scope.siniestrosGestion = info;
    $scope.currentPageG = 0;
    $scope.pageSizeG = 15;
    $scope.valmaxpagG = 10;
    $scope.pagesG = [];
    $scope.configPagesG();
  }
  $scope.initPaginacionnuevoAfiliado = function (info) {
    $scope.list_siniestro = info;
    $scope.currentPageN = 0;
    $scope.pageSizeN = 15;
    $scope.valmaxpagN = 10;
    $scope.pagesN = [];
    $scope.configPagesN();
  }
  $scope.filter = function (val) {
    if (val.target.value === "") {
      $scope.filtrado();
    } else {
      $scope.siniestros = $filter('filter')($scope.siniestros, val.target.value);
      if ($scope.siniestros > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }
  }
  $scope.configPages = function () {
    $scope.pages.length = 0;
    var ini = $scope.currentPage - 4;
    var fin = $scope.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.siniestros.length / $scope.pageSize) > $scope.valmaxpag)
        fin = 10;
      else
        fin = Math.ceil($scope.siniestros.length / $scope.pageSize);
    } else {
      if (ini >= Math.ceil($scope.siniestros.length / $scope.pageSize) - $scope.valmaxpag) {
        ini = Math.ceil($scope.siniestros.length / $scope.pageSize) - $scope.valmaxpag;
        fin = Math.ceil($scope.siniestros.length / $scope.pageSize);
      }
    }
    if (ini < 1) ini = 1;
    for (var i = ini; i <= fin; i++) {
      $scope.pages.push({
        no: i
      });
    }

    if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  }
  $scope.configPagesG = function () {
    $scope.pagesG.length = 0;
    var iniG = $scope.currentPageG - 4;
    var finG = $scope.currentPageG + 5;
    if (iniG < 1) {
      iniG = 1;
      if (Math.ceil($scope.siniestrosGestion.length / $scope.pageSizeG) > $scope.valmaxpagG)
        finG = 10;
      else
        finG = Math.ceil($scope.siniestrosGestion.length / $scope.pageSizeG);
    } else {
      if (iniG >= Math.ceil($scope.$scope.siniestrosGestion.length / $scope.pageSizeG) - $scope.valmaxpagG) {
        iniG = Math.ceil($scope.$scope.siniestrosGestion.length / $scope.pageSizeG) - $scope.valmaxpagG;
        finG = Math.ceil($scope.$scope.siniestrosGestion.length / $scope.pageSizeG);
      }
    }
    if (iniG < 1) iniG = 1;
    for (var iG = iniG; iG <= finG; iG++) {
      $scope.pagesG.push({
        no: iG
      });
    }

    if ($scope.currentPageG >= $scope.pagesG.length)
      $scope.currentPageG = $scope.pagesG.length - 1;
  }
  $scope.configPagesN = function () {
    $scope.pagesN.length = 0;
    var iniN = $scope.currentPageN - 4;
    var finN = $scope.currentPageN + 5;
    if (iniN < 1) {
      iniN = 1;
      if (Math.ceil($scope.list_siniestro.length / $scope.pageSizeN) > $scope.valmaxpagN)
        finN = 10;
      else
        finN = Math.ceil($scope.list_siniestro.length / $scope.pageSizeN);
    } else {
      if (iniN >= Math.ceil($scope.list_siniestro.length / $scope.pageSizeN) - $scope.valmaxpagN) {
        iniN = Math.ceil($scope.$scope.list_siniestro.length / $scope.pageSizeN) - $scope.valmaxpagN;
        finN = Math.ceil($scope.$scope.list_siniestro.length / $scope.pageSizeN);
      }
    }
    if (iniN < 1) iniN = 1;
    for (var iN = iniN; iN <= finN; iN++) {
      $scope.pagesN.push({
        no: iN
      });
    }

    if ($scope.currentPageN >= $scope.pagesN.length)
      $scope.currentPageN = $scope.pagesN.length - 1;
  }
  $scope.setPage = function (index) {
    $scope.currentPage = index - 1;
  }
  $scope.setPageG = function (index) {
    $scope.currentPageG = index - 1;
  }
  $scope.setPageN = function (index) {
    $scope.currentPageN = index - 1;
  }
  $scope.paso = function (tipo) {
    if (tipo == 'next') {
      var i = $scope.pages[0].no + 1;
      if ($scope.pages.length > 9) {
        var fin = $scope.pages[9].no + 1;
      } else {
        var fin = $scope.pages.length;
      }

      $scope.currentPage = $scope.currentPage + 1;
      if ($scope.siniestros.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.siniestros.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.siniestros.length / $scope.pageSize) + 1;
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
  }
  $scope.pasoG = function (tipoG) {
    if (tipoG == 'next') {
      var iG = $scope.pagesG[0].no + 1;
      if ($scope.pagesG.length > 9) {
        var finG = $scope.pagesG[9].no + 1;
      } else {
        var finG = $scope.pagesG.length;
      }

      $scope.currentPageG = $scope.currentPageG + 1;
      if ($scope.siniestrosGestion.length % $scope.pageSizeG == 0) {
        var tamanomaxG = parseInt($scope.siniestrosGestion.length / $scope.pageSizeG);
      } else {
        var tamanomaxG = parseInt($scope.siniestrosGestion.length / $scope.pageSizeG) + 1;
      }
      if (finG > tamanomaxG) {
        finG = tamanomaxG;
        iG = tamanomaxG - 9;
      }
    } else {
      var iG = $scope.pagesG[0].no - 1;
      if ($scope.pagesG.length > 9) {
        var finG = $scope.pagesG[9].no - 1;
      } else {
        var finG = $scope.pagesG.length;
      }

      $scope.currentPageG = $scope.currentPageG - 1;
      if (iG <= 1) {
        iG = 1;
        finG = $scope.pagesG.length;
      }
    }
    $scope.calcularG(iG, finG);
  }
  $scope.pasoN = function (tipoN) {
    if (tipoN == 'next') {
      var iN = $scope.pagesN[0].no + 1;
      if ($scope.pagesN.length > 9) {
        var finN = $scope.pagesN[9].no + 1;
      } else {
        var finN = $scope.pagesN.length;
      }
      $scope.currentPageN = $scope.currentPageN + 1;
      if ($scope.list_siniestro.length % $scope.pageSizeN == 0) {
        var tamanomaxN = parseInt($scope.list_siniestro.length / $scope.pageSizeN);
      } else {
        var tamanomaxN = parseInt($scope.list_siniestro.length / $scope.pageSizeN) + 1;
      }
      if (finN > tamanomaxN) {
        finN = tamanomaxN;
        iN = tamanomaxN - 9;
      }
    } else {
      var iN = $scope.pagesN[0].no - 1;
      if ($scope.pagesN.length > 9) {
        var finN = $scope.pagesN[9].no - 1;
      } else {
        var finN = $scope.pagesN.length;
      }

      $scope.currentPageN = $scope.currentPageN - 1;
      if (iN <= 1) {
        iN = 1;
        finN = $scope.pagesN.length;
      }
    }
    $scope.calcularN(iN, finN);
  }
  $scope.calcular = function (i, fin) {
    if (fin > 9) {
      i = fin - 9;
    } else {
      i = 1;
    }
    $scope.pages = [];
    for (i; i <= fin; i++) {
      $scope.pages.push({
        no: i
      });
    }
  }
  $scope.calcularG = function (iG, finG) {
    if (finG > 9) {
      iG = finG - 9;
    } else {
      iG = 1;
    }
    $scope.pagesG = [];
    for (iG; iG <= finG; iG++) {
      $scope.pagesG.push({

        no: iG
      });
    }
  }
  $scope.calcularN = function (iN, finN) {
    if (finN > 9) {
      iN = finN - 9;
    } else {
      iN = 1;
    }
    $scope.pagesN = [];
    for (iN; iN <= finN; iN++) {
      $scope.pagesN.push({

        no: iN
      });
    }
  }
  $scope.guardar = function () {
    if (!$scope.selectedEstado || $scope.selectedEstado.trim() === "") {
      swal({
        title: "¡Información!",
        html: "El campo <strong>estado de la llamada</strong> es obligatorio para el guardado del seguimiento",
        type: "warning"
      }).catch(swal.noop);
      return

    }
    if ($scope.selectedEstado != 5 && (!$scope.observacion || $scope.observacion.trim() === "")) {
      swal({
        title: "¡Información!",
        html: "El campo <strong>Observación</strong> es obligatorio para el guardado del seguimiento",
        type: "warning"
      }).catch(swal.noop);
      return

    }
    if ($scope.selectedEstado == 5 && (!$scope.selectedResponsable)) {
      swal({
        title: "¡Información!",
        html: "El campo <strong>Responsable de la llamada</strong> es obligatorio para el guardado del seguimiento",
        type: "warning"
      }).catch(swal.noop);
      return
    }

    // Obtener la fecha actual
    var fechaActual = new Date();
    // Sumar un día
    fechaActual.setDate(fechaActual.getDate() + 1);
    // Obtener el día, mes y año actualizado
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    var año = fechaActual.getFullYear();
    // Formatear la fecha en el formato deseado (dd/mm/aaaa)
    var fechaMañana = dia + '/' + mes + '/' + año;



    let jsonData = [
      {
        "Id": Number($scope.formSeguimiento.NumeroSiniestro),
        "Fechareprogramacion": fechaMañana,
        "Tipodocumento": $scope.formSeguimiento.TipoDocumento,
        "Numerodocumento": $scope.formSeguimiento.NumDocumento,
        "Barrio": "",
        "Modificado": $scope.Modificado == true ? 'S' : 'N',
        "Direccion": $scope.formSeguimiento.Direccion,
        "Telefono": $scope.formSeguimiento.Telefono,
        "Correo": $scope.formSeguimiento.Correo,
        "Pluripatologico": $scope.formSeguimiento.Pluripatologico,
        "Estadollamada": $scope.selectedEstado,
        "Observacion": $scope.observacion,
        "Responsablellamada": $scope.selectedResponsable,
        "UsuarioSesion": sessionStorage.getItem("usuario"),
      }
    ];

    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_POST_GESTION_USUARIOS',
        p_v_json: JSON.stringify(jsonData)
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) !== '<br') {
        swal({
          title: "Éxito",
          text: "Los datos se guardaron correctamente",
          type: "success"
        }).catch(swal.noop);
        if ($scope.selectedEstado == 5) {
          $scope.obtener_preguntas($scope.formSeguimiento.IdSeguimiento);
          $scope.busqueda($scope.formSeguimiento.Cohorte);
          $scope.idGestion = $scope.formSeguimiento.IdSeguimiento
          $scope.Siniestro = $scope.formSeguimiento.NumeroSiniestro
          $scope.ClaseRequerido = 'requerido'
        } else {
          $scope.mostrarVista('tablaSeguimiento')
        }
      } else {
        // Ocurrió un error en la solicitud
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    }).catch(function (error) {
      // Ocurrió un error en la comunicación con el servidor
      swal({
        title: "¡Ocurrió un error!",
        text: "No se pudo realizar la solicitud al servidor",
        type: "error"
      }).catch(swal.noop);
    });

  };
  // -------------------------------------------
  // preguntas 1
  // -------------------------------------------
  $scope.obtener_preguntas = function (numero) {
    console.log(numero);
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_CONFIG_PREGUNTAS_DEV',
        P_NU_NUMERO: Number(numero)
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {


        console.log('response', response.data);
        $scope.preguntas = response.data[0].preguntas;
        $scope.dataPregunta = response.data[0];
        $scope.mostrarVista('preguntas')
        $scope.tipoPreguntaLado = "1"
      } else {
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  // $scope.ordenarPreguntas = function () {

  //   $scope.preguntas.sort(function (a, b) {
  //     return a.orden - b.orden;
  //   });
  // }
  // $scope.preguntas.forEach(function (pregunta, index) {
  //   pregunta.id = index + 1;
  // });
  // $scope.ordenarPreguntas();
  $scope.busqueda = function (concepto) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_LISTAR_IPS_ALTOCOSTO',
        V_PCONCEPTO: concepto
      }
    }).then(function (response) {
      if (response.data.length == 0) {
        $scope.ListarResultado = [];
      } else {
        $scope.ListarResultado = response.data;
      }
    });
  }

  $scope.busquedaIPS = function (concepto, index, bus) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_LISTAR_IPS',
        V_PCONCEPTO: concepto
      }
    }).then(function (response) {
      if (bus == "nit") {
        let data = response.data
        if (data.length > 0) {
          $scope.preguntas[index].nombreIPS = data[0].razon_social;
        }
      }

    });
  }

  //nuevo
  $scope.buscar_listado_select = function (nombre, index) {
    if (nombre.length >= 6) {
      $http({
        method: 'POST',
        url: "php/altocosto/seguimientoCAC.php",
        data: {
          function: 'P_LISTAR_IPS',
          V_PCONCEPTO: nombre
        }
      }).then(function (response) {
        if (response.data.length == 0) {
          $scope.ListarResultado = "";
        } else {
          if (response.data[0].codigo == 1) {
            $scope.json_prestador = [];
          } else {
            if (response.data.length == 1) {
              $scope.seleccion_opcion2(response.data[0].nit, response.data[0].razon_social, index);
            } else {
              $scope.json_prestador = response.data;
              console.log($scope.json_prestador);
            }
          }
        }
      });
    }
  }


  $scope.seleccion_opcion2 = function (codigo, razon_social, index) {
    console.log("a buscar loco");
    $scope.preguntas[index].nombreIPS = razon_social;
    $scope.preguntas[index].respuesta = codigo;
    $scope.json_prestador = [];
    setTimeout(() => {
      $scope.$apply();
    }, 1000);

  }

  // Buscardor ips 2
  $scope.buscar_listado_select_ips = function (nombre, index) {
    if (nombre.length >= 6) {
      $http({
        method: 'POST',
        url: "php/altocosto/seguimientoCAC.php",
        data: {
          function: 'P_LISTAR_IPS',
          V_PCONCEPTO: nombre
        }
      }).then(function (response) {
        if (response.data.length == 0) {
          $scope.json_prestador_ips = "";
        } else {
          if (response.data[0].codigo == 1) {
            $scope.json_prestador_ips = [];
          } else {
            if (response.data.length == 1) {
              $scope.seleccion_opcion2(response.data[0].nit, response.data[0].razon_social, index);
            } else {
              $scope.json_prestador_ips = response.data;
              console.log($scope.json_prestador_ips);
            }
          }
        }
      });
    }
  }


  $scope.seleccion_opcion2_ips = function (codigo, razon_social, index) {
    console.log("a buscar loco");
    $scope.preguntas[index].nombreIPS = razon_social;
    $scope.preguntas[index].respuesta = codigo;
    $scope.json_prestador_ips = [];
    setTimeout(() => {
      $scope.$apply();
    }, 1000);

  }


  $scope.mostrarPregunta = function (item) {
    //valida si tiene hijos
    console.log(item)
    if (item.tieneHijos == 'N') {
      return
    }

    let hijosTempo = [];
    let nietosTmp = [];
    // desaparece todos los hijos
    for (let i = 0; i < item.hijos.length; i++) {
      let tmp = JSON.parse(item.hijos[i].hijos)
      hijosTempo.push(tmp);
    }
    let TodosHijos = [].concat(...hijosTempo);
    do {
      for (const iterator of TodosHijos) {
        const condi = (element) => element.id == iterator;
        let i = $scope.preguntas.findIndex(condi);
        if (i != -1) {
          $scope.preguntas[i].aparecer = 'N'
          if ($scope.trazabilidad != 1) {
            $scope.preguntas[i].respuesta = ''
          }



          //busca nietos
          for (let j = 0; j < $scope.preguntas[i].hijos.length; j++) {
            let tmp = JSON.parse($scope.preguntas[i].hijos[j].hijos)
            nietosTmp.push(tmp);
          }
        }
      }
      TodosHijos = [].concat(...nietosTmp);
      nietosTmp = [];
    } while (TodosHijos.length != 0);


    //busca los nietos


    //respuesta elegida
    let respuesta = item.respuesta;
    if ((respuesta != undefined) && (respuesta != "")) {

      let hijosRes = [];
      // busca todos los hijos en la respuesta
      for (let i = 0; i < item.hijos.length; i++) {
        if (item.hijos[i].codigo == respuesta) {
          hijosRes = JSON.parse(item.hijos[i].hijos)
        }
      }

      //aparece los hijo en la respuesta
      for (const iterator of hijosRes) {
        const condi = (element) => element.id == iterator;
        let i = $scope.preguntas.findIndex(condi);
        if (i != -1) {
          $scope.preguntas[i].aparecer = 'S'
        }
      }
    }
  }

  $scope.guardarPreguntas = function () {
    if ($scope.validarRequerido()) {
      swal({
        title: "¡Información!",
        html: "Los campos señalados en rojo son requeridos",
        type: "warning"
      }).catch(swal.noop);
      return;
    }
    const jsonData = $scope.preguntas.map((value) => {
      return {
        Siniestro: $scope.Siniestro,
        IdGestion: Number($scope.formSeguimiento.IdGestion),
        IdSeguimiento: Number($scope.formSeguimiento.IdSeguimiento),
        IdPregunta: Number(value.id),
        IdTipoPregunta: Number(value.idTipoPregunta),
        Respuesta: value.input.typeInput === 'date' ? moment(value.respuesta).format("DD/MM/YYYY") || '' : value.respuesta || "",
        UsuarioSesion: sessionStorage.getItem("usuario")
      }
    });
    let funcion = $scope.tipoPreguntaLado == "1" ? 'P_ST_POST_RESPUESTA_PREGUNTA' : 'P_ST_POST_RESPUESTA_PREGUNTA_GESTION'

    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: funcion,
        P_V_JSON: JSON.stringify(jsonData)
      }
    }).then((response) => {
      if (response.data && response.data.toString().substr(0, 3) !== '<br') {
        if (response.data.codigo != 1) {
          swal({
            title: "Éxito",
            text: "Los datos se guardaron correctamente",
            type: "success"
          }).catch(swal.noop);
          let ir = $scope.tipoPreguntaLado == "1" ? 'tablaSeguimiento' : 'tablaGestion'

          $scope.mostrarVista(ir)
        } else {
          swal({
            title: "¡Ocurrió un error!",
            text: response.data.mensaje,
            type: "warning"
          }).catch(swal.noop);
          // $scope.mostrarVista('tablaSeguimiento')
        }

      } else {
        // Ocurrió un error en la solicitud
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    }).catch((error) => {
      // Ocurrió un error en la comunicación con el servidor
      swal({
        title: "¡Ocurrió un error!",
        text: "No se pudo realizar la solicitud al servidor",
        type: "error"
      }).catch(swal.noop);
    });
  }
  $scope.fechaActualFuncion = function () {
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
    let anio = fechaActual.getFullYear();

    // Agregar un cero inicial si el día o el mes es menor a 10
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }

    var fechaFormateada = anio + "-" + mes + "-" + dia;

    return fechaFormateada;
  }
  $scope.validacionDinamica = function (validation, type, input) {
    let res;
    if (input != "date") {
      return ""
    }
    if (validation != type) {
      switch (type) {
        case 'fechaMaxHoy':
          res = "2100-09-02";
          break;
        case 'fechaMinHoy':
          res = "1900-09-02";
          break;

        default:
          res = '';
          break;
      }
      return res
    }

    switch (validation) {
      case 'fechaMaxHoy':
        res = $scope.fechaActualFuncion();
        break;
      case 'fechaMinHoy':
        res = $scope.fechaActualFuncion();
        break;

      default:
        res = '';
        break;
    }
    return res
  }

  $scope.validarRequerido = function () {
    if ($scope.preguntas) {
      console.log($scope.preguntas)
    }
    let validar = false;

    for (let index = 0; index < $scope.preguntas.length; index++) {
      let respuesta = $scope.preguntas[index].respuesta;
      let aparecer = $scope.preguntas[index].aparecer;
      let requerido = $scope.preguntas[index].requerido;


      //validacion si es visible
      if (aparecer == 'S') {
        //si es requerido
        if (requerido == 'S') {
          // si tiene datos
          if (respuesta == '') {
            $scope.preguntas[index].ClaseRequerido = $scope.ClaseRequerido
            validar = true
          }
        }
      }
    }


    return validar;
  }
  // -------------------------------------------
  // preguntas 2
  // -------------------------------------------
  $scope.P_ST_INICIAR_GESTION = function (P_NU_NUMERO) {
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_INICIAR_GESTION',
        P_NU_NUMERO: P_NU_NUMERO
      }
    }).then(function (response) {
      if (response.data.length == 0) {
        $scope.info = [];
      } else {
        $scope.info = response.data;
      }
    });
  }
  $scope.obtener_preguntasGestion = function (numero, siniestro) {
    $scope.observaciones = [];
    $http({
      method: 'POST',
      url: "php/altocosto/seguimientoCAC.php",
      data: {
        function: 'P_ST_GET_CONFIG_PREGUNTAS_TIPOS_GESTION',
        P_NU_NUMERO: Number(numero),
      }
    }).then(function (response) {
      if (response.data && response.data.toString().substr(0, 3) != '<br') {

        console.log('response', response.data);
        $scope.preguntas = response.data[0].preguntas;
        $scope.dataPregunta = response.data[0];
        $scope.formSeguimiento = siniestro;
        $scope.mostrarVista('preguntas')
        $scope.tipoPreguntaLado = "2"
        $scope.idGestion = $scope.formSeguimiento.IdSeguimiento
        $scope.Siniestro = $scope.formSeguimiento.NumeroSiniestro
        $scope.ClaseRequerido = 'requerido'
        $scope.busqueda($scope.formSeguimiento.Cohorte);
        $scope.trazabilidad = 1;
        $scope.preguntas.forEach(element => {
          $scope.mostrarPregunta(element)
        });
        $scope.mostrarGestion = true;
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: 'P_AG_GET_HISTORICO_RESPUESTA_PREGUNTA_GESTION',
            P_I_ID_SEGUIMIENTO: Number($scope.idGestion),
            P_I_SINISTESTRO: Number($scope.Siniestro)
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.observaciones = response.data;
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: 'P_ST_MOSTRAR_GESTION',
            P_V_SINIESTRO: Number($scope.Siniestro),
            P_I_TIPO: $scope.dataPregunta.codigo
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.gestion = response.data;
          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      } else {
        swal({
          title: "¡Ocurrió un error!",
          text: response.data,
          type: "warning"
        }).catch(swal.noop);
      }
    });
  }
  $scope.FormatSoloNumero = function (NID) {
    const input = document.getElementById("" + NID + "");
    var valor = input.value;
    valor = valor.replace(/[^0-9]/g, "");
    input.value = valor;
  }
  $scope.mostrarVista('tablaSeguimiento')


  $scope.validaGestion = function (item) {
    $scope.mostrarGestion = item.respuesta == 'G' ? true : false;
  }
}])


.filter('inicio', function () {
  return function (input, start) {
      if (input != undefined && start != NaN) {
          start = +start;
          return input.slice(start);
      } else {
          return null;
      }
  }
});