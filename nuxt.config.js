import colors from 'vuetify/es5/util/colors'

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel:"stylesheet",  href:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-funky.min.css"},
      { rel:"stylesheet",  href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},
      { rel:"stylesheet",  href:"https://cdnjs.cloudflare.com/ajax/libs/imagehover.css/2.0.0/css/imagehover.min.css"},
    ],
    script:[
      {src:"https://cdn.bootcss.com/marked/0.8.0/marked.js",type: 'text/javascript', charset: 'utf-8'},
      {src:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js",dataManual:true,type: 'text/javascript', charset: 'utf-8'} ,
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
    {src:'@/plugins/axios', ssr: true },
    {src:'@/plugins/vue-preview', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
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
    customVariables: ['~/assets/variables.scss'],
    treeShake:false,
    theme: {
      dark: false,
    },
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
  }
}
