<template>
	<div><view class="iconfont" :class="name ? 'icon-' + name : ''" :style="{ color: color, fontSize: size + 'px', fontWeight: bold ? 'bold' : 'normal' }"></view></div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 32
		},
		color: {
			type: String,
			default: ''
		},
		bold: {
			type: Boolean,
			default: false
		}
	}
};
</script>
