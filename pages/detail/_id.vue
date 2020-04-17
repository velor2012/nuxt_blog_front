<template>
<v-container>
    <msg v-bind:message="message" />
    <v-row>
      <my-img :height="`30vh`" :contain="false" class="align-center article-img" :nolimit="true" :index="0" :src="article.cover" :lazy-src="lazy_src">
        <v-row justify="center">
          <h1 class="article-title">{{article.title}}</h1>
        </v-row>
      </my-img>
      <v-col cols="12">
        <v-divider/>
      </v-col>
    <v-col style="paddingTop:0" :cols="ismobile?12:10">
        <v-card color="white" class="animated fadeInLeft" v-show="!loading">
          <v-card-subtitle class="font-weight-bold">
            <v-row
            align="center"
            justify="space-between"
            >
            <div>
              <span class="post-time">
                <v-icon small>mdi-calendar-range</V-icon>
                发表于 <a>{{getLocalTime(article.createTime)}}</a>
              </span>
              <span class="post-time">
                <v-icon small>mdi-calendar-range</V-icon>
                更新于 <a>{{getLocalTime(article.updateTime)}}</a>
              </span>
            </div>
            <div>
                <v-icon color="deep-orange lighten-1" >mdi-bookmark</v-icon>
                <span class="article-info">{{article.type}}</span>
            </div>
            </v-row>
          </v-card-subtitle>
          <v-divider/>
          <v-card-text>
          <div class="markdown-body">
            <h1>简介</h1>
              <span > {{article.resume}}</span>
          </div>
            <client-only>
              <mark-down-temp class="markdown-body" :html="markdown_html"/>
            </client-only>
            <v-divider/>
                  <div id="gitalk-container" />
          </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="2" class="animated fadeInRight"  v-show="!loading&&!ismobile">
        <client-only>
          <TOC />
        </client-only>
    </v-col>
    <div class="images" v-show="showImage" v-viewer="{movable: true}">
      <img v-show="false" v-for="src in images" :src="src" :key="src">
    </div>
  </v-row>
  </v-container>
  </div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import MarkDownTemp from "~/components/MarkDownTemp";
import MyImg from "~/components/MyImg";
import Vue from "vue";
import Vuetify, { VImg,VResponsive } from 'vuetify/lib'
import TOC from "~/components/toc.vue";
import msg from "~/components/message.vue";
import Bus,{render,getThumb,config} from "~/pages/util";
export default {
  name: "detail",
  data() {
    return {
      article: {},
      markdown_html: "",
      toc: [],
      con_html: "",
      show: false,
      id: "",
      images:[],
      lazy_src:'',
      baseurl: "/api/article/",
      message: { show: false, content: "成功", color: "success" },
      loading: true,
      transition: "scale-transition",
      timeouts: [],
      emoji_width: "100em",
    };
  },
  components: {
    msg,
    TOC,
    MarkDownTemp,
    MyImg
  },
  created() {
    this.loading = true;
    Bus.$on('showImage',this.showImage)
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      var url = this.baseurl + "id=" + this.id;
      let _this = this
      this.$axios.get(url).then(res => {
        if (res.data.success) {
          this.article = res.data.other.article;
          this.images.push(this.article.cover)
          this.lazy_src = getThumb(this.article.cover)
          render(this,this.article.content)
          this.message = {
            show: true,
            content: "成功找到文章",
            color: "green accent-3"
          };
        } else {
          this.message = {
            show: true,
            content: "找不到文章:" + res.data.reason,
            color: "red accent-2"
          };
        }
        //加载评论
        var gitalk = new Gitalk({
          clientID: config.clientID,
          clientSecret: config.clientSecret,
          repo: config.repo,
          owner: config.owner,
          admin: [config.owner],
          id: this.article._id,      // Ensure uniqueness and length less than 50
          distractionFreeMode: false  // Facebook-like distraction free mode
        })

        gitalk.render('gitalk-container')
        this.loading = false;
      });
    } else {
    }
  },
  methods: {
    showImage(index){
        const viewer = this.$el.querySelector('.images').$viewer
        if(viewer){
          viewer.index = index
          viewer.show()
        }
    },
    getLocalTime(nS) {  
        return new Date(nS).toLocaleString()
    },
  },
  computed: {
    ismobile() {
      return this.$store.getters.getIsMobile;
    }
  }
};
</script>
<style lang="less">
.article-title{
  color: whitesmoke;
  font-size:10vh;
}
@media  screen and  (max-width: 600px){
    .article-title{
        font-size: 8vw;
    }
}
</style>
