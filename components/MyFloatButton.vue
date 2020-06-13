<template>
  <v-fab-transition>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      v-show="show || showOutline || showNoteSD"
      :direction="direction"
      :transition="transition"
      class="my-speed-dial"
      v-scroll="onScroll"
    >
      <template v-slot:activator>
        <v-btn small v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="$vuetify.goTo(0)">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" v-show="/\/(article|note)\/\w+/.test($route.path)||/\/(author|about)/.test($route.path)" @click="onClickShowOutline">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" v-show="/\/note\/\w+/.test($route.path)" @click="onClickShowNoteSD">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab-transition>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mystore } from '~/store'
import { Bus } from '../utils/common';
@Component({
    components: {}
})
export default class MyFloatButton extends Vue {
    direction = 'top'
    show = false
    fab = false
    fling = false
    hover = true
    tabs = null
    top = false
    right = true
    bottom = true
    left = false
    transition = 'slide-y-reverse-transition'
    showOutline=false
    showNoteSD = false
    onScroll(e) {
        this.show = window.pageYOffset ? true : false
    }
    onClickShowOutline(){
        this.showOutline = !this.showOutline 
        Bus.$emit('changeShowOutLine',this.showOutline)
    }
    onClickShowNoteSD(){
        this.showNoteSD = !this.showNoteSD 
        Bus.$emit('changeShowNoteSD',this.showNoteSD)
    }
}
</script>
<style lang="scss">
// .my-speed-dial{
//     bottom: 10vh;
// }
</style>