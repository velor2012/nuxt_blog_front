<template>
  <v-layout>
    <v-flex class="text-left">
        <v-row dense>
            <v-col
            cols="10"
            > 
            <div v-html="markdown_html" class="markdown">
            </div>
            </v-col>
            <v-col>
            <div v-html="con_html" >
            </div>             
            </v-col>
        </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import marked from 'marked'

//基本配置与代码高亮配置
const renderer = new marked.Renderer();
// Override function
renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `
          <h${level} id="${text}">
            ${text}
          </h${level}>`;
};
marked.setOptions({
    renderer: renderer,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
export default {
    name:'detail',
    data(){
        return{
            article:{},
            markdown_html:'',
            con:'',
            con_html:''
        }
    },
    created(){
        if(this.$route.params.data){
            this.article = this.$route.params.data.article
            this.con = this.$route.params.data.con
            this.markdown_html = marked(this.article.content)
            this.con_html = marked(this.con)
        }else{

        }
    }
}
</script>
<style lang="less">
    .markdown img{
        max-width: 100%;
    }
</style>