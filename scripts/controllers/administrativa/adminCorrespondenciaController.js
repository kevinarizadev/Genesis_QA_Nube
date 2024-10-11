'use strict';
angular.module('GenesisApp')
  .controller('adminCorrespondenciaController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

    $scope.Inicio = function () {
      $scope.sysDay = new Date();
      $scope.TabsSeleccionar = 1;
      $scope.editarResponsable1 = "";
      $scope.editarResponsable2 = "";
      $scope.editarResponsable3 = "";
      $scope.nombreSeccionalEditar = "";
      $scope.CodigoSeccionalEditar = "";
      $scope.crear = true;
      $scope.listar = false;
      $scope.editar = false;
      $scope.titulo = 'CREAR';
      $('.modal').modal();
      $('.tabs').tabs();
    }

   $scope.seleccionar = function(x) {
      $scope.TabsSeleccionar = x
   }

   $scope.ObtenerAreas = function(){
    $http({
      method: 'POST',
      url: "php/administrativa/adminCorrespondencia.php",
      data: {
        function: 'P_OBTENER_AREAS_CORRESP',
        estado: '',
      }
    }).then(({data})=>{
        $scope.areas =  data;
    })
   }
   $scope.ObtenerAreas();

   $scope.ObtenerSeccionales = function(){
    $http({
            method: 'POST',
            url: "php/administrativa/correspondencia.php",
            data: {
              function: 'P_OBTENER_REGIONALES_CORRESP',
              ubicacion: 1,
            }
          }).then(({data})=>{
              $scope.listadoSeccional = data;
          });
   }
   $scope.ObtenerSeccionales()

    $scope.buscarAreas = function(seccional){
      // seccional.Estado = ;
      $scope.AreasResponsable = "";
      seccional.Estado = seccional.Estado == undefined ? true : !seccional.Estado;
      if (seccional.Estado) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/adminCorrespondencia.php",
          data: {
            function: 'P_OBTENER_AREAS_RESP_CORRESP',
            ubicacion: seccional.CODIGO,
          }
        }).then(({data})=>{
          if (data != "") {
            swal.close();
            $scope.AreasResponsable = data;
          }else{
            swal.close();
            swal('Mensaje', "No hay areas creadas", 'warning');
          }
        }) 
      }
    }


    
    $scope.closeModal = function(){
      $(".modal").modal("close");
    }

    document.addEventListener("input",e =>{
      let texto = "";
      if (e.target.matches("#nombre_area")) {
            texto = e.target.value;
            texto = texto.toUpperCase();
            texto = texto.replace(/[0-9.]/g, '');
            
        e.target.value = texto;
      }
    })

    $scope.insertarAreas = function(){
      let cedula = sessionStorage.getItem("cedula")
      if ($scope.titulo == 'CREAR') {
        if ($scope.nombre_area) {
          $http({
            method: 'POST',
            url: "php/administrativa/adminCorrespondencia.php",
            data: {
              function: 'P_INSERTAR_AREA_CORRESP',
              Nombre_Area: $scope.nombre_area,
              cedula,
            }
          }).then(({data})=>{
            if (data.codigo == 0) {
              swal('Mensaje', data.mensaje, 'success');   
              $scope.ObtenerAreas();
            }else{
              swal('Mensaje', data.mensaje, 'warning');   
            }
          })
        }else{
          swal('Mensaje', "Escribe el nombre del area", 'warning');   
        }  
      }else if($scope.titulo == 'EDITAR'){
        if ($scope.Editarnombre_area) {
          $http({
            method: 'POST',
            url: "php/administrativa/adminCorrespondencia.php",
            data: {
              function: 'P_MODIFICAR_AREA_CORRESP',
              codigo: $scope.codigoArea,
              nombre: $scope.Editarnombre_area,
              estado: $scope.Estado,
            }
          }).then(({data})=>{
            if (data.codigo == 0) {
              swal('Mensaje', data.mensaje, 'success');  
              $scope.ObtenerAreas();
            }else{
              swal('Mensaje', data.mensaje, 'warning');   
            }
          })
        }else{
          swal('Mensaje', "Escribe el nombre del area", 'warning');   
        }    
      }
    }

    $scope.ObtenerEstadoColorTipo = function (tipo = null) {
      const tipos = {
        A: "etiquetaVerde",
        I: "etiquetaRojo",
      };
            return tipos[tipo] || "Ninguno";
        
    }

    $scope.filtroAreas = function(a, area){
          if (a == 'C') {
            $scope.crear = true;
            $scope.titulo = 'CREAR'
            $scope.editar = false;

          }
          if (a == 'E') {
            $scope.Editarnombre_area = area.NOMBRE;
            $scope.codigoArea = area.CODIGO;
            $scope.Estado = area.ESTADO;
            $scope.crear = false;
            $scope.titulo = 'EDITAR'
            $scope.editar = true;
          }
    }

    $scope.editarSeccional = function(dato, seccional){
      $("#modalEditar").modal("open");
      $scope.EditarArea  = dato.CODIGO_AREA;
      $scope.editarResponsable1 = dato.RESPONSABLE1;
      $scope.editarResponsable2 = dato.RESPONSABLE2;
      $scope.editarResponsable3 = dato.RESPONSABLE3;
      $scope.nombreSeccionalEditar = seccional.NOMBRE;
      $scope.CodigoSeccionalEditar = seccional.CODIGO;
      $scope.seccionalEditar = seccional.CODIGO;
    }

    $scope.modificarSeccional = function(){
      if ($scope.area == "" || $scope.editarResponsable1 == "" || $scope.editarResponsable2 == "" || $scope.editarResponsable3 == "") {
        swal('Mensaje', 'Los campos se encuentran vacios', 'error');   
      }else{
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/adminCorrespondencia.php",
          data: {
            function: 'P_LISTA_FUNCIONARIO',
            dato,
          }
        }).then(({data})=>{
          if (data.codigo == 0) {
            swal('Mensaje', data.Nombre, 'success');   
          }else{
            swal('Mensaje', data.Nombre, 'warning');   
          }
        })
      }
    }

    $scope.formatResponsable = function(texto){
      if(texto == null) return ""
        let array = texto.split("-");
        return array[1];
    } 

    $scope.agregarNuevo = function(){
      let cedula = sessionStorage.getItem("cedula"),  
      responsable1 = $scope.Responsable1.split("-")[0],
      responsable2 = $scope.Responsable2.split("-")[0],
      responsable3 = $scope.Responsable3.split("-")[0];
      if ($scope.areaNuevo == "" || $scope.Responsable1 == "" || $scope.seccionalNuevo == "") {
        swal('Campos Obligatorios (*)', 'Los campos obligatorios se encuentran vacios', 'error');   
      }else{
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/adminCorrespondencia.php",
          data: {
            function: 'P_INSERTAR_AREA_RESP_CORRESP',
            regional: $scope.seccionalNuevo,
            area: $scope.areaNuevo,
            responsable1: responsable1.trim(),
            responsable2: responsable2.trim(),
            responsable3: responsable3.trim(),
            cedula,
          }
        }).then(({data})=>{
          if (data.codigo == 0) {
            swal('Mensaje', data.mensaje, 'success'); 
            $scope.actualizarAreas($scope.seccionalNuevo);  

          }else{
            swal('Mensaje', data.mensaje, 'warning');   
          }
        })
      }
    }
    
    $scope.limpiarCampos = function () {
      $scope.EditarArea  = "";
      $scope.editarResponsable1 = "";
      $scope.editarResponsable2 = "";
      $scope.editarResponsable3 = "";
    }

    $scope.actualizarAreas = function(codigo){
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/administrativa/adminCorrespondencia.php",
        data: {
          function: 'P_OBTENER_AREAS_RESP_CORRESP',
          ubicacion: codigo,
        }
      }).then(({data})=>{
        if (data != "") {
          swal.close();
          $scope.AreasResponsable = data;
        }else{
          swal.close();
          swal('Mensaje', "No hay areas creadas", 'warning');
        }
      }) 
    }

    $scope.updateSeccional = function(){
      let cedula = sessionStorage.getItem("cedula"),  
      editarResponsable1 = $scope.editarResponsable1 == null ? '' : $scope.editarResponsable1.split("-")[0],
      editarResponsable2 = $scope.editarResponsable2 == null ? '' : $scope.editarResponsable2.split("-")[0],
      editarResponsable3 = $scope.editarResponsable3 == null ? '' : $scope.editarResponsable3.split("-")[0];
      if ($scope.EditarArea == "" || $scope.editarResponsable1 == "" ) {
        swal('Campos Obligarorios (*)', 'Los campos obligatorios se encuentran vacios*', 'error');   
      }else{
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/adminCorrespondencia.php",
          data: {
            function: 'P_INSERTAR_AREA_RESP_CORRESP',
            regional: $scope.CodigoSeccionalEditar,
            area: $scope.EditarArea,
            responsable1: editarResponsable1.trim(),
            responsable2: editarResponsable2.trim(),
            responsable3: editarResponsable3.trim(),            
            cedula,
          }
        }).then(({data})=>{
          if (data.codigo == 0) {
            swal('Mensaje', data.mensaje, 'success');   
            setTimeout(()=>{
              $scope.closeModal();
              $scope.actualizarAreas($scope.CodigoSeccionalEditar);
            },1000)

          }else{
            swal('Mensaje', data.mensaje, 'warning');   
          }
        })
      }
    }

    $scope.buscarFuncionario = function(dato){
      $scope.listaFuncionario = "";
          if (dato.length > 3) {
            $http({
              method: 'POST',
              url: "php/administrativa/adminCorrespondencia.php",
              data: {
                function: 'P_LISTA_FUNCIONARIO',
                dato,
              }
            }).then(({data})=>{
              if (data.Codigo == 1) {
                swal('Mensaje', data.Nombre, 'warning');   
              }else{
                $scope.listaFuncionario = data;
              }
            })
          }
    }

    $scope.nuevaArea_resp = function(){
      $scope.seccionalNuevo = "";
      $scope.areaNuevo = "";
      $scope.Responsable1 = "";
      $scope.Responsable2 = "";
      $scope.Responsable3 = "";
      $scope.listaFuncionario = "";
      $("#modalAgregar").modal("open");

    }

    if (document.readyState !== 'loading') {
      $scope.Inicio();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        $scope.Inicio();
      });
    }
   
  }]).filter('inicio', function () {
    return function (input, start) {
        if (input != undefined && start != NaN) {
            start = +start;
            return input.slice(start);
        } else {
            return null;
        }
    }
});