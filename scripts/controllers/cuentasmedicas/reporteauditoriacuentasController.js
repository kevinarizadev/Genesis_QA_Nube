'use strict';
angular.module('GenesisApp').controller('reporteauditoriacuentasController', ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
  // Plantilla funcional
  console.clear();
  $scope.Inicio = function () {
    console.log($(window).width());
    setTimeout(() => {
      document.querySelector("#content").style.backgroundColor = "white";
    }, 2000);
    $scope.Ajustar_Pantalla();
    $('.tabs').tabs();
    $scope.Tabs = 1;

    $scope.SysDay = new Date();

    $scope.Vista1 = {
      F_Inicio: null,
      F_Fin: null,
      F_Inicio: new Date(),
      F_Fin: new Date(),
      Tipo: 'FS',
      Mostrar_Sol: 10,
      Filtrar_Sol: '',
      listDatos: [],
      listDatosTemp: [],
      Sum_Total: 0,
    };

    $scope.Vista2 = {
      F_Inicio: null,
      F_Fin: null,
      F_Inicio: new Date(),
      F_Fin: new Date(),
      Tipo_F_P: '',
      funcionario: '',
      listadoFuncionarios: [],
      prestador: '',
      listadoPrestadores: [],
      Glosa: 'S',
      Mostrar_Sol: 10,
      Filtrar_Sol: '',
      listDatos: [],
      listDatosTemp: [],
      Sum_Total_Factura: 0,
      Sum_Total_Glosa: 0,
    };
    //TABLA
    //
    // $scope.Vista1.listDatosTemp = [];
    //

    $scope.Rol_Cedula = sessionStorage.getItem('cedula');
    // $scope.Rol_Cedula = '32853751';
    $scope.Vista1.F_Inicio = new Date();
    $scope.Vista1.F_Fin = new Date();


    $scope.Vista2.F_Inicio = new Date();
    $scope.Vista2.F_Fin = new Date();


    const admins = [
      { cedula: 1042454684 },//KA
      { cedula: 1047234385 },//RAUL.OÑORO
      { cedula: 72001276 },//AUGUSTO
      { cedula: 1140863199 },//JENIFER.TAMAYO
      { cedula: 1129577693 },//CARMEN.PABON
      { cedula: 52517948 },//AMALFI.VENERA
    ]
    $scope.esAdmin = admins.findIndex(e => e.cedula == $scope.Rol_Cedula)
    if ($scope.esAdmin != -1) {
      $scope.Tabs = 2;
    }

    // $scope.Vista2.prestador = '900196347 - EMPRESA SOCIAL DEL ESTADO HOSPITAL LA DIVINA MISERICORDIA'
  };

  $scope.buscarFacturas = function (VISTA) {
    $scope[VISTA].Sum_Total = 0;
    if (!$scope[VISTA].F_Inicio || !$scope[VISTA].F_Fin || ($scope[VISTA].F_Inicio > $scope[VISTA].F_Fin)) {
      swal('Mensaje', 'Diligenciar los campos correctamente', 'warning').catch(swal.noop); return
    }
    $scope[VISTA].listDatos = [];
    $scope[VISTA].Filtrar_Sol = '';
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
      url: "php/cuentasmedicas/reporteauditoriacuentas.php",
      data: {
        function: 'p_obtener_productividad',
        Cedula: $scope.Rol_Cedula,
        Tipo: $scope[VISTA].Tipo,
        Fecha_Inicio: $scope.GetFecha($scope[VISTA].F_Inicio),
        Fecha_Fin: $scope.GetFecha($scope[VISTA].F_Fin),
      }
    }).then(function ({ data }) {
      if (!data.length || data == '0') {
        swal("Mensaje", "¡No se encontraron facturas!", "info").catch(swal.noop); return;
      }
      if (data.length) {
        $scope[VISTA].listDatos = data;
        $scope.initPaginacion($scope[VISTA].listDatos, VISTA);
        data.forEach(e => {
          $scope[VISTA].Sum_Total += e.VALOR;
        });
        swal.close()
      }
    })

    // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
    // $scope.Vista.Activa=2;
  }


  $scope.Vista2_buscarFacturas = function (VISTA) {
    $scope.Vista2.Sum_Total_Factura = 0;
    $scope.Vista2.Sum_Total_Glosa = 0;
    $scope.Vista2.listDatos = [];
    $scope.Vista2.listDatosTemp = [];
    $scope.Vista2.Filtrar_Sol = '';
    $scope.Vista2.Mostrar_Sol = 10;

    $scope.Vista2.funcionario = $scope.Vista2.funcionario && $scope.Vista2.funcionario.includes('-') ? $scope.Vista2.funcionario : '';
    $scope.Vista2.prestador = $scope.Vista2.prestador && $scope.Vista2.prestador.includes('-') ? $scope.Vista2.prestador : '';

    if (!$scope.Vista2.F_Inicio || !$scope.Vista2.F_Fin || ($scope.Vista2.F_Inicio > $scope.Vista2.F_Fin)) {
      swal('Mensaje', 'Diligenciar los campos correctamente', 'warning').catch(swal.noop); return
    }
    if (!$scope.Vista2.funcionario.includes('-') && !$scope.Vista2.prestador.includes('-')) {
      swal('Mensaje', 'Diligenciar el funcionario o el prestador', 'warning').catch(swal.noop); return
    }
    $scope.Vista2.Tipo_F_P = 'F';
    if (!$scope.Vista2.funcionario.includes('-') && $scope.Vista2.prestador.includes('-')) {
      $scope.Vista2.Tipo_F_P = 'P';
    }
    if ($scope.Vista2.funcionario.includes('-') && $scope.Vista2.prestador.includes('-')) {
      $scope.Vista2.Tipo_F_P = 'T';
    }

    const datos = {
      finicio: $scope.GetFecha($scope.Vista2.F_Inicio),
      ffin: $scope.GetFecha($scope.Vista2.F_Fin),
      funcionario: $scope.Vista2.funcionario.includes('-') ? $scope.Vista2.funcionario.split('-')[0].trim() : '',
      prestador: $scope.Vista2.prestador.includes('-') ? $scope.Vista2.prestador.split('-')[0].trim() : '',
      glosa: $scope.Vista2.Glosa
    };


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
      url: "php/cuentasmedicas/reporteauditoriacuentas.php",
      data: {
        function: 'p_obtener_productividad_glosas',
        datos: JSON.stringify(datos)
      }
    }).then(function ({ data }) {
      if (!data.length || data == '0') {
        swal("Mensaje", "¡No se encontraron facturas!", "info").catch(swal.noop); return;
      }
      if (data.length) {
        $scope.Vista2.listDatos = data;
        $scope.initPaginacion($scope.Vista2.listDatos, VISTA);
        data.forEach(e => {
          $scope.Vista2.Sum_Total_Factura += parseFloat(e.FACTURA_VALOR);
          $scope.Vista2.Sum_Total_Glosa += parseFloat(e.GLOSA_VALOR);
        });
        swal.close()
      }
    })

    // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
    // $scope.Vista.Activa=2;
  }

  $scope.generarExcel = function () {
    var datos = []
    $scope.Vista2.listDatos.forEach(element => {
      datos.push({
        FACTURA: element.FACTURA,
        FACTURA_FECHA_RADICACION: element.FACTURA_FECHA_RADICACION,
        FACTURA_VALOR: element.FACTURA_VALOR,
        FACTURA_RESPONSABLE: element.FACTURA_RESPONSABLE,
        PRESTADOR: element.FACTURA_IPS,
        GLOSA_FECHA_RADICACION: element.GLOSA_FECHA_RADICACION,
        GLOSA_OPORTUNA: element.DIAS_DIF >= 0 ? 'SI':'NO',
        GLOSA_VALOR: element.GLOSA_VALOR,
        PORCENTAJE_GLOSADO: element.PORCENTAJE_GLOSADO
      })
    });
    var ws = XLSX.utils.json_to_sheet(datos);
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
    /* write workbook and force a download */
    XLSX.writeFile(wb, "Exportado Auditoria Facturas.xlsx");
    const text = `Registros encontrados ${datos.length}`
    swal('¡Mensaje!', text, 'success').catch(swal.noop);
  }

  $scope.buscarFuncionarios = function () {
    if (!$scope.Vista2.funcionario) {
      swal("Error", 'Campo vacio', "info").catch(swal.noop); return
    }
    $scope.Vista2.listadoFuncionarios = []
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/reporteauditoriacuentas.php",
      data: {
        function: "p_lista_funcionario",
        funcionario: $scope.Vista2.funcionario,
      }
    }).then(function ({ data }) {
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
      }
      if (data.length == 1) {
        $scope.Vista2.funcionario = `${data[0].DOCUMENTO} - ${data[0].NOMBRE_FUNCIONARIO}`;
        return
      }
      data.forEach(e => {
        $scope.Vista2.listadoFuncionarios.push({
          codigo: e.DOCUMENTO,
          nombre: e.NOMBRE_FUNCIONARIO
        })
      })
      setTimeout(() => { $scope.$apply(); }, 500);
    })
  }
  $scope.buscarPrestadores = function () {
    if (!$scope.Vista2.prestador) {
      swal("Error", 'Campo vacio', "info").catch(swal.noop); return
    }
    $scope.Vista2.listadoPrestadores = []
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/reporteauditoriacuentas.php",
      data: {
        function: "p_obtener_tercero",
        ips: $scope.Vista2.prestador,
      }
    }).then(function ({ data }) {
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'No se encontraron prestadores', "warning").catch(swal.noop); return
      }
      if (data.length == 1) {
        $scope.Vista2.prestador = `${data[0].DOCUMENTO} - ${data[0].NOMBRE}`;
        return
      }
      data.forEach(e => {
        $scope.Vista2.listadoPrestadores.push({
          codigo: e.DOCUMENTO,
          nombre: e.NOMBRE
        })
      })
      setTimeout(() => { $scope.$apply(); }, 500);
    })
  }


  $scope.GetFecha = function (date) {
    var ahora_ano = date.getFullYear();
    var ahora_mes = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var ahora_dia = (date.getUTCDate() < 10) ? '0' + date.getUTCDate() : (date.getUTCDate());
    return [ahora_dia, ahora_mes, ahora_ano].join('/');
  }

  /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
  $scope.initPaginacion = function (info, VISTA) {
    $scope[VISTA].listDatosTemp = info;
    $scope[VISTA].currentPage = 0;
    $scope[VISTA].pageSize = 10;
    $scope[VISTA].valmaxpag = 10;
    $scope[VISTA].pages = [];
    $scope.configPages(VISTA);
  }
  $scope.initPaginacion2 = function (valor, VISTA) {
    $scope[VISTA].currentPage = 0;
    if (valor == 0) {
      $scope[VISTA].pageSize = $scope[VISTA].listDatosTemp.length;
      $scope[VISTA].valmaxpag = $scope[VISTA].listDatosTemp.length;
    } else {
      $scope[VISTA].pageSize = valor;
      $scope[VISTA].valmaxpag = valor;
    }
    $scope[VISTA].pages = [];
    $scope.configPages(VISTA);
  }
  $scope.filter = function (val, VISTA) {
    $scope[VISTA].listDatosTemp = $filter('filter')($scope[VISTA].listDatos, val);
    if ($scope[VISTA].listDatosTemp.length > 0) {
      $scope.setPage(1, VISTA);
    }
    $scope.configPages(VISTA);
  }

  $scope.configPages = function (VISTA) {
    $scope[VISTA].pages.length = 0;
    var ini = $scope[VISTA].currentPage - 4;
    var fin = $scope[VISTA].currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize) > $scope[VISTA].valmaxpag) {
        if (($scope[VISTA].pageSize * 10) < $scope[VISTA].listDatosTemp.length) {
          fin = 10;
        } else {
          fin = Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize);
        }
      }
      else { fin = Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize); }
    } else {
      if (ini >= Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize) - $scope[VISTA].valmaxpag) {
        ini = Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize) - $scope[VISTA].valmaxpag;
        fin = Math.ceil($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize);
      }
    }
    if (ini < 1) ini = 1;
    for (var i = ini; i <= fin; i++) {
      $scope[VISTA].pages.push({
        no: i
      });
    }
    if ($scope[VISTA].currentPage >= $scope[VISTA].pages.length)
      $scope[VISTA].currentPage = $scope[VISTA].pages.length - 1;
    if ($scope[VISTA].currentPage < 0) { $scope[VISTA].currentPage = 0; }
  }
  $scope.setPage = function (index, VISTA) {
    $scope[VISTA].currentPage = index - 1;
    if ($scope[VISTA].pages.length % 2 == 0) {
      var resul = $scope[VISTA].pages.length / 2;
    } else {
      var resul = ($scope[VISTA].pages.length + 1) / 2;
    }
    var i = index - resul;
    if ($scope[VISTA].listDatosTemp.length % $scope[VISTA].pageSize == 0) {
      var tamanomax = parseInt($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize);
    } else {
      var tamanomax = parseInt($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize) + 1;
    }
    var fin = ($scope[VISTA].pages.length + i) - 1;
    if (fin > tamanomax) {
      fin = tamanomax;
      i = tamanomax - 9;
    }
    if (index > resul) {
      $scope.calcular(i, fin, VISTA);
    }
  }
  $scope.paso = function (tipo, VISTA) {
    if (tipo == 'next') {
      var i = $scope[VISTA].pages[0].no + 1;
      if ($scope[VISTA].pages.length > 9) {
        var fin = $scope[VISTA].pages[9].no + 1;
      } else {
        var fin = $scope[VISTA].pages.length;
      }

      $scope[VISTA].currentPage = $scope[VISTA].currentPage + 1;
      if ($scope[VISTA].listDatosTemp.length % $scope[VISTA].pageSize == 0) {
        var tamanomax = parseInt($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize);
      } else {
        var tamanomax = parseInt($scope[VISTA].listDatosTemp.length / $scope[VISTA].pageSize) + 1;
      }
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
    } else {
      var i = $scope[VISTA].pages[0].no - 1;
      if ($scope[VISTA].pages.length > 9) {
        var fin = $scope[VISTA].pages[9].no - 1;
      } else {
        var fin = $scope[VISTA].pages.length;
      }

      $scope[VISTA].currentPage = $scope[VISTA].currentPage - 1;
      if (i <= 1) {
        i = 1;
        fin = $scope[VISTA].pages.length;
      }
    }
    $scope.calcular(i, fin, VISTA);
  }
  $scope.calcular = function (i, fin, VISTA) {
    if (fin > 9) {
      i = fin - 9;
    } else {
      i = 1;
    }
    $scope[VISTA].pages = [];
    for (i; i <= fin; i++) {
      $scope[VISTA].pages.push({
        no: i
      });
    }
  }

  $scope.SetTab = function (x) {
    $scope.Tabs = x;
    setTimeout(() => { $scope.$apply(); }, 500);
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
