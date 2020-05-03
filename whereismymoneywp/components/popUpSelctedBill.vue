<template>
	<view>
		<div class="mask" @tap.stop="hiddenPopUp" @touchmove.stop="hiddenPopUp" v-show="isSelected"></div>
		<div @touchmove.stop="" class="item-container" :class="isSelected ? 'item-move-in' : 'item-move-out'">
			<div class="title">账单详情</div>
			<div class="item-box">
				<span>金额</span>
				<span>{{ billData ? formatMoney(billData.amount) : '未知' }}</span>
			</div>
			<div class="item-box">
				<span>分类</span>
				<span>{{ typeName }}</span>
			</div>
			<div class="item-box">
				<span>时间</span>
				<span>{{ time || '未知' }}</span>
			</div>
			<div class="item-box">
				<span>备注</span>
				<span>{{ billData.description || '无' }}</span>
			</div>
			<div class="item-box">
				<span>操作</span>
				<div class="option">
					<span @tap="tapModify">修改</span>
					<span class="delete" @tap="tapDelete">删除</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { BILL_DELETE } from '@/common/api.js';

export default {
	computed: {
		isSelected() {
			return this.$store.state.temporary.isSelected;
		},
		billData() {
			return this.$store.state.temporary.selectedBillItem;
		},
		typeName() {
			if (this.billData) return this.getTypeName(this.billData.typeId, this.billData.type, this.billData.defaultType);
		},
		time() {
			if (this.billData && this.billData.time) return this.billData.time.substr(0, 10);
		}
	},
	methods: {
		hiddenPopUp() {
			this.$store.commit('selectedBillItem');
		},
		tapModify(){
			uni.navigateTo({
				url: '/pages/addBill?isUpdata=true&&data=' + encodeURIComponent(JSON.stringify(this.billData))
			});
			this.hiddenPopUp()
		},
		tapDelete() {
			BILL_DELETE({
				id: this.billData.id
			}).then(result => {
				if (result.data.code == '000001') {
					this.$store.commit('deleteMonthListItem', this.billData);
					this.hiddenPopUp();
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mask {
	position: fixed;
	z-index: 999999;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: $bg-color-mask;
}

@keyframes move-in {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-250px);
	}
}

@keyframes move-out {
	0% {
		transform: translateY(-250px);
	}
	100% {
		transform: translateY(0);
	}
}

.item-move-out {
	animation: move-out 0.2s ease-out;
	animation-fill-mode: forwards;
}

.item-move-in {
	animation: move-in 0.2s ease-out;
	animation-fill-mode: forwards;
}

.item-container {
	position: fixed;
	z-index: 1000000;
	width: 100vw;
	height: 250px;
	left: 0;
	bottom: -250px;
	background-color: $bg-color;
	font-size: $font-size-ssm;

	.title {
		height: 35px;
		line-height: 35px;
		padding-left: 15px;
		color: $text-color;
		font-weight: 600;
	}

	.item-box {
		height: 38px;
		border-top: 1px solid $bg-color-grey;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.option {
			height: 100%;
			width: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 600;
			.delete {
				color: $system-color-red;
			}
		}
	}
}
</style>
