window.onload = function () {
    listarReservas();
};

let objReservas;
async function listarReservas() {
    objReservas = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID Reserva", "Nombre Cliente", "Vehículo", "Fecha Inicio", "Fecha Fin", "Estado"],
        propiedades: ["idReservas", "nombreCliente", "vehiculo", "fechaInicio", "fechaFin", "estado"],
        divContenedorTabla: "divContenedorTabla",
        editar: true,
        eliminar: true
    };
    pintar(objReservas);
}
