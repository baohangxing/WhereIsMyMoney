<template>
    <div class="over-container" @click.stop="closeAddBill">
        <div class="input-container" @click.stop="">
            <div class="nav-container">
                <sliding-menu ref="navTab" :size="'s'" @changeTab="changeTab"></sliding-menu>
            </div>

            <div class="types-container" v-show="TabCur === 0">
                <div v-for="item in types.outTypeList" :key="item.id" class="type-item">
                    <type-select-item :defaultType="true" :item="item"
                                      :isSelected="isSelectedId === item.id && defaultType === 1"
                                      @selectItem="selectItem"></type-select-item>
                </div>
                <div v-for="item in myTypes.outTypeList" :key="item.id" class="type-item">
                    <type-select-item :defaultType="false" :item="item"
                                      :isSelected="isSelectedId === item.id && defaultType === 0"
                                      @selectItem="selectItem"></type-select-item>
                </div>

            </div>

            <div class="types-container" v-show="TabCur === 1">
                <div v-for="item in types.inTypeList" :key="item.id" class="type-item">
                    <type-select-item :defaultType="true" :item="item"
                                      :isSelected="isSelectedId === item.id && defaultType === 1"
                                      @selectItem="selectItem"
                    ></type-select-item>
                </div>
                <div v-for="item in myTypes.inTypeList" :key="item.id" class="type-item">
                    <type-select-item :defaultType="false" :item="item"
                                      :isSelected="isSelectedId === item.id && defaultType === 0"
                                      @selectItem="selectItem"
                    ></type-select-item>
                </div>
            </div>

            <div class="all-input-container">

                <div class="date-input">
                    <el-date-picker
                        v-model="dateSelected"
                        align="right"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="tip-input">
                    <el-input v-model="tip" placeholder="请输入备注"></el-input>
                </div>
                <div class="money-input">
                    <el-input v-model="money" placeholder="请输入金额"></el-input>
                </div>
            </div>
            <div class="add-btn-container">
                <el-button type="primary" round @click="saveBill">保存</el-button>
                <el-button type="primary" round @click="saveAndWrite">再记</el-button>
                <el-button v-if="isUpdata" type="danger" round @click="deleteBill">删除</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import slidingMenu from "./slidingMenu";
    import typeSelectItem from "./typeSelectItem";
    import {BILL_ADD, BILL_DELETE, BILL_UPDATE} from './../api/api';
    import {dateFormat} from './../assets/js/help'

    export default {
        name: "addBIllOver",
        data() {
            return {
                isSelectedId: 1,
                TabCur: 0,
                type: 0, //账单的类型 0支出 1收入
                defaultType: 1, //账单的类型是否是官方的类型 0不是 1是
                isUpdata: false,
                updataBillId: null,

                money: '',
                dateSelected: '',
                tip: ''
            }
        },
        created() {
            this.dateSelected = this.selectedDateInfo.year + "-" + this.selectedDateInfo.month + "-" + this.selectedDateInfo.day
        },
        computed: {
            selectedDateInfo() {
                return this.$store.state.selectedDateInfo;
            },
            types() {
                return this.$store.state.system.types;
            },
            myTypes() {
                return this.$store.state.system.myTypes;
            },
            userId() {
                return this.$store.state.userInfo.id;
            },
            selectedBillItem() {
                return this.$store.state.temporary.selectedBillItem
            }
        },
        watch: {
            'selectedBillItem': {
                handler(newVal) {
                    if (newVal.id) {
                        this.isUpdata = true;
                        this.tip = this.selectedBillItem.description;
                        this.money = this.selectedBillItem.amount;
                    } else {
                        this.isUpdata = false;
                        this.tip = "";
                        this.money = "";
                    }
                },
                deep: true,
                immediate: true,
            }
        },
        components: {
            slidingMenu,
            typeSelectItem
        },
        methods: {
            selectItem(data) {
                this.isSelectedId = data.id;
                this.defaultType = data.defaultType ? 1 : 0;
            },
            changeTab(index) {
                this.TabCur = index;
                this.type = this.TabCur === 0 ? 0 : 1;
            },
            closeAddBill() {
                this.$emit("closeAddBill", false);
                this.$store.commit('selectedBillItem', {});
            },
            deleteBill() {
                BILL_DELETE({
                    data: {
                        id: this.selectedBillItem.id
                    }
                }).then(() => {
                    console.log(this.selectedBillItem);
                    this.$store.commit('deleteMonthListItem', this.selectedBillItem);
                    this.closeAddBill();
                });
            },
            saveBill() {
                if (this.isUpdata) {
                    this.updataBill().then(result => {
                        if (result) {
                            this.$store.commit('addMonthListItem', result);
                            this.$store.commit('deleteMonthListItem', result);
                            this.money = "";
                            this.tip = "";
                            this.closeAddBill();
                        }
                    });
                } else {
                    if (!this.money) {
                        this.$message({
                            message: "请输入金额",
                            type: "warning"
                        });
                        return
                    }
                    this.postBill().then(result => {
                        if (result) {
                            this.$store.commit('addMonthListItem', result);
                            this.money = "";
                            this.tip = "";
                            this.closeAddBill();
                        }
                    });
                }
            },
            saveAndWrite() {
                if (this.isUpdata) {
                    this.updataBill().then(result => {
                        if (result) {
                            this.money = "";
                            this.tip = "";
                            this.isUpdata = false;
                            this.$store.commit('addMonthListItem', result);
                            this.$store.commit('deleteMonthListItem', result);
                        }
                    });
                } else {
                    if (!this.money) {
                        this.$message({
                            message: "请输入金额",
                            type: "warning"
                        });
                        return
                    }
                    this.postBill().then(result => {
                        if (result) {
                            this.money = "";
                            this.tip = "";
                            console.log(this.$store.state.billData.monthList)
                            this.$store.commit('addMonthListItem', result);
                            console.log(this.$store.state.billData.monthList)
                        }
                    });
                }
            },
            postBill: async function () {
                let dateArr = this.dateSelected.split('-');
                return await BILL_ADD({
                    userId: this.userId,
                    defaultType: this.defaultType,
                    typeId: this.isSelectedId,
                    type: this.type,
                    time: dateFormat(dateArr[0], dateArr[1], dateArr[2]),
                    amount: this.money,
                    description: this.tip
                }).then(result => {
                    return result;
                });
            },
            updataBill: async function (data) {
                let dateArr = this.dateSelected.split('-');
                return await BILL_UPDATE({
                    id: this.updataBillId,
                    userId: this.userId,
                    defaultType: this.defaultType,
                    typeId: this.isSelectedId,
                    type: this.type,
                    time: dateFormat(dateArr[0], dateArr[1], dateArr[2]),
                    amount: data.money,
                    description: data.tip
                }).then(result => {
                    return result;
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .over-container
        position fixed
        height 100vh
        width 100vw
        left 0
        top 0
        z-index 99
        background-color $bg-color-mask
        display flex
        justify-content center

        .input-container
            width 800px
            height 500px
            background-color white
            border-radius 20px
            margin-top 200px
            z-index 101

            .nav-container
                height 45px
                margin 15px auto
                width 400px

            .types-container
                height 270px
                width 100%
                padding 0 50px

                .type-item
                    width 70px
                    height 90px
                    justify-content center
                    display inline-flex
            .all-input-container
                width 800px
                padding 0 50px
                height 42px
                margin-bottom 10px
                display flex
                justify-content space-between
                .date-input
                    width 220px
                .tip-input
                    width 340px
                .money-input
                    width 120px
            .add-btn-container
                height 80px
                width 100%
                display flex
                justify-content center
                align-items center


</style>
