<?php

require_once __DIR__ . '/entities/Travel.php';
require_once __DIR__ . '/database/queries.php';

function getDb(): PDO {
    // Asumiendo que tienes una función de conexión definida en otro lugar
    // Retorna tu conexión PDO aquí
    return $GLOBALS['conn'] ?? null;
}

function getContinents($conn) {
    $db = new DatabaseQueries($conn);
    return $db->getContinents();
}

function getCountries($conn, $continentId) {
    $db = new DatabaseQueries($conn);
    return $db->getCountries($continentId);
}

function getCountryPrice($conn, $countryId) {
    $db = new DatabaseQueries($conn);
    return $db->getCountryPrice($countryId);
}

function getAllTravels($conn, $orderBy = 'data') {
    $db = new DatabaseQueries($conn);
    return $db->getAllTravels($orderBy);
}

function insertTravel($conn, $travelData) {
    $travel = new Travel($travelData);
    $db = new DatabaseQueries($conn);
    return $db->insertTravel($travel);
}

function deleteTravel($conn, $travelId) {
    $db = new DatabaseQueries($conn);
    return $db->deleteTravel($travelId);
}

?>
