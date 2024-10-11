'use strict';
angular.module('GenesisApp').controller('carguecaracterizacion_controller', ['$scope', 'notification', '$http', '$timeout', '$filter', '$q', function ($scope, notification, $http, $timeout, $filter, $q) {
    $(document).ready(function () {
        $scope.init();
    });
    $scope.init = function () {
        $scope.pantalla = 1;
        $scope.nit = sessionStorage.getItem('nit');
        $scope.responsable = sessionStorage.getItem('cedula');
        $scope.anos = [];
        $scope.meses = [];
        $scope.anno = "";
        $scope.mes = "";
        $scope.archivo_salud = "";
        $scope.archivo_vivienda = "";
        $scope.archivo_demanda_efectiva = "";
        $scope.obtenerAnos();
        $scope.radicados = [];
    }

    $scope.obtenerAnos = function () {
        try {
            swal({
                title: 'Obteniendo periodos...', allowOutsideClick: false,
                allowEscapeKey: false,
            });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/salud/cargue_caracterizacion.php",
                data: { function: 'cargaannos' }
            }).then(function ({ data }) {
                $scope.anos = data;
                $scope.anno = data[0].ANNO;
                $scope.obtenerMeses(data[0].ANNO);
                swal.close();
            });
        } catch (error) {
            console.log(error);
            swal('Advertencia', error, 'error');
        }
    }

    $scope.obtenerMeses = function (anno) {
        try {
            $http({
                method: 'POST',
                url: "php/salud/cargue_caracterizacion.php",
                data: { function: 'cargaperiodos', anno: anno ?? $scope.anno }
            }).then(function ({ data }) {
                $scope.meses = data;
                $scope.mes = data[0].IDE;
            })
        } catch (error) {
            console.log(error);
        }
    }

    $scope.setPantalla = function (nueva) {
        $scope.pantalla = nueva;
        if ($scope.pantalla == 2) {
            $scope.p_listar_gestion_consusalud();
        }

    }

    $scope.limpiarDatos = function () {
        document.getElementById('file_salud').value = '';
        document.getElementById('file_vivienda').value = '';
        document.getElementById('archivo_demanda_efectiva').value = '';
        $scope.archivo_salud = '';
        $scope.archivo_vivienda = '';
        $scope.archivo_demanda_efectiva = '';
    }

    $scope.enviar = function () {
        let fileInputs = document.querySelectorAll('.file-input');
        for (const input of fileInputs) {
            if (input.files.length > 0) {
                for (const file of input.files) {
                    if (input.id == 'file_salud') {
                        $scope.archivo_salud = file;
                    }
                    if (input.id == 'file_vivienda') {
                        $scope.archivo_vivienda = file;
                    }
                    if (input.id == 'archivo_demanda_efectiva') {
                        $scope.archivo_demanda_efectiva = file;
                    }
                }
            }
        }
        let formData = new FormData();
        formData.append("function", "enviarDatos");
        formData.append("nit", $scope.nit);
        formData.append("responsable", $scope.responsable);
        formData.append("anno", $scope.anno);
        formData.append("mes", $scope.mes);
        formData.append("salud", $scope.archivo_salud);
        formData.append("vivienda", $scope.archivo_vivienda);
        formData.append("demanda_efectiva", $scope.archivo_demanda_efectiva);
        swal({ title: "Cargando...", allowOutsideClick: false });
        swal.showLoading();
        $http
            .post(
                "php/salud/cargue_caracterizacion.php",
                formData,
                {
                    transformRequest: angular.identity,
                    headers: { "Content-Type": undefined },
                }
            )
            .then(function ({ data }) {
                formData = new FormData();
                if (data.STATUS) {
                    if (data.DATA.ERRORES.length > 0) {
                        $scope.leerArchivos(data.DATA.COMPLETOS);
                        var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                        data.DATA.ERRORES.forEach(function (archivo, i) {
                            list += "<li class='left-align'><div class='collapsible-header red-text'><i class='material-icons'>error</i>" + archivo.NOMBRE_ARCHIVO + "</div><div class='collapsible-body'>";
                            list += "<p style='padding: 1rem;'><span><b>Fila: " + archivo.MSG + "</b>";
                            list += "</div></li>";
                        });
                        data.DATA.COMPLETOS.forEach(function (archivo, i) {
                            list += "<li class='left-align'><div class='collapsible-header green-text'><i class='material-icons'>done</i>" + archivo.NOMBRE_ARCHIVO + "</div><div class='collapsible-body'>";
                            list += "<p style='padding: 1rem;'><span><b>Radicado: " + archivo.RADICADO + "</b>";
                            list += "</div></li>";
                        });
                        swal({
                            title: "Advertencia",
                            width: 800, html: "<b>" + data.MSG + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#188038',
                            // showCancelButton: true,
                            type: "warning"
                        }).then(function (result) {
                            $scope.limpiarDatos();
                        }).catch(swal.noop);
                        $(document).ready(function () {
                            $(".collapsible").collapsible();
                        });
                    } else {
                        $scope.leerArchivos(data.DATA.COMPLETOS);
                        swal({
                            title: '!NOTIFICACION¡',
                            type: data.STATUS ? "success" : "error",
                            text: data.MSG
                            // type: data.MSG[0].Codigo == 1 ? "error" : "success",
                            // text: data.MSG[0].Nombre
                        }).catch(swal.noop);
                    }
                } else {
                    if (typeof data.DATA.length === 'undefined') {
                        swal({
                            title: '!NOTIFICACION¡',
                            type: "error",
                            text: data.MSG
                        }).catch(swal.noop);
                    } else {
                        if (data.DATA.length > 0) {
                            var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                            data.DATA.forEach(function (archivo, i) {
                                list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + archivo.nombre + " <small class='float-right red-text'> Errores: " + archivo.errores.length + "</small>" + "</div><div class='collapsible-body'>";
                                archivo.errores.forEach(function (error, j) {
                                    list += "<p style='padding: 1rem;'><span><b>Fila: " + error.fila + ", Numero de columnas: " + error.num_columnas + "</b>";
                                });
                                list += "</div></li>";
                            });
                            // setTimeout(() => {
                            //     $('.collapsible').collapsible();
                            // }, 500);
                            swal({
                                title: "Advertencia",
                                width: 800, html: "<b>" + data.MSG + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#188038',
                                // showCancelButton: true,
                                type: "warning"
                            }).then(function (result) {
                                $scope.limpiarDatos();
                            }).catch(swal.noop);
                            $(document).ready(function () {
                                $(".collapsible").collapsible();
                            });
                        } else {
                            swal({
                                title: '!NOTIFICACION¡',
                                type: "error",
                                text: data.MSG
                            }).catch(swal.noop);
                        }
                    }
                }
            });
    }

    $scope.p_listar_gestion_consusalud = function () {
        $http({
            method: 'POST',
            url: "php/salud/cargue_caracterizacion.php",
            data: { function: 'p_listar_gestion_consusalud' }
        }).then(function ({ data }) {
            console.log(data);
            $scope.radicados = data;
        });
    }

    $scope.leerArchivos = function (data) {
        // swal({
        //     title: 'Obteniendo periodos...', allowOutsideClick: false,
        //     allowEscapeKey: false,
        // });
        // swal.showLoading();
        $http({
            method: 'POST',
            url: "php/salud/cargue_caracterizacion.php",
            data: { function: 'p_leer_archivo_consusalud', data: data }
        }).then(function ({ data }) {
        });

    }

}])
