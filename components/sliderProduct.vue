<template>
    <div id="js-product-detail" class="product-detail-tab":class="{ 'show-product-detail': dialogImg }"  >
        <article class="shopping-card-item">
                <div class="">
                <div id="js-detail-img" class="new-img product-detail-img" :style="{ 'background-image': `url(${ informacion.imgs ? informacion.imgs[0].img : ''})` }" >
                    <div class="wrapper-close-btn"></div>
                    <img class="close-icon" src="../static/icons/x-icon.svg" alt="close icon"  @click="()=> dialogImg = false" >
                    <div class="points-wrapper">
                        <div class="point selected-point"></div>
                        <div class="point"></div>
                        <div class="point"></div>
                    </div>
                </div>
                
                <div class="product-detail-info">
                    <span id="js-detail-price" class="price-product">${{informacion.price}}</span>
                    <h3 id="js-detail-tittle" class="recovery-text">{{informacion.name}}</h3>
                    <p id="js-detail-descrip" class="recovery-text">{{informacion.description}} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
    
                <div class="product-detail-buttom">
                    <button  @click.stop="agrgandoCamasta()"   data-product="n3237" style="background-color :rgb(113, 114, 113)" id="js-detail-btn" class="general-button green--btn">
                        <img class="normal--size" src="../static/icons/shopping-icon.svg" alt="image of shopping car">
                        <span id="js-detail-btn-text" class="product-detail-buttom__text">Add to cart</span>
                    </button>
                </div>
            </div>
        </article> 
    </div>
</template>
<script>
    export default {
        name : "sliderProduct",
        data(){
            return{
                dialogImg : false
            }
        },


        watch: {
            '$store.getters.gettersProductos': {
                handler(nuevoValor) {
                    if(this.$store.getters.gettersProductos !== ""){
                        this.dialogImg = true
                    } 
                },
                immediate: true // Opcional, si quieres que se dispare al montar el componente también
                }
            },
        computed : {
            informacion(){
                return this.$store.getters.gettersProductos
            },

        },
        methods : {
            agrgandoCamasta(){
                let producto = this.informacion
                this.$store.commit("agregarProductos" , producto )
            },

        }
    }
</script>
