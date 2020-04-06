<template>
	<view class="container">
		<icon :name="iconName" color="#333333" size="26"></icon>
		<view class="name">{{ name }}</view>
	</view>
</template>

<script>
export default {
	props: {
		iconName: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			
		};
	}
};
</script>

<style lang="scss">
.container {
	width: 70px;
	height: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.name {
		margin-top: 8px;
		font-size: 8px;
		color: #707070;
	}
}
</style>
