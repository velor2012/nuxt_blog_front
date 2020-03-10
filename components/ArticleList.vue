<template>
      <v-row dense>
            <v-col
              v-for="(item, i) in Data.items"
              :key="i"
              cols="12"
              class="wow fadeInLeft"
              v-if="!Data.reloading"
            > 
              <v-hover :disabled="ismobile" v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 24 : 2"
                    :color=" hover?'rgba(255,255,255,0.5)':'white'"
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
            <!-- 重载数据(点击日期，类型)的时候要等新的数据加入进来才显示，否则会同时触发加载下一页和重载数据事件 -->
            <v-col clos="12" style="text-align:center" v-show="!Data.reloading">
                  <div v-show="needLoadData==0">没有更多了</div>
                  <div class="text-center ma-12" v-show="needLoadData>0">
                    <v-progress-circular
                      id="circularLoading"
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
import Bus from '~/pages/util'
import TypeAndDate from '~/components/TypeAndDate.vue'
  export default {
    name:'ArticleList',
    props:['Data'],
    data: () => ({
    }),
    components:{
      TypeAndDate
    },
    methods:{
      getLocalTime(nS) {  
          return new Date(nS).toLocaleString()
      },
      oberserLoading(){
          var io = new IntersectionObserver((entries) => {
              if(entries[0].isIntersecting){
                  if(this.needLoadData>0){
                    Bus.$emit('getNextPageArticles')
                  }else{
                    // io.unobserve(el);
                  }
              }
          }, {
              threshold: [0],
          })
          let el = document.getElementById("circularLoading")
          io.observe(el);
      },
    },
    mounted(){
      this.$nextTick(()=>{
        this.oberserLoading()
        this.$nextTick(()=>{new WOW().init();})
      })
    },
    computed:{
      needLoadData(){
        return this.Data.total-this.Data.items.length
      },
      ismobile(){
        return this.$store.getters.getIsMobile
      }
    },
  }
</script>
<style lang="less">
  .post{
    padding:0
  }
</style>>