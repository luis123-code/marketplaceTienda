<template>
  <div class="wrapper-home">
    <main id="js-products-container" class="article-section">
      <article class="article-section-item" v-for="(valores, index) in productoArr" :key="index">
        <div @click.stop="clickeandoProducto(valores)"
          class="article-section-item__img new-img" 
          :style="{ 'background-image': `url(${valores.imgs[0].img})` }"
        ></div>
        <div class="article-section-item__content">
          <div class="card-text">
            <span class="grey__message price-product">S/{{ valores.price }}</span>
            <span class="green__message name-product">{{ valores.name }}</span>
          </div>
          <div class="circle-border"></div>
          <img 
            class="add_to_card" 
            src="../static/icons/add_to_cart.svg" 
            alt="image of a shopping car"
          />
        </div>
      </article>
    </main>
  </div>
</template>


<script>
export default {
    name: "containerProduct",
    props :{    
        productoArr : {
            type : Array ,
            default : () => [] ,
        }
    },
    created (){
        console.log("productos ven a mi " , this.productoArr)
    },
    methods:{
        clickeandoProducto(datos){
            this.$store.commit("setProductosMostrar" , datos )
            console.log(this.$store.getters.gettersProductos)
        },
    }
};
</script>