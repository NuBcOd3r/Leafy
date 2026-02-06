document.addEventListener("DOMContentLoaded", async () => {

  try {
    const partes = window.location.pathname.split("/");
    const id = partes[partes.length - 1];

    const res = await fetch(`/api/lecturas/${id}`);
    const lectura = await res.json();

    const fecha = new Date(lectura.fechaHora);

    document.getElementById("contenedorDetalles").innerHTML = `
        <h4 class="fw-semibold text-center mb-5" style="letter-spacing: 0.5px;">
            📊 Detalles de la Lectura
        </h4>

        <div class="row align-items-stretch g-4">

        <!-- Sensores -->
        <div class="col-md-6 d-flex flex-column gap-4">

            <!-- Temperatura -->
            <div class="card border-0 shadow-sm" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4 py-4">
                <span class="text-muted fw-medium">🌡️ Temperatura</span>
                <span class="fw-bold fs-4 text-danger">
                ${lectura.temperatura} °C
                </span>
            </div>
            </div>

            <!-- Humedad -->
            <div class="card border-0 shadow-sm" style="border-radius: 14px;">
            <div class="card-body d-flex justify-content-between align-items-center px-4 py-4">
                <span class="text-muted fw-medium">💧 Humedad</span>
                <span class="fw-bold fs-4 text-primary">
                ${lectura.humedad} %
                </span>
            </div>
            </div>

            <!-- Motor / Ventilador (futuro) -->
            <div class="card border-0 shadow-sm" style="border-radius: 14px; opacity: 0.7;">
            <div class="card-body d-flex justify-content-between align-items-center px-4 py-3">
                <span class="text-muted fw-medium">🌬️ Ventilador</span>
                <span class="fw-bold fs-5 ">
                Próximamente
                </span>
            </div>
            </div>

            <!-- Fecha -->
            <div class="card border-0 shadow-sm" style="border-radius: 14px; opacity: 0.7;">
            <div class="card-body d-flex justify-content-between align-items-center px-4 py-3">
                <span class="text-muted fw-medium">📅 Fecha</span>
                <span class="fw-bold fs-5">
                <div> ${fecha.toLocaleDateString()}</div>
                </span>
            </div>
            </div>

            <!-- Hora -->
            <div class="card border-0 shadow-sm" style="border-radius: 14px; opacity: 0.7;">
            <div class="card-body d-flex justify-content-between align-items-center px-4 py-3">
                <span class="text-muted fw-medium">⏰ Hora</span>
                <span class="fw-bold fs-5">
                <div>⏰ ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </span>
            </div>
            </div>
        </div>

        <!-- Imagen -->
        <div class="col-md-6">
            <div class="card border-0 shadow-sm position-relative"
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
            ">
                <div>📅 ${fecha.toLocaleDateString()}</div>
                <div>⏰ ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <img 
                src="/api/imagenes/${lectura.imagen_id}"
                alt="Imagen de la lectura"
                style="
                width: 100%;
                height: 100%;
                min-height: 320px;
                object-fit: cover;
                "
            >
            </div>
        </div>

        </div>
    `;

  } catch (error) {
    console.error("Error cargando detalles:", error);
  }
});
