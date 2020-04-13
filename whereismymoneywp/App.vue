<script>
import Vue from 'vue';
import { shortifyContent, getTypeName, getTypeIcon } from '@/assets/js/help.js';

export default {
	onLaunch: function() {
		console.log('App Launch');

		Vue.prototype.shortifyContent = shortifyContent;
		Vue.prototype.getTypeName = getTypeName;
		Vue.prototype.getTypeIcon = getTypeIcon
		uni.getSystemInfo({
			success: function(e) {
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}

				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
	},
	onShow: function() {
		console.log('App Show');
		this.$store.commit('refreshDateInfo');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'assets/css/normalize.css';
@import 'assets/css/font.css';
</style>
