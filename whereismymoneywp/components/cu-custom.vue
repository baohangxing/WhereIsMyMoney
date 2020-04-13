<template>
	<view>
		<view class="cu-bar fixed" :style="style">
			<view class="action">
				<icon name="icon-return" color="#333333" size="28" @tap="BackPage" v-if="isBack"></icon>
				<icon name="icon_menu" color="#333333" size="28" @tap="setShowUserPage" v-else></icon>
				<slot name="backText"></slot>
			</view>
			<view class="content" :style="[{ top: StatusBar + 'px' }]"><slot name="content"></slot></view>
			<slot name="right"></slot>
		</view>
		<view class="block-div" :style="style"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar
		};
	},
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

			return style;
		}
	},
	props: {
		isBack: {
			type: [Boolean, String],
			default: true
		}
	},
	methods: {
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		},
		setShowUserPage() {
			this.$emit('setShowUserPage');
		}
	}
};
</script>

<style lang="scss" scoped>
.cu-bar {
	display: flex;
	position: relative;
	align-items: center;
	min-height: 100upx;
	justify-content: space-between;
	transition: background-color 0.8s ease;
	background-color: $bg-color;

	.action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		box-sizing: border-box;
	}
	.action:first-child {
		margin-left: 30upx;
		font-size: 30upx;
	}
	.action:last-child {
		margin-right: 30upx;
	}

	.content {
		width: 40vw;
		min-height: 0px;
		box-shadow: 0upx 0upx 0upx;
		z-index: 9999;
		position: absolute;
		text-align: center;

		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60upx;
		font-size: 32upx;
		line-height: 60upx;
		cursor: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}

.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
}

.block-div {
	box-sizing: border-box;
}
</style>
