window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const idBuscado = parseInt(params.get('id'));

    // Usamos la función del data.js
    const libros = obtenerLibros();
    const libro = libros.find(l => l.id == idBuscado);

    if (libro) {
        document.getElementById('libro-titulo').innerText = libro.titulo;
        document.getElementById('libro-autor').innerText = libro.autor;
        document.getElementById('libro-genero').innerText = libro.genero || "General";
        document.getElementById('libro-stock').innerText = libro.stock;
        document.getElementById('libro-desc').innerText = libro.descripcion || "Sin descripción disponible.";
        document.getElementById('libro-img').src = "/img/" + libro.img;
        const imgData = localStorage.getItem("img_" + libro.img);
        document.getElementById('libro-img').src = imgData ? imgData : "/img/" + libro.img;
    } else {
        document.querySelector('.detalle-container').innerHTML = "<h2>Libro no encontrado</h2><a href='catalogo.html'>Volver</a>";
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const librosContainer = document.querySelector(".libros");

    function mostrarLibros() {
        const db = obtenerDB();
        librosContainer.innerHTML = "";

        db.libros.forEach(libro => {
            const art = document.createElement("article");
            art.className = "libro";

            // Intentamos cargar la imagen de localStorage primero
            const imgData = localStorage.getItem("img_" + libro.img);
            const src = imgData ? imgData : "/img/" + libro.img;

            art.innerHTML = `
                <img src="${src}" alt="${libro.titulo}">
                <h3>${libro.titulo}</h3>
                <p>${libro.autor}</p>
                <span>${libro.genero || "General"}</span>
                <a href="libro.html?id=${libro.id}" class="boton-ver">Ver</a>
            `;
            librosContainer.appendChild(art);
        });
    }

    mostrarLibros();
});


