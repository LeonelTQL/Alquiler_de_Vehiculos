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