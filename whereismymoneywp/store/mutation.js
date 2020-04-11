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
		let inTypeList = []
		let outTypeList = []
		data.forEach(item => {
			if (item.type == 1) {
				inTypeList.push(item)
			} else {
				outTypeList.push(item)
			}
		})
		state.system.types.inTypeList = inTypeList
		state.system.types.outTypeList = outTypeList
	},

	setMyTypes(state, data) {

		let inTypeList = []
		let outTypeList = []
		data.forEach(item => {
			if (item.type == 1) {
				inTypeList.push(item)
			} else {
				outTypeList.push(item)
			}
		})
		state.system.myTypes.inTypeList = inTypeList
		state.system.myTypes.outTypeList = outTypeList
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
	},

	setMonthList(state, data) {
		if (data.length) {
			if (state.dateInfo.year == state.selectedDateInfo.year && state.dateInfo.month == state.selectedDateInfo.month) {
				state.billData.monthList = data.reverse()
			} else {
				state.billData.monthList = data
			}
		} else {
			state.billData.monthList = []
		}
	},

	setTypeList(state, data) {
		if (data.length) {
			state.billData.typeList = data
		} else {
			state.billData.typeList = []
		}
	},
}

export default mutations
