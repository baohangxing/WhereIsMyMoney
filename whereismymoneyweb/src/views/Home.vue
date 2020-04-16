<template>
    <div class="home-container">
        <Header @initData="initData"/>

    </div>
</template>

<script>
    import Header from './../components/header'
    import {BILL_GET_GROUP0BY_MONTH, BILL_GET_GROUP0BY_TYPE, BILL_GET_MY_SUM, USER_GET_INFO} from './../api/api';

    export default {
        name: 'Home',
        components: {
            Header
        },
        data() {
            return {
                userId: ''
            }
        },
        computed: {
            dateInfo() {
                return this.$store.state.dateInfo;
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
            this.initData()
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

            }
        }
    }
</script>
<style scoped lang="stylus">
    .home-container
        min-height 100%
        width 100%
        margin 0 auto
</style>
