<template>     
      <div class="wrapper-login">
        <div class="section-up">
            <header class="header-section-login">
                <nav>
                  <img style="cursor : pointer ;"  @click="()=>$router.push('/')" class="logo-icon"  src="../../static/icons/logo.svg"  alt="logo of the webpage">
                </nav>
            </header>
            <main class="login-section">
                <label class="login-section__label" >Nombre</label>
                <input v-model="form.name" class="general-input login-section__input"  type="text">
                <label class="login-section__label" >Apellido</label>
                <input v-model="form.apellido" class="general-input login-section__input"  type="text">
                <label class="login-section__label" >Email address</label>
                <input v-model="form.email" class="general-input login-section__input" type="text">
                <label class="login-section__label">Password</label>
                <input v-model="form.password" class="general-input login-section__input"  type="password">
                <label class="login-section__label">Telefono</label>
                <input v-model="form.phone" class="general-input login-section__input"  type="text">
                <label class="login-section__label">Ciudad</label>
                <input v-model="form.city" class="general-input login-section__input"  type="text">
                <div id="js-error-message" class="error-message" v-show="isValid" style="height: 35px;">Campus Obligatorio</div>
                <div id="js-error-message" class="error-message" v-show="emailError" style="height: 35px;">Invalid email </div>
                <button id="Registrarse-btn" class="general-button green--btn" @click.stop="enviarFormulario">
                    {{dinamico}}
                </button>
            </main>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      valid: false,
      error: '',
      form: {
        name: '',
        apellido: '',
        email: '',
        password: '' ,
        phone: '',
        city: '',
      },
      isValid: false,
      emailError: false,
      dinamico : "Registrarse"
    };
  },
  watch: {
    //Parte	Qué hace
    //handler	Define la función que se ejecuta cuando cambia el valor observado.
    //deep: true	Hace que Vue vigile los cambios internos dentro de un objeto anidado.
    form: {
      handler() {
        this.isValid = this.comprobarDatos().datos ? false : true;
        this.emailError = this.comprobarDatos().email ? true : false;
      },
      deep: true
    },
    
    isValid(focus){
      if (focus) {
          setTimeout(() => {
                this.isValid = false;
          }, 3000);
      }
    },

    emailError(focus){
      if (focus) {
          setTimeout(() => {
                this.emailError = false;
          }, 3000);
      }
    }


  },
  computed: {
    ...mapState(['respuestaRegistro']),
  },

  methods: {
    ...mapActions(['registro']),
    async enviarFormulario() {
      if ( this.comprobarDatos().datos && !this.comprobarDatos().email) {
        this.dinamico = "cargando ..."
        console.log('Formulario enviado:', this.form);
        try {
          await this.registro(this.form);
          if(this.respuestaRegistro){
          setTimeout(() => {
                this.dinamico = "Se registro"
                  setTimeout(() => {
                    this.$router.push("/auth")
                  }, 3000);
          }, 3000);
          
            console.log('Registro exitoso' , this.$store.state.respuestaRegistro)
          }
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        }
        return
      }
    },

    comprobarDatos() {
      return {
        datos : this.form.name && this.form.apellido && this.form.email && this.form.password && this.form.phone && this.form.city ,
        email : this.form.email && !this.form.email.includes('@')
      };
    },

  }
};
</script>

<style lang="scss">
@import '../../assets/styleGeneral.scss';
@import '../../assets/iconStyle.scss';
</style>
