window.onload = function () {
    listarSeguros();
    actualizarCostoSeguro();
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
function guardarSeguros() {
    let forma = document.getElementById("frmGuardarSeguros");
    let frm = new FormData(forma);
    Confirmacion(undefined, undefined, function () {
        fetchpost("Seguros/guardarSeguros", "text", frm, function (res) {
            console.log("Respuesta del servidor al guardar:", res);
            if (res === "1") {
                listarSeguros();
                Exito("Seguro guardado correctamente");
            } else {
                Error("Error al guardar el seguro");
            }
        });
    });
}

function actualizarCostoSeguro() {
    const tipoSeguro = document.getElementById("cboTipoSeguro").value;
    let costo = 0;

    switch (tipoSeguro) {
        case "Basico":
            costo = 100;
            break;
        case "Intermedio":
            costo = 200;
            break;
        case "Premium":
            costo = 300;
            break;
    }

    document.getElementById("txtCostoSeguro").value = costo;
}

function actualizarCostoSeguroModal() {
    const tipoSeguro = document.getElementById("cboTipoSeguroModal").value;
    let costo = 0;

    switch (tipoSeguro) {
        case "Basico":
            costo = 100;
            break;
        case "Intermedio":
            costo = 200;
            break;
        case "Premium":
            costo = 300;
            break;
    }

    document.getElementById("txtCostoModal").value = costo;
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

function Editar(id) {
    fetchGet("Seguros/recuperarSeguros?idSeguro=" + id, "json", function (seguro) {
        console.log("Datos de seguro recuperados:", seguro);

        if (seguro) {
            document.getElementById("txtidSegurosModal").value = seguro.idSeguro;
            document.getElementById("txtidReservasModal").value = seguro.reservaId;
            document.getElementById("cboTipoSeguroModal").value = seguro.tipoSeguro;
            document.getElementById("txtCostoModal").value = seguro.costo;

            var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
            cerrarModal('exampleModal');
        } else {
            console.error('No se encontraron datos para el seguro con ID:', id);
        }
    });
}

function guardarEdicion() {
    let frmEditar = document.getElementById("frmEditarSeguros");
    let frm = new FormData(frmEditar);

    Confirmacion("Confirmar", "¿Desea guardar los cambios?", function () {
        fetchpost("Seguros/guardarSeguros", "text", frm, function (res) {
            console.log("Respuesta del servidor en guardarEdicion:", res);
            if (res == "1") {
                Exito();
                listarSeguros();
                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
            } else {
                Error();
                console.error("Error al guardar la edición. Código: " + res);
            }
        });
    });
}
