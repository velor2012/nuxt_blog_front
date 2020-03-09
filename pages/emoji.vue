<template>
  <v-row class="animated fadeInUp">
    <v-col cols="12">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
                v-for="(item, i) in emojis"
                :key="i"
              class="d-flex child-flex"
              :cols="ismobile?4:12" 
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="item"
                  :lazy-src="item"
                  aspect-ratio="1"
                  class="emoji_img"
                  contain
                  v-image-preview
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
const config = require("~/config.json")
export default {
    data(){
        return{
            emojis:[],
            emoji_url:'api/image/emoji',
            base_url:config.base_url
        }
    },
    created(){
        this.$axios.get(this.emoji_url).then((res)=>{
            this.emojis=[]
            this.current_page_emojis=[]
            if(res.data.success){
                let raw_path = res.data.other.result
                raw_path.map(p=>{
                    this.emojis.push(this.base_url+p)
                })
            }
            // }else{
            //     message.error(this,true,'获取表情失败',res.data.reason) 
            // }
        })
    },
    methods:{
    },
    computed: {
        ismobile(){
            return this.$store.getters.getIsMobile
        }
    },
}
</script>
<style lang="less">
.emoji_img:hover{
    cursor: pointer;
}
.emoji_img:hover .v-image__image--contain{
    transform: scale(1.2) rotate(5deg);
    transition-duration: 0.3s;
}
</style>