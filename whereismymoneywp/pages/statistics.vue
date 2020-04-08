<template>
	<view class="container">
		<mescroll-body :up="upOption" :down="downOption" @down="downCB">
			<div style="width:100%" :style="{ height: navHeight }"></div>
			<income-sum></income-sum>
			<income-parts></income-parts>
		</mescroll-body>

		<cu-custom>
			<div slot="content">
				<picker mode="date" fields="month" class="data-container" start="2000-01-01" end="2040-12-30" @change="DateChange">
					{{ date }}
					<icon class="icon" name="arrow-down" color="#333333" size="16"></icon>
				</picker>
			</div>
		</cu-custom>
	</view>
</template>

<script>
import {} from '@/common/api.js';
import incomeSum from '@/components/incomeSum.vue';
import incomeParts from '@/components/incomeParts.vue';
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';

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
		incomeSum,
		incomeParts,
		MescrollBody
	},
	created() {
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
		goToAddBill() {
			uni.navigateTo({
				url: '/pages/addBill'
			});
		},
		downCB(mescroll) {
			mescroll.endSuccess();
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
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
</style>
