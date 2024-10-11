'use strict';
angular.module('GenesisApp')
    .controller('plan_anual_auditoria_controller', ['$scope', '$http', '$filter', '$q',
        function ($scope, $http) {
            $(document).ready(function () {
                $scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $scope.obtenerPermisos();
                $scope.obtenerRegionales();
                $scope.obtenerAreas();
                $scope.permisos = {
                    BPLV_CREACION: "N",
                    BPLV_MODIFICACION: "N",
                    BPLV_APROBACION: "N",
                    BPLV_CONSULTA: "N",
                    BPLV_ESTADO: "I",
                };

            });

            $scope.init = function () {
                $scope.pantalla = 1;
                $scope.tab = 1;
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $scope.SysDay = new Date();
                if ($(window).width() < 1100) {
                    document.querySelector("#pantalla").style.zoom = 0.7;
                }
                if ($(window).width() > 1100 && $(window).width() < 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.8;
                }
                if ($(window).width() > 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.9;
                }
                $scope.showMeses = true;
                $scope.arrRegionales = [];
                $scope.arrAreas = [];
                $scope.arrJefes = [];
                $scope.listadoAnio = [];
                $scope.arrPlanAnualAuditorias = [];
                $scope.arrPlanAeAuditorias = [];
                $scope.mesesSeleccionados = [];
                $scope.limpiarForm();
                $scope.limpiarFormPlanAuditoria();
                $scope.selectAnno();
                $scope.obtenerJefes();
                $scope.listarPlanAnualAuditorias();
                $scope.mesSeleccionado = 0;
            }

            $scope.setTab = function (tab) {
                $scope.tab = tab;
                if (tab == 1) {
                    $scope.listarPlanAnualAuditorias();
                }
            }

            $scope.limpiarCalendario = function () {
                $scope.meses = [
                    {
                        MES: 'ENERO',
                        AGENDA: []
                    },
                    {
                        MES: 'FEBRERO',
                        AGENDA: []
                    },
                    {
                        MES: 'MARZO',
                        AGENDA: []
                    },
                    {
                        MES: 'ABRIL',
                        AGENDA: []
                    },
                    {
                        MES: 'MAYO',
                        AGENDA: []
                    },
                    {
                        MES: 'JUNIO',
                        AGENDA: []
                    },
                    {
                        MES: 'JULIO',
                        AGENDA: []
                    },
                    {
                        MES: 'AGOSTO',
                        AGENDA: []
                    },
                    {
                        MES: 'SEPTIEMBRE',
                        AGENDA: []
                    },
                    {
                        MES: 'OCTUBRE',
                        AGENDA: []
                    },
                    {
                        MES: 'NOVIEMBRE',
                        AGENDA: []
                    },
                    {
                        MES: 'DICIEMBRE',
                        AGENDA: []
                    }
                ];
            }

            $scope.limpiarForm = function () {
                $scope.jsonCopia = {};
                $scope.formPlanAnual = {
                    BPLN_CODIGO: "",
                    BPLF_FECHA_PLAN: "",
                    BPLF_FECHA_PLAN_DIA: "",
                    BPLF_FECHA_PLAN_MES: "",
                    BPLF_FECHA_PLAN_ANIO: "",
                    BPLV_OBJETIVO: "",
                    BPLV_ALCANCE: "",
                    BPLV_RECURSOS: "",
                    BPLV_METODOS: "",
                    BPLV_VIGENCIA: "",
                    BPLV_ESTADO: "",
                    BPLV_RESPONSABLE: $scope.Rol_Cedula,
                    BPLV_RESPONSABLE_NOMBRE: "",
                    BPLF_FECHA_REGISTRO: "",
                };
                $scope.ArraySoportes = [];
                $scope.ArraySoportesDescargados = [];
                $scope.ArrayRutasDescargadas = [];
                $scope.limpiarSoporte();
                $scope.formAprobarPlan = {
                    BPLN_CODIGO: '',
                    BPLV_RESPONSABLE: '',
                    BPLV_RESPONSABLE_NOMBRE: '',
                    BPLV_RESPONSABLE_APROBACION: '',
                    BPLV_RESPONSABLE_APROBACION_NOMBRE: 'COMITE PRIMARIO DE AUDITORIA INTERNA',
                    BPLV_SOPORTE_PLAN_ANUAL_AUDITORIA: '',
                    BPLV_SOPORTE_ACTA_REUNION: '',
                    BPLV_FECHA_APROBACION: '',
                    ROWNUM: ''
                };

                $scope.tiposAuditoria = [
                    {
                        CODIGO: "I",
                        NOMBRE: "ISO"
                    },
                    {
                        CODIGO: "P",
                        NOMBRE: "Procesos"
                    },
                    {
                        CODIGO: "E",
                        NOMBRE: "Especiales"
                    }
                ];
                $scope.limpiarFormPlanAuditoria();
                $scope.limpiarCalendario();
            }

            $scope.limpiarSoporte = function () {
                $scope.rutaSoporte = '';
                $scope.soporte = {
                    SOPORTE_PLAN_ANUAL_AUDITORIA: "",
                    SOPORTE_ACTA_REUNION: "",
                    SOPORTE_ACTA_MODIFICACION: "",
                    RESPONSABLE: "",
                    RESPONSABLE_NOM: "",
                    FECHA_REGISTRO: ""
                };
            }

            $scope.cancelarPlanAnual = function () {
                $scope.formPlanAnual = {
                    BPLN_CODIGO: "",
                    BPLF_FECHA_PLAN: "",
                    BPLF_FECHA_PLAN_DIA: "",
                    BPLF_FECHA_PLAN_MES: "",
                    BPLF_FECHA_PLAN_ANIO: "",
                    BPLV_OBJETIVO: "",
                    BPLV_ALCANCE: "",
                    BPLV_RECURSOS: "",
                    BPLV_METODOS: "",
                    BPLV_VIGENCIA: "",
                    BPLV_ESTADO: "",
                    BPLV_RESPONSABLE: $scope.Rol_Cedula,
                    BPLV_RESPONSABLE_NOMBRE: "",
                    BPLF_FECHA_REGISTRO: "",
                };
                $scope.tab = 1;
                // setTimeout(() => {
                //     $('#generarTab').click();
                //     $scope.$apply();
                // }, 200);
            }

            $scope.limpiarFormPlanAuditoria = function () {
                $scope.planAuditoria = {
                    BPLN_CODIGO: '',
                    BPLN_RENGLON: '',
                    BPLN_MES: '',
                    BPLC_TIPO_AUDITORIA: '',
                    BPLC_TIPO_AUDITORIA_NOMBRE: '',
                    BPLC_NIVEL: '',
                    BPLC_NIVEL_NOMBRE: '',
                    BPLV_REGIONAL: '',
                    BPLV_REGIONAL_NOMBRE: '',
                    BPLV_PROCESO: '',
                    BPLV_PROCESO_NOMBRE: '',
                    BPLV_PROCESO_NOM: '',
                    BPLV_OBJETIVO: '',
                    BPLV_DOCUMENTO_AUD: '',
                    BPLV_SOPORTE_NORMATIVO: '',
                    BPLV_RESPONSABLE_PROCESO: '',
                    BPLV_OBSERVACION: '',
                    BPLV_ESTADO: '',
                    BPLV_RESPONSABLE: $scope.Rol_Cedula,
                    BPLF_FECHA_REGISTRO: ''
                };
            }

            $scope.selectAnno = function () {
                for (let i = 2022; i <= $scope.SysDay.getFullYear() + 1; i++) {
                    $scope.listadoAnio.push({ 'CODIGO': i });
                }
            }

            $scope.obtenerPermisos = function () {
                swal({ title: 'Consultando permisos...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_OBTENER_ADMINS',
                        cedula: $scope.Rol_Cedula
                    }
                }).then(function ({ data }) {
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        if (data.length > 0) {
                            if (data[0].BPLV_CONSULTA != "S" || data[0].BPLV_ESTADO != "A") {
                                swal({
                                    title: "NOTIFICACION",
                                    text: "¡Usted no cuenta con permisos para acceder a este módulo, favor contactar a la Nacional!",
                                    type: "warning",
                                    showCancelButton: false,
                                    allowOutsideClick: false
                                }).catch(swal.noop)
                                    .then((willDelete) => {
                                        window.location.href = 'app.php#/inicioips';
                                    }).catch(swal.noop);
                            } else {
                                $scope.permisos = data[0];
                                $scope.init();
                            }
                        } else {
                            swal({
                                title: "NOTIFICACION",
                                text: "¡Usted no cuenta con permisos para acceder a este módulo, favor contactar a la Nacional!",
                                type: "warning",
                                showCancelButton: false,
                                allowOutsideClick: false
                            }).catch(swal.noop)
                                .then((willDelete) => {
                                    window.location.href = 'app.php#/inicioips';
                                }).catch(swal.noop);
                        }
                    }
                });

            }

            $scope.validar_form = function (formNombre, formData) {
                document.querySelectorAll(".valid").forEach(e => {
                    e.classList.remove("valid");
                });
                return new Promise((resolve) => {
                    if (formNombre == "plan_anual") {
                        // if (formData.BPLN_CODIGO == undefined || formData.BPLN_CODIGO == null || formData.BPLN_CODIGO == '') {
                        //     resolve({ status: true, msg: "El campo CODIGO es obligatorio" });
                        // }
                        if (formData.BPLV_ALCANCE == undefined || formData.BPLV_ALCANCE == null || formData.BPLV_ALCANCE == '') {
                            resolve({ status: true, msg: "El campo ALCANCE es obligatorio" });
                        }
                        if (formData.BPLF_FECHA_PLAN == undefined || formData.BPLF_FECHA_PLAN == null || formData.BPLF_FECHA_PLAN == '') {
                            resolve({ status: true, msg: "El campo FECHA_PLAN es obligatorio" });
                        }
                        if (formData.BPLV_VIGENCIA == undefined || formData.BPLV_VIGENCIA == null || formData.BPLV_VIGENCIA == '') {
                            resolve({ status: true, msg: "El campo VIGENCIA es obligatorio" });
                        }
                        if (formData.BPLV_RECURSOS == undefined || formData.BPLV_RECURSOS == null || formData.BPLV_RECURSOS == '') {
                            resolve({ status: true, msg: "El campo RECURSOS es obligatorio" });
                        }
                        if (formData.BPLV_METODOS == undefined || formData.BPLV_METODOS == null || formData.BPLV_METODOS == '') {
                            resolve({ status: true, msg: "El campo METODOS es obligatorio" });
                        }
                        resolve({ status: false });
                    }
                    if (formNombre == "PlanAuditoria") {
                        if (formData.BPLN_CODIGO == undefined || formData.BPLN_CODIGO == null || formData.BPLN_CODIGO == '') {
                            resolve({ status: true, msg: "El campo CODIGO es obligatorio" });
                        }
                        // if (formData.BPLN_MES == undefined || formData.BPLN_MES == null || formData.BPLN_MES == '' || formData.BPLN_MES <= 0) {
                        //     resolve({ status: true, msg: "El campo MES es obligatorio" });
                        // }
                        if (formData.BPLC_TIPO_AUDITORIA == undefined || formData.BPLC_TIPO_AUDITORIA == null || formData.BPLC_TIPO_AUDITORIA == '') {
                            resolve({ status: true, msg: "El campo TIPO_AUDITORIA es obligatorio" });
                        }
                        if (formData.BPLC_NIVEL == undefined || formData.BPLC_NIVEL == null || formData.BPLC_NIVEL == '') {
                            resolve({ status: true, msg: "El campo NIVEL es obligatorio" });
                        }
                        if (formData.BPLC_NIVEL == 'R') {
                            if (formData.BPLV_REGIONAL == undefined || formData.BPLV_REGIONAL == null || formData.BPLV_REGIONAL == '') {
                                resolve({ status: true, msg: "El campo REGIONAL es obligatorio" });
                            }
                        }
                        if (formData.BPLV_PROCESO == undefined || formData.BPLV_PROCESO == '') {
                            if (formData.BPLV_PROCESO_NOM == undefined || formData.BPLV_PROCESO_NOM == null || formData.BPLV_PROCESO_NOM == '') {
                                resolve({ status: true, msg: "El campo PROCESO es obligatorio" });
                            }
                        } else {
                            if (formData.BPLV_PROCESO == undefined || formData.BPLV_PROCESO == null || formData.BPLV_PROCESO == '') {
                                resolve({ status: true, msg: "El campo PROCESO es obligatorio" });
                            }
                        }
                        if (formData.BPLV_OBJETIVO == undefined || formData.BPLV_OBJETIVO == null || formData.BPLV_OBJETIVO == '') {
                            resolve({ status: true, msg: "El campo OBJETIVO es obligatorio" });
                        }
                        if (formData.BPLV_DOCUMENTO_AUD == undefined || formData.BPLV_DOCUMENTO_AUD == null || formData.BPLV_DOCUMENTO_AUD == '') {
                            resolve({ status: true, msg: "El campo DOCUMENTO_AUD es obligatorio" });
                        }
                        if (formData.BPLV_SOPORTE_NORMATIVO == undefined || formData.BPLV_SOPORTE_NORMATIVO == null || formData.BPLV_SOPORTE_NORMATIVO == '') {
                            resolve({ status: true, msg: "El campo SOPORTE_NORMATIVO es obligatorio" });
                        }
                        if (formData.BPLV_RESPONSABLE_PROCESO == undefined || formData.BPLV_RESPONSABLE_PROCESO == null || formData.BPLV_RESPONSABLE_PROCESO == '') {
                            resolve({ status: true, msg: "El campo RESPONSABLE_PROCESO es obligatorio" });
                        }
                        // if (formData.BPLV_OBSERVACION == undefined || formData.BPLV_OBSERVACION == null || formData.BPLV_OBSERVACION == '') {
                        //     resolve({ status: true, msg: "El campo OBSERVACION es obligatorio" });
                        // }
                        if (formData.BPLV_ESTADO == undefined || formData.BPLV_ESTADO == null || formData.BPLV_ESTADO == '') {
                            resolve({ status: true, msg: "El campo ESTADO es obligatorio" });
                        }
                        if (formData.BPLV_RESPONSABLE == undefined || formData.BPLV_RESPONSABLE == null || formData.BPLV_RESPONSABLE == '') {
                            resolve({ status: true, msg: "El campo RESPONSABLE es obligatorio" });
                        }
                        let cont = 0;
                        for (let index = 1; index <= $scope.meses; index++) {
                            if (document.getElementById("mes_" + index).checked == false) {
                                cont++;
                            }
                        }
                        if ($scope.showMeses) {
                            if (cont == 12) {
                                resolve({ status: true, msg: "Debe seleccionar al menos 1 mes" });
                            }
                        }


                        resolve({ status: false });
                    }
                });
            }

            $scope.atras = function () {
                $scope.pantalla = 1;
                setTimeout(function () { $scope.$apply() }, 300);
            }

            $scope.nuevaAuditoria = function (mes) {
                $scope.showMeses = true;
                for (let index = 1; index <= 12; index++) {
                    document.getElementById("mes_" + index).checked = false;
                }
                $scope.mesesSeleccionados = [];
                $scope.limpiarFormPlanAuditoria();
                $('#Modal_Agregar_Plan').modal('open');
                $scope.mesSeleccionado = mes;
            }

            $scope.closeModal = function (modal) {
                $(`#${modal}`).modal('close');
                if (modal == "Modal_Agregar_Plan") {
                    $scope.showMeses = true;
                    $scope.limpiarFormPlanAuditoria();
                }
            }

            $scope.nuevoPlanAuditoria = function () {

                let json = JSON.parse(JSON.stringify($scope.planAuditoria));
                json.BPLV_ESTADO = "A";
                json.BPLN_CODIGO = $scope.formPlanAnual.BPLN_CODIGO;
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $scope.validar_form("PlanAuditoria", json).then(function (result) {
                    if (!result.status) {
                        if ($scope.mesesSeleccionados.length > 0 || $scope.showMeses == false) {
                            if ($scope.showMeses) {
                                json.CANT_MESES = $scope.mesesSeleccionados.length;
                                let temp = [];
                                $scope.mesesSeleccionados.forEach(e => {
                                    let json_meses = { "MES": e };
                                    temp.push(json_meses);
                                });
                                json.BPLN_MES = temp;
                                console.log($scope.mesesSeleccionados);
                                if ($scope.mesesSeleccionados.length > 0) {
                                    for (let index = 0; index < $scope.mesesSeleccionados.length; index++) {
                                        let jsonTemp = JSON.parse(JSON.stringify(json));
                                        jsonTemp.BPLN_MES = $scope.mesesSeleccionados[index];
                                        $scope.meses[$scope.mesesSeleccionados[index] - 1].AGENDA.push(jsonTemp);
                                    }
                                }
                            } else {
                                json.CANT_MESES = 1;
                                json.BPLN_MES[json.BPLN_MES]
                            }
                            // swal.close();
                            // $('#Modal_Agregar_Plan').modal('close');
                            $http({
                                method: 'POST',
                                url: "php/auditoriainterna/plan_anual.php",
                                data: {
                                    function: 'P_UI_PLAN_AUDITORIA_DETALLE',
                                    json: JSON.stringify(json)
                                }
                            }).then(function ({ data }) {
                                // 
                                if (data.toString().substring(0, 3) == '<br' || data == 1) {
                                    swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                                } else {
                                    swal({
                                        title: "NOTIFICACION",
                                        text: data.mensaje,
                                        type: data.codigo == 1 ? "success" : "error",
                                    }).catch(swal.noop);
                                }
                                if (data.codigo == 1) {
                                    $('#Modal_Agregar_Plan').modal('close');
                                    $scope.limpiarFormPlanAuditoria();
                                    $scope.consultarAuditorias($scope.formPlanAnual.BPLN_CODIGO);
                                }
                            });
                        } else {
                            swal({
                                title: "¡Notificación!",
                                text: "Debe seleccionar al menos 1 mes",
                                type: "error",
                            }).catch(swal.noop);
                        }

                    } else {
                        swal({
                            title: "¡Notificación!",
                            text: result.msg,
                            type: "error",
                        }).catch(swal.noop);
                    }
                });
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }

            $scope.verPlan = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_DESCARGA_PLAN_AUDITORIA',
                        codigo: $scope.formPlanAnual.BPLN_CODIGO
                    }
                }).then(function ({ data }) {
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        $scope.arrPlanAeAuditorias = data;
                        $scope.formAprobarPlan.BPLV_RESPONSABLE_NOMBRE = $scope.formPlanAnual.BPLV_RESPONSABLE_NOMBRE;
                        $scope.pantalla = 3;
                        swal.close();
                    }
                });
            }

            $scope.verPlanAprobado = function (plan) {
                let f = $scope.stringToDate(plan.BPLF_FECHA_PLAN);
                plan.BPLF_FECHA_PLAN = f;
                $scope.formPlanAnual = plan;
                //$scope.formPlanAnual.BPLF_FECHA_PLAN = $scope.stringToDate(plan.BPLF_FECHA_PLAN)
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_DESCARGA_PLAN_AUDITORIA',
                        codigo: $scope.formPlanAnual.BPLN_CODIGO
                    }
                }).then(function ({ data }) {
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        $scope.arrPlanAeAuditorias = data;
                        $scope.formAprobarPlan.BPLV_RESPONSABLE_NOMBRE = $scope.formPlanAnual.BPLV_RESPONSABLE_NOMBRE;
                        $scope.pantalla = 3;
                        // $('#generarTab').click();
                        $scope.setTab(2);
                        swal.close();
                    }
                });
            }

            $scope.obtenerRegionales = function () {
                if ($scope.arrRegionales == undefined || $scope.arrRegionales.length == 0) {
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'P_OBTENER_REGIONALES',
                        }
                    }).then(function ({ data }) {
                        $scope.arrRegionales = data;
                    });
                }
            }

            $scope.obtenerAreas = function () {
                if ($scope.arrAreas == undefined || $scope.arrAreas.length == 0) {
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'P_OBTENER_AREAS',
                        }
                    }).then(function ({ data }) {
                        $scope.arrAreas = data;
                    });
                }
            }

            $scope.obtenerJefes = function () {
                if ($scope.arrJefes.length == 0) {
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'P_LISTAR_JEFES',
                        }
                    }).then(function ({ data }) {
                        $scope.arrJefes = data;
                    });
                }
            }

            $scope.nombreProcesoAuditar = function (plan) {
                if (plan != undefined && plan != '') {
                    if (plan.BPLV_PROCESO == null || plan.BPLV_PROCESO == '') {
                        return plan.BPLV_PROCESO_NOM.toUpperCase();
                    } else {
                        if ($scope.arrAreas.length > 0) {
                            let area = $scope.arrAreas.filter(obj => {
                                let x = obj.AREN_CODIGO == plan.BPLV_PROCESO;
                                return x ?? "";
                            });
                            if (area.length > 0) {
                                return area[0].AREC_NOMBRE;
                            }
                            return "";
                        } else {
                            return plan.BPLV_PROCESO_NOMBRE;
                        }
                    }
                }
                return '';
            }

            $scope.formatDate = function (date) {
                if (date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    return [day, month, year].join('/');
                }
            }

            $scope.ui_plan_auditoria = function () {
                const json = JSON.parse(JSON.stringify($scope.formPlanAnual));
                // console.log("actual");
                // console.log(json);
                // console.log("copia");
                // console.log($scope.jsonCopia);
                // console.log("**********************************************************");
                // console.log("actual JSON.stringify");
                // console.log(JSON.stringify(json));
                // console.log("copia JSON.stringify");
                // console.log(JSON.stringify($scope.jsonCopia));
                setTimeout(() => {
                    $scope.$apply();
                }, 100);
                if (JSON.stringify($scope.jsonCopia) === JSON.stringify(json)) {
                    $scope.pantalla = 2;
                } else {
                    const fecha = $scope.formatDate($scope.formPlanAnual.BPLF_FECHA_PLAN);
                    json.BPLF_FECHA_PLAN = fecha;
                    json.BPLV_ESTADO = "A";
                    $scope.validar_form("plan_anual", json).then(function (result) {
                        if (!result.status) {
                            swal({ title: 'Cargando...', allowOutsideClick: false });
                            swal.showLoading();
                            $http({
                                method: 'POST',
                                url: "php/auditoriainterna/plan_anual.php",
                                data: {
                                    function: 'P_UI_PLAN_AUDITORIA',
                                    json: JSON.stringify(json)
                                }
                            }).then(function ({ data }) {
                                if (data.toString().substring(0, 3) == '<br' || data == 1) {
                                    swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                                } else {
                                    swal({
                                        title: "NOTIFICACION",
                                        text: data.mensaje,
                                        type: data.codigo == 1 ? "success" : "error",
                                        showCancelButton: false,
                                        allowOutsideClick: false
                                    }).catch(swal.noop)
                                        .then((willDelete) => {
                                            if (data.codigo == 1) {
                                                setTimeout(() => {
                                                    // $scope.pantalla = 2;
                                                    $scope.tab = 1;
                                                    $scope.listarPlanAnualAuditorias();
                                                    $scope.$apply();
                                                }, 300);
                                            }
                                        }).catch(swal.noop);
                                }
                            });
                        } else {
                            swal({
                                title: "¡Notificación!",
                                text: result.msg,
                                type: "error",
                            }).catch(swal.noop);
                        }
                    });

                }
            }

            $scope.listarPlanAnualAuditorias = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_LISTA_PLAN_AUDITORIA',
                    }
                }).then(function ({ data }) {
                    $scope.arrPlanAnualAuditorias = data;
                    swal.close();
                });
            }

            $scope.stringToDate = function (fecha, separador = "/") {
                let partes = fecha.split(separador);
                let dia = parseInt(partes[0], 10);
                let mes = parseInt(partes[1], 10) - 1; // Restar 1 al mes (los meses en JavaScript son de 0 a 11)
                let año = parseInt(partes[2], 10);
                let new_fecha = new Date(año, mes, dia);
                return new_fecha;
            }

            $scope.consultarAuditorias = function (codigo_plan) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $scope.limpiarCalendario();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_LISTA_PLAN_AUDITORIA_DETALLE',
                        codigo: codigo_plan
                    }
                }).then(function ({ data }) {
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        if (data.length > 0) {
                            data.forEach(m => {
                                $scope.meses[parseInt(m.BPLN_MES) - 1].AGENDA.push(m);
                            });
                        }
                    }
                    swal.close();
                });
            }


            $scope.editarPlan = function (plan) {
                if ($scope.permisos.BPLV_MODIFICACION == 'S') {
                    $scope.limpiarCalendario();
                    let json = JSON.parse(JSON.stringify(plan));
                    json.BPLF_FECHA_PLAN = $scope.stringToDate(plan.BPLF_FECHA_PLAN)
                    $scope.jsonCopia = JSON.parse(JSON.stringify(json));
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'P_LISTA_PLAN_AUDITORIA_DETALLE',
                            codigo: json.BPLN_CODIGO
                        }
                    }).then(function ({ data }) {
                        if (data.toString().substring(0, 3) == '<br' || data == 1) {
                            swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                        } else {
                            if (data.length > 0) {
                                data.forEach(m => {
                                    $scope.meses[parseInt(m.BPLN_MES) - 1].AGENDA.push(m);
                                });
                            }
                            $scope.formPlanAnual = json;
                            setTimeout(() => {
                                $('#generarTab').click();
                                $scope.$apply();
                            }, 200);
                            $scope.pantalla = 1;
                            $scope.tab = 2;
                        }
                        swal.close();
                    });
                } else {
                    swal({
                        title: "NOTIFICACION",
                        text: "USTED NO CUENTA CON PERMISOS PARA REALIZAR ESTA OPERACION",
                        type: "error",
                        showCancelButton: false,
                        allowOutsideClick: false
                    });
                }
            }

            $scope.editar = function () {
                $scope.pantalla = 2;
            }

            $scope.nuevoPlanAnual = function () {
                $scope.pantalla = 1;
                setTimeout(() => {
                    $('#generarTab').click();
                    $scope.$apply();
                }, 200);
                $scope.limpiarForm();
            }

            $scope.editarAuditoria = function (auditoria) {
                $scope.showMeses = false;
                $scope.planAuditoria = auditoria;
                $('#Modal_Agregar_Plan').modal('open');
            }

            $scope.descargaExcel = function () {
                window.open('views/auditoriainterna/formatos/AI-FR-01.php?codigo=' + $scope.formPlanAnual.BPLN_CODIGO, '_blank', "width=900,height=1100");
            }

            $scope.aprobarPlan = function (modal) {
                if (modal) {
                    $('#Modal_Aprobar_Plan').modal('open');
                } else {
                    $scope.formAprobarPlan.BPLN_CODIGO = $scope.formPlanAnual.BPLN_CODIGO;
                    if (document.getElementById('BPLV_SOPORTE_PLAN_ANUAL_AUDITORIA').files.length == 0 &&
                        document.getElementById('BPLV_SOPORTE_ACTA_REUNION').files.length == 0) {
                        swal({
                            title: "NOTIFICACION",
                            text: "Debe cargar los soportes requeridos",
                            type: "error",
                        }).catch(swal.noop);
                    } else {
                        if ($scope.formAprobarPlan.BPLV_FECHA_APROBACION != '') {
                            const arrSoportes = [
                                { "NOMBRE": "soporte_plan_anual", "FILE": document.getElementById('BPLV_SOPORTE_PLAN_ANUAL_AUDITORIA').files[0] },
                                { "NOMBRE": "soporte_acta_reunion", "FILE": document.getElementById('BPLV_SOPORTE_ACTA_REUNION').files[0] }
                            ];
                            $scope.subirSoportes(arrSoportes, $scope.formPlanAnual.BPLN_CODIGO).then(function (result) {
                                if (result.status) {
                                    $scope.formAprobarPlan.BPLV_SOPORTE_PLAN_ANUAL_AUDITORIA = result.mensaje[0];
                                    $scope.formAprobarPlan.BPLV_SOPORTE_ACTA_REUNION = result.mensaje[1];
                                    swal({ title: 'Almacenando datos registrados...', allowOutsideClick: false });
                                    swal.showLoading();
                                    // sp_guardar ruta
                                    const json = JSON.parse(JSON.stringify($scope.formAprobarPlan));
                                    json.BPLV_FECHA_APROBACION = $scope.formatDate($scope.formAprobarPlan.BPLV_FECHA_APROBACION);
                                    json.BPLV_RESPONSABLE_APROBACION = $scope.Rol_Cedula;
                                    $http({
                                        method: 'POST',
                                        url: "php/auditoriainterna/plan_anual.php",
                                        data: {
                                            function: 'P_APRUEBA_PLAN_AUDITORIA',
                                            json: JSON.stringify(json)
                                        }
                                    }).then(function ({ data }) {
                                        if (data.toString().substring(0, 3) == '<br' || data == 1) {
                                            swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                                        } else {
                                            swal({
                                                title: "NOTIFICACION",
                                                text: data.mensaje,
                                                type: data.codigo == 1 ? "success" : "error",
                                                showCancelButton: false,
                                                allowOutsideClick: false
                                            }).catch(swal.noop)
                                                .then((willDelete) => {
                                                    if (data.codigo == 1) {
                                                        setTimeout(() => {
                                                            $scope.limpiarForm();
                                                            // $scope.formPlanAnual.BPLV_ESTADO = "P";
                                                            // $scope.verPlan();
                                                            $scope.pantalla = 1;
                                                            $scope.closeModal('Modal_Aprobar_Plan');
                                                            $scope.$apply();
                                                        }, 500);
                                                    }
                                                }).catch(swal.noop);
                                        }
                                    });
                                } else {
                                    swal({
                                        title: "NOTIFICACION",
                                        text: result.mensaje,
                                        type: result.status ? "success" : "error",
                                    }).catch(swal.noop);
                                }
                            });
                        } else {
                            swal({
                                title: "NOTIFICACION",
                                text: "Debe seleccionar la fecha de aprobación",
                                type: "error",
                            }).catch(swal.noop);
                        }
                    }
                }
            }

            $scope.subirSoportes = function (soportes, cod_plan) {
                return new Promise((resolve) => {
                    swal({ title: 'Subiendo los soportes...', allowOutsideClick: false });
                    swal.showLoading();
                    let request = window.XMLHttpRequest
                        ? new XMLHttpRequest()
                        : new ActiveXObject("Microsoft.XMLHTTP");
                    let ajaxUrl =
                        "php/auditoriainterna/plan_anual.php";
                    let form = new FormData();
                    let nombres = [];
                    soportes.map((s) => {
                        form.append("soporte", s.FILE);
                        nombres.push("soporte");
                    });
                    form.append("nombres_soportes", nombres);
                    form.append("plan", cod_plan);
                    form.append('function', 'SUBIR_SOPORTES');
                    request.open("POST", ajaxUrl, true);
                    request.send(form);
                    request.onreadystatechange = function () {
                        if (request.readyState == 4 && request.status == 200) {
                            try {
                                let objData = JSON.parse(request.responseText);
                                if (objData.codigo == 0) {
                                    resolve({ status: true, mensaje: objData.mensaje });
                                } else {
                                    resolve({ status: false, mensaje: objData.mensaje });
                                }
                            } catch (error) {
                                swal({
                                    title: '!NOTIFICACION¡',
                                    type: "error",
                                    text: "Ocurrio un error de comunicacion del servidor, por favor actualice la pagina e intente nuevamente"
                                }).catch(swal.noop);
                                resolve({ status: false, mensaje: error });
                            }
                        }
                    }
                });
            }

            $scope.editarAprobado = function () {
                swal({
                    title: `
                    Para realizar la modificación 
                    debe cargar un acta que lo soporte
                    `,
                    html: `
                    <div class="col s6 no-padding label-new m-b">
                        <input type="file" class="cutom-input-file" id="SOPORTE_ACTA_MODIFICACION"
                            id="BPLV_SOPORTE_ACTA_REUNION" accept=".pdf">
                    </div>
                    `,
                    // input: 'file',
                    // inputPlaceholder: 'Acta de modificación',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    width: 'auto',
                    preConfirm: function () {
                        return new Promise(function (resolve) {
                            let file = document.getElementById("SOPORTE_ACTA_MODIFICACION").files;
                            if (file.length > 0) {
                                resolve(file[0]);
                            } else {
                                resolve();
                            }
                        })
                    }
                }).then(function (result) {
                    if (result != undefined && result != null) {
                        let currenTime = new Date().toLocaleTimeString();
                        currenTime = currenTime.replaceAll(':', '_');
                        const arrSoportes = [
                            { "NOMBRE": "soporte_acta_modificacion_" + currenTime, "FILE": result }
                        ];
                        $scope.subirSoportes(arrSoportes, $scope.formPlanAnual.BPLN_CODIGO).then(function (result) {
                            if (result.status) {
                                let json = {
                                    BPLN_CODIGO: $scope.formPlanAnual.BPLN_CODIGO,
                                    BPLV_RESPONSABLE: $scope.Rol_Cedula,
                                    BPLV_SOPORTE_ACTA_MODIFICACION: result.mensaje[0],
                                };
                                swal({ title: 'Actualizando el registros...', allowOutsideClick: false });
                                swal.showLoading();
                                $http({
                                    method: 'POST',
                                    url: "php/auditoriainterna/plan_anual.php",
                                    data: {
                                        function: 'P_I_ACTA_MODIFICACION',
                                        json: JSON.stringify(json)
                                    }
                                }).then(function ({ data }) {
                                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                                    } else {
                                        $scope.jsonCopia = JSON.parse(JSON.stringify($scope.formPlanAnual));
                                        $scope.jsonCopia.BPLV_ESTADO = "A";
                                        $scope.formPlanAnual.BPLV_ESTADO = "A";
                                        $scope.limpiarCalendario();
                                        $http({
                                            method: 'POST',
                                            url: "php/auditoriainterna/plan_anual.php",
                                            data: {
                                                function: 'P_LISTA_PLAN_AUDITORIA_DETALLE',
                                                codigo: $scope.formPlanAnual.BPLN_CODIGO
                                            }
                                        }).then(function ({ data }) {
                                            if (data.toString().substring(0, 3) == '<br' || data == 1) {
                                                swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                                            } else {
                                                if (data.length > 0) {
                                                    setTimeout(() => {
                                                        data.forEach(m => {
                                                            $scope.meses[parseInt(m.BPLN_MES) - 1].AGENDA.push(m);
                                                        });
                                                        $scope.$apply();
                                                    }, 200);
                                                }
                                            }
                                        });
                                        setTimeout(() => {
                                            // $scope.formPlanAnual.BPLV_ESTADO = "A";
                                            $scope.editar();
                                            swal.close();
                                            $scope.$apply();
                                        }, 500);
                                    }
                                });
                            } else {
                                swal({
                                    title: "NOTIFICACION",
                                    text: result.mensaje,
                                    type: result.status ? "success" : "error",
                                }).catch(swal.noop);
                            }
                        });
                    } else {
                        swal({
                            title: "Mensaje",
                            text: "¡Debe cargar el soporte para continuar!",
                            type: "warning",
                        }).catch(swal.noop);
                    }
                })
            }

            $scope.verhistoricoSoportes = function (plan) {
                $scope.limpiarSoporte();
                swal({ title: 'Consultando Historico...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_LISTA_SOPORTES_HISTORICO',
                        codigo: plan.BPLN_CODIGO
                    }
                }).then(function ({ data }) {
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        $('#Modal_Historico_Soportes').modal('open');
                        $scope.ArraySoportes = data;
                        swal.close();
                    }
                });
            }

            $scope.obtenerSoporte = function (ruta) {
                var soporteEncontrado = $scope.ArraySoportesDescargados.find(function (r) {
                    return r === ruta;
                });
                if (soporteEncontrado == undefined || soporteEncontrado == null) {
                    swal({ title: 'Buscando el soporte..', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/auditoriainterna/plan_anual.php",
                        data: {
                            function: 'DESCARGAR_SOPORTE',
                            ruta: ruta
                        }
                    }).then(function ({ data }) {
                        if (data.toString().substring(0, 3) == '<br' || data == 1) {
                            swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                        } else {
                            swal.close();
                            $scope.rutaSoporte = 'https://192.168.52.5/genesis/temp/' + data;
                            $scope.ArraySoportesDescargados.push(ruta);
                            let r = { id: ruta, ruta: $scope.rutaSoporte };
                            $scope.ArrayRutasDescargadas.push(r)
                        }
                    });
                } else {
                    let rutaEncontrada = $scope.ArrayRutasDescargadas.find((s) => s.id == ruta);
                    $scope.rutaSoporte = rutaEncontrada.ruta;
                }
            }

            $scope.removerAuditoria = function (auditoria, agenda) {
                swal({ title: 'Removiendo el registro', allowOutsideClick: false });
                swal.showLoading();
                let json = JSON.parse(JSON.stringify(auditoria));
                json.BPLV_ESTADO = "I";
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/plan_anual.php",
                    data: {
                        function: 'P_UI_PLAN_AUDITORIA_DETALLE',
                        json: JSON.stringify(json)
                    }
                }).then(function ({ data }) {
                    // 
                    if (data.toString().substring(0, 3) == '<br' || data == 1) {
                        swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
                    } else {
                        swal({
                            title: "NOTIFICACION",
                            text: data.codigo == 1 ? "Auditoria Removida" : data.mensaje,
                            type: data.codigo == 1 ? "success" : "error",
                        }).catch(swal.noop);
                    }
                    if (data.codigo == 1) {
                        let index = agenda.indexOf(auditoria);
                        if (index !== -1) {
                            let mes = parseInt(auditoria.BPLN_MES);
                            $scope.meses[mes - 1].AGENDA.splice(index, 1);
                        }
                    }
                });
            }

            $scope.selectMes = function (id) {
                let mes = document.getElementById("mes_" + id);
                mes = !mes.checked;
                let mesElegido = $scope.mesesSeleccionados.find((s) => s == id);
                if (mesElegido == undefined || mesElegido == null) {
                    $scope.mesesSeleccionados.push(id)
                } else {
                    $scope.mesesSeleccionados = $scope.mesesSeleccionados.filter(s => s !== id);
                }
            }
        }
    ])