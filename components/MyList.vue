<template>
  <v-row dense class="article-list" v-if="syncData.items">
    <v-col v-for="(item, i) in syncData.items" :key="i" cols="12" class="animated fadeIn">
      <v-hover :disabled="ismobile" v-slot:default="{ hover }">
        <v-card
          :elevation="hover ? 24 : 2"
          :color=" hover?'rgba(255,255,255,0.5)':'white'"
          nuxt
          data-trigger4
          :to="syncType=='note'?pagePath.getNotePage(item._id):pagePath.getArticlePage(item._id)"
          class="rounded-xl my-card"
        >
          <slot name="card-content" :item="item"></slot>
        </v-card>
      </v-hover>
    </v-col>
    <v-col clos="12" calss='text-center max-width-100'>
            <div v-show="needLoadData==0" class="text-center">没有更多了</div>
            <div class="text-center ma-12" v-show="needLoadData>0">
            <v-progress-circular
                id="circularLoading"
                :indeterminate="true"
                :rotate="0"
                :size="32"
                :value="0"
                :width="4"
                color="light-blue"
            ></v-progress-circular>
            </div>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'nuxt-property-decorator'
import { mystore } from '~/store'
import { listItem } from '~/types'
import { Bus } from '~/utils/common'
import MyPagePath, { PagePath } from '../types/Path';
@Component({
    components: {}
})
export default class MyList extends Vue {
    @PropSync('Data', { type: Object, required: true })
    readonly syncData: listItem
    trigger = null
    readonly pagePath:PagePath = MyPagePath
    oberserLoading() {
        var io = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting&&!this.syncData.loading) {
                    if (this.needLoadData > 0) {
                        Bus.$emit('getNextPageData')
                    } else {
                        // io.unobserve(el);
                    }
                }
            },
            {
                threshold: [0]
            }
        )
        let el = document.getElementById('circularLoading')
        io.observe(el)
    }
    mounted() {
        this.$nextTick(() => {
            this.oberserLoading()
        })
    }
    get ismobile() {
        return mystore.isMoblie
    }
    get needLoadData() {
        return this.syncData.total - this.syncData.items.length
    }
    get listlength() {
        return this.syncData.items.length
    }
    get syncType(){
        return mystore.currentType
    }
    @Watch('listlength')
    onListLengthChage(value) {
        let _this = this
        if (value == 0) return
        this.$nextTick(() => {
            _this.trigger = new _this.$sr({
                trigger: {
                    offset: {
                        viewport: {
                            x: 0,
                            y: (trigger, frame, direction) => {
                                return trigger.visible ? 0 : 0.2
                            }
                        }
                    },
                    toggle: {
                        class: {
                            in: ['fadeIn', 'animated']
                        },
                        callback: {
                            in: trigger => {},
                            out: trigger => {}
                        }
                    }
                }
            })
            _this.trigger.add('[data-trigger4]')
        })
    }
}
</script>
<style lang="scss">
  .visible, .invisible {
  opacity: 0.0;
  transition: opacity 0.5s ease;
}
.visible {
  opacity: 1.0;
}
.my-card{
    overflow: hidden;
}
.chips-rows {
    padding-top: 0;
    padding-bottom: 0;
}
</style>