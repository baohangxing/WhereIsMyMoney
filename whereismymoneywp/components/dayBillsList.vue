<template>
	<view class="container">
		<div class="title">
			<div class="date">{{ formatDate(billData.time) }}</div>
			<div class="amount">
				<span>支：</span>
				<span class="outcome-color">{{ formatMoney(billData.outcomeSum) }}</span>
				<span class="margin-line">收：</span>
				<span class="income-color">{{ formatMoney(billData.incomeSum) }}</span>
			</div>
		</div>

		<div v-for="item in billData.billList" :key="item.id" class="bill-item" :style="{height:item.description? '50px':'40px'}" @tap="setShowUserPage(item)">
			<div class="type-contianer">
				<div class="point-tip" :class="item.type == 1 ? 'income-point' : 'outcome-point'"></div>
				<div class="info-container">
					<div class="type">{{ getTypeName(item.typeId, item.type, item.defaultType) }}</div>
					<div class="tip" v-if="item.description">{{ item.description }}</div>
				</div>
			</div>
			<div class="amount" :class="item.type == 1 ? 'income-color' : 'outcome-color'">{{ formatMoney(item.amount) }}</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		billData: {
			type: Object,
			default () {
				return null;
			},
		}
	},
	computed: {
		dateInfo() {
			return this.$store.state.dateInfo;
		}
	},
	methods: {
		setShowUserPage(item) {
			this.$store.commit('selectedBillItem', item);
		},
		formatDate(time) {
			let timeArr = time.split('-');
			if (timeArr[0] == this.dateInfo.year && timeArr[1] == this.dateInfo.month && timeArr[2] == this.dateInfo.day) {
				return timeArr[1] + '.' + timeArr[2] + '  今天';
			}
			let timepnow = new Date(this.dateInfo.year, this.dateInfo.month, this.dateInfo.day).getTime();
			let timep = new Date(timeArr[0], timeArr[1], timeArr[2]).getTime();
			let timeMinus = timepnow - timep;
			if (timeMinus > 0 && timeMinus <= 60 * 60 * 24 * 1000) {
				return timeArr[1] + '.' + timeArr[2] + '  昨天';
			} else if (timeMinus > 0 && timeMinus <= 60 * 60 * 24 * 1000 * 2) {
				return timeArr[1] + '.' + timeArr[2] + '  前天';
			}

			return timeArr[1] + '.' + timeArr[2] + '  星期' + '日一二三四五六'.charAt(new Date(timeArr[0], timeArr[1]-1, timeArr[2]).getDay());
		}
	}
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
		height: 30px;
		width: 100%;
		padding: 0 20px 0 13px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: $font-size-sm;
		font-weight: bold;
		letter-spacing: 1px;

		.amount {
			font-family: Barlow-Bold;
			.margin-line {
				margin-left: 15px;
			}
		}
	}

	.bill-item {
		height: 40px;
		width: 100%;
		padding: 0 20px 0 13px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid $bg-color-grey;

		.type-contianer {
			height: 100%;
			width: 150px;
			display: flex;
			align-items: center;

			.point-tip {
				height: 4px;
				width: 4px;
				border-radius: $border-radius-circle;
				margin: 0 10px 0 1px;
			}

			.income-point {
				background-color: $system-color-green;
			}

			.outcome-point {
				background-color: $system-color-red;
			}
			.info-container {
				height: 100%;
				width: 135px;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.type {
					height: 17px;
					line-height: 17px;
					font-size: $font-size-sm;
					color: $text-color;
				}

				.tip {
					height: 14px;
					line-height: 14px;
					font-size: $font-size-sm;
					color: $text-color-litte-grey;
				}
			}
		}
		.amount {
			font-size: $font-size-sm;
			font-weight: bold;
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
