<template>
  <v-row justify="center" align="center">
    <p>hol a mundo {{message}} </p>   
  </v-row>
</template>

<script>
import serviceAxios from '../service/index.js';

export default {
  data() {
    return {
      fixed: false,
      message: 'Hello World',
      items: [
        { title: 'Item 1', description: 'Description 1' },
        { title: 'Item 2', description: 'Description 2' },
        { title: 'Item 3', description: 'Description 3' }
      ],
      selectedItem: null,
      showDialog: false,
      dialogTitle: '',
    };
  },
  created() {
    this.enviarDatos();
  },

  methods: {
    async enviarDatos() {
      try {
        const datos = {
          nombre: 'Marai',
          apellido: 'González',
          correo: 'luis@example.com',
          telefono: '987654321',
          ciudad: 'Lima',
        };

        const respuesta = await serviceAxios(
          {
            method: 'GET',
            url : "/rest/v1/admin",
          } 
        )

        console.log('Respuesta del servidor:', respuesta.data);
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
    },






  }
}
</script>
