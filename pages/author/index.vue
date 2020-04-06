<template>
  <div>
    <v-row class="row">
      <v-col :cols="ismobile ? 12 : 10" class="markdown">
        <v-card color="white" class="animated fadeInLeft">
          <v-card-text>
             <mark-down-temp class="markdown-body" :html="markdown_html"/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="2" v-show="!ismobile">
        <client-only>
          <TOC class="animated fadeInRight" />
        </client-only>
      </v-col>
    </v-row>
    <!-- <div class="images" v-show="showImage" v-viewer="{movable: true}">
      <img v-show="false" v-for="src in images" :src="src" :key="src">
    </div> -->
  </div>
</template>
<script>
import TOC from "~/components/toc.vue";
import Bus from "~/pages/util";
import { render } from "~/pages/util";
import MarkDownTemp from "~/components/MarkDownTemp";
export default {
  name: "author",
  data() {
    return {
      article: {},
      markdown_html: "",
      toc: [],
      con_html: "",
      show: false,
      id: "",
      images:[],
      transition: "scale-transition",
      selection: [],
      emoji_width: "100em"
    };
  },
  components: {
    TOC,
    MarkDownTemp
  },
  created(){
    //  Bus.$on('showImage',this.showImage)
  },
  mounted() {
    if (this.authorInfo && this.authorInfo != "") this.md_render();
  },
  methods: {
    getTOC(markdown_html) {
      this.toc = [];
      let res = "";
      var patt = /<h(\d)?\s+id="(.*?)">/g;
      while ((res = patt.exec(markdown_html))) {
        this.toc.push({ layer: res[1], text: res[2] });
      }
    },
    md_render() {
      render(this, this.authorInfo.info);
    },
    //   showImage(index){
    //   const viewer = this.$el.querySelector('.images').$viewer
    //   viewer.index = index
    //   viewer.show()
    // } 
  },
  computed: {
    ismobile() {
      return this.$store.getters.getIsMobile;
    },
    authorInfo() {
      return this.$store.getters.getAuthorInfo;
    }
  },
  watch: {
    authorInfo(val) {
      if (process.browser) {
        this.md_render();
      }
    }
  }
};
</script>
