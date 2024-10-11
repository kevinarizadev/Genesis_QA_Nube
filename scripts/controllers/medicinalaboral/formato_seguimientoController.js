'use strict';
angular.module('GenesisApp', [])
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('formatoseguimientoAfiliadoController', ['$scope', '$http', '$location', '$timeout',
        function($scope, $http, $location, $timeout) {

            $scope.hoy = new Date();

            $scope.formatDate = function(date) {
                var dd = ('0' + date.getDate()).slice(-2);
                var mm = ('0' + (date.getMonth() + 1)).slice(-2);
                var yyyy = date.getFullYear();
                var hh = date.getHours();
                var mi = date.getMinutes();
                return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
                }
                $scope.title = "";

                let opcion = $location.search().mood;


                $scope.viewListSeg = function(){
                    if (opcion == 'I') {
                        $scope.title = "INCAPACIDAD PROLONGADA";
                        $scope.mostrar_registro()
                    }else if(opcion == 'C'){
                        $scope.title = "CALIFICACION DE ORIGEN";
                        $scope.mostrar_registroCalificacion()
                    }else if(opcion == 'P'){
                        $scope.title = "PERDIDA CAPACIDAD LABORAL";
                        $scope.mostrar_registroPerdida()
                    }

                }

           
            $scope.mostrar_registro = function() {
                $scope.detallesSeguimiento = "";
                swal({
                        title: 'Cargando información...'
                    });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "../../php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_CONSULTA_PRELIMINAR_SEGUIMIENTO_INCAPACIDAD_PROLONGADA",
                        documento: $location.search().documento,
                        tipodoc: $location.search().tipo,
                        id: $location.search().id
                    }
                }).then( ({data}) => {
                   swal.close();
                    if (data.Codigo != 1) {
                        $scope.detallesSeguimiento = data;    
                        setTimeout(function() {
                            window.print();
                        }, 500);  
                    }
                })
            }

            $scope.mostrar_registroCalificacion = function() {
                $scope.detallesSeguimiento = "";
                swal({
                        title: 'Cargando información...'
                    });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "../../php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN_DETALLE",
                        documento: $location.search().documento,
                        tipodoc: $location.search().tipo,
                        id: $location.search().id
                    }
                }).then( ({data}) => {
                   swal.close();
                    if (data.Codigo != 1) {
                        $scope.detallesSeguimiento = data;    
                        setTimeout(function() {
                            window.print();
                        }, 500);  
                    }
                })
            }

            $scope.mostrar_registroPerdida = function() {
                $scope.detallesSeguimiento = "";
                swal({
                        title: 'Cargando información...'
                    });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "../../php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL_SIGUIMIENTO",
                        documento: $location.search().documento,
                        tipodoc: $location.search().tipo,
                        id: $location.search().id
                    }
                }).then( ({data}) => {
                   swal.close();
                    if (data.Codigo != 1) {
                        $scope.detallesSeguimiento = data;    
                        setTimeout(function() {
                            window.print();
                        }, 500);  
                    }
                })
            }

            document.addEventListener("DOMContentLoaded", $scope.viewListSeg())

        }
    ])