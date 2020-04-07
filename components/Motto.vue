<template>
<div data-trigger3 class="animated zoomIn" id="mot">
    <span id="mot2">{{currentMotto.slice(0,charIndex+1)}}</span>
</div>
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
            currentMotto:'名不显时心不朽，再挑灯火看文章',
            currentMottoIndex:0,
            charIndex:6,
            timer:NaN,
            timer2:NaN,
            timer3:NaN,
            timer4:NaN,
        }
    },
    mounted(){
        var _this = this
        this.$nextTick(()=>{
        let trigger3 = new _this.$sr(
            {
            trigger:{
                toggle:{
                class:{
                    in:["zoomIn",'animated']
                },
                callback: {
                        in:(trigger)=>{
                            // console.log('inTrigger1')
                            trigger.element.addEventListener('animationend',()=>{
                                clearInterval(_this.timer)
                                clearTimeout(_this.timer2)
                                clearInterval(_this.timer3)
                                clearTimeout(_this.timer4)
                                _this.nextRound()
                                document.getElementById('mot2').classList.add('motto')
                            })
                        },
                        out:(trigger)=>{
                            // console.log('outTrigger')
                           clearInterval(_this.timer)
                            clearTimeout(_this.timer2)
                            clearInterval(_this.timer3)
                            clearTimeout(_this.timer4)
                            document.getElementById('mot2').classList.remove('motto')
                        }
                    }
                }
            }
            }
        )
        trigger3.add('[data-trigger3]')
        })
        // // this.nextRound()
        // var _this = this
        // document.getElementById("mot").addEventListener('animationend',()=>{
        //     document.getElementById("mot2").classList.add("motto")
        //     _this.nextRound()
        // })
    },
    methods:{
        nextRound(){
            let _this = this
            this.timer = setInterval(()=>{
                if (_this.IncreaseCharIndex()){
                    clearInterval(_this.timer)
                    //句子打印完毕，等待1s后开始清除句子
                    let timer2 = setTimeout(()=>{
                        _this.timer3 = setInterval(()=>{
                            if(_this.decreaseCharIndex()){
                                clearInterval(_this.timer3)
                                _this.timer4 = setTimeout(()=>{
                                    _this.getNextMottoIndex()
                                    _this.charIndex=-1
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