<template>
    <div class="introduction-container">
        <div class="nav-container">
            <div class="name-container">
                <img src="./../../static/image/logo_hollow.png">
                个人记账系统
            </div>
            <a href="" @click="gotoHome">首页</a>
        </div>
        <div class="content-container">
            <div class="logo-container">
                <img class="logo" src="./../../static/image/logo_black.png" alt="">
                <img class="name" src="./../../static/image/name_logo_black.png" alt="">
            </div>

            <div class="text">一款多平台个人记账系统，快来记账吧~</div>
            <div class="bottom-container">
                <div v-show="isIOSHover" class="box box-ios"></div>
                <div v-show="isADHover" class="box box-ad"></div>
                <div v-show="isMPHover" class="box box-mp"></div>
                <a @mouseenter="isIOSHover = true" @mouseleave="isIOSHover = false" class="btn-iOS" href=""></a>
                <div @mouseenter="isMPHover = true" @mouseleave="isMPHover = false" class="btn-mp"></div>
                <a @mouseenter="isADHover = true" @mouseleave="isADHover = false" class="btn-ad" href=""></a>
            </div>
        </div>
        <div class="footer-container">
            <p>{{copyRight}} </p> |
            <a
                href="http://www.beian.miit.gov.cn/">网站备案/许可证号：
                {{beiAnNumber}}</a> |
            <p>{{contactWay}}</p>
        </div>
    </div>
</template>

<script>
    import config from "./../config/index";

    export default {
        name: "Introduction",
        data() {
            return {
                copyRight: config.copyRight,
                contactWay: config.contactWay,
                beiAnNumber: config.beiAnNumber,

                isIOSHover: false,
                isADHover: false,
                isMPHover: false,
            };
        },
        methods: {
            gotoHome() {
                this.$router.push({name: "Home"});
            }
        }
    };
</script>

<style scoped lang="stylus">
    .introduction-container
        width 100vw
        height 100vh
        background-color $system-color-blue

        .nav-container
            width 100vw
            height 70px
            position fixed
            top 0
            z-index 2
            background-color black
            display flex
            justify-content space-around
            align-items center
            flex-wrap wrap
            color white
            .name-container
                display flex
                align-items center
                img
                    height 40px
                    width 40px
                    margin-right 15px
            a
                color white
        .content-container
            width 100vw
            height 100vh
            display flex
            justify-content center
            align-items center
            flex-direction column
            .logo-container
                width 600px
                height 150px
                display flex
                justify-content center
                align-items center
                margin-bottom 40px
                .logo
                    height 120px
                    width 120px
                .name
                    height 150px
            .text
                font-size $font-size-lllg
                color $text-color
                font-family "Times New Roman", Times, serif
                margin-bottom 100px
            .bottom-container
                width 460px
                display flex
                flex-flow row nowrap
                justify-content space-between
                align-items center
                position relative
                @keyframes show {
                    from {
                        height 0
                        top 0
                    }
                    to {
                        height 172px
                        top -180px
                    }
                }
                .box
                    width 172px
                    height 172px
                    border-radius 16px
                    background-color #fff
                    position absolute
                    top -180px
                    box-shadow 0 3px 6 0 rgba(0, 0, 0, 0.16)
                    animation show .2s
                    background-repeat no-repeat
                    background-size 172px 172px

                .btn-iOS
                    background url('./../../static/image/dl-iOS.svg')
                    width 172px
                    height 51px
                .btn-ad
                    background url('./../../static/image/dl-android.svg')
                    width 177px
                    height 51px
                .btn-mp
                    background url('./../../static/image/mp-logo.svg')
                    background-size cover
                    width 44px
                    height 44px
                .box-ios
                    background-image url('./../../static/image/example.png')
                .box-ad
                    background-image url('./../../static/image/example.png')
                    right 0
                .box-mp
                    right 144px
                    background-image url('./../../static/image/example.png')
        .footer-container
            text-align center
            position fixed
            bottom 30px
            width 100vw
            a, p
                display inline-block
                color $text-color
                margin 0 10px
                font-size $font-size-ssm
</style>
