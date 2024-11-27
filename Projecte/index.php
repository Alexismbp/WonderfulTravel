<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Wonderful Travels - Planifica y reserva tus viajes por todo el mundo. Descubre destinos increíbles, precios competitivos y ofertas especiales. La mejor agencia de viajes online para tus aventuras.">
    <title>Wonderful Travels</title>
    <link rel="stylesheet" href="style/styles.css">
    <link rel="icon" type="image/x-icon" href="http://wondertrav.marcoslopez.cat/favicon.ico" />
    <script type="module" src="scripts/main.js" defer></script>
</head>

<body>

    <!-- Incluir el reloj desde un archivo separado -->
    <?php include 'partials/clock.php'; ?>

    <h1 class="titulo">Wonderful Travels</h1>

    <!-- Incluir el formulario desde un archivo separado -->
    <?php include 'partials/form.php'; ?>

    <!-- Select per ordenar els viatges -->
    <div class="form-group full-width">
        <label for="ordenar">Ordenar viatges per:</label>
        <select id="ordenar" name="ordenar">
            <option value="data">Data</option>
            <option value="desti">Destí</option>
        </select>
    </div>

    <!-- Div per mostrar la llista de viatges -->
    <div id="viajes-lista" class="viajes-container"></div>
</body>

</html>