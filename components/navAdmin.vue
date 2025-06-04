<template>
    <div style="padding-top: 45px;width: 296px;background-color: #ffff;height: 100%;border-top-right-radius: 25px;border-bottom-right-radius: 25px;box-shadow: 6px -1px 20px -7px #00000040;">
      <nav  style="display: flex;flex-direction: column;gap: 36px;" >
        <div style="width: 50%;margin: 0px auto;">
            <img class="logo-icon" @click.stop="()=> $router.push('/')"   src="../static/icons/logo.svg" style="width: 100%;" alt="logo of the webpage">
        </div>
        <ul>
          <li v-for="(values , index) in  arrays":key="index" @click.stop="navegando(values , index)" class="header-home-section__list-option_admin " :class="{'selected-item-admin' : index === isIndex }">{{values}}</li>
        </ul>
      </nav>
    </div>
</template>
<script>
    export default {
        name : "navAdmin" ,
        data (){
            return{
                isIndex : "" , 
                arrays : ["Dashboard","Usuarios","Productos","Crear nuevo","Actualizar","Eliminar","Cerrar sesión" ]  , 
            }
        },
        mounted(){
            const localStorageData = localStorage.getItem("navInteractiva");
            if (localStorageData && localStorageData.length > 0) {
                const parsedData = JSON.parse(localStorageData);
                this.isIndex = parsedData.length > 0 ? this.arrays.indexOf(parsedData[0]) : 0; // Set index based on localStorage data
            } else {
                this.isIndex = 0; // Default index if no data in localStorage
            }
        },
        methods : {
            navegando(valores , index){
                this.isIndex = index
                let valor = ""
                switch (valores) {
                    case "Dashboard":
                        valor = "Dashboard"
                        this.$router.push("/admin/redirigir")
                        break;
                    case "Usuarios":
                        valor = "Usuarios"
                        this.$router.push("/admin/redirigir/usuariosAdmin")
                        break;
                    case "Productos":
                        valor = "Productos"
                        this.$router.push("/admin/redirigir/productosAdmin")
                        break;
                    case "Crear nuevo":
                        valor = "Crear nuevo"
                        this.$router.push("/admin/redirigir/crearAdmin")
                        break;
                    case "Actualizar":
                        valor = "Actualizar"
                        this.$router.push("/admin/redirigir/actualizarAdmin")
                        break;
                    case "Eliminar":
                        valor = "Eliminar"
                        this.$router.push("/admin/redirigir/eliminarAdmin")
                        break;
                    default:
                        break;
                }
                this.agregandoLocalStorage(valor)
            },

            agregandoLocalStorage(valor){
                let local =  localStorage.getItem("navInteractiva")
                if(local && local.length > 0){
                    local = JSON.parse(local)
                    local = []
                    local.push(valor)
                    localStorage.setItem("navInteractiva" , JSON.stringify(local))
                }else{
                    localStorage.setItem("navInteractiva" , JSON.stringify([valor]))
                }
            },
        }
    }
</script>
<style lang="scss"> 

@import '../assets/styleGeneral.scss';
@import '../assets/iconStyle.scss';
</style>