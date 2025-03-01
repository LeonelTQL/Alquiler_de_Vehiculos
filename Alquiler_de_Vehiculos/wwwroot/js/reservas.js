window.onload = function () {
    listarReservas();
    cargarClientes();
    cargarVehiculos();
};

let objReservas;
async function listarReservas() {
    objReservas = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID Reserva", "Nombre Cliente", "Vehículo", "Fecha Inicio", "Fecha Fin", "Estado"],
        propiedades: ["idReservas", "nombreCliente", "vehiculo", "fechaInicio", "fechaFin", "estado"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idReservas",
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

function limpiarReservas(idFormulario) {
    LimpiarDatos(idFormulario);
    listarReservas();
}

function guardarReservas() {
    let forma = document.getElementById("frmGuardarReservas");
    let frm = new FormData(forma);
    Confirmacion(undefined, undefined, function () {
        fetchpost("Reservas/guardarReservas", "text", frm, function (res) {
            console.log("Respuesta del servidor al guardar:", res);
            if (res === "1") {
                listarReservas();
                Exito();
            } else {
                Error();
            }
        });
    });
}

function cargarClientes() {
    fetchGet("Cliente/listarClientes", "json", function (data) {
        let clientesModificados = data.map(cliente => ({
            idCliente: cliente.idCliente,
            nombreCompleto: `${cliente.nombre} ${cliente.apellido}`
        }));

        llenarCombo(clientesModificados, "cboCliente", "idCliente", "nombreCompleto");
    });
}

function cargarVehiculos() {
    fetchGet("Vehiculo/listarVehiculos", "json", function (data) {
        console.log("Vehículos recibidos:", data);

        let vehiculosModificados = data.map(vehiculo => ({
            idVehiculo: vehiculo.idVehiculo,
            descripcion: `${vehiculo.marca} ${vehiculo.modelo}`
        }));

        llenarCombo(vehiculosModificados, "cboVehiculo", "idVehiculo", "descripcion");

        llenarCombo(vehiculosModificados, "cboVehiculoModal", "idVehiculo", "descripcion");
    });
}

function formatearFechaParaInput(fechaString) {

    let fecha = new Date(fechaString);

    
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let dia = fecha.getDate().toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar la reserva", function () {
        fetchGet(`Reservas/eliminarReservas?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarReservas();
            } else {
                alert("No se pudo eliminar la reserva");
            }
        });
    });
}
function Editar(id) {
    fetchGet("Reservas/recuperarReservas?idReserva=" + id, "json", function (reserva) {
        console.log("Datos de la reserva recuperados:", reserva);

        if (reserva) {
            document.getElementById("txtidReservasModal").value = reserva.idReservas;
            document.getElementById("txtClienteNombreModal").value = reserva.nombreCliente; 
            document.getElementById("hiddenIdClienteModal").value = reserva.idCliente;
            document.getElementById("cboVehiculoModal").value = reserva.idVehiculo;

            if (reserva.fechaInicio) {
                document.getElementById("txtfechaInicioModal").value = formatearFechaParaInput(reserva.fechaInicio);
            }

            if (reserva.fechaFin) {
                document.getElementById("txtfechaFinModal").value = formatearFechaParaInput(reserva.fechaFin);
            }

            document.getElementById("cboEstadoModal").value = reserva.estado;

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

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarReservas");
    let frm = new FormData(frmEditar);

    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Reservas/guardarReservas", "text", frm, function (res) {
            if (res == "1") {
                Exito();
                listarReservas();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
            }
        });
    });
}
