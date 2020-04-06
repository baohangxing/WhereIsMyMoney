<template>
	<view>
		<view class="fixed-btn" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		useId() {
			return this.$store.state.userInfo.id;
		}
	},
	onLoad() {
		if (!uni.getStorageSync('accessToken')) {
			uni.navigateTo({
				url: '/pages/login'
			});
		}
	},
	methods: {
		goToAddBill() {
			uni.navigateTo({
				url: '/pages/addBill'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.fixed-btn {
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 44px;
	width: 44px;
	height: 44px;
	background: #07bbff;
	box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.16);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
}
</style>
