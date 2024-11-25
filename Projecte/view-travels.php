
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Viajes - Wonderful Travels</title>
    <link rel="stylesheet" href="style/styles.css">
    <link rel="stylesheet" href="style/print-styles.css" media="print">
    <link rel="icon" type="image/x-icon" href="http://wondertrav.marcoslopez.cat/favicon.ico" />
    <script type="module" src="scripts/main.js" defer></script>
</head>
<body>
    <header class="no-print">
        <nav>
            <ul>
                <li><a href="index.php">Añadir Viaje</a></li>
                <li><a href="view-travels.php">Ver Viajes</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1 class="titulo">Lista de Viajes</h1>
        
        <div class="controls no-print">
            <div class="form-group">
                <label for="ordenar">Ordenar viajes por:</label>
                <select id="ordenar" name="ordenar">
                    <option value="data">Fecha</option>
                    <option value="desti">Destino</option>
                </select>
            </div>
        </div>

        <div id="viajes-lista" class="viajes-container"></div>
    </main>

    <footer class="print-only">
        <div class="print-info">
            <p>Fecha de impresión: <span id="print-date"></span></p>
            <p>Wonderful Travels - Documento de reserva</p>
        </div>
    </footer>
</body>
</html>