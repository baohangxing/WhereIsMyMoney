/**
 * 裁剪字符串
 * 
 * @param  {string} content       字符串
 * @param  {number}   len         长度
 * @return {string}               裁剪后的字符串
 */
export const shortifyContent = (content, len) => {
	if (content.length < len) {
		return content
	}
	const result = content.substr(0, len) + '...'
	return result
}

/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait = 500, immediate = true) {
	let timer, context, args

	const later = () => setTimeout(() => {
		timer = null
		if (!immediate) {
			func.apply(context, args)
			context = args = null
		}
	}, wait)

	return function(...params) {
		if (!timer) {
			timer = later()
			if (immediate) {
				func.apply(this, params)
			} else {
				context = this
				args = params
			}
		} else {
			clearTimeout(timer)
			timer = later()
		}
	}
}

/**
 * 获取token
 */
export function genAuth() {
	if (!!uni.getStorageSync('accessToken')) {
		const token = uni.getStorageSync('accessToken')
		const auth = 'Bearer' + ' ' + token
		return auth
	} else {
		return ''
	}
}

/**
 * 节流函数
 *
 * @param  {function} fn      回调函数
 * @param  {number}   delay   延时时间
 * @return {function}         返回客户调用函数
 */
export function throtting(fn, delay) {
	let canRun = true
	return function() {
		if (!canRun) return
		canRun = false
		setTimeout(() => {
			fn.apply(this, arguments)
			canRun = true
		}, delay)
	}
}