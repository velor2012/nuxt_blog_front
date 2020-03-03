<template>
  <v-card
    class="mx-auto"
  >
    <v-container>
      <v-row dense>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        > 
           <v-hover v-slot:default="{ hover }" value>

            <v-card
              :elevation="hover ? 12 : 2"
              :color="hover ? 'rgba(140,251,229, 0.6)':'rgba(255, 255, 255, 1)'"
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
                    <v-card-text class="content">{{item.description}}</v-card-text>
              </v-card-subtitle>

              <v-card-actions>
                <v-btn text>Listen Now</v-btn>
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
            :total-visible="totalVisible"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name:'page_index',
    data: () => ({
      baseurl : '/api/article/',
      total:1,
      isloading:false,
      totalVisible:3,
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
                this.total = Number(res.data.other.total)
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
    }
  }
</script>