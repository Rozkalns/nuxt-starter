const app = 'tipe'
const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')
const stage = process.env.APP_STAGE || 'local'
const getEnvVar = ({ production, staging, local }) => {
  return stage === 'production'
    ? production
    : stage === 'staging'
      ? staging
      : local
}

if (env === 'development') {
  require('dotenv').config()
}

module.exports = {
  /*
  ** Environment
  */
  env: {
    local: stage === 'local',
    staging: stage === 'staging',
    production: stage === 'production',
    APP_STAGE: stage,
    TIPE_API_KEY: process.env.TIPE_API_KEY,
    TIPE_ID: process.env.TIPE_ID,
    SEGMENT_KEY: process.env.SEGMENT_KEY,
    API_URL:
      process.env.API_URL ||
      getEnvVar({
        production: 'https://api.tipe.io',
        staging: 'https://staging.api.tipe.io',
        local: 'http://localhost:4500'
      }),
    COOKIE_NAME:
      process.env.COOKIE_NAME ||
      getEnvVar({
        production: app + '-accessToken',
        staging: 'staging-' + app + '-accessToken',
        local: 'local-' + app + '-accessToken'
      })
  },
  /*
  ** Headers of the page
  */
  head: {
    title: app,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tipe' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Nuxt modules
  */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/bulma',
    '@nuxtjs/font-awesome'
  ],
  /*
  ** Apollo clients
  */
  apollo: {
    clientConfigs: {
      default: '~/apollo/default.js'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** PostCSS
    */
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
