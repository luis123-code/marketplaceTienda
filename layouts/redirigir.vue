<template>
        <div class="" style="display : flex;">
          <header>
              <navAdmin></navAdmin>
          </header>
          <main style="height: 100vh; width: 100%;background: #F7F7F7D9;  overflow: auto;">
            <Nuxt />
          </main>
                
        </div>
</template>
<script>
  import navAdmin from "../components/navAdmin.vue" 
  export default {
      name: 'redirigir',
      comments : {
        navAdmin
      },
      created(){
           
          },


  }
</script>

<style scoped>

  

.footer {
  background-color: #1c1c1c;
  text-align: center;
  padding: 10px;
  color: #ccc;
  font-size: 0.875rem;
}
</style>
