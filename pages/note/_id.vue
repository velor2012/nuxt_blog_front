<template>
  <div v-if="note" class="d-flex">
    <v-navigation-drawer v-if="!ismobile || showNoteSD" 
    :disable-resize-watcher="true"
    color="#BBD0B5" class="note-nav" app clipped left permanent>
      <v-list dense nav>
        <v-list-item
          v-for="(item,idx) in note.subDoc"
          :key="item.title"
          exact-active-class="active-aaa"
          :to="`/note/${id}/${idx}`"
          class="note-nav-item"
          v-ripple="{ class: `primary--text` }"
          @click="changeCurrentDoc(idx)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <nuxt-child v-show="!(ismobile && showNoteSD)" :key="$route.path" :note.sync="note"></nuxt-child>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import MyNoteAPI from '~/api/note'
import Note from '~/types/Note'
import { Bus } from '../../utils/common';
import { mystore } from '~/store';
@Component({
    components: {
    }
})
export default class extends Vue {
    id: string = null
    note: Note = null
    docIdx = 0
    showNoteSD=false
    mounted() {
        this.id = _.get(this, '$route.params.id')
        this.getData()
    }
    async getData() {
        let res = await MyNoteAPI.findOneAPI(this.$axios, this.id)
        if (res.success) {
            this.note = res.data
        }
    }
    get currentDoc() {
        return this.note.subDoc[this.docIdx]
    }
    changeCurrentDoc(idx: number) {
        this.docIdx = idx
    }
    //处理事件
    created() {
        this.addBusEvent()
    }
    addBusEvent() {
        Bus.$on('changeShowNoteSD', this.changeShowNoteSD)
    }
    removeBusEvent() {
        Bus.$off('changeShowNoteSD')
    }
    //在vue对象的beforeDestroy钩子中调用以上函数
    beforeDestroy() {
        this.removeBusEvent()
        this.showNoteSD=false
    }
    changeShowNoteSD(isShow:boolean){
        this.showNoteSD=isShow
    }
    //end处理事件
    get ismobile() {
        return mystore.isMoblie
    }
}
</script>
<style lang="scss">
.note-nav {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    .note-nav-item:hover {
        cursor: pointer;
    }
}
</style>