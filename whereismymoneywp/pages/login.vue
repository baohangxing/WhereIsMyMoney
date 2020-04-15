<template>
	<div class="login-container">
		<div class="login-part">
			<div class="login-select-container">
				<span @tap="changeLoginWay(true)" :style="[{ color: loginByUsername ? '#333333' : '#999999' }]">用户名登录</span>
				<div class="line"></div>
				<span @tap="changeLoginWay(false)" :style="[{ color: !loginByUsername ? '#333333' : '#999999' }]">邮箱登录</span>
			</div>

			<div v-if="loginByUsername" class="input-container" :class="{ inputactive: isFocusNameInput }">
				<div class="input-part">
					<input
						v-model.trim="userName"
						placeholder-style="font-size:14px;"
						@focus="FocusNameInput"
						@blur="BlurNameInput"
						:placeholder="isFocusNameInput ? '' : '请输入用户名'"
					/>
				</div>
			</div>

			<div v-else class="input-container" :class="{ inputactive: isFocusEmailInput }">
				<div class="input-part">
					<input
						v-model.trim="email"
						placeholder-style="font-size:14px;"
						@focus="FocusEmailInput"
						@blur="BlurEmailInput"
						:placeholder="isFocusEmailInput ? '' : '请输入邮箱'"
					/>
				</div>
			</div>

			<div class="password-input" :class="{ inputactive: isFocusPasswordInput }">
				<div class="input-part">
					<input
						password="true"
						v-model.trim="password"
						placeholder-style="font-size:14px;"
						@focus="FocusPasswordInput"
						@blur="BlurPasswordInput"
						:placeholder="isFocusPasswordInput ? '' : '请输入密码'"
					/>
				</div>
			</div>

			<div class="login-button" @click="login"><div class="button">登录</div></div>
		</div>
	</div>
</template>

<script type="text/javascript">
import validate from '@/assets/js/validate';
import { USER_LOGIN, DT_GETALL, UT_GETALL } from '@/common/api.js';
import { setHeader } from '@/assets/js/help.js';

export default {
	name: 'loginForm',
	data() {
		return {
			loginByUsername: true,

			isFocusNameInput: false,
			isFocusEmailInput: false,
			isFocusPasswordInput: false,

			userName: null,
			email: null,
			password: null,

			validate1: null,
			validate2: null
		};
	},
	components: {},
	mounted() {
		this.initValidate();
	},
	methods: {
		changeLoginWay: function(val) {
			this.loginByUsername = val;
		},
		FocusNameInput: function() {
			this.isFocusNameInput = true;
		},
		BlurNameInput: function() {
			this.isFocusNameInput = false;
		},
		FocusEmailInput: function() {
			this.isFocusEmailInput = true;
		},
		BlurEmailInput: function() {
			this.isFocusEmailInput = false;
		},
		BlurPasswordInput: function() {
			this.isFocusPasswordInput = false;
		},
		FocusPasswordInput: function() {
			this.isFocusPasswordInput = true;
		},
		login: function() {
			let params = {};
			if (this.loginByUsername == true) {
				const formData = {
					userName: this.userName,
					password: this.password
				};

				if (!this.validate1.checkForm(formData)) {
					const error = this.validate1.errorList[0];
					uni.showToast({
						title: error.msg,
						icon: 'none'
					});
					return false;
				} else {
					params.name = this.userName;
					params.password = this.password;
				}
			} else {
				const formData = {
					email: this.email,
					password: this.password
				};

				if (!this.validate2.checkForm(formData)) {
					const error = this.validate2.errorList[0];
					uni.showToast({
						title: error.msg,
						icon: 'none'
					});
					return false;
				} else {
					params.email = this.email;
					params.password = this.password;
				}
			}

			uni.showLoading({
				title: 'Loading...',
				mask: true
			});

			USER_LOGIN(params)
				.then(result => {
					if (result.data.code == '000001') {
						uni.setStorageSync('accessToken', result.data.data.token);
						setHeader();
						this.$store.commit('setUserInfo', result.data.data.userInfo);
						uni.setStorageSync('userId', result.data.data.userInfo.id);
						uni.navigateTo({
							url: '/pages/home'
						});
						this.getTypesInfo();
					} else {
						uni.showToast({
							title: result.data.msg,
							icon: 'none'
						});
					}
				})
				.catch(err => {
					uni.showToast({
						title: '服务器出错',
						icon: 'none'
					});
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		getTypesInfo() {
			DT_GETALL().then(result => {
				if (result.data.code == '000001') {
					this.$store.commit('setTypes', result.data.data);
				}
			});

			UT_GETALL({params:{
				userId: uni.getStorageSync('userId'),
			}}).then(result => {
				if (result.data.code == '000001') {
					this.$store.commit('setMyTypes', result.data.data);
				}
			});
		},
		initValidate() {
			let rules = {
				userName: {
					required: true
				},
				password: {
					required: true
				}
			};
			let messages = {
				userName: {
					required: '请输入用户名'
				},
				password: {
					required: '请输入密码'
				}
			};
			this.validate1 = new validate(rules, messages);

			rules = {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					email: true
				}
			};
			messages = {
				email: {
					required: '请输入邮箱',
					email: '请输入正确的邮箱'
				},
				password: {
					required: '请输入密码'
				}
			};
			this.validate2 = new validate(rules, messages);
		}
	}
};
</script>

<style lang="scss" scoped>
.login-container {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.login-part {
		width: 295px;
		height: auto;
		position: relative;
		z-index: 1;
		.login-select-container {
			height: 30px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			font-size: $font-size-base;
			font-weight: bold;
			margin-bottom: 20px;
			.line {
				width: 2px;
				height: 18px;
				background-color: $system-color-blue;
				margin: 6px 20px;
			}

			span {
				line-height: 30px;
			}
		}

		.input-container {
			box-sizing: border-box;
			height: 60px;
			width: 100%;
			border-bottom: 1px solid $border-color-grey;

			.input-part {
				width: 100%;
				display: inline-block;
				box-sizing: border-box;

				input {
					height: 60px;
					font-size: $font-size-lllg;
					border: none;
					width: 100%;
					text-align: center;
					color: $text-color;
					font-family: Barlow-Bold;
				}
			}
		}

		.password-input {
			box-sizing: border-box;
			height: 60px;
			width: 100%;
			border-bottom: 1px solid $border-color-grey;

			.input-part {
				width: 100%;
				display: inline-block;
				box-sizing: border-box;

				input {
					height: 60px;
					font-size: $font-size-lllg;
					border: none;
					width: 100%;
					text-align: center;
					color: $text-color;
					font-family: Barlow-Bold;
				}
			}
		}

		.inputactive {
			border-bottom: 1px solid $border-color-black;
		}

		.login-button {
			display: flex;
			height: 60px;
			justify-content: center;
			align-items: flex-end;

			.button {
				width: 80px;
				height: 40px;
				border-radius: 20px;
				border: 3px solid $system-color-blue;
				box-sizing: border-box;
				background-color: $bg-color;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: $font-size-lg;
				color: $system-color-blue;
			}
		}
	}
}
</style>
