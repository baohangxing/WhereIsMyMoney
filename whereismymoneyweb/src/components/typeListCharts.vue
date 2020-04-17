<template>
    <div class="container">
        <div class="title">分类统计</div>
        <div class="type-select-container">
            <div class="box" @click="changeTypeSelected(0)" :class="{ 'outcome-container': typeSelected == 0 }">支出</div>
            <div class="box" @click="changeTypeSelected(1)" :class="{ 'income-contaienr': typeSelected == 1 }">收入</div>
        </div>

        <div class="circle-container">
            <div id="typeListCharts">
            </div>
        </div>

        <div class="items-container">
            <div class="item-container" v-for="item in typeList" :key="item.typeId">
                <my-icon :name="getTypeIcon(item.typeId, typeSelected, item.defaultType)" size="26"></my-icon>
                <div class="type-container">
                    <div class="item-type">{{ getTypeName(item.typeId, typeSelected, item.defaultType) }}</div>
                    <div class="type-line"></div>
                    <div class="type-line-color-cover"
                         :style="{ width: (Number(item.Sum) / typeSum) * 100 + '%' }"></div>
                </div>
                <div class="item-amount">{{ item.Sum | amount}}</div>
            </div>
        </div>
    </div>

</template>


<script>
    var echarts = require('echarts');


    export default {
        data() {
            return {
                myChart: null,
                serverData: '',
                typeSelected: 0
            };
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('typeListCharts'));
            this.showRing()
        },
        computed: {
            typeList() {
                let list = this.$store.state.billData.typeList;
                if (this.typeSelected === 0) {
                    return list.outList.sort(function (item1, item2) {
                        return item2.Sum - item1.Sum;
                    });
                } else {
                    return list.typeList.inList.sort(function (item1, item2) {
                        return item2.Sum - item1.Sum;
                    });
                }
            },
            typeSum() {
                let sum = 0;
                this.typeList.forEach(item => {
                    sum += Number(item.Sum);
                });
                return sum;
            },
            chartData() {
                let data = [];
                this.typeList.forEach(item => {
                    data.push({
                        name: this.getTypeName(item.typeId, this.typeSelected, item.defaultType),
                        data: item.Sum
                    });
                });
                return data;
            }
        },
        methods: {
            changeTypeSelected(value) {
                if (value === this.typeSelected) return;
                this.typeSelected = value;
            },
            showRing() {
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                });
            }
        },
        watch: {
            typeList() {
                this.showRing();
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
        margin-top 25px

        .title
            color $text-color-balck
            font-size $font-size-base
            height 60px
            line-height 40px
            text-align center
            padding-top 20px

        .type-select-container
            height 60px
            margin-bottom 10px
            width 100%
            display flex
            justify-content center
            align-items center

            .box
                width 60px
                height 30px
                display flex
                justify-content center
                align-items center
                border-radius 15px
                background-color $bg-color-deep-grey
                color $text-color
                font-size $font-size-sm
                margin 0 10px



            .income-contaienr
                background-color $system-color-blue
                color $bg-color

            .outcome-container
                background-color $system-color-red
                color $bg-color


        .circle-container
            width 100%
            height 450px
            display flex
            justify-content center
            align-items center

            #typeListCharts
                width 550px
                height 400px


        .items-container
            width 100%
            padding 0 20px 16px 20px

            .item-container
                height 42px
                width 100%
                display flex
                align-items center
                margin-bottom 8px
                color $text-color
                .item-title
                    color $text-color-litte-grey
                    font-size $font-size-ssm
                    line-height 18px


                .type-container
                    margin 0 20px
                    width: 510px;
                    .item-type
                        font-size $font-size-ssm
                        line-height 18px
                        margin-bottom 5px


                    .type-line
                        width 100%
                        height 6px
                        border-radius 3px
                        background-color #a8a3a3


                    .type-line-color-cover
                        height 6px
                        border-radius 3px
                        background-color #f22c47
                        transform translateY(-6px)


                .item-amount
                    margin-left auto
                    font-size $font-size-sm
                    font-family Barlow-SemiBoldItalic


</style>
