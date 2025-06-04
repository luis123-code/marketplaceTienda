
import apiService from "../service/index.js"

export const state = () => ({
    usuarioAutenticad: true,
    respuesta: false,
    respuestaAdmin: false,
    respuestaRegistro: false,
    respuestaProductos: false,
    respuestaActualizacion: false,
    respuestaEliminar: false,
    cod: "",
    isnNav: false,
    productos: [],
    canastita: [],
    productosMostrar: "",
    typoAcceso: "",
    usuario: "",
    correo: "",
    admin: false,
    error: null,
    objCrearActualzacion: {},
    totalValoresComprado: "0.00",
    isOpenStore: false,
    localProduct: "",
    busqueda: "",
    localAdmin: {},
    eliminandoValores: [],
    registro: ""

})

export const mutations = {
    interaccionEliminandoValores(state, payload) {
        state.interaccion = payload
        if (payload.focus === true) {
            state.eliminandoValores.push(payload)
        } else {
            state.eliminandoValores = state.eliminandoValores.filter(item => item.id !== payload.id);
        }
    },
    limpiandoValores(state) {
        state.eliminandoValores = [];
    },
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
        state.productos = []
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
        console.log("agregando productos", Array.isArray(state.canastita))
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
        state.canastita = payload === "" ? [] : payload
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

    agregandoLocalAdmin(state, payload) {
        if (process.client) {
            localStorage.setItem("local", JSON.stringify(payload))
        }
    },

    llamandoProductLocal(state) {
        if (process.client) {
            const productosGuardados = localStorage.getItem("local")
            if (productosGuardados) {
                state.local = JSON.parse(productosGuardados)
            } else {
                state.local = {
                    nav: "Dashboard",
                    busqueda: "Usuarios"
                }
            }
        }
    },
    insertarBusqueda(state, payload) {
        state.busqueda = payload
    },
    setUsuario(state, { correo, nombre, cod }) {
        state.correo = correo
        state.usuario = nombre
        state.cod = cod
    },
    validacionNav(state, payload) {
        state.isnNav = payload
    },
    encapsularRegistro(state, payload) {
        state.registro = payload
    },
    validacionEliminar(state, payload) {
        state.respuestaEliminar = payload
    },
    agregandoObjct(state, payload) {
        state.objCrearActualzacion = payload
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
    async obteniendoRegistro({ commit }) {
        try {
            let respuesta = await apiService({
                url: "rest/v1/usuarios",
                method: "GET",
            })
            commit("encapsularRegistro", respuesta)
            console.log("Respuesta de registro:", respuesta)
        } catch (error) {
            commit("encapsularRegistro", "")
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
                    nombre: data[0].nombre,
                    cod: data[0].id
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

    async obtniendoProductos({ commit }, { cuerpo = {}, methodo = "GET" }) {
        let respuesta = ""
        try {
            switch (methodo) {
                case "PATCH":
                    let resetear = JSON.parse(JSON.stringify(cuerpo))
                    delete resetear.id
                    respuesta = await apiService({
                        url: `rest/v1/products?id=eq.${cuerpo.id}`,
                        method: "PATCH",
                        body: resetear
                    })
                    commit("validacionProductos", {
                        focus: true,
                        product: respuesta.data,
                    })
                    break;
                case "POST":
                    respuesta = await apiService({
                        url: "rest/v1/products",
                        method: "POST",
                        body: cuerpo
                    })
                    commit("validacionProductos", {
                        focus: true,
                        product: respuesta.data,
                    })
                    break;
                default:
                    respuesta = await apiService({
                        url: "rest/v1/products",
                        method: "GET",
                    })
                    commit("validacionProductos", {
                        focus: true,
                        product: respuesta.data,
                    })
                    break;

            }
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
    },
    async actualizarUsuarioTotal({ commit }, payload) {
        let resetear = JSON.parse(JSON.stringify(payload))
        delete resetear.id
        try {
            let respuesta = await apiService({
                url: `rest/v1/usuarios?id=eq.${payload.id}`,
                method: "PATCH",
                body: JSON.stringify({
                    correo: resetear.email,
                    constrasenia: resetear.password,
                    telefono: resetear.phone,
                    apellido: resetear.apellido,
                    ciudad: resetear.city,
                    nombre: resetear.name,

                })
            })
            commit("validacionActualizaciom", true)
            console.log("los productos otenidos son", respuesta.data)
        } catch (err) {
            commit("validacionActualizaciom", false)

        }
    },
    async eliminarValores({ commit }, payload) {
        let {
            bloques,
            name,
        } = payload
        let arraysRespuesta = await Promise.all(bloques.map(async (item) => {
            try {
                let respuesta = await apiService({
                    url: `rest/v1/${name}?id=eq.${item.id}`,
                    method: "DELETE",
                })
                return true
            } catch (err) {
                return false
            }
        }))

        if (arraysRespuesta.every(res => res === true)) {
            commit("validacionEliminar", true)
        } else {
            commit("validacionEliminar", false)
        }
        console.log("la informacion de la eliminacion", arraysRespuesta)
    },
}
