<template>
    <!-- 消息提示 -->
    <v-snackbar
        class="animated bounceInRight"
        transition="fade-transition"
        v-if="message"
        v-model="message.show"
        :color="message.color"
        :right="true"
        :timeout="2000"
        :top="true"
        >
        {{message.content}}
    </v-snackbar>
</template>
<script lang="ts">
import {Component,Vue, Prop} from "nuxt-property-decorator"
import { MessageData } from '../types/index';
import { Bus } from '../utils/common';
@Component({
components: {
}
})
export default class Message extends Vue {
    message: MessageData = null;
    mounted(){
        Bus.$on('showMessage',this.OnShowMessage)
    }
    OnShowMessage(message:MessageData){
        this.$set(this,'message',message)
    }
}
</script>