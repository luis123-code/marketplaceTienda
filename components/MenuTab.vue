<template>
    <header class="header-home-section">
          <nav class="nav-section">
              <div class="header-home-nav">
                  <img class="menu-icon" src="../static/icons/menu-icon.svg" alt="menu icon">
                  <div id="js-left-nav" class="left-nav">
                      <img id="js-link-logo" class="logo-icon-small" src="../static/icons/logo.svg"
                          alt="logo of the webpage">
                      <ul id="home-nav-desk" class="header-home-section__list hide-section">
                        <!--selected-item-desk-->
                        <li id="js-all-desk" class="header-home-section__list-option" v-for="(valores , index) in categories" :key="index" @click="filtrosCategorias(valores , index)"  :class="{'selected-item-desk' : index === isIndex  }"   >
                            {{valores}}
                        </li>
                      </ul>
                  </div>
                  <h2 id="js-tittle-logo" class="hide-logo">Shopping cart</h2>
                  <div class="right-nav">
                      <div class="email-menu">
                          <div class="email-menu__front"  @click="oprnMe()">
                              <span class="email-menu__text"  ></span>
                              <img class="arrow-down-icon" src="../static/icons/arrow-down.svg" alt="arrow down image">
                          </div>
                          <div id="js-menu-nav" class="email-menu__list "  :class="{ 'show-section' : isOpenMenu  }"  >
                              <ul class="email-list-ul" style="width: 125px;padding-right: 9px;padding-top: 16px;">
                                  <li class="menu-tab__logged__item"><nuxt-link class="style-no-link" to="/orderDate"  >My orderDate</nuxt-link></li>
                                  <li class="menu-tab__logged__item"><nuxt-link class="style-no-link" to="/auth/actualizar"  >My account</nuxt-link></li>
                                  <a href="#" class="email-list-ul__item menu-tab__loggin">Sign out</a>
                              </ul>
                          </div>
                      </div>
                      <div id="js-counter-circle" class="counter-circle">{{lengthCanastita}}</div>
                      <img class="shopping-cart" @click.stop="abrirCard()" src="../static/icons/shopping-cart.svg" alt="icon of a shopping cart">
                  </div>
              </div>
          </nav>
          <div class="search-wrapper">
              <div class="general-input center-search search-home-section">
                  <img class="search-home-icon search-icon" src="../static/icons/search-icon.svg" alt="search icon">
                  <input id="search-input" class="header-home-section__search" v-model="busquedaDatos" type="text" placeholder="Search product">
                  <img id="js-clean-search" class="search-home-icon clean-search" src="../static/icons/x-icon.svg"
                      alt="close icon">
              </div>
              <span class="header-home-section__text hide-section">Order:</span>
              <select class="header-home-section__order hide-section">
                  <option selected value="mostRecent">Most recent</option>
                  <option value="mostBought">Most popular</option>
                  <option value="ascendentOrder">Ascendent order</option>
              </select>
          </div>
          <ul id="home-nav-mobile" class="header-home-section__list">
              <li id="js-all-mobile" class="header-home-section__list-option" v-for="(valores , index) in categories" :key="index" @click="filtrosCategorias(valores , index)"  :class="{'selected-item-desk' : index === isIndex  }"   >
                {{valores}}
            </li>
          </ul>
      </header>
</template>
<script>
    export default {
        name : "MenuTab",
        data(){
            return {
                isOpenMenu : false ,
                isIndex : "" , 
                busquedaDatos : "" ,
                categories  : [ "All" , "Clothes", "Electronics", "Furnitures", "Toys", "Others"]
            }
        },
        mounted(){
            this.filtrosCategorias( "All" , 0)
        },
        computed : {
            lengthCanastita(){
                return this.$store.getters.gettersLengthCanastita
            },
            busqueda (){
                return this.$store.getters.gettersBuscarProdcutos
            }
        },
        watch :{
            busquedaDatos(value){
                this.$store.commit("insertarBusqueda" , value)
                this.busqueda
                console.log(value)
            },
        },

        methods : {
            abrirCard(){
                this.$store.commit("isStore")
            },
            oprnMe(){
                this.isOpenMenu = !this.isOpenMenu
            },
            filtrosCategorias(values , index ){
                values = values === "All" ? "" : values
                this.isIndex = index
                this.$store.commit("insertarBusqueda" , values)
                this.busqueda
            }
        }
    }
</script>