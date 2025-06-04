<template>
    <div id="js-shopping-card-tab" class="shopping-card-tab " :class="{'show-section' : gettersAbrirCanastita }"   >
        <div id="js-shopping-container-items" class="shopping-card-top">
            
            
            <article  class="shopping-card-item " v-for="(valores , index ) in informacionCanastita"  :key="index" :class="{ 'slide-out-left':  isIndex ===  index }"   > 
                    <div class="front-container">
                    <div class="image-border" style="position: relative;" :style="{ 'background-image': `url(${ valores.imgs ? valores.imgs[0].img : ''})` }" >
                        <div id="js-counter-circle" class="counter-circle">{{valores.cantidad}}</div>
                    </div>
                    <span class="name-product">{{valores.name}}</span>
                    </div><div class="back-container">
                    <span class="price-product">{{valores.price}}</span>
                    <img id="n3226" class="close-icon close-item" src="../static/icons/x-icon.svg" @click="eliminarProductos(valores , index)" alt="close item">
                    </div>
            </article>
            <article v-if="informacionCanastita.length === 0">
                <img src="../static/icons/shopping-icon.svg" />
            </article>

            </div> 
          <div class="shopping-card-bottom">
              <div class="shopping-card-total">
                  <span class="login-section__label shopping-card-total__text">Total</span>
                  <span id="js-shopping-total" class="price-product shopping-card-total__price">S/{{CantidadComprasCanastita}}</span>
              </div>
              <button id="checkout-btn" class="general-button green--btn" @click="enviandoOrden()" >
                <a to="/orders" class="enviandoDatos" style="text-decoration: none;color: white;">Checkout</a>
              </button>
          </div>
      </div>
</template>
<script>
    export default {
        name : "cardShopping" ,
        data(){
            return {
                isIndex:"" ,
            }
        } ,

        computed : {
            informacionCanastita(){
                return this.$store.getters.gettersCanastita
            },
            CantidadComprasCanastita(){
                return this.$store.getters.gettersCanastitaTotal
            },
            gettersAbrirCanastita(){
                return this.$store.getters.gettersAbrirCanastita
            },

        },
        methods : {
            eliminarProductos(obj , index ){
                const item = this.informacionCanastita.find(p => p.id === obj.id)
                if (item.cantidad === 1) {
                    this.isIndex = index
                    setTimeout(() => {
                        this.$store.commit('eliminarProducto', obj)
                        this.isIndex = ""
                    }, 1000)
                }else{
                    this.$store.commit('eliminarProducto', obj)
                }
            
            },
            enviandoOrden(){
                this.$store.commit('agregandoProductLocal', this.informacionCanastita)
                this.$router.push("/orders")
            }
        }


        
    }
</script>
<style >
    @keyframes slideOutLeft {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.slide-out-left {
  animation: slideOutLeft 0.4s forwards;
}
</style>