document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombre");
    if (nombre) {
        document.getElementById("userName").innerText = nombre;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    if (role) {
        document.getElementById("role").innerText = role;
    }
});