<template>
    <div>
        <v-chip
        class="ma-2"
        :color="colors[colors.length-1]"
        text-color="white"
        @click="onClickChip({_id:'total',count:total})"
        >
            <v-avatar
                left
                color="rgba(25,118,210)"
            >
                {{total}}
            </v-avatar>
            total
        </v-chip>
        <v-chip
        class="ma-2"
        text-color="white"
        v-for="(item, i) in typeInfo"
        :color="colors[i]"
        :key="i"
        @click="onClickChip(item)"
        >
            <v-avatar
                left
                color="rgba(25,118,210)"
            >
                {{item.count}}
            </v-avatar>
            {{item._id}}
    </v-chip>
</div>
</template>
<script>
const {randomColor}  = require('~/pages/util')
import Bus from '~/pages/util'
export default {
    props:['typeInfo'],
    data(){
        return {
            colors:[],
            total:0
        }
    },
    methods:{
      onClickChip(type){
          Bus.$emit('onClickChip',type)
      }
    }   ,
    mounted(){
        if(Array.isArray(this.typeInfo)){
            let total = 0
            this.typeInfo.map(item=>{
                let co = randomColor()
                total += item.count
      
                this.colors.push(co)
                })
                this.total =  total
            }
            //最后的颜色给total纸片
            this.colors.push(randomColor())
        },
    watch:{
      typeInfo(newValue,oldValue){
        //ie8不支持Array.isArray()
        if(Array.isArray(newValue)){
            let total = 0
            newValue.map(item=>{
            let co = randomColor()
            total += item.count
            console.log('in color')
            this.colors.push(co)
            })
            this.total =  total
        }
        //最后的颜色给total纸片
        this.colors.push(randomColor())
      }
    }
}
</script>
