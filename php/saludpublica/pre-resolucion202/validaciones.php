<?php

function validaciones($ruta, $fileName)
{
    // echo $ruta.' '.$fileName;
    $errors = array();
    $error_temp = array();
    $file = fopen($ruta, 'r');
    $filas = file($ruta);
    $numFila = 0;

    foreach ($filas as $fila => $fila_v) {
        $columnas = explode("|", $fila_v);
        if (count($columnas) < 119) {
            $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => 0, 'mensaje' => 'Tiene menos de 119 columnas'];
        }
        if (count($columnas) > 119) {
            $error_temp[] = (object) ['fila' => ($fila + 1), 'columna' => 0, 'mensaje' => 'Tiene más de 119 columnas'];
        }
    }
    if (count($error_temp) > 0) {
        $errors[] = (object) [
            'nombre' => $fileName,
            'tipo_error' => (object) ['CODIGO' => 0, 'MENSAJE' => 'NO TIENE 119 COLUMNAS'],
            'errores' => $error_temp
        ];
    }

    if (count($errors) > 0) return json_encode($errors);

    while ($row = fgetcsv($file, 0, "|")) {
        foreach ($row as $i => $value) {
            // if (count($error_temp) > 100) {
            //     $errors[] = (object) [
            //         'nombre' => $fileName,
            //         'tipo_error' => (object) ['CODIGO' => 1, 'MENSAJE' => 'ERRORES DE ESTRUCTURA'],
            //         'errores' => $error_temp
            //     ];
            //     return json_encode($errors);
            // }
            switch ($i) {
                case 0: // Validar Tipo de registro
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    if ($value != 2) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor valido es 2"];
                    break;
                case 1: // Validar Consecutivo de registro
                    break;
                case 2: // Validar Código de habilitación IPS primaria
                    if (esNumerico($value)) {
                        if (longitud(12, 0, 999, $value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value no cumple la longitud permitidos"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 3: // Validar Tipo de identificación del usuario
                    if (!longitud(2, 0, 0, $value)) {
                        if (!tipoDocumento($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value no es un tipo de documento valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value no cumple la longitud permitidos"];
                    }
                    break;
                case 4: // Validar Número de identificación del usuario
                    if (!longitud(16, 4, 0, $value)) {
                        if (!validaNumeroDocumento($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un numero de documento valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "La longitud del número de identificación no corresponde con el tipo de identificación"];
                    }
                    break;
                case 5: // Validar Primer apellido del usuario
                    if (strtoupper($value) != 'NONE') {
                        if (!soloStringMayuscula($value))  $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    }
                    break;
                case 6: // Validar Segundo apellido del usuario 
                    if (!soloStringMayuscula($value))  $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    break;
                case 7: // Validar Primer nombre del usuario 
                    if (strtoupper($value) != 'NONE') {
                        if (!soloStringMayuscula($value))  $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    }
                    break;
                case 8: // Validar Segundo nombre del usuario 
                    if (!soloStringMayuscula($value))  $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no cumple con la estructura valida"];
                    break;
                case 9: // Validar Fecha de Nacimiento
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 10: // Validar Sexo
                    if (soloStringMayuscula($value)) {
                        if ($value != 'F' && $value != 'M') $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value es un valor invalido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value es un valor invalido"];
                    }
                    break;
                case 11: // Validar Código pertenencia étnica 
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        if ($value < 1 || $value > 7) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un Código pertenencia étnica valido"];
                    }
                    break;
                case 12: // Validar Código de ocupación (toda la población)
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    if (!SGDCIUO($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un Código de ocupación"];
                    break;
                case 13: // Validar Código de nivel educativo (toda la población)
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    if (!SGDNivEducativo($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 14: // Validar Gestante
                    $po = array_search($value, [0, 1, 2, 21]);
                    if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 15: // Validar Sífilis Gestacional o congénita
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 16: // Validar Resultado de prueba mini-mental state
                    $po = array_search($value, [0, 4, 5, 21]);
                    if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 17: // Validar Hipotiroidismo Congénito
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 18: // Validar Sintomático respiratorio (toda la población)
                    $po = array_search($value, [1, 2, 21]);
                    if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 19: // Validar Consumo de tabaco
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    if (!($value >= 0 && $value <= 99))  $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 20: // Validar Lepra
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    if ($value != 21) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 21: // Validar Obesidad o Desnutrición Proteico Calórica
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        if ($value != 21) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 22: // Validar Resultado del tacto rectal
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 23: // Validar Acido fólico preconcepcional
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        $po = array_search($value, [0, 1, 2, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 24: // Validar Resultado de la prueba de sangre oculta en materia fecal (tamizaje Ca de colon)
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        $po = array_search($value, [0, 4, 5, 6, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 25: // Validar Enfermedad Mental
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        if ($value != 21) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 26: // Validar Cáncer de Cérvix
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 27: // Validar Agudeza visual lejana ojo izquierdo 
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        $po = array_search($value, [0, 3, 4, 5, 6, 7, 8, 9, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 28: // Validar Agudeza visual lejana ojo derecho 
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        $po = array_search($value, [0, 3, 4, 5, 6, 7, 8, 9, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 29: // Validar Fecha del peso  (Toda la población)
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01')
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 30: // Validar Peso en Kilogramos  (Toda la población)
                    if (!esNumerico($value)) {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    } else {
                        if (!validaNumeroDecimal($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    }
                    break;
                case 31: // Validar Fecha de la talla  (Toda la población)
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01')
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 32: // Validar Talla en centímetros  (Toda la población)
                    if (esNumerico($value)) {
                        if (longitud(3, 1, 0, $value)) {
                            $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor numerico"];
                    }

                    // longitud($value)
                    break;
                case 33: // Validar Fecha probable de parto
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 34: // Validar Código país
                    if (esNumerico($value)) {
                        if (!ValidaCodigoPais($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 35: // Validar Clasificación del riesgo gestacional
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 36: // Validar Resultado de colonoscopia tamizaje
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 2, 3, 4, 5, 6, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 37: // Validar Resultado de tamizaje auditivo neonatal
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 38: // Validar Resultado de tamizaje visual neonatal
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 39: // Validar DPT menores de 5 años
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 40: // Validar Resultado de tamizaje VALE
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 41: // Validar Neumococo
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    break;
                case 42: // Validar Resultado de tamizaje para hepatitis C
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 43: // Validar Resultado de escala abreviada de desarrollo área de motricidad gruesa
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 3, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 44: // Validar Resultado de escala abreviada de desarrollo área de motricidad finoadaptativa
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 3, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 45: // Validar Resultado de escala abreviada de desarrollo área personal social
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 3, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 46: // Validar Resultado de escala abreviada de desarrollo área de motricidad audición lenguaje
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 3, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 47: // Validar Tratamiento ablativo o de escisión posterior a la realización de la técnica de inspección visual (Crioterapia o LETZ)
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 6, 7, 8, 9, 10, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 48: // Validar Resultado de tamización con oximetría pre y post ductal
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 49: // Validar Fecha de atención parto o cesárea
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 50: // Validar Fecha de salida de atención parto o cesárea
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 51: // Validar Fecha de atención en salud para la promoción y apoyo de la lactancia materna
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 52: // Validar Fecha de consulta de valoración integral
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 53: // Validar Fecha de atención en salud para la asesoría en anticoncepción 
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 54: // Validar Suministro de método anticonceptivo
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 55: // Validar Fecha de suministro de método anticonceptivo
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 56: // Validar Fecha de primera consulta prenatal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 57: // Validar Resultado de glicemia basal
                    if (esNumerico($value)) {
                        if ($value != 998) {
                            if ($value < 0 && $value > 997) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 58: // Validar Fecha de último control prenatal de seguimiento
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 59: // Validar Suministro de ácido fólico en el control prenatal durante el periodo reportado
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 60: // Validar Suministro de sulfato ferroso en el control prenatal durante el periodo reportado
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 61: // Validar Suministro de carbonato de calcio en el control prenatal durante el periodo reportado
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 62: // Validar Fecha de valoración agudeza visual
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 63: // Validar Fecha de tamizaje VALE
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 64: // Validar Fecha del tacto rectal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 65: // Validar Fecha de tamización con oximetría pre y post ductal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 66: // Validar Fecha de realización colonoscopia tamizaje
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 67: // Validar Fecha de la prueba sangre oculta en materia fecal (tamizaje Ca de colon)
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 68: // Validar Consulta de Psicología 
                    if (!fechaValida($value)) {
                        if ($value != '1845-01-01') $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 69: // Validar Fecha de tamizaje auditivo neonatal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 70: // Validar Suministro de  fortificación casera en la primera infancia (6 a 23 meses)
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 71: // Validar Suministro de vitamina A en la primera infancia (24 a 60 meses)
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 72: // Validar Fecha de toma LDL
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 73: // Validar Fecha de toma PSA
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 74: // Validar Preservativos entregados a pacientes con ITS
                    if (esNumerico($value)) {
                        if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 75: // Validar Fecha de tamizaje visual neonatal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 76: // Validar Fecha de atención en salud bucal por profesional en odontología
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 77: // Validar Suministro de hierro en la primera Infancia (24 a 59 meses)
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 16, 17, 18, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 78: // Validar Fecha de antígeno de superficie hepatitis B (Toda la población)
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 79: // Validar Resultado de antígeno de superficie hepatitis B (Toda la población)
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 80: // Validar Fecha de toma de prueba tamizaje para sífilis
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 81: // Validar Resultado de prueba tamizaje para sífilis
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 82: // Validar Fecha de toma de prueba para VIH
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 83: // Validar Resultado de prueba para VIH
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 84: // Validar Fecha de TSH neonatal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 85: // Validar Resultado de TSH neonatal
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 86: // Validar Tamizaje del cáncer de cuello uterino 
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 2, 3, 4, 16, 17, 18, 19, 20, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 87: // Validar Fecha de tamizaje cáncer de cuello uterino
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 88: // Validar Resultado tamizaje cáncer de cuello uterino
                    if (esNumerico($value)) {
                        $po = array_search($value, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 0]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 89: // Validar Calidad en la muestra de citología cervicouterina
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 2, 3, 4]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 90: // Validar Código de habilitación IPS donde se realiza  tamizaje cáncer de cuello uterino
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 91: // Validar Fecha de colposcopia
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 92: // Validar Resultado de LDL
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 93: // Validar Fecha de biopsia cervicouterina
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 94: // Validar Resultado de biopsia cervicouterina
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 3, 4, 5, 6, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 95: // Validar Resultado de HDL
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 96: // Validar Fecha de toma de mamografía
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 97: // Validar Resultado de mamografía
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 3, 4, 5, 6, 7, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 98: // Validar Resultado de triglicéridos
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 99: // Validar Fecha de toma biopsia de mama
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 100: // Validar Fecha de resultado biopsia de mama
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 101: // Validar Resultado de biopsia de mama
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 1, 2, 3, 4, 5, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 102: // Validar COP por persona
                    if (esNumerico($value)) {
                        if ($value != 21 && $value != 0)
                            if (strlen($value) != 12) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 103: // Validar Fecha de toma hemoglobina
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 104: // Validar Resultado de hemoglobina
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 105: // Validar Fecha de toma glicemia basal
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 106: // Validar Fecha de toma creatinina
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 107: // Validar Resultado de creatinina
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 108: // Validar Fecha Hemoglobina Glicosilada
                    if (!fechaValida($value)) {
                        if ($value != '1845-01-01') $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 109: // Validar Resultado de PSA
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 110: // Validar Fecha de toma  de tamizaje hepatitis C
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 111: // Validar Fecha de toma HDL
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 112: // Validar Fecha de toma de baciloscopia diagnóstico
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;
                case 113: // Validar Resultado de baciloscopia diagnóstico
                    if (esNumerico($value)) {
                        $po = array_search($value, [1, 2, 3, 4, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 114: // Validar Clasificación del riesgo cardiovascular
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 6, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 115: // Validar Tratamiento para Sífilis gestacional
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 116: // Validar Tratamiento para Sífilis Congénita
                    if (!esNumerico($value)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    if ($value != 0) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    break;
                case 117: // Validar Clasificación del riesgo metabólico
                    if (esNumerico($value)) {
                        $po = array_search($value, [0, 4, 5, 6, 21]);
                        if (!($po !== false)) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es un valor valido"];
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "El valor $value debe ser numérico"];
                    }
                    break;
                case 118: // Validar Fecha de toma triglicéridos
                    if (!fechaValida($value)) {
                        $fecha = DateTime::createFromFormat('Y-m-d', $value);
                        $limite_inferior = new DateTime('1900-01-01');
                        if ($value != '1800-01-01' && $value != '1805-01-01' && $value != '1810-01-01' && $value != '1825-01-01' && $value != '1830-01-01' && $value != '1835-01-01' && $value != '1845-01-01') {
                            if ($fecha < $limite_inferior) $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value debe ser mayor a 1900-01-01"];
                        }
                    } else {
                        $error_temp[] = (object) ['fila' => ($numFila + 1), 'columna' => ($i + 1), 'mensaje' => "$value no es una fecha valida"];
                    }
                    break;

                default:
                    // Ignorar valores adicionales que puedan existir
                    break;
            }
        }
        $numFila++;
    }

    // Cerrar el archivo
    fclose($file);
    if (count($error_temp) > 0) {
        $errors[] = (object) [
            'nombre' => $fileName,
            'tipo_error' => (object) ['CODIGO' => 1, 'MENSAJE' => 'ERRORES DE ESTRUCTURA'],
            'errores' => $error_temp
        ];
    }

    if (count($errors) > 0) {
        return ($errors);
    }
    //  return json_encode($errors);

    // return json_encode($errors);
}

function esNumerico($value)
{
    // if (ctype_digit(trim($value))) return true;
    if (preg_match('/^-?\d+$/', $value)) {
        return true;
    } elseif (preg_match('/^-?\d+\.\d+$/', $value)) {
        return true;
    } else {
        return false;
    }
}

function longitud($max, $min, $default, $value)
{
    if ($default != 0) {
        if ($value == $default) return true;
    }
    if (strlen($value) <= $min || strlen($value) > $max) return true;
}

function tipoDocumento($value)
{
    $po = array_search($value, ["AS", "CC", "CD", "CE", "CN", "DE", "MS", "PA", "PE", "PT", "RC", "SC", "TI"]);
    if ($po !== false) {
        return true;
    }
}

function validaNumeroDocumento($value)
{
    if (preg_match("/^[A-Z0-9]*$/i", $value)) return true;
}

function soloStringMayuscula($value)
{
    $mayusculas = strtoupper($value);
    if ($mayusculas === $value) {
        if (preg_match("/^[A-Za-z\s]+$/", $value)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function fechaValida($value)
{
    $fecha = DateTime::createFromFormat('Y-m-d', $value);
    if (!$fecha || $fecha->format('Y-m-d') !== $value) return false;
}

function SGDCIUO($value)
{
    $po = array_search($value, [0110, 0210, 0310, 1111, 1112, 1113, 1114, 1120, 1211, 1212, 9999, 9998]);
    if ($po !== false) {
        return true;
    }
}

function SGDNivEducativo($value)
{
    $po = array_search($value, [1, 10, 11, 12, 13, 2, 3, 4, 5, 6]);
    if ($po !== false) {
        return true;
    }
}

function validaNumeroDecimal($value)
{
    if (preg_match('/^\d{1,5}(\.\d{1,2})?$/', $value)) return true;
}

function ValidaCodigoPais($value)
{
    $arr = ['004', '008', '010', '012', '016', '020', '024', '028', '031', '032', '036', '040', '044', '048', '050', '051', '052', '056', '060', '064', '068', '070', '072', '074', '076', '084', '086', '090', '092', '096', '100', '104', '108', '112', '116', '120', '124', '132', '136', '140', '144', '148', '152', '156', '158', '162', '166', '170', '174', '175', '178', '180', '184', '188', '191', '192', '196', '203', '204', '208', '212', '214', '218', '222', '226', '231', '232', '233', '234', '238', '239', '242', '246', '248', '250', '254', '258', '260', '262', '266', '268', '270', '275', '276', '288', '292', '296', '300', '304', '308', '312', '316', '320', '324', '328', '332', '334', '336', '340', '344', '348', '352', '356', '360', '364', '368', '372', '376', '380', '384', '388', '392', '398', '400', '404', '408', '410', '414', '417', '418', '422', '426', '428', '430', '434', '438', '440', '442', '446', '450', '454', '458', '462', '466', '470', '474', '478', '480', '484', '492', '496', '498', '499', '500', '504', '508', '512', '516', '520', '524', '528', '531', '533', '534', '535', '540', '548', '554', '558', '562', '566', '570', '574', '578', '580', '581', '583', '584', '585', '586', '591', '598', '600', '604', '608', '612', '616', '620', '624', '626', '630', '634', '638', '642', '643', '646', '652', '654', '659', '660', '662', '663', '666', '670', '674', '678', '682', '686', '688', '690', '694', '702', '703', '704', '705', '706', '710', '716', '724', '728', '729', '732', '740', '744', '748', '752', '756', '760', '762', '764', '768', '772', '776', '780', '784', '788', '792', '795', '796', '798', '800', '804', '807', '818', '826', '831', '832', '833', '834', '840', '850', '854', '858', '860', '862', '876', '882', '887', '894', '999'];
    $po = array_search($value, $arr);
    if ($po !== false) {
        return true;
    }
}
