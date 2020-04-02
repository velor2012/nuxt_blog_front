<template>
    <v-img
      id="welcome"
      src="http://d.hiphotos.baidu.com/zhidao/pic/item/6a63f6246b600c334c3e91cb1e4c510fd9f9a16a.jpg"
      lazy-src="http://d.hiphotos.baidu.com/zhidao/pic/item/6a63f6246b600c334c3e91cb1e4c510fd9f9a16a.jpg"
    >
      <v-row id="welcome" justify="center" align="center" align-content="center">
            <v-avatar class="avatar" color="orange" size="150">
                <v-img src="http://b-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg"></v-img>
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
import Bus from "~/pages/util";
import Motto from '~/components/Motto.vue'
export default {
    name:"welcome",
    data(){
        return{
            hide:false
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