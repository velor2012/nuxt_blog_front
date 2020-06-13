import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
      script:[
        {src:"/click.js",dataManual:true,type: 'text/javascript', charset: 'utf-8'} ,
        // {src:"//cdn.jsdelivr.net/npm/eruda",type: 'text/javascript', charset: 'utf-8'}
        // {src:"https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js",type: 'text/javascript', charset: 'utf-8'},
       // {src:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/prism.min.js",dataManual:true,type: 'text/javascript', charset: 'utf-8'},  
      ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        { src: "@/plugins/axios", ssr: true },
        { src: "@/plugins/scroller", ssr: false },
        { src: "@/plugins/filter", ssr: false },
        { src: "@/plugins/viewer", ssr: false },
        { src: '@/plugins/vueVirtualCollection', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
    buildModules: [
        '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
      theme: {
        dark: false,
        light: {
            primary: '#1982C4,',
            secondary: '#28965A,',
            accent: '#8C6E91',
            error: '#FF595E',
          },
    },
    treeShake:true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    port: process.env.PORT, // default: 3000
    host: process.env.HOST, // default: localhost,
},
}
