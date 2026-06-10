window.onload = function () {
    listarClientes();
    const idCliente = 1;

    Recuperar(idCliente);

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

    let nombre = frm.get("nombre").trim();
    let apellido = frm.get("apellido").trim();
    let telefono = frm.get("telefono").trim();
    let email = frm.get("email").trim();

    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!telefono.trim()) {
        Error("El Teléfono es obligatorio.");
        return;
    }
    if (!email.trim()) {
        Error("El Email es obligatorio.");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@email\.com$/;
    if (!emailPattern.test(email)) {
        Error("El Email debe ser del tipo 'usuario@email.com'.");
        return;
    }
    Confirmacion(undefined, undefined, function () {
        fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
            if (res === "1") {
                listarClientes();
                Exito("Se registro con éxito");
                const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
                if (registerModal) {
                    registerModal.hide();
                }
            } else {
                Error("No se pudo guardar cliente")
            }
        });
    });
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el cliente", function () {
        fetchGet(`Cliente/eliminarClientes?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarClientes();
                Exito("Se eliminó con éxito el cliente");
            } else {
                Error("No se pudo eliminar el cliente");
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
            Error('No se pudieron recuperar los datos del cliente');
        }
    });
}

function Recuperar(id) {
    fetchGet(`Cliente/recuperarClientes?idCliente=${id}`, "json", function (Clientes) {
        if (Clientes) {

            document.getElementById("txtidCliente").value = Clientes.idCliente || '';
            document.getElementById("txtnombre").value = Clientes.nombre || '';
            document.getElementById("txtapellido").value = Clientes.apellido || '';
            document.getElementById("txttelefono").value = Clientes.telefono || '';
            document.getElementById("txtemail").value = Clientes.email || '';
        } else {
            console.error('No se encontraron datos para el cliente con ID:', id);

            Error('No se pudieron recuperar los datos del cliente');
        }
    }, function (error) {

        console.error('Error en la solicitud:', error);
        Error('Hubo un problema al recuperar los datos');
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarClientes");
    let frm = new FormData(frmEditar);

    let nombre = frm.get("nombre").trim();
    let apellido = frm.get("apellido").trim();
    let telefono = frm.get("telefono").trim();
    let email = frm.get("email").trim();

    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!telefono.trim()) {
        Error("El Teléfono es obligatorio.");
        return;
    }
    if (!email.trim()) {
        Error("El Email es obligatorio.");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@email\.com$/;
    if (!emailPattern.test(email)) {
        Error("El Email debe ser del tipo 'usuario@email.com'.");
        return;
    }
    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
            if (res == "1") {
                Exito("Cliente editado correctamente");
                listarClientes();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error("No se pudo editar el cliente");
            }
        });
    });
}

function guardarEdicio() {
    let frmEditar = document.getElementById("frmEditarClientes");
    let frm = new FormData(frmEditar);

    let nombre = frm.get("nombre").trim();
    let apellido = frm.get("apellido").trim();
    let telefono = frm.get("telefono").trim();
    let email = frm.get("email").trim();

    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!telefono.trim()) {
        Error("El Teléfono es obligatorio.");
        return;
    }
    if (!email.trim()) {
        Error("El Email es obligatorio.");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@email\.com$/;
    if (!emailPattern.test(email)) {
        Error("El Email debe ser del tipo 'usuario@email.com'.");
        return;
    }

    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Cliente/guardarClientes", "text", frm, function (res) {
            if (res == "1") {
                Exito("Cliente editado correctamente");
            } else {
                Error("No se pudo editar el cliente");
            }
        });
    });
    document.getElementById("txtnombre").readOnly = true;
    document.getElementById("txtapellido").readOnly = true;
    document.getElementById("txttelefono").readOnly = true;
    document.getElementById("txtemail").readOnly = true;


    document.getElementById("btnEditar").style.display = "inline-block";
    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none";
}
function activarEdicion() {

    document.getElementById("txtnombre").removeAttribute("readonly");
    document.getElementById("txtapellido").removeAttribute("readonly");
    document.getElementById("txttelefono").removeAttribute("readonly");
    document.getElementById("txtemail").removeAttribute("readonly");


    document.getElementById("btnEditar").style.display = "none";
    document.getElementById("btnGuardar").style.display = "inline-block";
    document.getElementById("btnCancelar").style.display = "inline-block";
}

function cancelarEdicion() {

    Recuperar(1);
    document.getElementById("txtnombre").readOnly = true;
    document.getElementById("txtapellido").readOnly = true;
    document.getElementById("txttelefono").readOnly = true;
    document.getElementById("txtemail").readOnly = true;


    document.getElementById("btnEditar").style.display = "inline-block";
    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none";
}