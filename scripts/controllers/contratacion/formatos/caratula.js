'use strict';
angular.module('GenesisApp', [])
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('caratulaController', ['$scope', '$http', '$location', '$timeout',
        function($scope, $http, $location, $timeout) {

          
           

            
       
            $scope.hoy = new Date();

      
       
            $scope.mostrar_registro = function() {
                swal({
                    title: 'Cargando información...'
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "../../../php/contratacion/funccontratacion.php",
                    data: { function: 'P_OBTENER_CONTRATO', 
                    numero: $location.search().numero, 
                    ubicacion: $location.search().ubicacion, 
                    documento: $location.search().regimen 
                }
                }).then(function(response) {
                    swal.close();
                    if (response.data.length != 0) {
                        $scope.impresion = response.data[0];
                       
                         // setTimeout(function() {
                         //     window.print();
                         // }, 500);
                    }
                });


            }
            $scope.mostrar_registro();

            // var mediaQueryList = window.matchMedia('print');
            // mediaQueryList.addListener(function(mql) {
            //     if (mql.matches) {
            //         console.log('se hizo antes de imprimir');
            //     } else {
            //         console.log('se hizo despues de imprimir');
            //         setTimeout(function() {
            //             window.close();
            //         }, 10);
            //     }
            // });
        }
    ])