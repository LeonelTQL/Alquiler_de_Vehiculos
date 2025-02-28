window.onload = function () {
    listarPagos();
}

let objPagos;
async function listarPagos() {
    objPagos = {
        url: "Pagos/listarPagos",
        cabeceras: ["ID Pago", "ID Reserva", "Cliente", "Vehiculo", "Monto","Metodo de Pago","Fecha de Pago"],
        propiedades: ["idPago", "reservaId", "nombreCliente", "vehiculo", "monto", "metodoPago","fechaPago"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idPago",
        editar: true,
        eliminar: true
    };
    pintar(objPagos);
}


function buscarPagos() {
    let forma = document.getElementById("frmBusquedaPagos");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarPagos();
        return;
    }
    fetchpost("Pagos/filtrarPagos", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarPagos(idFormulario) {
    LimpiarDatos(idFormulario);
    listarPagos();
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el pago", function () {
        console.log(id);
        fetchGet(`Pagos/eliminarPagos?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarPagos();
            } else {
                alert("No se pudo eliminar el pago");
            }
        });
    });
}