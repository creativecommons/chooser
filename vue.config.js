module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  devServer: {
    host: '0.0.0.0', 
    allowedHosts: ['.gitpod.io'],
  },
};
