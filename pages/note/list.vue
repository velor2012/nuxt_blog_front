<template>
<v-container>
  <v-row>
    <v-col :cols="ismobile?12:8">
      <note-list />
    </v-col>
    <v-col v-if="!ismobile" clos="4">
        <Picker/>
    </v-col>
  </v-row>
</v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NoteList from '~/components/NoteList.vue'
import { mystore } from '~/store'
import Picker from '~/components/picker/CategoryAndDate.vue'
import MyDatePicker from '~/components/picker/DatePicker.vue'
import MyCategoryPicker from '~/components/picker/CategoryPicker.vue'
@Component({
    components: {
        NoteList,
        MyDatePicker,
        MyCategoryPicker,
        Picker
    }
})
export default class NoteListPage extends Vue {
        get ismobile() {
        return mystore.isMoblie
    }
}
</script>