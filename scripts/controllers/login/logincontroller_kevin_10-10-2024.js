
'use strict';
angular.module('GenesisApp', ['ngStorage', 'toastr', 'ngDialog', 'chieffancypants.loadingBar'])
  .config(function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  })
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('loginController',
    ['$scope', '$http', '$location', 'ngDialog',
      function ($scope, $http, $location, ngDialog) {
        const valores = window.location.search;
        const urlParams = new URLSearchParams(valores);
        var accesoafi = urlParams.get('accesoafiliados');
        if (accesoafi) {
          $scope.content = 'afiliado';
        } else {
          $scope.content = 'funcionario';
        }
        sessionStorage.clear();
        $scope.content = 'funcionario';
        /**************************Func**************************/
        $scope.loginFunc = function () {
          const pc = new RTCPeerConnection({
            iceServers: []
          });
          pc.createDataChannel("");
          pc.createOffer(pc.setLocalDescription.bind(pc), () => {});
          
          pc.onicecandidate = function(ice) {
            // if (!ice.candidate) return;
            const ipPC = ice.candidate.candidate.split(" ")[4];
            $scope.ipprivada = ipPC;
            console.log($scope.ipprivada);
            $scope.log_acceso_eps($scope.userFunc,$scope.ipprivada);
        }
        setTimeout(() => {
          if ($scope.userFunc == null || $scope.userFunc == "" || $scope.passFunc == null || $scope.passFunc == "") {
            swal('Notificación', 'Ingrese usuario y/o contraseña', 'info').catch(swal.noop);
          } else {
            $scope.openSwalLoading();
            $http({
              method: 'POST',
              url: "php/login/login_new.php",
              data: {
                // function: 'autenticacion_R4',
                function: 'autenticacion',
                json: JSON.stringify({
                  nit: "0",
                  user: $scope.userFunc,
                  pass: $scope.passFunc
                })
              }
            }).then(function ({ data }) {
              if (data.Codigo == "0") {
console.log(data.Sesion);
                var temp_se = JSON.parse(data.Sesion);
                sessionStorage.setItem("cedula", temp_se.cedula);
                sessionStorage.setItem("usuario", $scope.userFunc);
                sessionStorage.setItem("ente_territorial", 'X');
                sessionStorage.setItem("nit", "0");
                sessionStorage.setItem("municipio", temp_se.codmunicipio);
                sessionStorage.setItem("home", "inicio");
                sessionStorage.setItem("nombre", temp_se.nombre);
                sessionStorage.setItem("cargo", temp_se.cargo);
                sessionStorage.setItem("dpto", temp_se.coddepartamento);
                sessionStorage.setItem("video", "1");
                sessionStorage.setItem("rolcod", temp_se.rolcod);
                sessionStorage.setItem("sexo", data.Sexo);
                sessionStorage.setItem("departamento", data.Departamento);
                sessionStorage.setItem("controlpqr", temp_se.pqr);
                sessionStorage.setItem("controlanticipo", temp_se.anticipo);
                sessionStorage.setItem("actualizardatos", temp_se.actualiza_datos);
                window.location.href = 'app.php#/inicio';
              } else {
                var allCookies = document.cookie.split(';');
                for (var i = 0; i < allCookies.length; i++) {
                  document.cookie = allCookies[i] + "=;expires="
                    + new Date(0).toUTCString() + ";path=/;";
                }
                if (data.toString().substr(0, 3) == '<br') {
                  swal('Notificación', data, 'warning').catch(swal.noop);
                } else {
                  swal('Notificación', data.Mensaje, 'warning').catch(swal.noop);
                }
                // $scope.log_acceso($scope.userFunc, "EPS");
              }
            });
          }
        }, 1000);
        }
        $scope.cargar_tipos_documentos = function () {
          
              $scope.tipos_de_documentos = [
                {
                    "Codigo": "CC",
                    "Nombre": "CEDULA DE CIUDADANÍA"
                },
                {
                    "Codigo": "TI",
                    "Nombre": "TARJETA DE IDENTIDAD"
                },
                {
                    "Codigo": "RC",
                    "Nombre": "REGISTRO CIVIL"
                },
                {
                    "Codigo": "CN",
                    "Nombre": "CERTIFICADO NACIDO VIVO"
                },
                {
                    "Codigo": "CE",
                    "Nombre": "CEDULA DE EXTRANJERÍA"
                },
                {
                    "Codigo": "PA",
                    "Nombre": "PASAPORTE"
                },
                {
                    "Codigo": "PE",
                    "Nombre": "PERMISO ESPECIAL DE PERMANENCIA"
                },
                {
                    "Codigo": "AS",
                    "Nombre": "ADULTO SIN IDENTIFICACIÓN"
                },
                {
                    "Codigo": "MS",
                    "Nombre": "MENOR SIN IDENTIFICACIÓN"
                },
                {
                    "Codigo": "SC",
                    "Nombre": "SALVO CONDUCTO"
                },
                {
                    "Codigo": "PT",
                    "Nombre": "PERMISO POR PROTECCIÓN TEMPORAL"
                },
                {
                    "Codigo": "CD",
                    "Nombre": "CARNET DIPLOMATICO"
                },
                {
                    "Codigo": "NU",
                    "Nombre": "NUMERO UNICO"
                },
                {
                    "Codigo": "DE",
                    "Nombre": "DOCUMENTO EXTRANJERO"
                },
                {
                    "Codigo": "NI",
                    "Nombre": "NUMERO DE IDENTIFICACION TRIBUTARIA"
                }
            ];
        }
        $scope.cargar_tipos_documentos();
        $scope.blockFunc = function () {
          swal({
            title: "Mensaje",
            text: "Ingrese el usuario bloqueado:",
            input: "text",
            inputClass: "input-codigo",
            inputValue: "",
            confirmButtonText: "Enviar",
            confirmButtonColor: "#164691",
            cancelButtonText: "Cancelar",
            showCancelButton: true
          }).then(function (result) {
            if (result != "") {
              $scope.openSwalLoading();
              $http({
                method: 'POST',
                url: "php/login/login_new.php",
                data: {
                  function: "desbloquear_funcionario",
                  usuario: result
                }
              }).then(function ({ data }) {
                if (data.codigo == 0) {
                  swal("Notificación", data.mensaje, "success").catch(swal.noop);
                } else {
                  swal("Notificación", data.mensaje, "warning").catch(swal.noop);
                }
              })
            } else {
              swal("Notificación", "El nombre de usuario no puede ser vacio.", "warning").catch(swal.noop);
            }
          }).catch(swal.noop);
        }
        $scope.passRecoveryFunc = function () {
          $scope.dialogrecover = ngDialog.open({
            template: 'recoverpassfunc.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
          });
        }
        /**************************Afiliado**************************/
        $scope.acceptTermsAfil = false;
        if ($location.search().tipo == "afiliado") {
          $scope.afil = true;
        } else {
          $scope.afil = false;
        }
        $scope.loginAfiliado = function () {
          if ($scope.tipoDocumento == null || $scope.tipoDocumento == "" || $scope.userAfil == null || $scope.userAfil == "" || $scope.passAfil == null || $scope.passAfil == "") {
            swal('Notificación', 'Ingrese tipo, número de identificación y/o contraseña', 'info').catch(swal.noop);
            return
          }
          if ($scope.acceptTermsAfil == false) {
            swal('Notificación', 'Debe aceptar haber leido la carta de derecho y deberes', 'info').catch(swal.noop);
            return;
          }
          $scope.openSwalLoading();
          $http({
            method: 'POST',
            url: "php/login/afillogin.php",
            data: {
              json: JSON.stringify({
                tipodoc: $scope.tipoDocumento,
                user: $scope.userAfil,
                pass: $scope.passAfil
              })
            }
          }).then(function ({ data }) {
            if (data.RES == 1) {
              $scope.Acepta_terminos();
              sessionStorage.setItem("home", "inicioafiliados");
              window.location.href = 'app.php#/inicioafiliados';
            } else {
              swal('Notificación', data.MSJ, 'warning').catch(swal.noop);
              // $scope.log_acceso($scope.userAfil, "AFILIADO");
            }
          })
        }
        $scope.Acepta_terminos = function () {
          $http({
            method: 'GET',
            url: "php/login/verificar_lectura.php",
            params: {
              documento: $scope.userAfil,
              confirmacion: $scope.acceptTermsAfil ? 'S' : 'N'
            }
          }).then(function (res) { })
        }
        $scope.passRecoveryAfil = function () {
          $scope.dialogrecover = ngDialog.open({
            template: 'recoverpass.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
          });
          $scope.dialogrecover.closePromise.then(function ({ value }) {
            if (value != "$document") {
              console.log(1)
              $scope.userAfil = value.valueUser;
              $scope.passAfil = value.valuePass;
            }
          });
        }

        /**************************Ips**************************/
        $scope.loginIps = function () {
          if ($scope.nitIps == null || $scope.nitIps == "" || $scope.userIps == null || $scope.userIps == "" || $scope.passIps == null || $scope.passIps == "") {
            swal('Notificación', 'Ingrese nit, usuario y contraseña', 'info').catch(swal.noop);
            return
          }
          $scope.openSwalLoading();
          $http({
            method: 'POST',
            url: "php/login/login_new.php",
            data: {
              function: "autenticacion",
              json: JSON.stringify({
                nit: $scope.nitIps,
                user: $scope.userIps,
                pass: $scope.passIps
              })
            }
          }).then(function (response) {
            if (response.data.Codigo == "0") {
              var temp_se = JSON.parse(response.data.Sesion);
              sessionStorage.setItem("cedula", temp_se.documento);
              sessionStorage.setItem("usuario", $scope.userIps);
              sessionStorage.setItem("nit", parseInt($scope.nitIps));
              sessionStorage.setItem("ente_territorial", temp_se.ente_territorial);
              sessionStorage.setItem("ubicacion", temp_se.ubicacion);
              sessionStorage.setItem("home", "inicioips");
              window.location.href = 'app.php#/inicioips';
            } else if (response.data.Codigo == 1) {
              swal('Notificación', response.data.Mensaje, response.data.tipo).catch(swal.noop);
              // $scope.log_acceso(parseInt($scope.nit), "IPS");
            } else if (response.data.Codigo == 2) {
              /* console.log(562151); */
              swal({
                title: response.data.Mensaje,
                input: 'number',
                inputClass: 'input-codigo',
                inputValue: '',
                inputAttributes: {
                  min: 1,
                  max: 10
                },
                confirmButtonText: "Enviar",
                showCancelButton: true
              }).then(function (result) {
                if (result > 0) {
                  $scope.openSwalLoading();

                  $http({
                    method: 'POST',
                    url: "php/login/login_new.php",
                    data: {
                      function: "verificacion_IPS",
                      json: JSON.stringify({
                        nit: $scope.nitIps,
                        user: $scope.userIps,
                        pass: $scope.passIps,
                        codigo: result
                      })
                    }
                  }).then(function (response) {
                    if (response.data.Codigo == "0") {
                      var sesion = response.data.Sesion;
                      sessionStorage.setItem("cedula", sesion.cedula);
                      sessionStorage.setItem("usuario", sesion.usu);
                      sessionStorage.setItem("nit", sesion.nitIps);
                      sessionStorage.setItem("home", "inicioips");
                      window.location.href = 'app.php#/inicioips';
                    } else {
                      swal('Notificación', response.data.Mensaje, 'warning').catch(swal.noop);
                      // $scope.log_acceso(parseInt($scope.nitIps), "IPS");
                    }
                  })

                } else {
                  swal('Notificación', response.data.Mensaje, response.data.tipo);
                }
              })

            } else if (response.data.Codigo = "3") {
              swal({
                text: response.data.Mensaje,
                type: response.data.tipo,
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Desbloquear con un celular registrado",
                cancelButtonText: "Cerrar"
              }).then(function (response_0) {
                if (response_0 == true) {
                  $scope.openSwalLoading();

                  $http({
                    method: 'POST',
                    url: "php/login/login_new.php",
                    data: {
                      function: "enviarMensajeAlMovil",
                      json: JSON.stringify({
                        nombre: response.data.Nombre,
                        movil: response.data.Celular
                      })
                    }
                  }).then(function (response_1) {
                    if (response_1.data.messages != undefined && response_1.data.messages.length > 0) {
                      swal({
                        title: "Mensaje enviado!",
                        text: "Ingresa el codigo de verificacion enviado al celular del usuario: " + $scope.userIps,
                        input: 'number',
                        inputClass: 'input-codigo',
                        inputValue: '',
                        inputAttributes: {
                          min: 1,
                          max: 10
                        },
                        confirmButtonText: "Enviar",
                        showCancelButton: true
                      }).then(function (result) {
                        if (result > 0) {
                          $scope.openSwalLoading();

                          $http({
                            method: 'POST',
                            url: "php/login/login_new.php",
                            data: {
                              function: "desbloquear_usuario",
                              json: JSON.stringify({
                                nit: $scope.nitIps,
                                cedula: response.data.Cedula,
                                codigo: result
                              })
                            }
                          }).then(function (response_1) {
                            if (response_1.data.Codigo == "0") {
                              swal('Importante', response_1.data.Mensaje, response_1.data.tipo);
                            } else {
                              swal('Notificación', response.data.Mensaje, 'warning').catch(swal.noop);
                            }
                          })
                        } else {
                          swal('Notificación', "Ingrese un codigo de verificacion valido", 'warning').catch(swal.noop);
                        }
                      });
                    } else {
                      swal('Notificación', response.data.Mensaje, 'warning').catch(swal.noop);
                    }
                  })
                }
              });
            }
          })
        }

        /**************************Empresa**************************/
        $scope.loginEmpresa = function () {
          if ($scope.nitEmpr == null || $scope.nitEmpr == "" || $scope.passEmpr == null || $scope.passEmpr == "") {
            swal('Notificación', 'Ingrese nit y/o contraseña', 'info').catch(swal.noop);
            return;
          }
          $scope.openSwalLoading();
          $http({
            method: 'POST',
            url: "php/login/empresalogin.php",
            data: {
              json: JSON.stringify({
                nit: $scope.nitEmpr,
                pass: $scope.passEmpr
              })
            }
          }).then(function (res) {
            if (res.data == "1") {
              sessionStorage.setItem("home", "inicioempresas");
              window.location.href = 'app.php#/inicioempresas';
            } else {
              // $scope.log_acceso($scope.nitempresa, "EMPRESA");
              swal('Notificación', 'Nit y/o contraseña invalida', 'warning').catch(swal.noop);
            }
          })
        }

        // modal de registro de Empresas
        $scope.nuevaempresa = function () {
          $scope.dialogrecover = ngDialog.open({
            template: 'nuevaempresa.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
            closeByEscape: false,
            closeByDocument: false

          });
          $scope.dialogrecover.closePromise.then(function (data) {
            // console.log(data)
          });
        }

        $scope.log_acceso_eps = function(usuario,ipprivada) {
          // $scope.navegador = bowser.name+'_'+bowser.version;
              $http({
                  method: 'POST',
                  url: "php/login/login_new.php",
                  data: {
                      function: "log_de_acceso_funcionario",
                      usuario: usuario,
                      // tipo_dispositivo:$scope.tipo_dispositivo,
                      // navegador:$scope.navegador,
                      ip_dispositivo:$scope.ip_dispositivo,
                      ip_privada:ipprivada
                  }
              }).then(function(response) {

              });
      }

        $scope.log_acceso = function (usuario, tipo_usuario) {
          $scope.navegador = bowser.name + '_' + bowser.version;
          $http({
            method: 'POST',
            url: "php/login/login_new.php",
            data: {
              function: "log_de_acceso",
              usuario: usuario,
              tipousuario: tipo_usuario,
              tipo_dispositivo: $scope.tipo_dispositivo,
              navegador: $scope.navegador,
              ip_dispositivo: $scope.ip_dispositivo
            }
          }).then(function (response) {

          });
        }
        $.getJSON('https://api.ipify.org?format=json', function (data) {
          $scope.ip_dispositivo = data.ip;
        });
        isMobile();
        function isMobile() {
          if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/BlackBerry/i)) {
            $scope.tipo_dispositivo = "Movil";
          } else {
            $scope.tipo_dispositivo = "PC";
          }
        }

        $scope.openSwalLoading = function () {
          swal({
            html: `<div class="loading_swal">
            <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
            <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
            <div class="boob"><img src="./assets/images/icon_humanos.svg" alt="x"></div>
          </div>`,
            width: 200,
            allowOutsideClick: false,
            showConfirmButton: false,
          }).catch(swal.noop);
        }

        var allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++)
          document.cookie = allCookies[i] + "=;expires="
            + new Date(0).toUTCString() + ";path=/;";
      }])
  .directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().replace(/[^0-9]/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('textOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            //var transformedInput = text.toString().replace(/[^a-zñ.]/g, '');
            var transformedInput = text.toString().replace(/[^a-zA-ZñÑ.]/g, '');
            
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('textNumberOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().replace(/\W/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });



