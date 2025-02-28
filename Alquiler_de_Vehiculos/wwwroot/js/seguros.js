window.onload = function () {
    listarSeguros();
}

let objSeguros;
async function listarSeguros() {
    objSeguros = {
        url: "Seguros/listarSeguros",
        cabeceras: ["ID Seguro", "ID Reserva", "Cliente", "Vehiculo", "Tipo de Seguro", "Precio"],
        propiedades: ["idSeguro", "reservaId", "nombreCliente", "vehiculo", "tipoSeguro", "costo"],
        divContenedorTabla: "divContenedorTabla",
        propiedadId: "idSeguro",
        editar: true,
        eliminar: true
    };
    pintar(objSeguros);
}

function buscarSeguros() {
    let forma = document.getElementById("frmBusquedaSeguros");
    let frm = new FormData(forma);
    let terminoBusqueda = frm.get("terminoBusqueda") || "";


    if (terminoBusqueda.trim() === "") {
        document.getElementById("divContenedorTabla").innerHTML = "";
        listarSeguros();
        return;
    }
    fetchpost("Seguros/filtrarSeguros", "json", frm, function (data) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(data);
    });
}

function limpiarSeguros(idFormulario) {
    LimpiarDatos(idFormulario);
    listarSeguros();
}

function Eliminar(id) {

    Confirmacion("Eliminar", "Desea eliminar el seguro", function () {
        console.log(id);
        fetchGet(`Seguros/eliminarSeguros?id=${id}`, "text", function (data) {
            if (data === "1") {
                listarSeguros();
            } else {
                alert("No se pudo eliminar el seguro");
            }
        });
    });
}