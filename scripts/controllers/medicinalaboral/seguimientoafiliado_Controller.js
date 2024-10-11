'use strict';
angular.module('GenesisApp').controller('seguimientoafiliadoController', ['$scope', '$http', '$timeout', '$filter', 'ngDialog', 'notify', 
function ($scope, $http, $timeout, $filter, ngDialog, notify) {
  

    $scope.Inicio = function () {
        // const span = document.querySelector('#adjuntoIncapacidad');
        $scope.soporte_FL = "";
        // span.innerHTML = "Ningun Archivo Seleccionado";
        $scope.diaginputAtel = "";
        $scope.habilitarViews = true;
        $scope.SysDay = new Date();
        $scope.hoy = new Date();
        $scope.hoy.setDate($scope.SysDay.getDate() + 1);
        $scope.tipo_documento = "";
        $scope.numeroId = "";
        $scope.registroIncapacidades = [];
        $scope.tabs = 1;
        $scope.showmsj = false;
        $scope.habilitarConfirm = false;
        $scope.verCalificacion = 0;
        $scope.inactiveColumna = false;
        $scope.Pag = 10;
        $scope.arrayDiag = [];
        $scope.titleModalAdjunto = 'Cargar Adjuntos';
        $scope.verDatos = 2;
        $scope.contadorInput = 0;
        $scope.rangoIncapacidad = "";
        $scope.diagnostico1 = "";
        $scope.filtrocheck_option = {
            DOCUMENTO: 'ACTIVO',
            ESTADO: ''
        }
        $scope.afiliacion = {
          options_penciones_afp: "",
          options_riesgos_laborales_arl: ""
        }
        $scope.inhabilitarRegistro = false;
        $scope.form1 = {
            nombre: "",
            tipo: "",
            numero: "",
            anteriorEps: "",
            ubicacion: "",
            genero: "",
            regimen: "",
            edad: "",
        }
        $scope.formRegistro = {
            proximoSeguimiento: "",
            correo: "",
            arl: "",
            AFP: "",
            accidenteTrabajo: "",
            fechaEvento: "",
            enfermedadLaboral: "",
            diagnostico: "",
            diagnostico2: "",
            diagnostico3: "",
            diagnostico4: "",
            emisionRehabilitacion: "",
            conceptoRehabilitacion: "",
            fechaEmision: "",
            origen: "",
            diasIncapacidad: "",
            telefono: "",
            telefono2: "",
            direccion: "",
            barrio: "",
        } 
        $scope.formRegistroCalifica = {
          correo: "",
          arl: "",
          AFP: "",
          accidenteTrabajo: "",
          fechaEvento: "",
          diagnostico: "",
          diagnostico2: "",
          diagnostico3: "",
          diagnostico4: "",
          diagnostico5: "",
          diagnostico6: "",
          fechaEmision: "",
          origen: "",
          solicitado: "",
          ultimoEmpleador: "",
          telefono: "",
          direccion: "",
          telefono2: "",
          barrio: "",
          proximoSeguimiento: ""
        } 
        $scope.formRegistroPerdida = {
          correo: "",
          arl: "",
          AFP: "",
          accidenteTrabajo: "",
          fechaEvento: "",
          diagnostico: "",
          diagnostico2: "",
          diagnostico3: "",
          diagnostico4: "",
          diagnostico5: "",
          diagnostico6: "",
          fechaEmision: "",
          origen: "",
          solicitado: "",
          ultimoEmpleador: "",
          telefono: "",
          telefono2: "",
          direccion: "",
          barrio: "",
        }   
        $('.modal').modal();
        $('.tabs').tabs();
      }

    const $form = document.querySelector(".contact-form");
    const $inputs = document.querySelectorAll(".contact-form [required]")

       function formatDate(date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
      }

      $scope.closeModal = function (){
            $(".modal").modal("close");
            $scope.diaginputAtel = "";
            $scope.activeAdjuntos = false;
            $scope.activeRegistro = true;
      }

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
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: { function: "reporteFileUrl", base64: $scope.soporte_FL, codigo: "Seguimiento" }
            }).then(function ({ data }) {
              if (data) {
                resolve(data);
              } else {
                resolve(false);
              }
            })
          });
      }

      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable].toString().replace(/[^0-9]/g, '');// (564) 564 - 4564   
          $scope[form][variable] = valor;
          if ($scope[form][variable].length == 1 && $scope[form][variable] != 3){
            $scope[form][variable] = 3
          } 

          if ($scope[form][variable].length > 10){
            $scope[form][variable] = $scope[form][variable].slice(0, 10);
          } 

        } else { $scope[form][variable] = ''; }
      }

      $scope.buscarAfiliado = function (tipo, cedula) {
        if (tipo && cedula) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
             })
            $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: {
                function: 'P_DATOS_BASICOS_AFILIADO_INCAPACIDAD_PROLONGADA',
                tipo,
                cedula,
               }
            }).then( ({data}) => {
              if (data.Codigo == 1) {
                     swal('Informacion', `${data.Nombre}`, 'warning');
              }else{
                  $scope.datosAfiliado = data[0];
                  $scope.ultimo_Empleador($scope.datosAfiliado.tipo, $scope.datosAfiliado.documento);
                  $scope.lista_arl();
                  $scope.lista_afp();

                  document.querySelectorAll(".inputActualizar").forEach((ele)=>{
                        ele.style.borderColor = 'lightgrey';
                        if (ele.nextElementSibling) {
                          ele.nextElementSibling.style.display = 'none';
                        }
                        if (ele.disabled == undefined || ele.disabled == false) {
                            ele.disabled = true;
                        }
                     })

                  document.querySelectorAll(".iconosActualizar").forEach((ele)=>{
                        if (ele.classList.contains("icon-ok-3")) {
                              ele.classList.remove("icon-ok-3");
                              ele.classList.add("icon-pen");
                        }
                    })             
                  $scope.formRegistro.telefono = $scope.datosAfiliado.telefono;
                  $scope.formRegistro.arl = ($scope.datosAfiliado.arl == 'N') ? 0 : $scope.datosAfiliado.arl
                  $scope.formRegistro.AFP = "";
                  $scope.formRegistro.correo = $scope.datosAfiliado.correo;
                  $scope.formRegistro.proximoSeguimiento = $scope.formatfechaValida($scope.datosAfiliado.proximo_seguimiento);
                  $scope.formRegistro.direccion = $scope.datosAfiliado.direccion;
                  $scope.formRegistro.telefono2 = $scope.datosAfiliado.telefono2;
                  $scope.formRegistro.barrio = $scope.datosAfiliado.barrio;

                  $scope.form1 = {
                      nombre: $scope.datosAfiliado.nombre_y_apellido,
                      tipo: $scope.datosAfiliado.tipo,
                      numero: $scope.datosAfiliado.documento,
                      anteriorEps: $scope.datosAfiliado.anterior_EPS,
                      ubicacion: $scope.datosAfiliado.ubicacion,
                      genero: $scope.datosAfiliado.genero,
                      regimen: $scope.datosAfiliado.regimen,
                      edad: $scope.datosAfiliado.edad,
                  }
                  setTimeout(()=>{
                    $scope.verDatos = 1;          
                    swal.close();
                  },600)
                }
                });
        }else{
            swal('Informacion', `Complete los campos`, 'error');
        }
      }

      $scope.validarCamposIncapacidad = function (){
        const $formRegistro =  document.querySelectorAll(".regisInca input[type=text], .regisInca select, .regisInca input[type=date], .regisInca input[type=email], .dataBasic input[type=text]");
              // document.querySelector("#conceptoReha1").setAttribute("required", true);
              // document.querySelector("#fecha_event").setAttribute("required", true);
              // document.querySelector("#fechaEmision").setAttribute("required", true);
              // document.querySelector("#origen").setAttribute("required", true);
        $scope.validarCampo = true;
        let aux = 0;
          $formRegistro.forEach( elemen => { 
              if (!elemen.value) {
                if (elemen.name == 'fechaEvento' && elemen.value == '') {
                  // if ((elemen.name == 'fechaEvento' && elemen.value == '') && ($scope.formRegistro.accidenteTrabajo == 'NO')) {
                  if ($scope.formRegistro.accidenteTrabajo == 'NO') {
                    document.querySelector("#fecha_event").removeAttribute("required");
                  }else{
                    aux = 2;
                    $scope.nombretitle = elemen.title;
                  }
                }
              
                if (elemen.name == 'conceptoRehabilitacion' && elemen.value == '') {
                  // if ((elemen.name == 'conceptoRehabilitacion' && elemen.value == '') && ($scope.formRegistro.emisionRehabilitacion == 'NO')) {
                    if ($scope.formRegistro.emisionRehabilitacion == 'NO') {
                      document.querySelector("#conceptoReha1").removeAttribute("required");
                    }else{
                      $scope.nombretitle = elemen.title;
                      aux = 2;
                    }
                }

                if (elemen.name == 'Emisionfecha' && elemen.value == '') {
                  // if ((elemen.name == 'Emisionfecha' && elemen.value == '') && ($scope.formRegistro.emisionRehabilitacion == 'NO')) {
                  if ($scope.formRegistro.emisionRehabilitacion == 'NO') {
                    document.querySelector("#fechaEmision").removeAttribute("required");
                  }else{
                      $scope.nombretitle = elemen.title;
                      aux = 2;
                  }
                }
                if (elemen.name == 'origenIncapacidad' && elemen.value == '') {
                  // if((elemen.name == 'origenIncapacidad' && elemen.value == '') && ($scope.formRegistro.emisionRehabilitacion == 'NO')) {
                    if ($scope.formRegistro.emisionRehabilitacion == 'NO') {
                      document.querySelector("#origen").removeAttribute("required");
                    }else{
                      $scope.nombretitle = elemen.title;
                      aux = 2;
                    }
                }
                
                if (elemen.name != 'fechaEvento' && elemen.name != 'conceptoRehabilitacion' && elemen.name != 'origenIncapacidad' && elemen.name != 'Emisionfecha' && elemen.classList[0] != 'diagNuevo') {
                  aux = 2;
                  $scope.nombretitle = elemen.title;
                }

              }
          })

        if (aux == 2) {
          $scope.validarCampo = false;
        }else{
          $scope.validarCampo = true;

        }
            return $scope.validarCampo;
      }

      $scope.registrarIncapacidad = function () {
       if ($scope.validarCamposIncapacidad()) {
             swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
                 })
            $scope.validateTelefono = ($scope.datosAfiliado.telefono == $scope.formRegistro.telefono) ? false : true
            $scope.validateARL =  ($scope.datosAfiliado.arl == $scope.formRegistro.arl) ? false : true
            $scope.validateCorreo =  ($scope.datosAfiliado.correo == $scope.formRegistro.correo) ? false : true

            if ($scope.validateTelefono == true || $scope.validateARL == true || $scope.validateCorreo == true) {
              $scope.updateForm = 'A';
            }else{
              $scope.updateForm = '';
            }     
            // $scope.cargarBase64().then((result)=> {
                  // let ruta = "";
                  //   if (result.slice(0,6) != '<br />') {
                  //       ruta = result;
                  //   }else{
                  //       ruta = '';
                  //   }
                  let json = {
                            tipo_documento: $scope.form1.tipo,
                            documento: $scope.form1.numero,
                            correo: $scope.formRegistro.correo,
                            arl: $scope.formRegistro.arl,
                            afp : $scope.formRegistro.AFP,
                            accidente_trabajo: $scope.formRegistro.accidenteTrabajo,
                            fecha_evento: $scope.formRegistro.fechaEvento ? formatDate($scope.formRegistro.fechaEvento) : '',
                            enfermedad_laboral: $scope.formRegistro.enfermedadLaboral,
                            diagnostico1: $scope.formRegistro.diagnostico,
                            diagnostico2: $scope.formRegistro.diagnostico2,
                            diagnostico3: $scope.formRegistro.diagnostico3,
                            diagnostico4: $scope.formRegistro.diagnostico4,
                            emision_concepto_rehabilitacion: $scope.formRegistro.emisionRehabilitacion,
                            concepto_rehabilitacion: $scope.formRegistro.conceptoRehabilitacion,
                            origen: $scope.formRegistro.origen,                     
                            fecha_emision: $scope.formRegistro.fechaEmision ? formatDate($scope.formRegistro.fechaEmision) : '',
                            dias_incapacidad: $scope.formRegistro.diasIncapacidad,
                            adjunto: '',
                            motivo_de_cierre: "",
                            observacion: "",
                            proximo_seguimiento: $scope.formRegistro.proximoSeguimiento ? formatDate($scope.formRegistro.proximoSeguimiento) : '',
                            telefono1: $scope.formRegistro.telefono,
                            telefono2: $scope.formRegistro.telefono2,
                            direccion: $scope.formRegistro.direccion,
                            barrio: $scope.formRegistro.barrio
                     }
                $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_REGISTRO_INCAPACIDAD_PROLONGADA",
                        jsonDatos: JSON.stringify(json),
                        tipo: 'N', 
                        actualiza: $scope.updateForm,
                        documento: $scope.form1.numero,
                        tipodoc: $scope.form1.tipo,
                       }
                }).then(({data}) => {
                    if (data.Codigo == 0) {
                        swal.close(); 
                        swal('Info', `${data.Nombre}`, 'success');
                        $scope.nombre = $scope.form1.nombre;                    
                          setTimeout(()=>{
                            $scope.SetTabs(1);
                            $scope.ActualizarDatos();
                            $scope.$apply();
                          },1000) 
        
                    }else{
                        swal('Info', `${data.Nombre}`, 'error');
                    }
                })
            // })      
       }else{
         swal('Info', `Completa el campo ${$scope.nombretitle} que se encuentra vacio`, 'warning');
       }
          
      }

      $scope.abrirExportar = function(opcion, modulo){
          if (opcion == 'ABRIR') {
            $scope.fechaInicio = "";
            $scope.fechaFin = "";
            $scope.estado = "";
            $scope.mod = modulo;
            $("#modalExportar").modal("open");
          }
       
          if (opcion == 'F' && $scope.mod == 'EXPOR') {
            if ($scope.fechaInicio && $scope.fechaFin && $scope.estado) {
              $http({
                method: 'POST',
                url: "php/medicinalaboral/seguimientoafiliado.php",
                data: {
                    function: "P_EXPORTAR_INFORMACION_INCAPACIDAD_PROLONGADA",
                    fechainicio: formatDate($scope.fechaInicio),
                    fechaFinal: formatDate($scope.fechaFin),
                    estado: $scope.estado,
                }
              }).then(({data}) => {
                  if (data.length > 0) {
                    var ws = XLSX.utils.json_to_sheet(data);
                    /* add to workbook */
                    var wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                    /* write workbook and force a download */
                    XLSX.writeFile(wb, "Incapacidades Prolongadas.xlsx");
                    const text = `Registros encontrados ${data.length}`
                    swal('¡Mensaje!', text, 'success').catch(swal.noop);
      
                  }else{
                      swal('INFO', `${data.Nombre}`, 'error');
                  }
              })
            }else{
              swal('INFO', `Completa los campos vacios`, 'error');
            }          
          }

          if (opcion == 'F' && $scope.mod == 'EXPOR_CA') {
              if ($scope.fechaInicio && $scope.fechaFin && $scope.estado) {
                    $http({
                      method: 'POST',
                      url: "php/medicinalaboral/seguimientoafiliado.php",
                      data: {
                          function: "P_EXPORTAR_CALIFICACION_ORIGEN",
                          fechainicio: formatDate($scope.fechaInicio),
                          fechaFinal: formatDate($scope.fechaFin),
                          estado: $scope.estado,
                      }
                    }).then( ({data}) => {
                        if (data.length > 0) {
                          var ws = XLSX.utils.json_to_sheet(data);
                          /* add to workbook */
                          var wb = XLSX.utils.book_new();
                          XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                          /* write workbook and force a download */
                          XLSX.writeFile(wb, "Calificacion Origen.xlsx");
                          const text = `Registros encontrados ${data.length}`
                          swal('¡Mensaje!', text, 'success').catch(swal.noop);
            
                        }else{
                            swal('INFO', `${data.Nombre}`, 'error');
                        }
                    })           
              }else{
                swal('INFO', `Completa los campos vacios`, 'error');
              }
          }

          if (opcion == 'F' && $scope.mod == 'EXPOR_PER') {
            if ($scope.fechaInicio && $scope.fechaFin && $scope.estado) {
                  $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_EXPORTAR_PERDIDA_DE_CAPACIDAD_LABORAL",
                        fechainicio: formatDate($scope.fechaInicio),
                        fechaFinal: formatDate($scope.fechaFin),
                        estado: $scope.estado,
                    }
                    }).then( ({data}) => {
                        if (data.length > 0) {
                          var ws = XLSX.utils.json_to_sheet(data);
                          /* add to workbook */
                          var wb = XLSX.utils.book_new();
                          XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                          /* write workbook and force a download */
                          XLSX.writeFile(wb, "Perdida Capacidad Laboral.xlsx");
                          const text = `Registros encontrados ${data.length}`
                          swal('¡Mensaje!', text, 'success').catch(swal.noop);
            
                        }else{
                            swal('INFO', `${data.Nombre}`, 'error');
                        }
                    })          
            }else{
              swal('INFO', `Completa los campos vacios`, 'error');
            }           
          }
      }

      $scope.cambio_de_required = function(datos, tipo, id, id2, id3){
            if (tipo == 'AT' && datos == 'NO') {
              $scope.formRegistro.fechaEvento = "";
              document.querySelector(`#${id}`).removeAttribute("required");
            }else if(tipo == 'AT' && datos == 'SI'){
              document.querySelector(`#${id}`).setAttribute("required", true);
            }

            if (tipo == 'CR' && datos == 'NO') {
              $scope.formRegistro.conceptoRehabilitacion = "";
              document.querySelector(`#${id}`).removeAttribute("required");
              document.querySelector(`#${id2}`).removeAttribute("required");
              document.querySelector(`#${id3}`).removeAttribute("required");
            }else if(tipo == 'CR' && datos == 'SI'){
              document.querySelector(`#${id}`).setAttribute("required", true);
              document.querySelector(`#${id2}`).setAttribute("required", true);
              document.querySelector(`#${id3}`).setAttribute("required", true);
            }

            if (tipo == 'ES' && datos == 'A') {
              let fechaActual = new Date();
              let fechaProx = new Date();
              fechaProx.setDate(fechaActual.getDate() + 120)

              //$scope.formSeguimiento.proxSeguimiento = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              $scope.formSeguimiento.proxSeguimiento2 = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              document.querySelector(`#${id}`).removeAttribute("required");
              document.querySelector(`#${id2}`).setAttribute("required", true);
              document.querySelector("#Calificacion_proximoSeguimiento").setAttribute("required", true);

            }else if(tipo == 'ES' && datos == 'P'){
              $scope.formSeguimiento.motivo = "";
              $scope.formSeguimiento.proxSeguimiento = "";
              $scope.formSeguimiento.proxSeguimiento2 = "";
              document.querySelector("#Calificacion_proximoSeguimiento").removeAttribute("required");
              document.querySelector(`#${id2}`).removeAttribute("required");
              document.querySelector(`#${id}`).setAttribute("required", true);
            }

            if (tipo == 'IN' && datos == 'A') {
              let fechaActual = new Date();
              let fechaProx = new Date();
              fechaProx.setDate( fechaActual.getDate() + 60)

              $scope.formSeguimiento.proxSeguimiento = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              // $scope.formSeguimiento.proxSeguimiento2 = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              document.querySelector(`#${id2}`).removeAttribute("required");
              document.querySelector(`#${id}`).setAttribute("required", true);
              document.querySelector(`#${id3}`).setAttribute("required", true);

            }else if(tipo == 'IN' && datos == 'P'){
              $scope.formSeguimiento.motivo = "";
              $scope.formSeguimiento.proxSeguimiento = "";
              $scope.formSeguimiento.proxSeguimiento2 = "";
              document.querySelector(`#${id}`).removeAttribute("required");
              document.querySelector(`#${id3}`).removeAttribute("required");
              document.querySelector(`#${id2}`).setAttribute("required", true);
            }

            if (tipo == 'CL' && datos == 'A') {
              let fechaActual = new Date();
              let fechaProx = new Date();
              fechaProx.setDate(fechaActual.getDate() + 30)
              $scope.formSeguimiento.proxSeguimiento3 = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              // $scope.formSeguimiento.proxSeguimiento2 = new Date(fechaProx.getFullYear(), fechaProx.getMonth(), fechaProx.getDate());
              document.querySelector(`#${id}`).removeAttribute("required");
              document.querySelector(`#${id2}`).removeAttribute("required");
              document.querySelector(`#${id3}`).removeAttribute("required");

            }else if(tipo == 'CL' && datos == 'P'){
              $scope.formSeguimiento.entidad = "";
              $scope.formSeguimiento.fecha_calificacion = "";
              $scope.formSeguimiento.NumberCalificacion = "";
              document.querySelector(`#${id}`).setAttribute("required", true);
              document.querySelector(`#${id2}`).setAttribute("required", true);
              document.querySelector(`#${id3}`).setAttribute("required", true);
            }
      }

      $scope.descargar_formatoSeguimiento = function(op){
         window.open('views/medicinalaboral/formato_seguimientos.php?documento=' + $scope.documentoSeg + '&tipo=' + $scope.tipo_documentoSeg + '&id=' + $scope.idSeg + '&mood=' + $scope.modulo, '_blank')
      }

      $scope.optionValidate = function(opcion,dato){
        let result;
        if (opcion == 'ARL') {
          switch (dato) {
            case '0':
              result = "NINGUNA"
              break;
            case '1':        
            result = "SURA ARL"
              break;
            case '2':
              result = "SEGUROS BOLIVAR"
              break;
            case '3':
              result = "EQUIDAD SEGUROS"
              break;
            case '4':
              result = "POSITIVA"
              break;
            case '5':
              result = "LIBERTY SEGUROS"
              break;
            case '6':
              result = "MAPFRE"
              break;
            case '7':
              result = "COLMENA SEGUROS"
              break;
            case '8':
              result = "SEGUROS DE VIDA ALFA"
              break;
            case '9':
              result = "AXA COLPATRIA"
              break;
            case '10':
              result = "ARL AURORA"
              break;
            case '11': 
              result = "COLSANITA ARL"
              break;
          }      
        }

        if (opcion == 'AFP') {
          switch (dato) {
            case '25-8':
              result = "CAJANAL"
              break;
            case '25-4':        
            result = "CAPRECOM"
              break;
            case '25-2':
              result = "CAXDAC"
              break;
            case '231001':
              result = "COLFONDOS"
              break;
            case '25-11':
              result = "COLPENSIONES"
              break;
            case '25-3':
              result = "FONPRECON"
              break;
            case '25-12':
              result = "GLOBAL SEGURO DE VIDA SA"
              break;
            case '230501':
              result = "HORIZONTE"
              break;
            case '230801':
              result = "ING FONDO DE PENSIONES OBLIGATORIAS"
              break;
            case '0':
              result = "NINGUNO"
              break;
            case '25-7':
              result = "PENSIONES DE ANTIOQUIA"
              break;
            case '230301': 
              result = "PORVENIR"
              break;
            case '230201':
              result = "PROTECCIÓN"
                break;
            case '230901':
              result = "SKANDIA"
                break;
            case '230904': 
              result = "SKANDIA ALTERNATIVO"
                break;
          }        
        }

        return result;

      }

      $scope.abrirModalseguimiento = function (X){
        $scope.habilitarObligatorio = true;
        $("#modalSeguimiento").modal("open");
        document.getElementById("conceptoRehabilitacionSeg").disabled = false;
        document.getElementById("titleSeguimiento").textContent = 'Registrar Seguimiento';
        console.log(X);
        $scope.cedula = X.DOCUMENTO;
        $scope.tipodoc = X.TIPO_DOCUMENTO;
        $scope.calcularRangos(X.DIAS_INCAPACIDAD);

        if (X.CONCEPTO_DE_REHABILITACION == 'DESFAVORABLE' || X.CONCEPTO_DE_REHABILITACION2 == 'DESFAVORABLE') {
            document.getElementById("conceptoRehabilitacionSeg").disabled = true;
            $scope.habilitarObligatorio = false;
            document.getElementById("conceptoRehabilitacionSeg").style.color = 'black';
        }
        
        $scope.formSeguimiento = {
            nombre: `${X.PRIMER_NOMBRE} ${X.SEGUNDO_NOMBRE == null ? '' : X.SEGUNDO_NOMBRE} ${X.PRIMER_APELLIDO} ${X.SEGUNDO_APELLIDO}`,
            documento: `${X.TIPO_DOCUMENTO} - ${X.DOCUMENTO}`,
            anteriorEps: X.ANTERIO_EPS,
            ubicacion: X.REGIONAL,
            genero: X.GENERO,
            diagnostico: X.DIAGNOSTICO1,
            regimen: X.REGIMEN,
            edad: X.EDAD,
            correo: X.CORREO,
            arl: $scope.optionValidate('ARL', X.ARL),
            afp: $scope.optionValidate('AFP', X.AFP),
            accidenteTrabajo: X.ACCIDENTE_DE_TRABAJO,
            fechaEvento: X.FECHA_DEL_EVENTO == '' ? 'NO REGISTRA' : X.FECHA_DEL_EVENTO,
            enfermedadLaboral: X.ENFERMEDAD_LABORAL,
            conceptoRehabilitacion: X.CONCEPTO_DE_REHABILITACION,
            conceptoRehabilitacion2: X.CONCEPTO_DE_REHABILITACION2,
            fechaEmision: "",
            estado: "",
            proxSeguimiento2: "",
            proxSeguimiento: "",
            motivo: "",
            observacion: "",
            origen: "",
            abusoDerecho: "",
            diasIncapacidad: parseInt(X.DIAS_INCAPACIDAD),
            estadoCalifica: "",
            fecha: "",
            entidad: "",
            fecha_calificacion: "",
            observacionCalifica: "",
            observacionPerdida: "",
            fechaPerdidac: ""        
        }
      }

      $scope.validarCamposSeguimiento = function (){
        document.querySelector("#Registro_proximoSeguimiento").setAttribute("required", true);
        document.querySelector("#Registro_motivo_seguimiento").setAttribute("required", true);
        const $formRegistroSeg =  document.querySelectorAll(".regisSegui [required], .regisSegui [required=true]");
        $scope.validarCampo = true;
        let aux = 0;
        $formRegistroSeg.forEach( elemen => { 
            if (!elemen.value) {
              if ((elemen.name == 'motivo_seguimiento' && elemen.value == '') && ($scope.formSeguimiento.estado == 'A')) {
                aux = 1;
                document.querySelector("#Registro_motivo_seguimiento").removeAttribute("required");
              }
            
              if ((elemen.name == 'Registro_proximo_Seguimiento' && elemen.value == '') && ($scope.formSeguimiento.estado == 'P')) {
                aux = 1;
                document.querySelector("#Registro_proximoSeguimiento").removeAttribute("required");
              }
              
              if (elemen.name != 'Registro_motivo_seguimiento' && elemen.name != 'Registro_proximo_Seguimiento' ) {
                aux = 2;
              }
            }
        })

        if (aux == 2) {
          $scope.validarCampo = false;
        }else{
          $scope.validarCampo = true;
        }
            return $scope.validarCampo;
      }

      $scope.registrarSeguimiento = function (){
        if ($scope.validarCamposSeguimiento()) {
          swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            })
          $scope.cargarBase64().then((result)=> {
                let ruta = "";
                if (result.slice(0,6) != '<br />') {
                    ruta = result;
                }else{
                    ruta = '';
                }
              let json = {       
                  diagnostico1: "",
                  diagnostico2: "",
                  diagnostico3: "",
                  diagnostico4: "",
                  correo: "",
                  arl: "",
                  afp: "",
                  accidenteTrabajo: "",
                  fechaEvento: "",
                  enfermedadLaboral: "",
                  emision_concepto_rehabilitacion: "",
                  concepto_rehabilitacion: $scope.formSeguimiento.conceptoRehabilitacion2,
                  fecha_emision: $scope.formSeguimiento.fechaEmision ? formatDate($scope.formSeguimiento.fechaEmision) : '',
                  estado: $scope.formSeguimiento.estado,
                  proximo_seguimiento:$scope.formSeguimiento.proxSeguimiento ? formatDate($scope.formSeguimiento.proxSeguimiento) : '',
                  origen: $scope.formSeguimiento.origen,
                  dias_incapacidad: $scope.formSeguimiento.diasIncapacidad,
                  adjunto: ruta,
                  motivo_de_cierre: $scope.formSeguimiento.motivo,
                  observacion: $scope.formSeguimiento.observacion,
                  abuso_del_derecho: $scope.formSeguimiento.abusoDerecho,
                         }
              $http({
                  method: 'POST',
                  url: "php/medicinalaboral/seguimientoafiliado.php",
                  data: {
                      function: "P_REGISTRO_INCAPACIDAD_PROLONGADA",
                      jsonDatos: JSON.stringify(json),
                      tipo: 'S',
                      actualiza: '',
                      documento: $scope.cedula,
                      tipodoc: $scope.tipodoc,
                    }
              }).then(({data}) => {
                swal.close();
                  if (data.Codigo == 0) {
                        swal('INFO', `${data.Nombre}`, 'success');
                            setTimeout(()=>{
                              $scope.closeModal();
                              $scope.ActualizarDatos();
                              $scope.$apply();
                            },500)
                  }else{
                      swal('INFO', `${data.Nombre}`, 'error');
                  }
              })
          })
        }else{
         swal('Info', "Complete los campos vacios", 'warning');
        }
      }

      $scope.verSeguimiento = function(X, opcion){
        $scope.habiliatarFileTable = true;
        if (opcion == 'Incapacidad') {
          $scope.documentoSeg = X.DOCUMENTO;
          $scope.idSeg = X.ID;
          $scope.tipo_documentoSeg = X.TIPO_DOCUMENTO;
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          })
          $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: {
                  function: "P_CONSULTA_PRELIMINAR_SEGUIMIENTO_INCAPACIDAD_PROLONGADA",
                  documento: X.DOCUMENTO,
                  tipodoc: X.TIPO_DOCUMENTO,
                  id: X.ID
              }
          }).then( ({data}) => {
             swal.close();
              if (data.Codigo == 1) {
                swal('INFO', `No se encontraron seguimientos`, 'warning');           
              }else{
                $scope.detallesSeguimiento = data;
                $scope.modulo = $scope.detallesSeguimiento[0].MODULO;

                  $("#modalDetalles").modal("open");
              }
          })
        }else if(opcion == 'Calificacion'){
              $scope.habiliatarFileTable = false;
              $scope.documentoSeg = X.DOCUMENTO;
              $scope.idSeg = X.ID;
              $scope.tipo_documentoSeg = X.TIPO_DOCUMENTO;
                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
                })
                $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_CONSULTA_PRELIMINAR_CALIFICACION_ORIGEN_DETALLE",
                        documento: X.DOCUMENTO,
                        tipodoc: X.TIPO_DOCUMENTO,
                        id: X.ID
                    }
                }).then( ({data}) => {
                  swal.close();
                    if (data.Codigo == 1) {
                      swal('INFO', `No se encontraron seguimientos`, 'warning');           
                    }else{
                      $scope.detallesSeguimiento = data;
                      $scope.modulo = $scope.detallesSeguimiento[0].MODULO;
                        $("#modalDetalles").modal("open");
                    }
                })
        }else if(opcion == 'Perdida'){
            $scope.habiliatarFileTable = false;
            $scope.documentoSeg = X.DOCUMENTO;
            $scope.idSeg = X.ID;
            $scope.tipo_documentoSeg = X.TIPO_DOCUMENTO;

                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
                })
                $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL_SIGUIMIENTO",
                        documento: X.DOCUMENTO,
                        tipodoc: X.TIPO_DOCUMENTO,
                        id: X.ID
                    }
                }).then( ({data}) => {
                  swal.close();
                    if (data.Codigo == 1) {
                      swal('INFO', `No se encontraron seguimientos`, 'warning');           
                    }else{
                      $scope.detallesSeguimiento = data;
                      $scope.modulo = $scope.detallesSeguimiento[0].MODULO;
                        $("#modalDetalles").modal("open");
                    }
                })

        }
      }

      $scope.viewFileList = function(X){
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        })
        let rutas = X.RUTAS;
          $scope.reset_Adjuntos();
          $scope.titleModalAdjunto = 'Visualizar Adjuntos';
          $scope.habilitarViews = true;

        rutas.forEach(ele => {
          if (ele.tipo_archivo == '160') {
            setProgressBarWidth(100, 'adjuntoSolicitud')
            detallarFile('adjuntoSolicitudView',ele.RUTA)
          }
          if (ele.tipo_archivo == '169') {
            setProgressBarWidth(100, 'adjuntoEmpresa')
            detallarFile('adjuntoEmpresaView',ele.RUTA)
          }
          if (ele.tipo_archivo == '161') {
            setProgressBarWidth(100, 'adjuntoUsuarios')
            detallarFile('adjuntoUsuariosView',ele.RUTA)
          }
          if (ele.tipo_archivo == '162') {
            setProgressBarWidth(100, 'adjuntoDictamen')
            detallarFile('adjuntoDictamenView',ele.RUTA)
          }
          if (ele.tipo_archivo == '163') {
            setProgressBarWidth(100, 'adjuntoControversia')
            detallarFile('adjuntoControversiaView',ele.RUTA)
          }
          if (ele.tipo_archivo == '164') {
            setProgressBarWidth(100, 'adjuntoRadicacion')
            detallarFile('adjuntoRadicacionView',ele.RUTA)
          }
          if (ele.tipo_archivo == '165') {
            setProgressBarWidth(100, 'adjuntoEPS')
            detallarFile('adjuntoEPSView',ele.RUTA)
          }
          if (ele.tipo_archivo == '166') {
            setProgressBarWidth(100, 'adjuntoJRCI')
            detallarFile('adjuntoJRCIView',ele.RUTA)
          }
          if (ele.tipo_archivo == '167') {
            setProgressBarWidth(100, 'adjuntoJNCI')
            detallarFile('adjuntoJNCIView',ele.RUTA)
          }
          if (ele.tipo_archivo == '168') {
            setProgressBarWidth(100, 'adjuntoConstancia')
            detallarFile('adjuntoConstanciaView',ele.RUTA)
          }
        })

        setTimeout(()=>{
          swal.close();
          $("#modalAdjuntos").modal("open");
        },600)

      }
      
      let tipo, numero, id;
      $scope.reactivarEstado = function(X, proceso){    
          if(proceso == 'modal'){
              $scope.motivoSeleccion = '';
              tipo = X.TIPO_DOCUMENTO;
              numero = X.DOCUMENTO;
              id = X.ID;
                  swal({
                    title: 'IMPORTANTE',
                    text: "Deseas activar el afiliado?",
                    type: 'warning',
                    showCancelButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCloseButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                  }).then(function (result) {
                    if (result) {
                      swal({
                        title: "Motivo de Reactivar",
                        input: "select",
                        inputOptions: {
                          REINTEGRO: "REINTEGRO FALLIDO",
                          DIAGNOSTICO: "NUEVO DIAGNÓSTICO",
                          RECAIDA: "RECAÍDA",
                        },
                        inputPlaceholder: "Selecciona el Motivo",
                        showCancelButton: true,
                        inputValidator: (value) => {
                          return new Promise((resolve) => {
                            if (value) {
                              $scope.motivoSeleccion = value;
                              resolve();
                              if($scope.motivoSeleccion){
                                $http({
                                      method: 'POST',
                                      url: "php/medicinalaboral/seguimientoafiliado.php",
                                      data: {
                                          function: "P_ACTUALIZAR_ESTADO_SEGUIMIENTO",
                                          tipodoc: tipo,
                                          documento: numero,
                                          id: parseInt(id),
                                          observacion: $scope.motivoSeleccion,
                                      }
                                  }).then(({data}) => {
                                      if (data.Codigo == 0) {
                                          swal('INFO', `${data.Nombre}`, 'success');
                                          $scope.closeModal();
                                          $scope.ActualizarDatos();
                          
                                      }else{
                                          swal('INFO', `${data.Nombre}`, 'error');
                                      }
                                  })
                              }
                            } else {
                              resolve("Error al seleccionar");
                            }
                          });
                        }
                      });
                      
                    }
                  });
            }
      }

      $scope.veradjunto = function (dato){
          if (dato == 'false') {
            swal('INFO', `No se encuentra con adjunto cargado`, 'warning');           
          }else{
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            })
            $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: {
                function: 'descargaFile',
                ruta: dato
              }
            }).then(function (response) {
              swal.close();
              var win = window.open("temp/" + response.data, '_blank');
              win.focus();
            });
          }
      }

      $scope.ObtenerEstadoColorTipo = function (tipo = null) {
        const tipos = {
          A: "etiquetaVerde",
          P: "etiquetaBlue",
          R: "etiquetaReactivar",
             };
              return tipos[tipo] || "Ninguno";
      }

      $scope.estadoReporteColor_Clase = function (estado) {
        // estado con menos de 4 horas
        if (!estado) return;
        if (estado == 'ROJO') {
          return "Con_pulse_X"
        }
        // estado con menos de 4 horas
        if (estado == 'VERDE') {
          return "Con_pulse_H"
        }

        if (estado == 'AMARILLO') {
          return "Con_pulse_Y"
        }

      }

      $scope.estadoReporteColor = function (estado) {
        if (estado) {
          if (estado == 'ROJO') {
            return { "background-color": "rgb(255,0,0) !important;" }
          }
          if (estado == 'AMARILLO') {
            return { "background-color": "rgb(255,255,0)!important" }
          }
          if (estado == 'VERDE') {
            return { "background-color": "rgb(66, 177, 83)!important" }
          }
        }
      }

      $scope.formatfechaValida = function(date){
          let sip = date.split("/");

          let mes = sip[1];
          let dia = sip[0];
          let año = sip[2];

          return new Date(año, mes, dia);
      }   

      $scope.Tipo_de_Documentos = function () {
        $http({
            method: 'POST',
            url: "php/genesis/funcgenesis.php",
            data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
            }
        }).then(({data}) => {
            if (data) {
            $scope.tipo_de_Documentos = data;
            } 
        });
      }
      $scope.Tipo_de_Documentos();

          $scope.mostrarTabla = function(){
              const span = document.querySelector('#adjuntoSeguimiento');
                    $scope.soporte_FL = "";
                    span.innerHTML = "Ningun Archivo Seleccionado";
                    $scope.verDatos = 3;
                    $scope.showmsj = false;
                    $scope.contadorInput = 0;
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
                })
            $http({
                method: 'POST',
                url: "php/medicinalaboral/seguimientoafiliado.php",
                data: {
                function: 'P_CONSULTA_PRELIMINAR_INCAPACIDAD_PROLONGADA',
                }
            }).then(({data}) => { 
                swal.close()   
                $scope.registroIncapacidades = data;
                $scope.registroIncapacidadesTempo = data;
                $scope.iniciodePaginacion(data);
                $scope.filtroTabla("A", 'IC');
                
            });
          }

          $scope.ActualizarDatos = function(){
            const span = document.querySelector('#adjuntoSeguimiento');
                  $scope.soporte_FL = "";
                  span.innerHTML = "Ningun Archivo Seleccionado";
          swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
              })
          $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: {
              function: 'P_CONSULTA_PRELIMINAR_INCAPACIDAD_PROLONGADA',
              }
          }).then(({data}) => { 
              swal.close()   
              $scope.registroIncapacidades = data;
              $scope.registroIncapacidadesTempo = data;
              $scope.iniciodePaginacion(data);
              $scope.filtroTabla("A", 'IC');
              
          });
          }

          $scope.buscarAfiliadoCalificacionOrigen = function (tipo, cedula) {
            if (tipo && cedula) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
                })
                $http({
                  method: 'POST',
                  url: "php/medicinalaboral/seguimientoafiliado.php",
                  data: {
                    function: 'P_DATOS_BASICOS_CALIFICACION_DE_ORIGEN',
                    tipo,
                    cedula,
                  }
                }).then(({data}) => {
                  if (data.Codigo == 1) {
                        swal('Informacion', `${data.Nombre}`, 'warning');
                  }else{
                      $scope.datosAfiliado = data[0];
                      $scope.ultimo_Empleador($scope.datosAfiliado.tipo, $scope.datosAfiliado.documento);
                      $scope.lista_arl();
                      $scope.lista_afp();
    
                      document.querySelectorAll(".inputActualizar").forEach((ele)=>{
                            if (ele.disabled == undefined || ele.disabled == false) {
                                    ele.disabled = true;
                            }
                         })
    
                      document.querySelectorAll(".iconosActualizar").forEach((ele)=>{
                            if (ele.classList.contains("icon-ok-3")) {
                                  ele.classList.remove("icon-ok-3");
                                  ele.classList.add("icon-pen");
                            }
                      })             
                      $scope.formRegistroCalifica.telefono = parseInt($scope.datosAfiliado.telefono);
                      $scope.formRegistroCalifica.arl = ($scope.datosAfiliado.arl == 'N') ? 0 : $scope.datosAfiliado.arl
                      $scope.formRegistroCalifica.AFP = "";
                      $scope.formRegistroCalifica.correo = $scope.datosAfiliado.correo;
                      $scope.formRegistroCalifica.proximoSeguimiento = $scope.formatfechaValida($scope.datosAfiliado.proximo_seguimiento);
                      $scope.formRegistroCalifica.direccion = $scope.datosAfiliado.direccion;
                      $scope.formRegistroCalifica.telefono2 = $scope.datosAfiliado.telefono2;
                      $scope.formRegistroCalifica.barrio = $scope.datosAfiliado.barrio;
                
                      $scope.form2 = {
                          nombre: $scope.datosAfiliado.nombre_y_apellido,
                          tipo: $scope.datosAfiliado.tipo,
                          numero: $scope.datosAfiliado.documento,
                          anteriorEps: $scope.datosAfiliado.anterior_EPS,
                          ubicacion: $scope.datosAfiliado.ubicacion,
                          genero: $scope.datosAfiliado.genero,
                          regimen: $scope.datosAfiliado.regimen,
                          edad: $scope.datosAfiliado.edad,
                          id: $scope.datosAfiliado.id
                      }
                      setTimeout(()=>{
                          $scope.busquedaCalificacion = 2;
                          swal.close(); 
                      },600)
                  }
                });
            }else{
                swal('Informacion', `Complete los campos`, 'error');
            }
          }

          $scope.cargarAdjuntos = function(opcion){
            if (opcion == 'Modal') {
              // $scope.reset_Adjuntos();
              $("#modalAdjuntos").modal("open");
              $scope.habilitarViews = false;
            }
          }

          function setProgressBarWidth(percentage, id) {
            const progressBar = document.getElementById(`${id}Pro`),
                  progressText = document.getElementById(`${id}Text`);
            if (percentage > 0) {
                progressBar.style.width = percentage + '%';
                progressText.style.padding = '13.4rem';
                progressText.textContent = percentage + '%';

                setTimeout(()=>{
                  progressText.textContent = 'Completado';
                  progressBar.style.background = '#008000';
                },500)
            } else {
              progressBar.style.width = percentage + '%';
              progressText.textContent = percentage + '%';
            }
            
          }

          $scope.formAdjuntos = {
            adjuntoSolicitud: "",
            adjuntoEmpresa: "",
            adjuntoUsuarios: "",
            adjuntoDictamen: "",
            adjuntoControversia: "",
            adjuntoRadicacion: "",
            adjuntoEPS: "",
            archivoJRCI: "",
            adjuntoJNCI: "",
            adjuntoConstancia: "",  

            adjuntoSolicitudSeg: "",
            adjuntoEmpresaSeg: "",
            adjuntoUsuariosSeg: "",
            adjuntoDictamenSeg: "",
            adjuntoControversiaSeg: "",
            adjuntoRadicacionSeg: "",
            adjuntoEPS_Seg: "",
            adjuntoJRCI_Seg: "",
            adjuntoJNCI_Seg: "",
            adjuntoConstanciaSeg: "",  

            adjuntoSolicitudSegPL: "",
            adjuntoEmpresaSegPL: "",
            adjuntoUsuariosSegPL: "",
            adjuntoDictamenSegPL: "",
            adjuntoControversiaSegPL: "",
            adjuntoRadicacionSegPL: "",
            adjuntoEPS_SegPL: "",
            adjuntoJRCI_SegPL: "",
            adjuntoJNCI_SegPL: "",
            adjuntoConstanciaSegPL: "",
          }

          $scope.soporte_FL = "";
          document.addEventListener("change", e =>{
            if (e.target.matches(".fancy-file")) {
              setTimeout(() => { $scope.$apply(); }, 500);
              const span = document.querySelector(`#${e.target.name}`);
              console.log(span);
              var files = e.target.files;
              if (files.length != 0) {
                const x = files[0].name.split('.');
                if (x[x.length - 1].toUpperCase() in {'PDF': 'PDF'}) {
                  if (files[0].size < 15485760 && files[0].size > 0) {
                    $scope.getBase64(files[0]).then(function (result) {
                        $scope.soporte_FL = result;
                        span.textContent = files[0].name;
                          console.log(span.textContent);

                      setTimeout(function () { $scope.$apply(); }, 300);
                    });
                  } else {
                    span.textContent = 'Ningun Archivo Seleccionado';
                    swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                  }
                } else {
                  span.textContent = 'Ningun Archivo Seleccionado';
                  swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
                }
              }else{
                span.textContent = 'Ningun Archivo Seleccionado';
              }
            }
          })

          // CALIFICACION DE ORIGEN
          document.addEventListener("change", (e)  => {
            if (e.target.matches(".Masiv-file")) {
              let file = e.target.files;
              const idProgress = e.target.name;
              const span = document.querySelector(`#${e.target.name}`);
              if (file.length > 0) {
                  let valida = file[0].name.split(".");
                  if (valida[valida.length - 1].toUpperCase() == 'PDF') {
                        if (file[0].size > 0 && file[0].size < 15485760) {
                          try {
                            let file_Reader = new FileReader();
                              file_Reader.readAsDataURL(file[0]);
                            
                            file_Reader.addEventListener("progress", e => {  
                              console.log(e);                            
                                if (e.lengthComputable) {
                                  const progressPercentage = (e.loaded / e.total) * 100;
                                  setProgressBarWidth(progressPercentage, idProgress);
                              }
                            })

                            file_Reader.addEventListener("loadend", e => {
                              setProgressBarWidth(100, idProgress);
                              $scope.formAdjuntos[idProgress] = file_Reader.result;
                              console.log("Objeto Adjuntos",$scope.formAdjuntos);
                          })
                              span.textContent = file[0].name;

                          } catch (error) {
                            swal('Informacion', 'Error al cargar el archivo', 'error');              
                          }

                        }else{
                            swal('Informacion', `El archivo no cumple con el peso admitido (15MB)`, 'error');
                        }
                  }else{
                        swal('Informacion', `Solo se permite archivos PDF!`, 'error');
                  }
                  
                }else{
                  setProgressBarWidth(0, idProgress);
                    span.textContent = 'Ningun Archivo Seleccionado';
                    $scope.formAdjuntos[idProgress] = "";
                }
            }
          })

          $scope.validarCamposCalificacion = function (){
            const $formRegistroCalifica =  document.querySelectorAll(".regisCalificacion input[type=text], .regisCalificacion select, .regisCalificacion input[type=date], .regisCalificacion input[type=email], .dataBasic2 input[type=text]");
                document.querySelector("#Calficacion_fecha_event").setAttribute("required", true);
            $scope.validarCampo = true;
            let aux = 0;
            $formRegistroCalifica.forEach( elemen => { 
                if (!elemen.value) {
                    if ((elemen.name == 'Calficacion_fechaEvento' && elemen.value == '')) {
                        if ($scope.formRegistroCalifica.accidenteTrabajo == 'NO') {
                            document.querySelector("#Calficacion_fecha_event").removeAttribute("required");
                        }else{
                          $scope.nombretitle = elemen.title;
                          aux = 2;
                        }
                    }   
                    
                    if (elemen.name != 'Calficacion_fechaEvento' && elemen.classList[0] != 'diagNuevo') {
                      aux = 2;
                      $scope.nombretitle = elemen.title;
                    }
                }
            })
    
            if (aux == 2) {
              $scope.validarCampo = false;
            }else{
              $scope.validarCampo = true;
            }
                return $scope.validarCampo;
          }

          $scope.cargarAdjuntosCalifica = function () {
            $scope.Jsonbase = [
                { "base64": $scope.formAdjuntos.adjuntoSolicitud, "ruta": $scope.rutaFile_adjuntoSolicitud, "codigo": 'adjuntoSolicitud' },
                { "base64": $scope.formAdjuntos.adjuntoEmpresa, "ruta": $scope.rutaFile_adjuntoEmpresa, "codigo": 'adjuntoEmpresa' },
                { "base64": $scope.formAdjuntos.adjuntoUsuarios, "ruta": $scope.rutaFile_adjuntoUsuarios, "codigo": 'adjuntoUsuarios' },
                { "base64": $scope.formAdjuntos.adjuntoDictamen, "ruta": $scope.rutaFile_Dictamen, "codigo": 'adjuntoDictamen' },
                { "base64": $scope.formAdjuntos.adjuntoControversia, "ruta": $scope.rutaFile_Controversia, "codigo": 'adjuntoControversia' },
                { "base64": $scope.formAdjuntos.adjuntoRadicacion, "ruta": $scope.rutaFile_Radicacion, "codigo": 'adjuntoRadicacion' },
                { "base64": $scope.formAdjuntos.adjuntoEPS, "ruta": $scope.rutaFile_EPS, "codigo": 'adjuntoEPS' },
                { "base64": $scope.formAdjuntos.adjuntoJRCI, "ruta": $scope.rutaFile_JRCI, "codigo": 'archivoJRCI' },
                { "base64": $scope.formAdjuntos.adjuntoJNCI, "ruta": $scope.rutaFile_JNCI, "codigo": 'adjuntoJNCI' },
                { "base64": $scope.formAdjuntos.adjuntoConstancia, "ruta": $scope.rutaFileConstancia, "codigo": 'adjuntoConstancia' }
            ];
            return new Promise((resolve) => {
                $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: { function: "cargarAdjuntos", soporte_File: JSON.stringify($scope.Jsonbase) } 
                }).then(function ({ data }) {
                    if (data) {
                      $scope.json = [
                        {ruta: $scope.rutaFile_adjuntoSolicitud = data[0] || '', codigo: '160'},
                        {ruta: $scope.rutaFile_adjuntoEmpresa = data[1]   || '', codigo: '169'},
                        {ruta: $scope.rutaFile_adjuntoUsuarios = data[2]  || '', codigo: '161'},
                        {ruta: $scope.rutaFile_Dictamen = data[3]         || '', codigo: '162'},
                        {ruta: $scope.rutaFile_Controversia = data[4]     || '', codigo: '163'},
                        {ruta: $scope.rutaFile_Radicacion = data[5]       || '', codigo: '164'},
                        {ruta: $scope.rutaFile_EPS = data[6]              || '', codigo: '165'},
                        {ruta: $scope.rutaFile_JRCI = data[7]             || '', codigo: '166'},
                        {ruta: $scope.rutaFile_JNCI = data[8]             || '', codigo: '167'},
                        {ruta: $scope.rutaFileConstancia = data[9]        || '', codigo: '168'},
                                    ]
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
            });
          }
        
          $scope.registrarCalificacionOrigen = function(){
            if ($scope.validarCamposCalificacion()) {
                if (!$scope.formAdjuntos.adjuntoSolicitud) {
                  swal('Info', "El adjunto de solicitud de documentos es obligatorio", 'warning');
                }else{
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                        })
                            $scope.validateTelefono = ($scope.datosAfiliado.telefono == $scope.formRegistroCalifica.telefono) ? false : true
                            $scope.validateARL =  ($scope.datosAfiliado.arl == $scope.formRegistroCalifica.arl) ? false : true
                            $scope.validateCorreo =  ($scope.datosAfiliado.correo == $scope.formRegistroCalifica.correo) ? false : true

                        if ($scope.validateTelefono == true || $scope.validateARL == true || $scope.validateCorreo == true) {
                          $scope.updateForm = 'A';
                        }else{
                          $scope.updateForm = '';
                        }  
                          let json = {
                              correo: $scope.formRegistroCalifica.correo,
                              arl: $scope.formRegistroCalifica.arl,
                              afp: $scope.formRegistroCalifica.AFP,
                              accidente_trabajo: $scope.formRegistroCalifica.accidenteTrabajo,
                              fecha_evento:  $scope.formRegistroCalifica.fechaEvento ? formatDate($scope.formRegistroCalifica.fechaEvento) : '',
                              ultimo_empleador: $scope.formRegistroCalifica.ultimoEmpleador,
                              solicitado_por: $scope.formRegistroCalifica.solicitado,
                              diagnostico1: $scope.formRegistroCalifica.diagnostico,
                              diagnostico2: $scope.formRegistroCalifica.diagnostico2 || '',
                              diagnostico3: $scope.formRegistroCalifica.diagnostico3 || '',
                              diagnostico4: $scope.formRegistroCalifica.diagnostico4 || '',
                              diagnostico5: $scope.formRegistroCalifica.diagnostico5 || '',
                              diagnostico6: $scope.formRegistroCalifica.diagnostico6 || '',
                              origen: $scope.formRegistroCalifica.origen,                     
                              observacion: "",
                              jnci: "",
                              jrci: "",
                              entidad: "",
                              proximo_seguimiento: formatDate($scope.formRegistroCalifica.proximoSeguimiento),
                              telefono1: $scope.formRegistroCalifica.telefono,
                              telefono2: $scope.formRegistroCalifica.telefono2,
                              direccion: $scope.formRegistroCalifica.direccion,
                              barrio: $scope.formRegistroCalifica.barrio
                          }
                          $http({
                            method: 'POST',
                            url: "php/medicinalaboral/seguimientoafiliado.php",
                            data: {
                                function: "P_REGISTRO_CALIFICACION_ORIGEN",
                                jsonDatos: JSON.stringify(json),
                                tipo: 'N',
                                id: '',
                                actualiza: $scope.updateForm,
                                documento: $scope.form2.numero,
                                tipodoc: $scope.form2.tipo,
                              }
                        }).then(({data}) => {
                            if (data.Codigo == 0) {
                              $scope.cargarAdjuntosCalifica().then((result)=> {                     
                                  $http({
                                    method: 'POST',
                                    url: "php/medicinalaboral/seguimientoafiliado.php",
                                    data: {
                                        function: "subirruta",
                                        rutas: JSON.stringify($scope.json),
                                        cantidad: 10,
                                        tipo: 'N',
                                        id: $scope.form2.id,
                                        numerodoc: $scope.form2.numero,
                                        tipodoc: $scope.form2.tipo,  
                                        observacion: 'C'               
                                      }
                                }).then( ({data}) => {
                                    if (data.codigo == 0) {
                                      swal.close();
                                      swal('Registro Exitoso', `Se registo correctamente`, 'success');
                                        setTimeout(()=>{
                                          $scope.SetTabs(2);
                                          $scope.$apply();
                                        },600)
                                                  
                                    }else{
                                        swal('Info', `${data.mensaje}`, 'error');
                                    }
                                  })
                              })
                            }else{
                                swal('Info', `${data.Nombre}`, 'error');
                            }
                        })
                } 
            }else{
              swal('Info', `Complete el campo ${$scope.nombretitle}`, 'warning');
            }
          }
  
          $scope.calcularRangos = function(rango) {
            if (rango >= 0 && rango < 180) {
              $scope.rangoIncapacidad = 1;
            }
            if (rango >= 180 && rango <= 540) {
              $scope.rangoIncapacidad = 2;
            }
            if (rango >540) {
              $scope.rangoIncapacidad = 3;
            }
          }
 
          function detallarFile(id, dato){ 
           let $span = document.getElementById(`${id}`), $span22 = document.querySelector(`[name='${id}']`),
                    nombre = dato.split("/").pop();
                let img = $span.parentElement.previousElementSibling;
                img ? img.src = 'assets/images/png-pdf.png' : img = '';
                $span22 ?  $span22.disabled = true : $span22 = '';
                $span.textContent = nombre;
                $scope.formAdjuntos[id] = dato;
          }

          $scope.reset_Adjuntos = function(){
              let spanMasiv = document.querySelectorAll(".SegMasiv"), progressMasiv = document.querySelectorAll(".SegProgress"), 
              imgPdf = document.querySelectorAll(".imgAdjunto");

                  imgPdf.forEach(ele => {
                    ele.src = 'assets/images/document.png';
                  })

                  spanMasiv.forEach((ele) => {
                    let fileText = ele.firstElementChild;
                        fileText.textContent = 'Ningun Archivo Seleccionado';
                    let input = ele.parentElement.previousElementSibling, text = document.getElementById(`${fileText.id}View`);
                        text ? text.textContent  = 'Sin adjunto' : text = '';
      
                    if (input.files.length != 0) {
                          input.value = "";   
                        }
                    input.disabled = false;  
                    $scope.formAdjuntos[fileText.id] = "";
                    $scope.formAdjuntos[`${fileText.id}View`] = "";
                  })
    
                  progressMasiv.forEach(ele => {
                    ele.firstElementChild.textContent = '0%';
                    ele.style.width = '0%';
                  })
          }

          $scope.abrirModalseguimientoCalificacion = function (X){
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            })
            let rutas = X.RUTAS;
            $scope.reset_Adjuntos();
            document.getElementById("titleSeguimiento").textContent = 'Registrar Seguimiento';
            $scope.Id = X.ID;     
            $scope.activeRegistro = true;
            $scope.activeAdjuntos = false;
            $scope.cedula = X.DOCUMENTO;
            $scope.tipodoc = X.TIPO_DOCUMENTO;
    
            $scope.formSeguimiento = {
                nombre: `${X.PRIMER_NOMBRE} ${X.SEGUNDO_NOMBRE} ${X.PRIMER_APELLIDO} ${X.SEGUNDO_APELLIDO}`,
                documento: `${X.TIPO_DOCUMENTO} - ${X.DOCUMENTO}`,
                anteriorEps: X.ANTERIO_EPS,
                ubicacion: X.REGIONAL,
                genero: X.GENERO,
                diagnostico: X.DIAGNOSTICO1,
                regimen: X.REGIMEN,
                edad: X.EDAD,
                correo: X.CORREO,
                arl: $scope.optionValidate('ARL',X.ARL),
                afp: $scope.optionValidate('AFP',X.AFP),
                accidenteTrabajo: X.ACCIDENTE_DE_TRABAJO,
                fechaEvento: X.FECHA_DEL_EVENTO == "" ? 'NO REGISTRA' : X.FECHA_DEL_EVENTO,
                origen: X.ORIGEN,
                estadoCalifica: "",
                fecha: "",
                entidad: "",
                fecha_calificacion: "",
                observacionCalifica: "",
                abusoDerecho: "",
                proxSeguimiento2: "",
                proxSeguimiento: "",
                entidadPerdida: "",
                NumberCalificacion: "",
                observacionPerdida: ""
            }

            rutas.forEach(ele => {
              if (ele.tipo_archivo == '160') {
                setProgressBarWidth(100, 'adjuntoSolicitudSeg')
                detallarFile('adjuntoSolicitudSeg',ele.RUTA)
              }
              if (ele.tipo_archivo == '169') {
                setProgressBarWidth(100, 'adjuntoEmpresaSeg')
                detallarFile('adjuntoEmpresaSeg',ele.RUTA)

              }
              if (ele.tipo_archivo == '161') {
                setProgressBarWidth(100, 'adjuntoUsuariosSeg')
                detallarFile('adjuntoUsuariosSeg',ele.RUTA)

              }
              if (ele.tipo_archivo == '162') {
                setProgressBarWidth(100, 'adjuntoDictamenSeg')
                detallarFile('adjuntoDictamenSeg',ele.RUTA)
              }
              if (ele.tipo_archivo == '163') {
                setProgressBarWidth(100, 'adjuntoControversiaSeg')
                detallarFile('adjuntoControversiaSeg',ele.RUTA)
              }
              if (ele.tipo_archivo == '164') {
                setProgressBarWidth(100, 'adjuntoRadicacionSeg')
                detallarFile('adjuntoRadicacionSeg',ele.RUTA)
              }
              if (ele.tipo_archivo == '165') {
                setProgressBarWidth(100, 'adjuntoEPS_Seg')
                detallarFile('adjuntoEPS_Seg',ele.RUTA)
              }
              if (ele.tipo_archivo == '166') {
                setProgressBarWidth(100, 'adjuntoJRCI_Seg')
                detallarFile('adjuntoJRCI_Seg',ele.RUTA)
              }
              if (ele.tipo_archivo == '167') {
                setProgressBarWidth(100, 'adjuntoJNCI_Seg')
                detallarFile('adjuntoJNCI_Seg',ele.RUTA)
              }
              if (ele.tipo_archivo == '168') {
                setProgressBarWidth(100, 'adjuntoConstanciaSeg')
                detallarFile('adjuntoConstanciaSeg',ele.RUTA)
              }
            })

            
            setTimeout(()=>{
              swal.close();
              $("#modalSeguimiento2").modal("open");
            },600)

            
          }

          $scope.validarCamposSeguimientoCalificacion = function (){
            document.querySelector("#entidadCalificacion").setAttribute("required", true);
            document.querySelector("#fecha_calificacion").setAttribute("required", true);
            const $formRegistroSeg =  document.querySelectorAll(".regisSeguiCalifica [required], .regisSeguiCalifica [required=true]");
            $scope.validarCampo = true;
            let aux = 0;

            $formRegistroSeg.forEach(elemen => { 
                if (!elemen.value) {
                  if ((elemen.name == 'entidadCalificacion' && elemen.value == '') && ($scope.formSeguimiento.estado == 'P')) {
                    aux = 1;
                    document.querySelector("#motivo_seguimiento").removeAttribute("required");
                  }  
                  if ((elemen.name == 'fecha_calificacion' && elemen.value == '') && ($scope.formSeguimiento.estado == 'P')) {
                    aux = 1;
                    document.querySelector("#fecha_calificacion").removeAttribute("required");
                  }     
                  
                  if (elemen.name != 'entidadCalificacion' && elemen.name != 'fecha_calificacion') {
                    aux = 2;
                  }
                }
            })
    
            if (aux == 2) {
              $scope.validarCampo = false;
            }else{
              $scope.validarCampo = true;
    
            }
                return $scope.validarCampo;
          }

          $scope.cargarBase64Adjuntos = function(){
            $scope.jsonAdjuntos = [];
            for (const iterator in $scope.formAdjuntos) {
              let name = iterator.slice(-3)
              if (name == 'Seg') {
                if ($scope.formAdjuntos[iterator].slice(1,7) != 'cargue') {
                  $scope.jsonAdjuntos.push({"base64": $scope.formAdjuntos[iterator], "codigo": `${iterator}`})
                }else{
                  $scope.jsonAdjuntos.push({"base64": '', "codigo": `${iterator}`})
                  // $scope.jsonAdjuntos.push({"base64": '', ruta: $scope.formAdjuntos[iterator], "codigo": `${iterator}`})
                }
              }
            }
            // console.log($scope.jsonAdjuntos);
            return new Promise((resolve)=>{
              $http({
                method: 'POST',
                url: "php/medicinalaboral/seguimientoafiliado.php",
                data: { function: "cargarAdjuntos", soporte_File: JSON.stringify($scope.jsonAdjuntos)}
            }).then(function ({ data }) {
                if (data) {
                  $scope.json =  [
                    {ruta: $scope.rutaFile_adjuntoSolicitud = data[0] || '', codigo: '160'},
                    {ruta: $scope.rutaFile_adjuntoEmpresa = data[1]   || '', codigo: '169'},
                    {ruta: $scope.rutaFile_adjuntoUsuarios = data[2]  || '', codigo: '161'},
                    {ruta: $scope.rutaFile_Dictamen = data[3]         || '', codigo: '162'},
                    {ruta: $scope.rutaFile_Controversia = data[4]     || '', codigo: '163'},
                    {ruta: $scope.rutaFile_Radicacion = data[5]       || '', codigo: '164'},
                    {ruta: $scope.rutaFile_EPS = data[6]              || '', codigo: '165'},
                    {ruta: $scope.rutaFile_JRCI = data[7]             || '', codigo: '166'},
                    {ruta: $scope.rutaFile_JNCI = data[8]             || '', codigo: '167'},
                    {ruta: $scope.rutaFileConstancia = data[9]        || '', codigo: '168'},
                                ]
                    resolve(data);
                } else {
                    resolve(false);
                }
            });

            })
          }
    
          $scope.registrarSeguimientoCalificacion = function (){
              if ($scope.validarCamposSeguimientoCalificacion()) {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                  })
                  let json = {       
                    correo: '',
                    arl: '',
                    afp: '',
                    accidente_trabajo: '',
                    fecha_evento: '',
                    ultimo_empleador: '',
                    solicitado_por: '',
                    diagnostico1: '',
                    diagnostico2: '',
                    diagnostico3: '',
                    diagnostico4: '',
                    diagnostico5: '',
                    diagnostico6: '',
                    origen: '',                     
                    observacion: $scope.formSeguimiento.observacionCalifica,
                    fecha_seguimiento: '',
                    fecha_calificacion: $scope.formSeguimiento.fecha_calificacion ? formatDate($scope.formSeguimiento.fecha_calificacion) : '',
                    entidad: $scope.formSeguimiento.entidad || '',
                    estado: $scope.formSeguimiento.estadoCalifica,
                    proximo_seguimiento: $scope.formSeguimiento.proxSeguimiento2 ? formatDate($scope.formSeguimiento.proxSeguimiento2) : ''
                  }
                  $http({
                    method: 'POST',
                    url: "php/medicinalaboral/seguimientoafiliado.php",
                    data: {
                        function: "P_REGISTRO_CALIFICACION_ORIGEN",
                        jsonDatos: JSON.stringify(json),
                        tipo: 'S',
                        id: $scope.Id,
                        actualiza: '',
                        documento: $scope.cedula,
                        tipodoc: $scope.tipodoc,
                    }
                }).then( ({data}) => {
                    if (data.Codigo == 0) {
                      $scope.cargarBase64Adjuntos().then((result)=> {
                          $http({
                            method: 'POST',
                            url: "php/medicinalaboral/seguimientoafiliado.php",
                            data: {
                                  function: "subirruta",
                                  rutas: JSON.stringify($scope.json),
                                  cantidad: 10,
                                  tipo: 'S',
                                  id: $scope.Id,
                                  numerodoc: $scope.cedula,
                                  tipodoc: $scope.tipodoc,  
                                  observacion: 'C'               
                              }
                            }).then(({data}) => {
                              swal.close();
                              swal('Registro Exitoso', `${data.Nombre}`, 'success');
                              $scope.closeModal();
                              $scope.getResgistrosCalificacion(1);
                              setTimeout(()=>{
                                $scope.$apply();
                              },500)
                            })
                         })
                    }else{
                        swal('INFO', `${data.Nombre}`, 'error');
                    }
                })
                
              }else{
                  swal('Info', "Complete los campos vacios", 'warning');
              }
              
            
              //  $scope.cargarBase64Adjuntos()

          }

          $scope.AbrirModalConsultaDiagnostico = function (dato) {
            $("#modalDiagnosticosConsulta").modal("open");
            setTimeout(() => {
              $('#diaginputAtel').focus();
            }, 100);
      
            $scope.nombre = `${dato.PRIMER_NOMBRE} ${dato.SEGUNDO_NOMBRE} ${dato.PRIMER_APELLIDO} ${dato.SEGUNDO_APELLIDO}`;
            $scope.diagnosticosAdicion = {
              diagnostico: dato.DIAGNOSTICO1,
              diagnostico1:dato.DIAGNOSTICO2,
              diagnostico2: dato.DIAGNOSTICO3,
              diagnostico3: dato.DIAGNOSTICO4,
              diagnostico4:dato.DIAGNOSTICO5,  
              diagnostico5:dato.DIAGNOSTICO6
            }
          }

          $scope.AbrirModalDiagnosticos = function (genero, edad, opcion) {
            if ($scope.arrayDiag.length > 0) {
                  $scope.habilitarSearch = false;
                  $scope.habilitarConfirm = true;
              
            }else{
              $scope.habilitarSearch = true;
              $scope.habilitarConfirm = null;
              $scope.arrayDiag = [];
              $scope.datosDiagnostico = [];
              $scope.diaginputAtel = '';
              $scope.aux = 0;
            }
            $("#modaldiagnosticoATEL").modal("open");

            $scope.genero = genero;
            $scope.edad = edad;

            switch (opcion) {
              case 'I':
                $scope.clave = 1;
                  break;
              case 'C':
                $scope.clave = 2;
                  break;
              case 'P':
                $scope.clave = 3;
                  break;       
            }
            setTimeout(() => {
                $('#diaginputAtel').focus();
            }, 100);
          }

          $scope.buscarDiagnosticoAtel = function () {
              if ($scope.diaginputAtel == "" || $scope.diaginputAtel == null) {
                swal({
                  title: "Mensaje",
                  text: "Campo Vacio",
                  type: "info",
                })
              } else if ($scope.diaginputAtel.length > 2) {
                $scope.datosDiagnostico = "";
                $http({
                  method: 'POST',
                  url: "php/medicinalaboral/eventosatel.php",
                  data: {
                    function: 'obtenerDiagnosticos',
                    sexo: ($scope.genero == 'FEMENINO' ? 'F' : 'M'),
                    edad: $scope.edad.slice(0,3),
                    codigo: $scope.diaginputAtel
                  }
                }).then(function ({data}) {
                  if (data[0].Codigo == -1) {
                    swal('Informacion', `${data[0].Nombre}`, 'error');
                  }else{
                    $scope.datosDiagnostico = data;
                    // $scope.habilitarConfirm = true;
                  }
                })
              }
          }

          $scope.contadorDiagnostico = function () {
              $scope.calseDiv1 = "col s12";
              $scope.calseDiv2 = "col s6";
              $scope.txtDiag = false;
              if (!$scope.formRegistro.diagnostico) {
                swal('Mensaje', "No puedes agregar otro Diagnostico sin agregar el principal", 'info');
              } if($scope.contadorInput > 4){
                swal('Atencion!', "Solo esta permitido agregar 5 dignosticos adicionales", 'error');

              }else if($scope.contadorInput ==  1 && $scope.diagnosticoATEL1 == "" || $scope.contadorInput ==  2 && $scope.formRegistro.diagnostico2 == "" ||
                      $scope.contadorInput ==  3 && $scope.formRegistro.diagnostico3 == "" || $scope.contadorInput ==  4 && $scope.formRegistro.diagnostico4 == "" 
                        ) {
                swal('Complete el Diagnostico!', "Se necesita completar el campo de Diagnostico para agregar uno nuevo", 'error');
              }else{
                $scope.contadorInput = $scope.contadorInput + 1;
                $scope.datosDiagnosticoNuevo = "";       
              }
          }

          $scope.newDiagnostico = function(opcion){
            if (opcion == 'A') {
              $scope.habilitarSearch = true;
            $scope.diaginputAtel = '';
            $scope.datosDiagnostico = [];
            $scope.habilitarConfirm = false;
            }

            if (opcion == 'B') {
              $scope.habilitarSearch = false;
              $scope.habilitarConfirm = true;
            }
            
          }
      
          $scope.seleccionardiagnostico = function(diag){
              let aux = 0;
              if ($scope.clave == 1) {
                    if ($scope.arrayDiag.length < 4) {
                      if ($scope.arrayDiag.length > 0) {
                        $scope.arrayDiag.forEach((elem)=>{
                            if (elem.CODIGO == diag.Codigo) {
                                aux = 1;
                            } 
                        })
                      }
                      if (aux != 1) {
                        $scope.habilitarSearch = false;
                        $scope.habilitarConfirm = true;
                        $scope.arrayDiag.push({ID: $scope.aux, CODIGO: diag.Codigo, DESCRIPCION: diag.Nombre })
                        ++$scope.aux;
                      }else{
                        swal('Info', "Ya ingresastes este diagnostico", 'warning');
                      }
                    }else{
                      swal('Info', "Solo esta permitido agregar un maximo de 4 diagnosticos", 'error');
                    }
              }

              if ($scope.clave != 1) {
                    if ($scope.arrayDiag.length < 6 && $scope.clave != 1) {
                      if ($scope.arrayDiag.length > 0) {
                        $scope.arrayDiag.forEach((elem)=>{
                            if (elem.CODIGO == diag.Codigo) {
                                aux = 1;
                            } 
                        })
                      }
                      if (aux != 1) {
                          $scope.habilitarSearch = false;
                          $scope.habilitarConfirm = true;
                          $scope.arrayDiag.push({ID: $scope.aux, CODIGO: diag.Codigo, DESCRIPCION: diag.Nombre })
                          ++$scope.aux;
                      }else{
                        swal('Info', "Ya ingresastes este diagnostico", 'warning');
                      }
                        }else{
                      swal('Info', "Solo esta permitido agregar un maximo de 6 diagnosticos", 'error');
                    }
              }   
          }

          $scope.confirmDiagnosticos = function(){
              if ($scope.arrayDiag.length > 0) {
                if ($scope.clave == 1) {
                  $scope.formRegistro.diagnostico = $scope.arrayDiag[0] != undefined ? $scope.arrayDiag[0].DESCRIPCION : '';
                  $scope.formRegistro.diagnostico2 = $scope.arrayDiag[1] != undefined ? $scope.arrayDiag[1].DESCRIPCION : '';
                  $scope.formRegistro.diagnostico3 = $scope.arrayDiag[2] != undefined ? $scope.arrayDiag[2].DESCRIPCION : '';
                  $scope.formRegistro.diagnostico4 = $scope.arrayDiag[3] != undefined ? $scope.arrayDiag[3].DESCRIPCION : '';
                  $scope.contadorInput = $scope.arrayDiag.length - 1;
                  $scope.closeModal();
                }
                  if ($scope.clave == 2) {
                    $scope.formRegistroCalifica.diagnostico = $scope.arrayDiag[0] != undefined ? $scope.arrayDiag[0].DESCRIPCION : '';
                    $scope.formRegistroCalifica.diagnostico2 = $scope.arrayDiag[1] != undefined ? $scope.arrayDiag[1].DESCRIPCION : '';
                    $scope.formRegistroCalifica.diagnostico3 = $scope.arrayDiag[2] != undefined ? $scope.arrayDiag[2].DESCRIPCION : '';
                    $scope.formRegistroCalifica.diagnostico4 = $scope.arrayDiag[3] != undefined ? $scope.arrayDiag[3].DESCRIPCION : '';
                    $scope.formRegistroCalifica.diagnostico5 = $scope.arrayDiag[4] != undefined ? $scope.arrayDiag[4].DESCRIPCION : '';
                    $scope.formRegistroCalifica.diagnostico6 = $scope.arrayDiag[5] != undefined ? $scope.arrayDiag[5].DESCRIPCION : '';
                    $scope.contadorInput = $scope.arrayDiag.length - 1;
                    $scope.closeModal();
                  }
                  if ($scope.clave == 3) {
                    $scope.formRegistroPerdida.diagnostico = $scope.arrayDiag[0] != undefined ? $scope.arrayDiag[0].DESCRIPCION : '';
                    $scope.formRegistroPerdida.diagnostico2 = $scope.arrayDiag[1] != undefined ? $scope.arrayDiag[1].DESCRIPCION : '';
                    $scope.formRegistroPerdida.diagnostico3 = $scope.arrayDiag[2] != undefined ? $scope.arrayDiag[2].DESCRIPCION : '';
                    $scope.formRegistroPerdida.diagnostico4 = $scope.arrayDiag[3] != undefined ? $scope.arrayDiag[3].DESCRIPCION : '';
                    $scope.formRegistroPerdida.diagnostico5 = $scope.arrayDiag[4] != undefined ? $scope.arrayDiag[4].DESCRIPCION : '';
                    $scope.formRegistroPerdida.diagnostico6 = $scope.arrayDiag[5] != undefined ? $scope.arrayDiag[5].DESCRIPCION : '';
                    $scope.contadorInput = $scope.arrayDiag.length - 1;
                    $scope.closeModal();
                  }
              }else{
                  swal('Info', "Debes elegir el diagnostico principal", 'error');
              }
          }

          $scope.accionDiagnostico = function(opcion, dato){
              if (opcion == 'ELIMINAR') {
                  $scope.arrayDiag.splice(dato.ID, 1)
                  $scope.aux = $scope.arrayDiag.length - 1;
              }
          }

          $scope.buscarMasDiagnosticos = function (diagnosticoNuevo) {
              if (!$scope.diagnostico1) {
                  swal('Info', "No tienes diagnostico principal", 'warning');
                
              } else if ($scope.diagnostico1.length > 2) {
                $http({
                  method: 'POST',
                  url: "php/medicinalaboral/eventosatel.php",
                  data: {
                    function: 'obtenerDiagnosticos',
                    sexo: ($scope.form1.genero == 'FEMENINO' ? 'F' : 'M'),
                    edad: $scope.form1.edad.slice(0,3),
                    codigo: diagnosticoNuevo
                  }
                }).then(function (response) {
                  $scope.datosDiagnosticoNuevo = response.data;
                })
        
              }
          }

          $scope.filtroTabla = function(a, opcion){   
            if (opcion == 'IC') {
              $scope.registroIncapacidadesActivo = $scope.registroIncapacidadesTempo.filter(e => e.ESTADO == 'A' || e.ESTADO == 'R')
              $scope.registroIncapacidadesProcesado = $scope.registroIncapacidadesTempo.filter(e => e.ESTADO == 'P')
              $scope.registroIncapacidadesGreen = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'VERDE' && e.ESTADO != 'P')
              $scope.registroIncapacidadesRed = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'ROJO' && e.ESTADO != 'P')
              $scope.registroIncapacidadesYellow = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'AMARILLO' && e.ESTADO != 'P')
            }else{
              $scope.registroIncapacidadesActivo = $scope.registroIncapacidadesTempo.filter(e => e.ESTADO == 'A' || e.ESTADO == 'R')
              $scope.registroIncapacidadesProcesado = $scope.registroIncapacidadesTempo.filter(e => e.ESTADO == 'P')
              $scope.registroIncapacidadesGreen = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'VERDE' && e.ESTADO != 'P')
              $scope.registroIncapacidadesRed = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'ROJO' && e.ESTADO != 'P')
              $scope.registroIncapacidadesYellow = $scope.registroIncapacidadesTempo.filter(e => e.COLOR_PROXIMO_SEGUIMIENTO == 'AMARILLO' && e.ESTADO != 'P')
            }    
              if (a == 'A') {
                  $scope.registroIncapacidades =  $scope.registroIncapacidadesActivo;
                  $scope.inhabilitarRegistro = false;
                  $scope.filtrocheck_option.DOCUMENTO = 'ACTIVO';
                  $scope.filtrocheck_option.ESTADO = '';
                  $scope.inactiveColumna = false;
                }
                if (a == 'P') {
                  $scope.registroIncapacidades = $scope.registroIncapacidadesProcesado;
                  $scope.inhabilitarRegistro = true;
                  $scope.filtrocheck_option.DOCUMENTO = 'PROCESADO';
                  $scope.filtrocheck_option.ESTADO = '';
                  $scope.inactiveColumna = true;
                }
                if (a == 'green') {
                  $scope.registroIncapacidades = $scope.registroIncapacidadesGreen;
                  $scope.inhabilitarRegistro = false;
                  $scope.filtrocheck_option.ESTADO = 'A';
                  $scope.filtrocheck_option.DOCUMENTO = '';
                  $scope.inactiveColumna = false;
                }
                if (a == 'yellow') {
                  $scope.registroIncapacidades = $scope.registroIncapacidadesYellow;
                  $scope.inhabilitarRegistro = false;
                  $scope.filtrocheck_option.ESTADO = 'B';
                  $scope.filtrocheck_option.DOCUMENTO = '';
                  $scope.inactiveColumna = false;

                }
                if (a == 'red') {
                  $scope.registroIncapacidades = $scope.registroIncapacidadesRed;
                  $scope.inhabilitarRegistro = false;
                  $scope.filtrocheck_option.ESTADO = 'C';
                  $scope.filtrocheck_option.DOCUMENTO = '';
                  $scope.inactiveColumna = false;

                }
          }

          $scope.reset_formularios = function(){
                const $formularios = document.querySelectorAll(".contact-form");
                $formularios.forEach((form) => {
                    form.reset();

                    const selects = form.querySelectorAll("select");
                    selects.forEach((select) => {
                        select.selectedIndex = 0;
                    });
                });

              setTimeout(()=>{
                  $scope.reset_Adjuntos();
              },1000)
          }

          $scope.limpiarDatos = function(){
            $scope.tipo_documento = "";
            $scope.numeroId = "";
            $scope.registroIncapacidades = [];
            $scope.Pag = 10;
            $scope.arrayDiag = [];
            $scope.titleModalAdjunto = 'Cargar Adjuntos';
            $scope.contadorInput = 0;
            $scope.rangoIncapacidad = "";
            $scope.diagnostico1 = "";
            $scope.filtrocheck_option = {
              DOCUMENTO: 'ACTIVO',
              ESTADO: ''
            }
            $scope.afiliacion = {
              options_penciones_afp: "",
              options_riesgos_laborales_arl: ""
            }
            $scope.form1 = {
                nombre: "",
                tipo: "",
                numero: "",
                anteriorEps: "",
                ubicacion: "",
                genero: "",
                regimen: "",
                edad: "",
            }
            $scope.formRegistro = {
                proximoSeguimiento: "",
                correo: "",
                arl: "",
                AFP: "",
                accidenteTrabajo: "",
                fechaEvento: "",
                enfermedadLaboral: "",
                diagnostico: "",
                diagnostico2: "",
                diagnostico3: "",
                diagnostico4: "",
                emisionRehabilitacion: "",
                conceptoRehabilitacion: "",
                fechaEmision: "",
                origen: "",
                diasIncapacidad: "",
                telefono: "",
                telefono2: "",
                direccion: "",
                barrio: "",
            } 
            $scope.formRegistroCalifica = {
              correo: "",
              arl: "",
              AFP: "",
              accidenteTrabajo: "",
              fechaEvento: "",
              diagnostico: "",
              diagnostico2: "",
              diagnostico3: "",
              diagnostico4: "",
              diagnostico5: "",
              diagnostico6: "",
              fechaEmision: "",
              origen: "",
              solicitado: "",
              ultimoEmpleador: "",
              telefono: "",
              direccion: "",
              telefono2: "",
              barrio: "",
              proximoSeguimiento: ""
            } 
           $scope.formRegistroPerdida = {
            correo: "",
            arl: "",
            AFP: "",
            accidenteTrabajo: "",
            fechaEvento: "",
            diagnostico: "",
            diagnostico2: "",
            diagnostico3: "",
            diagnostico4: "",
            diagnostico5: "",
            diagnostico6: "",
            fechaEmision: "",
            origen: "",
            solicitado: "",
            ultimoEmpleador: "",
            telefono: "",
            telefono2: "",
            direccion: "",
            barrio: "",
            }  
          }



          $scope.SetTabs = function(x){
            $scope.reset_formularios();
            if (x == 2) {
              $scope.limpiarDatos()
              $scope.busquedaCalificacion = 1;
              $scope.verDatos = 0;
              $scope.verCalificacion = 0;
              document.querySelector("#cardOrigen").classList.add("md-sidenav-right");

              setTimeout(()=>{
                  document.querySelector("#cardOrigen").classList.remove("md-sidenav-right");
              },220)
            }

            if (x == 1) {
                $scope.limpiarDatos()
                $scope.verDatos = 2;
                $scope.busquedaCalificacion = 0;
                document.querySelector("#cardIncapacidad").classList.add("md-sidenav-right");

                setTimeout(()=>{
                    document.querySelector("#cardIncapacidad").classList.remove("md-sidenav-right");
                },220)
            }

            if (x == 3) {
                $scope.limpiarDatos()
                $scope.verDatos = 0;
                $scope.verCalificacion = 0;
                $scope.busquedaCalificacion = 3;
                document.querySelector("#cardPerdida").classList.add("md-sidenav-right");

                setTimeout(()=>{
                    document.querySelector("#cardPerdida").classList.remove("md-sidenav-right");
                },220)
                }
                $scope.tabs = x;
          }

          $scope.getResgistrosCalificacion = function (opcion){
            $scope.contadorInput = 0;
            $scope.arrayDiag = [];

            if (opcion) {
              $scope.verCalificacion = 1;
              $scope.busquedaCalificacion = 0;
            }
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
              })
          $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: {
              function: 'P_CONSULTA_PRELIMINAR_CALIFICACION_DE_ORIGEN',
                  }
          }).then(({data}) => { 
                  swal.close();   
                //  $scope.registroIncapacidades = [];
                //  $scope.registroIncapacidadesTempo = [];
                $scope.registroIncapacidades = data;
                $scope.registroIncapacidadesTempo = data;
                $scope.iniciodePaginacion(data);

                setTimeout(()=> {
                  $scope.filtroTabla("A");
                },100)
          });
          }

          $scope.camiosOpcion = function (opcion){
              if (opcion == 'ver') {
                $scope.activeAdjuntos = true;
                document.getElementById("titleSeguimiento").textContent = 'Adjuntos';
                $scope.activeRegistro = false;
              }

              if (opcion == 'regresar') {
                document.getElementById("titleSeguimiento").textContent = 'Registrar Seguimiento';
                $scope.activeAdjuntos = false;
                $scope.activeRegistro = true;
              }
          }

        //  ****** -------------  PERDIDA CAPACIDAD LABORAL -------------- ***********
        $scope.datosbasicosPerdidaLabora = function(tipo, cedula){
            if (tipo && cedula) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
                })
              $http({
                method: 'POST',
                url: "php/medicinalaboral/seguimientoafiliado.php",
                data: {
                  function: 'P_DATOS_BASICOS_AFILIADO_PERDIDA_CAPACIDAD_LABORAL',
                  tipo,
                  cedula,
                }
              }).then( ({data}) => {
                if (data.Codigo == 1) {
                  swal('Informacion', `${data.Nombre}`, 'warning');
                }else{
                      $scope.datosAfiliado2 = data[0];
                      $scope.ultimo_Empleador($scope.datosAfiliado2.tipo, $scope.datosAfiliado2.documento);
                      $scope.lista_arl();
                      $scope.lista_afp();
    
                      document.querySelectorAll(".inputActualizar").forEach((ele)=>{
                            if (ele.disabled == undefined || ele.disabled == false) {
                                ele.disabled = true;
                            }
                         })
    
                      document.querySelectorAll(".iconosActualizar").forEach((ele)=>{
                            if (ele.classList.contains("icon-ok-3")) {
                                  ele.classList.remove("icon-ok-3");
                                  ele.classList.add("icon-pen");
                            }
                      })             
                      $scope.formRegistroPerdida.telefono = parseInt($scope.datosAfiliado2.telefono);
                      $scope.formRegistroPerdida.arl = ($scope.datosAfiliado2.arl == 'N') ? 0 : $scope.datosAfiliado2.arl;
                      $scope.formRegistroPerdida.AFP = "";
                      $scope.formRegistroPerdida.correo = $scope.datosAfiliado2.correo;
                      $scope.formRegistroPerdida.proximoSeguimiento = $scope.formatfechaValida($scope.datosAfiliado2.proximo_seguimiento);
                      
                      $scope.formRegistroPerdida.direccion = $scope.datosAfiliado2.direccion;
                      $scope.formRegistroPerdida.telefono2 = $scope.datosAfiliado2.telefono2;
                      $scope.formRegistroPerdida.barrio = $scope.datosAfiliado2.barrio;
              
                    $scope.form2 = {
                        nombre: $scope.datosAfiliado2.nombre_y_apellido,
                        tipo: $scope.datosAfiliado2.tipo,
                        numero: $scope.datosAfiliado2.documento,
                        anteriorEps: $scope.datosAfiliado2.anterior_EPS,
                        ubicacion: $scope.datosAfiliado2.ubicacion,
                        genero: $scope.datosAfiliado2.genero,
                        regimen: $scope.datosAfiliado2.regimen,
                        edad: $scope.datosAfiliado2.edad,
                        id: $scope.datosAfiliado2.id 
                    }

                    setTimeout(()=>{
                      $scope.busquedaCalificacion = 4;
                      swal.close();
                    },600)
                }
              });
          }else{
              swal('Informacion', `Complete los campos`, 'error');
          }
        }

        $scope.validarCamposPerdida = function (){
        document.querySelector("#Perdida_fecha_event").setAttribute("required", true);
        const $formRegistroPerdida = document.querySelectorAll(".regisPerdida input[type=text], .regisPerdida select, .regisPerdida input[type=date], .regisPerdida input[type=email], , .dataBasic3 input[type=text]");
        $scope.validarCampo = true;
        let aux = 0;
        $formRegistroPerdida.forEach(elemen => { 
            if (!elemen.value){
              if (elemen.name == 'Perdida_fechaEvento' && elemen.value == '') {
                if ($scope.formRegistroPerdida.accidenteTrabajo == 'NO') {
                  document.querySelector("#Perdida_fecha_event").removeAttribute("required");
                }else{
                  aux = 1;
                  $scope.nombretitle = elemen.title;
                }
              }                  
              if (elemen.name != 'Perdida_fechaEvento' && elemen.classList[0] != 'diagNuevo') {
                aux = 2;
                $scope.nombretitle = elemen.title;
              }
            }
        })
        if (aux == 2) {
          $scope.validarCampo = false;
        }else{
          $scope.validarCampo = true;
        }
          return $scope.validarCampo;
        }

        $scope.cargarBase64AdjuntosPerdida = function(){
          $scope.jsonPerdida = [];
          for (const iterator in $scope.formAdjuntos) {
            let name = iterator.slice(-3)
            if (name == 'gPL') {
              if ($scope.formAdjuntos[iterator].slice(1,7) != 'cargue') {
                $scope.jsonPerdida.push({"base64": $scope.formAdjuntos[iterator], "codigo": `${iterator}`})
              }else{
                $scope.jsonPerdida.push({"base64": '', "codigo": `${iterator}`})
                // $scope.jsonAdjuntos.push({"base64": '', ruta: $scope.formAdjuntos[iterator], "codigo": `${iterator}`})
              }
            }
          }
          // console.log($scope.jsonAdjuntos);
          return new Promise((resolve)=>{
            $http({
              method: 'POST',
              url: "php/medicinalaboral/seguimientoafiliado.php",
              data: { function: "cargarAdjuntos", soporte_File: JSON.stringify($scope.jsonPerdida)}
          }).then(function ({ data }) {
              if (data) {
                $scope.jsonP =  [
                  {ruta: $scope.rutaFile_adjuntoSolicitud = data[0] || '', codigo: '160'},
                  {ruta: $scope.rutaFile_adjuntoEmpresa = data[1]   || '', codigo: '169'},
                  {ruta: $scope.rutaFile_adjuntoUsuarios = data[2]  || '', codigo: '161'},
                  {ruta: $scope.rutaFile_Dictamen = data[3]         || '', codigo: '162'},
                  {ruta: $scope.rutaFile_Controversia = data[4]     || '', codigo: '163'},
                  {ruta: $scope.rutaFile_Radicacion = data[5]       || '', codigo: '164'},
                  {ruta: $scope.rutaFile_EPS = data[6]              || '', codigo: '165'},
                  {ruta: $scope.rutaFile_JRCI = data[7]             || '', codigo: '166'},
                  {ruta: $scope.rutaFile_JNCI = data[8]             || '', codigo: '167'},
                  {ruta: $scope.rutaFileConstancia = data[9]        || '', codigo: '168'},
                              ]
                  resolve(data);
              } else {
                  resolve(false);
              }
          });

          })
        }

        $scope.postPerdidaCapacidad = function(){
          if ($scope.validarCamposPerdida()) {
            if (!$scope.formAdjuntos.adjuntoSolicitud) {
              swal('Info', "El adjunto de solicitud de documentos es obligatorio", 'warning');
            }else{
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false
                      })
                      $scope.validateTelefono = ($scope.datosAfiliado2.telefono == $scope.formRegistroPerdida.telefono) ? false : true
                      $scope.validateARL =  ($scope.datosAfiliado2.arl == $scope.formRegistroPerdida.arl) ? false : true
                      $scope.validateCorreo =  ($scope.datosAfiliado2.correo == $scope.formRegistroPerdida.correo) ? false : true
          
                      if ($scope.validateTelefono == true || $scope.validateARL == true || $scope.validateCorreo == true) {
                             $scope.updateForm = 'A';
                      } else{
                             $scope.updateForm = '';
                      }
                      let json = {
                          correo: $scope.formRegistroPerdida.correo,
                          arl: $scope.formRegistroPerdida.arl,
                          afp: $scope.formRegistroPerdida.AFP,
                          accidente_trabajo: $scope.formRegistroPerdida.accidenteTrabajo,
                          fecha_evento:  $scope.formRegistroPerdida.fechaEvento ? formatDate($scope.formRegistroPerdida.fechaEvento) : '',
                          ultimo_empleador: $scope.formRegistroPerdida.ultimoEmpleador,
                          solicitado_por: $scope.formRegistroPerdida.solicitado,
                          diagnostico1: $scope.formRegistroPerdida.diagnostico,
                          diagnostico2: $scope.formRegistroPerdida.diagnostico2 || '',
                          diagnostico3: $scope.formRegistroPerdida.diagnostico3 || '',
                          diagnostico4: $scope.formRegistroPerdida.diagnostico4 || '',
                          diagnostico5: $scope.formRegistroPerdida.diagnostico5 || '',
                          diagnostico6: $scope.formRegistroPerdida.diagnostico6 || '',                  
                          observacion: "",
                          jnci: "",
                          jrci: "",
                          entidad: "",
                          telefono1: $scope.formRegistroPerdida.telefono,
                          telefono2: $scope.formRegistroPerdida.telefono2,
                          direccion: $scope.formRegistroPerdida.direccion,
                          barrio: $scope.formRegistroPerdida.barrio,
                          proximo_seguimiento: formatDate($scope.formRegistroPerdida.proximoSeguimiento),
                      }
                    $http({
                        method: 'POST',
                        url: "php/medicinalaboral/seguimientoafiliado.php",
                        data: {
                            function: "P_REGISTRAR_PERDIDAD_CAPACIDAD_LABORAL",
                            jsonDatos: JSON.stringify(json),
                            tipo: 'N',
                            id: $scope.form2.id,
                            actualiza: $scope.updateForm,
                            documento: $scope.form2.numero,
                            tipodoc: $scope.form2.tipo,
                          }
                    }).then( ({data}) => {
                        if (data.Codigo == 0) {
                          $scope.cargarAdjuntosCalifica().then((result)=> {
                            $http({
                              method: 'POST',
                              url: "php/medicinalaboral/seguimientoafiliado.php",
                              data: {
                                  function: "subirruta",
                                  rutas: JSON.stringify($scope.json),
                                  cantidad: 10,
                                  tipo: 'N',
                                  id: $scope.form2.id,
                                  numerodoc: $scope.form2.numero,
                                  tipodoc: $scope.form2.tipo,  
                                  observacion: 'P'               
                                }
                          }).then(({data}) => {
                              swal.close();
                              if (data.codigo == 0) {
                                swal('Info', 'Ficha registrada con exito', 'success');
                                  setTimeout(() =>{
                                    $scope.SetTabs(3);
                                    $scope.$apply();
                                  },600)     
                              }else{
                                  swal('Info', `${data.mensaje}`, 'error');
                              }
                            })
                          })
                        }else{
                            swal('Info', `${data.Nombre}`, 'error');
                        }
                    })
            } 
     }else{
       swal('Info', "Complete los campos vacios", 'warning');
     }
        }

        $scope.getRegistrosPerdida = function (opcion){
          $scope.registroIncapacidades = "";
          if (opcion) {
            $scope.verCalificacion = 2;
            $scope.busquedaCalificacion = 0;
          }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
            })
        $http({
            method: 'POST',
            url: "php/medicinalaboral/seguimientoafiliado.php",
            data: {
            function: 'P_CONSULTA_PRELIMINAR_PERDIDA_CAPACIDAD_LABORAL',
            }
        }).then(({data}) => { 
            swal.close()              
              $scope.registroIncapacidades = data;
              $scope.registroIncapacidadesTempo = data;
              $scope.iniciodePaginacion(data);
              $scope.filtroTabla("A");         
        });
            setTimeout(()=>{
              $scope.filtroTabla("A");       
            },700)
        }

        $scope.abrirModalseguimientoPerdida = function (X){
          $scope.reset_Adjuntos();
          document.getElementById("titleSeguimiento").textContent = 'Registrar Seguimiento';
          let rutas = X.rutas;
          $scope.Id = X.id;     
          $scope.activeRegistro = true;
          $scope.activeAdjuntos = false;
          $scope.cedula = X.documento;
          $scope.tipodoc = X.tipo_documento;
  
          $scope.formSeguimiento = {
              nombre: `${X.primer_nombre} ${X.segundo_nombre} ${X.primer_apellido} ${X.segundo_apellido}`,
              documento: `${X.tipo_documento} - ${X.documento}`,
              anteriorEps: X.anterio_EPS,
              ubicacion: X.regional,
              genero: X.genero,
              diagnostico: X.diagnostico1,
              regimen: X.regimen,
              edad: X.edad,
              correo: X.correo,
              arl: $scope.optionValidate('ARL',X.arl),
              afp: $scope.optionValidate('AFP',X.afp),
              accidenteTrabajo: X.accidente_de_trabajo,
              fechaEvento: X.fecha_del_evento == "" ? 'NO REGISTRA' : X.fecha_del_evento,
              origen: X.origen,
              estadoCalifica: "",
              estadoCalificaPerdida: "",
              fecha: "",
              entidad: "",
              fecha_calificacion: "",
              observacionCalifica: "",
              NumberCalificacion: "",
              observacionPerdida: "",
          }

          rutas.forEach(ele => {
            if (ele.tipo_archivo == '160') {
              setProgressBarWidth(100, 'adjuntoSolicitudSegPL')
              detallarFile('adjuntoSolicitudSegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '169') {
              setProgressBarWidth(100, 'adjuntoEmpresaSegPL')
              detallarFile('adjuntoEmpresaSegPL',ele.RUTA)

            }
            if (ele.tipo_archivo == '161') {
              setProgressBarWidth(100, 'adjuntoUsuariosSegPL')
              detallarFile('adjuntoUsuariosSegPL',ele.RUTA)

            }
            if (ele.tipo_archivo == '162') {
              setProgressBarWidth(100, 'adjuntoDictamenSegPL')
              detallarFile('adjuntoDictamenSegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '163') {
              setProgressBarWidth(100, 'adjuntoControversiaSegPL')
              detallarFile('adjuntoControversiaSegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '164') {
              setProgressBarWidth(100, 'adjuntoRadicacionSegPL')
              detallarFile('adjuntoRadicacionSegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '165') {
              setProgressBarWidth(100, 'adjuntoEPS_SegPL')
              detallarFile('adjuntoEPS_SegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '166') {
              setProgressBarWidth(100, 'adjuntoJRCI_SegPL')
              detallarFile('adjuntoJRCI_SegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '167') {
              setProgressBarWidth(100, 'adjuntoJNCI_SegPL')
              detallarFile('adjuntoJNCI_SegPL',ele.RUTA)
            }
            if (ele.tipo_archivo == '168') {
              setProgressBarWidth(100, 'adjuntoConstanciaSegPL')
              detallarFile('adjuntoConstanciaSegPL',ele.RUTA)
            }
          })

          $("#modalSeguimiento3").modal("open");
          
        }

        $scope.validarCampos_SegPerdida = function (){
          document.querySelector("#entidadPerdida").setAttribute("required", true);
          document.querySelector("#fecha_perdida").setAttribute("required", true);
          document.querySelector("#NumberCalificacion").setAttribute("required", true);
          const $formRegistroSegPerdida =  document.querySelectorAll(".regisSeguiPerdida [required], .regisSeguiPerdida [required=true]");
          $scope.validarCampo = true;
          let aux = 0;

          $formRegistroSegPerdida.forEach(elemen => { 
              if (!elemen.value) {
                if ((elemen.name == 'entidadPerdida' && elemen.value == '') && ($scope.formSeguimiento.estadoCalificaPerdida == 'P')) {
                  aux = 1;
                  document.querySelector("#entidadPerdida").removeAttribute("required");
                }  

                if ((elemen.name == 'NumberCalificacion' && elemen.value == '') && ($scope.formSeguimiento.estadoCalificaPerdida == 'P')) {
                  aux = 1;
                  document.querySelector("#NumberCalificacion").removeAttribute("required");
                } 

                if ((elemen.name == 'fecha_perdida' && elemen.value == '') && ($scope.formSeguimiento.estadoCalificaPerdida == 'P')) {
                  aux = 1;
                  document.querySelector("#fecha_perdida").removeAttribute("required");
                }     
                
                if (elemen.name != 'NumberCalificacion' && elemen.name != 'fecha_perdida' && elemen.name != 'entidadPerdida') {
                  aux = 2;
                }
              }
          })
              if (aux == 2) {
                $scope.validarCampo = false;
              }else{
                $scope.validarCampo = true;
              }
                  return $scope.validarCampo;
        }

        $scope.registrarSeg_Perdida = function (){
          if ($scope.validarCampos_SegPerdida()) {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              })
              let json = {       
                correo: '',
                arl: '',
                afp: '',
                accidente_trabajo: '',
                fecha_evento: '',
                ultimo_empleador: '',
                solicitado_por: '',
                diagnostico1: '',
                diagnostico2: '',
                diagnostico3: '',
                diagnostico4: '',
                diagnostico4: '',
                diagnostico4: '',
                origen: '',                     
                observacion: $scope.formSeguimiento.observacionPerdida,
                // fecha_perdidad_capacidad_laboral: formatDate($scope.formSeguimiento.fechaPerdidac),
                fecha_calificacion: $scope.formSeguimiento.fecha_calificacionPerdida ? formatDate($scope.formSeguimiento.fecha_calificacionPerdida) : '',
                entidad: $scope.formSeguimiento.entidad_Perdida || '',
                estado: $scope.formSeguimiento.estadoCalificaPerdida,
                calificacion: $scope.formSeguimiento.NumberCalificacion,
                proximo_seguimiento: $scope.formSeguimiento.proxSeguimiento3 ? formatDate($scope.formSeguimiento.proxSeguimiento3) : '',
              }
              $http({
                method: 'POST',
                url: "php/medicinalaboral/seguimientoafiliado.php",
                data: {
                    function: "P_REGISTRAR_PERDIDAD_CAPACIDAD_LABORAL",
                    jsonDatos: JSON.stringify(json),
                    tipo: 'S',
                    id: $scope.Id,
                    actualiza: '',
                    documento: $scope.cedula,
                    tipodoc: $scope.tipodoc,
                }
            }).then( ({data}) => {
                if (data.Codigo == 0) {
                  $scope.cargarBase64AdjuntosPerdida().then((result)=> {
                    $http({
                      method: 'POST',
                      url: "php/medicinalaboral/seguimientoafiliado.php",
                      data: {
                          function: "subirruta",
                          rutas: JSON.stringify($scope.jsonP),
                          cantidad: 10,
                          tipo: 'S',
                          id: $scope.Id,
                          numerodoc: $scope.cedula,
                          tipodoc: $scope.tipodoc,  
                          observacion: 'P'               
                        }
                  }).then( ({data}) => {
                          swal.close();
                       if (data.codigo == 0) {
                         $scope.getRegistrosPerdida(1);
                            swal('INFO', "Registro Cargado", 'success');
                              setTimeout(()=>{
                                $scope.closeModal();
                                $scope.filtroTabla("A");
                                $scope.$apply();
                              },600)
                       }else{
                        swal('INFO', `Error al cargar los adjuntos`, 'error');
                       }
                  })
                })
                }else{
                    swal('INFO', `${data.Nombre}`, 'error');
                }
            })
           
          }else{
              swal('Info', "Complete los campos vacios", 'warning');
          }  
          //  $scope.cargarBase64Adjuntos()
        }
      // ------------   Filtro y Paginacion  -------------------
      
        $scope.iniciodePaginacion = function (info){
            $scope.registroIncapacidadesTemp = info;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
        } 

        $scope.NumeroPaginas = function (){
            $scope.currentPage = 0;
            if ($scope.Pag == 0) {
            $scope.pageSize = $scope.registroIncapacidades.length;
            $scope.valmaxpag = $scope.registroIncapacidades.length;
            } else {
            $scope.pageSize = $scope.Pag;
            $scope.valmaxpag = $scope.Pag;    
            }
        } 
    
        $scope.filterSeguimiento = function(valor) {
            $scope.registroIncapacidadesTemp = $filter('filter')($scope.registroIncapacidades, valor);
            $scope.configPages();
        }
        
        $scope.configPages = function () { 
            $scope.pages.length = 0;
            var ini = $scope.currentPage - 4;
            var fin = $scope.currentPage + 5;
            if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.registroIncapacidadesTemp.length / $scope.pageSize) > $scope.valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.registroIncapacidadesTemp.length / $scope.pageSize);
            } else {
            if (ini >= Math.ceil($scope.registroIncapacidadesTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag) {
                ini = Math.ceil($scope.registroIncapacidadesTemp.length / $scope.vaTabla.pageSize) - $scope.vaTabla.valmaxpag;
                fin = Math.ceil($scope.registroIncapacidadesTemp.length / $scope.vaTabla.pageSize);
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
            if ($scope.currentPage < 0) { $scope.currentPage = 0; }
        }

        $scope.setPage = function (index) {
            $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.registroIncapacidadesTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.registroIncapacidadesTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.registroIncapacidadesTemp.length / $scope.pageSize) + 1;
                }
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
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
                if ($scope.registroIncapacidadesTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.registroIncapacidadesTemp.length / $scope.pageSize);              
                } else {
                    var tamanomax = parseInt($scope.registroIncapacidadesTemp.length / $scope.pageSize) + 1;
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

        

        $scope.lista_afp = function () {
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_afp'
                } 
          }).then(function (response) {
            if (response.data) {
                $scope.afiliacion.options_penciones_afp = response.data;
            } else {
                $scope.afiliacion.options_penciones_afp = new Array();
                swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
            }
          });
        }

        $scope.lista_arl = function () {
          $http({
            method: 'POST',
            url: "php/movilidad/afiliacion_linea.php",
            data: {
              function: 'lista_arl'
            }
          }).then(function (response) {
            if (response.data) {
              $scope.afiliacion.options_riesgos_laborales_arl = response.data;
            } else {
              $scope.afiliacion.options_riesgos_laborales_arl = new Array();
              swal('Mensaje', 'No se obtuvo resultados para el lista_afp', 'info');
            }
          });
        }

        $scope.ultimo_Empleador = function (tipo, cedula) {
          $http({
            method: 'POST',
            url: "php/medicinalaboral/seguimientoafiliado.php",
            data: {
              function: 'P_OBTENER_ULTIMO_EMPLEADOS',
              tipo,
              cedula
            }
          }).then(({data})=> {
            if (data != 0) {
              $scope.formRegistroCalifica.ultimoEmpleador = data[0].NOMBRE.trim();
              $scope.formRegistroPerdida.ultimoEmpleador = data[0].NOMBRE.trim();
            } else {
              $scope.formRegistroCalifica.ultimoEmpleador = 'SIN EMPLEADOR';
              $scope.formRegistroPerdida.ultimoEmpleador = 'SIN EMPLEADOR';
            }
          });
        }

        $scope.lista_arl();
        $scope.lista_afp();

        document.addEventListener("click", e =>{
                if (e.target.matches(".icon-pen")) {
                    let padre = e.target.parentElement,
                        input = padre.nextElementSibling.firstElementChild,
                        next = e.target.nextElementSibling;

                        next.textContent = 'Guardar';

                        input.removeAttribute('disabled');
                        e.target.classList.remove("icon-pen");
                        e.target.classList.add("icon-ok-3");

                        e.stopPropagation();
                  return;
                }

                if (e.target.matches(".icon-ok-3")) {
                  let padre2 = e.target.parentElement,
                      input2 = padre2.nextElementSibling.firstElementChild,
                      next = e.target.nextElementSibling;

                      if (input2.value != '') {
                        next.textContent = 'Editar';
  
                        input2.setAttribute("disabled", true);
                        e.target.classList.remove("icon-ok-3");
                        e.target.classList.add("icon-pen"); 
                      }

                      e.stopPropagation();
                      return;
              }
        })

        // se utiliza para que solo el input permita ingresar numero porcentual con dos decimales como maximo (eje: 20.00 %)
        document.querySelector('#NumberCalificacion').addEventListener('input', function(e){
          let int = e.target.value.slice(0, e.target.value.length - 1);
          
       
          if (int.includes('%')) {
            e.target.value = '%';
          }

          else if(int.length >= 3 && int.length <= 4 && !int.includes('.')){  
            e.target.value = int.slice(0,2) + '.' + int.slice(2,3) + '%';
            e.target.setSelectionRange(4, 4);
          }

          else if(int.length >= 5 & int.length <= 6){
            let whole = int.slice(0, 2);
            let fraction = int.slice(3, 5);
            e.target.value = whole + '.' + fraction + '%';
          }

          else {
            e.target.value = int + '%';
            e.target.setSelectionRange(e.target.value.length-1, e.target.value.length-1);
          }
          // console.log(getInt(e.target.value));
        });

        document.addEventListener("keyup", e => {         
            if (e.target.matches(".inputActualizar")) {
              let parrafo = e.target.nextElementSibling
                  if (e.target.value == '') {
                      e.target.style.borderColor = 'red';
                      parrafo.style.display = 'block';
                   }else{
                      parrafo.style.display = 'none';
                      e.target.style.borderColor = 'lightgray';
                   }         
              }
        })

            // Validacion Formulario -----
            $inputs.forEach(input => {
                const $span = document.createElement("span");
                $span.id = input.name;
                $span.textContent = input.title;
                $span.classList.add("contact-form-error", "none");
                // input.insertAdjacentElement("afterbegin", $span);
            })
     
            document.addEventListener("keyup", (e) =>{
                if (e.target.matches(".contact-form [required]")){
                    
                  if (e.target.type == 'text') {
                    let texto = e.target.value;

                    texto = texto.toUpperCase();
                    texto.replace(/[^A-Za-z\s]/g, '');
                    e.target.value = texto;
                  }
                    let pattern = e.target.pattern || e.target.dataset.pattern;
    
                    if (pattern && e.target.value != "") {
                        let regex = new RegExp(pattern);
                        return (!regex.exec(e.target.value) ? document.getElementById(e.target.name).classList.add("is-active"):
                                 document.getElementById(e.target.name).classList.remove("is-active"));           
                    }
    
                    if (!pattern) {
                        return ((e.target.value == "") ? document.getElementById(e.target.name).classList.add("is-active"): 
                                document.getElementById(e.target.name).classList.remove("is-active"));  
                    }
                }
            })     
            
      if (document.readyState != "loading") {
        $scope.Inicio();
      }else{
        document.addEventListener("DOMContentLoaded", $scope.Inicio())
      } 
}]);
