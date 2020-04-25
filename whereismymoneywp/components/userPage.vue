<template>
	<view>
		<div class="mask" @tap.stop="clickMask" @touchmove.stop="clickMask" v-show="showUserPage"></div>
		<div @tap.stop="" @touchmove.stop="" class="user-container" :class="showUserPage ? 'user-move-in' : 'user-move-out'">
			<div class="avatar"><image mode="aspectFill" :src="userInfo.avatar"></image></div>
			<div class="name">{{ userInfo.name }}</div>
			<div class="userDays">已记账{{ userInfo.useDays }}天</div>
			<div class="settingTip" @tap="goToUrl('/pages/setting')">设置</div>
		</div>
	</view>
</template>

<script>
import { debounce } from '@/assets/js/help.js';
export default {
	data() {
		return {
			clickFunc: null
		};
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo;
		},
		showUserPage() {
			return this.$store.state.system.showUserPage;
		}
	},
	created() {
		this.clickFunc = debounce(() => {
			this.$emit('setShowUserPage');
		}, 300);
	},
	methods: {
		clickMask() {
			this.clickFunc();
		}
	}
};
</script>

<style lang="scss" scoped>
.mask {
	position: fixed;
	z-index: 999999;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: $bg-color-mask;
}

@keyframes move-in {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(268px);
	}
}

@keyframes move-out {
	0% {
		transform: translateX(268px);
	}
	100% {
		transform: translateX(0);
	}
}

.user-move-out {
	animation: move-out 0.3s ease-out;
	animation-fill-mode: forwards;
}

.user-move-in {
	animation: move-in 0.3s ease-out;
	animation-fill-mode: forwards;
}

.user-container {
	position: fixed;
	z-index: 1000000;
	width: 268px;
	height: 100vh;
	top: 0;
	left: -268px;
	background-color: $bg-color;
	padding-left: 20px;
	color: $text-color;
	.avatar {
		margin: 50px 0 10px 0;

		image {
			height: 40px;
			width: 40px;
			border-radius: 20px;
		}
	}

	.name {
		font-size: $font-size-lg;
		line-height: 24px;
	}
	.userDays {
		font-size: $font-size-ssm;
		margin-bottom: 40px;
	}
	.settingTip {
		font-size: $font-size-base;
		font-weight: bold;
	}
}
</style>
