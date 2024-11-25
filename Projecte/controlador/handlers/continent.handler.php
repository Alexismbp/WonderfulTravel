
<?php

function handleContinents($conn) {
    try {
        $continents = getContinents($conn);
        if ($continents === false || isset($continents['error'])) {
            return ['error' => 'No se han podido obtener los continentes'];
        }
        return $continents;
    } catch (PDOException $e) {
        return ['error' => 'Error al obtener continentes: ' . $e->getMessage()];
    }
}