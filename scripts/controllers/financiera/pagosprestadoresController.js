'use strict';
angular.module('GenesisApp')
  .controller('pagosprestadoresController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {


    $(document).ready(function () {
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
$scope.botonhabilitar = false;
    
    });
    $http({
        method: 'POST',
        url: "php/financiera/pagoprestadores.php",
        data: { function: 'listar_servicios' }
      }).then(function (response) {
        $scope.listar_servicios = response.data;
      });
    $http({
        method: 'POST',
        url: "php/financiera/pagoprestadores.php",
        data: { function: 'listar_cuenta' }
      }).then(function (response) {
        $scope.listar_cuenta = response.data;
      });
    $http({
        method: 'POST',
        url: "php/financiera/pagoprestadores.php",
        data: { function: 'listar_SubServicios' }
      }).then(function (response) {
        $scope.listar_SubServicios = response.data;
      });
     
 $scope.setTab = function (x) {
                $scope.Tap = x;
                setTimeout(function () {
                  $scope.$apply();
                }, 500)
              }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.validararchivo1 = function (){
        $scope.inputFile1 = document.querySelector('#anexo2adj1');
        var archivo = $scope.inputFile1.files[0].name.split(".");
        var tamano = $scope.inputFile1.files[0].size
        var ext = archivo[1];
            if (tamano <= 253600000) { // se valida el tamaño del archivo
                if (ext.toUpperCase() == 'CSV') { //se valida el tipo del archivo
                  $scope.getBase64($scope.inputFile1.files[0]).then(function (result) {
                    $scope.archivocargar1 = result;
                  });
                } else {
                    swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .csv', 'warning')
                    $scope.nombrearchivo1 = "";
  
                }
            } else {
                swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
                $scope.nombrearchivo1 = "";
  
            }
      }
      $scope.insertar_listado1 = function () {
        const input = $('#anexo2adj1')[0];
        const file = input.files[0];
        const reader = new FileReader();
    
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
    
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
    
          $scope.datosenviar =  JSON.stringify(json, null, 2);
        };
        reader.readAsArrayBuffer(file);
        $scope.insertar_listado12();
    }
      $scope.insertar_listado12 = function () {
        swal({
          title: "Insertar Registros",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          type: "question"
        }).then(function (resp) {
          if (resp) {
            swal({ title: 'Cargando...' });
        swal.showLoading();
            $http({
              method: "POST",
              url: "php/financiera/pagoprestadores.php",
              data: {
                function: "Cargar_Confirma",
                archivo: $scope.datosenviar,
                // archivo: $scope.archivocargar1,
              },
            }).then(function (response) {
                console.log(response);
              swal.close();
                if (response.data.CODIGO == "1") {
                  swal({
                    title: "EXITOSO",
                    text: response.data.MENSAJE,
                    type: "success"
                  })
              } else {
                swal({
                  title: "¡IMPORTANTE!",
                  text: response.data.MENSAJE,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
          }
        });
      };
      $scope.descargar_archivo_pago = function (){
          if($scope.tiposervicio == "" || $scope.tiposervicio == undefined || $scope.tiposervicio == null || 
          $scope.subtiposervicio == "" || $scope.subtiposervicio == undefined || $scope.subtiposervicio == null || 
          $scope.tipocuenta == "" || $scope.tipocuenta == undefined || $scope.tipocuenta == null ||
          $scope.cuentabancaria == "" || $scope.cuentabancaria == undefined || $scope.cuentabancaria == null
        ){
            swal({
                title: "Llenar datos",
                text: 'Por favor seleccione las variables',
                type: "info"
              })
        }else{
            $scope.botonhabilitar = true;
            window.open(
                "php/financiera/descargararchivopagos.php?tiposervicio="+
                $scope.tiposervicio +
                "&subtiposervicio=" +
                $scope.subtiposervicio +
                "&tipocuenta=" +
                $scope.tipocuenta +
                "&cuentabancaria=" +
                $scope.cuentabancaria 
              );
              setTimeout(() => {
                $scope.botonhabilitar = false;
                $http({
                    method: 'POST',
                    url: "php/financiera/pagoprestadores.php",
                    data: { function: 'limpiar_Tabla' }
                  }).then(function (response) {
                    $scope.datarecibida = response.data;
                    console.log($scope.datarecibida);
                    $scope.botonhabilitar = false;
                  });

              }, 2000);
        }
      }
   
  }])
