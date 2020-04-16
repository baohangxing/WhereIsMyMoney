/**
 * @description 获取类型的名字
 * @param {String} val
 * @return {String} name
 */
export function amountFilter(val) {
    if (!val) return '0.00';
    return Number(val).toFixed(2)
}
