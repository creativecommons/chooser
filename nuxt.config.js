export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Choose a License',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Want to license your work with Creative Commons, but not sure where to start, or which license is right for you? Use our license chooser!',
      },
      { name: 'twitter:card', content: 'summary'},
      { name: 'twitter:site', content: '@creativecommons'},
      { name: 'twitter:creator', content: '@creativecommons'},
      { property: 'og:url'},
      { property: 'og:url', content: 'https://beta-chooser.creativecommons.org' },
      { property: 'og:title', content: 'Choose a License' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Want to license your work with Creative Commons, but not sure' +
                  ' where to start, or which license is right for you? Use our license chooser!' },
      { property: 'og:image', content: 'https://mirrors.creativecommons.org/presskit/logos/cc.logo.large.png' },
      { property: 'og:locale', content: 'en_US' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  srcDir: 'src/',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-vocabulary.js',
    '~/plugins/vue-scrollTo',
    '~/plugins/i18n.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [ '@nuxtjs/google-analytics' ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [ '@nuxtjs/sentry'],

  sentry: {
    dsn: process.env.NODE_ENV === 'production'
        ? 'https://8c09726e231d4cf780c541f40d3639a9@sentry.io/3009295' // cc-chooser-prod project
        : 'https://ab63acb8c1464466869182dd53c7046d@sentry.io/3009597', // cc-chooser-dev project
    logErrors: process.env.NODE_ENV !== 'production' // Only log errors in dev env
  },
  googleAnalytics: {
      id: 'UA-2010376-41',
      autoTracking: {
          screenview: true
      }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    extend (config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.plugins.push({src: '~/plugins/vue-hotjar', ssr: false})
      }
    }
  },
}
