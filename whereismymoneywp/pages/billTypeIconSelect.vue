<template>
	<view class="add-bill-container">
		<cu-custom>
			<view slot="content">添加{{ type == 0 ? '支出' : '收入' }}类型</view>
		</cu-custom>

		<div class="top-input-container">
			<div class="icon-tip">图标：</div>
			<div v-if="seleteIconName"><icon :name="seleteIconName" size="26"></icon></div>
			<div class="name-tip">名称：</div>
			<input v-model="typeName" />
			<div class="confirm-btn" @tap="confirm">{{ isUpdata ? '保存' : '新增' }}</div>
		</div>

		<div class="icon-contaienr">
			<div v-for="itemName in iconList" class="icon-item-contaienr">
				<icon @tap="seleteIcon(itemName)" :name="itemName" :color="seleteIconName == itemName ? '#ff55ff' : '#333333'" size="26"></icon>
			</div>
		</div>
	</view>
</template>

<script>
import { UT_UPDATE, UT_ADD } from '@/common/api.js';
export default {
	data() {
		return {
			isUpdata: false,
			updataTypeItem: null,
			seleteIconName: null,
			typeName: null,
			type: 0
		};
	},
	components: {},
	onLoad(opt) {
		this.type = opt.type;
		console.log(opt.type);
		if (opt.item) {
			this.isUpdata = true;
			let data = JSON.parse(decodeURIComponent(opt.item));
			console.log(data);
			this.updataTypeItem = data;
			this.seleteIconName = data.icon;
			this.typeName = data.name;
		}
	},
	computed: {
		userId() {
			return this.$store.state.userInfo.id;
		},
		iconList() {
			return this.$store.state.system.iconList;
		}
	},
	methods: {
		seleteIcon(name) {
			this.seleteIconName = name;
		},
		confirm() {
			if (!this.seleteIconName) {
				uni.showToast({
					icon: 'none',
					title: '请选择图标'
				});
			}
			if (!this.typeName) {
				uni.showToast({
					icon: 'none',
					title: '请输入类型名称'
				});
			}
			if (this.isUpdata) {
				this.updataType().then(result => {
					let data = {
						data: result,
						oldId: this.updataTypeItem.id,
						type: Number(this.type)
					};
					this.$store.commit('updataMyTypes', data);
					uni.navigateBack({});
				});
			} else {
				this.postType().then(result => {
					this.$store.commit('appendMyTypes', result);
					uni.navigateBack({});
				});
			}
		},
		postType: async function() {
			return await UT_ADD({
				userId: this.userId,
				type: Number(this.type),
				name: this.typeName,
				icon: this.seleteIconName
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
		updataType: async function() {
			return await UT_UPDATE({
				id: this.updataTypeItem.id,
				type: Number(this.type),
				userId: this.userId,
				name: this.typeName,
				icon: this.seleteIconName
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

	.top-input-container {
		height: 50px;
		width: 100vw;
		display: flex;
		align-items: center;
		padding: 0 10px;
		color: $text-color;
		font-size: $font-size-base;
		box-shadow: $box-shadow-box;
		margin-bottom: 20px;
		.icon-tip {
			margin-left: 7px;
		}
		.name-tip {
			margin-left: auto;
			margin-right: 7px;
		}

		input {
			width: 80px;
			margin-right: 7px;
			border-bottom: 1px solid $border-color-black;
		}
		.confirm-btn {
			height: 24px;
			width: 60px;
			line-height: 24px;
			background-color: $system-color-blue;
			color: $text-color-inverse;
			text-align: center;
			font-size: $font-size-base;
			border-radius: 12px;
		}
	}
	.icon-contaienr {
		width: 100vw;

		.icon-item-contaienr {
			width: 20vw;
			height: 50px;
			justify-content: center;
			display: inline-flex;
		}
	}
}
</style>
