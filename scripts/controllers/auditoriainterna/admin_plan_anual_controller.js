'use strict';
angular.module('GenesisApp')
    .controller('admin_plan_anual_controller', ['$scope', '$http', '$filter', '$q',
        function ($scope, $http, $filter) {
            $(document).ready(function () {
                $('.modal').modal();
                $scope.OBTENER_ADMINS();
                $scope.formPermisoFunc = {
                    query: '',
                    BPLN_CEDULA: '',
                    BPLN_CEDULA_NOMBRE: '',
                    BPLV_CREACION: '',
                    BPLV_MODIFICACION: '',
                    BPLV_APROBACION: '',
                    BPLV_CONSULTA: '',
                    BPLV_ESTADO: '',
                    BPLV_RESPONSABLE: sessionStorage.getItem('cedula')
                };
                $scope.arrFuncionarios = [];
                $scope.arrAdministradores = [];
                $scope.busquedaUsu = 1;
                $scope.modalActual = '';

            });

            $scope.OBTENER_ADMINS = function () {
                $scope.cerrarModal('Modal_Agregar_usu');
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_OBTENER_ADMINS',
                        cedula: ''
                    }
                }).then(function ({ data }) {
                    $scope.arrAdministradores = [...data];
                    swal.close();
                });
            }

            $scope.buscarFuncionario = function (query) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_LISTA_FUNCIONARIO',
                        query: $scope.formPermisoFunc.query
                    }
                }).then(function ({ data }) {
                    if (Array.isArray(data)) {
                        swal.close();
                        $scope.arrFuncionarios = data;
                    } else {
                        $scope.cerrarModal($scope.modalActual);
                        swal({
                            title: "Mensaje",
                            text: data.Nombre,
                            type: "error",
                        }).catch(swal.noop);
                    }
                });
            }

            $scope.abrirModal = function (modal) {
                $scope.modalActual = modal;
                $(`#${modal}`).modal('open');
            }

            $scope.cerrarModal = function (modal) {
                $(`#${modal}`).modal('close');
            }

            $scope.seleccionarUsu = function (func) {
                $scope.busquedaUsu = 2;
                $scope.formPermisoFunc.BPLN_CEDULA = func.DOCUMENTO;
                $scope.formPermisoFunc.BPLN_CEDULA_NOMBRE = func.NOMBRE_FUNCIONARIO;
            }

            $scope.nuevoUsuario = function () {
                $scope.formPermisoFunc.BPLV_CREACION = false;
                $scope.formPermisoFunc.BPLV_MODIFICACION = false;
                $scope.formPermisoFunc.BPLV_APROBACION = false;
                $scope.formPermisoFunc.BPLV_CONSULTA = false;
                $scope.busquedaUsu = 1;
                $scope.abrirModal('Modal_Agregar_usu');
            }

            $scope.agingar_permisos = function (func = '') {
                if (func != '') {
                    $scope.formPermisoFunc.BPLN_CEDULA = func.BPLN_CEDULA;
                    $scope.formPermisoFunc.BPLN_CEDULA_NOMBRE = func.BPLN_CEDULA_NOMBRE;
                    $scope.formPermisoFunc.BPLV_CREACION = (func.BPLV_CREACION == 'S' ? true : false);
                    $scope.formPermisoFunc.BPLV_MODIFICACION = (func.BPLV_MODIFICACION == 'S' ? true : false);
                    $scope.formPermisoFunc.BPLV_APROBACION = (func.BPLV_APROBACION == 'S' ? true : false);
                    $scope.formPermisoFunc.BPLV_CONSULTA = (func.BPLV_CONSULTA == 'S' ? true : false);
                    $scope.abrirModal('Modal_Agregar_usu');
                    $scope.busquedaUsu = 2
                } else {
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'P_UI_ADMINS',
                            cedula: $scope.formPermisoFunc.BPLN_CEDULA,
                            creacion: $scope.formPermisoFunc.BPLV_CREACION == true ? 'S' : 'N',
                            modificacion: $scope.formPermisoFunc.BPLV_MODIFICACION == true ? 'S' : 'N',
                            aprobacion: $scope.formPermisoFunc.BPLV_APROBACION == true ? 'S' : 'N',
                            consulta: $scope.formPermisoFunc.BPLV_CONSULTA == true ? 'S' : 'N',
                            estado: $scope.formPermisoFunc.BPLV_ESTADO == '' ? 'A' : $scope.formPermisoFunc.BPLV_ESTADO,
                            responsable: $scope.formPermisoFunc.BPLV_RESPONSABLE,
                        }
                    }).then(function ({ data }) {
                        $scope.cerrarModal($scope.modalActual);
                        if (data.codigo == '0') {
                            $scope.arrAdministradores = [];
                            $scope.OBTENER_ADMINS();
                            // if (func == '') {
                            //     const usu = {
                            //         BPLN_CEDULA_NOMBRE: $scope.formPermisoFunc.BPLN_CEDULA_NOMBRE,
                            //         BPLN_CEDULA: $scope.formPermisoFunc.BPLN_CEDULA,
                            //         BPLN_CEDULA_NOMBRE: $scope.formPermisoFunc.nombre,
                            //         BPLV_CREACION: $scope.formPermisoFunc.BPLV_CREACION == true ? 'S' : 'N',
                            //         BPLV_MODIFICACION: $scope.formPermisoFunc.BPLV_MODIFICACION == true ? 'S' : 'N',
                            //         BPLV_APROBACION: $scope.formPermisoFunc.BPLV_APROBACION == true ? 'S' : 'N',
                            //         BPLV_CONSULTA: $scope.formPermisoFunc.BPLV_CONSULTA == true ? 'S' : 'N',
                            //         BPLV_ESTADO: "A",
                            //         BPLV_RESPONSABLE: $scope.formPermisoFunc.BPLV_RESPONSABLE,
                            //     }
                            //     const index = $scope.arrAdministradores.findIndex(usu);
                            //     if ($scope.arrAdministradores[index] != undefined) {
                            //         if (index > -1) {
                            //             $scope.arrAdministradores.splice(index, 1);
                            //         }

                            //     }
                            //     $scope.arrAdministradores.push(usu);
                            // }
                        }
                        swal({
                            title: "¡Notificación!",
                            text: data.mensaje,
                            type: data.codigo == '0' ? "success" : "error",
                        }).catch(swal.noop);
                    });
                }
            }

            $scope.cambiarEstado = function (func) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_UI_ADMINS',
                        cedula: func.BPLN_CEDULA,
                        creacion: func.BPLV_CREACION == true ? 'S' : 'N',
                        modificacion: func.BPLV_MODIFICACION == true ? 'S' : 'N',
                        aprobacion: func.BPLV_APROBACION == true ? 'S' : 'N',
                        consulta: func.BPLV_CONSULTA == true ? 'S' : 'N',
                        estado: func.BPLV_ESTADO == 'A' ? 'I' : 'A',
                        responsable: func.BPLV_RESPONSABLE,
                    }
                }).then(function ({ data }) {
                    if (data.codigo == '0') {
                        $scope.arrAdministradores = [];
                        $scope.OBTENER_ADMINS();
                    }
                    swal({
                        title: "¡Notificación!",
                        text: data.mensaje,
                        type: data.codigo == '0' ? "success" : "error",
                    }).catch(swal.noop);
                });
            }
        }
    ])