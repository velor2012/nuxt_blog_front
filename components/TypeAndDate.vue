<template>
  <v-row justify="center" align="center">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="10">
        <v-date-picker color="red lighten-2" light v-model="picker" @click:month="onSelectMonth" full-width type="month"></v-date-picker>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <ColorfulChip v-bind:typeInfo="typeInfo"/>
      </v-col>      
  </v-row>
</template>
<script>
import ColorfulChip from '~/components/ColorfulChip.vue'
import Motto from '~/components/Motto.vue'
import Bus,{getThumb} from '~/pages/util'
export default {
    name:'TypeAndDate',
    props:['typeInfo'],
    data(){
        return {
            picker:'',
            colors:[],
            total:0,
        }
    },
    components:{
      ColorfulChip,
      Motto
    },
    methods: {
      onSelectMonth(value){
          Bus.$emit('onSelectMonth',{value:value,picker:this.picker})
      },
      _getThumb(src){
        return getThumb(src)
      }
    },
    computed:{
        authorInfo(){
          return this.$store.getters.getAuthorInfo
        }
    }
}
</script>
<style lang="less">
    .v-divider:hover{
        cursor: pointer;
    }
    .avatar{
        animation: changes 5s 0.2s ease-out infinite alternate;
    }
    @keyframes changes {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.2);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>