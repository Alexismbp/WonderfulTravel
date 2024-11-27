
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
    <button type="submit" name="action" value="ajaxInsertTravel">Confirmar</button>
</form>