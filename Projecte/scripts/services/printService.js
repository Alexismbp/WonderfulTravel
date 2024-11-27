import { generateTravelPDF } from '../utils/pdfGenerator.js';

export function printTravel(travel) {
    try {
        const doc = generateTravelPDF(travel);
        const fileName = `viaje_${travel.id}_${travel.nom_pais}.pdf`;
        
        // Guardar el PDF
        doc.save(fileName);
    } catch (error) {
        console.error('Error al imprimir el viaje:', error);
        alert('Ha ocurrido un error al generar el PDF. Por favor, inténtelo de nuevo.');
    }
}