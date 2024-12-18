<!DOCTYPE html>
<html lang="en" ng-app="GenesisApp">

<head>
  <!-- <meta charset="UTF-8"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Genesis</title>
  <link rel="icon" href="../../assets/images/icon.ico" />
  <link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" />
  <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
  <script src="../../bower_components/angular/angular.js"></script>
  <script src="../../bower_components/jquery/dist/jquery.js"></script>
  <script type="text/javascript" src="../../js/qrcode.min.js"></script>
  <script src="../../scripts/controllers/autorizaciones/formatautorizacionQrController.js"></script>
  <script src="../../bower_components/materialize/bin/materialize.js"></script>
  <script src="../../js/jQuery.print.min.js"></script>
  <script src="../../assets/js/jquery-barcode.js"></script>
  <style>
    * {
      --font-family: 'Open Sans', sans-serif;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      /* -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none; */
    }

    p.eslogan {
      margin-top: 0px;
      margin-bottom: 0px;
      position: absolute;
      padding-left: 12px;
    }

    .nom {
      top: 5px;
      font-size: x-large;
      /* left: 174px; */
      width: 100%;
    }

    .nit {
      top: 35px;
    }

    .dir {
      top: 54px;
    }

    .tel {
      top: 73px;
    }

    .ubi {
      top: 92px;
    }

    .titulo {
      width: 622.5px;
      position: fixed;
      left: 400px;
    }

    .originalidad {
      font-size: large;
      position: fixed;
      left: 1030px;
    }

    .col1ben {
      position: absolute;
      left: 111px;
    }

    body.anticipo:before {
      content: "ANTICIPO";
      font-size: 7em;
      color: rgba(195, 195, 195, 0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: -500px;
      right: -100px;
      bottom: 0;
      left: 0;
      -webkit-pointer-events: none;
      -moz-pointer-events: none;
      -ms-pointer-events: none;
      -o-pointer-events: none;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -ms-transform: rotate(-45deg);
      /* IE 9 */
      -webkit-transform: rotate(-45deg);
      /* Safari 3-8 */
      transform: rotate(-45deg);
    }

    body.anticipocajasalud:before {
      content: "ANTICIPO CAJA DE SALUD";
      font-size: 5em;
      color: rgba(195, 195, 195, 0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: -500px;
      right: -100px;
      bottom: 0;
      left: 0;
      -webkit-pointer-events: none;
      -moz-pointer-events: none;
      -ms-pointer-events: none;
      -o-pointer-events: none;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -ms-transform: rotate(-45deg);
      /* IE 9 */
      -webkit-transform: rotate(-45deg);
      /* Safari 3-8 */
      transform: rotate(-45deg);
    }


    body.prioridad:after {
      content: "PRIORIDAD";
      font-size: 7em;
      color: rgba(195, 195, 195, 0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: -800px;
      right: 50px;
      bottom: 0;
      left: 0;
      -webkit-pointer-events: none;
      -moz-pointer-events: none;
      -ms-pointer-events: none;
      -o-pointer-events: none;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -ms-transform: rotate(-45deg);
      /* IE 9 */
      -webkit-transform: rotate(-45deg);
      /* Safari 3-8 */
      transform: rotate(-45deg);
    }

    body.prioridadnormal:after {
      content: "SERVICIO EXENTO DE COPAGO Y CUOTA MODERADORA";
      font-size: 4em;
      color: rgba(195, 195, 195, 0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: -950px;
      bottom: 0;
      left: 0;
      -webkit-pointer-events: none;
      -moz-pointer-events: none;
      -ms-pointer-events: none;
      -o-pointer-events: none;
      pointer-events: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      -ms-transform: rotate(-30deg);
      -webkit-transform: rotate(-30deg);
      transform: rotate(-30deg);
    }


    #table_datosbasicos,
    #table_datosbasicos tr th,
    #table_datosbasicos tr td {
      border: 0px solid white !important;
      border-collapse: collapse;
      /* font-size: 10px; */
      border-spacing: 0 0 !important;
      padding: 0;
      margin: 0;
      text-align: left;
      /* display: none; */
    }

    #table_datosbasicos {
      font-size: 14px;
      margin-top: -5px;
    }
  </style>
</head>

<body id="ele4" ng-controller="formatautorizacionController" ng-class="{'prioridad': datosAU.DatosBasico[0].prioridad=='S' && datosAU.DatosBasico[0].clasificacion=='1001', 'prioridadnormal': datosAU.DatosBasico[0].altocosto=='S' || datosAU.DatosBasico[0].discapacidad=='D' || datosAU.DatosBasico[0].excep_cmoderadora=='S' || datosAU.DatosBasico[0].excep_copago=='S' && datosAU.DatosBasico[0].clasificacion!='1001',  'anticipo': datosAU.DatosBasico[0].anticipo=='S',  'anticipocajasalud': datosAU.DatosBasico[0].anticipo=='C'}">
  <div class="row">
    <div id="autorizacion-x" class="col s12" style="width: 1100px;">
      <div class="row section-header" style="padding-bottom: 0px;">
        <div class="col s12 headers" id="cabe" style="position: fixed; background-color: white; z-index: 999;">
          <div class="col s12" id="cabecera">
            <div class="col s12">
              <div class="col s1">
                <img src="../../assets/images/logo_cajacopieps.png" width="160" height="60" style="left: -48px;position: relative;" alt="Logo CajacopiEPS" />
              </div>
              <div class="col s3" style="position: fixed; left: 153px;">
                <p class="eslogan nom">CAJACOPI EPS SAS</p>
                <p class="eslogan nit">{{datosAU.DatosBasico[0].Nit}}</p>
                <p class="eslogan dir">{{datosAU.DatosBasico[0].dirc}}</p>
                <p class="eslogan tel">{{datosAU.DatosBasico[0].telc}}</p>
                <p class="eslogan ubi">{{datosAU.DatosBasico[0].ubic}}</p>
              </div>
              <div class="col s7 titulo">
                <div class="col s8" style="position: fixed; left: 647px; font-size: xx-large; top: -35px;">
                  <p><strong>Autorización de Servicios</strong></p>
                </div>
              </div>
            </div>
            <div class="col s12" style="width: 422.5px; position: fixed;left: 636px; top: 20px;">
              <div class="col s12 codigo">
                <p class="left-align">Número <strong style="font-size: x-large;">{{datosAU.DatosBasico[0].numc}}</strong></p>
              </div>
              <div class="col s12" style="position: fixed; top: 50px; left: 644px;">
                <p class="left-align" ng-if="datosAU.DatosBasico[0].tipoc || datosAU.DatosBasico[0].altacosto=='S'">Tipo Autorizacion:
                  <strong style="font-size: x-large;" ng-if="datosAU.DatosBasico[0].tipoc"> {{datosAU.DatosBasico[0].tipoc}} </strong>
                  <strong ng-if="datosAU.DatosBasico[0].altacosto=='S'"> {{(datosAU.DatosBasico[0].tipoc &&  datosAU.DatosBasico[0].altacosto=='S')? '-':''}} {{ datosAU.DatosBasico[0].altacosto=='S'? 'EXENTO DE COPAGO':''}}</strong>
                </p>

              </div>
              <div class="col s12" style="position: fixed; top: 90px; left: 647px;">
                <span style="font-size: small;" class="left-align"><strong style="font-size: larger;">{{datosAU.DatosBasico[0].clasec}}</strong></span>
              </div>
              <!-- <div class="col s12" style="position: fixed; top: 97px; left: 647px;" ng-show="datosAU.DatosBasico[0].anticipo=='S'">
								<span style="font-size: small;" class="left-align"><strong style="font-size: larger;">ANTICIPO</strong></span>
							</div> -->
            </div>
          </div>
          <div class="col s12" id="beneficiario" style="padding-top: 40px;">
            <fieldset style="height: auto">
              <!-- <fieldset style="height: 145.5px;"> -->
              <legend><strong>Beneficiario</strong></legend>

              <table id="table_datosbasicos" style="width:1000px">
                <tr>
                  <td style="width:7%"></td>
                  <td style="width:30%"></td>
                  <td style="width:12%"></td>
                  <td style="width:7%"></td>
                  <td style="width:7.5%"></td>
                  <td style="width:10.5%"></td>
                  <td style="width:5%"></td>
                  <td style="width:7%"></td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td colspan="3"><strong>{{datosAU.DatosBasico[0].nomb}}</strong></td>
                  <td>Fecha:</td>
                  <td><strong>{{datosAU.DatosBasico[0].fecha_aut}}</strong></td>
                  <td>Vence:</td>
                  <td><strong>{{datosAU.DatosBasico[0].venceb}}</strong></td>
                </tr>
                <tr>
                  <td>Identificacion:</td>
                  <td><strong>{{datosAU.DatosBasico[0].idenb}}</strong></td>
                  <td>Sexo:</td>
                  <td><strong>{{datosAU.DatosBasico[0].sexob}}</strong></td>
                  <td>Nacimiento:</td>
                  <td><strong>{{datosAU.DatosBasico[0].nacb}}</strong></td>
                  <td>Diagnostico:</td>
                  <td><strong>{{datosAU.DatosBasico[0].diagb}}</strong></td>
                </tr>
                <tr>
                  <td>Sede Afiliado:</td>
                  <td><strong>{{datosAU.DatosBasico[0].sedeb}}</strong></td>
                  <td>Fecha Afiliacion:</td>
                  <td><strong>{{datosAU.DatosBasico[0].fecafib}}</strong></td>
                  <td>Regimen:</td>
                  <td><strong>{{datosAU.DatosBasico[0].regb}}</strong></td>
                  <td>Nivel:</td>
                  <td><strong>{{datosAU.DatosBasico[0].nivelb}}</strong></td>
                </tr>
                <tr>
                  <td>Direccion:</td>
                  <td><strong>{{datosAU.DatosBasico[0].dirb}}</strong></td>
                  <td>Contrato Admin:</td>
                  <td><strong>{{datosAU.DatosBasico[0].contrab}}</strong></td>
                  <td>Modalidad:</td>
                  <td><strong>{{datosAU.DatosBasico[0].modalb}}</strong></td>
                  <!-- <td>Nivel:</td> -->
                  <!-- <td><strong>{{datosAU.DatosBasico[0].nivelb}}</strong></td> -->
                </tr>
                <tr>
                  <td>Telefonos:</td>
                  <td><strong>{{datosAU.DatosBasico[0].telb}}</strong></td>
                  <td>Correo:</td>
                  <td colspan="3"><strong>{{datosAU.DatosBasico[0].mailb}}</strong></td>
                  <td>Estado AFI:</td>
                  <td><strong>{{datosAU.DatosBasico[0].estadob}}</strong></td>
                  <!-- <td>Diagnostico:</td> -->
                  <!-- <td><strong>{{datosAU.DatosBasico[0].diagb}}</strong></td> -->
                </tr>

              </table>

            </fieldset>
          </div>
        </div>
        <div class="col s12">
          <div class="col s12 page-break" id="servicios" style="position: relative; top: 250px; left: 3px;">
            <!-- <hr style="border-color: black; border-top-width: 1px;" /> -->
            <!-- <hr style="border-color: black; border-top-width: 1px; position: relative; top: 16px; z-index: 1;" /> -->
            <table class="table" style="height:100px; position: relative; top: 20px;">
              <tbody>
                <tr>
                  <td style="padding-top: 0px; padding-bottom: 0px;">
                    <table class="tableServ" style="height:100px;">
                      <thead>
                        <tr style="border-top:2px solid black;border-bottom:2px solid black;">
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 58px;">Reng</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 55px;">Codigo</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 413px;">Servicio</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Cantidad</th>
                          <!-- <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 63px;">Valor</th> -->
                          <!-- <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;" ng-if=" (datosAU.Total[0].copagot + '').replace('$', '')>'0'">Copago</th> -->
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 70px;" ng-if=" (datosAU.Total[0].cuota_moderadorat + '').replace('$', '')>'0'">C. Moderadora</th>
                          <!-- <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Total</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="page-break" ng-repeat="serv in datosAU.Servicios">
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.reng}}</td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.producto}}</td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">
                            <h6>{{serv.servicio}}</h6>
                          </td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; padding-left: 13px;">{{serv.cant}}</td>
                          <!-- <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.valor}}</td> -->
                          <!-- <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;" ng-if="(serv.copago + '').replace('$', '')>'0'">{{serv.copago}}</td> -->
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;" ng-if="(serv.cuota_moderadora + '').replace('$', '')>'0'">{{serv.cuota_moderadora}}</td>
                          <!-- <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.total}}</td> -->
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="col s4 offset-s8" style="position: relative; top: -20px; padding-right: 0px;">
											<hr style="border-color: black; border-top-width: 1px; padding-right: 0px;" />
										</div>
										<table class="table" style="position: relative; top: -20px;">
											<tbody>
												<tr>
													<td class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 526PX;">{{datosAU.DatosBasico[0].obss}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 84px;">
														</th>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 63px; position: relative; left: 27px;">{{datosAU.Total[0].valort}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px; position: relative; left: 15px;">{{datosAU.Total[0].copagot}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px; position: relative; left: 12px;">{{datosAU.Total[0].totalt}}</td>
												</tr>
											</tbody>
										</table> -->
                    <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -18px;">
                      <div class="col s4">
                        <p><strong>Medico Tratante:</strong> {{datosAU.DatosBasico[0].nombre_medico}}</p>
                        <p ng-hide="hideObservacion"><strong>Observacion:</strong> {{datosAU.DatosBasico[0].observacion}} <strong ng-if="datosAU.DatosBasico[0].tipoc=='TUTELA'"> {{datosAU.DatosBasico[0].observacion ? '-':''}} AUTORIZAR DE INMEDIATO</strong>
                          <!-- <strong ng-if="datosAU.DatosBasico[0].altocosto=='S'"> {{datosAU.DatosBasico[0].observacion ? '-':''}} SERVICIO EXENTO DE COPAGO Y CUOTA MODERADORA</strong> -->
                        </p>

                      </div>
                      <!-- <div class="col s2 offset-s9" style="position: absolute; left: 24px;">
												<p><strong>Solicitud:</strong></p>
											</div> -->
                    </div>
                    <hr style="border-color: black; border-top-width: 1px; position: relative; top: 0px;" />
                    <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -48px;;">
                      <div class="col s1">
                        <p>Numero {{datosAU.DatosBasico[0].nums}}</p>
                      </div>
                      <div class="col s3 offset-s1">
                        <p>Fecha {{datosAU.DatosBasico[0].fechas}}</p>
                      </div>
                      <div class="col s3 offset-s1">
                        <p>Ubic. paciente {{datosAU.DatosBasico[0].ubis}}</p>
                      </div>
                      <div class="col s2 offset-s1" style="position: relative; left: -60px;">
                        <p>Servicio/cama {{datosAU.DatosBasico[0].servis}}</p>
                      </div>
                    </div>
                    <div class="col s12" style="position: relative; top: -69px; padding-left: 0px; padding-right: 0px;">
                      <div class="col s3">
                        <p ng-if="datosAU.DatosBasico[0].tipoc!='TUTELA'"><strong>Imputable a:
                            {{datosAU.DatosBasico[0].entec}}
                          </strong></p>


                      </div>
                      <div class="col s9">
                        <center>
                          <p><strong>ESTE VALOR DE AUTORIZACION ESTA SUJETO A AUDITORIA MEDICA</strong></p>
                        </center>
                      </div>
                    </div>
                    <div class="col s12" style="position: relative; top: -104px;">
                      <p ng-if="datosAU.DatosBasico[0].tipoc!='TUTELA'"><strong>{{datosAU.DatosBasico[0].desente}}</strong></p>
                      <p><strong>MIPRES: {{datosAU.DatosBasico[0].mipres}}</strong></p>
                    </div>
                    <hr style="border-color: black; border-top-width: 1px; position: relative; top: -99px;" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col s12" id="footer" style="padding-left: 0px; padding-right: 0px; position: relative; top: 170px;">
            <div style="padding-left: 0px; padding-right: 0px;">
              <div class="col s6">
                <fieldset>
                  <legend><strong>Prestador</strong></legend>
                  <table class="table" style="height:100px;">
                    <tbody>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px; width: 108px;">Identificacion:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].idenp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Nombre:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].nomp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Direccion:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].dirp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Telefono:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].telp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Ciudad:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].ciup}}</td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>
              </div>
              <div class="col s4" style="height: 133px">
                <fieldset style="height: 161px;">
                  <legend><strong>Recibo a Satisfacción</strong></legend>
                  <div style="padding-top: 80px;">
                    <div class="col s12" style="position: relative; top: 12px;">
                      <hr style="border-color: black; border-top-width: 1px;" />
                    </div>
                    <div class="col s12" style="position: relative; top: 5px;">
                      <center>
                        <span>Firma del Usuario</span>
                      </center>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col s2">
                <div id="qrcode" style="float:right"></div>
              </div>
            </div>
            <div class="col s12" style="padding-left: 2px;">
              <div class="col s4">
                <span>Fecha de impresion: {{datosAU.DatosBasico[0].sysdate}}</span>
              </div>
              <div class="col s6">
                <span ng-if="datosAU.DatosBasico[0].mipres =='0'">Autorizado por: {{datosAU.DatosBasico[0].autpor}}</span>

                <span ng-if="datosAU.DatosBasico[0].mipres !='0'">Medico Tratante:{{datosAU.DatosBasico[0].nombre_medico}}</span>

              </div>
              <siv class="col s2" style="padding-right: 0px; padding-left: 24px;">
                <span class="right-aling">www.cajacopieps.com</span>
              </siv>
            </div>
            <div class="col s12" style="padding-left: 2px;">
              <div class="col s4">
                <span>GENESIS</span>
              </div>
              <div class="col s6">
                <span ng-if="datosAU.DatosBasico[0].mipres ==''">{{datosAU.DatosBasico[0].cargo}}</span>
              </div>
            </div>
            <div class="col s12">
              <div style="margin: auto;" id="barcodeTarget" class="barcodeTarget"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</body>

</html>
