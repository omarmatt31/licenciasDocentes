import Licencia from "./classLicencia.js";

const parametroURL = new URLSearchParams(window.location.search);
const id = parametroURL.get("cod");
console.log(id);
const listaDocentes = JSON.parse(localStorage.getItem("listadoDocenteKey"));
const docenteBuscado = listaDocentes.find((docente) => docente.id === id);

console.log(docenteBuscado);

const card = document.querySelector(".card");
card.innerHTML = `<div class="row g-0">
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Apellido y Nombre: ${docenteBuscado.apellido}, ${docenteBuscado.nombre}
                  </h5>
                  <ul>
                    <li><b>CUIL:</b> ${docenteBuscado.cuil}</li>
                    <li><b>Fecha de Nacimiento:</b> ${docenteBuscado.fechaDeNacimiento}</li>
                    <li><b>Teléfono:</b> ${docenteBuscado.telefono}</li>
                  </ul>
                </div>
              </div>
            </div>`;

const abrirModal = () => {
  console.log("abrir modal");
  const modalLicencia = new bootstrap.Modal(
    document.getElementById("modalLicencia")
  );
  modalLicencia.show();
  creandoLicencia = true;
};

const crearLicencia = () => {
  console.log("crear licencia");
  const licenciaNueva = new Licencia(
    id,
    inputArticulo.value,
    inputFechaInicio.value,
    inputFechaFin.value,
    inputDias.value,
    inputObservaciones.value
  );
  //const docenteNuevo = new Docente(inputApellido.value, inputNombre.value, inputCuil.value, inputTelefono.value)
  listadoLicencias.push(licenciaNueva);
  guardarLocalStorage();
  dibujarFila(licenciaNueva, listadoLicencias.length);
  limpiarFormulario();
  Swal.fire({
    title: "Licencia creada",
    text: `La licencia fue asignada con exito`,
    icon: "success",
  });
  const modalLicencia = bootstrap.Modal.getInstance(
    document.getElementById("modalLicencia")
  );
  modalLicencia.hide();
};

const formatearFecha = (fechaOriginal) => {
  const aaaa = fechaOriginal.slice(0, 4);
  const mm = fechaOriginal.slice(5, 7);
  const dd = fechaOriginal.slice(8, 10);
  return `${dd}-${mm}-${aaaa}`;
};

const guardarLocalStorage = () => {
  localStorage.setItem("listadoLicenciasKey", JSON.stringify(listadoLicencias));
};

const limpiarFormulario = () => {
  formularioLicencias.reset();
  //const inputs = formularioLicencias.querySelector('.form-control')
  //inputs.forEach(input => {
  //input.classList.remove('is-valid', 'is-invalid');
  //});
};

const cargarDatosTabla = () => {
  if (listadoLicencias.length !== 0) {
    listadoLicencias.map((docente, indice) => dibujarFila(docente, indice + 1));
  }
};

const dibujarFila = (licencia, indice) => {
  tablaLicencia.innerHTML += `<tr class="table-light">
                                <th scope="row">${indice}</th>
                                <td>${licencia.articulo}</td>
                                <td>${formatearFecha(licencia.fechaInicio)}</td>
                                <td>${formatearFecha(licencia.fechaFin)}</td>
                                <td>${licencia.dias}</td>
                                <td>${licencia.observaciones}</td>
                                <td>
                                  <button class="btn btn-warning" onclick="prepararLicencia('${
                                    licencia.id
                                  }')">Editar</button>
                                  <button class="btn btn-danger" onclick="eliminarLicencia('${
                                    licencia.id
                                  }')">Eliminar</button>
                                </td>
                              </tr>`;
};

const actualizarDatosTabla = () => {
  tablaLicencia.innerHTML = "";
  cargarDatosTabla();
};

window.eliminarLicencia = (id) => {
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
      const posicionLicenciaBuscada = listadoLicencias.findIndex(
        (licencia) => licencia.id === id
      );
      listadoLicencias.splice(posicionLicenciaBuscada, 1);
      guardarLocalStorage();
      tablaLicencia.children[posicionLicenciaBuscada].remove();
      Swal.fire({
        title: "Eliminado",
        text: "Docente eliminado con éxito",
        icon: "success",
      });
    }
  });
};

window.prepararLicencia = (id) => {
  const licenciaBuscada = listadoLicencias.find(
    (licencia) => licencia.id === id
  );
  inputArticulo.value = licenciaBuscada.articulo;
  inputFechaInicio.value = licenciaBuscada.fechaInicio;
  inputFechaFin.value = licenciaBuscada.fechaFin;
  inputDias.value = licenciaBuscada.dias;
  inputObservaciones.value = licenciaBuscada.observaciones;
  abrirModal();
  idLicenciaEditar = id;
  creandoLicencia = false;
};

window.verDocente = (id) => {
  window.location.href = "./pages/detalleLicencias.html?cod=" + id;
};

const editarLicencia = () => {
  const posicionLicencia = listadoLicencias.findIndex(
    (licencia) => licencia.id === idLicenciaEditar
  );
  listadoLicencias[posicionLicencia].articulo = inputArticulo.value;
  listadoLicencias[posicionLicencia].fechaInicio = inputFechaInicio.value;
  listadoLicencias[posicionLicencia].fechaFin = inputFechaFin.value;
  listadoLicencias[posicionLicencia].dias = inputDias.value;
  listadoLicencias[posicionLicencia].observaciones = inputObservaciones.value;
  guardarLocalStorage();
  limpiarFormulario();

  const modalLicencia = bootstrap.Modal.getInstance(
    document.getElementById("modalLicencia")
  );
  modalLicencia.hide();

  actualizarDatosTabla();

  Swal.fire({
    title: "Licencia modificada",
    text: `La licencia fue modificada con exito`,
    icon: "success",
  });
};

const btnAgregar = document.getElementById("btnAgregar");
const formularioLicencias = document.querySelector("form");
const inputArticulo = document.querySelector("#articulo");
const inputFechaInicio = document.querySelector("#fechaInicio");
const inputFechaFin = document.querySelector("#fechaFin");
const inputDias = document.querySelector("#dias");
const inputObservaciones = document.querySelector("#observaciones");
const tablaLicencia = document.querySelector("tbody");
let creandoLicencia = true;
let idLicenciaEditar = null;

const listadoLicencias =
  JSON.parse(localStorage.getItem("listadoLicenciasKey")).filter(
    (licencia) => licencia.idDocente === id
  ) || [];

btnAgregar.addEventListener("click", abrirModal);
formularioLicencias.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoLicencia) {
    crearLicencia();
  } else {
    editarLicencia();
  }
});

cargarDatosTabla();
