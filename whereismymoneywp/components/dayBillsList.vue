<template>
	<view class="container">
		<div class="title">
			<div class="date">{{ '12.06' }}</div>
			<div class="amount">
				<span>支：</span>
				<span class="outcome-color">{{ '25.50' }}</span>
				<span class="margin-line">收：</span>
				<span class="income-color">{{ '150.00' }}</span>
			</div>
		</div>

		<div v-for="(item, index) in 5" :key="index" class="bill-item">
			<div class="type-contianer">
				<div class="point-tip" :class="index == 1 || index == 2 ? 'income-point' : 'outcome-point'"></div>
				<div class="info-container">
					<div class="type">{{ '收红包' }}</div>
					<div class="tip" v-if="index == 1">{{ '111111111111111' }}</div>
				</div>
			</div>
			<div class="amount" :class="index == 1 || index == 2 ? 'income-color' : 'outcome-color'">{{ '17.00' }}</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
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
		border-bottom: 1px solid $bg-color-grey;

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

	.bill-item:last-child {
		border-bottom: none;
	}
	.income-color {
		color: $system-color-green;
	}

	.outcome-color {
		color: $system-color-red;
	}
}
</style>
