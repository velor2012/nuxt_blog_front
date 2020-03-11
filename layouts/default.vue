<template>
  <v-app dark v-resize="onResize" class="app">
    <msg v-bind:message="message"/>
    <!-- 左边抽屉 -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      dark
      color="blue"
      class="v-navigation-drawer"
      :disable-resize-watcher="true"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="goTo(item.to)"
          router
          exact
          class="v-list-item"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group>
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>mdi-hammer-screwdriver</v-icon>
              </v-list-item-action>  
              <v-list-item-title>
                其它
              </v-list-item-title>
            </template>
            <v-list-item
            v-for="(item,n) in other"
            :key="n"
            :to="item.to"
            >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon light>{{item.icon}}</v-icon>
              </v-list-item-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- bar栏 -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="blue"
      id="header"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"  v-if="ismobile"/>
      <v-toolbar-title v-text="title" class="v-toolbar-title"/>
      <v-spacer />
      <!-- 搜索输入框 网页端 -->
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down search_input"
        solo
        rounded
        v-model="keyword"
        @keyup.native.enter="search"
      />
      <v-spacer />
      <!-- 搜索按钮手机端 -->
      <v-btn icon v-if="ismobile">
        <v-icon @click.native="showSearchDialog">mdi-magnify</v-icon>
      </v-btn>
        <!-- 目录按钮手机端 -->
      <v-btn icon v-if="ismobile&& /\/detail\/\w+/.test($route.path)">
        <v-icon @click.native="open_right">mdi-book</v-icon>
      </v-btn>
      <!-- 其他功能，关于博客，作者信息 网页端 -->
      <v-btn 
      v-for="(item, i) in items"
      :key="i"
      @click="goTo(item.to)"
       class="d-none d-sm-flex"
       text
       v-if="!ismobile" 
      >
        <v-icon>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="open_right" class="d-none d-sm-flex"/> -->
      <!-- other设置，网页端显示 -->
     <v-menu
        bottom
        v-if="!ismobile"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <v-icon>mdi-hammer-screwdriver</v-icon>
            其他功能
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item,n) in other"
            :key="n"
            :to="item.to"
          >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon light>{{item.icon}}</v-icon>
              </v-list-item-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- 筛选菜单，手机端 -->
      <v-menu
        left
        bottom
        v-if="ismobile&& $route.path=='/'"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-filter-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item,n) in filters"
            :key="n"
            @click="filter(item)"
          >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon light>{{item.icon}}</v-icon>
              </v-list-item-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  <!-- 右边导航栏 -->
    <v-navigation-drawer
      v-model="right_drawer"
      fixed
      app
      dark
      color="blue"
      class="v-navigation-drawer"
      :disable-resize-watcher="true"
      :right="true"
    > 
    <TOC/>
    </v-navigation-drawer>
  <!-- 搜索对话框 -->
  <searchDialog :keyword="keyword"/>
    <v-content class="overall-style">
      <v-container v-scroll="onScroll" >
          <nuxt />
          <!-- 返回顶部按钮 -->
          <v-fab-transition>
              <v-btn fixed dark fab color="pink" bottom right v-show="show" @click="$vuetify.goTo(0,scroll_option)">
                  <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
          </v-fab-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import msg from '~/components/message.vue'
import TOC from '~/components/toc.vue'
import searchDialog from '~/components/searchDialog.vue'
import Bus from '~/pages/util'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      ismobile:false,
      right_drawer:false,
      keyword:'',
      user_base_info_url:'/api/user/base_info/id=5e65235b2716a4485c4cb931',
      items: [
        {
          icon: 'mdi-home',
          title: '首页',
          to: '/'
        },
        {
          icon: 'mdi-blogger',
          title: '关于博客',
          to: '/about'
        },
        {
          icon: 'mdi-account',
          title: '关于作者',
          to: '/author'      
        },
        // {
        //   icon: 'mdi-hammer-screwdriver',
        //   title: '其他',
        //   to: '/other'      
        // }
      ],
      other:[
        {
          icon:'mdi-emoticon-devil',
          title:'沙雕表情',
          to:'emoji'
        }
      ],
      filters:[
        {
          icon:'mdi-widgets',
          title:"分类"
        },
        {
          icon:'mdi-calendar-range',
          title:"日期"      
        }
      ],
      miniVariant: false,
      title: 'CWY的博客',
      show:false,
      // vuex的副本
      message:{show:false,content:'抽屉只能在文章页面打开',color:'info'},
      scroll_option:{
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic',
        }
    }
  },
  components:{
    msg,
    TOC,
    searchDialog
  },
  methods:{
    onScroll(e){
      this.show = window.pageYOffset ? true:false
    },
    open_right(){
      let r = this.$route.path
      var reg = /\/detail\/\w+/;
      //检查是否在文章页面,打开右侧导航栏浏览目录
      if(reg.test(r)){
        this.right_drawer = !this.right_drawer
      }else{
        this.message.show=true
      }
    },
    getText(layer,text){
        let result = ''
        let arr = []
        text = text.replace(/anchor_/,'')
        for(var i=0;i<(Number(layer));i++){
            arr.push(i+1);
        }        
        arr.map((item,index)=>{
            result = result +'- '
        })
        return result + text
    },
    onResize(){
        this.ismobile = window.innerWidth<930 
    },
    // swipe(direction){
    //   switch(direction){
    //       case "Left":
    //         let reg = /\/detail\/\w+/
    //         if(reg.test(this.$route.path))
    //           Bus.$emit('showRightDrawer')
    //           break
    //       case "Right":
    //         this.drawer = true
    //       default:
    //   }       
    // },
    filter(item){
      Bus.$emit('showFilter',item)
    },
    showRightDrawer(){
      this.right_drawer = true
    },
    getUserBaseInfo(){
        this.$axios.get(this.user_base_info_url).then(res=>{
        this.$store.commit('setAuthorInfo',res.data.other.users)
      })
    },
    showSearchDialog(){
      Bus.$emit('showDialog')
    },
    search(){
      if(this.$route.path!='/'){
        this.$router.push('/')
      }
      Bus.$emit('search',this.keyword)
    },
    goTo(path){
      if(path=='/'){
        if(this.$route.path=='/'){
          // this.$vuetify.goTo(0,this.scroll_option)
          Bus.$emit('refreshArticleList')
        }else{
          this.$router.push({'name':'index',params:{refresh:true}})
        }
      }else{
        this.$router.push(path)
      }
    }
  },
  created() {
    Bus.$on('showRightDrawer',this.showRightDrawer)
    this.getUserBaseInfo()
  },
  watch:{
    ismobile(value){
      this.$store.commit('setIsMobile',value)
    }
  }
}
</script>
<style lang="less">
@import url('animate.css/animate.min.css');
  .app,.v-application .title,.markdown-body{
      font-family: "Microsoft YaHei" !important;
      font-weight:400;
      max-width: 100%;
  }
  .search_input{
    max-width: 25em;
  }
  .v-list-item{
    font-weight: bold
  }
  .v-toolbar-title{
    font-weight: bold
  }
  @media screen and (min-width: 930px) {
    .overall-style {
      background-color: burlywood;
      // background-repeat: no-repeat;
      // background-attachment: fixed;
      // background-position: top;
    }
  }
  @media screen and (max-width: 930px) {
    .overall-style {
      background-color: burlywood;
    } 
   }
  .container {
    padding: 0;
  }
  .row{
      width:100%;
      margin: 0;
  }

  /* use for markdown */

.v-application code {
  max-width: 100%;
  color:black;
  background-color:rgb(245, 242, 240);
  box-shadow:0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0);
}

.toc{
    margin-left:1em;
    max-height: 20em;
}
.markdown>.v-card > .v-card__text{
    color: black;
}
@import url('github-markdown-css/github-markdown.css');

	.markdown-body {
		box-sizing: border-box ;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 930px) {
		.markdown-body {
			padding: 15px 0 15px 0;
    };
    .v-application code {
    font-size: 85%;
    box-shadow:none;
    }
	}
</style>