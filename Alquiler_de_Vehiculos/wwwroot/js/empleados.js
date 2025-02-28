window.onload = function () {
    listarEmpleados();
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

    Confirmacion(undefined, undefined, function () {
        fetchpost("Empleados/guardarEmpleados", "text", frm, function (res) {
            if (res === "1") {
                listarEmpleados();

            }
        });
    });
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el Empleado", function () {
        fetchGet(`Empleados/eliminarEmpleados?id=${id}`, "text", function (data) {
            if (data === "1") {
                console.log(data);
                listarEmpleados();
            } else {
                alert("No se pudo eliminar el Empleado");
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
            console.error('No se encontraron datos para el empleado con ID:', id);
        }
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarEmpleados");
    let frm = new FormData(frmEditar);


    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Empleados/guardarEmpleados", "text", frm, function (res) {
            if (res == "1") {
                Exito();
                listarEmpleados();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
            }
        });
    });
}