'use strict';
angular.module('GenesisApp')
    .controller('matrizpestelController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

        $scope.Inicio = function(){
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.collapsible');
                var instances = M.Collapsible.init(elems, options);
                var elems2 = document.querySelectorAll('.tooltipped');
                var instances2 = M.Tooltip.init(elems2, options2);
              });
              $(document).ready(function(){
                $('.collapsible').collapsible();
              });
              $(document).ready(function(){
                $('.tooltipped').tooltip();
              });

            $scope.contador = 0;
            $scope.contadorEconomico = 0;
            $scope.contadorSocioCult = 0;
            $scope.contadorTecn = 0;
            $scope.contadorEcologico = 0;
            $scope.contadorLegal = 0;
            $scope.otroPolitico = false;
            $scope.otroEconomico = false;
            $scope.otroSocioCultural = false;
            $scope.otroTecnologico = false;
            $scope.otroEcologico = false;
            $scope.PoliticoInput = "";
            $scope.EconomicoInput = "";
            $scope.Socio_culturalInput = "";
            $scope.TecnologicoInput = "";
            $scope.EcologicoInput = "";
            $scope.NuevoPolitico1 = [];
            $scope.NuevoEconomico1 = [];
            $scope.NuevoSocio_cultu1 = [];
            $scope.NuevoTecnologico = [];
            $scope.NuevoEcologico = [];
            $scope.NuevoLegal = [];
            $scope.limpiar()
            $scope.cedula = sessionStorage.getItem("cedula");

        }

        $scope.NuevoFactor = function(){
            if ($scope.PoliticoInput == null || $scope.PoliticoInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoPolitico1.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contador == 0) {
                    $scope.contador = 1;
                    $scope.NuevoPolitico1.push($scope.PoliticoInput);
                    $scope.PoliticoInput = "";
                }else if($scope.contador == 1){
                    $scope.contador = 2;
                    $scope.NuevoPolitico1.push($scope.PoliticoInput);
                    $scope.PoliticoInput = "";
                }
            }
        }

        $scope.NuevoFactorEconomico = function(){
            $scope.economico.nuevoE1 = "";
            $scope.economico.nuevoE2 = "";
            if ($scope.EconomicoInput == null || $scope.EconomicoInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoEconomico1.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contadorEconomico == 0) {
                    $scope.contadorEconomico = 1;
                    $scope.NuevoEconomico1.push($scope.EconomicoInput);
                    $scope.EconomicoInput = "";
                }else if($scope.contadorEconomico == 1){
                    $scope.contadorEconomico = 2;
                    $scope.NuevoEconomico1.push($scope.EconomicoInput);
                    $scope.EconomicoInput = "";
                }
            }
        }

        $scope.NuevoFactorSocio = function(){
            $scope.socio_cultural.nuevoS1 = "";
            $scope.socio_cultural.nuevoS2 = "";
            if ($scope.Socio_culturalInput == null || $scope.Socio_culturalInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoSocio_cultu1.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contadorSocioCult == 0) {
                    $scope.contadorSocioCult = 1;
                    $scope.NuevoSocio_cultu1.push($scope.Socio_culturalInput);
                    $scope.Socio_culturalInput = "";
                }else if($scope.contadorSocioCult == 1){
                    $scope.contadorSocioCult = 2;
                    $scope.NuevoSocio_cultu1.push($scope.Socio_culturalInput);
                    $scope.Socio_culturalInput = "";
                }
            }
        }

        $scope.NuevoFactorTecn = function(){
            $scope.tecnologico.nuevoT1 = "";
            $scope.tecnologico.nuevoT2 = "";
            if ($scope.TecnologicoInput == null || $scope.TecnologicoInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoTecnologico.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contadorTecn == 0) {
                    $scope.contadorTecn = 1;
                    $scope.NuevoTecnologico.push($scope.TecnologicoInput);
                    $scope.TecnologicoInput = "";
                }else if($scope.contadorTecn == 1){
                    $scope.contadorTecn = 2;
                    $scope.NuevoTecnologico.push($scope.TecnologicoInput);
                    $scope.TecnologicoInput = "";
                }
            }
        }

        $scope.NuevoFactorEcologico = function(){
            $scope.ecologico.nuevoA1 = "";
            $scope.ecologico.nuevoA2 = "";
            if ($scope.EcologicoInput == null || $scope.EcologicoInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoEcologico.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contadorEcologico == 0) {
                    $scope.contadorEcologico = 1;
                    $scope.NuevoEcologico.push($scope.EcologicoInput);
                    $scope.EcologicoInput = "";
                }else if($scope.contadorEcologico == 1){
                    $scope.contadorEcologico = 2;
                    $scope.NuevoEcologico.push($scope.EcologicoInput);
                    $scope.EcologicoInput = "";
                }
            }
        }

        $scope.NuevoFactorLegal = function(){
            $scope.legales.nuevoL1 = "";
            $scope.legales.nuevoL2 = "";
            if ($scope.LegalesInput == null || $scope.LegalesInput == "") {
                swal({
                        title: "Campos Vacios",
                        text: "Por favor complete el campo",
                        type: "info",
                     })
            }else if($scope.NuevoLegal.length >= 2) {
                swal({
                    title: "No Permitido",
                    text: "No es posible agregar mas factores",
                    type: "info",
                 })
            }
            else{
                if ($scope.contadorLegal == 0) {
                    $scope.contadorLegal = 1;
                    $scope.NuevoLegal.push($scope.LegalesInput);
                    $scope.LegalesInput = "";
                }else if($scope.contadorLegal == 1){
                    $scope.contadorLegal = 2;
                    $scope.NuevoLegal.push($scope.LegalesInput);
                    $scope.LegalesInput = "";
                }
            }
        }

        $scope.eliminar = function(codigo, dato, id){
            if (codigo == 'P') {
                let valor =  $scope.NuevoPolitico1.indexOf(dato);
                  if(valor != -1 && id == 1){
                      $scope.NuevoPolitico1.splice(valor,1);
                      $scope.contador--;
                      $scope.politico.nuevo1 = "";
                  }if(valor != -1 && id == 2){
                    $scope.NuevoPolitico1.splice(valor,1);
                    $scope.contador--;
                    $scope.politico.nuevo2 = "";
                }
                }if (codigo == 'E') {
                    let valor =  $scope.NuevoEconomico1.indexOf(dato);
                    if(valor != -1 && id == 1){
                        $scope.NuevoEconomico1.splice(valor,1);
                        $scope.contadorEconomico--;
                        $scope.economico.nuevoE1 = "";
                    }if(valor != -1 && id == 2){
                        $scope.NuevoEconomico1.splice(valor,1);
                        $scope.contadorEconomico--;
                        $scope.economico.nuevoE2 = "";
                    }
                  }if (codigo == 'S') {
                    let valor =  $scope.NuevoSocio_cultu1.indexOf(dato);
                    if(valor != -1 && id == 1){
                        $scope.NuevoSocio_cultu1.splice(valor,1);
                        $scope.contadorSocioCult--;
                        $scope.socio_cultural.nuevoS1 = "";
                    }if(valor != -1 && id == 2){
                        $scope.NuevoSocio_cultu1.splice(valor,1);
                        $scope.contadorSocioCult--;
                        $scope.socio_cultural.nuevoS2 = "";
                    }
                  }if (codigo == 'T') {
                    let valor =  $scope.NuevoTecnologico.indexOf(dato);
                    if(valor != -1 && id == 1){
                        $scope.NuevoTecnologico.splice(valor,1);
                        $scope.contadorTecn--;
                        $scope.tecnologico.nuevoT1 = "";
                    }if(valor != -1 && id == 2){
                        $scope.NuevoTecnologico.splice(valor,1);
                        $scope.contadorTecn--;
                        $scope.tecnologico.nuevoT2 = "";
                    }

                  }if (codigo == 'R') {
                    let valor =  $scope.NuevoEcologico.indexOf(dato);
                    if(valor != -1 && id == 1){
                        $scope.NuevoEcologico.splice(valor,1);
                        $scope.contadorEcologico--;
                        $scope.ecologico.nuevoA1 = "";
                    }if(valor != -1 && id == 2){
                        $scope.NuevoEcologico.splice(valor,1);
                        $scope.contadorEcologico--;
                        $scope.ecologico.nuevoA2 = "";
                    }
                  }if (codigo == 'L') {
                    let valor =  $scope.NuevoLegal.indexOf(dato);
                    if(valor != -1 && id == 1){
                        $scope.NuevoLegal.splice(valor,1);
                        $scope.contadorLegal--;
                        $scope.legales.nuevoL1 = "";
                    }if(valor != -1 && id == 2){
                        $scope.NuevoLegal.splice(valor,1);
                        $scope.contadorLegal--;
                        $scope.legales.nuevoL2 = "";
                    }
                  }
        }

        $scope.limpiar = function(){
            $scope.politico = {
                GobiernoActual: "",
                EleccionesTerritoriales: "",
                nuevo1: "",
                nuevo2: "",
            }
    
            $scope.economico = {
                CumplimientoCondicionesfinancieras: "",
                Desabastecimientodemedicamentos: "",
                DecrecimientodelPIB: "",
                IPC: "",
                Dolar: "",
                PerspectivadelaeconomiadelPais: "",
                CierredeEPSdesde2022: "",
                IdentificacionFallosCompetencia: "",
                IncrementoDemandadsalud: "",
                nuevoE1: "",
                nuevoE2: "",
            }
    
            $scope.socio_cultural = {
                InconformidadPoblacionafiliada: "",
                IndiceDispersionpoblacional: "",
                ParticipacionMercadoEps: "",
                RetencionAfiliados: "",
                Caracterizacionpoblacional: "",
                nuevoS1: "",
                nuevoS2: "",
            }
    
            $scope.tecnologico = {
                InversionID: "",
                canalesdeComunicacion: "" ,
                PresenciaenelmercadoDigital: "",
                AprovechamientodelasRedes: "",
                SitioWeb: "",
                Aplicacionesmoviles: "",
                implementacionNuevosmodulos: "",
                EstrategiasMarketingdigital: "",
                nuevoT1: "",
                nuevoT2: "",
            }
    
            $scope.ecologico = {
                AprovechamientodeResiduos: "",
                ImplementaciondePoliticas: "",
                ProgramasEnfocadoContaminantes: "",
                ProgramaSocioAmbiental: "",
                nuevoA1: "",
                nuevoA2: "",
            }
    
            $scope.legales = {
                ExcesoNormativo: "",
                Modificaciondecircular: "",
                CambiosPermanentesdelegislacion: "",
                ReformaSalud: "",
                HabilitaciondelaEps: "",
                Respuestaplanesdemejoramiento: "",
                nuevoL1: "",
                nuevoL2: "",
            }
            document.getElementById("EconomicoLi").classList.add("disabled");
            document.getElementById("SocioC_li").classList.add("disabled");
            document.getElementById("Tecno_li").classList.add("disabled");
            document.getElementById("Ecolo_li").classList.add("disabled");
            document.getElementById("Legal_li").classList.add("disabled");
        }
     

        $scope.validarFormulario = function (codigo) {
            if (codigo == 'P') {

                let contador1 = 0;
                var categoriasPoliticos = ['contact2', 'contact1'];
            
                for (var i = 0; i < categoriasPoliticos.length; i++) {
                    var fieldName = categoriasPoliticos[i];
                    var isChecked = document.querySelector('input[name="' + fieldName + '"]:checked');
            
                    if (!isChecked) {
                        swal({
                            title: "Campo Obligatorio",
                            text: "Por favor selecciona las opciones del Factor Politico",
                            type: "info",
                          })
                          contador1++
                        return false;
                }
            }
            if ($scope.contador >= 1 && $scope.politico.nuevo1 == "" || $scope.contador >= 2 && $scope.politico.nuevo2 == "") {
                swal({
                    title: "Campo Obligatorio",
                    text: "Por favor selecciona las opciones nueva que agrego",
                    type: "info",
                  })
            }else{
                if (contador1 == 0) {
                    document.getElementById("EconomicoLi").classList.remove("disabled");       
                    
                }
            }
        
            }else if(codigo == 'E'){
                let contador1 = 0;
                var categoriasEconomicos = ['economico1', 'economico2', 'economico3','economico4','economico5', 'economico6', 'economico7', 'economico8', 'economico9']
                for (let i = 0; i < categoriasEconomicos.length; i++) {
                    let fieldName2 = categoriasEconomicos[i];
                    let isChecked2 = document.querySelector('input[name="'+ fieldName2 +'"]:checked');
    
                    if (!isChecked2) {
                        swal({
                            title: "Campo Obligatorio",
                            text: "Por favor selecciona las opciones del Factor Economico",
                            type: "info",
                          })
                        return false;
               
                    }
                }
                if($scope.contadorEconomico >= 1 && $scope.economico.nuevoE1 == "" || $scope.contadorEconomico >= 2 && $scope.economico.nuevoE2 == ""){
                    swal({
                        title: "Campo Obligatorio",
                        text: "Por favor selecciona las opciones nueva que agrego",
                        type: "info",
                      })
                } else{
                    if (contador1 == 0) {
                        document.getElementById("SocioC_li").classList.remove("disabled");      
                    }
                }
            }else if(codigo == 'S'){
                let contador1 = 0;
                var categoriasSocioCultural = ['socioCultura1', 'socioCultura2', 'socioCultura3','socioCultura4','socioCultura5']
                for (let i = 0; i < categoriasSocioCultural.length; i++) {
                    let nombre = categoriasSocioCultural[i];
                    let seleccion = document.querySelector('input[name="'+ nombre +'"]:checked');
    
                    if (!seleccion) {
                        swal({
                            title: "Campo Obligatorio",
                            text: "Por favor selecciona las opciones del Factor Socio Cultural",
                            type: "info",
                          })
                        return false;
                    }                 
                }
                if($scope.contadorEconomico >= 1 && $scope.economico.nuevoE1 == "" || $scope.contadorEconomico >= 2 && $scope.economico.nuevoE2 == ""){
                    swal({
                        title: "Campo Obligatorio",
                        text: "Por favor selecciona las opciones nueva que agrego",
                        type: "info",
                      })
                } else{
                    if (contador1 == 0) {
                    document.getElementById("Tecno_li").classList.remove("disabled");
    
                    }         
                }
                
                
            }else if(codigo == 'T'){
                let contador1 = 0;
                var categoriasTecnologicos = ['tecnologico2', 'tecnologico3', 'tecnologico4','tecnologico5','tecnologico6', 'tecnologico7', 'tecnologico8', 'tecnologico9']
                for (let i = 0; i < categoriasTecnologicos.length; i++) {
                    let nombreT = categoriasTecnologicos[i];
                    let seleccionT = document.querySelector('input[name="'+ nombreT +'"]:checked');
    
                    if (!seleccionT) {
                        swal({
                            title: "Campo Obligatorio",
                            text: "Por favor selecciona las opciones del Factor Tecnologico",
                            type: "info",
                          })
                        return false;              
                    }
                }
                if($scope.contadorEconomico >= 1 && $scope.economico.nuevoE1 == "" || $scope.contadorEconomico >= 2 && $scope.economico.nuevoE2 == ""){
                    swal({
                        title: "Campo Obligatorio",
                        text: "Por favor selecciona las opciones nueva que agrego",
                        type: "info",
                      })
                } else{
                    if (contador1 == 0) {
                        document.getElementById("Ecolo_li").classList.remove("disabled");               
                        }
                }
                
            }else if(codigo == 'L'){
                let contador1 = 0;
                var categoriasEcologicos = ['ecologicos1', 'ecologicos2', 'ecologicos3','ecologicos4']
                for (let i = 0; i < categoriasEcologicos.length; i++) {
                    let nombreEC = categoriasEcologicos[i];
                    let seleccionEC = document.querySelector('input[name="'+ nombreEC +'"]:checked');
    
                    if (!seleccionEC) {
                        swal({
                            title: "Campos Obligatorio",
                            text: "Por favor selecciona las opciones del Factor Ecologico",
                            type: "info",
                          })
                        return false;
                    }                 
                }
                if($scope.contadorEconomico >= 1 && $scope.economico.nuevoE1 == "" || $scope.contadorEconomico >= 2 && $scope.economico.nuevoE2 == ""){
                    swal({
                        title: "Campo Obligatorio",
                        text: "Por favor selecciona las opciones nueva que agrego",
                        type: "info",
                      })
                } else{
                    if (contador1 == 0) {
                              document.getElementById("Legal_li").classList.remove("disabled");
                        }
                }
            }
        }
        

        $scope.validarRadioButton = function (){
                if($scope.contador >= 1 && $scope.politico.nuevo1 == "" || $scope.contador >= 2 && $scope.politico.nuevo2 == ""){
                    // if ($scope.politico.nuevo1 == "") {
                    //     document.getElementById("nuevo1").classList.add("red-text");
                    // }
                    return true;
                } else if($scope.contadorEconomico >= 1 && $scope.economico.nuevoE1 == "" || $scope.contadorEconomico >= 2 && $scope.economico.nuevoE2 == ""){
                    return true
                } else if ($scope.contadorSocioCult >= 1 && $scope.socio_cultural.nuevoS1 == "" || $scope.contadorSocioCult >= 2 && $scope.socio_cultural.nuevoS1 == "") {
                    return true
                } else if($scope.contadorTecn >=1 && $scope.tecnologico.nuevoT1 == "" || $scope.contadorTecn >=2 && $scope.tecnologico.nuevoT2 == ""){
                    return true
                } else if ($scope.contadorEcologico >= 1 && $scope.ecologico.nuevoA1 == "" || $scope.contadorEcologico >= 2 && $scope.ecologico.nuevoA2 == "") {
                    return true
                }else if ($scope.contadorLegal >= 1 && $scope.legales.nuevoL1 == "" || $scope.contadorLegal >= 2 && $scope.legales.nuevoL2 == "") {
                    return true
                }else{
                    return false
                }
        }
        
        
                

    $scope.guardar = function(){
        let data = [
                    { "tipo": 1, "pregunta": 1, "nombre": "Gobierno Actual", "valor": $scope.politico.GobiernoActual},
                    { "tipo": 1, "pregunta": 2, "nombre": "Elecciones Territoriales 2023", "valor": $scope.politico.EleccionesTerritoriales},
                      
                    { "tipo": 2, "pregunta": 1, "nombre": "Cumplimiento de condiciones financieras", "valor": $scope.economico.CumplimientoCondicionesfinancieras},
                    { "tipo": 2, "pregunta": 2, "nombre": "Desabastecimiento de medicamentos", "valor": $scope.economico.Desabastecimientodemedicamentos},
                    { "tipo": 2, "pregunta": 3, "nombre": "Decrecimiento del PIB", "valor":$scope.economico.DecrecimientodelPIB},
                    { "tipo": 2, "pregunta": 4, "nombre":"IPC", "valor":$scope.economico.IPC},
                    { "tipo": 2, "pregunta": 5, "nombre": "Dolar", "valor": $scope.economico.Dolar},
                    { "tipo": 2, "pregunta": 6, "nombre": "Perspectiva de la economia del País", "valor": $scope.economico.PerspectivadelaeconomiadelPais},
                    { "tipo": 2, "pregunta": 7, "nombre": "Cierre de EPS desde 2022", "valor": $scope.economico.CierredeEPSdesde2022},
                    { "tipo": 2, "pregunta": 8, "nombre": "Identificación Fallos de la Competencia, Monopolios, Oligopolios", "valor": $scope.economico.IdentificacionFallosCompetencia},
                    { "tipo": 2, "pregunta": 9, "nombre": "Incremento en la demanda del servicio de salud", "valor": $scope.economico.IncrementoDemandadsalud},
                       
                    { "tipo": 3, "pregunta": 1, "nombre":"Inconformidad de la población afiliada", "valor": $scope.socio_cultural.InconformidadPoblacionafiliada},
                    { "tipo": 3, "pregunta": 2, "nombre":"Indice de dispersión poblacional", "valor": $scope.socio_cultural.IndiceDispersionpoblacional},
                    { "tipo": 3, "pregunta": 3, "nombre":"Participación del mercado Eps(ranking)", "valor": $scope.socio_cultural.ParticipacionMercadoEps},
                    { "tipo": 3, "pregunta": 4, "nombre":"Retención de afiliados", "valor": $scope.socio_cultural.RetencionAfiliados},
                    { "tipo": 3, "pregunta": 5, "nombre":"Caracterización poblacional", "valor": $scope.socio_cultural.Caracterizacionpoblacional},
                       
                    { "tipo": 4, "pregunta": 1, "nombre":"Inversión I+D", "valor": $scope.tecnologico.InversionID},
                    { "tipo": 4, "pregunta": 2, "nombre":"Canales de Comunicación", "valor": $scope.tecnologico.canalesdeComunicacion},
                    { "tipo": 4, "pregunta": 3, "nombre":"Presencia en el mercado Digital", "valor": $scope.tecnologico.PresenciaenelmercadoDigital},
                    { "tipo": 4, "pregunta": 4, "nombre":"Aprovechamiento de las Redes", "valor": $scope.tecnologico.AprovechamientodelasRedes},
                    { "tipo": 4, "pregunta": 5, "nombre":"Sitio Web", "valor": $scope.tecnologico.SitioWeb},
                    { "tipo": 4, "pregunta": 6, "nombre":"Aplicaciones móviles", "valor": $scope.tecnologico.Aplicacionesmoviles},
                    { "tipo": 4, "pregunta": 7, "nombre":"Implementación de nuevos modulos", "valor": $scope.tecnologico.implementacionNuevosmodulos},
                    { "tipo": 4, "pregunta": 8, "nombre":"Estrategias de Marketing digital Efectivas", "valor": $scope.tecnologico.EstrategiasMarketingdigital},
                    
                    { "tipo": 5, "pregunta": 1, "nombre":"Aprovechamiento de residuos", "valor": $scope.ecologico.AprovechamientodeResiduos},
                    { "tipo": 5, "pregunta": 2, "nombre":"Implementación de Politicas(Cero Papel,Reciclaje..)", "valor": $scope.ecologico.ImplementaciondePoliticas},
                    { "tipo": 5, "pregunta": 3, "nombre":"Programas enfocado a los usuarios sobre focos contaminantes", "valor": $scope.ecologico.ProgramasEnfocadoContaminantes},
                    { "tipo": 5, "pregunta": 4, "nombre":"Programa Socio Ambiental", "valor": $scope.ecologico.ProgramaSocioAmbiental},


                   { "tipo": 6,  "pregunta": 1, "nombre":"Exceso Normativo", "valor": $scope.legales.ExcesoNormativo},
                   { "tipo": 6,  "pregunta": 2, "nombre":"Modificación de circular 008 (PQRSD)", "valor": $scope.legales.Modificaciondecircular},
                   { "tipo": 6,  "pregunta": 3, "nombre":"Cambios permanentes de legislación", "valor": $scope.legales.CambiosPermanentesdelegislacion},
                   { "tipo": 6,  "pregunta": 4, "nombre":"Reforma a la Salud", "valor": $scope.legales.ReformaSalud},
                   { "tipo": 6,  "pregunta": 5, "nombre":"Habilitación de la Eps", "valor": $scope.legales.HabilitaciondelaEps},
                   { "tipo": 6,  "pregunta": 6, "nombre":"Respuesta planes de mejoramiento", "valor": $scope.legales.Respuestaplanesdemejoramiento},                
                    ]
                    
        if($scope.politico.GobiernoActual == "" || $scope.politico.EleccionesTerritoriales == "" || $scope.economico.CumplimientoCondicionesfinancieras == "" || $scope.economico.Desabastecimientodemedicamentos == "" ||
            $scope.economico.DecrecimientodelPIB == "" || $scope.economico.IPC == "" || $scope.economico.Dolar == "" || $scope.economico.PerspectivadelaeconomiadelPais == "" || $scope.economico.CierredeEPSdesde2022 == "" ||
            $scope.economico.IdentificacionFallosCompetencia == "" || $scope.economico.IncrementoDemandadsalud == "" || $scope.socio_cultural.InconformidadPoblacionafiliada == "" || 
            $scope.socio_cultural.IndiceDispersionpoblacional  == "" || $scope.socio_cultural.ParticipacionMercadoEps == "" || $scope.socio_cultural.ParticipacionMercadoEps == "" || $scope.socio_cultural.RetencionAfiliados
            == "" || $scope.socio_cultural.Caracterizacionpoblacional == "" || $scope.tecnologico.InversionID == "" || $scope.tecnologico.canalesdeComunicacion == "" || $scope.tecnologico.PresenciaenelmercadoDigital
            == "" || $scope.tecnologico.AprovechamientodelasRedes == "" || $scope.tecnologico.SitioWeb == "" || $scope.tecnologico.Aplicacionesmoviles == "" || $scope.tecnologico.implementacionNuevosmodulos == "" || 
            $scope.tecnologico.EstrategiasMarketingdigital == "" || $scope.ecologico.AprovechamientodeResiduos == "" || $scope.ecologico.ImplementaciondePoliticas 
            == "" || $scope.ecologico.ProgramasEnfocadoContaminantes == "" || $scope.ecologico.ProgramaSocioAmbiental == "" || $scope.legales.ExcesoNormativo == "" || $scope.legales.Modificaciondecircular == "" || 
            $scope.legales.CambiosPermanentesdelegislacion == "" || $scope.legales.ReformaSalud == "" || $scope.legales.HabilitaciondelaEps == "" || $scope.legales.Respuestaplanesdemejoramiento == "") {
                    swal({
                            title: "Campos Obligatorios",
                            text: "Por favor complete los items",
                            type: "info",
                          })
                        return;
        } else if($scope.validarRadioButton()){    
        swal({
            title: "Campos Obligatorios",
            text: "Por favor complete los factores nuevos",
            type: "info",
          })
        
        }else{
            let cedula = sessionStorage.getItem("cedula");
            if($scope.NuevoPolitico1.length != 0) {
                data.push({"tipo": 1, "pregunta": 3, "nombre": $scope.NuevoPolitico1[0],"valor":$scope.politico.nuevo1})
                if ($scope.NuevoPolitico1.length > 1) {
                    data.push({"tipo": 1, "pregunta": 4, "nombre": $scope.NuevoPolitico1[1],"valor":$scope.politico.nuevo2})
                }
            }
            if($scope.NuevoEconomico1.length != 0) {
                data.push({"tipo": 2, "pregunta": 10, "nombre": $scope.NuevoEconomico1[0],"valor":$scope.economico.nuevoE1})
                if ($scope.NuevoEconomico1.length > 1) {
                    data.push({"tipo": 2, "pregunta": 11, "nombre": $scope.NuevoEconomico1[1],"valor":$scope.economico.nuevoE2})
                }
            } if ($scope.NuevoSocio_cultu1.length != 0) {
                data.push({"tipo": 3, "pregunta": 6,"nombre": $scope.NuevoSocio_cultu1[0],"valor":$scope.socio_cultural.nuevoS1})
                if ($scope.NuevoSocio_cultu1.length > 1) {
                    data.push({"tipo": 3, "pregunta": 7, "nombre": $scope.NuevoSocio_cultu1[1],"valor":$scope.socio_cultural.nuevoS2})
                }
            } if ($scope.NuevoTecnologico.length != 0) {
                data.push({"tipo": 4, "pregunta": 9, "nombre": $scope.NuevoTecnologico[0],"valor":$scope.tecnologico.nuevoT1})
                if ($scope.NuevoTecnologico.length > 1) {
                    data.push({"tipo": 4, "pregunta": 10, "nombre": $scope.NuevoTecnologico[1],"valor":$scope.tecnologico.nuevoT2})      
                }
            } if ($scope.NuevoEcologico.length != 0) {
                data.push({"tipo": 5, "pregunta": 5, "nombre": $scope.NuevoEcologico[0],"valor":$scope.ecologico.nuevoA1})
                if ($scope.NuevoEcologico.length) {
                    data.push({"tipo": 5, "pregunta": 6, "nombre": $scope.NuevoEcologico[1],"valor":$scope.ecologico.nuevoA1})
                }
            } if ($scope.NuevoLegal.length != 0) {
                data.push({"tipo": 6, "pregunta": 7, "nombre": $scope.NuevoLegal[0],"valor":$scope.legales.nuevoL1})
                if ($scope.NuevoLegal.length > 1) {
                    data.push({"tipo": 6, "pregunta": 8, "nombre": $scope.NuevoLegal[1],"valor":$scope.legales.nuevoL2})     
                }
            }
        $http({
            method: 'POST',
            url: "php/planeacion/matrizPestel.php",
            data: { function: "p_ui_PESTEL",
                    datos: JSON.stringify(data),
                    cantidad: data.length,
                    cedula
                  }
        }).then( function ({data}){
            if(data.Codigo == 0){
                $scope.limpiar();
                swal({
                    title: data.Nombre,
                    text: "",
                    type: "success",
                  })
            }else{
                swal({
                    title: data.Nombre,
                    text: "",
                    type: "info",
                  }) 
            }
        }) }
             
        }

        $scope.descargarExcel = function(){
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Exportando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              setTimeout(() => {
                $http({
                  method: 'POST',
                  url: "php/planeacion/matrizPestel.php",
                  data: { 
                    function: 'descargarExcel'
                        }
                }).then(function ({ data }) {
                  console.log(data);
                  if (data.length) {
                    var ws = XLSX.utils.json_to_sheet(data);
                    /* add to workbook */
                    var wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                    /* write workbook and force a download */
                    XLSX.writeFile(wb, "MATRIZ PESTEL.xlsx");
                    const text = `Registros encontrados ${data.length}`
                    swal('¡Mensaje!', text, 'success').catch(swal.noop);
                  } else {
                    swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
                  }
                })
        })
    }


    
        if (document.readyState !== 'loading') {
            $scope.Inicio();    
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                $scope.Inicio();
            });
        }
    
    }])

