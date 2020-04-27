<template>
	<view class="setting-container">
		<cu-custom><view slot="content">设置</view></cu-custom>
		<div class="option-contaienr" @tap="copyEmail">
			<span>联系我</span>
			<span>{{ email }}</span>
		</div>
		<div class="option-contaienr">
			<span>版本号</span>
			<span>{{ version }}</span>
		</div>
		<div class="option-contaienr">
			<span>官网</span>
			<span>{{ link }}</span>
		</div>
		<div @tap="logout" class="logout-container"><span>退出登录</span></div>
	</view>
</template>

<script>
import config from '@/config/index.js';
export default {
	data() {
		return {
			email: config.contactEmail,
			version: config.AppVersion,
			link: config.webLink
		};
	},
	methods: {
		logout() {
			this.$store.dispatch('clearStateData');
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/login'
			});
		},
		copyEmail() {
			uni.setClipboardData({
				data: this.email
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.setting-container {
	width: 100vw;
	background-color: $bg-color-grey;
	min-height: 100vh;
	.option-contaienr {
		padding: 0 20px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color;
		background-color: $bg-color;
		border-bottom: 1px solid $border-color-grey;
	}

	.logout-container {
		position: fixed;
		bottom: 50px;
		left: 35px;
		width: calc(100vw - 70px);
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: $box-shadow-box;
		background-color: $bg-color-deep-grey;
		border-radius: $border-radius-base;

	}
}
</style>
