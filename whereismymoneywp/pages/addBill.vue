<template>
	<view class="add-bill-container">
		<cu-custom isBack="true"><view slot="content">收入</view></cu-custom>
		<view class="types-container">
			<div v-for="item in types"><type-select-item :item="item" :isSelected="isSelectedId == item.id" @tap="selectItem(item.id)"></type-select-item></div>
		</view>
		<money-input @save="saveBill" @saveAndWrite="saveAndWrite"></money-input>
	</view>
</template>

<script>
import typeSelectItem from '@/components/typeSelectItem.vue';
import moneyInput from '@/components/moneyInput.vue';

export default {
	data() {
		return {
			isSelectedId: null
		};
	},
	components: {
		typeSelectItem,
		moneyInput
	},
	computed: {
		types() {
			return this.$store.state.system.types;
		},
		myTypes() {
			return this.$store.state.system.myTypes;
		}
	},
	methods: {
		selectItem(id) {
			this.isSelectedId = id;
		},
		saveBill(data) {
			console.log(data);
			uni.navigateBack({});
		},
		saveAndWrite(data) {
			console.log(data);
			this.isSelectedId = null;
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
		height: calc(100vh - 64px - 224px);
		padding-top: 20px;
		overflow: scroll;
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
}
</style>
