<template>
  <v-img
    :src="src"
    :lazy-src="lazySrc"
    max-width="100%"
    :max-height="height/2"
    contain
  >
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
  props: ["src", "lazySrc","index"],
  data(){
      return{
          dialog :false
      }
  },
  computed:{
    height(){
        return this.$store.getters.getHeight
    }
  },
  methods:{
    // showImage(){
    //   Bus.$emit('showImage',this.index)
    // }
  }
};
</script>
