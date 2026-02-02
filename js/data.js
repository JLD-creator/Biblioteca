// 1. ESTRUCTURA INICIAL
const inicialDB = {
    config: {
        maxLibros: 3,
        diasPrestamo: 14,
        sancionDias: 7
    },
    usuarios: [
        {
            id: 1,
            username: "admin",
            password: "123",
            role: "admin",
            penalizadoHasta: null
        },
        {
            id: 2,
            username: "user",
            password: "123",
            role: "user",
            penalizadoHasta: null
        }
    ],
    libros: [
       { 
            id: 101, 
            titulo: "El Quijote", 
            autor: "Miguel de Cervantes", 
            genero: "Clásico",
            stock: 5, 
            img: "Quijote.jpeg",
            descripcion: "La historia del ingenioso hidalgo Don Quijote de la Mancha."
        },
        { 
            id: 102, 
            titulo: "Cien años de soledad", 
            autor: "Gabriel García Márquez", 
            genero: "Realismo Mágico",
            stock: 2, 
            img: "cien.jpeg",
            descripcion: "La saga de la familia Buendía en el pueblo de Macondo."
        }
    ],
    prestamos: []
};

// 2. FUNCIONES DE PERSISTENCIA

// Crea el archivo en el navegador si no existe
function inicializarDB() {
    if (!localStorage.getItem('biblioteca_db')) {
        // "Convertimos objeto a texto" para guardarlo
        const datosEnTexto = JSON.stringify(inicialDB);
        localStorage.setItem('biblioteca_db', datosEnTexto);
        console.log("Base de datos creada.");
    }
}

// Lee los datos y los "convierte de texto a objeto JS"
function obtenerDB() {
    const datosEnTexto = localStorage.getItem('biblioteca_db');
    return JSON.parse(datosEnTexto);
}

// Guarda cualquier cambio que hagamos
function guardarDB(datosNuevos) {
    const datosEnTexto = JSON.stringify(datosNuevos);
    localStorage.setItem('biblioteca_db', datosEnTexto);
}

// 3. FUNCIONES DE AYUDA (HELPERS)

function obtenerLibros() {
    const db = obtenerDB();
    return db.libros;
}

function obtenerUsuarios() {
    const db = obtenerDB();
    return db.usuarios;
}

// Ejecutamos la inicialización al cargar el script
inicializarDB();