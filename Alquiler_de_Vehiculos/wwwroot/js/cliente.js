window.onload = function () {
    listarClientes();

}

let objClientes;
async function listarClientes() {
    objClientes = {
        url: "Cliente/listarClientes",
        cabeceras: ["ID Cliente", "Nombre", "Apellido", "Teléfono", "Email"],
        propiedades: ["idCliente", "nombre", "apellido", "telefono", "email"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idCliente",
        editar: true,
        eliminar: true
    };
    pintar(objClientes);
}
function buscarClientes() {
    let forma = document.getElementById("frmBusquedaClientes");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarClientes();
        return;
    }
    fetchpost("Cliente/filtrarClientes", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarClientes(idFormulario) {
    LimpiarDatos(idFormulario);
    listarClientes();
}

function guardarClientes() {
    let forma = document.getElementById("frmGuardarClientes");
    let frm = new FormData(forma);

    Confirmacion(undefined, undefined, function () {
        fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
            if (res === "1") {
                listarClientes();

            }
        });
    });
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el cliente", function () {
        fetchGet(`Cliente/eliminarClientes?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarClientes();
            } else {
                alert("No se pudo eliminar el cliente");
            }
        });
    });
}

function Editar(id) {


    fetchGet("Cliente/recuperarClientes?idCliente=" + id, "json", function (Clientes) {

        if (Clientes) {

            document.getElementById("txtidClienteModal").value = Clientes.idCliente || '';
            document.getElementById("txtnombreModal").value = Clientes.nombre || '';
            document.getElementById("txtapellidoModal").value = Clientes.apellido || '';
            document.getElementById("txttelefonoModal").value = Clientes.telefono || '';
            document.getElementById("txtemailModal").value = Clientes.email || '';

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
            cerrarModal('exampleModal');
        } else {
            console.error('No se encontraron datos para el cliente con ID:', id);
        }
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarClientes");
    let frm = new FormData(frmEditar);


    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
            if (res == "1") {
                Exito();
                listarClientes();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
            }
        });
    });
}