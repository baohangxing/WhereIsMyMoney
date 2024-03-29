import axios from './http';

let http = axios;
/* ------------------------USER------------------------ */

/**
 * @description 用户登录
 */
export const USER_LOGIN = params => {
    return http.post('/user/login', params)
};

/**
 * @description 修改用户信息
 */
export const USER_CHANGE_INFO = params => {
    return http.put('/user/updateInfo', params)
};

/**
 * @description 用户忘记密码
 */
export const USER_FORGET_PASSWORD = params => {
    return http.post('/user/resetPassword', params)
};

/**
 * @description  用户注册
 */
export const USER_REGISTER = params => {
    return http.post('/user/register', params)
};

/**
 * @description 获取用户信息
 */
export const USER_GET_INFO = params => {
    return http.get('/user/info', params)
};


/**
 * @description 获取平台用户数据信息
 */
export const USER_GET_PLATFORM_INFO = params => {
    return http.get('/user/platformUserInfo', params)
};

/* ------------------------   EMAIL    ------------------------ */


/**
 * @description 获取验证码
 */
export const EMAIL_GET_CAPTCHA = params => {
    return http.post('/email/sendCaptcha', params)
};

/**
 * @description 发送导出账单数据
 */
export const EMAIL_SEND_BILL_DATA = params => {
    return http.post('/email/sendBillData', params)
};

/* ------------------------DEFAULT TYPE------------------------ */

/**
 * @description 获取单个自定义账单类型信息
 */
export const DT_GET_BY_ID = params => {
    return http.get('/bill/get', params)
};


/**
 * @description 获取获取自定义账单类型信息
 */
export const DT_GETALL = params => {
    return http.get('/type/getAll', params)
};

/* ------------------------USER TYPE------------------------ */


/**
 * @description 修改自定义账单类型
 */
export const UT_UPDATE = params => {
    return http.put('/userType/update', params)
};

/**
 * @description 删除自定义账单类型
 */
export const UT_DELETE = params => {
    return http.delete('/userType/delete', params)
};


/**
 * @description 新增自定义账单类型
 */
export const UT_ADD = params => {
    return http.post('/userType/add', params)
};

/**
 * @description 获取单个自定义账单类型信息
 */
export const UT_GET_BY_ID = params => {
    return http.get('/userType/get', params)
};


/**
 * @description 获取获取自定义账单类型信息
 */
export const UT_GETALL = params => {
    return http.get('/userType/getAll', params)
};


/* ------------------------BILL------------------------ */


/**
 * @description 修改账单
 */
export const BILL_UPDATE = params => {
    return http.put('/bill/update', params)
};

/**
 * @description 删除账单
 */
export const BILL_DELETE = params => {
    return http.delete('/bill/delete', params)
};


/**
 * @description 新增账单
 */
export const BILL_ADD = params => {
    return http.post('/bill/add', params)
};

/**
 * @description 获取单个账单信息
 */
export const BILL_GET_BY_ID = params => {
    return http.get('/bill/get', params)
};

/**
 * @description 获取年月的账单分类信息
 */
export const BILL_GET_GROUP0BY_TYPE = params => {
    return http.get('/bill/getMonthTypeList', params)
};

/**
 * @description 获取年月的账单分类信息
 */
export const BILL_GET_USER_ACTIVE = params => {
    return http.get('/bill/getUserActive', params)
};

/**
 * @description 获取月年的账单结余信息
 */
export const BILL_GET_MY_SUM = params => {
    return http.get('/bill/getSumInfo', params)
};

/**
 * @description 获取某月的账单信息
 */
export const BILL_GET_GROUP0BY_MONTH = params => {
    return http.get('/bill/getMonthDetailList', params)
};

/**
 * @description 获取账单信息
 */
export const BILL_GET_PAGE = params => {
    return http.get('/bill/getPage', params)
};


/* ----------------------APP_VERSION---------------------- */

/**
 * @description 修改版本信息
 */
export const APP_VERSION_UPDATE = params => {
    return http.put('/appVersion/update', params)
};

/**
 * @description 删除版本信息
 */
export const APP_VERSION_DELETE = params => {
    return http.delete('/appVersion/delete', params)
};


/**
 * @description 新增版本说明
 */
export const APP_VERSION_ADD = params => {
    return http.post('/appVersion/add', params)
};

/**
 * @description 获取单个版本信息
 */
export const APP_VERSION_GET_BY_ID = params => {
    return http.get('/appVersion/get', params)
};

/**
 * @description 获取所有版本信息
 */
export const APP_VERSION_GET_ALL = params => {
    return http.get('/appVersion/getAll', params)
};











