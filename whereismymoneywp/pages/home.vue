<template>
	<view class="home-container">
		<cu-custom @setShowUserPage="setShowUserPage" :isBack="false">
			<div slot="content">
				<picker mode="date" fields="month" class="data-container" start="2000-01-01" end="2040-12-30" @change="DateChange">
					{{ selectedDateInfo.year != dateInfo.year ? showYear + '-' : '' }}{{ selectedDateInfo.month }}月
					<icon class="icon" name="arrow-down" color="#333333" size="16"></icon>
				</picker>
			</div>
		</cu-custom>

		<swiper :current="TabCur" class="swiper-container" :style="swiperHeightGen" :duration="200" @change="swiperTab">
			<swiper-item>
				<mescroll-uni :up="upOption" :down="downOption" @down="trendDownCB">
					<income-month-sum></income-month-sum>
					<day-bills-list v-for="(item, index) in monthList" :billData="item"></day-bills-list>
				</mescroll-uni>
			</swiper-item>
			<swiper-item>
				<mescroll-uni :up="upOption" :down="downOption" @down="trendDownCB">
					<income-sum></income-sum>
					<income-parts></income-parts>
				</mescroll-uni>
			</swiper-item>
		</swiper>
		<view class="fixed-btn" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></view>

		<user-page @setShowUserPage="setShowUserPage"></user-page>
		<pop-up-selected-bill></pop-up-selected-bill>
	</view>
</template>

<script>
import { USER_GET_INFO, DT_GETALL, UT_GETALL, BILL_GET_GROUP0BY_TYPE, BILL_GET_MY_SUM, BILL_GET_GROUP0BY_MONTH } from '@/common/api.js';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import userPage from '@/components/userPage.vue';
import incomeSum from '@/components/incomeSum.vue';
import incomeParts from '@/components/incomeParts.vue';
import incomeMonthSum from '@/components/incomeMonthSum.vue';
import dayBillsList from '@/components/dayBillsList.vue';
import popUpSelectedBill from '@/components/popUpSelctedBill.vue'

export default {
	data() {
		return {
			downOption: {
				fps: 90,
				auto: true
			},
			upOption: {
				use: false
			},
			TabCur: 0,
			typeSelected: 1
		};
	},
	computed: {
		statusBarHeight() {
			return `${this.StatusBar}px`;
		},
		swiperHeightGen() {
			return `height: calc(100vh - 44px - ${this.statusBarHeight});top: calc(${this.statusBarHeight} + 44px)`;
		},
		navHeight() {
			return `${this.StatusBar + 40}px`;
		},
		dateInfo() {
			return this.$store.state.dateInfo;
		},
		selectedDateInfo() {
			return this.$store.state.selectedDateInfo;
		},
		showYear() {
			return this.selectedDateInfo.year.toString().substr(2, 2);
		},
		monthList() {
			return this.$store.state.billData.monthList;
		}
	},
	components: {
		MescrollUni,
		userPage,
		incomeSum,
		incomeParts,
		incomeMonthSum,
		dayBillsList,
		popUpSelectedBill
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
	},
	methods: {
		swiperTab: function(e) {
			this.TabCur = e.detail.current;
		},
		DateChange(e) {
			let value = e.detail.value;
			let arr = value.split('-');
			let data = {
				year: arr[0],
				month: Number(arr[1])
			};
			this.$store.commit('setSelectedDateInfo', data);
			this.trendDownCB();
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
			if (this.TabCur == 0) {
				BILL_GET_MY_SUM({
					params: {
						userId: uni.getStorageSync('userId'),
						year: this.selectedDateInfo.year,
						month: this.selectedDateInfo.month
					}
				})
					.then(result => {
						if (result.data.code == '000001') {
							this.$store.commit('setSumData', result.data.data);
							if (mescroll) mescroll.endSuccess();
						} else {
							if (mescroll) mescroll.endErr();
						}
					})
					.catch(e => {
						if (mescroll) mescroll.endErr();
					});

				BILL_GET_GROUP0BY_MONTH({
					params: {
						userId: uni.getStorageSync('userId'),
						year: this.selectedDateInfo.year,
						month: this.selectedDateInfo.month
					}
				})
					.then(result => {
						if (result.data.code == '000001') {
							this.$store.commit('setMonthList', result.data.data);
							if (mescroll) mescroll.endSuccess();
						} else {
							if (mescroll) mescroll.endErr();
						}
					})
					.catch(e => {
						if (mescroll) mescroll.endErr();
					});
			} else {
				BILL_GET_GROUP0BY_TYPE({
					params: {
						userId: uni.getStorageSync('userId'),
						year: this.selectedDateInfo.year,
						month: this.selectedDateInfo.month,
						type: this.typeSelected
					}
				})
					.then(result => {
						if (result.data.code == '000001') {
							this.$store.commit('setTypeList', result.data.data);
							if (mescroll) mescroll.endSuccess();
						} else {
							if (mescroll) mescroll.endErr();
						}
					})
					.catch(e => {
						if (mescroll) mescroll.endErr();
					});
			}
		},
		initData() {
			if (!this.$store.state.userInfo.id) {
				USER_GET_INFO({ id: uni.getStorageSync('userId') }).then(result => {
					if (result.data.code == '000001') {
						this.$store.commit('setUserInfo', result.data.data);
					}
				});
			}
			if (this.$store.state.system.types.outTypeList.length == 0 || this.$store.state.system.types.inTypeList.length == 0) {
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
