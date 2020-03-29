<template>
	<view>
		<div>{{ name }}</div>
		<icon name="icon-webicon310"></icon>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		name() {
			return this.$store.state.userInfo.name;
		}
	}
};
</script>

<style lang="scss"></style>
