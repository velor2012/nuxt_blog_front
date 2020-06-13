<template>
  <v-row justify="space-around">
    <v-col cols="12" class="pa-0">
      <v-chip-group
        class="chip-group"
        column
        multiple
        v-model="selectCategories"
        active-class="primary--text"
        @change="onSelectCategoriesChange"
      >
        <v-chip
          v-for="(groupItem,idx) in group"
          :key="idx"
          :value="groupItem._id._id"
          color="#BBD0B5"
          active-class="active-chip"
        >
          <v-avatar left color="rgba(25,118,210)">{{groupItem.count}}</v-avatar>
          {{ groupItem._id.name }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator'
import MyCategoryAPI, { CategoryAPI } from '~/api/category'
import { CategoryGroupItem } from '~/types'
import { Bus, randomColor } from '~/utils/common'
import { NoteAPI } from '~/api/note'
import { ArticleAPI } from '../../api/article'
import MyArticleAPI from '../../api/article'
import MyNoteAPI from '../../api/note'
import { mystore } from '~/store'
@Component({
    components: {}
})
export default class MyCategoryPicker extends Vue {
    group: CategoryGroupItem[] = []
    selectCategories: string[] = []
    colors: string[] = []
    api: ArticleAPI | NoteAPI = null
    mounted() {
        if (mystore.currentType == 'article') {
            this.api = MyArticleAPI
        } else this.api = MyNoteAPI
        this.getGroup()
    }
    async getGroup() {
        let res = await this.api.group(this.$axios)
        if (res.success) {
            this.group = res.data
        }
    }
    onSelectCategoriesChange(data: string[]) {
        Bus.$emit('onSelectCategories', data)
    }
}
</script>
<style lang="scss">
@import 'assets/scss/myvariables.scss';
.active-chip {
    background-color: map-get($map: $colors, $key: 'green') !important;
    color: white !important;
}
</style>