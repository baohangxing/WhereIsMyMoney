<template>
	<view class="add-bill-container">
		<cu-custom>
			<view slot="content"><sliding-menu ref="navTab" :w="0.4" :size="'m'" @changeTab="changeTab"></sliding-menu></view>
		</cu-custom>

		<swiper :current="TabCur" class="swiper-container" :style="swiperHeightGen" :duration="200" @change="swiperTab">
			<swiper-item>
				<view class="types-container">
					<div v-for="item in myTypes.outTypeList" :key="item.id" class="type-item">
						<icon :name="item.icon" :color="isSelected ? '#ff55ff' : '#333333'" size="26"></icon>
						<view class="name">{{ item.name }}</view>
						<div class="fix-type option-box" @tap="updataType(item)">修改</div>
						<div class="delete-type option-box" @tap="deleteType(item)">删除</div>
					</div>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="types-container">
					<div v-for="item in myTypes.inTypeList" :key="item.id" class="type-item">
						<icon :name="item.icon" :color="isSelected ? '#ff55ff' : '#333333'" size="26"></icon>
						<view class="name">{{ item.name }}</view>
						<div class="fix-type option-box" @tap="updataType(item)">修改</div>
						<div class="delete-type option-box" @tap="deleteType(item)">删除</div>
					</div>
				</view>
			</swiper-item>
		</swiper>

		<view class="fixed-btn" @tap="goToAddIcon"><icon name="icon_add" color="#FFF"></icon></view>
	</view>
</template>

<script>
import slidingMenu from '@/components/slidingMenu.vue';
import { UT_DELETE } from '@/common/api.js';
export default {
	data() {
		return {
			isSelectedId: 1,
			TabCur: 0,
			type: 0, //账单的类型 0支出 1收入
			defaultType: 1, //账单的类型是否是官方的类型 0不是 1是
			isUpdata: false,
			updataBillId: null
		};
	},
	components: {
		slidingMenu
	},
	onLoad(opt) {
		this.TabCur = opt.type;
	},
	computed: {
		myTypes() {
			return this.$store.state.system.myTypes;
		},
		userId() {
			return this.$store.state.userInfo.id;
		}
	},
	methods: {
		updataType(item) {
			uni.navigateTo({
				url: './billTypeIconSelect?type=' + this.type + '&item=' + encodeURIComponent(JSON.stringify(item))
			});
		},
		goToAddIcon() {
			uni.navigateTo({
				url: './billTypeIconSelect?type=' + this.type 
			});
		},
		deleteType(item) {
			uni.showModal({
				title: `提示`,
				content: `确认删除吗？`,
				success: res => {
					if (res.cancel) {
						return false;
					}
					if (res.confirm) {
						this.delete(item.id).then(r => {
							console.log(r);
							if (r.data.code == '000001') {
								this.$store.commit('deleteMyTypes', item);
							}
						});
					}
				}
			});
		},
		delete: async function(id) {
			return await UT_DELETE({
				id: id,
				userId: this.userId
			});
		},
		changeTab(index) {
			this.TabCur = index;
			this.type = this.TabCur == 0 ? 0 : 1;
		},
		swiperTab(e) {
			this.TabCur = e.detail.current;
			this.type = this.TabCur == 0 ? 0 : 1;
			this.$refs.navTab.navClick(this.TabCur);
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
		height: calc(100vh - 40px - var(--status-bar-height));
		width: 100vw;
		.types-container {
			height: calc(100vh - 40px - var(--status-bar-height));
			overflow: scroll;
			width: 100vw;
			.type-item {
				height: 50px;
				width: 100%;
				border-top: 1px solid $border-color;
				background-color: $bg-color;
				display: flex;
				align-items: center;
				padding: 0 15px;

				.name {
					color: $text-color;
					font-size: $font-size-base;
					margin-left: 10px;
				}
				.option-box {
					height: 20px;
					width: 60px;
					border-radius: 4px;
					line-height: 20px;
					text-align: center;
					font-size: $font-size-base;
					background-color: $bg-color-white-grey;
					border: 1px solid $border-color-black;
				}
				.fix-type {
					margin-left: auto;
					color: $system-color-blue;
					margin-right: 7px;
				}

				.delete-type {
					color: $system-color-red;
				}
			}
		}
	}
	.fixed-btn {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 44px;
		width: 44px;
		height: 44px;
		background: $system-color-blue;
		box-shadow: $box-shadow-btn;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: $border-radius-circle;
		z-index: 999;
	}
}
</style>
