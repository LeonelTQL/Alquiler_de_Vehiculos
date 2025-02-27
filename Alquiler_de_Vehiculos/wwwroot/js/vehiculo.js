window.onload = function () {
    listarVehiculos();
}

let objVehiculos;
async function listarVehiculos() {
    objVehiculos = {
        url: "Vehiculo/listarVehiculos",
        cabeceras: ["ID Vehiculo", "Marca", "Modelo", "Año", "Precio", "Estado"],
        propiedades: ["idVehiculo", "marca", "modelo", "anio", "precio","estado"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idVehiculo",
        editar: true,
        eliminar: true
    };
    pintar(objVehiculos);
}

function buscarVehiculos() {
    let forma = document.getElementById("frmBusquedaVehiculos");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarVehiculos();
        return;
    }
    fetchpost("Vehiculo/filtrarVehiculos", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarVehiculos(idFormulario) {
    LimpiarDatos(idFormulario);
    listarVehiculos();
}

function guardarVehiculos() {
    let forma = document.getElementById("frmGuardarVehiculos");
    let frm = new FormData(forma);

    Confirmacion(undefined, undefined, function () {
        fetchpost("Vehiculo/guardarVehiculos", "text", frm, function (res) {
            if (res === "1") {
                listarVehiculos();

            }
        });
    });
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el Vehiculo", function () {
        fetchGet(`Vehiculo/eliminarVehiculos?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarVehiculos();
            } else {
                alert("No se pudo eliminar el Vehiculo");
            }
        });
    });
}