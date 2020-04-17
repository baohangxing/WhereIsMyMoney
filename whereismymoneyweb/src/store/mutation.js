const mutations = {

    setUserInfo(state, info) {
        if (info.id) {
            state.userInfo.id = info.id;
            state.userInfo.name = info.name;
            state.userInfo.email = info.email;
            state.userInfo.useDays = info.useDays;
            state.userInfo.avatar = info.avatar;
            state.userInfo.weixinId = info.weixinId;
            state.userInfo.qqId = info.qqId;
        }
    },
    changeAddBillBOverShow(state, data) {
        state.system.addBillBOverShow = data || !state.system.addBillBOverShow
    },

    setTypes(state, data) {
        let inTypeList = [];
        let outTypeList = [];
        data.forEach(item => {
            if (item.type === 1) {
                inTypeList.push(item);
            } else {
                outTypeList.push(item);
            }
        });
        state.system.types.inTypeList = inTypeList;
        state.system.types.outTypeList = outTypeList;
    },

    setMyTypes(state, data) {

        let inTypeList = [];
        let outTypeList = [];
        data.forEach(item => {
            if (item.type === 1) {
                inTypeList.push(item);
            } else {
                outTypeList.push(item);
            }
        });
        state.system.myTypes.inTypeList = inTypeList;
        state.system.myTypes.outTypeList = outTypeList;
    },

    refreshDateInfo(state) {
        let time = new Date();
        state.dateInfo.year = time.getFullYear();
        state.dateInfo.month = time.getMonth() + 1;
        state.dateInfo.day = time.getDate();

        state.selectedDateInfo.year = time.getFullYear();
        state.selectedDateInfo.month = time.getMonth() + 1;
        state.selectedDateInfo.day = time.getDate();
    },

    setSelectedDateInfo(state, data) {
        if (data.year) {
            state.selectedDateInfo.year = data.year;
        }
        if (data.month) {
            state.selectedDateInfo.month = data.month;
        }
        if (data.day) {
            state.selectedDateInfo.day = data.day;
        }
    },

    setDateInfo(state, data) {
        if (data.year) {
            state.dateInfo.year = data.year;
        }
        if (data.month) {
            state.dateInfo.month = data.month;
        }
        if (data.day) {
            state.dateInfo.day = data.day;
        }
    },

    setSumData(state, data) {
        if (data.incomeSum != null) state.billData.incomeSum = data.incomeSum;
        if (data.outcomeSum != null) state.billData.outcomeSum = data.outcomeSum;
    },

    setMonthList(state, data) {
        if (data.length) {
            if (state.dateInfo.year === state.selectedDateInfo.year && state.dateInfo.month === state.selectedDateInfo.month) {
                state.billData.monthList = data.reverse();
            } else {
                state.billData.monthList = data;
            }
        } else {
            state.billData.monthList = [];
        }
    },

    addMonthListItem(state, data) {
        if (data) {
            let day = Number(data.time.slice(8, 10));
            let year = Number(data.time.slice(0, 4));
            let month = Number(data.time.slice(5, 7));

            if (data.type === 1) {
                state.billData.incomeSum += Number(data.amount);
            } else {
                state.billData.outcomeSum += Number(data.amount);
            }

            for (let i = 0; i < state.billData.monthList.length; i++) {
                if (Number(state.billData.monthList[i].day) === day) {
                    if (data.type === 1) {
                        state.billData.monthList[i].incomeSum += Number(data.amount);
                    } else {
                        state.billData.monthList[i].outcomeSum += Number(data.amount);
                    }
                    state.billData.monthList[i].billList.unshift(data);
                    return;
                }
            }

            if (year === Number(state.dateInfo.year) && month === Number(state.dateInfo.month)) {
                state.billData.monthList.push({
                    day: day,
                    incomeSum: data.type === 1 ? data.amount : 0,
                    outcomeSum: data.type === 0 ? data.amount : 0,
                    time: year.toString() + "-" + month.toString() + "-" + day.toString(),
                    billList: [data]
                });
            }
        }
    },

    deleteMonthListItem(state, data) {
        if (data) {
            if (data.type === 1) {
                state.billData.incomeSum -= Number(data.amount);
            } else {
                state.billData.outcomeSum -= Number(data.amount);
            }

            let day = Number(data.time.slice(8, 10));
            for (let i = 0; i < state.billData.monthList.length; i++) {
                if (Number(state.billData.monthList[i].day) === day) {
                    if (data.type === 1) {
                        state.billData.monthList[i].incomeSum -= Number(data.amount);
                    } else {
                        state.billData.monthList[i].outcomeSum -= Number(data.amount);
                    }
                    state.billData.monthList[i].billList = state.billData.monthList[i].billList.filter(item => item.id !== data.id);

                    if (state.billData.monthList[i].billList.length === 0) {
                        state.billData.monthList = state.billData.monthList.filter(item => item.day !== day);
                    }
                    return;
                }
            }
        }
    },

    setTypeList(state, data) {
        if (data.data.length) {
            if (data.type === 0) {
                state.billData.typeList.outList = data.data;
            } else {
                state.billData.typeList.inList = data.data;
            }
        } else {
            if (data.type === 0) {
                state.billData.typeList.outList = [];
            } else {
                state.billData.typeList.inList = [];
            }

        }
    },

    selectedBillItem(state, data) {
        if (data && data.id) {
            state.temporary.selectedBillItem = data;
            state.temporary.isSelected = true;
        } else {
            state.temporary.isSelected = false;
            state.temporary.selectedBillItem = {};
        }
    }

};

export default mutations;
