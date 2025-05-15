<template>
    <div  id="body-home">
      <div id="js-menu-tab" class="menu-tab">
          <img class="close-icon" src="../static/icons/x-icon.svg" alt="close icon">
          <div>
              <h2 class="menu-tab__tittle">CATEGORIES</h2>
              <ul class="menu-tab__main-list">
                  <li class="menu-tab__main-list__item">All</li>
                  <li class="menu-tab__main-list__item">Clothes</li>
                  <li class="menu-tab__main-list__item">Electronics</li>
                  <li class="menu-tab__main-list__item">Furnitures</li>
                  <li class="menu-tab__main-list__item">Toys</li>
                  <li class="menu-tab__main-list__item">Others</li>
              </ul>
              <ul class="menu-tab__logged">
                  <li class="menu-tab__logged__item"><a class="style-no-link" >My orders</a></li>
                  <li class="menu-tab__logged__item"><a class="style-no-link">My account</a></li>
              </ul>
          </div>
          <div>
              <span class="menu-tab__email"></span>
              <a class="menu-tab__loggin">Sign out</a>
          </div>
      </div>



      <sliderProduct></sliderProduct>

      <div id="js-shopping-card-tab" class="shopping-card-tab">
          <div id="js-shopping-container-items" class="shopping-card-top"></div> <!-- section where insert the items -->
          <div class="shopping-card-bottom">
              <div class="shopping-card-total">
                  <span class="login-section__label shopping-card-total__text">Total</span>
                  <span id="js-shopping-total" class="price-product shopping-card-total__price">$ 0.00</span>
              </div>
              <button id="checkout-btn" class="general-button green--btn">
                  <a href="../views/my-order.html" class="enviandoDatos" style="text-decoration: none;color: white;" > Checkout</a>
              </button>
          </div>
      </div>
      <MenuTab></MenuTab>
      <containerProduct :productoArr="items" ></containerProduct>


    </div>
</template>

<script>
import { mapActions } from 'vuex';
import MenuTab from '~/components/MenuTab.vue';
import containerProduct from '~/components/containerProduct.vue';
import sliderProduct from '~/components/sliderProduct.vue';

export default {
  components : {
    MenuTab,
    containerProduct ,
    sliderProduct
  },
  data() {
    return {
      fixed: false,
      message: 'Hello World',
      items: [],
      selectedItem: null,
      showDialog: false,
      dialogTitle: '',
      productoMostrar : ""
    };
  },
  created() {
    this.recibirProducts();
  },

  methods: {
    ...mapActions(["obtniendoProductos"]),
    async recibirProducts() {
      try{
        await this.obtniendoProductos()
        this.items = this.$store.state.productos
        console.log("la respuesta es" , this.$store.state.respuestaProductos ,   this.items  )
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>
<style lang="scss">
@import '../assets/styleGeneral.scss';
@import '../assets/iconStyle.scss';
</style>
