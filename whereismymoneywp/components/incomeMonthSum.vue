<template>
	<view class="sum-container">
		<div class="item-container align-center">
			<div class="item-title">{{ sumData.month || 12 }}结余</div>
			<div class="item-smount">{{ sumData.income || '+1222.00' }}</div>
		</div>
		<div class="items-container">
			<div class="item-container">
				<div class="item-title">月收入</div>
				<div class="item-smount">{{ sumData.income || '2222.00' }}</div>
			</div>
			<div class="item-container">
				<div class="item-title">月支出</div>
				<div class="item-smount">{{ sumData.income || '1000.00' }}</div>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		sumData: {
			type: Object,
			default: {}
		}
	}
};
</script>

<style lang="scss" scoped>
.sum-container {
	width: calc(100% - 30px);
	margin: 20px 15px 15px 15px;
	height: 100px;
	background: #ffffff;
	border-radius: $border-radius-sm;
	box-shadow: $box-shadow-box;

	.items-container {
		height: 100px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		align-items: flex-start;
	}
	
	.align-center{
		margin: 0 auto;
	}
	
	.item-container {
		height: 50px;
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.item-title {
			color: $text-color-litte-grey;
			font-size: $font-size-ssm;
			line-height: 14px;
		}

		.item-smount {
			color: $text-color;
			font-size: $font-size-lg;
			line-height: 26px;
			font-weight: bold;
			font-family: Barlow-Bold;
		}
	}
}
</style>
