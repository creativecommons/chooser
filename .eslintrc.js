module.exports = {
  root: true,

  plugins: ['cypress'],

  env: {
    node: true,
    browser: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2],
    'comma-dangle': ["error", "always-multiline"],
    'space-before-function-paren': ['warn', 'never'],
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/html-indent': ['error', 2],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [

    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    'prettier',
    'prettier/vue',
    "plugin:cypress/recommended"
  ],
}
