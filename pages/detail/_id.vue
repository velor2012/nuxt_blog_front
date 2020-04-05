<template>
  <div>
    <msg v-bind:message="message" />
    <v-row class="row">
      <v-col :cols="ismobile ? 12 : 10" class="markdown">
        <v-card color="white" class="animated fadeInLeft" v-show="!loading">
          <v-card-text>
            <client-only>
              <mark-down-temp class="markdown-body" :html="markdown_html"/>
            </client-only>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="2" v-show="!ismobile">
        <client-only>
          <TOC class="animated fadeInRight" />
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import MarkDownTemp from "~/components/MarkDownTemp";
import Vue from "vue";
import Vuetify, { VImg,VResponsive } from 'vuetify/lib'
import TOC from "~/components/toc.vue";
import msg from "~/components/message.vue";
import Bus,{render} from "~/pages/util";
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
  },
  created() {
    this.loading = true;
    
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      var url = this.baseurl + "id=" + this.id;
      let _this = this
      this.$axios.get(url).then(res => {
        if (res.data.success) {
          this.article = res.data.other.article;
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
        this.loading = false;
      });
    } else {
    }
  },
  methods: {
    getTOC(markdown_html) {
      this.toc = [];
      let res = "";
      var patt = /<h([1-2])?\s+id="(.*?)">/g;
      while ((res = patt.exec(markdown_html))) {
        this.toc.push({ layer: res[1], text: res[2] });
      }
    } 
  },
  computed: {
    ismobile() {
      return this.$store.getters.getIsMobile;
    }
  }
};
</script>
<style lang="less"></style>
