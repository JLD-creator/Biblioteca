if(!localStorage.getItem("biblioteca_db")){
    alert("Base de datos no inicializada. Carga cualquier otra página primero.");
}

const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const password = document.getElementById("password").value.trim();

    const db = JSON.parse(localStorage.getItem("biblioteca_db"));
    const usuario = db.usuarios.find(u => u.username === nombre && u.password === password);

    if(!usuario){
        alert("Usuario o contraseña incorrectos");
        return;
    }

    localStorage.setItem("usuario_logueado", JSON.stringify({
        id: usuario.id,
        role: usuario.role,
        username: usuario.username
    }));

    if(usuario.role === "admin"){
        window.location.href = "admin.html";
    } else {
        window.location.href = "catalogo.html";
    }
});
