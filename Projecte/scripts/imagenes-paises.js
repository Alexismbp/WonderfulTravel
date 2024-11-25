// Definim la base de la URL utilitzant l'origen i el camí de la finestra actual
const base_url = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

// Exportem un objecte que conté les imatges dels països, indexades per continent_id i país_id
export const imagenesPaises = {
    // África (continent_id: 1)
    1: `${base_url}/img/paises/nigeria.jpg`, // Imatge de Nigèria
    2: `${base_url}/img/paises/sudafrica.jpg`, // Imatge de Sud-àfrica
    3: `${base_url}/img/paises/egipto.jpg`, // Imatge d'Egipte
    
    // América del Norte (continent_id: 2)
    4: `${base_url}/img/paises/eeuu.jpg`, // Imatge dels Estats Units
    5: `${base_url}/img/paises/canada.jpg`, // Imatge del Canadà
    6: `${base_url}/img/paises/mexico.jpg`, // Imatge de Mèxic
    
    // América del Sur (continent_id: 3)
    7: `${base_url}/img/paises/brasil.jpg`, // Imatge del Brasil
    8: `${base_url}/img/paises/argentina.jpg`, // Imatge de l'Argentina
    9: `${base_url}/img/paises/chile.jpg`, // Imatge de Xile
    
    // Asia (continent_id: 5)
    13: `${base_url}/img/paises/china.jpg`, // Imatge de la Xina
    14: `${base_url}/img/paises/japon.jpg`, // Imatge del Japó
    15: `${base_url}/img/paises/india.jpg`, // Imatge de l'Índia
    
    // Europa (continent_id: 6)
    16: `${base_url}/img/paises/francia.jpg`, // Imatge de França
    17: `${base_url}/img/paises/alemania.jpg`, // Imatge d'Alemanya
    18: `${base_url}/img/paises/italia.jpg`, // Imatge d'Itàlia
    
    // Oceanía (continent_id: 7)
    10: `${base_url}/img/paises/australia.jpg`, // Imatge d'Austràlia
    11: `${base_url}/img/paises/nueva-zelanda.jpg`, // Imatge de Nova Zelanda
    12: `${base_url}/img/paises/fiyi.jpg` // Imatge de Fiji
};