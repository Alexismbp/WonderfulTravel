<?php

require_once __DIR__ . '/../validation/TravelValidator.php';

function handleInsertTravel($conn) {
    try {
        $travel = prepareTravelData($conn);
        
        // Validar datos antes de insertar
        $errors = TravelValidator::validate($travel);
        if (!empty($errors)) {
            return ['error' => implode(", ", $errors)];
        }
        
        if (insertTravel($conn, $travel)) {
            return ['success' => 'El viaje se ha insertado correctamente.'];
        }
        return ['error' => 'No se ha podido insertar el viaje.'];
    } catch (PDOException $e) {
        return ['error' => 'Error al insertar el viaje: ' . $e->getMessage()];
    }
}

function handleGetAllTravels($conn, $orderBy) {
    try {
        return getAllTravels($conn, $orderBy);
    } catch (PDOException $e) {
        return ['error' => 'Error al obtener viajes: ' . $e->getMessage()];
    }
}

function handleDeleteTravel($conn) {
    try {
        if (deleteTravel($conn, $_POST['travelId'])) {
            return ['success' => 'Viaje eliminado correctamente'];
        }
        return ['error' => 'No se ha podido eliminar el viaje'];
    } catch (PDOException $e) {
        return ['error' => 'Error al eliminar el viaje: ' . $e->getMessage()];
    }
}

function prepareTravelData($conn) {
    $travel = [
        'nom' => $_POST['nom'],
        'telefon' => $_POST['telefon'],
        'num_persones' => $_POST['num-persones'],
        'data' => $_POST['data-viatge'],
        'preu' => $_POST['preu'],
        'pais_id' => $_POST['pais'],
        'descompte' => isset($_POST['descompte']) ? $_POST['descompte'] : null
    ];

    $travel['preu'] = getCountryPrice($conn, $travel['pais_id']) * $travel['num_persones'];
    
    if (isset($travel['descompte']) && $travel['descompte'] === 'on') {
        $travel['preu'] *= 0.80;
    }

    return $travel;
}

?>