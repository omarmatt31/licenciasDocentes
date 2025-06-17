import Licencia from "./classLicencia.js"

const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get('cod')
console.log(id)
const listaDocentes = JSON.parse(localStorage.getItem('listadoDocenteKey'))
const docenteBuscado = listaDocentes.find((docente)=> docente.id === id)

console.log(docenteBuscado)

const card = document.querySelector('.card')
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
            </div>`

const abrirModal = ()=>{
    console.log("abrir modal")
    const modalDocente = new bootstrap.Modal(document.getElementById('modalLicencia'))
    modalDocente.show()
    creandoLicencia = true
}

const crearLicencia = ()=>{
  console.log("crear licencia")
    const licenciaNueva = new Licencia(id, inputArticulo.value, inputFechaInicio.value, inputFechaFin.value, inputDias.value, inputObservaciones.value)
    //const docenteNuevo = new Docente(inputApellido.value, inputNombre.value, inputCuil.value, inputTelefono.value)
    listadoLicencias.push(licenciaNueva)
    guardarLocalStorage()
    dibujarFila(licenciaNueva, listaLicencias.length)
    limpiarFormulario()
    Swal.fire({
        title: "Licencia creada",
        text: `La licencia fue asignada con exito`,
        icon: "success"
    });
}

const guardarLocalStorage = () =>{
    localStorage.setItem('listadoLicenciasKey', JSON.stringify(listadoLicencias))
}

const limpiarFormulario = () =>{
    formularioLicencias.reset()
    //const inputs = formularioLicencias.querySelector('.form-control')
    //inputs.forEach(input => {
        //input.classList.remove('is-valid', 'is-invalid');
    //});
}

const cargarDatosTabla = () => {
    if(listadoLicencias.length !== 0){
        listadoLicencias.map((docente, indice)=> dibujarFila(docente, indice+1))
    }
}

const dibujarFila = (licencia, indice)=> {
    tablaLicencia.innerHTML +=`<tr>
                                <th scope="row">${indice}</th>
                                <td>${licencia.articulo}</td>
                                <td>${licencia.fechaInicio}</td>
                                <td>${licencia.fechaFin}</td>
                                <td>${licencia.dias}</td>
                                <td>${licencia.observaciones}</td>
                                <td>
                                  <button class="btn btn-warning" onclick="prepararDocente('${licencia.id}')">Editar</button>
                                  <button class="btn btn-danger" onclick="eliminarDocente('${licencia.id}')">Eliminar</button>
                                </td>
                              </tr>`
}

const btnAgregar = document.getElementById('btnAgregar')
const formularioLicencias = document.querySelector('form')
const inputArticulo = document.querySelector('#articulo')
const inputFechaInicio = document.querySelector('#fechaInicio')
const inputFechaFin = document.querySelector('#fechaFin')
const inputDias = document.querySelector('#dias')
const inputObservaciones = document.querySelector('#observaciones')
const listaLicencias = JSON.parse(localStorage.getItem('listadoLicenciasKey')) || []
const tablaLicencia = document.querySelector('tbody')
let creandoLicencia = true

const listadoLicencias = JSON.parse(localStorage.getItem('listadoLicenciasKey')) || []

btnAgregar.addEventListener('click', abrirModal)
formularioLicencias.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(creandoLicencia){
        crearLicencia()
    }else{
        //editarDocente()
    }

})

cargarDatosTabla()