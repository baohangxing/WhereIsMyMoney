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
import config from '../../config/index.js';
const recorderManager = uni.getRecorderManager();
//  #endif
export default {
	// #ifdef APP-PLUS || H5
	data() {
		return {
			max: 10000, // 录音最大时长，单位毫秒
			frame: 50, // 执行绘画的频率，单位毫秒
			longTag: false, // 判定长按和点击的标识
			maxTiming: false, // 最长录音时间的定时器
			draw: false,
			voicePath: ''
		};
	},
	created() {
		let self = this;
		recorderManager.onStop(function(res) {
			console.log('recorder stop' + res.tempFilePath);
			self.voicePath = res.tempFilePath;
			self.send();
		});
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
				recorderManager.stop();
			}
			this.longTag = false;
		},

		recording() {
			let self = this;
			// 开始录音
			this.longTag = false;
			console.log('开始录音');
			recorderManager.start({
				sampleRate: 16000
			});
			// 最大录音时间10秒
			this.maxTiming = setTimeout(function() {
				this.draw = false;
				console.log('时间到');
			}, self.max);
			this.draw = true;
		},
		send() {
			uni.request({
				url: 'http://vop.baidu.com/server_api',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					format: 'pcm',
					rate: 16000,
					dev_pid: 1537,
					channel: 1,
					token: '25.16ff75f74518ba6ec8165d4963141672.315360000.1903701867.282335-1964384',
					cuid: 'baidu_workshop',
					len: 4096,
					speech: this.voicePath
				}
			});
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
