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


    fetchpost("Reservas/guardarReservas", "text", frm, function (res) {
        console.log("Respuesta del servidor:", res);
        if (res === "1") {
            console.log("Reserva guardada correctamente.");
            listarReservas();
        } else {
            console.error("Error al guardar la reserva. Respuesta inesperada:", res);
        }
    });
}


async function cargarClientes() {
    try {

        const response = await fetch("Cliente/listarClientes");
        if (!response.ok) throw new Error(`Error al cargar clientes: ${response.statusText}`);

        const data = await response.json();
        console.log("Respuesta de la API de clientes:", data);

        if (!Array.isArray(data)) {
            throw new Error("La respuesta de la API no es una lista de clientes.");
        }

        const clienteDropdown = document.getElementById("idCliente");
        if (!clienteDropdown) {
            throw new Error("No se encontró el elemento con ID 'idCliente'.");
        }


        clienteDropdown.innerHTML = '<option value="">Seleccione un cliente</option>';

        data.forEach(cliente => {
            if (!cliente.idCliente || !cliente.nombre) {
                console.warn("Cliente inválido en la API:", cliente);
                return;
            }
            const option = document.createElement("option");
            option.value = cliente.idCliente;
            option.textContent = cliente.nombre;
            clienteDropdown.appendChild(option);
        });


    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}


async function cargarVehiculos() {
    try {
        const response = await fetch("Vehiculo/listarVehiculos");
        if (!response.ok) throw new Error("Error al cargar vehículos.");
        const data = await response.json();
        const vehiculoDropdown = document.getElementById("idVehiculo");

        vehiculoDropdown.innerHTML = '<option value="">Seleccione un vehículo</option>';

        data.forEach(vehiculo => {
            const option = document.createElement("option");
            option.value = vehiculo.idVehiculo;
            option.textContent = vehiculo.marca;
            vehiculoDropdown.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        Error("No se pudieron cargar los vehículos.");
    }
}




function validarFechas() {
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const fechaFin = new Date(document.getElementById("fechaFin").value);

    if (fechaInicio > fechaFin) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin");
        return false;
    }

    if (fechaInicio < new Date()) {
        // alert("No se pueden hacer reservas para fechas pasadas");
        // return false;
    }

    return true;
}

