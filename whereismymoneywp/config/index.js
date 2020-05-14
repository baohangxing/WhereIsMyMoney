var productionIp = 'http://39.105.33.31:3000/api'
var production = 'https://www.whereismymoney.icu:3000/api'
var localhost = 'http://127.0.0.1:3000/api'

const config = {
	AppVersion: '1.0.0',
	contactEmail: '483053800@qq.com',
	webLink: 'http://www.whereismymoney.icu',
	amapKey: '4b91ee4b6a3662de0987f9dc8cf9167b',
	baiduApiKey: 'wiwFGZH4bEErGbTfPUfrvNhh',
	baiduSecretKey: 'OmbeVI0T1YkNSzGUsX1Rm7ovklHr6bb8',
	appid: '',
	wxiAppid: 'wx885fb9a3d2d72e2f',
	runLocal: false, //本地模式，不发送ajax请求服务器

	// API: localhost,
	API: productionIp,
}

export default config
