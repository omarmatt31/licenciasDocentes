import Docente from "./classDocente.js"

const abrirModal = ()=>{
    const modalDocente = new bootstrap.Modal(document.getElementById('modalDocente'))
    modalDocente.show()
}

const crearDocente = ()=>{
    const docenteNuevo = new Docente(inputApellido.value, inputNombre.value, inputCuil.value, inputFechaNac.value, inputTelefono.value)
    //const docenteNuevo = new Docente(inputApellido.value, inputNombre.value, inputCuil.value, inputTelefono.value)
    listadoDocente.push(docenteNuevo)
    guardarLocalStorage()
    limpiarFormulario()
}

const guardarLocalStorage = () =>{
    localStorage.setItem('listadoDocenteKey', JSON.stringify(listadoDocente))
}

const limpiarFormulario = () =>{
    formularioDocentes.reset()
}

const btnAgregar = document.getElementById('btnAgregar')
const formularioDocentes = document.querySelector('form')
const inputApellido = document.querySelector('#apellido')
const inputNombre = document.querySelector('#nombre')
const inputCuil = document.querySelector('#cuil')
const inputFechaNac = document.querySelector('#fechaNac')
const inputTelefono = document.querySelector('#telefono')
const listadoDocente = JSON.parse(localStorage.getItem('listadoDocenteKey')) || []


btnAgregar.addEventListener('click', abrirModal)
formularioDocentes.addEventListener('submit', (e)=>{
    e.preventDefault()
    crearDocente()
})