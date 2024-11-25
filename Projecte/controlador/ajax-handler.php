<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../model/database.php';
require_once __DIR__ . '/../model/travel.model.php';
require_once __DIR__ . '/handlers/continent.handler.php';
require_once __DIR__ . '/handlers/country.handler.php';
require_once __DIR__ . '/handlers/travel.handler.php';

try {
    $conn = Database::getInstance()->getConnection();
    // DEBUGGING
    /* action=ajaxPrice&pais_id=1 */
    /* $_GET['action'] = "ajaxPrice";
    $_GET['pais_id'] = "1"; */
    $action = $_GET['action'] ?? $_POST['action'] ?? null;

    
    if (!$action) {
        throw new Exception('No se ha especificado ninguna acción');
    }

    $response = handleAction($action, $conn);
    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    $conn = null;
}

function handleAction($action, $conn) {
    switch ($action) {
        case 'ajaxContinents':
            return handleContinents($conn);
        case 'ajaxCountries':
            return handleCountries($conn, $_GET['continent_id'] ?? '');
        case 'ajaxPrice':
            return handlePrice($conn, $_GET['pais_id'] ?? '');
        case 'ajaxInsertTravel':
            return handleInsertTravel($conn);
        case 'getAllTravels':
            return handleGetAllTravels($conn, $_GET['orderBy'] ?? 'data');
        case 'deleteTravel':
            return handleDeleteTravel($conn);
        default:
            throw new Exception('Acción no válida: ' . $action);
    }
}

?>
