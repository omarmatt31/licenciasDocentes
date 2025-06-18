import Docente from "./classDocente.js";

const abrirModal = () => {
  const modalDocente = new bootstrap.Modal(
    document.getElementById("modalDocente")
  );
  modalDocente.show();
  creandoDocente = true;
};

const crearDocente = () => {
    if (validaciones()){
        const docenteNuevo = new Docente(
            inputApellido.value,
            inputNombre.value,
            inputCuil.value,
            inputFechaNac.value,
            inputTelefono.value
        );
        //const docenteNuevo = new Docente(inputApellido.value, inputNombre.value, inputCuil.value, inputTelefono.value)
        listadoDocente.push(docenteNuevo);
        guardarLocalStorage();
        dibujarFila(docenteNuevo, listadoDocente.length);
        limpiarFormulario();
        Swal.fire({
            title: "Docente creado",
            text: `El docente ${docenteNuevo.apellido} fue creado con exito`,
            icon: "success",
        });
    }
};

const guardarLocalStorage = () => {
  localStorage.setItem("listadoDocenteKey", JSON.stringify(listadoDocente));
};

const limpiarFormulario = () => {
  formularioDocentes.reset();
  const inputs = formularioDocentes.querySelector(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
};

const cargarDatosTabla = () => {
  if (listadoDocente.length !== 0) {
    listadoDocente.map((docente, indice) => dibujarFila(docente, indice + 1));
  }
};

const dibujarFila = (docente, indice) => {
  tablaDocente.innerHTML += `<tr class="table-light">
                        <th scope="row">${indice}</th>
                        <td>${docente.apellido}</td>
                        <td>${docente.nombre}</td>
                        <td>${docente.cuil}</td>
                        <td>${docente.fechaDeNacimiento}</td>
                        <td>${docente.telefono}</td>
                        <td>
                        <button class="btn btn-warning" onclick="prepararDocente('${docente.id}')">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarDocente('${docente.id}')">Dar de Baja</button>
                        <button class="btn btn-info" onclick="verDocente('${docente.id}')">Ver Licencias</button>
                        </td>
                    </tr>`;
};

window.eliminarDocente = (id) => {
  Swal.fire({
    title: "Eliminar",
    text: "¿Está seguro que desea eliminar el docente?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
        const posicionDocenteBuscado = listadoDocente.findIndex(
            (docente) => docente.id === id
        );
        listadoDocente.splice(posicionDocenteBuscado, 1);
        guardarLocalStorage();
        tablaDocente.children[posicionDocenteBuscado].remove();
      Swal.fire({
        title: "Eliminado",
        text: "Docente eliminado con éxito",
        icon: "success",
      });
    }
  });
};

window.prepararDocente = (id) => {
  const docenteBuscado = listadoDocente.find((docente) => docente.id === id);
  inputApellido.value = docenteBuscado.apellido;
  inputNombre.value = docenteBuscado.nombre;
  inputCuil.value = docenteBuscado.cuil;
  inputFechaNac.value = docenteBuscado.fechaDeNacimiento;
  inputTelefono.value = docenteBuscado.telefono;
  abrirModal();
  idDocenteEditar = id;
  creandoDocente = false;
};

window.verDocente = (id) => {
  window.location.href = "./pages/detalleLicencias.html?cod=" + id;
};

const editarDocente = () => {
    if(validaciones()){
        const posicionDocente = listadoDocente.findIndex(
            (docente) => docente.id === idDocenteEditar
        );
        listadoDocente[posicionDocente].apellido = inputApellido.value;
        listadoDocente[posicionDocente].nombre = inputNombre.value;
        listadoDocente[posicionDocente].cuil = inputCuil.value;
        listadoDocente[posicionDocente].fechaDeNacimiento = inputFechaNac.value;
        listadoDocente[posicionDocente].telefono = inputTelefono.value;

        guardarLocalStorage();
        limpiarFormulario();
        abrirModal;
    }
};

function validarCantidadCaracteres(input, min, max) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
     input.classList.remove("is-valid");
    return false;
  }
}

function validarCUILConGuiones(cuil) {
    const regExp=/^(20|23|24|27|30|33|34)[-]?[0-9]{8}[-]?[0-9]$/
    if(regExp.test(cuil)){
        inputCuil.classList.add("is-valid");
        inputCuil.classList.remove("is-invalid");
        return true
    }else {
        inputCuil.classList.add("is-invalid");
        inputCuil.classList.remove("is-valid")
    }
}

function validarFechaNac(fecha){
    const anioActual = new Date().getFullYear()
    if((anioActual - fecha.getFullYear())>=22){
        inputFechaNac.classList.add("is-valid");
        inputFechaNac.classList.remove("is-invalid");
        return true
    }else {
        inputFechaNac.classList.add("is-invalid");
        inputFechaNac.classList.remove("is-valid");
        return false
    }
}

function validaciones() {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputApellido, 2, 50)) {
    datosValidos = false;
  }

if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
    datosValidos = false;
  }

  if (!validarCUILConGuiones(inputCuil.value)){
    datosValidos = false;
  }

  if(!validarFechaNac(new Date(inputFechaNac.value))){
    datosValidos = false;
  }
  return datosValidos;
}

const btnAgregar = document.getElementById("btnAgregar");
const formularioDocentes = document.querySelector("form");
const inputApellido = document.querySelector("#apellido");
const inputNombre = document.querySelector("#nombre");
const inputCuil = document.querySelector("#cuil");
const inputFechaNac = document.querySelector("#fechaNac");
const inputTelefono = document.querySelector("#telefono");
const listadoDocente =
  JSON.parse(localStorage.getItem("listadoDocenteKey")) || [];
const tablaDocente = document.querySelector("tbody");
let creandoDocente = true;
let idDocenteEditar = null;

btnAgregar.addEventListener("click", abrirModal);
formularioDocentes.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoDocente) {
    crearDocente();
  } else {
    editarDocente();
  }
});

cargarDatosTabla();
