<template>
    <div class="head-container">
        <div class="avatar">
            <el-avatar :size="70" :src="userInfo.avatar"></el-avatar>
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
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="time-show">{{dateShow}}
                <my-icon name="arrow-down" color="#333333" size="28"></my-icon>
            </div>
            <div>设置</div>
        </div>

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
            },
            dateInfo() {
                return this.$store.state.dateInfo;
            },
            selectedDateInfo() {
                return this.$store.state.selectedDateInfo;
            },
            dateShow() {
                return this.selectedDateInfo.year + '年' + this.selectedDateInfo.month + '月' + this.selectedDateInfo.day + '日'
            }
        },
        watch: {
            dateSelected() {
                let arr = this.dateSelected.split('-');
                let isChange = Number(arr[1]) !== Number(this.selectedDateInfo.month) || Number(arr[0]) !== Number(this.selectedDateInfo.year);
                let data = {
                    year: arr[0],
                    month: Number(arr[1]),
                    day: Number(arr[2]),
                };
                this.$store.commit('setSelectedDateInfo', data);
                if (isChange) {
                    this.$emit("initData");
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .head-container
        height 100px
        width 100%
        position fixed
        top 0
        left 0
        background-color #ffffff
        padding 0 calc(50% - 500px)
        margin 0 auto
        display flex
        align-items center
        box-shadow $box-shadow-box
    .avatar
        height 70px
        width 70px
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
        display flex
        justify-content space-between
        align-items center
        color $text-color
        font-size $font-size-lg
        font-weight bold
        cursor:pointer;
        .time-select
            width 150px
            z-index 2
            opacity 0
        .time-show
            transform translateX(-70px)
            width 220px
            position absolute
            top 0
            left 0
            height 60px
            display flex
            align-items center
            justify-content space-around
            z-index 1
            -webkit-touch-callout none /* iOS Safari */
            -webkit-user-select none /* Chrome/Safari/Opera */
            -khtml-user-select none /* Konqueror */
            -moz-user-select none /* Firefox */
            -ms-user-select none /* Internet Explorer/Edge */
            user-select none
</style>
