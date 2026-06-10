

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
        //alert("Algo salió mal: " + e.message);
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
        //alert("Ocurrio un problema en post: " + e.message);
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

        new DataTable('#tablaDatos', {
            language: {
                decimal: "",
                emptyTable: "No hay datos disponibles en la tabla",
                info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                infoEmpty: "Mostrando 0 a 0 de 0 entradas",
                infoFiltered: "(filtrado de _MAX_ entradas totales)",
                lengthMenu: "Mostrar _MENU_ entradas por página",
                loadingRecords: "Cargando...",
                processing: "Procesando...",
                search: "Buscar:",
                zeroRecords: "No se encontraron resultados",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                },
                aria: {
                    sortAscending: ": activar para ordenar la columna de manera ascendente",
                    sortDescending: ": activar para ordenar la columna de manera descendente"
                }
            }
        });
    });
}

function generarTabla(res) {
    let contenido = "";
    let gCabeceras = objconfigurationGlobal.cabeceras;
    let gPropiedades = objconfigurationGlobal.propiedades;

    contenido += "<table id='tablaDatos' class='table display'>";
    contenido += "<thead><tr>";

    for (let i = 0; i < gCabeceras.length; i++) {
        contenido += "<th>" + gCabeceras[i] + "</th>";
    }

    if (objconfigurationGlobal.editar || objconfigurationGlobal.eliminar) {
        contenido += "<th>Operaciones</th>";
    }

    contenido += "</tr></thead><tbody>";

    res.forEach(obj => {
        contenido += "<tr>";
        gPropiedades.forEach(prop => {
            contenido += "<td>" + obj[prop] + "</td>";
        });

        if (objconfigurationGlobal.editar || objconfigurationGlobal.eliminar) {
            contenido += "<td>";
            if (objconfigurationGlobal.editar) {
                contenido += `<button onclick="Editar(${obj[objconfigurationGlobal.propiedadId]})" class="btn btn-info">Editar</button>`;
            }
            if (objconfigurationGlobal.eliminar) {
                contenido += `<button onclick="Eliminar(${obj[objconfigurationGlobal.propiedadId]})" class="btn btn-danger">Eliminar</button>`;
            }
            contenido += "</td>";
        }
        contenido += "</tr>";
    });

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

function activarModoOscuro() {
    // Cambia la clase en el documento raíz (html) y actualiza localStorage
    document.documentElement.classList.toggle("modo-oscuro");
    localStorage.setItem("modoOscuro", document.documentElement.classList.contains("modo-oscuro"));
}

function aplicarModoOscuro() {
    // Verifica si el modo oscuro está activado desde localStorage
    if (localStorage.getItem("modoOscuro") === "true") {
        document.documentElement.classList.add("modo-oscuro");
        inputSwitch.checked = true;
        bolita.style.transform = "translateX(30px)";  
    } else {
        bolita.style.transform = "translateX(0)";  
    }
}

document.addEventListener("DOMContentLoaded", function () {
    aplicarModoOscuro(); 

    inputSwitch.addEventListener("change", function () {
        if (inputSwitch.checked) {
            // Activa el modo oscuro
            document.documentElement.classList.add("modo-oscuro");
            bolita.style.transform = "translateX(30px)";  
        } else {
            // Desactiva el modo oscuro
            document.documentElement.classList.remove("modo-oscuro");
            bolita.style.transform = "translateX(0)"; 
        }

    
        localStorage.setItem("modoOscuro", inputSwitch.checked);
    });
});

// Código para el toggle switch, creado dinámicamente
const contenedorSwitch = document.createElement("div");
contenedorSwitch.style.position = "fixed";
contenedorSwitch.style.top = "20px";
contenedorSwitch.style.right = "120px";
contenedorSwitch.style.zIndex = "1000";

// Crear el toggle switch
const toggleSwitch = document.createElement("label");
toggleSwitch.style.display = "inline-block";
toggleSwitch.style.position = "relative";
toggleSwitch.style.width = "60px";
toggleSwitch.style.height = "30px";
toggleSwitch.style.cursor = "pointer";

// Crear el input tipo checkbox
const inputSwitch = document.createElement("input");
inputSwitch.type = "checkbox";
inputSwitch.style.display = "none";

// Estilo del toggle
const slider = document.createElement("span");
slider.style.position = "absolute";
slider.style.cursor = "pointer";
slider.style.top = "0";
slider.style.left = "0";
slider.style.right = "0";
slider.style.bottom = "0";
slider.style.backgroundColor = "#5b3a8a";
slider.style.transition = "0.3s";
slider.style.borderRadius = "50px";

// Crear la bolita del toggle
const bolita = document.createElement("span");
bolita.style.position = "absolute";
bolita.style.top = "3px";
bolita.style.left = "3px";
bolita.style.width = "24px";
bolita.style.height = "24px";
bolita.style.borderRadius = "50%";
bolita.style.backgroundColor = "#fff";
bolita.style.transition = "0.3s";

// Agregar la bolita y el slider al toggle
slider.appendChild(bolita);
toggleSwitch.appendChild(inputSwitch);
toggleSwitch.appendChild(slider);

// Agregar el toggle al contenedor y al documento
contenedorSwitch.appendChild(toggleSwitch);
document.body.appendChild(contenedorSwitch);


// Estilos CSS para el modo oscuro
document.head.insertAdjacentHTML("beforeend", `
    <style>
        .modo-oscuro, .modo-oscuro body {
            background-color: #2a1a40;
            color: #e0d7ff;
        }
        .modo-oscuro h1, .modo-oscuro h2, .modo-oscuro h3, .modo-oscuro h4, .modo-oscuro h5, .modo-oscuro h6, .modo-oscuro p, .modo-oscuro span, .modo-oscuro a {
            color: #e0d7ff;
        }
        .modo-oscuro table {
            background-color: #3a2a5e;
            color: #e0d7ff;
        }
        .modo-oscuro th, .modo-oscuro td {
            border-color: #5b3a8a;
        }
        .modo-oscuro button {
            background-color: #5b3a8a;
            color: white;
            border: 1px solid #6d4bbf;
        }
        .modo-oscuro button:hover {
            background-color: #7a5ed3;
        }
        .modo-oscuro input, .modo-oscuro textarea, .modo-oscuro select {
            background-color: #3a2a5e;
            color: #e0d7ff;
            border: 1px solid #5b3a8a;
        }
        .modo-oscuro input::placeholder, .modo-oscuro textarea::placeholder {
            color: #b8a8e0;
        }
        .modo-oscuro form {
            background-color: #2a1a40;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }
        .modo-oscuro .form-group label {
            color: #e0d7ff;
        }
        .modo-oscuro .form-group input {
            background-color: #3a2a5e;
            color: #e0d7ff;
            border: 1px solid #5b3a8a;
        }
        .modo-oscuro .navbar {
            background-color: #3a2a5e !important;
            box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
        }
        .modo-oscuro .navbar .nav-link {
            color: #e0d7ff !important;
        }
        .modo-oscuro .navbar .nav-link:hover {
            background-color: #5b3a8a;
            color: white !important;
        }
        .modo-oscuro .nav-user-menu.dropdown {
            background-color: #3a2a5e;  /* Fondo oscuro para el contenedor */
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .modo-oscuro .nav-user-menu.dropdown .dropdown-menu {
            background-color: #3a2a5e;
            border-color: #5b3a8a;
        }
        .modo-oscuro .nav-user-menu.dropdown .dropdown-item {
            color: #e0d7ff;
        }
        .modo-oscuro .nav-user-menu.dropdown .dropdown-item:hover {
            background-color: #5b3a8a;
            color: white;
        }
        .modo-oscuro .nav-user-menu.dropdown .dropdown-toggle i {
            color: #5b3a8a; 
        }
        .modo-oscuro .nav-user-menu.dropdown .dropdown-toggle i:hover {
            color: white;  
        }
        .modo-oscuro .dropdown-menu {
            background-color: #3a2a5e;
            color: #e0d7ff;
        }
        .modo-oscuro .dropdown-item {
            color: #e0d7ff;
        }
        .modo-oscuro .dropdown-item:hover {
            background-color: #5b3a8a;
        }
        .modo-oscuro .carousel-inner img {
            filter: brightness(0.8);
        }
        .modo-oscuro .modal-content {
            background-color: #3a2a5e;
            color: #e0d7ff;
        }
        .modo-oscuro .modal-header, .modo-oscuro .modal-footer {
            border-color: #5b3a8a;
        }
        .modo-oscuro .card {
            background-color: #3a2a5e;
            color: #e0d7ff;
            border: 1px solid #5b3a8a;
        }
        .modo-oscuro .card .card-title, .modo-oscuro .card .card-body {
            color: #e0d7ff;
        }
        .modo-oscuro .card button {
            background-color: #5b3a8a;
            color: white;
            border: 1px solid #6d4bbf;
        }
        .modo-oscuro .card button:hover {
            background-color: #7a5ed3;
        }
        .modo-oscuro .card-header {
            background-color: #5b3a8a;
            color: white;
        }
    </style>
`);
