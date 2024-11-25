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
<header>
    <nav>
        <ul>
            <!-- Enllaços de navegació -->
            <li><a href="index.html">Añadir Viaje</a></li>
            <li><a href="view-travels.html">Ver Viajes</a></li>
        </ul>
    </nav>
</header>

<body>

    <!-- Solo mantener el reloj analógico -->
    <div class="clock">
        <div class="hand hour"></div>
        <div class="hand minute"></div>
        <div class="hand second"></div>
        <div class="center-point"></div>
        <!-- Números del rellotge -->
        <div class="number number1">1</div>
        <div class="number number2">2</div>
        <div class="number number3">3</div>
        <div class="number number4">4</div>
        <div class="number number5">5</div>
        <div class="number number6">6</div>
        <div class="number number7">7</div>
        <div class="number number8">8</div>
        <div class="number number9">9</div>
        <div class="number number10">10</div>
        <div class="number number11">11</div>
        <div class="number number12">12</div>
    </div>
    <h1 class="titulo">Wonderful Travels</h1>

    <!-- Formulari per afegir un viatge -->
    <form action="./controlador/ajax-handler.php" method="post" id="insertTravel">
        <div class="form-group">
            <label for="nom">Nombre</label>
            <!-- Camp per introduir el nom -->
            <input type="text" id="nom" name="nom" pattern="^[A-Za-zÀ-ÿ\s]{2,50}$"
                title="El nombre debe contener solo letras y espacios, entre 2 y 50 caracteres" required>
        </div>

        <div class="form-group">
            <label for="telefon">Número de Teléfono</label>
            <!-- Camp per introduir el número de telèfon -->
            <input type="tel" id="telefon" name="telefon"
                pattern="^\+?[1-9]\d{7,14}$"
                title="Introduce un número de teléfono válido (entre 8 y 15 dígitos, puede incluir + al inicio)" required>
        </div>

        <div class="form-group full-width date-container">
            <label for="data-viatge">Fecha del viaje</label>
            <!-- Camp per introduir la data del viatge -->
            <div class="date-input-container">
                <input type="date" name="data-viatge" id="data-viatge" readonly required>
                <button type="button" class="calendar-button" id="calendar-trigger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </button>
            </div>
        </div>

        <div class="form-group">
            <label for="continent">Continente</label>
            <!-- Selector per triar el continent -->
            <select name="continent" id="continent">
                <option value="">-- Selecciona el continente --</option>
            </select>
        </div>

        <div class="form-group">
            <label for="pais">País</label>
            <!-- Selector per triar el país -->
            <select name="pais" id="pais">
                <option value="">-- Selecciona el país --</option>
            </select>
        </div>

        <div id="pais-imagen">
            <!-- Espai reservat per la imatge del país -->
            <p>Espacio reservado para la imagen del país</p>
        </div>

        <div class="form-group">
            <label for="preu">Precio Por Persona</label>
            <!-- Camp per mostrar el preu (només lectura) -->
            <input type="text" id="preu" name="preu" readonly>
        </div>

        <div class="form-group">
            <label for="num-persones">Número de personas</label>
            <!-- Camp per introduir el nombre de persones -->
            <input type="number" name="num-persones" id="num-persones" min="1" value="1" required>
        </div>

        <div class="form-group full-width">
            <label for="descompte">Aplicar 20% de descuento</label>
            <!-- Checkbox per aplicar descompte -->
            <input type="checkbox" name="descompte" id="descompte">
        </div>

        <!-- Botó per afegir el viatge -->
        <button type="submit" name="action" value="ajaxInsertTravel">Afegueix</button>
    </form>

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