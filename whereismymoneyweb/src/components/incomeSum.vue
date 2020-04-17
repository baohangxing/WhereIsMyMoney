<template>
    <div class="sum-container">
        <div class="title">收支总览</div>
        <div class="items-container">
            <div class="item-container">
                <div class="item-title">收入</div>
                <div class="item-amount">{{ sumData.incomeSum | amount }}</div>
            </div>
            <div class="item-container">
                <div class="item-title">支出</div>
                <div class="item-amount">{{ sumData.outcomeSum | amount }}</div>
            </div>
            <div class="item-container">
                <div class="item-title">结余</div>
                <div class="item-amount">{{ sumLeft | amount }}</div>
            </div>
            <div class="item-container">
                <div class="item-title">每天平均支出</div>
                <div class="item-amount">{{ dayOut | amount }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getHowManyDays} from './../assets/js/help.js'


    export default {
        data() {
            return {};
        },
        computed: {
            sumData() {
                return this.$store.state.billData;
            },
            sumLeft() {
                return this.sumData.incomeSum - this.sumData.outcomeSum;
            },
            dateInfo() {
                return this.$store.state.dateInfo;
            },
            selectedDateInfo() {
                return this.$store.state.selectedDateInfo;
            },
            days() {
                if (this.dateInfo.year === this.selectedDateInfo.year && this.dateInfo.month === this.selectedDateInfo.month) {
                    return this.dateInfo.day
                } else {
                    return getHowManyDays(this.selectedDateInfo.year, this.selectedDateInfo.month) || 30
                }

            },
            dayOut() {
                return Number(this.sumData.outcomeSum / this.days);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .sum-container
        width 100%
        margin-bottom 15px
        height 170px
        background #ffffff
        border-radius $border-radius-sm
        box-shadow $box-shadow-box

        .title
            color $text-color-balck
            font-size $font-size-sm
            height 45px
            line-height 20px
            text-align center
            padding-top 15px

        .items-container
            height 125px
            width 100%
            display flex
            justify-content space-around
            flex-wrap wrap
            padding-bottom 10px
            align-items flex-start

            .item-container
                height 55px
                width 40%
                display flex
                flex-direction column
                justify-content center
                align-items center

                .item-title
                    color $text-color-litte-grey
                    font-size $font-size-ssm
                    line-height 18px


                .item-amount
                    color $text-color
                    font-size $font-size-lg
                    line-height 26px
                    font-weight bold
                    font-family Barlow-Bold


</style>
