const state = {

	userInfo: {
		id: null,
		name: null,
		email: null,
		useDays: null,
		avatar: null,
		weixinId: null,
		qqId: null
	},

	system: {
		types: {
			outTypeList: [],
			inTypeList: []
		},
		myTypes: {
			outTypeList: [],
			inTypeList: []
		},
		showUserPage: false,
	},

	dateInfo: {
		year: null,
		month: null,
		day: null
	},

	selectedDateInfo: {
		year: null,
		month: null,
		day: null
	},

	billData: {
		incomeSum: 0,
		outcomeSum: 0,
		monthList: [],
		typeList: []
	},

	temporary: {
		isSelected: false,
		selectedBillItem: {}
	}
}

export default state
