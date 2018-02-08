
import {
  homeworkreport
} from "../server/index-server"

const state={

}

const getters =  {

}

const actions = {

  async homeworkreport_({commit,state},body){
    return await homeworkreport(body)
  },

}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}




