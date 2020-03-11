<template>
<div>
    <msg v-bind:message="message"/>
            <v-row class="row">
                
                <v-col :cols="ismobile?12:10" class="markdown">
                    <v-card color='white' class="animated fadeInLeft"  v-show="!loading">
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
import msg from '~/components/message.vue'
import Bus from '~/pages/util'
export default {
    name:'detail',
    data(){
        return{
            article:{},
            markdown_html:'',
            toc:[],
            con_html:'',
            show:false,
            id:'',
            baseurl : '/api/article/',
            message:{show:false,content:'成功',color:'success'},
            loading:true,
            transition:'scale-transition',
            emoji_width:'100em',
        }
    },
    components:{
        msg,
        TOC,
    },
    created(){
        this.loading = true
    },
    mounted(){
        //基本配置与代码高亮配置
        const renderer = new marked.Renderer();
        //重写renderer,把id加上,注意id要换成anchor_开头,同时替换内部非法字符,防止因为非法字符引起的vuetify调用selector报错
        renderer.heading = function (text, level) {
            const escapedText = text.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g, '_');
            return `
                    <h${level} id="anchor_${escapedText}">
                        ${text}
                    </h${level}>`;
        };
        let width = this.emoji_width
        renderer.image = function (href,title,text) {
            let token = href.split('/')
            let name = token[token.length-1]
            let reg = /emoji-/
            if(reg.test(name)){
                return `<img src="${href}" width=${width} >`
            }else{
                return `
                    <img src="${href}" width="100%">
                    `;
            }
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
                return code;
            }
        });
        if(this.$route.params.id){ 
            this.id = this.$route.params.id
            var url = this.baseurl + 'id=' + this.id
            this.$axios.get(url).then(res => {
                if(res.data.success){        
                    this.article = res.data.other.article
                    // this.$axios.post('https://api.github.com/markdown',{text:this.article.content,mode:"markdown",context:"github/gollum"}).then(res=>{
                    //     this.markdown_html = res.data
                    // })
                    this.markdown_html = marked(this.article.content)
                    this.$nextTick(()=>{
                        Prism.highlightAll()
                        this.oberserTitle()   

                    })
                    this.getTOC(this.markdown_html)
                    this.$store.commit('setToc',this.toc)               
                    this.message = {show:true,content:'成功找到文章',color:'success'}
                }else{
                    this.message = {show:true,content:'找不到文章:'+res.data.reason,color:'false'}
                }
                this.loading = false
            })          
        }else{

        }
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
                    // console.log('IntersectionObserver.takeRecords %O',io.takeRecords())
                    //console.log(entries[0].target.id)
                    Bus.$emit('changeTOCActvivateItem',entries[0].target.id)
                }
            }, {
                threshold: [1],
                // root:document.getElementById("header")
            })
            let titles=[]
            this.$store.commit('setIO',io)
            this.toc.map(item=>{
                let el = document.getElementById(item.text)
                titles.push(el)
                io.observe(el);
            })
            this.$store.commit('setTitles',titles)
        },
    },
    computed:{
        ismobile(){
            return this.$store.getters.getIsMobile
        }
    }
}
</script>
<style lang="less">

</style>