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
	},
	setTypes(state, data) {
		state.system.types = data
	},

	setMyTypes(state, data) {
		state.system.myTypes = data
	},

	setShowUserPage(state, data) {
		state.system.showUserPage = !state.system.showUserPage
	},

	refreshDateInfo(state, data) {
		let time = new Date();
		state.dateInfo.year = time.getFullYear();
		state.dateInfo.month = time.getMonth() + 1;
		state.dateInfo.day = time.getDate()

		state.selectedDateInfo.year = time.getFullYear();
		state.selectedDateInfo.month = time.getMonth() + 1;
		state.selectedDateInfo.day = time.getDate()
	},


	setSelectedDateInfo(state, data) {
		if (data.year)
			state.selectedDateInfo.year = data.year
		if (data.month)
			state.selectedDateInfo.month = data.month
		if (data.day)
			state.selectedDateInfo.day = data.day
	},

	setDateInfo(state, data) {
		if (data.year)
			state.dateInfo.year = data.year
		if (data.month)
			state.dateInfo.month = data.month
		if (data.day)
			state.dateInfo.day = data.day
	},

	setSumData(state, data) {
		if (data.incomeSum != null) state.billData.incomeSum = data.incomeSum
		if (data.outcomeSum != null) state.billData.outcomeSum = data.outcomeSum
	}

}

export default mutations
