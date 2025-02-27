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


function buscarReservas() {
    let forma = document.getElementById("frmBusquedaReservas");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = ""; 
        listarReservas();
        return;
    }
    fetchpost("Reservas/filtrarReservas", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarReservas() {
    LimpiarDatos("frmBusquedaReservas");
    listarReservas();
}

function guardarReservas() {
    let forma = document.getElementById("frmGuardarReservas");
    let frm = new FormData(forma);
    fetchpost("Reservas/guardarReservas", "text", frm, function (res) {
        if (res === "1") {
            listarReservas();

        }
    });
}

