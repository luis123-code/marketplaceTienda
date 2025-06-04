<template>
        <div class="wrapper-recovery">
        <header class="header-section-recovery">
            <nav>
                <img  style="cursor : pointer ;" @click="()=>$router.push('/')" class="logo-icon" src="../../static/icons/logo.svg" alt="logo of the webpage">
            </nav>
        </header>
        <main>
            <h2 class="recovery-tittle">Password recovery</h2>
            <p class="recovery-text">Inform the email address used to create your account</p>
            <label class="login-section__label" for="user-txt">Email address</label>
            <input class="general-input login-section__recovery" v-model="correo" id="user-txt" placeholder="name@gmail.com" type="text">
            <label class="login-section__label" for="login-txt">Contraseña antigua</label>
            <input class="general-input login-section__recovery " v-model="constraseniaAntigua" id="Contrasenia-txt" placeholder="*********" type="password">
            <label class="login-section__label" for="login-txt">Contraseña nueva</label>
            <input class="general-input login-section__recovery" v-model="constraseniaNueva" id="Contrasenia-txt" placeholder="*********" type="password">
            <div id="js-error-message" class="error-message" v-if="false">Invalid user ID and password combination</div>

            <a @click="enviandoActualizacion()">
                <button id="validacionDatos-btn" class="general-button green--btn">
                    {{dinamicoCargando}}
                </button>
            </a>
            <nuxt-link class="general-message-link green__message" to="/auth">Back</nuxt-link>
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
                dinamicoCargando : "Submit"
            }
        },
        methods : {
            ...mapActions(["loguin" , "actualizarUsuario"]),
            async enviandoActualizacion(){
                this.dinamicoCargando = "Cargando ..."
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
                        setTimeout(() => {
                            this.dinamicoCargando = "Se actualizo";
                            setTimeout(() => {
                                this.$router.push("/auth")
                            }, 3000);
                        }, 3000);
                    }else{
                        setTimeout(() => {
                            this.dinamicoCargando = "Error al actualizar. Por favor, verifica tu correo y contraseña.";
                            setTimeout(() => {
                                this.dinamicoCargando = "Submit";
                            }, 3000);
                        }, 3000);
                    }
                }catch(err){
                    console.error(err)
                }
            },

            async actualizarDatos(obj){
                try{

                    await this.actualizarUsuario(obj)
                    
                setTimeout(()=> {
                    this.dinamicoCargando = "Se actualizó correctamente.";
                },3000)

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