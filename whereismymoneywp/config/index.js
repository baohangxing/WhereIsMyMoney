var productionIp = 'http://39.105.**.**:3000/api'
var production = 'https://www.whereismymoney.icu:3000/api'
var localhost = 'http://127.0.0.1:3000/api'

const config = {
	AppVersion: '1.0.0',
	contactEmail: '**********@qq.com',
	webLink: 'http://www.whereismymoney.icu',
	amapKey: '**********************',
	baiduApiKey: '**********************',
	baiduSecretKey: '**********************',
	appid: '',
	wxiAppid: '**********************',
	runLocal: false, //本地模式，不发送ajax请求服务器

	// API: localhost,
	API: productionIp,
}

export default config
