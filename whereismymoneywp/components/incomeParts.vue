<template>
	<view class="sum-container">
		<div class="title">分类统计</div>
		<div class="type-select-container">
			<div class="box" @tap="changeTypeSelected(0)" :class="{ 'outcome-container': typeSelected == 0 }">支出</div>
			<div class="box" @tap="changeTypeSelected(1)" :class="{ 'income-contaienr': typeSelected == 1 }">收入</div>
		</div>

		<div class="circle-container"><canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas></div>

		<div class="items-container">
			<div class="item-container" v-for="item in typeList">
				<icon :name="getTypeIcon(item.typeId, typeSelected, item.defaultType)" size="26"></icon>
				<div class="type-container">
					<div class="item-type">{{ getTypeName(item.typeId, typeSelected, item.defaultType) }}</div>
					<div class="type-line"></div>
					<div class="type-line-color-cover" :style="{ width: (Number(item.Sum) / typeSum) * 100 + '%' }"></div>
				</div>

				<div class="item-amount">{{ item.Sum }}</div>
			</div>
		</div>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
var _self;
var canvaRing = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			typeSelected: 0
		};
	},
	computed: {
		typeList() {
			if (this.typeSelected == 0) {
				return this.$store.state.billData.typeList.outList.sort(function(item1, item2) {
					return item2.Sum - item1.Sum;
				});
			} else {
				return this.$store.state.billData.typeList.inList.sort(function(item1, item2) {
					return item2.Sum - item1.Sum;
				});
			}
		},
		typeSum() {
			let sum = 0;
			this.typeList.forEach(item => {
				sum += Number(item.Sum);
			});
			return sum;
		},
		chartData() {
			let data = [];
			this.typeList.forEach(item => {
				data.push({
					name: this.getTypeName(item.typeId, this.typeSelected, item.defaultType),
					data: item.Sum
				});
			});
			return data;
		}
	},
	created() {
		_self = this;
		this.cWidth = uni.upx2px(600);
		this.cHeight = uni.upx2px(500);
	},
	props: {
		sumParts: {
			type: Object,
			default () {
				return null;
			},
		}
	},
	methods: {
		changeTypeSelected(value) {
			if (value == this.typeSelected) return;
			this.typeSelected = value;
		},
		showRing(canvasId) {
			canvaRing = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				legend: true,
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 25 * _self.pixelRatio,
						labelWidth: 15
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: this.chartData,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				disablePieStroke: true,
				dataLabel: true
			});
		},
		touchRing(e) {
			canvaRing.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		}
	},
	watch: {
		typeList() {
			_self.showRing('canvasRing');
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

	.type-select-container {
		height: 40px;
		margin-bottom: 10px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.box {
			width: 40px;
			height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10px;
			background-color: $bg-color-deep-grey;
			color: $text-color;
			font-size: $font-size-sm;
			margin: 0 10px;
		}

		.income-contaienr {
			background-color: $system-color-blue;
			color: $bg-color;
		}

		.outcome-container {
			background-color: $system-color-red;
			color: $bg-color;
		}
	}
	.circle-container {
		width: 100%;
		height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;

		canvas {
			width: 300px;
			height: 250px;
		}
	}

	.items-container {
		width: 100%;
		padding: 0 10px 6px 10px;

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
