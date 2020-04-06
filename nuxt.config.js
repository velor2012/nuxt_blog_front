module.exports =  {
  runtimeCompiler: true,
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
      // { rel:"stylesheet",  href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},
      { rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css"}
    ],
    script:[
      {src:"https://cdn.bootcss.com/marked/0.8.0/marked.js",type: 'text/javascript', charset: 'utf-8'},
      {src:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js",dataManual:true,type: 'text/javascript', charset: 'utf-8'} ,
      // {src:"https://cdn.bootcss.com/wow/1.1.2/wow.min.js",type: 'text/javascript', charset: 'utf-8'},
      {src:"https://unpkg.com/scrollreveal",dataManual:true,type: 'text/javascript', charset: 'utf-8'} ,
      
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
    {src:'@/plugins/scroller', ssr: false },
    {src:'@/plugins/viewer', ssr: false },
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
    treeShake:true,
    theme: {
      dark: false,
      light:{
        primary:'#81D4FA',
        secondary: '#81D4FA',
        accent: '#81D4FA',
        error: '#81D4FA',
        info: '#2196F3',
        success: '#81D4FA',
        warning: '#81D4FA',
      }
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
      //使用支持运行时编译的vue，否则不能重新编译markdown的html
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      // config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"
    },
    // analyze: true, 	
    // assetFilter: function(assetFilename) {	    		
    //   return assetFilename.endsWith('.js');	    	
    // },
  },
  server:{
    host:'127.0.0.1',
    port:3000
  },
}
