<template>
    <div class="home-container">
        <Header @initData="initData" @exportBillData="exportBillData"/>
        <div class="content-container">
            <div class="left-content-container">
                <day-bills-list @updateBill="addBill"></day-bills-list>
                <type-list-charts></type-list-charts>
            </div>
            <div class="right-content-container">
                <income-sum></income-sum>
                <active-graph></active-graph>
                <web-info></web-info>
            </div>
        </div>

        <div class="btn-container">
            <div class="fixed-btn" @click="addBill(true)" :class="{'click-animation':addBillBOverShow}">
                <my-icon name="icon_add" color="#FFF" size="44"></my-icon>
            </div>
        </div>

        <add-bill-over v-if="addBillBOverShow" @closeAddBill="addBill"></add-bill-over>
    </div>
</template>

<script>
    import Header from './../components/header';
    import incomeSum from "../components/incomeSum";
    import dayBillsList from "../components/dayBillsList";
    import addBillOver from "../components/addBillOver";
    import typeListCharts from "../components/typeListCharts";
    import activeGraph from "../components/activeGraph";
    import webInfo from "../components/webInfo";
    import {
        BILL_GET_GROUP0BY_MONTH,
        BILL_GET_GROUP0BY_TYPE,
        BILL_GET_MY_SUM,
        BILL_GET_USER_ACTIVE,
        EMAIL_SEND_BILL_DATA,
        USER_GET_INFO
    } from './../api/api';

    export default {
        name: 'Home',
        components: {
            Header,
            incomeSum,
            dayBillsList,
            addBillOver,
            typeListCharts,
            activeGraph,
            webInfo
        },
        data() {
            return {
                userId: ''
            };
        },
        computed: {
            addBillBOverShow() {
                return this.$store.state.system.addBillBOverShow;
            },
            dateInfo() {
                return this.$store.state.dateInfo;
            },
            userInfo() {
                return this.$store.state.userInfo;
            },
            selectedDateInfo() {
                return this.$store.state.selectedDateInfo;
            },
            monthList() {
                return this.$store.state.billData.monthList;
            }
        },
        created() {
            this.userId = window.localStorage.getItem("userId");
            if (!this.$store.state.userInfo.id) {
                USER_GET_INFO({id: this.userId}).then(result => {
                    this.$store.commit('setUserInfo', result);
                }).catch(e => {
                    this.$message.error(e);
                });
            }
            this.initData();
            this.getActiveDate();
        },
        methods: {
            initData() {
                BILL_GET_MY_SUM({
                    params: {
                        userId: this.userId,
                        year: this.selectedDateInfo.year,
                        month: this.selectedDateInfo.month
                    }
                })
                    .then(result => {
                        this.$store.commit('setSumData', result);

                    })
                    .catch(e => {
                        this.$message.error(e);
                    });

                BILL_GET_GROUP0BY_MONTH({
                    params: {
                        userId: this.userId,
                        year: this.selectedDateInfo.year,
                        month: this.selectedDateInfo.month
                    }
                })
                    .then(result => {
                        this.$store.commit('setMonthList', result);
                    })
                    .catch(e => {
                        this.$message.error(e);
                    });

                BILL_GET_GROUP0BY_TYPE({
                    params: {
                        userId: this.userId,
                        year: this.selectedDateInfo.year,
                        month: this.selectedDateInfo.month,
                        type: 0
                    }
                })
                    .then(result => {
                        let data = {
                            data: result,
                            type: 0
                        };
                        this.$store.commit('setTypeList', data);

                    })
                    .catch(e => {
                        this.$message.error(e);
                    });
                BILL_GET_GROUP0BY_TYPE({
                    params: {
                        userId: this.userId,
                        year: this.selectedDateInfo.year,
                        month: this.selectedDateInfo.month,
                        type: 1
                    }
                })
                    .then(result => {
                        let data = {
                            data: result,
                            type: 1
                        };
                        this.$store.commit('setTypeList', data);

                    })
                    .catch(e => {
                        this.$message.error(e);
                    });
            },
            getActiveDate() {
                BILL_GET_USER_ACTIVE({
                    params: {
                        userId: this.userId
                    }
                }).then(result => {
                    this.$store.commit('setUserActive', result);
                })
                    .catch(e => {
                        this.$message.error(e);
                    });
            },
            addBill(val) {
                if (val) {
                    let mo = function (e) {
                        e.preventDefault();
                    };
                    document.body.style.overflow = 'hidden';
                    document.addEventListener("touchmove", mo, false);
                } else {
                    let mo = function (e) {
                        e.preventDefault();
                    };
                    document.body.style.overflow = '';
                    document.removeEventListener("touchmove", mo, false);
                }
                this.$store.commit('changeAddBillBOverShow', val);
            },
            exportBillData(value) {
                let startTime = "";
                let endTime = "";
                switch (value) {
                    case "year":
                        startTime = new Date(this.dateInfo.year, 0).toISOString();
                        endTime = new Date(this.dateInfo.year + 1, 0).toISOString();
                        break;
                    case "month":
                        startTime = new Date(this.dateInfo.year, this.dateInfo.month - 1).toISOString();
                        endTime = new Date(this.dateInfo.year, this.dateInfo.month).toISOString();
                        break;
                    case "week":
                        startTime = new Date((new Date().getTime()) - (new Date().getDay() + 1) * 60 * 60 * 24 * 1000).toISOString();
                        endTime = new Date(this.dateInfo.year, this.dateInfo.month).toISOString();
                        break;
                }
                EMAIL_SEND_BILL_DATA({
                    email: this.userInfo.email,
                    userId: this.userInfo.id,
                    startTime: startTime,
                    endTime: endTime
                }).then(() => {
                    this.$message({
                        message: "发送成功,请注意查收",
                        type: "success"
                    });
                });
            }
        }
    };
</script>
<style scoped lang="stylus">
    .home-container
        height 100vh
        overflow-y scroll
        overflow-x hidden
        background-color $bg-color-grey
        width 100%
        .content-container
            width 1000px
            padding-top 15px
            margin 100px auto 0 auto
            .left-content-container
                display inline-block
                width 680px
            .right-content-container
                vertical-align top
                margin-left 15px
                display inline-block
                width 300px

        .btn-container
            position fixed;
            left 50%;
            transform translateX(-50%);
            bottom 100px;
            width 60px;
            height 60px;
            cursor: pointer;
            .fixed-btn
                width 60px;
                height 60px;
                background $system-color-blue
                box-shadow $box-shadow-btn
                display flex
                justify-content: center
                align-items center
                border-radius $border-radius-circle
                z-index 98

</style>
