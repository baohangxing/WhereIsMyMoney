<template>
	<view class="navTabBox">
		<!-- 标题数量小于5 -->
		<view class="shortTab" v-if="tabTitle.length <= 5">
			<!-- 导航栏 -->
			<view class="navTab">
				<view
					v-for="(item, index) in tabTitle"
					class="navTabItem"
					:class="[
						index === tabClick ? (size == 's' ? 'click-s' : 'click') : size == 's' ? 'normal-s' : 'normal',
						index === tabClick ? (size == 'm' ? 'click-m' : 'click') : size == 'm' ? 'normal-m' : 'normal'
					]"
					@tap="navClick(index)"
				>
					{{ item }}
				</view>
			</view>
			<!-- 下划线 -->
			<view class="underlineBox" :style="'transform:translateX(' + isLeft + 'px) translateY(-6px);width:' + isWidth + 'px'"><view class="underline"></view></view>
		</view>
		<!-- 标题数量大于5 开启长导航栏模式 -->
		<view class="longTab" v-if="tabTitle.length > 5">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation :scroll-into-view="toView">
				<view class="longItem" :data-index="index" :class="index === tabClick ? 'click' : ''" v-for="(item, index) in tabTitle" :id="'id' + index">{{ item }}</view>
				<view class="underlineBox" :style="'transform:translateX(' + isLeft + 'px);'"><view class="underline"></view></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'slidingMenu',
	props: {
		tabTitle: {
			type: Array,
			default: ['支出', '收入']
		},
		w: {
			type: Number,
			default: 1
		},
		size: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			tabClick: 0, //导航栏被点击
			isLeft: 0, //导航栏下划线位置
			isWidth: 0, //每个导航栏占位
			toView: '',
			isLongWidth: 0
		};
	},
	created() {
		var that = this;
		// 获取设备宽度
		uni.getSystemInfo({
			success(e) {
				that.isWidth = (e.windowWidth * that.w) / that.tabTitle.length; //宽度除以导航标题个数=一个导航所占宽度
				that.isLongWidth = e.windowWidth / 5;
			}
		});
		this.toView = 'id0';
	},
	methods: {
		// 导航栏点击
		navClick(index) {
			this.$emit('changeTab', index); //设置swiper的第几页
			this.tabClick = index; //设置导航点击了哪一个
			this.isLeft = index * this.isWidth; //设置下划线位置
		}
	}
};
</script>

<style lang="scss" scoped>
.click {
	color: black;
	font-size: $font-size-llg;
	font-weight: bold;
}

.normal {
	color: $text-color-more-grey;
	font-size: $font-size-lg;
}

.click-m {
	color: black;
	font-size: $font-size-base;
	font-weight: bold;
}

.normal-m {
	color: $text-color-grey;
	font-size: $font-size-base;
}

.click-s {
	color: $text-color;
	font-size: $font-size-sm;
	font-weight: bold;
}

.normal-s {
	color: $text-color-more-grey;
	font-size: $font-size-sm;
}

.navTabBox {
	width: 100%;

	.longTab {
		width: 100%;

		.longItem {
			width: 20vw;
			height: 90upx;
			display: inline-block;
			line-height: 90upx;
			text-align: center;
		}

		.underlineBox {
			height: 3px;
			width: 20%;
			display: flex;
			align-content: center;
			justify-content: center;
			transition: 0.2s;

			.underline {
				width: 14px;
				height: 4px;
				background-color: $system-color-blue;
				border-radius: 2px;
			}
		}
	}

	.shortTab {
		width: 100%;

		.navTab {
			display: flex;
			width: 100%;
			height: 30px;
			position: relative;

			.navTabItem {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
			}
		}

		.underlineBox {
			height: 2px;
			display: flex;
			align-content: center;
			justify-content: center;
			transition: 0.2s;

			.underline {
				width: 14px;
				height: 4px;
				border-radius: 2px;
				background-color: $system-color-blue;
			}
		}
	}
}
</style>
