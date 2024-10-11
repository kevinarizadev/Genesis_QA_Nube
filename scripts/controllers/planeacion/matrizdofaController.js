'use strict';
angular.module('GenesisApp')
    .controller('matrizdofaController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
        $scope.Inicio = function () {
            $scope.debilidades = "";
            $scope.Oportunidades = "";
            $scope.Fortaleza = "";
            $scope.Amenazas = "";
            $scope.fileDOFA = "";
            $scope.datosDebilidades = [];
            $scope.datosOportunidades = [];
            $scope.datosAmenazas = [];
            $scope.datosFortaleza = [];
            $scope.totalPreguntas = 0;
            $scope.sysDay = new Date();
            $scope.visibilidadD = false;
            $scope.visibilidadO = false;
            $scope.visibilidadF = false;
            $scope.visibilidadA = false;
            $scope.cedulaSesion = sessionStorage.getItem('cedula');
            $('.tabs').tabs();
        }

        $scope.abrirDebilidades = function(){
            if ($scope.datosDebilidades.length >= 1) {
                $scope.visibilidadD = !$scope.visibilidadD;
                let iconoD = document.getElementById("iconDebilidades");
                if ($scope.visibilidadD == true) {
                    iconoD.classList.replace("icon-up-open","icon-down-open");
                }else if($scope.visibilidadD == false){
                    iconoD.classList.replace("icon-down-open","icon-up-open");
                }
                
            }
               }

        $scope.abrirOportunidades = function(){
            if ($scope.datosOportunidades.length >= 1) {
                $scope.visibilidadO = !$scope.visibilidadO;
                let iconoO = document.getElementById("iconOportunidades");
                if ($scope.visibilidadO == true) {
                    iconoO.classList.replace("icon-up-open","icon-down-open");
                } else {
                    iconoO.classList.replace("icon-down-open","icon-up-open");
                }        
            }
               }

        $scope.abrirFortaleza = function(){
            if ($scope.datosFortaleza.length >= 1) {
                $scope.visibilidadF = !$scope.visibilidadF;
                let iconoF = document.getElementById("iconFortaleza");
                if ($scope.visibilidadF) {
                    iconoF.classList.replace("icon-up-open","icon-down-open");               
                } else {
                    iconoF.classList.replace("icon-down-open","icon-up-open");
                }
            }
                }
        $scope.abrirAmenazas = function(){
            if ($scope.datosAmenazas.length >= 1) {
                $scope.visibilidadA = !$scope.visibilidadA;
                let iconoA = document.getElementById("iconAmenazas");
                if ($scope.visibilidadA == true) {
                    iconoA.classList.replace("icon-up-open","icon-down-open");               
                } else {
                    iconoA.classList.replace("icon-down-open","icon-up-open");
                }
            }
                }

        $scope.validarCampos = function (codigo) {
            if ($scope.debilidades == "" && codigo == "D") {
                swal({
                    title: "Campos Obligatorios",
                    text: "Por favor complete el campo de Debilidades(*)",
                    type: "info",
                })
            } else if ($scope.Oportunidades == "" && codigo == "O") {
                swal({
                    title: "Campos Obligatorios",
                    text: "Por favor complete el campo de Oportunidades(*)",
                    type: "info",
                })
            } else if ($scope.Fortaleza == "" && codigo == "F") {
                swal({
                    title: "Campos Obligatorios",
                    text: "Por favor complete el campo de Fortaleza(*)",
                    type: "info",
                })
            } else if ($scope.Amenazas == "" && codigo == "A") {
                swal({
                    title: "Campos Obligatorios",
                    text: "Por favor complete el campo de Amenazas(*)",
                    type: "info",
                })
            } else {

                    if (codigo == "D" && $scope.datosDebilidades.length < 5) {
                        $scope.datosDebilidades.push($scope.debilidades);
                        $scope.visibilidadD = true;             
                        $scope.debilidades = "";
                 
                    } else if(codigo == "D" && $scope.datosDebilidades.length > 4){
                          swal({
                            title: "No permitido",
                            text: "Tiene permitido ingresar maximo 5 debilidades",
                            type: "info",
                        })
                        
                    } if (codigo == "O" && $scope.datosOportunidades.length < 5) {
                        $scope.datosOportunidades.push($scope.Oportunidades);
                        $scope.visibilidadO = true;
                        $scope.Oportunidades = "";
                        
                    } else if(codigo == "O" && $scope.datosOportunidades.length > 4) {
                          swal({
                            title: "No permitido",
                            text: "Tiene permitido ingresar maximo 5 Oportunidades",
                            type: "info",
                        })
                    
                    } if (codigo == "F" && $scope.datosFortaleza.length < 5) {
                        $scope.datosFortaleza.push($scope.Fortaleza);
                        $scope.visibilidadF = true;
                        $scope.Fortaleza = "";

                    } else if(codigo == "F" && $scope.datosFortaleza.length > 4){
                        swal({
                            title: "No permitido",
                            text: "Tiene permitido ingresar maximo 5 Fortaleza",
                            type: "info",
                        })
                    } if (codigo == "A" && $scope.datosAmenazas.length < 5) {
                        $scope.datosAmenazas.push($scope.Amenazas);
                        $scope.visibilidadA = true;
                        $scope.Amenazas = "";

                    } else if(codigo == "A" && $scope.datosAmenazas.length > 4){
                           swal({
                            title: "No permitido",
                            text: "Tiene permitido ingresar maximo 5 Amenazas",
                            type: "info",
                        })
                    }
            }
        }

        $scope.eliminar = function(valor, codigo){
            if (codigo == "D"){
                $scope.datosDebilidades.forEach((el,index) =>{
                    if (el == valor) {
                        $scope.datosDebilidades.splice([index],1);
                    }
                })
            } else if(codigo == "O"){
                $scope.datosOportunidades.forEach((el,index) =>{
                    if (el == valor) {
                        $scope.datosOportunidades.splice([index],1);
                    }
                })
            } else if(codigo == "F"){
                $scope.datosFortaleza.forEach((el,index) => {
                    if (el == valor) {
                        $scope.datosFortaleza.splice([index],1);
                        }
                })
            }else if(codigo == "A"){
                $scope.datosAmenazas.forEach((el,index) => {
                    if (el == valor) {
                        $scope.datosAmenazas.splice([index],1);
                        }
                })
            }
        }

        // PDF CARGAR
        const codigoDOFA = "MA_DOFA";
        document.querySelector('#fileDOFA').addEventListener('change', function (e) {
            $scope.soporte_FL = "";
            setTimeout(() => { $scope.$apply(); }, 500);
            var files = e.target.files;
            if (files.length != 0) {
                const x = files[0].name.split('.');
                if (x[x.length - 1].toUpperCase() == 'PDF') {
                    if (files[0].size < 15485760 && files[0].size > 0) {
                        $scope.getBase64(files[0]).then(function (result) {
                            $scope.soporte_FL = result;
                            setTimeout(function () { $scope.$apply(); }, 300);
                        });
                    } else {
                        document.querySelector('#fileDOFA').value = '';
                        swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                    }
                } else {
                    document.querySelector('#fileDOFA').value = '';
                    swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
                }
            }
        });

        $scope.getBase64 = function (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        $scope.cargarBase64 = function () {
            return new Promise((resolve) => {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/matrizdofa.php",
                        data: { function: "generarbase", codigoDofa: codigoDOFA, base64: $scope.soporte_FL }
                    }).then(function ({ data }) {
                        if (data.toString().substr(0, 3) != '<br') {
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    })
            });
        }

        $scope.guardarDOFA = function () {
            if($scope.datosDebilidades.length == 0 || $scope.datosAmenazas.length == 0 || $scope.datosFortaleza.length == 0 || $scope.datosOportunidades.length == 0) {
                swal({
                    title: "Campos Obligatorios",
                    text: "Por favor complete los campos vacios",
                    type: "info",
                })
            } else {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                    });
                $scope.cargarBase64().then((result) => {
                $scope.totalPreguntas = ($scope.datosDebilidades.length + $scope.datosAmenazas.length + $scope.datosFortaleza.length + $scope.datosOportunidades.length);
                var json = [];

                $scope.datosDebilidades.forEach(element => {
                    json.push({ CODIGO: 'D', OBSERVACION: element })
                });
                $scope.datosOportunidades.forEach(element => {
                    json.push({ CODIGO: 'O', OBSERVACION: element })
                });
                $scope.datosFortaleza.forEach(element => {
                    json.push({ CODIGO: 'F', OBSERVACION: element })
                });
                $scope.datosAmenazas.forEach(element => {
                    json.push({ CODIGO: 'A', OBSERVACION: element })
                }); 
                setTimeout(() => {
                    $http({
                        method: 'POST',
                        url: "php/planeacion/matrizdofa.php",
                        data: {
                            function: "p_ui_dofa",
                            cedula: $scope.cedulaSesion,
                            datos: JSON.stringify(json),
                            cantidad: $scope.totalPreguntas,
                            ruta: result == false ? "" : result
                        }
                    }).then( function(response){
                            if (response.data == 0) {
                                swal({
                                    title: "Guardado",
                                    text: "Se ha cargado exitosamente los datos",
                                    type: "success",
                                })
                                document.querySelector("#inputFilePlaceHolderMasive").value = "";
                                $scope.Inicio()
                            }else if(response.data.Codigo == 1){
                                swal({
                                    title: "Informacion",
                                    text: response.data.Nombre,
                                    type: "info",
                                })
                            }
                    })
                }, 1500);
                })
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