<template>
  <div id="sticky-nav" v-scroll="onScroll">
    <v-list light rounded dense>
        <v-subheader>目录</v-subheader>
        <v-list-item-group v-model="model" mandatory color="primary">
        <v-list-item
            v-for="(item, i) in toc"
            :key="i"
            @click="$vuetify.goTo(`#${item.text}`, scroll_option)"
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
            TOC_list:[],
            activate_list:[],
            scroll_top:0,
            interval_id:NaN,
            anchor_offset:NaN,
            bias:400,
            timer:NaN
        }
    },
    computed:{
        toc(){
            return this.$store.getters.getToc
        },
        height(){
            return this.$store.getters.getHeight
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
                this.activate_list.push(false)
            })
        },
        /**
         * 拿到所有toc到顶部的距离
         * */
        getFloorDistance(){
            // clearInterval(this.interval_id)
            this.anchor_offset=[]
            for(let i = 0 ; i < this.toc.length; i++){
                let el = document.getElementById(this.toc[i].text)
                if(!el) return
                let offset = document.getElementById(this.toc[i].text).offsetTop;
                this.anchor_offset.push(offset)
            }
        },
        onScroll(){
            this.scroll_top=document.documentElement.scrollTop||document.body.scrollTop;
        }
    },
    mounted(){
        this.$nextTick(() => {
            let _this=this
            this.interval_id = setInterval(()=>{
                _this.getFloorDistance()
            },500)
        })
    },
    watch:{
        height(value){
            this.bias = value/2
        },
        activate_list:{
            handler(newValue, oldValue) {
                for(let i = 0 ; i < newValue.length; i++){
                    if(newValue[i]){
                        this.model = i
                        break;
                    }
                }
            },
            deep: true
        },
        scroll_top(newValue){
            let _this = this
            if(this.timer){
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(()=>{
                for(let i = 0; i<_this.anchor_offset.length; i++){
                    if(_this.anchor_offset[i]<newValue+_this.bias && _this.anchor_offset[i+1]>newValue+_this.bias){
                        _this.model=i
                    }
                }
            },200)
        }
    }
}
</script>
<style lang="less">
    #sticky-nav {
    position: sticky;
    top: 100px;
    }
</style>