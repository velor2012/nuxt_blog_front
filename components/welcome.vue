<template>
    <v-img
      id="welcome"
      :src="backgroundImg"
      :lazy-src="backgroundImgThumb"
    >
    <v-row style="padding-top:5em" justify="center" align="center">
        <h1 style="color:white;font-size:bold">欢迎来到CWY的博客</h1>
    </v-row>
      <v-row id="welcome" justify="center" align="center" align-content="center">
            <v-avatar class="avatar" color="blue-grey lighten-3" light size="150">
                <v-img :src="authorInfo.avatar" :lazy-src="_getThumb(authorInfo.avatar)"></v-img>
            </v-avatar>

              <v-list-item>
                <v-list-item-content style="top:0">
                  <v-list-item-title style="color:white" class="title text-center">
                      <Motto/>
                    </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-btn id="welcome-btn" rounded large @click.native="enter">
                  进入博客
              </v-btn>
      </v-row>
    </v-img>
</template>
<script>
import Bus,{getThumb} from "~/pages/util";
import Motto from '~/components/Motto.vue'
export default {
    name:"welcome",
    data(){
        return{
            hide:false,
            backgroundImg:"https://s1.ax1x.com/2020/04/02/GJ89ds.jpg",
            backgroundImgThumb:"https://s1.ax1x.com/2020/04/02/GJ89ds.th.jpg"
        }
    },
    components:{
        Motto
    },
    methods:{
        enter(){
            let el = document.getElementById("welcome")
            el.classList.add(["doneWelcome"])
            Bus.$emit("onDoneWelcome")
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
//背景
#welcome{
  position: absolute!important;
  top: 0!important;
  left: 0!important;
  width: 100%!important;
  height:100%!important;
  z-index: 100!important;
}
#welcome-btn{
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4)!important;
    background-size: 400%!important;
}
#welcome-btn:hover{
    animation: ani 8s linear infinite!important;
}
@keyframes ani {
    0%{
        background-position: 0%;
    }
    100%{
        background-position: 400%;
    }
}
.doneWelcome{
    animation: doneWelcome 1s;
    animation-fill-mode: both;
}
@keyframes doneWelcome {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform:translateY(100px) scale(0.5);
    }
    100% {
        opacity: 1;
        transform: translateY(-800px) scale(0) ;
        display: none;
    }
}
</style>