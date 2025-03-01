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
function guardarPagos() {
    let forma = document.getElementById("frmGuardarPagos");
    let frm = new FormData(forma);
    Confirmacion(undefined, undefined, function () {
        fetchpost("Pagos/guardarPagos", "text", frm, function (res) {
            console.log("Respuesta del servidor al guardar:", res);
            if (res === "1") {
                listarPagos();
                Exito("Pago guardado correctamente");
            } else {
                Error("Error al guardar el pago");
            }
        });
    });
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

function Editar(id) {
    fetchGet("Pagos/recuperarPagos?idPago=" + id, "json", function (pago) {
        console.log("Datos de la pago recuperados:", pago);

        if (pago) {
            document.getElementById("txtidPagosModal").value = pago.idPago;
            document.getElementById("txtidReservaModal").value = pago.reservaId;
            document.getElementById("txtMontoModal").value = pago.monto;


            if (pago.fechaPago) {
                document.getElementById("txtfechaPagoModal").value = formatearFechaParaInput(pago.fechaPago);
            }

            document.getElementById("cboMetodoPagoModal").value = pago.metodoPago;

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
            cerrarModal('exampleModal');
        } else {
            console.error('No se encontraron datos para la reserva con ID:', id);
        }
    });
}
function formatearFechaParaInput(fechaString) {

    let fecha = new Date(fechaString);


    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let dia = fecha.getDate().toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${dia}`;
}
function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarPagos");
    let frm = new FormData(frmEditar);

    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Pagos/guardarPagos", "text", frm, function (res) {
            if (res == "1") {
                Exito();
                listarPagos();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
            }
        });
    });
}