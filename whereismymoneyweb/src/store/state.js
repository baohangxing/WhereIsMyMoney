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
        addBillBOverShow: false,
        types: {
            outTypeList: [],
            inTypeList: []
        },
        myTypes: {
            outTypeList: [],
            inTypeList: []
        }
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
};

export default state;
