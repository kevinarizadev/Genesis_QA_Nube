'use strict';
angular.module('GenesisApp').controller('autorizacionpqrdsController', ['$scope', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
    function ($scope, notification, cfpLoadingBar, $http, ngDialog) {



        $(document).ready(function () {
            $('#modalmotivosaut').modal();
            $("#modaldetalle").modal();

            var seccional = sessionStorage.getItem('municipio');
            $scope.seccionalfuncionario = seccional.toString()
            console.log($scope.seccionalfuncionario)
            if ($scope.seccionalfuncionario == '1') {
                $scope.seccionalfuncionario = '1000';
            } else if($scope.seccionalfuncionario == '8001'){
                $scope.seccionalfuncionario = '08';
            } else{
                var dosPrimerasLetras = $scope.seccionalfuncionario.substring(0, 2);
                $scope.seccionalfuncionario = dosPrimerasLetras;
            }

            $scope.Obtener_Listado('A');
            $scope.sysdate = new Date();
            console.log($(window).width());
            if ($(window).width() < 1100) {
                document.querySelector("#autorizacionpqrds").style.zoom = 0.7;
            }
            if ($(window).width() > 1100 && $(window).width() < 1300) {
                document.querySelector("#autorizacionpqrds").style.zoom = 0.7;
            }
            if ($(window).width() > 1300 && $(window).width() < 1500) {
                document.querySelector("#autorizacionpqrds").style.zoom = 0.8;
            }
            if ($(window).width() > 1500) {
                document.querySelector("#autorizacionpqrds").style.zoom = 0.9;
            }
            document.querySelector("#content").style.backgroundColor = "white";

            $scope.Tabs = 0;
            $('.tabs').tabs();
            $scope.Vista = 0;
            $scope.Tap = 1;
            $('.tabs').tabs();

            setTimeout(() => {
                $scope.$apply();
            }, 500);

            $('#modallistadoipscontratada').modal();
            $('#modalterceros').modal();
        });

        $scope.setTab = function (x) {
            $scope.Tap = x;
            setTimeout(function () {
                $scope.$apply();
            }, 500)
        }

        $scope.filterOptions = "1";
        $scope.codigoips = "";
        $scope.listadoipsblanca = "";
        $scope.vertablaconusuarios = true;
        $scope.documentousuario = "";
        $scope.valorsignar = "";
        $scope.techoasignar = "";
        $scope.estadoasignar = "";
        $scope.excepcionasignar = "";


        $scope.Obtener_Listado = function (tipo) {
            swal({ title: 'Cargando Datos...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_listado_aut_pqrds',
                    seccional: $scope.seccionalfuncionario,
                    tipoaut: tipo,
                }
            }).then(function (response) {
                swal.close();
                if (response.data && response.data.toString().substr(0, 3) != '<br') {
                    $scope.listadoipsusuarios = response.data;
                    $scope.filtroipslistado = "";
                } else {
                    swal({
                        title: "¡Ocurrio un error!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            });
        }

        $scope.tempAut = null;
        $scope.accionesAutorizacion = function (aut, accion) {
            $scope.tempAut = aut;
            $scope.tempAccion = accion;
            swal({
                title: 'Confirmar',
                text: "¿Esta seguro que desea " + accion + " la autorización?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result) {
                    $scope.openmodals(accion);
                }
            })
        }
        $scope.openmodals = function (tipo, opcion) {
            $("#modalmotivosaut").modal("open");
            switch (tipo) {
                case 'ANULAR':
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/print/Rautorizaciones.php",
                        data: {
                            function: 'getListaMotivosAnulacion'
                        }
                    }).then(function (res) {
                        $scope.listMotivos = res.data[0];

                    })
                    break;
                case 'PROCESAR':
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/print/Rautorizaciones.php",
                        data: {
                            function: 'p_lista_motivosprocesamiento'
                        }
                    }).then(function (res) {
                        $scope.listMotivos = res.data;
                    })

                    break;
                case 'modaldetalle':
                    // $scope.v_detallev = null;
                    // $scope.v_encabezadov = null;
                    // $scope.dAuto = null;
                    // $scope.sumPrint = 0;
                    // $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
                    // $scope.consultarAutorizacion(opcion.NUMERO, opcion.UBICACION);
                    // $("#modaldetalle").modal("open");
                    break;
                default:
            }
        }
        $scope.print = function (data) {
              window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + data.numero + '&ubicacion=' + data.ubicacion, '_blank');
          }
        $scope.saveAccionAut = function () {
            if ($scope.motivo == null || $scope.motivo == '') {
                swal({ title: "Motivo", text: 'No puede estar vacio!', showConfirmButton: false, type: "warning", timer: 3000 });
            } else {
                if ($scope.tempAccion == 'ANULAR') {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/print/Uautorizaciones.php",
                        data: { function: 'ProcesaAnulaAutorizacion', numero: $scope.tempAut.numero, ubicacion: $scope.tempAut.ubicacion, observacion: $scope.motivo, justificacion: $scope.jutificacion }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == "1") {
                            swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
                        } else {
                            swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: false, type: "success", timer: 5000 });
                            $scope.jutificacion = null;
                            $scope.motivo = null;
                        }
                        $scope.closemodals();
                        setTimeout(() => {
                            $scope.Obtener_Listado();
                        }, 900);
                    })
                }
                if ($scope.tempAccion == 'PROCESAR') {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: { function: 'ProcesaAnulaAutorizacion', numero: $scope.tempAut.numero, ubicacion: $scope.tempAut.ubicacion, operacion: 'P' }
                    }).then(function (response) {
                        swal.close();
                        if (response.data.Codigo == "1") {
                            swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
                        } else {
                            swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: false, type: "success", timer: 5000 });
                            $scope.jutificacion = null;
                            $scope.motivo = null;
                        }
                        $scope.closemodals();
                        setTimeout(() => {
                            $scope.Obtener_Listado();
                        }, 900);
                    })
                }
            }
        }
        // $scope.consultarAutorizacion = function (numero, ubicacion) {
        //     swal({ title: 'Buscando...' });
        //     swal.showLoading();
        //     $http({
        //         method: 'POST',
        //         url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        //         data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
        //     }).then(function (response) {
        //         console.log(response.data);
        //         $scope.v_encabezadov = response.data.cabeza;
        //         $scope.v_detallev = response.data.detalle;
        //         $scope.totalaut = response.data.total;
        //         if ($scope.v_detallev.length == 0) {
        //             $scope.v_detallev = [];
        //         }

        //         if ($scope.v_encabezadov.ESTADO == 'A') {
        //             $scope.verPrintDetalle = true;
        //         } else {
        //             $scope.verAutorizaciones = false;
        //             $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
        //             $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
        //             if ($scope.v_encabezadov.IMPRESION == 'false') {
        //                 $scope.verPrintDetalle = true;
        //             }
        //             if ($scope.v_encabezadov.IMPRESION == 'true') {
        //                 $scope.verPrintDetalle = false;
        //             }
        //         }
        //         swal.close();
        //     })
        // }
        // $scope.buscarAfiliado = function (tipodocumento, documento) {
        //     $http({
        //         method: 'POST',
        //         url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        //         data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
        //     }).then(function (response) {
        //         if (response.data.CODIGO != "0") {
        //             $scope.infoafiliadoautedit = null;
        //             $scope.infoafiliadoautedit = response.data;
        //             if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {
        //                 $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';
        //                 swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');
        //             }
        //             $scope.afirownumIV = 1;
        //             if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {
        //                 $scope.afirownumIV = $scope.afirownumIV + 1;
        //             }
        //             if ($scope.infoafiliadoautedit.TUTELA == 'true') {
        //                 $scope.afirownumIV = $scope.afirownumIV + 1;
        //             }
        //             if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {
        //                 $scope.afirownumIV = $scope.afirownumIV + 1;
        //             }
        //             if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {
        //                 $scope.afirownumIV = $scope.afirownumIV + 1;
        //             }
        //             if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {
        //                 $scope.afirownumIV = $scope.afirownumIV + 1;
        //             }
        //             $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
        //             $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;
        //             $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;
        //             $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;
        //             $scope.datosAfiModalNov = $scope.infoafiliadoautedit;
        //             $scope.inactiveseccion1tab4 = true;
        //             $scope.inactiveseccion2tab4 = false;
        //         } else {
        //             swal('Importante', response.data.NOMBRE, 'info')
        //         }
        //     });
        // }
        // function validate_fecha(fecha) {
        //     var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
        //     if (fecha.search(patron) == 0) {
        //         var values = fecha.split("-");
        //         if (isValidDate(values[2], values[1], values[0])) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        // $scope.calcularEdad = function (date, tipo) {
        //     var fecha = date.split("/").reverse().join("-");
        //     if (validate_fecha(fecha) == true) {
        //         var values = fecha.split("-");
        //         var dia = values[2];
        //         var mes = values[1];
        //         var ano = values[0];
        //         var fecha_hoy = new Date();
        //         var ahora_ano = fecha_hoy.getYear();
        //         var ahora_mes = fecha_hoy.getMonth() + 1;
        //         var ahora_dia = fecha_hoy.getDate();
        //         var edad = (ahora_ano + 1900) - ano;
        //         if (ahora_mes < mes) {
        //             edad--;
        //         }
        //         if ((mes == ahora_mes) && (ahora_dia < dia)) {
        //             edad--;
        //         }
        //         if (edad > 1900) {
        //             edad -= 1900;
        //         }
        //         var meses = 0;
        //         if (ahora_mes > mes)
        //             meses = ahora_mes - mes;
        //         if (ahora_mes < mes)
        //             meses = 12 - (mes - ahora_mes);
        //         if (ahora_mes == mes && dia > ahora_dia)
        //             meses = 11;
        //         var dias = 0;
        //         if (ahora_dia > dia)
        //             dias = ahora_dia - dia;
        //         if (ahora_dia < dia) {
        //             var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        //             dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        //         }
        //         if (edad > 0) {
        //             $scope.cantidadanosautedit = 'años'
        //             if (edad == 1) {
        //                 $scope.cantidadanosautedit = 'años'
        //             }
        //             $scope.edadautedit = edad;
        //         } else {
        //             if (meses > 0) {
        //                 $scope.cantidadanosautedit = 'meses'
        //                 if (meses == 1) {
        //                     $scope.cantidadanosautedit = 'mes'
        //                 }
        //                 $scope.edadautedit = meses;
        //             } else {
        //                 if (dias > 0) {
        //                     $scope.cantidadanosautedit = 'dias'
        //                     if (dias == 1) {
        //                         $scope.cantidadanosautedit = 'dia'
        //                     }
        //                     $scope.edadautedit = dias;
        //                 }
        //             }
        //         }


        //     }

        // }
        // $scope.formatPeso = function (num) {
        //     var regex2 = new RegExp("\\.");
        //     if (regex2.test(num)) {
        //       num = num.toString().replace('.', ',');
        //       num = num.split(',');
        //       num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        //       num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
        //       if (num[1].length > 1 && num[1].length > 2) {
        //         num[1] = num[1].toString().substr(0, 2);
        //       }
        //       if (num[1].length == 1) {
        //         num[1] = num[1] + '0';
        //       }
        //       return num[0] + ',' + num[1];
        //     } else {
        //       num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        //       num = num.split('').reverse().join('').replace(/^[\.]/, '');
        //       return num + ',00';
        //     }
        //   }
        $scope.closemodals = function () {
            $("#modalmotivosaut").modal("close");
        }

    }])

