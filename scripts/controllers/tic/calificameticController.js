'use strict';
angular.module('GenesisApp')
    .controller('calificameticController', ['$scope', '$http', '$window', '$filter', 'ngDialog',
        function ($scope, $http, $window, $filter, ngDialog) {
            $(document).ready(function () {
                $scope.datos_acas();
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'TICKET';
                console.log($(window).width());
                if ($(window).width() < 1100) {
                    document.querySelector("#pantalla").style.zoom = 0.7;
                }
                if ($(window).width() > 1100 && $(window).width() < 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.8;
                }
                if ($(window).width() > 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.9;
                }
           
                ///////////////////////////

                $scope.Vista = 0;
                $scope.SysDay = new Date();
                //////////////////////
                $scope.currentPage = 0;
                $scope.pageSize = 15;
                $scope.Listado.Filtro = "";
                $scope.panel = { activo: 1, titulo: "" };
                $scope.acaspordepts = [];
                $scope.Listado.Acas = [];
                ///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            });
            $scope.Listado = {
                Acas: [],
                Filtro: '',
                Titulo: '',
                Url: ''
            };
            $scope.numeromesadeayuda="";
            $scope.calificacionacas="";
            $scope.Comentario_Observacion="";
            $scope.satisfaccionmesadeayuda="";
            $scope.tipoinsatisfaccion="";
            $scope.datos_acas = function () { 
              $scope.Listado.Acas = [];
                $http({
                  method: 'POST',
                  url: "php/tic/calificame.php",
                  data: { function: 'traerdatosmesadeayuda',
                  documento: sessionStorage.getItem('cedula'),
                }
                }).then(function (response) {
                  if (
                    response.data &&
                    response.data.toString().substr(0, 3) != "<br"
                  ) {
                    if (response.data.length > 0) {
                      $scope.Listado.Acas = response.data;
                    } else {
                        swal({
                            title: "Exito",
                            text: "No Tiene Mesas de Ayuda Pendientes Por Calificar",
                            type: "success",
                          })
                    }
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: response.data,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                 
                })
              }

              $scope.calificaracas = function () { 
                  if ($scope.satisfaccionmesadeayuda == "" || $scope.satisfaccionmesadeayuda == undefined || $scope.satisfaccionmesadeayuda == null
                  ){
                      swal({
                          title: "Requerido",
                          text: "Por favor Califique la mesa de ayuda",
                          type: "info",
                        })
                  } else{
                    if($scope.satisfaccionmesadeayuda == "NO"){
                      let longitud = $scope.Comentario_Observacion.length;
                      if($scope.Comentario_Observacion == "" || $scope.Comentario_Observacion == undefined || $scope.Comentario_Observacion == null
                      || longitud < 50
                      ){
                        swal({
                          title: "Requerido",
                          text: "Escriba una observacion minimo de 50 caracteres",
                          type: "info",
                        })
                        return;
                      }
                    }
                    // vubicacion: sessionStorage.getItem('municipio'),
                    $http({
                        method: 'POST',
                        url: "php/tic/calificame.php",
                        data: { function: 'calificarestamesadeayuda',
                          documento: sessionStorage.getItem('cedula'),
                          vubicacion: $scope.ubicacionmesadeayuda,
                        numeroacas: $scope.numeromesadeayuda,
                        calificacion: $scope.calificacionacas,
                        observacion: $scope.Comentario_Observacion,
                        satisfaccion: $scope.satisfaccionmesadeayuda,
                        tipoinsatisfaccion: $scope.tipoinsatisfaccion,
                      }
                      }).then(function (response) {
                        if (
                          response.data &&
                          response.data.toString().substr(0, 3) != "<br"
                        ) {
                          console.log(response.data.Codigo);
                          if(response.data.Codigo == 1){
                              $('#Modal_Calificacion').modal('close');
                              swal({
                                title: "Exito",
                                text: response.data.Nombre,
                                type: "success",
                              });
                              $scope.datos_acas();
                          } else {
                            swal({
                                title: "Aviso",
                                text: response.data.Nombre,
                                type: "info",
                              })
                          }
                        } else {
                          swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning",
                          }).catch(swal.noop);
                        }
                       
                      })
                  }
              }

            $scope.Abrir_Modal_Calificacion = function (acas) {
                $scope.numeromesadeayuda = acas.Numero;
                $scope.ubicacionmesadeayuda = acas.Ubicacion;
                $('#Modal_Calificacion').modal('open');
            }

            $scope.closeModal = function () {
                $('#Modal_Calificacion').modal('close');
            }

            $scope.Estado_Solicitud_Color = function (Estado) {
                if (Estado != undefined) {
                    if (Estado.toString().toUpperCase() == 'A') {
                        return { "background-color": "rgb(251, 93, 1) !important;" }
                    }
                    if (Estado.toString().toUpperCase() == 'P') {
                        return { "background-color": "rgb(6, 152, 20)!important" }
                    }
                }
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
          

            // Paginacion
            $scope.cloneHeadFixed = function () {
                setTimeout(() => {
                    var original = $('#tablaByCN>thead');
                    var clone = $('#tablaByCN>thead').clone();
                    var list = original[0].children[0].children;
                    for (var i = 0; i < list.length; i++) {
                        clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
                    }
                    $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
                }, 500);
            }
            $(".scroll_x").on("scroll", function () {
                $(".scroll_x").scrollLeft($(this).scrollLeft());
            });
            $(window).resize(function () {
                $scope.cloneHeadFixed();
            });

            $scope.getData = function () {
                return $filter('filter')($scope.Listado.Acas, $scope.Listado.Filtro);
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
            $scope.$watch('Listado.Filtro', function (newValue, oldValue) {
                if (oldValue != newValue) {
                    $scope.currentPage = 0;
                }
            }, true);
            $scope.btns_paginacion = function (value) {
                $scope.currentPage = value;
                $scope.cloneHeadFixed();
                //window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });