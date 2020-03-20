import config from '@/config/index'
import {genAuth} from '@/assets/help'

const showLogin = () => {
	this.$store.commit('showLogin')
}


const request = async (params, method) => {

	if (typeof tryCount === 'undefined') {
		var tryCount = 0
	} else {
		tryCount ++
	}

	if (tryCount === 3) {
		console.log('请求次数达到上限')
		return
	}

	tryCount ++
	console.log(tryCount)

	const header = {
		"content-type": params.contentType || "application/json",
		"Authorization": params.auth ? genAuth() : ''
	}

	if (!uni.getStorageSync('accessToken') && params.auth) {
		// 跳转到登录页面
		// this.$showLoginForm()
		console.log('找不到 accessToken，请登录')
		return
	}


	const [err, res] = await uni.request({
		url: `${config.API}${params.url}`,
		header: params.header || header,
		method: method,
		data: params.data || '',
	})


	if (res.statusCode === 401) {
		const refreshToken = uni.getStorageSync('refreshToken')

		const [err, res] = await uni.request({
			method: 'GET',
			url: config.API + '/auth/oauth/token',
			header: {
				'isToken': 'false',
				'TENANT-ID': '1',
				'Authorization': 'Basic YXBwOmFwcA==',
				// 'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				refresh_token: refreshToken,
				grant_type: 'refresh_token',
				scope: 'server',
			}
		})

		if (res.statusCode === 200) {
			uni.setStorageSync('accessToken', res.data.access_token)
			uni.setStorageSync('refreshToken', res.data.refresh_token)
		} else {
			console.log('换取 Token 失败，请重新登录')
		}
		request(params, method)
	} else if (res.statusCode === 200 && res.data.code === 0) {
		return res.data.data
	} else {
		throw new Error(`${res.data.msg || 'unkown error'}`)
	}


}

const get = (params) => request(params, 'GET')
const post = (params) => request(params, 'POST')
const put = (params) => request(params, 'PUT')
const del = (params) => request(params, 'DELETE')


export {
	get,
	post,
	put,
	del,
}
