<template>
        <div class="wrapper-login">
        <header class="header-my-order">
            <nav class="header-home-nav nav--my-orders">
                <img class="menu-icon" src="../static/icons/menu-icon.svg" alt="menu icon">
                <a class="style-no-link"><h2>My order</h2></a>
                <img class="shopping-cart" src="../static/icons/shopping-cart.svg" alt="icon of a shopping cart">
            </nav>
        </header>
        <main class="my-orders-section" style="overflow-y:auto ;">
            
            
            
            <article class="shopping-card-item my-orders__item my-orders__item--special" v-for="(values , index) in gettersLocal" :key="index">
                <div class="part-up" style=" width: 100%;display: flex;">
                    <div class="my-orders__item__date price-product" style="width: 50%;">
                        {{  fechaFormato }}
                    </div>
                    <div style="width: 50%;display: flex;gap: 18px;">
                        <span class="my-orders__item__amount" style="align-self: flex-start;" >{{values.cantidad}} articles</span>
                        <span class="image-border" style="position: relative;" :style="{ 'background-image': `url(${ values.imgs ? values.imgs[0].img : ''})` }" ></span>
                    </div>
                </div>
                <div class="back-container part-down">
                    <span class="productTotal  price-product"></span>
                </div>
            </article>




        </main>
    </div>

</template>
<script>
    export default {
        name : "orders" , 
        created() {
            console.log(this.$store.getters.gettersCanastita)
        },
        mounted(){
            this.$store.commit("llamandoProductLocal")
            console.log("<ZX<ZC" , this.gettersLocal)
        },
        computed: {
            fechaFormato (){
                const hoy = new Date();
                const opciones = { timeZone: 'America/Lima' };
                const fechaLima = new Date(hoy.toLocaleString('en-US', opciones));
                const mes = String(fechaLima.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
                const dia = String(fechaLima.getDate()).padStart(2, '0');
                const anio = fechaLima.getFullYear();
                return `${mes}.${dia}.${anio}`;
            },
            gettersLocal(){
                return this.$store.getters.gettersllamandoLocal
            },
        
        }

    }
</script>
<style lang="scss">
@import '../assets/styleGeneral.scss';
@import '../assets/iconStyle.scss';
</style>