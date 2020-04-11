<template>
	<view class="sum-container">
		<div class="title">收支总览</div>
		<div class="items-container">
			<div class="item-container">
				<div class="item-title">收入</div>
				<div class="item-smount">{{ sumData.incomeSum }}</div>
			</div>
			<div class="item-container">
				<div class="item-title">支出</div>
				<div class="item-smount">{{ sumData.outcomeSum }}</div>
			</div>
			<div class="item-container">
				<div class="item-title">结余</div>
				<div class="item-smount">{{ sumLeft }}</div>
			</div>
			<div class="item-container">
				<div class="item-title">每天平均支出</div>
				<div class="item-smount">{{ dayOut }}</div>
			</div>
		</div>
	</view>
</template>

<script>
import {getHowManyDays} from '@/assets/js/help.js'


export default {
	data() {
		return {

		};
	},
	computed:{
		sumData() {
			return this.$store.state.billData;
		},
		sumLeft() {
			return (this.sumData.incomeSum - this.sumData.outcomeSum).toFixed(2);
		},
		dateInfo() {
			return this.$store.state.dateInfo;
		},
		selectedDateInfo() {
			return this.$store.state.selectedDateInfo;
		},
		days() {
			if( this.dateInfo.year == this.selectedDateInfo.year &&  this.dateInfo.month == this.selectedDateInfo.month ){
				return this.dateInfo.day
			}
			else{
				return getHowManyDays(this.selectedDateInfo.year, this.selectedDateInfo.month) || 30
			}

		},
		dayOut() {
			return Number(this.sumData.outcomeSum / this.days).toFixed(2);
		}
	}
}
</script>

<style lang="scss" scoped>
.sum-container {
	width: calc(100% - 30px);
	margin: 20px 15px 15px 15px;
	height: 135px;
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

	.items-container {
		height: 110px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-bottom: 10px;
		align-items: flex-start;

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
}
</style>
