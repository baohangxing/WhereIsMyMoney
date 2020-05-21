<template>
	<canvas
		v-if="canvasId"
		:id="canvasId"
		:canvasId="canvasId"
		:style="{
			width: cWidth * pixelRatio + 'px',
			height: cHeight * pixelRatio + 'px',
			transform: 'scale(' + 1 / pixelRatio + ')',
			'margin-left': (-cWidth * (pixelRatio - 1)) / 2 + 'px',
			'margin-top': (-cHeight * (pixelRatio - 1)) / 2 + 'px'
		}"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		@error="error"
	></canvas>
</template>

<script>
import uCharts from './u-charts.js';
var canvases = {};

export default {
	props: {
		chartType: {
			required: true,
			type: String,
			default: 'column'
		},
		opts: {
			required: true,
			type: Object,
			default() {
				return null;
			}
		},
		canvasId: {
			type: String,
			default: 'u-canvas'
		},
		cWidth: {
			default: 375
		},
		cHeight: {
			default: 250
		},
		pixelRatio: {
			type: Number,
			default: 1
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			switch (this.chartType) {
				case 'column':
					this.initColumnChart();
					break;
				case 'line':
					this.initLineChart();
					break;
				default:
					break;
			}
		},
		initColumnChart() {
			canvases[this.canvasId] = new uCharts({
				$this: this,
				canvasId: this.canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				animation: true,
				categories: this.opts.categories,
				series: this.opts.series,
				enableScroll: true,
				xAxis: {
					disableGrid: true,
					itemCount: 4,
					scrollShow: true
				},
				yAxis: {
					//disabled:true
				},
				dataLabel: true,
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				extra: {
					column: {
						type: 'group'
					}
				}
			});
		},
		initLineChart() {
			canvases[this.canvasId] = new uCharts({
				$this: this,
				canvasId: this.canvasId,
				type: 'line',
				fontSize: 11,
				legend: true,
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				categories: this.opts.categories,
				series: this.opts.series,
				animation: true,
				enableScroll: true,
				xAxis: {
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'dash',
					dashLength: 8,
					itemCount: 4,
					scrollShow: true
				},
				yAxis: {
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 8,
					splitNumber: 5,
					min: 10,
					max: 180,
					format: val => {
						return val.toFixed(0) + '元';
					}
				},
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		},
		touchStart(e) {
			canvases[this.canvasId].showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
			canvases[this.canvasId].scrollStart(e);
		},
		touchMove(e) {
			canvases[this.canvasId].scroll(e);
		},
		touchEnd(e) {
			canvases[this.canvasId].scrollEnd(e);
		},
		error(e) {
			console.log(e);
		}
	}
};
</script>

<style scoped>
.charts {
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: #ffffff;
}
</style>
