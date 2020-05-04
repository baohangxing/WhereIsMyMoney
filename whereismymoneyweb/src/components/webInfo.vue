<template>
    <div class="info-container">
        <div> {{copyRight}}</div>
        <div>{{contactWay}}</div>
        <div>
            <a
                href="http://www.beian.miit.gov.cn/">网站备案/许可证号：
                {{beiAnNumber}}</a></div>
        <!--        <div>-->
        <!--            <a-->
        <!--                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53011402000392"><img-->
        <!--                src="./../../static/image/policeIcon.png" style="float:left;"/>-->
        <!--                <p style="float:left;">滇公网安备-->
        <!--                    53011402000392号</p></a>-->
        <!--        </div>-->
    </div>
</template>

<script>
    import config from "./../config/index";

    export default {
        data() {
            return {
                copyRight: config.copyRight,
                contactWay: config.contactWay,
                beiAnNumber: config.beiAnNumber,
            };
        }
    };
</script>

<style lang="stylus" scoped>
    .info-container
        width 100%
        margin-bottom 15px
        color $text-color
        font-size $font-size-ssm
        div
            margin-bottom 6px
        a
            color $text-color
            display inline-block
            text-decoration none
            height 20px
            line-height 20px
            vertical-align top
        a:hover
            color $color-success
</style>
