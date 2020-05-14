/**
 * dateFormat
 * @param date
 * @returns {string}
 */
const dateFormat = function (date) {
	let year = date.getFullYear();//年
	if (year < 1900) year = year + 1900;
	let month = date.getMonth() + 1;//月
	if (month < 10) month = '0' + month;
	let day = date.getDate();//日
	if (day < 10) day = '0' + day;
	let hour = date.getHours();//小时
	if (hour < 10) hour = '0' + hour;
	let minute = date.getMinutes();//分钟
	if (minute < 10) minute = '0' + minute;
	let second = date.getSeconds();//秒
	if (second < 10) second = '0' + second;
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
};

/**
 * getCaptchaCode 获取随机生成的验证码
 * @param length  验证码的长度 默认6位
 * @param radix  验证码的进制 默认16
 * @returns {string}  验证码
 */
const getCaptchaCode = function (length = 6, radix = 16) {
	return Math.random().toString(radix).slice(2, length + 2).toUpperCase();
};

/**
 * chineseNumerToAmount 中文汉字–>阿拉伯数字
 * @param chnStr  中文汉字数字
 * @returns {Number}  数字
 */
const chineseNumerToAmount = function (chnStr) {
	let chnNumChar = {
		零: 0,
		一: 1,
		二: 2,
		三: 3,
		四: 4,
		五: 5,
		六: 6,
		七: 7,
		八: 8,
		九: 9
	};
	let chnNameValue = {
		十: {value: 10, secUnit: false},
		百: {value: 100, secUnit: false},
		千: {value: 1000, secUnit: false},
		万: {value: 10000, secUnit: true},
	};

	let rtn = 0;
	let section = 0;
	let number = 0;
	let secUnit = false;
	let str = chnStr.split('');

	for (let i = 0; i < str.length; i++) {

		let num = chnNumChar[str[i]];
		if (typeof num !== 'undefined') {
			number = num;
			if (i === str.length - 1) {
				section += number;
			}
		} else {
			if (typeof chnNameValue[str[i]] === 'undefined') {
				section = section + number;
				return rtn + section;
			}
			let unit = chnNameValue[str[i]].value;
			secUnit = chnNameValue[str[i]].secUnit;
			if (secUnit) {
				if (number === 0)
					number = 1;
				section = (section + number) * unit;
				rtn += section;
				section = 0;
			} else {
				if (number === 0)
					number = 1;
				section += (number * unit);
			}
			number = 0;
		}
	}
	return rtn + section;
};


/**
 * chineseDataToData 中文日期–>日期
 * @param chdStr  中文日期
 * @returns {String}  日期
 */
const chineseDataToData = function (chdStr) {
	if (chdStr.includes("今")) {
		return new Date().toLocaleDateString().replace(/\//g, '-');
	}
	if (chdStr.includes("昨")) {
		return new Date((new Date(new Date().toLocaleDateString()).getTime() - 1000 * 60 * 60 * 24)).toLocaleDateString().replace(/\//g, '-');
	}
	if (chdStr.includes("前")) {
		return new Date((new Date(new Date().toLocaleDateString()).getTime() - 1000 * 60 * 60 * 24 * 2)).toLocaleDateString().replace(/\//g, '-');
	}
	let dataList = chdStr.split('月');
	if (dataList.length === 2) {
		let month = chineseNumerToAmount(dataList[0]);
		let day = chineseNumerToAmount(dataList[1]);
		if (typeof month === "number" && typeof day === "number") {
			return new Date(new Date().getFullYear().toString() + '-' + month + '-' + day).toLocaleDateString().replace(/\//g, '-');
		}
	}
	return new Date().toLocaleDateString().replace(/\//g, '-');
};

/**
 * cheakBillType 判断是收入还是支出类型
 * @param text  字符串
 * @returns {Number}  0/1
 */
const cheakBillType = function (text) {
	let inComeList = ["进账", "得到", "获得", "白嫖", "收", "得", "获", "收入"];
	let outComeList = ["花费", "花", "支", "开销", "失去", "用了", "用", "失", "支出"];
	if (outComeList.includes(text)) {
		return 0;
	}
	if (inComeList.includes(text)) {
		return 1;
	}
};

/**
 * StringSimilar 比较两个字符串的相似度
 * @param {String} s  字符串
 * @param  {String} t  字符串
 * @param  {Number} f  相似度位数
 * @returns {Number}  相似度
 */
function StringSimilar(s, t, f = 3) {
	if (!s || !t) {
		return 0;
	}
	let l = s.length > t.length ? s.length : t.length;
	let n = s.length;
	let m = t.length;
	let d = [];
	let min = function (a, b, c) {
		return a < b ? (a < c ? a : c) : (b < c ? b : c);
	};
	let i, j, si, tj, cost;
	if (n === 0) return m;
	if (m === 0) return n;
	for (i = 0; i <= n; i++) {
		d[i] = [];
		d[i][0] = i;
	}
	for (j = 0; j <= m; j++) {
		d[0][j] = j;
	}
	for (i = 1; i <= n; i++) {
		si = s.charAt(i - 1);
		for (j = 1; j <= m; j++) {
			tj = t.charAt(j - 1);
			if (si === tj) {
				cost = 0;
			} else {
				cost = 1;
			}
			d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
		}
	}
	let res = (1 - d[n][m] / l);
	return res.toFixed(f);
}

/**
 * NLPResultToForms BaiDu自然语言处理结果翻译为账单表单
 * @param result  自然语言处理结果
 * @param typeList  账单列表
 * @returns {Object}  验证码
 */
const NLPResultToForms = function (result, typeList) {

	let type, defaultType, typeId, time, amount;
	let wordsList = result.items;
	let mostSimilar = {
		item: null,
		defaultType: null,
		similar: 0,
	};
	wordsList.forEach((word) => {
		if (word.ne === "TIME" && time === undefined) {
			time = chineseDataToData(word.item);
		}
		if (word.pos === "v" && type === undefined) {
			type = cheakBillType(word.item);
		}
		if (word.pos === "m" && (amount === undefined || amount === 0)) {
			amount = chineseNumerToAmount(word.item);
		}
		if (word.pos === "v" || word.pos === 'n' || word.pos === "m") {
			if (typeList.dfTypeListKeys.length >= 1) {
				typeList.dfTypeListKeys.forEach(key => {
					let similar = StringSimilar(key, word.item);
					if (similar > mostSimilar.similar) {
						mostSimilar.item = key;
						mostSimilar.defaultType = 1;
						mostSimilar.similar = similar;
					}
				});
			}
			if (typeList.userTypeListKeys.length >= 1) {
				typeList.userTypeListKeys.forEach(key => {
					let similar = StringSimilar(key, word.item);
					if (similar > mostSimilar.similar) {
						mostSimilar.item = key;
						mostSimilar.defaultType = 0;
						mostSimilar.similar = similar;
					}
				});
			}
		}
	});

	console.log(mostSimilar);
	if (mostSimilar.similar > 0) {
		defaultType = mostSimilar.defaultType;
		let typeInfo = mostSimilar.defaultType === 0 ? typeList.userTypeList[mostSimilar.item].split("-") : typeList.dfTypeList[mostSimilar.item].split("-");
		if (Number(typeInfo[1]) === type) {
			typeId = typeInfo[0];
		}
	}
	return {
		type: type,
		defaultType: defaultType,
		typeId: typeId,
		time: time,
		amount: amount,
	};
};

module.exports = {
	dateFormat,
	getCaptchaCode,
	NLPResultToForms
};
