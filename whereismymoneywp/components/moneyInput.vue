<template>
	<view>
		<view class="input-container">
			<div class="top">
				<picker mode="date" class="top-item" start="2000-01-01" end="2040-12-30" @change="DateChange">{{ date }}</picker>
				<div class="top-item tip" @tap="openTipInput">{{ shortifyContent(tipSave, 8) || '备注' }}</div>
				<div class="input-number">{{ showNumber }}</div>
			</div>
			<div class="container">
				<div class="left-container">
					<div v-for="(item, index) in leftItems" class="left-item" :key="index" @tap="tapNumber(item)">{{ item }}</div>
				</div>
				<div class="right-container">
					<div v-for="(item, index) in rightItems" class="right-item" :key="index" @tap="tapOption(item)">{{ item }}</div>
				</div>
			</div>
		</view>
		<div class="tip-input-container" v-if="showTipInput">
			<div class="tip">备注</div>
			<input v-model="tip" />
			<div class="btn-container">
				<div class="close-btn" @tap="closleTipInput">取消</div>
				<div class="confirm-btn" @tap="confirnTipInput">确定</div>
			</div>
		</div>
		<div class="md-overlay" v-if="showTipInput" @touchmove.stop.prevent="closleTipInput" @tap="closleTipInput"></div>
	</view>
</template>

<script>
import { dateFormat } from '@/assets/js/help.js';

export default {
	data() {
		return {
			leftItems: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '.'],
			rightItems: ['删除', '清零', '再记', '保存'],
			number: '0',
			tip: '',
			tipSave: '',
			date: '',
			showTipInput: false
		};
	},
	created() {
		this.initDate();
	},
	computed: {
		showNumber() {
			let sum = 0;
			let arr = this.number.split('+');
			for (let i = 0; i < arr.length - 1; i++) {
				sum += Number(arr[i]);
			}
			let lastAdd = this.number.lastIndexOf('+');

			if (arr.length >= 3) {
				return sum.toString() + this.number.substr(lastAdd);
			} else {
				return this.number;
			}
		}
	},
	methods: {
		resetData() {
			this.tip = '';
			this.number = '0';
			this.tipSave = '';
			this.showTipInput = false;
		},
		setData(data) {
			this.tip = data.description || '';
			this.number = Number(data.amount).toString() || '0';
			this.tipSave = data.description || '';
			this.showTipInput = false;

			this.setDateValue(data.time.substr(0, 10));
		},
		setDateValue(value) {
			if (value.substr(0, 4) == new Date().getFullYear()) {
				let arr = value.substr(5).split('-');
				this.date = Number(arr[0]) + '-' + Number(arr[1]);
			} else {
				let arr = value.substr(2).split('-');
				this.date = arr[0] + '-' + Number(arr[1]) + '-' + Number(arr[2]);
			}
		},
		DateChange(e) {
			this.setDateValue(e.detail.value);
		},
		initDate() {
			let time = new Date();
			let m = time.getMonth() + 1;
			let d = time.getDate();
			this.date = m.toString() + '-' + d.toString();
		},
		tapNumber(number) {
			if (number == '+') {
				if (this.number.substr(-1) != '+' && this.number.substr(-1) != '.') this.number += number;
			} else if (number == '.') {
				if (
					!this.number
						.split('+')
						.pop()
						.includes('.')
				)
					this.number += number;
			} else {
				if (this.number == '0') {
					this.number = number;
				} else {
					this.number += number;
				}
			}
		},
		closleTipInput() {
			this.showTipInput = false;
			this.tip = this.tipSave;
		},
		openTipInput() {
			this.showTipInput = true;
		},
		confirnTipInput() {
			this.tipSave = this.tip;
			this.closleTipInput();
		},
		tapOption(option) {
			switch (option) {
				case '删除':
					if (this.number.length == 1) {
						this.number = '0';
					} else {
						this.number = this.number.substr(0, this.number.length - 1);
					}
					break;
				case '清零':
					this.number = '0';
					break;
				case '再记':
					this.$emit('saveAndWrite', this.getData());
					break;
				case '保存':
					this.$emit('save', this.getData());
					break;
				default:
					break;
			}
		},
		getData() {
			let data = {};
			data.tip = this.tipSave;

			let sum = 0;
			let arr = this.number.split('+');
			for (let i = 0; i < arr.length; i++) {
				sum += Number(arr[i]);
			}
			data.money = sum;

			let dateArr = this.date.split('-');
			if (dateArr.length == 2) {
				dateArr.unshift(new Date().getFullYear().toString());
			} else {
				dateArr[0] = '20' + dateArr[0];
			}

			data.date = dateFormat(dateArr[0], dateArr[1], dateArr[2]);
			return data;
		}
	}
};
</script>

<style lang="scss" scoped>
.input-container {
	position: fixed;
	bottom: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
	left: 0;
	height: 224px;
	width: 100vw;
	background-color: $bg-color;
	box-shadow: $box-shadow-up;

	.top {
		height: 44px;
		width: 100%;
		padding: 0 13px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(168, 163, 163, 0.1);

		.top-item {
			padding: 0 15px;
			height: 20px;
			background: $bg-color-deep-grey;
			border-radius: 10px;
			margin: 0 5px;
			line-height: 20px;
			display: inline-block;
			font-size: $font-size-ssm;
			color: $text-color;
			flex-shrink: 0;
		}

		.input-number {
			height: 30px;
			width: 180px;
			margin-left: auto;
			margin-right: 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			line-height: 30px;
			text-align: right;
			font-size: $font-size-lg;
			font-family: Barlow-SemiBoldItalic;
			font-weight: 600;
			color: $text-color;
		}
	}

	.container {
		display: flex;
		height: 180px;
		width: 100%;
		padding-top: 4px;

		.left-container {
			display: flex;
			height: 170px;
			width: 75%;
			flex-wrap: wrap;
			align-content: flex-start;

			.left-item {
				width: 33.333%;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;

				font-size: $font-size-llg;
				font-family: Barlow-SemiBoldItalic;
				font-weight: 600;
				color: $text-color;
			}
		}

		.right-container {
			display: flex;
			flex-direction: column;
			height: 170px;
			width: 18%;

			.right-item {
				width: 100%;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: $font-size-sm;
				color: $text-color;
			}

			.right-item:last-child {
				color: $system-color-red;
			}
		}
	}
}

.md-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99999;
}

.tip-input-container {
	position: fixed;
	top: 200px;
	left: 50%;
	transform: translateX(-50%);
	width: 240px;
	z-index: 999999;
	padding: 25px 20px;
	background-color: $bg-color;
	border-radius: $border-radius-sm;
	box-sizing: border-box;
	.tip {
		font-size: $font-size-base;
		font-weight: 600;
		margin-bottom: 15px;
		margin-left: 5px;
	}

	input {
		height: 30px;
		width: 200px;
		margin-bottom: 15px;
		border-bottom: 1px solid $system-color-blue;
		font-size: $font-size-base;
		color: $text-color;
	}
	.btn-container {
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;

		.close-btn {
			line-height: 40px;
			color: $text-color;
			padding: 0 10px;
			margin-left: auto;
			margin-right: 10px;
			font-size: $font-size-sm;
		}
		.confirm-btn {
			line-height: 40px;
			color: $system-color-blue;
			padding: 0 10px;
			margin-right: 5px;
			font-size: $font-size-sm;
		}
	}
}
</style>
