<template>
  <div id="app" class="d-flex align-center justify-center">

    <div >
      <div class="_222 preview-img-item" @click="$refs.sd.open(0, images)" />
      <div  class="_111 preview-img-item" @click="$refs.sd.open(1, images)"/>
    </div>
  <client-only><photoSwippe ref="sd"/></client-only>
  </div>
</template>
<script>
import photoSwippe from "~/components/photoSwippe";
  export default {
    data() {
      return{
          isShow:false,
          images: [
           {
             src:'https://s2.ax1x.com/2020/03/10/8ihfDe.png', 
             w:600,
             h:500
           },
          {
            src:'https://s2.ax1x.com/2020/03/10/8ihs41.png', 
            w:500,
            h:500
          }
            ]
      }
    },
    methods: {
      open(){
         console.log(this)
        console.log(this.$refs.sd.open)
      }
    },
    components:{
      photoSwippe
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