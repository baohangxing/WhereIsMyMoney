<template>
	<view>
		<view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<icon name="icon-icon-return" color="#333333"></icon>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: StatusBar + 'px' }]"><slot name="content"></slot></view>
				<slot name="right"></slot>
			</view>
		</view>
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
	name: 'cu-custom',
	computed: {
		style() {
			var StatusBar = this.StatusBar;
			var CustomBar = this.CustomBar;
			var bgImage = this.bgImage;
			var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		}
	},
	methods: {
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss">
.cu-bar {
	display: flex;
	position: relative;
	align-items: center;
	min-height: 100upx;
	justify-content: space-between;
	transition: background-color 0.8s ease;
}

.cu-bar .action {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
	box-sizing: border-box;
}

.cu-bar .action.border-title {
	position: relative;
	top: -10upx;
}

.cu-bar .action.border-title text[class*='bg-']:last-child {
	position: absolute;
	bottom: -0.5rem;
	min-width: 2rem;
	height: 6upx;
	left: 0;
}

.cu-bar .action.sub-title {
	position: relative;
	top: -0.2rem;
}

.cu-bar .action.sub-title text {
	position: relative;
	z-index: 1;
}

.cu-bar .action.sub-title text[class*='bg-']:last-child {
	position: absolute;
	display: inline-block;
	bottom: -0.2rem;
	border-radius: 6upx;
	width: 100%;
	height: 0.6rem;
	left: 0.6rem;
	opacity: 0.3;
	z-index: 0;
}

.cu-bar .action.sub-title text[class*='text-']:last-child {
	position: absolute;
	display: inline-block;
	bottom: -0.7rem;
	left: 0.5rem;
	opacity: 0.2;
	z-index: 0;
	text-align: right;
	font-weight: 900;
	font-size: 36upx;
}

.cu-bar.justify-center .action.border-title text:last-child,
.cu-bar.justify-center .action.sub-title text:last-child {
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
}

.cu-bar .action:first-child {
	margin-left: 30upx;
	font-size: 30upx;
}

.cu-bar .action text.text-cut {
	text-align: left;
	width: 100%;
}

.cu-bar .cu-avatar:first-child {
	margin-left: 20upx;
}

.cu-bar .action:first-child > text[class*='cuIcon-'] {
	/*margin-left: -0.3em;*/

	margin-left: 4px;
	margin-top: 8px;
	font-size: 24px;
	color: black;

	margin-right: 0.3em;
}

.cu-bar .action:last-child {
	margin-right: 30upx;
}

.cu-bar .action > text[class*='cuIcon-'],
.cu-bar .action > view[class*='cuIcon-'] {
	font-size: 36upx;
}

.cu-bar .action > text[class*='cuIcon-'] + text[class*='cuIcon-'] {
	margin-left: 0.5em;
}

.cu-bar .content {
	position: absolute;
	text-align: center;
	width: calc(100% - 340upx);
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	margin: auto;
	height: 60upx;
	font-size: 32upx;
	line-height: 60upx;
	cursor: none;
	pointer-events: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.cu-bar.ios .content {
	bottom: 7px;
	height: 30px;
	font-size: 32upx;
	line-height: 30px;
}

.cu-bar.btn-group {
	justify-content: space-around;
}

.cu-bar.btn-group button {
	padding: 20upx 32upx;
}

.cu-bar.btn-group button {
	flex: 1;
	margin: 0 20upx;
	max-width: 50%;
}

.cu-bar .search-form {
	background-color: #f5f5f5;
	line-height: 64upx;
	height: 64upx;
	font-size: 24upx;
	color: #333333;
	flex: 1;
	display: flex;
	align-items: center;
	margin: 0 30upx;
}

.cu-bar .search-form + .action {
	margin-right: 30upx;
}

.cu-bar .search-form input {
	flex: 1;
	padding-right: 30upx;
	height: 64upx;
	line-height: 64upx;
	font-size: 26upx;
	background-color: transparent;
}

.cu-bar .search-form [class*='cuIcon-'] {
	margin: 0 0.5em 0 0.8em;
}

.cu-bar .search-form [class*='cuIcon-']::before {
	top: 0upx;
}

.cu-bar.fixed,
.nav.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
}

.cu-bar.foot {
	position: fixed;
	width: 100%;
	bottom: 0;
	z-index: 1024;
	box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
}

.cu-bar.tabbar {
	padding: 0;
	height: calc(100upx + env(safe-area-inset-bottom) / 2);
	padding-bottom: calc(env(safe-area-inset-bottom) / 2);
}

.cu-tabbar-height {
	min-height: 100upx;
	height: calc(100upx + env(safe-area-inset-bottom) / 2);
}

.cu-bar.tabbar.shadow {
	box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
}

.cu-bar.tabbar .action {
	font-size: 22upx;
	position: relative;
	flex: 1;
	text-align: center;
	padding: 0;
	display: block;
	height: auto;
	line-height: 1;
	margin: 0;
	background-color: inherit;
	overflow: initial;
}

.cu-bar.tabbar.shop .action {
	width: 140upx;
	flex: initial;
}

.cu-bar.tabbar .action.add-action {
	position: relative;
	z-index: 2;
	padding-top: 50upx;
}

.cu-bar.tabbar .action.add-action [class*='cuIcon-'] {
	position: absolute;
	width: 70upx;
	z-index: 2;
	height: 70upx;
	border-radius: 50%;
	line-height: 70upx;
	font-size: 50upx;
	top: -35upx;
	left: 0;
	right: 0;
	margin: auto;
	padding: 0;
}

.cu-bar.tabbar .action.add-action::after {
	content: '';
	position: absolute;
	width: 100upx;
	height: 100upx;
	top: -50upx;
	left: 0;
	right: 0;
	margin: auto;
	box-shadow: 0 -3upx 8upx rgba(0, 0, 0, 0.08);
	border-radius: 50upx;
	background-color: inherit;
	z-index: 0;
}

.cu-bar.tabbar .action.add-action::before {
	content: '';
	position: absolute;
	width: 100upx;
	height: 30upx;
	bottom: 30upx;
	left: 0;
	right: 0;
	margin: auto;
	background-color: inherit;
	z-index: 1;
}

.cu-bar.tabbar .btn-group {
	flex: 1;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0 10upx;
}

.cu-bar.tabbar button.action::after {
	border: 0;
}

.cu-bar.tabbar .action [class*='cuIcon-'] {
	width: 100upx;
	position: relative;
	display: block;
	height: auto;
	margin: 0 auto 10upx;
	text-align: center;
	font-size: 40upx;
}

.cu-bar.tabbar .action .cuIcon-cu-image {
	margin: 0 auto;
}

.cu-bar.tabbar .action .cuIcon-cu-image image {
	width: 50upx;
	height: 50upx;
	display: inline-block;
}

.cu-bar.tabbar .submit {
	align-items: center;
	display: flex;
	justify-content: center;
	text-align: center;
	position: relative;
	flex: 2;
	align-self: stretch;
}

.cu-bar.tabbar .submit:last-child {
	flex: 2.6;
}

.cu-bar.tabbar .submit + .submit {
	flex: 2;
}

.cu-bar.tabbar.border .action::before {
	content: ' ';
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	transform: scale(0.5);
	transform-origin: 0 0;
	border-right: 1upx solid rgba(0, 0, 0, 0.1);
	z-index: 3;
}

.cu-bar.tabbar.border .action:last-child:before {
	display: none;
}

.cu-bar.input {
	padding-right: 20upx;
	background-color: #ffffff;
}

.cu-bar.input input {
	overflow: initial;
	line-height: 64upx;
	height: 64upx;
	min-height: 64upx;
	flex: 1;
	font-size: 30upx;
	margin: 0 20upx;
}

.cu-bar.input .action {
	margin-left: 20upx;
}

.cu-bar.input .action [class*='cuIcon-'] {
	font-size: 48upx;
}

.cu-bar.input input + .action {
	margin-right: 20upx;
	margin-left: 0upx;
}

.cu-bar.input .action:first-child [class*='cuIcon-'] {
	margin-left: 0upx;
}

.cu-custom {
	display: block;
	position: relative;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

.cu-custom .cu-bar .content {
	width: calc(100% - 440upx);
}

/* #ifdef MP-ALIPAY */
.cu-custom .cu-bar .action .cuIcon-back {
	opacity: 0;
}

/* #endif */

.cu-custom .cu-bar .content image {
	height: 60upx;
	width: 240upx;
}

.cu-custom .cu-bar {
	min-height: 0px;
	/* #ifdef MP-WEIXIN */
	padding-right: 220upx;
	/* #endif */
	/* #ifdef MP-ALIPAY */
	padding-right: 150upx;
	/* #endif */
	box-shadow: 0upx 0upx 0upx;
	z-index: 9999;
}

.cu-custom .cu-bar .border-custom {
	position: relative;
	background: rgba(0, 0, 0, 0.15);
	border-radius: 1000upx;
	height: 30px;
}

.cu-custom .cu-bar .border-custom::after {
	content: ' ';
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: inherit;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
	box-sizing: border-box;
	border: 1upx solid #ffffff;
	opacity: 0.5;
}

.cu-custom .cu-bar .border-custom::before {
	content: ' ';
	width: 1upx;
	height: 110%;
	position: absolute;
	top: 22.5%;
	left: 0;
	right: 0;
	margin: auto;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
	box-sizing: border-box;
	opacity: 0.6;
	background-color: #ffffff;
}

.cu-custom .cu-bar .border-custom text {
	display: block;
	flex: 1;
	margin: auto !important;
	text-align: center;
	font-size: 34upx;
}
</style>
