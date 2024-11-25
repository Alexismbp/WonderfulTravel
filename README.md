# WonderfulTravel
Projecte pilot, wonderful travel.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [To Do](#to-do)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Autores](#autores)
- [Estado del Proyecto](#estado-del-proyecto)
- [Agradecimientos](#agradecimientos)

## Descripción
WonderfulTravel es una aplicación web diseñada para gestionar y visualizar viajes. Permite a los usuarios añadir nuevos viajes, ver los viajes existentes y eliminar viajes específicos. La aplicación está construida utilizando AJAX para manejar las solicitudes al servidor de manera asíncrona, lo que mejora la experiencia del usuario al no requerir recargas de página.

## Funcionalidades
- **Añadir Viajes**: Los usuarios pueden añadir nuevos viajes mediante un formulario que incluye campos para el nombre, teléfono, fecha del viaje, número de personas y un checkbox para aplicar un descuento.
- **Ver Viajes**: Los usuarios pueden ver una lista de todos los viajes añadidos, incluyendo detalles como el país, nombre, teléfono, número de personas y precio.
- **Eliminar Viajes**: Los usuarios pueden eliminar viajes específicos mediante un botón de eliminación en cada tarjeta de viaje.
- **Validación de Formularios**: Validación de los campos del formulario para asegurar que los datos introducidos son correctos.
- **Cálculo de Precios**: Cálculo automático del precio total basado en el número de personas y la aplicación de un descuento del 20% si se selecciona.
- **Reloj Analógico**: Un reloj analógico que muestra la hora actual de Madrid.
- **Reloj Digital**: Un reloj digital que muestra la fecha y hora actual en formato 12h o 24h.

## Tecnologías Utilizadas
- **HTML5 y CSS3**: Para la estructura y el diseño de la interfaz de usuario.
- **JavaScript (ES6+)**: Para la lógica del cliente y el manejo del DOM.
- **AJAX**: Para la comunicación asíncrona con el servidor sin recargar la página.
- **PHP**: Para la lógica del servidor y el manejo de solicitudes.
- **MySQL**: Base de datos para almacenar la información de los viajes.

## Estructura del Proyecto
- **index.html**: Página principal que incluye el formulario para añadir viajes y el reloj.
- **view-travels.html**: Página para ver la lista de viajes añadidos.
- **scripts/**: Directorio que contiene los scripts JavaScript para la funcionalidad de la aplicación.
    - **main.js**: Script principal que inicializa la aplicación.
    - **form/**: Directorio que contiene los scripts relacionados con el formulario.
        - **setupDatePicker.js**: Script para configurar el DatePicker.
        - **setupPriceCalculator.js**: Script para configurar el cálculo del precio.
        - **createPriceTotalInput.js**: Script para crear el input del precio total.
        - **setupFormSubmission.js**: Script para configurar el envío del formulario.
        - **validateForm.js**: Script para validar el formulario.
        - **validationRules.js**: Script que contiene las reglas de validación.
    - **travels.js**: Script para cargar y eliminar viajes utilizando AJAX.
    - **analogClock.js**: Script para el reloj analógico.
    - **rellotge.js**: Script para el reloj digital.
    - **updateUI.js**: Script para actualizar la interfaz de usuario.
    - **datos.js**: Datos de ejemplo para los viajes.
    - **ofertas.js**: Datos de ejemplo para las ofertas.
- **style/**: Directorio que contiene los estilos CSS para la aplicación.
    - **styles.css**: Archivo principal de estilos.
    - **print-styles.css**: Estilos para impresión.
- **img/**: Directorio que contiene las imágenes utilizadas en la aplicación.
    - **paises/**: Contiene las imágenes de los países y un `README.md`.
- **controlador/**: Directorio que contiene los scripts PHP que manejan las solicitudes AJAX.
    - **ajax-handler.php**: Archivo que procesa las solicitudes AJAX del cliente.

## Instalación
1. Clona el repositorio en tu máquina local:
     ```bash
     git clone https://github.com/tu_usuario/WonderfulTravel.git
     cd WonderfulTravel
     ```
2. Configura un servidor web local (por ejemplo, XAMPP o WAMP) y coloca el proyecto en el directorio adecuado (`htdocs` en el caso de XAMPP).
3. Importa la base de datos `wonderful_travel.sql` en tu servidor MySQL.
4. Abre el archivo `controlador/ajax-handler.php` y configura las credenciales de conexión a la base de datos.
5. Accede a `http://localhost/WonderfulTravel/index.html` en tu navegador para ver la aplicación.

## Uso
1. Abre la página principal (`index.html`) para añadir nuevos viajes.
2. Rellena el formulario con los detalles del viaje y haz clic en "Afegueix" para añadir el viaje.
3. Navega a `view-travels.html` para ver la lista de viajes añadidos.
4. Haz clic en el botón "Eliminar" en cualquier tarjeta de viaje para eliminar ese viaje.

## To Do
- Optimización de imágenes (pasar a WebP)
- Echar un vistazo a Google PageSpeed Insights
- Ampliar la BDD amb taules com ara Ofertes, Històrics, ... (+2 punt)
- Poder imprimir les reserves en un format diferent a la que surt a la web (+1 punt)
- Refactor

## Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
     ```bash
     git checkout -b nombre-de-tu-rama
     ```
3. Realiza tus cambios y haz commit:
     ```bash
     git commit -m "Descripción de tus cambios"
     ```
4. Sube tus cambios a tu fork:
     ```bash
     git push origin nombre-de-tu-rama
     ```
5. Abre un Pull Request en el repositorio original.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autores
- [Alexismbp](https://github.com/alexismbp)
- [Marcos](https://github.com/Marrkitu2)

## Estado del Proyecto
El proyecto se encuentra en fase piloto. Se están realizando mejoras y optimizaciones para su primera versión estable.

## Agradecimientos
Gracias a todos los colaboradores y testers que han ayudado en el desarrollo de WonderfulTravel.