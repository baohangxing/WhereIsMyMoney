<template>
	<view class="home-container">
		<mescroll-body :up="upOption" :down="downOption" @down="downCB"><div style="width:100%" :style="{ height: navHeight }"></div></mescroll-body>

		<cu-custom @setShowUserPage="setShowUserPage" :isBack="false">
			<div slot="content">
				<picker mode="date" fields="month" class="data-container" start="2000-01-01" end="2040-12-30" @change="DateChange">
					{{ date }}
					<icon class="icon" name="arrow-down" color="#333333" size="16"></icon>
				</picker>
			</div>
		</cu-custom>

		<view class="fixed-btn" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></view>
		<user-page @setShowUserPage="setShowUserPage"></user-page>
	</view>
</template>

<script>
import { USER_GET_INFO, DT_GETALL, UT_GETALL } from '@/common/api.js';
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
import userPage from '@/components/userPage.vue';

export default {
	data() {
		return {
			downOption: {
				fps: 90,
				downTipOff: '-60px'
			},
			upOption: {
				use: false
			},
			date: ''
		};
	},
	computed: {
		userId() {
			return this.$store.state.userInfo.id;
		},
		navHeight() {
			return `${this.StatusBar + 40}px`;
		}
	},
	components: {
		MescrollBody,
		userPage
	},
	onLoad() {
		if (!uni.getStorageSync('accessToken')) {
			uni.navigateTo({
				url: '/pages/login'
			});
		}
	},
	created() {
		this.initData();
		this.initDate();
	},
	methods: {
		initDate() {
			let time = new Date();
			let m = time.getMonth() + 1;
			this.date = m.toString() + '月';
		},
		DateChange(e) {
			let value = e.detail.value;
			let date = '';
			if (value.substr(0, 4) == new Date().getFullYear()) {
				let arr = value.substr(5).split('-');
				this.date = Number(arr[0]) + '月';
			} else {
				let arr = value.substr(2).split('-');
				this.date = arr[0] + '年' + Number(arr[1]) + '月';
			}
		},
		setShowUserPage() {
			this.$store.commit('setShowUserPage');
		},
		goToAddBill() {
			uni.navigateTo({
				url: '/pages/addBill'
			});
		},
		downCB(mescroll) {
			mescroll.endSuccess();
		},
		initData() {
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

.data-container {
	height: 24px;
	display: inline-block;
	line-height: 24px;
	color: $text-color;
	font-size: $font-size-lllg;

	.icon {
		margin: 3px 0 0 6px;
		vertical-align: top;
	}
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
