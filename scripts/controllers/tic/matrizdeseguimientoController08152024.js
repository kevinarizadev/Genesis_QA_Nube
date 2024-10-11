"use strict";angular
  .module("GenesisApp")
  .controller("matrizdeseguimientoController", ["$scope","$http","$window",function ($scope, $http, $window) {
      // *********** FUNCTION DE INICIO *************
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.SysDay = new Date();
        $scope.show_comentarios = false;
        $scope.responsable = sessionStorage.getItem("cedula");
        $scope.function_p_obterner_rol();
        $scope.function_consultaReporte('A');
        $scope.title = 'SEGUIMIENTOS ACTIVOS';
        $scope.show_registroActividades = false;
        $scope.show_buscarActividades = false;
        $scope.selectArea = [];
        $scope.selectResponsable = [];
        $scope.selectSolicitante = [];
        $scope.list_tablaSeguimiento = [];
        $scope.limpiar("form1");
        $scope.limpiar("form2");
        $scope.limpiar("form3");
        $scope.limpiar("form4");
        $scope.soporte_FL = [];
        $('.modal').modal();
        $scope.adjunto1 = "";
        $scope.adjunto2 ="";
        $scope.show_tablaSeguimiento =  true;
      };
      $scope.limpiar = function (accion) {
        switch (accion) {
          case "form1":
            
            document.getElementById("id_form1_soporte_text").value = '',
            document.getElementById("id_form1_soporte").value = '',
            document.getElementById("id_form1_soporteCierre_text").value = '',
            document.getElementById("id_form1_soporteCierre").value = '',
            $scope.form1 = {
              fechaSolicitud:"",
              nombreModulo: "",
              area: "",
              descripcion: "",
      
              fechaInicio: "",
              fechaFinal: "",
              personaSoliciatnte: "",
              recursodataBase: "",
              recursoFront: "",
              recursoDocuemntacion: "",
              soporte: "",
              soporteCierre: "",
            };
            break;
            case "form2":
            $scope.form2 = {
              fechaInicio: "",
              fechaFinal: "",
            };
            break;
            case "form3":
              $scope.form3 = {
                adjunto1 : "",
                adjunto2 : "",
                descripcion : "",
                observacion : "",
                nombreModulo : "",
                documentoaVisualizar : "",
              }; 
              break;
              case "form4":
                document.getElementById("id_form4_soporteCierre_text").value = '',
                document.getElementById("id_form4_soporteCierre").value = '',
                $scope.form4 = {
                  soporte: "",
                  soporteCierre : "",
                  nombreModulo : "",
                  codigoSeguimiento : "",
                  observacion: "",

                }; 
                break;
          default:
        }
      };
      $scope.validar_recursoRepetido = function(){

        if ($scope.form1.recursodataBase === $scope.form1.recursoFront || 
          $scope.form1.recursodataBase === $scope.form1.recursoDocuemntacion || 
          $scope.form1.recursoFront === $scope.form1.recursoDocuemntacion) {
          swal("Importante", "Tienes los recursos repetidos.", "info");
          return
          }
      }

      $scope.function_controlVista = function (info) {
        if(info== 'A'){
          $scope.show_registroActividades = true;
          $scope.show_buscarActividades = false;
          $scope.show_tablaSeguimiento = false;
          $scope.limpiar("form1");
          $scope.function_p_lista_fun_responsable();
          $scope.function_p_lista_area();
          $scope.function_p_lista_responsables();
        }if(info== 'C'){
          $scope.limpiar("form2");
          $scope.show_registroActividades = false;
          $scope.show_buscarActividades = true;
          $scope.show_tablaSeguimiento = false;
        }
      }
      $scope.function_p_obterner_rol = function () {
        $http({
          method: "POST",
          url: "php/tic/matrizdeSeguimiento.php",
          data: {
            function: "P_OBTENER_ROL",
            vpdocumento: $scope.responsable
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data[0].Codigo == 1){
          $scope.show_comentarios = true;
            }else{
             // $scope.selectArea = data;
             $scope.show_comentarios = false;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_p_lista_area = function () {
        $http({
          method: "POST",
          url: "php/tic/matrizdeSeguimiento.php",
          data: {
            function: "P_LISTA_AREA",
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data.Codigo == 1){
              swal({
                title: "INFORMACION",
                text: data.Nombre,
                type: "info",
              }).catch(swal.noop);
            }else{
              $scope.selectArea = data;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_p_lista_responsables = function () {
        $scope.selectResponsable = [];
        $http({
          method: "POST",
          url: "php/tic/matrizdeSeguimiento.php",
          data: {
            function: "P_LISTA_RESPONSABLES",
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data.Codigo == 1){
              swal({
                title: "INFORMACION",
                text: data.Nombre,
                type: "info",
              }).catch(swal.noop);
            }else{
              $scope.selectResponsable = data;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_p_lista_fun_responsable = function () {
        $scope.selectSolicitante = [];
        $http({
          method: "POST",
          url: "php/tic/matrizdeSeguimiento.php",
          data: {
            function: "P_LISTA_FUN_RESPONSABLE",
          },
        }).then(function ({data}) {
          if (data && data.toString().substr(0, 3) != "<br") {
            if(data.Codigo == 1){
              swal({
                title: "INFORMACION",
                text: data.Nombre,
                type: "info",
              }).catch(swal.noop);
            }else{
              $scope.selectSolicitante = data;
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.function_agregarActividad = function () {
        $scope.dateError = '';
       
        if ($scope.form1.fechaInicio && $scope.form1.fechaFinal) {
            if ($scope.form1.fechaFinal < $scope.form1.fechaInicio) {
                $scope.dateError = 'La fecha de cierre no puede ser inferior a la fecha inicio.';
                swal("Importante", "La fecha de cierre no puede ser inferior a la fecha inicio.", "info");
                return
            } 
          }else if ($scope.form1.fechaFinal > $scope.form1.fechaInicio) {
                $scope.dateError = 'La fecha de cierre no puede ser superior a la fecha inicio.';
                swal("Importante", "La fecha de cierre no puede ser superior a la fecha inicio.", "info");
              return           
             }if (!$scope.form1.fechaSolicitud || !$scope.form1.nombreModulo || !$scope.form1.area || !$scope.form1.descripcion || !$scope.form1.fechaInicio ||
           !$scope.form1.personaSoliciatnte) {
            swal("Importante", "Complete los campos requeridos (*) y  seleccione al menos un recurso", "info");
            let elementosAValidar = [
              {
                Codigo: "1",
                id_label: "id_form1_fechaSolicitud_label",
                id_input: "id_form1_fechaSolicitud",
              },
              {
                Codigo: "2",
                id_label: "id_form1_nombreModulo_label",
                id_input: "id_form1_nombreModulo",
              },
              {
                Codigo: "3",
                id_label: "id_form1_area_label",
                id_input: "id_form1_area",
              },
              {
                Codigo: "4",
                id_label: "id_form1_descripcion_label",
                id_input: "id_form1_descripcion",
              },
              {
                Codigo: "5",
                id_label: "id_form1_fechaInicio_label",
                id_input: "id_form1_fechaInicio",
              },
              {
                Codigo: "6",
                id_label: "id_form1_personaSoliciatnte_label",
                id_input: "id_form1_personaSoliciatnte",
              },
            ];
            elementosAValidar.forEach(function (elemento) {
              $scope.validarVacio(elemento.id_input, elemento.id_label);
            });
            return;
          }// Verificar si los campos están vacíos
          if (!$scope.form1.recursodataBase && !$scope.form1.recursoFront && !$scope.form1.recursoDocuemntacion) {
            swal("Importante", "Por favor seleccione al menos un recurso(*)", "info");
            
            const fieldIds = [
                { id: 'id_form1_recursodataBase', label: 'id_form1_recursodataBase_label' },
                { id: 'id_form1_recursoFront', label: 'id_form1_recursoFront_label' },
                { id: 'id_form1_recursoDocuemntacion', label: 'id_form1_recursoDocuemntacion_label' }
            ];
            
            fieldIds.forEach((field, index) => {
                setTimeout(() => {
                    $scope.validarVacio(field.id, field.label);
                    $scope.$apply();
                }, (index + 1) * 1000);

                setTimeout(() => {
                    document.getElementById(field.label).classList.remove("red-text");
                    document.getElementById(field.id).classList.remove("error-input");
                    $scope.$apply();
                }, (index + 1) * 2000);
            });

            return;
          }

          // Verificar si los recursos están repetidos
        //  if (($scope.form1.recursodataBase && $scope.form1.recursodataBase === $scope.form1.recursoFront) || 
       //     ($scope.form1.recursodataBase && $scope.form1.recursodataBase === $scope.form1.recursoDocuemntacion) || 
        //    ($scope.form1.recursoFront && $scope.form1.recursoFront === $scope.form1.recursoDocuemntacion)) {
          //  swal("Importante", "Tienes los recursos repetidos.", "info");
          //  return;
          //}
          else {
            swal({
              title: "IMPORTANTE",
              text: "¿Esta seguro que desea agregar la actividad?",
              type: "question",
              showCancelButton: true,
            }).then((result) => {
              if (result) {
                $http({
                  method: "POST",
                  url: "php/tic/matrizdeSeguimiento.php",
                  data: {
                    function: "P_UI_PROYECTOS_TIC",
                    vparea: $scope.form1.area,
                    vpmodulo: $scope.form1.nombreModulo,
                    vpinicial: $scope.formatDatefecha($scope.form1.fechaInicio),
                    vpfinal: $scope.formatDatefecha($scope.form1.fechaFinal),
                    vpbd: $scope.form1.recursodataBase,
                    vpfront: $scope.form1.recursoFront,
                    vpdocumentacion: $scope.form1.recursoDocuemntacion,
                    vpdescripcion: $scope.form1.descripcion,
                    vpobservacion: $scope.form1.observacion,
                    vpaccion:'I',
                    vpsolicitud: $scope.formatDatefecha($scope.form1.fechaSolicitud),
                    vpsoportes: JSON.stringify($scope.soporte_FL),
                    vpcantsoportes: $scope.cantidadSoporte,
                    vpcodigo:'',
                    vpsolicitante: $scope.form1.personaSoliciatnte,
                  },
                }).then(function ({data}) {
                  if (data && data.toString().substr(0, 3) != "<br") {
                    if(data.Codigo == 1){
                      swal({
                        title: "INFORMACION",
                        text: data.Nombre,
                        type: "info",
                      }).catch(swal.noop);
                    }else{
                      swal({
                        title: "ACTIVIDAD",
                        text: data.Nombre,
                        type: "success",
                      }).catch(swal.noop);
                      setTimeout(() => {
                        $scope.limpiar("form1");
                        $scope.function_controlVista('A');
                        $scope.$apply();
                      }, 1000);
                    }
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: data,
                      type: "warning",
                    }).catch(swal.noop);
                  }
                });
              }
            });
          }
      };
      $scope.function_cierreActividad = function () {
        // if ($scope.form4.fechaFinal == "" || $scope.form4.fechaFinal == undefined || $scope.soporte_FL == '') {
        //   swal("Importante", "Complete los campos requeridos (*)", "info");
        //   let elementosAValidar = [
        //     {
        //       Codigo: "1",
        //       id_label: "id_form4_fechaFinal_label",
        //       id_input: "id_form4_fechaFinal",
        //     },
        //     {
        //       Codigo: "2",
        //       id_label: "id_form4_soporteCierre_label",
        //       id_input: "id_form4_soporteCierre_text",
        //     }
        //   ];
        //   elementosAValidar.forEach(function (elemento) {
        //     $scope.validarVacio(elemento.id_input, elemento.id_label);
        //   });
        //   return;
        // } else {
          swal({
            title: "IMPORTANTE",
            text: "¿Esta seguro que desea agregar la actividad?",
            type: "question",
            showCancelButton: true,
          }).then((result) => {
            if (result) {
              $http({
                method: "POST",
                url: "php/tic/matrizdeSeguimiento.php",
                data: {
                  function: "P_UI_PROYECTOS_TIC",
                  vparea: '',
                  vpmodulo: $scope.form1.nombreModulo,
                  vpinicial: '',
                  vpfinal: $scope.formatDatefecha($scope.form4.fechaFinal),
                  vpbd: '',
                  vpfront: '',
                  vpdocumentacion: '',
                  vpdescripcion: '',
                  vpobservacion: $scope.form4.observacion,
                  vpaccion:'U',
                  vpsolicitud: '',
                  vpsoportes: JSON.stringify($scope.soporte_FL),
                  vpcantsoportes: $scope.cantidadSoporte,
                  vpcodigo: $scope.form4.codigoSeguimiento,
                  vpsolicitante: $scope.form1.personaSoliciatnte,
                },
              }).then(function ({data}) {
                if (data && data.toString().substr(0, 3) != "<br") {
                  if(data.Codigo == 1){
                    swal({
                      title: "INFORMACION",
                      text: data.Nombre,
                      type: "info",
                    }).catch(swal.noop);
                  }else{
                    swal({
                      title: "ACTIVIDAD",
                      text: data.Nombre,
                      type: "success",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.$apply();
                      $scope.function_consultaReporte('C');
                      $("#modalcierre").modal("close");
                      $scope.limpiar("form4");
                      // $scope.limpiar("form1");
                      // $scope.function_controlVista('A');
                    }, 1000);
                  }
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning",
                  }).catch(swal.noop);
                }
              });
            }
          });
        // }
    }; 
      $scope.function_consultaReporte = function (info,accion){

        $scope.estadodeReporte = info;
        if(info == 'A'){
          $scope.busquedaInfo = "";
          $scope.title = 'SEGUIMIENTOS ACTIVOS';
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });  
            $http({
              method: 'POST',
              url: "php/tic/matrizdeSeguimiento.php",
              data: {
                function: 'P_REPORTE_PROYECTO',
                vpestado:info,
                }
            }).then(function ({data}) {
              console.log(data);
                swal.close();
                $scope.list_tablaSeguimiento = data;
                $scope.show_registroActividades = false;
                $scope.show_buscarActividades = false;
                $scope.show_tablaSeguimiento = true;
            })  
          
        }if(info == 'P'){
          $scope.title = 'SEGUIMIENTOS PROCESADOS';
          $scope.busquedaInfo = "";
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });  
          $http({
            method: 'POST',
            url: "php/tic/matrizdeSeguimiento.php",
            data: {
              function: 'P_REPORTE_PROYECTO',
              vpestado:info,
              }
          }).then(function ({data}) {
            console.log(data);
              swal.close();
              $scope.list_tablaSeguimiento = data;
              $scope.show_registroActividades = false;
              $scope.show_buscarActividades = false;
              $scope.show_tablaSeguimiento = true;
                   
          })  
        }if(info.length > 0 && accion == 'R'){

          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });  
          $http({
            method: 'POST',
            url: "php/tic/matrizdeSeguimiento.php",
            data: {
              function: 'P_REPORTE_PROYECTO',
              vpestado:info,
              }
          }).then(function ({data}) {
            console.log(data);
              swal.close();

              $scope.show_tablaSeguimiento = true;
              if (data.length) {
                //Crear un libro de Excel
                    var workbook = XLSX.utils.book_new();
                   // Convertir los datos JSON a hojas de Excel
                    var ipsSheet = XLSX.utils.json_to_sheet(data);
                  //  Agregar las hojas al libro
                    XLSX.utils.book_append_sheet(workbook, ipsSheet, "Reporte Consolidado");
                   // Generar un archivo Excel
                    XLSX.writeFile(workbook, "Reporte Consolidado.xlsx");           
                    swal({
                      title: "Mensaje",
                      text: "Reporte Generado",
                      type: "success",
                    });
                
                  }else{
                    swal({
                      title: "Informacion",
                      text: "No hay datos para generar el reporte",
                      type: "info",
                    });
                  }
                   
          }) 
        

        }
        // }
      
      }
      // $scope.function_p_listaSoporte = function (info) {
      //   $scope.show_vistadesoportesCargados = true;
      //   // $http({
      //   //   method: 'POST',
      //   //   url: "php/autorizaciones/materialesosteosintesis/materiales_osteosintesis.php",
      //   //   data: {
      //   //     function: 'P_LISTA_SOPORTES',
      //   //     vpnumero: info.CONSECUTIVO,
      //   //   }
      //   // }).then(function ({ data }) {
      //   //   if (data && data.toString().substr(0, 3) != '<br') {
      //   //     $scope.show_vistadesoportesCargados = true;
      //   //     $scope.show_vistadematerialesSeleccionados = false;
      //   //     $scope.show_formulariodatosBasicos = false;
      //   //     $scope.vervaloresdeEstado = false;
      //   //     $scope.show_formularioinformacionMedica = false;
      //   //     $scope.show_tablaSolicitud = false;
      //   //     $scope.listSoportes = data;
      //   //   } else {
      //   //     swal({
      //   //       title: "¡Ocurrio un error!",
      //   //       text: data,
      //   //       type: "warning"
      //   //     }).catch(swal.noop);
      //   //   }
      //   // });

      // }
      $scope.function_p_listaSoporte = function (info) {
        swal({
          title: 'Cargando gestion...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        // $scope.documentoaVisualizar = '';
        // $scope.titulodelSoporte = opcion.Nombtre;
        $http({
          method: 'POST',
          url: "php/tic/matrizdeSeguimiento.php",
          data: { function: 'P_LISTA_PROYECTO', 
          vpcodigo: info.CODIGO
        }
      }).then(function (response) {
          console.log(response);
          swal.close();
          // window.open("temp/" + response.data);
          $scope.form3.adjunto1 = response.data[0].ADJUNTO_INICIO;
          $scope.form3.adjunto2 = response.data[0].ADJUNTO_FINAL;
          $scope.form3.descripcion = response.data[0].DESCRIPCION,
          $scope.form3.observacion = response.data[0].OBSERVACION,
          $scope.form3.nombreModulo = response.data[0].MODULO,
          $("#modalsoportes").modal("open");
          $scope.show_vistadesoportesCargados = true;
        });
      }
      $scope.function_verSoportes = function (info){
        console.log(info);
              if(info == 1){
                if($scope.form3.adjunto1 == '' || $scope.form3.adjunto1 == null){
                  swal({
                    title: "¡Alerta!",
                    text: 'No hay documento cargado ',
                    type: "warning"
                  }).catch(swal.noop);
                }else{
                  swal({
                    title: 'Cargando Documento...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                  });
                  $http({
                    method: 'POST',
                    url: "php/tic/matrizdeSeguimiento.php",
                    data: { 
                    function: 'DESCARGARFILE',
                    ruta: $scope.form3.adjunto1
                    }
                  }).then(function (response) {
                    console.log(response);
                    swal.close();
                    window.open("temp/" + response.data);
                  });
                }
              }if(info == 2){
                if($scope.form3.adjunto2 == '' || $scope.form3.adjunto2 == null){
                  swal({
                    title: "¡Alerta!",
                    text: 'No hay documento cargado',
                    type: "warning"
                  }).catch(swal.noop);
                }else{
                swal({
                  title: 'Cargando Documento...',
                  allowEscapeKey: false,
                  allowOutsideClick: false
                });
                $http({
                  method: 'POST',
                  url: "php/tic/matrizdeSeguimiento.php",
                  data: { 
                  function: 'DESCARGARFILE',
                  ruta: $scope.form3.adjunto2
                  }
                }).then(function (response) {
                  console.log(response);
                  swal.close();
                  window.open("temp/" + response.data);
                });
              }
              }
      }
      $scope.openmodals = function (tipo,data) {
        console.log('Line 492 openmodals',tipo,data);
        switch (tipo) {
          case 'verSoportes':
              $("#modalsoportes").modal("open");
            break;
            case 'verCierre':
              $("#modalcierre").modal("open");
              document.getElementById("id_form4_soporte_text").value = '',
              document.getElementById("id_form4_soporte").value = '',
              document.getElementById("id_form4_soporteCierre_text").value = '',
              document.getElementById("id_form4_soporteCierre").value = '',
            $scope.form4.nombreModulo = data.MODULO;
            $scope.form4.codigoSeguimiento = data.CODIGO;
            break;

            
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'verSoportes':
            $("#modalsoportes").modal("close");
            break;
            case 'verCierre':
              $("#modalcierre").modal("close");
              break;
          default:
        }
      }
      document.addEventListener("change", e => {
        var input = e.target.defaultValue;
        let id2 = e.target.id;
        if (e.target.matches(".cargueArchivo")) {
          setTimeout(() => { $scope.$apply(); }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            const x = files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[0].size < 15485760 && files[0].size > 0) {
                $scope.getBase64(files[0]).then(function (result) {
                  var data = { CODIGO: input, RUTA: result };
                  const index = $scope.soporte_FL.findIndex((e) => e.CODIGO === data.CODIGO);
                  if (index === -1) {
                    $scope.soporte_FL.push(data);
                  } else {
                    $scope.soporte_FL[index] = data;
                  }
                  $scope.cantidadSoporte = $scope.soporte_FL.length;
                });
                console.log($scope.soporte_FL);
              } else {
                let padre = document.querySelector(`#${id2}`).parentElement.nextElementSibling.firstElementChild;
                let input = padre;
                let idText = input.id;
                document.querySelector(`#${idText}`).value = '';
                document.querySelector(`#${id2}`).value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              let padre = document.querySelector(`#${id2}`).parentElement.nextElementSibling.firstElementChild;
              let input = padre;
              let idText = input.id;
              document.querySelector(`#${idText}`).value = '';
              document.querySelector(`#${id2}`).value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
            }
          }
        }
      })
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.formatsolotexto_Mayuscula = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        // Remover caracteres que no son letras ni espacios
        valor = valor.replace(/[^a-zA-Z\s]/g, "");
        // Convertir el texto a mayúsculas
        input.value = valor.toUpperCase();
      };
      $scope.formatDatefecha = function (date) {
          // Comprueba si la fecha está vacía.
          if (!date) {
              return ""; // You can customize this message as needed
          }
      
          var d = new Date(date);
          // Comprueba si la fecha es válida.
          if (isNaN(d.getTime())) {
              return ""; //Manejar cadenas de fechas no válidas
          }
      
          var dd = ("0" + d.getDate()).slice(-2);
          var mm = ("0" + (d.getMonth() + 1)).slice(-2);
          var yyyy = d.getFullYear();
          
          return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatHora = function (date) {
        if (minutos < 10) {
          minutos = "0" + minutos;
        }
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var minutos = d.getMinutes();
        return hh + ":" + minutos + ":00";
      };
      $scope.formatPeso = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace(".", ",");
            num = num.split(",");
            num[0] = num[0]
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num[0] = num[0].split("").reverse().join("").replace(/^[\.]/, "");
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + "0";
            }
            return num[0] + "," + num[1];
          } else {
            num = num
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return "$" + num + "";
          }
        }
      };
      $scope.formatDatehora = function (date) {
        var x = document.getElementById("myTime").value;
      };
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      };
      $scope.chg_filtrar = function (varFiltro) {
        if (
          $scope.Vista1[varFiltro] == "" ||
          $scope.Vista1[varFiltro] == undefined
        ) {
          swal({
            title: "Notificación",
            text: "Por favor digite que desea buscar..",
            type: "warning",
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = "";
        } else {
          $scope.list_DatosTemp = $filter("filter")(
            $scope.Vista1_datos,
            $scope.Vista1[varFiltro]
          );
          $scope.configPages();
          varFiltro = "";
          $scope.Vista1.Filtrar_tconsulta = "";
        }
      };
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      };
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.list_DatosTemp.length;
          $scope.valmaxpag = $scope.list_DatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      };
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) >
            $scope.valmaxpag
          ) {
            if ($scope.pageSize * 10 < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          } else {
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
          }
        } else {
          if (
            ini >=
            Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) -
              $scope.valmaxpag
          ) {
            ini =
              Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) -
              $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) {
          $scope.currentPage = 0;
        }
      };
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt(
            $scope.list_DatosTemp.length / $scope.pageSize
          );
        } else {
          var tamanomax =
            parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = $scope.pages.length + i - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      };
      $scope.paso = function (tipo) {
        if (tipo == "next") {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }
          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt(
              $scope.list_DatosTemp.length / $scope.pageSize
            );
          } else {
            var tamanomax =
              parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
      };
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }
      };
      $scope.validarVacio = function (id, label) {
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      $scope.validarllenos = function (id, label) {
        let input = document.getElementById(id);
        let Texto = document.getElementById(label);
        if (input.value == "" || input.value == null) {
          Texto.classList.add("red-text");
          input.classList.add("error-input");
        } else if (Texto != null) {
          Texto.classList.remove("red-text");
          input.classList.remove("error-input");
        }
      };
      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $(".tooltipped").tooltip({ delay: 50 });
      });
    },
  ])
  .directive("textUpper", function () {
    return {
      require: "ngModel",
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
      },
    };
  })
  .filter("inicio", function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    };
  });
