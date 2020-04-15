<template>
    <div class="container">
        <div class="login-container">
            <div class="input-container">
                <el-input
                    placeholder="请输入用户名"
                    v-model="nameInput"
                    clearable>
                </el-input>
            </div>
            <div class="input-container">
                <el-input
                    show-password
                    placeholder="请输入密码"
                    v-model="password"
                >
                </el-input>
            </div>

            <div class="bottom" @click="login">登录</div>
        </div>
        <div class="copy-right"> {{copyRight}}</div>
    </div>
</template>
<script>
    import {USER_LOGIN} from "./../api/api";
    import {setHeader} from "./../assets/js/help";

    export default {
        data() {
            return {
                nameInput: "",
                password: "",
                copyRight: "Copyright © 2020 Bao HangXing All Rights Reserved       版权所有  包航行  联系方式：2292398086@qq.com"
            };
        },
        methods: {
            login() {
                if (!this.nameInput) {
                    this.$message({
                        message: "请输入用户名",
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
                    name: this.nameInput,
                    password: this.password
                }).then(res => {
                    if (res.data.code === "000001") {
                        this.$message({
                            message: "登录成功",
                            type: "success"
                        });
                        window.localStorage.setItem("token", res.data.data.token);
                        setHeader();
                        this.$store.commit("setUserInfo", res.data.data.userInfo);
                        console.log(this.$store.state);
                    } else {
                        this.$message.error("登录失败，" + res.data.msg);
                    }
                });
            }
        }
    };
</script>
<style lang="stylus">
    .container
        height 100%
        width 100%
        padding-bottom 300px
        box-sizing border-box
        background-image url("./../assets/image/ynu-bg.jpg")
        background-size cover;
        background-position center;
        background-repeat no-repeat;
        display flex
        align-items center

        .login-container
            height 280px
            width 350px
            margin-right 200px
            margin-left auto
            border-radius 10px
            background-color rgba(#fff, 0.9)
            display flex
            flex-direction column
            justify-content center
            align-items center

            .input-container
                width 250px
                margin-bottom 20px

            .bottom
                width 250px
                height 40px
                background-color $system-color-blue
                color #FFF
                border-radius 4px
                line-height 40px
                text-align center
                font-size 16px

        .copy-right
            position fixed
            bottom 20px
            left 50%
            transform translateX(-50%)
            color #000
            font-size 14px
</style>
