<template>
    <div class="container">

        <div class="logo-container">
            <el-image class="logo-image" src="./../../static/image/logo_hollow.png"></el-image>
            <el-image class="logo-image" src="./../../static/image/name_logo.png"></el-image>
        </div>

        <div class="login-container" v-if="mode === 'login'">
            <div class="title">账户登录</div>
            <div class="input-container height-margin">
                <el-input
                    placeholder="请输入邮箱"
                    v-model="nameInput"
                    clearable>
                </el-input>
            </div>
            <div class="input-container height-margin">
                <el-input
                    show-password
                    placeholder="请输入密码"
                    v-model="password"
                >
                </el-input>
            </div>
            <div class="bottom" @click="login">登录</div>
            <div class="other-option">
                <span @click="goTo('register')">新用户注册</span>
                <span @click="goTo('forgotPw')">忘记密码</span>
            </div>
        </div>
        <div class="login-container" style="height:400px" v-if="mode === 'register'">
            <div class="title">新用户注册</div>
            <div class="input-container">
                <el-input
                    placeholder="请输入邮箱"
                    v-model="newUserEmail"
                    clearable>
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    placeholder="请输入您的昵称"
                    v-model="newUserName"
                    clearable
                >
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    show-password
                    placeholder="请输入密码"
                    v-model="newUserPw"
                >
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    show-password
                    placeholder="请确认您的密码"
                    v-model="newUserPwAgain"
                >
                </el-input>
            </div>
            <div class="input-container height-margin">
                <el-input
                    placeholder="请输入验证码"
                    v-model="newUserCode"
                    clearable
                >
                </el-input>
            </div>
            <div class="bottom" @click="register">{{registerTip}}</div>
            <div class="other-option">
                <span @click="goTo('login')">已有账户</span>
            </div>
        </div>
        <div class="login-container" style="height:370px" v-if="mode === 'forgotPw'">
            <div class="title">重置密码</div>
            <div class="input-container">
                <el-input
                    placeholder="请输入邮箱"
                    v-model="oldUserEmail"
                    clearable>
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    show-password
                    placeholder="请输入密码"
                    v-model="oldUserPw"
                >
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    show-password
                    placeholder="请确认您的密码"
                    v-model="oldUserPwAgain"
                >
                </el-input>
            </div>
            <div class="input-container height-margin">
                <el-input
                    placeholder="请输入验证码"
                    v-model="oldUserCode"
                    clearable
                >
                </el-input>
            </div>
            <div class="bottom" @click="login">{{resetPwTip}}</div>
            <div class="other-option">
                <span @click="goTo('login')">已有账户</span>
            </div>
        </div>
        <div class="copy-right"> {{copyRight}}</div>
    </div>
</template>
<script>
    import {DT_GETALL, USER_LOGIN, UT_GETALL} from "./../api/api";
    import {setHeader} from "./../assets/js/help";

    export default {
        data() {
            return {
                nameInput: "123456@qq.com",
                password: "123456",

                newUserEmail: '',
                newUserName: '',
                newUserPw: '',
                newUserPwAgain: '',
                newUserCode: '',

                oldUserEmail: '',
                oldUserPw: '',
                oldUserPwAgain: '',
                oldUserCode: '',

                registerTip: '获取验证码',

                resetPwTip: '获取验证码',
                mode: 'login',
                copyRight: "Copyright © 2020 Bao HangXing All Rights Reserved       版权所有  包航行  联系方式：2292398086@qq.com"
            };
        },
        computed: {
            userId() {
                return this.$store.state.userInfo.id
            }
        },
        methods: {
            goTo(value) {
                this.mode = value
            },

            login() {
                if (!this.nameInput) {
                    this.$message({
                        message: "请输入邮箱",
                        type: "warning"
                    });
                    return;
                }
                if (!this.password) {
                    this.$message({
                        message: "请输入密码",
                        type: "warning"
                    });
                    return;
                }
                USER_LOGIN({
                    email: this.nameInput,
                    password: this.password
                }).then(res => {
                    this.$message({
                        message: "登录成功",
                        type: "success"
                    });
                    window.localStorage.setItem("token", res.token);
                    window.localStorage.setItem("userId", res.userInfo.id);
                    setHeader();
                    this.$store.commit("setUserInfo", res.userInfo);
                    this.getTypesInfo();
                    this.$router.push('/');

                })
                    .catch(e => {
                        this.$message.error("登录失败，" + e);
                    })
            },
            getTypesInfo() {
                DT_GETALL().then(result => {
                    this.$store.commit('setTypes', result);
                    let default_types = JSON.stringify(result);
                    window.localStorage.setItem("default_types", default_types);

                });

                UT_GETALL({
                    params: {
                        userId: this.userId,
                    }
                }).then(result => {
                    this.$store.commit('setMyTypes', result);
                    let user_types = JSON.stringify(result);
                    window.localStorage.setItem("user_types", user_types);
                });
            }
            ,
        }
    }
    ;
</script>
<style lang="stylus" scoped>
    .container
        height 100%
        width 100%
        padding-bottom 300px
        box-sizing border-box
        background-image url("./../../static/image/ynu-bg.jpg")
        background-size cover;
        background-position center;
        background-repeat no-repeat;
        display flex
        align-items center

        .logo-container
            position fixed
            top 100px
            left 150px
            height 100px
            width 500px
            display flex
            .logo-image
                height 100px
        .login-container
            height 280px
            width 350px
            margin-right 200px
            margin-left auto
            border-radius 10px
            background-color rgba(#fff, 0.85)
            display flex
            flex-direction column
            justify-content center
            align-items center

            .title
                color $text-color
                font-size $font-size-lg
                margin-bottom 15px
            .input-container
                width 250px
                margin-bottom 7px
            .height-margin
                margin-bottom 15px
            .bottom
                width 250px
                height 40px
                background-color $system-color-blue
                color #FFF
                margin-bottom 15px
                border-radius 4px
                line-height 40px
                text-align center
                font-size 16px
            .other-option
                height 20px
                width 250px
                text-align left
                color $text-color-grey
                display flex
                justify-content space-between
                font-size $font-size-ssm
                span
                    cursor pointer
                span:hover
                    color $text-color
        .copy-right
            position fixed
            bottom 20px
            left 50%
            transform translateX(-50%)
            color #000
            font-size 14px
</style>
