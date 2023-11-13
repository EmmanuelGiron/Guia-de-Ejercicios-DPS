<?php
    //Archivos requeridos
    require_once('../inc/db_model.php');
    require_once('../inc/validations.php');

    //Parámetros de cabecera
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    //Declaración de variables
    $dbModel = new Model();
    $data = json_decode(file_get_contents("php://input"), true);
    $value = false;

    //Rescatar headers
    $headers = getallheaders();

    //Función para leer todos los ciclos
    function getAllCiclos() {
        global $dbModel;
        if (allowedMethod('GET')) {
            $query = "
                SELECT c.id, c.nombre
                FROM Ciclo AS c
                WHERE c.fechaFila <= NOW()";
            $value = $dbModel->getQuery($query);
            if (!empty($value)) {
                return json_encode($dbModel->getQuery($query));
            } else {
                return showErrors(204, 'NO CONTENT');
            }
        }
        return false;
    }

    //Función para leer todos las facultades
    function getAllSchools() {
        global $dbModel;
        if (allowedMethod('GET')) {
            $query = "
                SELECT f.id, f.nombre
                FROM Facultad AS f
                WHERE f.fechaFila <= NOW()";
            $value = $dbModel->getQuery($query);
            if (!empty($value)) {
                return json_encode($dbModel->getQuery($query));
            } else {
                return showErrors(204, 'NO CONTENT');
            }
        }
        return false;
    }

    //Función para leer todos los generos
    function getAllGenders() {
        global $dbModel;
        if (allowedMethod('GET')) {
            $query = "
                SELECT g.id, g.nombre
                FROM Genero AS g
                WHERE g.fechaFila <= NOW()";
            $value = $dbModel->getQuery($query);
            if (!empty($value)) {
                return json_encode($dbModel->getQuery($query));
            } else {
                return showErrors(204, 'NO CONTENT');
            }
        }
        return false;
    }

    //Función para leer todas las posiciones
    function getAllPositions() {
        global $dbModel;
        if (allowedMethod('GET')){
            $query = "
                SELECT p.id, p.nombre
                FROM Posicion AS p
                WHERE p.fechaFila <= NOW()";
            $value = $dbModel->getQuery($query);
            if (!empty($value)) {
                return json_encode($dbModel->getQuery($query));
            } else {
                return showErrors(204, 'NO CONTENT');
            }
        }
        return false;
    }

    //Función para rescatar id de catalogos
    function getId($table, $param) {
        global $dbModel;
        $query = "
            SELECT t.id
            FROM $table AS t
            WHERE t.fechaFila <= NOW() AND t.nombre = :nombre
            LIMIT 1";
        $params = array('nombre' => $param);
        return $dbModel->getQuery($query, $params)[0]['id'];
    }

    //Función para registrar equipo
    function insertTeam($data) {
        global $dbModel;
        $data = emptyStringToNull($data);
        $value = true;
        if (allowedMethod()) {
            $idFacultad = getId('Facultad', $data['facultad']);
            $idCiclo = getId('Ciclo', $data['ciclo']);
            $idGenero = getId('Genero', $data['genero']);
            $idEstado = getId('Estado', 'Registrado');
            unset($data['facultad'], $data['ciclo'], $data['genero']);
            if (intval($data['año']) < 2023) {
                $value = false;
            }
            if ($value) {
                $query[0] = "INSERT INTO Equipo (nombre, year, idCiclo, idFacultad, idGenero, idEstado)
                             VALUES (:nombre, :year, :idCiclo, :idFacultad, :idGenero, :idEstado)";
                $params[0] = array(
                    'nombre' => $data['nombre'], 
                    'year' => intval($data['año']),
                    'idCiclo' => $idCiclo,
                    'idFacultad' => $idFacultad,
                    'idGenero' => $idGenero,
                    'idCiclo' => $idCiclo,
                    'idEstado' => $idEstado
                );
                $dbModel->setTransactionQuery($query, $params);
                return showErrors(201, 'CREATED', 'Equipo ingresado exitosamente');
            }
            else {
                return showErrors(400, 'BAD REQUEST', 'No se puede seleccionar un año menor al actual');
            }
        }
        return false;
    }

    //Función para determinar si un equipo ya está inscrito
    function getState($idTeam) {
        global $dbModel;
        $query = "
            SELECT es.nombre
            FROM Equipo AS e
                 JOIN Estado AS es ON e.idEstado = es.id
            WHERE e.fechaFila <= NOW() AND e.id = :id";
        $params = array('id' => $idTeam);
        $nombre = $dbModel->getQuery($query, $params)[0]['nombre'];
        if (($nombre == 'Inscrito')) {
            return true;
        }
        return false;
    }

    //Función para editar equipo
    function updateTeam($data) {
        global $dbModel;
        $data = emptyStringToNull($data);
        if (allowedMethod()) {
            if (!getState($data['id'])) {
                $idFacultad = getId('Facultad', $data['facultad']);
                $idCiclo = getId('Ciclo', $data['ciclo']);
                $idGenero = getId('Genero', $data['genero']);
                $idEstado = getId('Estado', 'Registrado');
                unset($data['facultad'], $data['ciclo'], $data['genero']);
                $query[0] = "UPDATE Equipo
                             SET    nombre = :nombre,
                                    year = :year,
                                    idCiclo = :idCiclo,
                                    idFacultad = :idFacultad,
                                    idGenero = :idGenero,
                                    idEstado = :idEstado,
                             WHERE  id = :id";
                $params[0] = array(
                    'id' => $data['id'],
                    'nombre' => $data['nombre'], 
                    'year' => intval($data['año']),
                    'idCiclo' => $idCiclo,
                    'idFacultad' => $idFacultad,
                    'idGenero' => $idGenero,
                    'idCiclo' => $idCiclo,
                    'idEstado' => $idEstado
                );
                $dbModel->setTransactionQuery($query, $params);
                return showErrors(200, 'OK', 'Equipo editado exitosamente');
            } else {
                return showErrors(400, 'BAD REQUEST', 'El equipo no se puede editar ya que ya está inscrito');
            }
        }
        return false;
    }

    //Función para eliminar equipo
    function deleteTeam($data) {
        global $dbModel;
        $data = emptyStringToNull($data);
        if (allowedMethod()) {
            if (!getState($data['id'])) {
                $query[0] = "DELETE FROM Equipo
                             WHERE  id = :id";
                $params[0] = $data;
                return $dbModel->setTransactionQuery($query, $params);
            } else {
                return showErrors(400, 'BAD REQUEST', 'El equipo no se puede eliminar ya que ya está inscrito');
            }
        }
        return false;
    }

    //Función para leer equipos registrados
    function getAllTeamsRegistered() {
        global $dbModel;
        if (allowedMethod('GET')){
            $idEstado = getId('Estado', 'Registrado');
            $query = "
                SELECT e.id, e.nombre
                FROM Equipo AS e
                WHERE e.fechaFila <= NOW() AND e.idEstado = :idEstado";
            $params = array('idEstado' => $idEstado);
            $value = $dbModel->getQuery($query, $params);
            if (!empty($value)) {
                return json_encode($dbModel->getQuery($query));
            } else {
                return showErrors(204, 'NO CONTENT');
            }
        }
        return false;
    }

    //Función para insertar jugador
    function insertPlayer($data) {
        global $dbModel;
        $data = emptyStringToNull($data);
        $value = true;
        if (allowedMethod()) {
            $idEquipo = getId('Equipo', $data['equipo']);
            $idGenero = getId('Genero', $data['genero']);
            $idPosicion = getId('Posicion', $data['posicion']);
            unset($data['equipo'], $data['genero'], $data['posicion']);
            $query = "
                SELECT e.idGenero
                FROM Equipo AS e
                WHERE e.fechaFila <= NOW() AND e.id = :id";
            $params = array('id' => $idEquipo);
            $idGeneroEquipo = $dbModel->getQuery($query, $params)[0]['idGenero'];
            unset($query, $params);
            $actualDate = date_format(date_create(), 'Y-m-d');
            $data['fechaNacimiento'] = date_format(date_create($data['fechaNacimiento']), 'Y-m-d');
            $edad = $data['fechaNacimiento']->diff($actualDate)->y;
            $query = "
                SELECT e.numeroCamisa
                FROM Jugador AS e
                WHERE e.fechaFila <= NOW() AND e.idEquipo = :id";
            $params = array('id' => $idEquipo);
            if (getState($idEquipo)) {
                $value = false;
                $mensaje = "No se puede registrar al equipo seleccionado, ya que ya está inscrito";
            }
            if ($idGenero != $idGeneroEquipo) {
                $value = false;
                $mensaje = "Se debe registrar a un equipo con el mismo género";
            }
            if ($edad >= 18) {
                $value = false;
                $mensaje = "Debe ser mayor de 18 años";
            }
            if (!preg_match("/^[A-Za-z]{2}\d{6}$/", $data['carnet'])) {
                $value = false;
                $mensaje = "Debe ser mayor de 18 años";
            }
            if ($value) {
                $query[0] = "INSERT INTO `Jugador` (`carnet`, `nombres`, `apellidos`, `fechaNacimiento`, `numeroCamisa`, `idGenero`, `idPosicion`, `idEquipo`) 
                             VALUES (:carnet, :nombres, :apellidos, :fechaNacimiento, :numeroCamisa, :idGenero, :idPosicion, :idEquipo)";
                $params[0] = array(
                    'carnet' => $data['carnet'], 
                    'nombres' => $data['nombres'],
                    'apellidos' => $data['apellidos'],
                    'fechaNacimiento' => $data['fechaNacimiento'],
                    'numeroCamisa' => intval($data['numeroCamisa']),
                    'idGenero' => $idGenero,
                    'idPosicion' => $idPosicion,
                    'idEquipo' => $idEquipo
                );
                $dbModel->setTransactionQuery($query, $params);
                return showErrors(201, 'CREATED', 'Equipo ingresado exitosamente');
            }
        }
        if (!$value) {
            return showErrors(400, 'BAD REQUEST', $mensaje); 
        }
        return false;
    }

    //Función para eliminar jugador
    function deletePlayer() {
        
    }

    //Función para editar jugador
    function updatePlayer() {

    }

    //Función para leer los equipos y jugadores inscritos
    function getAllInscribed(){

    }

    //Función para leer los jugadores
    function getAllPlayers(){
        
    }
    
    //Función para inscribir equipo
    function inscribeTeam($data) {
        global $dbModel;
        $data = emptyStringToNull($data);
        $value = true;
        if (allowedMethod()) {
            if (!getState($data['id'])) {
                $query = "
                    SELECT COUNT(*) AS jugadores
                    FROM Jugador AS j
                    WHERE j.fechaFila <= NOW() AND j.idEquipo = :id";
                $params = $data;
                $cantJugadores = $dbModel->getQuery($query, $params)[0]['jugadores'];
                unset($query, $params);
                if (empty($cantJugadores) || ($cantJugadores == 0)) {
                    $value = false;
                    $mensaje = "No hay ningún jugador registrado al equipo";
                }
                else if ($cantJugadores < 5) {
                    $value = false;
                    $mensaje = "Debe registrar por lo menos 5 jugadores en el equipo";
                }
                else if ($cantJugadores > 10) {
                    $value = false;
                    $mensaje = "No puede registrar más de 10 jugadores en el equipo";
                }
                if ($value) {
                    $idEstado = getId('Estado', 'Inscrito');
                    $query[0] = "UPDATE Equipo
                                 SET    idEstado = :idEstado,
                                 WHERE  id = :id";
                    $params[0] = array(
                        'id' => $data['id'],
                        'idEstado' => $idEstado
                    );
                    $dbModel->setTransactionQuery($query, $params);
                    return showErrors(200, 'OK', 'Equipo inscrito exitosamente'); 
                }
            } else {
                $value = false;
                $mensaje = "El equipo ya está inscrito";
            }
        }
        if (!$value) {
            return showErrors(400, 'BAD REQUEST', $mensaje);
        }
        return false;
    }

    //Ejecución de la API
    if (isset($headers['Accion'])) {
    //Filtro por header Accion
        switch ($headers['Accion']) {
            case 'LeerCiclos':
                $value = (empty(getAllCiclos())) ? false : getAllCiclos();
                break;
            case 'LeerGeneros':
                $value = (empty(getAllGenders())) ? false : getAllGenders();
                break;
            case 'LeerPosiciones':
                $value = (empty(getAllPositions())) ? false : getAllPositions();
                break;
            case 'LeerFacultades':
                $value = (empty(getAllSchools())) ? false : getAllSchools();
                break;
            case 'RegistrarEquipo':
                $value = (empty(insertTeam($data))) ? false : insertTeam($data);
                break;
            case 'InscribirEquipo':
                $value = (empty(inscribeTeam($data))) ? false : inscribeTeam($data);
                break;
            case 'RegistrarJugador':
                $value = (empty(insertPlayer($data))) ? false : insertPlayer($data);
                break;
            case 'EditarJugador':
                $value = (empty(getAllCiclos())) ? false : getAllCiclos();
                break;
            case 'EditarEquipo':
                $value = (empty(updateTeam($data))) ? false : updateTeam($data);
                break;
            case 'EliminarEquipo':
                $value = (empty(deleteTeam($data))) ? false : deleteTeam($data);
                break;
            case 'EliminarJugador':
                $value = (empty(getAllCiclos())) ? false : getAllCiclos();
                break;
            case 'LeerJugadores':
                $value = (empty(getAllCiclos())) ? false : getAllCiclos();
                break;
            case 'LeerEquipos':
                $value = (empty(getAllTeamsRegistered())) ? false : getAllTeamsRegistered();
                break;
            case 'LeerInscritos':
                $value = (empty(getAllCiclos())) ? false : getAllCiclos();
                break;
            default:
                $value = false;
                break;
        }
    }

    //Ejecución de la API
    if ($value == false) {
        echo showErrors(400, 'BAD REQUEST', 'Fallo al ejecutar la API');
    }

?>