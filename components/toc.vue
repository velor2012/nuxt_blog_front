<template>
  <div id="sticky-nav">
    <v-list rounded dense>
        <v-subheader>目录</v-subheader>
        <v-list-item-group v-model="model" mandatory color="primary">
        <v-list-item
            v-for="(item, i) in toc"
            :key="i"
            @click="go(item.text)"
            router
            exact
            class="v-list-item"
        >
            <v-list-item-content>
            <v-list-item-title v-text="getTOCText(item.layer,item.text)" />
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
    </v-list>   


</div>

</template>
<script>
import Bus from '~/pages/util'
export default {
    data(){
        return{
            model: 1,
            scroll_option:{
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
            },
            TOC_list:[]
        }
    },
    computed:{
        toc(){
            return this.$store.getters.getToc
        },
        io(){
            this.$store.getters.getIO
        },
        titles(){
            this.$store.getters.getTitles
        }
    },
    methods: {
        getTOCText(layer,text){
            let result = ''
            let arr = []
            text = text.replace(/anchor_/,'')
            for(var i=0;i<(Number(layer));i++){
                arr.push(i+1);
            }        
            arr.map((item,index)=>{
                result = result +'- '
            })
            return result + text
        },
        getTOCList(){
            this.toc.map(item=>{
                this.TOC_list.push(item.text)
            })
        },
        changeItem(item){
            if(this.TOC_list.indexOf(item<0)){
                this.getTOCList()
            }
            this.model = this.TOC_list.indexOf(item);
        },
        go(path){
            this.unobserve()
            this.$vuetify.goTo(`#${path}`, this.scroll_option)
            setTimeout(this.observe,this.scroll_option.duration)
        },
        unobserve(){
            if(this.titles){
                // console.log('unobserve')
                this.titles.map(title=>{
                    this.io.unobserve(title)
                })
            }
        },
        observe(){
            if(this.titles){
                // console.log('observe')
                this.titles.map(title=>{
                    this.io.observe(title)
                })
            }
        }
    },
    created() {
        Bus.$on('changeTOCActvivateItem',this.changeItem)
    },
}
</script>
<style lang="less">
    #sticky-nav {
    position: sticky;
    top: 100px;
    }
</style>