
import apiService from "../service/index.js"

export const state = () => ({
    usuarioAutenticad: true,
    respuesta: false,
    respuestaAdmin: false,
    respuestaRegistro: false,
    respuestaProductos: false,
    respuestaActualizacion: false,
    cod : "" ,
    productos: [],
    canastita: [],
    productosMostrar: "",
    typoAcceso: "",
    usuario: "",
    correo: "",
    admin: false,
    error: null,
    totalValoresComprado: "0.00",
    isOpenStore: false,
    localProduct: "",
    busqueda: ""
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
    validacionActualizaciom(state, payload) {
        state.respuestaActualizacion = payload
    },
    validacionProductos(state, {
        focus = false,
        product = 0
    }) {
        state.respuestaProductos = focus
        if (product !== 0) {
            state.productos.push(...product)
        }
        console.log("los productoas", state.productos)
    },
    setProductosMostrar(state, payload) {
        state.productosMostrar = payload
    },
    agregarProductos(state, payload) {
        let { id } = payload
        let valor = state.canastita.find(valores => valores.id === id)
        if (valor) {
            valor.cantidad++
        } else {

            state.canastita.push(
                {
                    ...payload,
                    cantidad: 1
                }
            )
        }
        console.log(state.canastita)
    },
    eliminarProducto(state, payload) {
        const { id } = payload
        const index = state.canastita.findIndex(item => item.id === id)

        if (index !== -1) {
            if (state.canastita[index].cantidad > 1) {
                state.canastita[index].cantidad--
            } else {
                state.canastita.splice(index, 1)
            }
        }
    },
    localCanastAgregando(state, payload) {
        state.canastita = payload
    },
    isStore(state) {
        state.isOpenStore = !state.isOpenStore
    },
    agregandoProductLocal(state, payload) {
        if (process.client) {
            localStorage.setItem("productos", JSON.stringify(payload))
            state.localProduct = payload
        }
    },
    llamandoProductLocal(state) {
        if (process.client) {
            const productosGuardados = localStorage.getItem("productos")
            if (productosGuardados) {
                state.localProduct = JSON.parse(productosGuardados)
            } else {
                state.localProduct = []
            }
        }
    },
    insertarBusqueda(state, payload) {
        state.busqueda = payload
    },
    setUsuario(state, { correo, nombre , cod }) {
        state.correo = correo
        state.usuario = nombre
        state.cod  = cod
    }

}





export const getters = {
    gettersProductos(state) {
        return state.productosMostrar
    },
    gettersCanastita(state) {
        return state.canastita
    },
    gettersCanastitaTotal(state) {
        return state.canastita.length > 0
            ? state.canastita.reduce((acumulacio, item) => acumulacio + (item.price * item.cantidad), 0)
            : "0.00"
    },
    gettersLengthCanastita(state) {
        return state.canastita.length
    },
    gettersAbrirCanastita(state) {
        return state.isOpenStore
    },
    gettersllamandoLocal(state) {
        return state.localProduct
    },
    gettersBuscarProdcutos(state) {
        return state.productos.filter(valores =>
            valores.name.toLowerCase().startsWith(state.busqueda.toLowerCase()) ||
            String(valores.price).startsWith(state.busqueda) ||
            valores.type.toLowerCase().startsWith(state.busqueda.toLowerCase())
        )
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
    async loguin({ commit, state }, payload) {
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
                commit("setUsuario", {
                    correo: data[0].correo,
                    nombre: data[0].nombre ,
                    cod : data[0].id
                })
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
                focus: true,
                product: respuesta.data,
            })

            console.log("los productos otenidos son", respuesta.data)
        } catch (error) {
            commit("validacionProductos", false)
            console.error("Error en la acción de registro:", error)
        }
    },




    async actualizarUsuario({ commit }, payload) {
         console.log("efsfasfas")
        try {
            let respuesta = await apiService({
                url: `rest/v1/usuarios?id=eq.${payload.id}`,
                method: "PATCH",
                body: JSON.stringify({
                    correo: payload.correo,
                    constrasenia: payload.constraseniaNueva
                })
            })
            commit("validacionActualizaciom", true,)
            console.log("los productos otenidos son", respuesta.data)
        } catch (err) {
            commit("validacionActualizaciom", false)

        }
    }

}
