<template>
    <div class="wrapper-login">
        <div class="section-up">
            <header class="header-section-login">
                <nav>
                    <img class="close-icon"  alt="close icon">
                    <img class="logo-icon"  alt="logo of the webpage">
                </nav>
            </header>
            <main class="login-section">
                <label class="login-section__label" for="user-txt">Admin</label>
                <input v-model="form.idUsuario" class="general-input login-section__input" id="js-user-txt" type="text">
                <label class="login-section__label" for="password-txt">Password</label>
                <input v-model="form.contrasenia" class="general-input login-section__input" id="js-password-txt" type="password">
                <div id="js-error-message" class="error-message" style="height:40px" v-show="isValidando">Invalid user ID and password combination</div>
                <div id="js-error-message" class="error-message" style="height:40px" v-show="islogin">ID no logueada</div>
                <button id="login-btn" class="general-button green--btn"  @click.stop="login()">
                    {{isDinamico}}
                </button>
            </main>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
    layout: 'admin',
    data(){
        return {
            form : {
                idUsuario : "" ,
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
        ...mapActions(["adminPower"]),
        comprobarDatos() {
            return {
                datos : this.form.idUsuario && this.form.contrasenia ,
            };s
        },

        async login(){
            if ( this.comprobarDatos().datos) {
                console.log("se logueo")
                this.isDinamico = "Cargando ..."
                try {
                    await this.adminPower(this.form)
                    console.log("datos logueado es" , this.$store.state.respuestaAdmin )
                    if(this.$store.state.respuestaAdmin){
                    setTimeout(()=> {
                        this.isDinamico = "Bienvenido Admin"
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
</style>