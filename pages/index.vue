<template>
      <v-row dense>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        > 
           <v-hover v-slot:default="{ hover }">

            <v-card
              :elevation="hover ? 12 : 2"
              :color="hover ? 'rgba(140,251,229, 0.6)':'rgba(255, 255, 255, 0.4)'"
            >
              <v-card-title class="headline">{{item.title}}</v-card-title>

              <v-card-subtitle>
                    <v-card-text class="post">
                      <span class="post-time">
                        <v-icon small>mdi-calendar-range</V-icon>
                        发表于 <a>{{getLocalTime(item.createTime)}}</a>
                      </span>
                      <span class="post-time">
                        <v-icon small>mdi-calendar-range</V-icon>
                        更新于 <a>{{getLocalTime(item.updateTime)}}</a>
                      </span>
                      <span class="post-class">
                        <v-icon small>mdi-folder-open</v-icon>
                        分类于
                        <a>{{item.type}}</a>
                      </span>
                    </v-card-text>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn light @click="show(item)" color="rgba(23, 199, 164, 0.6)">阅读文章</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
        <v-col span="12">
          <v-pagination
            v-model="page"
            :circle="true"
            :page="page"
            :disabled="false"
            :length="total"
            @input="getCurrentPageArticles"
            @next="getNextPageArticles"
          ></v-pagination>
        </v-col>
      </v-row>
</template>

<script>
const {message} =require('./message')
  export default {
    name:'page_index',
    data: () => ({
      baseurl : '/api/article/',
      total:1,
      isloading:false,
      page:1,
      pageSize:5,
      items: [
      ],
    }),
    created(){
      this.refresh()
    },
    methods:{
      show (index) {
          let id = this.datas[index]._id
          this.getArticleById(id).then(data=>{
                  // 似乎只能通过name来传参数，用path不行，子组件名字默认是 父组件-子组件
                  this.$router.push({name:'home-edit_article', params:{'article':data}})
              })
      },
      getLocalTime(nS) {  
          return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');  
      },
      refresh(){
        this.isloading = true
        var url = this.baseurl + 'total'
        this.$axios.get(url).then(res => {
            if(res.data.success){
                this.total = Math.ceil(Number(res.data.other.total)/this.pageSize)
            }
        })
        var url = this.baseurl + 'pageSize='+this.pageSize +'&' + 'page=1'
        this.$axios.get(url).then(res => {
            if(res.data.success){
                let articles = res.data.other.article
                this.items = articles
                this.isloading = false
            }
        })
      },
      getCurrentPageArticles(pageIndex){
          // console.log(pageIndex)
          var url = this.baseurl + 'pageSize='+this.pageSize +'&' + 'page='+ pageIndex
          this.$axios.get(url).then(res => {
              if(res.data.success){
                  let articles = res.data.other.article
                  this.items = articles
              }else{
                message.error(this,true,'找不到文章',res.data.reason) 
              }
          })
      },
      getNextPageArticles(){
        console.log(this.page)
      },
      show(article){
        let id = article._id
        this.getArticleById(id).then(data=>{
                // 似乎只能通过name来传参数，用path不行，子组件名字默认是 父组件-子组件
                this.$router.push({name:'detail', params:{'data':data}})
            })
      },
      async getArticleById(id){
        var url = this.baseurl + 'html/id='+id
        let article = ''
        let con = ''
        await this.$axios.get(url).then(res => {
            if(res.data.success){        
                con = res.data.other.con
                article = res.data.other.article
            }else{
                message.error(this,true,'找不到文章')
            }
        })
        return {article,con}
      },
    }
  }
</script>
<style lang="less">
  .post{
    padding:0
  }
</style>>