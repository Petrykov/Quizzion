module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    indent: 'off',
    quotes: ['warn', 'single'],
    'space-before-function-paren': ['warn', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'key-spacing': ['warn', {beforeColon: false}],
    'space-before-blocks': ['warn', 'always'],
    semi: ['warn', 'always'],
    'spaced-comment': ['warn', 'always', {exceptions: ['-', '+']}],
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['warn', 'never'],
    'padded-blocks': ['warn', 'never'],
    'no-async-promise-executor': 'off',
    'prefer-const': 'warn',
    'keyword-spacing': ['warn', {before: true}],
    'no-multiple-empty-lines': ['warn', {max: 2}],
    'space-infix-ops': ['warn', {int32Hint: false}],
    'space-in-parens': ['warn', 'always'],
    'comma-spacing': ['warn', {before: false, after: true}],
    'comma-dangle': ['warn', 'never'],
    'dot-notation': 'off',
    'import/first': 'off',
    'import/no-duplicates': 'off',
    'semi-spacing': ['warn', {before: false, after: true}]

  }
};
