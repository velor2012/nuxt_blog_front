<template>
  <v-row justify="space-around">
    <v-col v-show="!(ismobile && showOutline)" :cols="ismobile?12:8" :class="{'pa-0':ismobile}">
      <v-card class="vditor-reset vditor" >
        <v-card-title class="pa-1 px-3"><slot name="markdownTitle"></slot></v-card-title>
        <v-card-text v-viewer v-html="html" id="markdownbody"></v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="ismobile && showOutline?12:3" v-show="!ismobile || showOutline">
        <v-card maxHeight="70vh" class="outline-card">
            <v-card-text class=" vditor" id="outline"></v-card-text>
        </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'nuxt-property-decorator'
import { mystore } from '~/store'
import { Bus } from '~/utils/common'
// Or use dark
@Component({
    components: {}
})
export default class Markdown extends Vue {
    @PropSync('content', { type: String, required: true })
    readonly syncContent: String
    html = ''
    option = {
        anchor: 1,
        lazyLoadImage: 'https://cdn.jsdelivr.net/npm/vditor/dist/images/img-loading.svg'
    }
    previewElement=null
    //手机端是否显示大纲
    showOutline=false
    mounted() {
        let _this = this
        this.$nextTick(() => {
            let VditorPreview = require('vditor/dist/method.min')
            VditorPreview.md2html(this.syncContent, this.option).then(res => {
                _this.html = res
                _this.previewElement = document.getElementById('markdownbody')
                this.$nextTick(() => {
                    VditorPreview.codeRender(
                        _this.previewElement
                    )
                    VditorPreview.outlineRender(
                         _this.previewElement,
                        document.getElementById('outline')
                    )
                    VditorPreview.highlightRender(
                        {
                            lineNumber:false,
                            style: 'xcode',
                            enable:true
                        },
                         _this.previewElement
                    )
                    VditorPreview.setCodeTheme('xcode')
                    VditorPreview.lazyLoadImageRender(_this.previewElement)
                })
            })
        })
    }
    //处理事件
    created() {
        this.addBusEvent()
    }
    addBusEvent() {
        Bus.$on('changeShowOutLine', this.changeShowOutLine)
    }
    removeBusEvent() {
        Bus.$off('changeShowOutLine')
    }
    //在vue对象的beforeDestroy钩子中调用以上函数
    beforeDestroy() {
        this.removeBusEvent()
        this.showOutline=false
    }
    changeShowOutLine(isShow:boolean){
        this.showOutline=isShow
    }
    //end处理事件
    get ismobile() {
        return mystore.isMoblie
    }
}
</script>
<style lang="scss">
@import 'vditor/src/assets/scss/index.scss';
.outline-card{
    position:sticky;
    top: 10vh;
    overflow:scroll;
}
code{
    max-height: none!important;

}
</style>