<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <v-card class="animated fadeInUp">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item, i) in emojis"
              :key="i"
              class="d-flex child-flex"
              :cols="ismobile ? 4 : 2"
            >
              <v-card flat tile class="d-flex">
                <my-img :src="item" :index=i :lazySrc="item"/>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <div class="images" v-show="showImage" v-viewer="{movable: true}">
      <img v-show="false" v-for="src in emojis" :src="src" :key="src">
    </div>
  </v-row>
  </v-container>
</template>
<script>
const config = require("~/config.json");
import MyImg from "~/components/MyImg";
import Bus from '~/pages/util'
export default {
  data() {
    return {
      emojis: [],
      emoji_url: "api/image/emoji",
      base_url: config.base_url
    };
  },
  created() {
    Bus.$on('showImage',this.showImage)
    this.$axios.get(this.emoji_url).then(res => {
      this.emojis = [];
      this.current_page_emojis = [];
      if (res.data.success) {
        let raw_path = res.data.other.result;
        raw_path.map(p => {
          this.emojis.push(this.base_url + p);
        });
      }
      // }else{
      //     message.error(this,true,'获取表情失败',res.data.reason)
      // }
    });
  },
  mounted() {
  },
  methods: {
    showImage(index){
        const viewer = this.$el.querySelector('.images').$viewer
        if(viewer){
          viewer.index = index
          viewer.show()
        }
    },
  },
  components:{
    MyImg
  },
  computed: {
    ismobile() {
      return this.$store.getters.getIsMobile;
    }
  }
};
</script>
<style lang="less">
.emoji_img:hover {
  cursor: pointer;
}
.emoji_img:hover .v-image__image--contain {
  transform: scale(1.2) rotate(5deg);
  transition-duration: 0.3s;
}
</style>
