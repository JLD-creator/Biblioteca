

function cargarUsuarios() {
    const usuarios = obtenerUsuarios();
    const select = document.getElementById("usuario");
    select.innerHTML = "";

    usuarios
        .filter(u => u.role === "user")
        .forEach(u => {
            const option = document.createElement("option");
            option.value = u.id;
            option.textContent = u.username;
            select.appendChild(option);
        });
}

function cargarLibros() {
    const libros = obtenerLibros();
    const select = document.getElementById("libro");
    select.innerHTML = "";

    libros
        .filter(l => l.stock > 0)
        .forEach(l => {
            const option = document.createElement("option");
            option.value = l.id;
            option.textContent = `${l.titulo} (${l.stock} disponibles)`;
            select.appendChild(option);
        });
}


function cargarPrestamos() {
    const db = obtenerDB();
    const tbody = document.getElementById("tablaPrestamos");
    tbody.innerHTML = "";

    db.prestamos.forEach(p => {
        const usuario = db.usuarios.find(u => u.id == p.usuarioId);
        const libro = db.libros.find(l => l.id == p.libroId);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.username}</td>
            <td>${libro.titulo}</td>
            <td>${p.fechaPrestamo}</td>
            <td>${p.fechaDevolucion}</td>
            <td>
                <button onclick="devolverLibro(${p.id})">
                    Devolver
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}



function registrarPrestamo() {
    const db = obtenerDB();
    const usuarioId = parseInt(document.getElementById("usuario").value);
    const libroId = parseInt(document.getElementById("libro").value);

    const libro = db.libros.find(l => l.id == libroId);
    if (!libro || libro.stock <= 0) {
        alert("No hay stock disponible");
        return;
    }

    const hoy = new Date();
    const devolucion = new Date();
    devolucion.setDate(hoy.getDate() + db.config.diasPrestamo);

    db.prestamos.push({
        id: Date.now(),
        usuarioId,
        libroId,
        fechaPrestamo: hoy.toLocaleDateString(),
        fechaDevolucion: devolucion.toLocaleDateString()
    });

    libro.stock--;

    guardarDB(db);
    cargarLibros();
    cargarPrestamos();
}



function devolverLibro(prestamoId) {
    const db = obtenerDB();

    const index = db.prestamos.findIndex(p => p.id == prestamoId);
    if (index == -1) return;

    const prestamo = db.prestamos[index];
    const libro = db.libros.find(l => l.id == prestamo.libroId);

    libro.stock++;
    db.prestamos.splice(index, 1);

    guardarDB(db);
    cargarLibros();
    cargarPrestamos();
}


cargarUsuarios();
cargarLibros();
cargarPrestamos();
