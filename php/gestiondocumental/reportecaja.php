<?php

require_once('../config/dbcon_prod.php');

header("Content-Type: text/plain");
header('Content-Disposition: attachment; filename="REPORTE_CAJA.xls"');
$consulta = oci_parse($c,"SELECT * from oasis.vw_sgdo_reporte_caja");
oci_execute($consulta);	

// $row = array();
// echo 
// // 'UBICACIONCAJA'.'|'.
// 'NOMBRECAJA'.'|'.
// 'DESCRIPCIONCAJA'.'|'.
// 'AREA'.'|'.
// 'CODIGOCAJA'.'|'.
// 'FECHACREACION';
// echo "\n";
// while($rows = oci_fetch_assoc($consulta)) 
// {
// echo
// //  $rows['UBICACIONCAJA']. '|' .
// $rows['NOMBRECAJA']. '|' .
// $rows['DESCRIPCIONCAJA']. '|' .
// $rows['AREA']. '|' .
// $rows['CODIGOCAJA']. '|' .
// $rows['FECHACREACION']. "\n";
//  }
// oci_close($c);
?>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
            <tr>
                <th>SGDC_CODIGO_BODEGA</th>
                <th>SGDC_NOMBRE_BODEGA</th>
                <th>SGDC_CODIGO_PASILLO</th>
                <th>SGDC_NOMBRE_PASILLO</th>
                <th>SGDC_CODIGO_PISO</th>
                <th>SGDC_NOMBRE_PISO</th>
                <th>SGDC_CODIGO_NIVEL</th>
                <th>SGDC_NOMBRE_NIVEL</th>
                <th>SGDC_CODIGO_SECUENCIA</th>
                <th>SGDC_NOMBRE_SECUENCIA</th>
                <th>NOMBRECAJA</th>
                <th>DESCRIPCIONCAJA</th>
                <th>AREA</th>
                <th>CODIGOCAJA</th>
                <th>FECHACREACION</th>

            </tr>
    <?php
        oci_execute($consulta);
        // Se recorre el array con los resultados obtenidos de la base de datos
        while( $rows = oci_fetch_assoc($consulta))
        {
            echo "<tr>";
            echo "<td>"; echo$rows['SGDC_CODIGO_BODEGA']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_NOMBRE_BODEGA']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_CODIGO_PASILLO']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_NOMBRE_PASILLO']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_CODIGO_PISO']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_NOMBRE_PISO']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_CODIGO_NIVEL']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_NOMBRE_NIVEL']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_CODIGO_SECUENCIA']; echo "</td>";
            echo "<td>"; echo$rows['SGDC_NOMBRE_SECUENCIA']; echo "</td>";
            echo "<td>"; echo$rows['NOMBRECAJA']; echo "</td>";
            echo "<td>"; echo$rows['DESCRIPCIONCAJA']; echo "</td>";
            echo "<td>"; echo$rows['AREA']; echo "</td>";
            echo "<td>"; echo$rows['CODIGOCAJA']; echo "</td>";
            echo "<td>"; echo$rows['FECHACREACION']; echo "</td>";
            echo "</tr>";
        }
        // Se cierra la conexion a la base de datos para evitar bloqueos
        oci_close($c);
 
    ?>