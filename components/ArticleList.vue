<template>
      <v-row dense class="article-list">
            <v-col
              v-for="(item, i) in Data.items"
              :key="i"
              cols="12"
              class="animated fadeIn"
              data-trigger4
              :id="`trigger4${i}`"
              v-if="!Data.reloading"
            > 
              <v-hover :disabled="ismobile" v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 24 : 2"
                    :color=" hover?'rgba(255,255,255,0.5)':'white'"
                    nuxt :to="`/detail/${item._id}`"
                  >
                    <v-row class="article_card"
                      align="center"
                    >
                    
                    <v-col style="padding:0" class="sm-12 md-8 outer-card">
                      <v-card-title v-if="!ismobile" class="headline font-weight-bold">{{item.title}}</v-card-title>
                        <v-img min-height="20vh" v-if="ismobile" class="white--text align-end" :src="item.cover" :lazy-src="_getThumb(item.cover)">
                              <template v-slot:placeholder>
                                <v-row
                                  class="fill-height ma-0"
                                  align="center"
                                  justify="center"
                                >
                                  <v-progress-circular indeterminate color="black"></v-progress-circular>
                                </v-row>
                              </template>
                          <v-card-title class="headline font-weight-bold">{{item.title}}</v-card-title>
                        </v-img>
                    <v-card-subtitle class="font-weight-bold">
                        <span class="post-time">
                          <v-icon small>mdi-calendar-range</V-icon>
                          发表于 <a>{{getLocalTime(item.createTime)}}</a>
                        </span>
                        <span class="post-time">
                          <v-icon small>mdi-calendar-range</V-icon>
                          更新于 <a>{{getLocalTime(item.updateTime)}}</a>
                        </span>
                    </v-card-subtitle>
                    <v-card-text class="font-weight-bold">
                      {{item.resume}}
                    </v-card-text>
                    </v-col>
                    <v-col cols="4" class="pc-arcticle-cover" v-if="!ismobile">
                      <v-img :src="item.cover">
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                  <v-divider/>
                    <v-card-text class="chips-rows">
                      <v-row
                      align="center"
                      justify="space-between"
                      >
                        <div>
                          <v-chip-group
                              column
                              active-class="primary--text"
                            >
                              <v-chip class="chips" color="amber lighten-2" light v-for="_tag in resovleTag(item.tag)" :key="_tag">
                                {{ _tag }}
                              </v-chip>
                            </v-chip-group>
                        </div>
                        <div v-if="!ismobile">
                            <v-icon >mdi-bookmark</v-icon>
                            <span class="article-info">{{item.type}}</span>
                            <v-icon >mdi-eye-outline</v-icon>
                            <span class="article-info">未实现</span>
                        </div>
                      </v-row>
                      </v-card-text>
                      <v-divider v-if="ismobile"/>
                      <v-card-text v-if="ismobile" class="other-rows">
                       <v-row
                      align="center"
                      justify="space-between"
                      >
                        <div>
                            <v-icon >mdi-bookmark</v-icon>
                            <span class="article-info">{{item.type}}</span>
                            <v-icon >mdi-eye-outline</v-icon>
                            <span class="article-info">未实现</span>
                        </div>
                       </v-row>
                    </v-card-text>
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
import Bus,{getThumb} from '~/pages/util'
import {resovleTag} from '~/pages/util'
import TypeAndDate from '~/components/TypeAndDate.vue'
  export default {
    name:'ArticleList',
    props:['Data'],
    data: () => ({
      trigger:NaN
    }),
    components:{
      TypeAndDate
    },
    methods:{
      resovleTag(tag){
        // console.log(tag)
        return resovleTag(tag)
      },
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
      })
    },
    computed:{
      needLoadData(){
        return this.Data.total-this.Data.items.length
      },
      ismobile(){
        return this.$store.getters.getIsMobile
      },
      listlength(){
        return this.Data.items.length
      }
    },
    watch:{
      listlength:{
        handler(newValue){
          let _this = this
          this.$nextTick(()=>{
            if(this.trigger){
              this.trigger.remove('[data-trigger4]')
              this.trigger.add('[data-trigger4]')
              return
            }
            _this.trigger = new _this.$sr(
              {
                trigger:{
                  offset:{
                      viewport: {
                          x: 0,
                          y: (trigger, frame, direction) => {
                              return trigger.visible ? 0 : 0.2
                          }
                      }
                  },
                  toggle:{
                    class:{
                      in:["fadeIn",'animated'],
                    },
                      callback: {
                        in:(trigger)=>{
                          console.log(trigger.element)
                          // _this.trigger.remove(trigger)
                          // // console.log(_this.trigger)
                          // trigger.element.addEventListener('animationend',()=>{
                          //   // console.log('doneAnimated ')
                          //   _this.trigger.add(trigger)
                          //   // console.log(_this.trigger)
                          // })
                        },
                        out:(trigger)=>{
                      
                             console.log('out')
                             return

                        }
                  }
                }
                }
              }
            )
            _this.trigger.add('[data-trigger4]')
          })
        },
        deep:true
      }
    }
  }
</script>
<style lang="less">
  .pc-arcticle-cover{
    padding-top: 1em;
  }
  .chips{
    font-weight: bold;
  }
  @media screen and (max-width: 930px) {
  .chips{
    margin-top: 0!important;
    margin-bottom: 0!important;
    height: 3em;
  }
}
  .other-rows,.chips-rows{
    padding-top: 0;
    padding-bottom: 0;
  }
  .article-info{
    font-size:16px;
    font-weight:bold;
  }
  .chips-rows .v-chip{
    color: black;
  }
  .visible, .invisible {
  opacity: 0.0;
  transition: opacity 0.5s ease;
}
.visible {
  opacity: 1.0;
}
</style>>