<template>
<v-container>
        <client-only>
        <waterfall 
          :list="srcList" 
          :gutter="10" 
          :width="240" 
          :breakpoints="{
            1200: { //当屏幕宽度小于等于1200
              rowPerView: 4,
            },
            800: { //当屏幕宽度小于等于800
              rowPerView: 3,
            },
            500: { //当屏幕宽度小于等于500
              rowPerView: 2,
            }
          }"
          ref="waterfall"
          backgroundColor="rgba(0, 0, 0,0)"
          >
          <template slot="item" slot-scope="props">
            <v-card data-trigger5>
              <v-img class="emoji_img" :src="props.data.src" @click="showImage(props.data.idx)" alt="" @load="$refs.waterfall.refresh()"/>
            </v-card>
          </template>
        </waterfall>
        </client-only>
    <div class="images" v-show="false" v-viewer="{movable: true}">
      <img v-show="false" v-for="item in srcList" :src="item.src" :key="item.index">
    </div>
  </v-container>
</template>
<script lang="ts">
import {Component,Vue} from "nuxt-property-decorator"
import MyImgAPI from '../../api/Img';
@Component({
components: {
}
})
export default class extends Vue {
    emojis: any[]=[]
    srcList: any[]=[]
    totalData=0
    pageSize=18

    mounted() {
        this.getTotalNumber();
        this.getData(1);
    }
    getTotalNumber() {
        MyImgAPI.getTotalNumberAPI(this.$axios).then(res => {
            if (res.success) {
                this.totalData = res.data;
            }
        });
    }
    async getData(index: number) {
        let res = await MyImgAPI.getAll(
            this.$axios,
            "emoji",
            this.pageSize,
            index
        );
        if (res.success && res.data instanceof Array) {
            this.emojis = res.data
            let count = -1
            this.srcList = this.emojis.map(v=>{
                count++
                return{
                    idx:count,
                    src:v.path
                }
            })
        }
    }
    showImage(index){
        console.log('in')
        const viewer = (this.$el.querySelector('.images') as any).$viewer
        if(viewer){
          viewer.index = index
          viewer.show()
        }
    }
}
</script>