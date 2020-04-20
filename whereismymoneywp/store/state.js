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
		iconList: [
			"type_food",
			"type_clothes",
			"type_ditie",
			"type_tour",
			"type_online",
			"type_study",
			"type_dayuse",
			"type_house",
			"type_hospitol",
			"type_hongbao",
			"type_funny",
			"type_dinner",
			"type_electric",
			"type_sports",
			"type_eat",
			"type_fruit",
			"type_CombinedShape",
			"type_life",
			"type_hongbao",
			"type_WaiKuai",
			"type_gupiao",
			"type_others"
		]
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
		typeList: {
			inList: [],
			outList: []
		}
	},

	temporary: {
		isSelected: false,
		selectedBillItem: {}
	}
}

export default state
