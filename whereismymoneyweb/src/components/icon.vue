<template>
    <span class="iconfont" :class="'icon-'+name"
          :style="{ color: color, fontSize: size + 'px', fontWeight: bold ? 'bold' : 'normal' }"></span>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            size: {
                type: [Number, String],
                default: 32
            },
            color: {
                type: String,
                default: ''
            },
            bold: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style scoped>
    @import "./../assets/css/iconfont.css";
</style>
