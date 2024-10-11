'use strict';
angular.module('GenesisApp')
  .controller('adminreportesController', ['$scope', '$http', 'ngDialog', '$filter',
    function ($scope, $http, ngDialog, $filter) {
      // Iniciar varibales
      $(document).ready(function () {
        $('.tabs').tabs();
         });

        const span1 = document.querySelector('#spanNorma'),
            span2 = document.querySelector('#spanAnexo');  

        const Editspan1 = document.querySelector('#EditarSpanNorma'),
            Editspan2 = document.querySelector('#EditarSpanAnexo'); 
            

         $scope.Inicio = function () {
          $('.modal').modal();
          $('.tabs').tabs();
          $scope.actualizarFile = false;
          $scope.viewsoporte = true;
          $scope.tabs = { select: 1 };
          $scope.Tipo_de_norma = "";
          $scope.nombre_de_reporte = "";
          $scope.report = { select: 2};
          $scope.Pag = 10;
          $scope.colS12 = 'col s12';
          $scope.colS6 = 'col s7';
          $scope.AdjuntoNorma = 'PDF';
          $scope.admin = false;
          $scope.validateFile = false;
          $scope.limpiar();
          $scope.filesArray = [{name: "" }, {name: ""}]  
          $scope.nomUsuario = sessionStorage.getItem("nombre")   
          $scope.rutaFileAnexo = "";
          $scope.rutaFileNorma = "";          
        }

        
        $scope.limpiar = function(){
          span1.innerHTML = 'NINGUN ARCHIVO';
          span2.innerHTML = 'NINGUN ARCHIVO';
          Editspan1.innerHTML = 'NINGUN ARCHIVO';
          Editspan2.innerHTML = 'NINGUN ARCHIVO';
          $scope.TipoNorma = "";
          $scope.nombre_de_reporte = "";
          $scope.numero_norma = "";
          $scope.estado_norma = "";
          $scope.anio_reporte = "";
          $scope.Proceso = "";
          
          setTimeout(() => {
            $scope.$apply()
          }, 500);
        }
        
      $scope.editarAnio = 0;
      $scope.editarNumeroNorma = 0;

      $scope.AbrirModalBucarUsuario = function(){
        $scope.ListadoFuncionario = [];
        $scope.buscarUsuarioAdmin = "";
        $("#modalbuscarUsuariorReportes").modal("open");
      }
      
        $scope.ModalEditar = function(x){
          $scope.limpiar()
          $scope.actualizarFile = false;
          $scope.viewsoporte = true;
          $scope.editarTipoNorma = "";
          $scope.rutaFileAnexo = x.ANEXO;
          $scope.rutaFileNorma = x.ADJUNTO_NORMA;
          $scope.id = x.CODIGO;
          $scope.editarNombre = x.NOMBRE;
          $scope.editarTipoNorma = x.COD_NORMA;
          $scope.editarAnio = x.ANNO_NORMA;
          $scope.editarNumeroNorma = x.NUMERO_NORMA;
          $scope.editarEstado = x.ESTADO;
          $scope.Proceso = x.UNIC_NOMBRE;
          $scope.idProcesosReporte = x.PROCESO;
          $scope.editarAdjuntoNorma = x.ADJUNTO_NORMA == null ? 'NINGUN ARCHIVO' : x.ADJUNTO_NORMA.split("/").pop();
          $scope.editarAnexo = x.ANEXO == null ? 'NINGUN ARCHIVO' : x.ANEXO.split("/").pop();

          Editspan1.innerHTML = x.ADJUNTO_NORMA == null ? 'NINGUN ARCHIVO' : x.ADJUNTO_NORMA.split("/").pop();
          Editspan2.innerHTML = x.ANEXO == null ? 'NINGUN ARCHIVO' : x.ANEXO.split("/").pop();
          $scope.soporte_FLAnexo = x.ANEXO;
          $scope.soporte_FLNorma = x.ADJUNTO_NORMA;
          $("#modalEditarReportes").modal("open");
        } 

        $scope.cambioActualizarSoporte = function(data){
          if (data == 'A') {
            $scope.actualizarFile = true;
            $scope.viewsoporte = false;
          }
        }
       
        $scope.replicarReporte = function(datos){
          if (!datos) {
            swal('Info', "No hay Informacion", 'warning');  
          }else{
            $scope.tabs.select = 1;
            $scope.report.select = 1;
            $scope.TipoNorma = datos.COD_NORMA;
            $scope.nombre_de_reporte = datos.NOMBRE;
            $scope.numero_norma = parseInt(datos.NUMERO_NORMA);
            $scope.estado_norma = datos.ESTADO;
            $scope.anio_reporte = parseInt(datos.ANNO_NORMA);
            $scope.Proceso = datos.UNIC_NOMBRE;
            $scope.idProcesosReporte = datos.PROCESO;
            $scope.AdjuntoNorma = datos.ADJUNTO_NORMA;
            $scope.AdjuntoAnexo = datos.ANEXO;
            span1.innerHTML = datos.ADJUNTO_NORMA == null ? 'NINGUN ARCHIVO' : datos.ADJUNTO_NORMA.split("/").pop();
            span2.innerHTML = datos.ANEXO == null ? 'NINGUN ARCHIVO' : datos.ANEXO.split("/").pop();
            $scope.soporte_FLAnexo = datos.ANEXO;
            $scope.soporte_FLNorma = datos.ADJUNTO_NORMA;
  
          }
        }

        // VER ADJUNTO 
        $scope.verSoportenorma = function () {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/auditoriainterna/adminreportes.php",
            data: {
              function: 'VerSoporte',
              ruta: $scope.rutaFileNorma
            }
          }).then(function (response) {
            swal.close()
            var win = window.open("temp/" + response.data, '_blank');
            win.focus();
          });
        }

        $scope.verSoporte = function (ruta) {
          if (!ruta) {
            swal('Soporte No Encontrado', 'No se cargo ningun soporte', 'error');
          }else{
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/auditoriainterna/adminreportes.php",
              data: {
                function: 'VerSoporte',
                ruta: ruta
              }
            }).then(function (response) {
              swal.close()
              var win = window.open("temp/" + response.data, '_blank');
              win.focus();
            });
          }
        }

        $scope.verSoporteAnexo = function () {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/auditoriainterna/adminreportes.php",
            data: {
              function: 'VerSoporte',
              ruta: $scope.rutaFileAnexo
            }
          }).then(function (response) {
            swal.close()
            var win = window.open("temp/" + response.data, '_blank');
            win.focus();
          });
        }

        $scope.closeModal = function(){
          $(".modal").modal("close");
        }
        
        $scope.ObtenerFuncionario = function (nombre){
          $http({
              method: 'POST',
              url: "php/auditoriainterna/adminreportes.php",
              data: {
                  function: 'p_obtener_funcionario', nombre
              }
          }).then( function(response){
            if (response.data.Codigo == 1) {
              swal('Info', response.data.Nombre, 'warning');  
            }else{
              $scope.ListadoFuncionario = response.data;   
              console.log(response.data);     
            }
          }) 
        }

        
        $scope.ListadoUsuarios = function (){
          $http({
              method: 'POST',
              url: "php/auditoriainterna/adminreportes.php",
              data: {
                  function: 'p_lista_funcionarios'
              }
          }).then( function(response){
            $scope.ListadoUsuarioPermisos = response.data;   
            console.log(response.data);     
          }) 
        }
        $scope.ListadoUsuarios();

        $scope.seleccionarFuncionario = function(x){
          if ($scope.buscarUsuarioAdmin == "" || $scope.buscarUsuarioAdmin == undefined || $scope.tipoPermisos == "" || $scope.tipoPermisos == undefined) {
            swal('Completar Campos', 'Por favor completa los campos vacios', 'error');
          }else{
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/auditoriainterna/adminreportes.php",
            data: {
                function: 'p_ui_funcionarios',
                documento: x.Codigo, 
                tipo: $scope.tipoPermisos,
                estado: 'A',
                accion: 'I',
            }
        }).then( function(response){
            if (response.data.Codigo == 1){
              swal('Info', response.data.Nombre, 'warning');
            }else{
              $scope.closeModal();
              swal('Completado', response.data.Nombre, 'success');         
              $scope.ListadoUsuarios();
            }  
            })
      }
        }

        $scope.actualizarTabla = function(){    
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Actualizando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
         setTimeout(() => {
          $scope.obtenerListadoReporte = [];
          $scope.obtenerListadoReporteTemp = [];
          $http({
            method: "POST",
            url: "php/auditoriainterna/adminreportes.php",
            data: {function: 'obtenerReportes' }
          }).then(function(response){
            swal.close();
            $scope.obtenerListadoReporte = response.data;
            $scope.iniciodePaginacion(response.data);
          })
         },500)     
        }

      $scope.ListadoReporte = function (){
            $http({
                method: 'POST',
                url: "php/auditoriainterna/adminreportes.php",
                data: {
                    function: 'obtenerReportes',
                }
            }).then( function(response){
              $scope.obtenerListadoReporte = response.data;        
            $scope.iniciodePaginacion(response.data);
            }) 
        }
        $scope.ListadoReporte()
      
      $scope.ObtenerEstadoColor = function (tipo = null) {
        const tipos = {
          ACTIVO: "etiquetaVerde",
          INACTIVO: "etiquetaRoja",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.ObtenerEstadoColorPermisos = function (tipo = null) {
        const tipos = {
          A: "etiquetaVerde",
          I: "etiquetaRoja",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.ObtenerEstadoColorTipo = function (tipo = null) {
        const tipos = {
          ADMINISTRADOR: "etiquetaNaranja",
          SUPERVISOR: "etiquetaAmarillo",
          OPERATIVO: "etiquetaAzul",
          GESTIONAREA: "etiquetagren",
          CONSULTA: "etiquetaMorado",
        };
        if (tipo == 'GESTION AREAS') {
              return tipos.GESTIONAREA
            }else{
              return tipos[tipo] || "Ninguno";
          }
      }

      $scope.cambiarTipo_Perfil = function(x, cambio, datos){
        $scope.tipoPermisos = 0;                   
        if (cambio == 'A') {
          switch (datos.tipo) {
            case 'ADMINISTRADOR':
              $scope.tipoPermisos = 1;      
              break;
            case 'SUPERVISOR':
              $scope.tipoPermisos = 2;                  
              break;
            case 'OPERATIVO':
              $scope.tipoPermisos = 3;           
              break;
            case 'GESTION AREAS':
              $scope.tipoPermisos = 4;                   
              break;

            case 'CONSULTA':
              $scope.tipoPermisos = 5;                   
              break;
          
            default: 
              break;
          }
        $scope.buscarUsuarioAdmin = datos.nombre;       
        $scope.docu = datos.documento;  
        $scope.estadoPermiso = datos.estado;     

        $("#modalCambiarPermiso").modal("open");  
      }else{  
        if (x != "") {
          $http({
            method: 'POST',
            url: "php/auditoriainterna/adminreportes.php",
            data: {
                function: 'p_ui_funcionarios',
                documento: $scope.docu, 
                tipo: x,
                estado: $scope.estadoPermiso,
                accion: 'U',
            }
          }).then(function ({data}) {
            console.log(data);
            if (data[0].Codigo == 0) {
              swal("Mensaje", data[0].Nombre, "success").catch(swal.noop);
              $scope.closeModal();
              $scope.ListadoUsuarios();
            }
            if (data[0].Codigo == 1) {
              swal("Mensaje", data[0].Nombre, "warning").catch(swal.noop);
            }
          }) 
        }else{
        swal('Campos Obligatorios *', "Por favor complete los campos vacios", 'error');
        }
      }
        
      }


        //   // CONFIGURACION DE ARCHIVO FILE
         
        $scope.soporte_FLNorma = "";
          $scope.soporte_FLAnexo = "";
          document.addEventListener("change", e =>{
            let id2 = e.target.id; 
                if (id2 == 'archivoAnexo' || id2 == 'archivoNorma') {
                  if (e.target.matches(".fancy-file")) {
                    setTimeout(() => { $scope.$apply(); }, 500);
                    const span1 = document.querySelector('#spanNorma'),
                    span2 = document.querySelector('#spanAnexo');
                    var files = e.target.files;
                    if (files.length != 0) {
                      const x = files[0].name.split('.');
                      if (x[x.length - 1].toUpperCase() in {'JPG': 'JPG', 'PDF': 'PDF', 'ZIP': 'ZIP'}) {
                        if (files[0].size < 15485760 && files[0].size > 0) {
                          $scope.getBase64(files[0]).then(function (result) {
                            if (id2 == 'archivoNorma') {
                              $scope.soporte_FLAnexo = result;
                              span1.innerHTML = files[0].name;
                            }if (id2 == 'archivoAnexo') {
                              $scope.soporte_FLNorma = result;
                              span2.innerHTML = files[0].name;
                            }
                            
                            setTimeout(function () { $scope.$apply(); }, 300);
                          }); 
                        } else {
                        id2 ==  'archivoNorma' ? span1.innerHTML  = 'NINGUN ARCHIVO':  span2.innerHTML  = 'NINGUN ARCHIVO'
                          swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                        }
                      } else {
                        id2 ==  'archivoNorma' ? span1.innerHTML  = 'NINGUN ARCHIVO':  span2.innerHTML  = 'NINGUN ARCHIVO'
                        swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF, JPG o ZIP!', 'info');
                      }
                    }else{
                      id2 ==  'archivoNorma' ? span1.innerHTML  = 'NINGUN ARCHIVO':  span2.innerHTML  = 'NINGUN ARCHIVO'

                    }
                  }
                }else{
                  if (e.target.matches(".fancy-file")) {
                      setTimeout(() => { $scope.$apply(); }, 500);
                      var files = e.target.files;
                      if (files.length != 0) {
                        const x = files[0].name.split('.');
                        if (x[x.length - 1].toUpperCase() in {'JPG': 'JPG', 'PDF': 'PDF', 'ZIP': 'ZIP'}) {
                          if (files[0].size < 15485760 && files[0].size > 0) {
                            $scope.getBase64(files[0]).then(function (result) {
                              if (id2 == 'editarArchivoNorma') {
                                $scope.soporte_FLAnexo = result;
                                Editspan1.innerHTML = files[0].name;
                              }if (id2 == 'editarArchivoAnexo') {
                                $scope.soporte_FLNorma = result;
                                Editspan2.innerHTML = files[0].name;
                              }
                              
                              setTimeout(function () { $scope.$apply(); }, 300);
                            });
                          } else {
                          id2 ==  'editarArchivoNorma' ? Editspan1.innerHTML  = 'NINGUN ARCHIVO':  Editspan2.innerHTML  = 'NINGUN ARCHIVO'
                            swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                          }
                        } else {
                          id2 ==  'editarArchivoNorma' ? Editspan1.innerHTML  = 'NINGUN ARCHIVO':  Editspan2.innerHTML  = 'NINGUN ARCHIVO'
                          swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF, JPG o ZIP!', 'info');
                        }
                      }else{
                        id2 ==  'editarArchivoNorma' ? Editspan1.innerHTML  = 'NINGUN ARCHIVO':  Editspan2.innerHTML  = 'NINGUN ARCHIVO'
  
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
      
          $scope.cargarUrlReportes = function () {
            $scope.Jsonbase = [
              { "base64": $scope.soporte_FLNorma, "tipo": 1, "ruta": $scope.rutaFileNorma ,
                "nombre": $scope.editarAdjuntoNorma == 'NINGUN ARCHIVO' ? Editspan1.textContent : $scope.editarAdjuntoNorma
              },
              { "base64": $scope.soporte_FLAnexo, "tipo": 2, "ruta": $scope.rutaFileAnexo,
               "nombre": $scope.editarAnexo == 'NINGUN ARCHIVO' ? Editspan2.textContent : $scope.editarAnexo
              }
          ];           
            return new Promise((resolve) => {
              $http({
                method: 'POST',
                url: "php/auditoriainterna/adminreportes.php",
                data: { function: "cargarUrlReportes", soporte_File: JSON.stringify($scope.Jsonbase) }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) != '<br') {
                  resolve(data);
                } else {
                  resolve(false);
                }
              })
            });
          }

          $scope.validarFilesFince = function(){
            const span1 = document.querySelector('#spanNorma'),
                  span2 = document.querySelector('#spanAnexo');

              if (span2.textContent == 'NINGUN ARCHIVO' || span1.textContent == 'NINGUN ARCHIVO') {
                $scope.validateFile = false;
              }else{
                $scope.validateFile = true;
              }
          }

        $scope.crearReporte = function (nombre, tipo, anno, num_Norma,estado){
          nombre.toUpperCase();
          $scope.validarFilesFince();
          if ($scope.TipoNorma == "" || $scope.nombre_de_reporte == "" || $scope.numero_norma == "" || $scope.estado_norma == "" || $scope.anio_reporte == "" || $scope.Proceso == ""
                ) {
            swal('Campos Obligatorios *', "Por favor complete los campos vacios", 'error');
          }else{
            if ($scope.validateFile) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              $scope.cargarUrlReportes().then((result) =>{
                $http({
                    method: 'POST',
                    url: "php/auditoriainterna/adminreportes.php",
                    data: {
                        function: 'p_ui_reportes',
                        nombre, 
                        tipo,
                        numero: '',
                        numeroNorma: num_Norma,
                        anno,
                        anexo: result.subioAnexo,
                        AdjuntoNorma: result.subioNorma,                     
                        estadoNorma: estado,
                        proceso: $scope.idProcesosReporte,
                        accion: 'I'
                    }
                }).then( function(response){
                    if (response.data.Codigo == 0)  {
                      $scope.limpiar();
                      $scope.ListadoReporte()
                      swal('Completado', response.data.Nombre, 'success');
                    } 
                    if (response.data.Codigo != 0)   swal('Info', response.data.Nombre, 'warning');         
                })
              })
            }else{
            swal('Anexo Obligatorio *', "Por favor adjuntar anexo", 'error');
            }
              }
          }

          $scope.validateFormEditar = function(){
            return new Promise((resolve) => {
              if (!$scope.editarNombre) resolve(false);
              if (!$scope.editarAnio) resolve(false);
              if (!$scope.editarEstado) resolve(false);
              if (!$scope.editarNumeroNorma) resolve(false);
              if (!$scope.editarTipoNorma) resolve(false);
              if (!$scope.Proceso) resolve(false);
              resolve(true)
            });
          }

          $scope.editarReporte = function (nombre, tipo, anno, num_Norma, estado) {
                if ($scope.actualizarFile == true && Editspan1.innerHTML  == 'NINGUN ARCHIVO' || Editspan2.innerHTML  == 'NINGUN ARCHIVO' && $scope.actualizarFile == true) {
                    swal('Info', "El adjunto es obligatorio si desea cambiarlo", 'warning');
                }else{
                    if ($scope.actualizarFile == true) {
                          $scope.validateFormEditar().then((result)=>{
                                if (result) {
                                  swal({
                                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                                      width: 200,
                                      showConfirmButton: false,
                                      animation: false
                                  })
                              
                                  $scope.cargarUrlReportes().then(function (response) {
                                      if (response !== false) {
                                          // Se ha cargado correctamente el archivo nuevo
                                          if ($scope.soporte_FLNorma) {
                                              $scope.rutaFileNorma = response[0];
                                          }
                                          if ($scope.soporte_FLAnexo) {
                                              $scope.rutaFileAnexo = response[1];
                                          }
                                      }
                              
                                      $http({
                                          method: 'POST',
                                          url: "php/auditoriainterna/adminreportes.php",
                                          data: {
                                              function: 'p_ui_reportes',
                                              nombre,
                                              tipo,
                                              numero: $scope.id,
                                              numeroNorma: num_Norma,
                                              anno,
                                              estadoNorma: estado,
                                              proceso: $scope.idProcesosReporte,
                                              anexo: $scope.rutaFileAnexo,
                                              AdjuntoNorma: $scope.rutaFileNorma,
                                              accion: 'U'
                                          }
                                      }).then(function (response) {
                                          if (response.data.Codigo == 0) {
                                              swal('Completado', response.data.Nombre, 'success');
                                              $scope.limpiar();
                                              $scope.ListadoReporte();
                                              $scope.closeModal();
                                          } else {
                                              swal('Info', response.data.Nombre, 'warning');
                                          }
                                      });
                                  });
                                }
                          })
                      
                    }else{
                            $scope.validateFormEditar().then((result)=>{
                              if (result) {
                                swal({
                                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                                    width: 200,
                                    showConfirmButton: false,
                                    animation: false
                                })        
                                    $http({
                                        method: 'POST',
                                        url: "php/auditoriainterna/adminreportes.php",
                                        data: {
                                            function: 'p_ui_reportes',
                                            nombre,
                                            tipo,
                                            numero: $scope.id,
                                            numeroNorma: num_Norma,
                                            anno,
                                            estadoNorma: estado,
                                            proceso: $scope.idProcesosReporte,
                                            anexo: $scope.rutaFileAnexo,
                                            AdjuntoNorma: $scope.rutaFileNorma,
                                            accion: 'U'
                                        }
                                    }).then(function (response) {
                                        if (response.data.Codigo == 0) {
                                            swal('Completado', response.data.Nombre, 'success');
                                            $scope.limpiar();
                                            $scope.ListadoReporte();
                                            $scope.closeModal();
                                        } else {
                                            swal('Info', response.data.Nombre, 'warning');
                                        }
                                    });
                              
                              }else{
                                swal('Info', "Campos Obligatorios (*)", 'error');
                              }
                              })

                    }

                }
        };

        $scope.seleccionar = function (tab_numer) {
            $scope.tabs.select = tab_numer;
            $scope.limpiar();
        }

        $scope.seleccionarReportes = function (numer) {
          $scope.report.select = numer;
          $scope.limpiar();
        }

        $scope.ObtenerRol = function (){
          $http({
              method: 'POST',
              url: "php/auditoriainterna/adminreportes.php",
              data: {
                  function: 'p_obtener_rol'
              }
          }).then( function({data}){
            if (data.Codigo == 1) {
              $scope.admin = false;
              $scope.mensaje = data.Nombre;
              swal({
                title: "Acceso No Permitido", text: 'No tiene permisos, por favor contactar al area de Auditoria Interna',
                allowOutsideClick: false,
                showConfirmButton: false,
                type: "error"
              }).catch(swal.noop); return
    
            } else {          
              $scope.admin = true;
            }
          }) 
        }


        $scope.obtenerTipoNorma = function () {
            $http({
              method: 'POST',
              url: "php/auditoriainterna/reporteslegales.php",
              data: {
                function: 'obtenerTipoNorma'
              }
            }).then(function (response) {
              $scope.tipo_norma = response.data;
            })
          }
        $scope.obtenerTipoNorma();

        $scope.obtenerProcesosReporte = function () {
          $http({
            method: 'POST',
            url: "php/auditoriainterna/adminreportes.php",
            data: {
              function: 'obtenerProcesos'
            }
          }).then(function (response) {
            $scope.procesos = response.data;
          })
        }
        $scope.obtenerProcesosReporte();

      $scope.buscarProcesos = function (lista) {
        $scope.ProcesoEncontrados = [];
        let i = 0;
        for (const re of $scope.procesos) {
          i++;
          console.log(re);
          let nombres = re.NOMBRE,
            listas = lista.toUpperCase();
          if (nombres.includes(listas)) {
            $scope.ProcesoEncontrados.push({ id: re.NUMERO, Nombre: re.NOMBRE })
          }
        }
        setTimeout(()=>{       
          if ($scope.ProcesoEncontrados.length == 1) {
            $scope.idProcesosReporte = $scope.ProcesoEncontrados[0].id;
          }
        },600)
      }

      setTimeout(()=>{
        $scope.codigoProcesos = function(cargo){
          cargo.toUpperCase();
          $scope.procesos.forEach(element =>{
            cargo.toUpperCase();
            if (element.NOMBRE == cargo) {
              $scope.idProcesosReporte = element.NUMERO;         
            }
          })
        }
      },1000)

     

      // Filtro y Paginacion       ---------------------
    $scope.iniciodePaginacion = function (info){
      $scope.obtenerListadoReporteTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    } 
    $scope.MostrarNumeroPaginas = function (){
      $scope.currentPage = 0;
      if ($scope.Pag == 0) {
        $scope.pageSize = $scope.obtenerListadoReporte.length;
        $scope.valmaxpag = $scope.obtenerListadoReporte.length;
        
      } else {
        $scope.pageSize = $scope.Pag;
        $scope.valmaxpag = $scope.Pag;    
      }
    } 

    $scope.filterReportes = function(valor) {
      $scope.obtenerListadoReporteTemp = $filter('filter')($scope.obtenerListadoReporte, valor);
      $scope.configPages();
    }
  
    $scope.configPages = function () { 
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.obtenerListadoReporteTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.obtenerListadoReporteTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.obtenerListadoReporteTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.obtenerListadoReporteTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.obtenerListadoReporteTemp.length / $scope.pageSize);
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
            if ($scope.obtenerListadoReporteTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.obtenerListadoReporteTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.obtenerListadoReporteTemp.length / $scope.pageSize) + 1;
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
          if ($scope.obtenerListadoReporteTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.obtenerListadoReporteTemp.length / $scope.pageSize);              
          } else {
              var tamanomax = parseInt($scope.obtenerListadoReporteTemp.length / $scope.pageSize) + 1;
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



      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
 
    }])