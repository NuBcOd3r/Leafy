async function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: pass })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Login incorrecto");
    return;
  }

  localStorage.setItem("role", data.role);
  localStorage.setItem("nombre", data.nombre);

  if (data.role === "User" || data.role === "Usuario") {
    window.location.href = "/home";
  } 
  else if (data.role === "Admin") {
    window.location.href = "/Dashboard.html";
  }
}


async function registro() {
  const cedula = document.getElementById("cedula").value;
  const nombreCompleto = document.getElementById("nombreCompleto").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const role = document.getElementById("role").value;

  try {
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula, nombreCompleto, email, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "Ocurrió un error",
        confirmButtonColor: "#d33"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Usuario creado correctamente",
      confirmButtonColor: "#2d6a4f"
    }).then(() => {
      window.location.href = "/";
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de servidor",
      text: "No se pudo conectar con el servidor",
      confirmButtonColor: "#d33"
    });
  }
}

async function agregarInforme() {
  const informe = document.getElementById("informe").value;
  try {
    const res = await fetch("/api/informe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ informe})
    });

    const data = await res.json();

    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "Ocurrió un error",
        confirmButtonColor: "#d33"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Informe Agregado!",
      text: "Informe agregegado correctamente",
      confirmButtonColor: "#2d6a4f"
    }).then(() => {
      window.location.href = "historial";
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de servidor",
      text: "No se pudo conectar con el servidor",
      confirmButtonColor: "#d33"
    });
  }
}