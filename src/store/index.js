import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutaions'
import actions from './action'
import getters from './getters'


//安装插件
Vue.use(Vuex)

const state = {
    cartList: [],
    Student: [
        { id: 1, name: 'hc', age: 24 },
        { id: 2, name: 'hc1', age: 30 },
        { id: 3, name: 'hc2', age: 20 },
        { id: 4, name: 'hc3', age: 18 },
    ]
}

//创建store实例
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {

    }
})

export default store