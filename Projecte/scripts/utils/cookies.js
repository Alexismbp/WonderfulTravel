
// Función para obtener el valor de una cookie
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return 'data'; // valor por defecto
}

// Función para establecer una cookie
export function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/;max-age=31536000`; // expira en 1 año
}