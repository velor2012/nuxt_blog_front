<template>
<div>
    <v-row class="row">
        
        <v-col :cols="ismobile?12:10" class="markdown">
            <v-card color='white' class="animated fadeInLeft">
                <v-card-text>
                    <mark-down-temp class="markdown-body" :html="markdown_html"/>
                </v-card-text>
            </v-card>
        </v-col>
                
        <v-col cols="2" v-show="!ismobile">
            <client-only>
                <TOC class="animated fadeInRight"/>
            </client-only>
        </v-col>
    </v-row>
    <div class="images" v-show="showImage" v-viewer="{movable: true}">
      <img v-show="false" v-for="src in images" :src="src" :key="src">
    </div>
  </div>
</template>
<script>
import MarkDownTemp from "~/components/MarkDownTemp";
import TOC from '~/components/toc.vue'
import Bus from '~/pages/util'
import {render} from '~/pages/util'
  export default {
    name:"about",
    data () {
      return {
          article:{},
          markdown_html:'',
          toc:[],
          con_html:'',
          show:false,
          id:'',
          images:[],
          transition:'scale-transition',
          selection:[],
          emoji_width:'100em',
      }
    },
    components:{
      TOC,
      MarkDownTemp
    },
    created(){
          Bus.$on('showImage',this.showImage)
    },
    mounted(){
      let a = this.readFile('README.md')
      render(this,a)
    },
    methods:{
      readFile(filePath) {
        // 创建一个新的xhr对象
        let xhr = null
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {
          // eslint-disable-next-line
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        const okStatus = document.location.protocol === 'file' ? 0 : 200
        xhr.open('GET', filePath, false)
        xhr.overrideMimeType('text/html;charset=utf-8')
        xhr.send(null)
        return xhr.status === okStatus ? xhr.responseText : null
      },
      showImage(index){
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.index = index
        viewer.show()
      } 
    },
    computed:{
        ismobile(){
            return this.$store.getters.getIsMobile
        },
        authorInfo(){
            return this.$store.getters.getAuthorInfo
        }
    },
  }
</script>
