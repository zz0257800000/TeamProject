// store/search.js
import axios from 'axios';

const state = {
  searchResults: [],
};

const mutations = {
  setSearchResults(state, results) {
    state.searchResults = results;
  },
};

const actions = {
  async search({ commit }, keyword) {
    try {
      const response = await axios.get(`/product/search?productName=${keyword}`);
      commit('setSearchResults', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};