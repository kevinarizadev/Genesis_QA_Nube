'use strict';
angular.module('GenesisApp').controller('reportefacturasdescargeController', ['$scope', '$http', '$timeout', '$filter', '$q', function ($scope, $http, $timeout, $filter, $q) {
  // Plantilla funcional
  console.clear();
  $(document).ready(function () {
    $('.tabs').tabs();
    if (document.querySelector("#pantalla").offsetWidth < 1200) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
    $scope.Pantalla = {
      Altura: 0,
      Anchura: document.querySelector("#pantalla").offsetWidth
    }
    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';

    $scope.SysDay = new Date();
    $scope.Vista = {
      Activa: 1
    };

    //TABLA
    $scope.Filtrar_Sol = 10;
    //
    $scope.Vista_1 = {
      Form: {
        Vista: 1,
        Doc: '',
        F_Inicio: $scope.SysDay,
        F_Fin: $scope.SysDay,
        Estado: '',
        NumeroDoc: '',
        funcionario: '',
        listadoFuncionarios: [],
        prestador: '',
        listadoPrestador: []
      },
      Tabla: {
        F_Inicio: '',
        F_Fin: '',
        Filtrar_Sol: '',
        Mostrar_Sol: 10,
        Listado: [],
        Resumen: [],
        Listado_Temp: [],
        currentPage: 0,
        pageSize: 10,
        valmaxpag: 10,
        pages: [],
      }

    };

    $scope.Vista_2 = {
      Form: {
        Vista: 1,
        Doc: '',
        concepto: '',
        listadoConcepto: [],

        F_Inicio: $scope.SysDay,
        F_Fin: $scope.SysDay,
        Estado: '',

        radicador: '',
        listadoRadicador: [],

        auditor: '',
        listadoAuditor: [],

        prestador: '',
        listadoPrestador: []
      },
      Tabla: {
        F_Inicio: '',
        F_Fin: '',
        Filtrar_Sol: '',
        Mostrar_Sol: 10,
        Listado: [],
        Resumen: [],
        Listado_Temp: [],
        currentPage: 0,
        pageSize: 10,
        valmaxpag: 10,
        pages: [],
      }
    };

    $scope.Vista_3 = {
      Form: {
        Vista: 1,
        F_Inicio: $scope.SysDay,
        F_Fin: $scope.SysDay,

        prestador: '',
        listadoPrestador: []
      },
      Tabla: {
        F_Inicio: '',
        F_Fin: '',
        Filtrar_Sol: '',
        Mostrar_Sol: 10,
        Listado: [],
        Resumen: [],
        Listado_Temp: [],
        currentPage: 0,
        pageSize: 10,
        valmaxpag: 10,
        pages: [],
      }
    };

    $scope.Rol_Cedula = sessionStorage.getItem('cedula');

  });

  $scope.Buscar_Funcionario = function (VISTA, CAMPO, LISTADO) {
    if (!$scope[VISTA].Form[CAMPO]) {
      swal("Error", 'Campo vacio', "info").catch(swal.noop); return
    }
    $scope[VISTA].Form[LISTADO] = []
    swal({ title: 'Cargando...', allowOutsideClick: false });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/reportefacturasdescarge.php",
      data: {
        function: 'Obt_Funcs',
        Coincidencia: $scope[VISTA].Form[CAMPO],
      }
    }).then(function ({ data }) {
      swal.close();
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
      }
      if (data.length == 1) {
        $scope[VISTA].Form[CAMPO] = `${data[0].DOCUMENTO} - ${data[0].NOMBRE}`; return
      }
      $scope[VISTA].Form[LISTADO] = data
    });
  }
  ///////////

  $scope.Buscar_Ips = function (VISTA) {
    if (!$scope[VISTA].Form.prestador) {
      swal("Error", 'Campo vacio', "info").catch(swal.noop); return
    }
    $scope[VISTA].Form.listadoPrestador = []
    swal({ title: 'Cargando...', allowOutsideClick: false });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/reportefacturasdescarge.php",
      data: {
        function: 'Obt_Ips',
        Coincidencia: $scope[VISTA].Form.prestador
      }
    }).then(function ({ data }) {
      swal.close();
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
      }
      if (data.length == 1) {
        $scope[VISTA].Form.prestador = `${data[0].CODIGO} - ${data[0].RAZON}`; return
      }
      $scope[VISTA].Form.listadoPrestador = data
      setTimeout(() => { $scope.$apply(); }, 500);
    });

  }

  ///////////
  $scope.Obtener_Concepto = function () {
    if (!$scope.Vista_2.Form.Doc) {
      return
    }
    $scope.Vista_2.Form.concepto = '';
    swal({ title: 'Cargando...', allowOutsideClick: false });
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/reportefacturasdescarge.php",
      data: {
        function: 'Obt_Conceptos',
        Doc: $scope.Vista_2.Form.Doc,
      }
    }).then(function ({ data }) {
      swal.close();
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'No se encontraron conceptos', "warning").catch(swal.noop); return
      }
      $scope.Vista_2.Form.listadoConcepto = data
      setTimeout(() => { $scope.$apply(); }, 500);
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $scope.Fun_Validador = function (Vista) {
    var defered = $q.defer();
    var promise = defered.promise;
    var Campos_Empty = false;
    var Vista_Empty = 0;

    if ($scope[Vista].Form.F_Inicio > $scope[Vista].Form.F_Fin) {
      Vista_Empty = 1;
      Campos_Empty = true;
      swal({
        title: 'Ocurrio un error',
        text: 'La fecha inicial no debe ser mayor a la final.',
        type: 'warning',
      }).catch(swal.noop);
    }
    defered.resolve(Campos_Empty);
    return promise;
  }

  $scope.Get_Data = function (Vista) {
    if (Vista == 'Vista_1') {

      $scope.Vista_1.Form.funcionario = $scope.Vista_1.Form.funcionario && $scope.Vista_1.Form.funcionario.includes('-') ? $scope.Vista_1.Form.funcionario : '';
      $scope.Vista_1.Form.prestador = $scope.Vista_1.Form.prestador && $scope.Vista_1.Form.prestador.includes('-') ? $scope.Vista_1.Form.prestador : '';

      var data = {
        function: 'Cargar_Reportes_EREF',
        Doc: $scope.Vista_1.Form.Doc,
        Fecha_Inicio: $scope.Vista_1.Tabla.F_Inicio,
        Fecha_Fin: $scope.Vista_1.Tabla.F_Fin,
        Ced: $scope.Vista_1.Form.funcionario.includes('-') ? $scope.Vista_1.Form.funcionario.split('-')[0].trim() : '',
        Estado: $scope.Vista_1.Form.Estado,
        Nit: $scope.Vista_1.Form.prestador.includes('-') ? $scope.Vista_1.Form.prestador.split('-')[0].trim() : '',
      }
      return data;
    }
    if (Vista == 'Vista_2') {
      $scope.Vista_2.Form.radicador = $scope.Vista_2.Form.radicador && $scope.Vista_2.Form.radicador.includes('-') ? $scope.Vista_2.Form.radicador : '';
      $scope.Vista_2.Form.auditor = $scope.Vista_2.Form.auditor && $scope.Vista_2.Form.auditor.includes('-') ? $scope.Vista_2.Form.auditor : '';
      $scope.Vista_2.Form.prestador = $scope.Vista_2.Form.prestador && $scope.Vista_2.Form.prestador.includes('-') ? $scope.Vista_2.Form.prestador : '';
      $scope.Vista_2.Form.concepto = $scope.Vista_2.Form.concepto && $scope.Vista_2.Form.concepto.includes('-') ? $scope.Vista_2.Form.concepto : '';

      var data = {
        function: 'Cargar_Reportes_EFCE',
        Doc: $scope.Vista_2.Form.Doc,
        Con: $scope.Vista_2.Form.concepto.includes('-') ? $scope.Vista_2.Form.concepto.split('-')[0].trim() : '',
        Fecha_Inicio: $scope.Vista_2.Tabla.F_Inicio,
        Fecha_Fin: $scope.Vista_2.Tabla.F_Fin,
        Rad: $scope.Vista_2.Form.radicador.includes('-') ? $scope.Vista_2.Form.radicador.split('-')[0].trim() : '',
        Ced: $scope.Vista_2.Form.auditor.includes('-') ? $scope.Vista_2.Form.auditor.split('-')[0].trim() : '',
        Estado: $scope.Vista_2.Form.Estado,
        Nit: $scope.Vista_2.Form.prestador.includes('-') ? $scope.Vista_2.Form.prestador.split('-')[0].trim() : '',
      }
      return data;
    }
    if (Vista == 'Vista_3') {
      $scope.Vista_3.Form.prestador = $scope.Vista_3.Form.prestador && $scope.Vista_3.Form.prestador.includes('-') ? $scope.Vista_3.Form.prestador : '';

      var data = {
        function: 'p_lista_glosas_ergp',
        v_pnit: $scope.Vista_3.Form.prestador.includes('-') ? $scope.Vista_3.Form.prestador.split('-')[0].trim() : '',
        v_pestado: $scope.Vista_3.Form.Estado,
        v_pfechaini: $scope.Vista_3.Tabla.F_Inicio,
        v_pfechafin: $scope.Vista_3.Tabla.F_Fin,
        v_pfactura: $scope.Vista_3.Form.factura,
        v_pvalormin: $scope.Vista_3.Form.vmin,
        v_pvalormax: $scope.Vista_3.Form.vmax,
      }
      return data;
    }
  }

  $scope.Btn_Consultar = function (Vista) {
    var Validar_Campos = [
      $scope.Fun_Validador(Vista)
    ];
    $q.all(Validar_Campos).then(function (resultado) {
      var Campos_Empty = resultado[0];
      console.log(Campos_Empty);
      if (Campos_Empty == false) {
        if (Vista == 'Vista_2') {
          $scope.Generar_Acta('Vista_2');
        } else {
          $scope[Vista].Tabla.Listado = [];
          $scope[Vista].Tabla.Filtrar_Sol = '';
          $scope.GetFecha('F_Inicio', Vista);
          $scope.GetFecha('F_Fin', Vista);
          $timeout(
            function () {
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/cuentasmedicas/reportefacturasdescarge.php",
                data: JSON.stringify($scope.Get_Data(Vista))
              }).then(function (response) {
                if (response.data) {
                  if (response.data == "") {
                    swal({
                      title: "¡No se encontraron registros!",
                      type: "info",
                    }).catch(swal.noop);
                  } else {
                    if (response.data[0].array != undefined) {
                      swal.close();
                      if (Vista == 'Vista_1') {
                        // console.log(Vista);
                        // console.log($scope[Vista]);
                        $scope[Vista].Form.Vista = 2;
                        $scope[Vista].Tabla.Listado = response.data[0].array;
                        $scope[Vista].Tabla.Resumen = response.data[1].resumen;
                        $scope.initPaginacion(Vista);
                      }
                      if (Vista == 'Vista_3') {
                        $scope[Vista].Form.Vista = 2;
                        $scope[Vista].Tabla.Listado = response.data[0].array;
                        $scope[Vista].Tabla.Resumen = response.data[1].resumen;
                        $scope.initPaginacion(Vista);
                      }
                    } else {
                      swal({
                        title: 'Ocurrio un error',
                        text: response.data,
                        type: 'warning',
                      }).catch(swal.noop);
                    }
                  }
                } else {
                  swal({
                    title: "¡No se encontraron facturas!",
                    text: response.data,
                    type: "warning"
                  }).catch(swal.noop);
                }
              })
            }, 1000
          );
        }
      }
    });
  }

  $scope.Generar_Acta = function (Vista) {
    if (Vista == 'Vista_1') {
      const funcionario = $scope.Vista_1.Form.funcionario.includes('-') ? $scope.Vista_1.Form.funcionario.split('-')[0].trim() : ''
      const prestador = $scope.Vista_1.Form.prestador.includes('-') ? $scope.Vista_1.Form.prestador.split('-')[0].trim() : ''
      var xFecha_Inicio = $scope.Vista_1.Tabla.F_Inicio;
      var xFecha_Fin = $scope.Vista_1.Tabla.F_Fin;
      window.open('views/Cuentasmedicas/formatos/formato_reportefacturasdescarge.php?reporte=EREF&fecha_i=' + xFecha_Inicio +
        '&fecha_f=' + xFecha_Fin + '&doc=' + $scope.Vista_1.Form.Doc + '&ced=' + funcionario + '&estado=' + $scope.Vista_1.Form.Estado + '&nit=' + prestador,
         '_blank', "width=900,height=1100");
    }
    if (Vista == 'Vista_2') {
      const radicador = $scope.Vista_2.Form.radicador.includes('-') ? $scope.Vista_2.Form.radicador.split('-')[0].trim() : ''
      const auditor = $scope.Vista_2.Form.auditor.includes('-') ? $scope.Vista_2.Form.auditor.split('-')[0].trim() : ''
      const prestador = $scope.Vista_2.Form.prestador.includes('-') ? $scope.Vista_2.Form.prestador.split('-')[0].trim() : ''
      const concepto = $scope.Vista_2.Form.concepto.includes('-') ? $scope.Vista_2.Form.concepto.split('-')[0].trim() : ''
      var xFecha_Inicio = $scope.Vista_2.Tabla.F_Inicio;
      var xFecha_Fin = $scope.Vista_2.Tabla.F_Fin;
      window.open('views/Cuentasmedicas/formatos/formato_reportefacturasdescarge.php?reporte=EFCE&fecha_i=' + xFecha_Inicio +
        '&fecha_f=' + xFecha_Fin + '&doc=' + $scope.Vista_2.Form.Doc + '&con=' + concepto + '&rad=' + radicador + '&ced=' +
        auditor + '&estado=' + $scope.Vista_2.Form.Estado + '&nit=' + prestador, '_blank', "width=900,height=1100");
    }
    if (Vista == 'Vista_3') {
      const prestador = $scope.Vista_3.Form.prestador.includes('-') ? $scope.Vista_3.Form.prestador.split('-')[0].trim() : ''
      var xFecha_Inicio = $scope.Vista_3.Tabla.F_Inicio;
      var xFecha_Fin = $scope.Vista_3.Tabla.F_Fin;
      $scope.Vista_3.Form.Estado = $scope.Vista_3.Form.Estado == undefined ? '' : $scope.Vista_3.Form.Estado
      $scope.Vista_3.Form.factura = $scope.Vista_3.Form.factura == undefined ? '' : $scope.Vista_3.Form.factura
      $scope.Vista_3.Form.vmin = $scope.Vista_3.Form.vmin == undefined ? '' : $scope.Vista_3.Form.vmin
      $scope.Vista_3.Form.vmax = $scope.Vista_3.Form.vmax == undefined ? '' : $scope.Vista_3.Form.vmax
      window.open('views/Cuentasmedicas/formatos/formato_reportefacturasdescarge.php?reporte=EGRP&fecha_i=' + xFecha_Inicio + '&v_pnit=' + prestador +
        '&v_pestado=' + $scope.Vista_3.Form.Estado + '&v_pfechaini=' + $scope.Vista_3.Tabla.F_Inicio + '&v_pfechafin=' + $scope.Vista_3.Tabla.F_Fin +
        '&v_pfactura=' + $scope.Vista_3.Form.factura + '&v_pvalormin=' + $scope.Vista_3.Form.vmin + '&v_pvalormax=' + $scope.Vista_3.Form.vmax, '_blank', "width=900,height=1100");
    }
  }

  $scope.Volver_Vistas = function (Vista) {
    if ($scope[Vista].Form.Vista == '2') {
      $scope[Vista].Form.Vista = 1;
    }
  }
  $scope.GetFecha = function (SCOPE, Vista) {
    console.log($scope[Vista].Form[SCOPE]);
    var ahora_ano = $scope[Vista].Form[SCOPE].getFullYear();
    var ahora_mes = ((($scope[Vista].Form[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[Vista].Form[SCOPE].getMonth() + 1) : ($scope[Vista].Form[SCOPE].getMonth() + 1));
    var ahora_dia = ((($scope[Vista].Form[SCOPE].getDate()) < 10) ? '0' + ($scope[Vista].Form[SCOPE].getDate()) : ($scope[Vista].Form[SCOPE].getDate()));
    $scope[Vista].Tabla[SCOPE] = ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
  }

  $scope.Ver_Obs = function (X) {
    swal({
      title: 'Observación',
      input: 'textarea',
      inputValue: X.OBSERVACION,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      showConfirmButton: false,
      customClass: 'swal-wide'
    }).then(function (result) {
      $(".confirm").attr('disabled', 'disabled');
    }).catch(swal.noop);
    document.querySelector('.swal2-textarea').setAttribute("readonly", true);
    document.querySelector('.swal2-textarea').style.height = '300px';
    document.querySelector('.swal2-textarea').style.width = '600px';
    document.querySelector('.swal2-textarea').parentElement.style.width = '';
  }


  /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
  $scope.initPaginacion = function (Vista) {
    $scope[Vista].Tabla.Listado_Temp = $scope[Vista].Tabla.Listado;
    $scope[Vista].Tabla.currentPage = 0;
    $scope[Vista].Tabla.pageSize = 10;
    $scope[Vista].Tabla.valmaxpag = 10;
    $scope[Vista].Tabla.pages = [];
    $scope.configPages(Vista);
  }
  $scope.initPaginacion2 = function (Vista) {
    $scope[Vista].Tabla.currentPage = 0;
    if ($scope[Vista].Tabla.Mostrar_Sol == 0) {
      $scope[Vista].Tabla.pageSize = $scope[Vista].Tabla.Listado_Temp.length;
      $scope[Vista].Tabla.valmaxpag = $scope[Vista].Tabla.Listado_Temp.length;
    } else {
      $scope[Vista].Tabla.pageSize = $scope[Vista].Tabla.Mostrar_Sol;
      $scope[Vista].Tabla.valmaxpag = $scope[Vista].Tabla.Mostrar_Sol;
    }
    $scope[Vista].Tabla.pages = [];
    $scope.configPages(Vista);
  }
  $scope.filter = function (Vista) {
    $scope[Vista].Tabla.Listado_Temp = $filter('filter')($scope[Vista].Tabla.Listado, $scope[Vista].Tabla.Filtrar_Sol);
  }
  $scope.configPages = function (Vista) {
    $scope[Vista].Tabla.pages.length = 0;
    var ini = $scope[Vista].Tabla.currentPage - 4;
    var fin = $scope[Vista].Tabla.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize) > $scope[Vista].Tabla.valmaxpag) {
        if (($scope[Vista].Tabla.pageSize * 10) < $scope[Vista].Tabla.Listado_Temp.length) {
          fin = 10;
        } else {
          fin = Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize);
        }
      }
      else { fin = Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize); }
    } else {
      if (ini >= Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize) - $scope[Vista].Tabla.valmaxpag) {
        ini = Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize) - $scope[Vista].Tabla.valmaxpag;
        fin = Math.ceil($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize);
      }
    }
    if (ini < 1) ini = 1;
    for (var i = ini; i <= fin; i++) {
      $scope[Vista].Tabla.pages.push({
        no: i
      });
    }
    if ($scope[Vista].Tabla.currentPage >= $scope[Vista].Tabla.pages.length)
      $scope[Vista].Tabla.currentPage = $scope[Vista].Tabla.pages.length - 1;
    if ($scope[Vista].Tabla.currentPage < 0) { $scope[Vista].Tabla.currentPage = 0; }
  }
  $scope.setPage = function (index, Vista) {
    $scope[Vista].Tabla.currentPage = index - 1;
    if ($scope[Vista].Tabla.pages.length % 2 == 0) {
      var resul = $scope[Vista].Tabla.pages.length / 2;
    } else {
      var resul = ($scope[Vista].Tabla.pages.length + 1) / 2;
    }
    var i = index - resul;
    if ($scope[Vista].Tabla.Listado_Temp.length % $scope[Vista].Tabla.pageSize == 0) {
      var tamanomax = parseInt($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize);
    } else {
      var tamanomax = parseInt($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize) + 1;
    }
    var fin = ($scope[Vista].Tabla.pages.length + i) - 1;
    if (fin > tamanomax) {
      fin = tamanomax;
      i = tamanomax - 9;
    }
    if (index > resul) {
      $scope.calcular(i, fin, Vista);
    }
  }
  $scope.paso = function (tipo, Vista) {
    if (tipo == 'next') {
      var i = $scope[Vista].Tabla.pages[0].no + 1;
      if ($scope[Vista].Tabla.pages.length > 9) {
        var fin = $scope[Vista].Tabla.pages[9].no + 1;
      } else {
        var fin = $scope[Vista].Tabla.pages.length;
      }

      $scope[Vista].Tabla.currentPage = $scope[Vista].Tabla.currentPage + 1;
      if ($scope[Vista].Tabla.Listado_Temp.length % $scope[Vista].Tabla.pageSize == 0) {
        var tamanomax = parseInt($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize);
      } else {
        var tamanomax = parseInt($scope[Vista].Tabla.Listado_Temp.length / $scope[Vista].Tabla.pageSize) + 1;
      }
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
    } else {
      var i = $scope[Vista].Tabla.pages[0].no - 1;
      if ($scope[Vista].Tabla.pages.length > 9) {
        var fin = $scope[Vista].Tabla.pages[9].no - 1;
      } else {
        var fin = $scope[Vista].Tabla.pages.length;
      }

      $scope[Vista].Tabla.currentPage = $scope[Vista].Tabla.currentPage - 1;
      if (i <= 1) {
        i = 1;
        fin = $scope[Vista].Tabla.pages.length;
      }
    }
    $scope.calcular(i, fin, Vista);
  }
  $scope.calcular = function (i, fin, Vista) {
    if (fin > 9) {
      i = fin - 9;
    } else {
      i = 1;
    }
    $scope.pages = [];
    for (i; i <= fin; i++) {
      $scope[Vista].Tabla.pages.push({
        no: i
      });
    }
  }

  $scope.SetTab = function (x) {
    $scope.Vista.Activa = x;
    setTimeout(() => {
      $scope.$apply();
    }, 500);
  }

  $scope.FormatPesoNumero = function (num) {
    if (num) {
      var regex2 = new RegExp("\\.");
      if (regex2.test(num)) {
        num = num.toString().replace('.', ',');
        num = num.split(',');
        num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
        if (num[1].length > 1 && num[1].length > 2) {
          num[1] = num[1].toString().substr(0, 2);
        }
        if (num[1].length == 1) {
          num[1] = num[1] + '0';
        }
        return num[0] + ',' + num[1];
      } else {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        return num + ',00';
      }
    } else {
      return "0"
    }
  }


}]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }
  }
});
