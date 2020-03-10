<template>
<div>
    <!-- <v-layout >
        <v-flex > -->
            <msg v-bind:message="message"/>
            <v-dialog eager v-model="DialogOption.show" max-width="290">
                <v-date-picker v-show="DialogOption.type=='日期'" v-model="picker" @click:month="SelectMonth" full-width type="month"></v-date-picker>
                <ColorfulChip v-show="DialogOption.type=='分类'" :typeInfo="typeInfo"/>
            </v-dialog>
            <v-row class="row">
                <v-col v-show="done_created" :cols="ismobile?12:8">
                     <ArticleList :Data="{...ArticleListData,picker}"/>
                </v-col>       
                <v-col v-show="!ismobile&&done_created" cols="4" class="date_picker" style="padding-left:1em;padding-top:2em">
                    <TypeAndDate 
                    :typeInfo="typeInfo"
                    class = "animated fadeInRight"
                    />
                </v-col>
            </v-row>
        <!-- </v-flex>
    </v-layout> -->
</div>
</template>
<script>
import ArticleList from '~/components/ArticleList.vue'
import TypeAndDate from '~/components/TypeAndDate.vue'
import ColorfulChip from '~/components/ColorfulChip.vue'
import msg from '~/components/message.vue'
import Bus from '~/pages/util'
export default {
    name:'index',
    data(){
        return{
            tab:'',
            ArticleListData:{
                baseurl : '/api/article/',
                complexquery_url:'/api/article/complex',
                total:1,
                page:0,
                pageSize:10,
                items: [],
                loading: false,
                reloading:false,
            },
            DialogOption:{
                type:"分类",
                show:false
            },
            all_type_info_url:'/api/article/all_type',
            user_base_info_url:'/api/user/base_info/id=5e65235b2716a4485c4cb931',
            typeInfo:[],
            picker:'',
            message:{show:false,content:'成功',color:'success'},
            // userBaseInfo:'',
            done_created:false
        }
    },
    components:{
        ArticleList,
        TypeAndDate,
        msg,
        ColorfulChip
    },
    created(){
        //注册事件
        Bus.$on('onClickChip',this.searchByType)
        Bus.$on('getNextPageArticles',this.getNextPageArticles)
        Bus.$on('onSelectMonth',this.onSelectMonth)
        Bus.$on('showFilter',this.showFilter).stop
        Bus.$on('search',this.search)
        Bus.$on('refreshArticleList',this.refresh)
        this.refresh()
    },
    activated(){
        this.$store.commit('setShowFilter',true)
        if(this.$route.params.refresh){
            this.refresh()
        }
    },
    methods:{
        refresh(){
            // console.log('refresh')
            //重制
            this.ArticleListData={
                baseurl : '/api/article/',
                complexquery_url:'/api/article/complex',
                total:1,
                page:0,
                pageSize:10,
                items: [],
                loading: false,
                reloading:false,
                date:null
            }
            //获取文章信息
            this.$store.commit('setIsLoading',true)
            this.ArticleListData.loading = true
            var url = this.ArticleListData.baseurl + 'total'
            this.$axios.get(url).then(res => {
                if(res.data.success){
                    this.ArticleListData.total = Number(res.data.other.total)
                }
            })
            // this.getNextPageArticles()
            this.getTypesInfo()
        },
        getNextPageArticles(){
            console.log('getNextPageArticles')
            this.ArticleListData.loading = true
            this.ArticleListData.page += 1
            // console.log('params %O',{...this.pageInfo,type:this.searchType})
            let params = {date:null,type:this.searchType,params:this.pageInfo}
            // console.log('params %O',params)
            this.$axios.get(this.ArticleListData.complexquery_url,params).then(res => {
                if(res.data.success){
                    let articles = res.data.other.article
                    this.ArticleListData.items.push(...articles)
                }else{
                    this.message = {show:true,content:'找不到文章:'+res.data.reason,color:'false'}
                }
                this.ArticleListData.loading=false
            })
        },
        SelectMonth(value){
            Bus.$emit('onSelectMonth',{value:value,picker:this.picker})
        },
        //日期查询
        onSelectMonth(value){
            this.ArticleListData.reloading = true
            this.ArticleListData.loading = true
            this.picker = value.picker
            let params = {params:{date:value.value,need_total:true,...this.pageFirstInfo}}
            this.$axios.get(this.ArticleListData.complexquery_url,params).then(res=>{
                    console.log('data select')
                    this.ArticleListData.total = res.data.other.total
                    this.ArticleListData.items = res.data.other.article
                    this.ArticleListData.loading = false
                    this.ArticleListData.reloading = false
                })
        },
        //获取文章分类信息{类别名称:总数}
        getTypesInfo(creating=true){
            this.$axios.get(this.all_type_info_url).then(res=>{
                this.typeInfo = res.data.other.agg
                if(creating){
                    this.done_created = true
                    this.$store.commit('setIsLoading',false)
                }
            })
        },
        //类型查询
        searchByType(item){
            this.ArticleListData.reloading = true
            this.ArticleListData.loading = true
            this.ArticleListData.total = item.count
            this.$store.commit('setSearchArticleType',item._id)
            this.$axios.get(this.ArticleListData.complexquery_url,{params:{type:item._id,...this.pageFirstInfo}}).then(res=>{
                this.ArticleListData.items = res.data.other.article
                this.ArticleListData.loading = false
                this.ArticleListData.reloading = false
            })
        },
        showFilter(item){
            switch(item.title){
                case "分类":{
                    this.DialogOption.type="分类"
                    this.DialogOption.show=true
                    break
                }
                case "日期":{
                    this.DialogOption.type="日期"
                    this.DialogOption.show=true
                    break
                }
            }
        },
        search(keyword){
            this.$axios.get(this.ArticleListData.complexquery_url,{params:{keyword:keyword,need_total:true,...this.pageFirstInfo}}).then(res=>{
                this.ArticleListData.items = res.data.other.article
                this.ArticleListData.total = res.data.other.total
                this.ArticleListData.loading = false
                this.ArticleListData.reloading = false
            })
        }
    },
    computed:{
        pageInfo(){
            return {pageSize:this.ArticleListData.pageSize,page:this.ArticleListData.page}
        },
        pageFirstInfo(){
            return {pageSize:this.ArticleListData.pageSize,page:1}
        },
        searchType(){
            return this.$store.getters.getSearchArticleType
        },
        ismobile(){
            return this.$store.getters.getIsMobile
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$store.commit('setShowFilter',false)
        this.date=null
        this.$store.commit('setSearchArticleType','total')
        next()
    },
}
</script>