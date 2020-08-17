module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console':process.env.NODE_ENV === 'production' ? 'error': 'off',
    'no-debugger':process.env.NODE_ENV === 'production' ? 'error':'off',
    'one-var': 0,
    'one-eval':0,
    'semi': [2,'always'],
    'indent':[2,4],
    'camelase': 0,
    'eqeqeq': 0,
    'no-tabs': 0
  },
  parserOptions:{
    parser:'babel-eslint'
  }
}