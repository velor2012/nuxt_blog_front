<template>
  <v-row justify="center" align="center">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" class="py-0" :class="{'mt-3':ismobile}">
            <my-date-picker />
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" class="py-0" >
        <my-category-picker />
      </v-col>      
  </v-row>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyDatePicker from '~/components/picker/DatePicker.vue'
import MyCategoryPicker from '~/components/picker/CategoryPicker.vue'
import { mystore } from '~/store';
@Component({
components: {
    MyCategoryPicker,
    MyDatePicker
}
})
export default class Picker extends Vue {
        get ismobile() {
        return mystore.isMoblie
    }
}
</script>