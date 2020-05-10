import Vuex from 'vuex'
import vue from 'vue'

import state from './state.js'
import mutations from './mutation.js'
import actions from './actions.js'
import getters from './getters.js'

vue.use(Vuex);

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

export default store
