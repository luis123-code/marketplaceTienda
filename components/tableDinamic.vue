<template>
    <section style="padding: 0px 22px;" v-if="true">
        <article style="display: flex; justify-content: space-between;">
            <ul style="display: flex; background-color: #fff; border-radius: 5px; width: fit-content; margin: 15px 0;">
                <li
                    v-for="(values, index) in arrays"
                    :key="index"
                    style="margin: 5px 10px; font-size: 16px; height: min-content; padding: 3px 5px;"
                    class="header-home-section__list-option_admin"
                    :class="{ 'selected-item-admin': index === isIndex }"
                    @click.stop = "clickeandoDinamic(values , index )"
                >
                    {{ values }}
                </li>
            </ul>
            <div class="product-detail-buttom" style="padding-top: 20px; align-self: center;">
                <button
                    style="background-color: #acd9b2; min-width: 82px; padding: 10px 0;"
                    id="js-detail-btn"
                    class="general-button green--btn"
                    @click="validandoInput(nameTableDinamic)"
                >
                    <span id="js-detail-btn-text" class="product-detail-buttom__text">{{nameTableDinamic}}</span>
                </button>
            </div>
        </article>
        <tableAdmi  :isDinamico="isVariableFocus"  :tableDinami="nameTableDinamic" :tablasDinamicos="mostrarDialog"  :linkDinamicos="mostrarDialog" :tipo="nameTableDinamic"  @mensajeDelHijo="actualizarData"/>
        <transition name="slide-fade" v-if=" nameTableDinamic !=='Eliminar'">
            <div v-if="mostrar" class="contenedor">
                <div class="wrapper-close-btn"></div>
                    <img
                        class="close-icon"
                        src="../static/icons/x-icon.svg"
                        alt="close icon"
                        @click="() => mostrar = false"
                    />
                <diaologDianamic  :nameDialogDinamic="mostrarDialog" :datoActuaizar="dato" :nameAccion="nameTableDinamic"  @accionTabla="actualizarDataTabla"   ></diaologDianamic>
            </div>
        </transition>
    </section>
</template>

<script>
import tableAdmi from '../components/tableAdmi.vue';
import diaologDianamic from '../components/diaologDianamic.vue';




export default {
    name: "tableDinamic",
    layout: 'redirigir',
    components: {
        tableAdmi,
        diaologDianamic
    },
    props: {
        nameTableDinamic : {
            type : String ,
            default : () => "Crear" ,
        },

    },

    created(){ 
        if(process.client){
            this.obtenerDatosLocal();
        }
    },
    data() {
        return {
            isIndex : "" ,
            arrays : ["Usuarios" , "Productos"],
            mostrar: false,
            mostrarDialog : "Usuarios" ,
            dato  : "" ,
            focus : false ,
            bloques : null ,
            isVariableFocus : false,
            Informacion : null,
        };
    },

    methods: {
        actualizarDataTabla( e = false){
            if (e) {
                this.typosValidaciones(true)
                console.log("actualizando data tabla" , e  )
            }            
        },
        obtenerDatosLocal() {
            this.$store.commit("llamandoProductLocal")
            let dato = this.$store.state.local
            let ubicacion = ""      
            const localStorageData = localStorage.getItem("navInteractiva");
            this.Informacion = this.nameTableDinamic
    
            if (localStorageData && localStorageData.length > 0) {
                const parsedData = JSON.parse(localStorageData);
                let dato = parsedData[0] || "";
                switch (dato) {
                case "Crear":
                    ubicacion = "Crear"
                    break;
                case "Actualizar":
                    ubicacion = "Actualizar"    
                    break;
                case "Eliminar":   
                    ubicacion = "Eliminar"
                    break;
                default:
                    break
                }
    
            }
    
            if (Object.keys(dato.busqueda).length > 0 && Object.keys(dato.busqueda)[0] === ubicacion) {
                let indice =  this.arrays.indexOf(Object.values(dato.busqueda)[0])
                this.isIndex = indice
                this.mostrarDialog = Object.values(dato.busqueda)[0]
                } else {
                this.isIndex = 0}



        },


        async validandoInput(valor){
            this.mostrar = true
            this.focus = true            
            this.typosValidaciones(valor)
        },

        async typosValidaciones(valor){
            console.log("typosValidaciones valores" , valor)
            if (valor === "Eliminar" &&  this.$store.state.eliminandoValores.length > 0) {
                
                let arrays = this.$store.state.eliminandoValores;
                await this.$store.dispatch("eliminarValores", {
                    bloques: arrays,
                    name : this.arrays[this.isIndex] === "Usuarios" ? "usuarios" : "products"
                });
                let respuesta = await this.$store.state.respuestaEliminar;
                if(respuesta){
                    console.log("typosValidaciones valores1" , valor)
                    this.isVariableFocus = !this.isVariableFocus
                }
            }else if (typeof valor === 'boolean' && valor === true) {
                this.isVariableFocus = !this.isVariableFocus;
            }


        },


        clickeandoDinamic(valores , index){
            this.$store.commit("limpiandoValores")
            this.isIndex = index
            this.mostrar = false
            this.mostrarDialog = valores
            this.$store.commit("agregandoLocalAdmin", {
                nav : this.Informacion,
                busqueda : {
                    [this.Informacion] : valores
                }
            })
        },
        actualizarData(e){
            this.dato = e
            console.log("respuesta" , e)
            
            if(this.dato === false){
                console.log("emtrp1")
                this.mostrar = false
                this.focus = false
                return
            }

            if(this.focus){
                console.log("emtrp2")
                this.mostrarDialogFull()
            }

        },

        mostrarDialogFull() {
            if (true) {
                this.mostrar = false
                setTimeout(() => {
                    this.mostrar = true
                }, 900)
            }
        }
    }
}


</script>
<style scoped>
.contenedor-principal {
  position: relative;
  overflow-x: hidden;
  min-height: 300px; /* ajusta según tu diseño */
}

/* Transiciones */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Estilo del contenedor animado */

.contenedor {
    position: fixed;
    height: fit-content;
    top: 60px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #f0f0f0;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding-bottom: 11px;
    padding-left: 11px;
    padding-top: 10px;
    border-radius: 5px;
}


</style>

<!-- Estilo global para evitar scroll horizontal -->
