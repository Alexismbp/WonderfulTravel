<?php

function handleCountries($conn, $continentId) {
    try {
        return getCountries($conn, $continentId);
    } catch (PDOException $e) {
        return ['error' => 'Error al obtener países: ' . $e->getMessage()];
    }
}

function handlePrice($conn, $paisId) {
    try {
        return getCountryPrice($conn, $paisId);
    } catch (PDOException $e) {
        return ['error' => 'Error al obtener el precio: ' . $e->getMessage()];
    }
}

?>