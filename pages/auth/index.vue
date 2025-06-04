<template>
    <div class="wrapper-login">
        <div class="section-up">
            <header class="header-section-login">
                <nav>
                    <img style="cursor : pointer ;"  @click="()=>$router.push('/')" class="logo-icon"  src="../../static/icons/logo.svg"  alt="logo of the webpage">
                </nav>
            </header>
            <main class="login-section">
                <label class="login-section__label" for="user-txt">Email address</label>
                <input v-model="form.correo" class="general-input login-section__input" id="js-user-txt" type="text">
                <label class="login-section__label" for="password-txt">Password</label>
                <input v-model="form.contrasenia" class="general-input login-section__input" id="js-password-txt" type="password">
                <div id="js-error-message" class="error-message" style="height:40px" v-show="isValidando">Invalid user ID and password combination</div>
                <div id="js-error-message" class="error-message" style="height:40px" v-show="isCorreo">Correo invalido</div>
                <div id="js-error-message" class="error-message" style="height:40px" v-show="islogin">Cuenta no logueada</div>
                <button id="login-btn" class="general-button green--btn"  @click.stop="login()">
                    {{isDinamico}}
                </button>
                <a @click.stop="()=> $router.push('/auth/actualizar_login')" class="general-message-link green__message"  style="height:35px">Forgot my
                    password</a>
            </main>
        </div>
        <div class="section-down">
            <button  id="singup-btn" class="general-button white--btn"  @click.stop="()=> $router.push('/auth/registro') "  >
                <a  style="text-decoration: none;color: #acd9b2;">Sign up</a>
            </button>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
    data(){
        return {
            form : {
                correo : "" ,
                contrasenia : ""
            } ,
            isValidando : false,
            isCorreo : false ,
            islogin : false,
            isDinamico : "Log in" , 
        }
    },
    watch :{
        form : {
            handler(){
                this.isValidando = !this.comprobarDatos().datos ? true : false
                this.isCorreo = this.comprobarDatos().email ? true : false
            },
            deep :true
        },

        isValidando(focus){
            if(focus){
                setTimeout(()=> {
                    this.isValidando = false
                },3000)
            }
        },
        isCorreo(focus){
            if(focus){
                setTimeout(()=> {
                    this.isCorreo = false
                },3000)
            }
        },
        
        islogin(focus){
            if(focus){
                setTimeout(()=> {
                    this.islogin = false
                },5000)
            }
        }



    },

    methods : {
        ...mapActions(["loguin"]),
        comprobarDatos() {
            return {
                datos : this.form.correo && this.form.contrasenia ,
                email : this.form.correo && !this.form.correo.includes('@')
            };s
        },

        async login(){
            if ( this.comprobarDatos().datos && !this.comprobarDatos().email) {
                console.log("se logueo")
                this.isDinamico = "Cargando ..."
                try {
                    await this.loguin(this.form)
                    console.log("datos logueado es" , this.$store.state.respuesta )
                    if(this.$store.state.respuesta){
                    localStorage.setItem("usuario", JSON.stringify({ correo: this.$store.state.correo, nombre: this.$store.state.usuario }));
                        setTimeout(()=> {
                        this.isDinamico = "Bienvenido"
                    },3000)


                    }else{
                        this.islogin = true
                        setTimeout(()=> {
                        this.isDinamico = "Log in"
                        },3000)
                    }
                } catch (error) {
                    
                }
            }
        },







    }
}

</script>
<style lang="scss">
@import '../../assets/styleGeneral.scss';
@import '../../assets/iconStyle.scss';
</style>