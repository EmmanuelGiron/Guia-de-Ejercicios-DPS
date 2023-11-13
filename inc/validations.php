<?php
    
    //Función para manejo de errores en API
    function showErrors($status, $errorMessage, $realErrorMessage = null){
        $data = array(
            "estado" => $status,
            "mensaje" => $errorMessage
        );
        if (!empty($realErrorMessage)) {
            $data["mensajeReal"] = $realErrorMessage;
        }
        header('HTTP/1.0 '.$status.' '.$errorMessage);
        return json_encode($data);
    }

    //Función para validar el método HTTP en API
    function allowedMethod($method = null){
        $method = (empty($method)) ? "POST" : $method ; //Método POST por defecto
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            echo showErrors(405, 'METHOD NOT ALLOWED');
            return false;
        }
        return true;
    }

    //Función para convertir espacios o cadenas vacíos en tipo de datos NULL
    function emptyStringToNull($data){
        foreach ($data as $key => $datum) {
            if (trim($datum) == '') {
                $data[$key] = null;
            }
        }
        return $data;
    }
    
?>