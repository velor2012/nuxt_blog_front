<template>
<v-row class = "test" style="height:100vh" align-content="end">
    <v-row align-content ='center'>
        <v-col  cols="12" justify="center" align="center" class="animated jackInTheBox"  data-trigger1>
            <span id="blog-title">欢迎来到CWY的博客</span>
        </v-col>
        <v-col justify="center" align="center"  cols="12" >

                    <v-avatar data-trigger2 class="animated fadeInLeft"  color="blue-grey lighten-3" light size="150">
                        <v-img :src="authorInfo.avatar" :lazy-src="_getThumb(authorInfo.avatar)"></v-img>
                    </v-avatar>
                    <!-- <v-btn id="welcome-btn" rounded large @click.native="enter">
                        进入博客
                    </v-btn> -->
        </v-col>
        <v-col justify="center" align="center"  cols="12" >
                    <v-list-item>
                        <v-list-item-content style="top:0">
                        <v-list-item-title style="color:black" class="title text-center">
                            <Motto/>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
        </v-col>
    </v-row>
    <v-row style="padding-top:10vh"  >
        <v-col cols="12" style="padding:0" justify="center" align="center">
            <v-icon @click="$vuetify.goTo('#index-container', scroll_option)" size=100 class="chevron-down">mdi-chevron-down</v-icon>
        </v-col>
    </v-row>
</v-row>
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
            backgroundImgThumb:"https://s1.ax1x.com/2020/04/02/GJ89ds.th.jpg",
            scroll_option: {
                duration: 300,
                offset: 0,
                easing: "easeInOutCubic"
            }
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
        },
    },
    created(){

    },  
    mounted(){
        let _this = this
        this.$nextTick(()=>{
        let trigger = new _this.$sr(
            {
            trigger:{
                toggle:{
                class:{
                    in:["jackInTheBox",'animated']
                }
                }
            }
            }
        )
        trigger.add('[data-trigger1]')
        let trigger2 = new _this.$sr(
            {
            trigger:{
                toggle:{
                class:{
                    in:["fadeInLeft",'animated']
                },
             callback: {
                    in:(trigger)=>{
                        trigger.element.addEventListener('animationend',()=>{
                            trigger.element.classList.add('avatar')
                        })
                    },
                    out:(trigger)=>{
                        trigger.element.classList.remove('avatar')
                    }
                }
                },
            }
            }
        )
        trigger2.add('[data-trigger2]')
        })
    }
}
</script>
<style lang="less">
.chevron-down{
    animation: pointDown 2s 0s linear infinite alternate;
}
@keyframes pointDown {
        0% {
            opacity: 1;
            transform: scale(1) translateY(-20px);
        }
        50% {
            opacity: 0.8;
            transform: scale(1) translateY(0px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(-20px);
        }
}
#blog-title{
    font-size: 5vw;
    font-weight: bold;
}
@media  screen and  (max-width: 600px){
    #blog-title{
        font-size: 8vw;
    }
}
</style>