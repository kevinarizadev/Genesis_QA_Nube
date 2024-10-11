'use strict';

angular.module('GenesisApp').controller('consultaavanzadapgpController', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp','$sce', function ($scope, $http, $location,
     $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp,$sce) {

    $scope.filterOptions = 'AVANZADO';
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    
    if (dd < 10) {
        dd = '0' + dd
    }
    
    if (mm < 10) {
        mm = '0' + mm
    }
    $scope.maxDate = yyyy + '-' + mm + '-' + dd;

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

    $scope.obtenerRegionales = function(){
        let dpto = sessionStorage.getItem("dpto");
        $http({
          method: 'POST',
          url: "php/pgp/consultaavanzadapgp.php",
          data: {
            function: 'obtenerRegionales_2',
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.regionales = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
    $scope.obtenerRegionales();

    $scope.limpiar = function () {
      $scope.filterOptions = 'AVANZADO';
    }

    $scope.jsonautorizacion = {
      documento: '',
      numero: '',
      ubicacion: '',
      nit: '',
      estadoavanzado: '',
      fecha_inicio: "",
      fecha_fin: "",
      regional: ""
    }

    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.tempjsonaut = {};
    $scope.buscarAutorizaciones = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });

      if ($scope.filterOptions == 'AVANZADO') {

          $scope.tempjsonaut = Object.assign({}, $scope.jsonautorizacion);
          if ($scope.tempjsonaut.nit && $scope.tempjsonaut.estadoavanzado && $scope.tempjsonaut.regional
            && $scope.tempjsonaut.fecha_inicio && $scope.tempjsonaut.fecha_fin) {
                
                $scope.validatefiltros = false;
                $scope.tempjsonaut.fecha_inicio = formatDate($scope.tempjsonaut.fecha_inicio)
                $scope.tempjsonaut.fecha_fin = formatDate($scope.tempjsonaut.fecha_fin)
            } else {
                $scope.validatefiltros = true;
            }
        }


      if ($scope.validatefiltros == false) {
            if ($scope.filterOptions == 'AVANZADO') {
                    $http({
                        method: 'POST',
                        url: "php/pgp/consultaavanzadapgp.php",
                        data: { function: 'p_lista_facturas_pgp', autorizacion: JSON.stringify($scope.tempjsonaut) }
                    }).then(function ({data}) {
                        if (data) {
                            // Crear un libro de Excel
                            var workbook = XLSX.utils.book_new();
                    
                            // Convertir los datos JSON a hojas de Excel
                            var ipsSheet = XLSX.utils.json_to_sheet(data);
                            // var epsSheet = XLSX.utils.json_to_sheet($scope.autorizaciones.json_eps);
                
                            // Agregar las hojas al libro
                            XLSX.utils.book_append_sheet(workbook, ipsSheet, "PGP Consulta");
                            // XLSX.utils.book_append_sheet(workbook, epsSheet, "EPS");
                
                            // Generar un archivo Excel
                            XLSX.writeFile(workbook, "Consulta PGP.xlsx");            
                            setTimeout(()=> {
                                swal.close();
                                swal({
                                title: "Mensaje",
                                text: "Reporte Generado",
                                type: "success",
                                });
                            }, 1000) 

                        } else {
                            swal.close();
                            swal({
                                title: "Mensaje",
                                text: "No hay datos para exportar",
                                type: "warning",
                            });
                        }
                    })
            } 
      } else { 
        if ($scope.filterOptions == 'AVANZADO') {  
            $scope.textvalidate = "Datos de la busqueda AVANZADA no pueden estar vacios!"         
        }
        swal('Importante', $scope.textvalidate, 'info');
      }
    }

  }])