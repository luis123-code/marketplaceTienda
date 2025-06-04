export default {
  // Global page headers
  head: {
    titleTemplate: '%s - tiendaMarketplace',
    title: 'tiendaMarketplace',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js',
        defer: true
      }
    ]
  },

  // Global CSS
  css: [
    '../tienda2/assets/styleGeneral.scss' // 👈 Asegúrate que sea esta ruta
  ],

  // Plugins
  plugins: [],
  target: 'static',

  // Auto import components
  components: true,

  // Build Modules
  buildModules: [
    '@nuxtjs/eslint-module'
    // Elimina '@nuxtjs/vuetify' de aquí
  ],

  // 👉 Aquí agregas dotenv
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv' // <-- AÑADIDO AQUÍ
  ],

  // Axios Config
  axios: {},

  // Vuetify Config
  vuetify: false, // <-- Elimina la configuración de Vuetify aquí

  // Build Config
  build: {}
}
