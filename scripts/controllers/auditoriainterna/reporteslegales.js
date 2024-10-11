'use strict';
angular.module('GenesisApp')
  .controller('reporteslegalesController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      
      $scope.Inicio = function () {
        // Iniciar Varibales
        $('.modal').modal();
        $scope.admin = false;
        $scope.v_search = false;
        $scope.Tabs = 1;
        $scope.nuevoReporte = false;
        $scope.diasReportes = false;
        $scope.visible1 = true;
        $scope.visible2 = false;
        $scope.visible3 = false;
        $scope.detalleReportes = false;
        $scope.estadosColores = true;
        $scope.editarReporte = false;
        $scope.idCargoReporta = "";
        $scope.idCargoElabora = "";
        $scope.idCargoRevisa = "";
        $scope.Observacion = "";
        $scope.Pag = 10;
        $scope.visibility = false;
        $scope.opcion = 'col s3';
        $scope.filesArray = [ {name: ""}, {name: ""}]
        $scope.SysDay = new Date();
    
        $scope.reporte = {
          numero: "",
          codigo_reporte: "",
          hora: "",
          dias_notifica: "",
          frecuencia: "",
          objetivo: "",
          entes: "",
          tipo_norma: "",
          anno_norma: "",
          norma: "",
          link_norma: "",
          link_anexo: "",
          elabora: "",
          revisa: "",
          reporta: "",
          link_cargue: "",
          fecha_cargue: "",
          contenido_r: "",
          fecha_vigenciaNorma: "",
          estado_Norma: "",
          FechaLimite: "",
          FechaVencimiento: "",
          v_pdias_habiles: 0
        };
        $scope.limpiarAgendarReporte();
      }

      $scope.formulario = {alerta: null, limiteEntrega: null}
      
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      }

      // Identificar si es admin con el rolcod
      var dat = { prov: 'navb' };
      $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.codigoROL = $scope.sesdata.rolcod;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.codigo_cargo = sessionStorage.getItem("codigo_cargo");
          $scope.admin = true;


        // if ($scope.cedula == 1001821339 || $scope.cedula == 1045669272 || $scope.cedula == 3731037 || $scope.cedula == 1042454684) {
        //   $scope.admin = true;
        // } else {
        //   $scope.admin = false;
        //   setTimeout(() => {
        //     $scope.abrirModalActualizacion();
        //   }, 1000)
        // }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error obteniendo variables en la colmena");
      }); 

      $scope.ObtenerRol = function (){
        let cedula = sessionStorage.getItem("cedula")
        $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
                function: 'p_obtener_rol',
                cedula: cedula
               }
        }).then( function({data}){
          if (data.Codigo == 1) {
            $scope.Administrador = false;
          } else {          
            $scope.Administrador = true;
          }
        }) 
      }

      $scope.ObtenerRol()

      $scope.limpiarAgendarReporte = function(){      
          $scope.reporte.codigo_reporte = "";
          $scope.reporte.hora = "";
          $scope.reporte.dias_notifica = "";
          $scope.reporte.frecuencia = "";
          $scope.reporte.objetivo = "";
          $scope.reporte.entes = "";
          $scope.reporte.tipo_norma = "";
          $scope.reporte.anno_norma = "";
          $scope.reporte.numero = "";
          $scope.formulario = {alerta: null, limiteEntrega: null}
          $scope.reporte.link_norma = "";
          $scope.reporte.link_anexo = "";
          $scope.reporte.elabora = "";
          $scope.reporte.revisa = "";
          $scope.reporte.reporta = "";
          $scope.reporte.link_cargue = "";
          $scope.reporte.fecha_cargue = "";
          $scope.reporte.Contenido_r = ""; // Agregar Nuevo
          $scope.reporte.fecha_vigenciaNorma = ""; // Agregar Nuevo
          $scope.reporte.FechaVencimiento = ""; // Agregar Nuevo
          $scope.reporte.Fv_pdias_habiles = "";
          $scope.fuente = "";
          $scope.editar = {
            numero: "",
            codigo_reporte: "",
            FechaVencimiento: "",    
            hora: "",
            alerta: "",
            Contenido_r: "",
            frecuencia: "",
            objetivo: "",
            entes: "",
            tipo_norma: "",
            anno_norma: "",
            elabora: "",
            revisa: "",
            reporta: "",
            fecha_limite: "",
            link_cargue: "",
            fecha_cargue: "",
            v_pdias_habiles: 0
          };
  
        };

      $scope.formatarFechaVisual = function(date){
        console.log(date);

        let aux = date.split("/"),
            dia = aux[0],
            mes = aux[1] - 1,
            año = aux[2];
            console.log(aux);
            console.log(año, dia, mes);
            return new Date(año, mes, dia);
      }

      $scope.abrirModalEditar = function(datos) {
          let numeroReporte = datos.numero;
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'verReporte',
              numero: JSON.stringify(numeroReporte),
              anno: '',
            }
          }).then(function (response) {
            // if (!response.data) {
              // swal('Mensaje', response.data.Nombre, 'warning');
            // }else{
              let fechaLimite = response.data[0].limite_entrega.slice(0, 10);
              let arrayFecha = fechaLimite.split("-");
              $scope.reporte.tipo_norma = response.data[0].tipo_norma;
              $scope.reporte.anno_norma = response.data[0].anno_norma;
              $scope.reporte.numero = response.data[0].numero;

              $scope.idCargoReporta = response.data[0].documento_reporta;
              $scope.idCargoElabora = response.data[0].documento_elabora;
              $scope.idCargoRevisa = response.data[0].documento_revisa;

           
              $scope.editar = {
                numero: response.data[0].numero,
                codigo_reporte: response.data[0].nombre_reporte,
                FechaVencimiento: $scope.formatarFechaVisual(response.data[0].fecha_reporte),       
                hora: response.data[0].hora,
                alerta: $scope.formatarFechaVisual(response.data[0].fecha_alerta),
                Contenido_r: response.data[0].contenido,
                frecuencia: response.data[0].frecuencia,
                objetivo: response.data[0].objetivo,
                entes: response.data[0].nombre_ente,
                elabora: response.data[0].nombre_elabora,
                revisa: response.data[0].nombre_revisa,
                reporta: response.data[0].nombre_reporta,
                fecha_limite: new Date(arrayFecha[0], (arrayFecha[1] - 1), arrayFecha[2]),
                cedula_elabora: response.data[0].documento_elabora,
                cedula_reporta: response.data[0].documento_reporta,
                documento_revisa: response.data[0].documento_revisa
              };
              $("#modalEditarReporte").modal("open");
          });
      }
  
      $scope.seleccionarTab = function(dia, mes, accion, tab_numer, details) {
        if (tab_numer == 1 && accion == 'Tab') {
          $scope.limpiarAgendarReporte()
          $scope.Tabs = tab_numer;
          $scope.visible1 = true;
          $scope.visible2 = false;
          $scope.diasReportes = false;
          $scope.nuevoReporte = false;
          $scope.detalleReportes = false;
          $scope.estadosColores = true;
          $scope.visible3 = false;
          $scope.verReporte = false;


        }else if(tab_numer == 3 && accion == 'Tab'){
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.diasReportes = false;
          $scope.nuevoReporte = false;
          $scope.detalleReportes = false;
          $scope.estadosColores = false;
          $scope.visible3 = true;
          $scope.Tabs = tab_numer;
          $scope.verReporte = false;



        } else if (tab_numer == 2 && accion == 'Tab') {

          $scope.limpiarAgendarReporte();
          $scope.Tabs = tab_numer;
          $scope.visible1 = false;
          $scope.visible2 = true;
          $scope.diasReportes = false;
          $scope.nuevoReporte = false;
          $scope.detalleReportes = false;
          $scope.estadosColores = false;
          $scope.visible3 = false;
          $scope.verReporte = false;

          $scope.gestionarReportes();

        }else if(tab_numer == 2 && accion == 'Cargue'){
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.visible3 = false;
          $scope.verReporte = false;


        } else if (tab_numer == 1 && accion == 'DiaCalendario' && details.length == 0 && $scope.Administrador == true) {
          $scope.limpiarAgendarReporte();
          $scope.nuevoReporte = true;
          $scope.diasReportes = false;
          $scope.tituloCrearReporte = 'Nuevo Reporte';
          $scope.reporte.FechaVencimiento = new Date(mes.year, ("0" + (mes.num - 1)).slice(-2), dia.num);
          $scope.Tabs = tab_numer;
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.detalleReportes = false;
          $scope.visible3 = false;
          $scope.verReporte = false;
          $scope.formulario.limiteEntrega = new Date(mes.year, ("0" + (mes.num - 1)).slice(-2), dia.num);

        } else if(tab_numer == 1 && accion == 'DiaCalendario' && details == 10){
          $scope.limpiarAgendarReporte()
          $scope.nuevoReporte = true;
          $scope.diasReportes = false;
          $scope.tituloCrearReporte = `Nuevo Reporte: ${dia} de ${mes} del ${$scope.year}`;
          $scope.reporte.FechaVencimiento = new Date($scope.yearSelect, ("0" + ($scope.monthNumSelect - 1)).slice(-2), $scope.daySelect);
          $scope.Tabs = tab_numer;
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.detalleReportes = false;
          $scope.visible3 = false;
          $scope.verReporte = false;
  

        } else if (tab_numer == 1 && accion == 'MenuPrincipal') {
          $scope.limpiarAgendarReporte()
          $scope.visible1 = true;
          $scope.Tabs = tab_numer;
          $scope.estadosColores = true;
          $scope.diasReportes = false;
          $scope.nuevoReporte = false;
          $scope.detalleReportes = false;
          $scope.visible3 = false;
          $scope.verReporte = false;
          
        } else if (tab_numer == 1 && accion == 'DiaCalendario' && details.length >= 1) {
          $scope.diasReportes = true;
          $scope.daySelect = ("0" + (dia.num)).slice(-2);
          $scope.estadosColores = false;
          $scope.monthNumSelect = mes.num;
          $scope.mesNombre = mes.name;
          $scope.yearSelect = mes.year;
          $scope.obtenerListasReporteFecha();
          $scope.limpiarAgendarReporte()
          $scope.Tabs = tab_numer;
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.detalleReportes = false;
          $scope.visible3 = false;
          $scope.verReporte = false;


        }else if(tab_numer == 2 && accion == 'visualizar'){
          $scope.visible1 = false;
          $scope.visible2 = false;
          $scope.detalleReportes = false;
          $scope.diasReportes = false;
          $scope.verReporte = true;
          $scope.nuevoReporte = false;
          $scope.estadosColores = false;
          $scope.visible3 = false;

        }

      }

      $scope.abrirModalActualizacion = function () {
        $("#modalActualizacion").modal("open");
      }

      $scope.closeModal = function () {
        $(".modal").modal("close")
      }

      $scope.obtenerListasReporteFecha = function () {
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'obtenerListaFecha', fecha: $scope.daySelect + "/" + $scope.monthNumSelect + "/" + $scope.yearSelect
          }
        }).then(function (response) {
          $scope.detalleFecha = response.data;
          swal.close();
        })
      }


      $scope.obtenerListaCargos = function () {
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'obtenerListaCargos'
          }
        }).then(function (response) {
          $scope.cargos = response.data;
        })
      }
      $scope.obtenerListaCargos();

      
      $scope.obtenerEntes = function () {
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'obtenerEntes'
          }
        }).then(function (response) {
          $scope.entes = response.data;
        })
      }
      $scope.obtenerEntes();


      $scope.buscarDatosCargos = function (lista) {
        if (lista) {
          $scope.cargosEncontrados = [];
          for (const re of $scope.cargos) {
            let nombres = re.nombre,
              listas = lista.toUpperCase();
            if (nombres.includes(listas)) {
              $scope.cargosEncontrados.push({ id: re.codigo, nombre: re.nombre })
            }
          }
        }
      }


      $scope.codigoCargo = function(cargo, campo){
        if (cargo) {
          cargo.toUpperCase();
          $scope.cargos.forEach(element => {
            cargo.toUpperCase();
              if (element.nombre.trim() == cargo && campo == 'R') {
                $scope.idCargoReporta = element.documento; 
               
              }if (element.nombre.trim() == cargo && campo == 'E') {
                $scope.idCargoElabora = element.documento;                
  
              }if (element.nombre.trim() == cargo && campo == 'V') {
                $scope.idCargoRevisa = element.documento;         
              }
  
          })
        }
      }

      $scope.obtenerListaReporte = function () {
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'obtenerListaReporte'
          }
        }).then(function (response) {
          $scope.codigo_reporte = response.data;
        })
      }
      $scope.obtenerListaReporte();

      $scope.buscarNormas = function (lista) {
        if (lista) {
            $scope.reportesEncontrados = [];
            let i = 0;
            for (const re of $scope.codigo_reporte) {
              i++;
              let nombres = re.NOMBRE,
                listas = lista.toUpperCase();
              if (nombres.includes(listas)) {
                $scope.reportesEncontrados.push({ id: i, Nombre: re.NOMBRE, Anno: re.ANNO, Tipo: re.NORMA, NumNorma: re.NUMERO_NORMA })
              }
            }
        }
        // console.log($scope.reportesEncontrados);
      }

      $scope.seleccionarNorma = function (norma) {
        if (norma) {
            norma.toUpperCase()
          let busqueda = $scope.codigo_reporte.find((element) => element.NOMBRE == norma)
          if(busqueda){
            if (busqueda.NOMBRE == norma) {
                $scope.reporte.anno_norma = busqueda.AÑO_NORMA;
                $scope.reporte.tipo_norma = busqueda.NORMA;
                $scope.reporte.numero = busqueda.NUMERO_NORMA;
                $scope.idReporte = busqueda.CODIGO;
  
              }
          }else {
                $scope.reporte.anno_norma = "";
                $scope.reporte.tipo_norma = "";
                $scope.reporte.numero = "";
                $scope.idReporte = "";
              }          
        }
      }


      $scope.estadoReporteColor = function (estado) {
        if (estado) {
          if (estado == 'red') {
            return { "background-color": "rgb(255,0,0) !important;" }
          }
          if (estado == 'orange') {
            return { "background-color": "rgb(255,152,0)!important" }
          }
          if (estado == 'yellow') {
            return { "background-color": "rgb(255,255,0)!important" }
          }
          if (estado == 'green') {
            return { "background-color": "rgb(80, 221, 34)!important" }
          }
          if (estado == 'blue') {
            return { "background-color": "rgb(112,177,255)!important" }
          }
        }
      }


      $scope.estadoReporteColor_Clase = function (estado) {
        // estado con menos de 4 horas
        if (!estado) return;
        if (estado == 'red') {
          return "Con_pulse_X"
        }
        // estado con menos de 4 horas
        if (estado == 'orange') {
          return "Con_pulse_V"
        }

        if (estado == 'green') {
          return "Con_pulse_H"
        }

        if (estado == 'yellow') {
          return "Con_pulse_Y"
        }
        if (estado == 'blue') {
          return "Con_pulse_B"
        }
      }

      $scope.estadoReporteNombre = function (estado) {
        if (estado) {
          if (estado == 'red') {
            return 'VENCIDO'
          }
          if (estado == 'orange') {
            return 'INOPORTUNO'
          }
          if (estado == 'yellow') {
            return 'PROXIMO'
          }
          if (estado == 'green') {
            return 'OPORTUNO'
          }
        }
      }

      $scope.colorNormas = function (estado) {
        if (estado) {
          return { "color": "rgb(83, 81, 81) !important;" }
        }
      }

      $scope.validateFormNuevo = function(){
        return new Promise((resolve) => {
          if (!$scope.reporte.codigo_reporte) resolve(false);
          if (!$scope.reporte.Contenido_r) resolve(false);
          if (!$scope.reporte.hora) resolve(false);
          if (!$scope.reporte.frecuencia) resolve(false);
          if (!$scope.reporte.FechaVencimiento) resolve(false);
          // if (!$scope.formulario.limiteEntrega) resolve(false);
            // if (!$scope.formulario.alerta) resolve(false);
          if (!$scope.reporte.objetivo) resolve(false);
          if (!$scope.reporte.entes) resolve(false);
          if (!$scope.reporte.elabora) resolve(false);
          if (!$scope.reporte.revisa) resolve(false);
          if (!$scope.reporte.reporta) resolve(false);
          if (!$scope.reporte.v_pdias_habiles && $scope.reporte.frecuencia == 5) resolve(false);
          resolve(true)
        });
      }

      $scope.validateFormEditar = function(){
        return new Promise((resolve) => {
          if (!$scope.editar.codigo_reporte) resolve(false);
          if (!$scope.editar.Contenido_r) resolve(false);
          if (!$scope.editar.hora) resolve(false);
          if (!$scope.editar.frecuencia) resolve(false);
          if (!$scope.editar.FechaVencimiento) resolve(false);
          // if (!$scope.editar.fecha_limite) resolve(false);
          // if (!$scope.editar.alerta) resolve(false);
          if (!$scope.editar.objetivo) resolve(false);
          if (!$scope.editar.entes) resolve(false);
          if (!$scope.editar.elabora) resolve(false);
          if (!$scope.editar.revisa) resolve(false);
          if (!$scope.editar.reporta) resolve(false);
          resolve(true)
        });
      }
    
      $scope.guardarReporte = function () {
        $scope.validateFormNuevo().then((result) =>{
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              })
                $scope.reporte = {
                  numero: "0",
                  codigo_reporte: $scope.idReporte,
                  fecha_reporte: $scope.formatDatefecha($scope.reporte.FechaVencimiento),
                  hora: $scope.reporte.hora,
                  alerta: '',
                  // alerta: $scope.formatDatefecha($scope.formulario.alerta),
                  fecha_limite: '',
                  // fecha_limite: $scope.formatDatefecha($scope.formulario.limiteEntrega),
                  frecuencia: $scope.reporte.frecuencia,
                  objetivo: $scope.reporte.objetivo,
                  entes: $scope.reporte.entes,
                  elabora: $scope.idCargoElabora,
                  revisa: $scope.idCargoRevisa,
                  reporta: $scope.idCargoReporta,
                  Contenido_r: $scope.reporte.Contenido_r,
                  accion: "I",
                  link_cargue: "",
                  fecha_cargue: "",
                  estadop: "A",
                  v_pestado_cargue: "",
                  fuente: "",
                  v_pdias_habiles: $scope.reporte.v_pdias_habiles,
                  v_pobservacion_gestion: "",
                };
                $http({
                  method: 'POST',
                  url: "php/auditoriainterna/reporteslegales.php",
                  data: {
                    function: 'insertarReporte',
                    json: JSON.stringify($scope.reporte)
                  }
                }).then(function (response) {
                  if (response.data.Codigo == 0) {
                    $scope.limpiarAgendarReporte();
                    swal('Reporte Creado', response.data.Nombre, 'success');
      
                    setTimeout(()=>{
                      $scope.seleccionarTab('','','Tab',1);
                      $scope.calendario($scope.year);
                      $scope.programacion($scope.year);
                    },900)
      
                  } else {
                    swal('Mensaje', response.data.Nombre, 'warning');
                  };
                  setTimeout(() => {
                    swal.close();
                  }, 2000);
                });
            }
        })                    
        // else {
        //   swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        // }
      }
      $scope.habilitarDias = false;
      $scope.habilitarInput = function(row){
        if (row == 5) {
          $scope.habilitarDias = true;
          $scope.opcion = "col s2";
          document.querySelector("#diasFrecuencia").setAttribute("required", true);
        }else{
          $scope.habilitarDias = false;
          $scope.opcion = "col s3";
          document.querySelector("#diasFrecuencia").removeAttribute("required")
        }
    }

    $scope.maximodeDias = function(dato){
        if (dato) {
          if (dato.length > 2) {
            $scope.reporte.v_pdias_habiles = dato.slice(0,2)
          }else if(dato > 21){
            $scope.reporte.v_pdias_habiles = dato.slice(0,1)
          }
        }
    }

      $scope.updateReporte = function () {
        $scope.validateFormEditar().then((result)=>{
          if (result) {
            $scope.seleccionarNorma($scope.editar.codigo_reporte)
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              let jsonEditar = {
                numero: $scope.editar.numero,
                codigo_reporte: $scope.idReporte,
                fecha_reporte: $scope.formatDatefecha($scope.editar.FechaVencimiento),       
                hora: $scope.editar.hora,
                alerta: $scope.formatDatefecha($scope.editar.alerta),
                Contenido_r: $scope.editar.Contenido_r,
                frecuencia: $scope.editar.frecuencia,
                objetivo: $scope.editar.objetivo,
                entes: $scope.editar.entes,
                tipo_norma: $scope.editar.tipo_norma,
                anno_norma: $scope.editar.anno_norma,
                elabora: $scope.idCargoElabora,
                revisa: $scope.idCargoRevisa,
                reporta: $scope.idCargoReporta,
                fecha_limite: $scope.formatDatefecha($scope.editar.fecha_limite),
                link_cargue: "",
                fecha_cargue: "",
                accion: 'U',
                estadop: "A",
                v_pestado_cargue: "",
                fuente: "",
                v_pdias_habiles: 0,
                v_pobservacion_gestion: "",
              };      
                $http({
                  method: 'POST',
                  url: "php/auditoriainterna/reporteslegales.php",
                  data: {
                    function: 'insertarReporte',
                    json: JSON.stringify(jsonEditar),
                  }
                }).then(function (response) {
                  $scope.closeModal();
                  if (response.data.Codigo == 0) {
                    swal(`Reporte ${$scope.editar.numero}`, response.data.Nombre, 'success');
                    $scope.limpiarAgendarReporte();
                  } else {
                    swal(`Reporte ${$scope.editar.numero}`, response.data.Nombre, 'warning');
                  };
                  setTimeout(() => {
                    swal.close();
                  }, 2000);
                });                        
              }
        }) 
      }

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.ObtenerEstadoColor = function (tipo = null) {
        tipo == 'No Aprobado' ? tipo = 'NoAprobado' : tipo;
        const tipos = {
          Aprobado: "etiquetaVerde",
          NoAprobado: "etiquetaRoja",
        };
        return tipos[tipo] || "Ninguna";
      }

                $scope.soporte_FL = "";
                document.addEventListener("change", e =>{
                  if (e.target.matches(".fancy-file")) {
                    setTimeout(() => { $scope.$apply(); }, 500);
                    const span = document.querySelector('.fancy-file__fancy-file-name > span');
                    var files = e.target.files;
                    if (files.length != 0) {
                      const x = files[0].name.split('.');
                      if (x[x.length - 1].toUpperCase() in {'JPG': 'JPG', 'PDF': 'PDF', 'ZIP': 'ZIP'}) {
                        if (files[0].size < 15485760 && files[0].size > 0) {
                          $scope.getBase64(files[0]).then(function (result) {
                              $scope.soporte_FL = result;
                              span.innerHTML = files[0].name;
                            setTimeout(function () { $scope.$apply(); }, 300);
                          });
                        } else {
                          span.innerHTML = 'Ningun Archivo Seleccionado';
                          swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                        }
                      } else {
                        span.innerHTML = 'Ningun Archivo Seleccionado';
                        swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF, JPG o ZIP!', 'info');
                      }
                    }else{
                      span.innerHTML = 'Ningun Archivo Seleccionado';

                    }
                  }
            })

      $scope.cargarBase64 = function () {
        return new Promise((resolve) => {
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: { function: "reporteFileUrl", base64: $scope.soporte_FL, codigo: "Reportes"}
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }


      $scope.cargarReporte = function (fecha) {
          if (fecha && $scope.soporte_FL != "" && $scope.fuente !=  "") {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          })
          $scope.cargarBase64().then((result) =>{
            if (result) {
              $scope.cargue = {
                codigo_reporte: "",       
                numero: $scope.numeroReporteCargue,       
                fecha_reporte: "",       
                hora: "",
                alerta: "",
                Contenido_r: "",
                frecuencia: "",
                objetivo: "",
                entes: "",
                tipo_norma: "",
                anno_norma: "",
                elabora: "",
                revisa: "",
                reporta: "",
                fecha_limite: "",
                accion: "C",
                link_cargue: result,
                fecha_cargue: $scope.formatDatefecha(fecha),
                estadop: "",
                v_pestado_cargue: "",
                fuente: $scope.fuente,
                v_pdias_habiles: 0,
                v_pobservacion_gestion: "",

              };
             
              $http({
                method: 'POST',
                url: "php/auditoriainterna/reporteslegales.php",    
                data: {
                  function: 'insertarReporte',
                  json: angular.toJson($scope.cargue)
                    }
              }).then(function (response) {
                if (response.data.Codigo == 0) {
                  swal('Completado', `Reporte ${$scope.tituloDetalle} cargado correctamente`, 'success');
                  $scope.limpiarAgendarReporte();
                  $scope.gestionarReportes();
               
                  setTimeout(()=>{
                    $scope.seleccionarTab('','','Tab',2);
                    $scope.calendario($scope.year);
                    $scope.programacion($scope.year);
                    // swal.close();
                         },1200)
                } else {
                  swal('Mensaje', response.data.Nombre, 'warning');
                };
              });
            }else{
                swal('Campos vacios', 'Error al cargar el soporte', 'error');
            }
          })
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }

      //  Fin Archivos File Funciones

      $scope.toggleSearch = function () {
        $scope.v_search = !$scope.v_search;
        $scope.filtrar = "";
      }
      $scope.panel = false;
      $scope.null = [];
      $scope.CurrentDate = new Date();
      // $scope.viewType = function (value, lista) {
      //   $scope.panel = value;
      //   if ($scope.treporte == "Mis reportes") {
      //     if (value) {
      //       $scope.programacion($scope.year);
      //     } else {
      //       $scope.calendario($scope.year);
      //     }
      //   } else if ($scope.treporte == "Todos los reportes") {
      //     swal({
      //       html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      //       width: 200,
      //       allowOutsideClick: false,
      //       allowEscapeKey: false,
      //       showConfirmButton: false,
      //       animation: false
      //     });
      //     if (value) {
      //       $scope.programming = $scope.misReporta.concat($scope.misRevisa).concat($scope.misElabora);
      //     } else {
      //       for (let i = 0; i < $scope.calendar.length; i++) {
      //         for (let j = 0; j < $scope.calendar[i].days.length; j++) {
      //           if ($scope.calendar[i].days[j].details.length > 0) {
      //             $scope.calendar[i].days[j].details = $scope.compararArray($scope.calendar[i].days[j].details);
      //           }
      //         }
      //       }
      //     }
      //     setTimeout(() => {
      //       swal.close();
      //     }, 300);
      //   }
      // }

      $scope.obtenerFrecuencia = function(){
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'p_lista_frecuencia',
          }
        }).then(function ({data}) {
          if (data) {
            $scope.fecuencias = data;
          } else {
            $scope.fecuencias = [];
          }
        })
      }
      $scope.obtenerFrecuencia();

      $scope.dayNull = function (Init) {
        if (Init == "0") {
          Init = 7;
        } else {
          Init = Init;
        }
        return { "width": "calc(14.28571428571429% * " + (Init - 1) + ")" };
      }
 
      $scope.formatDateArray = function (value, tipo) {
        var temp = value.split("-");
        return temp[tipo];
      }


      $scope.year = $scope.CurrentDate.getFullYear();
      $scope.yearNext = function () {
        $scope.year++;
        $scope.calendario($scope.year);
        $scope.programacion($scope.year);
      }
      $scope.yearPrev = function () {
        $scope.year--;
        if ($scope.year >= 2019) {
          $scope.calendario($scope.year);
          $scope.programacion($scope.year);
        } else {
          $scope.calendar = [];
          $scope.programming = [];
        }
      }
      $scope.programacion = function (year) {
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
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'obtenerProgramacion',
            year: year
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data !== 0) {
            $scope.programming = response.data;
            swal.close();
          } else {
            $scope.programming = [];
          }
        })
      }
      $scope.programacion($scope.year);

      function splitArray(string, position, ident) {
        var temp = string.split(ident);
        return temp[position];
      };
      function getCelandario(year) {
        return new Promise(function (resolve, reject) {
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'obtenerCalendario',
              year: year
            }
          }).then(function (response_0) {
            $http({
              method: 'POST',
              url: "php/auditoriainterna/reporteslegales.php",
              data: {
                function: 'obtenerProgramacion_Temp',
                year: year
              }
            }).then(function (response_1) {
              response_0.data.forEach(function (item_0, i) {
                item_0.days.forEach(function (item_1, j) {
                  response_0.data[i].days[j].details = JSON.parse(response_0.data[i].days[j].details);
                  response_0.data[i].days[j].festive = JSON.parse(response_0.data[i].days[j].festive);
                });
              });

              if (response_1.data != 0) {
                response_1.data.forEach(function (item, i) {
                  var mes = (splitArray(item.fecha, 1, "/") * 1), dia = (splitArray(item.fecha, 0, "/") * 1);
                  response_0.data[mes - 1].days[dia - 1].details = item.array;
                });
                resolve(response_0.data);

              } else {
                resolve(response_0.data);
              }

            });
          });
        });
      }
      $scope.calendario = function (year) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        var promise = getCelandario(year);
        promise.then(function (result) {
          $scope.calendar = result;
          $scope.$apply();

          swal.close();
        });
      }
      $scope.calendario($scope.year);
      $scope.colores_calendario = function (reportes, dia, mes, año) {
        if (reportes.length > 0) {
          $scope.colores = { yellow: 0, orange: 0, green: 0, red: 0 };
          for (const i in reportes) {
            if (reportes.hasOwnProperty(i)) {
              reportes[i];
              if (reportes[i].EstadoCal == "red") {
                $scope.colores.red++;
              } else if (reportes[i].EstadoCal == "green") {
                $scope.colores.green++;
              } else if (reportes[i].EstadoCal == "orange") {
                $scope.colores.orange++;
              } else if (reportes[i].EstadoCal == "yellow"){
                $scope.colores.yellow++;
              }
            }
          }
          if (new Date(año, mes, dia).getTime() < new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0) {
              return "red";
            } else if ($scope.colores.green > 0 && $scope.colores.red == 0) {
              return "green";
            } else {
              return "";
            }
          } else if (new Date(año, mes, dia).getTime() == new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.red > 0) {
              return "red";
            } else if ($scope.colores.green > 0 && $scope.colores.red == 0) {
              return "green";
            } else {
              return "yellow";
            }
          } else if (new Date(año, mes, dia).getTime() > new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            if ($scope.colores.orange > 0) {
              return "orange";
            } else if ($scope.colores.green > 0 && $scope.colores.red == 0 && $scope.colores.orange == 0 && $scope.colores.yellow == 0) {
              return "green";
            } else if ($scope.colores.green == 0 && $scope.colores.red > 0 && $scope.colores.orange == 0 && $scope.colores.yellow == 0) {
              return "red";
            } else {
              return "yellow";
            }
          }
        } else {
          return "";
        }
      }

      $scope.gestionarReportes = function () {
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
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'p_lista_detalle_gestion',
              cedula: $scope.cedula
               }
          }).then(function (response) {
            swal.close();
            if (response.data[0].Codigo == 0) {
              $scope.gestion = [];
              swal('Informacion', 'No se encontraron reportes para gestionar', 'info');
            } else {
              $scope.gestion = response.data;
              $scope.gestionTempoFiltro = response.data;
              $scope.iniciodePaginacion(response.data);
              if ($scope.gestionTempoFiltro) {
                  $scope.gestionAsignados = $scope.gestionTempoFiltro.filter(e => e.DOCUMENTO_ASIGNADO != null)
                  $scope.gestionCargado = $scope.gestionTempoFiltro.filter(e => e.DOCUMENTO_CARGUE != null)
                  $scope.gestionAprobado = $scope.gestionTempoFiltro.filter(e => e.ESATUS == 'Aprobado')
                  $scope.gestionNoAprobado = $scope.gestionTempoFiltro.filter(e => e.ESATUS == 'No Aprobado')
                  $scope.gestionEnRevision = $scope.gestionTempoFiltro.filter(e => e.ESATUS == null && e.ARCHIVO_CARGADO)
                  $scope.gestionPendiente = $scope.gestionTempoFiltro.filter(e => e.ESATUS == null && e.ARCHIVO_CARGADO == null)
              }
            }
          });
      }

      $scope.detallesReportes = function(x){
        if (x.DOCUMENTO_CARGUE && x.ESATUS != 'No Aprobado') {
          swal('Informacion', `El reporte ${x.NUMERO} ya se encuentra cargado`, 'info');
        } else {
          $scope.filtrocheck_option.DOCUMENTO = '';
          $scope.detalleReportes = true;
          $scope.diasReportes = false;
          const span = document.querySelector('.fancy-file__fancy-file-name > span');
          
          $scope.tituloDetalle = `Reporte N° ${x.NUMERO}`;
          $scope.numeroReporteCargue = x.NUMERO;
          $scope.observacionAprobacion = x.OBSERVACION_GESTION;
          
          // if (span.files.length != 0) {
          //   span.value = "";   
          // }
          if (x.ESATUS == 'No Aprobado') {
            let arrayFecha = x.FECHA_CARGUE.split("/");       
            $scope.fechaCargue = new Date(arrayFecha[0], (arrayFecha[1] - 1), arrayFecha[2]);
            $scope.fuente = x.FUENTE;
            // span.textContent = x.ARCHIVO_CARGADO.split("/").pop().toString();
          }else{
            $scope.soporte_FL = "";
            span.innerHTML = "Ningun Archivo Seleccionado";
          }

          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'verReporte',
              numero: x.NUMERO,
              anno: '',
            }
          }).then(function (response) {
            swal.close();
            let fechaLimite = response.data[0].limite_entrega.slice(0, 10),
            arrayFecha = fechaLimite.split("-");
            $scope.reporte.tipo_norma = response.data[0].tipo_norma;
            $scope.reporte.anno_norma = response.data[0].anno_norma;
            $scope.reporte.numero = response.data[0].numero;
  
            $scope.detalle = {
              numero: response.data[0].numero,
              codigo_reporte: response.data[0].nombre_reporte,
              FechaVencimiento: response.data[0].fecha_reporte,       
              hora: response.data[0].hora,
              alerta: response.data[0].fecha_alerta,
              Contenido_r: response.data[0].contenido.toUpperCase(),
              frecuencia: x.FRECUENCIA,
              objetivo: response.data[0].objetivo.toUpperCase(),
              entes: response.data[0].nombre_ente,
              elabora: response.data[0].nombre_elabora,
              revisa: response.data[0].nombre_revisa,
              reporta: response.data[0].nombre_reporta,
              fecha_limite: `${arrayFecha[2]}/${arrayFecha[1]}/${arrayFecha[0]}`,
              link_cargue: "",
              fecha_cargue: "",
              estadop: "A"
            };
            
          });
          $scope.seleccionarTab('','','Cargue',2);
          
        }

      }

      $scope.filtrocheck_option = {
         DOCUMENTO: ''
      }

      $scope.filtroTabla = function(a){   
        if ($scope.gestionTempoFiltro) {
          if (a == 'A') {
            $scope.gestionAgendado = $scope.gestionTempoFiltro.filter(e => e.ESTADO == 'orange')
            $scope.gestion =  $scope.gestionAgendado;
          }
          if (a == 'NC') {
            $scope.gestionNoCompletado = $scope.gestionTempoFiltro.filter(e => e.ESTADO == 'red')
            $scope.gestion = $scope.gestionNoCompletado;
          }
          if (a == 'P') {
            $scope.gestionProximo = $scope.gestionTempoFiltro.filter(e => e.ESTADO == 'yellow')
            $scope.gestion = $scope.gestionProximo;
          }
          if (a == 'C') {
            $scope.gestionCompletado = $scope.gestionTempoFiltro.filter(e => e.ESTADO == 'green')
            $scope.gestion = $scope.gestionCompletado;
          }
          if (a == 'T') {
            $scope.gestionarReportes();
          }
        }    
       }

    $scope.filtroTablaXprocesos = function(a, id){    
      if ($scope.gestionTempoFiltro) {
          if (a == 'A') {
            $scope.gestionAsignados = $scope.gestionTempoFiltro.filter(e => e.DOCUMENTO_ASIGNADO != null)
            $scope.gestion =  $scope.gestionAsignados;
            $scope.filtrocheck_option.DOCUMENTO = 'A';
          }
          if (a == 'C') {
            $scope.gestionCargado = $scope.gestionTempoFiltro.filter(e => e.DOCUMENTO_CARGUE != null)
            $scope.gestion = $scope.gestionCargado;
            $scope.filtrocheck_option.DOCUMENTO = 'C';
    
          }
          if (a == 'AP') {
            $scope.gestionAprobado = $scope.gestionTempoFiltro.filter(e => e.ESATUS == 'Aprobado')
            $scope.gestion = $scope.gestionAprobado;
            $scope.filtrocheck_option.DOCUMENTO = 'AP';
          }
          if (a == 'NP') {
            $scope.gestionNoAprobado = $scope.gestionTempoFiltro.filter(e => e.ESATUS == 'No Aprobado')
            $scope.gestion = $scope.gestionNoAprobado;
            $scope.filtrocheck_option.DOCUMENTO = 'NP';
          }
          if (a == 'R') {
            $scope.gestionEnRevision = $scope.gestionTempoFiltro.filter(e => e.ESATUS == null && e.ARCHIVO_CARGADO)
            $scope.gestion = $scope.gestionEnRevision;
            $scope.filtrocheck_option.DOCUMENTO = 'R';
          }
          if (a == 'PE') {
            $scope.gestionPendiente = $scope.gestionTempoFiltro.filter(e => e.ESATUS == null && e.ARCHIVO_CARGADO == null)
            $scope.gestion = $scope.gestionPendiente;
            $scope.filtrocheck_option.DOCUMENTO = 'PE';
          }
      }   
      
    }

      // $scope.treporte = "Mis reportes";
      // $scope.compararArray = function (details) {
      //   var arrayTemp = [];
      //   var i = details.length;
      //   while (i--) {
      //     var obj = undefined;
      //     var temp = "";
      //     if ($scope.misRevisa.length > 0) {
      //       obj = $scope.misRevisa.find(r => r.numero === details[i].code);
      //       temp = (obj != undefined) ? obj : temp;
      //     }
      //     if ($scope.misReporta.length > 0) {
      //       obj = $scope.misReporta.find(r => r.numero === details[i].code);
      //       temp = (obj != undefined) ? obj : temp;
      //     }
      //     if ($scope.misElabora.length > 0) {
      //       obj = $scope.misElabora.find(r => r.numero === details[i].code);
      //       temp = (obj != undefined) ? obj : temp;
      //     }
      //     if (temp != "") {
      //       arrayTemp.push({ "code": temp.numero, "name": temp.nombre_reporte, "EstadoCal": temp.estado });
      //     }
      //   }
      //   return arrayTemp;
      // }
      // $scope.misReportes = function () {
      //   if ($scope.misRevisa.length > 0 || $scope.misReporta.length > 0 || $scope.misElabora.length > 0) {
      //     if ($scope.treporte == "Mis reportes") {
      //       swal({
      //         html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      //         width: 200,
      //         allowOutsideClick: false,
      //         allowEscapeKey: false,
      //         showConfirmButton: false,
      //         animation: false
      //       });
      //       for (let i = 0; i < $scope.calendar.length; i++) {
      //         for (let j = 0; j < $scope.calendar[i].days.length; j++) {
      //           if ($scope.calendar[i].days[j].details.length > 0) {
      //             $scope.calendar[i].days[j].details = $scope.compararArray($scope.calendar[i].days[j].details);
      //           }
      //         }
      //       }
      //       $scope.temporal = $scope.calendar;
      //       $scope.calendar = [];
      //       $scope.programming = $scope.misReporta.concat($scope.misRevisa).concat($scope.misElabora);
      //       $scope.treporte = "Todos los reportes";
      //       setTimeout(() => {
      //         $scope.calendar = $scope.temporal;
      //         $scope.$apply();
      //         console.log($scope.calendar);
      //         swal.close();
      //       }, 300);
      //     } else if ($scope.treporte == "Todos los reportes") {
      //       $scope.programacion($scope.year);
      //       $scope.calendario($scope.year);
      //       $scope.treporte = "Mis reportes";
      //     }
      //   } else {
      //     swal('Mensaje', 'No tienes reportes asignados', 'warning');
      //   }
      // }
      // Borrar
    $scope.borrarReporte = function (numero) {
      swal({
        title: 'Confirmar Proceso',
        text: "¿Desea eliminar el reporte #" + numero + " ?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function (result) {
        if (result) {
          $scope.reporte = {
            numero: numero,
            accion: "D",
            codigo_reporte: "",
            fecha_reporte: "",
            hora: "",
            dias_notifica: "",
            frecuencia: "",
            objetivo: "",
            entes: "",
            tipo_norma: "",
            anno_norma: "",
            norma: "",
            link_norma: "",
            link_anexo: "",
            tipo_archivo: "",
            cant_archivo: "",
            delimitado: "",
            elabora: "",
            revisa: "",
            reporta: "",
            estado: "A",
            link_cargue: "",
            fecha_cargue: "",
            estadop: "X",
            estadoCargue: "",
            fuente: "",
            v_pdias_habiles: 0,
            v_pobservacion_gestion: '',
          };
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'insertarReporte',
              json: JSON.stringify($scope.reporte)
            }
          }).then(function (response) {
            if (response.data.Codigo == 0) {
              $scope.programacion($scope.year);
              // swal('Completado', response.data.Mensaje, 'success');
            } else {
              swal('Mensaje', response.data.mensaje, 'warning');
            };
          });
        } else {
          swal('Mensaje', response.data.mensaje, 'warning');
        };
      }).catch(swal.noop);
    }


    $scope.abrirModalAprobacion = function(numero, cargue, estatus, estado){
        if (!cargue) {
          swal('Informacion', 'Solo se puede realizar esta accion despues de haber cargado el reporte ' +numero, 'warning');
        }else{
          if (estatus == 'Aprobado') {
            swal('Informacion', `El reporte ${numero} se encuentra en estado Aprobado` , 'warning');           
          }else if(estatus == 'No Aprobado'){
            swal('Informacion', `El reporte ${numero} se encuentra en estado No Aprobado`, 'warning');
          }
          // else if(estatus && $scope.admin == true){
          //     $scope.estatus = estado;
          //     $scope.estadoAprobacion = `${estatus}`;
          //       $("#modalRevertir").modal("open");
          // }
          if (!estatus) {
            $scope.numReporte = numero;
            // $scope.estadoReporte = estatus;
            $("#modalAprobacion").modal("open");
          }
        }
    }

    $scope.Exportar = function(){
      $http({
        method: 'POST',
        url: "php/auditoriainterna/reporteslegales.php",
        data: {
            function: "p_obtener_reportes_legales",
        }
        }).then( ({data}) => {
            if (data.length > 0) {
              var ws = XLSX.utils.json_to_sheet(data);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Reportes Legales.xlsx");
              const text = `Registros encontrados ${data.length}`
                swal('¡Mensaje!', text, 'success').catch(swal.noop);
            }else{
                swal('INFO', `${data.Nombre}`, 'error');
            }
        })          
}

    $scope.closeModal = function(){
      $(".modal").modal("close");
    }

    $scope.reportesAprobar = function (estatus, observacion) {
      if (estatus == 'X' && !observacion) {
        swal('Mensaje', "La observacion es obligatoria al no aprobar", 'warning');  
      }else{
        if (estatus) {
          $scope.aprobar = {
            codigo_reporte: "",       
            numero: $scope.numReporte,       
            fecha_reporte: "",       
            hora: "",
            alerta: "",
            Contenido_r: "",
            frecuencia: "",
            objetivo: "",
            entes: "",
            elabora: "",
            revisa: "",
            reporta: "",
            fecha_limite: "",
            accion: "G",
            link_cargue: "",
            fecha_cargue: "",
            estadop: "",
            v_pestado_cargue: estatus,
            fuente: "",
            v_pdias_habiles: 0,
            v_pobservacion_gestion: observacion,
          };
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'insertarReporte',
              json: JSON.stringify($scope.aprobar)
            }
          }).then(function (response) {
            if (response.data.Codigo == 0) {
              swal('Mensaje', response.data.Nombre, 'warning');
              $scope.gestionarReportes();
              $scope.calendario($scope.year);
              $scope.programacion($scope.year);
              $scope.closeModal();
            } else {
              swal('Mensaje', 'Error con el reporte #' + numero, 'warning');
            }
          })
        } 
      }
    
    }

      // ------   Filtro y Paginacion  ---------------------
    $scope.iniciodePaginacion = function (info){
      $scope.gestionTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    } 
    $scope.NumeroPaginas = function (){
      $scope.currentPage = 0;
      if ($scope.Pag == 0) {
        $scope.pageSize = $scope.gestion.length;
        $scope.valmaxpag = $scope.gestion.length;
      } else {
        $scope.pageSize = $scope.Pag;
        $scope.valmaxpag = $scope.Pag;    
      }
    } 

    $scope.filterColmena = function(valor) {
      $scope.gestionTemp = $filter('filter')($scope.gestion, valor);
      $scope.configPages();
    }
  
    $scope.configPages = function () { 
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.gestionTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.gestionTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.gestionTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag) {
          ini = Math.ceil($scope.gestionTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag;
          fin = Math.ceil($scope.gestionTemp.length / $scope.vaTabla.pageSize);
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
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
    }

    $scope.MostrarReporte = function(x){
      $scope.ver = x;
      $scope.filtrocheck_option.DOCUMENTO = '';
      $scope.cargueSoporte = "NA";
      $scope.FormatNorma = x.LINK_NORMA == null ? 'NO HAY SOPORTES' : x.LINK_NORMA.split("/").pop();
      $scope.FormatAnexo = x.LINK_ANEXO == null ? 'NO HAY SOPORTES' : x.LINK_ANEXO.split("/").pop();   
      if (x.ARCHIVO_CARGADO) {
        $scope.cargueSoporte = x.ARCHIVO_CARGADO == '' ? 'NA' : x.ARCHIVO_CARGADO.split("/").pop();        
      }     
      $scope.seleccionarTab('','','visualizar',2);
    }

    $scope.ViewAsignarReportes = function(x, asigna){
        $scope.asignar = x;
        asigna == null ? '' : $scope.responsable = x.DOCUMENTO_REVISA;
        if (!asigna) {
          $http({
            method: 'POST',
            url: "php/auditoriainterna/reporteslegales.php",
            data: {
              function: 'P_LISTA_FUNCIONARIO',
              tipo: x.DOCUMENTO_REVISA,
            }
          }).then(function ({data}) { 
            $scope.listaFuncArea = data;
            $scope.numeroReporte = x.NUMERO;
          });        
          $("#modalAsignarReporte").modal("open");
        }else{
          swal('Informacion', `Ya el reporte ${x.NUMERO} fue asignado a su responsable` , 'info');
        }
    }

    $scope.AsignarReporte = function(){
      if (!$scope.responsable) {
        swal('Mensaje', 'Completa los campos vacios', 'warning');
      }else{
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        $http({
          method: 'POST',
          url: "php/auditoriainterna/reporteslegales.php",
          data: {
            function: 'asignarReporte',
            numero: $scope.responsable,
            reporte: $scope.numeroReporte,
            accion: 'I',
          }
        }).then(function ({data}) {
          if (data[0].Codigo == 0) {
            $scope.closeModal();
            swal('Mensaje', data[0].Nombre, 'success');
            $scope.responsable = "";
            setTimeout(()=>{
              $scope.gestionarReportes();
            },1000)
          }else{
            swal('Mensaje', data[0].Nombre, 'warning');
          }
        });        
      }

    }

    $scope.formatFecha2 = function(date){
      if (date) {
        let fecha =  date.slice(0,10);
        let array = fecha.split("-")
        return [array[2], array[1], array[0]].join("/");
      }
    }

    $scope.frecuenciaText = function (caso) {
      switch (caso) {
        case "A":
          return "Una vez";
        case "B":
          return "Semanal";
        case "C":
          return "Quincenal";
        case "D":
          return "Mensual";
        case "E":
          return "Trimestral";
        case "F":
          return "Semestral";
        case "G":
          return "Anual";
        case "H":
          return "Bimensual";
        case "I":
          return "Cuatrimestral";
      }
    }

    $scope.verSoporte = function (ruta) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/auditoriainterna/reporteslegales.php",
        data: {
          function: 'VerSoporte',
          ruta
        }
      }).then(function (response) {
        swal.close()
        var win = window.open("temp/" + response.data, '_blank');
        win.focus();
      });
    }

    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
            if ($scope.pages.length % 2 == 0) {
                var resul = $scope.pages.length / 2;
            } else {
                var resul = ($scope.pages.length + 1) / 2;
            }
            var i = index - resul;
            if ($scope.gestionTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.gestionTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.gestionTemp.length / $scope.pageSize) + 1;
            }
            var fin = ($scope.pages.length + i) - 1;
            if (fin > tamanomax) {
                fin = tamanomax;
                i = tamanomax - 9;
            }
            if (index > resul) {
                $scope.calcular(i, fin);
            }
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
          if ($scope.gestionTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.gestionTemp.length / $scope.pageSize);              
          } else {
              var tamanomax = parseInt($scope.gestionTemp.length / $scope.pageSize) + 1;
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

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
    }])