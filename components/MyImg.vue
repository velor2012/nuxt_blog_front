<template>
  <v-img
    :src="src"
    :lazy-src="lazySrc"
    max-width="100%"
    :max-height="nolimit?'':height/2"
    @click="showImage"
    contain
    data-trigger
  >
  <slot></slot>
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>
<script>
import Bus from "~/pages/util";
export default {
  props: ["src", "lazySrc","index","nolimit"],
  data(){
      return{
          dialog :false
      }
  },
  mounted(){
    let _this = this
    this.$nextTick(()=>{
      let trigger = new _this.$sr(
        {
          trigger:{
            toggle:{
              class:{
                in:["fadeIn",'animated']
              }
            }
          }

        }
      )
      trigger.add('[data-trigger]')
    })
  },
  computed:{
    height(){
        return this.$store.getters.getHeight
    }
  },
  methods:{
    showImage(){
      Bus.$emit('showImage',this.index)
    }
  }
};
</script>
