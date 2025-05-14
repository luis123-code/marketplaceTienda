export const state = () => ({
    respuesta: false,
    respuestaAdmin: false,
    typoAcceso: "",
    usuario: "",
    contrasenia: "",
    admin: false,
    error: null,
})

export const mutations = {
    validaadion(state, payload) {
        state.respuesta = payload
    },
    validacionAdmin(state, payload) {
        state.respuestaAdmin = payload
    },
}
export const getters = {
    getRespuesta(state) {
        return state.respuesta
    },
    getRespuestaAdmin(state) {
        return state.respuestaAdmin
    },
    getError(state) {
        return state.error
    },
    getUsuario(state) {
        return state.usuario
    },
    getContrasenia(state) {
        return state.contrasenia
    },
    getAdmin(state) {
        return state.admin
    }
} 
// export const actions = {

// }
