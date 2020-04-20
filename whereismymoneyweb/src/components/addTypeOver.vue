<template>
    <div class="over-container" @click.stop="closeMask">
        <div class="input-container" @click.stop="">
            <div class="nav-container">
                <sliding-menu ref="navTab" :size="'s'" @changeTab="changeTab"></sliding-menu>
            </div>
            <div class="left-my-types">
                <div class="types-container" v-show="TabCur === 0">

                    <div v-for="item in myTypes.outTypeList" :key="item.id" class="type-item">
                        <my-icon :name="item.icon" size="26"></my-icon>
                        <span class="name">{{item.name}}</span>
                        <div class="updata-btn" @click="updataType(item)">
                            <el-button type="primary" round size="small">修改</el-button>
                        </div>
                        <div class="delete-btn" @click="deleteType(item)">
                            <el-button type="danger" round size="small">删除</el-button>
                        </div>
                    </div>
                </div>
                <div class="types-container" v-show="TabCur === 1">

                    <div v-for="item in myTypes.inTypeList" :key="item.id" class="type-item">
                        <my-icon :name="item.icon" size="26"></my-icon>
                        <span>{{item.name}}</span>
                        <div class="updata-btn" @click="updataType(item)">
                            <el-button type="primary" round size="small">修改</el-button>
                        </div>
                        <div class="delete-btn" @click="deleteType(item)">
                            <el-button type="danger" round size="small">删除</el-button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="icon-contaienr">
                <div v-for="(itemName,index) in iconList" class="icon-item-contaienr" :key="index"
                     @click="seleteIcon(itemName)">
                    <my-icon :name="itemName"
                             :color="seleteIconName === itemName ? '#ff55ff' : '#333333'" size="26"></my-icon>
                </div>
            </div>

            <div class="all-input-container">
                <div class="icon-tip">图标：</div>
                <div class="select-icon" @click="clearIcon">
                    <my-icon :name="seleteIconName" size="26"></my-icon>
                </div>

                <div class="name-tip">名称：</div>
                <div class="tip-input">
                    <el-input v-model="typeName"></el-input>
                </div>
            </div>

            <div class="save-btn-container">
                <div @click="saveOrAdd">
                    <el-button type="primary" plain>{{ isUpdata? '保存' : '新增'}}</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import slidingMenu from "./slidingMenu";
    import {UT_ADD, UT_DELETE, UT_UPDATE} from './../api/api';

    export default {
        data() {
            return {
                TabCur: 0,
                type: 0, //账单的类型 0支出 1收入
                isUpdata: false,

                updataTypeItem: null,
                seleteIconName: null,
                typeName: null,
            }
        },
        computed: {
            myTypes() {
                return this.$store.state.system.myTypes;
            },
            userId() {
                return this.$store.state.userInfo.id;
            },
            iconList() {
                return this.$store.state.system.iconList;
            }
        },
        components: {
            slidingMenu
        },
        methods: {
            settingType() {

            },
            closeMask() {
                this.$emit("closeMask")
            },
            updataType(item) {
                this.isUpdata = true;
                this.updataTypeItem = item;
                this.seleteIconName = item.icon;
                this.typeName = item.name;
            },
            clearIcon() {
                this.isUpdata = false;
                this.updataTypeItem = null;
                this.seleteIconName = null;
                this.typeName = null;
            },
            seleteIcon(name) {
                this.seleteIconName = name;
            },
            saveOrAdd() {
                if (!this.seleteIconName) {
                    this.$message({
                        message: '请选择图标',
                        type: "warning"
                    });
                }
                if (!this.typeName) {
                    this.$message({
                        message: '请输入类型名称',
                        type: "warning"
                    });
                }
                if (this.isUpdata) {
                    this.goToUpdataType().then(result => {
                        let data = {
                            data: result,
                            oldId: this.updataTypeItem.id,
                            type: Number(this.type)
                        };
                        this.$store.commit('updataMyTypes', data);
                        this.updataUserTypeStorage();
                        this.clearIcon();
                    });
                } else {
                    this.postType().then(result => {
                        this.$store.commit('appendMyTypes', result);
                        this.updataUserTypeStorage();
                        this.clearIcon();
                    });
                }
            },
            deleteType(item) {
                this.delete(item.id).then(() => {
                    this.$store.commit('deleteMyTypes', item);
                    this.updataUserTypeStorage();
                });
            },
            postType: async function () {
                return await UT_ADD({
                    userId: this.userId,
                    type: Number(this.type),
                    name: this.typeName,
                    icon: this.seleteIconName
                })
            },
            goToUpdataType: async function () {
                return await UT_UPDATE({
                    id: this.updataTypeItem.id,
                    type: Number(this.type),
                    userId: this.userId,
                    name: this.typeName,
                    icon: this.seleteIconName
                })
            },
            delete: async function (id) {
                return await UT_DELETE({
                    data: {
                        id: id,
                        userId: this.userId
                    }
                });
            },
            changeTab(index) {
                this.TabCur = index;
                this.type = this.TabCur === 0 ? 0 : 1;
            },
            updataUserTypeStorage() {
                const user_types = [...this.myTypes.outTypeList, ...this.myTypes.inTypeList] || [];
                let data = JSON.stringify(user_types);
                window.localStorage.setItem("user_types", data);
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
        z-index 104
        background-color rgba(0, 0, 0, 0)
        display flex
        justify-content center

        .input-container
            width 800px
            height 500px
            background-color white
            border-radius 20px
            margin-top 200px
            z-index 105

            .nav-container
                height 45px
                margin 15px auto
                width 400px
            .left-my-types
                height 270px
                display inline-flex
                width 300px
                margin-left 50px
                overflow-y scroll
                overflow-x hidden

                .types-container
                    height 70px
                    width 300px

                    .type-item
                        width 270px
                        height 55px
                        align-items center
                        display inline-flex
                        .name
                            margin-left 10px

                        .updata-btn
                            margin-left auto
                            margin-right 10px
                        .delete-btn
                            margin-right 10px
            .icon-contaienr
                height 270px
                display inline-block
                vertical-align top
                width 400px
                .icon-item-contaienr
                    width 50px
                    height 50px
                    justify-content center
                    display inline-flex


            .all-input-container
                width 800px
                padding 0 50px
                height 60px
                margin-bottom 10px
                display flex
                justify-content space-between
                align-items center
                .select-icon
                .date-input
                    width 220px
                .tip-input
                    width 340px
                .money-input
                    width 120px
            .save-btn-container
                height 80px
                width 100%
                display flex
                justify-content center
                align-items center

</style>
