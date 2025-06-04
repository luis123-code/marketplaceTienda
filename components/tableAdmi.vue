<template>
  <div v-if="isSpiner"  style="display: grid;place-content: center;margin-top: 80px;">
    <spinerEspera></spinerEspera>
  </div>
  
  
  
  
  <div v-else>
    <div style="position: relative !important; width: 336px; background-color: #ffff; color: #797979; font-size: 1.4rem; font-weight: 400; padding: 0.8em 0.7em; border-radius: 7px; border: none; margin-bottom: 19px;">
      <img
        style="width: 15px; height: 15px; position: absolute; left: 12px;"
        src="../static/icons/search-icon.svg"
        alt="search icon"
      />
      <input
        id="search-input"
        style="width: 100%; background: transparent; border: none; color: #797979; font-size: 1.4rem; padding-left: 26px;"
        v-model="busquedaDatos"
        type="text"
        placeholder="Search usuario"
      />
    </div>

    <div v-if="isSpinerBuscador"  style="display: grid;place-content: center;margin-top: 80px;">
        <spinerEspera></spinerEspera>
    </div>

    <div v-else>
      <div :key="renderKey" ref="contenedorTabla"  class="tabla-wrapper" v-if="ObjDinamico.name === 'usuarios' && ObjDinamico.cuerpo.length > 0">
        <table>
          <thead>
            <tr>
              <th v-if="tableDinami !== 'Crear'&& tableDinami !== 'Usuarios'&& tableDinami !== 'Productos'" ></th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in ObjDinamico.cuerpo" :key="index">
              <td style="text-align:center" v-if="tableDinami !== 'Crear'&& tableDinami !== 'Usuarios'&& tableDinami !== 'Productos'"  > <input type="checkbox"   v-model="i.focus"   @change="check(tableDinami , i)"    style="accent-color: green;" /></td>
              <td>{{ i.id }}</td>
              <td>{{ i.nombre }}</td>
              <td>{{ i.apellido }}</td>
              <td>{{ i.correo }}</td>
              <td>{{ i.telefono }}</td>
              <td>{{ i.ciudad }}</td>
              <td>{{ i.constrasenia }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :key="renderKey" ref="contenedorTabla" class="tabla-wrapper" v-else-if="ObjDinamico.name === 'Productos' && ObjDinamico.cuerpo.length > 0">
        <table>
          <thead>
            <tr>
              <th v-if="tableDinami !== 'Crear'&& tableDinami !== 'Usuarios'&& tableDinami !== 'Productos'" ></th>
              <th>id</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>TYPO</th>
              <th>DESCRIPCION</th>
              <th>IMAGEN</th>
            </tr>
          </thead>
          <tbody v-for="(i, index) in ObjDinamico.cuerpo" :key="index">
            <tr>
              <td style="text-align:center" v-if="tableDinami !== 'Crear'&& tableDinami !== 'Usuarios'&& tableDinami !== 'Productos'" > <input   v-model="i.focus"   @change="check(tipo , i)"   type="checkbox" style="accent-color: green;" /></td>
              <td style="padding: 1px 16px;">{{i.id     }}</td>
              <td style="padding: 1px 16px;">{{i.name     }}</td>
              <td style="padding: 1px 16px;">{{i.price     }}</td>
              <td style="padding: 1px 16px;">{{i.type     }}</td>
              <td style="padding: 1px 16px;">{{i.description  }}</td>
              <td style="padding: 1px 16px;">
                <img v-if="i.imgs.length > 0" :src="i.imgs[0].img" alt="Imagen del producto" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                <span v-else>No image</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>




  </div>

</template>

<script>

import spinerEspera  from "./spinerEspera.vue"
export default {
  name: "tableAdmi",
  components : {
    spinerEspera
  },
  mixins: [],
  props: {
      tableDinami : {
          type : String ,
          default : () => "Usuarios" ,
      },
      tipo : {
          type : String ,
      },
      tablasDinamicos : {
          type : String ,
      } ,
      linkDinamicos: {
        type: String,
        default: "Usuarios",
      },
      isDinamico: {
        type: Boolean,
        default: false,
      },
  },

  data() {
    return {
      width: "",
      height: "",
      busquedaDatos: "",
      ObjDinamico: {
            name : "usuarios" ,
            cuerpo : [] ,
      } ,
      isSpiner  : "" ,
      actualizarData :"" ,
      checktemporal : [] ,
      isSpinerBuscador : false,
      eliminarvalores : [],
      renderKey: 0
    };
  },

  async mounted() {
    console.error("creando tabla" , this.tableDinami , this.linkDinamicos)
    await this.obtenerValores(this.linkDinamicos)
    window.addEventListener("resize", this.tamanioVentana);
    this.$nextTick(() => {
        this.tamanioVentana();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.tamanioVentana);
  },

  watch : {
  isDinamico(value) {
    if (this.tableDinami === "Eliminar") {
      let arrays = [...this.$store.state.eliminandoValores];
      if (arrays.length > 0) {
        const nuevos = this.ObjDinamico.cuerpo.filter(item => item.focus !== true);
        this.$set(this.ObjDinamico, 'cuerpo', nuevos); // Reactiva el cambio
        this.renderKey++; // Fuerza re-render en el DOM
        this.tamanioVentana()
      }
      this.$store.commit("limpiandoValores");
      console.log("eliminando valores", this.ObjDinamico.cuerpo);
      }
      else if (this.tableDinami === "Crear") {
        let dato = {...this.$store.state.objCrearActualzacion}
        this.ObjDinamico.cuerpo.push(dato); 
      }
      else if (this.tableDinami === "Actualizar") {
        let dato = {...this.$store.state.objCrearActualzacion}
        const index = this.ObjDinamico.cuerpo.findIndex(item => item.id === dato.id);
        console.log("index", index, dato);
        if (index !== -1) {
          this.ObjDinamico.cuerpo.splice(index, 1, dato);
        }
        console.log("isDinamico cambiado a:", this.tableDinami, dato);
    
      }

    
  },


  busquedaDatos(value) {
    console.log("buscando" , value , this.ObjDinamico);
    value = value.trim()
    let originalData = [];
    this.isSpinerBuscador = true;
    setTimeout(() => {
          this.tamanioVentana()
          this.isSpinerBuscador = false;
          if (this.ObjDinamico.name === "usuarios") {
            originalData = this.$store.state.registro?.data || [];
            this.ObjDinamico.cuerpo = originalData.filter((item) => {
              return (
                item.nombre.toLowerCase().includes(value.toLowerCase()) ||
                item.apellido.toLowerCase().includes(value.toLowerCase()) ||
                item.correo.toLowerCase().includes(value.toLowerCase()) ||
                item.ciudad.toLowerCase().includes(value.toLowerCase()) ||
                item.telefono.toLowerCase().includes(value.toLowerCase())
              );
            });
            } else if (this.ObjDinamico.name === "Productos") {
              originalData = this.$store.state.productos || [];
              this.ObjDinamico.cuerpo = originalData.filter((item) => {
                return (
                  item.name.toLowerCase().includes(value.toLowerCase()) ||
                  item.description.toLowerCase().includes(value.toLowerCase()) || 
                  item.price.toString().toLowerCase().includes(value.toLowerCase()) || 
                  item.type.toLowerCase().includes(value.toLowerCase()) 
                );
              });
            }
      }, 1000);
  },


  async linkDinamicos(values){
    console.log("ddddd"  , values)
    this.obtenerValores(values)
    this.tamanioVentana()
    },
    isSpiner(value){
      if (value) {
        setTimeout(()=>{
          this.isSpiner  = false

        },1000)
      }
    }
  },


  methods : {
    async obtenerValores(values){
      console.warn("obteniendo datos en el nav" , values)
      this.isSpiner  = true
      if(values ===  "Usuarios"){
        await this.obtenerUsuarios()
      }else{
        await this.obtenerProductos()
      }
    },


    check( typo , value){
      switch (typo) {
        case "Eliminar":
          this.eliminarBloques(value)
          break;
        case "Actualizar":
          this.actualizarBloques(value)
          break;
      
        default:
          break;
      }
    },

    eliminarBloques(value){
      this.$store.commit("interaccionEliminandoValores", value);
    },
    actualizarBloques(value) {
      let enviar = "";
      this.desactivando();
    
      if (value.focus) {
        console.log("entroe aka ");
        this.checktemporal.push(value);
        enviar = JSON.parse(JSON.stringify(value));
      } else {
        enviar = false;
      }
    
      console.log("valroes", this.ObjDinamico.cuerpo, enviar);
      this.$emit("mensajeDelHijo", enviar)
      this.$forceUpdate();
    },
    
    desactivando() {
      if (this.checktemporal.length !== 0) {
        const idx = this.ObjDinamico.cuerpo.findIndex(item => item.id === this.checktemporal[0].id);
        if (idx !== -1) {
          this.$set(this.ObjDinamico.cuerpo[idx], 'focus', false); // ← Vue.set aquí
          this.checktemporal = [];
        }
      }
    },


    tamanioVentana() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    
      this.$nextTick(() => {
        const intervalo = setInterval(() => {
          const tabla = this.$refs.contenedorTabla;
          if (tabla) {
            tabla.style.height = `${this.height - 280}px`;
            clearInterval(intervalo);
          }
        }, 50);
      });
    },


    async obtenerUsuarios(){
      try {
        await this.$store.dispatch("obteniendoRegistro")
        let respuesta = await this.$store.state.registro
        respuesta =  [...respuesta.data]
        respuesta.forEach(element => {
          element.focus = false
        });
        this.ObjDinamico.name = "usuarios"
        this.ObjDinamico.cuerpo  =  respuesta      
      }catch(err){
        console.log("respuesta" , err)
      }
    },

    async obtenerProductos(){
      try {
        await this.$store.dispatch("obtniendoProductos" , {} )
        let respuesta = await this.$store.state.productos
        respuesta =  [...respuesta]
        this.ObjDinamico.name  =  "Productos"
        respuesta.forEach(element => {
          element.focus = false
        });
        this.ObjDinamico.cuerpo  =  respuesta 
      }catch(err){
        console.log("respuesta" , err)
      }
    },









  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styleGeneral.scss';
@import '../assets/iconStyle.scss';

/* Elimina el borde negro al enfocar inputs */
input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}


</style>
