import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [
      {
        id: 1, name: "Eggs", complete: false, order:0
      },
      {
        id: 2, name: "Milk", complete: false, order:0
      }
    ]
  },
  mutations: {
    addToCart(state, payload) {
      //only add the item to the cart if it isn't already there
      if (!state.cart.includes(payload)) {
        state.cart.push(payload);
      }
    },
    removeFromCart(state, payload) {
      state.cart.splice(state.cart.indexOf(payload), 1);
    },
    updateItem(state, id, payload) {
      //filter out the item from cart list using id
      //set the item to be updated's values to the payload's values with a PUT request
    },
    updateName(state, id, payload) {
      //filter out the item from cart list using id
      //set item's name to the payload with a PATCH request
    },
    updateComplete(state, id, payload) {
      //filter out the item from cart list using id
      //set item's complete field to the payload with a PATCH request
    },
    updateOrder(state, id, payload) {
      //filter out the item from cart list using id
      //set item's order to the payload with a PATCH request
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("addToCart", payload);
    },
    removeFromCart({ commit }, payload) {
      commit("removeFromCart", payload);
    },
    updateItem({ commit }, id, payload) {
      commit("updateItem", id, payload);
    },
    updateName({ commit }, id, payload) {
      commit("updateName", id, payload);
    },
    updateComplete({ commit }, id, payload) {
      commit("updateComplete", id, payload);
    },
    updateOrder({ commit }, id, payload) {
      commit("updateOrder", id, payload);
    },
    clearCart({ commit }) {
      commit("clearCart");
    }
  },
  getters: {
    //get all completed items
    completedItems: (state) => {
      return state.cart.filter((item) => item.complete);
    },
    //get all non-completed items
    nonCompletedItems: (state) => {
      return state.cart.filter((item) => !item.complete);
    }
  }
});
