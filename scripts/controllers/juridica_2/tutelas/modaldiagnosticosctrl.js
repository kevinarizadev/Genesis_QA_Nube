'use strict';
   angular.module('GenesisApp')
   .controller('modalDiagnosticosctrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
      $scope.nokeyword = true;
      $scope.filtroListado = function(){
         if ($scope.keyword.length > 3) {
            $http({
               method: 'POST',
               url: "php/juridica/tutelas/functutelas.php",
               data: {
                  function: 'listaDiagnosticos',
                  keyword: $scope.keyword
               }
            }).then(function (response) {
               $scope.nokeyword = false;
               $scope.Diagnosticos = response.data;
               if ($scope.Diagnosticos.length == 0) {
                  $scope.zeroresults = true;
               }else{
                  $scope.zeroresults = false;
               }
            });
         }else{
            $scope.nokeyword = true;
            $scope.zeroresults = false;
            $scope.Diagnosticos = {};   
         }
      }
   	$scope.selectDiagnostico = function(codigo,nombre){
         $('#D'+codigo).addClass('arr');
         $('#D'+codigo).siblings().removeClass('arr');
         $scope.diagnostico = {
            codigo:codigo,
            nombre:nombre
         }
      }
   }
]);