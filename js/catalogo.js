window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            const idBuscado = parseInt(params.get('id'));
            
            // Usamos la función de tu main.js
            const libros = obtenerLibros();
            const libro = libros.find(l => l.id === idBuscado);

            if (libro) {
                document.getElementById('libro-titulo').innerText = libro.titulo;
                document.getElementById('libro-autor').innerText = libro.autor;
                document.getElementById('libro-genero').innerText = libro.genero || "General";
                document.getElementById('libro-stock').innerText = libro.stock;
                document.getElementById('libro-desc').innerText = libro.descripcion || "Sin descripción disponible.";
                document.getElementById('libro-img').src = "/img/" + libro.img;
            } else {
                document.querySelector('.detalle-container').innerHTML = "<h2>Libro no encontrado</h2><a href='catalogo.html'>Volver</a>";
            }
        };