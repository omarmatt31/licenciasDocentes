export default class Docente{
    #id
    #apellido
    #nombre
    #cuil
    #fechaDeNacimiento
    #telefono
    constructor(apellido, nombre, cuil, fechaDeNacimiento, telefono){
        this.#id = crypto.randomUUID()
        this.#apellido = apellido
        this.#nombre = nombre
        this.#cuil = cuil
        this.#fechaDeNacimiento = fechaDeNacimiento
        this.#telefono = telefono
    }
    get id() {
        return this.#id;
    }

    get apellido() {
        return this.#apellido;
    }

    get nombre() {
        return this.#nombre;
    }

    get cuil() {
        return this.#cuil;
    }

    get fechaDeNacimiento() {
        return this.#fechaDeNacimiento;
    }

    get telefono() {
        return this.#telefono;
    }

    set apellido(nuevoApellido) {
        this.#apellido = nuevoApellido;
    }

    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }

    set cuil(nuevoCuil) {
        this.#cuil = nuevoCuil;
    }

    set fechaDeNacimiento(nuevoFechaDeNacimiento) {
        this.#fechaDeNacimiento = nuevoFechaDeNacimiento;
    }

    set telefono(nuevaTelefono) {
        this.#telefono = nuevaTelefono;
    }

    toJSON(){
        return {
            id: this.#id,
            apellido: this.#apellido,
            nombre: this.#nombre,
            cuil: this.#cuil,
            fechaDeNacimiento: this.#fechaDeNacimiento,
            telefono: this.telefono
        }
    }
}