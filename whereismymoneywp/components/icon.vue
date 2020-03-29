<template>
	<view class="icon-class" :class="name" :style="{ color: color, fontSize: size + 'px', fontWeight: bold ? 'bold' : 'normal' }"></view>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		size: {
			type: [Number, String],
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

<style>
@font-face {
	font-family: 'iconfont'; /* project id 1700862 */
	src: url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.eot');
	src: url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.woff') format('woff'), url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1700862_s1q0rbsgf9m.svg#iconfont') format('svg');
}
.icon-class {
	font-family: 'iconfont' !important;
	font-size: 30px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: inline-block;
	color: #999;
	vertical-align: middle;
	line-height: 1;
	padding-top: -1px;
	margin-bottom: 1px;
}

.icon-icon_business:before {
	content: '\e76f';
}

.icon-icon_bonus:before {
	content: '\e770';
}

.icon-icon_clothes:before {
	content: '\e771';
}

.icon-icon_daily:before {
	content: '\e772';
}

.icon-icon_food:before {
	content: '\e773';
}

.icon-icon_donate:before {
	content: '\e774';
}

.icon-icon_houserent:before {
	content: '\e775';
}

.icon-icon_intrest:before {
	content: '\e776';
}

.icon-icon_fuel:before {
	content: '\e777';
}

.icon-icon_entertainment:before {
	content: '\e778';
}

.icon-icon_other:before {
	content: '\e779';
}

.icon-icon_medicine:before {
	content: '\e77a';
}

.icon-icon_salary:before {
	content: '\e77b';
}

.icon-icon_makeup:before {
	content: '\e77c';
}

.icon-icon_shopping:before {
	content: '\e77d';
}

.icon-icon_study:before {
	content: '\e77e';
}

.icon-icon_phone:before {
	content: '\e77f';
}

.icon-icon_tour:before {
	content: '\e780';
}

.icon-icon_smoke_wine:before {
	content: '\e781';
}

.icon-icon_traffic:before {
	content: '\e782';
}

.icon-icon_winning:before {
	content: '\e783';
}

.icon-icon_investment:before {
	content: '\e784';
}

.icon-webicon306:before {
	content: '\e69b';
}

.icon-webicon307:before {
	content: '\e69c';
}

.icon-webicon308:before {
	content: '\e69d';
}

.icon-webicon309:before {
	content: '\e6a0';
}

.icon-webicon310:before {
	content: '\e6a1';
}

.icon-webicon311:before {
	content: '\e6a2';
}

.icon-webicon314:before {
	content: '\e6a5';
}

.icon-webicon315:before {
	content: '\e6a6';
}

.icon-webicon316:before {
	content: '\e6a7';
}

.icon-webicon317:before {
	content: '\e6a8';
}

.icon-webicon318:before {
	content: '\e6a9';
}

.icon-webicon319:before {
	content: '\e6b0';
}

.icon-webicon320:before {
	content: '\e6b1';
}

.icon-webicon402:before {
	content: '\e6b3';
}

.icon-webicon401:before {
	content: '\e6b4';
}

.icon-web-icon-:before {
	content: '\e6b5';
}

.icon-web-icon-1:before {
	content: '\e6b6';
}

.icon-web-icon-2:before {
	content: '\e6b7';
}

.icon-web-icon-3:before {
	content: '\e6b8';
}

.icon-web-icon-4:before {
	content: '\e6b9';
}

.icon-web-icon-5:before {
	content: '\e6ba';
}

.icon-web-icon-6:before {
	content: '\e6bb';
}

.icon-web-icon-7:before {
	content: '\e6bc';
}

.icon-web-icon-8:before {
	content: '\e6bd';
}

.icon-web-icon-9:before {
	content: '\e6be';
}

.icon-web-icon-10:before {
	content: '\e6bf';
}

.icon-web-icon-11:before {
	content: '\e6c0';
}

.icon-web-icon-12:before {
	content: '\e6c1';
}

.icon-web-icon-13:before {
	content: '\e6c2';
}

.icon-web-icon-14:before {
	content: '\e6c3';
}

.icon-web-icon-15:before {
	content: '\e6c4';
}

.icon-web-icon-16:before {
	content: '\e6c5';
}

.icon-web-icon-17:before {
	content: '\e6c6';
}

.icon-web-icon-18:before {
	content: '\e6c7';
}

.icon-web-icon-19:before {
	content: '\e6c8';
}

.icon-web-icon-20:before {
	content: '\e6c9';
}

.icon-web-icon-21:before {
	content: '\e6ca';
}

.icon-web-icon-22:before {
	content: '\e6cb';
}

.icon-web-icon-23:before {
	content: '\e6cc';
}

.icon-web-icon-24:before {
	content: '\e6cd';
}

.icon-web-icon-25:before {
	content: '\e6ce';
}

.icon-web-icon-26:before {
	content: '\e6cf';
}

.icon-web-icon-27:before {
	content: '\e6d0';
}

.icon-web-icon-28:before {
	content: '\e6d1';
}

.icon-web-icon-29:before {
	content: '\e6d2';
}

.icon-web-icon-30:before {
	content: '\e6d3';
}

.icon-web-icon-31:before {
	content: '\e6d4';
}

.icon-web-icon-32:before {
	content: '\e6d6';
}

.icon-web-icon-33:before {
	content: '\e6d7';
}

.icon-web-icon-34:before {
	content: '\e6d8';
}

.icon-web-icon-35:before {
	content: '\e6d9';
}

.icon-web-icon-36:before {
	content: '\e6da';
}

.icon-web-icon-37:before {
	content: '\e6db';
}

.icon-web-icon-38:before {
	content: '\e6dc';
}

.icon-web-icon-39:before {
	content: '\e6dd';
}

.icon-web-icon-40:before {
	content: '\e6de';
}

.icon-web-icon-41:before {
	content: '\e6df';
}

.icon-web-icon-42:before {
	content: '\e6e0';
}

.icon-web-icon-43:before {
	content: '\e6e1';
}

.icon-web-icon-44:before {
	content: '\e6e2';
}

.icon-web-icon-45:before {
	content: '\e6e3';
}

.icon-web-icon-46:before {
	content: '\e6e4';
}

.icon-web-icon-47:before {
	content: '\e6e5';
}

.icon-web-icon-48:before {
	content: '\e6e6';
}

.icon-web-icon-49:before {
	content: '\e6e7';
}

.icon-web-icon-50:before {
	content: '\e6e8';
}

.icon-web-icon-51:before {
	content: '\e6e9';
}

.icon-web-icon-52:before {
	content: '\e6ea';
}

.icon-web-icon-53:before {
	content: '\e6eb';
}

.icon-web-icon-54:before {
	content: '\e6ec';
}

.icon-web-icon-55:before {
	content: '\e6ed';
}

.icon-web-icon-56:before {
	content: '\e6ee';
}

.icon-web-icon-57:before {
	content: '\e6ef';
}

.icon-web-icon-58:before {
	content: '\e6f0';
}

.icon-web-icon-59:before {
	content: '\e6f1';
}

.icon-web-icon-60:before {
	content: '\e6f2';
}

.icon-web-icon-61:before {
	content: '\e6f3';
}

.icon-web-icon-62:before {
	content: '\e6f4';
}

.icon-web-icon-63:before {
	content: '\e6f5';
}

.icon-web-icon-64:before {
	content: '\e6f6';
}

.icon-web-icon-65:before {
	content: '\e6f7';
}

.icon-web-icon-66:before {
	content: '\e6f8';
}

.icon-web-icon-67:before {
	content: '\e6f9';
}

.icon-web-icon-68:before {
	content: '\e6fa';
}

.icon-web-icon-69:before {
	content: '\e6fb';
}

.icon-web-icon-70:before {
	content: '\e6fc';
}

.icon-web-icon-71:before {
	content: '\e6fd';
}

.icon-web-icon-72:before {
	content: '\e6fe';
}

.icon-web-icon-73:before {
	content: '\e6ff';
}

.icon-web-icon-74:before {
	content: '\e700';
}

.icon-web-icon-75:before {
	content: '\e701';
}

.icon-web-icon-76:before {
	content: '\e702';
}

.icon-web-icon-77:before {
	content: '\e703';
}

.icon-web-icon-78:before {
	content: '\e704';
}

.icon-web-icon-79:before {
	content: '\e705';
}

.icon-web-icon-80:before {
	content: '\e706';
}

.icon-web-icon-81:before {
	content: '\e707';
}

.icon-web-icon-82:before {
	content: '\e708';
}

.icon-web-icon-83:before {
	content: '\e70c';
}

.icon-web-icon-84:before {
	content: '\e70d';
}

.icon-web-icon-85:before {
	content: '\e70e';
}

.icon-web-icon-86:before {
	content: '\e70f';
}

.icon-web-icon-87:before {
	content: '\e710';
}

.icon-web-icon-88:before {
	content: '\e711';
}

.icon-web-icon-89:before {
	content: '\e712';
}

.icon-web-icon-90:before {
	content: '\e713';
}

.icon-web-icon-91:before {
	content: '\e714';
}

.icon-web-icon-92:before {
	content: '\e715';
}

.icon-web-icon-93:before {
	content: '\e716';
}

.icon-web-icon-94:before {
	content: '\e717';
}

.icon-web-icon-95:before {
	content: '\e718';
}

.icon-web-icon-96:before {
	content: '\e719';
}

.icon-web-icon-97:before {
	content: '\e71a';
}

.icon-web-icon-98:before {
	content: '\e71b';
}

.icon-web-icon-99:before {
	content: '\e71c';
}

.icon-web-icon-100:before {
	content: '\e71d';
}

.icon-web-icon-101:before {
	content: '\e71e';
}

.icon-web-icon-102:before {
	content: '\e71f';
}

.icon-web-icon-103:before {
	content: '\e720';
}

.icon-web-icon-104:before {
	content: '\e721';
}

.icon-web-icon-105:before {
	content: '\e722';
}

.icon-web-icon-106:before {
	content: '\e723';
}

.icon-web-icon-107:before {
	content: '\e724';
}

.icon-web-icon-108:before {
	content: '\e725';
}

.icon-web-icon-109:before {
	content: '\e726';
}

.icon-web-icon-110:before {
	content: '\e727';
}

.icon-web-icon-111:before {
	content: '\e728';
}

.icon-web-icon-112:before {
	content: '\e729';
}

.icon-web-icon-113:before {
	content: '\e72a';
}

.icon-webicon01:before {
	content: '\e66b';
}

.icon-webicon02:before {
	content: '\e66c';
}

.icon-webicon03:before {
	content: '\e66d';
}

.icon-webicon04:before {
	content: '\e66e';
}

.icon-webicon05:before {
	content: '\e66f';
}

.icon-webicon06:before {
	content: '\e670';
}

.icon-webicon07:before {
	content: '\e671';
}

.icon-webicon08:before {
	content: '\e672';
}

.icon-webicon09:before {
	content: '\e673';
}

.icon-webicon10:before {
	content: '\e674';
}

.icon-webicon11:before {
	content: '\e675';
}

.icon-webicon12:before {
	content: '\e676';
}

.icon-webicon13:before {
	content: '\e677';
}

.icon-webicon14:before {
	content: '\e678';
}

.icon-webicon15:before {
	content: '\e679';
}

.icon-webicon16:before {
	content: '\e67a';
}

.icon-webicon17:before {
	content: '\e67b';
}

.icon-webicon18:before {
	content: '\e67c';
}

.icon-webicon19:before {
	content: '\e67d';
}

.icon-webicon20:before {
	content: '\e67e';
}

.icon-webicon201:before {
	content: '\e67f';
}

.icon-webicon202:before {
	content: '\e680';
}

.icon-webicon203:before {
	content: '\e681';
}

.icon-webicon204:before {
	content: '\e682';
}

.icon-webicon205:before {
	content: '\e683';
}

.icon-webicon206:before {
	content: '\e684';
}

.icon-webicon207:before {
	content: '\e685';
}

.icon-webicon208:before {
	content: '\e686';
}

.icon-webicon209:before {
	content: '\e687';
}

.icon-webicon211:before {
	content: '\e689';
}

.icon-webicon212:before {
	content: '\e68a';
}

.icon-webicon213:before {
	content: '\e68b';
}

.icon-webicon214:before {
	content: '\e68c';
}

.icon-webicon215:before {
	content: '\e68d';
}

.icon-webicon216:before {
	content: '\e68e';
}

.icon-webicon301:before {
	content: '\e694';
}

.icon-webicon302:before {
	content: '\e695';
}

.icon-webicon03-copy:before {
	content: '\e696';
}

.icon-webicon303:before {
	content: '\e698';
}

.icon-webicon304:before {
	content: '\e699';
}

.icon-webicon305:before {
	content: '\e69a';
}
</style>
