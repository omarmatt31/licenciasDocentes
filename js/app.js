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
    dibujarFila(docenteNuevo, listadoDocente.length)
    limpiarFormulario()
        Swal.fire({
        title: "Docente creado",
        text: `El docente ${docenteNuevo.apellido} fue creado con exito`,
        icon: "success"
    });
}

const guardarLocalStorage = () =>{
    localStorage.setItem('listadoDocenteKey', JSON.stringify(listadoDocente))
}

const limpiarFormulario = () =>{
    formularioDocentes.reset()
}

const cargarDatosTabla = () => {
    if(listadoDocente.length !== 0){
        listadoDocente.map((docente, indice)=> dibujarFila(docente, indice+1))
    }
}

const dibujarFila = (docente, indice)=> {
    tablaDocente.innerHTML +=`<tr>
                        <th scope="row">${indice}</th>
                        <td>${docente.apellido}</td>
                        <td>${docente.nombre}</td>
                        <td>${docente.cuil}</td>
                        <td>${docente.fechaDeNacimiento}</td>
                        <td>${docente.telefono}</td>
                        <td>
                        <button class="btn btn-warning">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarDocente('${docente.id}')">Dar de Baja</button>
                        <button class="btn btn-info">Ver Licencias</button>
                        </td>
                    </tr>`
}

window.eliminarDocente = (id)=>{
    console.log("Aqui debe eliminarse un docente", id)

    const posicionDocenteBuscado = listadoDocente.findIndex((docente)=> docente.id === id)
    listadoDocente.splice(posicionDocenteBuscado, 1)
    guardarLocalStorage()
    tablaDocente.children[posicionDocenteBuscado].remove()

}



const btnAgregar = document.getElementById('btnAgregar')
const formularioDocentes = document.querySelector('form')
const inputApellido = document.querySelector('#apellido')
const inputNombre = document.querySelector('#nombre')
const inputCuil = document.querySelector('#cuil')
const inputFechaNac = document.querySelector('#fechaNac')
const inputTelefono = document.querySelector('#telefono')
const listadoDocente = JSON.parse(localStorage.getItem('listadoDocenteKey')) || []
const tablaDocente = document.querySelector('tbody')


btnAgregar.addEventListener('click', abrirModal)
formularioDocentes.addEventListener('submit', (e)=>{
    e.preventDefault()
    crearDocente()
})

cargarDatosTabla()