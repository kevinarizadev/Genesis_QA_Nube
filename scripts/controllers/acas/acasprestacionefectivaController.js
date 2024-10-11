'use strict';
angular.module('GenesisApp')
  .controller('acasprestacionefectivaController', ['$scope', '$http', 'ngDialog', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
          $('.modal').modal();
          $('.tabs').tabs();
          $scope.limpiar();
          $scope.activeTable = 0;
          $scope.activeAtras = false;
          $scope.pageSize = 20;
          $scope.Pag = 20;
          $scope.validateExport = false;
          $scope.cedula = sessionStorage.getItem("cedula");
          $scope.sysDay = new Date();
          $scope.filtro = {
            asunto: '',
            dateInit: '',
            dateEnd: ''
          }
      }
 
      $scope.limpiar = function(){      
        setTimeout(() => {
            $scope.$apply()
        }, 500);
      }

      $scope.closeModal = function(){
        $(".modal").modal("close");
      }
      
      $scope.obtenerAcas2 = function () {
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
              url: "php/acas/acasprestacionefectiva.php",
              data: {
                        function: 'p_obtener_acas_prestacion_efectiva'
                    }
          }).then(function ({data}) {     
              swal.close();        
              document.getElementById("asunto").style.border = '';
              $scope.autorizaciones = data;
              $scope.filtAsusntos =  data.json_ips.map(({ nombre_concepto, asunto_id }) => ({ 'concepto': nombre_concepto, 'codigo': asunto_id }));
              $scope.filtAsusntos.push({'concepto': 'TODOS', 'codigo': 'T' })
             })
        }
        $scope.obtenerAcas2();

        $scope.BuscarAcasPersona = function (dato, salud) {   
        if (salud == 'EPS') {
          $scope.codigoEPS = dato.cod_motivo;  
          $scope.codigoEPSasunto = dato.cod_asunto;  
          $scope.codigoEPSconcepto = dato.cod_concepto;  
          $scope.codigoIPS = false;
        }else{
          $scope.codigoIPS = dato.cod_motivo;
          $scope.codigoIPSconcepto = dato.cod_concepto;
          $scope.codigoIPSasunto = dato.cod_asunto;
          $scope.codigoEPS = false;
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
          url: "php/acas/acasprestacionefectiva.php",
          data: {
            function: 'P_OBTENER_ACAS_PRESTACION_EFECTIVA2',
            concepto: dato.cod_concepto,
            motivo:   dato.cod_motivo,
            asunto: dato.cod_asunto
          }
        }).then(function ({data}) {
            swal.close();
            if (data == 0) {
                $scope.AcasXPersona = [];
            }else{
                $scope.AcasXPersona = data;   
                
                $scope.activeTable = 1;
                $scope.activeAtras = true;
                $scope.primerTitu = `(${$scope.AcasXPersona.length}) SEGUIMIENTOS POR FUNCIONARIO`;
                $scope.titulo = $scope.primerTitu;
            }
        })  
        }

        $scope.DescargarRespuesta = function (ruta) {
            $http({
                method: 'POST',
                url: "php/acas/getfileFtp.php",
                data: {
                    ruta: ruta
                }
            }).then(function (response) {
                //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                window.open("temp/" + response.data);
            });
        }
 
        $scope.estadosAcas = function (x, estado) {
          $scope.AcasPersona = [];
          $scope.activeTable = 2;   
          $scope.activeAtras = true;
                if (estado == 'A') {
                    $scope.titulo = `(${x.activo}) Servicios Abriertos de ${x.nombre}`;
                }else{
                    $scope.titulo = `(${x.procesado}) Servicios Cerrados de ${x.nombre}`;
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
                url: "php/acas/acasprestacionefectiva.php",
                data: {
                  function: 'P_OBTENER_LISTADO_ACAS_PRESTACION_EFECTIVA',
                  estado,
                  cedula: x.cedula,
                  tipo:   $scope.codigoEPS == false ? $scope.codigoIPS : $scope.codigoEPS,
                  asunto: $scope.codigoEPS == false ? $scope.codigoIPSasunto : $scope.codigoEPSasunto,
                  concepto: $scope.codigoEPS == false ? $scope.codigoIPSconcepto : $scope.codigoEPSconcepto
                }
            }).then(function ({data}) {
                swal.close();
                if (data == 0) {
                    $scope.AcasPersona = [];
                }else{
                    $scope.AcasPersona = data;
                    $scope.adjuntoPrincipal = data[0].adjunto;
                    $scope.iniciodePaginacion(data);
                    $scope.numberOfPages = function () {
                        return Math.ceil($scope.AcasPersona.length / $scope.pageSize);
                    }
                }
            })
        }
  
        $scope.atrasTabla = function(){
            switch ($scope.activeTable) {
              case 1:
                    $scope.filtro.dateInit = '';
                    $scope.filtro.dateEnd = '';
                    $scope.filtro.asunto = '';
                    document.getElementById("asunto").style.border = '';
                    $scope.validateExport = false;
                    $scope.activeTable = 0;
                    $scope.activeAtras = false;
                break;
              case 2:
                    $scope.activeTable = 1;
                    $scope.activeAtras = true;
                    $scope.titulo =  $scope.primerTitu;
                  break;     
              default:
                  break;
            }
        }

         // Filtro y Paginacion       ---------------------
        $scope.iniciodePaginacion = function (info){
            $scope.AcasPersonaTemp = info;
            $scope.currentPage = 0;
            $scope.pageSize = 20;
            $scope.Pag = 20;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
        } 

      $scope.MostrarNumeroPaginas = function (){
        $scope.currentPage = 0;
        if ($scope.Pag == 0) {
          $scope.pageSize = $scope.AcasPersona.length;
          $scope.valmaxpag = $scope.AcasPersona.length;
        } else {
          $scope.pageSize = $scope.Pag;
          $scope.valmaxpag = $scope.Pag;    
        }
      } 
  
      $scope.filterReportes = function(valor) {
        $scope.AcasPersonaTemp = $filter('filter')($scope.AcasPersona, valor);
        $scope.configPages();
      }

      $scope.configPages = function () { 
            $scope.pages.length = 0;
            var ini = $scope.currentPage - 4;
            var fin = $scope.currentPage + 5;
            if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.AcasPersonaTemp.length / $scope.pageSize) > $scope.valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.AcasPersonaTemp.length / $scope.pageSize);
            } else {
                if (ini >= Math.ceil($scope.AcasPersonaTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag) {
                    ini = Math.ceil($scope.AcasPersonaTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag;
                    fin = Math.ceil($scope.AcasPersonaTemp.length / $scope.vaTabla.pageSize);
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
  
      $scope.btns_paginacion = function (value) {
        $scope.currentPage = value;
      }

      $scope.abrirModalDetalle = function(descripcion,numero,ubicacion){
            $("#modalDetalles").modal("open");
            $scope.descripcionPersona = descripcion;
            $http({
                method: 'POST',
                url: "php/acas/acasprestacionefectiva.php",
                data: {
                    function: 'P_OBTENER_OBTENERACASDETALLESXTICKET_PRESTACION_EFECTIVA',
                    ticket: numero,
                    ubicacion
                        }
                }).then(function (response) {             
                    $scope.detallesAcas = response.data;   
                })
        }
  
      // $scope.paso = function (tipo) {
      //   if (tipo == 'next') {
      //       var i = $scope.pages[0].no + 1;
      //       if ($scope.pages.length > 9) {
      //           var fin = $scope.pages[9].no + 1;
      //       } else {
      //           var fin = $scope.pages.length;
      //       }
  
      //       $scope.currentPage = $scope.currentPage + 1;
      //       if ($scope.AcasPersonaTemp.length % $scope.pageSize == 0) {
      //         var tamanomax = parseInt($scope.AcasPersonaTemp.length / $scope.pageSize);              
      //       } else {
      //           var tamanomax = parseInt($scope.AcasPersonaTemp.length / $scope.pageSize) + 1;
      //       }
      //       if (fin > tamanomax) {
      //           fin = tamanomax;
      //           i = tamanomax - 9;
      //       }
      //   } else {
      //       var i = $scope.pages[0].no - 1;
      //       if ($scope.pages.length > 9) {
      //           var fin = $scope.pages[9].no - 1;
      //       } else {
      //           var fin = $scope.pages.length;
      //       }
  
      //       $scope.currentPage = $scope.currentPage - 1;
      //       if (i <= 1) {
      //           i = 1;
      //           fin = $scope.pages.length;
      //       }
      //   }
      //   $scope.calcular(i, fin);
      // }
  
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

      $scope.exportarDatos = function () { 
        // let validador = Object.values($scope.filtro).every(ele => ele != '')         
          if ($scope.filtro.asunto) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });  
            let fecha1 = $scope.filtro.dateInit,
                fecha2 = $scope.filtro.dateEnd;                
            $http({
              method: 'POST',
              url: "php/acas/acasprestacionefectiva.php",
              data: {
                function: 'P_EXPORTAR_ACASXPERSONA',
                dateInit: $scope.filtro.dateInit ? new Date(fecha1).toLocaleDateString() : '',
                dateEnd: $scope.filtro.dateEnd ? new Date(fecha2).toLocaleDateString() : '',
                asunto:  $scope.filtro.asunto
              }
            }).then(function ({data}) {
                swal.close();
                if (data.length) {
                                // Crear un libro de Excel
                          var workbook = XLSX.utils.book_new();
                      
                          // Convertir los datos JSON a hojas de Excel
                          var ipsSheet = XLSX.utils.json_to_sheet(data);
                          // var epsSheet = XLSX.utils.json_to_sheet($scope.autorizaciones.json_eps);

                          // Agregar las hojas al libro
                          XLSX.utils.book_append_sheet(workbook, ipsSheet, "Prestacion_Efectiva");
                          // XLSX.utils.book_append_sheet(workbook, epsSheet, "EPS");

                          // Generar un archivo Excel
                          XLSX.writeFile(workbook, "Prestacion Efectiva.xlsx");  
                          $scope.validateExport = false;
                          document.getElementById("asunto").style.border = '';
                          $scope.filtro.dateInit = '';
                          $scope.filtro.dateEnd = '';
                          $scope.filtro.asunto = '';
                          setTimeout(()=> {
                              swal.close();
                              swal({
                                title: "Mensaje",
                                text: "Reporte Generado",
                                type: "success",
                              });
                          }, 1000) 
                    }else{
                      swal({
                        title: "Informacion",
                        text: "No hay datos para generar el reporte",
                        type: "info",
                      });
                    } 
            })                    
          }else{
            swal('Campos Vacios', "Necesitas completar los campos requeridos para exportar", 'error');
            document.getElementById("asunto").style.border = '2px solid red';
            $scope.validateExport = true;
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