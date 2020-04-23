<template>
    <div class="container">
        <div id="activeGraph"></div>
    </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        data() {
            return {
                myChart: null,
                timeBetween: ['2020-01-01', '2020-06-30']
            };
        },
        created() {
            let dataNow = new Date();
            let halfYearBefore = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 183);
            this.timeBetween = [halfYearBefore.getFullYear() + '-' + (halfYearBefore.getMonth() + 1) + '-' + halfYearBefore.getDate(),
                dataNow.getFullYear() + '-' + (dataNow.getMonth() + 1) + '-' + dataNow.getDate()
            ];
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('activeGraph'));
            this.showCharts();
        },
        computed: {
            activeData() {
                return this.activeDataArr.map(item => {
                    return [item.time, item.value > 18 ? 18 : item.value];
                });
            },
            activeDataArr() {
                return this.$store.state.billData.activeData;
            }
        },
        watch: {
            activeDataArr() {
                this.showCharts();
            }
        },
        methods: {
            showCharts() {
                this.myChart.setOption({
                    title: {
                        top: 30,
                        textStyle: {
                            color: '#000',
                            fontSize: 16,
                            fontWeight: 'normal'
                        },
                        left: 'center',
                        text: '近半年使用情况'
                    },
                    tooltip: {},
                    visualMap: {
                        min: 0,
                        max: 18,
                        type: 'piecewise',
                        orient: 'horizontal',
                        left: 'center',
                        splitNumber: 3,
                        top: 65,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    calendar: {
                        top: 120,
                        left: 30,
                        orient: 'vertical',
                        splitLine: {
                            show: false
                        },
                        dayLabel: {
                            nameMap: 'cn'
                        },
                        monthLabel: {
                            nameMap: 'cn'
                        },
                        right: 30,
                        cellSize: ['auto', 16],
                        range: this.timeBetween,
                        itemStyle: {
                            borderWidth: 0.5
                        },
                        yearLabel: {show: false}
                    },
                    series: {
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: this.activeData
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .container
        width 100%
        margin-bottom 15px
        height 620px
        background #ffffff
        border-radius $border-radius-sm
        box-shadow $box-shadow-box
        #activeGraph
            height 600px
            width 90%
            margin 0 5%

</style>
