export default class Licencia{
    #id
    #idDocente
    #articulo
    #fechaInicio
    #fechaFin
    #dias
    #observaciones
    constructor(idDocente, articulo, fechaInicio, fechaFin, dias, observaciones){
        this.#id = crypto.randomUUID()
        this.#idDocente = idDocente
        this.#articulo = articulo
        this.#fechaInicio = fechaInicio
        this.#fechaFin = fechaFin
        this.#dias = dias
        this.#observaciones = observaciones
    }
    get id() {
        return this.#id;
    }

    get idDocente() {
        return this.#idDocente;
    }

    get articulo() {
        return this.#articulo;
    }

    get fechaInicio() {
        return this.#fechaInicio;
    }

    get fechaFin() {
        return this.#fechaFin;
    }

    get dias() {
        return this.#dias;
    }

    get observaciones() {
        return this.#observaciones;
    }

    set idDocente(nuevoIdDocente) {
        this.#idDocente = nuevoIdDocente;
    }

    set articulo(nuevoArticulo) {
        this.#articulo = nuevoArticulo;
    }

    set fechaInicio(nuevaFechaInicio) {
        this.#fechaInicio = nuevaFechaInicio;
    }

    set fechaFin(nuevaFechaFin) {
        this.#fechaFin = nuevaFechaFin;
    }

    set dias(nuevosDias) {
        this.#dias = nuevosDias;
    }

    set observaciones(nuevasObservaciones) {
        this.#dias = nuevasObservaciones;
    }
    toJSON(){
        return {
            id: this.#id,
            idDocente: this.#idDocente,
            articulo: this.#articulo,
            fechaInicio: this.#fechaInicio,
            fechaFin: this.#fechaFin,
            dias: this.#dias,
            observaciones: this.#observaciones
        }
    }
}