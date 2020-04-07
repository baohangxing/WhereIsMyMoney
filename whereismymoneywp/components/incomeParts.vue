<template>
	<view class="sum-container">
		<div class="title">分类统计</div>

		<div class="circle-container"></div>
		<div class="items-container">
			<div class="item-container" v-for="item in 6">
				<icon :name="'type_food'" color="#07bbff" size="26"></icon>
				<div class="type-container">
					<div class="item-type">收入</div>
					<div class="type-line"></div>
					<div class="type-line-color-cover" :style=""></div>
				</div>

				<div class="item-amount">{{ '1222.00' }}</div>
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
		sumParts: {
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
	background: #ffffff;
	border-radius: $border-radius-sm;
	box-shadow: $box-shadow-box;

	.title {
		color: $text-color-balck;
		font-size: $font-size-base;
		height: 35px;
		line-height: 20px;
		text-align: center;
		padding-top: 15px;
	}

	.circle-container {
		width: 100%;
		height: 200px;
	}

	.items-container {
		width: 100%;
		padding: 0 10px;
		margin-bottom: 6px;

		.item-container {
			height: 26px;
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			color: $text-color;
			.item-title {
				color: $text-color-litte-grey;
				font-size: $font-size-ssm;
				line-height: 14px;
			}

			.type-container {
				margin: 0 10px;
				flex-grow: 1;
				.item-type {
					font-size: $font-size-ssm;
					line-height: 14px;
					margin-bottom: 5px;
				}

				.type-line {
					width: 100%;
					height: 2px;
					border-radius: 1px;
					background-color: #a8a3a3;
				}

				.type-line-color-cover {
					height: 2px;
					width: 20%;
					border-radius: 1px;
					background-color: #f22c47;
					transform: translateY(-2px);
				}
			}

			.item-amount {
				font-size: $font-size-sm;
			}
		}
	}
}
</style>
