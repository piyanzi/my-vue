import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePath: {
      path: '',
      parent: '',
      child: ''
    }
  },

  mutations: {
    changePath (state, activePath) {
      state.activePath.path = activePath.path
      state.activePath.parent = activePath.parent
      state.activePath.child = activePath.child
    }
  },

  actions: {
  },

  getters: {
    getPath: state => {
      return state.activePath
    }
  },

  modules: {
  }
})
