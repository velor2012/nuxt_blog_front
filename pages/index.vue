<template>
<v-container>
  <v-row>
    <v-col :cols="ismobile?12:8">
      <article-list />
    </v-col>
    <v-col v-if="!ismobile" clos="4">
        <Picker/>
    </v-col>
  </v-row>
</v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ArticleList from '~/components/ArticleList.vue'
import Picker from '~/components/picker/CategoryAndDate.vue'
import MyDatePicker from '~/components/picker/DatePicker.vue'
import MyCategoryPicker from '~/components/picker/CategoryPicker.vue'
import { mystore } from '~/store'
@Component({
    components: {
        ArticleList,
        MyDatePicker,
        MyCategoryPicker,
        Picker
    }
})
export default class IndexPage extends Vue {
    get ismobile() {
        return mystore.isMoblie
    }
}
</script>