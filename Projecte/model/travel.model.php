<?php

function getContinents($conn) {
    try {
        $sql = "SELECT id, nom_continent FROM continents";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ['error' => $e->getMessage()];
    }
}

// Función para obtener el precio base del país seleccionado
function getCountryPrice($conn, $pais_id) {
    $sql = "SELECT preu FROM paisos WHERE id = :pais_id"; // Cambiado preu_base por preu
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':pais_id', $pais_id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['preu'] ?? 0; // Cambiado preu_base por preu
}

// Función para obtener el precio de un país
function getPrice($conn, $paisId) {
    $sql = "SELECT preu FROM paisos WHERE id = :pais_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':pais_id', $paisId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Función para insertar el viaje
function insertTravel($conn, $travel) {


    // Preparar la consulta SQL
    $sql = "INSERT INTO viatges (nom, telefon, num_persones, data, preu, pais_id) 
            VALUES (:nom, :telefon, :num_persones, :data, :preu, :pais_id)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':nom', $travel['nom']);
    $stmt->bindParam(':telefon', $travel['telefon']);
    $stmt->bindParam(':num_persones', $travel['num_persones']);
    $stmt->bindParam(':data', $travel['data']);
    $stmt->bindParam(':preu', $travel['preu']);
    $stmt->bindParam(':pais_id', $travel['pais_id']);

    // Ejecutar la consulta
    return $stmt->execute();
    
}

function getCountries($conn, $continentId) {
    
        $sql = "SELECT id, nom_pais FROM paisos WHERE continent_id = :continent_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':continent_id', $continentId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    
}

function getAllTravels($conn) {
    $sql = "SELECT v.*, p.nom_pais 
            FROM viatges v 
            JOIN paisos p ON v.pais_id = p.id 
            ORDER BY v.data DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function deleteTravel($conn, $travelId) {
    $sql = "DELETE FROM viatges WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $travelId, PDO::PARAM_INT);
    return $stmt->execute();
}

?>
