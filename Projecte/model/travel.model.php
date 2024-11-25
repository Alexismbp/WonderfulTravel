<?php

// Funció per obtenir els continents de la base de dades
function getContinents($conn) {
    try {
        $sql = "SELECT id, nom_continent FROM continents"; // Consulta SQL per obtenir els continents
        $stmt = $conn->prepare($sql); // Preparar la consulta
        $stmt->execute(); // Executar la consulta
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retornar els resultats com a array associatiu
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()]; // Retornar un missatge d'error en cas d'excepció
    }
}

// Funció per obtenir el preu base del país seleccionat
function getCountryPrice($conn, $pais_id) {
    $sql = "SELECT preu FROM paisos WHERE id = :pais_id"; // Consulta SQL per obtenir el preu del país
    $stmt = $conn->prepare($sql); // Preparar la consulta
    $stmt->bindParam(':pais_id', $pais_id); // Vincular el paràmetre del país
    $stmt->execute(); // Executar la consulta
    $result = $stmt->fetch(PDO::FETCH_ASSOC); // Obtenir el resultat
    return $result['preu'] ?? 0; // Retornar el preu o 0 si no es troba
}

// Funció per obtenir el preu d'un país
function getPrice($conn, $paisId) {
    $sql = "SELECT preu FROM paisos WHERE id = :pais_id"; // Consulta SQL per obtenir el preu del país
    $stmt = $conn->prepare($sql); // Preparar la consulta
    $stmt->bindParam(':pais_id', $paisId, PDO::PARAM_INT); // Vincular el paràmetre del país
    $stmt->execute(); // Executar la consulta
    return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultat com a array associatiu
}

// Funció per inserir un viatge
function insertTravel($conn, $travel) {
    // Validar dades abans d'inserir
    $errors = validateTravel($travel); // Validar les dades del viatge
    if (!empty($errors)) {
        throw new Exception(implode(", ", $errors)); // Llançar una excepció si hi ha errors
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO viatges (nom, telefon, num_persones, data, preu, pais_id) 
            VALUES (:nom, :telefon, :num_persones, :data, :preu, :pais_id)";
    $stmt = $conn->prepare($sql); // Preparar la consulta

    // Vincular els paràmetres del viatge
    $stmt->bindParam(':nom', $travel['nom']);
    $stmt->bindParam(':telefon', $travel['telefon']);
    $stmt->bindParam(':num_persones', $travel['num_persones']);
    $stmt->bindParam(':data', $travel['data']);
    $stmt->bindParam(':preu', $travel['preu']);
    $stmt->bindParam(':pais_id', $travel['pais_id']);

    // Executar la consulta
    return $stmt->execute(); // Retornar el resultat de l'execució
}

// Funció per validar les dades del viatge
function validateTravel($travel) {
    $errors = [];
    
    // Validar nom
    if (!preg_match('/^[A-Za-zÀ-ÿ\s]{2,50}$/', $travel['nom'])) {
        $errors[] = "El nombre no és vàlid"; // Afegir error si el nom no és vàlid
    }
    
    // Validar telèfon - Accepta formats internacionals
    if (!preg_match('/^\+?[1-9]\d{7,14}$/', $travel['telefon'])) {
        $errors[] = "El número de telèfon no és vàlid"; // Afegir error si el telèfon no és vàlid
    }
    
    // Validar data
    $fecha = new DateTime($travel['data']); // Crear objecte DateTime amb la data del viatge
    $hoy = new DateTime('today'); // Crear objecte DateTime amb la data d'avui
    if ($fecha < $hoy) {
        $errors[] = "La data no pot ser anterior a avui"; // Afegir error si la data és anterior a avui
    }
    
    // Validar número de persones
    if (!is_numeric($travel['num_persones']) || $travel['num_persones'] < 1 || $travel['num_persones'] > 50) {
        $errors[] = "El número de persones ha d'estar entre 1 i 50"; // Afegir error si el número de persones no és vàlid
    }
    
    return $errors; // Retornar els errors
}

// Funció per obtenir els països d'un continent
function getCountries($conn, $continentId) {
    $sql = "SELECT id, nom_pais FROM paisos WHERE continent_id = :continent_id"; // Consulta SQL per obtenir els països
    $stmt = $conn->prepare($sql); // Preparar la consulta
    $stmt->bindParam(':continent_id', $continentId, PDO::PARAM_INT); // Vincular el paràmetre del continent
    $stmt->execute(); // Executar la consulta
    return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retornar els resultats com a array associatiu
}

// Funció per obtenir tots els viatges
function getAllTravels($conn) {
    $sql = "SELECT v.*, p.nom_pais 
            FROM viatges v 
            JOIN paisos p ON v.pais_id = p.id 
            ORDER BY v.data DESC"; // Consulta SQL per obtenir tots els viatges
    $stmt = $conn->prepare($sql); // Preparar la consulta
    $stmt->execute(); // Executar la consulta
    return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retornar els resultats com a array associatiu
}

// Funció per eliminar un viatge
function deleteTravel($conn, $travelId) {
    $sql = "DELETE FROM viatges WHERE id = :id"; // Consulta SQL per eliminar un viatge
    $stmt = $conn->prepare($sql); // Preparar la consulta
    $stmt->bindParam(':id', $travelId, PDO::PARAM_INT); // Vincular el paràmetre del viatge
    return $stmt->execute(); // Executar la consulta i retornar el resultat
}

?>
