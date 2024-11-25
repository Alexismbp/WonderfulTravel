// Array d'objectes que conté totes les ofertes de viatges disponibles
export const ofertas = [
    {
        id: 1,                           // Identificador únic de l'oferta
        nombre: "París Romántico",       // Nom del paquet turístic
        precio: 799.99,                  // Preu per persona en euros
        imagen: "assets/img/paris.jpg",  // Ruta relativa a la imatge del destí
        fechaInicio: "2024-06-01",      // Data d'inici del viatge (format: YYYY-MM-DD)
        fechaFin: "2024-06-07",         // Data de finalització del viatge (format: YYYY-MM-DD)
        descripcion: "Descubre la ciudad del amor", // Breu descripció del viatge
        destino: "París, Francia",       // Ciutat i país de destí
        plazasDisponibles: 20           // Nombre de places disponibles per aquesta oferta
    },
    {
        id: 2,
        nombre: "Roma Imperial",
        precio: 899.99,
        imagen: "assets/img/roma.jpg",
        fechaInicio: "2024-07-15",
        fechaFin: "2024-07-22",
        descripcion: "Explora la ciudad eterna",
        destino: "Roma, Italia",
        plazasDisponibles: 15
    },
    // Es poden afegir més ofertes seguint la mateixa estructura d'objecte
];