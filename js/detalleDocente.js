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