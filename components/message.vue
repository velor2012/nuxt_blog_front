<template>
    <!-- 消息提示 -->
    <v-snackbar
        class="animated bounceInRight"
        transition="fade-transition"
        v-model="message.show"
        :color="message.color"
        :right="true"
        :timeout="2000"
        :top="true"
        >
        {{message.content}}
    </v-snackbar>
</template>
<script>
export default {
    name:"msg",
    props:['message'],
    data: () => ({
    }),
}
</script>
<style lang="less">
</style>