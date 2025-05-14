module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',  // Asegúrate de usar el parser de Vue
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    ecmaVersion: 2015
  },
  extends: [],  // Eliminamos cualquier extensión de reglas por defecto
  plugins: [
    'vue',  // Plugin de Vue para ESLint, se mantiene si trabajas con Vue
  ],
  rules: {
    // Desactivamos todas las reglas
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'comma-dangle': 'off',
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'off',
    'vue/multi-word-component-names': 'off',
    'eol-last': 'off'
    // Añadir más reglas desactivadas si es necesario
  }
}
