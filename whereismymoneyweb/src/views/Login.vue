<template>
    <div class="container">

        <div class="logo-container">
            <el-image class="logo-image cricle-image" src="./../../static/image/logo_hollow.png"></el-image>
            <el-image class="logo-image" src="./../../static/image/name_logo.png"></el-image>
        </div>

        <div class="login-container" v-if="mode === 'login'">
            <div class="title">{{superLogin ? '管理员登录' : '账户登录'}}</div>
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
            <el-button class="bottom" @click="login">登录</el-button>
            <div class="other-option">
                <span @click="goTo('register')">新用户注册</span>
                <span @click="goTo('forgotPw')">忘记密码</span>
            </div>
            <div class="other-option">
                <span @click="superLogin = !superLogin">{{superLogin? '普通登录' : '管理员登录'}}</span>
            </div>
            <div class="other-option">
                <span @click="goTo('introduction')">关于</span>
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
            <el-button class="bottom" @click="register">{{registerTip}}</el-button>
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
            <el-button class="bottom" @click="resetPw">{{resetPwTip}}</el-button>
            <div class="other-option">
                <span @click="goTo('login')">已有账户</span>
            </div>
        </div>
        <div class="copy-right"> {{copyRight}} {{contactWay}}
            <div class="beiAn-link">
                <a
                    href="http://www.beian.miit.gov.cn/">网站备案/许可证号：
                    {{beiAnNumber}}</a>
                <!--                <a-->
                <!--                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=53011402000392"><img-->
                <!--                    src="./../../static/image/policeIcon.png" style="float:left;"/>-->
                <!--                    <p style="float:left;">滇公网安备-->
                <!--                        53011402000392号</p></a>-->
            </div>
        </div>
    </div>
</template>
<script>
    import {
        DT_GETALL,
        EMAIL_GET_CAPTCHA,
        USER_FORGET_PASSWORD,
        USER_LOGIN,
        USER_REGISTER,
        UT_GETALL
    } from "./../api/api";
    import config from "./../config/index";
    import {setHeader} from "./../assets/js/help";

    export default {
        data() {
            return {
                nameInput: "text@qq.com",
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

                superLogin: false, //管理员登录
                registerTip: '获取验证码',

                resetPwTip: '获取验证码',
                mode: 'login',
                copyRight: config.copyRight,
                contactWay: config.contactWay,
                beiAnNumber: config.beiAnNumber,
            };
        },
        computed: {
            userId() {
                return this.$store.state.userInfo.id;
            }
        },
        methods: {
            goTo(value) {
                if (value === "introduction") {
                    this.$router.push({name: "Introduction"});
                    return;
                }
                this.mode = value;
                this.resetForm();
            },
            resetForm() {
                this.superLogin = false;
                switch (this.mode) {
                    case "login":
                        this.nameInput = "";
                        this.password = "";
                        break;
                    case "register":
                        this.newUserEmail = '';
                        this.newUserName = '';
                        this.newUserPw = '';
                        this.newUserPwAgain = '';
                        this.newUserCode = '';
                        this.registerTip = "获取验证码";
                        break;
                    case "forgotPw":
                        this.oldUserEmail = '';
                        this.oldUserPw = '';
                        this.oldUserPwAgain = '';
                        this.oldUserCode = '';
                        this.resetPwTip = "获取验证码";
                        break;
                }
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
                    password: this.password,
                    administrator: this.superLogin ? true : false
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
                    });
            },
            register() {
                if (this.registerTip === "获取验证码") {
                    // eslint-disable-next-line
                    if (!this.newUserEmail || this.newUserEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
                        this.$message({
                            message: "请输入正确的邮箱",
                            type: "warning"
                        });
                        return;
                    }
                    this.sendCaptcha(this.newUserEmail);
                    this.registerTip = "注册";
                } else {
                    // eslint-disable-next-line
                    if (!this.newUserEmail || this.newUserEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
                        this.$message({
                            message: "请输入正确的邮箱",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.newUserName || this.newUserName.length >= 13) {
                        this.$message({
                            message: "请输入1到12个字的昵称",
                            type: "warning"
                        });
                        return;
                    }
                    if (this.newUserPw !== this.newUserPwAgain) {
                        this.$message({
                            message: "两次密码输入不一致",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.newUserPw || this.newUserPw.length <= 5 || this.newUserPw.length >= 13) {
                        this.$message({
                            message: "请输入6到12位的密码",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.newUserCode) {
                        this.$message({
                            message: "请输入验证码",
                            type: "warning"
                        });
                        return;
                    }
                    USER_REGISTER({
                        name: this.newUserName,
                        email: this.newUserEmail,
                        password: this.newUserPw,
                        code: this.newUserCode
                    }).then(res => {
                        this.$message({
                            message: "注册成功",
                            type: "success"
                        });
                        window.localStorage.setItem("token", res.token);
                        window.localStorage.setItem("userId", res.userInfo.id);
                        setHeader();
                        this.$store.commit("setUserInfo", res.userInfo);
                        this.getTypesInfo();
                        this.$router.push('/');
                    });
                }
            },
            resetPw() {
                if (this.resetPwTip === "获取验证码") {
                    // eslint-disable-next-line
                    if (!this.oldUserEmail || this.oldUserEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
                        this.$message({
                            message: "请输入正确的邮箱",
                            type: "warning"
                        });
                        return;
                    }
                    this.sendCaptcha(this.oldUserEmail);
                    this.resetPwTip = "登录";
                } else {
                    // eslint-disable-next-line
                    if (!this.oldUserEmail || this.oldUserEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
                        this.$message({
                            message: "请输入正确的邮箱",
                            type: "warning"
                        });
                        return;
                    }
                    if (this.oldUserPw !== this.oldUserPwAgain) {
                        this.$message({
                            message: "两次密码输入不一致",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.oldUserPw || this.oldUserPw.length <= 5 || this.oldUserPw.length >= 13) {
                        this.$message({
                            message: "请输入6到12位的密码",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.oldUserCode) {
                        this.$message({
                            message: "请输入验证码",
                            type: "warning"
                        });
                        return;
                    }

                    USER_FORGET_PASSWORD({
                        email: this.oldUserEmail,
                        password: this.oldUserPw,
                        code: this.oldUserCode
                    }).then(res => {
                        this.$message({
                            message: "重设密码成功",
                            type: "success"
                        });
                        window.localStorage.setItem("token", res.token);
                        window.localStorage.setItem("userId", res.userInfo.id);
                        setHeader();
                        this.$store.commit("setUserInfo", res.userInfo);
                        this.getTypesInfo();
                        this.$router.push('/');
                    });
                }
            },
            sendCaptcha(email) {
                EMAIL_GET_CAPTCHA({
                    email: email
                }).then(result => {
                    console.log(result);
                    this.$message({
                        message: "验证码发送成功，请注意查收",
                        type: "success"
                    });
                });
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
            width 450px
            display flex
            .logo-image
                height 100px
            .cricle-image
                height 100px
                width 120px
        .login-container
            height 320px
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
                margin-bottom 10px
                span
                    cursor pointer
                span:hover
                    color $text-color
        .copy-right
            position fixed
            bottom 30px
            left 50%
            transform translateX(-50%)
            color $text-color
            font-size $font-size-ssm
            background-color rgba(255, 255, 255, 0.75)
            padding 8px 15px
            border-radius 10px
            .beiAn-link
                display flex
                margin-top 4px
                justify-content space-around
            a
                color $text-color
                display inline-block
                height 20px
                line-height 20px
                vertical-align top
                p
                    margin 0
            a:hover
                color $bg-color-grey
</style>
