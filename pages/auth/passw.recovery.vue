<template>
        <div class="wrapper-recovery">
        <header class="header-section-recovery">
            <nav>
                <img class="logo-icon" src="../../static/icons/logo.svg" alt="logo of the webpage">
            </nav>
        </header>
        <main>
            <h2 class="recovery-tittle">Password recovery</h2>
            <p class="recovery-text">Inform the email address used to create your account</p>
            <label class="login-section__label" for="user-txt">Email address</label>
            <input class="general-input login-section__recovery" v-model="correo" id="user-txt" :placeholder="datos.correo" type="text">
            <label class="login-section__label" for="login-txt">Contraseña antigua</label>
            <input class="general-input login-section__recovery " v-model="constraseniaAntigua" id="Contrasenia-txt" placeholder="*********" type="password">
            <label class="login-section__label" for="login-txt">Contraseña nueva</label>
            <input class="general-input login-section__recovery" v-model="constraseniaNueva" id="Contrasenia-txt" placeholder="*********" type="password">
            <div id="js-error-message" class="error-message" v-if="false">Invalid user ID and password combination</div>

            <a @click="enviandoActualizacion()">
                <button id="validacionDatos-btn" class="general-button green--btn">
                    Submit
                </button>
            </a>
            <a class="general-message-link green__message">Back to log in</a>
        </main>
    </div>

</template>
<script>
    import { mapActions } from 'vuex';
    export default{
        name  : "passw.recovery" ,
        data(){
            return {
                correo  : "" ,
                constraseniaAntigua : "" ,
                constraseniaNueva : "" ,
                datos : "" , 
            }
        },
        mounted() {
            let usuarioGuardado = localStorage.getItem("usuario");
            if (usuarioGuardado) {
                this.datos = JSON.parse(usuarioGuardado);
            }
        },
        methods : {
            ...mapActions(["loguin" , "actualizarUsuario"]),
            async enviandoActualizacion(){
                try{
                    await this.loguin(
                        {
                            correo  : this.correo , 
                            contrasenia : this.constraseniaAntigua ,

                        }
                    )
                    console.log("datos logueado es" , this.$store.state.respuesta )
                    if(this.$store.state.respuesta){
                        let codigo  =  this.$store.state.cod
                        await this.actualizarDatos(
                            {
                                correo  : this.correo , 
                                constraseniaNueva : this.constraseniaNueva ,
                                id : codigo
                            }
                        )
                    }
                }catch(err){
                    console.error(err)

                }
            },

            async actualizarDatos(obj){
                try{
                    await this.actualizarUsuario(obj)

                }catch(err){
                    console.log(err)

                }

            },
        }
    }

</script>
<style lang="scss">
@import '../../assets/styleGeneral.scss';
@import '../../assets/iconStyle.scss';
</style>