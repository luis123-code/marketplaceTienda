<template>
        <div class="">
          <main>
            <Nuxt />
          </main>
                
        </div>
</template>
<script>
  import navAdmin from "../components/navAdmin.vue" 
  export default {
      name: 'admin-layout',
      comments : {
        navAdmin
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
