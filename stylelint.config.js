module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],

  rules: {
    'color-hex-length': 'long',
  },

  ignoreFiles: ['docs/css/*'],
}
