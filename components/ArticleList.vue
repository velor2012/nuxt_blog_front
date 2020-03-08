<template>
      <v-row dense>
            <v-col
              v-for="(item, i) in Data.items"
              :key="i"
              cols="12"
              class="animated fadeInLeft"
              v-if="!Data.reloading"
            > 
              <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 24 : 2"
                    :color="hover?'rgba(255,255,255,0.5)':'white'"
                  >
                    <v-card-title class="headline">{{item.title}}</v-card-title>

                    <v-card-subtitle>
                          <v-card-text class="post">
                            <span class="post-time">
                              <v-icon small>mdi-calendar-range</V-icon>
                              发表于 <a>{{getLocalTime(item.createTime)}}</a>
                            </span>
                            <span class="post-time">
                              <v-icon small>mdi-calendar-range</V-icon>
                              更新于 <a>{{getLocalTime(item.updateTime)}}</a>
                            </span>
                            <span class="post-class">
                              <v-icon small>mdi-folder-open</v-icon>
                              分类于
                              <a>{{item.type}}</a>
                            </span>
                          </v-card-text>
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-btn nuxt :to="`/detail/${item._id}`" dark color="blue">阅读文章</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-hover>
            </v-col>
            <v-col clos="12" v-scroll="onsroll" v-show="Data.loading" style="text-align:center">
                  <div class="text-center ma-12">
                    <v-progress-circular
                      :indeterminate="true"
                      :rotate="0"
                      :size="32"
                      :value="0"
                      :width="4"
                      color="light-blue"
                    ></v-progress-circular>
                  </div>
            </v-col>
          </v-row>
</template>

<script>
import TypeAndDate from '~/components/TypeAndDate.vue'
  export default {
    name:'ArticleList',
    props:['Data'],
    data: () => ({
    }),
    components:{
      TypeAndDate
    },
    created(){
    },
    methods:{
      getLocalTime(nS) {  
          return new Date(nS).toLocaleString()
      },
      getNextPageArticles(){
        this.$emit('getNextPageArticles')
      },
      onsroll(e){
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100
        if (bottomOfWindow && this.Data.loading == false && this.needLoadData>0) {
          this.getNextPageArticles()
        }
      },
    },
    computed:{
      needLoadData(){
        return this.Data.total-this.Data.items.length
      }
    }
  }
</script>
<style lang="less">
  .post{
    padding:0
  }
</style>>