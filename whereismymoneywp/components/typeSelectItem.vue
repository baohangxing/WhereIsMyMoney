<template>
	<view class="container" :class="{ selectedChange: animationDisplay }">
		<icon :name="item.icon" :color="isSelected ? '#ff55ff' : '#333333'" size="26"></icon>
		<view class="name">{{ item.name }}</view>
	</view>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default () {
				return null;
			},
		},
		isSelected: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			animationDisplay: false
		};
	},
	watch: {
		isSelected() {
			this.animationDisplay = this.isSelected;
		}
	}
};
</script>

<style lang="scss" scoped>
.selectedChange {
	animation: click-animation 0.3s ease-in-out;
}
@keyframes click-animation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}
.container {
	width: 70px;
	height: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.name {
		margin-top: 8px;
		font-size: $font-size-ssm;
		color: $text-color-grey;
	}
}
</style>
