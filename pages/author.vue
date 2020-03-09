<template>
<div>
    <v-row class="row">
        
        <v-col :cols="ismobile?12:10" class="markdown">
            <v-card color='white' class="animated fadeInLeft">
                <v-card-text>
                    <div class="markdown-body" v-html="markdown_html" />
                </v-card-text>
            </v-card>
        </v-col>
                
        <v-col cols="2" v-show="!ismobile">
            <client-only>
                <TOC class="animated fadeInRight"/>
            </client-only>
        </v-col>
    </v-row>
  </div>
</template>
<script>
import TOC from '~/components/toc.vue'
import Bus from '~/pages/util'
import {render} from '~/pages/util'
export default {
    name:'author',
    data(){
        return{
            article:{},
            markdown_html:'',
            toc:[],
            con_html:'',
            show:false,
            id:'',
            transition:'scale-transition',
            selection:[],
            emoji_width:'100em',
        }
    },
    components:{
        TOC,
    },
    mounted(){
        if(this.authorInfo&&this.authorInfo!="")
            this.md_render()                    
    },
    methods:{
        getTOC(markdown_html){
            this.toc=[]
            let res = ''
            var patt = /<h(\d)?\s+id="(.*?)">/g;;
            while (res = patt.exec(markdown_html)) {
                this.toc.push({layer:res[1],text:res[2]});
            }
        },
        //监视标题的位置来改变目录激活状态
        oberserTitle(){
            var io = new IntersectionObserver((entries) => {
                if(entries[0].intersectionRatio>=1){
                    console.log(entries[0].target.id)
                    Bus.$emit('changeTOCActvivateItem',entries[0].target.id)
                }
            }, {
                threshold: [1],
                // root:document.getElementById("header")
            })
            this.toc.map(item=>{
                let el = document.getElementById(item.text)
                io.observe(el);
            })
        },
        md_render(){
            render(this,this.authorInfo.info)
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
    watch:{
        authorInfo(val){
            if(process.browser){
                this.md_render()
            }
        }
    }
}
</script>