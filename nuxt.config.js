import colors from 'vuetify/es5/util/colors'
const { VUE_APP_GOOGLE_API_KEY, ATTA_BACKEND } = process.env
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - atta_frontend',
    title: 'atta_frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      },
      {
        rel: 'stylesheet',
        href: '//cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/auth0.js' },
    // サーバーサイドでは使用できないのでssrはfalseにすること
    { src: '~/plugins/persistedstate.js', ssr: false },
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/vue2-google-maps.js' },
  ],

  auth0: {
    domain: 'dev-w0-rzoqk.jp.auth0.com',
    clientID: '3GyZvQ1eR3GTObkONiIOg3fhuas66vqW',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'ja', iso: 'ja_JP' },
          { code: 'en', iso: 'en-US' },
        ],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
        },
        vueI18nLoader: true,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/, 'vee-validate/dist/rules'],
  },

  generate: {
    dir: './public',
  },

  env: {
    VUE_APP_GOOGLE_API_KEY: process.env.VUE_APP_GOOGLE_API_KEY,
    ATTA_BACKEND: process.env.ATTA_BACKEND
  },
}
