module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    'space-before-function-paren': ['warn', 'never'],
    'key-spacing': ['warn', {beforeColon: false}],
    'space-before-blocks': ['warn', 'always'],
    semi: ['warn', 'always'],
    'spaced-comment': ['warn', 'never'],
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['warn', 'never'],
    'padded-blocks': ['warn', 'never'],
    'no-async-promise-executor': 'off',
    'prefer-const': 'warn',
    'keyword-spacing': ['warn', {before: true}],
    'no-multiple-empty-lines': ['warn', {max: 2}],
    'space-infix-ops': ['warn', {int32Hint: false}],
    'space-in-parens': ['warn', 'never'],
    'comma-spacing': ['warn', {before: false, after: true}],
    'comma-dangle': ['warn', 'never'],
    'dot-notation': 'off',
    'import/first': 'off',
    'import/no-duplicates': 'off',
    'semi-spacing': ['warn', {before: false, after: true}],
    'max-lines-per-function': ['warn', {max: 20}],
    camelcase: ['error', {properties: 'always'}],
    'capitalized-comments': 'off',
    'no-lonely-if': 'warn',
    'no-whitespace-before-property': 'error',
    eqeqeq: ['warn', 'smart'],
    'no-undef': 'off'
  }
};
