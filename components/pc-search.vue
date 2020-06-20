<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="loading1 || loading2"
    :search-input.sync="keyword"
    :filter="filter"
    clearable
    hide-details
    hide-selected
    hide-no-data
    solo
    flat
    prepend-inner-icon="mdi-magnify"
    item-value="title"
    item-text="empty"
    label="Search"
    rounded
    @keyup.native.enter="search"
  >
  <template v-slot:item="{ item }">
      <div @click="onItemClick(item)" class="d-flex">
        <div class="search-item fs-sm pr-2 border-right" v-html="item.type"></div>
        <div class="search-item pl-2" v-html="item.title"></div>
      </div>
  </template>
  </v-autocomplete>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Bus } from '~/utils/common'
import MyArticleAPI from '~/api/article'
import MyNoteAPI from '../api/note';
@Component({
    components: {}
})
export default class PcSearch extends Vue {
    keyword: string = ''
    model = null
    loading1 = false
    loading2 = false
    timer1=null
    timer2=null
    items = []
    pageSize =2
    //防止点击时触发搜索
    clicking=false
    search() {
        Bus.$emit('search', this.keyword)
    }
    @Watch('keyword')
    onKeywordChange(value) {
        if (value == '' || !value || this.clicking) return
        this.items=[]
        this.queryArticle(value)
        this.queryNote(value)
    }
    queryArticle(value:string){
        this.loading2 = true
        if(this.timer2){
            clearTimeout(this.timer2)
        }
        // Simulated ajax query
        this.timer2 = setTimeout(() => {
            MyArticleAPI.searchAPI(this.$axios, this.keyword, this.pageSize, 1).then(
                res => {
                    if (res.success) {
                        let result =  res.data.results.map(v => {
                            return {
                                _id: v.article._id,
                                title: v.article.title,
                                score:v.score,
                                type:'随笔',
                                empty:''
                            }
                        })
                        this.items.push(...result)
                    }
                    this.loading2 = false
                    this.items = this.items.sort((a,b)=>a.score>b.score?-1:1)
                }
            )
        }, 500)
    }
    queryNote(value:string){
        this.loading1 = true
        // Simulated ajax query
        if(this.timer1){
            clearTimeout(this.timer1)
        }
        this.timer1 = setTimeout(() => {
            MyNoteAPI.searchNoteAPI(this.$axios, this.keyword, 2, 1).then(
                res => {
                    if (res.success) {
                        let result = res.data.results.map(v => {
                            return {
                                _id: v.note._id,
                                title: v.note.name,
                                score:v.score,
                                type:'笔记',
                                empty:''
                            }
                        })
                        this.items.push(...result)
                    }
                    this.loading1 = false
                    this.items = this.items.sort((a,b)=>a.score>b.score?-1:1)
                }
            )
        }, 500)
    }
    filter(item: any, queryText: string, itemText: string){
            for(var i = 0; i < this.items.length && i < this.pageSize; i++) {
                //do something
                if(this.items[i].score<=item.score) return true
            };
            return false
    }
    onItemClick(item){
        this.clicking=true
        this.items=[]
        let prefix= item.type=='笔记'?'note':'article'
        this.$router.push(`/${prefix}/${item._id}`)
        this.clicking=false
    }
}
</script>
<style lang="scss" scope>
.search-item{
    em{
        color:red
    }
}
//点击搜索框改变宽度
#header .v-input--is-focused {
    max-width: 25rem !important;
}
#header .v-input {
    transition: 0.3s;
    max-width: 15rem;
}
//end
</style>