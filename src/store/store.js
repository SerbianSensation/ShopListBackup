import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    currentItem: { id: -1, name: "currentItem", complete: false, order:-1 }
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
    removeFromCart(state, payload) {
      state.cart.splice(state.cart.indexOf(payload), 1);
    },
    updateItemFields(state, id, name, order, complete) {
      //get item from cart using id
      const item = state.cart.find(item => item.id === id);
      //update all of its fields
      console.log("Item found:" + item);
      item.name = name;
      item.order = order;
      item.complete = complete;
      console.log("Item updated:" + item);
    },
    updateItem(state, id, payload) {
      //filter out the item from cart list using id
    },
    updateName(state, id, payload) {
      //filter out the item from cart list using id
    },
    updateComplete(state, id) {
      //filter out the item from cart list using id
      const item = state.cart.find(item => item.id === id);
      //flip its complete field
      item.complete = !item.complete;
    },
    updateOrder(state, id, payload) {
      //filter out the item from cart list using id
    },
    updateCurrentItem(state, payload) {
      state.currentItem = payload;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addToCart({ commit, state }, payload) {
      //only add the item to the cart if it isn't already there
      if(!state.cart.includes(payload)) {
        commit("addToCart", payload);
      }
    },
    removeFromCart({ commit }, payload) {
      commit("removeFromCart", payload);
    },
    updateItemFields({ commit }, id, name, order, complete){
      commit("updateItemFields", id, name, order, complete);
    },
    updateItem({ commit }, id, payload) {
      //set item's name to the payload with a PATCH request
      commit("updateItem", id, payload);
    },
    updateName({ commit }, id, payload) {
      commit("updateName", id, payload);
    },
    updateComplete({ commit }, id) {
      //reverse item's complete field with a PATCH request
      commit("updateComplete", id);
    },
    updateOrder({ commit }, id, payload) {
      //set item's order to the payload with a PATCH request
      commit("updateOrder", id, payload);
    },
    updateCurrentItem({ commit }, payload) {
      commit("updateCurrentItem", payload);
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
    },
    //get the current item
    currentItem: (state) => {
      return state.currentItem;
    }
  }
});

/* TODO:
Update the store actions to interact with the API
 */
