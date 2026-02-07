document.addEventListener("DOMContentLoaded", async () => {
  try {
    const partes = window.location.pathname.split("/");
    const id = partes[partes.length - 1];

    const res = await fetch(`/api/lecturas/${id}`);
    const lectura = await res.json();

    const fecha = new Date(lectura.fechaHora);

    document.getElementById("contenedorDetalles").innerHTML = `
      <div class="row align-items-stretch g-4">

        <!-- SENSORES -->
        <div class="col-md-6 d-flex flex-column gap-3">

          <!-- Temperatura -->
          <div class="card border-0 shadow-sm flex-fill" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4">
              <span class="fw-bold fs-5">🌡️ Temperatura</span>
              <span class="fw-bold fs-5 text-danger">
                ${lectura.temperatura} °C
              </span>
            </div>
          </div>

          <!-- Humedad -->
          <div class="card border-0 shadow-sm flex-fill" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4">
              <span class="fw-bold fs-5">💧 Humedad</span>
              <span class="fw-bold fs-5 text-primary">
                ${lectura.humedad} %
              </span>
            </div>
          </div>

          <!-- Motor / Ventilador -->
          <div class="card border-0 shadow-sm flex-fill" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4">
              <span class="fw-bold fs-5">🌬️ Ventilador</span>
              ${
                lectura.motorActivo
                  ? `<span class="badge bg-danger fs-6">Activo</span>`
                  : `<span class="badge bg-success fs-6">Inactivo</span>`
              }
            </div>
          </div>

          <!-- Fecha -->
          <div class="card border-0 shadow-sm flex-fill" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4">
              <span class="fw-bold fs-5">📅 Fecha</span>
              <span class="fw-bold fs-5">
                ${fecha.toLocaleDateString()}
              </span>
            </div>
          </div>

          <!-- Hora -->
          <div class="card border-0 shadow-sm flex-fill" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4">
              <span class="fw-bold fs-5">⏰ Hora</span>
              <span class="fw-bold fs-5">
                ${fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

        </div>

        <!-- IMAGEN -->
        <div class="col-md-6">
          <div class="card h-100 border-0 shadow-sm position-relative"
            style="border-radius: 16px; overflow: hidden;">

            <!-- Overlay fecha y hora -->
            <div style="
              position: absolute;
              top: 12px;
              left: 12px;
              background: rgba(0,0,0,0.55);
              color: #fff;
              padding: 6px 12px;
              border-radius: 10px;
              font-size: 0.85rem;
              backdrop-filter: blur(4px);
              z-index: 2;
            ">
              <div>📅 ${fecha.toLocaleDateString()}</div>
              <div>⏰ ${fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>

            <img 
              src="/api/imagenes/${lectura.imagen_id}"
              alt="Imagen de la lectura"
              class="w-100 h-100"
              style="object-fit: cover;"
            >
          </div>
        </div>

      </div>
    `;
  } catch (error) {
    console.error("Error cargando detalles:", error);
  }
});
