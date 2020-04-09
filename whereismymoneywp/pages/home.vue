<template>
	<view class="home-container">
		<cu-custom @setShowUserPage="setShowUserPage" :isBack="false">
			<div slot="content">
				<picker mode="date" fields="month" class="data-container" start="2000-01-01" end="2040-12-30" @change="DateChange">
					{{ date }}
					<icon class="icon" name="arrow-down" color="#333333" size="16"></icon>
				</picker>
			</div>
		</cu-custom>

		<swiper :current="TabCur" class="swiper-container" :style="swiperHeightGen" :duration="200" @change="swiperTab">
			<swiper-item>
				<mescroll-uni :up="upOption" :down="downOption" @down="trendDownCB">
					<income-month-sum></income-month-sum>
					<day-bills-list></day-bills-list>
					<day-bills-list></day-bills-list>
				</mescroll-uni>
			</swiper-item>
			<swiper-item>
				<mescroll-uni :up="upOption" :down="downOption" @down="trendDownCB">
					<income-sum></income-sum><income-parts></income-parts>
					
				</mescroll-uni>
			</swiper-item>
		</swiper>
		<view class="fixed-btn" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></view>

		<user-page @setShowUserPage="setShowUserPage"></user-page>
	</view>
</template>

<script>
import { USER_GET_INFO, DT_GETALL, UT_GETALL } from '@/common/api.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import userPage from '@/components/userPage.vue';
import incomeSum from '@/components/incomeSum.vue';
import incomeParts from '@/components/incomeParts.vue';
import incomeMonthSum from '@/components/incomeMonthSum.vue';
import dayBillsList from '@/components/dayBillsList.vue';

export default {
	data() {
		return {
			downOption: {
				fps: 90
				// downTipOff: '-60px'
			},
			upOption: {
				use: false
			},
			date: '',
			TabCur: 0
		};
	},
	computed: {
		userId() {
			return this.$store.state.userInfo.id;
		},
		statusBarHeight() {
			return `${this.StatusBar}px`;
		},
		swiperHeightGen() {
			return `height: calc(100vh - 44px - ${this.statusBarHeight});top: calc(${this.statusBarHeight} + 44px)`;
		},
		navHeight() {
			return `${this.StatusBar + 40}px`;
		}
	},
	components: {
		MescrollUni,
		userPage,
		incomeSum,
		incomeParts,
		incomeMonthSum,
		dayBillsList
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
		swiperTab: function(e) {
			this.TabCur = e.detail.current;
		},
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
		trendDownCB(mescroll) {
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

.swiper-container {
	background-color: #fff;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	position: fixed;
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
