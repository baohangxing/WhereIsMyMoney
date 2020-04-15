import instance from './../../api/http';


/**
 * @description 裁剪字符串
 *
 * @param  {string} content       字符串
 * @param  {number}   len         长度
 * @return {string}               裁剪后的字符串
 */
export const shortifyContent = (content, len) => {
    if (!content) {
        return ''
    }
    if (content.length < len) {
        return content
    }
    const result = content.substr(0, len) + '...'
    return result
}

/**
 * @description 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
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

    return function (...params) {
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
 * @description获取token
 */
export function genAuth() {
    const token = window.localStorage.getItem('token');
    if (token) {
        const auth = 'Bearer' + ' ' + token;
        return auth
    } else {
        return ''
    }
}

export function setHeader() {
    instance.defaults.headers.common['Authorization'] = genAuth();
}

/**
 * @description 节流函数
 *
 * @param  {function} fn      回调函数
 * @param  {number}   delay   延时时间
 * @return {function}         返回客户调用函数
 */
export function throtting(fn, delay) {
    let canRun = true
    return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, delay)
    }
}

/**
 * @description 获取某年月的日数
 *
 * @param  {number}   year    年
 * @param  {number}   month   月
 * @return {number}           日数
 */
export function getHowManyDays(year, month) {
    let d = new Date(year, month, 0);
    return d.getDate()
}

/**
 * @description 获取本地的国际化时间
 *
 * @param  {number}   year    年
 * @param  {number}   month   月
 * @param  {number}   month   月
 * @param  {number}   hour    时
 * @param  {number}   minute  分
 * @param  {number}   second  秒
 * @return {string}           国际化时间
 */
export function dateFormat(year, month, day, hour, minute, second) {
    let y = year || new Date().getFullYear(); //年
    if (y < 1900) y = y + 1900;
    let m = month || new Date().getMonth() + 1; //月
    if (m < 10) m = '0' + m;
    let d = day || new Date().getDate(); //日
    if (d < 10) d = '0' + d;
    let h = hour || '0'; //小时
    if (h < 10) h = '0' + h;
    let min = minute || '0'; //分钟
    if (min < 10) min = '0' + min;
    let s = second || '0'; //秒
    if (s < 10) s = '0' + s;
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
}

/**
 * @description 获取类型的名字
 * @param {Object} id
 * @param {Object} type
 * @param {Object} defaultType
 * @return {Object} name
 */
export function getTypeName(id, type, defaultType) {
    let types = this.$store.state.system.types;
    let myTypes = this.$store.state.system.myTypes;

    if (type === 1 && defaultType === 1) {
        for (let i = 0; i < types.inTypeList.length; i++) {
            if (types.inTypeList[i] && types.inTypeList[i].id === id) return types.inTypeList[i].name;
        }
        return '支出';
    }

    if (type === 0 && defaultType === 1) {
        for (let i = 0; i < types.outTypeList.length; i++) {
            if (types.outTypeList[i] && types.outTypeList[i].id === id) return types.outTypeList[i].name;
        }
        return '收入';
    }
    if (type === 1 && defaultType === 0) {
        for (let i = 0; i < myTypes.inTypeList.length; i++) {
            if (myTypes.inTypeList[i] && myTypes.inTypeList[i].id === id) return myTypes.inTypeList[i].name;
        }
        return '支出';
    }

    if (type === 0 && defaultType === 0) {
        for (let i = 0; i < myTypes.outTypeList.length; i++) {
            if (myTypes.outTypeList[i] && myTypes.outTypeList[i].id === id) return myTypes.outTypeList[i].name;
        }
        return '收入';
    }
}


/**
 * @description 获取类型的图表
 * @param {Object} id
 * @param {Object} type
 * @param {Object} defaultType
 * @return {Object} name
 */
export function getTypeIcon(id, type, defaultType) {
    let types = this.$store.state.system.types;
    let myTypes = this.$store.state.system.myTypes;

    if (type === 1 && defaultType === 1) {
        for (let i = 0; i < types.inTypeList.length; i++) {
            if (types.inTypeList[i] && types.inTypeList[i].id === id) return types.inTypeList[i].icon;
        }
    }

    if (type === 0 && defaultType === 1) {
        for (let i = 0; i < types.outTypeList.length; i++) {
            if (types.outTypeList[i] && types.outTypeList[i].id === id) return types.outTypeList[i].icon;
        }
    }
    if (type === 1 && defaultType === 0) {
        for (let i = 0; i < myTypes.inTypeList.length; i++) {
            if (myTypes.inTypeList[i] && myTypes.inTypeList[i].id === id) return myTypes.inTypeList[i].icon;
        }
    }

    if (type === 0 && defaultType === 0) {
        for (let i = 0; i < myTypes.outTypeList.length; i++) {
            if (myTypes.outTypeList[i] && myTypes.outTypeList[i].id === id) return myTypes.outTypeList[i].icon;
        }
    }
}
