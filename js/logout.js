document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuario_logueado");
            window.location.href = "login.html";
        });
    }
});
