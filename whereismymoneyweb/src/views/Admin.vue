<template>
    <div class="about-container">
        <nav-header text="管理员界面"></nav-header>
        <div class="content">
            <div class="user-info-container">
                <div class="item"><span>平台总人数：</span>{{platformUserInfo.allUserAmount || "获取中..."}}</div>
                <div class="item"><span>最近一个月注册人数：</span>{{registerUserAmount || "获取中..."}}</div>
                <div class="item"><span>最近一个月活跃次数：</span>{{activeUserAmount || "获取中..."}}日人次</div>
            </div>
        </div>
    </div>
</template>

<script>
    import navHeader from "../components/navHeader";
    import {USER_GET_PLATFORM_INFO} from "./../api/api";

    export default {
        name: "About",
        components: {
            navHeader
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            },
            platformUserInfo() {
                return this.$store.state.platformUserInfo;
            },
            registerUserAmount() {
                if (this.platformUserInfo.lastMonthUserAmount.length)
                    return this.platformUserInfo.lastMonthUserAmount.reduce((c, b) => {return Number(c|0)+ Number(b.amount)});
                else
                    return 0;
            },
            activeUserAmount() {
                if (this.platformUserInfo.lastMonthActiveUserAmount.length)
                    return this.platformUserInfo.lastMonthActiveUserAmount.reduce((c, b) => {return Number(c|0)+ Number(b.amount)});
                else return 0;
            }
        },
        methods: {
            getPlatformInfo() {
                USER_GET_PLATFORM_INFO().then(data => {
                    this.$store.commit('setPlatformUserInfo', data);
                });
            }
        },
        created() {
            if (!this.userInfo.administrator) {
                this.$message({
                    message: "您不是管理员无权访问改页面",
                    type: "warning"
                });
                this.$router.push({name: '/'});
            }
            if (this.platformUserInfo.allUserAmount === null)
                this.getPlatformInfo();

        }
    };
</script>

<style scoped lang="stylus">
    .about-container
        height 100vh
        width 100%
        background-color $bg-color-grey
        .content
            width 1000px
            padding-top 80px
            margin 0 auto
            .user-info-container
                height 60px
                margin 5px 25px 15px 25px
                width 950px
                background white
                border-radius $border-radius-sm
                box-shadow $box-shadow-box
                display flex
                padding 0 25px
                .item
                    color $text-color
                    line-height 60px
                    font-size $font-size-base
                    margin-right 60px
                    span
                        font-weight 600
</style>
