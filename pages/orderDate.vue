<template>
     <div class="wrapper-login">
        <header class="header-my-order">
            <nav class="header-home-nav nav--my-orders">
                <img class="menu-icon" src="../static/icons/menu-icon.svg" alt="menu icon">
                <a class="style-no-link" ><h2>My order date</h2></a>
                <img class="shopping-cart" src="../static/icons/shopping-cart.svg" alt="icon of a shopping cart">
            </nav>
        </header>
        <main class="my-orders-section" style="overflow-y:auto ;">
            <article class="shopping-card-item my-orders__item">
                <div class="part-up">
                    <span class="my-orders__item__date price-product">04.25.2021</span>
                    <span class="my-orders__item__amount">6 articles</span>
                </div>
                <div class="back-container part-down">
                    <span class="price-product">$ 120,00</span>
                    <img onclick="showDetails()" class="close-icon close-item" src="../static/icons/arrow-right.svg" alt="arrow right icon">
                </div>
            </article>
        </main>
    </div>
</template>
<script>
    export default {
        name : "orderDate" , 
        mounted(){
            this.$store.commit("llamandoProductLocal")
            console.log("<ZX<ZC" , this.gettersLocal)
        },
        computed:{
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