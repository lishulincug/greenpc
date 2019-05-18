<template>
    <Button goast><span class="glyphicon glyphicon-bullhorn" @click="send"></span></Button>
</template>

<script>
    export default {
        name: "LaBa",
        methods:{
            send(){
                Bus.$emit('showMessageForm')
            }
        }
    }
</script>

<style scoped>

</style>