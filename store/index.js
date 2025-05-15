import apiService from "../service/index.js"

export const state = () => ({
    respuesta: false,
    respuestaAdmin: false,
    respuestaRegistro: false,
    respuestaProductos: false,
    productos: [],
    productosMostrar : "",
    typoAcceso: "",
    usuario: "",
    contrasenia: "",
    admin: false,
    error: null,
})

export const mutations = {
    validacion(state, payload) {
        state.respuesta = payload
    },
    validacionAdmin(state, payload) {
        state.respuestaAdmin = payload
    },
    validacionRegistro(state, payload) {
        state.respuestaRegistro = payload
    },
    validacionProductos(state, {
        focus = false,
        product = 0 
    }) {
        state.respuestaProductos = focus
        if (product !== 0) {
            state.productos.push(...product)
        }
        console.log("los productoas" ,  state.productos )
    },
    setProductosMostrar(state, payload){
        state.productosMostrar = payload
    }

}
export const getters = {
    gettersProductos(state){
        return state.productosMostrar
    }
}

export const actions = {
    async registro({ commit }, payload) {
        console.log("Acción de registro:", payload)
        let obj = {
            "nombre": payload.name,
            "apellido": payload.apellido,
            "correo": payload.email,
            "telefono": payload.phone,
            "ciudad": payload.city,
            "constrasenia": payload.password,
        }
        try {
            let respuesta = await apiService({
                url: "rest/v1/usuarios",
                method: "POST",
                body: JSON.stringify(obj),
            })
            commit("validacionRegistro", true)
            console.log("Respuesta de registro:", respuesta)
        } catch (error) {
            commit("validacionRegistro", false)
            console.error("Error en la acción de registro:", error)
        }
    },
    async loguin({ commit }, payload) {
        console.log("Acción de registro:", payload)
        try {
            let respuesta = await apiService({
                url: `rest/v1/usuarios?correo=eq.${payload.correo}&constrasenia=eq.${payload.contrasenia}`,
                method: "GET",
            })
            let { data } = respuesta
            console.log(data)
            if (Array.isArray(data) && data.length > 0) {
                console.log("entro")
                commit("validacion", true)
            } else {
                commit("validacion", false)
            }
        } catch (error) {
            commit("validacion", false)
            console.error("Error en la acción de registro:", error)
        }
    },
    async adminPower({ commit }, payload) {
        console.log("Acción de registro:", payload)
        try {
            let respuesta = await apiService({
                url: `rest/v1/admin?idUsuario=eq.${payload.idUsuario}&contrasenia=eq.${payload.contrasenia}`,
                method: "GET",
            })
            let { data } = respuesta
            console.log(data)
            if (Array.isArray(data) && data.length > 0) {
                console.log("entro")
                commit("validacionAdmin", true)
            } else {
                commit("validacionAdmin", false)
            }
        } catch (error) {
            commit("validacionAdmin", false)
            console.error("Error en la acción de registro:", error)
        }
    },

    async obtniendoProductos({ commit }) {
        try {
            let respuesta = await apiService({
                url: "rest/v1/products",
                method: "GET",
            })
            commit("validacionProductos", {
                focus : true,
                product : respuesta.data,
            })

            console.log("los productos otenidos son", respuesta.data)
        } catch (error) {
            commit("validacionProductos", false)
            console.error("Error en la acción de registro:", error)
        }
    },

}
