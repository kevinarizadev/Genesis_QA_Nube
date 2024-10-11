'use strict';
angular.module('GenesisApp')
  .controller('adminprocesospoaController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();
        $scope.hoja1Limpiar();
        $scope.obtenerListadoFuncs();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }
      $scope.hoja1Limpiar = function () {
        $scope.Hoja1 = {
          Filtro: '',
        };
        $scope.List = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoFuncs = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List.listadoFuncionarios = [];

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/planeacion/adminprocesospoa.php",
          data: {
            function: 'p_consulta_usuario'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List.listadoFuncionarios = data;
          console.log(data);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }


      $scope.obtenerTipoUsuario = function (tipoUsuario) {

        const tipos = {
          AS: "Administrador del Sistema",
          AM: "Administrador del Módulo",
          US: "Usuario",
          // UP: "Usuario Sin Permiso de Edición",
          IN: "Invitado"
        };

        return tipos[tipoUsuario] || "Tipo de usuario desconocido";

      }


      $scope.agregarUsuario = function () {
        swal({
          title: 'Agregar Nuevo Usuario',
          text: 'Ingrese la cédula del funcionario',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/planeacion/adminprocesospoa.php",
              data: {
                function: 'p_insertar_usuario',
                codigo: result,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.obtenerListadoFuncs(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.editarUsuario = function (data) {
        $scope.modalUsuario = {}
        $scope.modalUsuario = data;


        Object.entries($scope.modalUsuario).forEach(([clave, valor]) => {
          if (valor == 'S' || valor == 'N') {
            $scope.modalUsuario[clave] = valor == 'S' ? true : false
          }
        });

        $scope.openModal('modalUsuario')
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.activarAdmin = function (data) {
        if ($scope.modalUsuario.BADC_ADMIN) {
          Object.entries($scope.modalUsuario).forEach(([clave, valor]) => {
            if (valor == false) {
              $scope.modalUsuario[clave] = true
            }
          });
        }
      }


      $scope.modificarUsuario = function () {
        // $scope.modalUsuario
        swal({
          title: '¿Desea actualizar el estado del funcionario?',
          text: $scope.modalUsuario.TERC_NOMBRE,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            const datos = {
              BADC_CEDULA: $scope.modalUsuario.BADC_CEDULA,
              BADC_ADMIN: $scope.modalUsuario.BADC_ADMIN ? 'S' : 'N',
              BADC_ESTADO: $scope.modalUsuario.BADC_ESTADO,
              BADC_VER_FICHA: $scope.modalUsuario.BADC_VER_FICHA ? 'S' : 'N',
              BADC_CREAR_FICHA: $scope.modalUsuario.BADC_CREAR_FICHA ? 'S' : 'N',
              BADC_ACTUALIZAR_FICHA: $scope.modalUsuario.BADC_ACTUALIZAR_FICHA ? 'S' : 'N',
              BADC_ELIMINAR_FICHA: $scope.modalUsuario.BADC_ELIMINAR_FICHA ? 'S' : 'N',
              BADC_EDITAR_GESTION: $scope.modalUsuario.BADC_EDITAR_GESTION ? 'S' : 'N',
              BADC_ELIMINAR_GESTION: $scope.modalUsuario.BADC_ELIMINAR_GESTION ? 'S' : 'N',
              BADC_CREAR_PLAN: $scope.modalUsuario.BADC_CREAR_PLAN ? 'S' : 'N',
              BADC_EDITAR_PLAN: $scope.modalUsuario.BADC_EDITAR_PLAN ? 'S' : 'N',
              BADC_CREAR_SEG_PLAN: $scope.modalUsuario.BADC_CREAR_SEG_PLAN ? 'S' : 'N',
              BADC_EDITAR_SEG_PLAN: $scope.modalUsuario.BADC_EDITAR_SEG_PLAN ? 'S' : 'N',
              BADC_VER_FICHA_PDM: $scope.modalUsuario.BADC_VER_FICHA_PDM ? 'S' : 'N',
              BADC_CREAR_FICHA_PDM: $scope.modalUsuario.BADC_CREAR_FICHA_PDM ? 'S' : 'N',
              BADC_EDITAR_FICHA_PDM: $scope.modalUsuario.BADC_EDITAR_FICHA_PDM ? 'S' : 'N',
              BADC_ELIMINAR_FICHA_PDM: $scope.modalUsuario.BADC_ELIMINAR_FICHA_PDM ? 'S' : 'N',
              BADC_EDITAR_GESTION_PDM: $scope.modalUsuario.BADC_EDITAR_GESTION_PDM ? 'S' : 'N',
              BADC_ELIMINAR_GESTION_PDM: $scope.modalUsuario.BADC_ELIMINAR_GESTION_PDM ? 'S' : 'N',
              BADC_CREAR_SEG: $scope.modalUsuario.BADC_CREAR_SEG ? 'S' : 'N',
              BADC_EDITAR_SEG: $scope.modalUsuario.BADC_EDITAR_SEG ? 'S' : 'N',
              BADC_CREAR_GES_SEG: $scope.modalUsuario.BADC_CREAR_GES_SEG ? 'S' : 'N',
              BADC_EDITAR_GES_SEG: $scope.modalUsuario.BADC_EDITAR_GES_SEG ? 'S' : 'N',
              BADC_GES_AUTO_PDM: $scope.modalUsuario.BADC_GES_AUTO_PDM ? 'S' : 'N',
            }

            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/planeacion/adminprocesospoa.php",
              data: {
                function: 'p_actualiza_funcs',
                datos: JSON.stringify(datos)
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.closeModal();
                // $scope.obtenerListadoFuncs(1);
                let datos = $scope.List.listadoFuncionarios.find(e => (e.BADC_CEDULA == $scope.modalUsuario.BADC_CEDULA))
                datos = $scope.modalUsuario;
                // datos.BADC_ADMIN = $scope.modalUsuario.BADC_ADMIN;
                // datos.BADC_ESTADO = $scope.modalUsuario.BADC_ESTADO;
                // datos.BADC_VER_FICHA = $scope.modalUsuario.BADC_VER_FICHA;
                // datos.BADC_CREAR_FICHA = $scope.modalUsuario.BADC_CREAR_FICHA;
                // datos.BADC_ACTUALIZAR_FICHA = $scope.modalUsuario.BADC_ACTUALIZAR_FICHA;
                // datos.BADC_ELIMINAR_FICHA = $scope.modalUsuario.BADC_ELIMINAR_FICHA;
                // datos.BADC_EDITAR_GESTION = $scope.modalUsuario.BADC_EDITAR_GESTION;
                // datos.BADC_ELIMINAR_GESTION = $scope.modalUsuario.BADC_ELIMINAR_GESTION;
                // datos.BADC_CREAR_PLAN = $scope.modalUsuario.BADC_CREAR_PLAN;
                // datos.BADC_EDITAR_PLAN = $scope.modalUsuario.BADC_EDITAR_PLAN;
                // datos.BADC_CREAR_SEG_PLAN = $scope.modalUsuario.BADC_CREAR_SEG_PLAN;
                // datos.BADC_EDITAR_SEG_PLAN = $scope.modalUsuario.BADC_EDITAR_SEG_PLAN;
                // datos.BADC_VER_FICHA_PDM = $scope.modalUsuario.BADC_VER_FICHA_PDM;
                // datos.BADC_CREAR_FICHA_PDM = $scope.modalUsuario.BADC_CREAR_FICHA_PDM;
                // datos.BADC_EDITAR_FICHA_PDM = $scope.modalUsuario.BADC_EDITAR_FICHA_PDM;
                // datos.BADC_ELIMINAR_FICHA_PDM = $scope.modalUsuario.BADC_ELIMINAR_FICHA_PDM;
                // datos.BADC_EDITAR_GESTION_PDM = $scope.modalUsuario.BADC_EDITAR_GESTION_PDM;
                // datos.BADC_ELIMINAR_GESTION_PDM = $scope.modalUsuario.BADC_ELIMINAR_GESTION_PDM;
                // datos.BADC_CREAR_SEG = $scope.modalUsuario.BADC_CREAR_SEG;
                // datos.BADC_EDITAR_SEG = $scope.modalUsuario.BADC_EDITAR_SEG;
                // datos.BADC_CREAR_GES_SEG = $scope.modalUsuario.BADC_CREAR_GES_SEG;
                // datos.BADC_EDITAR_GES_SEG = $scope.modalUsuario.BADC_EDITAR_GES_SEG;
                // datos.BADC_GES_AUTO_PDM = $scope.modalUsuario.BADC_GES_AUTO_PDM;
                console.log(datos);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }





      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }

      $scope.SetTab = function (x) {
        $scope.Tabs = x;
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        // if ($(window).width() < 1100) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1100 && $(window).width() < 1300) {
        //   document.querySelector("#pantalla").style.zoom = 0.7;
        // }
        // if ($(window).width() > 1300 && $(window).width() < 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.8;
        // }
        // if ($(window).width() > 1500) {
        //   document.querySelector("#pantalla").style.zoom = 0.9;
        // }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
