<template>
    <div class="about-container">
        <nav-header text="管理员界面"></nav-header>
        <div class="content">
            <div class="version-container">
                <div class="left-option-container">
                    <el-select v-model="versionSelectedId" placeholder="请选择">
                        <el-option
                            v-for="item in appVersions"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <div>
                        <el-button type="primary" round @click="saveAppVersion">保存</el-button>
                        <el-button type="success" round @click="createAppVersion">新增</el-button>
                        <el-button type="danger" round @click="deleteAppVersion">删除</el-button>
                    </div>
                </div>
                <div class="version-info-container">
                    <div class="item"><span>标题</span>
                        <el-input v-model="title"></el-input>
                    </div>
                    <div class="item">
                        <span>版本</span>
                        <el-input v-model="appVersion"></el-input>
                    </div>
                </div>
                <div class="version-info-container">
                    <div class="item"><span>下载链接</span>
                        <el-input v-model="appDownloadLink"></el-input>
                    </div>
                </div>
                <div class="editor-container">
                    <quill-editor
                        v-model="versionContent"
                        ref="myQuillEditor"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </div>
            </div>
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
    import {
        APP_VERSION_ADD,
        APP_VERSION_DELETE,
        APP_VERSION_GET_ALL,
        APP_VERSION_UPDATE,
        USER_GET_PLATFORM_INFO
    } from "./../api/api";
    import {howManyDays} from "./../assets/js/help";
    import {quillEditor} from "vue-quill-editor";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    const echarts = require('echarts');
    export default {
        name: "About",
        components: {
            navHeader,
            quillEditor
        },
        data() {
            return {
                myChart: null,
                typeSelected: 0,
                xList: [],

                versionSelectedId: "",
                appVersion: "",
                title: "",
                appDownloadLink: "",
                versionContent: ''
            };
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            },
            platformUserInfo() {
                return this.$store.state.platformUserInfo;
            },
            appVersions() {
                return this.$store.state.appVersions;
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
            this.setVersionShow();
        },
        watch: {
            typeSelected() {
                this.showCharts();
            },
            versionSelectedId() {
                this.setVersionShow(this.versionSelectedId);
            }
        },
        methods: {
            getPlatformInfo() {
                USER_GET_PLATFORM_INFO().then(data => {
                    this.$store.commit('setPlatformUserInfo', data);
                    this.showCharts();
                });
            },
            saveAppVersion() {
                APP_VERSION_UPDATE({
                    id: this.versionSelectedId,
                    appVersion: this.appVersion,
                    title: this.title,
                    appDownloadLink: this.appDownloadLink,
                    updateTip: this.versionContent,
                }).then(data => {
                    if (data) {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                    }
                    this.getAppVersions();
                }).catch(e => {
                    this.$message.error("修改失败，" + e);
                });
            },
            createAppVersion() {
                APP_VERSION_ADD({
                    appVersion: this.appVersion,
                    title: this.title,
                    appDownloadLink: this.appDownloadLink,
                    updateTip: this.versionContent,
                }).then(data => {
                    if (data) {
                        this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                    }
                    this.getAppVersions();
                }).catch(e => {
                    this.$message.error("新增失败，" + e);
                });
            },
            deleteAppVersion() {
                APP_VERSION_DELETE({
                    data: {
                        id: this.versionSelectedId
                    }
                }).then(() => {
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.getAppVersions();
                }).catch(e => {
                    this.$message.error("删除失败，" + e);
                });
            },
            setVersionShow(id) {
                let item;
                if (id) {
                    item = this.appVersions.filter(e => e.id === id)[0];
                } else {
                    item = this.appVersions[this.appVersions.length - 1];
                }
                if (!item) item = this.appVersions[this.appVersions.length - 1];
                this.versionSelectedId = item.id;
                this.appVersion = item.appVersion;
                this.title = item.title;
                this.appDownloadLink = item.appDownloadLink;
                this.versionContent = item.updateTip;
            },
            getAppVersions() {
                APP_VERSION_GET_ALL().then(data => {
                    this.$store.commit('setAppVersions', data);
                    this.setVersionShow(this.versionSelectedId);
                });
            },
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange() {
            }, // 内容改变事件
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
                        formatter: `日期{b} <br>${this.typeSelected === 0 ? '活跃人数 ' : '新注册人数 '}{c}人   `
                    },
                    series: [{
                        data: yList,
                        type: 'line',
                        color: ['#5ecaff'],
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
            this.getAppVersions();
        }
    };
</script>

<style scoped lang="stylus">
    .about-container
        min-height 100vh
        width 100%
        background-color $bg-color-grey
        .content
            width 950px
            padding-bottom 50px
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
            .version-container
                margin-bottom 15px
                width 950px
                padding 15px 0
                background white
                border-radius $border-radius-sm
                box-shadow $box-shadow-box
                .left-option-container
                    width 300px
                    padding-right 30px
                    height 120px
                    float right
                    display flex
                    flex-direction column
                    align-items flex-end
                    justify-content space-around
                .version-info-container
                    height 60px
                    line-height 60px
                    width 600px
                    display flex
                    .item
                        margin-left 30px
                        display flex
                        width 600px
                        font-size $font-size-base
                        span
                            flex-shrink 0
                            margin-right 10px
                            font-weight bold
                .editor-container
                    margin-top 30px
                    margin-bottom 10px

</style>
