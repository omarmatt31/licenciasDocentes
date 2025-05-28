import Docente from "./classDocente.js"

const abrirModal = ()=>{
    const modalDocente = new bootstrap.Modal(document.getElementById('modalDocente'))
    modalDocente.show()
}

const btnAgregar = document.getElementById('btnAgregar')


btnAgregar.addEventListener('click', abrirModal)