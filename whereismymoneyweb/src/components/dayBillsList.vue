<template>
    <div class="container">
        <div class="item-container" v-for="(billData) in monthList" :key="billData.day">
            <div class="title">
                <div class="date">{{ formatDate(billData.time) }}</div>
                <div class="amount">
                    <span>支：</span>
                    <span class="outcome-color">{{ billData.outcomeSum | amount}}</span>
                    <span class="margin-line">收：</span>
                    <span class="income-color">{{ billData.incomeSum | amount}}</span>
                </div>
            </div>

            <div v-for="item in billData.billList" :key="item.id" class="bill-item"
                 :style="{height:item.description? '60px':'50px'}" @tap="setShowUserPage(item)">
                <div class="type-container">
                    <div class="point-tip" :class="item.type === 1 ? 'income-point' : 'outcome-point'"></div>
                    <div class="info-container">
                        <div class="type">{{ getTypeName(item.typeId, item.type, item.defaultType) }}</div>
                        <div class="tip" v-if="item.description">{{ item.description }}</div>
                    </div>
                </div>
                <div class="amount" :class="item.type === 1 ? 'income-color' : 'outcome-color'">
                    {{ item.amount | amount}}
                </div>
            </div>
        </div>
        <div class="no-data" v-if="monthList.length === 0">
            本月暂无数据
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {};
        },
        computed: {
            monthList() {
                return this.$store.state.billData.monthList;
            },
            dateInfo() {
                return this.$store.state.dateInfo;
            }
        },
        methods: {
            setShowUserPage(item) {
                this.$store.commit('selectedBillItem', item);
            },
            formatDate(time) {
                let timeArr = time.split('-');
                if (timeArr[0] === this.dateInfo.year && timeArr[1] === this.dateInfo.month && timeArr[2] === this.dateInfo.day) {
                    return timeArr[1] + '.' + timeArr[2] + '  今天';
                }
                let timepnow = new Date(this.dateInfo.year, this.dateInfo.month, this.dateInfo.day).getTime();
                let timep = new Date(timeArr[0], timeArr[1], timeArr[2]).getTime();
                let timeMinus = timepnow - timep;
                if (timeMinus > 0 && timeMinus <= 60 * 60 * 24 * 1000) {
                    return timeArr[1] + '.' + timeArr[2] + '  昨天';
                } else if (timeMinus > 0 && timeMinus <= 60 * 60 * 24 * 1000 * 2) {
                    return timeArr[1] + '.' + timeArr[2] + '  前天';
                }

                return timeArr[1] + '.' + timeArr[2] + '  星期' + '日一二三四五六'.charAt(new Date(timeArr[0], timeArr[1], timeArr[2]).getDay());
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .container
        width 100%
        background #ffffff
        border-radius $border-radius-sm
        box-shadow $box-shadow-box
        margin 0 15px

    .item-container
        width 100%
        margin-bottom 8px
        border-top 1px solid $bg-color-grey

        .title
            height 45px
            width 100%
            padding 0 25px 0 20px
            display flex
            align-items center
            justify-content space-between
            font-size $font-size-sm
            color $text-color
            font-weight bold
            letter-spacing 1px

            .amount
                font-family Barlow-Bold

                .margin-line
                    margin-left 15px


        .bill-item
            height 50px
            width 100%
            padding 0 25px 0 40px
            display flex
            align-items center
            justify-content space-between
            border-top 1px solid $bg-color-grey

            .type-container
                height 100%
                width 350px
                display flex
                align-items center

                .point-tip
                    height 8px
                    width 8px
                    border-radius $border-radius-circle
                    margin 0 15px 0 0


                .income-point
                    background-color $system-color-green


                .outcome-point
                    background-color $system-color-red


                .info-container
                    height 100%
                    width 135px
                    display flex
                    flex-direction column
                    justify-content center

                    .type
                        height 24px
                        line-height 24px
                        font-size $font-size-sm
                        color $text-color


                    .tip
                        height 18px
                        line-height 18px
                        font-size $font-size-sm
                        color $text-color-litte-grey


            .amount
                font-size $font-size-sm
                font-weight bold


        .income-color
            color $system-color-green


        .outcome-color
            color $system-color-red

    .no-data
        height 170px
        width 100%
        text-align center
        line-height 170px
        font-size $font-size-sm
        color $text-color


</style>
