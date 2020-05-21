<template>
	<!-- #ifndef APP-PLUS -->
	<div class="recording" @tap="goToAddBill"><icon name="icon_add" color="#FFF"></icon></div>
	<!--  #endif -->
	<!-- #ifdef APP-PLUS -->
	<div class="recording"><span class="recording-button" :class="{ 'recording-animation': draw }" @touchstart="start" @touchmove="move" @touchend="end"></span></div>
	<!--  #endif -->
</template>

<script>
// #ifdef APP-PLUS || H5
import MD5 from './md5.js';
import { NLP_ADDBILL } from '@/common/api.js';
//  #endif
export default {
	// #ifdef APP-PLUS || H5
	data() {
		return {
			max: 10000, // 录音最大时长，单位毫秒
			longTag: false, // 判定长按和点击的标识
			maxTiming: false, // 最长录音时间的定时器
			draw: false
		};
	},
	//  #endif
	methods: {
		goToAddBill() {
			this.$emit('goToAddBill');
		},

		// #ifdef APP-PLUS || H5
		start() {
			this.longTag = setTimeout(this.recording, 500); // 定义超过500ms即为长按，可自行修改
		},
		move() {
			clearTimeout(this.longTag);
			clearTimeout(this.maxTiming);
			this.draw = false;
			this.longTag = false;
		},
		end() {
			clearTimeout(this.longTag);
			clearTimeout(this.maxTiming);
			this.draw = false;
			if (this.longTag) {
				// timeout不是false证明没有触发recording或者touchmove事件
				this.$emit('goToAddBill');
			} else {
				plus.speech.stopRecognize();
			}
			this.longTag = false;
		},

		recording() {
			let self = this;
			this.longTag = false;
			plus.speech.startRecognize(
				{
					engine: 'baidu'
				},
				function(s) {
					self.end();
					console.log(s);
					NLP_ADDBILL({
						text: s,
						userId: uni.getStorageSync('userId')
					}).then(result => {
						if (result.data.code == '000001') {
							uni.showToast({
								title: '添加成功',
								icon: 'none'
							});
							self.$store.commit('addMonthListItem', result.data.data);
						} else {
							uni.showToast({
								title: result.data.msg,
								icon: 'none'
							});
						}
					});
				},
				function() {
					self.end();
				}
			);

			this.maxTiming = setTimeout(function() {
				self.end();
			}, self.max);
			this.draw = true;
		}
		//  #endif
	}
};
</script>

<style scoped lang="scss">
.recording {
	width: 44px;
	height: 44px;
	background: $system-color-blue;
	display: flex;
	justify-content: center;
	align-items: center;
	.recording-button {
		box-sizing: border-box;

		display: inline-block;
		width: 44px;
		height: 44px;
		background: url(./recording.png) no-repeat 50% 50%;
		background-size: 50% 50%;
		z-index: 100;
	}
	@keyframes recording {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1);
		}
	}

	.recording-animation {
		animation: recording 1s infinite ease-in-out;
		animation-fill-mode: forwards;
	}
}
</style>
