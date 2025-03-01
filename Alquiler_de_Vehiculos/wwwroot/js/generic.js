

function get(valor) {
    return document.getElementById(valor).value;
}

function set(idControl, valor) {
    document.getElementById(idControl).value = valor;
}

async function fetchGet(url, tiporespuesta, callback) {
    try {
        let raiz = document.getElementById("hdfOculto").value;
        let urlCompleta = window.location.protocol + "//" + window.location.host + "/" + raiz + url;

        console.log("Haciendo GET a:", urlCompleta);

        let res = await fetch(urlCompleta);
        console.log("Respuesta HTTP:", res.status, res.statusText);

        // Verificar si la respuesta es exitosa
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        }

        // Clonamos la respuesta para poder leerla dos veces
        const resCopy = res.clone();

        // Leer el texto sin procesar para depuración
        const rawText = await resCopy.text();
        console.log("Respuesta en texto crudo:", rawText);

        let data;
        if (tiporespuesta === "json") {
            // Solo intenta analizar como JSON si hay contenido
            if (rawText.trim() === "") {
                console.error("Respuesta vacía cuando se esperaba JSON");
                data = null;
            } else {
                try {
                    data = JSON.parse(rawText);
                } catch (e) {
                    console.error("Error al parsear JSON:", e);
                    console.log("Texto que falló al parsear:", rawText);
                    throw new Error("Respuesta no es JSON válido: " + e.message);
                }
            }
        } else if (tiporespuesta === "text") {
            data = rawText;
        } else {
            data = res;
        }

        console.log("Datos procesados:", data);
        callback(data);
    } catch (e) {
        console.error("Error en fetchGet:", e);
        alert("Algo salió mal: " + e.message);
    }
}

let objconfigurationGlobal;

async function fetchpost(url, tiporespuesta, frm, callback) {
    try {
        let raiz = document.getElementById("hdfOculto").value;
        let urlCompleta = window.location.protocol + "//" + window.location.host + "/" + raiz + url;

        console.log("Enviando datos:", {
            url: urlCompleta,
            tiporespuesta: tiporespuesta,
            datos: Object.fromEntries(frm.entries())
        });

        let res = await fetch(urlCompleta, {
            method: "POST",
            body: frm,
        });

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        }


        const resCopy = res.clone();
        const rawText = await resCopy.text();
        console.log("Respuesta en texto crudo:", rawText);

        let data;
        if (tiporespuesta === "json") {
            if (rawText.trim() === "") {
                console.error("Respuesta vacía cuando se esperaba JSON");
                data = null;
            } else {
                try {
                    data = JSON.parse(rawText);
                } catch (e) {
                    console.error("Error al parsear JSON:", e);
                    console.log("Texto que falló al parsear:", rawText);
                    data = rawText; 
                }
            }
        } else if (tiporespuesta === "text") {
            data = rawText;
        } else {
            data = res;
        }

        console.log("Datos procesados:", data);
        callback(data);

    } catch (e) {
        console.error("Ocurrio un problema en post:", e);
        alert("Ocurrio un problema en post: " + e.message);
    }
}
function pintar(objConfiguration) {
    objconfigurationGlobal = objConfiguration;

    if (objconfigurationGlobal.divContenedorTabla == undefined) {
        objconfigurationGlobal.divContenedorTabla = "divContenedorTabla";
    }

    if (objconfigurationGlobal.editar == undefined) {
        objconfigurationGlobal.editar = false;
    }
    if (objconfigurationGlobal.eliminar == undefined) {
        objconfigurationGlobal.eliminar = false;
    }
    if (objconfigurationGlobal.propiedadId == undefined) {
        objconfigurationGlobal.propiedadId = "";
    }
    fetchGet(objConfiguration.url, "json", function (res) {
        let contenido = "";
        contenido += "<div id='" + objconfigurationGlobal.divContenedorTabla + "'>";
        contenido += generarTabla(res);
        contenido += "</div>";
        document.getElementById("divtabla").innerHTML = contenido;
    });
}

function generarTabla(res) {
    let contenido = "";
    let gCabeceras = objconfigurationGlobal.cabeceras;
    let gPropiedades = objconfigurationGlobal.propiedades;
    let nroRegistros = res.length;

    contenido += "<table class='table'>";
    contenido += "<thead><tr>";

    for (let i = 0; i < gCabeceras.length; i++) {
        contenido += "<th>" + gCabeceras[i] + "</th>";
    }

    if (objconfigurationGlobal.editar == true || objconfigurationGlobal.eliminar == true) {
        contenido += "<th>Operaciones</th>";
    }

    contenido += "</tr></thead><tbody>";

    for (let i = 0; i < nroRegistros; i++) {
        let obj = res[i];
        contenido += "<tr>";

        for (let j = 0; j < gPropiedades.length; j++) {
            let propiedadActual = gPropiedades[j];
            contenido += "<td>" + obj[propiedadActual] + "</td>";
        }

        if (objconfigurationGlobal.editar == true || objconfigurationGlobal.eliminar == true) {
            let propiedadId = objconfigurationGlobal.propiedadId;
            contenido += "<td>";
            if (objconfigurationGlobal.editar == true) {
                contenido += `<i onclick="Editar(${obj[propiedadId]})" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            </i>`;
            }
            if (objconfigurationGlobal.eliminar == true) {
                contenido += `<i onclick="Eliminar(${obj[propiedadId]})" class = "btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg></i>`;
            }
            contenido += "</td>";
        }

        contenido += "</tr>";
    }

    contenido += "</tbody></table>";
    return contenido;
}

function setN(namecontrol, valor) {
    document.getElementsByName(namecontrol)[0].value = valor;
}

function getN(namecontrol) {
    return document.getElementsByName(namecontrol)[0].value;
}

function LimpiarDatos(idFormulario) {
    let elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    console.log(elementos);
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].value = "";
    }
}


function recuperar(url, idFormulario) {
    let elementosName = document.querySelectorAll("#" + idFormulario + " [name]");

    fetchGet(url, "json", function (data) {
        console.log("Datos recibidos:", data);
        for (let i = 0; i < elementosName.length; i++) {
            let nombrename = elementosName[i].name;
            setN(nombrename, data[nombrename]);

        }
    });
}



function Confirmacion(titulo = "Confirmacion", texto = "Desea guardar los cambios", callback) {
    return Swal.fire({
        title: titulo,
        text: texto,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

function Exito() {
    toastr.options = {
        "closeButton": true,
        //"debug": false,
        //"newestOnTop": false,
        //"progressBar": false,
        "positionClass": "toast-top-right",
        //"preventDuplicates": false,
        //"onclick": null,
        //"showDuration": "300",
        //"hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        //"showEasing": "swing",
        //"hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    toastr.success("Guardado correctamente");
}

function Error() {
    toastr.options = {
        "positionClass": "toast-top-right",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.error("No se pudo guardar");
}

function cerrarModal(modalId) {

    var modalElement = document.getElementById(modalId);

    if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', function () {
           
            let backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }

            document.body.classList.remove('modal-open');
            document.body.style.overflow = 'auto';
        });
    }
}

function llenarCombo(data, idControl, propiedadId, propiedadNombre) {
    let contenido = "<option value=''>--Seleccione--</option>";
    for (let i = 0; i < data.length; i++) {
        contenido += `<option value='${data[i][propiedadId]}'>${data[i][propiedadNombre]}</option>`;
    }
    document.getElementById(idControl).innerHTML = contenido;
}
