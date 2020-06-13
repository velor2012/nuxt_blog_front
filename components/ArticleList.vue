<template>
  <my-list :Data.sync="listItem">
    <template #card-content="{item}">
      <v-row class="article_card" align="center">
        <v-col :cols="ismobile?12:8" class="pa-0">
          <v-card-title v-if="!ismobile" class="headline font-weight-bold">{{item.title}}</v-card-title>
          <v-img min-height="20vh" v-if="ismobile" class="white--text align-end" :src="item.cover">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black"></v-progress-circular>
              </v-row>
            </template>
            <v-card-title class="headline font-weight-bold">{{item.title}}</v-card-title>
          </v-img>
          <v-card-subtitle class="font-weight-bold">
            <span class="post-time">
              <v-icon small>mdi-calendar-range</v-icon>发表于
              <a>{{item.createdAt | formatDateFull}}</a>
            </span>
            <span class="post-time">
              <v-icon small>mdi-calendar-range</v-icon>更新于
              <a>{{item.updatedAt | formatDateFull }}</a>
            </span>
          </v-card-subtitle>
          <v-card-text class="font-weight-bold">{{item.resume}}</v-card-text>
        </v-col>
        <v-col cols="4" class="pc-arcticle-cover" v-if="!ismobile">
          <v-img :src="item.cover">
            <template v-slot:placeholder>
              <v-row class="fill-height" align="center" justify="center">
                <v-progress-circular indeterminate color="black"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <v-divider />
      <v-card-text class="chips-rows">
        <v-row align="center" justify="space-between">
          <div>
            <v-chip-group column active-class="primary--text">
              <v-chip
                :small="ismobile"
                class="chips"
                color="amber lighten-2"
                light
                v-for="(category,index) in item.categories"
                :key="index"
              >{{ category.name }}</v-chip>
            </v-chip-group>
          </div>
          <div v-if="!ismobile">
            <v-icon>mdi-eye-outline</v-icon>
            <span class="article-info">未实现</span>
          </div>
        </v-row>
      </v-card-text>
      <v-divider v-if="ismobile" />
      <v-card-text v-if="ismobile" class="pa-1 px-4">
        <v-row align="center" justify="space-between">
          <div>
            <v-icon>mdi-eye-outline</v-icon>
            <span class="article-info">未实现</span>
          </div>
        </v-row>
      </v-card-text>
    </template>
  </my-list>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyList from '~/components/MyList.vue'
import MyArticleAPI from '../api/article'
import { listItem } from '../types'
import { Bus } from '~/utils/common'
import { mystore } from '~/store'
import _ from 'lodash'
import dayjs from 'dayjs'
@Component({
    components: {
        MyList
    }
})
export default class ArticleList extends Vue {
    pageSize = 3
    page = 0
    queryForCat = {}
    queryForDate = {}
    //用以区分随笔文章和笔记
    listItem: listItem = new listItem()
    async mounted() {
        this.getNextPageData()
        this.getTotalItems()
        mystore.setCurrentType('article')
    }
    getTotalItems() {
        MyArticleAPI.getTotalNumberAPI(this.$axios).then(res => {
            if (res.success) {
                this.listItem.total = res.data
                mystore.setTotalAritcle = res.data
            }
        })
    }
    getData(page: number, needTotal: boolean = false) {
        this.listItem.loading = true
        let where = JSON.stringify({
            ...this.queryForDate,
            ...this.queryForCat
        })
        MyArticleAPI.findAllAPI(
            this.$axios,
            this.pageSize,
            page,
            where,
            needTotal
        ).then(res => {
            if (res.success) {
                //当直接调用getData获取比当前page小的数据时
                if (page != this.page || this.page == 1) {
                    this.listItem.items = this.listItem.items.splice(
                        0,
                        (page - 1) * this.pageSize
                    )
                    this.page = page
                }
                //返回总数时res的格式不一样
                if (needTotal) {
                    this.listItem.total = res.data.total
                    this.listItem.items.push(...res.data.data)
                } else {
                    this.listItem.items.push(...res.data)
                }
            }
            this.listItem.loading = false
        })
    }
    getNextPageData() {
        this.getData(++this.page)
    }
    //处理事件
    created() {
        this.addBusEvent()
    }
    addBusEvent() {
        Bus.$on('getNextPageData', this.getNextPageData)
        Bus.$on('onSelectCategories', this.onSelectCategories)
        Bus.$on('onSelectMonth', this.onSelectMonth)
    }
    removeBusEvent() {
        Bus.$off('getNextPageData')
        Bus.$off('onSelectCategories')
        Bus.$off('onSelectMonth')
    }
    //在vue对象的beforeDestroy钩子中调用以上函数
    beforeDestroy() {
        this.removeBusEvent()
    }
    onSelectCategories(categories: any[]) {
        if (categories.length == 0) {
            this.queryForCat = {}
            this.getData(1, true)
            return
        }
        this.queryForCat = { categories: { $in: categories } }
        this.getData(1, true)
    }
    onSelectMonth(picker: any) {
        if(picker==''||picker==null){
            this.queryForDate = {}
        } else{
            let date = dayjs(picker).toDate()
            let date2 = dayjs(picker)
                .add(1, 'month')
                .toDate()
            this.queryForDate = { updatedAt: { $gte: date, $lt: date2 } }
        }
        console.log(this.queryForDate)
        this.getData(1, true)
    }
    //end 处理事件

    get ismobile() {
        return mystore.isMoblie
    }
    getLocalTime(nS) {
        let date = new Date(nS)
        let result = `${date.getFullYear()}年${date.getMonth() +
            1}月${date.getDate()}日`
        return result
    }
}
</script>
<style lang="scss">
.article_card {
    max-width: 100%;
}
.row {
    width: 100%;
}
</style>