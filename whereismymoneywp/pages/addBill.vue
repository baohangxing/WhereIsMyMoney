<template>
	<view class="add-bill-container">
		<cu-custom>
			<view slot="content"><sliding-menu ref="navTab" :w="0.4" :size="'m'" @changeTab="changeTab"></sliding-menu></view>
		</cu-custom>

		<swiper :current="TabCur" class="swiper-container" :style="swiperHeightGen" :duration="200" @change="swiperTab">
			<swiper-item>
				<view class="types-container">
					<div v-for="item in types.outTypeList" :key="item.id" class="type-item">
						<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 1" @tap="selectItem(item.id, true)"></type-select-item>
					</div>
					<div v-for="item in myTypes.outTypeList" :key="item.id" class="type-item">
						<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 0" @tap="selectItem(item.id, false)"></type-select-item>
					</div>
					<div class="type-item">
						<type-select-item :item="settingItem" @tap="editTypes(0)"></type-select-item>
					</div>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="types-container">
					<div v-for="item in types.inTypeList" :key="item.id" class="type-item">
						<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 1" @tap="selectItem(item.id, true)"></type-select-item>
					</div>
					<div v-for="item in myTypes.inTypeList" :key="item.id" class="type-item">
						<type-select-item :item="item" :isSelected="isSelectedId == item.id && defaultType == 0" @tap="selectItem(item.id, false)"></type-select-item>
					</div>
					<div class="type-item">
						<type-select-item :item="settingItem" @tap="editTypes(1)"></type-select-item>
					</div>
				</view>
			</swiper-item>
		</swiper>

		<money-input ref="moneyInput" @save="saveBill" @saveAndWrite="saveAndWrite"></money-input>
	</view>
</template>

<script>
import typeSelectItem from '@/components/typeSelectItem.vue';
import slidingMenu from '@/components/slidingMenu.vue';
import moneyInput from '@/components/moneyInput.vue';
import { BILL_ADD, BILL_UPDATE } from '@/common/api.js';

export default {
	data() {
		return {
			isSelectedId: 1,
			TabCur: 0,
			type: 0, //账单的类型 0支出 1收入
			defaultType: 1, //账单的类型是否是官方的类型 0不是 1是
			isUpdata: false,
			updataBillId: null,
			
			settingItem: {
				name: '编辑类型',
				icon: "icon_setting"
			}
		};
	},
	components: {
		typeSelectItem,
		moneyInput,
		slidingMenu
	},
	onLoad(opt) {
		if (opt.isUpdata) {
			this.isUpdata = opt.isUpdata;
			const data = JSON.parse(decodeURIComponent(opt.data));

			this.isSelectedId = data.typeId;
			this.defaultType = data.defaultType;
			this.updataBillId = data.id;
			this.changeTab(data.type == 1 ? 1 : 0);
			this.$refs.moneyInput.setData(data);
		}
	},
	computed: {
		types() {
			return this.$store.state.system.types;
		},
		myTypes() {
			return this.$store.state.system.myTypes;
		},
		userId() {
			return this.$store.state.userInfo.id;
		}
	},
	methods: {
		editTypes(type) {
			uni.navigateTo({
				url: './billTypeEdit?type=' + type
			})
			this.isEditing = true
		},
		selectItem(id, defaultType) {
			this.isSelectedId = id;
			this.defaultType = defaultType ? 1 : 0;
		},
		changeTab(index) {
			this.TabCur = index;
			this.type = this.TabCur == 0 ? 0 : 1;
		},
		swiperTab(e) {
			this.TabCur = e.detail.current;
			this.type = this.TabCur == 0 ? 0 : 1;
			this.$refs.navTab.navClick(this.TabCur);
		},
		saveBill(data) {
			if (this.isUpdata) {
				this.updataBill(data).then(result => {
					if (result) {
						this.$store.commit('addMonthListItem', result);
						this.$store.commit('deleteMonthListItem', result);
						uni.navigateBack({});
					}
				});
			} else {
				this.postBill(data).then(result => {
					if (result) {
						this.$store.commit('addMonthListItem', result);
						uni.navigateBack({});
					}
				});
			}
		},
		saveAndWrite(data) {
			if (this.isUpdata) {
				this.updataBill(data).then(result => {
					if (result) {
						this.$refs.moneyInput.resetData();
						this.isUpdata = false;
						this.$store.commit('addMonthListItem', result);
						this.$store.commit('deleteMonthListItem', result);
					}
				});
			} else {
				this.postBill(data).then(result => {
					if (result) {
						this.$refs.moneyInput.resetData();
						this.$store.commit('addMonthListItem', result);
					}
				});
			}
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
					return result.data.data;
				} else {
					uni.showToast({
						icon: 'none',
						title: '服务器出现故障'
					});
				}
			});
		},
		updataBill: async function(data) {
			return await BILL_UPDATE({
				id: this.updataBillId,
				userId: this.userId,
				defaultType: this.defaultType,
				typeId: this.isSelectedId,
				type: this.type,
				time: data.date,
				amount: data.money,
				description: data.tip
			}).then(result => {
				if (result.data.code == '000001') {
					return result.data.data;
				} else {
					uni.showToast({
						icon: 'none',
						title: '服务器出现故障'
					});
				}
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

	.swiper-container {
		height: calc(100vh - 74px - 224px);
		width: 100vw;
		.types-container {
			height: calc(100vh - 74px - 224px);
			padding-top: 10px;
			overflow: scroll;
			width: 100vw;

			.type-item {
				width: 20vw;
				height: 70px;
				justify-content: center;
				display: inline-flex;
			}
		}
	}
}
</style>
