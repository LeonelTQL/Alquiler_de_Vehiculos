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

function Editar(id) {
    fetchGet("Vehiculo/recuperarVehiculos?idVehiculo=" + id, "json", function (Vehiculos) {

        if (Vehiculos) {

            document.getElementById("txtidVehiculoModal").value = Vehiculos.idVehiculo || '';
            document.getElementById("txtmarcaModal").value = Vehiculos.marca || '';
            document.getElementById("txtmodeloModal").value = Vehiculos.modelo || '';
            document.getElementById("txtanioModal").value = Vehiculos.anio || '';
            document.getElementById("txtprecioModal").value = Vehiculos.precio || '';
            document.getElementById("txtestadoModal").value = Vehiculos.estado || '';

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
            cerrarModal('exampleModal');
        } else {
            console.error('No se encontraron datos para el vehiculo con ID:', id);
        }
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarVehiculos");
    let frm = new FormData(frmEditar);


    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Vehiculo/guardarVehiculos", "text", frm, function (res) {
            if (res == "1") {
                Exito();
                listarVehiculos();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
            }
        });
    });
}