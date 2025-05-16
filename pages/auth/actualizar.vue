<template>
        <div class="wrapper-login">
        <div class="section-up">
            <header>
                <nav class="header-home-nav no-fixed">
                    <img class="menu-icon" src="../../static/icons/menu-icon.svg" alt="menu icon">
                    <a><img class="logo-icon-small" src="../../static/icons/logo.svg" alt="logo of the webpage"></a>
                    <img class="shopping-cart" src="../../static/icons/shopping-cart.svg" alt="icon of a shopping cart">
                </nav>
            </header>
            <main class="main-my-account">
                    <h2 class="myaccount-tittle">My account</h2>
                    <label class="login-section__label" for="name-txt">Name</label>
                    <input class="general-input login-section__input" id="name-txt" readonly  :placeholder="datos.nombre" type="text">
                    <label class="login-section__label" for="email-txt">Email address</label>
                    <input class="general-input login-section__input" id="email-txt" readonly  :placeholder="datos.correo" type="text">
                    <label class="login-section__label" for="password-txt">Password</label>
                    <input class="general-input login-section__input" id="password-txt" readonly placeholder="************" type="password">
            </main>
        </div>
        <div class="section-down">
            <button id="create-account-btn" onclick="editAccount(this)" class="general-button white--btn">
                Edit
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name : "actualizar",
        data(){
            return {
                datos : "" , 
            }
        },
        mounted() {
            let usuarioGuardado = localStorage.getItem("usuario");
            if (usuarioGuardado) {
                this.datos = JSON.parse(usuarioGuardado);
            }
        },
        
    }
</script>
<style lang="scss">
@import '../../assets/styleGeneral.scss';
@import '../../assets/iconStyle.scss';
</style>