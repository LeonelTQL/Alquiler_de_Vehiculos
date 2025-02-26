window.onload = function () {
    listarClientes();
}

let objClientes;
async function listarClientes() {
    objClientes = {
        url: "Clientes/listarClientes",
        cabeceras: ["ID Cliente", "Nombre", "Apellidos", "Teléfono", "Email"],
        propiedades: ["idCliente", "nombre", "apellidos", "telefono", "email"],
        divContenedorTabla: "divContenedorTabla",
        editar: true,
        eliminar: true
    };
    pintar(objClientes);
}


function buscarCliente() {
    let forma = document.getElementById("frmBusquedaCliente");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarClientes();
        return;
    }
    fetchpost("Reservas/filtrarClientes", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarClientes() {
    LimpiarDatos("frmBusquedaCliente");
    listarClientes();
}

function AgregarCliente() {
    let forma = document.getElementById("frmGuardarCliente");
    let frm = new FormData(forma);
    fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
        if (res === "1") {
            listarClientes();

        }
    });
}

function obtenerCliente(id) {
    fetchget("Clientes/obtenerCliente?id=" + id, function (data) {
        document.getElementById("idCliente").value = data.idCliente;
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("apellidos").value = data.apellidos;
        document.getElementById("telefono").value = data.telefono;
        document.getElementById("email").value = data.email;
    });
}

function EliminarCliente(id) {
    fetchget("Clientes/eliminarCliente?id=" + id, function (data) {
        if (data === "1") {
            listarClientes();
        }
    });
}

function FiltrarClientes() {
    let forma = document.getElementById("frmBusquedaCliente");
    let frm = new FormData(forma);
    fetchpost("Clientes/filtrarClientes", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}