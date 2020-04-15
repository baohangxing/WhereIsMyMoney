<template>
    <div class="head-container">
        <div class="avatar">
            <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
        </div>
        <div class="info-container">
            <div class="name">{{ userInfo.name }}</div>
            <div class="userDays">已记账{{ userInfo.useDays }}天</div>
        </div>
        <div class="setting-container">
            <div class="time-select">
                <el-date-picker
                    v-model="dateSelected"
                    align="right"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="time-show">2020年 4月</div>

        </div><icon name="icon-return" color="#333333" size="28" @tap="BackPage" v-if="isBack"></icon>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dateSelected: '',
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        watch:{
            dateSelected(){

                console.log(this.dateSelected)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .head-container
        height 100px
        width 100%
        display flex
        align-items center
    .avatar
        height 80px
        width 80px
    .info-container
        height 50px
        display flex
        width 200px
        flex-direction column
        justify-content space-between
        margin-left 30px
        .name
            font-size $font-size-lg
            color $text-color
            font-weight bold
        .userDays
            font-size $font-size-ssm
            color $text-color-grey
    .setting-container
        height 60px
        margin-left auto
        width 250px
        position relative
        .time-select
            width 150px
            overflow hidden
            opacity 0
        .time-show
            font-size $font-size-lg
            color $text-color
            font-weight bold
            width 150px
            position absolute
            top 0
            left 0
            height 60px
            line-height 60px
            text-align center
            -webkit-touch-callout none /* iOS Safari */
            -webkit-user-select none /* Chrome/Safari/Opera */
            -khtml-user-select none /* Konqueror */
            -moz-user-select none /* Firefox */
            -ms-user-select none /* Internet Explorer/Edge */
            user-select none
            z-index -1


</style>
