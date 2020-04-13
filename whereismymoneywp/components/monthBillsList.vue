<template>
	<view class="container">
		<div class="title">分类统计</div>

		<div v-for="item in monthList" :key="item.id" class="bill-item" :style="{ height: item.incomeSum != 0 && item.outcomeSum != 0 ? '50px' : '40px' }">
			<div class="time">{{ selectedDateInfo.month }}-{{ item.day }}</div>
			<div class="amount-container">
				<div v-if="item.outcomeSum && item.outcomeSum != 0" class="amount outcome-color">{{ item.outcomeSum }}</div>
				<div v-if="item.incomeSum && item.incomeSum != 0" class="amount income-color">{{ item.incomeSum }}</div>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		monthList() {
			return this.$store.state.billData.monthList;
		},
		selectedDateInfo() {
			return this.$store.state.selectedDateInfo;
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	width: calc(100% - 30px);
	margin: 25px 15px;
	background: #ffffff;
	border-radius: $border-radius-sm;
	box-shadow: $box-shadow-box;

	.title {
		color: $text-color-balck;
		font-size: $font-size-base;
		height: 35px;
		line-height: 35px;
		text-align: center;
	}

	.bill-item {
		height: 40px;
		width: 100%;
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid $bg-color-grey;

		.time {
			font-size: $font-size-sm;
			color: $text-color;
		}

		.amount-container {
			height: 100%;
			width: 80px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			.amount {
				height: 17px;
				line-height: 17px;
				font-size: $font-size-sm;
			}
		}
	}
	.income-color {
		color: $system-color-green;
	}

	.outcome-color {
		color: $system-color-red;
	}
}
</style>
