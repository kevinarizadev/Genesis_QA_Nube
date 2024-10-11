"use strict";
angular.module("GenesisApp").controller("consultaProductosPGPController", [
  "$scope",
  "$http",
  "$filter",
  "$q",
  function ($scope, $http) {
    $(document).ready(function () {
      $scope.limpiarForm();
      $(".modal").modal();
    });

    $scope.limpiarForm = function () {
      $scope.query = "";
      $scope.cups = {
        NUMERO: "",
        NOMBRE: "",
      };
      $scope.arrCups = [];
      $scope.arrResult = [];
      $scope.arrMunicipios = [];
      $scope.regimen = "";
      $scope.pantalla = 1;
    };

    $scope.P_LISTA_CUPS = function () {
      $scope.arrCups = [];
      swal({ title: "Consultando...", allowOutsideClick: false });
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/contratacion/consulta_productos_pgp.php",
        data: {
          function: "P_LISTA_CUPS",
          query: $scope.query,
        },
        }).then(function ({ data }) {
            if (data.toString().substring(0, 3) == "<br" || data == 1) {
                swal("NOTIFICACION", "¡Recargue la pagina por favor!", "info");
                } else {
                    swal.close();
                    if (data.length > 0) {
                        $scope.arrCups = data;
                        $scope.pantalla = 2;
                        } else {
              $scope.arrCups = [];
            swal({
                title: "NOTIFICACION",
                text: "¡NO SE ENCONTRO NINGUN PRODUCTO!",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false
            }).catch(swal.noop)
          }
        }
      });
    };

    $scope.volverFunc = function () {
      $scope.pantalla = $scope.pantalla - 1;
    };

    $scope.P_CONSULTA_REFERENCIA_ACTIVA = function (cups) {
      $scope.cups = cups;
      $scope.arrResult = [];
      swal({
        title: `
                    REGIMEN
                    `,
        html: `
                    <div class="col s6 no-padding label-new m-b">
                    <select class="select-chosen-eps" id="regimen">
                    <option value="" selected>SELECCIONAR</option>
                    <option value="KS">SUBSIDIADO</option>
                    <option value="KC">CONTRIBUTIVO</option>
                  </select>
                    </div>
                    `,
        // input: 'file',
        // inputPlaceholder: 'Acta de modificación',
        showCancelButton: true,
        allowOutsideClick: false,
        width: "auto",
        preConfirm: function () {
          return new Promise(function (resolve) {
            let regimen = document.getElementById("regimen").value;
            if (regimen != undefined && regimen != null && regimen != "") {
              resolve(regimen);
            } else {
              resolve(regimen);
            }
          });
        },
      }).then(function (result) {
        if (result == "KS" || result == "KC") {
          $scope.regimen = result;
          swal({ title: "Consultando...", allowOutsideClick: false });
          swal.showLoading();
          $http({
            method: "POST",
            url: "php/contratacion/consulta_productos_pgp.php",
            data: {
              function: "P_CONSULTA_PRODUCTOS_PGP",
              codigo: cups.NUMERO,
              regimen: result,
            },
          }).then(function ({ data }) {
            if (data.toString().substring(0, 3) == "<br" || data == 1) {
              swal("NOTIFICACION", "¡Recargue la pagina por favor!", "info");
            } else {
              swal.close();
              $scope.arrResult = data;
              $scope.pantalla = 3;
            }
          });
        }
      });
    };

    $scope.closeModal = function (modal) {
      $(`#${modal}`).modal("close");
    };

    $scope.p_lista_municipios_pgp = function (data) {
      $scope.arrMunicipios = [];
      swal({ title: "Consultando...", allowOutsideClick: false });
      swal.showLoading();
      $http({
        method: "POST",
        url: "php/contratacion/consulta_productos_pgp.php",
        data: {
          function: "p_lista_municipios_pgp",
          numero: data.CNTN_NUMERO,
          ubicacion: data.CNTN_UBICACION,
          regimen: data.CNTC_DOCUMENTO,
        },
      }).then(function ({ data }) {
        if (data.toString().substring(0, 3) == "<br" || data == 1) {
          swal("NOTIFICACION", "¡Recargue la pagina por favor!", "info");
        } else {
          swal.close();
          $scope.arrMunicipios = data;
          // $scope.pantalla = 4;
          $("#Modal_Municipios").modal("open");
        }
      });
    };

    $scope.p_lista_dx_pgp = function (data) {
      $scope.arrDx = [];
      swal({ title: 'Consultando...', allowOutsideClick: false });
      swal.showLoading();
      $http({
          method: 'POST',
          url: "php/contratacion/consulta_productos_pgp.php",
          data: {
              function: 'p_lista_dx_pgp',
              numero: data.CNTN_NUMERO,
              ubicacion: data.CNTN_UBICACION,
              regimen: data.CNTC_DOCUMENTO
          }
      }).then(function ({ data }) {
          if (data.toString().substring(0, 3) == '<br' || data == 1) {
              swal('NOTIFICACION', '¡Recargue la pagina por favor!', 'info');
          } else {
              swal.close();
              $scope.arrDx = data;
              if ($scope.arrDx.length == 0) return swal('NOTIFICACION', 'No se enncontraron datos para mostrar', 'info');
              $('#Modal_dx').modal('open');

              // $scope.pantalla = 2;
          }
      });
  }

  },
]);
