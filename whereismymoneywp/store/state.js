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
		types: null,
		myTypes: null,
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
	
	billData:{
		incomeSum: null,
		outcomeSum: null
	},
	
}

export default state
