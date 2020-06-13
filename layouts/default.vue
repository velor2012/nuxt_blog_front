<template>
  <v-app v-resize="onResize" class="app">
    <message />
    <!-- 左边抽屉 -->
    <v-navigation-drawer
    :disable-resize-watcher="true"
     v-model="drawer" fixed app color="#85B6BA" class="v-navigation-drawer">
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
            <v-list-item-title>其它</v-list-item-title>
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

    <!-- bar栏  clipped-left与note的clipped对应-->
    <v-app-bar
      :style="$route.path!='/'||resetAppBar?'':'boxShadow:none'"
      fixed
      app
      light
      clipped-left
      color="#85B6BA"
      id="header"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-none" />
      <v-toolbar-title v-text="title" class="v-toolbar-title" />
      <v-spacer />
      <!-- 搜索输入框 网页端 -->
      <pc-search />
      <v-spacer />
      <!-- 搜索按钮手机端 -->
      <mobile-search />
      <!-- 目录按钮手机端 -->
      <v-btn icon class="d-flex d-sm-none" v-if="/\/detail\/\w+/.test($route.path)">
        <v-icon @click.native="open_right">mdi-book</v-icon>
      </v-btn>
      <!-- 其他功能，关于博客，作者信息 网页端 -->
      <v-btn v-for="(item, i) in items" :key="i" :to="item.to" class="d-none d-sm-flex" text>
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="open_right" class="d-none d-sm-flex"/> -->
      <!-- other设置，网页端显示 -->
      <div class="d-none d-sm-flex">
        <v-menu :offset-y="true" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>
              <v-icon>mdi-hammer-screwdriver</v-icon>其他功能
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, n) in other" :key="n" :to="item.to">
              <v-list-item-title>
                <v-list-item-icon>
                  <v-icon light v-text="item.icon"></v-icon>
                </v-list-item-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- 筛选菜单，手机端 -->
      <v-btn
        icon
        class="d-flex d-sm-none"
        v-if="$route.path=='/'||$route.path==myPagePath.notePage"
      >
        <v-icon @click.native="showFilterDialog = true">mdi-filter-menu</v-icon>
      </v-btn>
      <v-dialog v-model="showFilterDialog">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            筛选
            <v-icon @click="showFilterDialog = false">mdi-close-circle</v-icon>
          </v-card-title>
          <v-card-text>
            <Picker />
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- end  筛选菜单，手机端 -->
    </v-app-bar>
    <!-- end app-bar -->
    <v-main class="overall-style" v-model="ismobile" v-scroll="onScroll">
      <nuxt />
      <my-float-button v-if="ismobile" />
      <v-fab-transition v-else>
        <v-btn
          fixed
          fab
          color="red lighten-2"
          bottom
          right
          v-show="showGoUp"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import message from '~/components/message.vue'
import PcSearch from '~/components/pc-search.vue'
import MobileSearch from '~/components/moblie-search.vue'
import MyFloatButton from '~/components/MyFloatButton.vue'
import { getModule } from 'vuex-module-decorators'
import Picker from '~/components/picker/CategoryAndDate.vue'
import { mystore } from '~/store'
import MyPagePath from '../types/Path'
@Component({
    components: {
        message,
        PcSearch,
        MobileSearch,
        Picker,
        MyFloatButton
    }
})
export default class Layout extends Vue {
    showGoUp=false
    showFilterDialog = false
    clipped = false
    drawer = false
    fixed = false
    store = mystore
    ismobile = null
    height = 0
    width = 0
    resetAppBar = false
    myPagePath = MyPagePath
    title = '嘀嘀嘀'
    items = [
        {
            icon: 'mdi-home',
            title: '随笔',
            to: '/'
        },
        {
            icon: 'mdi-note',
            title: '笔记',
            to: '/note/list'
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
        }
    ]
    other = [
        {
            icon: 'mdi-emoticon-devil',
            title: '沙雕表情',
            to: '/emoji'
        }
    ]
    mounted() {}
    onResize() {
        this.ismobile = window.innerWidth < 600
        this.height = document.body.clientHeight
        this.width = document.body.clientWidth
    }
    onScroll(e) {
        this.showGoUp = window.pageYOffset ? true : false;
        this.resetAppBar =
            (document.documentElement.scrollTop || document.body.scrollTop) >
            this.height / 4
    }
    @Watch('ismobile')
    onChangeIsMoblie(value: boolean) {
        console.log('in')
        this.store.setIsMoblie(value)
    }
}
</script>
<style lang="scss">
@import 'assets/scss/style.scss';
@import 'animate.css/animate.min.css';
.overall-style {
    background-attachment: fixed;
    background: map-get($map: $colors, $key: 'main-amber');
}
//点击搜索框改变宽度
#header .v-input--is-focused {
    max-width: 25em !important;
}
#header .v-input {
    transition: 0.3s;
    max-width: 15em;
}
//end
.filter-dialog {
    background-color: black;
}
</style>