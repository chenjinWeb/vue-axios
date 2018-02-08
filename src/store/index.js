import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import mutations from "./mutations"
import index from "./modules/index-module"

const state={

}

const getters = {

}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules:{
    $index:index
  }
})

export default store




