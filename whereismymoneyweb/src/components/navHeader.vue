<template>
    <div class="head-container">
        <div class="back-icon" @click="goBack">
            <my-icon name="icon-return" color="#333333" size="32"></my-icon>
        </div>
        <h2>{{text}}</h2>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: '关于 Where Is MY Money'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped lang="stylus">
    .head-container
        box-shadow $box-shadow-box
        position fixed
        top 0
        left 0
        height 65px
        width 100vw
        padding 0 calc( 50vw - 500px)
        z-index 98
        background-color white
        .back-icon
            position absolute
            top 50%
            transform translateY(-50%)
            left calc( 50vw - 500px)
        .back-icon:hover
            cursor pointer
        h2
            text-align center
            margin 0
            line-height 65px
</style>
