module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // Desactivar todas las reglas
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    // Agrega aquí cualquier otra regla que desees desactivar
  }
}