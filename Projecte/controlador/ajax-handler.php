<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../model/database.php';
require_once __DIR__ . '/../model/travel.model.php';

// Inicialitzar la connexió
try {
    $conn = Database::getInstance()->getConnection();
    // Comprovar si s'ha especificat una acció
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    } else if (isset($_POST['action'])) {
        $action = $_POST['action'];
    } else {
        throw new Exception('No s\'ha especificat cap acció');
    }

    // Seleccionar l'acció a realitzar
    switch ($action) {
        case 'ajaxContinents':
            ajaxContinents($conn);
            break;
        case 'ajaxCountries':
            $continentId = isset($_GET['continent_id']) ? $_GET['continent_id'] : '';
            ajaxCountries($conn, $continentId);
            break;
        case 'ajaxPrice':
            $paisId = isset($_GET['pais_id']) ? $_GET['pais_id'] : '';
            ajaxPrice($conn, $paisId);
            break;
        case 'ajaxInsertTravel':
            ajaxInsertTravel($conn);
            break;
        case 'getAllTravels':
            $orderBy = isset($_GET['orderBy']) ? $_GET['orderBy'] : 'data';
            ajaxGetAllTravels($conn, $orderBy);
            break;
        case 'deleteTravel':
            ajaxDeleteTravel($conn);
            break;
        default:
            throw new Exception('Acció no vàlida: ' . $action);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Cerrar la conexión
    $conn = null;
}

// Funció per obtenir els continents
function ajaxContinents($conn)
{
    try {
        $continents = getContinents($conn);
        if ($continents === false || isset($continents['error'])) {
            echo json_encode(['error' => 'No s\'han pogut obtenir els continents']);
            return;
        }
        echo json_encode($continents);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en obtenir continents: ' . $e->getMessage()]);
    }
}

// Funció per obtenir els països d'un continent
function ajaxCountries($conn, $continentId)
{
    try {
        $countries = getCountries($conn, $continentId);
        echo json_encode($countries);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en obtenir països: ' . $e->getMessage()]);
    }
}

// Funció per obtenir el preu d'un país
function ajaxPrice($conn, $paisId)
{
    try {
        $price = getPrice($conn, $paisId);
        echo json_encode($price);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en obtenir el preu: ' . $e->getMessage()]);
    }
}

// Funció per inserir un viatge
function ajaxInsertTravel($conn)
{
    $travel = [
        'nom' => $_POST['nom'],
        'telefon' => $_POST['telefon'],
        'num_persones' => $_POST['num-persones'],
        'data' => $_POST['data-viatge'],
        'preu' => $_POST['preu'],
        'pais_id' => $_POST['pais'],
        'descompte' => isset($_POST['descompte']) ? $_POST['descompte'] : null
    ];

    // Calcular el preu total: preu base del país * nombre de persones
    $travel['preu'] = getCountryPrice($conn, $travel['pais_id']) * $travel['num_persones'];

    // Aplicar descompte si correspon
    if (isset($travel['descompte']) && $travel['descompte'] === 'on') {
        $travel['preu'] *= 0.80; // Descompte del 20%
    }

    try {
        if (insertTravel($conn, $travel)) {
            // Enviar resposta d'èxit
            echo json_encode(['success' => 'El viatge s\'ha inserit correctament.']);
        } else {
            // Enviar resposta d'error
            echo json_encode(['error' => 'No s\'ha pogut inserir el viatge.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en inserir el viatge: ' . $e->getMessage()]);
    }
}

// Funció per obtenir tots els viatges
function ajaxGetAllTravels($conn, $orderBy)
{
    try {
        $travels = getAllTravels($conn, $orderBy);
        echo json_encode($travels);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en obtenir viatges: ' . $e->getMessage()]);
    }
}

// Funció per eliminar un viatge
function ajaxDeleteTravel($conn) {
    try {
        $travelId = $_POST['travelId'];
        if (deleteTravel($conn, $travelId)) {
            echo json_encode(['success' => 'Viatge eliminat correctament']);
        } else {
            echo json_encode(['error' => 'No s\'ha pogut eliminar el viatge']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en eliminar el viatge: ' . $e->getMessage()]);
    }
}
