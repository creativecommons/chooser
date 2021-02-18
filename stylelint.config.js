module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],

  rules: {
    'block-no-empty': null,
    'color-hex-length': 'long'
  },

  ignoreFiles: ['docs/css/*']
}
