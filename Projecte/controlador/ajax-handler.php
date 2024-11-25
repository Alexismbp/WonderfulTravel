<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0); // Desactivamos la salida de errores PHP directa

require_once __DIR__ . '/../model/database.php';
require_once __DIR__ . '/../model/travel.model.php';

// Inicializar la conexión
try {
    $conn = Database::getInstance()->getConnection();
    
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    } else if (isset($_POST['action'])) {
        $action = $_POST['action'];
    } else {
        throw new Exception('No se especificó ninguna acción');
    }

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
            ajaxGetAllTravels($conn);
            break;
        case 'deleteTravel':
            ajaxDeleteTravel($conn);
            break;
        default:
            throw new Exception('Acción no válida: ' . $action);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

function ajaxContinents($conn)
{
    try {
        $continents = getContinents($conn);
        if ($continents === false || isset($continents['error'])) {
            echo json_encode(['error' => 'No se pudieron obtener los continentes']);
            return;
        }
        echo json_encode($continents);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener continentes: ' . $e->getMessage()]);
    }
}

function ajaxCountries($conn, $continentId)
{
    try {
        $countries = getCountries($conn, $continentId);
        echo json_encode($countries);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener países: ' . $e->getMessage()]);
    }
}

function ajaxPrice($conn, $paisId)
{
    try {
        $price = getPrice($conn, $paisId);
        echo json_encode($price);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener el precio: ' . $e->getMessage()]);
    }
}

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

    // Calcular el precio total: precio base del país * número de personas
    $travel['preu'] = getCountryPrice($conn, $travel['pais_id']) * $travel['num_persones'];

    // Aplicar descuento si corresponde
    if (isset($travel['descompte']) && $travel['descompte'] === 'on') {
        $travel['preu'] *= 0.80; // Descuento del 20%
    }

    try {
        if (insertTravel($conn, $travel)) {
            // Enviar respuesta de éxito
            echo json_encode(['success' => 'El viaje se ha insertado correctamente.']);
        } else {
            // Enviar respuesta de error
            echo json_encode(['error' => 'No se pudo insertar el viaje.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al insertar el viaje: ' . $e->getMessage()]);
    }
}

function ajaxGetAllTravels($conn)
{
    try {
        $travels = getAllTravels($conn);
        echo json_encode($travels);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener viajes: ' . $e->getMessage()]);
    }
}

function ajaxDeleteTravel($conn) {
    try {
        $travelId = $_POST['travelId'];
        if (deleteTravel($conn, $travelId)) {
            echo json_encode(['success' => 'Viaje eliminado correctamente']);
        } else {
            echo json_encode(['error' => 'No se pudo eliminar el viaje']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al eliminar el viaje: ' . $e->getMessage()]);
    }
}
