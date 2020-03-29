import vue from 'vue'

const mutations = {

	setUserInfo(state, info) {
		if (info.id) {
			state.userInfo.id = info.id
			state.userInfo.name = info.name
			state.userInfo.email = info.email
			state.userInfo.useDays = info.useDays
			state.userInfo.avatar = info.avatar
			state.userInfo.weixinId = info.weixinId
			state.userInfo.qqId = info.qqId
		}
	}
}

export default mutations
