function cargarConfiguracion() {
    const db = obtenerDB();
    document.getElementById("maxLibros").value = db.config.maxLibros;
    document.getElementById("diasPrestamo").value = db.config.diasPrestamo;
    document.getElementById("sancionDias").value = db.config.sancionDias;
}

function guardarConfiguracion() {
    const db = obtenerDB();
    db.config.maxLibros = parseInt(document.getElementById("maxLibros").value);
    db.config.diasPrestamo = parseInt(document.getElementById("diasPrestamo").value);
    db.config.sancionDias = parseInt(document.getElementById("sancionDias").value);
    guardarDB(db);
    alert("Configuración guardada");
}

function cargarLibros() {
    const db = obtenerDB();
    const tbody = document.querySelectorAll("section")[2].querySelector("tbody");
    tbody.innerHTML = "";
    db.libros.forEach(libro => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.stock}</td>
            <td>
                <button class="editar-libro" data-id="${libro.id}">Editar</button>
                <button class="eliminar-libro" data-id="${libro.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".editar-libro").forEach(btn => {
        btn.addEventListener("click", () => editarLibro(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll(".eliminar-libro").forEach(btn => {
        btn.addEventListener("click", () => eliminarLibro(parseInt(btn.dataset.id)));
    });
}

function agregarLibro() {
    const db = obtenerDB();
    const section = document.querySelectorAll("section")[1];
    const inputs = section.querySelectorAll("input, textarea");
    const nuevoLibro = {
        id: Date.now(),
        titulo: inputs[0].value,
        autor: inputs[1].value,
        genero: inputs[2].value,
        stock: parseInt(inputs[3].value),
        img: inputs[4].value,
        descripcion: inputs[5].value
    };
    db.libros.push(nuevoLibro);
    guardarDB(db);
    cargarLibros();
    inputs.forEach(i => i.value = "");
}

function eliminarLibro(id) {
    const db = obtenerDB();
    db.libros = db.libros.filter(l => l.id !== id);
    guardarDB(db);
    cargarLibros();
}

function editarLibro(id) {
    const db = obtenerDB();
    const libro = db.libros.find(l => l.id === id);
    if (!libro) return;
    const nuevoTitulo = prompt("Nuevo título:", libro.titulo);
    if (nuevoTitulo) libro.titulo = nuevoTitulo;
    const nuevoStock = prompt("Nuevo stock:", libro.stock);
    if (nuevoStock) libro.stock = parseInt(nuevoStock);
    guardarDB(db);
    cargarLibros();
}

function cargarUsuarios() {
    const db = obtenerDB();
    const tbody = document.querySelectorAll("section")[4].querySelector("tbody");
    tbody.innerHTML = "";
    db.usuarios.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.role}</td>
            <td>${u.penalizadoHasta || "—"}</td>
            <td>
                <button class="penalizar-usuario" data-id="${u.id}">Penalizar</button>
                <button class="eliminar-usuario" data-id="${u.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll(".penalizar-usuario").forEach(btn => {
        btn.addEventListener("click", () => penalizarUsuario(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll(".eliminar-usuario").forEach(btn => {
        btn.addEventListener("click", () => eliminarUsuario(parseInt(btn.dataset.id)));
    });
}

function agregarUsuario() {
    const section = document.querySelectorAll("section")[3];
    const inputs = section.querySelectorAll("input, select");
    const db = obtenerDB();
    const nuevoUsuario = {
        id: Date.now(),
        username: inputs[0].value,
        password: inputs[1].value,
        role: inputs[2].value,
        penalizadoHasta: null
    };
    db.usuarios.push(nuevoUsuario);
    guardarDB(db);
    cargarUsuarios();
    inputs.forEach(i => i.value = "");
}

function eliminarUsuario(id) {
    const db = obtenerDB();
    db.usuarios = db.usuarios.filter(u => u.id !== id);
    guardarDB(db);
    cargarUsuarios();
}

function penalizarUsuario(id) {
    const db = obtenerDB();
    const usuario = db.usuarios.find(u => u.id === id);
    if (!usuario) return;
    const dias = prompt("Días de penalización:");
    if (!dias) return;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + parseInt(dias));
    usuario.penalizadoHasta = fecha.toLocaleDateString();
    guardarDB(db);
    cargarUsuarios();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarConfiguracion();
    cargarLibros();
    cargarUsuarios();
    document.querySelectorAll("section")[0].querySelector("a").addEventListener("click", e => {
        e.preventDefault();
        guardarConfiguracion();
    });
    document.querySelectorAll("section")[1].querySelector("a").addEventListener("click", e => {
        e.preventDefault();
        agregarLibro();
    });
    document.querySelectorAll("section")[3].querySelector("a").addEventListener("click", e => {
        e.preventDefault();
        agregarUsuario();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuario_logueado"));
    if(!user || user.role !== "admin"){
        alert("Acceso denegado. Solo administradores pueden entrar.");
        window.location.href = "login.html";
    }
});

