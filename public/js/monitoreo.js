document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/lecturas/ultimas");
    const lecturas = await res.json();

    const carousel = document.querySelector(".carousel-inner");
    const cards = document.getElementById("lecturasContainer");

    carousel.innerHTML = "";
    cards.innerHTML = "";

    lecturas.forEach((l, index) => {

      carousel.innerHTML += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img 
            src="/api/imagenes/${l.imagen_id}" 
            class="d-block w-100 rounded"
            alt="Lectura"
          >
        </div>
      `;

      cards.innerHTML += `
        <div class="col-12">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <small class="text-muted">
                ${new Date(l.createdAt).toLocaleString()}
              </small>

              <div class="d-flex justify-content-between mt-2">
                <span>🌡️ Temperatura</span>
                <strong>${l.temperatura} °C</strong>
              </div>

              <div class="d-flex justify-content-between">
                <span>💧 Humedad</span>
                <strong>${l.humedad} %</strong>
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
