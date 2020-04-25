const actions = {

    /**
     * 清除缓存数据
     * @param {Object} context
     */
    clearStateData(context) {
        context.commit('setTypes', []);
        context.commit('setMyTypes', []);

        context.commit('setSumData', {
            incomeSum: 0,
            outcomeSum: 0
        });
        context.commit('setTypeList', {
            type: 0
        });
        context.commit('setTypeList', {
            type: 1
        });
        context.commit('setShowUserPage', false);
    },
};

export default actions
