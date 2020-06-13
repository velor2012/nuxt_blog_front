<template>
<v-date-picker locale="zh-cn" color="#FF595E" light v-model="picker"
 @click:month="onSelectMonth" full-width type="month"></v-date-picker>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import { Bus } from "~/utils/common"
@Component({
components: {
}
})
export default class MyDatePicker extends Vue {
    picker=''
    lastValue=''
    onSelectMonth(value){
        console.log('lastValue: %s,value: %s',this.lastValue,value)
          if(value==this.lastValue){
              this.lastValue = this.picker = ''
              Bus.$emit('onSelectMonth','')
              return
          }
          this.lastValue = value
          Bus.$emit('onSelectMonth',value)
      }
}
</script>