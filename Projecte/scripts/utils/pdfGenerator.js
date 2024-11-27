// Usar las variables globales de jsPDF y autotable
const { jsPDF } = window.jspdf;
const base_url = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

// Eliminar la importación de autotable ya que se carga globalmente via CDN
// No necesitamos esta línea: import 'jspdf-autotable';

export function generateTravelPDF(travel) {
    const doc = new jsPDF();

    // Configurar título
    doc.setFontSize(20);
    doc.text('Wonderful Travel - Detalles del Viaje', 20, 20);

    // Añadir logo (corregir ruta del logo)
    try {
        doc.addImage(`${base_url}/img/logo.png`, 'PNG', 20, 30, 40, 40);
    } catch (error) {
        console.warn('No se pudo cargar el logo:', error);
    }

    // Información del viaje
    doc.setFontSize(12);
    const startY = 80;
    const lineHeight = 10;

    const travelInfo = [
        ['País:', travel.nom_pais],
        ['Fecha:', travel.data],
        ['Nombre:', travel.nom],
        ['Teléfono:', travel.telefon],
        ['Personas:', travel.num_persones],
        ['Precio Total:', `${travel.preu}€`]
    ];

    doc.autoTable({
        startY: startY,
        head: [['Campo', 'Valor']],
        body: travelInfo,
        theme: 'grid',
        styles: {
            fontSize: 12,
            cellPadding: 5
        }
    });

    // Añadir pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
            `Página ${i} de ${pageCount} - Wonderful Travel ${new Date().getFullYear()}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
        );
    }

    return doc;
}