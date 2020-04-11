<template>
	<view class="add-bill-container">
		<cu-custom><view slot="content">收入</view></cu-custom>
		<view class="types-container">
			<div v-for="item in types"  :key="item.id" >
				<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 1" @tap="selectItem(item.id, true)"></type-select-item>
			</div>
			<div v-for="item in myTypes"  :key="item.id" >
				<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 0" @tap="selectItem(item.id, false)"></type-select-item>
			</div>
		</view>
		<money-input @save="saveBill" @saveAndWrite="saveAndWrite"></money-input>
	</view>
</template>

<script>
import typeSelectItem from '@/components/typeSelectItem.vue';
import moneyInput from '@/components/moneyInput.vue';
import { BILL_ADD } from '@/common/api.js';

export default {
	data() {
		return {
			isSelectedId: null,
			type: 0, //账单的类型 0支出 1收入
			defaultType: 1 //账单的类型是否是官方的类型 0不是 1是
		};
	},
	components: {
		typeSelectItem,
		moneyInput
	},
	computed: {
		types() {
			return this.$store.state.system.types.outTypeList;
		},
		myTypes() {
			return this.$store.state.system.myTypes.outTypeList;
		},
		userId() {
			return this.$store.state.userInfo.id;
		}
	},
	methods: {
		selectItem(id, defaultType) {
			this.isSelectedId = id;
			this.defaultType = defaultType ? 1 : 0;
		},
		saveBill(data) {
			this.postBill(data).then(result => {
				if (result) {
					//todo
					uni.navigateBack({});
				} else {
					uni.showToast({
						icon: 'none',
						title: '服务器挂了'
					});
				}
			});
		},
		saveAndWrite(data) {
			this.postBill(data).then(result => {
				if (result) {
					//todo
				} else {
					uni.showToast({
						icon: 'none',
						title: '服务器挂了'
					});
				}
			});
		},
		postBill: async function(data) {
			return await BILL_ADD({
				userId: this.userId,
				defaultType: this.defaultType,
				typeId: this.isSelectedId,
				type: this.type,
				time: data.date,
				amount: data.money,
				description: data.tip
			}).then(result => {
				if (result.data.code == '000001') {
					return true;
				} else return false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.add-bill-container {
	background-color: $bg-color-grey;
	height: 100vh;
	width: 100vw;

	.types-container {
		height: calc(100vh - 74px - 224px);
		padding-top: 10px;
		overflow: scroll;
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
}
</style>
