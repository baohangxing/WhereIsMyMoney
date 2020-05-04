<template>
    <div class="about-container">
        <div class="head-container">
            <div class="back-icon" @click="goBack">
                <my-icon name="icon-return" color="#333333" size="32"></my-icon>
            </div>
            <h2>关于 Where Is MY Money</h2>
        </div>
        <h3>介绍</h3>
        <p>
            俗话说“你不理财，财不理你”，对于每天的花费的记录和管理不仅是一种好的生活习惯，而且有助于我们更加合理地管理我们的钱财，规划我们的生活。所谓省钱比赚钱容易,运用包括互联网在内的各种手段,为自己的日常开销找一个"无微不至"的"管家",成为时下很多人热衷的事情。
            这款多平台的个人在线记账系统正是出于这样的目的诞生的，用户可以在不同的设备和平台上（电脑web端，手机端，小程序）进行记账，各个平台同步数据，此外该系统还具备语音输入，账单导出，后台管理等功能，方便用户随时随地的使用，满足用户记账的需求。经过测试，这是一段方便人们记账使用的系统。
        </p>
        <h3>版本更新</h3>
        <h5>v 1.0.0</h5>
        <p>
           第一版</p>
        <h3>联系我</h3>
        <p>483053800@qq.com</p>
    </div>
</template>

<script>
    export default {
        name: "About",
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped lang="stylus">
    .about-container
        width 1000px
        margin 0 auto
        .head-container
            position relative
            .back-icon
                position absolute
                top 50%
                transform translateY(-50%)
                left 0
            .back-icon:hover
                cursor pointer
            h2
                text-align center
        h3
            margin-top 50px
        h5
            padding 0 20px
        p
            letter-spacing 1.5px
            padding 0 30px
</style>
