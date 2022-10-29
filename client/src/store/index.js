import { createStore } from 'vuex'
import axios from 'axios'

const axiosInst = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
  }
})

export default createStore({
  state: {
    nearestCenter: null
  },
  getters: {
    
    nearestCenter(state) {
      return state.nearestCenter
    }

  },
  mutations: {

    nearestCenter(state, nearestCenter) {
      return state.nearestCenter = nearestCenter
    },

  },
  actions: {

    async fetchNearestComedyCenter({ commit }, { latitude, longtitude }) {
      let res = await axiosInst.get("/getNearestCenter", { params: { latitude, longtitude } } )
      let nearestCenter = res.data
      commit("nearestCenter", nearestCenter)
    }

  },
  modules: {
  }
})

