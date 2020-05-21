<template>
	<div class="login-container">
		<div class="logo-container"><image src="./../static/image/name_logo.png" mode="aspectFit"></image></div>
		<div class="login-part">
			<div class="login-select-container">
				<span class="login-tip" @tap="changeLoginWay(true)" :style="[{ color: isLogin ? '#333333' : '#999999' }]">登录</span>
				<div class="line"></div>
				<span @tap="changeLoginWay(false)" :style="[{ color: !isLogin ? '#333333' : '#999999' }]">{{ isRegister ? '注册' : '重置密码' }}</span>
			</div>

			<div v-if="isLogin" class="inputs-container">
				<div class="hight-input-container input-container" :class="{ inputactive: isFocusEmailInput }">
					<div class="input-part">
						<input
							v-model.trim="email"
							placeholder-style="font-size:14px;"
							@focus="isFocusEmailInput = true"
							@blur="isFocusEmailInput = false"
							:placeholder="isFocusEmailInput ? '' : '请输入邮箱'"
						/>
					</div>
				</div>

				<div class="hight-input-container input-container" :class="{ inputactive: isFocusPasswordInput }">
					<div class="input-part">
						<input
							password="true"
							placeholder-style="font-size:14px;"
							v-model.trim="password"
							@focus="isFocusPasswordInput = true"
							@blur="isFocusPasswordInput = false"
							:placeholder="isFocusPasswordInput ? '' : '请输入密码'"
						/>
					</div>
				</div>

				<div class="more-option">
					<span @tap="goToMoreOption">{{ isRegister ? '忘记密码？' : '注册' }}</span>
				</div>
			</div>
			<div v-else>
				<div v-if="isRegister">
					<div class="low-input-container input-container" :class="{ inputactive: isFocusEmailInput }">
						<div class="input-part">
							<input
								v-model.trim="newUserEmail"
								placeholder-style="font-size:14px;"
								@focus="isFocusEmailInput = true"
								@blur="isFocusEmailInput = false"
								:placeholder="isFocusEmailInput ? '' : '请输入邮箱'"
							/>
						</div>
					</div>
					<div class="input-container verification-code low-input-container" :class="{ inputactive: isFocusCodeInput }">
						<div class="input-part">
							<input
								v-model.trim="newUserCode"
								placeholder-style="font-size:14px;"
								@focus="isFocusCodeInput = true"
								@blur="isFocusCodeInput = false"
								:placeholder="isFocusCodeInput ? '' : '请输入验证码'"
							/>
						</div>
						<div @tap="getVerificationCode(newUserEmail)" v-bind:disabled="canNotGetCodeNow" :class="{ btnactive: canNotGetCodeNow }" class="send-code-btn">
							{{ codeTip }}
						</div>
					</div>
					<div class="low-input-container input-container" :class="{ inputactive: isFocusNameInput }">
						<div class="input-part">
							<input
								v-model.trim="newUserName"
								placeholder-style="font-size:14px;"
								@focus="isFocusNameInput = true"
								@blur="isFocusNameInput = false"
								:placeholder="isFocusNameInput ? '' : '请输入你的用户名'"
							/>
						</div>
					</div>

					<div class="low-input-container input-container" :class="{ inputactive: isFocusPasswordInput }">
						<div class="input-part">
							<input
								password="true"
								placeholder-style="font-size:14px;"
								v-model.trim="newUserPw"
								@focus="isFocusPasswordInput = true"
								@blur="isFocusPasswordInput = false"
								:placeholder="isFocusPasswordInput ? '' : '请输入密码'"
							/>
						</div>
					</div>

					<div class="low-input-container input-container" :class="{ inputactive: isFocusPasswordAgainInput }">
						<div class="input-part">
							<input
								password="true"
								placeholder-style="font-size:14px;"
								v-model.trim="newUserPwAgain"
								@focus="isFocusPasswordAgainInput = true"
								@blur="isFocusPasswordAgainInput = false"
								:placeholder="isFocusPasswordAgainInput ? '' : '请再次输入密码'"
							/>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="low-input-container input-container" :class="{ inputactive: isFocusEmailInput }">
						<div class="input-part">
							<input
								v-model.trim="oldUserEmail"
								placeholder-style="font-size:14px;"
								@focus="isFocusEmailInput = true"
								@blur="isFocusEmailInput = false"
								:placeholder="isFocusEmailInput ? '' : '请输入邮箱'"
							/>
						</div>
					</div>
					<div class="input-container verification-code low-input-container" :class="{ inputactive: isFocusCodeInput }">
						<div class="input-part">
							<input
								v-model.trim="oldUserCode"
								placeholder-style="font-size:14px;"
								@focus="isFocusCodeInput = true"
								@blur="isFocusCodeInput = false"
								:placeholder="isFocusCodeInput ? '' : '请输入验证码'"
							/>
						</div>
						<div @tap="getVerificationCode(oldUserEmail)" v-bind:disabled="canNotGetCodeNow" :class="{ btnactive: canNotGetCodeNow }" class="send-code-btn">
							{{ codeTip }}
						</div>
					</div>

					<div class="low-input-container input-container" :class="{ inputactive: isFocusPasswordInput }">
						<div class="input-part">
							<input
								password="true"
								placeholder-style="font-size:14px;"
								v-model.trim="oldUserPw"
								@focus="isFocusPasswordInput = true"
								@blur="isFocusPasswordInput = false"
								:placeholder="isFocusPasswordInput ? '' : '请输入密码'"
							/>
						</div>
					</div>

					<div class="low-input-container input-container" :class="{ inputactive: isFocusPasswordAgainInput }">
						<div class="input-part">
							<input
								password="true"
								placeholder-style="font-size:14px;"
								v-model.trim="oldUserPwAgain"
								@focus="isFocusPasswordAgainInput = true"
								@blur="isFocusPasswordAgainInput = false"
								:placeholder="isFocusPasswordAgainInput ? '' : '请再次输入密码'"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="login-button" @click="loginClick">
				<div class="button"><icon :name="'icon-arrow-right'" color="#07bbff" size="26"></icon></div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import validate from '@/assets/js/validate';
import { USER_LOGIN, DT_GETALL, UT_GETALL, USER_REGISTER, USER_FORGET_PASSWORD, EMAIL_GET_CAPTCHA } from '@/common/api.js';
import { setHeader } from '@/assets/js/help.js';

export default {
	name: 'loginForm',
	data() {
		return {
			isLogin: true,
			isRegister: true,

			isFocusNameInput: false,
			isFocusEmailInput: false,
			isFocusCodeInput: false,
			isFocusPasswordInput: false,
			isFocusPasswordAgainInput: false,

			email: '',
			password: '',

			newUserEmail: '',
			newUserName: '',
			newUserPw: '',
			newUserPwAgain: '',
			newUserCode: '',

			oldUserEmail: '',
			oldUserPw: '',
			oldUserPwAgain: '',
			oldUserCode: '',

			codeTip: '获取验证码',
			canNotGetCodeNow: false,
			validate1: null,
			validate2: null,
			validate3: null
		};
	},
	components: {},
	mounted() {
		this.initValidate();
		this.initTime();
	},
	methods: {
		changeLoginWay(val) {
			this.isLogin = val;
			this.resetForm();
		},
		goToMoreOption() {
			this.isLogin = false;
			this.isRegister = !this.isRegister;
			this.resetForm();
		},
		resetForm() {
			if (this.isLogin == true) {
				this.email = '';
				this.password = '';
			} else {
				if (this.isRegister == true) {
					this.newUserEmail = '';
					this.newUserName = '';
					this.newUserPw = '';
					this.newUserPwAgain = '';
					this.newUserCode = '';
				} else {
					this.oldUserEmail = '';
					this.oldUserPw = '';
					this.oldUserPwAgain = '';
					this.oldUserCode = '';
				}
			}
		},
		initTime() {
			let old = uni.getStorageSync('verifyOldTime');
			if (old) {
				let now = new Date().getTime();
				if (now - old < 60001) {
					let secords = Math.floor((old - now + 60000) / 1000);
					this.setIntervalTime(secords);
				}
			}
		},
		setIntervalTime(secords) {
			const TIME_COUNT = secords || 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.canNotGetCodeNow = true;
				this.codeTip = TIME_COUNT.toString();
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.canNotGetCodeNow = true;
						this.count--;
						this.codeTip = this.count.toString();
					} else {
						this.canNotGetCodeNow = false;
						clearInterval(this.timer);
						this.timer = null;
						this.codeTip = '获取验证码';
					}
				}, 1000);
			}
		},
		getVerificationCode(email) {
			let old = uni.getStorageSync('verifyOldTime');
			if (old) {
				let now = new Date().getTime();
				if (now - old < 60001) {
					return false;
				}
			}
			if (!email || email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1) {
				uni.showToast({
					title: '请输入正确的邮箱',
					icon: 'none'
				});
				return;
			}
			if (this.canNotGetCodeNow) return;

			EMAIL_GET_CAPTCHA({
				email: email
			})
				.then(result => {
					if (result.data.code == '000001') {
						let time = new Date().getTime();
						uni.setStorageSync('verifyOldTime', time);
						uni.showToast({
							title: '验证码已发送，请注意查收',
							icon: 'none'
						});
						this.setIntervalTime(60);
					}
				})
				.catch(error => {
					uni.showToast({
						title: '出现未知错误，请重试',
						icon: 'none'
					});
				});
		},
		loginClick() {
			if (this.isLogin == true) {
				this.login();
			} else {
				if (this.isRegister) {
					this.register();
				} else {
					this.resetPassword();
				}
			}
		},
		register() {
			const formData = {
				email: this.newUserEmail,
				password: this.newUserPw,
				name: this.newUserName,
				code: this.newUserCode
			};
			let params = {};
			if (this.newUserPwAgain !== this.newUserPw) {
				uni.showToast({
					title: '两次输入的密码不相同',
					icon: 'none'
				});
				return false;
			}
			if (!this.validate1.checkForm(formData)) {
				const error = this.validate1.errorList[0];
				uni.showToast({
					title: error.msg,
					icon: 'none'
				});
				return false;
			}
			uni.showLoading({
				title: 'Loading...',
				mask: true
			});
			USER_REGISTER(formData)
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
		resetPassword() {
			const formData = {
				email: this.oldUserEmail,
				password: this.oldUserPw,
				code: this.oldUserCode
			};
			let params = {};
			if (this.oldUserPw !== this.oldUserPwAgain) {
				uni.showToast({
					title: '两次输入的密码不相同',
					icon: 'none'
				});
				return false;
			}
			if (!this.validate3.checkForm(formData)) {
				const error = this.validate3.errorList[0];
				uni.showToast({
					title: error.msg,
					icon: 'none'
				});
				return false;
			}
			uni.showLoading({
				title: 'Loading...',
				mask: true
			});
			USER_FORGET_PASSWORD(formData)
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
		login() {
			const formData = {
				email: this.email,
				password: this.password
			};
			let params = {};
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

			UT_GETALL({
				params: {
					userId: uni.getStorageSync('userId')
				}
			}).then(result => {
				if (result.data.code == '000001') {
					this.$store.commit('setMyTypes', result.data.data);
				}
			});
		},
		initValidate() {
			let rules = {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 6,
					maxlength: 12
				},
				name: {
					required: true,
					minlength: 1,
					maxlength: 12
				},
				code: {
					required: true
				}
			};
			let messages = {
				email: {
					required: '请输入邮箱',
					email: '请输入正确的邮箱'
				},
				password: {
					required: '请输入密码',
					minlength: '密码要求6~12位',
					maxlength: '密码要求6~12位'
				},
				name: {
					required: '请输入用户名',
					minlength: '用户名要求1~12个字',
					maxlength: '用户名要求1~12个字'
				},
				code: {
					required: '请输入验证码'
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
					minlength: 6,
					maxlength: 12
				}
			};
			messages = {
				email: {
					required: '请输入邮箱',
					email: '请输入正确的邮箱'
				},
				password: {
					required: '请输入密码',
					minlength: '密码要求6~12位',
					maxlength: '密码要求6~12位'
				}
			};
			this.validate2 = new validate(rules, messages);

			rules = {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 6,
					maxlength: 12
				},
				code: {
					required: true
				}
			};
			messages = {
				email: {
					required: '请输入邮箱',
					email: '请输入正确的邮箱'
				},
				password: {
					required: '请输入密码',
					minlength: '密码要求6~12位',
					maxlength: '密码要求6~12位'
				},
				code: {
					required: '请输入验证码'
				}
			};
			this.validate3 = new validate(rules, messages);
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
	flex-direction: column;

	.logo-container {
		height: 130px;
		width: 260px;
		margin-bottom: 40px;

		image {
			height: 100%;
			width: 100%;
		}
	}
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
				min-width: 120px;
				line-height: 30px;
			}

			.login-tip {
				text-align: right;
			}
		}
		.inputs-container {
			margin: 30px 0;
		}

		.low-input-container {
			height: 50px;
			.input-part {
				input {
					height: 50px;
				}
			}
		}
		.hight-input-container {
			height: 60px;
			.input-part {
				input {
					height: 60px;
				}
			}
		}
		.input-container {
			box-sizing: border-box;
			width: 100%;
			border-bottom: 1px solid $border-color-grey;

			.input-part {
				width: 100%;
				display: inline-block;
				box-sizing: border-box;

				input {
					font-size: $font-size-llg;
					border: none;
					width: 100%;
					text-align: center;
					color: $text-color;
					font-family: Barlow-Bold;
				}
			}
		}

		.more-option {
			margin-top: 25px;
			text-align: center;
			font-size: $font-size-sm;
			color: $text-color-grey;
		}

		.verification-code {
			position: relative;

			.send-code-btn {
				z-index: 99;
				position: absolute;
				top: calc(50% - 9px);
				right: 0;
				display: inline-block;
				height: 17px;
				width: 65px;
				font-size: 12px;
				text-align: center;
				line-height: 17px;
				font-weight: Bold;
			}

			.btnactive {
				color: #c7c7c7;
			}
		}

		.inputactive {
			border-bottom: 1px solid $border-color-black;
		}

		.login-button {
			display: flex;
			height: 60px;
			margin-top: 20px;
			justify-content: center;
			align-items: flex-end;

			.button {
				width: 80px;
				height: 40px;
				border-radius: 20px;
				border: 3px solid $system-color-blue;
				box-sizing: border-box;
				background-color: $border-color-black;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
