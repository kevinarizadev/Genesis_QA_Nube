'use strict';
angular.module('GenesisApp')
    .controller('prestacionescertificado', ['$http', '$scope', 'cfpLoadingBar', '$location', '$timeout', '$window',
        function ($http, $scope, cfpLoadingBar, $location, $timeout, $window) {

            $(function () {
                $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "border-style": "none", "border-bottom-style": "dotted" });

                var date = new Date();
                var formattedDate = moment(date).format('YYYY-MM-DD');
                $(".datepicker_inicio").kendoDatePicker({
                    animation: {
                        close: {
                            effects: "fadeOut zoom:out",
                            duration: 300
                        },
                        open: {
                            effects: "fadeIn zoom:in",
                            duration: 300
                        }
                    }
                });
                $(".datepicker_final").kendoDatePicker({
                    animation: {
                        close: {
                            effects: "fadeOut zoom:out",
                            duration: 300
                        },
                        open: {
                            effects: "fadeIn zoom:in",
                            duration: 300
                        }
                    }
                });

                $.getJSON("php/obtenersession.php").done(function (respuesta) {
                    $scope.sesdata = respuesta;
                });

                $(document).ready(function () {
                    $scope.habilitardeshabilitar = 'N';
                    $scope.startChange = function () {
                        var startDate = start.value(),
                            endDate = end.value();
                        if (startDate) {
                            startDate = new Date(startDate);
                            startDate.setDate(startDate.getDate());
                            end.min(startDate);
                        } else if (endDate) {
                            start.max(new Date(endDate));
                        } else {
                            endDate = new Date();
                            start.max(endDate);
                            end.min(endDate);
                        }
                    }

                    $scope.endChange = function () {
                        var endDate = end.value(),
                            startDate = start.value();

                        if (endDate) {
                            endDate = new Date(endDate);
                            endDate.setDate(endDate.getDate());
                            start.max(endDate);
                        } else if (startDate) {
                            end.min(new Date(startDate));
                        } else {
                            endDate = new Date();
                            start.max(endDate);
                            end.min(endDate);
                        }
                    }

                    var start = $("#fecha_inicio").kendoDatePicker({
                        change: $scope.startChange,
                        format: "dd/MM/yyyy",
                        culture: "es-MX",
                        disableDates: ["su", "sa"],
                        max: new Date()
                    }).data("kendoDatePicker");

                    var end = $("#fecha_final").kendoDatePicker({
                        change: $scope.endChange,
                        format: "dd/MM/yyyy",
                        culture: "es-MX",
                        disableDates: ["su", "sa"],
                        max: new Date()
                    }).data("kendoDatePicker");
                    start.max(end.value());
                    end.min(start.value());
                });
            });


            $scope.tipo = 'A';

            $scope.HabilitarInformacion = function () {
                if ($scope.Habilitar == true) {
                    $scope.tipo = 'E';
                    console.log($scope.tipo);
                    $scope.numIndentidad = $scope.sesdata.nit;
                    $scope.habilitardeshabilitar = 'S';
                } else {
                    $scope.Habilitar = false;
                    $scope.tipo = 'A';
                    console.log($scope.tipo);
                    $scope.numIndentidad = '';
                    $scope.habilitardeshabilitar = 'N';
                }
            }


            // $scope.searchCertificado = function (codigo) {
            //     $http({
            //         method: 'POST',
            //         url: "php/prestacionesempresas/liquidacion.php",
            //         data: {
            //             function: 'p_obtener_datos_basicos',
            //             documento: $scope.numIndentidad,
            //             tipo_documento: 'CC'
            //         }
            //     }).then(function(response) {
            //         if($scope.tipo == 'E'){
            //             switch (codigo) {
            //                 case 'C':
            //                     if ($scope.numnit == '' || $scope.numnit == undefined) {
            //                         swal('Notificacion', 'Debe Ingresar NIT', 'info');
            //                     } else {
            //                         $window.open('views/prestacionesempresa/cartera/certificadocartera.php?nit=' + $scope.numnit, '_blank', "width=1080,height=1100");
            //                     }
            //                     break;
            //                 case 'PE':
        
            //                     if ($scope.numIndentidad == '' || $scope.numIndentidad == undefined) {
            //                         swal('Notificacion', 'Debe Ingresar Documento', 'info');
            //                     } else {
            //                         if ($scope.inicio == undefined || $scope.inicio == '') { $scope.inicio = ''; }
            //                         if ($scope.final == undefined || $scope.final == '') { $scope.final = ''; }
            //                         $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
            //                     }
            //                     break;
        
            //                 default:
            //             }
            //         }else{
            //             if (response.data.NombreCompleto) {
            //                 switch (codigo) {
            //                     case 'C':
            //                         if ($scope.numnit == '' || $scope.numnit == undefined) {
            //                             swal('Notificacion', 'Debe Ingresar NIT', 'info');
            //                         } else {
            //                             $window.open('views/prestacionesempresa/cartera/certificadocartera.php?nit=' + $scope.numnit, '_blank', "width=1080,height=1100");
            //                         }
            //                         break;
            //                     case 'PE':
            
            //                         if ($scope.numIndentidad == '' || $scope.numIndentidad == undefined) {
            //                             swal('Notificacion', 'Debe Ingresar Documento', 'info');
            //                         } else {
            //                             if ($scope.inicio == undefined || $scope.inicio == '') { $scope.inicio = ''; }
            //                             if ($scope.final == undefined || $scope.final == '') { $scope.final = ''; }
            //                             $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
            //                         }
            //                         break;
            
            //                     default:
            //                 }
            //             }else{
            //                 swal('Genesis informa','Afiliado no presenta relacion laboral con este empleador.','warning');
            //             }
            //         }
            //     });



            // }

            $scope.searchCertificado = function (codigo) {
                $http({
                    method: 'POST',
                    url: "php/prestacionesempresas/liquidacion.php",
                    data: {
                        function: 'p_obtener_datos_basicos',
                        documento: $scope.numIndentidad,
                        tipo_documento: 'CC'
                    }
                }).then(function(response) {
                    if($scope.tipo == 'E'){
                switch (codigo) {
                    case 'C':
                        if ($scope.numnit == '' || $scope.numnit == undefined) {
                            swal('Notificacion', 'Debe Ingresar NIT', 'info');
                        } else {
                            $window.open('views/prestacionesempresa/cartera/certificadocartera.php?nit=' + $scope.numnit, '_blank', "width=1080,height=1100");
                        }
                        break;
                    case 'PE':

                        if ($scope.numIndentidad == '' || $scope.numIndentidad == undefined) {
                            swal('Notificacion', 'Debe Ingresar Documentos', 'info');
                        } else {
                            if ($scope.inicio == undefined || $scope.inicio == '') { $scope.inicio = ''; }
                            if ($scope.final == undefined || $scope.final == '') { $scope.final = ''; }
                            $http({
                                method: 'POST',
                                url: "php/prestacionesempresas/funprestaciones.php",
                                data: { function: 'p_validacion_certificado',
                                 tipo: $scope.tipo, documento:$scope.numIndentidad, inicial: $scope.inicio, final:$scope.final  }
                            }).then(function (response) {  
                                console.log(response)
                                if (response.data[0].CODIGO == "2") {
            
                                    $window.open('views/prestacionesempresa/certificado/certificadoprestacionesno.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
            
                                    }if (response.data[0].CODIGO == "1") {
            
                                            $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                    
                                            } if (response.data[0].CODIGO == "0") {
            
                                                swal('Notificacion', 'Documento no existe en nuestro sistema de información', 'info');
                    
                                            } if (response.data[0].CODIGO == "3") {
            
                                                $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                        
                                                }
                                            
                                                   
                            })
                        }
                        break;

                    default:
                }

            }else{
                // if (response.data.NombreCompleto) {
                    switch (codigo) {
                        case 'C':
                            if ($scope.numnit == '' || $scope.numnit == undefined) {
                                swal('Notificacion', 'Debe Ingresar NIT', 'info');
                            } else {
                                $window.open('views/prestacionesempresa/cartera/certificadocartera.php?nit=' + $scope.numnit, '_blank', "width=1080,height=1100");
                            }
                            break;
                        case 'PE':
    
                            if ($scope.numIndentidad == '' || $scope.numIndentidad == undefined) {
                                swal('Notificacion', 'Debe Ingresar Documento', 'info');
                            } else {
                                if ($scope.inicio == undefined || $scope.inicio == '') { $scope.inicio = ''; }
                                if ($scope.final == undefined || $scope.final == '') { $scope.final = ''; }
                                $http({
                                    method: 'POST',
                                    url: "php/prestacionesempresas/funprestaciones.php",
                                    data: { function: 'p_validacion_certificado',
                                     tipo: $scope.tipo, documento:$scope.numIndentidad, inicial: $scope.inicio, final:$scope.final  }
                                }).then(function (response) {  
                                    console.log(response)
                                    if (response.data[0].CODIGO == "2") {
                
                                        $window.open('views/prestacionesempresa/certificado/certificadoprestacionesno.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                
                                        }if (response.data[0].CODIGO == "1") {
                
                                                $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                        
                                                } if (response.data[0].CODIGO == "0") {
                
                                                    swal('Notificacion', 'Documento no existe en nuestro sistema de información', 'info');
                        
                                                } if (response.data[0].CODIGO == "3") {
                
                                                    $window.open('views/prestacionesempresa/certificado/certificadoprestaciones.php?documento=' + $scope.numIndentidad + '&inicial=' + $scope.inicio + '&final=' + $scope.final + '&tipo=' + $scope.tipo, '_blank', "width=1080,height=1100");
                            
                                                    }
                                                
                                                       
                                })
                            }
                            break;
    
                        default:
                    }
                // }else{
                //     // swal('Genesis informa','Afiliado no presenta relacion laboral con este empleador.','warning');
                    
                //     swal({
                //         title: "Genesis informa",
                //         html: 'Afiliado no presenta relacion laboral con este empleador <a target="_blank" href="https://genesis.cajacopieps.com/app.php#/movilidad/solicitud">Ingrese a Este Link Para su Registro</a>',
                //         type: 'warning',
                //       });
                // }
            }
        });

            }

        }])

