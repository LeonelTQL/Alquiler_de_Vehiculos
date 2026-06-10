window.onload = function () {
    listarEmpleados();
    const idEmpleado = 1;

    Recuperar(idEmpleado);
}

let objEmpleados;
async function listarEmpleados() {
    objEmpleados = {
        url: "Empleados/listarEmpleados",
        cabeceras: ["ID Empleado", "Nombre", "Apellido", "Cargo", "Teléfono", "Email"],
        propiedades: ["idEmpleado", "nombre", "apellido", "cargo", "telefono", "email"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idEmpleado",
        editar: true,
        eliminar: true
    };
    pintar(objEmpleados);
}
function buscarEmpleados() {
    let forma = document.getElementById("frmBusquedaEmpleados");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarEmpleados();
        return;
    }
    fetchpost("Empleados/filtrarEmpleados", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarEmpleados(idFormulario) {
    LimpiarDatos(idFormulario);
    listarEmpleados();
}

function guardarEmpleados() {
    let forma = document.getElementById("frmGuardarEmpleados");
    let frm = new FormData(forma);

    let nombre = frm.get("nombre");
    let apellido = frm.get("apellido");
    let cargo = frm.get("cargo");
    let telefono = frm.get("telefono");
    let email = frm.get("email");
    

    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!cargo.trim()) {
        Error("El Cargo es obligatorio.");
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
        fetchpost("Empleados/guardarEmpleados", "text", frm, function (res) {
            if (res === "1") {
                Exito("Empleado registrado con éxito");
                listarEmpleados();
            } else {
                Error("No se pudo guardar Empleado")
            }
        });
    });
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el Empleado", function () {
        fetchGet(`Empleados/eliminarEmpleados?id=${id}`, "text", function (data) {
            if (data === "1") {
                Exito("Empleado eliminado con éxito");
                listarEmpleados();
            } else {
                Error("No se pudo eliminar el Empleado");

            }
        });
    });
}


function Editar(id) {


    fetchGet("Empleados/recuperarEmpleados?idEmpleado=" + id, "json", function (Empleados) {

        if (Empleados) {

            document.getElementById("txtidempleadoModal").value = Empleados.idEmpleado || '';
            document.getElementById("txtnombreModal").value = Empleados.nombre || '';
            document.getElementById("txtapellidoModal").value = Empleados.apellido || '';
            document.getElementById("txtcargoModal").value = Empleados.cargo || '';
            document.getElementById("txttelefonoModal").value = Empleados.telefono || '';
            document.getElementById("txtemailModal").value = Empleados.email || '';

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
            cerrarModal('exampleModal');
        } else {
            Error('No se encontraron datos para el empleado con ID:', id);
        }
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarEmpleados");
    let frm = new FormData(frmEditar);

    let nombre = frm.get("nombre");
    let apellido = frm.get("apellido");
    let cargo = frm.get("cargo");
    let telefono = frm.get("telefono");
    let email = frm.get("email");


    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!cargo.trim()) {
        Error("El Cargo es obligatorio.");
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
        fetchpost("Empleados/guardarEmpleados", "text", frm, function (res) {
            if (res == "1") {
                Exito("Empleado editado correctamente");
                listarEmpleados();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error("No se pudo editar el empleado");
            }
        });
    });
}

function Recuperar(id) {
    fetchGet("Empleados/recuperarEmpleados?idEmpleado=" + id, "json", function (Empleados) {
        if (Empleados) {

            document.getElementById("txtidEmpleado").value = Empleados.idEmpleado || '';
            document.getElementById("txtnombre").value = Empleados.nombre || '';
            document.getElementById("txtapellido").value = Empleados.apellido || '';
            document.getElementById("txtcargo").value = Empleados.cargo || '';
            document.getElementById("txttelefono").value = Empleados.telefono || '';
            document.getElementById("txtemail").value = Empleados.email || '';
        } else {
            console.error('No se encontraron datos para el empleado con ID:', id);

            Error('No se pudieron recuperar los datos del empleado');
        }
    }, function (error) {

        console.error('Error en la solicitud:', error);
        Error('Hubo un problema al recuperar los datos');
    });
}

function guardarEdicio() {
    let frmEditar = document.getElementById("frmEditarAdmin");
    let frm = new FormData(frmEditar);

    let nombre = frm.get("nombre");
    let apellido = frm.get("apellido");
    let cargo = frm.get("cargo");
    let telefono = frm.get("telefono");
    let email = frm.get("email");


    if (!nombre.trim()) {
        Error("El Nombre es obligatorio.");
        return;
    }
    if (!apellido.trim()) {
        Error("El Apellido es obligatorio.");
        return;
    }
    if (!cargo.trim()) {
        Error("El Cargo es obligatorio.");
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
        fetchpost("Empleados/guardarEmpleados", "text", frm, function (res) {
            if (res == "1") {
                Exito("Empleado editado correctamente");
            } else {
                Error("No se puedo editar el empleado");
            }
        });
    });
    document.getElementById("txtnombre").readOnly = true;
    document.getElementById("txtapellido").readOnly = true;
    document.getElementById("txtcargo").readOnly = true;
    document.getElementById("txttelefono").readOnly = true;
    document.getElementById("txtemail").readOnly = true;


    document.getElementById("btnEditar").style.display = "inline-block";
    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none";
}
function activarEdicion() {

    document.getElementById("txtnombre").removeAttribute("readonly");
    document.getElementById("txtapellido").removeAttribute("readonly");
    document.getElementById("txtcargo").removeAttribute("readonly");
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
    document.getElementById("txtcargo").readOnly = true;
    document.getElementById("txttelefono").readOnly = true;
    document.getElementById("txtemail").readOnly = true;


    document.getElementById("btnEditar").style.display = "inline-block";
    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none";
}