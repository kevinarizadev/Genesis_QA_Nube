<?php
$codigo = $_GET['codigo'];
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Plan Anual de Auditorias " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>
<style>
    .color {
        background-color: #1a2e63;
    }

    .border {
        border: solid;
        border-width: 1px;
        border-color: black;
    }

    body {
        font-family: Arial;
        font-size: 0.3cm
    }

    .p {
        padding: 5px;
    }
</style>
<?php
require_once('../../../php/config/dbcon_prod.php');
$cursor = oci_new_cursor($c);
$consulta = oci_parse($c, 'begin PQ_GENESIS_AUDITORIA_INTERNA.P_DESCARGA_PLAN_AUDITORIA_DETALLE(:v_codigo, :v_result); end;');
oci_bind_by_name($consulta, ':v_codigo', $codigo);
oci_bind_by_name($consulta, ':v_result', $cursor, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);
$datos = [];
oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
oci_free_statement($consulta);
oci_free_statement($cursor);
// echo json_encode($datos);
?>
<table style="width: 95vw; padding: 1rem;">
    <thead>
        <tr>
            <th class="border">
                <img src="https://192.168.52.5/genesis/assets/images/logo_new.png" style="height: 10vh; width: 10vw;">
            </th>
            <th class="border" colspan="26">PLAN ANUAL DE AUDITORIAS INTERNAS</th>
            <!-- <th class="border" colspan="5">Código: AI-FR-01</th> -->
        </tr>
        <!-- <tr>
            <th class="border" colspan="5">Versión: 02</th>
        </tr>
        <tr>
            <th class="border" colspan="5">Fecha: enero 2024</th>
        </tr> -->
        <tr>
            <th class="border" style="background-color: #1a2e63; color: white">OBJETIVO DEL PLAN</th>
            <th class="border" colspan="8" style="text-align: justify;"><?= $datos[0]['BPLV_OBJETIVO_PLAN']; ?></th>
            <th class="border" colspan="3" style="background-color: #1a2e63; color: white">CREACION</th>
            <th class="border p" colspan="2"><?= explode("/", $datos[0]['BPLF_FECHA_PLAN'])[0] ?></th>
            <th class="border p" colspan="2"><?= explode("/", $datos[0]['BPLF_FECHA_PLAN'])[1] ?></th>
            <th class="border p" colspan="2"><?= explode("/", $datos[0]['BPLF_FECHA_PLAN'])[2] ?></th>
            <th class="border" colspan="3" style="background-color: #1a2e63; color: white">APROBACION</th>
            <th class="border p" colspan="2"><?= $datos[0]['BPLF_FECHA_APROBACION_PLAN'] != null ? explode("/", $datos[0]['BPLF_FECHA_APROBACION_PLAN'])[0] : "" ?></th>
            <th class="border p" colspan="2"><?= $datos[0]['BPLF_FECHA_APROBACION_PLAN'] != null ? explode("/", $datos[0]['BPLF_FECHA_APROBACION_PLAN'])[1] : "" ?></th>
            <th class="border p" colspan="2"><?= $datos[0]['BPLF_FECHA_APROBACION_PLAN'] != null ? explode("/", $datos[0]['BPLF_FECHA_APROBACION_PLAN'])[2] : "" ?></th>
        </tr>
        <tr>
            <th class="border" colspan="10" style="background-color: #1a2e63; color: white;">ALCANCE</th>
            <th class="border" colspan="5" style="background-color: #1a2e63; color: white">RECURSOS</th>
            <th class="border" colspan="8" style="background-color: #1a2e63; color: white">METODOS</th>
            <th class="border" colspan="4" style="background-color: #1a2e63; color: white">VIGENCIA</th>
        </tr>
        <tr>
            <th class="border" colspan="10"><?= $datos[0]['BPLV_ALCANCE_PLAN'] ?></th>
            <th class="border" colspan="5"><?= $datos[0]['BPLV_RECURSOS_PLAN'] ?></th>
            <th class="border" colspan="8"><?= $datos[0]['BPLV_METODOS_PLAN'] ?></th>
            <th class="border" colspan="4"><?= $datos[0]['BPLV_VIGENCIA_PLAN'] ?></th>
        </tr>
        <tr>
            <th class="border" rowspan="2">TIPO DE AUDITORIA</th>
            <th class="border" rowspan="2">PROCESO AUDITAR</th>
            <th class="border" rowspan="2">OBJETIVO DE LA AUDITORIA</th>
            <th class="border" rowspan="2">DOCUMENTO DE LA AUDITORIA</th>
            <th class="border" rowspan="2">SOPORTE NORMATIVO</th>
            <th class="border" rowspan="2">DUENO DEL PROCESO AUDITADO</th>
            <th class="border" colspan="12">CALENDARIO / FRECUENCIA</th>
            <th class="border" rowspan="2" colspan="9">Observacion</th>
        </tr>
        <tr>
            <!-- <th class="border" colspan="5"></th> -->
            <th class="border">Ene</th>
            <th class="border">Feb</th>
            <th class="border">Mar</th>
            <th class="border">Abr</th>
            <th class="border">May</th>
            <th class="border">Jun</th>
            <th class="border">Jul</th>
            <th class="border">Ago</th>
            <th class="border">Sep</th>
            <th class="border">Oct</th>
            <th class="border">Nov</th>
            <th class="border">Dic</th>
        </tr>

        <?php


        foreach ($datos as $row) {
            echo "<tr>";
            echo "<td  class='border'>";
            echo $row['tipo_auditoria'];
            echo "</td>";
            echo "<td  class='border'>";
            echo $row['PROCESO_AUDITAR'];
            echo "</td>";
            echo "<td  class='border'>";
            echo $row['BPLV_OBJETIVO'];
            echo "</td>";
            echo "<td  class='border'>";
            echo $row['BPLV_DOCUMENTO_AUD'];
            echo "</td>";
            echo "<td  class='border'>";
            echo $row['BPLV_SOPORTE_NORMATIVO'];
            echo "</td>";
            echo "<td  class='border'>";
            echo $row['BPLV_RESPONSABLE_PROCESO'];
            echo "</td>";

            echo ($row["MES_1"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";

            echo ($row["MES_2"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_3"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_4"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_5"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_6"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_7"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_8"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_9"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_10"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_11"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo ($row["MES_12"] == "S") ? "<td class='color'>" : "<td class='border'>";
            echo "</td>";
            echo "<td colspan='9' class='border'>";
            echo $row["BPLV_OBSERVACION"];
            echo "</td>";
            echo "</tr>";
        }
        oci_close($c);

        ?>
    </thead>
</table>