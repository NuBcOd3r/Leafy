document.addEventListener("DOMContentLoaded", async () => {
    const tablaCuerpo = document.getElementById("lecturasTabla"); 
    
    try {
        const res = await fetch("/api/lecturas/todas");
        const lecturas = await res.json();

        tablaCuerpo.innerHTML = "";

        lecturas.forEach((l) => {
            const fecha = new Date(l.fechaHora);
            tablaCuerpo.innerHTML += `
                <tr style="vertical-align: middle;">
                    <td style="text-align: center; font-weight: bold; color: #dc3545;">${l.temperatura}°C</td>
                    <td style="text-align: center; font-weight: bold; color: #0d6efd;">${l.humedad}%</td>
                    <td style="text-align: center;">
                        <div style="font-size: 0.9rem; font-weight: 500;">${fecha.toLocaleDateString()}</div>
                        <div style="font-size: 0.8rem; color: #6c757d;">${fecha.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td style="text-align: center;">
                        <div style="display: flex; gap: 8px; justify-content: center;">
                            <a href="detalles/${l._id}" 
                               style="color: #ffffff; background-color: #198754; padding: 6px 10px; border-radius: 6px; text-decoration: none; transition: 0.2s;"
                               title="Ver Detalles">
                                <i class="fa-solid fa-plus"></i>
                            </a>
                            
                            <a href="#" 
                               onclick="confirmarEliminar('${l._id}')"
                               style="color: #ffffff; background-color: #dc3545; padding: 6px 10px; border-radius: 6px; text-decoration: none; transition: 0.2s;"
                               title="Eliminar">
                                <i class="fa-solid fa-trash-can"></i>
                            </a>
                        </div>
                    </td>
                </tr>
            `;
        });

        // Inicialización de DataTable
        if ($.fn.DataTable.isDataTable('#tbHistorial')) {
            $('#tbHistorial').DataTable().destroy();
        }

        $('#tbHistorial').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/2.3.4/i18n/es-ES.json',
            },
            columnDefs: [
                { targets: '_all', className: 'dt-center' }
            ],
            ordering: true,
            responsive: true
        });

    } catch (err) {
        console.error("Error cargando lecturas:", err);
    }
});

async function confirmarEliminar(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`/api/lecturas/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                await Swal.fire(
                    '¡Eliminado!',
                    'La lectura ha sido borrada.',
                    'success'
                );
                location.reload();
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            Swal.fire(
                'Error',
                'No se pudo eliminar el registro.',
                'error'
            );
        }
    }
}