import colors from 'vuetify/es5/util/colors'

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [],

  // Plugins
  plugins: [],

  // Auto import components
  components: true,

  // Build Modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // 👉 Aquí agregas dotenv
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv' // <-- AÑADIDO AQUÍ
  ],

  // Axios Config
  axios: {},

  // Vuetify Config
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Config
  build: {}
}
