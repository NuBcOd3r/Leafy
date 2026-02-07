document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/lecturas/ultimas");
    const lecturas = await res.json();

    const carousel = document.querySelector(".carousel-inner");
    const cards = document.getElementById("lecturasContainer");

    carousel.innerHTML = "";
    cards.innerHTML = "";

    lecturas.forEach((l, index) => {
      const fecha = new Date(l.fechaHora);
      carousel.innerHTML += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img 
            src="/api/imagenes/${l.imagen_id}" 
            class="d-block w-100" 
            style="height: 430px; object-fit: cover; border-radius: 15px;"
            alt="Lectura"
          >
        </div>
      `;
      cards.innerHTML += `
        <div class="col-12 mb-3">
          <div class="card border-0 shadow-sm" style="border-radius: 12px; overflow: hidden;">
            <div class="card-body p-3">
              <div style="font-size: 0.75rem; color: #6c757d; margin-bottom: 8px; display: flex; justify-content: space-between;">
                <span>📅 ${fecha.toLocaleDateString()}</span>
                <span>⏰ ${fecha.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>

              <div style="display: flex; gap: 10px;">
                <div style="flex: 1; background: #fff5f5; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #ffe3e3;">
                  <div style="color: #dc3545; font-size: 1.2rem; font-weight: 800; line-height: 1;">${l.temperatura}°C</div>
                  <div style="font-size: 0.6rem; text-transform: uppercase; color: #a3525a; font-weight: 700; margin-top: 4px;">Temp</div>
                </div>

                <div style="flex: 1; background: #f0f7ff; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #e1efff;">
                  <div style="color: #0d6efd; font-size: 1.2rem; font-weight: 800; line-height: 1;">${l.humedad}%</div>
                  <div style="font-size: 0.6rem; text-transform: uppercase; color: #527da3; font-weight: 700; margin-top: 4px;">Humedad</div>
                </div>

                <div style="flex: 1; background: #f5fff5; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #e1efff;">
                  <div style="font-size: 1.2rem; font-weight: 800; line-height: 1;">
                    ${
                      l.motorActivo
                        ? `<span class="badge bg-danger">Activo</span>`
                        : `<span class="badge bg-success">Inactivo</span>`
                    }
                  </div>

                  <div style="font-size: 0.6rem; text-transform: uppercase; color: #527da3; font-weight: 700; margin-top: 4px;">
                    Ventilador
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Error cargando lecturas:", err);
  }
});