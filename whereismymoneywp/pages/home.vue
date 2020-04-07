<template>
	<view class="home-container">
		<cu-custom isBack="true"><view slot="content">收入</view></cu-custom>

		<div class="scroll-container">
			<mescroll-uni :down="downOption" @down="schoolDownCB" @up="upCallback">
				<income-sum></income-sum>
				<income-parts></income-parts>
			</mescroll-uni>
		</div>

		<view class="fixed-btn" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></view>
	</view>
</template>

<script>
import { USER_GET_INFO, DT_GETALL, UT_GETALL } from '@/common/api.js';
import incomeSum from '@/components/incomeSum.vue';
import incomeParts from '@/components/incomeParts.vue';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';

export default {
	data() {
		return {
			downOption: {
				fps: 90
			}
		};
	},
	computed: {
		userId() {
			return this.$store.state.userInfo.id;
		}
	},
	components: {
		incomeSum,
		incomeParts,
		MescrollUni
	},
	onLoad() {
		if (!uni.getStorageSync('accessToken')) {
			uni.navigateTo({
				url: '/pages/login'
			});
		}
	},
	created() {
		this.initDate();
	},
	methods: {
		goToAddBill() {
			uni.navigateTo({
				url: '/pages/addBill'
			});
		},
		schoolDownCB() {},
		upCallback() {},
		initDate() {
			if (!this.$store.state.userInfo.id) {
				USER_GET_INFO({ id: uni.getStorageSync('userId') }).then(result => {
					if (result.data.code == '000001') {
						this.$store.commit('setUserInfo', result.data.data);
					}
				});
			}
			if (!this.$store.state.system.types) {
				DT_GETALL().then(result => {
					if (result.data.code == '000001') {
						this.$store.commit('setTypes', result.data.data);
					}
				});
			}
			if (!this.$store.state.system.myTypes) {
				UT_GETALL().then(result => {
					if (result.data.code == '000001') {
						this.$store.commit('setMyTypes', result.data.data);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.home-container {
	background-color: $bg-color-grey;
}

.scroll-container {
	height: calc(100vh - 64px);
	width: 100vw;
}

.fixed-btn {
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 44px;
	width: 44px;
	height: 44px;
	background: $system-color-blue;
	box-shadow: $box-shadow-btn;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: $border-radius-circle;
	z-index: 999;
}
</style>
