<template>
    <div class="about-container">
        <nav-header text="管理员界面"></nav-header>
        <div class="content">
            <div class="graph-container">
                <div class="select-container">
                    <div class="box" @click="changeTypeSelected(0)" :class="{ 'active-box': typeSelected === 0 }">活跃情况
                    </div>
                    <div class="box" @click="changeTypeSelected(1)" :class="{ 'active-box': typeSelected === 1 }">注册情况
                    </div>
                </div>
                <div class="user-info-container">
                    <div class="item"><span>平台总人数：</span>{{platformUserInfo.allUserAmount || "获取中..."}}</div>
                    <div class="item"><span>最近一个月注册人数：</span>{{registerUserAmount || "获取中..."}}</div>
                    <div class="item"><span>最近一个月活跃次数：</span>{{activeUserAmount || "获取中..."}}日人次</div>
                </div>
                <div id="activeGraph"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import navHeader from "../components/navHeader";
    import {USER_GET_PLATFORM_INFO} from "./../api/api";
    import {howManyDays} from "./../assets/js/help";

    const echarts = require('echarts');
    export default {
        name: "About",
        components: {
            navHeader
        },
        data() {
            return {
                myChart: null,
                typeSelected: 0,
                xList: [],
            };
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
                    return this.platformUserInfo.lastMonthUserAmount.reduce((c, b) => {
                        return Number(c | 0) + Number(b.amount);
                    });
                else
                    return 0;
            },
            activeUserAmount() {
                if (this.platformUserInfo.lastMonthActiveUserAmount.length)
                    return this.platformUserInfo.lastMonthActiveUserAmount.reduce((c, b) => {
                        return Number(c | 0) + Number(b.amount);
                    });
                else return 0;
            }
        },
        mounted() {
            this.xList = this.initData();
            this.myChart = echarts.init(document.getElementById('activeGraph'));
            this.showCharts();
        },
        watch: {
            typeSelected(){
                this.showCharts();
            }
        },
        methods: {
            getPlatformInfo() {
                USER_GET_PLATFORM_INFO().then(data => {
                    this.$store.commit('setPlatformUserInfo', data);
                    this.showCharts();
                });
            },
            changeTypeSelected(value) {
                this.typeSelected = value;
            },
            initData() {
                let data = [];
                let day = this.$store.state.dateInfo.day;
                let month = this.$store.state.dateInfo.month;
                let year = this.$store.state.dateInfo.year;
                if (day >= 30) {
                    for (let i = day; i > day - 30; i--) {
                        let dayString = month.toString() + '.' + i.toString();
                        data.unshift(dayString);
                    }
                } else {
                    for (let i = day; i > 0; i--) {
                        let dayString = month.toString() + '.' + i.toString();
                        data.unshift(dayString);
                    }

                    let lastMonthDays = howManyDays(month === 1 ? year - 1 : year, month === 1 ? 12 : month);

                    for (let i = lastMonthDays; i > lastMonthDays - 30 + day; i--) {
                        let dayString = (month === 1 ? 12 : month - 1).toString() + '.' + i.toString();
                        data.unshift(dayString);
                    }
                }
                return data;
            },
            showCharts() {
                let yList = [];
                if (this.typeSelected === 0) {
                    for (let i = 0; i < 30; i++) {
                        let amount = 0;
                        if (this.platformUserInfo.lastMonthActiveUserAmount.length === 0) {
                            yList.push(amount);
                            continue;
                        }
                        for (let j = 0; j < this.platformUserInfo.lastMonthActiveUserAmount.length; j++) {
                            let timeArr = this.platformUserInfo.lastMonthActiveUserAmount[j].time.split('-').splice(1).map(i => Number(i));
                            let timeArrSecond = this.xList[i].split('.').map(i => Number(i));
                            if (timeArr[0] === timeArrSecond[0] && timeArr[1] === timeArrSecond[1]) {
                                amount = this.platformUserInfo.lastMonthActiveUserAmount[j].amount;
                                break;
                            }
                        }
                        yList.push(amount);
                    }
                } else {
                    for (let i = 0; i < 30; i++) {
                        let amount = 0;
                        if (this.platformUserInfo.lastMonthUserAmount.length === 0) {
                            yList.push(amount);
                            continue;
                        }
                        for (let j = 0; j < this.platformUserInfo.lastMonthUserAmount.length; j++) {
                            let timeArr = this.platformUserInfo.lastMonthUserAmount[j].time.split('-').splice(1).map(i => Number(i));
                            let timeArrSecond = this.xList[i].split('.').map(i => Number(i));
                            if (timeArr[0] === timeArrSecond[0] && timeArr[1] === timeArrSecond[1]) {
                                amount = this.platformUserInfo.lastMonthUserAmount[j].amount;
                                break;
                            }
                        }
                        yList.push(amount);
                    }
                }
                let option = {
                    xAxis: {
                        type: 'category',
                        data: this.xList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: `日期{b} <br>${this.typeSelected ===0 ? '活跃人数 ' : '新注册人数 '}{c}人   `
                    },
                    series: [{
                        data: yList,
                        type: 'line',
                        color:['#5ecaff'],
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 3,
                                }
                            }
                        }
                    }],
                };
                this.myChart.setOption(option);
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
            width 950px
            padding-top 80px
            margin 0 auto
            .graph-container
                margin-bottom 15px
                width 950px
                height 650px
                padding-top 25px
                background white
                border-radius $border-radius-sm
                box-shadow $box-shadow-box
                .select-container
                    height 40px
                    width 100%
                    display flex
                    justify-content center
                    align-items center

                    .box
                        width 120px
                        height 40px
                        display flex
                        justify-content center
                        align-items center
                        border-radius 20px
                        background-color $bg-color-deep-grey
                        color $text-color
                        font-size $font-size-base
                        margin 0 20px
                        -webkit-touch-callout none /* iOS Safari */
                        -webkit-user-select none /* Chrome/Safari/Opera */
                        -khtml-user-select none /* Konqueror */
                        -moz-user-select none /* Firefox */
                        -ms-user-select none /* Internet Explorer/Edge */
                        user-select none
                        cursor: pointer;

                    .active-box
                        background-color $system-color-blue
                        color $bg-color
                            width 100%
                .user-info-container
                    height 60px
                    width 950px
                    display flex
                    padding 0 70px
                    justify-content space-around
                    .item
                        color $text-color
                        line-height 60px
                        font-size $font-size-base
                        span
                            font-weight 600
                #activeGraph
                    width 950px
                    height 530px
</style>
