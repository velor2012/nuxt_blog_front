<template>
  <div id="app" class="d-flex align-center justify-center">

    <div class="images" v-show="isShow" v-viewer="{movable: true}">
      <img v-show="true" v-for="src in images" :src="src" :key="src">
    </div>
     <!-- <div class="images"  v-viewer="{movable: true}">
      <div v-show="true" class="_111"/>
        <div v-show="true" class="_222"/>
    </div> -->
    <button type="button" @click="show">Show</button> 

  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  export default {
    data() {
      return{
          isShow:false,
          images: ['https://s2.ax1x.com/2020/03/10/8ihfDe.png', 'https://s2.ax1x.com/2020/03/10/8ihs41.png']
      }
    },
    methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        console.log(viewer)
        viewer.index = 1
        viewer.show()
      }
    }
  }
</script>
<style lang="less" scoped>
    ._111{
    width: 200px;
    height: 200px;
      background: url(https://s2.ax1x.com/2020/03/10/8ihfDe.png);  
    }
    ._222{
    width: 200px;
    height: 200px;
      background: url(https://s2.ax1x.com/2020/03/10/8ihs41.png);  
    }
</style>