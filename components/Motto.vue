<template>
    <span class="motto">{{currentMotto.slice(0,charIndex+1)}}</span>
    <!-- <span class="motto">{{currentMotto}}</span> -->
</template>
<script>
export default {
    name:"motto",
    data(){
        return{
            mottos:[
            '名不显时心不朽，再挑灯火看文章',
            '和梦想平等交易，和喧嚣保持距离',
            '知足且上进，温柔而坚定'
            ],
            currentMotto:'',
            currentMottoIndex:0,
            charIndex:0,
            timer:NaN
        }
    },
    created(){
        this.nextRound()
    },
    methods:{
        nextRound(){
            this.getNextMottoIndex()
            this.charIndex=-1
            let _this = this
            this.timer = setInterval(()=>{
                if (_this.IncreaseCharIndex()){
                    clearInterval(_this.timer)
                    //句子打印完毕，等待1s后开始清除句子
                    setTimeout(()=>{
                        _this.timer = setInterval(()=>{
                            if(_this.decreaseCharIndex()){
                                clearInterval(_this.timer)
                                setTimeout(()=>{
                                    _this.nextRound()
                                },1000)
                            }
                        },100)
                    },1000)
                }
            },250)
        },
        getNextMottoIndex(){
           this.currentMottoIndex =  (this.currentMottoIndex + 1)%this.mottos.length
           this.currentMotto=this.mottos[this.currentMottoIndex]
        },
        IncreaseCharIndex(){
            this.charIndex = (this.charIndex + 1) % this.currentMotto.length
            return this.charIndex == this.currentMotto.length-1
        },
        decreaseCharIndex(){
            this.charIndex = (this.charIndex - 1) % this.currentMotto.length
            return this.charIndex == -1
        }
    }
}
</script>
<style lang="less">
		@keyframes blink-caret {
		    50% {
		        border-color:transparent;
		    }
		}
		.motto {
		    border-right:.1em solid;
		    animation:blink-caret .5s step-end infinite alternate;
		}
</style>