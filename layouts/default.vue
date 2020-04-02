<template>
  <v-app dark v-resize="onResize" class="app">
    <msg v-bind:message="message" />
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
    <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar size=70>
            <img :src="authorInfo.avatar">
          </v-list-item-avatar>

          <v-list-item-content class="text-center">
                  <v-list-item-title style="color:white;" class="text-center">
                      不知道写啥
                    </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
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
            <v-list-item v-for="(item, n) in other" :key="n" :to="item.to">
              <v-list-item-title>
                <v-list-item-icon>
                  <v-icon light>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <!-- bar栏 -->
    <v-app-bar :clipped-left="clipped" fixed app dark color="blue" id="header" v-show="doneWelcome">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="ismobile" />
      <v-toolbar-title v-text="title" class="v-toolbar-title" />
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
        v-show="$route.path == '/'"
      />
      <v-spacer />
      <!-- 搜索按钮手机端 -->
      <v-btn icon v-if="ismobile && $route.path == '/'">
        <v-icon @click.native="showSearchDialog">mdi-magnify</v-icon>
      </v-btn>
      <!-- 目录按钮手机端 -->
      <v-btn icon v-if="ismobile && /\/detail\/\w+/.test($route.path)">
        <v-icon @click.native="open_right">mdi-book</v-icon>
      </v-btn>
      <!-- 其他功能，关于博客，作者信息 网页端 -->
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="d-none d-sm-flex"
        text
        v-if="!ismobile"
      >
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="open_right" class="d-none d-sm-flex"/> -->
      <!-- other设置，网页端显示 -->
      <v-menu :offset-y="true" bottom v-if="!ismobile">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <v-icon>mdi-hammer-screwdriver</v-icon>
            其他功能
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, n) in other" :key="n" :to="item.to">
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon light>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- 筛选菜单，手机端 -->
      <v-menu left bottom v-if="ismobile && $route.path == '/'">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-filter-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, n) in filters"
            :key="n"
            @click="filter(item)"
          >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon light>{{ item.icon }}</v-icon>
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
      <TOC />
    </v-navigation-drawer>
    <!-- 搜索对话框 -->
    <searchDialog :keyword="keyword" />

    <welcome/>
    <v-content class="overall-style" id="content">
      <v-container v-show="doneWelcome" v-scroll="onScroll">
        <nuxt />
        <!-- 返回顶部按钮 -->
        <v-fab-transition>
          <v-btn
            fixed
            dark
            fab
            color="pink"
            bottom
            right
            v-show="show"
            @click="$vuetify.goTo(0, scroll_option)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Motto from '~/components/Motto.vue'
import msg from "~/components/message.vue";
import TOC from "~/components/toc.vue";
import searchDialog from "~/components/searchDialog.vue";
import welcome from "~/components/welcome.vue";
import Bus from "~/pages/util";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      ismobile: false,
      right_drawer: false,
      doneWelcome:false,
      keyword: "",
      user_base_info_url: "/api/user/base_info/id=5e81dd95f6811d12805644df",
      items: [
        {
          icon: "mdi-home",
          title: "首页",
          to: "/"
        },
        {
          icon: "mdi-blogger",
          title: "关于博客",
          to: "/about"
        },
        {
          icon: "mdi-account",
          title: "关于作者",
          to: "/author"
        }
      ],
      other: [
        {
          icon: "mdi-emoticon-devil",
          title: "沙雕表情",
          to: "emoji"
        }
      ],
      filters: [
        {
          icon: "mdi-widgets",
          title: "分类"
        },
        {
          icon: "mdi-calendar-range",
          title: "日期"
        }
      ],
      miniVariant: false,
      title: "CWY的博客",
      show: false,
      // vuex的副本
      message: {
        show: false,
        content: "抽屉只能在文章页面打开",
        color: "info"
      },
      scroll_option: {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      }
    };
  },
  components: {
    msg,
    TOC,
    searchDialog,
    welcome,
    Motto
  },
  methods: {
    onScroll(e) {
      this.show = window.pageYOffset ? true : false;
    },
    open_right() {
      let r = this.$route.path;
      var reg = /\/detail\/\w+/;
      //检查是否在文章页面,打开右侧导航栏浏览目录
      if (reg.test(r)) {
        this.right_drawer = !this.right_drawer;
      } else {
        this.message.show = true;
      }
    },
    getText(layer, text) {
      let result = "";
      let arr = [];
      text = text.replace(/anchor_/, "");
      for (var i = 0; i < Number(layer); i++) {
        arr.push(i + 1);
      }
      arr.map((item, index) => {
        result = result + "- ";
      });
      return result + text;
    },
    onResize() {
      this.ismobile = window.innerWidth < 930;
    },
    onDoneWelcome(){
      this.doneWelcome = true
      document.getElementById("header").classList.add("animated","fadeIn")
    },
    filter(item) {
      Bus.$emit("showFilter", item);
    },
    showRightDrawer() {
      this.right_drawer = true;
      document.getElementById
    },
    getUserBaseInfo() {
      this.$axios.get(this.user_base_info_url).then(res => {
        this.$store.commit("setAuthorInfo", res.data.other.users);
      });
    },
    showSearchDialog() {
      Bus.$emit("showDialog");
    },
    search() {
      Bus.$emit("search", this.keyword);
    }
  },
  created() {
    Bus.$on("showRightDrawer", this.showRightDrawer);
    Bus.$on("onDoneWelcome", this.onDoneWelcome);
    this.getUserBaseInfo();
  },
    mounted(){
        let _this = this;
        // 原生js
        let _starList = document.getElementsByClassName("star")
        let starArr = Array.prototype.slice.call(_starList)
        // vue
        let starList = this.$refs.star
        // 遍历添加样式
        starArr.forEach(item => {
            var s = 0.2 + (Math.random() * 1);
            var thisDistance = _this.distance + (Math.random() * 300);
            item.style.transformOrigin = `0 0 ${thisDistance}px`
            item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${s},${s})`
        })
    },
  watch: {
    ismobile(value) {
      this.$store.commit("setIsMobile", value);
    }
  },
  computed:{
      authorInfo(){
        return this.$store.getters.getAuthorInfo
      }
  }
};
</script>
<style lang="less">
@import url("animate.css/animate.min.css");
.app,
.v-application .title,
.markdown-body {
  font-family: "Microsoft YaHei" !important;
  font-weight: 400;
  max-width: 100%;
}
//点击搜索框改变宽度  
#header .v-input--is-focused {
  max-width: 25em!important;
}
#header .v-input {
  transition: 0.3s;
  max-width: 15em;
}
//end

.v-list-item {
  font-weight: bold;
}
.v-toolbar-title {
  font-weight: bold;
}
@media screen and (min-width: 930px) {
  .overall-style {
    background-attachment: fixed;
    background: linear-gradient(90deg,#e74c3c,#f1c40f);
    // background-color: burlywood;
    // background-repeat: no-repeat;
    // background-attachment: fixed;
    // background-position: top;
  }
}
@media screen and (max-width: 930px) {
  .overall-style {
    background-attachment: fixed;
    background: linear-gradient(90deg,#e74c3c,#f1c40f);
  }
}

.container {
  padding: 0;
}
.row {
  width: 100%;
  margin: 0;
}

/* use for markdown */

.v-application code {
  max-width: 100% !important;
  color: black !important;
  // background-color:rgb(245, 242, 240)!important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0),
    0 0 0 0 rgba(0, 0, 0, 0) !important;
}

.toc {
  margin-left: 1em;
  max-height: 20em;
}
@import url("github-markdown-css/github-markdown.css");

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 930px) {
  .markdown-body {
    padding: 15px 0 15px 0;
  }
  .v-application code {
    font-size: 85%;
    box-shadow: none;
  }
}
</style>
