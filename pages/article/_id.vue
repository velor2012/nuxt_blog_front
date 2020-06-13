<template>
<v-container v-if="article">
    <Markdown :content="article.content"/>
</v-container>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import _ from 'lodash';
import MyArticleAPI from '~/api/article';
import Article from '~/types/Article';
import Markdown from '~/components/Markdown.vue'
@Component({
components: {
    Markdown
}
})
export default class extends Vue {
    id:string = null
    article:Article = null
    mounted(){
        this.id = _.get(this, "$route.params.id");
        this.getData()
    }
    async getData(){
        let res = await MyArticleAPI.findOneAPI(this.$axios,this.id)
        if(res.success){
            this.article = res.data
        }
    }
}
</script>