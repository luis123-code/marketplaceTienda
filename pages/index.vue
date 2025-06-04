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
                  <li class="menu-tab__logged__item"><nuxt-link class="style-no-link" to="/orderDate"  >My orderDate</nuxt-link></li>
                  <li class="menu-tab__logged__item"><nuxt-link class="style-no-link" to="/auth/passw.recovery"  >My account</nuxt-link></li>
              </ul>
          </div>
          <div>
              <span class="menu-tab__email"></span>
              <a class="menu-tab__loggin">Sign out</a>
          </div>
      </div>



      <sliderProduct></sliderProduct>
      <cardShopping></cardShopping>
      <MenuTab></MenuTab>
      <containerProduct :productoArr="items" ></containerProduct>


    </div>
</template>

<script>
import { mapActions } from 'vuex';
import MenuTab from '~/components/MenuTab.vue';
import containerProduct from '~/components/containerProduct.vue';
import sliderProduct from '~/components/sliderProduct.vue';
import cardShopping from '~/components/cardShopping.vue';
import { getters } from '~/store';

export default {
  components : {
    MenuTab,
    containerProduct ,
    sliderProduct,
    cardShopping
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
  mounted(){
        this.$store.commit("llamandoProductLocal")
        this.$store.commit("localCanastAgregando" , this.gettersLocal)
        console.log("dasd",this.gettersLocal)
  },

  computed : {
    gettersLocal(){
        return this.$store.getters.gettersllamandoLocal
    },
  },

  methods: {
    ...mapActions(["obtniendoProductos"]),
    async recibirProducts() {
      try{
        await this.obtniendoProductos({})
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
