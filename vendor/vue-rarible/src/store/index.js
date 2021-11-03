import Vue from 'vue'
import Vuex from 'vuex'
import nft from './nft'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    nft
  }
})
