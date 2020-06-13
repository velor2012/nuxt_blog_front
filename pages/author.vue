<template>
<v-container v-if="info">
    <Markdown :content="info">
        <template #markdownTitle>
            <div class="author-other-link">
                <v-icon
                  large
                  style="padding-top:10px"
                  v-for="(item, i) in link"
                  :key="i"
                  @click="goto(item.to)"
                  >{{ item.icon }}</v-icon
                >
              </div>
        </template>
    </Markdown>
</v-container>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyUserAPI from '../api/user';
import _ from 'lodash';
import Markdown from '~/components/Markdown.vue'
const config = require('~/config.json')
@Component({
components: {
    Markdown
}
})
export default class AuthorPage extends Vue {
    id=null
    info=''
    link=[
        {
          icon: "mdi-github",
          to: "https://github.com/velor2012"
        },
        {
          icon: "mdi-sina-weibo",
          to: "https://weibo.com/u/6044500110/home?leftnav=1"
        }
      ]
    mounted() {
        this.id = config.adminId
        if (!_.isEmpty(this.id)) {
            MyUserAPI.findOneAPI(this.$axios, this.id).then(res => {
                if (res.success) {
                    this.info = res.data.info;
                }
            });
        }
    }
}
</script>