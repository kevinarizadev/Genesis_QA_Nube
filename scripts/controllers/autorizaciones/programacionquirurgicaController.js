'use strict';
angular.module('GenesisApp').controller('programacionquirurgicaController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
    function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {

      $(document).ready(function () {
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
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
        $('#modaldiagnostico').modal();
        $('#modalips').modal();
        $('#modalservicio').modal();
        $('#modalproducto').modal();
        $('#modalespecialidad').modal();
      });
      $scope.buscar_numero = "";
      $scope.buscar_tipo_documento = "";
      $scope.buscar_numero_documento = "";
      // $scope.buscar_tipo_documento = "CC";
      // $scope.buscar_numero_documento = "33065734";
      $scope.verdatosdelafiliado = false;
      $scope.inactivepaso1 = true;
      $scope.inactivepaso2 = false;
      $scope.inactivepaso3 = false;
      $scope.seleccionAnt = "";
      $scope.seleccionAnt2 = "";
      $scope.productosagregadostabI = [];
      $scope.setTab = function (x) {
        $scope.Tap = x;
        setTimeout(function () {
          $scope.$apply();
        }, 500)
        if ($scope.Tap == "2") {
          $scope.verNotificaciones();
        }
      }

      function formatofecha(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return yyyy + '-' + mm + '-' + dd; //+' '+hh+':'+mi+':00';
      }

      $scope.fechaactual = new Date().toISOString().split('T')[0];
        var fechainiial = new Date();
        fechainiial.setDate(fechainiial.getDate() - 90);
        var dd = ('0' + fechainiial.getDate()).slice(-2);
        var mm = ('0' + (fechainiial.getMonth() + 1)).slice(-2);
        var yyyy = fechainiial.getFullYear();
        $scope.fechaminima = yyyy + '-' + mm + '-' + dd;
      $scope.verfecha1 = function () {
          $scope.solicitudfechaorden = formatofecha($scope.solicitud.fechaorden);
      }
      $scope.verfecha2 = function () {
          $scope.solicitudfechaprogramacion = formatofecha($scope.solicitud.fechaprogramacion);
      }

      $scope.solicitud = {
        tipodocumento: '',
        documento: '',
        correo: '',
        celular: '',
        altocosto: '',
        nombre: '',
        dxprincipal: '',
        diagnostico1_nombre: '',
        dxsecundario: '',
        diagnostico2_nombre: '',
        codips: '',
        nombreips: '',
        codipsasignada: '',
        nombreipsasignada: '',
        contrato: '',
        contratodocumento: '',
        contratoubicacion: '',
        codservicio: '',
        nombreservcio: '',
        fechaorden: '',
        fechaprogramacion: '',
        origen: '',
        tiposervicio: '',
        ubipaciente: '',
        medico: '',
        codespecialidad: '',
        especialidadmedico: '',
        observacion: '',
        ruta: '',
        ftp: '',
        observacionips: '',
      }
      $scope.adjunto = null;
      $scope.nombrearchivo = '';
      document.getElementById('anexo2adj').value = null;
      $scope.formatDate = function (date) {
        var d = new Date(date);
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var mi = d.getMinutes();
        return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
      }

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: { function: 'obtenerOrigenes' }
      }).then(function (response) {
        $scope.listaOrigenatencion = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: { function: 'obtenerTipoServicio' }
      }).then(function (response) {
        $scope.listTipoServicio = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: { function: 'obtenerUbicacionSolicitud' }
      }).then(function (response) {
        $scope.listUbicaciones = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'ObtenerEspecialidades' }
      }).then(function (response) {
        $scope.listEspecialidades = response.data;
      })
      $scope.buscarAfiliado = function (tipodocumento, documento) {
        $scope.infoafiliadoaut = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/programacionquirurgica.php",
          data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
        }).then(function (response) {
          if (response.data.CODIGO != "0") {
            $scope.verdatosdelafiliado = true;
            $scope.deshabilitarcampo = true;
            $scope.deshabilitarcampo1 = true;
            $scope.infoafiliadoaut = response.data;
            $scope.afirownumI = 1;
            if ($scope.infoafiliadoaut.SINIESTRO == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            if ($scope.infoafiliadoaut.TUTELA == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            if ($scope.infoafiliadoaut.PORTABILIDAD == 'S') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            if ($scope.infoafiliadoaut.GESTION_RIESGO == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            if ($scope.infoafiliadoaut.ERROR_50 == 'true') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            if ($scope.infoafiliadoaut.AFIC_T045 == 'S') {
              $scope.afirownumI = $scope.afirownumI + 1;
            }
            $scope.edadafiliado = $scope.calcularEdad($scope.infoafiliadoaut.FechaNacimiento);
          } else {
            $scope.verdatosdelafiliado = false;
            $scope.deshabilitarcampo = false;
            $scope.deshabilitarcampo1 = false;
            swal('Importante', response.data.NOMBRE, 'info');
          }
        });
      }

      $scope.calcularEdad = function (fechanacimiento) {
        var birthday_arr = fechanacimiento.split("/");
        var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970) + ' Años';
      }
      $scope.cancelartodo = function () {
        $scope.verdatosdelafiliado = false;
        $scope.deshabilitarcampo = false;
        $scope.deshabilitarcampo1 = false;
        $scope.buscar_tipo_documento = "";
        $scope.buscar_numero_documento = "";
      }

      $scope.openmodals = function (tipo) {
        switch (tipo) {
          case 'diagnostico':
            $("#modaldiagnostico").modal("open");
            setTimeout(() => {
              $('#modaldiagnostico #diaginput').focus();
            }, 100);
            break;
          case 'ips':
            $("#modalips").modal("open");
            setTimeout(() => {
              $('#modalips #ipsinput').focus();
            }, 100);
            break;
          case 'producto':
            $("#modalproducto").modal("open");
            setTimeout(() => {
              $('#modalproducto #proinput').focus();
            }, 100);
            break;
          case 'modalservicio':
            if ($scope.solicitud.contrato == '' || $scope.solicitud.contrato == null) {
              swal('Importante', 'El contrato no puede estar vacio!', 'info');
            } else {
              $("#modalservicio").modal("open");
              setTimeout(() => {
                $('#modalservicio #servinput').focus();
              }, 100);
            }
            break;
          case 'modalespecialidad':
            $("#modalespecialidad").modal("open");
            setTimeout(() => {
              $('#modalespecialidad #especialidadinput').focus();
            }, 100);
            break;
          default:
        }
      }

      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'diagnostico':
            $("#modaldiagnostico").modal("close");
            break;
          case 'ips':
            $("#modalips").modal("close");
            break;
          case 'producto':
            $("#modalproducto").modal("close");
            break;
          case 'modalservicio':
            $("#modalservicio").modal("close");
            break;
          case 'modalespecialidad':
            $("#modalespecialidad").modal("close");
            break;
          case 'modaldetalle':
            $("#modaldetalle").modal("close");
            break;

          default:
        }
      }
      $scope.buscard1 = null;
      $scope.buscarDiagnostico = function (diag) {
        if (diag == "" || diag == undefined) {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        } else {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
              function: 'obtenerDiagnostico', codigo: diag,
              sexo: $scope.infoafiliadoaut.Sexo == 'FEMENINO' ? 'F':'M',
              edad: $scope.infoafiliadoaut.EdadDias,
            }

          }).then(function (response) {
            $scope.listDiagnosticos = [];
            if (response.data["0"].Codigo == '-1') {
              swal('Importante', response.data["0"].Nombre, 'info');
            } else if (response.data["0"].Codigo == '0') {
              swal('Importante', 'Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico', 'info');
            } else {
              $scope.listDiagnosticos = response.data;
            }
          })
        }
      }
      $scope.seleccionardiagnostico = function (data, tipo) {
        var text = "";
        if (tipo == 'P') {
          $scope.solicitud.dxprincipal = data.Codigo;
          $scope.solicitud.diagnostico1_nombre = data.Nombre;
          text = 'Principal';
        } else {
          $scope.solicitud.dxsecundario = data.Codigo;
          $scope.solicitud.diagnostico2_nombre = data.Nombre;
          text = 'Secundario';
          $scope.closemodals('diagnostico');
        }
        swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
      }

      $scope.buscarIps = function (ips) {
        if (ips != "" || ips != undefined) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'obtenerListadoIps', coincidencia: ips }
          }).then(function (response) {
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'IPS no encontrada', 'info');
              $scope.inactivebarraips = true;
            } else {
              $scope.listIps = response.data;
              $scope.inactivebarraips = false;
            }
          })
        } else {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        }
      }
      $scope.seleccionarips = function (data, tipo) {
        var text = '';
        if (tipo == 'S') {
          $scope.solicitud.codips = data.Codigo;
          $scope.solicitud.nombreips = data.Nombre;
          text = 'Ips Solicitante.';
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        } else {
          $scope.solicitud.codipsasignada = data.Codigo;
          $scope.solicitud.nombreipsasignada = data.Nombre;
          text = 'Ips Asignada.';
          $scope.obtenerContratos();
          //   $scope.buscarEspecialidades();
          if($scope.solicitud.codips == $scope.solicitud.codipsasignada){
            swal({
              title: 'Justifique el direccionamiento a la misma IPS solicitante',
              showCancelButton: true,
              allowEscapeKey: false,
              allowOutsideClick: false,
              html: '<label styles="font-size: 21px;font-weight: 500;" for="Justificacion">Justificacion</label>',
              type: "info",
              input: 'text',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if(result){
                $scope.closemodals('ips');
                $scope.observacionips = result;
                swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
              }else{
                swal('Importante', 'Debe ingresar la justificacion, Seleccione nuevamente la ips asignada', 'info');
                $scope.solicitud.codipsasignada = "";
                $scope.solicitud.nombreipsasignada = "";
              }
            });
          }else{
            $scope.closemodals('ips');
            swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
          }
        }
      }
      $scope.obtenerContratos = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: 'obtenerContratos',
            nit: $scope.solicitud.codipsasignada,
            regimen: $scope.infoafiliadoaut.Regimen == 'SUBSIDIADO' ? 'S' : 'C'
          }
        }).then(function (response) {
          if (response.data.CODIGO == '1') {
            $scope.listaContratos = [];
            swal('Advertencia', response.data.NOMBRE, 'warning');
          } else {
            $scope.listaContratos = response.data;
            $scope.solicitud.contrato = response.data["0"].NUMERO;
            $scope.solicitud.contratodocumento = response.data["0"].DOCUMENTO;
            $scope.solicitud.contratoubicacion = response.data["0"].UBICACION;
            setTimeout(() => {
              $http({
                method: 'POST',
                url: "php/autorizaciones/programacionquirurgica.php",
                data: { function: 'obtenerServicios', contrato: $scope.solicitud.contrato, documentocontrato: $scope.solicitud.contratodocumento }
              }).then(function (response) {
                $scope.listServicios = response.data;
              })
            }, 500);
          }
        })
      }
      $scope.seleccionarservicio = function (data, tipo) {
        var text = ''
        $scope.solicitud.codservicio = data.CODIGO;
        $scope.solicitud.nombreservcio = data.CODIGO + ' - ' + data.NOMBRE;
        text = 'Servicio Seleccionado Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');
      }
      $scope.seleccionarespecialidad = function (data, tipo) {
        var text = ''
        $scope.solicitud.codespecialidad = data.Codigo;
        $scope.solicitud.especialidadmedico = data.Codigo + ' - ' + data.Nombre;
        text = 'Especialidad Selecionada Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalespecialidad');

      }
      $scope.buscarProducto = function (productobuscar) {
        var tipo = 'N';
        if ($scope.buscarpro.length >= 3) {
          swal({ title: 'Procesando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/autorizaciones/programacionquirurgica.php",
            data: {
              function: 'obtenerProducto',
              regimen: $scope.infoafiliadoaut.Regimen == 'SUBSIDIADO' ? 'S' : 'C',
              contrato: $scope.solicitud.contrato,
              producto: productobuscar,
              clasificacion: $scope.solicitud.codservicio,
              tipo: tipo,
              ubicacion: $scope.solicitud.ubipaciente,
              sexo: $scope.infoafiliadoaut.Sexo == 'FEMENINO' ? 'F':'M',
              edad: $scope.infoafiliadoaut.EdadDias,
              tipodocumentoafiliado: $scope.buscar_tipo_documento,
              documentoafiliado: $scope.buscar_numero_documento,
            }
          }).then(function (response) {
            swal.close();
            $scope.listProductos = [];
            if (response.data["0"].CODIGO == '-1') {
              swal('Importante', response.data["0"].NOMBRE, 'info');
            } else if (response.data["0"].CODIGO == '0') {
              swal('Importante', response.data["0"].NOMBRE, 'info');
            } else {
              $scope.listProductos = response.data;
            }
          })
        } else {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        }
      }

      // -------------------------------------------------------------------------
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.validararchivo = function () {
        $scope.inputFile = document.querySelector('#anexo2adj');
        var archivo = $scope.inputFile.files[0].name.split(".");
        var tamano = $scope.inputFile.files[0].size
        $scope.extensionarchivo = archivo[1];
        if (tamano <= 253600000) { // se valida el tamaño del archivo
          if ($scope.extensionarchivo.toUpperCase() == 'PDF' || $scope.extensionarchivo.toUpperCase() == 'DOC'
            || $scope.extensionarchivo.toUpperCase() == 'JPG' || $scope.extensionarchivo.toUpperCase() == 'PNG') { //se valida el tipo del archivo
            $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
              $scope.archivocargar = result;
            });
          } else {
            swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta', 'warning')
            $scope.nombrearchivo = "";

          }
        } else {
          swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
          $scope.nombrearchivo = "";

        }
      }

      // -------------------------------------------------------------------------------------------
      // !>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SELECCIONAR PRODUCTO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      $scope.seleccionarproducto = function (data) {
        if (data.PGP == 'S') {
          swal({
            title: "Este Producto esta incluido en un pgp desea continuar",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            type: "question"
          }).then(function (resp) {
            if (resp) {
              $scope.seleccionandoelproducto(data);
            } else {
              swal({
                title: "No Completado",
                html: 'Producto  no seleccionado',
                type: 'info',
              });
            }
          });
        } else {
          $scope.seleccionandoelproducto(data);
        }
      }
      $scope.seleccionandoelproducto = function (data) {
        $scope.tempProd = data;
        swal({
          title: 'Ingrese la cantidad',
          input: 'number',
          inputValue: $scope.cantidadinput,
          inputAttributes: {
            min: 1,
            max: 99
          },
          showCancelButton: true
        }).then(function (result) {
          if (result > 0) {
            data.CANTIDAD = result;
            data.CANTIDADN = result;
            data.ENTREGAS = 1;
            if ($scope.productosagregadostabI.length == 0) {
              $scope.productosagregadostabI.push({
                "CODIGO_PRDUCTO": data.CODIGO,
                "NOMBRE_PRDUCTO": data.NOMBRE,
                "SUB_CLASIFICACION": data.SUBCLAS,
                "SUB_CATEGORIA": data.SUBCLASCOD,
                "CANTIDAD": data.CANTIDAD,
                "CANTIDADN": data.CANTIDADN,
                "VALORVER": data.VALOR,
                "VALOR": data.VALOR2,
              });
              //   $scope.productosagregadostabI.push(data);
            } else {
              var comps = 0;
              for (let index = 0; index < $scope.productosagregadostabI.length; index++) {
                const element = $scope.productosagregadostabI[index];
                if (element.CODIGO_PRDUCTO == data.CODIGO) {
                  var sindex = index;
                  comps = 1;
                  break;
                } else {
                  comps = 0;
                }
              }

              if (comps == 0) {
                $scope.productosagregadostabI.push({
                  "CODIGO_PRDUCTO": data.CODIGO,
                  "NOMBRE_PRDUCTO": data.NOMBRE,
                  "SUB_CLASIFICACION": data.SUBCLAS,
                  "SUB_CATEGORIA": data.SUBCLASCOD,
                  "CANTIDAD": data.CANTIDAD,
                  "CANTIDADN": data.CANTIDADN,
                  "VALORVER": data.VALOR,
                  "VALOR": data.VALOR2,
                });
                // $scope.productosagregadostabI.push(data);
              } else {
                $scope.productosagregadostabI[sindex].CANTIDAD = data.CANTIDAD;
                $scope.productosagregadostabI[sindex].CANTIDADN = data.CANTIDAD;
              }
            }
            if ($scope.productosagregadostabI.length == 0) {
              $scope.nofindproductstabI = false;
            } else {
              $scope.nofindproductstabI = true;
            }

            if ($scope.tempProd.SUBCLAS == 'S') {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                  function: 'p_mostrar_hijos_epro_valor',
                  cups: $scope.tempProd.CODIGO,
                  regimen: $scope.solicitud.contratodocumento,
                  contrato: $scope.solicitud.contrato,
                  ubicacion: $scope.solicitud.contratoubicacion,
                }
              }).then(function (res) {
                $scope.listMotivos = res.data;
                $scope.templistMotivos = res.data;
                $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                if ($scope.listMotivos.length > 0) {
                  for (var i = 0; i < $scope.listMotivos.length; i++) {
                    var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                    $scope.array[val] = val;
                  }
                  swal({
                    title: 'Seleccionar Subcategoria',
                    input: 'select',
                    inputOptions: $scope.array,
                    inputPlaceholder: 'Seleccionar',
                    showCancelButton: true,
                    inputValidator: function (value) {
                      return new Promise(function (resolve, reject) {
                        if (value !== '') {
                          resolve();
                        } else {
                          reject('Debes Selecionar una Subcategoria');
                        }
                      });
                    }
                  }).then(function (result) {
                    $scope.tempsubcla = result.split('-');
                    if (result) {
                      const filteredItems = $scope.productosagregadostabI.findIndex(item => item.CODIGO_PRDUCTO == $scope.tempProd.CODIGO);
                      if ($scope.tempsubcla[0] == '99999') {
                        $scope.productosagregadostabI[filteredItems].SUB_CLASIFICACION = 'N';
                      } else {
                        $scope.productosagregadostabI[filteredItems].SUB_CLASIFICACION = 'S';

                        const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                        $scope.productosagregadostabI[filteredItems].SUB_CATEGORIA = filteredMotivos.NUMERO_H;
                        $scope.productosagregadostabI[filteredItems].SUBCLASNOM = filteredMotivos.NOMBRE_H;
                        $scope.productosagregadostabI[filteredItems].VALOR = filteredMotivos.VALOR;
                        $scope.$apply();
                      }
                      swal({
                        title: "Completado",
                        html: 'Producto  y Subcategoria Seleccionados',
                        type: 'success',
                      });

                    }
                  });
                } else {
                  const filteredItems = $scope.productosagregadostabI.findIndex(item => item.CODIGO_PRDUCTO == $scope.tempProd.CODIGO);
                  $scope.productosagregadostabI[filteredItems].SUB_CLASIFICACION = 'N';
                  $scope.$apply();
                  swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
                }


              })

            } else {
              $scope.$apply();
              swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
            }
          } else {
            swal('Importante', 'Cantidad Incorrecta', 'info')
          }
        })
      }

      $scope.eliminarProducto = function (index) {
        $scope.productosagregadostabI.splice(index, 1);
        swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })
      }
      // !>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SELECCIONAR PRODUCTO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      $scope.pasarpagina = function (opcion, accion) {
        switch (opcion) {
          case "paso1":
            if (accion == "back") {
              $scope.inactivepaso1 = true;
              $scope.inactivepaso2 = false;
              $scope.inactivepaso3 = false;
              $scope.titulo1 = { 'background': '#1a2e63' };
              $scope.titulo2 = { 'background': '#949fbd' };
              $scope.titulo3 = { 'background': '#949fbd' };
            }
            if (accion == "next") {
              if ($scope.solicitud.dxprincipal == '') {
                swal("Importante", "Diagnostico 1 no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.dxsecundario == '') {
                swal("Importante", "Diagnostico 2 no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.codips == '') {
                swal("Importante", "Ips no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.codipsasignada == '') {
                swal("Importante", "Ips asignada no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.contrato == '') {
                swal("Importante", "Contrato no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.codservicio == '') {
                swal("Importante", "Servicio no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.fechaorden == '') {
                swal("Importante", "Tiene que seleccionar una fecha de orden", "info");
                return;
              }
              if($scope.solicitud.fechaprogramacion !=''){
                if ($scope.solicitud.fechaprogramacion < $scope.solicitud.fechaorden ) {
                  swal("Importante", "La Fecha de Programacion no puede ser menor a la fecha de la orden", "info");
                  return;
                }
              }

              //   if ($scope.solicitud.origen == '') {
              //     swal("Importante", "Tiene que seleccionar un origen", "info");
              //     return;
              //   } 
              //   if ($scope.solicitud.tiposervicio == '') {
              //     swal("Importante", "Tiene que seleccionar un tipo de servicio", "info");
              //     return;
              //   } 
              //   if ($scope.solicitud.ubipaciente == '') {
              //     swal("Importante", "Tiene que seleccionar una ubicacion", "info");
              //     return;
              //   } 
              if ($scope.solicitud.medico == '') {
                swal("Importante", "Medico no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.codespecialidad == '') {
                swal("Importante", "especialidad no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.observacion.length < 30) {
                swal("Importante", "La observacion debe tener como minimo 30  y maximo 1000 caracteres", "info");
                return;
              }
              if ($scope.archivocargar == null || $scope.archivocargar == "" || $scope.archivocargar == undefined) {
                swal("Importante", "El Adjunto es Obligatorio", "info");
                return;
              }
              $scope.inactivepaso1 = false;
              $scope.inactivepaso2 = true;
              $scope.inactivepaso3 = false;
            }
            break;
          case "paso2":
            if (accion == "finish") {
              $scope.insertarSolicitud();
            }
            break;
          default:
        }
      }

      $scope.insertarSolicitud = function () {
        if ($scope.productosagregadostabI.length > 0) {
          swal({
            title: 'Confirmar',
            text: "¿Esta Seguro de Realizar Esta Solicitud?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              $scope.solicitud.tipodocumento = $scope.buscar_tipo_documento;
              $scope.solicitud.documento = $scope.buscar_numero_documento;
              $scope.solicitud.correo = $scope.infoafiliadoaut.email;
              $scope.solicitud.celular = $scope.infoafiliadoaut.CELULAR;
              $scope.solicitud.altocosto = $scope.infoafiliadoaut.ALTOCOSTO;
            //   var fechadeorden = $scope.formatDate($scope.solicitud.fechaorden);
            //  var fechadeprogramacion = $scope.formatDate($scope.solicitud.fechaprogramacion);
            //   $scope.solicitud.fechaorden = fechadeorden;
            //   $scope.solicitud.fechaprogramacion = fechadeprogramacion;
              $scope.solicitud.observacionips = $scope.observacionips;
              // subir ruta
              if ($scope.archivocargar != null) {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/programacionquirurgica.php",
                  data: {
                    function: 'adjuntos_ftp',
                    achivobase: $scope.archivocargar,
                    ext: $scope.extensionarchivo,
                  }
                }).then(function (response) {
                  console.log(response);
                  $scope.solicitud.ruta = response.data;
                  $scope.solicitud.ftp = 3;
                  var data = JSON.stringify($scope.solicitud);
                  if (($scope.solicitud.ruta != '0 - Error') && ($scope.solicitud.ruta.substr(0, 3) != "<br")) {
                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/programacionquirurgica.php",
                      data: {
                        function: 'P_UI_AUTPRO_QX',
                        accion: 'I',
                        data: data,
                        productos: $scope.productosagregadostabI,
                        cantidadproductos: $scope.productosagregadostabI.length
                      }
                    }).then(function (response) {
                      $scope.resultado = response.data;
                      console.log($scope.resultado);
                      if ($scope.resultado.Codigo == '1') {
                        swal('Exitoso', 'Solicitud Registrada Exitosamente', 'success');
                        // swal('Exitoso', $scope.resultado.Nombre, 'success');
                        $scope.limpiardatos();
                        $scope.pasarpagina('paso1', 'back');
                      } else {
                        swal('Importante', $scope.resultado.Nombre, 'info');
                      }
                    })
                  } else {
                    swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
                  }
                });
              } else {
                swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
              }
            }
          })
        } else {
          swal("Importante", "Por favor Agregue Productos para continuar.", "info");
        }
      }
      $scope.limpiardatos = function () {
        $scope.cancelartodo();
        $scope.afirownumI = 1;
        $scope.verdatosdelafiliado = false;
        $scope.productosagregadostabI = [];
        $scope.solicitud.tipodocumento = "";
        $scope.solicitud.documento = "";
        $scope.solicitud.nombre = "";
        $scope.solicitud.correo = "";
        $scope.solicitud.celular = "";
        $scope.solicitud.altocosto = "";
        $scope.solicitud.dxprincipal = "";
        $scope.solicitud.diagnostico1_nombre = "";
        $scope.solicitud.dxsecundario = "";
        $scope.solicitud.diagnostico2_nombre = "";
        $scope.solicitud.codips = "";
        $scope.solicitud.nombreips = "";
        $scope.solicitud.codipsasignada = "";
        $scope.solicitud.nombreipsasignada = "";
        $scope.solicitud.contrato = "";
        $scope.solicitud.contratodocumento = "";
        $scope.solicitud.contrato = "";
        $scope.solicitud.contratoubicacion = "";
        $scope.solicitud.codservicio = "";
        $scope.solicitud.nombreservcio = "";
        $scope.solicitud.fechaorden = "";
        $scope.solicitud.fechaprogramacion = "";
        $scope.solicitud.origen = "";
        $scope.solicitud.tiposervicio = "";
        $scope.solicitud.ubipaciente = "";
        $scope.solicitud.medico = "";
        $scope.solicitud.codespecialidad = "";
        $scope.solicitud.especialidadmedico = "";
        $scope.solicitud.observacion = "";
        $scope.adjunto = null;
        $scope.nombrearchivo = '';
        document.getElementById('anexo2adj').value = null;

        $scope.listDiagnosticos = [];
        $scope.listIps = [];
        $scope.listaContratos = [];
        $scope.listServicios = [];
        $scope.listProductos = [];
        $scope.solicitudfechaorden="";
        $scope.solicitudfechaprogramacion="";
      }
      //   !<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< gestion de solicitudes quirurgica>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      $scope.funcioncolor = function (x) {
        document.getElementById(x).classList.replace("grey", "default-background");
        if ($scope.seleccionAnt != 0) document.getElementById($scope.seleccionAnt).classList.replace("default-background", "grey");
        $scope.seleccionAnt = x;
      }
      $scope.funcioncolor2 = function (x) {
        document.getElementById(x).classList.replace("grey", "default-background");
        if ($scope.seleccionAnt2 != 0) document.getElementById($scope.seleccionAnt2).classList.replace("default-background", "grey");
        $scope.seleccionAnt2 = x;
      }
      $scope.viewDocument = function (ruta, ftp) {
        if (ftp == 1) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          }).then(function (response) {
            window.open("temp/" + response.data);
          });
        }
      }
      $scope.verNotificaciones = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listadoSolicitudes = [];
        $scope.listadoSolicitudesTemp = [];
        $scope.filtroNotificaciones = '';
        $http({
          method: 'POST',
          url: "php/autorizaciones/programacionquirurgica.php",
          data: { function: 'obtenerSolicitudes', estado: 'A' }
        }).then(function (response) {
          var data = response.data;

          data.forEach(obj => {
            // obj.TOTAL_2 = parseFloat(obj.TOTAL_2);
            obj.TOTAL_2 = Number(obj.TOTAL_2);
          });
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Mensaje", 'No existen solicitudes para mostrar', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.listadoSolicitudes = data;
            $scope.listadoSolicitudesTemp = data;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
            setTimeout(() => { $scope.$apply(); }, 500);
            swal.close();
          } else {
            swal.close();
          }
        })
      }
      $scope.filterByfechapro = function (dato) {
        if (dato == 'S') {
          $scope.listadoSolicitudesTemp = $scope.listadoSolicitudes.filter(function (item) {
            return item.FECHA_PROGRAMACION != null;
          });
        } else {
          $scope.listadoSolicitudesTemp = $scope.listadoSolicitudes.filter(function (item) {
            return item.FECHA_PROGRAMACION == null;
          });
        }
      };
      $scope.filterByAgeRange = function (minDIAS, maxDIAS) {
        $scope.listadoSolicitudesTemp = $scope.listadoSolicitudes.filter(function (item) {
          return item.DIAS >= minDIAS && item.DIAS <= maxDIAS;
        });
      };
      $scope.showAll = function () {
        $scope.listadoSolicitudesTemp = $scope.listadoSolicitudes;
      };

      $scope.filter = function (val) {
        $scope.listadoSolicitudesTemp = $filter('filter')($scope.listadoSolicitudes, val);
        if ($scope.listadoSolicitudesTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.filter_save = val;
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listadoSolicitudesTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.listadoSolicitudesTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.listadoSolicitudesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listadoSolicitudesTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listadoSolicitudesTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }
          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.listadoSolicitudesTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listadoSolicitudesTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listadoSolicitudesTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }
          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.actualizarsolicitud = function (datos) {
        swal({
          title: 'Actualizar Fecha de Programacion',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          html: `<div class="row">
                    <span>Fecha de Programacion</span>
                    <div  style="padding-left: 70px;padding-right: 70px;">
                      <label class="label-new" for="fechainicioupdate">Fecha</label>
                      <input id="fechainicioupdate"  type="date" class="margin border-none white input-w-p gray-input w-100 ng-pristine ng-valid ng-touched">
                    </div>
                  </div>`,
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve([
                $('#fechainicioupdate').val(),
              ])

            });
          }
        }).then((result) => {
          if (result) {
            console.log(result);
            if (result[0]) {
              var fechapro = result[0].split("-")[2] + '/' + result[0].split("-")[1] + '/' + result[0].split("-")[0];
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/autorizaciones/programacionquirurgica.php",
                data: {
                  function: 'ActualizarSolicitud',
                  v_pdocumento: datos.DOCUMENTO,
                  v_pnumero: datos.NUMERO,
                  v_pubicacion: datos.UBICACION,
                  v_pfecha_programacion: fechapro,
                  v_paccion: "U",
                }
              }).then(function (response) {
                console.log(response);
                if (response.data != undefined) {
                  swal.close();
                  if (response.data.Codigo == 0) {
                    swal({
                      title: "Mensaje",
                      text: response.data.Nombre,
                      type: "success",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.verNotificaciones();
                    }, 1000);
                  } else {
                    swal({
                      title: "Mensaje",
                      text: response.data.Nombre,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                }
              });
            } else {
              swal({
                title: "No Completado!",
                text: 'Seleccione Una fecha',
                type: "info"
              })
            }
          }
        })
      }

      $scope.AprobarNegar = function (datos, apr_nieg) {
        swal({
          title: apr_nieg == 'S' ? 'Aprobar Autorizacion' : 'No Pertinente',
          text: apr_nieg == 'S' ? '' : 'Justificacion',
          input: apr_nieg == 'S' ? 'date' : 'text',
          inputPlaceholder: 'Ingrese la Justificacion',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          confirmButtonText: apr_nieg == 'S' ? 'Aprobar' : 'Aceptar',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false,
          type: "info",
        }).then(function (result) {
          if (apr_nieg == 'N' && result == '') {
            swal("Importante", "Tiene que Ingresar una justificacion de anulacion", "info");
            return;
          }
          $http({
            method: 'POST',
            url: "php/autorizaciones/programacionquirurgica.php",
            data: {
              function: 'AprobarNegarSolicitud',
              v_pdocumento: datos.DOCUMENTO,
              v_pnumero: datos.NUMERO,
              v_pubicacion: datos.UBICACION,
              v_pertinencia: apr_nieg,
              v_justificacion_pert: result,
            }
          }).then(function (response) {
            if (response.data.Codigo == "0") {
              setTimeout(() => {
                $scope.verNotificaciones();
              }, 1000);
              if (apr_nieg == 'S') {
                swal({
                  title: 'Exitoso ¿Imprimir Autorizacion?',
                  text: response.data.Nombre,
                  type: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Imprimir',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result) {
                    window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + response.data.Num_Aut + '&ubicacion=' + response.data.Ubicacion, '_blank');
                  }
                });
              } else {
                swal({
                  title: "Mensaje",
                  text: response.data.Nombre,
                  type: "success",
                });
              }
            } else {
              swal({
                title: "Mensaje",
                text: response.data.Nombre,
                type: "warning",
              });
            }
          });
        });
      }





    }]).filter('totalyor', function () {
      return function (input, property) {
        if (input != undefined) {
          function currencyFormat(num) {
            return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          }
          var i = input.length;
          var total = 0;
          while (i--)
            total += input[i][property];
          return currencyFormat(total);
        } else {
          return null;
        }
      }
    })
