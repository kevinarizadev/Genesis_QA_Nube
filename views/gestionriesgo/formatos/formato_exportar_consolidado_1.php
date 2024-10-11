<?php
require_once('../../../php/config/dbcon_prod.php');
// header('Content-type: application/vnd.ms-excel;');
// header("Content-Disposition: attachment; filename=Reporte Avanzado de Grupos Priorizados " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
$F_de_Exportacion = $_GET['F_de_Exportacion'];
?>
<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>VAR1</th>
        <th>VAR2</th>
        <th>VAR3</th>
        <th>VAR4</th>
        <th>VAR5</th>
        <th>VAR6</th>
        <th>VAR7</th>
        <th>VAR8</th>
        <th>VAR9</th>
        <th>VAR10</th>
        <th>VAR11</th>
        <th>VAR12</th>
        <th>VAR13</th>
        <th>VAR14</th>
        <th>VAR15</th>
        <th>VAR16</th>
        <th>VAR17</th>
        <th>VAR18</th>
        <th>VAR19</th>
        <th>VAR19_1</th>
        <th>VAR20</th>
        <th>VAR21</th>
        <th>VAR21_1</th>
        <th>VAR22</th>
        <th>VAR23</th>
        <th>VAR24</th>
        <th>VAR25</th>
        <th>VAR26</th>
        <th>VAR27</th>
        <th>VAR27_1</th>
        <th>VAR28</th>
        <th>VAR28_1</th>
        <th>VAR29</th>
        <th>VAR29_1</th>
        <th>VAR30</th>
        <th>VAR30_1</th>
        <th>VAR31</th>
        <th>VAR31_1</th>
        <th>VAR32</th>
        <th>VAR32_1</th>
        <th>VAR33</th>
        <th>VAR33_1</th>
        <th>VAR34</th>
        <th>VAR34_1</th>
        <th>VAR35</th>
        <th>VAR36</th>
        <th>VAR37</th>
        <th>VAR38</th>
        <th>VAR39</th>
        <th>VAR40</th>
        <th>VAR41</th>
        <th>VAR42</th>
        <th>VAR43</th>
        <th>VAR44</th>
        <th>VAR45</th>
        <th>VAR46</th>
        <th>VAR47</th>
        <th>VAR48</th>
        <th>VAR49</th>
        <th>VAR50</th>
        <th>VAR51</th>
        <th>VAR52</th>
        <th>VAR53</th>
        <th>VAR54</th>
        <th>VAR55</th>
        <th>VAR56</th>
        <th>VAR57</th>
        <th>VAR58</th>
        <th>VAR59</th>
        <th>VAR60</th>
        <th>VAR61</th>
        <th>VAR62</th>
        <th>VAR62_1</th>
        <th>VAR62_2</th>
        <th>VAR62_3</th>
        <th>VAR62_4</th>
        <th>VAR62_5</th>
        <th>VAR62_6</th>
        <th>VAR62_7</th>
        <th>VAR62_8</th>
        <th>VAR62_9</th>
        <th>VAR62_10</th>
        <th>VAR62_11</th>
        <th>VAR63</th>
        <th>VAR63_1</th>
        <th>VAR64</th>
        <th>VAR65</th>
        <th>VAR66</th>
        <th>VAR67</th>
        <th>VAR68</th>
        <th>VAR69</th>
        <th>VAR69_1</th>
        <th>VAR69_2</th>
        <th>VAR69_3</th>
        <th>VAR69_4</th>
        <th>VAR69_5</th>
        <th>VAR69_6</th>
        <th>VAR69_7</th>
        <th>VAR70</th>
        <th>VAR70_1</th>
        <th>VAR70_2</th>
        <th>VAR70_3</th>
        <th>VAR70_4</th>
        <th>VAR70_5</th>
        <th>VAR70_6</th>
        <th>VAR70_7</th>
        <th>VAR70_8</th>
        <th>VAR70_9</th>
        <th>VAR71</th>
        <th>VAR72</th>
        <th>VAR73</th>
        <th>VAR74</th>
        <th>VAR75</th>
        <th>VAR76</th>
        <th>VAR77</th>
        <th>VAR78</th>
        <th>VAR79</th>
        <th>VAR80</th>
        <th>VAR80_1</th>
        <th>VAR81</th>
        <th>VAR82</th>
        <th>REPS</th>
        <th>ULTIMO_CARGUE</th>
    </tr>
    <?php
    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'begin oasis.pq_genesis_gestion_riesgo_erc.p_descargar_soporte_cac(:v_pfecha_corte,:v_pdata);end;');
    oci_bind_by_name($consulta, ':v_pfecha_corte', $F_de_Exportacion);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_pdata", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);
    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['EGRC_VAR1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR2'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR3'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR4'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR5'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR6'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR7'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR8'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR9'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR10'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR11'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR12'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR13'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR14'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR15'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR16'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR17'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR18'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR19'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR19_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR20'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR21'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR21_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR22'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR23'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR24'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR25'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR26'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR27'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR27_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR28'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR28_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR29'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR29_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR30'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR30_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR31'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR31_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR32'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR32_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR33'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR33_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR34'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR34_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR35'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR36'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR37'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR38'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR39'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR40'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR41'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR42'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR43'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR44'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR45'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR46'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR47'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR48'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR49'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR50'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR51'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR52'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR53'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR54'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR55'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR56'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR57'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR58'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR59'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR60'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR61'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_2'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_3'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_4'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_5'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_6'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_7'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_8'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_9'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_10'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR62_11'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR63'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR63_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR64'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR65'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR66'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR67'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR68'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR69'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_2'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_3'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_4'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_5'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_6'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR69_7'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_2'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_3'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_4'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_5'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR70_6'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR70_7'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR70_8'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR70_9'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR71'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR72'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR73'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR74'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR75'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR76'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR77'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRC_VAR78'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR79'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR80'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR80_1'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRN_VAR81'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_VAR82'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_REPS'];
        echo "</td>";
        echo "<td>";
        echo $row['EGRF_ULTIMO_CARGUE'];
        echo "</td>";
        echo "</tr>";
    }
    oci_close($c);
    ?>
</table>